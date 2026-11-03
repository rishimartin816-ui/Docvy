import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeHelp, Building2, CalendarClock, MapPin, Search, ShieldAlert, Stethoscope } from "lucide-react";
import DoctorDirectory from "@/components/DoctorDirectory";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { providerCandidates, providerCities, providerCityListLabel } from "@/lib/provider-candidates";
import { isAppointmentIntakeConfigured } from "@/lib/appointment-intake";

const directoryDescription = `Find doctor profiles by specialty, city and hospital on DOCVY. Current source-linked listings cover ${providerCityListLabel}; appointment availability must be confirmed with the provider.`;

export const metadata: Metadata = {
  title: "Find doctors in India | Browse by specialty and city",
  description: directoryDescription,
  alternates: { canonical: "/doctors" },
  ...buildPageSocialMetadata("Find doctors in India by specialty and city | DOCVY", directoryDescription, "/doctors"),
};

export default function DoctorsPage() {
  const facilityLocations = providerCandidates.reduce((total, doctor) => total + doctor.locations.length, 0);
  const intakeEnabled = isAppointmentIntakeConfigured();
  return <div className="bg-[#F6FAF8] text-[#173A37]">
    <section className="overflow-hidden bg-[radial-gradient(circle_at_78%_35%,#D5F0E8_0%,#EAF5F1_38%,#F4FAF7_100%)] px-6 py-10 md:py-14">
      <div className="mx-auto grid max-w-6xl items-center gap-9 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/80 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83]"><MapPin size={14} /> DOCTOR DISCOVERY · INDIA</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[54px]">Find a doctor by specialty, city or hospital.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#526D66] md:text-lg">Start with a specialty or a doctor’s name, then compare the hospital and listed location. DOCVY is being built for discovery across India; source-linked profiles currently cover {providerCityListLabel}.</p>
          <div className="mt-6 flex flex-wrap gap-2"><span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#087F83]"><Stethoscope size={14}/>{providerCandidates.length} source-linked profiles</span><span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#526D66]"><Building2 size={14}/>{facilityLocations} listed facility locations</span><span className="inline-flex items-center gap-2 rounded-full bg-[#FFF9EE] px-4 py-2 text-xs font-bold text-[#80672E]"><BadgeHelp size={14}/>Credentials and slots need confirmation</span></div>
          <nav className="mt-6 flex flex-wrap gap-2" aria-label="Browse doctor listings by city">{providerCities.map((city) => <Link key={city} href={`/doctors/${city.toLocaleLowerCase()}`} className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/85 px-4 py-2 text-sm font-semibold text-[#36564F] transition hover:border-[#087F83] hover:text-[#087F83]"><MapPin size={14}/>{city} doctors <ArrowRight size={14}/></Link>)}</nav>
        </div>
        <figure className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <div className="absolute -right-5 -top-4 h-32 w-32 rounded-full bg-[#B8E1D5]/75 blur-2xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[30px] border border-white/80 bg-[#E7F3ED] shadow-[0_24px_70px_rgba(23,58,55,0.16)]">
            <Image src="/images/docvy-doctor-discovery.png" alt="Illustration of a patient and care navigator exploring doctor listings by specialty and location" width={1536} height={1024} priority sizes="(max-width: 1024px) 100vw, 48vw" className="h-auto w-full" />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-4 py-2 text-xs font-bold text-[#36564F] shadow-lg"><Search size={14} className="text-[#087F83]"/>Search listings, then check the source</span>
          </div>
          <figcaption className="mt-2 text-right text-[11px] text-[#789089]">Decorative illustration · profile information comes from linked public hospital sources</figcaption>
        </figure>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-6 py-10 md:py-14" aria-label="Doctor directory">
      <div className="mb-8 rounded-[24px] border border-[#DCEAE5] bg-white p-5 md:p-7">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end"><div><p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">HOW TO USE THESE RESULTS</p><h2 className="mt-2 text-2xl font-bold tracking-tight text-[#173A37]">Know what you are viewing and what to check next.</h2></div><p className="max-w-xl text-sm leading-6 text-[#526D66]">DOCVY is built for discovery across India. These are the cities with source-linked profiles today. Other city listings are planned when enough useful coverage is ready; no expansion date has been announced.</p></div>
        <ol className="mt-6 grid gap-3 md:grid-cols-3">
          {[
            { icon: Search, title: "Find a profile", detail: "Filter by doctor name, specialty, city, hospital or listed locality. A match means a profile is listed; it does not confirm availability." },
            { icon: Building2, title: "See the listed hospital and location", detail: "Each profile shows a hospital and facility taken from a public hospital listing. A doctor may appear in more than one city when the source lists multiple locations." },
            { icon: CalendarClock, title: intakeEnabled ? "Request an appointment" : "Appointment requests paused", detail: intakeEnabled ? "No suitable slot is needed to send a request. Your details go to DOCVY’s private intake; the provider must confirm the doctor, time and fee." : "The request form is not collecting details until the private Sheet connection is active. Contact the hospital directly to confirm current availability." },
          ].map(({ icon: Icon, title, detail }, index) => <li key={title} className="relative overflow-hidden rounded-2xl bg-[#F8FBF9] p-5"><span aria-hidden="true" className="absolute -right-5 -top-5 h-24 w-24 rounded-full border-[14px] border-[#EAF5F1]"/><div className="relative"><div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#087F83]"><Icon size={19}/></span><span className="text-xs font-extrabold tracking-widest text-[#087F83]">0{index + 1}</span></div><h3 className="mt-4 font-bold text-[#173A37]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#526D66]">{detail}</p></div></li>)}
        </ol>
      </div>
      <div className="mb-6 flex gap-3 rounded-2xl border border-[#E7C99A] bg-[#FFF9EE] p-4 md:p-5"><ShieldAlert size={19} className="mt-0.5 shrink-0 text-[#A36A12]" /><p className="text-sm leading-6 text-[#6E5B39]">Source-listed profiles from Max Healthcare, Medanta and Fortis Healthcare. DOCVY has not independently verified credentials or checked appointment slots. A profile is not a provider confirmation; do not travel until the hospital confirms details.</p></div>
      <DoctorDirectory intakeEnabled={intakeEnabled} />
    </section>

    <section className="border-y border-[#DCEAE5] bg-white px-6 py-12 md:py-14"><div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">NEED HELP CHOOSING A SPECIALTY?</p><h2 className="mt-2 text-2xl font-bold">Start with the patient guide</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#526D66]">Search a common condition or concern to understand which specialties are commonly associated with it. The guide is informational and does not diagnose.</p></div><Link href="/care-guide" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white hover:bg-[#066D70]">Browse conditions and specialties <ArrowRight size={16} /></Link></div></section>
  </div>;
}
