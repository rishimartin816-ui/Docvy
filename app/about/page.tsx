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
  { icon: BookOpen, title: "Understand what you’re hearing", text: "Look up the condition or symptom you’re worried about. Learn what common medical terms mean and write down what you want to ask.", href: "/#care-library", label: "Search patient guides" },
  { icon: Stethoscope, title: "Find the right kind of doctor", text: "Learn what different specialists do, what they can help with, and what to bring to a first visit.", href: "/specialties", label: "Explore specialties" },
  { icon: ClipboardList, title: "Feel more prepared for surgery", text: "Take practical questions about treatment options, costs, insurance and recovery to your consultation.", href: "/surgery-guide", label: "Open the surgery checklist" },
];

export default function AboutPage() {
  return <div className="docvy-garden">
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-9 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
      <div>
        <p className="docvy-eyebrow">ABOUT DOCVY</p>
        <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-[-.05em] text-[#49351e] sm:text-6xl">When health feels uncertain, the next step should feel clearer.</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-[#5d5040]">Maybe a report has a word you’ve never heard. Maybe you’re helping a parent find a specialist. We built DOCVY for those moments, when you have questions and want somewhere to start.</p>
        <Link href="/#care-library" className="docvy-pill docvy-pill-primary mt-6">Find a guide for your concern <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
      <div className="docvy-glass overflow-hidden p-3">
        <svg viewBox="0 0 480 310" className="h-auto w-full rounded-2xl" aria-hidden="true">
          <rect width="480" height="310" fill="#fff3d9" />
          <circle cx="250" cy="150" r="122" fill="#fae5ac" />
          <path d="M0 258q103-56 242-6t238-4v62H0Z" fill="#e9ca8e" />
          <path d="M80 263q0-54-39-85m32 57q-36-2-43-30 31-2 43 30Zm-9-25q-7-29 7-45 16 20-7 45ZM410 260q0-50 36-85m-24 53q33-2 40-26-28-4-40 26Z" fill="#b18d48" stroke="#86612d" strokeWidth="2" strokeLinecap="round" />
          <path d="M130 260v-43q0-41 44-41h24q43 0 43 41v43Z" fill="#f5debd" />
          <circle cx="186" cy="144" r="35" fill="#a76d4c" />
          <path d="M151 148c-9-38 15-54 39-49 24 2 35 16 31 36-23 3-44-3-55-14-3 13-7 22-15 27Z" fill="#30251d" />
          <path d="M252 260v-43q0-41 43-41h24q43 0 43 41v43Z" fill="#70501f" />
          <circle cx="305" cy="144" r="34" fill="#d7a379" />
          <path d="M272 146c-6-28 9-48 34-48 28 0 40 19 33 43-19-2-32-9-38-22-8 13-17 21-29 27Z" fill="#453a31" />
          <path d="M203 219q19 19 41 17m54-18q-20 19-47 18" fill="none" stroke="#986047" strokeWidth="10" strokeLinecap="round" />
          <path d="M235 45h55q12 0 12 12v20q0 12-12 12h-36l-14 11V89h-5q-12 0-12-12V57q0-12 12-12Z" fill="#fffdf5" />
          <path d="M246 68h8l5-9 7 18 6-9h8" fill="none" stroke="#70501f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-9" aria-labelledby="mission-heading">
      <div className="rounded-3xl bg-[#49351e] p-7 text-white sm:p-10">
        <p className="text-sm font-bold text-[#f3cb74]">WHAT WE WANT FOR PATIENTS</p>
        <h2 id="mission-heading" className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">More confidence walking into the room. More clarity walking out.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[#fff3d9]">We want people across India to feel comfortable asking what a diagnosis means, what their options are, and what comes next. A family member helping from another city should be able to read the same guide and help prepare the same questions.</p>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-9" aria-labelledby="help-heading">
      <h2 id="help-heading" className="text-3xl font-bold tracking-tight text-[#49351e]">Start with what’s on your mind</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {paths.map(({ icon: Icon, title, text, href, label }) => <article key={href} className="docvy-glass flex flex-col items-start p-6">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fff3d9] text-[#70501f]"><Icon size={24} aria-hidden="true" /></span>
          <h3 className="mt-4 text-lg font-bold">{title}</h3>
          <p className="mb-5 mt-2 flex-1 text-sm leading-6 text-[#5d5040]">{text}</p>
          <Link href={href} className="docvy-pill">{label} <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </article>)}
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-6 text-[#5d5040]">DOCVY guides help you prepare for conversations with your care team. For a real appointment, contact the clinic directly. The online booking walkthrough uses fictional records.</p>
    </section>
  </div>;
}
