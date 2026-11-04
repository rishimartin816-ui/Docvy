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

  return <main className="bg-[#fffbf1] text-[#2e281f]">
    <section className="overflow-hidden bg-[radial-gradient(circle_at_82%_16%,#DDF0E9_0%,#F4F8FC_44%,#fff_86%)] px-6 py-12 md:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#e3d2b3] bg-white/85 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#70501f]"><Mail size={14} aria-hidden="true" /> CONTACT DOCVY · INDIA</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[54px]">Contact DOCVY about doctor profiles, provider plans or privacy.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#5d5040] md:text-lg">Choose the route that matches your question. Patients can explore the nationwide guide and current doctor listings. Doctors can request a manual profile correction. Clinics and hospitals can discuss planned workflows; provider dashboards and appointment booking are not live.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/care-guide" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#2e281f] px-5 text-sm font-bold text-white transition hover:bg-[#2e281f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3cb74] focus-visible:ring-offset-2">Explore the patient guide <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href="/doctors" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#e3d2b3] bg-white px-5 text-sm font-bold text-[#70501f] transition hover:border-[#70501f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70501f] focus-visible:ring-offset-2">Browse current doctors <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>

        <aside aria-labelledby="current-site-status" className="relative overflow-hidden rounded-[28px] border border-[#e8dac2] bg-[#fffbf1] p-6 shadow-[0_24px_70px_rgba(7,20,38,0.12)] sm:p-8">
          <span aria-hidden="true" className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[24px] border-[#f3cb74]/10" />
          <div className="relative">
            <p className="text-[10px] font-extrabold tracking-[0.14em] text-[#70501f]">WHAT IS AVAILABLE TODAY</p>
            <h2 id="current-site-status" className="mt-2 text-xl font-bold tracking-tight text-[#2e281f]">Know what happens next</h2>
            <dl className="mt-5 space-y-3">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-[#e8dac2] bg-white p-3.5"><dt className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff3d9] text-[#2e281f]"><CalendarClock size={18} aria-hidden="true" /></span>Appointment booking</dt><dd className="shrink-0 rounded-full bg-[#e8dac2] px-3 py-1 text-[11px] font-bold text-[#2e281f]">Not live</dd></div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-[#e8dac2] bg-white p-3.5"><dt className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff3d9] text-[#70501f]"><Stethoscope size={18} aria-hidden="true" /></span>Doctor profile corrections</dt><dd className="shrink-0 rounded-full bg-[#fff3d9] px-3 py-1 text-[11px] font-bold text-[#70501f]">Owner review</dd></div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-[#e8dac2] bg-white p-3.5"><dt className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff3d9] text-[#2e281f]"><Building2 size={18} aria-hidden="true" /></span>Clinic and hospital tools</dt><dd className="shrink-0 rounded-full bg-[#FFF2D9] px-3 py-1 text-[11px] font-bold text-[#80540E]">Planned</dd></div>
            </dl>
            <p className="mt-4 text-xs leading-5 text-[#5d5040]">A patient enquiry, if the form is open, goes to DOCVY and does not reserve a slot or automatically notify a provider.</p>
          </div>
        </aside>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16" aria-labelledby="choose-contact-route">
      <div className="max-w-3xl"><p className="text-xs font-extrabold tracking-[0.14em] text-[#70501f]">CHOOSE YOUR ROUTE</p><h2 id="choose-contact-route" className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">What do you need help with?</h2><p className="mt-3 text-sm leading-7 text-[#5d5040]">Use the right contact path so your message reaches the right team. Never send patient records, symptoms, identity documents or registration certificates by email.</p></div>

      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        <article className="flex flex-col rounded-2xl border border-[#e8dac2] bg-white p-6 shadow-[0_8px_26px_rgba(23,58,55,0.04)]">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff3d9] text-[#70501f]"><Search size={20} aria-hidden="true" /></span>
          <p className="mt-5 text-[10px] font-extrabold tracking-[0.13em] text-[#70501f]">FOR PATIENTS</p>
          <h3 className="mt-2 text-lg font-bold">Find guidance or a current listing</h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-[#5d5040]">Search the patient guide anywhere in India or explore the fictional Delhi clinic demo. For real appointments, contact the provider directly.</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2"><Link href="/care-guide" className="inline-flex min-h-9 items-center gap-1.5 text-sm font-bold text-[#70501f]">Patient guide <ArrowRight size={15} aria-hidden="true" /></Link><Link href="/doctors" className="inline-flex min-h-9 items-center gap-1.5 text-sm font-bold text-[#70501f]">Doctor directory <ArrowRight size={15} aria-hidden="true" /></Link></div>
        </article>

        <article className="flex flex-col rounded-2xl border border-[#e8dac2] bg-white p-6 shadow-[0_8px_26px_rgba(23,58,55,0.04)]">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff3d9] text-[#2e281f]"><Stethoscope size={20} aria-hidden="true" /></span>
          <p className="mt-5 text-[10px] font-extrabold tracking-[0.13em] text-[#2e281f]">FOR DOCTORS</p>
          <h3 className="mt-2 text-lg font-bold">Request a profile correction</h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-[#5d5040]">Share the public hospital or clinic profile link and the exact public detail to correct. The DOCVY owner reviews requests before any change is published; this is not credential verification.</p>
          <Link href="/for-doctors" className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#70501f]">Doctor profile help <ArrowRight size={15} aria-hidden="true" /></Link>
        </article>

        <article className="flex flex-col rounded-2xl border border-[#e8dac2] bg-[#fffbf1] p-6 shadow-[0_8px_26px_rgba(7,20,38,0.04)]">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#2e281f]"><Building2 size={20} aria-hidden="true" /></span>
          <p className="mt-5 text-[10px] font-extrabold tracking-[0.13em] text-[#2e281f]">FOR CLINICS &amp; HOSPITALS</p>
          <h3 className="mt-2 text-lg font-bold">Discuss future provider workflows</h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-[#5d5040]">Provider plans are not available to purchase and rates are not published. Contact DOCVY to discuss future scope; dashboards, subscriptions and checkout are not live.</p>
          <div className="mt-5 flex flex-wrap gap-3"><Link href="/pricing" className="inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-[#70501f]">See planned options <ArrowRight size={15} aria-hidden="true" /></Link><a href={providerEmail} className="inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-[#2e281f]">Email DOCVY <Mail size={15} aria-hidden="true" /></a></div>
        </article>
      </div>
    </section>

    <section className="border-y border-[#e8dac2] bg-white px-6 py-10 md:py-12" aria-label="Patient enquiry status">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-2xl border border-[#E7C99A] bg-[#FFF9EE] p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3"><ShieldAlert className="mt-0.5 shrink-0 text-[#A36A12]" size={21} aria-hidden="true" /><div><p className="text-xs font-extrabold tracking-[0.12em] text-[#A36A12]">PATIENT APPOINTMENT ENQUIRIES · {intakeEnabled ? "OPEN" : "PAUSED"}</p><p className="mt-2 text-sm leading-6 text-[#6E5B39]">{intakeEnabled ? "The form sends your request to DOCVY, not directly to the hospital. No slot is reserved and no appointment is confirmed; contact the provider to confirm availability and fees." : "The website is not collecting patient contact details right now. Use the doctor directory to contact a listed hospital or clinic directly; no slot is reserved by DOCVY."} Do not send patient health or contact information by email.</p></div></div>
        <div className="flex shrink-0 flex-wrap gap-3 md:pl-4"><Link href={intakeEnabled ? "/request" : "/doctors"} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#2e281f] px-4 text-sm font-bold text-white hover:bg-[#2e281f]">{intakeEnabled ? "Open enquiry form" : "Browse doctors"} <ArrowRight size={15} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <section className="mx-auto grid max-w-6xl gap-5 px-6 py-12 md:grid-cols-2 md:py-14" aria-label="Business and privacy contact information">
      <article className="rounded-2xl border border-[#e8dac2] bg-white p-6">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff3d9] text-[#70501f]"><MapPin size={19} aria-hidden="true" /></span><h2 className="text-lg font-bold">Company information</h2></div>
        <p className="mt-4 text-sm font-semibold text-[#5d5040]">DSS Global Technologies Private Limited</p>
        <address className="mt-2 not-italic text-sm leading-6 text-[#5d5040]">2nd Floor, Capital Cityscape, Sector 66,<br />Gurugram, Haryana – 122101, India.</address>
      </article>
      <article className="rounded-2xl border border-[#e8dac2] bg-white p-6">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff3d9] text-[#2e281f]"><ShieldCheck size={19} aria-hidden="true" /></span><h2 className="text-lg font-bold">Privacy and general enquiries</h2></div>
        <p className="mt-4 text-sm leading-6 text-[#5d5040]">For privacy or general business questions, email <a className="font-semibold text-[#70501f] underline decoration-[#e3d2b3] underline-offset-4" href="mailto:contact@docvy.in">contact@docvy.in</a>. Do not include patient data or identity documents.</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2"><Link href="/legal/privacy" className="text-sm font-bold text-[#70501f] underline decoration-[#e3d2b3] underline-offset-4">Privacy policy</Link><Link href="/grievance" className="text-sm font-bold text-[#70501f] underline decoration-[#e3d2b3] underline-offset-4">Grievance support</Link></div>
      </article>
    </section>

    <section className="mx-auto max-w-6xl px-6 pb-14">
      <div className="flex gap-3 rounded-2xl border border-[#e8dac2] bg-[#fffbf1] p-5"><ShieldAlert className="mt-0.5 shrink-0 text-[#2e281f]" size={20} aria-hidden="true" /><div><h2 className="font-bold text-[#2e281f]">Medical emergency?</h2><p className="mt-2 text-sm leading-6 text-[#5d5040]">DOCVY is not an emergency service. In India, call <a className="font-bold underline underline-offset-4" href="tel:112">112</a> or go to the nearest emergency department. <a className="font-semibold text-[#70501f] underline underline-offset-4" href="https://112.gov.in/" target="_blank" rel="noopener noreferrer">Official emergency information</a>.</p></div></div>
    </section>
  </main>;
}
