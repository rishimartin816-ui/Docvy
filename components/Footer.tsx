import Image from "next/image";
import Link from "next/link";
import { availableCities } from "@/lib/directory";
import { getDirectoryDoctors } from "@/lib/public-directory";

const careLinks = [
  ["/doctors", "Find doctors"], ["/clinics", "Outpatient care"], ["/hospitals", "Hospitals"], ["/specialties", "All specialties"], ["/surgery-guide", "Surgeries"],
  ["/care-guide", "Health guides"], ["/how-it-works", "How it works"],
] as const;

const specialtyLinks = [
  ["general-medicine", "General medicine"], ["cardiology", "Cardiology"], ["dermatology", "Dermatology"],
  ["orthopaedics", "Orthopaedics"], ["paediatrics", "Paediatrics"], ["gynaecology", "Gynaecology"],
  ["ophthalmology", "Ophthalmology"], ["ent", "ENT"],
].map(([slug, label]) => ["/doctors/specialty/" + slug, label] as const);

const teamLinks = [
  ["/for-doctors", "For doctors"], ["/for-clinics", "For clinics"], ["/pricing", "Pricing"],
  ["/claim-profile", "Claim a profile"], ["/remove-profile", "Request removal"], ["/about", "About"], ["/contact", "Contact"], ["/faqs", "FAQs"],
] as const;

const legalLinks = [
  ["/legal/privacy", "Privacy"], ["/legal/terms", "Terms"], ["/legal/refund", "Refunds"],
  ["/legal/disclaimer", "Medical disclaimer"], ["/grievance", "Grievance"],
] as const;

function LinkList({ links }: { links: readonly (readonly [string, string])[] }) {
  return <ul>{links.map(([href, label]) => <li key={href}><Link href={href} className="inline-flex min-h-11 items-center text-ink hover:underline">{label}</Link></li>)}</ul>;
}

export default async function Footer() {
  const indexableCities = availableCities(await getDirectoryDoctors(), 3);
  const sections = [
    { heading: "Find care", links: careLinks },
    { heading: "Popular specialties", links: specialtyLinks },
    ...(indexableCities.length ? [{ heading: "Cities", links: indexableCities.map(({ slug, name }) => ["/doctors/" + slug, name] as const) }] : []),
    { heading: "DOCVY", links: teamLinks },
  ];

  return <>
    <p className="border-t border-line px-5 py-4 text-center text-sm text-danger">
      In an emergency, call <a href="tel:112" className="inline-flex min-h-11 items-center font-semibold underline">112</a> or go to the nearest hospital.
    </p>
    <footer className="site-footer border-t border-line text-sm">
      <div className="mx-auto max-w-site px-5 pt-14 sm:px-8"><p className="reference-eyebrow text-[#ACD5B5]">Doctor discovery & patient guides</p><p className="mt-4 max-w-xl font-head text-3xl font-medium leading-tight text-white sm:text-4xl">Find a doctor. Prepare for your visit.</p></div>
      <nav aria-label="Footer" className={"mx-auto max-w-site gap-6 px-5 py-10 sm:px-8 md:grid " + (indexableCities.length ? "md:grid-cols-5" : "md:grid-cols-4")}>
        <div className="mb-6 md:mb-0">
          <Link href="/" className="site-logo inline-flex min-h-11 items-center gap-2 font-head text-xl font-bold"><Image src="/icon.svg" alt="" width={29} height={29} unoptimized /> DOCVY</Link>
          <p className="footer-description mt-2 leading-6">Browse doctor profiles and read health guides to prepare for a conversation with your clinician.</p>
          <a href="mailto:contact@docvy.in" className="inline-flex min-h-11 items-center text-ink hover:underline">contact@docvy.in</a>
        </div>
        {sections.map(({ heading, links }) => <div key={heading}>
          <div className="hidden md:block"><h2 className="mb-2 font-semibold text-ink">{heading}</h2><LinkList links={links} /></div>
          <details className="border-t border-line md:hidden"><summary className="flex min-h-12 cursor-pointer items-center font-semibold text-ink">{heading}</summary><LinkList links={links} /></details>
        </div>)}
      </nav>
      <div className="border-t border-line">
        <div className="mx-auto max-w-site px-5 py-5 sm:px-8">
          <p>© {new Date().getFullYear()} DOCVY. All rights reserved.</p>
          <nav aria-label="Legal" className="mt-2 flex flex-wrap gap-x-4">{legalLinks.map(([href, label]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center text-ink hover:underline">{label}</Link>)}</nav>
          <p>DOCVY helps you find doctors and prepare for visits. It does not provide emergency care or replace medical advice.</p>
        </div>
      </div>
    </footer>
  </>;
}
