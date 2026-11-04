import Link from "next/link";
import { indexableCities, directoryProcedures, popularProcedures } from "@/lib/directory";
import { specialties } from "@/lib/care-directory";
import Image from "next/image";
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
    <footer className="border-t border-line bg-porc text-sm">
      <div className="mx-auto grid max-w-site gap-10 px-6 py-12 md:grid-cols-[1.3fr_.8fr_1fr] sm:px-8 lg:py-14">
        <div>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2.5 font-head text-[22px] font-extrabold tracking-[0.035em] text-[#402442]"
          >
            <Image src="/icon.svg" alt="" width={29} height={29} unoptimized className="shrink-0" />
            DOCVY
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-grey">
            DOCVY is building healthcare discovery and provider tools for people and care teams across India.
          </p>
          <p className="mt-5 flex max-w-sm items-start gap-2 text-xs leading-5 text-grey">
            <ShieldCheck strokeWidth={1.5} size={16} className="mt-0.5 shrink-0 text-[#402442]" />
            The directory currently shows fictional demo data. {intakeEnabled ? "Enquiries go to DOCVY; bookings are not confirmed here." : "Appointment enquiries are currently closed."}
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#402442]">
            Platform
          </h2>
          {platformLinks.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="flex min-h-11 items-center rounded py-1.5 text-grey transition-colors hover:text-[#402442]"
            >
              {label}
            </Link>
          ))}
          <Link href="/pricing" className="flex min-h-11 items-center rounded py-1.5 text-grey transition-colors hover:text-[#402442]">
            Clinic &amp; hospital plans
          </Link>
          <Link href="/for-doctors" className="flex min-h-11 items-center rounded py-1.5 text-grey transition-colors hover:text-[#402442]">
            For doctors
          </Link>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#402442]">
            Policies & support
          </h2>
          {policyLinks.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="flex items-center min-h-11 gap-2 rounded py-1.5 text-grey transition-colors hover:text-[#402442]"
            >
              <FileText strokeWidth={1.5} size={14} />
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 inline-flex min-h-11 items-center gap-2 py-1.5 font-semibold text-[#402442] hover:text-[#593456]"
          >
            Contact DOCVY <Mail strokeWidth={1.5} size={14} /> <ArrowUpRight strokeWidth={1.5} size={13} />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-site px-6 pb-7 sm:px-8">
        <nav aria-label="Care directories" className="flex flex-wrap gap-x-4 gap-y-2">
          {indexableCities.map(({ slug, name }) => <Link key={slug} href={"/doctors/" + slug} className="inline-flex min-h-11 items-center underline">Doctors in {name}</Link>)}
          {specialties.map(({ slug, name }) => <Link key={slug} href={"/specialties/" + slug} className="inline-flex min-h-11 items-center underline">{name}</Link>)}
          {directoryProcedures.filter(({ slug }) => popularProcedures.includes(slug)).map(({ slug, name }) => <Link key={slug} href={"/surgeries/" + slug} className="inline-flex min-h-11 items-center underline">{name}</Link>)}
        </nav>
        <p className="mt-4 font-semibold">In an emergency, call <a href="tel:112" className="inline-flex min-h-11 items-center underline">112</a> or go to the nearest hospital.</p>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-site px-6 py-5 text-xs leading-5 text-grey sm:px-8">
          © {new Date().getFullYear()} DOCVY. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
