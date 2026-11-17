import type { Metadata } from "next";
import Link from "next/link";
import { buildPageSocialMetadata } from "@/lib/metadata";

const title = "DOCVY Help: Patient Guides and Appointments";
const description = "Learn how DOCVY sourced profiles, written consent, appointment requests, registration verification and profile removal work.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/faqs" },
  ...buildPageSocialMetadata(title, description, "/faqs"),
};

const questions = [
  { question: "What do unclaimed, claimed and verified mean?", answer: "Unclaimed profiles show limited professional details from an official source. Claimed means DOCVY reviewed written consent to listing and appointment requests. DOCVY Verified additionally requires a manual registration check with the state medical council or NMC.", href: "/for-doctors", label: "Understand profile status" },
  { question: "How can a doctor claim or remove a profile?", answer: "Use the claim form to provide your registration details, work contact and written consent. DOCVY reviews your authority before approving a claim. If you prefer removal, use the removal form; requests are actioned within 48 hours.", href: "/claim-profile", label: "Claim or request removal" },
  {
    question: "What is DOCVY?",
    answer: "DOCVY is a healthcare directory for people in India. Find doctors by specialty and location, check practice details, and send an appointment request where the doctor has opted in. Health guides help you prepare for your visit.",
    href: "/care-guide", label: "Explore patient guides",
  },
  {
    question: "What if I don’t know which type of doctor to see?",
    answer: "Start with a concern you can describe, such as joint pain or high blood pressure. The guide explains the specialties commonly involved. A clinician can help you decide which care is right for you.",
    href: "/care-guide", label: "Search a health concern",
  },
  {
    question: "Can I book a real appointment on DOCVY?",
    answer: "Yes. Choose from activated, verified doctors on the booking page. Pick your practice and preferred time, then submit your contact details. DOCVY checks availability with the doctor and sends confirmation. Wait for that confirmation before travelling.",
    href: "/doctors", label: "Browse sourced doctor profiles",
  },
  {
    question: "What happens after I send an appointment request?",
    answer: "Save the private tracking link and reference shown after submission. DOCVY coordinates your appointment with the doctor. Your tracking link shows updates and cancellation options; contact verification protects independent visit reporting.",
    href: "/how-it-works", label: "How appointment requests work",
  },
  {
    question: "Can my clinic see how DOCVY works?",
    answer: "Contact DOCVY to discuss practice onboarding and future software requirements. Clinic CRM accounts and staff-managed real-time scheduling are separate from the current DOCVY-coordinated patient booking release.",
    href: "/contact", label: "Contact DOCVY",
  },
];

export default function FaqsPage() {
  return <div className="docvy-garden px-5 py-12 sm:px-8 sm:py-16">
    <div className="mx-auto max-w-3xl">
      <p className="docvy-eyebrow">DOCVY HELP</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">Questions about using DOCVY</h1>
      <p className="mt-4 text-lg text-grey">Find your doctor, understand profile status, book an appointment and follow your updates through DOCVY.</p>
      <div className="mt-8 space-y-4">
        {questions.map(({ question, answer, href, label }) => <details key={question} className="docvy-glass p-5 sm:p-7">
          <summary className="text-lg font-semibold text-ink">{question}</summary>
          <p className="mt-2 text-grey">{answer}</p>
          <Link href={href} className="mt-3 inline-flex min-h-11 items-center font-semibold text-ink underline underline-offset-4">{label}</Link>
        </details>)}
      </div>
    </div>
  </div>;
}
