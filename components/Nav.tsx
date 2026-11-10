"use client";

import BrandLogo from "./BrandLogo";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { specialties } from "@/lib/care-directory";

const links = [
  ["/hospitals", "Hospitals"], ["/surgery-guide", "Surgeries"],
  ["/care-guide", "Health guides"], ["/for-doctors", "For clinics & doctors"],
] as const;

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const menu = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDetailsElement>(null);
  const current = (href: string) => path === href ? "page" : undefined;
  const close = () => { dropdown.current?.removeAttribute("open"); setOpen(false); };

  useEffect(() => {
    if (!open || !dialog.current) return;
    const modal = dialog.current;
    const trigger = menu.current;
    const previousOverflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = "hidden";
    const resize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", resize);
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("resize", resize);
      if (trigger?.getClientRects().length) trigger.focus();
    };
  }, [open]);

  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (dialog.current?.open) return;
      if (event.target instanceof Node && !dropdown.current?.contains(event.target)) dropdown.current?.removeAttribute("open");
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);

  const navigation = <nav id="docvy-navigation" aria-label="Main" className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-5">
    <details ref={dropdown} className="relative" onKeyDown={event => {
      if (event.key === "Escape" && !open) { dropdown.current?.removeAttribute("open"); dropdown.current?.querySelector("summary")?.focus(); }
    }}>
      <summary className="site-nav-link flex min-h-12 cursor-pointer list-none items-center gap-1 whitespace-nowrap text-sm font-medium">
        Find doctors <ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" />
      </summary>
      <ul className="grid grid-cols-2 gap-2 bg-white p-3 text-ink lg:absolute lg:left-0 lg:top-full lg:w-[380px] lg:rounded-card lg:border lg:border-line">
        {specialties.map(({ slug, name }) => <li key={slug}><Link href={"/doctors/specialty/" + slug} aria-current={current("/doctors/specialty/" + slug)} onClick={close} className="flex min-h-11 items-center text-sm hover:underline">{name}</Link></li>)}
        <li className="col-span-2"><Link href="/specialties" onClick={close} className="flex min-h-11 items-center font-medium underline">View all specialties</Link></li>
      </ul>
    </details>
    {links.map(([href, label]) => <Link key={href} href={href} aria-current={current(href)} onClick={close} className="site-nav-link flex min-h-12 items-center whitespace-nowrap text-sm font-medium hover:underline">{label}</Link>)}
    <Link href="/login" aria-current={current("/login")} onClick={close} className="flex min-h-12 items-center text-sm font-medium hover:underline">Log in</Link>
  </nav>;
  const action = <Link href="/doctors" onClick={close} className="site-header-cta docvy-pill docvy-pill-primary">Find a doctor</Link>;

  return <header className={"site-header sticky top-0 z-30 border-b border-line " + (path === "/" ? "site-header-home" : "")}>
    {process.env.NEXT_PUBLIC_DEMO_MODE === "true" && <p className="bg-primary-tint px-4 py-2 text-center text-[13px] text-ink">Demo mode: doctors shown are fictional.</p>}
    <div className="mx-auto flex h-16 max-w-site items-center justify-between gap-4 px-5 sm:px-8 lg:h-[72px]">
      <Link href="/" aria-label="DOCVY home" className="site-logo inline-flex min-h-12 shrink-0 items-center"><BrandLogo priority darkBackground={path === "/"} className="w-36 min-[380px]:w-[180px]" /></Link>
      {open ? createPortal(<dialog ref={dialog} aria-label="Main menu" onKeyDown={event => {
        if (event.key !== "Tab") return;
        const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),summary")).filter(item => item.getClientRects().length > 0);
        const first = items[0]; const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }} onCancel={event => { event.preventDefault(); close(); }} onClose={() => setOpen(false)} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-white p-0 text-ink">
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5"><h2 className="text-xl font-semibold">Menu</h2><button type="button" onClick={close} aria-label="Close menu" className="grid h-12 w-12 place-items-center"><X strokeWidth={1.5} aria-hidden="true" /></button></div>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-3">{navigation}</div>
          <div className="flex shrink-0 flex-col border-t border-line p-5">{action}</div>
        </div>
      </dialog>, document.body) : <div className="hidden items-center gap-4 lg:flex">{navigation}{action}</div>}
      <div className="flex items-center gap-1 lg:hidden"><Link href="/doctors" aria-label="Search for a doctor" className="inline-flex h-12 items-center gap-1.5 px-2"><Search size={20} strokeWidth={1.5} aria-hidden="true" /><span className="text-xs font-medium">Search</span></Link><button ref={menu} type="button" aria-label="Open menu" aria-expanded={open} aria-haspopup="dialog" aria-controls="docvy-navigation" onClick={() => setOpen(true)} className="grid h-12 w-12 place-items-center"><Menu size={24} strokeWidth={1.5} aria-hidden="true" /></button></div>
    </div>
  </header>;
}
