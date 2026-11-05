import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Building2, CalendarCheck, ClipboardList, Search, Stethoscope } from "lucide-react";
import DiscoverySearch from "@/components/DiscoverySearch";
import RecentBookingActivity from "@/components/RecentBookingActivity";
import { DoctorCards } from "@/components/DirectoryPage";
import { HealthTopicIcon, healthTopics } from "@/components/HealthTopicIcon";
import SpecialtyIcon from "@/components/SpecialtyIcon";
import { specialties } from "@/lib/care-directory";
import { directoryProcedures, liveDoctors, popularProcedures } from "@/lib/directory";
import { buildPageSocialMetadata, productionOrigin } from "@/lib/metadata";

const title = "Find & Book Doctors in India | DOCVY";
const description = "Find doctors and clinics across India, explore specialties and procedures, and learn what to check before requesting an appointment through DOCVY.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  ...buildPageSocialMetadata(title, description, "/"),
};

const featuredSpecialties = specialties.filter(({ slug }) => slug !== "dentistry" && slug !== "mental-health");
const featuredGuides = healthTopics.filter(({ slug }) => ["high-blood-pressure", "diabetes", "joint-pain-arthritis", "kidney-stones"].includes(slug));
const quickActions = [
  { label: "Find a doctor", href: "/doctors", icon: CalendarCheck },
  { label: "Specialties", href: "/specialties", icon: Stethoscope },
  { label: "Plan surgery", href: "/surgery-guide", icon: ClipboardList },
  { label: "Health guides", href: "/care-guide", icon: BookOpen },
  { label: "For clinics", href: "/for-clinics", icon: Building2 },
];
const steps = [
  { icon: Search, title: "Find the right specialty", text: "Start with a symptom, doctor, specialty, or clinic. Use the guides if you’re unsure who to see." },
  { icon: ClipboardList, title: "Request a visit", text: "Where a clinic accepts DOCVY enquiries, send an appointment request from the doctor’s profile." },
  { icon: CalendarCheck, title: "Confirm with the clinic", text: "Check the time, location, and fee with the clinic before you travel." },
];

