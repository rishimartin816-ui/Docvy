import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpenCheck,
  Building2,
  MapPin,
  Search,
  ShieldAlert,
} from "lucide-react";
import { providerCityListLabel } from "@/lib/directory-coverage";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Start with what brought you here",
    text: "Search a condition, symptom or specialty. If you are unsure what to search, the patient guide gives you a plain-language starting point.",
    label: "START HERE",
  },
  {
    number: "02",
    icon: BookOpenCheck,
    title: "Understand the specialty",
    text: "Read what a specialty commonly covers and why it may be related to your search. This is general information, not a diagnosis or personal care recommendation.",
    label: "GUIDE AVAILABLE ACROSS INDIA",
  },
  {
    number: "03",
    icon: MapPin,
    title: "Check whether listings cover your city",
    text: `The current directory has source-linked profiles in ${providerCityListLabel}. If you are elsewhere in India, you can still use the guide; other city listings are planned when useful, source-linked coverage is ready. No expansion date has been announced.`,
    label: "CURRENT LISTINGS",
  },
  {
    number: "04",
    icon: Building2,
    title: "Continue with the hospital or clinic",
    text: "Choose a listed doctor. If DOCVY’s enquiry form is open, your details go to DOCVY, not directly to the provider. Contact the clinic or hospital to confirm the doctor, location, time and fee.",
    label: "YOU CHOOSE THE NEXT STEP",
  },
];

export default function PatientJourneyMap({ intakeEnabled, headingLevel = 3 }: { intakeEnabled: boolean; headingLevel?: 2 | 3 }) {
  const MapHeading = headingLevel === 2 ? "h2" : "h3";
  const StepHeading = headingLevel === 2 ? "h3" : "h4";
  const stepsWithAvailability = steps.map((step) =>
    step.number === "04"
      ? {
          ...step,
          title: "Confirm details with the care provider",
          text: intakeEnabled
            ? "You can send an appointment enquiry to DOCVY. It is saved in DOCVY’s private intake; use your reference to follow up with the selected clinic."
            : "DOCVY’s appointment enquiry form is currently closed. Contact the hospital or clinic directly to confirm the doctor, location, time and fee.",
          label: intakeEnabled ? "ENQUIRY TO DOCVY" : "ENQUIRY FORM CLOSED",
        }
      : step,
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
      <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface p-6 sm:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 h-48 w-48 rounded-full border-[24px] border-white/50" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-14 -left-10 h-44 w-44 rounded-full bg-line" />
        <div className="relative">
          <p className="text-[11px] font-extrabold tracking-[0.15em] text-ink">A SIMPLE WAY THROUGH</p>
          <MapHeading className="mt-3 max-w-sm text-2xl font-black leading-tight tracking-[-0.035em] text-ink sm:text-3xl">From your first question to the right place to check next.</MapHeading>
          <p className="mt-4 max-w-sm text-sm leading-7 text-grey">You do not need to know a medical specialty before you start. Follow the steps that fit you and leave the clinical decision to a qualified professional.</p>

          <div className="mt-7 rounded-2xl border border-white bg-white/90 p-4 ">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-ink"><Search strokeWidth={1.5} size={21} /></span>
              <div><p className="text-[10px] font-extrabold tracking-[0.13em] text-grey">YOUR STARTING POINT</p><p className="mt-1 font-bold text-ink">“I have a health concern”</p></div>
            </div>
            <div className="ml-5 flex h-8 items-center border-l-2 border-dashed border-line"><ArrowDown strokeWidth={1.5} size={16} className="-ml-[9px] rounded-full bg-white text-ink" /></div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF2E9] text-[#B56543]"><BookOpenCheck strokeWidth={1.5} size={20} /></span>
              <div><p className="text-[10px] font-extrabold tracking-[0.13em] text-grey">A CLEARER SEARCH</p><p className="mt-1 font-bold text-ink">Explore a related specialty</p></div>
            </div>
            <div className="ml-5 flex h-8 items-center border-l-2 border-dashed border-line"><ArrowDown strokeWidth={1.5} size={16} className="-ml-[9px] rounded-full bg-white text-ink" /></div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-ink"><MapPin strokeWidth={1.5} size={20} /></span>
              <div><p className="text-[10px] font-extrabold tracking-[0.13em] text-grey">CURRENT DIRECTORY</p><p className="mt-1 font-bold text-ink">{providerCityListLabel}</p></div>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-surface p-3 text-xs leading-5 text-[#B45309]">
            <ShieldAlert strokeWidth={1.5} size={16} className="mt-0.5 shrink-0 text-[#B45309]" />
            <p>DOCVY listings are not a medical recommendation. Check profile details and availability with the linked care provider.</p>
          </div>
          <Link href="/care-guide" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white transition hover:bg-primary">Start with the patient guide <ArrowUpRight strokeWidth={1.5} size={16} /></Link>
        </div>
      </div>

      <ol className="relative space-y-3 before:absolute before:bottom-10 before:left-[22px] before:top-10 before:w-px before:bg-line">
        {stepsWithAvailability.map(({ number, icon: Icon, title, text, label }) => (
          <li key={number} className="relative flex gap-4 rounded-2xl border border-line bg-white p-4 sm:gap-5 sm:p-5">
            <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-line bg-[#FFFFFF] text-ink"><Icon strokeWidth={1.5} size={20} aria-hidden="true" /></span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-extrabold tracking-[0.12em] text-ink">STEP {number}</span><span className="rounded-full bg-surface px-2.5 py-1 text-[9px] font-extrabold tracking-[0.08em] text-grey">{label}</span></div>
              <StepHeading className="mt-2 text-base font-bold text-ink sm:text-lg">{title}</StepHeading>
              <p className="mt-1.5 text-sm leading-6 text-grey">{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
