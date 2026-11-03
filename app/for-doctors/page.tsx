import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, MapPin, Stethoscope } from "lucide-react";
import { buildPageSocialMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "For doctors: profile corrections and onboarding",
  description: "Request a doctor profile correction or discuss future onboarding with DOCVY. The DOCVY owner reviews public sources; current listings are in Delhi, Gurugram and Noida.",
  alternates: { canonical: "/for-doctors" },
  ...buildPageSocialMetadata("For doctors: profile corrections and onboarding | DOCVY", "Request a doctor profile correction or discuss future onboarding with DOCVY. The DOCVY owner reviews public sources; current listings are in Delhi, Gurugram and Noida.", "/for-doctors"),
};

const reviewSteps = [
  { icon: Stethoscope, title: "Send the public profile link", text: "Email the official hospital or clinic profile URL, the doctor's name and city, and the exact detail to correct. Do not include patient information, identity documents or registration certificates." },
  { icon: BadgeCheck, title: "The DOCVY owner checks it", text: "The DOCVY owner reviews the request against public professional sources. A hospital listing or submitted link alone does not confirm credentials or make a profile verified." },
  { icon: MapPin, title: "Changes need owner approval", text: "There is no self-service claim or edit portal. A correction is published only after the DOCVY owner approves it; a request does not instantly change a listing or confirm appointment availability." },
];

const answers = [
  ["Is the DOCVY doctor directory live across India?", "DOCVY is being built for discovery across India. The current 12 source-linked profiles are grouped under Delhi, Gurugram and Noida. Additional city listings are planned when enough useful, source-linked provider coverage is available; no expansion date has been announced. DOCVY credential review and appointment booking are not live."],
  ["How can a doctor request a profile correction on DOCVY?", "Email contact@docvy.in with the official hospital or clinic profile link, the doctor's name and city, and the specific public detail to correct. There is no self-service claim portal. The DOCVY owner reviews each request against public sources and approves any update before it is published. This is a source review, not a claim that clinical credentials have been independently verified. Do not email patient information, identity documents or registration certificates."],
  ["Does DOCVY charge doctors to appear in search?", "There is no active listing offer or online checkout. Contact DOCVY to discuss provider plans and terms."],
];

