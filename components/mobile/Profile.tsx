import { UserRound, ShieldCheck, MapPin } from "lucide-react";
import type {ProviderCandidate} from "@/lib/provider-candidates";
import {shortQualificationLabel,publishedDoctorServices} from "@/lib/doctor-presentation";
import {canRequestAppointment,isVerified} from "@/lib/profile-policy";
import DoctorPortrait from "../DoctorPortrait";
import {Action, Page, Row} from "./Elements";
export default function Profile({doctor,bookable,questions}:{doctor:ProviderCandidate;bookable:boolean;questions:string[][]}){
 const consent=canRequestAppointment(doctor),details=consent?doctor.profileDetails:undefined;
 const first=doctor.locations[0],fee=consent?first.consultationFee??details?.consultationFee:null;
 const services=publishedDoctorServices(details),verified=isVerified(doctor);
 const book="/book?"+new URLSearchParams({provider:doctor.id});
 return <Page crumb="Doctor profile"><div className="profiletop"><DoctorPortrait name={doctor.name} src={consent?doctor.photoUrl:null} large/>{verified&&<span className="verified">✓ DOCVY Verified</span>}<h1>{doctor.name}</h1><p>{[doctor.specialties.join(" · "),shortQualificationLabel(details)].filter(Boolean).join(" · ")}</p><p>{[first.city,first.state].filter(Boolean).join(", ")}</p>
 <div className="stats">{details?.experienceYears!=null&&<div><b>{details.experienceYears} years</b><span>Experience</span></div>}{fee!=null&&<div><b>₹{fee.toLocaleString("en-IN")}</b><span>Consultation</span></div>}</div>{bookable&&<Action href={book}>Request appointment</Action>}</div>
 <nav className="chips" aria-label="Doctor profile sections">{[["about-doctor","About"],["doctor-credentials","Qualifications"],["practice-locations","Practice"],["doctor-faq","FAQs"]].map(([anchor,label])=><a key={anchor} href={"#"+anchor}>{label}</a>)}</nav>
 <section id="about-doctor"><h2>About</h2>{consent&&doctor.summary&&<p>{doctor.summary}</p>}{doctor.serviceTitle&&<p>{doctor.serviceTitle}</p>}</section>
 <section id="doctor-credentials"><h2>Professional details</h2>{details?.qualifications&&<Row title="Qualifications" detail={details.qualifications} icon={UserRound}/>}
 {verified&&<Row title="Registration" detail={[doctor.registrationNumber,doctor.registrationCouncil].filter(Boolean).join(" · ")} icon={ShieldCheck}/>}
 {details?.languages?.length ? <p>{details.languages.join(", ")}</p>:null}{!consent&&<Action outline href={"/claim-profile?provider="+encodeURIComponent(doctor.id)}>Claim this profile</Action>}</section>
 <section id="practice-locations"><h2>Practice location</h2>{doctor.locations.map(l=><div key={l.city+l.facility}><Row title={l.facility||l.city} detail={[l.address||l.locality,l.city,consent&&l.workingDays,consent&&l.consultingHours,consent&&l.consultationFee!=null?"₹"+l.consultationFee:""].filter(Boolean).join(" · ")} icon={MapPin}/>{bookable&&<Action href={"/book?"+new URLSearchParams({provider:doctor.id,city:l.city,facility:l.facility})}>Request appointment</Action>}{l.mapsUrl&&/^https:\/\/(www\.google\.com|maps\.google\.com|share\.google|maps\.app\.goo\.gl)\//.test(l.mapsUrl)&&<Action outline href={l.mapsUrl}>Directions</Action>}{consent&&l.practicePhone&&<a href={"tel:"+l.practicePhone}>Call practice</a>}</div>)}</section>
 {!!services.length&&<section id="doctor-services"><h2>Care offered</h2>{services.map(service=><div className="card" key={service}><h3>{service}</h3></div>)}</section>}
 <section id="doctor-faq"><h2>Before your visit</h2>{questions.map(([q,a])=><details className="question" key={q}><summary>{q}</summary><p>{a}</p></details>)}</section><a href={"/remove-profile?provider="+encodeURIComponent(doctor.id)}>Request a profile correction or removal</a></Page>;
}
