import IllustrationBackground from "@/components/IllustrationBackground";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarClock, CheckCircle2, Search } from "lucide-react";
import PatientJourneyMap from "@/components/PatientJourneyMap";
import { isAppointmentIntakeConfigured } from "@/lib/appointment-intake";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { providerCityListLabel } from "@/lib/directory-coverage";
import { getDirectoryDoctors } from "@/lib/public-directory";
import { canRequestAppointment } from "@/lib/profile-policy";

const howItWorksDescription = `See how DOCVY's India-wide care discovery works. The patient guide is available across India; current source-linked doctor listings are in ${providerCityListLabel}.`;

export const metadata: Metadata = {
  title: "How to use the patient guide and doctor directory",
  description: howItWorksDescription,
  alternates: { canonical: "/how-it-works" },
  ...buildPageSocialMetadata("How to use the patient guide and doctor directory | DOCVY", howItWorksDescription, "/how-it-works"),
};

export default async function HowItWorksPage() {
  const doctors = await getDirectoryDoctors();
  const providerProfileCount = doctors.length;
  const intakeEnabled = isAppointmentIntakeConfigured() && doctors.some(canRequestAppointment);
  return <div className="relative isolate overflow-hidden min-h-[70vh] bg-[#FFFFFF] py-14 md:py-20"><IllustrationBackground slug="how-it-works-planning" alt="Meera and Aarav plan a clinic visit."  /><div className="mx-auto max-w-site px-6">
    <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-ink"><CheckCircle2 strokeWidth={1.5} size={15} /> PATIENT GUIDE · PAN-INDIA</p>
    <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-[-0.04em] text-ink md:text-[52px]">Arrive with a question. Leave knowing where to check next.</h1>
    <p className="mt-5 max-w-3xl text-base leading-8 text-grey">DOCVY helps make the first steps in finding care easier to understand. You can use the patient guide anywhere in India. The live doctor directory currently lists source-linked profiles in {providerCityListLabel}. Other city listings are planned when enough useful, source-linked coverage is ready; no expansion date has been announced.</p>
    <div className="mt-10"><PatientJourneyMap intakeEnabled={intakeEnabled} headingLevel={2} /></div>
    <div className="mt-10 grid gap-4 md:grid-cols-2"><article className="rounded-2xl border border-line bg-white p-6"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-ink"><Search strokeWidth={1.5} size={20}/></span><div><p className="text-[10px] font-extrabold tracking-[0.12em] text-ink">AVAILABLE TODAY</p><h2 className="text-lg font-bold">Guide and doctor directory</h2></div></div><p className="mt-4 text-sm leading-6 text-grey">Search the patient guide and browse {providerProfileCount} hospital-sourced doctor profiles in {providerCityListLabel}, by specialty or city. Profile details and availability have not been independently confirmed by DOCVY.</p><div className="mt-5 flex flex-wrap gap-4"><Link href="/care-guide" className="inline-flex items-center gap-2 text-sm font-bold text-ink">Open the patient guide <ArrowRight strokeWidth={1.5} size={16} /></Link><Link href="/doctors" className="inline-flex items-center gap-2 text-sm font-bold text-ink">Browse current listings <ArrowRight strokeWidth={1.5} size={16} /></Link></div></article><article className="rounded-2xl border border-line bg-surface p-6"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#B45309]"><CalendarClock strokeWidth={1.5} size={20}/></span><div><p className="text-[10px] font-extrabold tracking-[0.12em] text-[#B45309]">{intakeEnabled ? "DOCVY ENQUIRY FORM OPEN" : "ENQUIRY FORM PAUSED"}</p><h2 className="text-lg font-bold">An enquiry is not a booking</h2></div></div><p className="mt-4 text-sm leading-6 text-[#B45309]">{intakeEnabled ? "When you submit the form, your details are saved to DOCVY’s private intake. Authorized staff at the selected clinic or hospital may review it for follow-up. The provider confirms availability and fees." : "The request page is not collecting details until its private intake connection is configured. The provider must confirm the slot and fee; DOCVY does not take patient payment."}</p></article></div>
    <Link href="/doctors" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-5 text-sm font-bold text-ink">Doctor directory status <ArrowRight strokeWidth={1.5} size={16} /></Link>
  </div></div>;
}
