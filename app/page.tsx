import type { Metadata } from "next";
import Link from "next/link";
import HealthcareBackdrop from "@/components/HealthcareBackdrop";
import { ArrowUpRight, ClipboardList, HeartPulse, Stethoscope } from "lucide-react";
import CareLibrarySearch from "@/components/CareLibrarySearch";
import DiscoverySearch from "@/components/DiscoverySearch";
import { HealthTopicIcon, healthTopics } from "@/components/HealthTopicIcon";
import { procedures, specialties, surgeryGroups } from "@/lib/care-directory";
import SpecialtyIcon from "@/components/SpecialtyIcon";
import { slugify } from "@/lib/directory";
import { buildPageSocialMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

const title = "Find & Book Doctors in India | DOCVY";
const description = "Find doctors and clinics across India, explore specialties and procedures, and learn what to check before requesting an appointment through DOCVY.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  ...buildPageSocialMetadata(title, description, "/"),
};

const libraryEntries = [
  ...healthTopics.map(({ slug, label, description }) => ({ title: label, category: "Condition guide", href: "/patient-guides/" + slug, terms: description + " " + slug.replaceAll("-", " ") + (slug === "high-blood-pressure" ? " hypertension" : "") })),
  ...specialties.map(({ slug, name, plain }) => ({ title: name, category: "Medical specialty", href: "/specialties/" + slug, terms: plain })),
  ...procedures.map(({ name, specialty }) => ({ title: name, category: "Procedure · Find doctors", href: "/surgeries/" + slugify(name), terms: specialty })),
];

const featuredSpecialties = [
  { slug: "gynaecology", title: "Women’s health", text: "Changes to your cycle or questions about reproductive health? See what to bring to a gynaecology visit.", position: "left" },
  { slug: "orthopaedics", title: "Bones, joints and movement", text: "Knee pain or trouble moving? Write down when it started and which activities are harder now.", position: "center" },
  { slug: "cardiology", title: "Heart health", text: "Bringing a heart report to your appointment? Make a list of your medicines and the questions you want answered.", position: "right" },
] as const;

