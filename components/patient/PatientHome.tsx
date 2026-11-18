import Link from 'next/link';
import Image from 'next/image';
import {ArrowRight,ArrowUpRight,ChevronRight,ClipboardCheck,Heart,MapPin,MessageCircle,ShieldCheck,Stethoscope} from 'lucide-react';
import {getDirectoryDoctors} from '@/lib/public-directory';
import {getBookingDoctorIds} from '@/lib/patient-discovery';
import {isVerified} from '@/lib/profile-policy';
import {citySlug} from '@/lib/directory';
import {doctorPath} from '@/lib/directory-normalization';
import {specialties} from '@/lib/care-directory';
import HomeDoctorExplorer from './HomeDoctorExplorer';
import CareNavigator from './CareNavigator';
import type {HomeDoctor} from '@/lib/home-doctor-discovery';
import {shortQualificationLabel} from '@/lib/doctor-presentation';
import {practiceLocationLabel} from '@/lib/practice-labels';
import SpecialtyIcon from '@/components/SpecialtyIcon';
import s from './experience.module.css';

const questions=[
 ['How does booking through DOCVY work?','Choose your doctor and practice, select a preferred date and time, and share your contact details. DOCVY checks the doctor’s availability and sends your confirmation. Your private tracking link keeps subsequent updates together.'],
 ['When should I travel to the practice?','Wait until your appointment is marked confirmed. Check your confirmed time, practice address and consultation fee before travelling.'],
 ['What does DOCVY Verified mean?','The doctor profile includes recorded approval and registration details.'],
 ['Can I choose an online consultation?','Where a participating doctor lists an online practice, you can choose it when booking. DOCVY coordinates the time with the doctor. Online consultation arrangements depend on the provider.'],
 ['How do I change or cancel my appointment?','Open your saved private tracking link to view the latest status and cancellation options. Contact contact@docvy.in with your reference if you need help arranging another time.'],
];
const guides=[
 {slug:'diabetes',title:'Preparing for a diabetes consultation',text:'The questions, records and previous reports that can help you prepare.',icon:ClipboardCheck},
 {slug:'high-blood-pressure',title:'Understanding blood pressure',text:'Get familiar with common terms before your conversation with a clinician.',icon:Heart},
 {slug:'joint-pain-arthritis',title:'Make sense of joint pain',text:'Learn about the care pathways and questions to take to your appointment.',icon:Stethoscope},
];
export default async function PatientHome(){
 const [allDoctors,bookableIds]=await Promise.all([getDirectoryDoctors(),getBookingDoctorIds()]);
 const verified=allDoctors.filter(isVerified);
 const homeDoctors:HomeDoctor[]=verified.map(doctor=>({id:doctor.id,name:doctor.name,href:doctorPath(doctor),photoUrl:doctor.photoUrl??null,shortQualifications:shortQualificationLabel(doctor.profileDetails),specialties:doctor.specialties,languages:doctor.profileDetails?.languages??[],experienceYears:doctor.profileDetails?.experienceYears??null,bookable:bookableIds.has(doctor.id),locations:doctor.locations.filter(location=>doctor.id!=='mr-sahil-kochale'||['Indore','Online'].includes(location.city)).map(location=>({city:location.city,facility:location.facility,locality:location.locality??'',state:location.state,online:location.kind==='online',primary:location.primary===true,fee:location.consultationFee??doctor.profileDetails?.consultationFee??null}))}));
 const cityCounts=new Map<string,{city:string;state?:string;count:number}>();for(const doctor of verified){const seen=new Set<string>();for(const location of doctor.locations.filter(l=>l.kind!=='online')){const key=location.city+'|'+(location.state??'');if(seen.has(key))continue;seen.add(key);cityCounts.set(key,{city:location.city,state:location.state,count:(cityCounts.get(key)?.count??0)+1});}}
 return <div className={s.root}>
  <section className={`${s.hero} ${s.consultationHero}`} aria-labelledby="patient-home-title"><div className={s.heroBackdrop} aria-hidden="true"><Image src="/images/docvy-consultation-hero-v2.jpg" alt="" fill priority sizes="(max-width: 760px) 200vw, 100vw" className={s.consultationPhoto}/></div><div className={s.heroWash} aria-hidden="true"/><div className={s.wrap}>
   <div className={s.heroGrid}><div><span className={s.eyebrow}><span className={s.dot}/>Verified doctor profiles</span><h1 id="patient-home-title">Find doctors in India</h1><p className={s.intro}>Search by specialty, hospital or city. Compare experience and fees, then request a visit.</p><div className={s.actions}><Link className={s.primary} href="#doctor-search">Find doctors<ArrowUpRight size={17} aria-hidden="true"/></Link><Link className={s.secondary} href="#how-it-works">How it works<ArrowRight size={16} aria-hidden="true"/></Link></div><div className={s.trustLine}><span><ShieldCheck size={15} aria-hidden="true"/>Verified profiles</span><span><ClipboardCheck size={15} aria-hidden="true"/>Private booking reference</span></div></div>
   </div>
   <div className={s.searchDock}><div><div className={s.searchHint}><strong>Popular searches</strong><Link href="/specialties/dermatology">Skin & hair</Link><Link href="/specialties/dentistry">Dental care</Link><Link href="/specialties/orthopaedics">Bones & joints</Link><Link href="/specialties/general-medicine">General medicine</Link></div></div></div>
  </div></section>

  <section className={`${s.wrap} ${s.section}`} aria-labelledby="patient-specialties"><div className={s.sectionHead}><div><span className={s.eyebrow}>Explore specialties</span><h2 id="patient-specialties">Browse by specialty</h2></div><Link className={s.textLink} href="/specialties">All specialties<ArrowRight size={15} aria-hidden="true"/></Link></div><div className={s.specialties}>{specialties.slice(0,8).map(item=><Link className={s.specialty} href={'/specialties/'+item.slug} key={item.slug}><SpecialtyIcon slug={item.slug}/><h3>{item.name}</h3></Link>)}</div></section>
  <section id="doctors" className={`${s.tint} ${s.doctorSection}`} aria-labelledby="patient-doctors"><div className={`${s.wrap} ${s.section}`}><div className={s.sectionHead}><div><span className={s.eyebrow}>Published doctor profiles</span><h2 id="patient-doctors">Meet the doctors</h2><p>Compare experience, qualifications, consultation fees and practice locations.</p></div><Link className={s.textLink} href="/doctors">Explore directory<ArrowRight size={15} aria-hidden="true"/></Link></div><HomeDoctorExplorer doctors={homeDoctors}/><p className={`${s.smallNote} mt-5`}>Fees reflect published practice information. Your preferred appointment time is confirmed by DOCVY after checking with the doctor.</p></div></section>
  <CareNavigator/>
  {cityCounts.size>0&&<section className={s.tint} aria-labelledby="patient-cities"><div className={`${s.wrap} ${s.section}`}><div className={s.sectionHead}><div><span className={s.eyebrow}>Care closer to you</span><h2 id="patient-cities">Where our doctors practise</h2></div></div><div className={s.cities}>{[...cityCounts.values()].sort((a,b)=>a.city.localeCompare(b.city)).map(place=><Link key={place.city+'|'+place.state} className={s.city} href={'/doctors?location='+citySlug(place.city)}><MapPin size={14} aria-hidden="true"/>{practiceLocationLabel(place)}<small>{place.count} {place.count===1?'profile':'profiles'}</small><ChevronRight size={12} aria-hidden="true"/></Link>)}</div><p className={`${s.smallNote} mt-4`}>These locations come from published verified profiles. Booking participation varies by doctor.</p></div></section>}
  <section className={`${s.wrap} ${s.section}`} aria-labelledby="patient-guides"><div className={s.sectionHead}><div><span className={s.eyebrow}>A little knowledge, a better conversation</span><h2 id="patient-guides">Prepare for your visit</h2><p>Clear, referenced guides to help you prepare for a conversation with a qualified clinician.</p></div><Link className={s.textLink} href="/care-guide">All health guides<ArrowRight size={15} aria-hidden="true"/></Link></div><div className={s.guideGrid}>{guides.map(({slug,title,text,icon:Icon})=><Link className={s.guide} key={slug} href={'/patient-guides/'+slug}><span className={s.guideIcon}><Icon size={23} aria-hidden="true"/></span><h3>{title}</h3><p>{text}</p><span className={s.textLink}>Read the guide<ArrowUpRight size={15} aria-hidden="true"/></span></Link>)}</div></section>
  <section className={s.tint} aria-labelledby="patient-faq"><div className={`${s.wrap} ${s.section} ${s.faq}`}><div><span className={s.eyebrow}>Here to help</span><h2 id="patient-faq" className="mt-3 text-3xl font-medium leading-tight">Questions about DOCVY</h2><p className={`${s.smallNote} mt-5`}>Need a hand with your appointment? Contact DOCVY with your booking reference.</p><Link href="/contact" className={s.textLink}><MessageCircle size={15} aria-hidden="true"/>Talk to DOCVY<ArrowUpRight size={14} aria-hidden="true"/></Link></div><div className={s.faqList}>{questions.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
  <section className={s.providerBand}><div className={s.wrap}><div><h2>A practice patients can get to know.</h2><p>Join DOCVY, share your professional details and help patients find your practice. Every submitted profile goes through review and consent checks.</p></div><Link className={s.secondary} href="/partner-with-us">Partner with DOCVY<ArrowUpRight size={16} aria-hidden="true"/></Link></div></section>
  <div className={`${s.wrap} py-5`}><p className={s.smallNote}>Patient guides provide general information, not diagnosis or treatment.</p></div>
 </div>;
}
