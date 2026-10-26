"use client";
import Link from "next/link";
import { useState } from "react";
const links = [["/how-it-works", "How it works"], ["/for-employees", "For employees"], ["/for-students", "For students"], ["/pricing", "Pricing"], ["/faqs", "FAQs"]];
export default function Nav() {
  const [open, setOpen] = useState(false);
  return (<header className="sticky top-0 z-20 border-b border-line bg-sand">
    <div className="mx-auto flex h-[68px] max-w-site items-center justify-between px-6">
      <Link href="/" className="font-head text-[22px] font-extrabold tracking-[.06em] text-plum" aria-label="Docvy home">DOCVY</Link>
      <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
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
