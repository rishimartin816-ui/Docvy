import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Check, Stethoscope } from "lucide-react";
import ProviderWorkflowIllustration from "@/components/ProviderWorkflowIllustration";
import { docvyOpenGraphImage } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Clinic and hospital plans",
  description: "Explore planned DOCVY tools for clinics and hospitals. Contact the team to discuss onboarding and pricing; online payment is not available.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DOCVY",
    title: "Clinic and hospital plans | DOCVY",
    description: "Discuss planned provider tools, onboarding and pricing with DOCVY. There is no online checkout.",
    url: "/pricing",
    images: [docvyOpenGraphImage],
  },
};

const plans = [
  { name: "Independent clinic", price: "Single practice", audience: "For a clinic preparing to organise its public profile and patient enquiries.", details: ["Clinic and location information", "Doctor and specialty listings", "A clear path for patient enquiries"] },
  { name: "Clinic group", price: "Multiple locations", audience: "For teams coordinating providers and enquiries across several sites.", details: ["Shared doctor and facility information", "Enquiries organized by location", "Team review and follow-up workflow"] },
  { name: "Hospital", price: "Departments and branches", audience: "For hospital teams planning a coordinated discovery and enquiry workflow.", details: ["Hospital and branch information", "Department and provider coordination", "A central enquiry review workflow"] },
];

function ContactLink({ children = "Contact now" }: { children?: ReactNode }) {
  return <Link href="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white transition hover:bg-[#066D70]">{children}<ArrowRight size={16} /></Link>;
}

export default function PricingPage() {
  return <div className="bg-[#F6FAF8] text-[#173A37]">
    <section className="overflow-hidden bg-[radial-gradient(circle_at_82%_48%,#DDF0E9_0%,#F6FAF8_36%,#fff_75%)] py-14 md:py-20"><div className="mx-auto grid max-w-[1440px] items-center gap-8 px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-[72px]">
      <div><p className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/85 px-4 py-2 text-[11px] font-extrabold tracking-[0.15em] text-[#087F83]">PROVIDER TOOLS · PLANNED</p>
      <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[56px]">Tools for clinics and hospitals to organize provider discovery and enquiries.</h1>
      <p className="mt-5 max-w-3xl text-base leading-8 text-[#526D66] md:text-lg">DOCVY is planning workflows for provider profiles, locations and appointment enquiries. Tell us about your team and how it handles enquiries today; we’ll discuss fit, scope and pricing directly. No dashboard or online checkout is open yet.</p>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#526D66]"><span>For independent clinics</span><span>For multi-location groups</span><span>For hospitals</span></div></div>
      <div className="mx-auto w-full max-w-[500px]"><ProviderWorkflowIllustration /></div>
    </div></section>
    <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-[72px] md:py-16">
      <div className="grid gap-5 lg:grid-cols-3">{plans.map((plan, index) => <article key={plan.name} className={`group relative flex flex-col overflow-hidden rounded-[24px] border bg-white p-6 shadow-[0_12px_40px_rgba(23,58,55,0.04)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,58,55,0.1)] md:p-7 ${index === 2 ? "border-[#087F83] ring-1 ring-[#087F83]" : "border-[#DCEAE5]"}`}>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#087F83] via-[#16A6A1] to-[#B8E1D5]" />
        <div className="flex items-center justify-between"><span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#087F83]">{plan.name}</span><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF5F1] text-[#087F83]">{index === 2 ? <Building2 size={19} /> : <Stethoscope size={19} />}</span></div>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">{plan.price}</h2>
        <p className="mt-2 min-h-[72px] text-sm leading-6 text-[#526D66]">{plan.audience}</p>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[#789089]">Potential workflow</p>
        <ul className="my-4 flex-1 space-y-3 border-t border-[#E8F0EC] pt-5">{plan.details.map((detail) => <li key={detail} className="flex gap-2.5 text-sm leading-6 text-[#36564F]"><Check size={17} className="mt-0.5 shrink-0 text-[#087F83]" />{detail}</li>)}</ul>
        <ContactLink>Discuss this setup</ContactLink>
      </article>)}</div>
      <p className="mt-6 rounded-xl border border-[#E7C99A] bg-[#FFF9EE] p-4 text-xs leading-5 text-[#6E5B39]">These workflows are planned and are not available as a service yet. There is no subscription checkout or payment collection on this website. Please contact DOCVY to discuss scope and future availability.</p>
    </section>
    <section className="border-y border-[#DCEAE5] bg-white py-12"><div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-6 md:flex-row md:items-center md:justify-between lg:px-[72px]"><div><h2 className="text-2xl font-bold">Want to discuss a clinic or hospital setup?</h2><p className="mt-2 text-sm text-[#526D66]">Share your organisation details through the contact channel; do not send patient information.</p></div><ContactLink>Contact sales</ContactLink></div></section>
  </div>;
}
