"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const patientLinks = [
  ["/care-guide", "Patient guide"],
  ["/doctors", "Doctor directory"],
] as const;

const providerLinks = [
  ["/for-doctors", "For doctors"],
  ["/pricing", "Clinic & hospital plans"],
] as const;

type NavigationLink = readonly [string, string];

function isCurrentSection(href: string, pathname: string) {
  if (pathname === href) return true;
  if (href === "/doctors") return pathname.startsWith("/doctors/");
  if (href === "/care-guide") return pathname.startsWith("/patient-guides/");
  return false;
}

function renderLink(
  [href, label]: NavigationLink,
  pathname: string,
  mobile = false,
  onSelect?: () => void,
) {
  const active = isCurrentSection(href, pathname);
  return (
    <Link
      key={href}
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={mobile ? onSelect : undefined}
      className={mobile
        ? `block min-h-11 rounded-xl px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F83] ${active ? "bg-[#EAF5F1] text-[#087F83]" : "text-[#526D66] hover:bg-[#F6FAF8] hover:text-[#087F83]"}`
        : `rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F83] ${active ? "bg-[#EAF5F1] text-[#087F83]" : "text-[#526D66] hover:bg-[#F6FAF8] hover:text-[#087F83]"}`}
    >
      {label}
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

        <nav aria-label="Main navigation" className="hidden items-center gap-2 md:flex">
          <div role="group" aria-label="Patient resources" className="flex items-center gap-1">
            {patientLinks.map((item) => renderLink(item, pathname))}
          </div>
          <span aria-hidden="true" className="mx-1 h-6 w-px bg-[#DCEAE5]" />
          <div role="group" aria-label="Provider resources" className="flex items-center gap-1">
            {providerLinks.map((item) => renderLink(item, pathname))}
          </div>
        </nav>

        <Link
          href="/contact"
          aria-current={pathname === "/contact" ? "page" : undefined}
          className={`hidden min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F83] focus-visible:ring-offset-2 md:inline-flex ${pathname === "/contact" ? "bg-[#066D70]" : "bg-[#087F83] hover:bg-[#066D70]"}`}
        >
          Contact DOCVY <ArrowUpRight size={16} />
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

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!open}
        className="border-t border-[#DCEAE5] bg-white px-6 pb-5 pt-2 md:hidden"
      >
          <div role="group" aria-label="Patient resources">
            <p className="px-3 pb-1 pt-3 text-[10px] font-extrabold tracking-[0.13em] text-[#526D66]">FOR PATIENTS</p>
            <div className="space-y-1">{patientLinks.map((item) => renderLink(item, pathname, true, () => setOpen(false)))}</div>
          </div>
          <div role="group" aria-label="Provider resources" className="mt-2 border-t border-[#E8F0EC] pt-2">
            <p className="px-3 pb-1 pt-3 text-[10px] font-extrabold tracking-[0.13em] text-[#526D66]">FOR PROVIDERS</p>
            <div className="space-y-1">{providerLinks.map((item) => renderLink(item, pathname, true, () => setOpen(false)))}</div>
          </div>
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            onClick={() => setOpen(false)}
            className={`mt-4 flex min-h-11 items-center justify-center rounded-xl text-sm font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F83] focus-visible:ring-offset-2 ${pathname === "/contact" ? "bg-[#066D70]" : "bg-[#087F83] hover:bg-[#066D70]"}`}
          >
            Contact DOCVY
          </Link>
      </nav>
    </header>
  );
}
