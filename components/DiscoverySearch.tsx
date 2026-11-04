import { Search } from "lucide-react";
import { liveCities } from "@/lib/directory";

export default function DiscoverySearch({ query = "", city = "" }: { query?: string; city?: string }) {
  return <div>
    <form action="/doctors" className="docvy-glass flex flex-wrap items-end gap-3 p-4">
      <label className="min-w-0 flex-1 basis-52 text-sm font-semibold">
        <span className="mb-1.5 block">Find care</span>
        <input type="search" name="q" defaultValue={query} maxLength={120} placeholder="Symptom, doctor, specialty or clinic" className="docvy-select min-h-12" />
      </label>
      {liveCities.length > 0 && <label className="min-w-32 text-sm font-semibold">
        <span className="mb-1.5 block">City (optional)</span>
        <select name="location" defaultValue={city} className="docvy-select min-h-12">
          <option value="">All India</option>
          {liveCities.map(({ slug, name }) => <option key={slug} value={slug}>{name}</option>)}
        </select>
      </label>}
      <button type="submit" className="docvy-pill docvy-pill-primary"><Search size={17} strokeWidth={1.5} aria-hidden="true" /> Search</button>
    </form>
    <p className="mt-3 text-sm text-danger">In an emergency, call <a href="tel:112" className="inline-flex min-h-11 items-center font-bold underline">112</a> or go to the nearest hospital.</p>
  </div>;
}
