import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck2, CheckCircle2, MapPin, Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "How DOCVY works: from health concern to appointment",
  description: "See how DOCVY's India-wide care discovery is planned. The patient guide is available across India; current source-linked doctor listings start in Delhi NCR.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  { icon: Stethoscope, title: "Understand what to search", detail: "Start with a specialty you already know, or use the patient guide to see which specialties are commonly connected with a health concern. The guide is not a diagnosis." },
  { icon: MapPin, title: "Select a covered city", detail: "Doctor listings currently cover Delhi, Gurugram and Noida. DOCVY plans to add cities as source-linked provider coverage grows." },
  { icon: CheckCircle2, title: "Review a doctor and care location", detail: "A profile is planned to show the doctor’s specialty and where they consult, such as a hospital or clinic. Review the facility and details that matter to you." },
  { icon: CalendarCheck2, title: "Request a time and wait for confirmation", detail: "A clinic or hospital team reviews an appointment request and confirms with you. Selecting a time or sending a request does not itself book an appointment." },
];

export default function HowItWorksPage() {
  return <div className="min-h-[70vh] bg-[#F6FAF8] py-14 md:py-20"><div className="mx-auto max-w-6xl px-6">
    <p className="text-[11px] font-extrabold tracking-[0.15em] text-[#087F83]">HOW DOCVY WORKS</p>
    <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-[-0.04em] text-[#173A37] md:text-[52px]">A clear path from finding a specialist to knowing where to go.</h1>
    <p className="mt-5 max-w-3xl text-base leading-8 text-[#526D66]">DOCVY is being built for healthcare discovery across India. The patient guide is available nationwide, and source-linked doctor profiles currently start in Delhi NCR. More city listings will be added as provider coverage grows. Credential review, appointment requests and slot confirmation are not live yet.</p>
    <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{steps.map(({ icon: Icon, title, detail }, index) => <article key={title} className="rounded-2xl border border-[#DCEAE5] bg-white p-6"><span className="text-xs font-extrabold tracking-widest text-[#087F83]">STEP 0{index + 1}</span><Icon size={23} className="mt-6 text-[#087F83]" /><h2 className="mt-4 text-lg font-bold text-[#173A37]">{title}</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">{detail}</p></article>)}</div>
    <div className="mt-8 grid gap-4 md:grid-cols-2"><article className="rounded-2xl border border-[#DCEAE5] bg-white p-6"><h2 className="text-lg font-bold">Today: use the guide and browse profiles</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">The patient guide explains common specialties. The doctor directory links 12 profiles to official hospital pages and filters them by city and specialty. These listings are pending DOCVY review, and slot availability has not been checked.</p><div className="mt-5 flex flex-wrap gap-4"><Link href="/care-guide" className="inline-flex items-center gap-2 text-sm font-bold text-[#087F83]">Open the patient guide <ArrowRight size={16} /></Link><Link href="/doctors" className="inline-flex items-center gap-2 text-sm font-bold text-[#087F83]">Browse doctors <ArrowRight size={16} /></Link></div></article><article className="rounded-2xl border border-[#DCEAE5] bg-white p-6"><h2 className="text-lg font-bold">Appointment booking is still being prepared</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">DOCVY does not accept appointment requests or confirm slots. Follow the linked hospital profile to contact the provider directly, and confirm the doctor’s current location and availability with that hospital.</p></article></div>
    <Link href="/doctors" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#B8D2C9] bg-white px-5 text-sm font-bold text-[#087F83]">Doctor directory status <ArrowRight size={16} /></Link>
  </div></div>;
}
