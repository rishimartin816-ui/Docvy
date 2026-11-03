import Link from "next/link";
import { ArrowUpRight, MapPin, Search, Stethoscope } from "lucide-react";

export const discoveryCities = ["Delhi", "Gurugram", "Noida", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Kochi", "Chandigarh", "Guwahati", "Bhubaneswar", "Indore", "Patna"];
export const discoverySpecialties = ["General medicine", "Cardiology", "Dermatology", "Dentistry", "Orthopaedics", "Paediatrics", "Gynaecology", "Ophthalmology", "ENT", "Mental health"];

export default function DiscoverySearch({ city = "", specialty = "" }: { city?: string; specialty?: string }) {
  return <form action="/doctors" className="docvy-glass grid gap-3 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-5">
    <label className="min-w-0 text-sm font-semibold">
      <span className="mb-1.5 flex items-center gap-2"><MapPin size={16} aria-hidden="true" /> City</span>
      <select name="city" defaultValue={city} className="docvy-select">
        <option value="">All cities</option>
        {discoveryCities.map((item) => <option key={item}>{item}</option>)}
      </select>
    </label>
    <label className="min-w-0 text-sm font-semibold">
      <span className="mb-1.5 flex items-center gap-2"><Stethoscope size={16} aria-hidden="true" /> Specialty</span>
      <select name="specialty" defaultValue={specialty} className="docvy-select">
        <option value="">All specialties</option>
        {discoverySpecialties.map((item) => <option key={item}>{item}</option>)}
      </select>
    </label>
    <button className="docvy-pill docvy-pill-primary" type="submit"><Search size={17} aria-hidden="true" /> Find care</button>
  </form>;
}

export function DemoProvider({ bookingHref }: { bookingHref: string }) {
  return <article className="docvy-glass flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-[20px] bg-[#e8dcff] text-[#492883]">
      <Stethoscope size={29} aria-hidden="true" />
    </span>
    <div className="flex-1">
      <p className="text-xs font-bold uppercase tracking-widest text-[#624a80]">Fictional demo profile</p>
      <h2 className="mt-1 text-2xl font-bold text-[#251b35]">DOCVY Test Doctor</h2>
      <p className="text-sm text-[#584968]">General medicine · DOCVY Test Hospital · Delhi</p>
    </div>
    <Link href={bookingHref} className="docvy-pill docvy-pill-primary">View demo slots <ArrowUpRight size={17} aria-hidden="true" /></Link>
  </article>;
}
