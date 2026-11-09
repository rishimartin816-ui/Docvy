import DoctorPortrait from "@/components/DoctorPortrait";
import IllustrationBackground from "@/components/IllustrationBackground";
import Link from "next/link";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";
import CityWaitlist from "./CityWaitlist";
import { cities, citySlug, directorySpecialties, doctorsIn, popularProcedures, directoryProcedures, slugify } from "@/lib/directory";
import type { ProviderCandidate } from "@/lib/provider-candidates";
import { productionOrigin } from "@/lib/metadata";

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  const trail = [{ name: "Home", href: "/" }, ...items];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: trail.map(({ name, href }, i) => ({ "@type": "ListItem", position: i + 1, name, item: productionOrigin + href })),
    }).replace(/</g, "\\u003c") }} />
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="flex flex-wrap gap-2">{trail.map(({ name, href }, i) => <li key={href} className="flex gap-2">
        {i > 0 && <span aria-hidden="true">/</span>}
        {i === trail.length - 1 ? <span aria-current="page">{name}</span> : <Link href={href} className="underline underline-offset-4">{name}</Link>}
      </li>)}</ol>
    </nav>
  </>;
}

export function DoctorCards({ doctors }: { doctors: ProviderCandidate[] }) {
  return <ul className="mt-5 grid gap-4 sm:grid-cols-2">{doctors.map((doctor) => <li key={doctor.id} className="docvy-glass p-5">
    <div className="flex items-start gap-4"><DoctorPortrait name={doctor.name} src={doctor.photoUrl} /><div className="min-w-0">
    <h3 className="text-xl font-bold"><Link href={"/doctor/" + slugify(doctor.id)} className="underline underline-offset-4">{doctor.name}</Link></h3>
    <p className="mt-2 text-sm leading-6"><span className="font-semibold">Specialty:</span> {doctor.specialties.join(", ")}</p>
    <p className="mt-2 text-sm text-grey">{doctor.experienceLabel ? doctor.experienceLabel + " of experience" : "Experience details awaiting confirmation"}</p>
    </div></div>
    <p className="mt-2 text-sm text-grey">{doctor.locations.map(({ city, facility, locality }) => [facility, locality, citySlug(city) === "gurgaon" ? "Gurgaon" : city].filter(Boolean).join(", ")).join(" · ")}</p>
    {doctor.summary && <p className="mt-3 text-sm leading-6 text-grey">{doctor.summary}</p>}
    <Link href={{ pathname: "/request", query: { provider: doctor.id, city: doctor.locations[0].city, facility: doctor.locations[0].facility } }} className="docvy-pill docvy-pill-primary mt-5">Request through DOCVY</Link>
    <p className="mt-2 text-xs text-grey">Availability and fees are confirmed after provider acceptance.</p>
  </li>)}</ul>;
}

export default function DirectoryPage({ city, specialty }: { city: typeof cities[number]; specialty?: typeof directorySpecialties[number] }) {
  const doctors = doctorsIn(city.slug, specialty?.slug);
  const ready = doctors.length >= 3;
  const cityPath = "/doctors/" + city.slug;
  const title = (specialty ? specialty.name + " doctors" : "Doctors") + " in " + city.name;
  const cityDoctors = doctorsIn(city.slug);
  const availableSpecialties = directorySpecialties.filter(({ slug }) => doctorsIn(city.slug, slug).length > 0);
  const procedureList = directoryProcedures.filter(({ slug, specialty: name }) => specialty ? slugify(name) === specialty.slug : popularProcedures.includes(slug));
  const items = [{ name: "Doctors", href: "/doctors" }, { name: city.name, href: cityPath }, ...(specialty ? [{ name: specialty.name, href: cityPath + "/" + specialty.slug }] : [])];

  return <div className="docvy-garden"><div className="mx-auto max-w-site px-5 py-12 sm:px-9">
    <Breadcrumbs items={items} />
    <h1 className="text-4xl font-bold sm:text-6xl">{title}</h1>
    <p className="mt-5 max-w-3xl leading-7">{city.intro}</p>
    {ready && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "ItemList",
      itemListElement: doctors.map((doctor, i) => ({ "@type": "ListItem", position: i + 1, name: doctor.name, url: productionOrigin + "/doctor/" + slugify(doctor.id) })),
    }).replace(/</g, "\\u003c") }} />}
    <section className="relative isolate mt-8 overflow-hidden rounded-card border border-line p-6">
      {!ready && <IllustrationBackground slug="empty-state-more-options" alt="Meera makes a note to look for more care options later." />}
      <h2 className="text-2xl font-bold">{ready ? "Doctor listings" : "Doctors are joining soon"}</h2>
      {ready ? <DoctorCards doctors={doctors} /> : <CityWaitlist city={city.slug} specialty={specialty?.slug} enabled={process.env.DOCVY_WAITLIST_ENABLED === "true" && Boolean(clinicCrmConfig())} />}
    </section>
    <section className="mt-8">
      <h2 className="text-2xl font-bold">Specialties {cityDoctors.length ? "with listings" : "to explore"}</h2>
      <ul className="mt-3 flex flex-wrap gap-2">{(availableSpecialties.length ? availableSpecialties : directorySpecialties).map(({ slug, name }) =>
        <li key={slug}><Link href={cityPath + "/" + slug} className="docvy-pill">{name}</Link></li>
      )}</ul>
    </section>
    {procedureList.length > 0 && <section className="mt-8">
      <h2 className="text-2xl font-bold">Procedure guides</h2>
      <ul className="mt-3 flex flex-wrap gap-2">{procedureList.map(({ slug, name }) => <li key={slug}><Link href={"/surgeries/" + slug} className="docvy-pill">{name}</Link></li>)}</ul>
    </section>}
    <section className="relative isolate mt-8 overflow-hidden rounded-card border border-line p-6">
      {!ready && <IllustrationBackground slug="empty-state-more-options" alt="Meera makes a note to look for more care options later." />}<h2 className="text-2xl font-bold">Questions about finding care in {city.name}</h2>
      <h3 className="mt-4 font-bold">{city.question}</h3><p className="mt-1">{city.answer}</p>
      <h3 className="mt-4 font-bold">How do I confirm an appointment?</h3><p className="mt-1">Check the clinic’s location, availability, and fee directly before you travel.</p>
    </section>
  </div></div>;
}
