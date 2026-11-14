const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const ts = require("typescript");
require.extensions[".ts"] = require.extensions[".tsx"] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename,"utf8"), {compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText,filename);
};
const doctor={...require("../docs/doctors/dr-ummed-kumar-meena.json"),profileStatus:"verified",consentGiven:true,consentDate:"2026-11-13T00:00:00Z",consentMethod:"owner_approval",registrationNumber:"5175",registrationCouncil:"GMC",verifiedAt:"2026-11-13T00:00:00Z",live:true,sourceUrl:"https://www.docvy.in/doctor/dr-ummed-kumar-meena",sourceChecked:"2026-11-13",photoUrl:"/uploads/dr-ummed-kumar-meena/docvy-watermarked.png",otherNcrLocations:[]};
let publishedDoctors=[doctor];
const originalLoad=Module._load;
Module._load=function(id,parent,...rest){
 if(id.startsWith("@/"))id=require("node:path").join(process.cwd(),id.slice(2));
 if(/public-directory(?:[.]ts)?$/.test(id))return {getDirectoryDoctors:async()=>publishedDoctors};
 return originalLoad.call(this,id,parent,...rest);
};
(async()=>{
 const {isVerified,ownedPortrait}=require("../lib/profile-policy.ts");
 const {filterDirectory,parseDirectoryFilters}=require("../lib/directory-filters.ts");
 const {doctorDescription,doctorStructuredData}=require("../lib/doctor-profile.ts");
 assert(isVerified(doctor)); assert(!isVerified({...doctor,registrationNumber:null}));assert(!isVerified({...doctor,verifiedAt:null}));assert(!isVerified({...doctor,consentGiven:false}));
 assert(ownedPortrait(doctor.photoUrl));assert(!ownedPortrait("https://example.com/portrait.jpg"));
 for(const city of ["Keri","Sankhalim","Poriem"])assert.equal(filterDirectory([doctor],parseDirectoryFilters({location:city,specialty:"general-medicine",q:"Ummed"})).length,1);
 assert.match(doctorDescription(doctor),/₹300/);
 const schema=doctorStructuredData(doctor);assert.equal(schema.location.length,3);assert.deepEqual(schema.location.map(l=>l.description),doctor.locations.map(l=>"Consulting hours: "+l.consultingHours+" IST. Please book in advance."));
 assert(!JSON.stringify(schema).includes("openingHoursSpecification"));assert.equal(schema.identifier.value,"5175");
 const DirectoryPage=require("../components/DirectoryPage.tsx").default;
 for(const slug of ["keri","sankhalim","poriem"]){const city=require("../lib/directory.ts").cities.find(c=>c.slug===slug);const cityHtml=require("react-dom/server").renderToStaticMarkup(await DirectoryPage({city}));assert(cityHtml.includes(doctor.id),"one approved profile must appear on "+slug);assert(cityHtml.includes("city="+city.name),"clinic context must match "+slug);}
 const DoctorCards=require("../components/DirectoryPage.tsx").DoctorCards;
 for(const location of doctor.locations){const cards=require("react-dom/server").renderToStaticMarkup(DoctorCards({doctors:[doctor],city:location.city.toLowerCase(),facility:location.facility,area:location.locality}));assert(cards.includes("city="+location.city),"filtered card request must preserve clinic "+location.city);}
 const page=require("../app/doctor/[slug]/page.tsx");
 const html=require("react-dom/server").renderToStaticMarkup(await page.default({params:{slug:doctor.id}}));
 for(const text of ["DOCVY Verified","5175","MBBS, Goa Medical College","Hindi, English, Marathi, Konkani","9 AM–2 PM","2 PM–5 PM","5 PM–9 PM","₹300","7062035381"])assert(html.includes(text),text);
 assert.equal((html.match(/Request appointment at this clinic/g)||[]).length,3);
 for(const l of doctor.locations)assert(html.includes("facility="+encodeURIComponent(l.facility).replace(/%20/g,"+")) || html.includes("facility="+encodeURIComponent(l.facility)));
 assert.equal((await page.generateMetadata({params:{slug:doctor.id}})).alternates.canonical,"/doctor/"+doctor.id);
 assert(!html.includes("Marketing consent"));
 assert(!/does not reserve|no slot is reserved|not a guarantee/i.test(html));
 assert.equal(doctor.locations.find(l=>l.city==="Poriem").mapsUrl,"https://share.google/ucjb9ymNGUxndUkqX");
 assert.equal((html.match(/href="https:\/\/share.google\/ucjb9ymNGUxndUkqX"/g)||[]).length,1);
 assert(!html.includes("supplied Maps link"));
 const hassan={...require("../docs/doctors/dr-hassan-ishtiyaque-ali.json"),profileStatus:"verified",consentGiven:true,consentMethod:"owner_approval",verifiedAt:"2026-11-14T00:00:00Z",live:true,sourceUrl:"https://www.docvy.in/doctor/dr-hassan-ishtiyaque-ali",sourceChecked:"2026-11-14",otherNcrLocations:[]};
 publishedDoctors=[hassan];
 assert(isVerified(hassan));
 const hassanHtml=require("react-dom/server").renderToStaticMarkup(await page.default({params:{slug:hassan.id}}));
 const mumbaiHtml=require("react-dom/server").renderToStaticMarkup(await DirectoryPage({city:require("../lib/directory.ts").cities.find(c=>c.slug==="mumbai")}));assert(mumbaiHtml.includes(hassan.id));assert(!mumbaiHtml.includes("coverage in Mumbai is coming soon"));
 assert(hassanHtml.includes("DOCVY Verified"));assert(hassanHtml.includes("2022076184"));
 assert(!/independent council check|does not reserve|not a guarantee/i.test(hassanHtml));

 const basab={...require("../docs/doctors/dr-basab-raj-ghosh.json"),profileStatus:"verified",consentGiven:true,consentMethod:"owner_approval",verifiedAt:"2026-11-14T00:00:00Z",live:true,sourceUrl:"https://www.docvy.in/doctor/dr-basab-raj-ghosh",sourceChecked:"2026-11-14",otherNcrLocations:[]};
 publishedDoctors=[basab];
 assert(isVerified(basab));assert(ownedPortrait(basab.photoUrl));
 const basabHtml=require("react-dom/server").renderToStaticMarkup(await page.default({params:{slug:basab.id}}));
 for(const text of ["Dr. Basab Raj Ghosh","DOCVY Verified","53433","West Bengal Medical Council","69 Amarendra Sarani","Uttarpara","9830747929","Sunday: opens at 9 AM"])assert(basabHtml.includes(text),text);
 assert(basabHtml.includes('href="https://share.google/tsHnih3aKCuirfG2R"'));
 assert(!basabHtml.includes("Consultation fee:"));assert(!basabHtml.includes(">Languages<"));assert(!basabHtml.includes("27.12.1971"));
 assert.equal((basabHtml.match(/Request appointment at this clinic/g)||[]).length,1);
 assert.equal(doctorStructuredData(basab).location.length,1);
 const uttarparaHtml=require("react-dom/server").renderToStaticMarkup(await DirectoryPage({city:require("../lib/directory.ts").cities.find(c=>c.slug==="uttarpara")}));
 assert(uttarparaHtml.includes(basab.id));assert(uttarparaHtml.includes("city=Uttarpara"));

 const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(require("node:path").join(dir,e.name)):[require("node:path").join(dir,e.name)]);
 for(const file of ["app","components","lib"].flatMap(walk).filter(f=>/\.tsx?$/.test(f))){
  assert(!/does not reserve (?:a slot|or confirm)|no slot is reserved|not a guarantee/i.test(fs.readFileSync(file,"utf8")),"Obsolete reservation copy: "+file);
 }

 console.log("PASS: verified policy, three city/specialty matches, complete profile rendering, three clinic request links, SEO and no invented weekdays/slots");
})().catch(error=>{console.error(error);process.exitCode=1});
