import BrandLogo from "./BrandLogo";
import Link from "next/link";
import { availableCities } from "@/lib/directory";
import { getDirectoryDoctors } from "@/lib/public-directory";
import FooterLinks from "./FooterLinks";

const careLinks = [
  ["/doctors", "Find doctors"], ["/specialties", "All specialties"], ["/surgery-guide", "Surgeries"],
  ["/care-guide", "Health guides"], ["/hospitals", "Hospitals"], ["/how-it-works", "How it works"],
] as const;
const companyLinks = [
  ["/pricing", "Pricing"], ["/about", "About"], ["/contact", "Contact"], ["/faqs", "FAQs"],
  ["/for-doctors", "For doctors & clinics"], ["/partner-with-us", "Partner with us"],
  ["/claim-profile", "Claim a profile"], ["/remove-profile", "Request removal"],
] as const;
const legalLinks = [
  ["/legal/privacy", "Privacy"], ["/legal/terms", "Terms"], ["/legal/refund", "Refunds"],
  ["/legal/disclaimer", "Medical disclaimer"], ["/grievance", "Grievance"],
] as const;

export default async function Footer() {
  const cities = availableCities(await getDirectoryDoctors(), 3).slice(0, 6);
  const sections = [
    { heading: "Find care", links: careLinks },
    { heading: "DOCVY", links: companyLinks },
    ...(cities.length ? [{ heading: "Popular cities", links: [...cities.map(city => ["/doctors/" + city.slug, city.name] as const), ["/doctors", "All covered cities"] as const] }] : []),
  ];

  return <>
    <p className="border-t border-line px-5 py-3 text-center text-sm text-danger">In an emergency, call <a href="tel:112" className="inline-flex min-h-11 items-center font-semibold underline">112</a> or go to the nearest hospital.</p>
    <footer className="site-footer border-t border-line text-sm">
      <div className="mx-auto grid max-w-site gap-5 px-5 py-7 sm:px-8 md:grid-cols-3 md:gap-10 md:py-9 lg:grid-cols-4">
        <div className="min-w-0">
          <Link href="/" aria-label="DOCVY home" className="site-logo inline-flex min-h-11 items-center"><BrandLogo darkBackground /></Link>
          <p className="mt-2 max-w-sm leading-6">Find doctors and prepare for your next visit.</p>
          <a href="mailto:contact@docvy.in" className="inline-flex min-h-11 items-center hover:underline">contact@docvy.in</a>
          <p className="mt-2 text-xs leading-5">Operated by DSS Global Technologies Private Limited.</p>
          <address className="mt-1 max-w-sm text-xs not-italic leading-5">Sector 48, Gurugram, Haryana 122101, India.</address>
        </div>
        <nav aria-label="Footer" className="min-w-0 md:col-span-2 md:contents"><FooterLinks sections={sections} /></nav>
      </div>
      <div className="border-t border-line"><div className="mx-auto max-w-site px-5 py-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-6"><p className="text-xs">© {new Date().getFullYear()} DOCVY. All rights reserved.</p><nav aria-label="Legal" className="flex flex-wrap gap-x-4 text-xs">{legalLinks.map(([href, label]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center hover:underline">{label}</Link>)}</nav></div>
        <p className="mt-1 max-w-5xl text-xs leading-5">DOCVY helps you find doctors and prepare for visits. It does not provide emergency care or replace medical advice.</p>
      </div></div>
    </footer>
  </>;
}
