import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck2, MapPin, Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "How DOCVY works",
  description: "How DOCVY plans to connect provider discovery, appointment enquiries and clinic or hospital teams.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DOCVY",
    title: "How DOCVY works",
    description: "How DOCVY plans to connect provider discovery, appointment enquiries and clinic or hospital teams.",
    url: "/how-it-works",
  },
};

const steps = [
  { icon: Stethoscope, title: "Search care", detail: "Search for a doctor, speciality, clinic or hospital in your city." },
  { icon: MapPin, title: "Review providers", detail: "Compare profiles that have passed DOCVY's verification and publication checks." },
  { icon: CalendarCheck2, title: "Request a visit", detail: "Choose a provider-confirmed opening or share a preferred date and time." },
  { icon: ArrowRight, title: "Wait for confirmation", detail: "The clinic or hospital reviews your request and confirms directly with you." },
];

export default function HowItWorksPage() {
  return <div className="min-h-[70vh] bg-[#F6FAF8] py-14 md:py-20"><div className="mx-auto max-w-[1440px] px-6 lg:px-[72px]"><p className="text-[11px] font-extrabold tracking-[0.15em] text-[#087F83]">HOW DOCVY WORKS</p><h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-[-0.04em] text-[#173A37] md:text-[50px]">Find care and request an appointment.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-[#526D66]">DOCVY is preparing verified provider discovery and secure appointment handling. Directory and appointment requests are not open yet; no real provider listings are shown until review is complete.</p><div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{steps.map(({ icon: Icon, title, detail }, index) => <article key={title} className="rounded-2xl border border-[#DCEAE5] bg-white p-6"><span className="text-xs font-extrabold tracking-widest text-[#087F83]">STEP 0{index + 1}</span><Icon size={23} className="mt-6 text-[#087F83]" /><h2 className="mt-4 text-lg font-bold text-[#173A37]">{title}</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">{detail}</p></article>)}</div><Link href="/contact" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white hover:bg-[#066D70]">Provider onboarding <ArrowRight size={16} /></Link></div></div>;
}
