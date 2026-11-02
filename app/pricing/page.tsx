import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Check, Stethoscope } from "lucide-react";

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
  },
};

const plans = [
  { name: "Starter", price: "Discuss pricing", audience: "Independent clinics", details: ["Provider profile and location presence", "Appointment enquiry workflow", "Basic enquiry overview"] },
  { name: "Growth", price: "Discuss pricing", audience: "Growing clinics and groups", details: ["Multi-doctor profile management", "Appointment and enquiry workflow", "Location-level overview"] },
  { name: "Hospital", price: "Discuss pricing", audience: "Hospitals and health systems", details: ["Hospital and branch profile workflow", "Department and provider management", "Central appointment queue"] },
];

function ContactLink({ children = "Contact now" }: { children?: ReactNode }) {
  return <Link href="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white transition hover:bg-[#066D70]">{children}<ArrowRight size={16} /></Link>;
}

export default function PricingPage() {
  return <div className="bg-[#F6FAF8] text-[#173A37]">
    <section className="bg-white py-16 md:py-20"><div className="mx-auto max-w-[1440px] px-6 lg:px-[72px]">
      <p className="text-[11px] font-extrabold tracking-[0.15em] text-[#087F83]">PLANNED PROVIDER OFFER · NO ONLINE CHECKOUT</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-[-0.04em] md:text-[54px]">A clearer way to manage discovery and appointment enquiries.</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-[#526D66]">Planned options for clinics and hospitals. Contact DOCVY to discuss requirements, onboarding and pricing; there is no payment gateway or self-serve subscription checkout.</p>
    </div></section>
    <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-[72px] md:py-16">
      <div className="grid gap-5 lg:grid-cols-3">{plans.map((plan, index) => <article key={plan.name} className={`flex flex-col rounded-[24px] border bg-white p-6 shadow-[0_12px_40px_rgba(23,58,55,0.04)] md:p-7 ${index === 2 ? "border-[#087F83] ring-1 ring-[#087F83]" : "border-[#DCEAE5]"}`}>
        <div className="flex items-center justify-between"><span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#087F83]">{plan.name}</span>{index === 2 ? <Building2 size={19} className="text-[#087F83]" /> : <Stethoscope size={19} className="text-[#087F83]" />}</div>
        <h2 className="mt-6 text-2xl font-bold tracking-tight">{plan.price}</h2>
        <p className="mt-2 text-sm text-[#526D66]">{plan.audience}</p>
        <ul className="my-7 flex-1 space-y-3 border-t border-[#E8F0EC] pt-6">{plan.details.map((detail) => <li key={detail} className="flex gap-2.5 text-sm leading-6 text-[#36564F]"><Check size={17} className="mt-0.5 shrink-0 text-[#087F83]" />{detail}</li>)}</ul>
        <ContactLink />
      </article>)}</div>
      <p className="mt-6 text-xs leading-5 text-[#789089]">These are planned product areas, not an active subscription offer. Provider workflows are still being developed. No payment is collected here. Confirm availability, pricing, taxes, terms and onboarding with DOCVY before subscribing.</p>
    </section>
    <section className="border-y border-[#DCEAE5] bg-white py-12"><div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-6 md:flex-row md:items-center md:justify-between lg:px-[72px]"><div><h2 className="text-2xl font-bold">Want to discuss a clinic or hospital setup?</h2><p className="mt-2 text-sm text-[#526D66]">Share your organisation details through the contact channel; do not send patient information.</p></div><ContactLink>Contact sales</ContactLink></div></section>
  </div>;
}
