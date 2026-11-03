import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ClipboardList, HeartPulse, Stethoscope } from "lucide-react";
import CareLibrarySearch from "@/components/CareLibrarySearch";
import DiscoverySearch from "@/components/DiscoverySearch";
import { HealthTopicIcon, healthTopics } from "@/components/HealthTopicIcon";
import { procedures, specialties, surgeryGroups } from "@/lib/care-directory";
import SpecialtyIcon from "@/components/SpecialtyIcon";
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

const libraryEntries = [
  ...healthTopics.map(({ slug, label, description }) => ({ title: label, category: "Condition guide", href: "/patient-guides/" + slug, terms: description + " " + slug.replaceAll("-", " ") + (slug === "high-blood-pressure" ? " hypertension" : "") })),
  ...specialties.map(({ slug, name, plain }) => ({ title: name, category: "Medical specialty", href: "/specialties/" + slug, terms: plain })),
  ...procedures.map(({ name, specialty }) => ({ title: name, category: "Procedure · Find doctors", href: "/doctors?" + new URLSearchParams({ specialty, procedure: name }).toString(), terms: specialty })),
];

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
                <div className="relative mb-6 flex h-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#edf4db] via-[#d1ecdf] to-[#b7ddcf]" aria-hidden="true">
          <span className="absolute h-44 w-44 rounded-full border border-white/70" />
          <span className="absolute h-32 w-32 rounded-full border border-white/80" />
          <div className="relative flex items-center gap-5 text-[#245a46]">
            <span className="-rotate-12 rounded-2xl bg-white/75 p-3 shadow-md"><Stethoscope size={24} /></span>
            <span className="rounded-2xl bg-[#245a46] p-4 text-white shadow-lg"><HeartPulse size={32} /></span>
            <span className="rotate-12 rounded-2xl bg-white/75 p-3 shadow-md"><ClipboardList size={24} /></span>
          </div>
        </div>
        <p className="docvy-eyebrow">START HERE</p>
        <h2 id="starting-points" className="mb-5 mt-3 text-3xl font-bold tracking-tight">What brings you here?</h2>
        <ul className="divide-y divide-[#d5e5da]">
          {[
            { href: "#specialty-directory", title: "I want to understand a specialty", text: "Browse specialties and find out what to bring.", icon: Stethoscope },
            { href: "#care-library", title: "I have a health concern", text: "Search for a condition or browse the guides.", icon: HeartPulse },
            { href: "#surgery-directory", title: "My doctor mentioned surgery", text: "Look up a procedure and plan what to ask.", icon: ClipboardList },
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
    <section id="care-library" aria-labelledby="care-library-heading" className="mx-auto max-w-[1320px] scroll-mt-28 px-5 pb-10 sm:px-9">
      <p className="docvy-eyebrow">PATIENT LIBRARY</p>
      <h2 id="care-library-heading" className="mb-4 mt-3 text-3xl font-bold tracking-tight sm:text-4xl">What would you like to look up?</h2>
      <CareLibrarySearch entries={libraryEntries} />
    </section>
    <section className="mx-auto max-w-[1320px] scroll-mt-28 px-5 pb-12 pt-6 sm:px-9" id="concerns" aria-labelledby="concern-heading">
      <p className="docvy-eyebrow">START WITH A CONCERN</p>
      <h2 id="concern-heading" className="mt-3 text-3xl font-bold tracking-tight text-[#1e3028] sm:text-5xl">Explore conditions and symptoms</h2>
      <p className="mt-3 max-w-xl text-[#41584d]">Choose a topic to learn which specialists are commonly involved and how to prepare for a visit.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {healthTopics.map(({ slug, label, description }) => <Link key={slug} href={"/patient-guides/" + slug} className="docvy-glass group overflow-hidden transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#245a46]">
          <div aria-hidden="true" className="relative isolate grid h-24 place-items-center overflow-hidden bg-gradient-to-br from-[#edf4df] via-[#d9ede3] to-[#b9dfd2] text-[#245a46]"><span className="absolute -left-5 -top-14 h-40 w-40 rounded-full border border-white/80" /><span className="absolute -bottom-12 right-3 h-36 w-36 rounded-full border border-white/80" /><span className="relative grid h-16 w-16 -rotate-6 place-items-center rounded-3xl border border-white bg-white/65 shadow-sm transition-transform group-hover:rotate-0"><HealthTopicIcon slug={slug} size={33} /></span></div>
          <span className="block p-5"><strong className="block text-lg">{label}</strong><span className="block text-sm text-[#41584d]">{description}</span><span className="mt-2 flex items-center gap-1 text-sm font-bold text-[#245a46] group-hover:underline">Read the guide <ArrowUpRight size={14} aria-hidden="true" /></span></span>
        </Link>)}
      </div>
    </section>
    <section id="specialty-directory" aria-labelledby="specialty-heading" className="mx-auto max-w-[1320px] scroll-mt-28 px-5 py-10 sm:px-9">
      <p className="docvy-eyebrow">TYPES OF DOCTORS</p>
      <h2 id="specialty-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Browse medical specialties</h2>
      <p className="mt-3 max-w-2xl leading-7 text-[#41584d]">If you know the kind of doctor you need, choose a specialty to see what they do and what to bring to your first visit.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {specialties.map(({ slug, name, plain }) => <li key={slug}>
          <Link href={`/specialties/${slug}`} className="docvy-glass group flex h-full flex-col items-start p-4 hover:bg-white">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#e8f3dd] to-[#c8e6da] text-[#245a46]"><SpecialtyIcon slug={slug} /></span>
            <strong className="mt-3 group-hover:underline">{name}</strong>
            <span className="text-sm text-[#41584d]">{plain}</span>
          </Link>
        </li>)}
      </ul>
    </section>
    <section id="surgery-directory" aria-labelledby="surgery-heading" className="mx-auto max-w-[1320px] scroll-mt-28 px-5 pb-16 pt-10 sm:px-9">
      <div className="docvy-glass p-5 sm:p-9">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_280px]">
          <div>
            <p className="docvy-eyebrow">PLANNING AN OPERATION</p>
            <h2 id="surgery-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Browse surgeries and procedures</h2>
            <p className="mt-3 max-w-2xl leading-7 text-[#41584d]">Browse {procedures.length} procedures by area of care. Pick the one your doctor mentioned to look for relevant doctors, or use the surgery checklist to prepare for a consultation.</p>
            <Link href="/surgery-guide" className="docvy-pill docvy-pill-primary mt-5">Read the surgery checklist <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <svg aria-hidden="true" viewBox="0 0 280 168" className="hidden w-full lg:block">
            <rect width="280" height="168" rx="28" fill="#e1efe0" />
            <circle cx="146" cy="85" r="68" fill="#c7e4d5" />
            <path d="M211 139q7-37 33-58m-20 37q24 0 29-20-20-1-29 20Zm6-18q-13-16-5-30 14 9 5 30ZM67 138q-5-29-23-43m15 26q-19-1-25-15 17-4 25 15Z" fill="#8ab79d" stroke="#58856f" strokeWidth="2" strokeLinecap="round" />
            <g transform="rotate(-8 139 83)">
              <rect x="101" y="32" width="87" height="111" rx="14" fill="#99c7b5" />
              <rect x="94" y="26" width="87" height="111" rx="14" fill="#fdfcf5" />
              <rect x="117" y="20" width="42" height="17" rx="8" fill="#245a46" />
              <path d="m111 59 5 5 8-10m-13 28 5 5 8-10m-13 28 5 5 8-10m12-39h27m-27 23h27m-27 23h27" fill="none" stroke="#3d795f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <path d="M203 44h16m-8-8v16M63 60h12m-6-6v12" stroke="#3d795f" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="mt-6 grid items-start gap-3 md:grid-cols-2">
          {surgeryGroups.map(({ name, specialty, procedures }) => <details key={name} className="rounded-2xl border border-[#d5e5da] bg-white/80 px-4">
            <summary className="min-h-12 cursor-pointer py-3 font-bold text-[#245a46]">{name} <span className="ml-1 text-sm font-medium text-[#41584d]">({procedures.length})</span></summary>
            <ul className="divide-y divide-[#d5e5da] pb-2">
              {procedures.map((procedure) => <li key={procedure}>
                <Link href={{ pathname: "/doctors", query: { specialty, procedure } }} className="flex min-h-11 items-center justify-between gap-2 py-2 text-sm font-semibold hover:underline" aria-label={`Find doctors for ${procedure}`}>{procedure}<ArrowUpRight size={15} aria-hidden="true" /></Link>
              </li>)}
            </ul>
          </details>)}
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-[1320px] px-5 pb-16 sm:px-9" aria-labelledby="visit-heading">
      <div className="rounded-3xl bg-[#183e31] p-6 text-white sm:p-9">
        <h2 id="visit-heading" className="text-3xl font-bold tracking-tight text-white">Make the most of your first visit</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {[
            { title: "Write down what has changed", text: "Note when your concern started, what makes it better or worse, and what you want the doctor to help you with." },
            { title: "Bring your recent records", text: "Have relevant reports, prescriptions and a list of medicines handy. Ask the clinic if they need anything else." },
            { title: "Ask what happens next", text: "Before leaving, check who to call with questions, how to get your test results, and when to book a follow-up." },
          ].map(({ title, text }, index) => <div key={title} className="rounded-2xl border border-white/25 bg-white/10 p-5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#dff1e2] font-bold text-[#183e31]" aria-hidden="true">{index + 1}</span>
            <h3 className="mt-3 font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#e1efe7]">{text}</p>
          </div>)}
        </div>
        <Link href="#care-library" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#dff1e2] px-5 font-bold text-[#183e31] hover:bg-white">Find a guide for your visit <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  </div>;
}
