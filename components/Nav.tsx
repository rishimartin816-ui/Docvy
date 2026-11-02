"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  ["/#discovery", "Discover"],
  ["/#doctors", "For doctors"],
  ["/#clinics", "For clinics"],
  ["/#hospitals", "For hospitals"],
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#DCEAE5] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between px-6 lg:h-[88px] lg:px-[72px]">
        <Link
          href="/"
          className="font-head text-[21px] font-extrabold tracking-[0.07em] text-[#123B38]"
          aria-label="DOCVY home"
        >
          DOCVY
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {links.map(([href, label]) => (
            <Link
              key={label}
              href={href}
              className="text-[13px] font-semibold text-[#526D66] transition-colors hover:text-[#087F83]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden min-h-11 items-center justify-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-semibold text-white transition hover:bg-[#066D70] md:inline-flex"
        >
          Provider plans <ArrowUpRight size={16} />
        </Link>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-[#DCEAE5] text-[#173A37] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-[#DCEAE5] bg-white px-6 pb-5 pt-2 md:hidden"
        >
          {links.map(([href, label]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block border-b border-[#E8F0EC] py-3 text-sm font-semibold text-[#526D66]"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 flex min-h-11 items-center justify-center rounded-xl bg-[#087F83] text-sm font-semibold text-white"
          >
            Provider plans
          </Link>
        </nav>
      )}
    </header>
  );
}
