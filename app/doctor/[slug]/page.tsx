import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDirectoryDoctors } from "@/lib/public-directory";
import { doctorSlug, isVerified } from "@/lib/public-doctor-policy";
import { buildPageSocialMetadata } from "@/lib/metadata";

// Port of the established preview/doctor-glass-claim profile route, using this
// branch's design. No booking/claim links to flows absent from this branch.
export const dynamic = "force-dynamic";
type Props = { params: { slug: string } };
async function lookup(slug: string) {
  const doctor = (await getDirectoryDoctors()).find(item => doctorSlug(item.id) === slug);
  if (!doctor) notFound();
  return doctor;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doctor = await lookup(params.slug);
  const path = "/doctor/" + doctorSlug(doctor.id);
  const description = `${doctor.name}: ${doctor.specialties.join(", ")} at ${doctor.hospital}, ${doctor.locations[0].city}. Read the published DOCVY profile.`;
  return {
    title: doctor.name, description, alternates: { canonical: path },
    robots: { index: isVerified(doctor), follow: true },
    ...buildPageSocialMetadata(doctor.name + " | DOCVY", description, path),
  };
}

export default async function DoctorPage({ params }: Props) {
  const doctor = await lookup(params.slug);
  const verified = isVerified(doctor);
  const path = "/doctor/" + doctorSlug(doctor.id);
  const source = /^https:\/\//i.test(doctor.sourceUrl) ? doctor.sourceUrl : null;
  return <article className="mx-auto max-w-5xl px-6 py-12 text-[#173A37]">
    <nav aria-label="Breadcrumb" className="mb-6 text-sm"><Link href="/">Home</Link><span aria-hidden="true"> / </span><Link href="/doctors">Doctors</Link><span aria-hidden="true"> / </span><span aria-current="page">{doctor.name}</span></nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": doctor.specialties.includes("Dentistry") ? "Dentist" : "Physician",
      name: doctor.name, url: "https://www.docvy.in" + path, ...(source ? { sameAs: source } : {}),
      ...(verified ? { identifier: { "@type": "PropertyValue", propertyID: doctor.registrationCouncil, value: doctor.registrationNumber } } : {}),
    }).replace(/</g, "\\u003c") }} />
    <h1 className="text-4xl font-bold">{doctor.name}</h1>
    <p className="mt-4 text-lg">{doctor.specialties.join(", ")}</p>
    <p className="mt-3 text-[#526D66]">{doctor.hospital} · {doctor.locations[0].city}</p>
    {verified ? <div className="mt-5"><strong className="text-[#087F83]">DOCVY Verified</strong><p className="mt-2 text-sm">Registration: {doctor.registrationNumber} · {doctor.registrationCouncil}</p></div> : <p className="mt-5">DOCVY verification is pending.</p>}
    {doctor.consentGiven && doctor.summary && <section className="mt-8"><h2 className="text-2xl font-bold">About the doctor</h2><p className="mt-4 whitespace-pre-line leading-8">{doctor.summary}</p></section>}
    <section className="mt-8 rounded-2xl border border-[#DCEAE5] bg-[#F6FAF8] p-6"><h2 className="text-2xl font-bold">Practice locations</h2>
      <ul>{doctor.locations.map((location, index) => <li className="mt-4" key={index}><h3 className="font-bold">{location.facility}</h3><p className="mt-2">{location.city}</p></li>)}</ul>
      <p className="mt-5 text-sm leading-6">Contact the practice directly to confirm current availability, fees and appointment times. This profile does not reserve a slot.</p>
      {source && <a href={source} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center font-bold text-[#087F83] underline">Open the published practice source</a>}
    </section>
  </article>;
}
