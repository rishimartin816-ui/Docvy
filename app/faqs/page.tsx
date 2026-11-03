import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CalendarClock, ChevronDown, MapPin, Search, ShieldAlert, Stethoscope } from "lucide-react";
import { faqs } from "@/lib/content";
import { isAppointmentIntakeConfigured } from "@/lib/appointment-intake";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { providerCityListLabel } from "@/lib/provider-candidates";

const pageDescription = `Find clear answers about DOCVY's patient guide, current doctor listings in ${providerCityListLabel}, appointment enquiry status, provider verification, and future clinic and hospital plans.`;

export const metadata: Metadata = {
  title: "FAQs about doctor listings, appointments and clinic plans",
  description: pageDescription,
  alternates: { canonical: "/faqs" },
  ...buildPageSocialMetadata("DOCVY FAQs | Doctor listings, appointment requests and clinic plans", pageDescription, "/faqs"),
};

const discoveryQuestions = new Set([
  "What is DOCVY?",
  "How can I find which type of doctor to look for?",
  "Does the Patient Guide diagnose a disease?",
  "Can I see doctors near me in Delhi NCR?",
  "Will DOCVY add doctors in more Indian cities?",
  "Are doctors on DOCVY verified?",
]);

const appointmentQuestions = new Set([
  "Can I request an appointment through DOCVY?",
  "Does DOCVY email the doctor when I send an appointment request?",
  "What happens after I send an appointment enquiry?",
  "Does DOCVY charge patients or take a consultation commission?",
  "Does DOCVY provide medical advice or emergency care?",
]);

function answerFor(question: string, answer: string, intakeEnabled: boolean) {
  if (intakeEnabled) return answer;

  if (question === "Can I request an appointment through DOCVY?") {
    return "Not right now. The DOCVY appointment enquiry form is currently closed, so this website is not collecting patient contact details. Browse the current doctor directory and contact the listed hospital or clinic directly to confirm availability and fees. If DOCVY reopens its form, a request will go to DOCVY and will not itself confirm an appointment.";
  }

  if (question === "Does DOCVY email the doctor when I send an appointment request?") {
    return "No. The appointment enquiry form is currently closed. Provider email notifications are also disabled. If intake reopens, a request will be saved to DOCVY's private intake and will not be automatically delivered to a hospital or clinic.";
  }

  if (question === "What happens after I send an appointment enquiry?") {
    return "The DOCVY appointment enquiry form is currently closed, so a new request cannot be submitted here. DOCVY does not reserve a slot or notify a provider through this website. Contact the hospital or clinic directly to confirm the doctor, location, time and fee.";
  }

  return answer;
}

