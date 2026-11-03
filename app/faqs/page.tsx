import type { Metadata } from "next";
import Link from "next/link";
import { buildPageSocialMetadata } from "@/lib/metadata";

const title = "DOCVY Help: Patient Guides and Appointments";
const description = "Learn what DOCVY offers, how to find the right specialty, and what to expect from the demo booking and clinic dashboard.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/faqs" },
  ...buildPageSocialMetadata(title, description, "/faqs"),
};

const questions = [
  {
    question: "What is DOCVY?",
    answer: "DOCVY is a patient guide for people in India. It explains what different specialists do and helps you prepare questions for your visit.",
    href: "/care-guide", label: "Explore patient guides",
  },
  {
    question: "What if I don’t know which type of doctor to see?",
    answer: "Start with a concern you can describe, such as joint pain or high blood pressure. The guide explains the specialties commonly involved. A clinician can help you decide which care is right for you.",
    href: "/care-guide", label: "Search a health concern",
  },
  {
    question: "Can I book a real appointment on DOCVY?",
    answer: "The current booking experience is a demo using a fictional doctor and clinic. For a real appointment, contact your chosen clinic or hospital directly.",
    href: "/doctors", label: "See the demo directory",
  },
  {
    question: "What can I try in the booking demo?",
    answer: "You can pick an available test slot and see what a confirmation looks like. Clinic staff can use the demo workspace to see how booking and calendar changes fit together.",
    href: "https://docvy-clinic-demo.vercel.app/book", label: "Try a demo booking",
  },
  {
    question: "Can my clinic see how DOCVY works?",
    answer: "Yes. Contact DOCVY to ask for a walkthrough of the clinic workspace, including availability, enquiries, and appointment history.",
    href: "/contact", label: "Contact DOCVY",
  },
];

export default function FaqsPage() {
  return <div className="docvy-garden px-5 py-12 sm:px-8 sm:py-16">
    <div className="mx-auto max-w-3xl">
      <p className="docvy-eyebrow">DOCVY HELP</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1e3028] sm:text-5xl">Questions about using DOCVY</h1>
      <p className="mt-4 text-lg text-[#41584d]">Find out where to start, what the patient guide covers, and what you can try in the clinic demo.</p>
      <div className="mt-8 space-y-4">
        {questions.map(({ question, answer, href, label }) => <section key={question} className="docvy-glass p-5 sm:p-7">
          <h2 className="text-xl font-bold text-[#1e3028]">{question}</h2>
          <p className="mt-2 text-[#41584d]">{answer}</p>
          <Link href={href} className="mt-3 inline-flex min-h-11 items-center font-semibold text-[#245a46] underline underline-offset-4">{label}</Link>
        </section>)}
      </div>
    </div>
  </div>;
}
