import Link from "next/link";
import Image from "next/image";
import HealthcareBackdrop from "@/components/HealthcareBackdrop";
import { ArrowUpRight, FileText, Mail, ShieldCheck } from "lucide-react";
import { isAppointmentIntakeConfigured } from "@/lib/appointment-intake";

const platformLinks = [
  ["/care-guide", "Patient guide: conditions & specialties"],
  ["/doctors", "Doctor directory status"],
  ["/how-it-works", "How finding care will work"],
  ["/faqs", "Patient and provider FAQs"],
] as const;

const policyLinks = [
  ["/legal/privacy", "Privacy policy"],
  ["/legal/terms", "Terms of service"],
  ["/legal/refund", "Cancellation and refunds"],
  ["/legal/disclaimer", "Medical disclaimer"],
  ["/grievance", "Grievance redressal"],
] as const;

export default function Footer() {
  const intakeEnabled = isAppointmentIntakeConfigured();
  return (
    <footer className="relative isolate overflow-hidden border-t border-[#e5e5ea] bg-[#fafafb] text-sm">
      <HealthcareBackdrop className="pointer-events-none absolute -bottom-32 -right-36 -z-10 w-[420px] opacity-25 sm:-right-16 lg:right-0 lg:w-[560px]" />
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-12 md:grid-cols-[1.3fr_.8fr_1fr] lg:px-[72px] lg:py-14">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-head text-[22px] font-extrabold tracking-[0.035em] text-[#151518]"
          >
            <Image src="/icon.svg" alt="" width={29} height={29} unoptimized className="shrink-0" />
            DOCVY
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#545761]">
            DOCVY is building healthcare discovery and provider tools for people and care teams across India.
          </p>
          <p className="mt-5 flex max-w-sm items-start gap-2 text-xs leading-5 text-[#61636d]">
            <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#202124]" />
            The directory currently shows fictional demo data. {intakeEnabled ? "Enquiries go to DOCVY; bookings are not confirmed here." : "Appointment enquiries are currently closed."}
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#151518]">
            Platform
          </h2>
          {platformLinks.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="block rounded py-1.5 text-[#545761] transition-colors hover:text-[#202124]"
            >
              {label}
            </Link>
          ))}
          <Link href="/pricing" className="block rounded py-1.5 text-[#545761] transition-colors hover:text-[#202124]">
            Clinic &amp; hospital plans
          </Link>
          <Link href="/for-doctors" className="block rounded py-1.5 text-[#545761] transition-colors hover:text-[#202124]">
            For doctors
          </Link>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#151518]">
            Policies & support
          </h2>
          {policyLinks.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded py-1.5 text-[#545761] transition-colors hover:text-[#202124]"
            >
              <FileText size={14} />
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 inline-flex items-center gap-2 py-1.5 font-semibold text-[#202124] hover:text-[#383940]"
          >
            Contact DOCVY <Mail size={14} /> <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      <div className="border-t border-[#e5e5ea]">
        <div className="mx-auto max-w-[1440px] px-6 py-5 text-xs leading-5 text-[#61636d] lg:px-[72px]">
          © {new Date().getFullYear()} DOCVY. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
