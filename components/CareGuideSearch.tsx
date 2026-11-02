"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { careGuide } from "@/lib/care-guide";

export default function CareGuideSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return careGuide;
    const words = term.split(/\s+/).filter(Boolean);
    return careGuide.filter((item) => {
      const searchable = [item.specialty, item.description, ...item.examples, ...item.keywords].join(" ").toLocaleLowerCase();
      return words.some((word) => searchable.includes(word));
    });
  }, [query]);

  return <>
    <label htmlFor="care-guide-search" className="sr-only">Search a condition, concern, or specialty</label>
    <div className="mt-8 flex min-h-14 max-w-2xl items-center gap-3 rounded-xl border border-[#C9DDD5] bg-white px-4 shadow-sm focus-within:ring-2 focus-within:ring-[#087F83]">
      <Search size={20} aria-hidden="true" className="shrink-0 text-[#087F83]" />
      <input id="care-guide-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try diabetes, skin rash, pregnancy, or heart" className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm text-[#173A37] outline-none placeholder:text-[#789089]" />
      {query && <button type="button" onClick={() => setQuery("")} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#526D66] hover:bg-[#EAF5F1]" aria-label="Clear search"><X size={17} /></button>}
    </div>
    <p className="mt-3 text-xs leading-5 text-[#526D66]">This search filters guide content on this device. It does not send or save your search.</p>
    <p className="mt-6 text-sm font-semibold text-[#36564F]" aria-live="polite">{results.length} {results.length === 1 ? "specialty" : "specialties"}{query ? " match this guide search" : " in this guide"}</p>
    {results.length ? <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{results.map((item) => <article key={item.specialty} className="rounded-2xl border border-[#DCEAE5] bg-white p-5 md:p-6"><h2 className="text-lg font-bold text-[#173A37]">{item.specialty}</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">{item.description}</p><h3 className="mt-5 text-xs font-bold uppercase tracking-[0.1em] text-[#087F83]">Examples people may search</h3><ul className="mt-2 space-y-2">{item.examples.map((example) => <li key={example} className="flex gap-2 text-sm leading-6 text-[#36564F]"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16A6A1]" />{example}</li>)}</ul></article>)}</div> : <div className="mt-4 rounded-2xl border border-[#DCEAE5] bg-white p-6"><h2 className="font-bold text-[#173A37]">No exact match in this guide</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">Try a broader term or speak with a general physician, who can help assess an unclear concern and advise whether specialist care may be useful.</p></div>}
  </>;
}
