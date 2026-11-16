import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
let configured=true,actor=null,caseRow={clinic_id:'00000000-0000-4000-8000-000000000001',doctor_roster_id:'00000000-0000-4000-8000-000000000002',status:'confirmed'},calls=[];
const permission={id:'00000000-0000-4000-8000-000000000009',isAdmin:false,clinicIds:[],manageClinicIds:[],doctorIds:[],roles:[]};
const helper={bookingConfigured:()=>configured,patientReceiptKey:()=> 'dvpt_'+ 'a'.repeat(64),clientFingerprint:()=> 'f'.repeat(64),jsonNoStore:(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}}),verifiedBookingUser:async()=>actor,bookingPermissions:async()=>permission,bookingDb:async(path,options)=>{calls.push({path,options});if(path==='rpc/docvy_booking_submit'){assert(options.body.p_data);assert.equal(options.body.p_data.networkHash,'f'.repeat(64));assert.equal(options.body.p_data.patientKeyHash.length,64);return {reference:'DV-1234567890ABCDEF',status:'confirmed',mode:'instant'};}if(path==='docvy_booking_cases')return options.query?.get('select')==='patient_email,patient_mobile'?[{patient_email:'patient@example.invalid',patient_mobile:'9000000001'}]:[caseRow];if(path==='rpc/docvy_booking_patient_action')return{status:'completed_verified'};return[];}};
function load(file){const loaded={exports:{}};const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;const dep=id=>id==='@/lib/docvy-booking-server'?helper:require(id);vm.runInThisContext('(function(require,module,exports){'+source+'\n})')(dep,loaded,loaded.exports);return loaded.exports;}
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
 console.log('PASS: real route handlers with mocked transport: RPC payload contract, CSRF/consent, readiness gate, private receipt, independently verified matching contact, founder/viewer/doctor scope and server-derived actor.');
}finally{if(old===undefined)delete process.env.DOCVY_HYBRID_BOOKING_ENABLED;else process.env.DOCVY_HYBRID_BOOKING_ENABLED=old;}
