import { ArrowRight, MapPin, Search } from "lucide-react";
import { providerCities } from "@/lib/provider-candidates";

export default function PatientSearchCard() {
  return (
    <div className="w-full rounded-[22px] border border-[#DCEAE5] bg-white/95 p-4 shadow-[0_18px_44px_rgba(23,58,55,0.12)] sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] font-extrabold tracking-[0.12em] text-[#526D66]">SEARCH A CONCERN, SPECIALTY &amp; CITY</p>
        <span className="rounded-full bg-[#DDF0E9] px-3 py-1 text-[10px] font-extrabold tracking-wide text-[#087F83]">PATIENT GUIDE · INDIA</span>
      </div>
      <form action="/care-guide" method="get" role="search" aria-label="Search the patient guide">
        <label htmlFor="homepage-guide-search" className="sr-only">Search a health concern, condition, or specialty</label>
        <div className="flex min-h-[54px] items-center gap-3 rounded-xl border border-[#C9DDD5] bg-[#F6FAF8] px-4 focus-within:ring-2 focus-within:ring-[#087F83]">
          <Search size={19} aria-hidden="true" className="shrink-0 text-[#087F83]" />
          <input id="homepage-guide-search" name="q" type="search" maxLength={100} placeholder="Try diabetes or joint pain" className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#173A37] outline-none placeholder:text-[#789089]" />
          <button type="submit" aria-label="Search patient guide" className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#087F83] px-3 text-xs font-bold text-white transition hover:bg-[#066D70]">
            Search <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 flex min-h-12 items-center gap-3 rounded-xl border border-[#C9DDD5] bg-[#F6FAF8] px-4 focus-within:ring-2 focus-within:ring-[#087F83]">
          <MapPin size={18} aria-hidden="true" className="shrink-0 text-[#087F83]" />
          <label htmlFor="homepage-guide-city" className="sr-only">Filter current doctor listings by city</label>
          <select id="homepage-guide-city" name="city" defaultValue="" className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#173A37] outline-none">
            <option value="">Any current city</option>
            {providerCities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
          <span className="shrink-0 text-[10px] font-bold text-[#789089]">OPTIONAL</span>
        </div>
      </form>
      <p className="mt-3 text-[11px] leading-5 text-[#526D66]">The guide is available across India; city choices filter today’s doctor listings. This is not a diagnosis or treatment recommendation.</p>
    </div>
  );
}
