import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { Page, Intro, Action } from "./Elements";
import { availableCities, citySlug, directorySpecialties } from "@/lib/directory";
import { doctorPath } from "@/lib/directory-normalization";
import { shortQualificationLabel } from "@/lib/doctor-presentation";
import { canRequestAppointment, isVerified } from "@/lib/profile-policy";
import { directoryPageHref, type DirectoryFilters } from "@/lib/directory-filters";
import { getBookingDoctorIds } from "@/lib/patient-discovery";
import type { ProviderCandidate, ProviderLocation } from "@/lib/provider-candidates";
import DoctorPortrait from "../DoctorPortrait";
import FilterControls from "./FilterControls";

export async function MobileCards({doctors,city,area,facility}:{doctors:ProviderCandidate[]; city?:string;area?:string;facility?:string}){
  const active=await getBookingDoctorIds();
  return <>{doctors.map(d=>{
    const practice=d.locations.find(l=>(!city || citySlug(l.city)===city) && (!facility || l.facility===facility) && (!area || l.locality?.toLowerCase()===area.toLowerCase())) ?? d.locations[0];
    return <MobileCard key={d.id} doctor={d} practice={practice} active={active.has(d.id)}/>;
  })}</>;
}
function MobileCard({doctor,practice,active}:{doctor:ProviderCandidate;practice:ProviderLocation;active:boolean}){
  const consent=canRequestAppointment(doctor), details=consent ? doctor.profileDetails : undefined;
  const fee=consent ? practice.consultationFee ?? details?.consultationFee : null;
  const book=active && isVerified(doctor) && (doctor.id!=="mr-sahil-kochale" || ["Indore","Online"].includes(practice.city));
  return <article className="card doctor"><div className="row"><DoctorPortrait name={doctor.name} src={consent?doctor.photoUrl:null} compact/><div className="grow">
    {isVerified(doctor)&&<span className="verified">✓ DOCVY Verified</span>}<h3><a href={doctorPath(doctor)}>{doctor.name}</a></h3><p>{[doctor.specialties.join(" · "),shortQualificationLabel(details)].filter(Boolean).join(" · ")}</p></div></div>
    <div className="facts">{details?.experienceYears!=null && <span><CalendarDays/>{details.experienceYears} years of experience</span>}<span><MapPin/>{[practice.facility,practice.city].filter(Boolean).join(", ")}</span>{fee!=null && <span className="fee">₹{fee.toLocaleString("en-IN")} consultation</span>}</div>
    <div className="actions"><Action outline href={doctorPath(doctor)}>View profile</Action>{book&&<Action href={"/book?"+new URLSearchParams({provider:doctor.id,city:practice.city,facility:practice.facility})}>Request appointment</Action>}</div></article>;
}
export function Results({listed,shown,filters,pages=1,page=1,label,empty}:{listed:ProviderCandidate[];shown:ProviderCandidate[];filters:DirectoryFilters;pages?:number;page?:number;label?:string;empty?:React.ReactNode}){
  const cities=availableCities(listed);
  const place=cities.find(c=>c.slug===filters.city)?.name ?? filters.city;
  const filtered=Boolean(place || label);
  const places=listed.flatMap(d=>d.locations.map(l=>({city:citySlug(l.city),facility:l.facility,area:l.locality??""})));
  return <Page crumb={filtered?"Filtered doctor results":"Find doctors"}><Intro title={label || (place?"Find doctors in "+place:"Find the right doctor")} description={filtered?"Explore published doctor profiles and practice locations.":"Compare qualifications, experience, fees and practice locations."}/>
    <FilterControls key={directoryPageHref(filters,page)} filters={filters} places={places} cities={cities} specialties={directorySpecialties}/>
    <section><h2>{filtered?"Published profiles":"Explore doctor profiles"}</h2>{!filtered&&<p>A selection of published profiles.</p>}
    {shown.length ? <MobileCards doctors={shown} city={filters.city} area={filters.area} facility={filters.facility}/> : empty || <p>No profiles match these filters. <a href="/doctors">Clear the filters</a></p>}</section>
    {pages>1&&<nav className="actions" aria-label="Doctor directory pages">{page>1&&<Action outline href={directoryPageHref(filters,page-1)}>Previous</Action>}{page<pages&&<Action outline href={directoryPageHref(filters,page+1)}>Next</Action>}</nav>}
    {filtered && <Action outline href="/doctors">Clear location filter</Action>}</Page>;
}
