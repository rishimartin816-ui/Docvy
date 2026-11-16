import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CalendarClock, Mail, MapPin, Search, ShieldAlert, ShieldCheck, Stethoscope } from "lucide-react";
import { isAppointmentIntakeConfigured } from "@/lib/appointment-intake";
import { buildPageSocialMetadata } from "@/lib/metadata";

const pageDescription = "Contact DOCVY for public doctor profile corrections, planned clinic and hospital workflows, privacy support or business details. Appointment booking is not live.";

export const metadata: Metadata = {
  title: "Contact DOCVY about doctor profiles and clinic plans",
  description: pageDescription,
  alternates: { canonical: "/contact" },
  ...buildPageSocialMetadata("Contact DOCVY about doctor profiles and clinic plans | DOCVY", pageDescription, "/contact"),
};

export default function ContactPage() {
  const intakeEnabled = isAppointmentIntakeConfigured();
  const providerEmail = `mailto:contact@docvy.in?subject=DOCVY%20clinic%20or%20hospital%20enquiry&body=${encodeURIComponent([
    "Organisation name:",
    "City:",
    "Facility type:",
    "Business contact details:",
    "",
    "Please do not include patient or health information.",
  ].join("\n"))}`;

  return <main className="bg-[#FFFFFF] text-ink">
    <section className="overflow-hidden bg-white px-6 py-12 md:py-16">
      <div className="mx-auto grid max-w-site items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/85 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-ink"><Mail strokeWidth={1.5} size={14} aria-hidden="true" /> CONTACT DOCVY · INDIA</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[54px]">Contact DOCVY about doctor profiles, provider plans or privacy.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-grey md:text-lg">Choose the route that matches your question. Patients can explore the nationwide guide and current doctor listings. Doctors can request a manual profile correction. Clinics and hospitals can discuss planned workflows; provider dashboards and appointment booking are not live.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/care-guide" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F1F1EE] focus-visible:ring-offset-2">Explore the patient guide <ArrowRight strokeWidth={1.5} size={16} aria-hidden="true" /></Link>
            <Link href="/doctors" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-5 text-sm font-bold text-ink transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Browse current doctors <ArrowRight strokeWidth={1.5} size={16} aria-hidden="true" /></Link>
          </div>
        </div>

        <aside aria-labelledby="current-site-status" className="relative overflow-hidden rounded-[28px] border border-line bg-[#FFFFFF] p-6  sm:p-8">
          <span aria-hidden="true" className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[24px] border-[#F1F1EE]/10" />
          <div className="relative">
            <p className="text-[10px] font-extrabold tracking-[0.14em] text-ink">WHAT IS AVAILABLE TODAY</p>
            <h2 id="current-site-status" className="mt-2 text-xl font-bold tracking-tight text-ink">Know what happens next</h2>
            <dl className="mt-5 space-y-3">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white p-3.5"><dt className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-ink"><CalendarClock strokeWidth={1.5} size={18} aria-hidden="true" /></span>Appointment booking</dt><dd className="shrink-0 rounded-full bg-line px-3 py-1 text-[11px] font-bold text-ink">Not live</dd></div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white p-3.5"><dt className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-ink"><Stethoscope strokeWidth={1.5} size={18} aria-hidden="true" /></span>Doctor profile corrections</dt><dd className="shrink-0 rounded-full bg-surface px-3 py-1 text-[11px] font-bold text-ink">Owner review</dd></div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white p-3.5"><dt className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-ink"><Building2 strokeWidth={1.5} size={18} aria-hidden="true" /></span>Clinic and hospital tools</dt><dd className="shrink-0 rounded-full bg-surface px-3 py-1 text-[11px] font-bold text-[#B45309]">Planned</dd></div>
            </dl>
            <p className="mt-4 text-xs leading-5 text-grey">Patient appointment requests are saved privately for follow-up with the selected clinic.</p>
          </div>
        </aside>
      </div>
    </section>

    <section className="mx-auto max-w-site px-6 py-12 md:py-16" aria-labelledby="choose-contact-route">
      <div className="max-w-3xl"><p className="text-xs font-extrabold tracking-[0.14em] text-ink">CHOOSE YOUR ROUTE</p><h2 id="choose-contact-route" className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">What do you need help with?</h2><p className="mt-3 text-sm leading-7 text-grey">Use the right contact path so your message reaches the right team. Never send patient records, symptoms, identity documents or registration certificates by email.</p></div>

      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        <article className="flex flex-col rounded-2xl border border-line bg-white p-6 ">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-ink"><Search strokeWidth={1.5} size={20} aria-hidden="true" /></span>
          <p className="mt-5 text-[10px] font-extrabold tracking-[0.13em] text-ink">FOR PATIENTS</p>
          <h3 className="mt-2 text-lg font-bold">Find guidance or a current listing</h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-grey">Search the patient guide anywhere in India or explore real doctor profiles. Send appointment requests through DOCVY and wait for provider confirmation.</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2"><Link href="/care-guide" className="inline-flex min-h-9 items-center gap-1.5 text-sm font-bold text-ink">Patient guide <ArrowRight strokeWidth={1.5} size={15} aria-hidden="true" /></Link><Link href="/doctors" className="inline-flex min-h-9 items-center gap-1.5 text-sm font-bold text-ink">Doctor directory <ArrowRight strokeWidth={1.5} size={15} aria-hidden="true" /></Link></div>
        </article>

        <article className="flex flex-col rounded-2xl border border-line bg-white p-6 ">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-ink"><Stethoscope strokeWidth={1.5} size={20} aria-hidden="true" /></span>
          <p className="mt-5 text-[10px] font-extrabold tracking-[0.13em] text-ink">FOR DOCTORS</p>
          <h3 className="mt-2 text-lg font-bold">Request a profile correction</h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-grey">Share the public hospital or clinic profile link and the exact public detail to correct. The DOCVY owner reviews requests before any change is published; this is not credential verification.</p>
          <Link href="/for-doctors" className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-ink">Doctor profile help <ArrowRight strokeWidth={1.5} size={15} aria-hidden="true" /></Link>
        </article>

        <article className="flex flex-col rounded-2xl border border-line bg-[#FFFFFF] p-6 ">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-ink"><Building2 strokeWidth={1.5} size={20} aria-hidden="true" /></span>
          <p className="mt-5 text-[10px] font-extrabold tracking-[0.13em] text-ink">FOR CLINICS &amp; HOSPITALS</p>
          <h3 className="mt-2 text-lg font-bold">Discuss future provider workflows</h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-grey">Provider plans are not available to purchase and rates are not published. Contact DOCVY to discuss future scope; dashboards, subscriptions and checkout are not live.</p>
          <div className="mt-5 flex flex-wrap gap-3"><Link href="/pricing" className="inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-ink">See planned options <ArrowRight strokeWidth={1.5} size={15} aria-hidden="true" /></Link><a href={providerEmail} className="inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-ink">Email DOCVY <Mail strokeWidth={1.5} size={15} aria-hidden="true" /></a></div>
        </article>
      </div>
    </section>

    <section className="border-y border-line bg-white px-6 py-10 md:py-12" aria-label="Patient enquiry status">
      <div className="mx-auto flex max-w-site flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3"><ShieldAlert className="mt-0.5 shrink-0 text-[#B45309]" size={21} aria-hidden="true" /><div><p className="text-xs font-extrabold tracking-[0.12em] text-[#B45309]">PATIENT APPOINTMENT ENQUIRIES · {intakeEnabled ? "OPEN" : "PAUSED"}</p><p className="mt-2 text-sm leading-6 text-[#B45309]">{intakeEnabled ? "Choose your doctor and practice, share your preferred visit time, and keep your DOCVY reference for follow-up." : "Use the doctor directory to find your clinic and contact it to arrange a visit."} Do not send patient health or contact information by email.</p></div></div>
        <div className="flex shrink-0 flex-wrap gap-3 md:pl-4"><Link href={intakeEnabled ? "/request" : "/doctors"} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white hover:bg-primary">{intakeEnabled ? "Open enquiry form" : "Browse doctors"} <ArrowRight strokeWidth={1.5} size={15} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <section className="mx-auto grid max-w-site gap-5 px-6 py-12 md:grid-cols-2 md:py-14" aria-label="Business and privacy contact information">
      <article className="rounded-2xl border border-line bg-white p-6">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-ink"><MapPin strokeWidth={1.5} size={19} aria-hidden="true" /></span><h2 className="text-lg font-bold">Company information</h2></div>
        <p className="mt-4 text-sm font-semibold text-grey">DSS Global Technologies Private Limited</p>
        <address className="mt-2 not-italic text-sm leading-6 text-grey">Sector 48,<br />Gurugram, Haryana 122101, India.</address>
      </article>
      <article className="rounded-2xl border border-line bg-white p-6">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-ink"><ShieldCheck strokeWidth={1.5} size={19} aria-hidden="true" /></span><h2 className="text-lg font-bold">Privacy and general enquiries</h2></div>
        <p className="mt-4 text-sm leading-6 text-grey">For privacy or general business questions, email <a className="font-semibold text-ink underline decoration-[#DEDEDA] underline-offset-4" href="mailto:contact@docvy.in">contact@docvy.in</a>. Do not include patient data or identity documents.</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2"><Link href="/legal/privacy" className="text-sm font-bold text-ink underline decoration-[#DEDEDA] underline-offset-4">Privacy policy</Link><Link href="/grievance" className="text-sm font-bold text-ink underline decoration-[#DEDEDA] underline-offset-4">Grievance support</Link></div>
      </article>
    </section>

    <section className="mx-auto max-w-site px-6 pb-14">
      <div className="flex gap-3 rounded-2xl border border-line bg-[#FFFFFF] p-5"><ShieldAlert className="mt-0.5 shrink-0 text-ink" size={20} aria-hidden="true" /><div><h2 className="font-bold text-ink">Medical emergency?</h2><p className="mt-2 text-sm leading-6 text-grey">DOCVY is not an emergency service. In India, call <a className="font-bold underline underline-offset-4" href="tel:112">112</a> or go to the nearest emergency department. <a className="font-semibold text-ink underline underline-offset-4" href="https://112.gov.in/" target="_blank" rel="noopener noreferrer">Official emergency information</a>.</p></div></div>
    </section>
  </main>;
}
