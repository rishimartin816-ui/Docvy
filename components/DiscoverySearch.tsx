import { specialties, surgeryGroups } from "@/lib/care-directory";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, MessageSquare, Search, Stethoscope } from "lucide-react";

export const discoveryCities = ["Delhi", "Gurugram", "Noida", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Kochi", "Chandigarh", "Guwahati", "Bhubaneswar", "Indore", "Patna"];
export const discoverySpecialties = [...new Set([...specialties.map(({ name }) => name), ...surgeryGroups.map(({ specialty }) => specialty)])];

export default function DiscoverySearch({ city = "", specialty = "", procedure }: { city?: string; specialty?: string; procedure?: string }) {
  return <form action="/doctors" className="docvy-glass grid gap-3 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-5">
    {procedure && <input type="hidden" name="procedure" value={procedure} />}
    <label className="min-w-0 text-sm font-semibold">
      <span className="mb-1.5 flex items-center gap-2"><MapPin size={16} aria-hidden="true" /> City</span>
      <select name="city" defaultValue={city} className="docvy-select">
        <option value="">All cities</option>
        {discoveryCities.map((item) => <option key={item}>{item}</option>)}
      </select>
    </label>
    <label className="min-w-0 text-sm font-semibold">
      <span className="mb-1.5 flex items-center gap-2"><Stethoscope size={16} aria-hidden="true" /> Specialty</span>
      {procedure ? <><input type="hidden" name="specialty" value={specialty} /><span className="docvy-select block">{specialty}</span></> : <select name="specialty" defaultValue={specialty} className="docvy-select">
        <option value="">All specialties</option>
        {discoverySpecialties.map((item) => <option key={item}>{item}</option>)}
      </select>}
    </label>
    <button className="docvy-pill docvy-pill-primary" type="submit"><Search size={17} aria-hidden="true" /> Find care</button>
  </form>;
}

export function DemoProvider({ bookingHref }: { bookingHref: string }) {
  return <article className="docvy-glass overflow-hidden">
    <div className="grid gap-5 p-5 sm:p-7 md:grid-cols-[1fr_auto] md:items-center">
      <div className="flex items-start gap-4">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-[20px] bg-[#fff3d9] text-[#70501f]">
          <Stethoscope size={29} aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#5d5040]">Fictional consultation profile</p>
          <h3 className="mt-1 text-2xl font-bold text-[#2e281f]">DOCVY Test Doctor</h3>
          <p className="font-medium text-[#5d5040]">General medicine · In-clinic demo</p>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-[#5d5040]"><MapPin size={15} aria-hidden="true" /> DOCVY Test Hospital, Delhi</p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 md:items-end">
        <Link href={bookingHref} className="docvy-pill docvy-pill-primary"><CalendarDays size={17} aria-hidden="true" /> View demo slots <ArrowUpRight size={17} aria-hidden="true" /></Link>
        <span className="text-xs text-[#5d5040]">No payment or real appointment</span>
      </div>
    </div>
    <div className="flex items-start gap-2 border-t border-[#e8dac2] bg-[#fff9ec] px-5 py-3 text-sm text-[#5d5040] sm:px-7">
      <MessageSquare size={17} className="mt-0.5 shrink-0" aria-hidden="true" /> Patient reviews are unavailable for this fictional profile.
    </div>
  </article>;
}
