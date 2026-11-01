import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Compass,
  Hospital,
  Search,
  Stethoscope,
} from "lucide-react";
import HeroIllustration from "@/components/HeroIllustration";

export const metadata: Metadata = {
  title: "DOCVY — Connected healthcare discovery and operations",
  description:
    "DOCVY is building a connected healthcare experience for patient discovery, doctors, clinics and hospitals.",
};

const discoveryCards = [
  {
    id: "doctors",
    category: "PATIENTS",
    title: "Find the right doctor",
    description:
      "Planned: explore specialties, credentials and provider profiles in one place.",
    icon: Stethoscope,
  },
  {
    id: "hospitals",
    category: "CARE DESTINATIONS",
    title: "Explore hospitals",
    description:
      "Planned: understand care destinations, departments and available services.",
    icon: Hospital,
  },
  {
    id: "clinics",
    category: "LOCAL CARE",
    title: "Discover clinics",
    description:
      "Planned: find local practices and learn about the services they provide.",
    icon: Building2,
  },
  {
    id: "appointments",
    category: "NEXT STEP",
    title: "Book an appointment",
    description:
      "Planned: move from discovery to a clear appointment request.",
    icon: CalendarCheck,
  },
];

const providerCards = [
  {
    number: "01",
    title: "DOCTOR EXPERIENCE",
    description:
      "A focused workspace planned for provider profiles, schedules and patient-facing workflows.",
  },
  {
    number: "02",
    title: "CLINIC MANAGEMENT",
    description:
      "A connected workspace planned for appointments, staff, services and daily practice operations.",
  },
  {
    number: "03",
    title: "HOSPITAL MANAGEMENT",
    description:
      "A scalable operational foundation planned for multi-department care delivery.",
  },
];

const proofPoints = [
  ["One platform", "For every care journey"],
  ["Connected workflows", "From discovery to operations"],
  ["Built for trust", "Clear provider information"],
  ["Designed to scale", "Clinic to hospital ecosystems"],
];

