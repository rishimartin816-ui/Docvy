import DoctorPortrait from "@/components/DoctorPortrait";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/DirectoryPage";
import { doctorPath } from "@/lib/directory-normalization";
import { getDirectoryDoctors } from "@/lib/public-directory";
import { canRequestAppointment, isVerified } from "@/lib/profile-policy";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { doctorDescription, doctorStructuredData } from "@/lib/doctor-profile";

export const dynamic = "force-dynamic";
type Props = { params: { slug: string } };
async function lookup(slug: string) {
  const doctor = (await getDirectoryDoctors()).find(item => item.id === slug || item.profileSlug === slug);
  if (!doctor) notFound();
  return doctor;
}
export async function generateMetadata({ params }: Props) {
  const doctor = await lookup(params.slug);
  const description = doctorDescription(doctor);
  const path = doctorPath(doctor);
  return { title: doctor.name, description, alternates: { canonical: path }, ...buildPageSocialMetadata(doctor.name + " | DOCVY", description, path) };
}
export default async function DoctorPage({ params }: Props) {
  const doctor = await lookup(params.slug);
  const partnered = canRequestAppointment(doctor);
  const verified = isVerified(doctor);
  const details = partnered ? doctor.profileDetails : undefined;
  const path = doctorPath(doctor);
  return <div className="mx-auto max-w-5xl px-5 py-12 sm:px-9">
    <Breadcrumbs items={[{ name: "Doctors", href: "/doctors" }, { name: doctor.name, href: path }]} />
    {verified && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorStructuredData(doctor)).replace(/</g, "\\u003c") }} />}
    <div className="flex flex-col items-start gap-6 sm:flex-row"><DoctorPortrait name={doctor.name} src={partnered ? doctor.photoUrl : null} large /><div>
      <h1 className="text-4xl font-medium sm:text-5xl">{doctor.name}</h1>
      <p className="mt-4">{doctor.specialties.join(", ") || "Specialty details under review"}{details && doctor.specialties.includes("General medicine") ? " · General physician" : ""}</p>
      {doctor.serviceTitle && <p className="mt-2 text-sm text-grey">Service title: {doctor.serviceTitle}</p>}
      {doctor.centres?.length ? <p className="mt-2 text-sm text-grey">Centres &amp; services: {doctor.centres.join(" · ")}</p> : null}
      <p className="mt-3 text-grey">{[doctor.hospital, ...new Set(doctor.locations.map(location => location.city))].filter(Boolean).join(" · ")}</p>
      {verified && <div className="mt-4"><strong className="text-primary">DOCVY Verified</strong><p className="mt-2 text-sm">Registration: {doctor.registrationNumber} · {doctor.registrationCouncil}</p></div>}
      {!partnered && <p className="mt-5 font-medium">Not yet partnered with DOCVY</p>}
    </div></div>
    {details && <dl className="docvy-glass mt-8 grid gap-5 p-6 sm:grid-cols-2">
      {details.qualifications && <div><dt className="text-sm text-grey">Qualifications</dt><dd className="mt-1 font-medium">{details.qualifications}</dd></div>}
      {details.experienceYears != null && <div><dt className="text-sm text-grey">Experience</dt><dd className="mt-1 font-medium">{details.experienceYears} years{details.experienceAsOf && <span className="block text-xs font-normal text-grey">As supplied in {details.experienceAsOf.slice(0,4)}</span>}</dd></div>}
      {details.languages?.length ? <div><dt className="text-sm text-grey">Languages</dt><dd className="mt-1 font-medium">{details.languages.join(", ")}</dd></div> : null}
      {details.consultationFee != null && <div><dt className="text-sm text-grey">Consultation fee</dt><dd className="mt-1 font-medium">₹{details.consultationFee}</dd></div>}
      {details.practicePhone && <div><dt className="text-sm text-grey">Doctor / clinic contact</dt><dd className="mt-1"><a className="underline underline-offset-4" href={"tel:" + details.practicePhone}>{details.practicePhone.replace(/^\+91/, "")}</a></dd></div>}
    </dl>}
    {partnered && doctor.summary && <section className="mt-8"><h2 className="text-2xl font-medium">About the doctor</h2><p className="mt-4 max-w-3xl leading-8">{doctor.summary}</p></section>}
    <section className="docvy-glass mt-8 p-6"><h2 className="text-2xl font-medium">Practice locations</h2>
      {details?.appointmentNote && <p className="mt-3 font-medium">{details.appointmentNote}</p>}
      {doctor.locations.map(location => <div className="mt-6 border-t border-line pt-6" key={location.city + location.facility}>
        <h3 className="text-lg font-medium">{location.facility || "Independent practice"}</h3>
        <p className="mt-2 text-grey">{[location.locality,location.city].filter(Boolean).join(", ")}</p>
        {location.address && <p className="mt-2 leading-7 text-grey">{location.address}</p>}
        {partnered && location.consultingHours && <p className="mt-3 font-medium">Consulting hours: {location.consultingHours} IST</p>}
        {partnered && location.consultationFee != null && <p className="mt-2">Consultation fee: ₹{location.consultationFee}</p>}
        {partnered && location.practicePhone && <a className="mt-3 inline-flex min-h-11 items-center underline underline-offset-4" href={"tel:" + location.practicePhone}>Call the clinic</a>}
        <div className="mt-3 flex flex-wrap gap-3">
          {location.mapsUrl && /^https:\/\/(www\.google\.com|maps\.google\.com|share\.google)\//.test(location.mapsUrl) && <a className="docvy-pill" href={location.mapsUrl} target="_blank" rel="noopener noreferrer">Google Maps directions</a>}
          {partnered && <Link className="docvy-pill docvy-pill-primary" href={{ pathname: "/request", query: { provider: doctor.id, city: location.city, facility: location.facility } }}>Request appointment at this clinic</Link>}
        </div>
      </div>)}
      {!partnered && <div className="mt-4"><div className="doctor-profile-claim"><div><h3 className="font-medium">Is this your profile?</h3><p className="mt-2 text-sm text-grey">Make it yours. Share your practice details and choose how patients reach you.</p></div><Link className="doctor-claim-button" href={{ pathname: "/claim-profile", query: { provider: doctor.id } }}>Claim profile</Link></div><Link className="mt-4 inline-flex min-h-11 items-center text-sm underline underline-offset-4" href={{ pathname: "/remove-profile", query: { provider: doctor.id } }}>Request profile removal</Link></div>}
    </section>
  </div>;
}
