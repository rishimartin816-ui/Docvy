import {generateApprovedSlotCandidates} from './booking-schedule';

export type BookingProvider={key:string;id:string;name:string;city:string;facility:string;mode:'approval'|'instant';specialties?:string[];photoUrl?:string|null;fee?:number|null;experienceYears?:number|null;languages?:string[];address?:string;hours?:string;kind?:string};
export function istDate(at=Date.now()){return new Date(at+330*60000).toISOString().slice(0,10);}
export function calendarDates(start:string,count=7){const at=Date.parse(start+'T00:00:00Z');if(!Number.isFinite(at))return [];return Array.from({length:count},(_,i)=>new Date(at+i*86400000).toISOString().slice(0,10));}
export function shiftDate(date:string,days:number){return new Date(Date.parse(date+'T00:00:00Z')+days*86400000).toISOString().slice(0,10);}
export function prettyDate(date:string,options:Intl.DateTimeFormatOptions={weekday:'short',day:'numeric',month:'short'}){return new Intl.DateTimeFormat('en-IN',{...options,timeZone:'Asia/Kolkata'}).format(new Date(date+'T12:00:00+05:30'));}
export function prettyTime(time:string){const [h,m]=time.split(':').map(Number);return `${h%12||12}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`;}
/** A preferred-time suggestion is never presented as confirmed inventory. */
export function preferredTimes(provider:BookingProvider,date:string,now=Date.now()):string[]{
 if(provider.city==='Online')return [];
 const hours=provider.hours?.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*[-–—]\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
 const minutes=(h:string,m:string|undefined,ap:string)=>(Number(h)%12+(ap.toUpperCase()==='PM'?12:0))*60+Number(m??0);
 const opening=hours?minutes(hours[1],hours[2],hours[3]):null,closing=hours?minutes(hours[4],hours[5],hours[6]):null;
 try{return generateApprovedSlotCandidates(date,calendarDates(date,2)[1]).filter(slot=>slot.provider_id===provider.id&&Date.parse(slot.starts_at)>now+15*60000&&(!slot.location||(slot.location.city===provider.city&&slot.location.facility===provider.facility))).map(slot=>new Date(Date.parse(slot.starts_at)+330*60000).toISOString().slice(11,16)).filter(time=>{if(opening===null||closing===null)return true;const [h,m]=time.split(':').map(Number),start=h*60+m;return closing>opening?start>=opening&&start+30<=closing:start>=opening||start+30<=closing;});}catch{return [];}
}
