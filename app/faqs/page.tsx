import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "DOCVY FAQs: doctor listings, appointments and provider plans",
  description:
    "Clear answers about DOCVY's doctor directory, appointment requests, provider verification, clinic and hospital plans, privacy and emergency care.",
  alternates: { canonical: "/faqs" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DOCVY",
    title: "DOCVY FAQs: doctor listings, appointments and provider plans",
    description:
      "Clear answers about DOCVY's doctor directory, appointment requests, provider verification, clinic and hospital plans, privacy and emergency care.",
    url: "/faqs",
  },
};

export default function FaqsPage() {
  return (
    <div className="bg-[#F6FAF8] text-[#173A37]">
      <section className="border-b border-[#DCEAE5] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <p className="text-[11px] font-extrabold tracking-[0.15em] text-[#087F83]">DOCVY HELP</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-[50px]">Frequently asked questions</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#526D66]">
            Straight answers about the patient guide, doctor directory, appointment journey, and what patients, doctors, clinics and hospitals can use today.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-12 lg:px-10 md:py-16" aria-label="DOCVY questions and answers">
        <div className="divide-y divide-[#DCEAE5] rounded-2xl border border-[#DCEAE5] bg-white px-6 md:px-8">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-left text-base font-bold text-[#173A37] marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087F83]">
                <span>{question}</span>
                <span aria-hidden="true" className="text-xl leading-5 text-[#087F83] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-3xl pr-8 text-sm leading-7 text-[#526D66]">{answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-sm leading-7 text-[#526D66]">
          Not sure which specialty to search? Start with the <Link className="font-semibold text-[#087F83] underline underline-offset-4" href="/care-guide">patient guide</Link>. It offers general directory information, not diagnosis or medical advice.
        </p>
        <p className="mt-4 text-sm leading-7 text-[#526D66]">
          For clinic or hospital onboarding, visit <Link className="font-semibold text-[#087F83] underline underline-offset-4" href="/pricing">provider plans</Link> or <Link className="font-semibold text-[#087F83] underline underline-offset-4" href="/contact">contact DOCVY</Link>. Do not send patient health information by email.
        </p>
      </section>
    </div>
  );
}
