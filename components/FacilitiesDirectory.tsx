import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { facilitiesFrom } from "@/lib/facilities";
import { getDirectoryDoctors } from "@/lib/public-directory";


export default async function FacilitiesDirectory({ outpatient = false, query="", city="" }: { outpatient?: boolean; query?: string; city?: string }) {
  const facilities = facilitiesFrom(await getDirectoryDoctors());
  const eligible=facilities.filter(f=>outpatient||f.kind==="hospital");
  const cities=Array.from(new Set(eligible.map(f=>f.location.city))).sort();
  const listedFacilities=eligible.filter(f=>(!city||f.location.city===city)&&[f.name,f.location.city,f.location.locality,...f.specialties].join(" ").toLowerCase().includes(query.toLowerCase()));
  const hasClinics = facilities.some((facility) => facility.kind === "clinic");
  return <div className="docvy-garden">
    <section className="reference-wrap reference-section grid items-center gap-8 ">
      <div><p className="reference-eyebrow text-primary">{outpatient ? "CLINICS & OUTPATIENT VISITS" : "HOSPITAL DISCOVERY"}</p>
        <h1 className="mt-5 text-4xl font-medium leading-tight tracking-tight sm:text-6xl">{outpatient ? "Make time for your health." : "Explore hospitals. Plan your next visit."}</h1>
        <p className="reference-copy mt-5">{outpatient ? "Find the practice that works for you. Explore addresses, specialties and associated doctors, then book with participating professionals through DOCVY." : "Explore published hospital practice locations and the doctors associated with them. Review a doctor’s profile and booking options before planning your visit."}</p>
        {outpatient && <p className="mt-4 text-sm text-grey">{hasClinics ? "Browse clinic and hospital outpatient locations linked to sourced doctor profiles. Check whether the doctor has opted in before requesting a visit." : "Independent clinic listings are not available yet. These are hospital practice locations sourced from the listed doctors’ official profiles."}</p>}
      </div>
    </section>
    <section className="reference-wrap pb-20" aria-labelledby="facility-heading">
      <h2 id="facility-heading" className="text-2xl font-medium">{outpatient ? "Clinics and hospital outpatient locations" : "Hospitals with doctor listings"}</h2>
      <form className="docvy-facility-filters" action={outpatient?"/clinics":"/hospitals"}><label>Practice or specialty<input className="docvy-select" name="q" type="search" maxLength={120} defaultValue={query} placeholder="Hospital, clinic or specialty"/></label><label>City<select className="docvy-select" name="city" defaultValue={city}><option value="">All practice cities</option>{cities.map(value=><option key={value}>{value}</option>)}</select></label><button className="docvy-pill docvy-pill-primary">Find practices</button></form><p role="status" className="docvy-facility-count">{listedFacilities.length} published practice {listedFacilities.length===1?"location":"locations"}{query?" matching your search":""}</p>{!listedFacilities.length&&<div className="docvy-glass p-7"><h3 className="text-xl">No matching practices</h3><p className="mt-3 text-sm text-grey">Try another city or specialty, or clear the filters.</p><Link className="docvy-pill mt-4" href={outpatient?"/clinics":"/hospitals"}>Clear filters</Link></div>}<ul className="mt-6 grid gap-5 md:grid-cols-3">{listedFacilities.map((facility) => <li key={facility.name+"|"+facility.location.city} className="docvy-glass flex flex-col p-6">
        <MapPin size={24} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
        <h3 className="mt-5 text-xl font-medium">{facility.name}</h3>
        <p className="mt-2 text-sm text-grey">{[facility.location.locality, facility.location.city].filter(Boolean).join(", ")}</p>
        <p className="mt-4 text-sm">{facility.doctors.length} {facility.doctors.length === 1 ? "doctor profile" : "doctor profiles"} listed on DOCVY</p>
        <p className="mb-6 mt-2 flex-1 text-sm leading-7 text-grey">{facility.specialties.join(" · ")}</p>
        <Link href={{ pathname: "/doctors", query: { facility: facility.name, location: facility.location.city } }} className="docvy-pill docvy-pill-primary">View doctors <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" /></Link>
      </li>)}</ul>
      <p className="mt-6 max-w-3xl text-sm leading-7 text-grey">A directory listing does not establish a DOCVY hospital partnership. Requests are saved by DOCVY for coordination. Appointment availability, fees and the final time need provider confirmation.</p>
    </section>
  </div>;
}