export default function Home() {
  return (
    <div className="home-shell overflow-hidden bg-[#F6FAF8] text-[#173A37]">
      <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_78%_35%,#D5F0E8_0%,#EAF5F1_38%,#F4FAF7_100%)]">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#DDF0E9]/80 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[8%] top-8 h-24 w-24 rounded-full bg-[#F6C9A9]/40 blur-2xl" />
        <div className="relative mx-auto grid min-h-[680px] max-w-[1440px] items-center gap-8 px-6 pb-16 pt-14 md:px-10 lg:grid-cols-[1fr_1fr] lg:px-[72px] lg:pb-20 lg:pt-10">
          <div className="relative z-10 max-w-[700px]">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/75 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#F39B72]" />
              CARE, CONNECTED
            </p>
            <h1 className="max-w-[700px] text-[43px] font-black leading-[1.04] tracking-[-0.052em] text-[#173A37] sm:text-[54px] lg:text-[64px]">
              Better care
              <br />
              starts with a
              <br />
              <span className="text-[#087F83]">better connection.</span>
            </h1>
            <p className="mt-7 max-w-[590px] text-base leading-8 text-[#526D66] md:text-[17px]">
              Find trusted care, connect with the right providers, and manage
              healthcare operations — all through one connected platform.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#discovery"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#087F83] px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(8,127,131,0.2)] transition hover:-translate-y-0.5 hover:bg-[#066D70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F83]"
              >
                Explore care <ArrowRight size={17} />
              </Link>
              <Link
                href="#provider-ecosystem"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#B7D2C9] bg-white/80 px-6 text-sm font-bold text-[#173A37] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087F83]"
              >
                Explore DOCVY
              </Link>
            </div>
            <p className="mt-5 text-xs leading-5 text-[#526D66]">
              A connected healthcare platform in development.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[590px] pb-20 lg:pb-16">
            <div className="absolute -right-3 top-10 h-20 w-20 rounded-[28px] bg-[#F4B38E]/70 rotate-12" aria-hidden="true" />
            <div className="absolute -left-4 bottom-28 h-16 w-16 rounded-full bg-[#B9E1D5]" aria-hidden="true" />
            <HeroIllustration />
            <div className="absolute -bottom-1 left-1/2 w-[min(100%,520px)] -translate-x-1/2 rounded-[22px] border border-[#DCEAE5] bg-white/95 p-4 shadow-[0_22px_60px_rgba(23,58,55,0.16)] backdrop-blur sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[11px] font-extrabold tracking-[0.12em] text-[#526D66]">
                  DISCOVERY, WITHOUT THE FRICTION
                </p>
                <span className="rounded-full bg-[#DDF0E9] px-3 py-1 text-[10px] font-extrabold tracking-wide text-[#087F83]">
                  IN DEVELOPMENT
                </span>
              </div>
              <div className="mt-4 flex min-h-[54px] items-center gap-3 rounded-xl border border-[#DCEAE5] bg-[#F6FAF8] px-4 text-sm text-[#789089]">
                <Search size={19} className="shrink-0 text-[#087F83]" />
                <span>Doctor, specialty, hospital or clinic</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-[11px] leading-5 text-[#526D66]">
                  Live provider search is not available yet.
                </span>
                <span className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-[#EAF5F1] px-3 text-xs font-bold text-[#087F83]">
                  Preview <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Platform principles"
        className="border-b border-[#E4EEE9] bg-white"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-7 px-6 py-8 sm:grid-cols-4 lg:px-[72px] lg:py-9">
          {proofPoints.map(([title, detail], index) => (
            <div
              key={title}
              className={index > 0 ? "sm:border-l sm:border-[#DCEAE5] sm:pl-6 lg:pl-8" : ""}
            >
              <p className="text-sm font-bold text-[#173A37]">{title}</p>
              <p className="mt-1 text-xs text-[#526D66]">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="discovery"
        className="scroll-mt-24 bg-[#F6FAF8] py-20 md:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[72px]">
          <p className="text-xs font-bold tracking-[0.15em] text-[#087F83]">
            01 / PATIENT DISCOVERY
          </p>
          <h2 className="mt-5 max-w-[850px] text-3xl font-bold tracking-[-0.035em] text-[#173A37] md:text-[38px]">
            Start with what you need.
          </h2>
          <p className="mt-4 max-w-[900px] text-sm leading-7 text-[#526D66]">
            A clear front door to care — whether you know the specialist or are
            still exploring. Discovery experiences are being developed.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {discoveryCards.map(({ id, category, title, description, icon: Icon }) => (
              <article
                id={id}
                key={id}
                className="group flex min-h-[210px] scroll-mt-28 flex-col rounded-2xl border border-[#DCEAE5] bg-white p-6 shadow-[0_5px_24px_rgba(23,58,55,0.035)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(23,58,55,0.08)]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="h-1 w-11 rounded-full bg-[#16A6A1]" />
                  <Icon size={21} strokeWidth={1.7} className="text-[#087F83]" />
                </div>
                <p className="text-[10px] font-bold tracking-[0.13em] text-[#087F83]">
                  {category}
                </p>
                <h3 className="mt-3 text-[19px] font-bold tracking-tight text-[#173A37]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#526D66]">
                  {description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#789089]">
                    Planned experience
                  </span>
                  <ArrowDownRight
                    size={18}
                    className="text-[#087F83] transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="provider-ecosystem"
        className="scroll-mt-20 bg-[#123B38] py-20 text-white md:py-24"
      >
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-[72px]">
          <div className="max-w-[620px]">
            <p className="text-xs font-bold tracking-[0.15em] text-[#16A6A1]">
              02 / THE PROVIDER ECOSYSTEM
            </p>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.035em] text-white md:text-[38px]">
              One connected system.
              <br />
              Different ways to deliver care.
            </h2>
            <p className="mt-6 max-w-[560px] text-sm leading-7 text-[#D8E9E3]">
              Purpose-built experiences for the people and organisations behind
              every patient journey. Provider and operations tools are planned
              for future releases.
            </p>
            <Link
              href="#discovery"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#4D756F] px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore the platform <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {providerCards.map((card) => (
              <article
                key={card.number}
                className="flex min-h-[280px] flex-col rounded-2xl border border-[#315B55] bg-[#1C4D47] p-5 sm:min-h-[300px] sm:p-4 lg:p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#79BDB1]">
                    {card.number}
                  </span>
                  <CheckCircle2 size={17} className="text-[#79BDB1]" />
                </div>
                <h3 className="mt-9 text-sm font-bold leading-6 tracking-wide text-white">
                  {card.title}
                </h3>
                <p className="mt-4 text-xs leading-6 text-[#D8E9E3]">
                  {card.description}
                </p>
                <span className="mt-auto pt-6 text-[10px] font-bold uppercase tracking-[0.12em] text-[#79BDB1]">
                  Planned experience
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-6 text-sm text-[#526D66] sm:flex-row sm:items-center sm:justify-between lg:px-[72px]">
          <p className="font-semibold text-[#173A37]">
            Building a more connected healthcare experience.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-semibold text-[#087F83] hover:text-[#066D70]"
          >
            Contact DOCVY <Compass size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
