import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarClock, CheckCircle2, Search } from "lucide-react";
import PatientJourneyMap from "@/components/PatientJourneyMap";
import { isAppointmentIntakeConfigured } from "@/lib/appointment-intake";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { providerCityListLabel, providerProfileCount } from "@/lib/provider-candidates";

const howItWorksDescription = `See how DOCVY's India-wide care discovery works. The patient guide is available across India; current source-linked doctor listings are in ${providerCityListLabel}.`;

export const metadata: Metadata = {
  title: "How to use the patient guide and doctor directory",
  description: howItWorksDescription,
  alternates: { canonical: "/how-it-works" },
  ...buildPageSocialMetadata("How to use the patient guide and doctor directory | DOCVY", howItWorksDescription, "/how-it-works"),
};

export default function HowItWorksPage() {
  const intakeEnabled = isAppointmentIntakeConfigured();
  return <div className="min-h-[70vh] bg-[#F6FAF8] py-14 md:py-20"><div className="mx-auto max-w-6xl px-6">
    <p className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83]"><CheckCircle2 size={15} /> PATIENT GUIDE · PAN-INDIA</p>
    <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-[-0.04em] text-[#173A37] md:text-[52px]">Arrive with a question. Leave knowing where to check next.</h1>
    <p className="mt-5 max-w-3xl text-base leading-8 text-[#526D66]">DOCVY helps make the first steps in finding care easier to understand. You can use the patient guide anywhere in India. The live doctor directory currently lists source-linked profiles in {providerCityListLabel}. Other city listings are planned when enough useful, source-linked coverage is ready; no expansion date has been announced.</p>
    <div className="mt-10"><PatientJourneyMap intakeEnabled={intakeEnabled} headingLevel={2} /></div>
    <div className="mt-10 grid gap-4 md:grid-cols-2"><article className="rounded-2xl border border-[#B8DCD0] bg-white p-6"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF5F1] text-[#087F83]"><Search size={20}/></span><div><p className="text-[10px] font-extrabold tracking-[0.12em] text-[#087F83]">AVAILABLE TODAY</p><h2 className="text-lg font-bold">Guide and doctor directory</h2></div></div><p className="mt-4 text-sm leading-6 text-[#526D66]">Search the patient guide and browse {providerProfileCount} hospital-sourced doctor profiles in {providerCityListLabel}, by specialty or city. Profile details and availability have not been independently confirmed by DOCVY.</p><div className="mt-5 flex flex-wrap gap-4"><Link href="/care-guide" className="inline-flex items-center gap-2 text-sm font-bold text-[#087F83]">Open the patient guide <ArrowRight size={16} /></Link><Link href="/doctors" className="inline-flex items-center gap-2 text-sm font-bold text-[#087F83]">Browse current listings <ArrowRight size={16} /></Link></div></article><article className="rounded-2xl border border-[#E7C99A] bg-[#FFF9EE] p-6"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#A36A12]"><CalendarClock size={20}/></span><div><p className="text-[10px] font-extrabold tracking-[0.12em] text-[#A36A12]">{intakeEnabled ? "DOCVY ENQUIRY FORM OPEN" : "ENQUIRY FORM PAUSED"}</p><h2 className="text-lg font-bold">An enquiry is not a booking</h2></div></div><p className="mt-4 text-sm leading-6 text-[#6E5B39]">{intakeEnabled ? "When you submit the form, your details are saved to DOCVY’s private intake. Authorized staff at the selected clinic or hospital may review it for follow-up. The provider confirms availability and fees." : "The request page is not collecting details until its private intake connection is configured. The provider must confirm the slot and fee; DOCVY does not take patient payment."}</p></article></div>
    <Link href="/doctors" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#B8D2C9] bg-white px-5 text-sm font-bold text-[#087F83]">Doctor directory status <ArrowRight size={16} /></Link>
  </div></div>;
}
