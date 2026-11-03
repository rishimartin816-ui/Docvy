import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeHelp, Building2, CalendarClock, MapPin, Search, ShieldAlert, Stethoscope } from "lucide-react";
import DoctorDirectory from "@/components/DoctorDirectory";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { providerCandidates, providerCities } from "@/lib/provider-candidates";
import { isAppointmentIntakeConfigured } from "@/lib/appointment-intake";

export const metadata: Metadata = {
  title: "Doctors in Delhi NCR | Search by specialty and location",
  description: "Browse 12 source-linked doctor profiles across Delhi, Gurugram and Noida. Filter by specialty, hospital or locality; DOCVY credential review and appointment availability are pending.",
  alternates: { canonical: "/doctors" },
  ...buildPageSocialMetadata("Doctors in Delhi NCR | Search by specialty and location | DOCVY", "Browse 12 source-linked doctor profiles across Delhi, Gurugram and Noida. Filter by specialty, hospital or locality; DOCVY credential review and appointment availability are pending.", "/doctors"),
};

export default function DoctorsPage() {
  const cityPlacements = providerCandidates.reduce(
    (total, doctor) => total + new Set(doctor.locations.map((location) => location.city)).size,
    0,
  );
  const facilityLocations = providerCandidates.reduce((total, doctor) => total + doctor.locations.length, 0);
  const intakeEnabled = isAppointmentIntakeConfigured();
  return <div className="bg-[#F6FAF8] text-[#173A37]">
    <section className="bg-[radial-gradient(circle_at_78%_35%,#D5F0E8_0%,#EAF5F1_38%,#F4FAF7_100%)] px-6 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/75 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83]"><MapPin size={14} /> DOCTORS · DELHI NCR</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[56px]">Find doctors by specialty, city and hospital.</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#526D66] md:text-lg">Browse 12 doctor profiles sourced from official hospital listings. Filter Delhi, Gurugram or Noida by specialty, hospital or locality. {intakeEnabled ? "The enquiry form sends your details to DOCVY’s private intake; it does not automatically notify the provider." : "The appointment enquiry form is paused until DOCVY’s private intake is connected."}</p>
        <div className="mt-7 flex flex-wrap gap-2"><span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs font-bold text-[#087F83]"><Stethoscope size={14}/>{providerCandidates.length} unique profiles</span><span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs font-bold text-[#526D66]"><MapPin size={14}/>{cityPlacements} profile-city placements · {facilityLocations} facility locations</span><span className="inline-flex items-center gap-2 rounded-full bg-[#FFF9EE] px-4 py-2 text-xs font-bold text-[#80672E]"><BadgeHelp size={14}/>DOCVY review pending</span></div>
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Browse doctor listings by city">{providerCities.map((city) => <Link key={city} href={`/doctors/${city.toLocaleLowerCase()}`} className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/80 px-4 py-2 text-sm font-semibold text-[#36564F] transition hover:border-[#087F83] hover:text-[#087F83]"><MapPin size={14}/>{city} doctors <ArrowRight size={14}/></Link>)}</nav>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-6 py-10 md:py-14" aria-label="Doctor directory">
      <div className="mb-8 rounded-[24px] border border-[#DCEAE5] bg-white p-5 md:p-7">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end"><div><p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">HOW TO USE THESE RESULTS</p><h2 className="mt-2 text-2xl font-bold tracking-tight text-[#173A37]">Know what you are viewing and what to check next.</h2></div><p className="max-w-xl text-sm leading-6 text-[#526D66]">DOCVY is building directory coverage across India. These are the cities with source-linked profiles today; the list will grow as coverage grows.</p></div>
        <ol className="mt-6 grid gap-3 md:grid-cols-3">
          {[
            { icon: Search, title: "Find a profile", detail: "Filter by doctor name, specialty, city, hospital or listed locality. A match means a profile is listed; it does not confirm availability." },
            { icon: Building2, title: "See the listed hospital and location", detail: "Each profile shows a hospital and facility taken from a public hospital listing. A doctor may appear in more than one city when the source lists multiple locations." },
            { icon: CalendarClock, title: intakeEnabled ? "Send DOCVY an enquiry" : "Enquiry form currently paused", detail: intakeEnabled ? "Your details go to DOCVY’s private intake, not directly to the selected hospital. Contact the provider to confirm availability, time and fee; no slot is booked." : "The request form is not collecting details while the private intake connection is prepared. The selected hospital or clinic can confirm current availability directly." },
          ].map(({ icon: Icon, title, detail }, index) => <li key={title} className="relative overflow-hidden rounded-2xl bg-[#F8FBF9] p-5"><span aria-hidden="true" className="absolute -right-5 -top-5 h-24 w-24 rounded-full border-[14px] border-[#EAF5F1]"/><div className="relative"><div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#087F83]"><Icon size={19}/></span><span className="text-xs font-extrabold tracking-widest text-[#087F83]">0{index + 1}</span></div><h3 className="mt-4 font-bold text-[#173A37]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#526D66]">{detail}</p></div></li>)}
        </ol>
      </div>
      <div className="mb-6 flex gap-3 rounded-2xl border border-[#E7C99A] bg-[#FFF9EE] p-4 md:p-5"><ShieldAlert size={19} className="mt-0.5 shrink-0 text-[#A36A12]" /><p className="text-sm leading-6 text-[#6E5B39]">Source-listed profiles from Max Healthcare, Medanta and Fortis Healthcare. DOCVY has not independently verified credentials or checked appointment slots. A profile is not a provider confirmation; do not travel until the hospital confirms details.</p></div>
      <DoctorDirectory intakeEnabled={intakeEnabled} />
    </section>

    <section className="border-y border-[#DCEAE5] bg-white px-6 py-12 md:py-14"><div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">NEED HELP CHOOSING A SPECIALTY?</p><h2 className="mt-2 text-2xl font-bold">Start with the patient guide</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#526D66]">Search a common condition or concern to understand which specialties are commonly associated with it. The guide is informational and does not diagnose.</p></div><Link href="/care-guide" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white hover:bg-[#066D70]">Browse conditions and specialties <ArrowRight size={16} /></Link></div></section>
  </div>;
}
