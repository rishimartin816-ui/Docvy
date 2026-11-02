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
    text: "The current directory has source-linked profiles in Delhi, Gurugram and Noida. If you are elsewhere in India, you can still use the guide; more city listings will follow as coverage grows.",
    label: "CURRENT LISTINGS: DELHI NCR",
  },
  {
    number: "04",
    icon: Building2,
    title: "Continue with the hospital or clinic",
    text: "Choose a listed doctor and send DOCVY an enquiry when the form is enabled. The clinic or hospital must confirm the doctor, location, time and any fee before an appointment exists.",
    label: "YOU CHOOSE THE NEXT STEP",
  },
];

export default function PatientJourneyMap() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
      <div className="relative overflow-hidden rounded-[28px] border border-[#DCEAE5] bg-[#EAF5F1] p-6 sm:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 h-48 w-48 rounded-full border-[24px] border-white/50" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-14 -left-10 h-44 w-44 rounded-full bg-[#D1E9DF]" />
        <div className="relative">
          <p className="text-[11px] font-extrabold tracking-[0.15em] text-[#087F83]">A SIMPLE WAY THROUGH</p>
          <h3 className="mt-3 max-w-sm text-2xl font-black leading-tight tracking-[-0.035em] text-[#173A37] sm:text-3xl">From your first question to the right place to check next.</h3>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#526D66]">You do not need to know a medical specialty before you start. Follow the steps that fit you and leave the clinical decision to a qualified professional.</p>

          <div className="mt-7 rounded-2xl border border-white bg-white/90 p-4 shadow-[0_12px_35px_rgba(23,58,55,0.08)]">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DDF0E9] text-[#087F83]"><Search size={21} /></span>
              <div><p className="text-[10px] font-extrabold tracking-[0.13em] text-[#789089]">YOUR STARTING POINT</p><p className="mt-1 font-bold text-[#173A37]">“I have a health concern”</p></div>
            </div>
            <div className="ml-5 flex h-8 items-center border-l-2 border-dashed border-[#91C9B8]"><ArrowDown size={16} className="-ml-[9px] rounded-full bg-white text-[#087F83]" /></div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF2E9] text-[#B56543]"><BookOpenCheck size={20} /></span>
              <div><p className="text-[10px] font-extrabold tracking-[0.13em] text-[#789089]">A CLEARER SEARCH</p><p className="mt-1 font-bold text-[#173A37]">Explore a related specialty</p></div>
            </div>
            <div className="ml-5 flex h-8 items-center border-l-2 border-dashed border-[#91C9B8]"><ArrowDown size={16} className="-ml-[9px] rounded-full bg-white text-[#087F83]" /></div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF5F1] text-[#087F83]"><MapPin size={20} /></span>
              <div><p className="text-[10px] font-extrabold tracking-[0.13em] text-[#789089]">CURRENT DIRECTORY</p><p className="mt-1 font-bold text-[#173A37]">Delhi · Gurugram · Noida</p></div>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#FFF9EE] p-3 text-xs leading-5 text-[#6E5B39]">
            <ShieldAlert size={16} className="mt-0.5 shrink-0 text-[#A36A12]" />
            <p>DOCVY listings are not a medical recommendation. Check profile details and availability with the linked care provider.</p>
          </div>
          <Link href="/care-guide" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#087F83] px-4 text-sm font-bold text-white transition hover:bg-[#066D70]">Start with the patient guide <ArrowUpRight size={16} /></Link>
        </div>
      </div>

      <ol className="relative space-y-3 before:absolute before:bottom-10 before:left-[22px] before:top-10 before:w-px before:bg-[#B8DCD0]">
        {steps.map(({ number, icon: Icon, title, text, label }) => (
          <li key={number} className="relative flex gap-4 rounded-2xl border border-[#DCEAE5] bg-white p-4 sm:gap-5 sm:p-5">
            <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#C9E3D9] bg-[#F3FAF6] text-[#087F83]"><Icon size={20} aria-hidden="true" /></span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-extrabold tracking-[0.12em] text-[#087F83]">STEP {number}</span><span className="rounded-full bg-[#F1F7F4] px-2.5 py-1 text-[9px] font-extrabold tracking-[0.08em] text-[#526D66]">{label}</span></div>
              <h4 className="mt-2 text-base font-bold text-[#173A37] sm:text-lg">{title}</h4>
              <p className="mt-1.5 text-sm leading-6 text-[#526D66]">{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
