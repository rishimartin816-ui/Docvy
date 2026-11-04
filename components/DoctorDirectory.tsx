"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Building2, CalendarClock, ExternalLink, MapPin, Search } from "lucide-react";
import { providerCandidates, providerCities, providerSpecialties, type ProviderCity } from "@/lib/provider-candidates";

const allCitiesLabel = "All current cities";
type CityFilter = typeof allCitiesLabel | ProviderCity;
type LocalityOption = { value: string; label: string };

function formatFacility(facility: string, locality?: string) {
  if (!locality || facility.toLocaleLowerCase().includes(locality.toLocaleLowerCase())) return facility;
  return `${facility} · ${locality}`;
}

export default function DoctorDirectory({ initialCity = allCitiesLabel, intakeEnabled = false }: { initialCity?: CityFilter; intakeEnabled?: boolean }) {
  const [city, setCity] = useState<CityFilter>(initialCity);
  const [specialty, setSpecialty] = useState("All specialties");
  const [query, setQuery] = useState("");
  const [locality, setLocality] = useState("All listed areas");

  const localityOptions = useMemo(() => {
    const options = new Map<string, string>();
    providerCandidates.forEach((doctor) => doctor.locations.forEach((location) => {
      if (!location.locality || (city !== allCitiesLabel && location.city !== city)) return;
      const value = `${location.city}::${location.locality}`;
      const label = city === allCitiesLabel ? `${location.locality} · ${location.city}` : location.locality;
      options.set(value, label);
    }));
    return [...options].map(([value, label]): LocalityOption => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label));
  }, [city]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedSpecialty = params.get("specialty");
    const requestedCity = params.get("city");
    const requestedQuery = params.get("q");
    const requestedLocality = params.get("locality");
    if (requestedSpecialty && providerSpecialties.includes(requestedSpecialty)) setSpecialty(requestedSpecialty);
    if (requestedCity && providerCities.includes(requestedCity as ProviderCity)) setCity(requestedCity as ProviderCity);
    if (requestedQuery) setQuery(requestedQuery);
    if (requestedCity && requestedLocality && providerCities.includes(requestedCity as ProviderCity)) {
      const localityValue = `${requestedCity}::${requestedLocality}`;
      if (providerCandidates.some((doctor) => doctor.locations.some((location) => `${location.city}::${location.locality ?? ""}` === localityValue))) setLocality(localityValue);
    }
  }, []);

  const matches = useMemo(() => {
    const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    return providerCandidates.filter((doctor) => {
      const inCity = city === allCitiesLabel || doctor.locations.some((location) => location.city === city);
      const inSpecialty = specialty === "All specialties" || doctor.specialties.includes(specialty);
      const inLocality = locality === "All listed areas" || doctor.locations.some((location) => `${location.city}::${location.locality ?? ""}` === locality);
      const searchable = [doctor.name, doctor.hospital, ...doctor.specialties, ...doctor.locations.map((location) => `${location.city} ${location.locality ?? ""} ${location.facility}`), ...doctor.otherNcrLocations].join(" ").toLocaleLowerCase();
      return inCity && inSpecialty && inLocality && words.every((word) => searchable.includes(word));
    });
  }, [city, locality, specialty, query]);

  const visibleCities = city === allCitiesLabel ? providerCities : [city];

  return <div>
    <section className="rounded-[24px] border border-[#DCE5E8] bg-white p-5  md:p-7" aria-label="Filter doctor profiles">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr_.8fr] lg:items-end">
        <div><label htmlFor="doctor-search" className="mb-2 block text-sm font-bold text-[#0F2A3D]">Search by doctor, specialty, hospital or locality</label><div className="flex min-h-12 items-center gap-3 rounded-xl border border-[#DCE5E8] px-4 focus-within:ring-2 focus-within:ring-[#0F2A3D]"><Search strokeWidth={1.5} size={18} className="shrink-0 text-[#0F2A3D]" /><input id="doctor-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="For example: cardiology, Saket, Fortis" className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#0F2A3D] outline-none placeholder:text-[#5B6B7A]" /></div></div>
        <div><label htmlFor="specialty-filter" className="mb-2 block text-sm font-bold text-[#0F2A3D]">Specialty</label><select id="specialty-filter" value={specialty} onChange={(event) => setSpecialty(event.target.value)} className="min-h-12 w-full rounded-xl border border-[#DCE5E8] bg-white px-4 text-sm text-[#0F2A3D] focus:outline-none focus:ring-2 focus:ring-[#0F2A3D]"><option>All specialties</option>{providerSpecialties.map((item) => <option key={item}>{item}</option>)}</select></div>
        <div><label htmlFor="locality-filter" className="mb-2 flex items-center gap-2 text-sm font-bold text-[#0F2A3D]"><MapPin strokeWidth={1.5} size={15} aria-hidden="true" className="text-[#0F2A3D]" />Area or locality</label><select id="locality-filter" value={locality} onChange={(event) => setLocality(event.target.value)} className="min-h-12 w-full rounded-xl border border-[#DCE5E8] bg-white px-4 text-sm text-[#0F2A3D] focus:outline-none focus:ring-2 focus:ring-[#0F2A3D]"><option>All listed areas</option>{localityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
      </div>
      <div className="mt-5"><p className="mb-2 text-sm font-bold text-[#0F2A3D]">City</p><div className="flex flex-wrap gap-2" role="group" aria-label="Filter by city">{([allCitiesLabel, ...providerCities] as CityFilter[]).map((option) => <button key={option} type="button" aria-pressed={city === option} onClick={() => { setCity(option); setLocality("All listed areas"); }} className={`min-h-10 rounded-full px-4 text-sm font-semibold transition ${city === option ? "bg-[#0F2A3D] text-white" : "border border-[#DCE5E8] bg-white text-[#5B6B7A] hover:bg-[#E3F2F0]"}`}>{option}</button>)}</div></div>
      <p className="mt-4 text-xs leading-5 text-[#5B6B7A]">Area choices appear only where a hospital source names a locality. City filters reflect the current source-linked listings; they run on this page and no patient details are requested or saved.</p>
    </section>

    <div className="mt-7 flex flex-wrap items-center justify-between gap-3" aria-live="polite"><p className="text-sm font-semibold text-[#5B6B7A]">Showing <span className="text-[#0F2A3D]">{matches.length}</span> of {providerCandidates.length} profiles <span className="font-normal text-[#5B6B7A]">· A doctor may appear in multiple city groups when hospital sources list several facilities.</span></p>{(query || specialty !== "All specialties" || city !== allCitiesLabel || locality !== "All listed areas") && <button type="button" onClick={() => { setCity(allCitiesLabel); setSpecialty("All specialties"); setQuery(""); setLocality("All listed areas"); }} className="rounded-lg px-3 py-2 text-xs font-bold text-[#0F2A3D] underline decoration-[#DCE5E8] underline-offset-4 hover:bg-[#E3F2F0]">Clear filters</button>}</div>

    {matches.length === 0 ? <section className="mt-5 rounded-2xl border border-[#DCE5E8] bg-white p-7"><h2 className="text-xl font-bold">No profiles match those filters</h2><p className="mt-2 text-sm leading-6 text-[#5B6B7A]">Try another spelling, specialty, hospital, listed area or nearby city.</p><button type="button" onClick={() => { setCity(allCitiesLabel); setSpecialty("All specialties"); setQuery(""); setLocality("All listed areas"); }} className="mt-5 rounded-xl bg-[#0F2A3D] px-5 py-3 text-sm font-bold text-white hover:bg-[#0F2A3D]">Clear filters</button></section> : visibleCities.map((cityName) => {
      const cityDoctors = matches.filter((doctor) => doctor.locations.some((location) => location.city === cityName && (locality === "All listed areas" || `${location.city}::${location.locality ?? ""}` === locality)));
      if (!cityDoctors.length) return null;
      return <section key={cityName} className="mt-10 scroll-mt-24" aria-labelledby={`city-${cityName.toLowerCase()}`}>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-extrabold tracking-[0.14em] text-[#0F2A3D]">DOCTORS IN</p><h2 id={`city-${cityName.toLowerCase()}`} className="mt-1 text-2xl font-bold md:text-3xl">{cityName}{cityName === "Gurugram" ? " (Gurgaon)" : ""}</h2></div><span className="rounded-full bg-[#E3F2F0] px-3 py-1.5 text-xs font-bold text-[#0F2A3D]">{cityDoctors.length} profiles listed</span></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{cityDoctors.map((doctor) => {
          const cityLocations = doctor.locations.filter((location) => location.city === cityName && (locality === "All listed areas" || `${location.city}::${location.locality ?? ""}` === locality));
          const secondaryLocations = locality === "All listed areas" ? doctor.locations.filter((location) => location.city !== cityName).map((location) => formatFacility(location.facility, location.locality)) : [];
          const allListedFacilities = doctor.locations.map((location) => location.facility.toLocaleLowerCase());
          const extraLocations = [...new Set([...secondaryLocations, ...doctor.otherNcrLocations.filter((place) => !allListedFacilities.some((facility) => place.toLocaleLowerCase().includes(facility)))])];
          const isPrimaryCity = cityLocations.some((location) => location.primary);
          return <article key={`${cityName}-${doctor.id}`} className="group flex flex-col overflow-hidden rounded-[22px] border border-[#DCE5E8] bg-white  transition duration-200 hover:-translate-y-0.5 hover:border-[#DCE5E8] ">
            <div className="h-1 bg-line" />
            <div className="flex flex-1 flex-col p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2"><span className="inline-flex items-center gap-1.5 rounded-full bg-[#E3F2F0] px-3 py-1.5 text-[11px] font-bold text-[#0F2A3D]"><MapPin strokeWidth={1.5} size={13} />{cityName}{cityLocations.some((location) => location.locality) ? ` · ${[...new Set(cityLocations.flatMap((location) => location.locality ? [location.locality] : []))].join(", ")}` : ""}</span>{!isPrimaryCity && <span className="text-[10px] font-semibold uppercase tracking-wide text-[#5B6B7A]">Additional source-listed location</span>}</div>
              <h3 className="mt-4 text-[21px] font-bold tracking-tight text-[#0F2A3D]">{doctor.name}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Specialties">{doctor.specialties.map((item) => <span key={item} className="rounded-md bg-[#FFFFFF] px-2 py-1 text-[11px] font-medium leading-4 text-[#5B6B7A]">{item}</span>)}</div>
              <div className="mt-5 border-t border-[#DCE5E8] pt-4"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#5B6B7A]">Hospital listed at</p><ul className="mt-2 space-y-2">{cityLocations.map((location) => <li key={`${location.facility}-${location.locality ?? ""}`} className="flex gap-2 text-sm font-semibold leading-5 text-[#5B6B7A]"><Building2 strokeWidth={1.5} size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-[#0F2A3D]" /><span>{formatFacility(location.facility, location.locality)}</span></li>)}</ul></div>
              <a href={doctor.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Check ${doctor.name} on ${doctor.hospital}'s website (opens in a new tab)`} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#DCE5E8] px-3 text-xs font-bold text-[#0F2A3D] transition hover:border-[#0F2A3D] hover:bg-[#FFFFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2A3D] focus-visible:ring-offset-2">View hospital source profile <ExternalLink strokeWidth={1.5} size={14} aria-hidden="true" /></a>
              {extraLocations.length > 0 && <p className="mt-3 text-xs leading-5 text-[#5B6B7A]"><span className="font-semibold text-[#5B6B7A]">Other NCR locations:</span> {extraLocations.join("; ")}</p>}
              <div className="mt-auto pt-5"><Link href={`/request?provider=${encodeURIComponent(doctor.id)}&city=${encodeURIComponent(cityName)}`} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0F2A3D] px-4 text-sm font-bold text-white transition hover:bg-[#0F2A3D] group-hover:bg-[#0F2A3D]">{intakeEnabled ? "Request an appointment" : "View appointment request status"} <CalendarClock strokeWidth={1.5} size={16} /></Link><p className="mt-2 text-center text-[10px] leading-4 text-[#5B6B7A]">Listed by {doctor.hospital} · Source checked {doctor.sourceChecked} · {intakeEnabled ? "Request goes to DOCVY; the provider confirms the appointment" : "Appointment requests are not accepting details yet"}</p></div>
            </div>
          </article>;
        })}</div>
      </section>;
    })}
  </div>;
}
