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
 if(id==="server-only")return {};
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
 assert(!/\bCV\b|supplied (?:CV|documents)|listed in his/i.test(basab.summary),"Public biography must use professional patient-facing wording");
 assert(isVerified(basab));assert(ownedPortrait(basab.photoUrl));
 const basabHtml=require("react-dom/server").renderToStaticMarkup(await page.default({params:{slug:basab.id}}));
 for(const text of ["Dr. Basab Raj Ghosh","DOCVY Verified","53433","West Bengal Medical Council","69 Amarendra Sarani","Uttarpara","9830747929","Sunday: opens at 9 AM"])assert(basabHtml.includes(text),text);
 assert(basabHtml.includes('href="https://share.google/tsHnih3aKCuirfG2R"'));
 assert(!basabHtml.includes("Consultation fee:"));assert(!basabHtml.includes(">Languages<"));assert(!basabHtml.includes("27.12.1971"));
 assert.equal((basabHtml.match(/Request appointment at this clinic/g)||[]).length,1);
 assert.equal(doctorStructuredData(basab).location.length,1);
 const uttarparaHtml=require("react-dom/server").renderToStaticMarkup(await DirectoryPage({city:require("../lib/directory.ts").cities.find(c=>c.slug==="uttarpara")}));
 assert(uttarparaHtml.includes(basab.id));assert(uttarparaHtml.includes("city=Uttarpara"));


 const ambika={...require("../docs/doctors/dr-ambika-rao-jhunjhunu-68798490.json"),profileStatus:"verified",consentGiven:true,consentMethod:"owner_approval",verifiedAt:"2026-11-15T00:00:00Z",live:true,sourceUrl:"https://www.docvy.in/doctor/dr-ambika-rao-jhunjhunu-68798490",sourceChecked:"2026-11-15",otherNcrLocations:[]};
 publishedDoctors=[ambika];
 const ambikaHtml=require("react-dom/server").renderToStaticMarkup(await page.default({params:{slug:ambika.id}}));
 for(const text of ["Dr. Ambika Rao","Homoeopathy","NDDY","DNHE","Diploma in Acupressure","13 years","Rajasthan","5797","DOCVY Verified"])assert(ambikaHtml.includes(text),text);
 for(const detail of ["BHMS","300","9 AM–6 PM","Hindi","8875722419"])assert(ambikaHtml.includes(detail),detail);assert(ambikaHtml.includes('href="tel:+918875722419"'));assert(!ambikaHtml.includes("As supplied"));
 assert.equal(doctorStructuredData(ambika).location[0].address.addressRegion,"Rajasthan");assert.equal(doctorStructuredData(ambika)["@type"],"MedicalBusiness");
 assert.equal(filterDirectory([ambika],parseDirectoryFilters({q:"Rajasthan NDDY",specialty:"homoeopathy"})).length,1);
 const ambikaCard=require("react-dom/server").renderToStaticMarkup(DoctorCards({doctors:[ambika]}));assert(ambikaCard.includes("Rajasthan"));assert(ambikaCard.includes("NDDY"));
 const ambikaCity=require("react-dom/server").renderToStaticMarkup(await DirectoryPage({city:require("../lib/directory.ts").cities.find(c=>c.slug==="jhunjhunu")}));
 assert(ambikaCity.includes(ambika.id));assert(ambikaCity.includes("city=Jhunjhunu"));
 for(const entry of [doctor,hassan,basab,ambika]){assert(entry.locations.every(l=>l.state));assert(doctorDescription(entry).includes(entry.locations[0].state));}


 const experienceFigures={"dr-ambika-rao-jhunjhunu-68798490":13,"dr-anil-kumar-physiotherapist-delhi":2,"dr-hassan-ishtiyaque-ali":4,"dr-ummed-kumar-meena":4,"dr-basab-raj-ghosh":31,"bheemreddy-vivek-reddy-karimnagar-24773aea":null};
 for(const [id,years] of Object.entries(experienceFigures)){
  const entry={...require("../docs/doctors/"+id+".json"),consentGiven:true,consentMethod:"owner_approval",verifiedAt:"2026-11-15",live:true,otherNcrLocations:[]};publishedDoctors=[entry];
  const profileHtml=require("react-dom/server").renderToStaticMarkup(await page.default({params:{slug:id}}));
  const cardHtml=require("react-dom/server").renderToStaticMarkup(DoctorCards({doctors:[entry]}));
  for(const rendered of [profileHtml,cardHtml]){if(years!=null){assert(rendered.includes("doctor-experience"));assert(rendered.includes(years+" Years of Experience"),id+" experience highlight");}else assert(!rendered.includes("doctor-experience"),id+" must not invent experience");}
 }


 const sahil=require("../lib/directory-normalization.ts").normalizeDoctor({...require("../docs/doctors/mr-sahil-kochale.json"),consentGiven:true,consentMethod:"owner_approval",verifiedAt:"2026-11-15",live:true,otherNcrLocations:[]});
 publishedDoctors=[sahil];assert.equal(sahil.name,"Mr. Sahil Kochale");assert(isVerified(sahil));assert.equal(sahil.locations.length,2);
 const sahilHtml=require("react-dom/server").renderToStaticMarkup(await page.default({params:{slug:sahil.id}}));
 for(const text of ["Mr. Sahil Kochale","1 Year of Experience","A120710","Rehabilitation Council of India","1200","Malvi","Nimadi","7648968141","Request Online Consultation","Monday–Sunday"])assert(sahilHtml.includes(text),text);
 assert(!sahilHtml.includes("Dr. Sahil"));assert(!sahil.locations.some(l=>l.consultingHours));
 const data=doctorStructuredData(sahil);assert.equal(data["@type"],"MedicalBusiness");assert.equal(data.location[1]["@type"],"VirtualLocation");assert(!("address" in data.location[1]));
 for(const specialty of ["clinical-psychology","rehabilitation-psychology"])assert.equal(filterDirectory([sahil],parseDirectoryFilters({location:"Indore",specialty,q:"CBT anxiety"})).length,1);
 assert.equal(require("../lib/facilities.ts").facilitiesFrom([sahil]).length,1);
 const Booking=require("../components/AppointmentRequestForm.tsx").default;
 for(const location of sahil.locations){const booking=require("react-dom/server").renderToStaticMarkup(require("react").createElement(Booking,{doctors:[sahil],initialProvider:sahil.id,initialCity:location.city,initialFacility:location.facility,enabled:true}));assert(booking.includes(sahil.id+"::"+location.city+"::"+location.facility));assert(booking.includes("Working days:"));assert(!booking.includes("Consulting hours:"));}


 const {practiceLocationLabel,canonicalClinicName}=require("../lib/practice-labels.ts");
 assert.equal(practiceLocationLabel({city:"Delhi",state:"Delhi"}),"Delhi");
 assert.equal(practiceLocationLabel({city:"Delhi",state:"DELHI",locality:"Uttam Nagar"},true),"Uttam Nagar, Delhi");
 assert.equal(practiceLocationLabel({city:"Uttarpara",state:"West Bengal"}),"Uttarpara, West Bengal");
 const allCities=require("../lib/directory.ts").availableCities([doctor]);assert(allCities.every(c=>c.count>0));
 for(const slug of ["sankhalim","poriem"])assert.equal(allCities.find(c=>c.slug===slug).count,1);
 assert(!require("../lib/directory.ts").availableCities([basab]).some(c=>["sankhalim","poriem"].includes(c.slug)));
 assert.deepEqual(basab.specialties,["Radiation oncology"]);
 assert.deepEqual(require("../lib/directory-normalization.ts").normalizeDoctor(basab).specialties,["Radiation oncology"]);
 assert.equal(basab.hospital,"Dr. Basab Raj Ghosh's Clinic");
 const Filters=require("../components/DirectoryFilters.tsx").default;
 const filterHtml=require("react-dom/server").renderToStaticMarkup(require("react").createElement(Filters,{query:"",city:"",facility:"",area:"",specialty:"",cities:allCities,specialties:[],places:doctor.locations.map(l=>({city:l.city,citySlug:l.city.toLowerCase(),facility:l.facility,area:l.locality||""}))}));
 assert(filterHtml.includes("Specialty (optional)"));assert(filterHtml.includes("Hospital or clinic (optional)"));assert(!/<(?:input|select)[^>]*\brequired/.test(filterHtml));assert(filterHtml.includes("Sankhalim (1)"));assert(filterHtml.includes("Poriem (1)"));
 const card=require("react-dom/server").renderToStaticMarkup(DoctorCards({doctors:[doctor]}));assert.equal((card.match(/Book an appointment/g)||[]).length,2);assert(!card.includes("Request appointment"));
 const anil={...require("../docs/doctors/dr-anil-kumar-physiotherapist-delhi.json"),consentGiven:true,consentMethod:"owner_approval",verifiedAt:"2026-11-15",live:true,otherNcrLocations:[]};publishedDoctors=[anil];
 const anilHtml=require("react-dom/server").renderToStaticMarkup(await page.default({params:{slug:anil.id}}));assert(!anilHtml.includes("Delhi, Delhi"));assert(!(await page.generateMetadata({params:{slug:anil.id}})).title.includes("Delhi, Delhi"));assert(!doctorDescription(anil).includes("Delhi, Delhi"));
 const legacyName="Dr Basab Raj Ghosh's clinic";assert.equal(canonicalClinicName(legacyName),basab.hospital);
 const legacyBooking=require("react-dom/server").renderToStaticMarkup(require("react").createElement(require("../components/AppointmentRequestForm.tsx").default,{doctors:[basab],initialProvider:basab.id,initialCity:"Uttarpara",initialFacility:legacyName,enabled:true}));
 assert(/<option[^>]*selected=""[^>]*>Dr\. Basab Raj Ghosh/.test(legacyBooking)||legacyBooking.includes('selected=""'));
 publishedDoctors=[basab];Object.assign(process.env,{DOCVY_DIRECTORY_INTAKE_ENABLED:"true",DOCVY_DIRECTORY_INTAKE_URL:"https://cxyscxjauxoizvvllmfu.supabase.co",DOCVY_DIRECTORY_INTAKE_KEY:"test-only",DOCVY_DIRECTORY_WRITE_SECRET:"test-only"});
 const oldFetch=global.fetch;let savedPayload;
 global.fetch=async(input,options)=>{assert(String(input).endsWith("/rest/v1/rpc/docvy_directory_intake"));savedPayload=JSON.parse(JSON.parse(options.body).p_body).payload;return Response.json("DV-1234567890ABCDEF");};
 try{const result=await require("../app/api/appointment-request/route.ts").POST(new Request("https://www.docvy.in/api/appointment-request",{method:"POST",headers:{"Content-Type":"application/json",Origin:"https://www.docvy.in"},body:JSON.stringify({providerId:basab.id,city:"Uttarpara",facility:legacyName,name:"Local Booking Fixture",mobile:"9876543210",consent:true,requestId:"10000000-0000-4000-8000-000000000001"})}));assert.equal(result.status,201);assert.equal(savedPayload.facility,basab.hospital);}finally{global.fetch=oldFetch;}

 const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(require("node:path").join(dir,e.name)):[require("node:path").join(dir,e.name)]);
 for(const file of ["app","components","lib"].flatMap(walk).filter(f=>/\.tsx?$/.test(f))){
  assert(!/does not reserve (?:a slot|or confirm)|no slot is reserved|not a guarantee/i.test(fs.readFileSync(file,"utf8")),"Obsolete reservation copy: "+file);
 }

 console.log("PASS: verified policy, three city/specialty matches, complete profile rendering, three clinic request links, SEO and no invented weekdays/slots");
})().catch(error=>{console.error(error);process.exitCode=1});
