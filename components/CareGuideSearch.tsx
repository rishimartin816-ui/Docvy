"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Activity, ArrowRight, ExternalLink, HeartPulse, MapPin, Search, Sparkles, Stethoscope, X } from "lucide-react";
import { careGuide } from "@/lib/care-guide";
import { providerCandidates, providerCities, type ProviderCity } from "@/lib/provider-candidates";

const examples = ["diabetes", "skin rash", "pregnancy", "joint pain", "children", "heart"];
const featuredSpecialties = ["General physician / internal medicine", "Cardiology", "Dermatology", "Diabetology / endocrinology"];
const featuredIcons = { "General physician / internal medicine": Stethoscope, Cardiology: HeartPulse, Dermatology: Sparkles, "Diabetology / endocrinology": Activity };
const searchFillers = new Set(["a", "an", "and", "are", "can", "doctor", "doctors", "do", "does", "for", "have", "help", "i", "kind", "me", "my", "of", "or", "see", "should", "specialist", "specialists", "specialty", "specialties", "the", "to", "type", "what", "which", "with"]);
const anyCurrentCity = "Any current city";

export default function CareGuideSearch() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<ProviderCity | typeof anyCurrentCity>(anyCurrentCity);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q");
    const initialCity = params.get("city");
    if (initialQuery) setQuery(initialQuery);
    if (initialCity && providerCities.includes(initialCity as ProviderCity)) setCity(initialCity as ProviderCity);
  }, []);
  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
    if (!term) return careGuide;
    const words = term.split(/\s+/).filter(Boolean).filter((word) => !searchFillers.has(word));
    return careGuide.filter((item) => {
      const searchable = [item.specialty, item.description, ...item.examples, ...item.keywords].join(" ").toLocaleLowerCase();
      return words.length === 0 || words.every((word) => searchable.includes(word));
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
    <div className="mt-4 grid gap-3 rounded-2xl border border-[#DCEAE5] bg-white p-4 sm:grid-cols-[minmax(0,.9fr)_1.1fr] sm:items-end">
      <div>
        <label htmlFor="care-guide-city" className="mb-2 block text-sm font-bold text-[#173A37]">Choose a city to narrow doctor listings</label>
        <div className="flex min-h-12 items-center gap-3 rounded-xl border border-[#C9DDD5] bg-[#F6FAF8] px-4 focus-within:ring-2 focus-within:ring-[#087F83]">
          <MapPin size={18} aria-hidden="true" className="shrink-0 text-[#087F83]" />
          <select id="care-guide-city" value={city} onChange={(event) => setCity(event.target.value as ProviderCity | typeof anyCurrentCity)} className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#173A37] outline-none">
            <option value={anyCurrentCity}>Any current city</option>
            {providerCities.map((providerCity) => <option key={providerCity} value={providerCity}>{providerCity}</option>)}
          </select>
        </div>
      </div>
      <p className="text-xs leading-5 text-[#526D66]">The guide is available across India. Current source-linked doctor listings are in Delhi, Gurugram and Noida.</p>
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Example searches"><span className="mr-1 text-xs font-semibold text-[#789089]">Try:</span>{examples.map((term) => <button key={term} type="button" onClick={() => { setQuery(term); setShowAll(false); }} className="rounded-full border border-[#C9DDD5] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#36564F] transition hover:border-[#087F83] hover:bg-white hover:text-[#087F83]">{term}</button>)}</div>
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><p className="text-sm font-semibold text-[#36564F]" aria-live="polite">{query.trim() ? `${results.length} ${results.length === 1 ? "specialty" : "specialties"} match this search` : `${showAll ? careGuide.length : visibleResults.length} of ${careGuide.length} specialties`}<span className="mt-1 block text-xs font-normal text-[#789089]">{city === anyCurrentCity ? "Current doctor listings: Delhi · Gurugram · Noida" : `Doctor listings filtered to ${city}`}</span></p>{!query.trim() && <button type="button" onClick={() => setShowAll((value) => !value)} className="rounded-lg px-3 py-2 text-xs font-bold text-[#087F83] underline decoration-[#B8DCD0] underline-offset-4 hover:bg-[#EAF5F1]">{showAll ? "Show common starting points" : `Browse all ${careGuide.length} specialties`}</button>}</div>
    {visibleResults.length ? <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleResults.map((item) => {
      const Icon = featuredIcons[item.specialty as keyof typeof featuredIcons] ?? Search;
      const profileMatches = providerCandidates.filter((doctor) => doctor.specialties.some((specialty) => item.directorySpecialties?.includes(specialty)));
      const cityMatches = city === anyCurrentCity ? profileMatches : profileMatches.filter((doctor) => doctor.locations.some((location) => location.city === city));
      const directoryParams = new URLSearchParams();
      if (item.directoryQuery) directoryParams.set("q", item.directoryQuery);
      if (city !== anyCurrentCity) directoryParams.set("city", city);
      const directoryQuery = directoryParams.toString();
      const directoryHref = directoryQuery ? `/doctors?${directoryQuery}` : "/doctors";
      const browseCityHref = city === anyCurrentCity ? "/doctors" : `/doctors?city=${encodeURIComponent(city)}`;
      const coverageLabel = city === anyCurrentCity ? "Delhi NCR" : city;
      return <article key={item.specialty} className="group flex flex-col rounded-2xl border border-[#DCEAE5] bg-white p-5 shadow-[0_6px_24px_rgba(23,58,55,0.025)] transition hover:-translate-y-0.5 hover:border-[#B8DCD0] hover:shadow-[0_16px_36px_rgba(23,58,55,0.08)] md:p-6">
        <div className="flex items-start justify-between gap-3"><h2 className="text-lg font-bold text-[#173A37]">{item.specialty}</h2><span aria-hidden="true" className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F1] text-[#087F83]"><Icon size={18} /></span></div>
        <p className="mt-2 text-sm leading-6 text-[#526D66]">{item.description}</p>
        <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.1em] text-[#087F83]">Examples people may search</h3>
        <ul className="mt-2 space-y-2">{item.examples.map((example) => <li key={example} className="flex gap-2 text-sm leading-6 text-[#36564F]"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16A6A1]" />{example}</li>)}</ul>
        {item.references?.length ? <div className="mt-4 rounded-xl border border-[#DCEAE5] bg-white/80 p-3"><p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#789089]">Health information references</p><ul className="mt-2 space-y-2">{item.references.map((reference) => <li key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold leading-5 text-[#087F83] underline decoration-[#B8DCD0] underline-offset-2 hover:text-[#066D70]">{reference.label}<ExternalLink size={12} aria-hidden="true" /></a></li>)}</ul></div> : null}
        <div className="mt-5 flex-1 rounded-xl bg-[#F5FAF7] p-4">
          <div className="flex items-center gap-2 text-xs font-extrabold tracking-wide text-[#087F83]"><MapPin size={15} aria-hidden="true" />CURRENT DIRECTORY COVERAGE</div>
          {cityMatches.length ? <><p className="mt-2 text-sm leading-6 text-[#36564F]">{cityMatches.length} source-linked {cityMatches.length === 1 ? "profile lists" : "profiles list"} a related specialty in {coverageLabel}.</p><p className="mt-1 text-xs leading-5 text-[#789089]">These are directory matches, not recommendations. DOCVY review and appointment availability are pending.</p><Link href={directoryHref} className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#087F83] hover:text-[#066D70]">View matching profiles{city !== anyCurrentCity ? ` in ${city}` : ""} <ArrowRight size={15} aria-hidden="true" /></Link></> : <><p className="mt-2 text-sm leading-6 text-[#36564F]">{profileMatches.length ? `No related profiles are currently listed in ${city}.` : "No related profiles are listed in DOCVY today."}</p><p className="mt-1 text-xs leading-5 text-[#789089]">The guide is available across India; current doctor listings cover Delhi, Gurugram and Noida.</p><Link href={browseCityHref} className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#087F83] hover:text-[#066D70]">{city === anyCurrentCity ? "Browse current cities" : `Browse all doctors in ${city}`} <ArrowRight size={15} aria-hidden="true" /></Link></>}
        </div>
      </article>;
    })}</div> : query.trim() ? <div className="mt-4 rounded-2xl border border-[#DCEAE5] bg-white p-6"><h2 className="font-bold text-[#173A37]">No exact match in this guide</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">Try a broader term or speak with a general physician, who can help assess an unclear concern and advise whether specialist care may be useful.</p><Link href={city === anyCurrentCity ? "/doctors" : `/doctors?city=${encodeURIComponent(city)}`} className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#087F83] hover:text-[#066D70]">{city === anyCurrentCity ? "Browse current doctor listings" : `Browse doctors in ${city}`} <ArrowRight size={15} aria-hidden="true" /></Link></div> : null}
  </>;
}
