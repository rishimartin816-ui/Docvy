import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, MapPin, Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "For doctors: profiles and onboarding",
  description: "Contact DOCVY about a doctor profile, correction or future onboarding. Provider discovery is planned across India; current public listings start in Delhi NCR.",
  alternates: { canonical: "/for-doctors" },
  openGraph: {
    type: "website", locale: "en_IN", siteName: "DOCVY",
    title: "For doctors across India | DOCVY",
    description: "DOCVY is building nationwide doctor discovery, starting with source-linked profiles in Delhi NCR. Contact the team about a profile or future onboarding.",
    url: "/for-doctors",
  },
};

const reviewSteps = [
  { icon: Stethoscope, title: "Check the source-linked profile", text: "The directory includes profiles from hospital websites. Email DOCVY the profile link, your specialty and the city if information needs to be corrected." },
  { icon: BadgeCheck, title: "DOCVY handles profile review", text: "DOCVY credential review is pending for the current listings. A source page or submitted correction is not itself a DOCVY verification." },
  { icon: MapPin, title: "Profile claims are handled by DOCVY", text: "There is no self-service claim or edit portal. Contact DOCVY; profile changes and verification are reviewed manually before the directory status is updated." },
];

const answers = [
  ["Is the DOCVY doctor directory live across India?", "DOCVY is being built for discovery across India. The current 12 source-linked profiles are grouped under Delhi, Gurugram and Noida; more cities will be added as provider coverage grows. DOCVY credential review and appointment booking are not live."],
  ["Can a doctor claim or correct a profile now?", "There is no self-service claim or edit portal. Contact DOCVY with the official profile link and the correction or profile request. DOCVY reviews updates manually; submitted details are not automatically treated as verified."],
  ["Does DOCVY charge doctors to appear in search?", "There is no active listing offer or online checkout. Contact DOCVY to discuss provider plans and terms."],
];

export default function ForDoctorsPage() {
  return (
    <div className="bg-[#F6FAF8] text-[#173A37]">
      <section className="bg-[radial-gradient(circle_at_78%_35%,#D5F0E8_0%,#EAF5F1_38%,#F4FAF7_100%)] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/75 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83]"><Stethoscope size={15} /> FOR DOCTORS · INDIA</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[58px]">Doctor discovery designed to grow across India.</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#526D66] md:text-lg">DOCVY is building provider discovery city by city. The current 12 source-linked profile candidates are in Delhi, Gurugram and Noida. Credential review and self-service claims are not open yet; any patient enquiry submitted to DOCVY is not automatically delivered to a doctor or hospital. Contact us if a profile needs correction or you want to discuss future onboarding.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:contact@docvy.in?subject=DOCVY%20doctor%20profile%20enquiry" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white hover:bg-[#066D70]">Ask about a doctor profile <ArrowRight size={16} /></a>
            <Link href="/doctors" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#B7D2C9] bg-white/80 px-5 text-sm font-bold text-[#173A37] hover:bg-white">Directory status <ArrowRight size={16} /></Link>
          </div>
          <p className="mt-4 text-xs leading-5 text-[#526D66]">Please include only public professional details and a source link. Do not email patient or health information, identity documents or registration certificates.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E2F2EC] text-[#087F83]"><MapPin size={21} /></span><div>
          <p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">LOCAL DISCOVERY</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">India-wide discovery, with listings growing city by city.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#526D66]">Current listings cover Delhi, Gurugram and Noida. DOCVY plans to add cities as source-linked provider coverage grows. Neighbourhood names appear only where a hospital source lists a specific locality. A profile or specialty search does not mean a doctor is accepting appointments.</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-[#36564F]">{["Delhi", "Gurugram (Gurgaon)", "Noida", "Neighbourhoods after review"].map((place) => <span key={place} className="rounded-full border border-[#DCEAE5] bg-white px-3 py-2">{place}</span>)}</div>
        </div></div>
      </section>

      <section className="border-y border-[#DCEAE5] bg-white px-6 py-16 md:py-20"><div className="mx-auto max-w-6xl">
        <p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">HOW PROVIDER REVIEW IS PLANNED</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">A profile is reviewed before it appears.</h2>
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
