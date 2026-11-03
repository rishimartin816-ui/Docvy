import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, HeartPulse, Hospital, Stethoscope } from "lucide-react";
import { buildPageSocialMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Healthcare discovery and operations",
  description: "Learn about DOCVY's India-wide healthcare discovery vision, current Delhi NCR doctor listings and planned tools for providers.",
  alternates: { canonical: "/about" },
  ...buildPageSocialMetadata("Healthcare discovery and operations | DOCVY", "Learn about DOCVY's India-wide healthcare discovery vision, current Delhi NCR doctor listings and planned tools for providers.", "/about"),
};

const audiences = [
  { icon: HeartPulse, title: "For patients", text: "A plain-language way to understand medical specialties and browse current source-linked provider profiles by specialty, city and care location." },
  { icon: Stethoscope, title: "For doctors", text: "Reviewed provider profiles planned to explain a doctor’s specialties and the clinics or hospitals where they see patients." },
  { icon: Building2, title: "For clinics", text: "Tools planned to keep practice information and appointment enquiries organised for clinic teams." },
  { icon: Hospital, title: "For hospitals", text: "A multi-department workspace planned to connect provider discovery with appointment coordination and operational visibility." },
];

export default function AboutPage() {
  return <div className="bg-[#F6FAF8]">
    <section className="border-b border-[#DCEAE5] bg-white py-16 md:py-20"><div className="mx-auto max-w-6xl px-6">
      <p className="text-[11px] font-extrabold tracking-[0.15em] text-[#087F83]">ABOUT DOCVY</p>
      <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.04em] text-[#173A37] md:text-[54px]">Healthcare discovery should make the next step easier to understand.</h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-[#526D66]">DOCVY is building a connected healthcare discovery and operations platform for people and care teams across India. The patient guide is available nationwide; doctor profiles currently cover Delhi, Gurugram and Noida. Other city listings are planned when enough useful, source-linked coverage is ready; no expansion date has been announced.</p>
      <p className="mt-5 inline-flex rounded-full bg-[#EAF5F1] px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-[#087F83]">PATIENT GUIDE AND SOURCE-LINKED LISTINGS AVAILABLE · BOOKING NOT LIVE</p>
    </div></section>
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16"><h2 className="text-2xl font-bold">Who DOCVY is for</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#526D66]">One connected service is intended to help patients understand care options while giving providers a clearer way to organise information and incoming requests.</p><div className="mt-7 grid gap-4 sm:grid-cols-2">{audiences.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-[#DCEAE5] bg-white p-6"><Icon size={22} className="text-[#087F83]" /><h3 className="mt-4 text-lg font-bold text-[#173A37]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#526D66]">{text}</p></article>)}</div></section>
    <section className="border-y border-[#DCEAE5] bg-white py-12 md:py-16"><div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2"><article><p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">WHAT PATIENTS CAN DO TODAY</p><h2 className="mt-3 text-2xl font-bold">Search the guide and browse profiles</h2><p className="mt-3 text-sm leading-7 text-[#526D66]">Search common concerns such as diabetes, skin conditions, pregnancy or joint problems to understand which medical specialty is commonly associated with them. The guide is available across India. You can browse source-linked doctor profiles by city and specialty. DOCVY credential review is pending, and appointment booking is not live.</p><Link href="/care-guide" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#087F83]">Open the care guide <ArrowRight size={16} /></Link></article><article><p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">CURRENT DOCTOR LISTINGS</p><h2 className="mt-3 text-2xl font-bold">Starting in Delhi NCR</h2><p className="mt-3 text-sm leading-7 text-[#526D66]">The current directory groups source-linked profiles under Delhi, Gurugram (also called Gurgaon), and Noida. Other city listings are planned when useful, source-linked coverage is ready; no expansion date has been announced. Neighbourhoods appear where a hospital source lists a specific location.</p><Link href="/doctors" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#087F83]">Browse current doctor listings <ArrowRight size={16} /></Link></article></div></section>
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16"><div className="rounded-[24px] bg-[#123B38] p-7 text-white md:flex md:items-center md:justify-between md:p-10"><div><h2 className="text-2xl font-bold text-white">For doctors, clinics and hospitals</h2><p className="mt-2 text-sm leading-6 text-[#D8E9E3]">Contact DOCVY to discuss provider onboarding, a doctor profile, or clinic and hospital plans.</p></div><Link href="/contact" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#123B38] md:mt-0">Contact now <ArrowRight size={16} /></Link></div></section>
  </div>;
}
