import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, CalendarClock, MapPin, ShieldAlert, Stethoscope } from "lucide-react";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { providerCityListLabel, providerProfileCount } from "@/lib/provider-candidates";
import { isAppointmentIntakeConfigured } from "@/lib/appointment-intake";

const providerPageDescription = `Correct a DOCVY doctor profile. Current listings: ${providerCityListLabel}. Credentials and appointment availability are not verified by DOCVY.`;

export const metadata: Metadata = {
  title: "Doctor profile correction and listing support",
  description: providerPageDescription,
  alternates: { canonical: "/for-doctors" },
  ...buildPageSocialMetadata("Doctor profile correction and listing support | DOCVY", providerPageDescription, "/for-doctors"),
};

const reviewSteps = [
  { icon: Stethoscope, title: "Send the public profile link", text: "Email the official hospital or clinic profile URL, the doctor's name and city, and the exact detail to correct. Do not include patient information, identity documents or registration certificates." },
  { icon: BadgeCheck, title: "The DOCVY owner checks it", text: "The DOCVY owner reviews the request against public professional sources. A hospital listing or submitted link alone does not confirm credentials or make a profile verified." },
  { icon: MapPin, title: "Changes need owner approval", text: "There is no self-service claim or edit portal. A correction is published only after the DOCVY owner approves it; a request does not instantly change a listing or confirm appointment availability." },
];

const answers = [
  ["Is the DOCVY doctor directory live across India?", `DOCVY is being built for discovery across India. The current ${providerProfileCount} source-linked profiles are grouped under ${providerCityListLabel}. Additional city listings are planned when enough useful, source-linked provider coverage is available; no expansion date has been announced. DOCVY credential review and appointment booking are not live.`],
  ["How can a doctor request a profile correction on DOCVY?", "Email contact@docvy.in with the official hospital or clinic profile link, the doctor's name and city, and the specific public detail to correct. There is no self-service claim portal. The DOCVY owner reviews each request against public sources and approves any update before it is published. This is a source review, not a claim that clinical credentials have been independently verified. Do not email patient information, identity documents or registration certificates."],
  ["Does a hospital source link mean DOCVY has verified my credentials?", "No. A public hospital or clinic page is a source for the listed profile details. DOCVY has not independently verified credentials, registration status or current appointment availability."],
  ["Can I claim or edit my DOCVY profile myself?", "No. Self-service claiming and profile editing are not available. Send a public source link and the exact correction requested to contact@docvy.in; the DOCVY owner reviews and approves any published change."],
  ["Does DOCVY charge doctors to appear in search?", "There is no active listing offer or online checkout. Contact DOCVY to discuss provider plans and terms."],
];

