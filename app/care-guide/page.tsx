import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import CareGuideSearch from "@/components/CareGuideSearch";
import IllustrationBackground from "@/components/IllustrationBackground";
import { HealthTopicIcon } from "@/components/HealthTopicIcon";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { patientTopicGuides } from "@/lib/patient-topic-guides";

const title = "Which doctor should I see? Patient guide";
const description = "Find plain-language guides for common health concerns in India, learn what different specialists do, and prepare questions for your visit.";
const canonical = "https://www.docvy.in/care-guide";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  ...buildPageSocialMetadata(title + " | DOCVY", description, "/care-guide"),
};

export default function CareGuidePage() {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": canonical,
    url: canonical,
    name: title,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": "https://www.docvy.in/#website" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: patientTopicGuides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.topic,
        url: "https://www.docvy.in/patient-guides/" + guide.slug,
      })),
    },
  };

  return <div className="docvy-garden">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection).replace(/</g, "\\u003c") }} />
    <section className="relative isolate mx-auto max-w-[1320px] overflow-hidden px-5 py-12 sm:px-9 lg:py-20">
      <IllustrationBackground slug="health-guides-reading-together" alt="Meera and Ramesh read a guide before a visit." />
      <p className="docvy-eyebrow">PATIENT GUIDE · INDIA</p>
      <h1 className="mt-4 max-w-xl text-4xl font-bold leading-[1.05] tracking-[-.05em] sm:text-6xl">Which doctor should I see?</h1>
      <p className="mt-5 max-w-xl text-base leading-7 text-[#5B6B7A] sm:text-lg">A general physician can be a useful first point of contact if you’re unsure which specialist to see. If you already have a condition or a referral in mind, find a guide below and write down what you want to ask at your visit.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="#guide-search" className="docvy-pill docvy-pill-primary">Search the guide <ArrowUpRight strokeWidth={1.5} size={16} aria-hidden="true" /></a>
        <Link href="/specialties" className="docvy-pill">Browse specialties</Link>
      </div>
    </section>

    <section id="guide-search" className="mx-auto max-w-[1320px] scroll-mt-28 px-5 pb-12 sm:px-9" aria-labelledby="guide-search-heading">
      <div className="docvy-glass p-5 sm:p-8">
        <h2 id="guide-search-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">Start with your question</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5B6B7A]">Try a symptom, condition, or type of doctor. The guide explains common specialty roles to help you prepare for a conversation with a clinician.</p>
        <CareGuideSearch />
      </div>
    </section>

    <section className="mx-auto max-w-[1320px] px-5 pb-12 sm:px-9" aria-labelledby="patient-topics">
      <p className="docvy-eyebrow">PATIENT TOPICS</p>
      <h2 id="patient-topics" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Explore condition guides</h2>
      <p className="mt-3 max-w-2xl leading-7 text-[#5B6B7A]">Each guide explains the topic in plain language, gives questions to take to your appointment, and links to its sources.</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {patientTopicGuides.map((guide) => <li key={guide.slug}>
          <Link href={`/patient-guides/${guide.slug}`} className="docvy-glass group flex h-full items-start gap-4 p-5 hover:bg-white">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#E3F2F0] text-[#0F2A3D]"><HealthTopicIcon slug={guide.slug} size={22} /></span>
            <span>
              <strong className="block text-lg text-[#0F2A3D] group-hover:underline">{guide.topic}</strong>
              <span className="mt-1 block text-sm leading-6 text-[#5B6B7A]">{guide.title}</span>
              <span className="mt-2 flex items-center gap-2 text-sm font-bold">Read the guide <ArrowUpRight strokeWidth={1.5} size={15} aria-hidden="true" /></span>
            </span>
          </Link>
        </li>)}
      </ul>
    </section>

    <section className="mx-auto max-w-[1320px] px-5 pb-16 sm:px-9" aria-labelledby="guide-safety">
      <div className="docvy-glass p-6 sm:p-8">
        <ShieldCheck strokeWidth={1.5} size={24} className="text-[#0F2A3D]" aria-hidden="true" />
        <h2 id="guide-safety" className="mt-3 text-2xl font-bold">How to use these guides</h2>
        <p className="mt-3 max-w-3xl leading-7 text-[#5B6B7A]">Use these guides to understand specialty terms and prepare questions for your care team. A clinician can assess your individual situation. For a life-threatening emergency in India, call <a href="tel:112" className="font-bold underline underline-offset-4">112</a> or go to the nearest emergency department.</p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5B6B7A]">References are listed on each condition page. General background on how primary care works is available from Healthdirect Australia, and emergency information comes from India’s Emergency Response Support System.</p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          <li><a className="underline underline-offset-4" href="https://www.healthdirect.gov.au/healthcare-and-services/roles-and-specialties/the-role-of-a-gp">Healthdirect’s guide to general practice</a></li>
          <li><a className="underline underline-offset-4" href="https://112.gov.in/">India’s Emergency Response Support System</a></li>
        </ul>
      </div>
    </section>
  </div>;
}
