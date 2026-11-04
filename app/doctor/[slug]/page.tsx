import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/DirectoryPage";
import { liveDoctors, citySlug, slugify } from "@/lib/directory";
import { buildPageSocialMetadata, productionOrigin } from "@/lib/metadata";
import { crmIntakeConfig, providersWithAppointmentIntake } from "@/lib/appointment-intake";

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
  const routed = crmIntakeConfig() ? (await providersWithAppointmentIntake([doctor]))[0] : undefined;
  return <div className="docvy-garden"><div className="mx-auto max-w-5xl px-5 py-12 sm:px-9">
    <Breadcrumbs items={[{ name: "Doctors", href: "/doctors" }, { name: doctor.name, href: path }]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "Physician", name: doctor.name, url: productionOrigin + path, sameAs: doctor.sourceUrl,
      ...(verified ? { identifier: { "@type": "PropertyValue", propertyID: "Medical registration", value: doctor.nmcRegistrationNumber } } : {}),
    }).replace(/</g, "\\u003c") }} />
    <h1 className="text-4xl font-bold sm:text-6xl">{doctor.name}</h1>
    <p className="mt-3">{doctor.specialties.join(", ")}</p>
    {verified && <p className="mt-3"><strong className="rounded-full border border-line bg-primary-tint px-2 py-1 text-primary">Verified</strong> · NMC registration {doctor.nmcRegistrationNumber}</p>}
    <section className="docvy-glass mt-6 p-6"><h2 className="text-2xl font-bold">Practice locations</h2>
      <ul className="mt-3 space-y-3">{doctor.locations.map((location) => <li key={location.city + location.facility}>
        {location.facility}, {citySlug(location.city) === "gurgaon" ? "Gurgaon" : location.city}
        {routed?.locations.some(({ city, facility }) => city === location.city && facility === location.facility) &&
          <Link className="docvy-pill docvy-pill-primary ml-3" href={{ pathname: "/request", query: { provider: doctor.id, city: location.city, facility: location.facility } }}>Request an appointment</Link>}
      </li>)}</ul>
      <a className="docvy-pill mt-5" href={doctor.sourceUrl}>View official hospital profile</a>
    </section>
  </div></div>;
}
