import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
let founderManaged=false,configured=true,actor=null,caseRow={clinic_id:'00000000-0000-4000-8000-000000000001',doctor_roster_id:'00000000-0000-4000-8000-000000000002',status:'confirmed'},calls=[];
const permission={id:'00000000-0000-4000-8000-000000000009',isAdmin:false,clinicIds:[],manageClinicIds:[],doctorIds:[],roles:[]};
const helper={founderManagedBooking:()=>founderManaged,bookingConfigured:()=>configured,patientReceiptKey:()=> 'dvpt_'+ 'a'.repeat(64),clientFingerprint:()=> 'f'.repeat(64),jsonNoStore:(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}}),verifiedBookingUser:async()=>actor,bookingPermissions:async()=>permission,bookingDb:async(path,options)=>{calls.push({path,options});if(path==='rpc/docvy_booking_submit'){assert(options.body.p_data);assert.equal(options.body.p_data.networkHash,'f'.repeat(64));assert.equal(options.body.p_data.patientKeyHash.length,64);return {reference:'DV-1234567890ABCDEF',status:options.body.p_data.approvalOnly?'requested':'confirmed',mode:options.body.p_data.approvalOnly?'approval':'instant'};}if(path==='docvy_booking_cases')return options.query?.get('select')==='patient_email,patient_mobile'?[{patient_email:'patient@example.invalid',patient_mobile:'9000000001'}]:[caseRow];if(path==='rpc/docvy_booking_patient_action')return{status:'completed_verified'};return[];}};
function load(file){const loaded={exports:{}};const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;const dep=id=>id==='@/lib/booking-notifications'?{kickBookingNotifications:()=>{},bookingNotificationHealth:async()=>({ready:false}),bookingEmailReady:()=>false,processBookingNotifications:async()=>{throw Error("Disabled dispatcher must not run");}}:id==='server-only'?{}:id==='@/lib/docvy-booking-server'?helper:id==='@/lib/booking-schedule'?load('lib/booking-schedule.ts'):require(id);vm.runInThisContext('(function(require,module,exports){'+source+'\n})')(dep,loaded,loaded.exports);return loaded.exports;}
const booking=load('app/api/booking/route.ts'),patient=load('app/api/booking/patient/route.ts'),admin=load('app/api/booking/admin/route.ts');
const request=(path,body,headers={})=>new Request('https://www.docvy.in'+path,{method:body?'POST':'GET',headers:{Origin:'https://www.docvy.in','Content-Type':'application/json',...headers},...(body?{body:JSON.stringify(body)}:{})});
const old=process.env.DOCVY_HYBRID_BOOKING_ENABLED;process.env.DOCVY_HYBRID_BOOKING_ENABLED='true';
try{
 const input={idempotencyKey:'00000000-0000-4000-8000-000000000010',providerId:'test-provider',name:'Synthetic patient',mobile:'9000000001',email:'patient@example.invalid',city:'Test city',facility:'Test clinic',slotId:'00000000-0000-4000-8000-000000000011',consent:true};
 assert.equal((await booking.POST(request('/api/booking',input,{Origin:'https://evil.invalid'}))).status,403);
 assert.equal((await booking.POST(request('/api/booking',{...input,consent:false}))).status,400);
 assert.equal((await booking.POST(request('/api/booking',{...input,providerId:'mr-sahil-kochale',city:'Online'}))).status,400);
 assert.equal((await booking.POST(request('/api/booking',{...input,providerId:'mr-sahil-kochale',city:'Pune'}))).status,400);
 const success=await booking.POST(request('/api/booking',input));assert.equal(success.status,201);assert.equal((await success.json()).receiptKey,'dvpt_'+'a'.repeat(64));
 configured=false;assert.equal((await booking.POST(request('/api/booking',input))).status,503);configured=true;
 assert.equal((await patient.GET(request('/api/booking/patient?reference=DV-1234567890ABCDEF'))).status,401);
 const receipt={'X-Docvy-Receipt':'dvpt_'+'a'.repeat(64),Authorization:'Bearer synthetic-session'};
 assert.equal((await patient.POST(request('/api/booking/patient',{reference:'DV-1234567890ABCDEF',action:'attended'},receipt))).status,401);
 actor={id:permission.id,email:'wrong@example.invalid',phone:null};assert.equal((await patient.POST(request('/api/booking/patient',{reference:'DV-1234567890ABCDEF',action:'attended'},receipt))).status,403);
 actor={id:permission.id,email:'patient@example.invalid',phone:null};assert.equal((await patient.POST(request('/api/booking/patient',{reference:'DV-1234567890ABCDEF',action:'attended'},receipt))).status,200);
 assert.equal(calls.at(-1).options.body.p_patient_actor,permission.id);
 assert.equal((await admin.GET(request('/api/booking/admin'))).status,401);
 permission.clinicIds=[caseRow.clinic_id];assert.equal((await admin.GET(request('/api/booking/admin'))).status,401,'Viewer must not gain patient access');
 permission.doctorIds=[caseRow.doctor_roster_id];calls=[];assert.equal((await admin.GET(request('/api/booking/admin'))).status,200);assert(calls.find(c=>c.path==='docvy_booking_cases').options.query.get('or').includes('doctor_roster_id.in.'));
 const transition={action:'transition',caseId:'00000000-0000-4000-8000-000000000003',status:'completed_reported',note:'Synthetic outcome'};
 assert.equal((await admin.POST(request('/api/booking/admin',transition))).status,200);assert.equal(calls.at(-1).options.body.p_actor,permission.id);
 caseRow={...caseRow,doctor_roster_id:'00000000-0000-4000-8000-000000000099'};assert.equal((await admin.POST(request('/api/booking/admin',transition))).status,403);

 founderManaged=true;
 assert.equal((await booking.POST(request('/api/booking',input))).status,400,'Cannot reserve instant slots in founder mode');
 const pendingInput={...input,slotId:'',requestedDate:new Date(Date.now()+2*86400000).toISOString().slice(0,10),requestedTime:'10:00'};
 const pendingResult=await booking.POST(request('/api/booking',pendingInput));assert.equal((await pendingResult.json()).status,'requested');assert.equal(calls.at(-1).options.body.p_data.approvalOnly,true);
 assert.equal((await admin.GET(request('/api/booking/admin'))).status,401,'Clinic members cannot access founder-managed appointments');
 assert.equal((await admin.POST(request('/api/booking/admin',transition))).status,401);
 permission.isAdmin=true;
 assert.equal((await admin.POST(request('/api/booking/admin',{action:'mode',providerId:'test-provider',mode:'instant'}))).status,409);
 const day=new Date(Date.now()+2*86400000);if(day.getUTCDay()===0)day.setUTCDate(day.getUTCDate()+1);const starts=day.toISOString().slice(0,10)+'T10:00:00+05:30';
 caseRow={...caseRow,status:'requested',provider_id:'dr-ambika-rao-jhunjhunu-68798490',city:'Jhunjhunu',facility:'Synthetic practice'};
 const approve={...transition,status:'confirmed',confirmedStart:starts,note:'Doctor confirmed availability directly with DOCVY'};
 assert.equal((await admin.POST(request('/api/booking/admin',approve))).status,400);
 assert.equal((await admin.POST(request('/api/booking/admin',{...approve,doctorConfirmed:true}))).status,200);assert.equal(calls.at(-1).path,'rpc/docvy_booking_founder_confirm');
 const doctor=load('app/api/booking/doctor/route.ts'),links=load('app/api/booking/admin/doctor-link/route.ts');
 assert.equal((await doctor.GET(request('/api/booking/doctor'))).status,401);
 const capability={'X-Docvy-Doctor-Link':'dvdr_'+'d'.repeat(64)};
 assert.equal((await doctor.POST(request('/api/booking/doctor',{status:'completed_verified'},capability))).status,400);
 assert.equal((await doctor.POST(request('/api/booking/doctor',{status:'completed_reported'},capability))).status,200);assert.equal(calls.at(-1).options.body.p_hash.length,64);
 assert.equal((await doctor.POST(request('/api/booking/doctor',{status:'completed_reported'},{...capability,Origin:'https://evil.invalid'}))).status,403);
 permission.isAdmin=false;assert.equal((await links.POST(request('/api/booking/admin/doctor-link',{caseId:transition.caseId,action:'issue'}))).status,403);
 permission.isAdmin=true;const issued=await links.POST(request('/api/booking/admin/doctor-link',{caseId:transition.caseId,action:'issue'}));assert.equal(issued.status,200);assert.match((await issued.json()).url,/#link=dvdr_[a-f0-9]{64}$/);assert.equal(calls.at(-1).options.body.p_hash.length,64);


 const notifications=load('app/api/booking/notifications/route.ts');const oldCron=process.env.CRON_SECRET;
 try{process.env.CRON_SECRET='synthetic-cron-secret-'.repeat(3);
 assert.equal((await notifications.GET(request('/api/booking/notifications'))).status,401);
 assert.equal((await notifications.GET(request('/api/booking/notifications',null,{Authorization:'Bearer '+process.env.CRON_SECRET}))).status,503,'Valid scheduler auth still respects disabled email gate');
 assert.equal((await notifications.GET(request('/api/booking/notifications',null,{Authorization:'Bearer '+('é'.repeat(process.env.CRON_SECRET.length))}))).status,401);
 assert.equal((await notifications.POST(request('/api/booking/notifications',{}, {Origin:'https://evil.invalid'}))).status,403);
 permission.isAdmin=false;assert.equal((await notifications.POST(request('/api/booking/notifications',{}))).status,403);permission.isAdmin=true;
 assert.equal((await notifications.POST(request('/api/booking/notifications',{}))).status,503);
 }finally{if(oldCron===undefined)delete process.env.CRON_SECRET;else process.env.CRON_SECRET=oldCron;}
 const savedFetch=globalThis.fetch;const names=['SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY','DOCVY_BOOKING_CLINIC_ACCESS_ENABLED','VERCEL_ENV','DOCVY_BOOKING_USE_CRM_STAGING','DOCVY_CRM_STAGING_URL','DOCVY_CRM_STAGING_KEY','CRON_SECRET'];const env=Object.fromEntries(names.map(name=>[name,process.env[name]]));let realAdmin=false,staffReads=0;
 try{
 process.env.SUPABASE_URL='https://cxyscxjauxoizvvllmfu.supabase.co';process.env.SUPABASE_SERVICE_ROLE_KEY='synthetic-local-transport-test';process.env.DOCVY_BOOKING_CLINIC_ACCESS_ENABLED='false';
 globalThis.fetch=async(url)=>{const path=new URL(url).pathname;if(path==='/auth/v1/user')return Response.json({id:permission.id,email:'founder@example.invalid',email_confirmed_at:new Date().toISOString()});if(path.endsWith('/docvy_booking_session_active'))return Response.json(true);if(path.endsWith('/docvy_is_directory_admin'))return Response.json(realAdmin);staffReads++;throw Error('Founder mode must not query clinic staff');};
 const server=load('lib/docvy-booking-server.ts');assert.equal(await server.bookingPermissions('synthetic-session'),null);realAdmin=true;const founder=await server.bookingPermissions('synthetic-session');assert.equal(founder.isAdmin,true);assert.equal(founder.roles.length,0);assert.equal(staffReads,0);
 process.env.CRON_SECRET='qa-secret-'.repeat(5);assert.equal(server.bookingSchedulerAuthorized(request('/api/booking/health')),false);assert.equal(server.bookingSchedulerAuthorized(request('/api/booking/health',null,{Authorization:'Bearer '+process.env.CRON_SECRET})),true);
 globalThis.fetch=async()=>Response.json({message:'private error details must never escape'},{status:403});const failedHealth=await server.bookingBackendHealth();assert.equal(failedHealth.healthy,false);assert.equal(failedHealth.reason,'booking_database_error_403');assert(!JSON.stringify(failedHealth).includes('private error'));assert(!JSON.stringify(failedHealth).includes(process.env.SUPABASE_SERVICE_ROLE_KEY));
 process.env.DOCVY_BOOKING_USE_CRM_STAGING='true';process.env.DOCVY_CRM_STAGING_URL='https://pmyzedtpogmhvcrurcau.supabase.co';process.env.DOCVY_CRM_STAGING_KEY='isolated-staging-test';delete process.env.SUPABASE_SERVICE_ROLE_KEY;
 process.env.VERCEL_ENV='production';assert.equal(server.bookingConfigured(),false,'Production cannot fall back to CRM staging key');
 process.env.VERCEL_ENV='preview';assert.equal(server.bookingConfigured(),true);
 globalThis.fetch=async(url,options)=>{assert.equal(new URL(url).hostname,'pmyzedtpogmhvcrurcau.supabase.co');assert.equal(options.headers.apikey,'isolated-staging-test');return Response.json([]);};await server.bookingDb('docvy_booking_cases');
 process.env.DOCVY_CRM_STAGING_URL='https://cxyscxjauxoizvvllmfu.supabase.co';assert.equal(server.bookingConfigured(),false,'Staging shortcut cannot point to production');await assert.rejects(()=>server.bookingDb('docvy_booking_cases'));
 }finally{globalThis.fetch=savedFetch;for(const name of names){if(env[name]===undefined)delete process.env[name];else process.env[name]=env[name];}}
 console.log('PASS: real route handlers with mocked transport: RPC payload contract, CSRF/consent, readiness gate, private receipt, independently verified matching contact, founder/viewer/doctor scope and server-derived actor; founder-only permission helper; pending-only requests; manual confirmation evidence; scoped doctor link creation/report protections.');
}finally{if(old===undefined)delete process.env.DOCVY_HYBRID_BOOKING_ENABLED;else process.env.DOCVY_HYBRID_BOOKING_ENABLED=old;}
