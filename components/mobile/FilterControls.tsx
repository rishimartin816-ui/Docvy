"use client";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import type {DirectoryFilters} from "@/lib/directory-filters";
type Option = {slug:string;name:string};
type Props = { filters:DirectoryFilters; places:{city:string;facility:string;area:string}[]; cities:Option[]; specialties:readonly Option[] };
export default function FilterControls({filters,places,cities,specialties}:Props){
 const [city,setCity]=useState(filters.city),[facility,setFacility]=useState(filters.facility);
 const inCity=places.filter(p=>!city||p.city===city);
 const facilities=[...new Set(inCity.map(p=>p.facility).filter(Boolean))].sort();
 const areas=[...new Set(inCity.filter(p=>!facility||p.facility===facility).map(p=>p.area).filter(Boolean))].sort();
 return <form method="get" action="/doctors" aria-label="Filter doctor directory">
  <label className="search"><Search/><input name="q" type="search" maxLength={120} aria-label="Search doctors" defaultValue={filters.query} placeholder={city?"Doctor or specialty":"Doctor, specialty or clinic"}/></label>
  <div className="chips"><select id="city-filter" name="location" aria-label="City" value={city} onChange={e=>{setCity(e.target.value);setFacility("")}}><option value="">City</option>{city && !cities.some(c=>c.slug===city) && <option value={city}>{city==="online"?"Online":city}</option>}{cities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select>
  <select name="specialty" aria-label="Specialty" defaultValue={filters.specialty}><option value="">Specialty</option>{specialties.map(s=><option value={s.slug} key={s.slug}>{s.name}</option>)}</select>
  <select name="facility" aria-label="Practice" value={facility} onChange={e=>setFacility(e.target.value)}><option value="">Practice</option>{facilities.map(s=><option key={s}>{s}</option>)}</select>
  <select name="area" aria-label="Neighbourhood" key={city+facility} defaultValue={filters.area}><option value="">Neighbourhood</option>{areas.map(s=><option key={s}>{s}</option>)}</select></div>
  <button className="btn">Apply filters <ArrowRight/></button></form>;
}
