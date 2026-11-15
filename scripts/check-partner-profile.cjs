const assert=require("node:assert/strict"),fs=require("node:fs"),Module=require("node:module"),ts=require("typescript"),crypto=require("node:crypto");
require.extensions[".ts"]=require.extensions[".tsx"]=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,"utf8"),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText,file);
const original=Module._load;let token="owner",notifications=0;
Module._load=function(id,parent,...rest){if(id==="server-only")return {};if(id==="next/headers")return {cookies:()=>({get:()=>token?{value:token}:undefined})};if(id.startsWith("@/"))id=require("node:path").join(process.cwd(),id.slice(2));if(id.endsWith("partner-notification"))return {notifyPartnerApplication:async()=>{notifications++;return "not_configured";}};return original.call(this,id,parent,...rest);};
Object.assign(process.env,{DOCVY_DIRECTORY_INTAKE_ENABLED:"true",DOCVY_DIRECTORY_INTAKE_URL:"https://cxyscxjauxoizvvllmfu.supabase.co",DOCVY_DIRECTORY_INTAKE_KEY:"test-only-anon",DOCVY_DIRECTORY_WRITE_SECRET:"test-only-write-secret"});
const photo="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
const bytes=Buffer.from(photo.split(",")[1],"base64");
const base={requestId:"10000000-0000-4000-8000-000000000001",role:"doctor",doctorName:"Dr. Form Fixture",specialty:"General medicine",qualifications:"MBBS",experienceYears:"0",registrationNumber:"TEST-01",registrationCouncil:"Test Council",facility:"Fixture Clinic",address:"10 Fixture Road",city:"Delhi",state:"Delhi",postalCode:"110059",consultationFee:"0",workingDays:"Monday–Saturday",consultingHours:"9 AM–2 PM",practicePhone:"7042440793",email:"private@example.invalid",phone:"9876543210",consent:true,bio:"",photo};
const applications=new Map(),objects=new Map();let failPrivate=false,failPublic=false,approvalCalls=0;
global.fetch=async(input,options={})=>{
 const url=new URL(String(input)),path=url.pathname;
 if(path==="/rest/v1/rpc/docvy_directory_intake"){
  const signed=JSON.parse(options.body),data=JSON.parse(signed.p_body);assert.equal(signed.p_signature,crypto.createHmac("sha256","test-only-write-secret").update("partner:"+signed.p_timestamp+":"+signed.p_body).digest("hex"));assert(!data.payload.photo);let app=applications.get(data.requestId);if(!app){app={id:data.requestId,payload:data.payload,status:"pending"};applications.set(data.requestId,app);}else assert.deepEqual(app.payload,data.payload);
  return Response.json("PA-1234567890ABCDEF");
 }
 if(path==="/rest/v1/rpc/docvy_directory_admin_data"){if(options.headers.Authorization!=="Bearer owner")return Response.json({}, {status:403});return Response.json({applications:[...applications.values()]});}
 if(path==="/rest/v1/rpc/docvy_review_partner_application"){const body=JSON.parse(options.body),app=applications.get(body.p_id.toLowerCase());approvalCalls++;if(body.p_data.publishPhoto)app.payload.photoPublished=true;else app.status="approved";return Response.json("dr-form-fixture-delhi");}
 if(path.startsWith("/storage/v1/object/")){
  const key=path.slice("/storage/v1/object/".length);
  if(options.method==="POST"){if((failPrivate&&key.startsWith("docvy-profile-submissions/"))||(failPublic&&key.startsWith("docvy-provider-photos/")))return new Response(null,{status:500});if(key.startsWith("docvy-provider-photos/"))assert.equal(options.headers.Authorization,"Bearer owner");if(objects.has(key))return new Response(null,{status:409});objects.set(key,Buffer.from(options.body));return new Response(null,{status:200});}
  assert.equal(options.headers.Authorization,"Bearer owner");return objects.has(key)?new Response(objects.get(key)):new Response(null,{status:404});
 }
 throw new Error("Unexpected network call "+url);
};
const request=(body,origin="https://www.docvy.in")=>new Request("https://www.docvy.in/api/partner-application",{method:"POST",headers:{"Content-Type":"application/json",origin},body:JSON.stringify(body)});
(async()=>{
 const {POST}=require("../app/api/partner-application/route.ts");
 assert.equal((await POST(request(base,"https://example.invalid"))).status,403);
 for(const patch of [{qualifications:""},{experienceYears:""},{experienceYears:"-1"},{experienceYears:"81"},{photo:null},{photo:"data:image/webp;base64,YmFk"},{postalCode:"1234"},{postalCode:"1100599"},{consent:false},{practicePhone:"555"},{consultationFee:""}])assert.equal((await POST(request({...base,...patch}))).status,400,JSON.stringify(patch));
 assert.equal(require("../lib/partner-application.ts").partnerPayload({...base,address:"10\nFixture\tRoad"}).address,"10 Fixture Road");
 assert.equal(applications.size,0);assert.equal(objects.size,0);
 failPrivate=true;let result=await POST(request(base));assert.equal(result.status,502);assert((await result.json()).error.includes("PA-"));assert.equal(applications.size,1);assert.equal(notifications,0);
 failPrivate=false;result=await POST(request(base));assert.equal(result.status,201);assert.equal(notifications,1);assert.equal(applications.size,1);
 const app=applications.get(base.requestId);assert.equal(app.payload.experienceYears,0);assert.equal(app.payload.consultationFee,0);assert.equal(app.payload.practicePhone,"+917042440793");assert.equal(app.payload.phone,"+919876543210");assert(app.payload.mapsUrl.includes("google.com/maps/search/"));assert.equal(app.payload.bio,"");assert.equal(app.payload.photoSha256,crypto.createHash("sha256").update(bytes).digest("hex"));assert(objects.has("docvy-profile-submissions/partner/"+base.requestId+".webp"));assert(![...objects.keys()].some(k=>k.startsWith("docvy-provider-photos/")));
 const admin=require("../app/api/directory-admin/partner/route.ts").POST;
 const review=()=>request({applicationId:base.requestId,action:"approve",data:{confirmedConsent:true,evidence:"Fixture owner approved the supplied details."}});
 token="";assert.equal((await admin(review())).status,401);token="wrong";assert.equal((await admin(review())).status,403);assert.equal(approvalCalls,0);token="owner";
 const privatePath="docvy-profile-submissions/partner/"+base.requestId+".webp";objects.set(privatePath,Buffer.concat([bytes,Buffer.from("changed")]));assert.equal((await admin(review())).status,400);assert.equal(approvalCalls,0);objects.set(privatePath,bytes);
 failPublic=true;assert.equal((await admin(review())).status,502);assert.equal(app.status,"approved");assert(!app.payload.photoPublished);
 failPublic=false;assert.equal((await admin(review())).status,200);assert(app.payload.photoPublished);assert(objects.has("docvy-provider-photos/partner/"+base.requestId+".webp"));assert.equal(applications.size,1);
 const React=require("react"),html=require("react-dom/server").renderToStaticMarkup(React.createElement(require("../components/PartnerApplicationForm.tsx").default,{specialties:["General medicine"]}));
 for(const name of ["portrait","qualifications","experienceYears","address","city","state","postalCode","practicePhone","consultationFee","workingDays","consultingHours"])assert(new RegExp("<(?:input|textarea)[^>]*name=\""+name+"\"[^>]*required=\"\"").test(html),"Required "+name);
 assert(!/<textarea[^>]*name="bio"[^>]*required/.test(html));assert(html.includes("<details"));assert(!html.includes("portrait through the claim form"));
 let watermark="",closed=false;const canvas={width:0,height:0,getContext:()=>({drawImage(){},measureText:()=>({width:100}),fillRect(){},fillText(text){watermark=text;}}),toDataURL:()=>photo};
 global.createImageBitmap=async()=>({width:1200,height:1600,close(){closed=true;}});global.document={createElement:()=>canvas};
 assert.equal(await require("../lib/portrait-upload.ts").portraitData(new File(["fixture"],"fixture.jpg",{type:"image/jpeg"})),photo);assert.equal(canvas.width,900);assert.equal(canvas.height,1200);assert.equal(watermark,"DOCVY™");assert(closed);
 console.log("PASS: required fields, optional bio, zero fee/experience, signed intake, private photo, retries, owner-only review, photo integrity, public publication and form rendering");
})().catch(error=>{console.error(error);process.exitCode=1});
