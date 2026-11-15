import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const loadedModule={exports:{}};
const code=ts.transpileModule(fs.readFileSync('lib/booking-schedule.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
vm.runInThisContext('(function(exports){'+code+'\n})')(loadedModule.exports);
const {generateApprovedSlotCandidates:generate,approvedProviderIds}=loadedModule.exports;
if(process.argv[2]==='--generate') {
 const [start,end]=process.argv.slice(3);
 if(!start||!end)throw Error('Usage: node scripts/test-booking-schedule.mjs --generate YYYY-MM-DD YYYY-MM-DD');
 console.log(JSON.stringify({mode:'unassigned_candidates_only',timeZone:'Asia/Kolkata',slots:generate(start,end)},null,2));
} else {
 const week=generate('2026-11-16','2026-11-23');assert.equal(week.length,360);
 assert.equal(generate('2026-11-22','2026-11-23').length,0);
 assert.equal(approvedProviderIds.length,6);
 for(const id of approvedProviderIds){const day=generate('2026-11-16','2026-11-17').filter(s=>s.provider_id===id);assert.equal(day.length,10);assert.equal(day[0].starts_at,'2026-11-16T04:30:00.000Z');assert.equal(day[0].ends_at,'2026-11-16T05:00:00.000Z');assert.equal(day[1].starts_at,'2026-11-16T05:30:00.000Z');assert.equal(day.at(-1).ends_at,'2026-11-16T14:00:00.000Z');for(let i=1;i<day.length;i++)assert.equal(Date.parse(day[i].starts_at)-Date.parse(day[i-1].ends_at),30*60000);}
 assert.equal(new Set(week.map(s=>s.provider_id+':'+s.starts_at)).size,360);
 for(const dates of [['2026-02-30','2026-03-01'],['2026-11-16','2026-11-16'],['2026-11-17','2026-11-16'],['2026-01-01','2026-12-01']])assert.throws(()=>generate(...dates));
 assert.equal(JSON.stringify(generate('2026-11-16','2026-11-23')),JSON.stringify(week));
 console.log('PASS: six doctors, Mon–Sat IST, 30-minute appointment + 30-minute gap, 10 slots/day, 60/week/doctor, 360/week total; Sunday excluded; date/range and duplicate checks.');
}
