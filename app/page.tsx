import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Baby, Bone, Building2, CheckCircle2, HeartPulse, MapPin, Search, Sparkles, Stethoscope } from "lucide-react";
import PatientSearchCard from "@/components/PatientSearchCard";
import PatientJourneyMap from "@/components/PatientJourneyMap";
import ProviderSourceGuide from "@/components/ProviderSourceGuide";
import { isAppointmentIntakeConfigured } from "@/lib/appointment-intake";
import { docvyOpenGraphImage } from "@/lib/metadata";
import { providerCandidates, providerCities } from "@/lib/provider-candidates";

export const metadata: Metadata = {
  title: "Patient guide and doctor directory across India | DOCVY",
  description: "Search a health concern or specialty with DOCVY’s patient guide across India. Browse a limited set of hospital-source doctor profiles in Delhi, Gurugram (Gurgaon) and Noida.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_IN", siteName: "DOCVY", title: "Patient guide and doctor directory across India | DOCVY", description: "Search a health concern or specialty with DOCVY’s patient guide across India. Browse a limited set of hospital-source doctor profiles in Delhi, Gurugram (Gurgaon) and Noida.", url: "/", images: [docvyOpenGraphImage] },
  twitter: { card: "summary_large_image", title: "Patient guide and doctor directory across India | DOCVY", description: "Explore a patient guide across India and current hospital-source doctor profiles in Delhi, Gurugram (Gurgaon) and Noida.", images: ["/opengraph-image"] },
};

const guideExamples = [
  { concern: "Diabetes or thyroid concerns", query: "diabetes", specialty: "Diabetology / endocrinology", icon: HeartPulse },
  { concern: "Skin, hair or nail concerns", query: "skin rash", specialty: "Dermatology", icon: Sparkles },
  { concern: "Pregnancy or menstrual health", query: "pregnancy", specialty: "Obstetrics and gynaecology", icon: Baby },
  { concern: "Bones, joints or injuries", query: "joint pain", specialty: "Orthopaedics", icon: Bone },
];

const providerAreas = [
  { title: "Doctor profiles", text: "Profiles are planned to explain a doctor's specialty, credentials review status, and care locations." },
  { title: "Clinic coordination", text: "Clinic tools are planned for provider information and appointment enquiries across practice locations." },
  { title: "Hospital operations", text: "Hospital teams are planned to coordinate departments, listed doctors, and incoming appointment requests." },
];

const currentCityCoverage = providerCities.map((city) => {
  const profiles = providerCandidates.filter((doctor) =>
    doctor.locations.some((location) => location.city === city),
  );
  const facilityLocations = profiles.flatMap((doctor) =>
    doctor.locations.filter((location) => location.city === city),
  );

  return {
    city,
    profileCount: profiles.length,
    locationCount: facilityLocations.length,
    href: `/doctors/${city.toLocaleLowerCase()}`,
  };
});