export default function ForDoctorsPage() {
  return (
    <div className="bg-[#F6FAF8] text-[#173A37]">
      <section className="bg-[radial-gradient(circle_at_78%_35%,#D5F0E8_0%,#EAF5F1_38%,#F4FAF7_100%)] px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/75 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83]"><Stethoscope size={15} /> FOR DOCTORS · INDIA</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[58px]">Doctor discovery designed to grow across India.</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#526D66] md:text-lg">DOCVY is being built for provider discovery across India. The current 12 source-linked profile candidates are in Delhi, Gurugram and Noida. Additional city listings are planned when enough useful source-linked coverage is ready; no expansion date has been announced. Credential review and self-service claims are not open yet; any patient enquiry submitted to DOCVY is not automatically delivered to a doctor or hospital. Contact us if a profile needs correction or you want to discuss future onboarding.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:contact@docvy.in?subject=DOCVY%20doctor%20profile%20enquiry" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white hover:bg-[#066D70]">Ask about a doctor profile <ArrowRight size={16} /></a>
            <Link href="/doctors" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#B7D2C9] bg-white/80 px-5 text-sm font-bold text-[#173A37] hover:bg-white">Directory status <ArrowRight size={16} /></Link>
          </div>
          <p className="mt-4 text-xs leading-5 text-[#526D66]">Please include only public professional details and a source link. Do not email patient or health information, identity documents or registration certificates.</p>
          </div>
          <aside aria-label="Illustration showing the current DOCVY doctor profile review status" className="relative overflow-hidden rounded-[28px] border border-[#CFE3DA] bg-white p-6 shadow-[0_24px_70px_-36px_rgba(23,58,55,0.35)] md:p-8">
            <span aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#EAF5F1]" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-[10px] font-extrabold tracking-[0.14em] text-[#087F83]">PROFILE STATUS · EXAMPLE</p><h2 className="mt-2 text-xl font-bold tracking-tight">What a DOCVY listing means</h2></div>
                <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF5F1] text-[#087F83]"><Building2 size={22} /></span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#526D66]">A source link helps people check the hospital&apos;s latest details. It does not mean DOCVY has verified a doctor&apos;s credentials or confirmed an appointment.</p>
              <dl className="mt-6 space-y-3">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#DCEAE5] bg-[#F8FBF9] p-4"><dt className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#087F83]"><Stethoscope size={18} /></span>Hospital profile source</dt><dd className="rounded-full bg-[#E2F2EC] px-3 py-1 text-xs font-bold text-[#176B5C]">Linked</dd></div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#DCEAE5] bg-[#F8FBF9] p-4"><dt className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#A36A12]"><BadgeCheck size={18} /></span>DOCVY credential review</dt><dd className="rounded-full bg-[#FFF2D9] px-3 py-1 text-xs font-bold text-[#80540E]">Pending</dd></div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#DCEAE5] bg-[#F8FBF9] p-4"><dt className="flex items-center gap-3 text-sm font-semibold"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#087F83]"><MapPin size={18} /></span>Self-service claim</dt><dd className="rounded-full bg-[#EEF2F0] px-3 py-1 text-xs font-bold text-[#526D66]">Not open</dd></div>
              </dl>
              <p className="mt-4 text-xs leading-5 text-[#789089]">Illustrative status card, not a live provider dashboard. Profile approval stays with the DOCVY owner.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E2F2EC] text-[#087F83]"><MapPin size={21} /></span><div>
          <p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">LOCAL DISCOVERY</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">India-wide discovery; current listings in three NCR cities.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#526D66]">Current listings cover Delhi, Gurugram and Noida. DOCVY plans to expand city coverage when enough useful, source-linked provider information is ready; no expansion date has been announced. Neighbourhood names appear only where a hospital source lists a specific locality. A profile or specialty search does not mean a doctor is accepting appointments.</p>
          <nav aria-label="Current doctor listings by city" className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-[#36564F]">
            <Link href="/doctors/delhi" className="rounded-full border border-[#DCEAE5] bg-white px-3 py-2 transition hover:border-[#087F83] hover:text-[#087F83]">Delhi doctor listings</Link>
            <Link href="/doctors/gurugram" className="rounded-full border border-[#DCEAE5] bg-white px-3 py-2 transition hover:border-[#087F83] hover:text-[#087F83]">Gurugram (Gurgaon) doctor listings</Link>
            <Link href="/doctors/noida" className="rounded-full border border-[#DCEAE5] bg-white px-3 py-2 transition hover:border-[#087F83] hover:text-[#087F83]">Noida doctor listings</Link>
          </nav>
        </div></div>
      </section>

      <section className="border-y border-[#DCEAE5] bg-white px-6 py-16 md:py-20"><div className="mx-auto max-w-6xl">
          <p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">HOW A PROFILE CORRECTION WORKS</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">A clear review before a profile changes.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">{reviewSteps.map(({ icon: Icon, title, text }, index) => <article key={title} className="rounded-2xl border border-[#DCEAE5] bg-[#F8FBF9] p-6"><div className="flex items-center justify-between"><span className="text-xs font-bold text-[#087F83]">STEP 0{index + 1}</span><Icon size={20} className="text-[#087F83]" /></div><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#526D66]">{text}</p></article>)}</div>
      </div></section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div><p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">COMMON QUESTIONS</p><h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">For doctors and clinics</h2><p className="mt-4 text-sm leading-7 text-[#526D66]">DOCVY is preparing provider discovery across India, beginning with the current Delhi NCR listings. This page explains the status and how to contact the team.</p><Link href="/pricing" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#087F83] hover:text-[#066D70]">Clinic and hospital plans <Building2 size={16} /></Link></div>
        <div className="space-y-3">{answers.map(([question, answer]) => <details key={question} className="group rounded-2xl border border-[#DCEAE5] bg-white p-5 open:shadow-sm"><summary className="cursor-pointer list-none pr-6 text-base font-bold marker:hidden">{question}</summary><p className="mt-3 text-sm leading-7 text-[#526D66]">{answer}</p></details>)}</div>
      </div></section>

      <section className="bg-[#123B38] px-6 py-12 text-white"><div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><h2 className="text-2xl font-bold">Interested in a future DOCVY profile?</h2><p className="mt-2 text-sm leading-6 text-[#D8E9E3]">Contact the team with public professional details only. Verification and publication are handled by DOCVY.</p></div><a href="mailto:contact@docvy.in?subject=DOCVY%20doctor%20profile%20enquiry" className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-xl bg-white px-5 text-sm font-bold text-[#123B38] hover:bg-[#EAF5F1] md:self-auto">Contact DOCVY <ArrowRight size={16} /></a></div></section>
    </div>
  );
}