const doctorPaths = [
  { title: "General physician", description: "Start here for a general health check or when you’re unsure which specialist to see.", label: "Find a physician", href: "/doctors?specialty=General+medicine", icon: Stethoscope },
  { title: "Surgeon", description: "Find the surgical specialty for the procedure your doctor mentioned.", label: "Browse surgical specialties", href: "#surgery-directory", icon: ClipboardList },
  { title: "Specialist", description: "Explore doctors by area of care, from children’s health and skin to bones, joints and eyes.", label: "Browse medical specialties", href: "#specialty-directory", icon: HeartPulse },
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
      potentialAction: { "@type": "SearchAction", target: "https://www.docvy.in/doctors?q={search_term_string}", "query-input": "required name=search_term_string" },
    }).replace(/</g, "\\u003c") }} />
    <section className="relative isolate mx-auto flex max-w-[1320px] items-center overflow-hidden px-5 py-14 sm:px-9 sm:py-20 lg:min-h-[460px]">
      <HealthcareBackdrop className="pointer-events-none absolute -right-28 top-1/2 -z-10 w-[530px] max-w-none -translate-y-1/2 opacity-30 sm:-right-20 sm:w-[640px] lg:right-0 lg:w-[720px] lg:opacity-100" />
      <div className="w-full max-w-[660px]">
        <p className="docvy-eyebrow">CARE DISCOVERY · INDIA</p>
        <h1 className="mt-5 max-w-[720px] text-5xl font-bold leading-[.98] tracking-[-.06em] text-[#402442] sm:text-6xl lg:text-7xl">Find the right doctor and book with confidence.</h1>
        <p className="my-6 max-w-lg text-base leading-7 text-[#594c55] sm:text-lg">Explore specialties and procedures across India, and request an appointment where clinic intake is available.</p>
        <DiscoverySearch />
        <p className="mt-3 text-sm text-[#594c55]">You can try the appointment process with a fictional doctor. Real appointments are currently unavailable.</p>
      </div>
    </section>

    <section className="mx-auto max-w-[1320px] px-5 pb-14 sm:px-9" aria-labelledby="story-heading">
      <div className="docvy-glass p-6 sm:p-10">
        <p className="docvy-eyebrow">WHY DOCVY STARTED</p>
        <h2 id="story-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">A clearer place to begin.</h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-[#594c55]">A report lands in your hands. A parent asks which doctor to call. You open your phone and suddenly there are more choices than answers. DOCVY began with a simple idea: people should be able to understand their options before they walk into a clinic.</p>
        <p className="mt-3 max-w-xl leading-7 text-[#594c55]">We’re building a place where families in India can look up unfamiliar terms, understand what different specialists do, and make a list of questions to take to their care team.</p>
        <Link href="/about" className="docvy-pill docvy-pill-primary mt-5">Read the DOCVY story <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>

    <section className="mx-auto max-w-[1320px] px-5 pb-14 sm:px-9" aria-labelledby="featured-specialty-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="docvy-eyebrow">EXPLORE SPECIALTIES</p>
          <h2 id="featured-specialty-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Start with the care you need.</h2>
        </div>
        <Link href="#specialty-directory" className="docvy-pill">See all specialties <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {featuredSpecialties.map(({ slug, title, text, position }) => <Link key={slug} href={`/specialties/${slug}`} className="docvy-glass group overflow-hidden hover:bg-white">
          <div className="aspect-[4/3] bg-[#e4d8cf] bg-no-repeat" style={{ backgroundImage: "url(/images/docvy-specialty-scenes.jpg)", backgroundSize: "300% auto", backgroundPosition: position + " 18%" }} aria-hidden="true" />
          <div className="p-5 sm:p-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f3eaf3] text-[#402442]"><SpecialtyIcon slug={slug} /></span>
            <h3 className="mt-3 text-xl font-bold group-hover:underline">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#594c55]">{text}</p>
            <span className="mt-4 flex items-center gap-2 text-sm font-bold text-[#402442]">Explore this specialty <ArrowUpRight size={16} aria-hidden="true" /></span>
          </div>
        </Link>)}
      </div>
      <p className="mt-3 text-xs text-[#594c55]">AI-generated illustrations of care settings.</p>
    </section>

    <section id="doctor-options" aria-labelledby="doctor-options-heading" className="mx-auto max-w-[1320px] scroll-mt-28 px-5 pb-10 sm:px-9">
      <p className="docvy-eyebrow">FIND A DOCTOR</p>
      <h2 id="doctor-options-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Which doctor do you need?</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {doctorPaths.map(({ title, description, label, href, icon: Icon }) => <article key={href} className="docvy-glass flex flex-col items-start p-5">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#f8f7fc] to-[#e5d4e6] text-[#402442]"><Icon size={27} aria-hidden="true" /></span>
          <h3 className="mt-4 text-xl font-bold">{title}</h3>
          <p className="mb-5 mt-2 flex-1 text-sm leading-6 text-[#594c55]">{description}</p>
          <Link href={href} className="docvy-pill">{label} <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </article>)}
      </div>
      <details className="docvy-glass mt-5 p-4 sm:p-5">
        <summary className="cursor-pointer py-2 font-bold text-[#402442]">See a sample doctor profile and try demo booking</summary>
        <div className="mt-3">
          <Link href="https://docvy-clinic-demo.vercel.app/book" className="docvy-pill">Open the fictional booking demo</Link>
        </div>
      </details>
    </section>

    <section id="care-library" aria-labelledby="care-library-heading" className="mx-auto max-w-[1320px] scroll-mt-28 px-5 pb-10 sm:px-9">
      <p className="docvy-eyebrow">PATIENT LIBRARY</p>
      <h2 id="care-library-heading" className="mb-4 mt-3 text-3xl font-bold tracking-tight sm:text-4xl">What would you like to look up?</h2>
      <CareLibrarySearch entries={libraryEntries} />
    </section>
    <section className="mx-auto max-w-[1320px] scroll-mt-28 px-5 pb-12 pt-6 sm:px-9" id="concerns" aria-labelledby="concern-heading">
      <p className="docvy-eyebrow">START WITH A CONCERN</p>
      <h2 id="concern-heading" className="mt-3 text-3xl font-bold tracking-tight text-[#402442] sm:text-5xl">Explore conditions and symptoms</h2>
      <p className="mt-3 max-w-xl text-[#594c55]">Choose a topic to learn which specialists are commonly involved and how to prepare for a visit.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {healthTopics.map(({ slug, label, description }) => <Link key={slug} href={"/patient-guides/" + slug} className="docvy-glass group overflow-hidden transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#402442]">
          <div aria-hidden="true" className="relative isolate grid h-24 place-items-center overflow-hidden bg-gradient-to-br from-[#f8f7fc] via-[#ece9fb] to-[#e5d4e6] text-[#402442]"><span className="absolute -left-5 -top-14 h-40 w-40 rounded-full border border-white/80" /><span className="absolute -bottom-12 right-3 h-36 w-36 rounded-full border border-white/80" /><span className="relative grid h-16 w-16 -rotate-6 place-items-center rounded-3xl border border-white bg-white/65 shadow-sm transition-transform group-hover:rotate-0"><HealthTopicIcon slug={slug} size={33} /></span></div>
          <span className="block p-5"><strong className="block text-lg">{label}</strong><span className="block text-sm text-[#594c55]">{description}</span><span className="mt-2 flex items-center gap-1 text-sm font-bold text-[#402442] group-hover:underline">Read the guide <ArrowUpRight size={14} aria-hidden="true" /></span></span>
        </Link>)}
      </div>
    </section>
    <section id="specialty-directory" aria-labelledby="specialty-heading" className="mx-auto max-w-[1320px] scroll-mt-28 px-5 py-10 sm:px-9">
      <p className="docvy-eyebrow">TYPES OF DOCTORS</p>
      <h2 id="specialty-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Browse medical specialties</h2>
      <p className="mt-3 max-w-2xl leading-7 text-[#594c55]">If you know the kind of doctor you need, choose a specialty to see what they do and what to bring to your first visit.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {specialties.map(({ slug, name, plain }) => <li key={slug}>
          <Link href={`/specialties/${slug}`} className="docvy-glass group flex h-full flex-col items-start p-4 hover:bg-white">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#fff5dd] to-[#f6d48e] text-[#402442]"><SpecialtyIcon slug={slug} /></span>
            <strong className="mt-3 group-hover:underline">{name}</strong>
            <span className="text-sm text-[#594c55]">{plain}</span>
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
            <p className="mt-3 max-w-2xl leading-7 text-[#594c55]">Browse {procedures.length} procedures by area of care. Pick the one your doctor mentioned to look for relevant doctors, or use the surgery checklist to prepare for a consultation.</p>
            <Link href="/surgery-guide" className="docvy-pill docvy-pill-primary mt-5">Read the surgery checklist <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <svg aria-hidden="true" viewBox="0 0 280 168" className="hidden w-full lg:block">
            <rect width="280" height="168" rx="28" fill="#f3eaf3" />
            <circle cx="146" cy="85" r="68" fill="#fae5ac" />
            <path d="M211 139q7-37 33-58m-20 37q24 0 29-20-20-1-29 20Zm6-18q-13-16-5-30 14 9 5 30ZM67 138q-5-29-23-43m15 26q-19-1-25-15 17-4 25 15Z" fill="#9690c4" stroke="#86612d" strokeWidth="2" strokeLinecap="round" />
            <g transform="rotate(-8 139 83)">
              <rect x="101" y="32" width="87" height="111" rx="14" fill="#dfb36c" />
              <rect x="94" y="26" width="87" height="111" rx="14" fill="#fdfcf5" />
              <rect x="117" y="20" width="42" height="17" rx="8" fill="#402442" />
              <path d="m111 59 5 5 8-10m-13 28 5 5 8-10m-13 28 5 5 8-10m12-39h27m-27 23h27m-27 23h27" fill="none" stroke="#8a6028" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <path d="M203 44h16m-8-8v16M63 60h12m-6-6v12" stroke="#8a6028" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="mt-6 grid items-start gap-3 md:grid-cols-2">
          {surgeryGroups.map(({ name, procedures }) => <details key={name} className="rounded-2xl border border-[#e4d8cf] bg-white/80 px-4">
            <summary className="min-h-12 cursor-pointer py-3 font-bold text-[#402442]">{name} <span className="ml-1 text-sm font-medium text-[#594c55]">({procedures.length})</span></summary>
            <ul className="divide-y divide-[#e4d8cf] pb-2">
              {procedures.map((procedure) => <li key={procedure}>
                <Link href={"/surgeries/" + slugify(procedure)} className="flex min-h-11 items-center justify-between gap-2 py-2 text-sm font-semibold hover:underline" aria-label={`Find doctors for ${procedure}`}>{procedure}<ArrowUpRight size={15} aria-hidden="true" /></Link>
              </li>)}
            </ul>
          </details>)}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[1320px] px-5 pb-16 sm:px-9" aria-labelledby="visit-heading">
      <div className="rounded-3xl bg-[#25252b] p-6 text-white sm:p-9">
        <h2 id="visit-heading" className="text-3xl font-bold tracking-tight text-white">Make the most of your first visit</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {[
            { title: "Write down what has changed", text: "Note when your concern started, what makes it better or worse, and what you want the doctor to help you with." },
            { title: "Bring your recent records", text: "Have relevant reports, prescriptions and a list of medicines handy. Ask the clinic if they need anything else." },
            { title: "Ask what happens next", text: "Before leaving, check who to call with questions, how to get your test results, and when to book a follow-up." },
          ].map(({ title, text }, index) => <div key={title} className="rounded-2xl border border-white/25 bg-white/10 p-5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f3eaf3] font-bold text-[#25252b]" aria-hidden="true">{index + 1}</span>
            <h3 className="mt-3 font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#f3eaf3]">{text}</p>
          </div>)}
        </div>
        <Link href="#care-library" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#f3eaf3] px-5 font-bold text-[#25252b] hover:bg-white">Find a guide for your visit <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  </div>;
}
