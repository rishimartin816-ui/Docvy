import { Search } from "lucide-react";
import { availableCities } from "@/lib/directory";
import { getDirectoryDoctors } from "@/lib/public-directory";
import LocationSearch from "./LocationSearch";
import { citySlug } from "@/lib/directory";

export default async function DiscoverySearch({ query = "", city = "", area = "", homepage = false }: { query?: string; city?: string; area?: string; homepage?: boolean }) {
  const doctors = await getDirectoryDoctors();
  const liveCities = availableCities(doctors).map(c=>({slug:c.slug,name:c.name,areas:Array.from(new Set(doctors.flatMap(d=>d.locations.filter(l=>citySlug(l.city)===c.slug).flatMap(l=>l.locality?[l.locality]:[])))).sort()}));
  return <div>
    <form action="/doctors" className="docvy-glass flex flex-wrap items-end gap-3 p-4">
      <label className="min-w-0 flex-1 basis-52 text-sm font-semibold">
        <span className="mb-1.5 block">{homepage ? "Doctor, specialty or hospital" : "Find a doctor"}</span>
        <input type="search" name="q" defaultValue={query} maxLength={120} placeholder="Symptom, doctor, specialty or clinic" className="docvy-select min-h-12" />
      </label>
      {liveCities.length > 0 && <LocationSearch cities={liveCities} city={city} area={area} />}
      <button type="submit" className="docvy-pill docvy-pill-primary"><Search size={17} strokeWidth={1.5} aria-hidden="true" /> {homepage ? "Find doctors" : "Search"}</button>
    </form>
    <p className="emergency-line mt-3 text-sm text-danger">In an emergency, call <a href="tel:112" className="inline-flex min-h-11 items-center font-bold underline">112</a> or go to the nearest hospital.</p>
  </div>;
}
