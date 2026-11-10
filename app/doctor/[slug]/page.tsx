import DoctorPortrait from "@/components/DoctorPortrait";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/DirectoryPage";
import { slugify } from "@/lib/directory";
import { getDirectoryDoctors } from "@/lib/public-directory";
import { canRequestAppointment, isVerified } from "@/lib/profile-policy";
import { buildPageSocialMetadata, productionOrigin } from "@/lib/metadata";

export const dynamic = "force-dynamic";
type Props = { params: { slug: string } };
async function lookup(slug: string) {
  const doctor = (await getDirectoryDoctors()).find(item => slugify(item.id) === slug);
  if (!doctor) notFound();
  return doctor;
}
export async function generateMetadata({ params }: Props) {
  const doctor = await lookup(params.slug);
  const description = `${doctor.name}: ${doctor.specialties.join(", ")} ${doctor.hospital ? "at " + doctor.hospital + ", " : "in "}${doctor.locations[0].city}. Read the sourced profile and DOCVY partnership status.`;
  const path = "/doctor/" + params.slug;
  return { title: doctor.name, description, alternates: { canonical: path }, ...buildPageSocialMetadata(doctor.name + " | DOCVY", description, path) };
}
export default async function DoctorPage({ params }: Props) {
  const doctor = await lookup(params.slug);
  const partnered = canRequestAppointment(doctor);
  const verified = isVerified(doctor);
  const path = "/doctor/" + params.slug;
  return <div className="mx-auto max-w-5xl px-5 py-12 sm:px-9">
    <Breadcrumbs items={[{ name: "Doctors", href: "/doctors" }, { name: doctor.name, href: path }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": doctor.specialties.includes("Dentistry") ? "Dentist" : "Physician",
      name: doctor.name, url: productionOrigin + path, ...(doctor.sourceUrl !== productionOrigin + path ? { sameAs: doctor.sourceUrl } : {}),
      ...(partnered && doctor.photoUrl ? { image: doctor.photoUrl } : {}),
      ...(verified ? { identifier: { "@type": "PropertyValue", propertyID: doctor.registrationCouncil, value: doctor.registrationNumber } } : {}),
    }).replace(/</g, "\\u003c") }} />
    <div className="flex flex-col items-start gap-6 sm:flex-row"><DoctorPortrait name={doctor.name} src={partnered ? doctor.photoUrl : null} large /><div>
      <h1 className="text-4xl font-medium sm:text-5xl">{doctor.name}</h1>
      <p className="mt-4">{doctor.specialties.join(", ")}</p>
      <p className="mt-3 text-grey">{[doctor.hospital, doctor.locations[0].city].filter(Boolean).join(" · ")}</p>
      {verified && <div className="mt-4"><strong className="text-primary">DOCVY Verified</strong><p className="mt-2 text-sm">Registration: {doctor.registrationNumber} · {doctor.registrationCouncil}</p></div>}
      {!partnered && <p className="mt-5 font-medium">Not yet partnered with DOCVY</p>}
    </div></div>
    {partnered && doctor.summary && <section className="mt-8"><h2 className="text-2xl font-medium">About the doctor</h2><p className="mt-4 max-w-3xl leading-8">{doctor.summary}</p></section>}
    <section className="docvy-glass mt-8 p-6"><h2 className="text-2xl font-medium">Practice location</h2>
      {doctor.locations.map(location => <div className="mt-4" key={location.city + location.facility}><h3 className="font-medium">{location.facility || "Independent practice"}</h3><p className="mt-2 text-grey">{[location.locality,location.city].filter(Boolean).join(", ")}</p>{location.address && <p className="mt-2 text-grey">{location.address}</p>}
        {partnered && <Link className="docvy-pill docvy-pill-primary mt-5" href={{ pathname: "/request", query: { provider: doctor.id, city: location.city, facility: location.facility } }}>Request appointment</Link>}
      </div>)}
      {partnered && <p className="mt-4 text-sm text-grey">This does not reserve a slot. The clinic confirms time and fee.</p>}
      {!partnered && <div className="mt-4"><div className="doctor-profile-claim"><div><h3 className="font-medium">Is this your profile?</h3><p className="mt-2 text-sm text-grey">Make it yours. Share your practice details and choose how patients reach you.</p></div><Link className="doctor-claim-button" href={{ pathname: "/claim-profile", query: { provider: doctor.id } }}>Claim profile</Link></div><Link className="mt-4 inline-flex min-h-11 items-center text-sm underline underline-offset-4" href={{ pathname: "/remove-profile", query: { provider: doctor.id } }}>Request profile removal</Link></div>}
    </section>
  </div>;
}
