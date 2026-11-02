import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CalendarCheck, CheckCircle2, Hospital, Search } from "lucide-react";
import HeroIllustration from "@/components/HeroIllustration";

export const metadata: Metadata = {
  title: "Find a doctor in Delhi NCR | DOCVY patient guide",
  description: "Understand which doctor specialty to search for and browse source-linked doctor profiles across Delhi NCR. DOCVY booking is not open yet.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_IN", siteName: "DOCVY", title: "Find your way to care | DOCVY", description: "A plain-language starting point for doctor, clinic and hospital discovery in Delhi NCR. Directory and booking status explained.", url: "/" },
};

const journey = [
  { title: "Start with a concern", text: "Search a common condition or go straight to a medical specialty if you already know what you need.", icon: Search },
  { title: "Choose your area", text: "Narrow by Delhi, Gurugram or Noida, then neighbourhood when confirmed provider locations are available.", icon: Building2 },
  { title: "Compare care locations", text: "See the doctor and the hospital or clinic where they work, so you know where an appointment would take place.", icon: Hospital },
  { title: "Request a time", text: "Choose or suggest a slot. The hospital or clinic must confirm it before the appointment is booked.", icon: CalendarCheck },
];

const guideExamples = [
  ["Diabetes or thyroid concerns", "Diabetology / endocrinology"],
  ["Skin, hair or nail concerns", "Dermatology"],
  ["Pregnancy or menstrual health", "Obstetrics and gynaecology"],
  ["Bones, joints or injuries", "Orthopaedics"],
];

const providerAreas = [
  { title: "Doctor profiles", text: "Profiles are planned to explain a doctor's specialty, credentials review status, and care locations." },
  { title: "Clinic coordination", text: "Clinic tools are planned for provider information and appointment enquiries across practice locations." },
  { title: "Hospital operations", text: "Hospital teams are planned to coordinate departments, listed doctors, and incoming appointment requests." },
];

