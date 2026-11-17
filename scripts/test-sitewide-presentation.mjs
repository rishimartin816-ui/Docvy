import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function load(path){const m={exports:{}};vm.runInThisContext('(function(module,exports){'+ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText+'})')(m,m.exports);return m.exports;}
const {facilitiesFrom}=load('lib/facilities.ts');
const doctor=(id,city,facility,kind='clinic')=>({id,specialties:['General medicine'],locations:[{city,facility,kind}]});
const rows=facilitiesFrom([doctor('one','Delhi','Shared Clinic'),doctor('two','Mumbai','Shared Clinic'),doctor('three','Delhi','Shared Clinic'),doctor('online','Online','Shared Clinic','online')]);
assert.equal(rows.length,2);assert.deepEqual(rows.find(r=>r.location.city==='Delhi').doctors.map(d=>d.id),['one','three']);assert.deepEqual(rows.find(r=>r.location.city==='Mumbai').doctors.map(d=>d.id),['two']);assert(!rows.some(r=>r.location.city==='Online'));
const {privateTrackingPath}=load('lib/private-tracking-link.ts');
const receipt='dvpt_'+'a'.repeat(64),reference='DV-0123456789ABCDEF',hash='#reference='+reference+'&receipt='+receipt;
assert.equal(privateTrackingPath('https://www.docvy.in/appointments/track'+hash,'https://preview.vercel.app'),'/appointments/track'+hash);
assert.equal(privateTrackingPath('https://preview.vercel.app/appointments/track'+hash,'https://preview.vercel.app'),'/appointments/track'+hash);
for(const invalid of ['https://evil.example/appointments/track'+hash,'https://www.docvy.in.evil.example/appointments/track'+hash,'https://www.docvy.in/book'+hash,'javascript:alert(1)','https://www.docvy.in/appointments/track?reference='+reference+'&receipt='+receipt,'https://www.docvy.in/appointments/track#reference='+reference,'not a url'])assert.equal(privateTrackingPath(invalid,'https://preview.vercel.app'),null);
assert(!privateTrackingPath('https://www.docvy.in/appointments/track?ignored=1'+hash,'https://preview.vercel.app').includes('?'),'Keys and unrelated queries never enter the server request URL');
console.log('PASS: identical facility names retain city-specific doctor associations; online practices excluded; private tracking accepts DOCVY/current origin only, requires reference and receipt, and retains keys exclusively in the fragment.');
