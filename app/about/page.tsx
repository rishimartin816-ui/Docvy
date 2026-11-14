import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, ClipboardList, Stethoscope } from "lucide-react";
import { buildPageSocialMetadata } from "@/lib/metadata";

const title = "About DOCVY | A clearer next step in healthcare";
const description = "DOCVY helps patients and families in India understand health concerns, find the right type of doctor, and prepare for care in plain language.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  ...buildPageSocialMetadata(title, description, "/about"),
};

const paths = [
  { icon: BookOpen, title: "Understand what you’re hearing", text: "Look up the condition or symptom you’re worried about. Learn what common medical terms mean and write down what you want to ask.", href: "/care-guide", label: "Search patient guides" },
  { icon: Stethoscope, title: "Find the right kind of doctor", text: "Learn what different specialists do, what they can help with, and what to bring to a first visit.", href: "/specialties", label: "Explore specialties" },
  { icon: ClipboardList, title: "Feel more prepared for surgery", text: "Take practical questions about treatment options, costs, insurance and recovery to your consultation.", href: "/surgery-guide", label: "Open the surgery checklist" },
];

export default function AboutPage() {
  return <div className="docvy-garden">
    <section className="mx-auto grid max-w-site items-center gap-8 px-5 py-12 sm:px-9 lg:py-20">
      <div>
        <p className="docvy-eyebrow">ABOUT DOCVY</p>
        <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-[-.05em] text-ink sm:text-6xl">When health feels uncertain, the next step should feel clearer.</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-grey">Maybe a report has a word you’ve never heard. Maybe you’re helping a parent find a specialist. We built DOCVY for those moments, when you have questions and want somewhere to start.</p>
        <Link href="/care-guide" className="docvy-pill docvy-pill-primary mt-6">Find a guide for your concern <ArrowUpRight strokeWidth={1.5} size={17} aria-hidden="true" /></Link>
      </div>
    </section>

    <section className="mx-auto max-w-site px-5 pb-12 sm:px-9" aria-labelledby="mission-heading">
      <div className="rounded-3xl bg-primary p-7 text-white sm:p-10">
        <p className="text-sm font-bold text-primary-tint">WHAT WE WANT FOR PATIENTS</p>
        <h2 id="mission-heading" className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">More confidence walking into the room. More clarity walking out.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-primary-tint">We want people across India to feel comfortable asking what a diagnosis means, what their options are, and what comes next. A family member helping from another city should be able to read the same guide and help prepare the same questions.</p>
      </div>
    </section>

    <section className="mx-auto max-w-site px-5 pb-16 sm:px-9" aria-labelledby="help-heading">
      <h2 id="help-heading" className="text-3xl font-bold tracking-tight text-ink">Start with what’s on your mind</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {paths.map(({ icon: Icon, title, text, href, label }) => <article key={href} className="docvy-glass flex flex-col items-start p-6">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface text-ink"><Icon strokeWidth={1.5} size={24} aria-hidden="true" /></span>
          <h3 className="mt-4 text-lg font-bold">{title}</h3>
          <p className="mb-5 mt-2 flex-1 text-sm leading-6 text-grey">{text}</p>
          <Link href={href} className="docvy-pill">{label} <ArrowUpRight strokeWidth={1.5} size={16} aria-hidden="true" /></Link>
        </article>)}
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-6 text-grey">DOCVY guides help you prepare for conversations with your care team. Find a real doctor profile and send an appointment request through DOCVY. The provider confirms the time and fee.</p>
    </section>
  </div>;
}
