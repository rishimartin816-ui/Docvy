'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,CalendarDays,Check,MapPin,ShieldCheck,Stethoscope,Video} from 'lucide-react';
import {matchingHomeDoctors,type HomeDoctor,type HomeDoctorFilters} from '@/lib/home-doctor-discovery';
import s from './CareNavigator.module.css';

const stages=[
 {label:'Discover',title:'Get to know your doctor.',text:'Compare published experience, languages, practice locations and consultation fees.',icon:Stethoscope},
 {label:'Request',title:'Make your next move.',text:'Choose a participating doctor and a preferred time. DOCVY checks availability before confirming.',icon:CalendarDays},
 {label:'Follow your visit',title:'Keep the details together.',text:'Your private appointment link brings confirmation, updates and cancellation options together.',icon:ShieldCheck},
];
export default function CareNavigator({doctors}:{doctors:HomeDoctor[]}){
 const [stage,setStage]=useState(0);
 const [paused,setPaused]=useState(false);
 const [specialty,setSpecialty]=useState('');
 const [city,setCity]=useState('');
 const [mode,setMode]=useState<HomeDoctorFilters['mode']>('all');
 const options=[...new Set(doctors.flatMap(d=>d.specialties))].sort();
 const candidates=doctors.filter(d=>!specialty||d.specialties.includes(specialty));
 const matches=matchingHomeDoctors(candidates,{query:'',city,mode});
 const cities=[...new Set(candidates.flatMap(d=>d.locations.filter(l=>mode==='all'||l.online===(mode==='online')).map(l=>l.city)))].sort();
 const current=stages[stage],Icon=current.icon;
 return <section className={s.section} aria-labelledby="care-navigator-title">
  <div className={s.heading}><div><span className={s.eyebrow}>YOUR CARE, CONNECTED</span><h2 id="care-navigator-title">A clearer path to your next visit.</h2><p>Explore your options. Keep the next step in your hands.</p></div><Link href="#doctors">Compare doctors <ArrowUpRight size={17}/></Link></div>
  <div className={s.workspace}>
   <div className={s.experience} data-paused={paused||undefined}><button className={s.motionControl} type="button" aria-pressed={paused} onClick={()=>setPaused(value=>!value)}>{paused?"Play motion":"Pause motion"}</button>
    <div className={s.scene} aria-hidden="true"><div className={s.orbit}/><div className={s.orbitTwo}/><div className={s.core}><span><Icon size={39} strokeWidth={1.3}/></span><strong>docvy</strong></div><div className={`${s.floatCard} ${s.one}`}><ShieldCheck size={18}/><span>Verified profiles</span></div><div className={`${s.floatCard} ${s.two}`}><CalendarDays size={18}/><span>Your visit, coordinated</span></div><div className={`${s.floatCard} ${s.three}`}><MapPin size={18}/><span>The right practice</span></div></div>
    <div className={s.stageButtons} role="group" aria-label="Explore your DOCVY journey">{stages.map((item,i)=><button key={item.label} type="button" aria-pressed={stage===i} onClick={()=>setStage(i)}><span>0{i+1}</span>{item.label}</button>)}</div>
    <div className={s.stageCopy} aria-live="polite" aria-atomic="true"><h3>{current.title}</h3><p>{current.text}</p></div>
   </div>
   <div className={s.finder}><span className={s.eyebrow}>PERSONALISE YOUR SEARCH</span><h3>Find your starting point.</h3><p>Choose a specialty you want to explore. These filters browse profiles; they do not diagnose a condition.</p>
    <label>Specialty<select value={specialty} onChange={e=>{setSpecialty(e.target.value);setCity('');}}><option value="">All published specialties</option>{options.map(value=><option key={value}>{value}</option>)}</select></label>
    <div className={s.mode} role="group" aria-label="Preferred consultation type">{([['all','Any visit'],['in-person','In person'],['online','Online']] as const).map(([value,label])=><button type="button" key={value} aria-pressed={mode===value} onClick={()=>{setMode(value);setCity('');}}>{value==='online'?<Video size={15}/>:value==='in-person'?<MapPin size={15}/>:<Stethoscope size={15}/>} {label}</button>)}</div>
    <label>Practice city<select value={city} onChange={e=>setCity(e.target.value)}><option value="">All matching locations</option>{cities.map(value=><option key={value}>{value}</option>)}</select></label>
    <p className={s.result} role="status" aria-live="polite"><Check size={17}/>{matches.length} {matches.length===1?'published doctor matches':'published doctors match'} your choices.</p>
    {matches.length>0?<ul className={s.matches}>{matches.slice(0,3).map(({doctor,location})=><li key={doctor.id}><Link href={doctor.href}><span><strong>{doctor.name}</strong><small>{location.city} · {location.fee===null?'Confirm fee':'₹'+location.fee.toLocaleString('en-IN')+' consultation'}</small></span><ArrowUpRight size={17}/></Link></li>)}</ul>:<p className={s.noResults}>No published profiles match this combination. Try another location or visit type.</p>}
    <Link className={s.searchLink} href={{pathname:'/doctors',query:{...(specialty?{q:specialty}:{}),...(mode==='online'?{location:'online'}:city?{location:city}:{})}}}>Explore doctor directory <ArrowUpRight size={17}/></Link>
   </div>
  </div>
 </section>;
}
