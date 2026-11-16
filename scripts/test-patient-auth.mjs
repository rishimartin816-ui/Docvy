import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const names=['DOCVY_PATIENT_AUTH_ENABLED','VERCEL_ENV','DOCVY_BOOKING_STAGING_EMAIL_TO'];
const saved=Object.fromEntries(names.map(n=>[n,process.env[n]]));const originalFetch=globalThis.fetch;
let match=true,allowed=true,accept=true,base='https://cxyscxjauxoizvvllmfu.supabase.co',sends=[],claims=0,generated=0;
const helper={jsonNoStore:(b,s=200)=>Response.json(b,{status:s}),publicBookingAuthConfig:()=>({url:base,anonKey:'public-test-key'}),clientFingerprint:()=> 'b'.repeat(64),generatePatientEmailCode:async()=>{generated++;return '123456';},bookingDb:async(path)=>path==='docvy_booking_cases'?(match?[{patient_email:'patient@example.invalid'}]:[]):(claims++,allowed)};
const mail={resendKey:()=> 'synthetic-transport',sendResendEmail:async(envelope,key)=>{sends.push({envelope,key});return {result:accept?'accepted':'failed'};}};
function load(file){const loaded={exports:{}};const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;vm.runInThisContext('(function(require,module,exports){'+source+'\n})')(id=>id==='@/lib/docvy-booking-server'?helper:id==='@/lib/resend-email'?mail:id==='server-only'?{}:require(id),loaded,loaded.exports);return loaded.exports;}
const route=load('app/api/booking/patient-auth/route.ts');
const input={action:'send',email:'patient@example.invalid',reference:'DV-1234567890ABCDEF'};
const request=(body=input,headers={})=>new Request('https://www.docvy.in/api/booking/patient-auth',{method:'POST',headers:{Origin:'https://www.docvy.in','Content-Type':'application/json','x-docvy-receipt':'dvpt_'+'a'.repeat(64),...headers},body:JSON.stringify(body)});
try {
 process.env.DOCVY_PATIENT_AUTH_ENABLED='true';process.env.VERCEL_ENV='production';
 assert.equal((await route.POST(request(input,{Origin:'https://evil.invalid'}))).status,403);
 assert.equal((await route.POST(request(input,{'x-docvy-receipt':''}))).status,401);
 match=false;assert.equal((await route.POST(request())).status,403);match=true;assert.equal(sends.length,0);assert.equal(claims,0);
 allowed=false;assert.equal((await route.POST(request())).status,429);allowed=true;
 const sent=await route.POST(request());assert.equal(sent.status,200);assert.deepEqual(await sent.json(),{sent:true});assert.equal(generated,1);assert.equal(sends[0].envelope.to,input.email);assert.equal(sends[0].envelope.from,'DOCVY <contact@docvy.in>');assert(sends[0].envelope.text.includes('123456'));
 accept=false;assert.equal((await route.POST(request())).status,503);accept=true;
 process.env.VERCEL_ENV='preview';process.env.DOCVY_BOOKING_STAGING_EMAIL_TO='approved@example.invalid';
 const before=generated;assert.equal((await route.POST(request())).status,503);assert.equal(generated,before,'Preview cannot generate a production OTP');
 base='https://pmyzedtpogmhvcrurcau.supabase.co';assert.equal((await route.POST(request())).status,200);assert.equal(sends.at(-1).envelope.to,'approved@example.invalid');assert(sends.at(-1).envelope.subject.startsWith('[STAGING]'));
 let status=200;globalThis.fetch=async(url,options)=>{assert.equal(new URL(url).pathname,'/auth/v1/verify');assert.equal(JSON.parse(options.body).type,'email');return Response.json(status===200?{access_token:'verified-test-session'}:{error:'invalid code'},{status});};
 const verified=await route.POST(request({...input,action:'verify',code:'123456'}));assert.equal(verified.status,200);assert.deepEqual(await verified.json(),{token:'verified-test-session'});
 status=400;assert.equal((await route.POST(request({...input,action:'verify',code:'000000'}))).status,400);
 console.log('PASS: receipt/contact-bound OTP, cross-origin and invalid-receipt denial, send/verify throttling, no OTP in responses, Resend failures, preview production denial and test-recipient isolation.');
} finally {globalThis.fetch=originalFetch;for(const n of names){if(saved[n]===undefined)delete process.env[n];else process.env[n]=saved[n];}}
