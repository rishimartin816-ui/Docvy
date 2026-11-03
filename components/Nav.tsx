"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const patientLinks = [
  ["/specialties", "Specialties"],
  ["/surgery-guide", "Surgery guide"],
  ["/care-guide", "Patient guides"],

] as const;

const providerLinks = [
  ["/for-clinics", "For clinics"],
] as const;

type NavigationLink = readonly [string, string];

function isCurrentSection(href: string, pathname: string) {
  if (pathname === href) return true;
  if (href === "/specialties") return pathname.startsWith("/specialties/");
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
        ? `block min-h-11 rounded-xl px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245a46] ${active ? "bg-[#e0efe5] text-[#245a46]" : "text-[#41584d] hover:bg-[#fbfcf8] hover:text-[#245a46]"}`
        : `rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${active ? "bg-[#dff1e2] text-[#183e31]" : "text-white hover:bg-white/15"}`}
    >
      {label}
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[#d5e5da] bg-[#183e31] backdrop-blur">
      <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between px-6 lg:h-[88px] lg:px-[72px]">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-head text-[21px] font-extrabold tracking-[0.035em] text-white"
          aria-label="DOCVY home"
        >
          <span aria-hidden="true" className="h-4 w-4 rounded-[5px] bg-[#c0e6c9] lg:h-[18px] lg:w-[18px]" />
          DOCVY
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-2 lg:flex">
          <div role="group" aria-label="Patient resources" className="flex items-center gap-1">
            {patientLinks.map((item) => renderLink(item, pathname))}
          </div>
          <span aria-hidden="true" className="mx-1 h-6 w-px bg-[#d5e5da]" />
          <div role="group" aria-label="Provider resources" className="flex items-center gap-1">
            {providerLinks.map((item) => renderLink(item, pathname))}
          </div>
        </nav>

        <Link
          href="/doctors"
          aria-current={pathname === "/doctors" ? "page" : undefined}
          className="hidden min-h-11 items-center justify-center gap-2 rounded-xl bg-[#dff1e2] px-5 text-sm font-bold text-[#183e31] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:inline-flex"
        >
          Find a doctor <ArrowUpRight size={16} />
        </Link>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-[#d5e5da] text-white lg:hidden"
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
        className="border-t border-[#d5e5da] bg-white px-6 pb-5 pt-2 lg:hidden"
      >
          <div role="group" aria-label="Patient resources">
            <p className="px-3 pb-1 pt-3 text-[10px] font-extrabold tracking-[0.13em] text-[#41584d]">FOR PATIENTS</p>
            <div className="space-y-1">{patientLinks.map((item) => renderLink(item, pathname, true, () => setOpen(false)))}</div>
          </div>
          <div role="group" aria-label="Provider resources" className="mt-2 border-t border-[#E8F0EC] pt-2">
            <p className="px-3 pb-1 pt-3 text-[10px] font-extrabold tracking-[0.13em] text-[#41584d]">FOR PROVIDERS</p>
            <div className="space-y-1">{providerLinks.map((item) => renderLink(item, pathname, true, () => setOpen(false)))}</div>
          </div>
          <Link
            href="/doctors"
            aria-current={pathname === "/doctors" ? "page" : undefined}
            onClick={() => setOpen(false)}
            className={`mt-4 flex min-h-11 items-center justify-center rounded-xl text-sm font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245a46] focus-visible:ring-offset-2 ${pathname === "/doctors" ? "bg-[#194535]" : "bg-[#245a46] hover:bg-[#194535]"}`}
          >
            Find a doctor
          </Link>
      </nav>
    </header>
  );
}
