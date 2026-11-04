import Link from "next/link";
import { ArrowRight, CalendarClock, ExternalLink, MapPin, ShieldCheck } from "lucide-react";

const checks = [
  {
    icon: ExternalLink,
    step: "01",
    title: "Open the hospital source",
    text: "Each listed profile links to the hospital page DOCVY used. Check that page for the provider’s latest details.",
  },
  {
    icon: MapPin,
    step: "02",
    title: "Confirm the exact facility",
    text: "A doctor may appear at more than one location. Ask which branch and department handles appointments.",
  },
  {
    icon: CalendarClock,
    step: "03",
    title: "Ask about availability and fees",
    text: "Contact the hospital or clinic directly. DOCVY has not checked live slots and does not reserve or charge for appointments.",
  },
];

export default function ProviderSourceGuide() {
  return (
    <section
      className="relative isolate overflow-hidden border-y border-[#DCE5E8] bg-[#E3F2F0] py-16 md:py-20"
      aria-labelledby="provider-source-heading"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#DCE5E8] blur-3xl" />
      <div className="relative mx-auto grid max-w-[1440px] gap-9 px-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-[72px]">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#DCE5E8] bg-white/85 px-3 py-2 text-[11px] font-extrabold tracking-[0.13em] text-[#0F2A3D]">
            <ShieldCheck strokeWidth={1.5} size={14} aria-hidden="true" /> USE A LISTING AS A STARTING POINT
          </p>
          <h2 id="provider-source-heading" className="mt-5 text-3xl font-bold leading-tight tracking-[-0.04em] text-[#0F2A3D] md:text-[38px]">
            Find a profile. Check the source. Confirm with the provider.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5B6B7A] md:text-base">
            DOCVY’s current directory links to publicly listed hospital information. A source link helps you check the provider’s details; it does not mean DOCVY has independently verified credentials, location or appointment availability.
          </p>
          <Link href="/doctors" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0F2A3D] px-5 text-sm font-bold text-white transition hover:bg-[#0F2A3D]">
            Browse current doctor listings <ArrowRight strokeWidth={1.5} size={16} aria-hidden="true" />
          </Link>
        </div>

        <ol className="grid gap-3 md:grid-cols-3">
          {checks.map(({ icon: Icon, step, title, text }) => (
            <li key={step} className="flex min-h-[228px] flex-col rounded-2xl border border-[#DCE5E8] bg-white p-5  md:p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E3F2F0] text-[#0F2A3D]">
                  <Icon strokeWidth={1.5} size={19} aria-hidden="true" />
                </span>
                <span className="text-[11px] font-extrabold tracking-[0.12em] text-[#5B6B7A]">{step}</span>
              </div>
              <h3 className="mt-6 text-base font-bold leading-6 text-[#0F2A3D]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5B6B7A]">{text}</p>
            </li>
          ))}
        </ol>
        <p className="text-xs leading-5 text-[#5B6B7A] lg:col-start-2">
          DOCVY is a discovery service, not medical care. For an emergency in India, call 112 or go to the nearest emergency department.
        </p>
      </div>
    </section>
  );
}