export default function Home() {
  const intakeEnabled = isAppointmentIntakeConfigured();
  return <div className="overflow-hidden bg-[#F6FAF8] text-[#173A37]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://www.docvy.in/#website",
      name: "DOCVY",
      url: "https://www.docvy.in/",
      publisher: { "@id": "https://www.docvy.in/#organization" },
    }).replace(/</g, "\\u003c") }} />
    <section className="relative isolate overflow-hidden bg-[linear-gradient(118deg,#F5FAF7_0%,#EAF5F1_58%,#DFF1EB_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#DDF0E9]/80 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[8%] top-12 h-56 w-56 rounded-full border border-white/70" />
      <div className="relative mx-auto grid min-h-[620px] max-w-[1440px] items-center gap-10 px-6 pb-10 pt-12 md:px-10 lg:grid-cols-[.92fr_1.08fr] lg:px-[64px] lg:py-12 xl:px-[72px]">
        <div className="relative z-10 max-w-[620px]">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/80 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83]"><span className="h-2 w-2 rounded-full bg-[#F39B72]" />CARE, CONNECTED</p>
          <h1 className="max-w-[680px] text-[42px] font-black leading-[1.04] tracking-[-0.052em] text-[#173A37] sm:text-[54px] lg:text-[58px] xl:text-[62px]">Find your way to care <span className="text-[#087F83]">across India.</span></h1>
          <p className="mt-7 max-w-[590px] text-base leading-8 text-[#526D66] md:text-[17px]">Start with a health concern or specialty anywhere in India. Read a plain-language guide, then browse source-linked doctor profiles currently listed in Delhi NCR. The guide is nationwide; the doctor directory is still growing.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/care-guide" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#087F83] px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(8,127,131,0.2)] transition hover:-translate-y-0.5 hover:bg-[#066D70]">Explore the patient guide <ArrowRight size={17} /></Link><Link href="/doctors" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#B7D2C9] bg-white/85 px-6 text-sm font-bold text-[#173A37] transition hover:-translate-y-0.5 hover:bg-white">Browse current doctors</Link></div>
          <p className="mt-5 inline-flex max-w-[520px] items-start gap-2 rounded-2xl border border-white/80 bg-white/65 px-3 py-2.5 text-xs leading-5 text-[#526D66]"><MapPin size={15} className="mt-0.5 shrink-0 text-[#087F83]" /><span>Doctor profiles are currently listed in Delhi, Gurugram and Noida. Contact the hospital directly to confirm appointments.</span></p>
        </div>
        <div className="relative mx-auto hidden w-full max-w-[600px] lg:block">
          <div aria-hidden="true" className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#F39B72]/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[30px] border border-white/80 bg-[#EAF5F1] shadow-[0_28px_70px_rgba(23,58,55,0.16)]">
            <Image src="/images/docvy-homepage-care-team.png" alt="Illustrative scene of a clinician speaking with a patient in a bright care setting." width={800} height={600} priority sizes="(min-width: 1280px) 42vw, 48vw" className="aspect-[4/3] h-auto w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 left-5 hidden items-center gap-3 rounded-2xl border border-[#DCEAE5] bg-white px-4 py-3 shadow-[0_14px_34px_rgba(23,58,55,0.12)] xl:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E3F3ED] text-[#087F83]"><CheckCircle2 size={20} aria-hidden="true" /></span>
            <span><span className="block text-sm font-bold text-[#173A37]">Clear next steps</span><span className="mt-0.5 block text-xs text-[#526D66]">Guide · directory · contact provider</span></span>
          </div>
        </div>
      </div>
      <div className="relative z-20 mx-auto w-full max-w-[620px] px-6 pb-12 md:px-10 lg:absolute lg:bottom-8 lg:right-8 lg:mx-0 lg:w-[460px] lg:px-0 lg:pb-0 xl:bottom-10 xl:right-[72px] xl:w-[560px]">
        <PatientSearchCard />
      </div>
    </section>

    <section className="border-b border-[#E4EEE9] bg-white px-6 py-14 md:py-16">
      <div className="mx-auto max-w-[1296px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-extrabold tracking-[0.15em] text-[#087F83]">CHOOSE YOUR STARTING POINT</p><h2 className="mt-2 text-2xl font-bold tracking-tight text-[#173A37] md:text-3xl">What brought you to DOCVY?</h2></div>
          <p className="max-w-md text-sm leading-6 text-[#526D66]">Choose the path that fits. You can read the guide or browse current doctor listings without creating an account.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { href: "/care-guide", icon: Search, eyebrow: "PATIENT GUIDE", title: "I have a health concern", text: "Read a plain-language overview of common searches and the specialties often associated with them. It is a place to start, not a diagnosis.", accent: "bg-[#17C8E5]" },
            { href: "/doctors", icon: Stethoscope, eyebrow: "DOCTOR DIRECTORY", title: "I know which specialist I need", text: "Explore current hospital-source profiles by specialty, city or facility. Confirm a doctor's latest location and appointment availability with the hospital.", accent: "bg-[#087F83]" },
            { href: "/doctors", icon: MapPin, eyebrow: "CURRENT NCR LISTINGS", title: "I want doctors near a place", text: "Browse current profiles in Delhi, Gurugram and Noida. The guide is for India; the doctor directory is a limited NCR collection, not a national list.", accent: "bg-[#F39B72]" },
            { href: "/pricing", icon: Building2, eyebrow: "FOR CARE TEAMS", title: "I work with a clinic or hospital", text: "See the tools DOCVY is planning for care teams and contact us about your organisation. Online checkout and provider dashboards are not available yet.", accent: "bg-[#13BFA5]" },
          ].map(({ href, icon: Icon, eyebrow, title, text, accent }) => <Link key={title} href={href} className="group relative flex min-h-[238px] flex-col overflow-hidden rounded-2xl border border-[#DCEAE5] bg-[#FCFDFC] p-5 pt-7 transition duration-200 hover:-translate-y-1 hover:border-[#B8DCD0] hover:bg-white hover:shadow-[0_18px_38px_rgba(23,58,55,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F83] focus-visible:ring-offset-2 sm:p-6 sm:pt-8"><span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 ${accent}`} /><span className="flex items-start justify-between gap-3"><span className="text-[10px] font-extrabold tracking-[0.14em] text-[#789089]">{eyebrow}</span><span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#EAF5F1] text-[#087F83] transition group-hover:scale-105"><Icon size={20} /></span></span><span className="mt-5 text-base font-bold leading-6 text-[#173A37]">{title}</span><span className="mt-2 text-sm leading-6 text-[#526D66]">{text}</span><span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-bold text-[#087F83]">Explore this path <ArrowRight size={15} aria-hidden="true" className="transition group-hover:translate-x-1" /></span></Link>)}
        </div>
      </div>
    </section>
    <section className="border-b border-[#DCEAE5] bg-[#F8FBF9] px-6 py-14 md:py-16" aria-labelledby="city-coverage-heading"><div className="mx-auto max-w-[1296px]"><div className="flex flex-wrap items-end justify-between gap-4"><div className="max-w-3xl"><p className="text-xs font-extrabold tracking-[0.15em] text-[#087F83]">CURRENT CITY COVERAGE</p><h2 id="city-coverage-heading" className="mt-2 text-2xl font-bold tracking-tight text-[#173A37] md:text-3xl">Browse doctor listings by city</h2><p className="mt-3 text-sm leading-7 text-[#526D66]">The patient guide is available across India. Current hospital-source doctor profiles are listed in Delhi, Gurugram and Noida. This is a limited directory, not a complete list of doctors in these cities; check the linked hospital profile for the latest details and appointments.</p></div><Link href="/doctors" className="inline-flex min-h-10 shrink-0 items-center gap-2 text-sm font-bold text-[#087F83] hover:text-[#066D70]">View all current listings <ArrowRight size={16} /></Link></div><div className="mt-7 grid gap-4 md:grid-cols-3">{currentCityCoverage.map(({ city, profileCount, locationCount, href }) => <Link key={city} href={href} className="group relative flex min-h-[190px] flex-col overflow-hidden rounded-2xl border border-[#DCEAE5] bg-white p-5 shadow-[0_8px_26px_rgba(23,58,55,0.04)] transition hover:-translate-y-1 hover:border-[#B8DCD0] hover:shadow-[0_16px_36px_rgba(23,58,55,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F83] focus-visible:ring-offset-2"><span aria-hidden="true" className="absolute -right-7 -top-8 h-28 w-28 rounded-full bg-[#EAF5F1] transition group-hover:scale-110"/><span className="relative flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E3F3ED] text-[#087F83]"><MapPin size={20} /></span><ArrowRight size={18} aria-hidden="true" className="text-[#087F83] transition group-hover:translate-x-1" /></span><span className="relative mt-5 text-lg font-bold text-[#173A37]">{city}{city === "Gurugram" ? " (Gurgaon)" : ""}</span><span className="relative mt-1 text-sm font-semibold text-[#087F83]">{profileCount} source-linked {profileCount === 1 ? "profile" : "profiles"}</span><span className="relative mt-2 text-xs leading-5 text-[#526D66]">{locationCount} hospital-listed {locationCount === 1 ? "location" : "locations"} · browse by specialty and facility</span></Link>)}</div><p className="mt-4 text-xs leading-5 text-[#789089]">Across these city pages: {providerCandidates.length} unique doctor profiles and {providerCandidates.reduce((total, doctor) => total + doctor.locations.length, 0)} source-listed facility locations. A profile can appear in more than one city or at more than one facility.</p></div></section>

    <section id="patient-journey" className="bg-[#F6FAF8] py-16 md:py-20"><div className="mx-auto max-w-[1440px] px-6 lg:px-[72px]"><p className="text-xs font-bold tracking-[0.15em] text-[#087F83]">YOUR NEXT STEPS, MADE CLEAR</p><h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-[-0.035em] md:text-[38px]">Know where you are—and what you can do next.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-[#526D66]">If you arrived with a question about a condition, start with the guide. If you already know the specialty, open the directory. If you are outside the cities listed today, the guide is still available across India. Additional city listings are planned when source-linked coverage is useful; no rollout date has been announced.</p><div className="mt-9"><PatientJourneyMap intakeEnabled={intakeEnabled} /></div></div></section>

    <section className="border-y border-[#DCEAE5] bg-white py-16 md:py-20"><div className="mx-auto grid max-w-[1440px] gap-8 px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-[72px]"><div><p className="text-xs font-bold tracking-[0.15em] text-[#087F83]">COMMON SEARCH STARTS</p><h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] md:text-[36px]">Not sure which specialty to choose?</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[#526D66]">Choose a common search to open the patient guide with that topic ready. It will show specialties commonly associated with the words you entered. This is a directory starting point, not a diagnosis or personal medical recommendation.</p><Link href="/care-guide" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white hover:bg-[#066D70]">Open the care guide <ArrowRight size={16} /></Link></div><div className="grid gap-3 sm:grid-cols-2">{guideExamples.map(({ concern, query, specialty, icon: Icon }) => <Link key={concern} href={`/care-guide?q=${encodeURIComponent(query)}`} className="group rounded-2xl border border-[#DCEAE5] bg-[#F8FBF9] p-5 transition hover:-translate-y-0.5 hover:border-[#B8DCD0] hover:bg-white hover:shadow-[0_14px_34px_rgba(23,58,55,0.08)]"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E3F3ED] text-[#087F83]"><Icon size={19} /></span><p className="text-xs font-bold uppercase tracking-wide text-[#789089]">A common search</p></div><ArrowRight size={16} aria-hidden="true" className="text-[#087F83] transition group-hover:translate-x-1" /></div><h3 className="mt-3 font-bold">{concern}</h3><p className="mt-2 text-sm leading-6 text-[#526D66]">Commonly associated with: <span className="font-semibold text-[#087F83]">{specialty}</span></p><span className="mt-4 inline-flex text-xs font-bold text-[#087F83]">Explore this topic</span></Link>)}</div></div></section>

    <ProviderSourceGuide />

    <section className="bg-[#123B38] py-16 text-white md:py-20"><div className="mx-auto grid max-w-[1440px] gap-8 px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-[72px]"><div><p className="text-xs font-bold tracking-[0.15em] text-[#79BDB1]">FOR CARE TEAMS</p><h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.035em] text-white md:text-[38px]">One connected system for patients and providers.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-[#D8E9E3]">DOCVY is also building practical tools for doctors, clinics and hospitals. Provider profiles and appointment enquiries are intended to connect with the teams who deliver care.</p><Link href="/pricing" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#4D756F] px-5 text-sm font-semibold text-white hover:bg-white/10">Clinic &amp; hospital plans <ArrowRight size={16} /></Link></div><div className="grid gap-3 sm:grid-cols-3">{providerAreas.map((card, index) => <article key={card.title} className="flex min-h-[230px] flex-col rounded-2xl border border-[#315B55] bg-[#1C4D47] p-5"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-[#79BDB1]">0{index + 1}</span><CheckCircle2 size={17} className="text-[#79BDB1]" /></div><h3 className="mt-8 text-sm font-bold leading-6 text-white">{card.title}</h3><p className="mt-3 text-xs leading-6 text-[#D8E9E3]">{card.text}</p><span className="mt-auto pt-5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#79BDB1]">In development</span></article>)}</div></div></section>

  </div>;
}
