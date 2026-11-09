import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { facilitiesFrom } from "@/lib/facilities";
import { getDirectoryDoctors } from "@/lib/public-directory";
import ReferenceArtwork from "./ReferenceArtwork";

export default async function FacilitiesDirectory({ outpatient = false }: { outpatient?: boolean }) {
  const facilities = facilitiesFrom(await getDirectoryDoctors());
  const listedFacilities = facilities.filter((facility) => outpatient || facility.kind === "hospital");
  const hasClinics = facilities.some((facility) => facility.kind === "clinic");
  return <div className="docvy-garden">
    <section className="reference-wrap reference-section grid items-center gap-8 md:grid-cols-[1fr_260px]">
      <div><p className="reference-eyebrow text-primary">{outpatient ? "CLINICS & OUTPATIENT VISITS" : "HOSPITAL DISCOVERY"}</p>
        <h1 className="mt-5 text-4xl font-medium leading-tight tracking-tight sm:text-6xl">{outpatient ? "Make time for your health." : "Explore hospitals. Plan your next visit."}</h1>
        <p className="reference-copy mt-5">{outpatient ? "Explore sourced doctor profiles at the outpatient locations below. Appointment requests are available only after a doctor or clinic opts in." : "Start with the specialty you need, then review the sourced doctor profiles and check whether the practice has opted in to appointment requests."}</p>
        {outpatient && <p className="mt-4 text-sm text-grey">{hasClinics ? "Browse clinic and hospital outpatient locations linked to sourced doctor profiles. Check whether the doctor has opted in before requesting a visit." : "Independent clinic listings are not available yet. These are hospital practice locations sourced from the listed doctors’ official profiles."}</p>}
      </div><ReferenceArtwork scene={outpatient ? "calendar" : "hospital"} className="mx-auto w-52 md:w-full" />
    </section>
    <section className="reference-wrap pb-20" aria-labelledby="facility-heading">
      <h2 id="facility-heading" className="text-2xl font-medium">{outpatient ? "Clinics and hospital outpatient locations" : "Hospitals with doctor listings"}</h2>
      <ul className="mt-6 grid gap-5 md:grid-cols-3">{listedFacilities.map((facility) => <li key={facility.name} className="docvy-glass flex flex-col p-6">
        <MapPin size={24} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
        <h3 className="mt-5 text-xl font-medium">{facility.name}</h3>
        <p className="mt-2 text-sm text-grey">{[facility.location.locality, facility.location.city].filter(Boolean).join(", ")}</p>
        <p className="mt-4 text-sm">{facility.doctors.length} {facility.doctors.length === 1 ? "doctor profile" : "doctor profiles"} listed on DOCVY</p>
        <p className="mb-6 mt-2 flex-1 text-sm leading-7 text-grey">{facility.specialties.join(" · ")}</p>
        <Link href={{ pathname: "/doctors", query: { q: facility.name } }} className="docvy-pill docvy-pill-primary">View doctors <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" /></Link>
      </li>)}</ul>
      <p className="mt-6 max-w-3xl text-sm leading-7 text-grey">A directory listing does not establish a DOCVY hospital partnership. Requests are saved by DOCVY for coordination. Appointment availability, fees and the final time need provider confirmation.</p>
    </section>
  </div>;
}
