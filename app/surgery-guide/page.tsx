import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ClipboardList, HandHeart, Hospital } from "lucide-react";
import { procedures, surgeryGroups } from "@/lib/care-directory";
import { buildPageSocialMetadata } from "@/lib/metadata";

const title = "Surgery guide and procedure directory";
const description = "Prepare for a surgical consultation in India with questions about your options, hospital costs, insurance paperwork, and recovery.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/surgery-guide" },
  ...buildPageSocialMetadata(title + " | DOCVY", description, "/surgery-guide", "article"),
};

const stages = [
  { title: "At the consultation", icon: ClipboardList, questions: [
    "Why are you recommending this operation, and what are the alternatives?",
    "What are the main benefits and risks in my case?",
    "Which reports should I bring, and who should I contact if I have more questions?",
  ] },
  { title: "Before the hospital visit", icon: Hospital, questions: [
    "Can I have a written estimate showing what is included and what could cost extra?",
    "If I have insurance, who checks pre-authorisation and which documents should I bring?",
    "When should I arrive, and what instructions should I follow about food and medicines?",
  ] },
  { title: "Planning to come home", icon: HandHeart, questions: [
    "Will I need someone to take me home or help me afterwards?",
    "Who should I call if I am worried after discharge?",
    "When is the follow-up, and what should I ask about getting back to my routine?",
  ] },
];

export default function SurgeryGuidePage() {
  return <div className="docvy-garden px-5 py-12 sm:px-9 sm:py-16">
    <div className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#41584d]"><Link href="/" className="underline underline-offset-4">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Surgery guide</span></nav>
      <p className="docvy-eyebrow">PATIENT GUIDE · INDIA</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Questions to ask before surgery</h1>
      <p className="mt-4 max-w-2xl text-lg text-[#41584d]">If a doctor has mentioned surgery, take these questions to your next visit. Ask your care team to explain your choices, the likely costs, and what recovery could look like for you.</p>
            <a href="#procedures" className="docvy-pill docvy-pill-primary mt-5">Browse {procedures.length} procedures <ArrowUpRight size={17} aria-hidden="true" /></a>
      <section id="procedures" className="my-12 scroll-mt-28" aria-labelledby="procedure-heading">
        <h2 id="procedure-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">Find a procedure by specialty</h2>
        <p className="mt-3 max-w-2xl leading-7 text-[#41584d]">Choose the operation your doctor mentioned. Each link opens a search for that procedure, where you can narrow results by city.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {surgeryGroups.map(({ name, specialty, procedures }) => <section key={name} className="docvy-glass p-5">
            <h3 className="text-xl font-bold">{name}</h3>
            <ul className="mt-2 divide-y divide-[#d5e5da]">{procedures.map((procedure) => <li key={procedure}>
              <Link href={{ pathname: "/doctors", query: { specialty, procedure } }} className="flex min-h-11 items-center justify-between gap-3 rounded px-1 py-2 font-semibold text-[#245a46] hover:underline" aria-label={`Find doctors for ${procedure}`}>
                {procedure}<ArrowUpRight size={16} className="shrink-0" aria-hidden="true" />
              </Link>
            </li>)}</ul>
          </section>)}
        </div>
      </section>
      <h2 className="text-3xl font-bold tracking-tight">Questions to take to your appointment</h2>
      <div className="my-8 grid gap-4 lg:grid-cols-3">
        {stages.map(({ title, icon: Icon, questions }) => <section className="docvy-glass p-6" key={title}>
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#e0efe5] text-[#245a46]"><Icon size={23} aria-hidden="true" /></span>
          <h3 className="mt-4 text-2xl font-bold">{title}</h3>
          <ul className="mt-3 list-disc space-y-3 pl-5 text-[#41584d]">{questions.map(question => <li key={question}>{question}</li>)}</ul>
        </section>)}
      </div>
      <p className="max-w-2xl text-sm text-[#41584d]">This checklist is for preparing questions. Your surgeon and hospital will give you instructions for your situation. DOCVY does not arrange operations.</p>
      <p className="mt-3 text-sm text-[#41584d]">Further reading <a className="underline underline-offset-4" href="https://www.nhs.uk/tests-and-treatments/having-surgery/preparation/">NHS guide to preparing for surgery</a></p>
      <Link href="/care-guide" className="docvy-pill mt-6">Explore other patient guides <ArrowUpRight size={17} aria-hidden="true" /></Link>
    </div>
  </div>;
}
