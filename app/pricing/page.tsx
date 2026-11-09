import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Building2, ChevronDown, CircleDot, Clock3, Stethoscope } from "lucide-react";
import { buildPageSocialMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Clinic and hospital plans",
  description: "Explore DOCVY’s planned clinic and hospital workflows. Rates are not published and dashboards are not live; contact DOCVY to discuss future onboarding and pricing.",
  alternates: { canonical: "/pricing" },
  ...buildPageSocialMetadata("Clinic and hospital plans | DOCVY", "Explore DOCVY’s planned clinic and hospital workflows. Rates are not published and dashboards are not live; contact DOCVY to discuss future onboarding and pricing.", "/pricing"),
};

const plans = [
  { name: "Independent clinic", scope: "Single practice", audience: "For a clinic preparing to organise its public profile and patient enquiries.", details: ["Clinic and location information", "Doctor and specialty listings", "A clear path for patient enquiries"] },
  { name: "Clinic group", scope: "Multiple locations", audience: "For teams coordinating providers and enquiries across several sites.", details: ["Shared doctor and facility information", "Enquiries organized by location", "Team review and follow-up workflow"] },
  { name: "Hospital", scope: "Departments and branches", audience: "For hospital teams planning a coordinated discovery and enquiry workflow.", details: ["Hospital and branch information", "Department and provider coordination", "A central enquiry review workflow"] },
];

function ContactLink({ children = "Contact now", href = "/contact", ariaLabel }: { children?: ReactNode; href?: string; ariaLabel?: string }) {
  return <Link href={href} aria-label={ariaLabel} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary">{children}<ArrowRight strokeWidth={1.5} size={16} /></Link>;
}

function buildPlanContactHref(planName: string) {
  const subject = encodeURIComponent(`DOCVY provider enquiry — ${planName}`);
  const body = encodeURIComponent([
    "Organisation name:",
    "City:",
    "Facility type:",
    "Business contact details:",
    "",
    "Please do not include patient or health information.",
  ].join("\n"));
  return `mailto:contact@docvy.in?subject=${subject}&body=${body}`;
}

export default function PricingPage() {
  return <div className="bg-[#FFFFFF] text-ink">
    <section className="overflow-hidden bg-white py-14 md:py-20"><div className="mx-auto grid max-w-[1440px] items-center gap-8 px-6 lg:px-[72px]">
      <div><p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/85 px-4 py-2 text-[11px] font-extrabold tracking-[0.15em] text-ink">CLINIC &amp; HOSPITAL PLANS · PLANNED</p>
      <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[56px]">Plan options for clinics, clinic groups and hospitals.</h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-grey md:text-lg">DOCVY is preparing provider discovery and enquiry workflows for care teams. No plans or rates are available to buy today. Contact us to discuss future scope and pricing; dashboards, appointment management and online checkout are not live.</p>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-grey"><span>For independent clinics</span><span>For multi-location groups</span><span>For hospitals</span></div></div>
    </div><div className="mx-auto mt-8 grid max-w-[1296px] gap-3 px-6 sm:grid-cols-[1fr_auto] sm:items-center lg:px-[72px]"><div className="rounded-2xl border border-line bg-white/90 p-4 sm:px-5"><p className="text-xs font-extrabold tracking-[0.12em] text-ink">NO PUBLISHED RATE CARD</p><p className="mt-1 text-sm leading-6 text-grey">Pricing is discussed directly. There is no online payment or active subscription on this site.</p></div><ContactLink>Contact now</ContactLink></div></section>
    <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-[72px] md:py-16">
      <div className="grid gap-5 lg:grid-cols-3">{plans.map((plan, index) => <article key={plan.name} className={`group relative flex flex-col overflow-hidden rounded-[24px] border bg-white p-6  transition hover:-translate-y-1  md:p-7 ${index === 2 ? "border-[#F1F1EE] ring-1 ring-[#F1F1EE]" : "border-line"}`}>
        <div className="absolute inset-x-0 top-0 h-1 bg-line" />
        <div className="flex items-center justify-between"><span className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink">{plan.name}</span><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-ink">{index === 2 ? <Building2 strokeWidth={1.5} size={19} /> : <Stethoscope strokeWidth={1.5} size={19} />}</span></div>
        <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.12em] text-grey">Organisation type</p><h2 className="mt-1 text-2xl font-bold tracking-tight">{plan.scope}</h2>
        <p className="mt-2 min-h-[72px] text-sm leading-6 text-grey">{plan.audience}</p>
        <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-ink"><Clock3 strokeWidth={1.5} size={13} aria-hidden="true" /> Planned · not live</span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-grey">Potential future workflow</p>
        <ul className="my-4 flex-1 space-y-3 border-t border-line pt-5">{plan.details.map((detail) => <li key={detail} className="flex gap-2.5 text-sm leading-6 text-grey"><CircleDot strokeWidth={1.5} size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-primary-tint" />{detail}</li>)}</ul>
        <ContactLink href={buildPlanContactHref(plan.name)} ariaLabel={`Contact DOCVY about ${plan.name}`}>Contact now</ContactLink>
      </article>)}</div>
      <p className="mt-6 rounded-xl border border-line bg-surface p-4 text-xs leading-5 text-[#B45309]">The cards describe planned use cases and potential workflows, not active service packages. Final scope depends on future product readiness and a direct conversation with DOCVY.</p>
    </section>
    <section className="border-y border-line bg-white px-6 py-14 md:py-16" aria-labelledby="provider-plan-questions"><div className="mx-auto grid max-w-[1296px] gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-xs font-extrabold tracking-[0.14em] text-ink">CLEAR ANSWERS FOR CARE TEAMS</p><h2 id="provider-plan-questions" className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">Before you contact DOCVY</h2><p className="mt-3 text-sm leading-7 text-grey">These answers describe the current site and planned provider work. Contact DOCVY to discuss future scope; don’t send patient or health information.</p></div><div className="space-y-3">{[
      ["Are clinic or hospital plans available now?", "No. These are future workflow options, not services you can buy today. Contact DOCVY to discuss scope and future onboarding."],
      ["What does DOCVY charge clinics and hospitals?", "DOCVY has not published rates or opened subscriptions. Pricing is discussed directly; there is no checkout or payment collection on this website."],
      ["Can a hospital manage patient appointments in a DOCVY dashboard?", "Operational workspace access is reviewed with each organisation. Patients can request a visit through DOCVY for a listed doctor. This does not reserve a slot or connect to the hospital’s calendar."],
      ["What information should I include in a provider enquiry?", "Share your organisation name, city, facility type and business contact details. Do not include any patient's name, contact details, symptoms or medical records."],
    ].map(([question, answer]) => <details key={question} className="group rounded-2xl border border-line bg-[#FFFFFF] p-5 open:bg-white open:shadow-sm"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><span>{question}</span><ChevronDown strokeWidth={1.5} size={18} aria-hidden="true" className="shrink-0 text-ink transition-transform group-open:rotate-180" /></summary><p className="mt-3 max-w-3xl text-sm leading-7 text-grey">{answer}</p></details>)}</div></div></section>
    <section className="border-b border-line bg-white py-12"><div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-6 md:flex-row md:items-center md:justify-between lg:px-[72px]"><div><h2 className="text-2xl font-bold">Want to discuss a clinic or hospital setup?</h2><p className="mt-2 text-sm text-grey">Share your organisation details through the contact channel; do not send patient information.</p></div><ContactLink>Contact now</ContactLink></div></section>
  </div>;
}
