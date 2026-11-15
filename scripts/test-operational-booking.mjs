import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync,spawn} from 'node:child_process';
import {randomUUID} from 'node:crypto';
const container='docvy-booking-'+randomUUID().slice(0,8);
const docker=(...args)=>execFileSync('docker',args,{encoding:'utf8',stdio:['pipe','pipe','pipe']}).trim();
function sql(q){return execFileSync('docker',['exec','-i',container,'psql','-U','postgres','-v','ON_ERROR_STOP=1','-At'],{input:q,encoding:'utf8',stdio:['pipe','pipe','pipe']}).trim();}
function concurrent(q){return new Promise(resolve=>{const p=spawn('docker',['exec','-i',container,'psql','-U','postgres','-v','ON_ERROR_STOP=1','-At']);let out='',err='';p.stdout.on('data',s=>out+=s);p.stderr.on('data',s=>err+=s);p.on('close',code=>resolve({code,out:out.trim(),err}));p.stdin.end(q);});}
const clinic='7dfbf055-2737-448c-921e-c074d84393d4',owner=randomUUID(),viewer=randomUUID(),outsider=randomUUID(),otherClinic=randomUUID();
try{
 docker('run','--rm','-d','--name',container,'-e','POSTGRES_PASSWORD='+randomUUID(),'postgres:17');
 for(let n=0;n<30;n++){try{sql('select 1');break;}catch{await new Promise(r=>setTimeout(r,300));}}
 sql("create schema auth;create schema extensions;create table auth.users(id uuid primary key);create role anon;create role authenticated;create role service_role bypassrls;grant usage on schema public to service_role,anon,authenticated;");
 const files=['crm_staging','crm_clinic_scope','crm_staff_roles','crm_booking_lifecycle','crm_reschedule','crm_booking_fee','crm_calendar_with_fees','crm_enquiry_intake','crm_enquiry_followup','crm_enquiry_booking','crm_doctor_roster','crm_clinic_slot_overlap'];
 for(const file of files)try{sql(fs.readFileSync('docs/sql/'+file+'.sql','utf8'));}catch(e){throw Error('Bootstrap '+file+': '+e.stderr);}
 const migration=fs.readdirSync('supabase/migrations').find(f=>f.endsWith('_operational_booking_workflow.sql'));
 sql(fs.readFileSync('supabase/migrations/'+migration,'utf8'));
 const guard=fs.readdirSync('supabase/migrations').find(f=>f.endsWith('_provider_booking_guards.sql'));sql(fs.readFileSync('supabase/migrations/'+guard,'utf8'));
 const availability=fs.readdirSync('supabase/migrations').find(f=>f.endsWith('_booking_public_availability.sql'));sql(fs.readFileSync('supabase/migrations/'+availability,'utf8'));
 sql(`insert into auth.users values('${owner}'),('${viewer}'),('${outsider}');insert into crm_staff values('${owner}','owner','${clinic}'),('${viewer}','viewer','${clinic}');insert into crm_clinics(id,slug,name,booking_enabled) values('${otherClinic}','other-test','Other synthetic clinic',true);`);
 const slots=Array.from({length:6},()=>randomUUID());
 // These are six synthetic providers, not verified public doctors or approved real hours.
 for(let i=0;i<6;i++)sql(`insert into crm_enquiry_routes values('synthetic-provider-${i}','Test city','Test practice ${i}','${clinic}',true);insert into crm_slots(id,clinic_id,starts_at,ends_at,provider_id,fee_paise) values('${slots[i]}','${clinic}',now()+interval '3 days',now()+interval '3 days 30 minutes','synthetic-provider-${i}',50000);`);
 assert.throws(()=>sql(`set role service_role;select crm_reserve('${clinic}','${slots[0]}','${randomUUID()}')`));
 const key1=randomUUID(),key2=randomUUID();
 const request=(key,slot,phone)=>`set role service_role;select crm_request_slot('${key}','${slot}','Synthetic patient','${phone}','test@example.invalid',true);`;
 const r1=sql(request(key1,slots[0],'+919000000001')).split('\n').at(-1),r2=sql(request(key2,slots[0],'+919000000002')).split('\n').at(-1);
 assert.equal(sql(request(key1,slots[0],'+919000000001')).split('\n').at(-1),r1);
 assert.throws(()=>sql(request(key1,slots[1],'+919000000001')));
 const approve=(actor,ref,slot,clinicId=clinic)=>`set role service_role;select crm_book_enquiry('${actor}','${clinicId}','${ref}','${slot}');`;
 assert.throws(()=>sql(approve(viewer,r1,slots[0])));
 assert.throws(()=>sql(approve(outsider,r1,slots[0])));
 assert.throws(()=>sql(approve(owner,r1,slots[0],otherClinic)));
 assert.throws(()=>sql(approve(owner,r1,slots[1])));
 const raced=await Promise.all([concurrent(approve(owner,r1,slots[0])),concurrent(approve(owner,r2,slots[0]))]);
 assert.equal(raced.filter(r=>r.code===0).length,1,JSON.stringify(raced));
 assert.equal(sql('select count(*) from crm_bookings'),'1');
 assert.equal(sql("select count(*) from crm_requestable_slots where id='"+slots[0]+"'"),'0');
 assert.equal(sql('select fee_paise from crm_bookings'),'50000');
 assert.throws(()=>sql(`set role service_role;update crm_bookings set slot_id='${slots[1]}'`));
 assert.equal(sql("select count(*) from crm_notification_outbox where event='confirmed'"),'1');
 const win=raced[0].code===0?r1:r2;
 sql(approve(owner,win,slots[0]));assert.equal(sql('select count(*) from crm_bookings'),'1');
 assert.throws(()=>sql('set role anon;select * from crm_enquiries'));
 assert.throws(()=>sql('set role authenticated;select * from crm_founders'));
 assert.throws(()=>sql(`set role anon;select crm_book_enquiry('${owner}','${clinic}','${r1}','${slots[0]}')`));
 const blocked=slots[2];sql(`update crm_slots set blocked=true where id='${blocked}'`);assert.throws(()=>sql(request(randomUUID(),blocked,'+919000000003')));
 sql('set role service_role;select crm_mock_notifications()');assert.equal(sql("select count(*) from crm_notification_outbox where status='pending'"),'0');
 assert.equal(sql("select crm_mock_notifications()"),'0');
 console.log('PASS: six synthetic provider schedules; idempotency/conflict; simultaneous approvals one winner; provider/clinic mismatch; viewer/outsider/anon denial; blocked slot; fee snapshot; transactional notification outbox and idempotent mock drain.');
}finally{try{docker('stop',container);}catch{/* Preserve original failure. */}}
