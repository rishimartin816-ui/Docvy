import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync,spawn} from 'node:child_process';
import {randomUUID} from 'node:crypto';
const container='docvy-live-qa-'+randomUUID().slice(0,8);
const docker=(...args)=>execFileSync('docker',args,{encoding:'utf8',stdio:['pipe','pipe','pipe']}).trim();
function sql(q){return execFileSync('docker',['exec','-i',container,'psql','-U','postgres','-v','ON_ERROR_STOP=1','-At'],{input:q,encoding:'utf8',stdio:['pipe','pipe','pipe']}).trim();}
function race(q){return new Promise(resolve=>{const p=spawn('docker',['exec','-i',container,'psql','-U','postgres','-v','ON_ERROR_STOP=1','-At']);let out='',err='';p.stdout.on('data',s=>out+=s);p.stderr.on('data',s=>err+=s);p.on('close',code=>resolve({code,out:out.trim(),err}));p.stdin.end(q);});}
const slot='00000000-0000-4000-8000-000000000003',second='00000000-0000-4000-8000-000000000004',actor=randomUUID();
const payload=(key,slotId=slot,phone='9000000001')=>({idempotencyKey:key,providerId:'docvy-qa-doctor',city:'Gurugram',facility:'DOCVY QA Clinic',name:'Synthetic patient',mobile:phone,email:'patient@example.invalid',requestedDate:'',requestedTime:'',slotId,consent:true,networkHash:'f'.repeat(64),patientKeyHash:'a'.repeat(64)});
const submit=data=>"set role service_role;select public.docvy_booking_submit('"+JSON.stringify(data)+"'::jsonb);";
try{
 docker('run','--rm','-d','--name',container,'-e','POSTGRES_PASSWORD='+randomUUID(),'postgres:17');
 // The image starts a temporary Unix-socket server during init; wait for final TCP readiness.
 let ready=false;for(let n=0;n<60;n++){try{docker('exec',container,'pg_isready','-h','127.0.0.1','-U','postgres');ready=true;break;}catch{await new Promise(r=>setTimeout(r,250));}}assert(ready,'Local PostgreSQL did not become ready');
 sql("create schema auth;create table auth.sessions(id uuid primary key,user_id uuid);create function auth.jwt() returns jsonb language sql as $$select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb$$;create function auth.uid() returns uuid language sql as $$select (auth.jwt()->>'sub')::uuid$$;");
 sql(fs.readFileSync('tests/hybrid-booking-db-fixture.sql','utf8'));
 sql(fs.readFileSync('supabase/migrations/20261115214014_docvy_live_booking_control.sql','utf8'));
 sql(fs.readFileSync('supabase/migrations/20261115214015_docvy_patient_visit_evidence.sql','utf8'));
 sql(fs.readFileSync('supabase/migrations/20261116050857_docvy_founder_managed_booking.sql','utf8'));
 sql("insert into docvy_booking_provider_options(provider_id,mode,enabled_at) values('docvy-qa-doctor','instant',now())");
 const keys=[randomUUID(),randomUUID()];
 const results=await Promise.all(keys.map((k,i)=>race(submit(payload(k,slot,'900000000'+(i+1))))));
 assert.equal(results.filter(r=>r.code===0).length,1,JSON.stringify(results));assert.equal(sql('select count(*) from crm_bookings'),'1');
 const winner=results.findIndex(r=>r.code===0),data=payload(keys[winner],slot,'900000000'+(winner+1));
 const output=JSON.parse(results[winner].out.split('\n').find(l=>l.startsWith('{')));const ref=output.reference;
 sql(submit(data));assert.equal(sql('select count(*) from crm_bookings'),'1');
 assert.throws(()=>sql(submit({...data,name:'Different payload'})));
 const transition=status=>`set role service_role;select docvy_booking_transition((select id from docvy_booking_cases where reference='${ref}'),'${actor}','clinic','${status}','Synthetic report',null);`;
 assert.throws(()=>sql(transition('completed_reported')),'Cannot complete before visit');
 assert.throws(()=>sql(transition('completed_verified')),'Doctor cannot independently verify a visit');
 sql(`update crm_slots set starts_at=now()-interval '1 hour',ends_at=now()-interval '30 minutes' where id='${slot}';update docvy_booking_cases set confirmed_starts_at=now()-interval '1 hour' where reference='${ref}';`);
 sql(transition('completed_reported'));
 assert.throws(()=>sql(`select docvy_booking_patient_action('${ref}',repeat('b',64),'attended','${actor}')`));
 assert.throws(()=>sql(`select docvy_booking_patient_action('${ref}',repeat('a',64),'attended',null)`));
 sql(`set role service_role;select docvy_booking_patient_action('${ref}',repeat('a',64),'attended','${actor}')`);
 assert.equal(sql(`select status from docvy_booking_cases where reference='${ref}'`),'completed_verified');
 sql(`set role service_role;select docvy_booking_patient_action('${ref}',repeat('a',64),'did_not_attend','${actor}')`);
 assert.equal(sql(`select status from docvy_booking_cases where reference='${ref}'`),'disputed');
 assert.throws(()=>sql('update docvy_booking_case_events set note=\'tampered\''));
 assert.throws(()=>sql('set role anon;select * from docvy_booking_cases'));
 assert.throws(()=>sql(`set role authenticated;select docvy_booking_patient_action('${ref}',repeat('a',64),'attended','${actor}')`));
 const session=randomUUID();sql(`insert into auth.sessions values('${session}','${actor}');`);
 assert.equal(sql(`set role authenticated;set request.jwt.claims='{"sub":"${actor}","session_id":"${session}"}';select docvy_booking_session_active();`).split('\n').at(-1),'t');
 sql(`delete from auth.sessions where id='${session}'`);
 assert.equal(sql(`set role authenticated;set request.jwt.claims='{"sub":"${actor}","session_id":"${session}"}';select docvy_booking_session_active();`).split('\n').at(-1),'f');
 // Central approval must reserve a real slot; arbitrary confirmation timestamps are rejected.
 sql("update docvy_booking_provider_options set mode='approval' where provider_id='docvy-qa-doctor'");
 const approvalData={...payload(randomUUID(),'','9000000003'),requestedDate:new Date(Date.now()+3*86400000).toISOString().slice(0,10),requestedTime:'10:00'};const approval=JSON.parse(sql(submit(approvalData)).split('\n').find(l=>l.startsWith('{')));
 assert.equal(approval.status,'requested');
 assert.throws(()=>sql(`select docvy_booking_transition((select id from docvy_booking_cases where reference='${approval.reference}'),'${actor}','docvy','confirmed','Synthetic approval',now()+interval '4 days')`));
 sql(`set role service_role;select docvy_booking_transition((select id from docvy_booking_cases where reference='${approval.reference}'),'${actor}','docvy','confirmed','Synthetic approval',(select starts_at from crm_slots where id='${second}'));`);
 assert.equal(sql('select count(*) from crm_bookings'),'2');
 sql(submit(approvalData));assert.throws(()=>sql(submit({...approvalData,requestedTime:'11:00'})));
 assert.throws(()=>sql("insert into crm_slots values(gen_random_uuid(),'00000000-0000-4000-8000-000000000001','00000000-0000-4000-8000-000000000002',false,now()+interval '3 days 15 minutes',now()+interval '3 days 45 minutes')"));
 const summary=JSON.parse(sql('select docvy_booking_summary()'));assert.equal(summary.total,2);

 sql("insert into docvy_directory_providers(provider_id,doctor_name,city,facility,enabled,published,consent_given,profile_status,verified_at,practice_locations) values('mr-sahil-kochale','Synthetic online policy fixture','Indore','Synthetic practice',true,true,true,'verified',now(),'[{\"city\":\"Online\",\"facility\":\"Synthetic online practice\"}]');insert into docvy_booking_provider_options(provider_id,mode,enabled_at) values('mr-sahil-kochale','instant',now());");
 const online={...approvalData,idempotencyKey:randomUUID(),providerId:'mr-sahil-kochale',city:'Online',facility:'Synthetic online practice',mobile:'9000000008'};
 const onlineResult=JSON.parse(sql(submit(online)).split('\n').find(l=>l.startsWith('{')));assert.equal(onlineResult.mode,'approval');assert.equal(onlineResult.status,'requested');assert.equal(sql('select count(*) from crm_bookings'),'2');
 assert.throws(()=>sql(submit({...online,idempotencyKey:randomUUID(),slotId:second})));
 assert.throws(()=>sql(submit({...online,idempotencyKey:randomUUID(),city:'Pune'})));
 const leases=await Promise.all([race('set role service_role;select json_agg(id) from docvy_booking_claim_notifications(2)'),race('set role service_role;select json_agg(id) from docvy_booking_claim_notifications(2)')]);
 const ids=leases.flatMap(r=>{assert.equal(r.code,0);return JSON.parse(r.out.split('\n').find(l=>l.startsWith('[')));});assert.equal(ids.length,4);assert.equal(new Set(ids).size,4);

 const requests=[];
 for(let n=0;n<2;n++){
  const input={...online,idempotencyKey:randomUUID(),mobile:'900000000'+(5+n),approvalOnly:true};
  const result=JSON.parse(sql(submit(input)).split('\n').find(l=>l.startsWith('{')));assert.equal(result.status,'requested');requests.push(sql("select id from docvy_booking_cases where reference='"+result.reference+"'"));
 }
 const confirmation=(id,start)=>"set role service_role;select docvy_booking_founder_confirm('"+id+"','"+actor+"','"+start+"','Doctor confirmed directly with DOCVY')";
 const future=new Date(Date.now()+5*86400000).toISOString();
 const confirmed=await Promise.all(requests.map(id=>race(confirmation(id,future))));assert.equal(confirmed.filter(r=>r.code===0).length,1,JSON.stringify(confirmed));
 const confirmedId=requests[confirmed.findIndex(r=>r.code===0)];sql(confirmation(confirmedId,future));assert.equal(sql('select count(*) from crm_bookings'),'2','Founder approval needs no CRM account or invented clinic');
 assert.equal(sql("select clinic_id is null and doctor_roster_id is null and crm_booking_id is null from docvy_booking_cases where id='"+confirmedId+"'"),'t');

 const linkedDoctor=randomUUID(),conflictingSlot=randomUUID();
 sql("insert into crm_doctor_roster values('"+linkedDoctor+"','00000000-0000-4000-8000-000000000001','mr-sahil-kochale',true);insert into crm_slots values('"+conflictingSlot+"','00000000-0000-4000-8000-000000000001','"+linkedDoctor+"',false,'"+future+"'::timestamptz+interval '15 minutes','"+future+"'::timestamptz+interval '45 minutes')");
 assert.throws(()=>sql("set role service_role;insert into crm_bookings(slot_id,original_slot_id,request_key,status) values('"+conflictingSlot+"','"+conflictingSlot+"','"+randomUUID()+"','confirmed')"),/docvy/);
 const legacyConflict={...approvalData,idempotencyKey:randomUUID(),mobile:'9000000009',networkHash:'c'.repeat(64),approvalOnly:true};
 const conflictRef=JSON.parse(sql(submit(legacyConflict)).split('\n').find(l=>l.startsWith('{'))).reference;
 const conflictId=sql("select id from docvy_booking_cases where reference='"+conflictRef+"'");
 assert.throws(()=>sql(confirmation(conflictId,sql("select starts_at from crm_slots where id='"+second+"'"))),/doctor_already_reserved/);
 const linkHash='d'.repeat(64),replacement='e'.repeat(64);
 const issue=hash=>"set role service_role;select docvy_booking_issue_doctor_link('"+confirmedId+"','"+actor+"','"+hash+"')";
 const report=status=>"set role service_role;select docvy_booking_doctor_report('"+replacement+"','"+status+"')";
 sql(issue(linkHash));const view=JSON.parse(sql("set role service_role;select docvy_booking_doctor_view('"+linkHash+"')").split('\n').find(l=>l.startsWith('{')));assert.equal(view.patientName,'Synthetic patient');assert(!('patient_mobile' in view));assert(!('patient_email' in view));assert(!('receiptKey' in view));
 sql(issue(replacement));assert.throws(()=>sql("select docvy_booking_doctor_view('"+linkHash+"')"));
 assert.throws(()=>sql(report('completed_verified')));assert.throws(()=>sql(report('completed_reported')));
 sql("update docvy_booking_cases set confirmed_starts_at=now()-interval '2 days' where id='"+confirmedId+"'");
 assert.throws(()=>sql(report('cancelled')),'Doctor cannot cancel a visit after it started');
 sql(report('completed_reported'));sql(report('completed_reported'));assert.throws(()=>sql(report('no_show_reported')));
 assert.equal(sql("select count(*) from docvy_booking_case_events where case_id='"+confirmedId+"' and note like 'Provider report via%'") ,'1');
 sql("update docvy_booking_doctor_links set expires_at=now()-interval '1 second' where token_hash='"+replacement+"'");assert.throws(()=>sql(report('completed_reported')));sql("update docvy_booking_doctor_links set expires_at=now()+interval '5 minutes' where token_hash='"+replacement+"'");
 sql("set role service_role;select docvy_booking_revoke_doctor_links('"+confirmedId+"','"+actor+"');");assert.throws(()=>sql(report('completed_reported')));
 assert.throws(()=>sql('set role anon;select * from docvy_booking_doctor_links'));assert.throws(()=>sql("set role authenticated;select docvy_booking_doctor_report('"+replacement+"','completed_reported')"));

 const remaining=requests.find(id=>id!==confirmedId),later=new Date(Date.parse(future)+2*3600000).toISOString();
 sql("update docvy_directory_providers set published=false where provider_id='mr-sahil-kochale'");assert.throws(()=>sql(confirmation(remaining,later)),/provider_no_longer_eligible/);sql("update docvy_directory_providers set published=true where provider_id='mr-sahil-kochale'");
 sql(confirmation(remaining,later));sql("set role service_role;select docvy_booking_issue_doctor_link('"+remaining+"','"+actor+"',repeat('b',64));select docvy_booking_doctor_report(repeat('b',64),'cancelled');");assert.equal(sql("select status from docvy_booking_cases where id='"+remaining+"'"),'cancelled');
 console.log('PASS: production-shaped Postgres fixture; instant booking race one winner; idempotency/payload binding; approval reserves actual slot; premature/doctor-only verification blocked; matching-token patient evidence; contradictory reports disputed; immutable audit; public access denial; active-session revocation; founder attribution summary; founder-only confirmation without clinic mapping; concurrent founder approvals one winner; private provider links, replacement/revocation, one-report-only and premature/forged verification denied.');
}finally{try{docker('stop',container);}catch{/* Preserve failure. */}}
