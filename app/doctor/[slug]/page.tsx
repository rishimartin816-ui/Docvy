import DoctorPortrait from "@/components/DoctorPortrait";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/DirectoryPage";
import { liveDoctors, citySlug, slugify } from "@/lib/directory";
import { buildPageSocialMetadata, productionOrigin } from "@/lib/metadata";


type Props = { params: { slug: string } };
function lookup(slug: string) {
  const doctor = liveDoctors.find((item) => slugify(item.id) === slug);
  if (!doctor) notFound();
  return doctor;
}
export function generateStaticParams() { return liveDoctors.map(({ id }) => ({ slug: slugify(id) })); }
export function generateMetadata({ params }: Props) {
  const doctor = lookup(params.slug);
  const description = "View " + doctor.name + "’s specialties, practice locations, and official hospital profile on DOCVY.";
  const path = "/doctor/" + params.slug;
  return { title: doctor.name, description, alternates: { canonical: path }, ...buildPageSocialMetadata(doctor.name + " | DOCVY", description, path) };
}
export default async function DoctorPage({ params }: Props) {
  const doctor = lookup(params.slug);
  const path = "/doctor/" + params.slug;
  const verified = doctor.manuallyVerified === true && Boolean(doctor.nmcRegistrationNumber?.trim());

  return <div className="docvy-garden"><div className="mx-auto max-w-5xl px-5 py-12 sm:px-9">
    <Breadcrumbs items={[{ name: "Doctors", href: "/doctors" }, { name: doctor.name, href: path }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "Physician", name: doctor.name, url: productionOrigin + path, sameAs: doctor.sourceUrl,
      ...(doctor.photoUrl ? { image: doctor.photoUrl } : {}),
      ...(verified ? { identifier: { "@type": "PropertyValue", propertyID: "Medical registration", value: doctor.nmcRegistrationNumber } } : {}),
    }).replace(/</g, "\\u003c") }} />
    <div className="flex flex-col items-start gap-6 sm:flex-row"><DoctorPortrait name={doctor.name} src={doctor.photoUrl} large /><div className="min-w-0">
    <h1 className="text-4xl font-bold sm:text-6xl">{doctor.name}</h1>
    <p className="mt-3"><strong>Specialty:</strong> {doctor.specialties.join(", ")}</p>
    <p className="mt-3 text-grey">{doctor.experienceLabel ? doctor.experienceLabel + " of experience" : "Experience details awaiting confirmation"}</p>{doctor.summary && <p className="mt-4 max-w-3xl text-grey">{doctor.summary}</p>}
    {doctor.qualifications && <p className="mt-4 max-w-3xl text-sm leading-7"><strong>Published qualifications:</strong> {doctor.qualifications}</p>}
    {verified && <p className="mt-3"><strong className="rounded-full border border-line bg-primary-tint px-2 py-1 text-primary">Verified</strong> · NMC registration {doctor.nmcRegistrationNumber}</p>}
    </div></div>
    <section className="docvy-glass mt-6 p-6"><h2 className="text-2xl font-bold">Practice locations</h2>
      <ul className="mt-3 space-y-3">{doctor.locations.map((location) => <li className="rounded-2xl border border-line p-5" key={location.city + location.facility}>
        <h3 className="font-semibold">{location.facility}</h3>
        <p className="mt-2 text-sm leading-7 text-grey">{location.address ?? [location.locality, citySlug(location.city) === "gurgaon" ? "Gurgaon" : location.city].filter(Boolean).join(", ")}</p>
        {location.practicePhone && <p className="mt-2 text-sm text-grey">Published practice phone: {location.practicePhone}</p>}
        <div className="mt-4 flex flex-wrap items-center gap-4"><Link className="docvy-pill docvy-pill-primary" href={{ pathname: "/request", query: { provider: doctor.id, city: location.city, facility: location.facility } }}>Request through DOCVY</Link>
        {location.mapsUrl && <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline underline-offset-4">Open practice on Google Maps</a>}</div>
      </li>)}</ul>
      {doctor.publishedConsultingHours && <div className="mt-5 rounded-2xl bg-surface p-4"><h3 className="text-sm font-semibold">Published consulting hours</h3><p className="mt-2 text-sm">{doctor.publishedConsultingHours}</p><p className="mt-2 text-xs leading-6 text-grey">These hours come from the practice profile. They are not live slots and remain subject to provider confirmation.</p></div>}
      <p className="mt-5 text-sm leading-7 text-grey">Profile details, portrait and any experience figure shown are sourced from the official practice profile, checked {doctor.profileDetailsChecked ?? doctor.sourceChecked}. Addresses and directions are cross-checked with Maps where linked. A listing does not establish a DOCVY partnership or independently verify medical registration. The provider confirms availability.</p><a className="mt-3 inline-flex min-h-11 items-center text-sm underline underline-offset-4" href={doctor.sourceUrl} target="_blank" rel="noopener noreferrer">Official profile source</a>
      {doctor.procedureSourceUrl && <a className="ml-4 inline-flex min-h-11 items-center text-sm underline underline-offset-4" href={doctor.procedureSourceUrl} target="_blank" rel="noopener noreferrer">Procedure listing source</a>}
    </section>
  </div></div>;
}
