'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,CalendarDays,MapPin,ShieldCheck,Stethoscope} from 'lucide-react';

import s from './CareNavigator.module.css';

const stages=[
 {label:'Discover',title:'Discover',text:'Compare published experience, languages, practice locations and consultation fees.',icon:Stethoscope,href:'#doctor-search',action:'Find doctors'},
 {label:'Request',title:'Request',text:'Choose a participating doctor and a preferred time. DOCVY checks availability before confirming.',icon:CalendarDays,href:'/book',action:'Book an Appointment'},
 {label:'Follow',title:'Follow',text:'Your private appointment link brings confirmation, updates and cancellation options together.',icon:ShieldCheck,href:'/patient-access',action:'Track your appointment'},
];
export default function CareNavigator(){
 const [stage,setStage]=useState(0);
 const current=stages[stage],Icon=current.icon;
 return <section id="how-it-works" className={s.section} aria-labelledby="care-navigator-title">
  <div className={s.heading}><div><span className={s.eyebrow}>YOUR CARE, CONNECTED</span><h2 id="care-navigator-title">How booking works</h2><p>Discover your doctor, request a visit and follow its progress.</p></div><Link href="#doctors">Compare doctors <ArrowUpRight size={17}/></Link></div>
  <div className={s.workspace}>
   <div className={s.experience}>
    <div className={s.scene} aria-hidden="true"><div className={s.orbit}/><div className={s.orbitTwo}/><div className={s.core}><span><Icon size={39} strokeWidth={1.3}/></span><strong>DOCVY</strong></div><div className={`${s.floatCard} ${s.one}`}><ShieldCheck size={18}/><span>Verified profiles</span></div><div className={`${s.floatCard} ${s.two}`}><CalendarDays size={18}/><span>Your visit, coordinated</span></div><div className={`${s.floatCard} ${s.three}`}><MapPin size={18}/><span>The right practice</span></div></div>
    <div className={s.stageButtons} role="group" aria-label="Explore your DOCVY journey">{stages.map((item,i)=><button key={item.label} type="button" aria-pressed={stage===i} onClick={()=>setStage(i)}><span>0{i+1}</span>{item.label}</button>)}</div>
   </div>
   <div className={s.finder} aria-live="polite" aria-atomic="true"><span className={s.eyebrow}>Step {stage+1} of 3</span><h3>{current.title}</h3><p>{current.text}</p><Link className={s.searchLink} href={current.href}>{current.action}<ArrowUpRight size={17} aria-hidden="true"/></Link></div>
  </div>
 </section>;
}
