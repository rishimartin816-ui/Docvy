import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Building2, ChevronDown, CircleDot, Clock3, Stethoscope } from "lucide-react";
import ProviderWorkflowIllustration from "@/components/ProviderWorkflowIllustration";
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
  return <Link href={href} aria-label={ariaLabel} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#70501f] px-5 text-sm font-bold text-white transition hover:bg-[#563b16]">{children}<ArrowRight size={16} /></Link>;
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
  return <div className="bg-[#fffbf1] text-[#2e281f]">
    <section className="overflow-hidden bg-[radial-gradient(circle_at_82%_48%,#DDF0E9_0%,#F6FAF8_36%,#fff_75%)] py-14 md:py-20"><div className="mx-auto grid max-w-[1440px] items-center gap-8 px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-[72px]">
      <div><p className="inline-flex items-center gap-2 rounded-full border border-[#e3d2b3] bg-white/85 px-4 py-2 text-[11px] font-extrabold tracking-[0.15em] text-[#70501f]">CLINIC &amp; HOSPITAL PLANS · PLANNED</p>
      <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[56px]">Plan options for clinics, clinic groups and hospitals.</h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-[#5d5040] md:text-lg">DOCVY is preparing provider discovery and enquiry workflows for care teams. No plans or rates are available to buy today. Contact us to discuss future scope and pricing; dashboards, appointment management and online checkout are not live.</p>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#5d5040]"><span>For independent clinics</span><span>For multi-location groups</span><span>For hospitals</span></div></div>
      <div className="mx-auto w-full max-w-[500px]"><ProviderWorkflowIllustration /></div>
    </div><div className="mx-auto mt-8 grid max-w-[1296px] gap-3 px-6 sm:grid-cols-[1fr_auto] sm:items-center lg:px-[72px]"><div className="rounded-2xl border border-[#e8dac2] bg-white/90 p-4 sm:px-5"><p className="text-xs font-extrabold tracking-[0.12em] text-[#70501f]">NO PUBLISHED RATE CARD</p><p className="mt-1 text-sm leading-6 text-[#5d5040]">Pricing is discussed directly. There is no online payment or active subscription on this site.</p></div><ContactLink>Contact now</ContactLink></div></section>
    <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-[72px] md:py-16">
      <div className="grid gap-5 lg:grid-cols-3">{plans.map((plan, index) => <article key={plan.name} className={`group relative flex flex-col overflow-hidden rounded-[24px] border bg-white p-6 shadow-[0_12px_40px_rgba(7,20,38,0.06)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(7,20,38,0.12)] md:p-7 ${index === 2 ? "border-[#f3cb74] ring-1 ring-[#f3cb74]" : "border-[#e8dac2]"}`}>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2e281f] via-[#f3cb74] to-[#f3cb74]" />
        <div className="flex items-center justify-between"><span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#2e281f]">{plan.name}</span><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff3d9] text-[#70501f]">{index === 2 ? <Building2 size={19} /> : <Stethoscope size={19} />}</span></div>
        <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#5d5040]">Organisation type</p><h2 className="mt-1 text-2xl font-bold tracking-tight">{plan.scope}</h2>
        <p className="mt-2 min-h-[72px] text-sm leading-6 text-[#5d5040]">{plan.audience}</p>
        <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#fff3d9] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#2e281f]"><Clock3 size={13} aria-hidden="true" /> Planned · not live</span>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[#5d5040]">Potential future workflow</p>
        <ul className="my-4 flex-1 space-y-3 border-t border-[#e8dac2] pt-5">{plan.details.map((detail) => <li key={detail} className="flex gap-2.5 text-sm leading-6 text-[#5d5040]"><CircleDot size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-[#f3cb74]" />{detail}</li>)}</ul>
        <ContactLink href={buildPlanContactHref(plan.name)} ariaLabel={`Contact DOCVY about ${plan.name}`}>Contact now</ContactLink>
      </article>)}</div>
      <p className="mt-6 rounded-xl border border-[#E7C99A] bg-[#FFF9EE] p-4 text-xs leading-5 text-[#6E5B39]">The cards describe planned use cases and potential workflows, not active service packages. Final scope depends on future product readiness and a direct conversation with DOCVY.</p>
    </section>
    <section className="border-y border-[#e8dac2] bg-white px-6 py-14 md:py-16" aria-labelledby="provider-plan-questions"><div className="mx-auto grid max-w-[1296px] gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-xs font-extrabold tracking-[0.14em] text-[#70501f]">CLEAR ANSWERS FOR CARE TEAMS</p><h2 id="provider-plan-questions" className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">Before you contact DOCVY</h2><p className="mt-3 text-sm leading-7 text-[#5d5040]">These answers describe the current site and planned provider work. Contact DOCVY to discuss future scope; don’t send patient or health information.</p></div><div className="space-y-3">{[
      ["Are clinic or hospital plans available now?", "No. These are future workflow options, not services you can buy today. Contact DOCVY to discuss scope and future onboarding."],
      ["What does DOCVY charge clinics and hospitals?", "DOCVY has not published rates or opened subscriptions. Pricing is discussed directly; there is no checkout or payment collection on this website."],
      ["Can a hospital manage patient appointments in a DOCVY dashboard?", "No. The hospital dashboard, live appointment slots and booking workflow are not available. The patient enquiry form is closed, and patients should confirm appointments directly with the provider."],
      ["What information should I include in a provider enquiry?", "Share your organisation name, city, facility type and business contact details. Do not include any patient's name, contact details, symptoms or medical records."],
    ].map(([question, answer]) => <details key={question} className="group rounded-2xl border border-[#e8dac2] bg-[#fffbf1] p-5 open:bg-white open:shadow-sm"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-[#2e281f] marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70501f]"><span>{question}</span><ChevronDown size={18} aria-hidden="true" className="shrink-0 text-[#70501f] transition-transform group-open:rotate-180" /></summary><p className="mt-3 max-w-3xl text-sm leading-7 text-[#5d5040]">{answer}</p></details>)}</div></div></section>
    <section className="border-b border-[#e8dac2] bg-white py-12"><div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-6 md:flex-row md:items-center md:justify-between lg:px-[72px]"><div><h2 className="text-2xl font-bold">Want to discuss a clinic or hospital setup?</h2><p className="mt-2 text-sm text-[#5d5040]">Share your organisation details through the contact channel; do not send patient information.</p></div><ContactLink>Contact now</ContactLink></div></section>
  </div>;
}
