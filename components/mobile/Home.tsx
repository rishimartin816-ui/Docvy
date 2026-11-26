import { ArrowRight, Search, Users, CalendarDays, ClipboardCheck, Check, Clock3, HeartPulse, Eye } from "lucide-react";
import SpecialtyIcon from "../SpecialtyIcon";
import { Thermometer, Ellipsis } from "lucide-react";
import { getDirectoryDoctors } from "@/lib/public-directory";
import HomeSearch from "./HomeSearch";
const asset = (name:string)=>"/images/approved-mobile/"+name+".webp";
const discovery = [
  ["doctor-discovery","Find a Doctor","Search doctors by specialty and location","/doctors"],
  ["clinic-discovery","Find Clinics","Locate trusted clinics near you","/clinics"],
  ["surgery-discovery","Explore Surgeries","Find surgery specialists and treatment options","/surgery-guide"]
];
const tiles = [
  ["General Physician","general-medicine"],["Dermatology","dermatology"],["Gynaecology","gynaecology"],["Paediatrics","paediatrics"],["Orthoatrics",""],["Orthoplagy",""],
  ["ENT","ent"],["Urology","urology"],["Gastroenterology","gastroenterology"],["Neurology","neurology"],["Pulmonology","pulmonology"],["More","*"]
];
const concerns = [
  ["Fever & Cold","", "fever"],["Skin & Hair","dermatology","skin rash"],["Back Pain","","back pain"],["Women’s Health","gynaecology","pregnancy"],
  ["Child Health","paediatrics","children"],["Kidney Stones","urology","kidney stones"],["Heart Health","heart","heart"],["Eye Care","eye","eyes"]
];
const steps = [
  {title:"Search for care",text:"Find doctors, clinics or treatment options.",Icon:Search},
  {title:"Compare doctors",text:"Check qualifications, fees and locations.",Icon:Users},
  {title:"Request an appointment",text:"Choose a time and send a request.",Icon:CalendarDays},
  {title:"Track your visit",text:"Stay updated on your appointment and next steps.",Icon:ClipboardCheck}
];
function Arrow(){return <ArrowRight aria-hidden="true"/>;}
function BannerButton({text,href}:{text:string;href:string}){return <a className="home-pill" href={href}>{text}<Arrow/></a>;}
export default async function MobileHome(){
  const doctors=await getDirectoryDoctors();
  const locations=doctors.flatMap(d=>d.locations).filter(l=>l.kind!=="online");
  const places=Array.from(new Map(locations.flatMap(l=>[{city:l.city},...(l.locality?[{city:l.city,area:l.locality}]:[])]).map(p=>[JSON.stringify(p),p])).values());
  const preview=process.env.VERCEL_ENV==="preview" || (!process.env.VERCEL_ENV && (process.env.NODE_ENV==="development" || process.env.DOCVY_DESIGN_REVIEW==="true"));
  return <div className="mobile-home">
    <div className="home-hero"><div className="home-intro"><img src={asset("hero")} alt=""/><div className="india">🇮🇳　Made in India for India ❤️</div><h1>Find the right<br/>doctor for you</h1><p>Book doctors, clinics, surgeries<br/>and video consultations —<br/>all in one place.</p></div><HomeSearch places={places}/></div>
    <div className="home-body">
      {preview && <aside className="activity" aria-label="Illustrative staging activity"><b>🟢　Live on DOCVY</b><img src={asset("activity-avatar")} alt=""/><div><strong>Aman from Amritsar</strong><small>Just booked an Orthopedic appointment</small></div><span><Clock3/> 2 min ago</span><small className="fixture-label">Staging example</small></aside>}
      <div className="home-deck">{discovery.map(([photo,title,text,href])=><a key={title} href={href} className="home-tile"><img src={asset(photo)} alt=""/><div><h3>{title}</h3><p>{text}</p><Arrow/></div></a>)}</div>
      <section><div className="home-heading"><h2>Explore Specialties</h2><a href="/specialties">View all <Arrow/></a></div><div className="home-specialties">{tiles.map(([label,slug],i)=>{
        const content=<>{slug==="*" ? <Ellipsis className="dots" aria-hidden="true"/> : <SpecialtyIcon slug={slug || (i===4?"orthopaedics":"cardiology")}/>}<span>{label}</span></>;
        return slug ? <a key={label} href={slug==="*"?"/specialties":"/specialties/"+slug}>{content}</a> : <div key={label}>{content}</div>;
      })}</div></section>
      <section><h2>Common Health Concerns</h2><div className="home-concerns">{concerns.map(([label,icon,term])=><a key={label} href={"/care-guide?q="+encodeURIComponent(term)}>{icon==="heart"?<HeartPulse/>:icon==="eye"?<Eye/>:label==="Fever & Cold"?<Thermometer/>:icon?<SpecialtyIcon slug={icon}/>:<span className="icon-space"/>}{label}</a>)}</div></section>
      <section className="home-banner help-banner"><img src={asset("specialist-help")} alt=""/><div><h2>Not sure which specialist to see?</h2><p>Explore doctors and treatment options<br/>by your symptoms or health concerns.</p><BannerButton text="Explore Health Concerns" href="/care-guide"/></div></section>
      <section><h2>How DOCVY Works</h2><p>A simple way to find the right care and manage your visit.</p><div className="home-steps">{steps.map(({title,text,Icon},i)=><div key={title}><span><Icon/><b>{i+1}</b></span><h3>{title}</h3><p>{text}</p></div>)}</div></section>
      <section className="home-why"><div><h2>Why Choose DOCVY?</h2><p>A trusted and simple platform<br/>for your healthcare needs.</p><BannerButton text="Learn More" href="/about"/></div><ul>{["Verified doctor information","Visible clinic locations and fees","Quick & easy appointment requests","All your healthcare information in one place"].map(t=><li key={t}><Check/>{t}</li>)}</ul></section>
      <section><h2>Care Guide for Everyday Health</h2><div className="home-tabs">{["Nutrition","Heart Health","Kidney Care","Women’s Health","Children’s Health"].map(t=><span key={t}>{t}</span>)}</div><div className="home-deck">{[["care-heart","Simple habits for a healthier heart"],["care-plate","Building a balanced Indian plate"],["care-kidney","Everyday habits for kidney health"]].map(([photo,title])=><article className="home-tile" key={title}><img src={asset(photo)} alt=""/><div><h3>{title}</h3><Arrow/></div></article>)}</div><a className="explore-guide" href="/care-guide">Explore Care Guide <Arrow/></a></section>
      <section><h2>For Doctors &amp; Clinics</h2><p>Free basic listings on DOCVY.</p><div className="home-partners">{[["doctor-onboarding","List Your Practice","Get discovered by patients looking for your specialty."],["clinic-onboarding","List Your Clinic","Showcase your clinic and make it easy for patients to find you."]].map(([photo,title,detail])=><a key={title} href="/partner-with-us"><img src={asset(photo)} alt=""/><div><h3>{title}</h3><p>{detail}</p></div><Arrow/></a>)}</div></section>
      <section className="home-banner final-banner"><img src={asset("patient-cta")} alt=""/><div><h2>Your next step towards<br/>better care starts here.</h2><p>Find doctors, explore healthcare<br/>options and take the next step<br/>with confidence.</p><BannerButton text="Find Doctors" href="/doctors"/></div></section>
    </div>
  </div>;
}
