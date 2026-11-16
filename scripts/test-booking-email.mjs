import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {createRequire} from 'node:module';
import {createHash,randomUUID} from 'node:crypto';
const require=createRequire(import.meta.url),loaded=new Map();
let jobs=[],calls=[],prepared=new Map(),status='requested',responseAt=null,httpStatus=200,requests=[];
const receipt='dvpt_'+'a'.repeat(64);
const server={patientReceiptKey:()=>receipt,bookingDb:async(path,options)=>{
 calls.push({path,options});
 if(path==='rpc/docvy_booking_claim_notifications'){const result=jobs;jobs=[];return result;}
 if(path==='docvy_booking_cases')return [{status,patient_response_at:responseAt}];
 if(path==='rpc/docvy_booking_prepare_email'){if(!prepared.has(options.body.p_id))prepared.set(options.body.p_id,options.body.p_envelope);return prepared.get(options.body.p_id);}
 return true;
}};
function load(file){if(loaded.has(file))return loaded.get(file);const m={exports:{}};const js=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;const dep=id=>id==='server-only'?{}:id==='@/lib/docvy-booking-server'?server:id==='@/lib/resend-email'?load('lib/resend-email.ts'):id==='@vercel/functions'?{waitUntil:()=>{}}:require(id);vm.runInThisContext('(function(require,module,exports){'+js+'\n})')(dep,m,m.exports);loaded.set(file,m.exports);return m.exports;}
const keys=['RESEND_API_KEY','resend_api_key','VERCEL_ENV','DOCVY_BOOKING_EMAIL_ENABLED','DOCVY_HYBRID_BOOKING_ENABLED','DOCVY_BOOKING_PATIENT_SECRET','SUPABASE_URL','DOCVY_BOOKING_STAGING_EMAIL_TO','DOCVY_BOOKING_STAGING_SITE_URL','DOCVY_BOOKING_ALERT_EMAIL'];
const saved=Object.fromEntries(keys.map(k=>[k,process.env[k]])),fetchBefore=globalThis.fetch;
const make=(id,recipient='patient')=>({id,case_id:randomUUID(),claim_token:randomUUID(),status:'requested',recipient_type:recipient,delivery_payload:{reference:'DV-1234567890ABCDEF',doctor:'Synthetic doctor',city:'Test city',facility:'Test practice',patientEmail:'patient@example.invalid',startsAt:null,preferredDate:'2026-12-01',preferredTime:'10:00',idempotencyKey:randomUUID(),patientHash:createHash('sha256').update(receipt).digest('hex'),event:'requested'}});
try{
 delete process.env.RESEND_API_KEY;process.env.resend_api_key='synthetic-not-a-real-key';process.env.VERCEL_ENV='production';process.env.DOCVY_BOOKING_EMAIL_ENABLED='false';process.env.DOCVY_HYBRID_BOOKING_ENABLED='true';process.env.DOCVY_BOOKING_PATIENT_SECRET='synthetic-secret-'.repeat(3);
 globalThis.fetch=async(url,options)=>{assert.equal(String(url),'https://api.resend.com/emails');assert.equal(options.headers.Authorization,'Bearer synthetic-not-a-real-key');requests.push({body:options.body,key:options.headers['Idempotency-Key']});return httpStatus===200?Response.json({id:'00000000-0000-4000-8000-000000000001'}):Response.json({error:'Do not persist raw provider body'},{status:httpStatus});};
 const worker=load('lib/booking-notifications.ts');assert.equal(worker.bookingEmailReady(),false);await assert.rejects(worker.processBookingNotifications());assert.equal(calls.length,0);
 process.env.DOCVY_BOOKING_EMAIL_ENABLED='true';assert.equal(worker.bookingEmailReady(),true);
 const patient=make(1);jobs=[patient];let result=await worker.processBookingNotifications();assert.equal(result.accepted,1);let email=JSON.parse(requests.at(-1).body);assert.equal(email.from,'DOCVY <contact@docvy.in>');assert.deepEqual(email.to,['patient@example.invalid']);assert.match(email.text,/No slot is reserved/);assert.match(email.text,/#reference=DV-1234567890ABCDEF&receipt=dvpt_/);assert(!prepared.get(1).text.includes(receipt));assert.equal(calls.at(-1).options.body.p_result,'accepted');assert.equal(calls.at(-1).options.body.p_provider_id,'00000000-0000-4000-8000-000000000001');
 const founder=make(2,'admin');process.env.DOCVY_BOOKING_ALERT_EMAIL='founder@example.invalid';httpStatus=429;jobs=[founder];result=await worker.processBookingNotifications();assert.equal(result.retry,1);const first=requests.at(-1);process.env.DOCVY_BOOKING_ALERT_EMAIL='changed@example.invalid';httpStatus=200;jobs=[{...founder,claim_token:randomUUID()}];await worker.processBookingNotifications();assert.equal(requests.at(-1).body,first.body);assert.equal(requests.at(-1).key,first.key);assert(!JSON.parse(first.body).text.includes(receipt));
 httpStatus=403;jobs=[make(3)];result=await worker.processBookingNotifications();assert.equal(result.failed,1);assert.equal(calls.at(-1).options.body.p_error,'resend_http_403');httpStatus=200;
 const count=requests.length;status='cancelled';jobs=[{...make(4),status:'confirmed'}];assert.equal((await worker.processBookingNotifications()).skipped,1);assert.equal(requests.length,count);status='requested';
 const invalid=make(5);invalid.delivery_payload.patientHash='b'.repeat(64);jobs=[invalid];assert.equal((await worker.processBookingNotifications()).failed,1);assert.equal(requests.length,count);
 process.env.VERCEL_ENV='preview';process.env.SUPABASE_URL='https://cxyscxjauxoizvvllmfu.supabase.co';process.env.DOCVY_BOOKING_STAGING_EMAIL_TO='stage@example.invalid';process.env.DOCVY_BOOKING_STAGING_SITE_URL='https://docvy-synthetic-test.vercel.app';assert.equal(worker.bookingEmailReady(),false,'Preview cannot email production data');
 process.env.SUPABASE_URL='https://pmyzedtpogmhvcrurcau.supabase.co';assert.equal(worker.bookingEmailReady(),true);jobs=[make(6)];await worker.processBookingNotifications();email=JSON.parse(requests.at(-1).body);assert.deepEqual(email.to,['stage@example.invalid']);assert.match(email.subject,/^\[STAGING\]/);assert.match(email.text,/https:\/\/docvy-synthetic-test.vercel.app\/appointments\/track/);
 const stageKey=requests.at(-1).key;prepared.delete(6);process.env.VERCEL_ENV='production';jobs=[make(6)];await worker.processBookingNotifications();assert.notEqual(requests.at(-1).key,stageKey,'Independent database job IDs cannot collide in the shared Resend account');assert.equal(stageKey,'docvy-booking/staging/6');assert.equal(requests.at(-1).key,'docvy-booking/production/6');
 console.log('PASS: actual Resend adapter/dispatcher with fake transport only; existing lowercase key; contact@ sender; pending wording; frozen retry body and idempotency; API acceptance recorded; temporary/permanent errors; superseded events skipped; receipt secret protected; preview cannot use production DB and rewrites all recipients. No real emails sent.');
}finally{globalThis.fetch=fetchBefore;for(const key of keys){if(saved[key]===undefined)delete process.env[key];else process.env[key]=saved[key];}}
