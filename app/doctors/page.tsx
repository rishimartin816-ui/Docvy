import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Search, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Doctor directory in Delhi NCR | DOCVY",
  description: "DOCVY is preparing a reviewed doctor directory for Delhi, Gurugram and Noida. See how specialty, hospital and neighbourhood discovery is planned; booking is not open yet.",
  alternates: { canonical: "/doctors" },
};

const cities = [
  { name: "Delhi", detail: "Planned city-level discovery, with neighbourhoods shown when doctor and facility locations are confirmed." },
  { name: "Gurugram (Gurgaon)", detail: "Planned searches will distinguish Gurugram locations and care facilities from other NCR cities." },
  { name: "Noida", detail: "Planned city search will connect reviewed doctor profiles to their listed hospital or clinic." },
];

export default function DoctorsPage() {
  return <div className="bg-[#F6FAF8] px-6 py-14 text-[#173A37] md:py-20">
    <div className="mx-auto max-w-6xl">
      <section className="rounded-[26px] border border-[#DCEAE5] bg-white p-7 shadow-sm md:p-10">
        <p className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.15em] text-[#087F83]"><Search size={15} /> DOCVY DOCTOR DIRECTORY</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.04em] md:text-[52px]">Search for a doctor by specialty and location.</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#526D66]">DOCVY is preparing doctor profiles that show a provider’s specialty and the hospital or clinic where they see patients. The directory will be organised by Delhi, Gurugram, and Noida, with neighbourhood information where the provider’s location is confirmed.</p>
        <div className="mt-7 flex flex-wrap gap-3"><span className="rounded-full bg-[#EAF5F1] px-4 py-2 text-xs font-bold text-[#087F83]">Directory in preparation</span><span className="rounded-full bg-[#F7F4EC] px-4 py-2 text-xs font-bold text-[#80672E]">Search and appointment requests are not live</span></div>
      </section>

      <section className="mt-10"><div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E2F2EC] text-[#087F83]"><MapPin size={21} /></span><div><p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">DELHI NCR, CLEARLY SEPARATED</p><h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Choose the city first. Add neighbourhoods when locations are confirmed.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#526D66]">A doctor may consult at more than one facility. DOCVY’s planned listings will show each location distinctly so you can understand which hospital or clinic you are selecting. A profile or location will not mean a time slot is available.</p></div></div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">{cities.map((city) => <article key={city.name} className="rounded-2xl border border-[#DCEAE5] bg-white p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#087F83]">NCR city</p><h3 className="mt-3 text-xl font-bold">{city.name}</h3><p className="mt-3 text-sm leading-6 text-[#526D66]">{city.detail}</p></article>)}</div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2"><article className="rounded-2xl border border-[#DCEAE5] bg-white p-6"><ShieldCheck size={22} className="text-[#087F83]" /><h2 className="mt-4 text-lg font-bold">How doctor profiles will be reviewed</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">Profiles are being gathered and reviewed before public display. DOCVY review status and provider credentials will be stated plainly. A source listing alone does not mean DOCVY has verified a profile or that the provider accepts appointments.</p></article><article className="rounded-2xl border border-[#DCEAE5] bg-white p-6"><Search size={22} className="text-[#087F83]" /><h2 className="mt-4 text-lg font-bold">Do not know which specialty to search?</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">The patient guide explains common specialties and the concerns people often search for. It can help you understand the directory, but it cannot diagnose a condition or choose a doctor for you.</p><Link href="/care-guide" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#087F83] hover:text-[#066D70]">Open the patient guide <ArrowRight size={16} /></Link></article></section>

      <section className="mt-10 rounded-[24px] bg-[#123B38] p-7 text-white md:flex md:items-center md:justify-between md:gap-8 md:p-9"><div><h2 className="text-2xl font-bold text-white">Are you a doctor, clinic or hospital?</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#D8E9E3]">Contact DOCVY about a provider profile, organisation onboarding, or clinic and hospital plans.</p></div><Link href="/contact" className="mt-5 inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#123B38] hover:bg-[#EAF5F1] md:mt-0">Contact now <ArrowRight size={16} /></Link></section>
    </div>
  </div>;
}
