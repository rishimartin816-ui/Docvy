import Link from "next/link";
import DiscoverySearch from "@/components/DiscoverySearch";
import { Breadcrumbs, DoctorCards } from "@/components/DirectoryPage";
import { availableCities, cities, citySlug, searchDoctors, specialtyMatches } from "@/lib/directory";
import { getDirectoryDoctors } from "@/lib/public-directory";
import { buildPageSocialMetadata } from "@/lib/metadata";
export const dynamic = "force-dynamic";
const title = "Find Doctors by Specialty & City | DOCVY";
const description = "Search doctors by specialty, hospital, city and neighbourhood across India. Compare sourced practice details and request a visit where a provider has opted in.";
export function generateMetadata() { return { title: { absolute: title }, description, alternates: { canonical: "/doctors" }, ...buildPageSocialMetadata(title, description, "/doctors") }; }
type Filters = { q?: string; specialty?: string; location?: string; area?: string; page?: string };
export default async function DoctorsPage({ searchParams }: { searchParams: Filters }) {
  const listed = await getDirectoryDoctors();
  const query = typeof searchParams.q === "string" ? searchParams.q.slice(0, 120).trim() : "";
  const specialty = typeof searchParams.specialty === "string" ? searchParams.specialty : "";
  const city = typeof searchParams.location === "string" ? citySlug(searchParams.location) : "";
  const area = typeof searchParams.area === "string" ? searchParams.area.slice(0,120).trim() : "";
  const results = searchDoctors(query, city || undefined, listed).filter(d => (!specialty || d.specialties.some(name => specialtyMatches(name, specialty))) && (!area || d.locations.some(l=>(!city || citySlug(l.city)===city) && l.locality?.toLowerCase()===area.toLowerCase())));
  const pages = Math.max(1, Math.ceil(results.length / 20));
  const page = Math.min(pages, Math.max(1, Number.parseInt(searchParams.page || "1", 10) || 1));
  const href = (p: number) => ({ pathname: "/doctors", query: { ...(query ? { q: query } : {}), ...(city ? { location: city } : {}), ...(area ? {area} : {}), ...(specialty ? { specialty } : {}), page: p } });
  return <div className="mx-auto max-w-site px-5 py-12 sm:px-9">
    <Breadcrumbs items={[{ name: "Doctors", href: "/doctors" }]} />
    <h1 className="text-4xl font-medium sm:text-6xl">Find doctors by specialty and city.</h1>
    <p className="mt-5 max-w-3xl leading-8">Compare listed specialties and practice locations. You can request an appointment when the doctor or clinic has opted in.</p>
    <div className="mt-6"><DiscoverySearch query={query} city={city} area={area} /></div>
    {/\bnear\s+me\b/i.test(query) && !city && <p className="mt-4 text-sm text-grey">To narrow these results to your area, choose a city or select Use my location. Results are not ordered by distance to a doctor.</p>}
    <section className="mt-8"><h2 className="text-2xl font-medium">Doctor listings</h2>
      <p className="mt-3 text-sm text-grey">{results.length} {results.length === 1 ? "profile" : "profiles"}{query ? ` matching “${query}”` : ""}. Appointment requests are available only for doctors who have opted in. A specialty match does not replace a clinical assessment.</p>
      {results.length ? <DoctorCards doctors={results.slice((page - 1) * 20, page * 20)} /> : <p className="mt-5">No profiles match this search. <Link href="/doctors" className="underline">Clear the filters</Link> or <Link href="/specialties" className="underline">explore specialty guides</Link>.</p>}
      {pages > 1 && <nav aria-label="Doctor directory pages" className="mt-8 flex flex-wrap items-center gap-3">{page > 1 && <Link href={href(page - 1)} className="docvy-pill">Previous</Link>}<span>Page {page} of {pages}</span>{page < pages && <Link href={href(page + 1)} className="docvy-pill">Next</Link>}</nav>}
    </section>
    <section className="mt-10"><h2 className="text-2xl font-medium">Browse by city</h2><ul className="mt-4 flex flex-wrap gap-2">{availableCities(listed).map(c => <li key={c.slug}><Link className="docvy-pill" href={cities.some(known=>known.slug===c.slug) ? "/doctors/" + c.slug : "/doctors?location=" + c.slug}>{c.name}</Link></li>)}</ul></section>
  </div>;
}
