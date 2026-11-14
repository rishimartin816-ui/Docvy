const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),ts=require("typescript");
require.extensions[".ts"]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,"utf8"),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,f);
const {cities,citySlug,specialtySlug}=require("../lib/directory.ts");
const origin=(process.argv[2]||"https://www.docvy.in").replace(/\/$/,"");
const doctors=fs.readdirSync(path.join(__dirname,"../docs/doctors")).filter(name=>name.endsWith(".json")).map(name=>require("../docs/doctors/"+name));
const forbidden=/does not reserve (?:a slot|or confirm)|no slot is reserved|not a guarantee|independent council check has not yet/i;
const pages=new Map(),urls=new Set(),issues=[];
async function get(url){const response=await fetch(url,{signal:AbortSignal.timeout(30000)});return {url,status:response.status,body:await response.text()};}
const add=p=>urls.add(new URL(p,origin).href);
function publicPages(dir){for(const file of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,file.name);if(file.isDirectory())publicPages(p);else if(file.name==="page.tsx"){const route="/"+path.relative("app",path.dirname(p)).split(path.sep).filter(Boolean).join("/");if(!route.includes("[")&&!/^\/(?:api|admin|crm)(?:\/|$)/.test(route)&&!route.startsWith("/request/test"))add(route);}}}
(async()=>{
 const site=await get(origin+"/sitemap.xml");assert.equal(site.status,200);
 for(const m of site.body.matchAll(/<loc>([^<]+)<\/loc>/g))urls.add(m[1].replaceAll("&amp;","&").replaceAll("&#x27;",String.fromCharCode(39)).replaceAll("&#39;",String.fromCharCode(39)));
 publicPages("app");
 for(const city of cities)add("/doctors/"+city.slug);
 for(const doctor of doctors){
  add("/doctor/"+doctor.id);
  for(const l of doctor.locations){
   add("/request?"+new URLSearchParams({provider:doctor.id,city:l.city,facility:l.facility}));
   add("/doctors?"+new URLSearchParams({location:citySlug(l.city),q:doctor.name}));
   if(cities.some(c=>c.slug===citySlug(l.city)))for(const specialty of doctor.specialties)add("/doctors/"+citySlug(l.city)+"/"+specialtySlug(specialty));
  }
 }
 const pending=[...urls];let completed=0;
 await Promise.all(Array.from({length:5},async()=>{while(pending.length){const url=pending.shift();try{const r=await get(url);if(r.status!==200)issues.push({url,status:r.status});if(forbidden.test(r.body))issues.push({url,error:"Obsolete warning text"});pages.set(url,r.body);completed++;if(completed%25===0)console.log("Checked",completed,"public pages");}catch(e){issues.push({url,error:e.message});}}}));
 assert.deepEqual(issues,[]);
 for(const doctor of doctors){
  const h=pages.get(origin+"/doctor/"+doctor.id);assert(h.includes("DOCVY Verified"),doctor.name+" badge");assert(h.includes('rel="canonical" href="'+origin+"/doctor/"+doctor.id+'"'),doctor.name+" canonical");
  const schema=[...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])).find(s=>s["@type"]===(doctor.specialties.some(specialty=>/physiotherapy/i.test(specialty))?"MedicalBusiness":doctor.specialties.includes("Dentistry")?"Dentist":"Physician"));
  assert(schema);assert.equal(schema.location.length,doctor.locations.length);
  for(const l of doctor.locations){
   const url=origin+"/request?"+new URLSearchParams({provider:doctor.id,city:l.city,facility:l.facility});
   const r=pages.get(url);const selected=[...r.matchAll(/<option[^>]*value="([^"]*)"[^>]*selected=""[^>]*>/g)].map(m=>m[1].replaceAll("&amp;","&").replaceAll("&#x27;",String.fromCharCode(39)).replaceAll("&#39;",String.fromCharCode(39)));
   assert(selected.includes(doctor.id+"::"+l.city+"::"+l.facility),"Selected clinic "+l.city);if(l.consultingHours)assert(r.includes(l.consultingHours),"Clinic hours "+l.city);
  }
 }
 const ummed=pages.get(origin+"/doctor/dr-ummed-kumar-meena");
 assert.equal((ummed.match(/href="https:\/\/share.google\/ucjb9ymNGUxndUkqX"/g)||[]).length,1);
 assert(ummed.includes('href="https://share.google/ucjb9ymNGUxndUkqX" target="_blank" rel="noopener noreferrer">Google Maps directions</a>'));
 assert(!ummed.includes("supplied Maps link"));
 assert(ummed.includes("https://share.google/FHX61ImYEx8b46pZm"));
 const report={checkedAt:new Date().toISOString(),origin,publicPages:completed,doctorProfiles:doctors.length,clinicSelections:doctors.reduce((n,d)=>n+d.locations.length,0),issues};
 fs.mkdirSync(".vercel",{recursive:true});fs.writeFileSync(".vercel/doctor-profile-release-check.json",JSON.stringify(report,null,2));console.log("PASS",JSON.stringify(report));
})().catch(e=>{console.error(e);process.exitCode=1;});