export default function Home() {
  return <div className="overflow-hidden bg-[#F6FAF8] text-[#173A37]">
    <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_78%_35%,#D5F0E8_0%,#EAF5F1_38%,#F4FAF7_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#DDF0E9]/80 blur-3xl" />
      <div className="relative mx-auto grid min-h-[640px] max-w-[1440px] items-center gap-8 px-6 pb-16 pt-14 md:px-10 lg:grid-cols-[1fr_1fr] lg:px-[72px] lg:pb-20 lg:pt-10">
        <div className="relative z-10 max-w-[700px]">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/75 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83]"><span className="h-2 w-2 rounded-full bg-[#F39B72]" />CARE, CONNECTED</p>
          <h1 className="max-w-[760px] text-[42px] font-black leading-[1.04] tracking-[-0.052em] text-[#173A37] sm:text-[54px] lg:text-[62px]">Find your way from a health concern <span className="text-[#087F83]">to the right care.</span></h1>
          <p className="mt-7 max-w-[620px] text-base leading-8 text-[#526D66] md:text-[17px]">DOCVY helps patients understand which kind of doctor to look for and browse source-linked profiles by specialty, city and hospital. Our patient guide and 12 doctor profiles for Delhi NCR are available. DOCVY credential review and appointment booking are not live yet.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/care-guide" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#087F83] px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(8,127,131,0.2)] hover:bg-[#066D70]">Find a specialty <ArrowRight size={17} /></Link><Link href="/doctors" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#B7D2C9] bg-white/80 px-6 text-sm font-bold text-[#173A37] hover:bg-white">Browse doctors</Link></div>
          <p className="mt-5 text-xs leading-5 text-[#526D66]">Profile details link to hospital sources. Confirm credentials and available appointment slots with the hospital.</p>
        </div>
        <div className="relative mx-auto w-full max-w-[590px] pb-8"><HeroIllustration /><Link href="/care-guide" className="absolute bottom-0 left-1/2 w-[min(100%,520px)] -translate-x-1/2 rounded-[22px] border border-[#DCEAE5] bg-white/95 p-4 shadow-[0_22px_60px_rgba(23,58,55,0.16)] sm:p-5"><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-[11px] font-extrabold tracking-[0.12em] text-[#526D66]">START WITH A CONCERN OR SPECIALTY</p><span className="rounded-full bg-[#DDF0E9] px-3 py-1 text-[10px] font-extrabold tracking-wide text-[#087F83]">PATIENT GUIDE</span></div><div className="mt-4 flex min-h-[54px] items-center gap-3 rounded-xl border border-[#DCEAE5] bg-[#F6FAF8] px-4 text-sm text-[#526D66]"><Search size={19} className="shrink-0 text-[#087F83]" /><span>Try diabetes, skin rash, pregnancy, or heart</span></div><p className="mt-3 text-[11px] leading-5 text-[#526D66]">General information to explain specialties—not diagnosis or doctor listings.</p></Link></div>
      </div>
    </section>

    <section className="border-b border-[#E4EEE9] bg-white"><div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-7 px-6 py-8 sm:grid-cols-4 lg:px-[72px]">{[["Patient guide", "Explore common specialties"], ["Delhi NCR", "Delhi · Gurugram · Noida"], ["Doctor directory", "12 source-linked profiles"], ["Appointments", "Not open yet"]].map(([title, detail]) => <div key={title}><p className="text-sm font-bold text-[#173A37]">{title}</p><p className="mt-1 text-xs text-[#526D66]">{detail}</p></div>)}</div></section>

    <section className="bg-[#F6FAF8] py-16 md:py-20"><div className="mx-auto max-w-[1440px] px-6 lg:px-[72px]"><p className="text-xs font-bold tracking-[0.15em] text-[#087F83]">THE PATIENT JOURNEY</p><h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-[-0.035em] md:text-[38px]">From “what kind of doctor?” to “where do I go?”</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#526D66]">DOCVY is designed to make the steps understandable. Here is the journey the platform is preparing; booking is not live today.</p><div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{journey.map(({ title, text, icon: Icon }, index) => <article key={title} className="rounded-2xl border border-[#DCEAE5] bg-white p-5 md:p-6"><div className="flex items-center justify-between"><span className="text-xs font-extrabold tracking-widest text-[#087F83]">STEP 0{index + 1}</span><Icon size={21} className="text-[#087F83]" /></div><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#526D66]">{text}</p></article>)}</div></div></section>

    <section className="border-y border-[#DCEAE5] bg-white py-16 md:py-20"><div className="mx-auto grid max-w-[1440px] gap-8 px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-[72px]"><div><p className="text-xs font-bold tracking-[0.15em] text-[#087F83]">COMMON SEARCH STARTS</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] md:text-[36px]">Not sure which specialty to choose?</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[#526D66]">Search a concern in the patient guide to learn which specialties are commonly associated with it. The same symptom can have different causes, so the guide cannot replace a clinician’s assessment.</p><Link href="/care-guide" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white hover:bg-[#066D70]">Open the care guide <ArrowRight size={16} /></Link></div><div className="grid gap-3 sm:grid-cols-2">{guideExamples.map(([concern, specialty]) => <div key={concern} className="rounded-2xl border border-[#DCEAE5] bg-[#F8FBF9] p-5"><p className="text-xs font-bold uppercase tracking-wide text-[#789089]">Common search</p><h3 className="mt-2 font-bold">{concern}</h3><p className="mt-2 text-sm text-[#526D66]">Often associated with: <span className="font-semibold text-[#087F83]">{specialty}</span></p></div>)}</div></div></section>

    <section className="bg-[#123B38] py-16 text-white md:py-20"><div className="mx-auto grid max-w-[1440px] gap-8 px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-[72px]"><div><p className="text-xs font-bold tracking-[0.15em] text-[#79BDB1]">FOR CARE TEAMS</p><h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.035em] text-white md:text-[38px]">One connected system for patients and providers.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-[#D8E9E3]">DOCVY is also building practical tools for doctors, clinics and hospitals. Provider profiles and appointment enquiries are intended to connect with the teams who deliver care.</p><Link href="/pricing" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#4D756F] px-5 text-sm font-semibold text-white hover:bg-white/10">Clinic &amp; hospital plans <ArrowRight size={16} /></Link></div><div className="grid gap-3 sm:grid-cols-3">{providerAreas.map((card, index) => <article key={card.title} className="flex min-h-[230px] flex-col rounded-2xl border border-[#315B55] bg-[#1C4D47] p-5"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-[#79BDB1]">0{index + 1}</span><CheckCircle2 size={17} className="text-[#79BDB1]" /></div><h3 className="mt-8 text-sm font-bold leading-6 text-white">{card.title}</h3><p className="mt-3 text-xs leading-6 text-[#D8E9E3]">{card.text}</p><span className="mt-auto pt-5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#79BDB1]">In development</span></article>)}</div></div></section>

    <section className="bg-white py-10"><div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-[72px]"><p className="font-semibold text-[#173A37]">DOCVY is informational today. Explore the guide; bookings are not yet open.</p><div className="flex flex-wrap gap-5"><Link href="/faqs" className="inline-flex items-center gap-2 font-semibold text-[#087F83]">Patient FAQs <ArrowRight size={16} /></Link><Link href="/contact" className="inline-flex items-center gap-2 font-semibold text-[#087F83]">Contact DOCVY <ArrowRight size={16} /></Link></div></div></section>
  </div>;
}
