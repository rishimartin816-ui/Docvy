import Image from "next/image";
import Link from "next/link";
import IllustrationBackground from "@/components/IllustrationBackground";
import { indexableCities } from "@/lib/directory";

const careLinks = [
  ["/doctors", "Find doctors"], ["/specialties", "All specialties"], ["/surgery-guide", "Surgeries"],
  ["/care-guide", "Health guides"], ["/how-it-works", "How it works"],
] as const;

const specialtyLinks = [
  ["general-medicine", "General medicine"], ["cardiology", "Cardiology"], ["dermatology", "Dermatology"],
  ["orthopaedics", "Orthopaedics"], ["paediatrics", "Paediatrics"], ["gynaecology", "Gynaecology"],
  ["ophthalmology", "Ophthalmology"], ["ent", "ENT"],
].map(([slug, label]) => ["/doctors/specialty/" + slug, label] as const);

const teamLinks = [
  ["/for-doctors", "For doctors"], ["/for-clinics", "For clinics"], ["/pricing", "Pricing"],
  ["/about", "About"], ["/contact", "Contact"], ["/faqs", "FAQs"],
] as const;

const legalLinks = [
  ["/legal/privacy", "Privacy"], ["/legal/terms", "Terms"], ["/legal/refund", "Refunds"],
  ["/legal/disclaimer", "Medical disclaimer"], ["/grievance", "Grievance"],
] as const;

function LinkList({ links }: { links: readonly (readonly [string, string])[] }) {
  return <ul>{links.map(([href, label]) => <li key={href}><Link href={href} className="inline-flex min-h-11 items-center text-ink hover:underline">{label}</Link></li>)}</ul>;
}

export default function Footer() {
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
    <footer className="border-t border-line bg-surface text-sm text-grey">
      <IllustrationBackground slug="footer-care-together" alt="" footer />
      <nav aria-label="Footer" className={"mx-auto max-w-site gap-6 px-5 py-10 sm:px-8 md:grid " + (indexableCities.length ? "md:grid-cols-5" : "md:grid-cols-4")}>
        <div className="mb-6 md:mb-0">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 font-head text-xl font-bold text-ink"><Image src="/icon.svg" alt="" width={29} height={29} unoptimized /> DOCVY</Link>
          <p className="mt-2 leading-6">Find doctors, explore specialties, and prepare for appointments across India.</p>
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
