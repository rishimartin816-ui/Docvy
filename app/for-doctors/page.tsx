import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, MapPin, Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "For Doctors in Delhi NCR | DOCVY Provider Directory",
  description: "Learn about DOCVY's planned doctor directory for Delhi, Gurugram and Noida. Ask about a profile or provider listing; verification and publication are reviewed by DOCVY.",
  alternates: { canonical: "/for-doctors" },
  openGraph: {
    type: "website", locale: "en_IN", siteName: "DOCVY",
    title: "For doctors in Delhi NCR | DOCVY",
    description: "DOCVY is preparing a reviewed doctor directory for Delhi, Gurugram and Noida. Contact the team about a future profile.",
    url: "/for-doctors",
  },
};

const reviewSteps = [
  { icon: Stethoscope, title: "Share your public professional details", text: "Email DOCVY your name, specialty, city and a link to an official or professional profile. Do not email patient information or identity documents." },
  { icon: BadgeCheck, title: "DOCVY reviews the information", text: "Provider verification and profile publication are reviewed by DOCVY. Self-submitted details are not automatically treated as verified or published." },
  { icon: MapPin, title: "Listings open after source and review checks", text: "The public directory is still being prepared. DOCVY will publish profiles only when the source, reuse permission and provider details have been reviewed." },
];

const answers = [
  ["Is the DOCVY doctor directory live?", "Not yet. Doctor search and appointment requests are being prepared for Delhi, Gurugram and Noida. No doctor profiles are currently available to book through DOCVY."],
  ["Can a doctor claim or edit a profile now?", "Self-service claiming is not open. Contact DOCVY about a future profile; DOCVY reviews verification and publication."],
  ["Does DOCVY charge doctors to appear in search?", "There is no active listing offer or online checkout. Contact DOCVY to discuss future provider plans and terms."],
];

export default function ForDoctorsPage() {
  return (
    <div className="bg-[#F6FAF8] text-[#173A37]">
      <section className="bg-[radial-gradient(circle_at_78%_35%,#D5F0E8_0%,#EAF5F1_38%,#F4FAF7_100%)] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/75 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83]"><Stethoscope size={15} /> FOR DOCTORS · DELHI NCR</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[58px]">A doctor directory for Delhi, Gurugram and Noida is in the works.</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#526D66] md:text-lg">DOCVY is preparing a reviewed provider directory for patients looking for doctors and clinics near them. Search, profile claims and appointment requests are not open yet. We are preparing provider details before inviting patients to use the directory.</p>
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
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">One Delhi NCR directory, organized by city and neighbourhood.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#526D66]">The planned directory separates Delhi, Gurugram and Noida, with neighbourhood-level discovery where provider locations are confirmed. A city or specialty search will not imply that a doctor is accepting appointments.</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-[#36564F]">{["Delhi", "Gurugram (Gurgaon)", "Noida", "Neighbourhoods after review"].map((place) => <span key={place} className="rounded-full border border-[#DCEAE5] bg-white px-3 py-2">{place}</span>)}</div>
        </div></div>
      </section>

      <section className="border-y border-[#DCEAE5] bg-white px-6 py-16 md:py-20"><div className="mx-auto max-w-6xl">
        <p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">HOW PROVIDER REVIEW IS PLANNED</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">A profile is reviewed before it appears.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">{reviewSteps.map(({ icon: Icon, title, text }, index) => <article key={title} className="rounded-2xl border border-[#DCEAE5] bg-[#F8FBF9] p-6"><div className="flex items-center justify-between"><span className="text-xs font-bold text-[#087F83]">STEP 0{index + 1}</span><Icon size={20} className="text-[#087F83]" /></div><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#526D66]">{text}</p></article>)}</div>
      </div></section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div><p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">COMMON QUESTIONS</p><h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">For doctors and clinics</h2><p className="mt-4 text-sm leading-7 text-[#526D66]">DOCVY is preparing provider discovery in Delhi NCR. This page explains the current status and how to contact the team.</p><Link href="/pricing" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#087F83] hover:text-[#066D70]">Clinic and hospital plans <Building2 size={16} /></Link></div>
        <div className="space-y-3">{answers.map(([question, answer]) => <details key={question} className="group rounded-2xl border border-[#DCEAE5] bg-white p-5 open:shadow-sm"><summary className="cursor-pointer list-none pr-6 text-base font-bold marker:hidden">{question}</summary><p className="mt-3 text-sm leading-7 text-[#526D66]">{answer}</p></details>)}</div>
      </div></section>

      <section className="bg-[#123B38] px-6 py-12 text-white"><div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><h2 className="text-2xl font-bold">Interested in a future DOCVY profile?</h2><p className="mt-2 text-sm leading-6 text-[#D8E9E3]">Contact the team with public professional details only. Verification and publication are handled by DOCVY.</p></div><a href="mailto:contact@docvy.in?subject=DOCVY%20doctor%20profile%20enquiry" className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-xl bg-white px-5 text-sm font-bold text-[#123B38] hover:bg-[#EAF5F1] md:self-auto">Contact DOCVY <ArrowRight size={16} /></a></div></section>
    </div>
  );
}
