import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import DoctorDirectory from "@/components/DoctorDirectory";
import { providerCandidates } from "@/lib/provider-candidates";

export const metadata: Metadata = {
  title: "Doctors in Delhi NCR | Search by specialty and location | DOCVY",
  description: "Browse 12 source-linked doctor profiles across Delhi, Gurugram and Noida. Filter by specialty, hospital or locality; DOCVY credential review and appointment availability are pending.",
  alternates: { canonical: "/doctors" },
  openGraph: {
    type: "website", locale: "en_IN", siteName: "DOCVY",
    title: "Doctors in Delhi NCR | DOCVY",
    description: "Explore source-linked doctor profiles from Delhi, Gurugram and Noida by specialty and hospital. DOCVY review and appointment availability are pending.",
    url: "/doctors",
  },
};

export default function DoctorsPage() {
  return <div className="bg-[#F6FAF8] text-[#173A37]">
    <section className="bg-[radial-gradient(circle_at_78%_35%,#D5F0E8_0%,#EAF5F1_38%,#F4FAF7_100%)] px-6 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/75 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83]"><MapPin size={14} /> DOCTORS · DELHI NCR</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[56px]">Find doctors by specialty, city and hospital.</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#526D66] md:text-lg">Browse 12 doctor profiles linked to their official hospital pages. Filter Delhi, Gurugram or Noida by specialty, hospital or locality. Where the source lists additional NCR facilities, the same doctor appears in those city groups too.</p>
        <div className="mt-7 flex flex-wrap gap-2"><span className="rounded-full bg-white/85 px-4 py-2 text-xs font-bold text-[#087F83]">{providerCandidates.length} source-linked profiles</span><span className="rounded-full bg-white/85 px-4 py-2 text-xs font-bold text-[#526D66]">Delhi · Gurugram · Noida</span><span className="rounded-full bg-[#FFF9EE] px-4 py-2 text-xs font-bold text-[#80672E]">DOCVY review pending</span></div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-6 py-10 md:py-14" aria-label="Doctor directory">
      <div className="mb-6 flex gap-3 rounded-2xl border border-[#E7C99A] bg-[#FFF9EE] p-4 md:p-5"><ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#A36A12]" /><p className="text-sm leading-6 text-[#6E5B39]">These are profiles listed by Max Healthcare, Medanta and Fortis Healthcare. DOCVY has not independently verified credentials or checked appointment slots. Confirm the doctor’s current location and availability directly with the hospital using the linked profile.</p></div>
      <DoctorDirectory />
    </section>

    <section className="border-y border-[#DCEAE5] bg-white px-6 py-12 md:py-14"><div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">NEED HELP CHOOSING A SPECIALTY?</p><h2 className="mt-2 text-2xl font-bold">Start with the patient guide</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#526D66]">Search a common condition or concern to understand which specialties are commonly associated with it. The guide is informational and does not diagnose.</p></div><Link href="/care-guide" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white hover:bg-[#066D70]">Browse conditions and specialties <ArrowRight size={16} /></Link></div></section>
  </div>;
}
