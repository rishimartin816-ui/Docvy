import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, MapPin } from "lucide-react";
import CareGuideSearch from "@/components/CareGuideSearch";

export const metadata: Metadata = {
  title: "What doctor should I see? Disease and specialty guide",
  description: "Search common diseases, conditions, symptoms, and specialties to understand what kind of doctor is commonly involved. This is not a diagnosis; DOCVY booking is not open yet.",
  alternates: { canonical: "/care-guide" },
  openGraph: {
    type: "website", locale: "en_IN", siteName: "DOCVY",
    title: "Disease and symptom to specialty guide | DOCVY",
    description: "A plain-language guide to common concerns and medical specialties, with clear information about DOCVY availability.",
    url: "/care-guide",
  },
};

export default function CareGuidePage() {
  return <div className="bg-[#F6FAF8] text-[#173A37]">
    <section className="bg-[radial-gradient(circle_at_78%_35%,#D5F0E8_0%,#EAF5F1_38%,#F4FAF7_100%)] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/75 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83]"><MapPin size={14} /> PATIENT GUIDE · DELHI NCR</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[56px]">What kind of doctor should I see?</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#526D66] md:text-lg">Search a common disease, condition, symptom, or specialty to see the type of clinician commonly associated with it. This disease-to-specialty guide helps explain directory categories; it cannot tell you what condition you have or which care is right for you.</p>
        <CareGuideSearch />
        <div className="mt-6 flex flex-wrap gap-2" aria-label="Example searches">{["diabetes", "skin rash", "pregnancy", "joint pain", "children", "heart"].map((term) => <span key={term} className="rounded-full border border-[#C9DDD5] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#36564F]">{term}</span>)}</div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="flex gap-4 rounded-2xl border border-[#E7C99A] bg-[#FFF9EE] p-5 md:p-6"><AlertTriangle className="mt-0.5 shrink-0 text-[#A36A12]" size={22} /><div><h2 className="font-bold text-[#5D461D]">This guide is for orientation, not diagnosis</h2><p className="mt-2 text-sm leading-6 text-[#6E5B39]">The examples are broad and may not fit your situation. The same symptom can have different causes; age, medical history, severity, and examination matter. A qualified clinician can assess your situation and recommend the next step. Do not delay urgent care while using an online guide.</p></div></div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-2xl border border-[#DCEAE5] bg-white p-6 md:p-7"><p className="text-xs font-extrabold tracking-[0.13em] text-[#087F83]">IF YOU ARE UNSURE</p><h2 className="mt-3 text-xl font-bold">A general physician can be a useful starting point</h2><p className="mt-3 text-sm leading-7 text-[#526D66]">For a new concern, several symptoms, or a condition you cannot place in a specialty, start by speaking with a general physician or internal-medicine doctor. They can assess your health and tell you if a specialist may be appropriate.</p></article>
        <article className="rounded-2xl border border-[#F2D5A9] bg-[#FFF9EE] p-6 md:p-7"><p className="text-xs font-extrabold tracking-[0.13em] text-[#A36A12]">URGENT HELP</p><h2 className="mt-3 text-xl font-bold text-[#5D461D]">Emergencies need immediate help</h2><p className="mt-3 text-sm leading-7 text-[#6E5B39]">If someone is unconscious, struggling to breathe, has severe chest pain, uncontrolled bleeding, or another life-threatening emergency, call <a className="font-bold underline underline-offset-4" href="tel:112">112 in India</a> or go to the nearest emergency department. Do not wait for a directory listing or online reply.</p></article>
      </div>
    </section>

    <section className="border-y border-[#DCEAE5] bg-white px-6 py-12 md:py-16"><div className="mx-auto max-w-6xl">
      <p className="text-xs font-extrabold tracking-[0.13em] text-[#087F83]">HOW DOCVY IS DESIGNED TO HELP</p><h2 className="mt-3 max-w-3xl text-2xl font-bold tracking-tight md:text-3xl">From a concern to a confirmed appointment</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[
        ["1. Choose a starting point", "Search by a concern or go directly to a specialty if you already know what you need."],
        ["2. Narrow by location", "Choose Delhi, Gurugram, or Noida, then a neighbourhood when a provider address is available."],
        ["3. Compare a provider and facility", "Review the doctor’s specialty and the hospital or clinic where care is offered."],
        ["4. Request and confirm", "A booking request is complete only after the hospital or clinic confirms the slot with you."],
      ].map(([title, description]) => <article key={title} className="rounded-2xl border border-[#DCEAE5] bg-[#F8FBF9] p-5"><h3 className="font-bold text-[#173A37]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#526D66]">{description}</p></article>)}</div>
      <div className="mt-8 rounded-2xl bg-[#123B38] p-6 text-white md:flex md:items-center md:justify-between md:gap-6"><div><h2 className="text-xl font-bold text-white">What is available on DOCVY today?</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-[#D8E9E3]">This guide is informational, and 12 source-linked doctor profiles are available to browse by city and specialty. DOCVY credential review is pending and appointment requests, slot availability, and booking confirmation are not live.</p></div><Link href="/doctors" className="mt-5 inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#123B38] hover:bg-[#EAF5F1] md:mt-0">Browse doctors <ArrowRight size={16} /></Link></div>
    </div></section>

    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16"><h2 className="text-2xl font-bold">How this guide was prepared</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#526D66]">Specialty matches are general examples and can vary by local health system and individual circumstances. A primary-care clinician can help decide when specialist assessment is useful. DOCVY does not diagnose or recommend a specific doctor through this guide.</p><ul className="mt-4 flex flex-col gap-2 text-sm text-[#087F83] sm:flex-row sm:flex-wrap sm:gap-5"><li><a className="underline underline-offset-4" href="https://www.healthdirect.gov.au/healthcare-and-services/roles-and-specialties/the-role-of-a-gp" target="_blank" rel="noreferrer">Healthdirect: the role of a GP</a></li><li><a className="underline underline-offset-4" href="https://www.healthdirect.gov.au/healthcare-and-services/general-health/what-is-a-referral" target="_blank" rel="noreferrer">Healthdirect: specialist referrals</a></li><li><a className="underline underline-offset-4" href="https://112.gov.in/" target="_blank" rel="noreferrer">Government of India: emergency number 112</a></li></ul></section>
  </div>;
}
