import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function load(file,stubs={}){const m={exports:{}};vm.runInThisContext('(function(require,module,exports){'+ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText+'\n})')(name=>{if(name in stubs)return stubs[name];throw Error('Unexpected import '+name);},m,m.exports);return m.exports;}
const xml=load('lib/seo/segmented-sitemaps.ts');
const paths=Array.from({length:20001},(_,i)=>'/doctor/provider-'+String(i).padStart(5,'0'));
const pages=xml.paginateGroups({doctors:[...paths].reverse(),empty:[]});
assert.deepEqual(Object.values(pages).map(p=>p.length),[10000,10000,1]);
assert.equal(pages.doctors[0],paths[0]);assert.equal(Object.keys(pages).includes('empty'),false);
assert.throws(()=>xml.paginateGroups({one:['/same'],two:['/same']}));
for(const path of ['/a?x=1','//other.com','/bad path','/x#part'])assert.throws(()=>xml.paginateGroups({doctors:[path]}));
assert.match(xml.renderIndex(['doctor-profiles']),/sitemapindex/);assert.match(xml.renderUrlset(['/doctor/a']),/https:\/\/www.docvy.in\/doctor\/a/);assert.doesNotMatch(xml.renderUrlset(['/doctor/a']),/lastmod/);assert.throws(()=>xml.renderUrlset([]));assert.equal(xml.escapeXml('a&b<>'), 'a&amp;b&lt;&gt;');
const home=load('lib/home-doctor-discovery.ts');let selected=[];for(const id of ['one','two','three','four'])selected=home.nextShortlist(selected,id);assert.deepEqual(selected,['one','two','three']);assert.deepEqual(home.nextShortlist(selected,'two'),['one','three']);
const p=(city,locality)=>({city,locality,facility:'Published clinic'});const doctors=[{id:'verified',live:true,profileStatus:'verified',consentGiven:true,registrationNumber:'a',registrationCouncil:'b',verifiedAt:'2026-11-01',locations:[p('Delhi','Area')],specialties:['Urology']},{id:'private',live:false,profileStatus:'unclaimed',consentGiven:false,locations:[],specialties:[]}];
const policy=load('lib/profile-policy.ts');const sitemap=load('lib/seo/public-sitemaps.ts',{'server-only':{},'@/lib/care-directory':{specialties:[{slug:'urology'}]},'@/lib/patient-topic-guides':{patientTopicGuides:[{slug:'diabetes'}]},'@/lib/directory':{availableCities:()=>[],cities:[],citySlug:s=>s.toLowerCase(),directoryProcedures:[],directorySpecialties:[],doctorsIn:()=>[],slugify:s=>s.toLowerCase()},'@/lib/directory-normalization':{doctorPath:d=>'/doctor/'+d.id},'@/lib/public-directory':{getDirectoryDoctors:async()=>doctors},'@/lib/profile-policy':policy,'./segmented-sitemaps':xml});const real=await sitemap.getPublicSitemapPages();assert.deepEqual(real['doctor-profiles'],['/doctor/verified']);assert.equal('cities' in real,false);assert.equal(Object.values(real).flat().includes('/doctor/private'),false);
console.log('PASS: stable 10,000 URL chunks, deduplication, XML escaping, canonical paths, omitted unsupported dates/empty groups, verified profiles only, bounded three-doctor shortlist.');
