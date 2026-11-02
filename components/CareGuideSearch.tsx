"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Activity, ArrowRight, HeartPulse, MapPin, Search, Sparkles, Stethoscope, X } from "lucide-react";
import { careGuide } from "@/lib/care-guide";
import { providerCandidates } from "@/lib/provider-candidates";

const examples = ["diabetes", "skin rash", "pregnancy", "joint pain", "children", "heart"];
const featuredSpecialties = ["General physician / internal medicine", "Cardiology", "Dermatology", "Diabetology / endocrinology"];
const featuredIcons = { "General physician / internal medicine": Stethoscope, Cardiology: HeartPulse, Dermatology: Sparkles, "Diabetology / endocrinology": Activity };

export default function CareGuideSearch() {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get("q");
    if (initialQuery) setQuery(initialQuery);
  }, []);
  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return careGuide;
    const words = term.split(/\s+/).filter(Boolean);
    return careGuide.filter((item) => {
      const searchable = [item.specialty, item.description, ...item.examples, ...item.keywords].join(" ").toLocaleLowerCase();
      return words.some((word) => searchable.includes(word));
    });
  }, [query]);
  const visibleResults = query.trim() || showAll ? results : careGuide.filter((item) => featuredSpecialties.includes(item.specialty));

  return <>
    <label htmlFor="care-guide-search" className="sr-only">Search a condition, concern, or specialty</label>
    <div className="mt-8 flex min-h-14 max-w-2xl items-center gap-3 rounded-xl border border-[#C9DDD5] bg-white px-4 shadow-sm focus-within:ring-2 focus-within:ring-[#087F83]">
      <Search size={20} aria-hidden="true" className="shrink-0 text-[#087F83]" />
      <input id="care-guide-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try diabetes, skin rash, pregnancy, or heart" className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm text-[#173A37] outline-none placeholder:text-[#789089]" />
      {query && <button type="button" onClick={() => setQuery("")} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#526D66] hover:bg-[#EAF5F1]" aria-label="Clear search"><X size={17} /></button>}
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Example searches"><span className="mr-1 text-xs font-semibold text-[#789089]">Try:</span>{examples.map((term) => <button key={term} type="button" onClick={() => { setQuery(term); setShowAll(false); }} className="rounded-full border border-[#C9DDD5] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#36564F] transition hover:border-[#087F83] hover:bg-white hover:text-[#087F83]">{term}</button>)}</div>
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-semibold text-[#36564F]" aria-live="polite">{query.trim() ? `${results.length} ${results.length === 1 ? "specialty" : "specialties"} match this search` : `${showAll ? careGuide.length : visibleResults.length} of ${careGuide.length} specialties`}</p>{!query.trim() && <button type="button" onClick={() => setShowAll((value) => !value)} className="rounded-lg px-3 py-2 text-xs font-bold text-[#087F83] underline decoration-[#B8DCD0] underline-offset-4 hover:bg-[#EAF5F1]">{showAll ? "Show common starting points" : `Browse all ${careGuide.length} specialties`}</button>}</div>
    {visibleResults.length ? <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleResults.map((item) => {
      const Icon = featuredIcons[item.specialty as keyof typeof featuredIcons] ?? Search;
      const profileMatches = providerCandidates.filter((doctor) => doctor.specialties.some((specialty) => item.directorySpecialties?.includes(specialty)));
      const directoryHref = item.directoryQuery ? `/doctors?q=${encodeURIComponent(item.directoryQuery)}` : "/doctors";
      return <article key={item.specialty} className="group flex flex-col rounded-2xl border border-[#DCEAE5] bg-white p-5 shadow-[0_6px_24px_rgba(23,58,55,0.025)] transition hover:-translate-y-0.5 hover:border-[#B8DCD0] hover:shadow-[0_16px_36px_rgba(23,58,55,0.08)] md:p-6">
        <div className="flex items-start justify-between gap-3"><h2 className="text-lg font-bold text-[#173A37]">{item.specialty}</h2><span aria-hidden="true" className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F1] text-[#087F83]"><Icon size={18} /></span></div>
        <p className="mt-2 text-sm leading-6 text-[#526D66]">{item.description}</p>
        <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.1em] text-[#087F83]">Examples people may search</h3>
        <ul className="mt-2 space-y-2">{item.examples.map((example) => <li key={example} className="flex gap-2 text-sm leading-6 text-[#36564F]"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16A6A1]" />{example}</li>)}</ul>
        <div className="mt-5 flex-1 rounded-xl bg-[#F5FAF7] p-4">
          <div className="flex items-center gap-2 text-xs font-extrabold tracking-wide text-[#087F83]"><MapPin size={15} aria-hidden="true" />CURRENT DIRECTORY COVERAGE</div>
          {profileMatches.length ? <><p className="mt-2 text-sm leading-6 text-[#36564F]">{profileMatches.length} source-linked {profileMatches.length === 1 ? "profile lists" : "profiles list"} a related specialty in Delhi NCR.</p><p className="mt-1 text-xs leading-5 text-[#789089]">These are directory matches, not recommendations. DOCVY review and appointment availability are pending.</p><Link href={directoryHref} className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#087F83] hover:text-[#066D70]">View matching profiles <ArrowRight size={15} aria-hidden="true" /></Link></> : <><p className="mt-2 text-sm leading-6 text-[#36564F]">No matching profiles are listed in DOCVY today.</p><p className="mt-1 text-xs leading-5 text-[#789089]">This guide is available across India. Doctor listings will grow as source-linked provider coverage grows.</p><Link href="/doctors" className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#087F83] hover:text-[#066D70]">Browse current cities <ArrowRight size={15} aria-hidden="true" /></Link></>}
        </div>
      </article>;
    })}</div> : query.trim() ? <div className="mt-4 rounded-2xl border border-[#DCEAE5] bg-white p-6"><h2 className="font-bold text-[#173A37]">No exact match in this guide</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">Try a broader term or speak with a general physician, who can help assess an unclear concern and advise whether specialist care may be useful.</p></div> : null}
  </>;
}
