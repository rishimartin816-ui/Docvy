import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
function load(file,overrides={}){const m={exports:{}};const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;vm.runInThisContext('(function(require,module,exports){'+source+'\n})')(id=>overrides[id]??(id==='./booking-schedule'?load('lib/booking-schedule.ts'):id==='@/lib/doctor-presentation'?load('lib/doctor-presentation.ts'):require(id)),m,m.exports);return m.exports;}
const calendar=load('lib/booking-presentation.ts');
const now=Date.parse('2026-11-16T00:00:00Z');
const doctor={id:'dr-ambika-rao-jhunjhunu-68798490',city:'Jhunjhunu',facility:'Published practice',hours:'9 AM–6 PM'};
assert.equal(calendar.istDate(Date.parse('2026-11-16T20:00:00Z')),'2026-11-17');
assert.equal(calendar.shiftDate('2026-12-31',1),'2027-01-01');
assert.deepEqual(calendar.calendarDates('2026-12-30',3),['2026-12-30','2026-12-31','2027-01-01']);
assert.equal(calendar.prettyTime('00:00'),'12:00 AM');assert.equal(calendar.prettyTime('13:30'),'1:30 PM');
assert.deepEqual(calendar.preferredTimes(doctor,'2026-11-17',now),['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'],'Intersect owner-approved recurring rules with published practice hours');
assert.deepEqual(calendar.preferredTimes(doctor,'2026-11-22',now),[],'No invented Sunday slots');
assert.deepEqual(calendar.preferredTimes({...doctor,id:'unknown-doctor'},'2026-11-17',now),[],'No invented schedule for an unconfigured provider');
assert.deepEqual(calendar.preferredTimes({...doctor,id:'mr-sahil-kochale',city:'Online'},'2026-11-17',now),[],'Online availability must be coordinated');
assert.deepEqual(calendar.preferredTimes({id:'dr-ummed-kumar-meena',city:'Sankhalim',facility:'Sankhalim practice',hours:'2 PM–5 PM'},'2026-11-17',now),['14:00','15:00','16:00']);
assert.deepEqual(calendar.preferredTimes(doctor,'invalid',now),[]);
assert(!calendar.preferredTimes(doctor,'2026-11-17',Date.parse('2026-11-17T11:25:00+05:30')).includes('11:00'));
let queries=[];const helper={founderManagedBooking:()=>true,bookingConfigured:()=>true,jsonNoStore:(body,status=200)=>Response.json(body,{status}),bookingDb:async(path,{query})=>{queries.push({path,query});if(path==='docvy_booking_provider_options')return[{provider_id:'doctor-one',mode:'approval'}];return[{provider_id:'doctor-one',doctor_name:'Published doctor',city:'Delhi',facility:'Published clinic',specialties:['Physiotherapy'],photo_url:'https://unapproved.invalid/photo.jpg',profile_details:{consultationFee:200,experienceYears:8,languages:['Hindi','English'],privateInternalNote:'PRIVATE_DO_NOT_EXPOSE'},practice_locations:[{city:'Delhi',facility:'Published clinic',consultationFee:300,address:'Public practice address',consultingHours:'9 AM–6 PM',kind:'clinic'}]}];}};
const oldFlag=process.env.DOCVY_HYBRID_BOOKING_ENABLED;process.env.DOCVY_HYBRID_BOOKING_ENABLED='true';
try{const route=load('app/api/booking/providers/route.ts',{'@/lib/docvy-booking-server':helper,'@/lib/profile-policy':{ownedPortrait:()=>false}});const response=await route.GET();const body=await response.json();assert.equal(response.status,200);assert.equal(body.providers[0].fee,300,'Location-specific fee overrides profile fee');assert.equal(body.providers[0].photoUrl,null);assert.equal(body.providers[0].mode,'approval');assert(!JSON.stringify(body).includes('PRIVATE_DO_NOT_EXPOSE'));assert.equal(queries[1].query.get('published'),'eq.true');assert.equal(queries[1].query.get('profile_status'),'eq.verified');assert.equal(queries[1].query.get('consent_given'),'eq.true');console.log('PASS: IST calendar, recurring preferred-time guidance, practice-hour intersection, no fabricated Sunday/unknown/online slots; safe public provider projection and location-specific fees.');}
finally{if(oldFlag===undefined)delete process.env.DOCVY_HYBRID_BOOKING_ENABLED;else process.env.DOCVY_HYBRID_BOOKING_ENABLED=oldFlag;}
