import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarCheck, ClipboardList, HeartPulse, MapPin, MessageSquare, Stethoscope } from "lucide-react";
import DiscoverySearch, { DemoProvider } from "@/components/DiscoverySearch";
import { HealthTopicIcon, healthTopics } from "@/components/HealthTopicIcon";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";

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
  const demo = clinicCrmConfig()?.staging === true;
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
    }).replace(/</g, "\u003c") }} />
    <section className="relative isolate mx-auto grid max-w-[1320px] items-center gap-8 px-5 pb-10 pt-10 sm:px-9 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
      <div>
        <p className="docvy-eyebrow">CARE DISCOVERY · INDIA</p>
        <h1 className="mt-5 max-w-[720px] text-5xl font-bold leading-[.98] tracking-[-.06em] text-[#1e3028] sm:text-6xl lg:text-7xl">Care starts with a question.</h1>
        <p className="my-6 max-w-lg text-base leading-7 text-[#41584d] sm:text-lg">Not sure which doctor to look for? Start with what is on your mind, learn which specialists handle it, or browse by specialty and city.</p>
        <DiscoverySearch />
        <p className="mt-3 text-sm text-[#41584d]">Use the patient guides for real-life questions. The directory and booking walkthrough use fictional data.</p>
      </div>
      <figure className="docvy-glass overflow-hidden p-3 sm:p-4">
        <Image src="/images/docvy-consultation-nci.jpg" width={800} height={600} priority sizes="(max-width: 1023px) 90vw, 42vw" alt="A clinician speaking with a patient in a consultation room" className="aspect-[4/3] w-full rounded-[22px] object-cover" />
        <figcaption className="px-2 pt-2 text-xs text-[#41584d]">Illustrative photo by the National Cancer Institute.</figcaption>
      </figure>
    </section>
    <section className="mx-auto max-w-[1320px] px-5 pb-8 sm:px-9" aria-labelledby="care-paths">
      <h2 id="care-paths" className="mb-4 text-3xl font-bold tracking-tight">What would you like help with?</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: "Find a doctor", text: "Choose a city and specialty, then see how an in-clinic appointment works.", href: "/doctors", label: "Browse consultations", icon: Stethoscope },
          { title: "Planning for surgery", text: "Get your questions ready about treatment options, hospital costs, and recovery.", href: "/surgery-guide", label: "Read the surgery guide", icon: ClipboardList },
          { title: "Start with a concern", text: "Use everyday words to learn which specialists may be involved and what to ask at a visit.", href: "/care-guide", label: "Explore patient guides", icon: HeartPulse },
        ].map(({ title, text, href, label, icon: Icon }) => <Link href={href} key={href} className="docvy-glass flex flex-col items-start p-6 transition hover:bg-white">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e0efe5] text-[#245a46]"><Icon size={23} aria-hidden="true" /></span>
          <h3 className="mt-4 text-2xl font-bold">{title}</h3>
          <p className="mb-4 mt-2 flex-1 text-[#41584d]">{text}</p>
          <span className="flex items-center gap-2 text-sm font-bold text-[#245a46]">{label} <ArrowUpRight size={16} aria-hidden="true" /></span>
        </Link>)}
      </div>
    </section>
    <section className="mx-auto max-w-[1320px] px-5 py-10 sm:px-9" aria-labelledby="specialties">
      <p className="docvy-eyebrow">START WITH A CONCERN</p>
      <h2 id="specialties" className="mt-3 text-3xl font-bold tracking-tight text-[#1e3028] sm:text-5xl">Which doctor should I see?</h2>
      <p className="mt-3 max-w-xl text-[#41584d]">Choose a topic to learn which specialists are commonly involved and how to prepare for a visit.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {healthTopics.map(({ slug, label, description }) => <Link key={slug} href={"/patient-guides/" + slug} className="docvy-glass flex items-start gap-4 p-4 transition hover:bg-white sm:p-5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e0efe5] text-[#245a46]"><HealthTopicIcon slug={slug} /></span>
          <span><strong className="block text-lg">{label}</strong><span className="text-sm text-[#41584d]">{description}</span></span>
        </Link>)}
      </div>
    </section>
    <section className="mx-auto grid max-w-[1320px] gap-5 px-5 py-10 sm:px-9 lg:grid-cols-2">
      <div className="docvy-glass p-6 sm:p-8">
        <MapPin className="text-[#245a46]" aria-hidden="true" />
        <h2 className="mt-4 text-3xl font-bold text-[#1e3028]">Explore cities across India</h2>
        <p className="mt-2 text-sm text-[#41584d]">Choose your city and specialty together. The fictional booking walkthrough is set in Delhi.</p>
        <Link href="/doctors" className="docvy-pill mt-5">Browse cities and specialties <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
      <div className="docvy-glass p-6 sm:p-8">
        <HeartPulse className="text-[#245a46]" aria-hidden="true" />
        <h2 className="mt-4 text-3xl font-bold text-[#1e3028]">Understand your options</h2>
        <p className="mt-2 leading-7 text-[#41584d]">Use the patient guide to learn about common health concerns and the types of specialists you may encounter.</p>
        <Link href="/care-guide" className="docvy-pill mt-5">Read the patient guide <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
    <section className="mx-auto max-w-[1320px] px-5 pb-16 pt-8 sm:px-9" aria-labelledby="demo">
      <p className="docvy-eyebrow">TRY THE WORKFLOW</p>
      <h2 id="demo" className="mb-5 mt-3 flex items-center gap-3 text-3xl font-bold text-[#1e3028]"><CalendarCheck aria-hidden="true" /> Clinic appointment demo</h2>
      <DemoProvider bookingHref={demo ? "/book" : "https://docvy-clinic-demo.vercel.app/book"} />
      <details className="docvy-glass mt-5 p-5 text-[#41584d]">
        <summary className="flex cursor-pointer items-center gap-2 font-semibold text-[#1e3028]"><MessageSquare size={18} aria-hidden="true" /> How to read patient reviews</summary>
        <p className="mt-3 max-w-2xl text-sm">Look at the number of reviews as well as the score. Read recent stories for details that matter to you, like communication, waiting time, and how clearly costs were explained. Confirm fees, location, and availability with the clinic before visiting.</p>
      </details>
      <Link href={demo ? "/crm/clinic" : "https://docvy-clinic-demo.vercel.app/crm/clinic"} className="docvy-pill mt-4">Open the clinic CRM <ArrowUpRight size={17} aria-hidden="true" /></Link>
    </section>
  </div>;
}
