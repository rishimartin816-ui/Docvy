import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);const {NextRequest,NextResponse}=require('next/server');
let staging=true,auth=true,allowed=false,calls=[];
const helper={requestToken:r=>r.headers.get('authorization')?.slice(7),database:async(path,body,token)=>{calls.push({path,body,token});if(path==='/auth/v1/user')return Response.json(auth?{id:'00000000-0000-4000-8000-000000000001'}:{error:'invalid'},{status:auth?200:401});if(path.startsWith('/rest/v1/crm_founders'))return Response.json(allowed?[{user_id:'test'}]:[]);if(path.includes('crm_request_slot'))return Response.json('DV-TEST');if(path.includes('crm_mock_notifications'))return Response.json(1);return Response.json([]);}};
const exports={};const loadedModule={exports};
const source=ts.transpileModule(fs.readFileSync('app/api/booking/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const dep=id=>id==='next/server'?{NextRequest,NextResponse}:id==='@/lib/crm-server'?helper:id==='@/lib/clinic-crm-config'?{crmUuid:/^[0-9a-f-]{36}$/i,clinicCrmConfig:()=>({staging,clinicId:'test'})}:require(id);
vm.runInThisContext('(function(require,module,exports){'+source+'\n})')(dep,loadedModule,exports);
const req=(path='',body,token)=>new NextRequest('http://localhost/api/booking'+path,{method:body?'POST':'GET',headers:{Origin:'http://localhost',...(token?{Authorization:'Bearer '+token}:{}),'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
const prior=process.env.DOCVY_BOOKING_WORKFLOW_ENABLED;process.env.DOCVY_BOOKING_WORKFLOW_ENABLED='true';
try{
 assert.equal((await exports.GET(req('?dashboard'))).status,403);
 auth=false;assert.equal((await exports.GET(req('?dashboard',null,'forged'))).status,403);
 auth=true;assert.equal((await exports.GET(req('?dashboard',null,'valid-staff'))).status,403);
 allowed=true;assert.equal((await exports.GET(req('?dashboard',null,'founder'))).status,200);
 const mock=await(await exports.POST(req('',{action:'mock-notifications'},'founder'))).json();assert.equal(mock.externalMessagesSent,0);
 allowed=false;assert.equal((await exports.POST(req('',{action:'mock-notifications'},'staff'))).status,403);
 const body={requestId:'00000000-0000-4000-8000-000000000002',slot:'00000000-0000-4000-8000-000000000003',name:'Synthetic test',phone:'+919000000001',email:'test@example.invalid',consent:true};
 assert.equal((await exports.POST(req('',{...body,actor:'forged'}))).status,400);
 assert.equal((await exports.POST(req('',{...body,consent:false}))).status,400);
 const result=await exports.POST(req('',body));assert.equal(result.status,201);assert.equal((await result.json()).confirmed,false);
 assert.equal((await exports.POST(new NextRequest('http://localhost/api/booking',{method:'POST',body:JSON.stringify(body)}))).status,403);
 staging=false;assert.equal((await exports.GET(req())).status,404);assert.equal((await exports.POST(req('',body))).status,404);
 assert(calls.some(c=>c.path==='/auth/v1/user'));console.log('PASS: API founder/session checks, nonfounder denial, CSRF, body allowlist/consent, pending-only response, mock-only notifications and production guard (mock database transport).');
}finally{if(prior===undefined)delete process.env.DOCVY_BOOKING_WORKFLOW_ENABLED;else process.env.DOCVY_BOOKING_WORKFLOW_ENABLED=prior;}
