"use client";
import Link from "next/link";
import { useState } from "react";
const links = [["/how-it-works", "How it works"], ["/for-employees", "For employees"], ["/for-students", "For students"], ["/pricing", "Pricing"], ["/faqs", "FAQs"]];
export default function Nav() {
  const [open, setOpen] = useState(false);
  return (<header className="sticky top-0 z-30 border-b border-line/80 bg-porc/95 shadow-[0_4px_24px_rgba(64,36,66,.035)] backdrop-blur-md">
    <div className="mx-auto flex h-[76px] max-w-site items-center justify-between px-6">
      <Link href="/" className="group flex items-center gap-2.5 font-head text-[21px] font-extrabold tracking-[.055em] text-plum" aria-label="Docvy home"><span className="grid h-10 w-10 place-items-center rounded-[13px] bg-plum text-porc shadow-sm transition-transform group-hover:-rotate-3"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 3.8h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5.3A1.5 1.5 0 0 1 7.5 3.8Z"/><path d="M14 4v4h4M9 14h6M12 11v6"/></svg></span><span>DOCVY<span className="ml-2 hidden text-[10px] font-semibold tracking-[.12em] text-grey sm:inline">MEDICAL DOCUMENTATION</span></span></Link>
      <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
        {links.map(([h, l]) => <Link key={h} href={h} className="text-[15px] font-medium hover:text-mulb">{l}</Link>)}
        <Link href="/request" className="rounded-btn bg-plum px-5 py-3 text-[15px] font-semibold text-porc hover:bg-mulb">Request a certificate</Link>
      </nav>
      <button className="min-h-11 rounded-btn border-[1.5px] border-line px-3.5 text-sm font-semibold text-plum md:hidden" aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>Menu</button>
    </div>
    {open && <nav id="mnav" aria-label="Mobile" className="border-t border-line px-6 pb-5 md:hidden">
      {links.map(([h, l]) => <Link key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-line py-3 font-medium">{l}</Link>)}
      <Link href="/request" onClick={() => setOpen(false)} className="mt-4 flex min-h-12 items-center justify-center rounded-btn bg-plum font-semibold text-porc">Request a certificate</Link>
    </nav>}
  </header>);
}
