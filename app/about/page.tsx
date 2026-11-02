import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, HeartPulse, Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "About DOCVY",
  description: "DOCVY is building a connected healthcare discovery and operations platform.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DOCVY",
    title: "About DOCVY",
    description: "DOCVY is building a connected healthcare discovery and operations platform.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#F6FAF8]">
      <section className="border-b border-[#DCEAE5] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[72px]">
          <p className="text-[11px] font-extrabold tracking-[0.15em] text-[#087F83]">ABOUT DOCVY</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-[-0.04em] text-[#173A37] md:text-[54px]">Connecting people, providers and care operations.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#526D66]">DOCVY is developing an integrated healthcare ecosystem for finding care, managing appointments and supporting clinic and hospital teams.</p>
          <p className="mt-5 inline-flex rounded-full bg-[#EAF5F1] px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-[#087F83]">PRODUCT IN DEVELOPMENT · NOT A LIVE CARE SERVICE</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1440px] gap-4 px-6 py-12 md:grid-cols-3 lg:px-[72px]">
        {[{ icon: HeartPulse, title: "Patient discovery", text: "Explore care areas, locations and provider information through a clear patient journey." }, { icon: Stethoscope, title: "Provider tools", text: "Planned experiences for doctor profiles, schedules and appointment workflows." }, { icon: Building2, title: "Clinic and hospital operations", text: "A future workspace for appointment teams, departments and care delivery operations." }].map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-[#DCEAE5] bg-white p-6"><Icon size={22} className="text-[#087F83]" /><h2 className="mt-5 text-lg font-bold text-[#173A37]">{title}</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">{text}</p></article>)}
      </section>
      <section className="mx-auto max-w-[1440px] px-6 pb-16 lg:px-[72px]">
        <div className="flex flex-col justify-between gap-5 rounded-[24px] bg-[#123B38] p-7 text-white md:flex-row md:items-center md:p-10">
          <div><h2 className="text-2xl font-bold text-white">Build a connected care experience</h2><p className="mt-2 text-sm text-[#D8E9E3]">Provider onboarding and verified directory publishing are in preparation.</p></div>
          <Link href="/doctors" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#123B38]">Find care <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