export default function Home() {
  return <div className="docvy-home">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": productionOrigin + "/#website",
      name: "DOCVY",
      url: productionOrigin + "/",
      inLanguage: "en-IN",
      publisher: { "@id": productionOrigin + "/#organization" },
      potentialAction: { "@type": "SearchAction", target: productionOrigin + "/doctors?q={search_term_string}", "query-input": "required name=search_term_string" },
    }).replace(/</g, "\\u003c") }} />

    <nav aria-label="Care shortcuts" className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-site overflow-x-auto px-3 sm:px-8">
        {quickActions.map(({ label, href, icon: Icon }) => <Link key={href} href={href} className="flex min-h-24 min-w-28 flex-1 shrink-0 flex-col items-center justify-center gap-2 px-3 text-center text-sm font-medium text-ink hover:bg-surface">
          <Icon size={23} strokeWidth={1.5} aria-hidden="true" />{label}
        </Link>)}
      </div>
    </nav>

    <section className="mx-auto max-w-site px-5 py-12 sm:px-8 md:py-20">
      <p className="mb-4 text-sm font-medium text-grey">Care starts with a question.</p>
      <h1 className="max-w-4xl">Find the right doctor and book with confidence.</h1>
      <p className="docvy-home-copy mt-5 text-grey">Explore specialties and procedures across India. Request an appointment where clinic intake is available.</p>
      <div className="mt-8 max-w-3xl"><DiscoverySearch /></div>
      <nav aria-label="Quick searches" className="mt-4 flex max-w-3xl flex-wrap items-center gap-x-5 gap-y-1 text-sm">
        <span className="text-grey">Explore topics</span>
        <Link href="/patient-guides/diabetes" className="inline-flex min-h-11 items-center text-primary underline-offset-4 hover:underline">Diabetes</Link>
        <Link href="/patient-guides/joint-pain-arthritis" className="inline-flex min-h-11 items-center text-primary underline-offset-4 hover:underline">Joint pain</Link>
        <Link href="/specialties/dermatology" className="inline-flex min-h-11 items-center text-primary underline-offset-4 hover:underline">Skin and hair</Link>
        <Link href="/patient-guides/high-blood-pressure" className="inline-flex min-h-11 items-center text-primary underline-offset-4 hover:underline">Blood pressure</Link>
      </nav>
      {process.env.VERCEL_ENV !== "production" && process.env.DOCVY_CRM_STAGING === "true" && <RecentBookingActivity />}
      <aside className="mt-6 flex max-w-3xl flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <p className="max-w-lg text-sm text-grey">For doctors and clinics. Help patients understand your practice and find their next step.</p>
        <Link href="/for-doctors" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary underline underline-offset-4">Explore DOCVY <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" /></Link>
      </aside>
    </section>

    <section className="docvy-home-section border-y border-line bg-surface" aria-labelledby="specialty-heading">
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="specialty-heading">Explore specialties</h2>
          <Link href="/specialties" className="docvy-pill">View all specialties <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" /></Link>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredSpecialties.map(({ slug, name, plain }) => <li key={slug}>
            <Link href={"/specialties/" + slug} className="docvy-glass block h-full p-5 hover:border-primary">
              <SpecialtyIcon slug={slug} />
              <h3 className="mt-4 text-lg font-medium">{name}</h3>
              <p className="docvy-home-copy mt-1 text-grey">{plain}</p>
            </Link>
          </li>)}
        </ul>
      </div>
    </section>

    <section className="docvy-home-section mx-auto max-w-site px-5 sm:px-8" aria-labelledby="booking-heading">
      <h2 id="booking-heading">How booking works</h2>
      <ol className="mt-6 grid gap-5 md:grid-cols-3">
        {steps.map(({ icon: Icon, title: stepTitle, text }, index) => <li key={stepTitle} className="docvy-glass p-5">
          <div className="flex items-center justify-between"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /><span className="text-sm text-grey">0{index + 1}</span></div>
          <h3 className="mt-4 text-xl font-medium">{stepTitle}</h3><p className="docvy-home-copy mt-2 text-grey">{text}</p>
        </li>)}
      </ol>
      {liveDoctors.length > 0 ? <DoctorCards doctors={liveDoctors.slice(0, 2)} /> :
        <p className="mt-5 text-grey">Live appointments are currently unavailable. <Link href="https://docvy-clinic-demo.vercel.app/book" className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4">Try the fictional booking demo.</Link></p>}
    </section>

    <section className="docvy-home-section border-y border-line bg-surface" aria-labelledby="procedure-heading">
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="procedure-heading">Popular procedures</h2>
          <Link href="/surgery-guide#procedures" className="docvy-pill">View all procedures <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" /></Link>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {directoryProcedures.filter(({ slug }) => popularProcedures.includes(slug)).map(({ slug, name }) => <li key={slug}>
            <Link className="docvy-glass flex min-h-12 items-center justify-between gap-2 p-4 font-medium text-primary hover:border-primary" href={"/surgeries/" + slug}>{name}<ArrowUpRight size={16} strokeWidth={1.5} className="shrink-0" aria-hidden="true" /></Link>
          </li>)}
        </ul>
      </div>
    </section>

    <section className="docvy-home-section mx-auto max-w-site px-5 sm:px-8" aria-labelledby="guide-heading">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="guide-heading">Health guides</h2>
        <Link href="/care-guide" className="docvy-pill">View all guides <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" /></Link>
      </div>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {featuredGuides.map(({ slug, label, description: detail }) => <li key={slug}>
          <Link href={"/patient-guides/" + slug} className="docvy-glass block h-full p-5 hover:border-primary">
            <HealthTopicIcon slug={slug} />
            <h3 className="mt-4 text-lg font-medium">{label}</h3>
            <p className="docvy-home-copy mt-1 text-grey">{detail}</p>
          </Link>
        </li>)}
      </ul>
    </section>
  </div>;
}
