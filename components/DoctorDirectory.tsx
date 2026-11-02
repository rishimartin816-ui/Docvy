"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Building2, CalendarClock, ExternalLink, MapPin, Search } from "lucide-react";
import { providerCandidates, providerCities, providerSpecialties, type ProviderCity } from "@/lib/provider-candidates";

type CityFilter = "All Delhi NCR" | ProviderCity;

function formatFacility(facility: string, locality?: string) {
  if (!locality || facility.toLocaleLowerCase().includes(locality.toLocaleLowerCase())) return facility;
  return `${facility} · ${locality}`;
}

export default function DoctorDirectory({ initialCity = "All Delhi NCR", intakeEnabled = false }: { initialCity?: CityFilter; intakeEnabled?: boolean }) {
  const [city, setCity] = useState<CityFilter>(initialCity);
  const [specialty, setSpecialty] = useState("All specialties");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedSpecialty = params.get("specialty");
    const requestedCity = params.get("city");
    const requestedQuery = params.get("q");
    if (requestedSpecialty && providerSpecialties.includes(requestedSpecialty)) setSpecialty(requestedSpecialty);
    if (requestedCity && providerCities.includes(requestedCity as ProviderCity)) setCity(requestedCity as ProviderCity);
    if (requestedQuery) setQuery(requestedQuery);
  }, []);

  const matches = useMemo(() => {
    const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    return providerCandidates.filter((doctor) => {
      const inCity = city === "All Delhi NCR" || doctor.locations.some((location) => location.city === city);
      const inSpecialty = specialty === "All specialties" || doctor.specialties.includes(specialty);
      const searchable = [doctor.name, doctor.hospital, ...doctor.specialties, ...doctor.locations.map((location) => `${location.city} ${location.locality ?? ""} ${location.facility}`), ...doctor.otherNcrLocations].join(" ").toLocaleLowerCase();
      return inCity && inSpecialty && words.every((word) => searchable.includes(word));
    });
  }, [city, specialty, query]);

  const visibleCities = city === "All Delhi NCR" ? providerCities : [city];

  return <div>
    <section className="rounded-[24px] border border-[#DCEAE5] bg-white p-5 shadow-[0_10px_32px_rgba(23,58,55,0.04)] md:p-7" aria-label="Filter doctor profiles">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
        <div><label htmlFor="doctor-search" className="mb-2 block text-sm font-bold text-[#173A37]">Search by doctor, specialty, hospital or locality</label><div className="flex min-h-12 items-center gap-3 rounded-xl border border-[#C9DDD5] px-4 focus-within:ring-2 focus-within:ring-[#087F83]"><Search size={18} className="shrink-0 text-[#087F83]" /><input id="doctor-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="For example: cardiology, Saket, Fortis" className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#173A37] outline-none placeholder:text-[#789089]" /></div></div>
        <div><label htmlFor="specialty-filter" className="mb-2 block text-sm font-bold text-[#173A37]">Specialty</label><select id="specialty-filter" value={specialty} onChange={(event) => setSpecialty(event.target.value)} className="min-h-12 w-full rounded-xl border border-[#C9DDD5] bg-white px-4 text-sm text-[#173A37] focus:outline-none focus:ring-2 focus:ring-[#087F83]"><option>All specialties</option>{providerSpecialties.map((item) => <option key={item}>{item}</option>)}</select></div>
      </div>
      <div className="mt-5"><p className="mb-2 text-sm font-bold text-[#173A37]">City</p><div className="flex flex-wrap gap-2" role="group" aria-label="Filter by city">{(["All Delhi NCR", ...providerCities] as CityFilter[]).map((option) => <button key={option} type="button" aria-pressed={city === option} onClick={() => setCity(option)} className={`min-h-10 rounded-full px-4 text-sm font-semibold transition ${city === option ? "bg-[#087F83] text-white" : "border border-[#C9DDD5] bg-white text-[#36564F] hover:bg-[#EAF5F1]"}`}>{option}</button>)}</div></div>
      <p className="mt-4 text-xs leading-5 text-[#789089]">Directory filters run on this page. No patient details are requested or saved.</p>
    </section>

    <div className="mt-7 flex flex-wrap items-center justify-between gap-3" aria-live="polite"><p className="text-sm font-semibold text-[#36564F]">Showing <span className="text-[#087F83]">{matches.length}</span> of {providerCandidates.length} profiles <span className="font-normal text-[#789089]">· A doctor may appear in multiple city groups when hospital sources list several facilities.</span></p>{(query || specialty !== "All specialties" || city !== "All Delhi NCR") && <button type="button" onClick={() => { setCity("All Delhi NCR"); setSpecialty("All specialties"); setQuery(""); }} className="rounded-lg px-3 py-2 text-xs font-bold text-[#087F83] underline decoration-[#B8DCD0] underline-offset-4 hover:bg-[#EAF5F1]">Clear filters</button>}</div>

    {matches.length === 0 ? <section className="mt-5 rounded-2xl border border-[#DCEAE5] bg-white p-7"><h2 className="text-xl font-bold">No profiles match those filters</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">Try another spelling, specialty, hospital or nearby city.</p><button type="button" onClick={() => { setCity("All Delhi NCR"); setSpecialty("All specialties"); setQuery(""); }} className="mt-5 rounded-xl bg-[#087F83] px-5 py-3 text-sm font-bold text-white hover:bg-[#066D70]">Clear filters</button></section> : visibleCities.map((cityName) => {
      const cityDoctors = matches.filter((doctor) => doctor.locations.some((location) => location.city === cityName));
      if (!cityDoctors.length) return null;
      return <section key={cityName} className="mt-10 scroll-mt-24" aria-labelledby={`city-${cityName.toLowerCase()}`}>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">DOCTORS IN</p><h2 id={`city-${cityName.toLowerCase()}`} className="mt-1 text-2xl font-bold md:text-3xl">{cityName}{cityName === "Gurugram" ? " (Gurgaon)" : ""}</h2></div><span className="rounded-full bg-[#EAF5F1] px-3 py-1.5 text-xs font-bold text-[#087F83]">{cityDoctors.length} profiles listed</span></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{cityDoctors.map((doctor) => {
          const cityLocations = doctor.locations.filter((location) => location.city === cityName);
          const secondaryLocations = doctor.locations.filter((location) => location.city !== cityName).map((location) => formatFacility(location.facility, location.locality));
          const allListedFacilities = doctor.locations.map((location) => location.facility.toLocaleLowerCase());
          const extraLocations = [...new Set([...secondaryLocations, ...doctor.otherNcrLocations.filter((place) => !allListedFacilities.some((facility) => place.toLocaleLowerCase().includes(facility)))])];
          const isPrimaryCity = cityLocations.some((location) => location.primary);
          return <article key={`${cityName}-${doctor.id}`} className="group flex flex-col overflow-hidden rounded-[22px] border border-[#DCEAE5] bg-white shadow-[0_6px_24px_rgba(23,58,55,0.035)] transition duration-200 hover:-translate-y-0.5 hover:border-[#B8DCD0] hover:shadow-[0_16px_36px_rgba(23,58,55,0.09)]">
            <div className="h-1 bg-gradient-to-r from-[#087F83] via-[#16A6A1] to-[#B8E1D5]" />
            <div className="flex flex-1 flex-col p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2"><span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5F1] px-3 py-1.5 text-[11px] font-bold text-[#087F83]"><MapPin size={13} />{cityName}{cityLocations.some((location) => location.locality) ? ` · ${[...new Set(cityLocations.flatMap((location) => location.locality ? [location.locality] : []))].join(", ")}` : ""}</span>{!isPrimaryCity && <span className="text-[10px] font-semibold uppercase tracking-wide text-[#789089]">Additional source-listed location</span>}</div>
              <h3 className="mt-4 text-[21px] font-bold tracking-tight text-[#173A37]">{doctor.name}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Specialties">{doctor.specialties.map((item) => <span key={item} className="rounded-md bg-[#F3F7F5] px-2 py-1 text-[11px] font-medium leading-4 text-[#526D66]">{item}</span>)}</div>
              <div className="mt-5 border-t border-[#E8F0EC] pt-4"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#789089]">Hospital listed at</p><ul className="mt-2 space-y-2">{cityLocations.map((location) => <li key={`${location.facility}-${location.locality ?? ""}`} className="flex gap-2 text-sm font-semibold leading-5 text-[#36564F]"><Building2 size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-[#087F83]" /><span>{formatFacility(location.facility, location.locality)}</span></li>)}</ul></div>
              <a href={doctor.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Check ${doctor.name} on ${doctor.hospital}'s website (opens in a new tab)`} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#C9DDD5] px-3 text-xs font-bold text-[#087F83] transition hover:border-[#087F83] hover:bg-[#F8FBF9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F83] focus-visible:ring-offset-2">View hospital source profile <ExternalLink size={14} aria-hidden="true" /></a>
              {extraLocations.length > 0 && <p className="mt-3 text-xs leading-5 text-[#789089]"><span className="font-semibold text-[#526D66]">Other NCR locations:</span> {extraLocations.join("; ")}</p>}
              <div className="mt-auto pt-5"><Link href={`/request?provider=${encodeURIComponent(doctor.id)}&city=${encodeURIComponent(cityName)}`} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#087F83] px-4 text-sm font-bold text-white transition hover:bg-[#066D70] group-hover:bg-[#066D70]">{intakeEnabled ? "Ask DOCVY about this doctor" : "View enquiry status"} <CalendarClock size={16} /></Link><p className="mt-2 text-center text-[10px] leading-4 text-[#789089]">Listed by {doctor.hospital} · Source checked {doctor.sourceChecked} · {intakeEnabled ? "Enquiry goes to DOCVY; provider confirmation is separate" : "Enquiry form currently paused"}</p></div>
            </div>
          </article>;
        })}</div>
      </section>;
    })}
  </div>;
}
