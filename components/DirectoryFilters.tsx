"use client";
import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import LocationSearch from "./LocationSearch";

type Place={city:string;citySlug:string;facility:string;area:string};
type Props={query:string;city:string;area:string;facility:string;specialty:string;places:Place[];cities:{slug:string;name:string}[];specialties:{slug:string;name:string}[]};
export default function DirectoryFilters(props:Props){
 const [city,setCity]=useState(props.city);const [facility,setFacility]=useState(props.facility);
 const facilities=Array.from(new Set(props.places.filter(p=>!city||p.citySlug===city).map(p=>p.facility).filter(Boolean))).sort();
 const cities=props.cities.map(c=>({...c,areas:Array.from(new Set(props.places.filter(p=>p.citySlug===c.slug&&(!facility||p.facility===facility)).map(p=>p.area).filter(Boolean))).sort()}));
 return <form action="/doctors" className="docvy-glass grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Filter doctor directory">
  <label className="text-sm font-medium sm:col-span-2 lg:col-span-1">Doctor, symptom or service<input type="search" name="q" maxLength={120} defaultValue={props.query} placeholder="Name, symptom or clinic" className="docvy-select mt-2 min-h-12"/></label>
  <label className="text-sm font-medium">Specialty<select name="specialty" defaultValue={props.specialty} className="docvy-select mt-2 min-h-12"><option value="">All specialties</option>{props.specialties.map(s=><option key={s.slug} value={s.slug}>{s.name}</option>)}</select></label>
  <label className="text-sm font-medium">Hospital or clinic<select name="facility" value={facility} onChange={e=>setFacility(e.target.value)} className="docvy-select mt-2 min-h-12"><option value="">All hospitals and clinics</option>{facilities.map(f=><option key={f} value={f}>{f}</option>)}</select></label>
  <div className="sm:col-span-2 lg:col-span-3"><LocationSearch cities={cities} city={city} area={props.area} onCityChange={value=>{setCity(value);setFacility("");}}/></div>
  <div className="flex flex-wrap items-center gap-3 sm:col-span-2 lg:col-span-3"><button className="docvy-pill docvy-pill-primary"><Search size={17} strokeWidth={1.5} aria-hidden="true"/>Apply filters</button><Link href="/doctors" className="inline-flex min-h-11 items-center text-sm underline">Clear filters</Link><span className="text-xs text-grey">Every filter is optional. Choose a city to narrow the practice and neighbourhood choices.</span></div>
 </form>;
}