export default function FaqsPage() {
  const intakeEnabled = isAppointmentIntakeConfigured();
  const providerQuestions = faqs.filter(([question]) => !discoveryQuestions.has(question) && !appointmentQuestions.has(question));
  const groups = [
    {
      id: "find-care",
      label: "PATIENT GUIDE & DIRECTORY",
      title: "Finding care and choosing a starting point",
      description: `DOCVY's guide is available across India. Current source-linked doctor listings are in ${providerCityListLabel}.`,
      icon: Search,
      questions: faqs.filter(([question]) => discoveryQuestions.has(question)),
    },
    {
      id: "requests-and-safety",
      label: "REQUESTS, PAYMENT & SAFETY",
      title: "Appointment enquiries and patient safety",
      description: "See what the website does today, how to confirm an appointment, and where to get urgent help.",
      icon: ShieldAlert,
      questions: faqs.filter(([question]) => appointmentQuestions.has(question)),
    },
    {
      id: "care-teams",
      label: "FOR DOCTORS, CLINICS & HOSPITALS",
      title: "Provider profiles, plans and tools",
      description: "Learn how profile corrections, provider pricing and future operational tools are handled.",
      icon: Building2,
      questions: providerQuestions,
    },
  ];

  return (
    <div className="bg-[#F6FAF8] text-[#173A37]">
      <section className="overflow-hidden border-b border-[#DCEAE5] bg-[radial-gradient(circle_at_84%_18%,#DDF0E9_0%,#F6FAF8_42%,#fff_82%)] px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/85 px-4 py-2 text-[11px] font-extrabold tracking-[0.15em] text-[#087F83]">
            <Stethoscope size={15} aria-hidden="true" /> DOCVY HELP · PATIENTS & CARE TEAMS
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[54px]">
            What can I do on DOCVY today?
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#526D66] md:text-lg">
            Get a clear answer about the patient guide, current doctor listings, appointment enquiries and planned clinic or hospital tools. DOCVY is built for people across India; current doctor profiles are limited to {providerCityListLabel}.
          </p>
          <div role="status" className={`mt-6 flex max-w-4xl items-start gap-3 rounded-2xl border p-4 ${intakeEnabled ? "border-[#B8DCD0] bg-white/90" : "border-[#E7C99A] bg-[#FFF9EE]"}`}>
            <CalendarClock size={20} aria-hidden="true" className={`mt-0.5 shrink-0 ${intakeEnabled ? "text-[#087F83]" : "text-[#A36A12]"}`} />
            <p className={`text-sm leading-6 ${intakeEnabled ? "text-[#36564F]" : "text-[#6E5B39]"}`}>
              {intakeEnabled
                ? "The DOCVY appointment enquiry form is open. Requests go to DOCVY, not directly to a provider, and do not confirm a booking."
                : "The DOCVY appointment enquiry form is currently closed. No patient contact details are being collected; use the directory to contact a listed provider directly."}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-9 md:py-12" aria-label="Choose a DOCVY starting point">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { href: "/care-guide", title: "I have a health question", text: "Search a concern or specialty in the India-wide patient guide.", icon: Search },
            { href: "/doctors", title: "I want to find a doctor", text: `Browse hospital-source profiles in ${providerCityListLabel}.`, icon: MapPin },
            { href: "/pricing", title: "I represent a care team", text: "Review planned clinic and hospital workflows and contact DOCVY.", icon: Building2 },
          ].map(({ href, title, text, icon: Icon }) => (
            <Link key={href} href={href} className="group flex min-h-[136px] items-start gap-4 rounded-2xl border border-[#DCEAE5] bg-white p-5 shadow-[0_8px_26px_rgba(23,58,55,0.04)] transition hover:-translate-y-0.5 hover:border-[#B8DCD0] hover:shadow-[0_14px_34px_rgba(23,58,55,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F83] focus-visible:ring-offset-2">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E3F3ED] text-[#087F83]"><Icon size={20} aria-hidden="true" /></span>
              <span><span className="flex items-center gap-2 font-bold text-[#173A37]">{title}<ArrowRight size={15} aria-hidden="true" className="text-[#087F83] transition group-hover:translate-x-1" /></span><span className="mt-2 block text-sm leading-6 text-[#526D66]">{text}</span></span>
            </Link>
          ))}
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-5 px-6 pb-16 md:space-y-6 md:pb-20" aria-label="DOCVY questions and answers">
        {groups.map(({ id, label, title, description, icon: Icon, questions }) => (
          <section key={id} id={id} className="scroll-mt-24 overflow-hidden rounded-[24px] border border-[#DCEAE5] bg-white shadow-[0_10px_36px_rgba(23,58,55,0.04)]" aria-labelledby={`${id}-title`}>
            <div className="flex items-start gap-4 border-b border-[#E8F0EC] bg-[#F8FBF9] px-5 py-6 md:px-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E3F3ED] text-[#087F83]"><Icon size={20} aria-hidden="true" /></span>
              <div><p className="text-[10px] font-extrabold tracking-[0.14em] text-[#087F83]">{label}</p><h2 id={`${id}-title`} className="mt-2 text-xl font-bold tracking-tight md:text-2xl">{title}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-[#526D66]">{description}</p></div>
            </div>
            <div className="divide-y divide-[#E8F0EC] px-5 md:px-7">
              {questions.map(([question, answer]) => (
                <details key={question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left text-base font-bold text-[#173A37] marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F83] focus-visible:ring-offset-4">
                    <span>{question}</span><ChevronDown size={18} aria-hidden="true" className="shrink-0 text-[#087F83] transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 max-w-4xl pr-8 text-sm leading-7 text-[#526D66]">
                    {answerFor(question, answer, intakeEnabled)}
                    {question === "Does DOCVY provide medical advice or emergency care?" && <> See the Government of India&apos;s <a href="https://112.gov.in/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#087F83] underline underline-offset-4">Emergency Response Support System (112)</a> for official emergency information.</>}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section className="grid gap-4 pt-2 md:grid-cols-2" aria-label="More DOCVY information">
          <div className="rounded-2xl border border-[#DCEAE5] bg-white p-5"><h2 className="font-bold">Still deciding which specialty to search?</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">The patient guide explains common specialty categories. It is general directory information, not a diagnosis or personal medical recommendation.</p><Link className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#087F83]" href="/care-guide">Open the patient guide <ArrowRight size={16} /></Link></div>
          <div className="rounded-2xl border border-[#DCEAE5] bg-white p-5"><h2 className="font-bold">Need to contact DOCVY about a provider profile?</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">Share the public hospital profile link and the correction needed. Do not send patient information or identity documents.</p><Link className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#087F83]" href="/for-doctors">Doctor profile help <ArrowRight size={16} /></Link></div>
        </section>
      </main>
    </div>
  );
}
