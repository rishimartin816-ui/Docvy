import type { Metadata } from "next";
import Link from "next/link";
import { Activity, AlertTriangle, ArrowRight, BookOpenCheck, Building2, CalendarClock, Eye, HeartPulse, MapPin, Search, ShieldCheck, Stethoscope, Wind } from "lucide-react";
import CareGuideSearch from "@/components/CareGuideSearch";
import { isAppointmentIntakeConfigured } from "@/lib/appointment-intake";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { patientTopicGuides } from "@/lib/patient-topic-guides";
import { providerCityListLabel, providerProfileCount } from "@/lib/provider-candidates";

const topicIcons = [HeartPulse, Activity, Stethoscope, Activity, Eye, Wind];

export const metadata: Metadata = {
  title: "What kind of doctor should I see? | Patient guide",
  description: "Search a health condition, symptom or specialty to explore doctor types commonly associated with that topic. A plain-language guide for India; not a diagnosis or medical advice.",
  alternates: { canonical: "/care-guide" },
  ...buildPageSocialMetadata("What kind of doctor should I see? | Patient guide | DOCVY", "Search a health condition, symptom or specialty to explore doctor types commonly associated with that topic. A plain-language guide for India; not a diagnosis or medical advice.", "/care-guide"),
};

export default function CareGuidePage() {
  const intakeEnabled = isAppointmentIntakeConfigured();
  return <div className="bg-[#F6FAF8] text-[#173A37]">
    <section className="bg-[radial-gradient(circle_at_78%_35%,#D5F0E8_0%,#EAF5F1_38%,#F4FAF7_100%)] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/75 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83]"><MapPin size={14} /> PATIENT GUIDE · INDIA</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[56px]">What kind of doctor should I see?</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#526D66] md:text-lg">Search a common condition, symptom or doctor type. The guide explains which specialties are commonly associated with that topic and helps you find a starting point. It cannot diagnose a condition or decide which care is right for you.</p>
        <div className="mt-7 max-w-5xl rounded-2xl border border-[#DCEAE5] bg-white/80 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-[10px] font-extrabold tracking-[0.14em] text-[#087F83]">YOUR PLACE IN THE JOURNEY</p><span className="rounded-full bg-[#DDF0E9] px-3 py-1 text-[10px] font-extrabold tracking-wide text-[#087F83]">YOU ARE HERE · PATIENT GUIDE</span></div>
          <ol className="mt-4 grid gap-3 md:grid-cols-4">
            {[
              { title: "A question or concern", detail: "What you searched", icon: Search, current: false },
              { title: "Understand a specialty", detail: "This guide helps orient you", icon: BookOpenCheck, current: true },
              { title: "Browse current doctors", detail: providerCityListLabel, icon: Stethoscope, current: false },
              { title: intakeEnabled ? "Send an enquiry to DOCVY" : "Contact the provider directly", detail: intakeEnabled ? "DOCVY intake is open" : "Form currently paused", icon: CalendarClock, current: false },
            ].map(({ title, detail, icon: Icon, current }, index) => <li key={title} className={`relative flex min-h-[90px] gap-3 rounded-xl p-3 ${current ? "bg-[#EAF5F1] ring-1 ring-[#B8DCD0]" : "bg-[#F8FBF9]"}`}>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${current ? "bg-[#087F83] text-white" : "bg-white text-[#087F83]"}`}><Icon size={17} aria-hidden="true" /></span>
              <span><span className="block text-[10px] font-extrabold tracking-[0.1em] text-[#789089]">STEP 0{index + 1}</span><span className="mt-1 block text-xs font-bold leading-5 text-[#173A37]">{title}</span><span className="mt-0.5 block text-[11px] leading-4 text-[#526D66]">{detail}</span></span>
            </li>)}
          </ol>
        </div>
        <CareGuideSearch />
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-6 py-10 md:py-14" aria-labelledby="popular-patient-questions">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-xs font-extrabold tracking-[0.13em] text-[#087F83]">POPULAR PATIENT QUESTIONS</p><h2 id="popular-patient-questions" className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">Start with a clear answer</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-[#526D66]">Each guide explains broad doctor specialties, shows current directory coverage and links to its sources. It does not diagnose or recommend a personal clinician.</p></div>
        <Link href="/doctors" className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#087F83] underline decoration-[#B8DCD0] underline-offset-4">Current doctor listings <ArrowRight size={15} aria-hidden="true" /></Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{patientTopicGuides.map((guide, index) => { const Icon = topicIcons[index] ?? Stethoscope; return <Link key={guide.slug} href={`/patient-guides/${guide.slug}`} className="group flex min-h-36 gap-4 rounded-2xl border border-[#DCEAE5] bg-white p-5 shadow-[0_6px_24px_rgba(23,58,55,0.025)] transition hover:-translate-y-0.5 hover:border-[#B8DCD0] hover:shadow-[0_16px_36px_rgba(23,58,55,0.08)]"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F1] text-[#087F83]"><Icon size={20} aria-hidden="true" /></span><span><span className="block font-bold text-[#173A37] group-hover:text-[#087F83]">{guide.topic}</span><span className="mt-2 block text-sm leading-6 text-[#526D66]">{guide.title}</span><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#087F83]">Read the guide <ArrowRight size={13} aria-hidden="true" /></span></span></Link>; })}</div>
    </section>

    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="flex gap-4 rounded-2xl border border-[#E7C99A] bg-[#FFF9EE] p-5 md:p-6"><AlertTriangle className="mt-0.5 shrink-0 text-[#A36A12]" size={22} /><div><h2 className="font-bold text-[#5D461D]">This guide is for orientation, not diagnosis</h2><p className="mt-2 text-sm leading-6 text-[#6E5B39]">The examples are broad and may not fit your situation. The same symptom can have different causes; age, medical history, severity, and examination matter. A qualified clinician can assess your situation and recommend the next step. Do not delay urgent care while using an online guide.</p></div></div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-2xl border border-[#DCEAE5] bg-white p-6 md:p-7"><p className="text-xs font-extrabold tracking-[0.13em] text-[#087F83]">IF YOU ARE UNSURE</p><h2 className="mt-3 text-xl font-bold">A general physician can be a useful starting point</h2><p className="mt-3 text-sm leading-7 text-[#526D66]">For a new concern, several symptoms, or a condition you cannot place in a specialty, start by speaking with a general physician or internal-medicine doctor. They can assess your health and tell you if a specialist may be appropriate.</p></article>
        <article className="rounded-2xl border border-[#F2D5A9] bg-[#FFF9EE] p-6 md:p-7"><p className="text-xs font-extrabold tracking-[0.13em] text-[#A36A12]">URGENT HELP</p><h2 className="mt-3 text-xl font-bold text-[#5D461D]">Emergencies need immediate help</h2><p className="mt-3 text-sm leading-7 text-[#6E5B39]">If someone is unconscious, struggling to breathe, has severe chest pain, uncontrolled bleeding, or another life-threatening emergency, call <a className="font-bold underline underline-offset-4" href="tel:112">112 in India</a> or go to the nearest emergency department. Do not wait for a directory listing or online reply.</p></article>
      </div>
    </section>

    <section className="border-y border-[#DCEAE5] bg-white px-6 py-12 md:py-16"><div className="mx-auto max-w-6xl">
      <p className="text-xs font-extrabold tracking-[0.13em] text-[#087F83]">WHAT YOU CAN DO ON THIS SITE TODAY</p><h2 className="mt-3 max-w-3xl text-2xl font-bold tracking-tight md:text-3xl">A clear route from your question to your next check.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#526D66]">DOCVY helps you understand the directory and find source-linked information. It does not make the medical decision for you or contact a provider on your behalf.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[
        { icon: Search, title: "1. Search in your own words", description: "Enter a concern such as diabetes, a symptom such as joint pain, or a specialty you already know. Try a broader word if the guide has no exact match." },
        { icon: BookOpenCheck, title: "2. Read the specialty overview", description: "The guide describes what a specialty commonly covers and examples people may search. Similar concerns can have different causes, so this is orientation only." },
        { icon: MapPin, title: "3. See if a city is covered", description: `Current doctor profiles are in ${providerCityListLabel}. The guide works across India; other city listings are planned when enough useful, source-linked profiles are ready. No rollout date has been announced.` },
        { icon: CalendarClock, title: intakeEnabled ? "4. Send DOCVY an enquiry" : "4. Contact the provider directly", description: intakeEnabled ? "The open form records an enquiry in DOCVY’s private intake. It does not automatically contact the provider; confirm location, time and fee directly with the hospital or clinic." : "The DOCVY enquiry form is closed and does not collect details. Contact the hospital or clinic through its official source profile to confirm availability, time and fee." },
      ].map(({ icon: Icon, title, description }) => <article key={title} className="relative overflow-hidden rounded-2xl border border-[#DCEAE5] bg-[#F8FBF9] p-5"><span aria-hidden="true" className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#EAF5F1]" /><div className="relative"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#087F83] shadow-sm"><Icon size={20} /></span><h3 className="mt-4 font-bold text-[#173A37]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#526D66]">{description}</p></div></article>)}</div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <article className="flex gap-4 rounded-2xl border border-[#DCEAE5] bg-white p-5 md:p-6"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F1] text-[#087F83]"><Building2 size={21} /></span><div><h3 className="font-bold">Where doctor profile details come from</h3><p className="mt-2 text-sm leading-6 text-[#526D66]">The directory links to public doctor profile pages on hospital websites. DOCVY has not independently confirmed the doctors’ credentials, current workplaces or availability. The linked hospital page is the place to check the latest details.</p></div></article>
        <article className="flex gap-4 rounded-2xl border border-[#DCEAE5] bg-white p-5 md:p-6"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF9EE] text-[#A36A12]"><ShieldCheck size={21} /></span><div><h3 className="font-bold">What happens after you choose a doctor?</h3><p className="mt-2 text-sm leading-6 text-[#526D66]">{intakeEnabled ? "If you submit the open enquiry form, DOCVY records it in its private intake. It is not automatically sent to the provider and no slot is reserved. Contact the hospital or clinic directly to confirm." : "Today, you leave DOCVY through the source link and contact the hospital or clinic directly. The enquiry form is not collecting details, and DOCVY does not reserve a slot or send a confirmation."}</p></div></article>
      </div>
      <div className="mt-8 rounded-2xl bg-[#123B38] p-6 text-white md:flex md:items-center md:justify-between md:gap-6"><div><p className="text-xs font-extrabold tracking-[0.13em] text-[#79BDB1]">AVAILABLE NOW</p><h2 className="mt-2 text-xl font-bold text-white">Guide nationwide. Doctor listings in Delhi NCR.</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-[#D8E9E3]">Use this informational guide from anywhere in India. Browse {providerProfileCount} source-linked doctor profiles across {providerCityListLabel}. DOCVY credential review is pending; {intakeEnabled ? "enquiries go to DOCVY, not directly to providers, and no booking is confirmed." : "the enquiry form is closed and booking is not live."}</p></div><Link href="/doctors" className="mt-5 inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#123B38] hover:bg-[#EAF5F1] md:mt-0">Browse current listings <ArrowRight size={16} /></Link></div>
    </div></section>

    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16"><h2 className="text-2xl font-bold">How this guide was prepared</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#526D66]">Search terms connect common concerns to broad directory specialties using the sources shown on matching cards. Condition-specific guides use Government of India material and examples from named public hospitals. A few general background links are from Healthdirect, an Australian health-information service; they explain broad terms only and do not set Indian referral rules. Local services and care routes vary. Use DOCVY to understand the directory, not for diagnosis or a personal doctor recommendation.</p><ul className="mt-4 flex flex-col gap-2 text-sm text-[#087F83] sm:flex-row sm:flex-wrap sm:gap-5"><li><a className="underline underline-offset-4" href="https://www.healthdirect.gov.au/healthcare-and-services/roles-and-specialties/the-role-of-a-gp" target="_blank" rel="noreferrer">Healthdirect (Australia): the role of a GP</a></li><li><a className="underline underline-offset-4" href="https://www.healthdirect.gov.au/healthcare-and-services/general-health/what-is-a-referral" target="_blank" rel="noreferrer">Healthdirect (Australia): specialist referrals</a></li><li><a className="underline underline-offset-4" href="https://112.gov.in/" target="_blank" rel="noreferrer">Government of India: emergency number 112</a></li></ul></section>
  </div>;
}
