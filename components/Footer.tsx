import Link from "next/link";
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
    <footer className="border-t border-[#e8dac2] bg-[#fffbf1] text-sm">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-12 md:grid-cols-[1.3fr_.8fr_1fr] lg:px-[72px] lg:py-14">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-head text-[22px] font-extrabold tracking-[0.035em] text-[#2e281f]"
          >
            <span aria-hidden="true" className="h-4 w-4 rounded-full bg-[#f3cb74]" />
            DOCVY
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#5d5040]">
            DOCVY is building healthcare discovery and provider tools for people and care teams across India.
          </p>
          <p className="mt-5 flex max-w-sm items-start gap-2 text-xs leading-5 text-[#6d5d48]">
            <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#70501f]" />
            The directory currently shows fictional demo data. {intakeEnabled ? "Enquiries go to DOCVY; bookings are not confirmed here." : "Appointment enquiries are currently closed."}
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#2e281f]">
            Platform
          </h2>
          {platformLinks.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="block rounded py-1.5 text-[#5d5040] transition-colors hover:text-[#70501f]"
            >
              {label}
            </Link>
          ))}
          <Link href="/pricing" className="block rounded py-1.5 text-[#5d5040] transition-colors hover:text-[#70501f]">
            Clinic &amp; hospital plans
          </Link>
          <Link href="/for-doctors" className="block rounded py-1.5 text-[#5d5040] transition-colors hover:text-[#70501f]">
            For doctors
          </Link>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#2e281f]">
            Policies & support
          </h2>
          {policyLinks.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded py-1.5 text-[#5d5040] transition-colors hover:text-[#70501f]"
            >
              <FileText size={14} />
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 inline-flex items-center gap-2 py-1.5 font-semibold text-[#70501f] hover:text-[#563b16]"
          >
            Contact DOCVY <Mail size={14} /> <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      <div className="border-t border-[#e8dac2]">
        <div className="mx-auto max-w-[1440px] px-6 py-5 text-xs leading-5 text-[#6d5d48] lg:px-[72px]">
          © {new Date().getFullYear()} DOCVY. Product capabilities are subject to
          release and operational readiness.
        </div>
      </div>
    </footer>
  );
}
