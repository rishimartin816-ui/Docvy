import IllustrationBackground from "@/components/IllustrationBackground";
import Link from "next/link";
import DiscoverySearch from "@/components/DiscoverySearch";
import { Breadcrumbs, DoctorCards } from "@/components/DirectoryPage";
import { cities, citySlug, searchDoctors, slugify, liveDoctors } from "@/lib/directory";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";
import { buildPageSocialMetadata } from "@/lib/metadata";

const title = "Find doctors and specialists across India";
const description = "Search DOCVY by doctor, symptom, specialty, or clinic. Explore patient guides and learn what to check before arranging an appointment in India.";
export function generateMetadata() {
  return { title, description, alternates: { canonical: "/doctors" }, ...buildPageSocialMetadata(title + " | DOCVY", description, "/doctors") };
}

export default function DoctorsPage({ searchParams }: { searchParams: { q?: string; specialty?: string; location?: string } }) {
  const query = typeof searchParams.q === "string" ? searchParams.q.slice(0, 120).trim() : "";
  const specialty = typeof searchParams.specialty === "string" ? searchParams.specialty : "";
  const city = typeof searchParams.location === "string" ? citySlug(searchParams.location) : "";
  const results = searchDoctors(query, city || undefined).filter((doctor) => !specialty || doctor.specialties.some((name) => slugify(name) === slugify(specialty)));
  return <div className="relative isolate overflow-hidden docvy-garden"><IllustrationBackground slug="doctors-find-care" alt="Meera and Ramesh compare doctor listings."  /><div className="mx-auto max-w-site px-5 py-12 sm:px-9">
    <Breadcrumbs items={[{ name: "Doctors", href: "/doctors" }]} />
    <h1 className="text-4xl font-bold sm:text-6xl">Find doctors across India</h1>
    <div className="mt-5"><DiscoverySearch query={query} city={city} /></div>
    <section className="mt-8"><h2 className="text-2xl font-bold">Doctor listings</h2>
      {results.length > 0 && <p className="mt-3 text-sm text-grey">{results.length} {results.length === 1 ? "doctor profile" : "doctor profiles"}{query ? ` matching “${query}”` : " available"}. Specialty matches help you explore the directory and do not replace a clinical assessment.</p>}
      {results.length ? <DoctorCards doctors={results} /> : <p className="mt-3">No live doctor listings match this search. You can <Link href="/specialties" className="underline">explore specialty guides</Link> while listings are being added.</p>}
    </section>
    <section className="mt-8"><h2 className="text-2xl font-bold">Browse by city</h2>
      <ul className="mt-3 flex flex-wrap gap-2">{cities.map(({ slug, name }) => <li key={slug}><Link className="docvy-pill" href={"/doctors/" + slug}>{name}</Link></li>)}</ul>
    </section>
    {!liveDoctors.length && !query && !specialty && !city && <section className="mt-8"><h2 className="mb-3 text-2xl font-bold">Try a fictional consultation</h2><Link className="docvy-pill" href={clinicCrmConfig()?.staging ? "/book" : "https://docvy-clinic-demo.vercel.app/book"}>Open the fictional booking demo</Link></section>}
  </div></div>;
}
