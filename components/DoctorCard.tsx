import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Building2, CircleUserRound, MapPin } from "lucide-react";
import DoctorPortrait from "./DoctorPortrait";
import { doctorPath } from "@/lib/directory-normalization";
import { canRequestAppointment, isVerified } from "@/lib/profile-policy";
import type { ProviderCandidate, ProviderLocation } from "@/lib/provider-candidates";

export default function DoctorCard({ doctor, location = doctor.locations[0] }: { doctor: ProviderCandidate; location?: ProviderLocation }) {
  const partnered = canRequestAppointment(doctor);
  const profile = doctorPath(doctor);
  return <article className="doctor-card" aria-labelledby={"doctor-name-" + doctor.id}>
    <div className="doctor-card-main">
      <DoctorPortrait name={doctor.name} src={partnered ? doctor.photoUrl : null} compact />
      <div className="doctor-card-details">
        <h3 id={"doctor-name-" + doctor.id} className="doctor-card-title"><Link href={profile}>{doctor.name}</Link></h3>
        <p className="doctor-card-specialty">{doctor.specialties.join(" · ") || "Specialty details under review"}</p>
        {doctor.centres?.length ? <p className="mt-2 text-xs leading-6 text-grey">Centres &amp; services: {doctor.centres.join(" · ")}</p> : null}
        <div className="doctor-card-location">
          {(location.facility || doctor.hospital) && <p><Building2 size={16} strokeWidth={1.5} aria-hidden="true" /><span>{location.facility || doctor.hospital}</span></p>}
          <p><MapPin size={16} strokeWidth={1.5} aria-hidden="true" /><span>{[location.locality,location.city].filter(Boolean).join(", ")}</span></p>
        </div>
        {isVerified(doctor) && <p className="doctor-verified"><BadgeCheck size={16} strokeWidth={1.5} aria-hidden="true" /> DOCVY Verified</p>}
      </div>
    </div>
    {partnered ? <div className="doctor-card-footer">
      <p className="doctor-card-note">This does not reserve a slot.<br />The clinic confirms time and fee.</p>
      <Link href={{ pathname: "/request", query: { provider: doctor.id, city: location.city, facility: location.facility } }} className="doctor-claim-button">Request appointment <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" /></Link>
    </div> : <div className="doctor-card-footer">
      <div className="doctor-card-status"><span className="doctor-status-dot" aria-hidden="true" /><p>Not yet partnered with DOCVY</p></div>
      <div className="doctor-card-claim"><span>Is this your practice?</span><Link className="doctor-claim-button" href={{ pathname: "/claim-profile", query: { provider: doctor.id } }} aria-label={"Claim profile for " + doctor.name}><CircleUserRound size={17} strokeWidth={1.5} aria-hidden="true" /> Claim profile <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" /></Link></div>
    </div>}
  </article>;
}
