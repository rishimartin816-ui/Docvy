import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ClipboardList, HeartPulse, Stethoscope } from "lucide-react";
import DiscoverySearch from "@/components/DiscoverySearch";
import { HealthTopicIcon, healthTopics } from "@/components/HealthTopicIcon";
import { buildPageSocialMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

const title = "DOCVY | Find the Right Type of Doctor";
const description = "Not sure which doctor to see? DOCVY explains medical specialties in plain language and helps you prepare for a visit. Explore free patient guides for India.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  ...buildPageSocialMetadata(title, description, "/"),
};

export default function Home() {
  return <div className="docvy-garden">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://www.docvy.in/#website",
      name: "DOCVY",
      alternateName: "Docvy",
      url: "https://www.docvy.in/",
      inLanguage: "en-IN",
      publisher: { "@id": "https://www.docvy.in/#organization" },
    }).replace(/</g, "\\u003c") }} />
    <section className="relative isolate mx-auto grid max-w-[1320px] items-center gap-8 px-5 pb-10 pt-10 sm:px-9 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
      <div>
        <p className="docvy-eyebrow">CARE DISCOVERY · INDIA</p>
        <h1 className="mt-5 max-w-[720px] text-5xl font-bold leading-[.98] tracking-[-.06em] text-[#1e3028] sm:text-6xl lg:text-7xl">Find the right type of doctor.</h1>
        <p className="my-6 max-w-lg text-base leading-7 text-[#41584d] sm:text-lg">Not sure which doctor to look for? Start with what is on your mind, learn which specialists handle it, or browse by specialty and city.</p>
        <DiscoverySearch />
        <p className="mt-3 text-sm text-[#41584d]">You can try the appointment process with a fictional doctor. Real appointments are currently unavailable.</p>
      </div>
      <aside className="docvy-glass p-6 sm:p-9" aria-labelledby="starting-points">
        <p className="docvy-eyebrow">START HERE</p>
        <h2 id="starting-points" className="mb-5 mt-3 text-3xl font-bold tracking-tight">What brings you here?</h2>
        <ul className="divide-y divide-[#d5e5da]">
          {[
            { href: "/specialties", title: "I want to understand a specialty", text: "Learn what each type of doctor does.", icon: Stethoscope },
            { href: "#concerns", title: "I have a health concern", text: "Start with a question in everyday words.", icon: HeartPulse },
            { href: "/surgery-guide#procedures", title: "My doctor mentioned surgery", text: "Look up a procedure and plan what to ask.", icon: ClipboardList },
          ].map(({ href, title, text, icon: Icon }) => <li key={href}>
            <Link href={href} className="group flex min-h-14 items-center gap-4 py-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e0efe5] text-[#245a46]"><Icon size={20} aria-hidden="true" /></span>
              <span className="flex-1"><strong className="block group-hover:underline">{title}</strong><span className="text-sm text-[#41584d]">{text}</span></span>
              <ArrowUpRight size={17} className="shrink-0 text-[#245a46]" aria-hidden="true" />
            </Link>
          </li>)}
        </ul>
      </aside>
    </section>
    <section className="mx-auto max-w-[1320px] scroll-mt-28 px-5 pb-16 pt-6 sm:px-9" id="concerns" aria-labelledby="concern-heading">
      <p className="docvy-eyebrow">START WITH A CONCERN</p>
      <h2 id="concern-heading" className="mt-3 text-3xl font-bold tracking-tight text-[#1e3028] sm:text-5xl">Which doctor should I see?</h2>
      <p className="mt-3 max-w-xl text-[#41584d]">Choose a topic to learn which specialists are commonly involved and how to prepare for a visit.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {healthTopics.map(({ slug, label, description }) => <Link key={slug} href={"/patient-guides/" + slug} className="docvy-glass flex items-start gap-4 p-4 transition hover:bg-white sm:p-5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e0efe5] text-[#245a46]"><HealthTopicIcon slug={slug} /></span>
          <span><strong className="block text-lg">{label}</strong><span className="text-sm text-[#41584d]">{description}</span></span>
        </Link>)}
      </div>
    </section>
  </div>;
}
