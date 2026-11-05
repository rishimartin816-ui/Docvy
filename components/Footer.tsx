import Link from "next/link";
import Image from "next/image";
import FooterIllustration from "./footer/FooterIllustration";

const care = [["Find doctors", "/doctors"], ["Specialties", "/specialties"], ["Surgeries", "/surgery-guide"], ["Guides", "/care-guide"], ["How it works", "/how-it-works"]];
const company = [["For doctors", "/for-doctors"], ["For clinics", "/for-clinics"], ["Pricing", "/pricing"], ["About", "/about"], ["Contact", "/contact"], ["FAQs", "/faqs"]];
const legal = [["Privacy", "/legal/privacy"], ["Terms", "/legal/terms"], ["Refunds", "/legal/refund"], ["Medical disclaimer", "/legal/disclaimer"], ["Grievance", "/grievance"]];

export default function Footer() {
  return <footer className="border-t border-taupe bg-sand text-sm text-ink">
    <FooterIllustration />
    <div className="calm-wrap py-12 md:py-16">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
        <div>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 font-head text-xl font-semibold text-plum" aria-label="DOCVY home"><Image src="/icon.svg" width={30} height={30} alt="" unoptimized />DOCVY</Link>
          <p className="mt-4 max-w-[35ch] leading-7">Find doctors, explore care options and feel more prepared for your next visit.</p>
          <a href="mailto:contact@docvy.in" className="mt-3 inline-flex min-h-11 items-center text-plum underline-offset-4 hover:text-mulberry hover:underline">contact@docvy.in</a>
        </div>
        <nav aria-label="Find care"><h2 className="!text-base font-semibold">Find care</h2><ul className="mt-3">{care.map(([label, href]) => <li key={href}><Link href={href} className="inline-flex min-h-11 items-center hover:text-mulberry hover:underline">{label}</Link></li>)}</ul></nav>
        <nav aria-label="DOCVY company"><h2 className="!text-base font-semibold">DOCVY</h2><ul className="mt-3">{company.map(([label, href]) => <li key={href}><Link href={href} className="inline-flex min-h-11 items-center hover:text-mulberry hover:underline">{label}</Link></li>)}</ul></nav>
      </div>
      <div className="mt-10 border-t border-taupe pt-6">
        <nav aria-label="Legal" className="flex flex-wrap gap-x-5">{legal.map(([label, href]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center text-plum underline-offset-4 hover:text-mulberry hover:underline">{label}</Link>)}</nav>
        <p className="mt-3 max-w-[75ch] leading-7">DOCVY helps you find doctors and prepare for visits. It does not provide emergency care or replace medical advice. In an emergency, call <a href="tel:112" className="inline-flex min-h-11 items-center font-medium text-plum underline">112</a> or go to the nearest hospital.</p>
        <p className="mt-5">© {new Date().getFullYear()} DOCVY. All rights reserved.</p>
      </div>
    </div>
  </footer>;
}