export default function ForDoctorsPage() {
  const intakeEnabled = isAppointmentIntakeConfigured();
  return (
    <div className="bg-[#fafafb] text-[#151518]">
      <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_83%_15%,#102B46_0%,#071426_62%)] px-6 py-14 text-white md:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border border-[#d8d3ff]/20" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-[42%] h-72 w-72 rounded-full bg-[#d8d3ff]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#d8d3ff]/30 bg-white/5 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#d8d3ff]"><Stethoscope size={15} /> DOCTOR PROFILES · INDIA</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] text-white md:text-[58px]">Correct a doctor profile on DOCVY.</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#e5e5ea] md:text-lg">Send the official hospital or clinic profile link, the doctor&apos;s name and city, and the public detail to correct. The DOCVY owner reviews the source before making a change. DOCVY is being built for discovery across India; current listings are in {providerCityListLabel}. Self-service claims and DOCVY credential verification are not live.</p>
          <div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#e5e5ea]">{providerProfileCount} source-linked profiles</span><span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#e5e5ea]">Current coverage: {providerCityListLabel}</span><span className="rounded-full border border-[#E7C99A]/35 bg-[#E7C99A]/10 px-3 py-1.5 text-xs font-semibold text-[#F4D59E]">Owner review required</span></div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:contact@docvy.in?subject=DOCVY%20doctor%20profile%20correction&body=Official%20public%20hospital%20or%20clinic%20profile%20URL%3A%0D%0ADoctor%20name%3A%0D%0ACity%3A%0D%0APublic%20detail%20to%20correct%3A%0D%0A" className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-[#d8d3ff] px-5 text-sm font-semibold text-[#151518] transition hover:bg-[#d8d3ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#151518]">Email a profile correction request <ArrowRight size={16} /></a>
            <Link href="/doctors" className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-[#e5e5ea] bg-white px-5 text-sm font-semibold text-[#151518] transition hover:bg-[#fafafb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8d3ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#151518]">Browse current listings <ArrowRight size={16} /></Link>
          </div>
          <p className="mt-4 max-w-2xl text-xs leading-5 text-[#d9dae2]">Include only public professional details and a source link. Do not email patient or health information, identity documents or registration certificates.</p>
          </div>
          <aside aria-label="Current DOCVY doctor profile review status" className="relative overflow-hidden rounded-[28px] border border-white/70 bg-[#fafafb] p-6 text-[#151518] shadow-[0_24px_70px_-36px_rgba(0,0,0,0.7)] md:p-8">
            <span aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#d8d3ff]/10" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-[10px] font-extrabold tracking-[0.14em] text-[#202124]">LISTING STATUS TODAY</p><h2 className="mt-2 text-xl font-bold tracking-tight">What a source link tells you</h2></div>
                <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#151518] shadow-sm"><Building2 size={22} /></span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#545761]">A public source helps you check the hospital&apos;s details. It does not mean DOCVY verified credentials or checked appointment availability.</p>
              <dl className="mt-6 space-y-3">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#e5e5ea] bg-white p-4"><dt className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fafafb] text-[#d8d3ff]"><Stethoscope size={18} /></span>Hospital profile source</dt><dd className="rounded-full bg-[#f0eff8] px-3 py-1 text-xs font-bold text-[#202124]">Source linked</dd></div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#e5e5ea] bg-white p-4"><dt className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fafafb] text-[#151518]"><ShieldAlert size={18} /></span>DOCVY credential review</dt><dd className="rounded-full bg-[#e5e5ea] px-3 py-1 text-xs font-bold text-[#151518]">Not verified</dd></div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#e5e5ea] bg-white p-4"><dt className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fafafb] text-[#151518]"><CalendarClock size={18} /></span>Patient appointment requests</dt><dd className={`rounded-full px-3 py-1 text-xs font-bold ${intakeEnabled ? "bg-[#f0eff8] text-[#202124]" : "bg-[#FFF2D9] text-[#80540E]"}`}>{intakeEnabled ? "To DOCVY" : "Paused"}</dd></div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#e5e5ea] bg-white p-4"><dt className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fafafb] text-[#151518]"><MapPin size={18} /></span>Self-service profile claim</dt><dd className="rounded-full bg-[#e5e5ea] px-3 py-1 text-xs font-bold text-[#151518]">Not available</dd></div>
              </dl>
              <p className="mt-4 text-xs leading-5 text-[#545761]">{intakeEnabled ? "Patient requests go to DOCVY’s private intake and do not reserve a slot; the provider must confirm." : "No patient contact details are collected while appointment requests are paused."} Profile corrections are reviewed manually by the DOCVY owner.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0eff8] text-[#202124]"><MapPin size={21} /></span><div>
          <p className="text-xs font-extrabold tracking-[0.14em] text-[#202124]">LOCAL DISCOVERY</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">India-wide discovery; current listings in three NCR cities.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#545761]">Current listings cover {providerCityListLabel}. DOCVY plans to expand city coverage when enough useful, source-linked provider information is ready; no expansion date has been announced. Neighbourhood names appear only where a hospital source lists a specific locality. A profile or specialty search does not mean a doctor is accepting appointments.</p>
          <nav aria-label="Current doctor listings by city" className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-[#545761]">
            <Link href="/doctors/delhi" className="rounded-full border border-[#e5e5ea] bg-white px-3 py-2 transition hover:border-[#202124] hover:text-[#202124]">Delhi doctor listings</Link>
            <Link href="/doctors/gurugram" className="rounded-full border border-[#e5e5ea] bg-white px-3 py-2 transition hover:border-[#202124] hover:text-[#202124]">Gurugram (Gurgaon) doctor listings</Link>
            <Link href="/doctors/noida" className="rounded-full border border-[#e5e5ea] bg-white px-3 py-2 transition hover:border-[#202124] hover:text-[#202124]">Noida doctor listings</Link>
          </nav>
        </div></div>
      </section>

      <section className="border-y border-[#e5e5ea] bg-white px-6 py-16 md:py-20"><div className="mx-auto max-w-6xl">
          <p className="text-xs font-extrabold tracking-[0.14em] text-[#202124]">HOW A PROFILE CORRECTION WORKS</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">A clear review before a profile changes.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">{reviewSteps.map(({ icon: Icon, title, text }, index) => <article key={title} className="rounded-2xl border border-[#e5e5ea] bg-[#fafafb] p-6"><div className="flex items-center justify-between"><span className="text-xs font-bold text-[#202124]">STEP 0{index + 1}</span><Icon size={20} className="text-[#202124]" /></div><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#545761]">{text}</p></article>)}</div>
      </div></section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div><p className="text-xs font-extrabold tracking-[0.14em] text-[#202124]">COMMON QUESTIONS</p><h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">For doctors and clinics</h2><p className="mt-4 text-sm leading-7 text-[#545761]">DOCVY is preparing provider discovery across India, with current source-linked profiles in {providerCityListLabel}. This page explains the status and how to contact the team.</p><Link href="/pricing" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#202124] hover:text-[#383940]">Clinic and hospital plans <Building2 size={16} /></Link></div>
        <div className="space-y-3">{answers.map(([question, answer]) => <details key={question} className="group rounded-2xl border border-[#e5e5ea] bg-white p-5 open:shadow-sm"><summary className="cursor-pointer list-none pr-6 text-base font-bold marker:hidden">{question}</summary><p className="mt-3 text-sm leading-7 text-[#545761]">{answer}</p></details>)}</div>
      </div></section>

      <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_86%_10%,#102B46_0%,#071426_58%)] px-6 py-14 text-white md:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-[#d8d3ff]/20" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold tracking-[0.14em] text-[#d8d3ff]">PROFILE CORRECTIONS · OWNER REVIEW</p>
            <h2 className="mt-3 text-2xl font-bold">Need to correct a doctor profile?</h2>
            <p className="mt-2 text-sm leading-6 text-[#e5e5ea]">Email the public hospital or clinic source and the specific detail. The DOCVY owner reviews requests before changes are published; self-service claims and credential verification are not live.</p>
          </div>
          <a href="mailto:contact@docvy.in?subject=DOCVY%20doctor%20profile%20enquiry" className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-xl bg-[#d8d3ff] px-5 text-sm font-bold text-[#151518] transition hover:bg-[#d8d3ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#151518] md:self-auto">Email DOCVY <ArrowRight size={16} /></a>
        </div>
      </section>
    </div>
  );
}
