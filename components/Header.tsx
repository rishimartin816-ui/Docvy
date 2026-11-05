"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const specialties = [
  ["general-medicine", "General medicine"], ["cardiology", "Cardiology"], ["dermatology", "Dermatology"],
  ["orthopaedics", "Orthopaedics"], ["paediatrics", "Paediatrics"], ["gynaecology", "Gynaecology"],
  ["ophthalmology", "Ophthalmology"], ["ent", "ENT"],
] as const;

const links = [
  ["/surgery-guide", "Surgeries"], ["/care-guide", "Health guides"], ["/for-clinics", "For clinics"],
] as const;

export default function Header() {
  const pathname = usePathname();
  const mobile = useRef<HTMLDialogElement>(null);
  const menu = useRef<HTMLButtonElement>(null);
  const desktop = useRef<HTMLDetailsElement>(null);
  const current = (href: string) => pathname === href ? "page" : undefined;
  const close = () => mobile.current?.close();

  return <><p className="bg-lavender px-5 py-2.5 text-center text-xs leading-6 text-plum sm:text-sm">In an emergency, call <a href="tel:112" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">112</a> or go to the nearest hospital.</p><header className="sticky top-0 z-30 border-b border-line bg-porcelain">
    {process.env.NEXT_PUBLIC_DEMO_MODE === "true" && <p className="bg-primary-tint px-4 py-2 text-center text-[13px] text-ink">Demo mode: doctors shown are fictional.</p>}
    <div className="mx-auto flex h-16 max-w-site items-center justify-between gap-4 px-5 sm:px-8 lg:h-[72px]">
      <Link href="/" aria-label="DOCVY home" className="inline-flex min-h-12 items-center gap-2 font-head text-xl font-semibold text-plum">
        <Image src="/icon.svg" alt="" width={29} height={29} unoptimized /> DOCVY
      </Link>
      <nav aria-label="Main" className="hidden items-center gap-5 lg:flex">
        <details ref={desktop} className="relative" onKeyDown={(event) => {
          if (event.key === "Escape") { desktop.current?.removeAttribute("open"); desktop.current?.querySelector("summary")?.focus(); }
        }}>
          <summary className="flex min-h-12 cursor-pointer list-none items-center gap-1 whitespace-nowrap text-sm font-medium">
            Find doctors <ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" />
          </summary>
          <ul className="absolute left-0 top-full grid w-[360px] grid-cols-2 gap-x-2 rounded-card border border-line bg-porcelain p-3">
            {specialties.map(([slug, label]) => {
              const href = "/doctors/specialty/" + slug;
              return <li key={slug}><Link href={href} aria-current={current(href)} onClick={() => desktop.current?.removeAttribute("open")} className="flex min-h-11 items-center px-2 text-sm hover:underline">{label}</Link></li>;
            })}
            <li className="col-span-2"><Link href="/specialties" aria-current={current("/specialties")} onClick={() => desktop.current?.removeAttribute("open")} className="flex min-h-11 items-center px-2 font-medium text-primary hover:underline">View all specialties</Link></li>
          </ul>
        </details>
        {links.map(([href, label]) => <Link key={href} href={href} aria-current={current(href)} className="flex min-h-12 items-center whitespace-nowrap text-sm font-medium hover:underline">{label}</Link>)}
      </nav>
      <div className="hidden items-center gap-4 lg:flex">
        <Link href="/for-clinics" aria-current={current("/for-clinics")} className="flex min-h-12 items-center whitespace-nowrap text-sm font-medium hover:underline">Log in</Link>
        <Link href="/doctors" aria-current={current("/doctors")} className="docvy-pill docvy-pill-primary">Find a doctor</Link>
      </div>
      <div className="flex items-center gap-1 lg:hidden">
        <Link href="/doctors" aria-label="Search for a doctor" aria-current={current("/doctors")} className="grid h-12 w-12 place-items-center"><Search size={22} strokeWidth={1.5} /></Link>
        <button ref={menu} type="button" aria-label="Open menu" aria-haspopup="dialog" aria-controls="docvy-mobile-menu" onClick={() => mobile.current?.showModal()} className="grid h-12 w-12 place-items-center"><Menu size={24} strokeWidth={1.5} /></button>
      </div>
    </div>
    <dialog id="docvy-mobile-menu" ref={mobile} aria-labelledby="mobile-menu-title" onClose={() => menu.current?.focus()} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-porcelain p-0 text-ink">
      <div className="flex h-full flex-col">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <h2 id="mobile-menu-title" className="font-head text-xl font-semibold">Menu</h2>
          <button type="button" aria-label="Close menu" onClick={close} className="grid h-12 w-12 place-items-center"><X size={24} strokeWidth={1.5} /></button>
        </div>
        <nav aria-label="Main" className="min-h-0 flex-1 overflow-y-auto px-5 py-2">
          <details><summary className="flex min-h-12 cursor-pointer items-center gap-2 font-medium">Find doctors <ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" /></summary>
            <ul className="pl-4">{specialties.map(([slug, label]) => {
              const href = "/doctors/specialty/" + slug;
              return <li key={slug}><Link href={href} aria-current={current(href)} onClick={close} className="flex min-h-12 items-center">{label}</Link></li>;
            })}<li><Link href="/specialties" aria-current={current("/specialties")} onClick={close} className="flex min-h-12 items-center text-primary">View all specialties</Link></li></ul>
          </details>
          {links.map(([href, label]) => <Link key={href} href={href} aria-current={current(href)} onClick={close} className="flex min-h-12 items-center border-t border-line font-medium">{label}</Link>)}
          <Link href="/for-clinics" aria-current={current("/for-clinics")} onClick={close} className="flex min-h-12 items-center border-t border-line font-medium">Log in</Link>
        </nav>
        <div className="shrink-0 border-t border-line p-5"><Link href="/doctors" aria-current={current("/doctors")} onClick={close} className="docvy-pill docvy-pill-primary w-full">Find a doctor</Link></div>
      </div>
    </dialog>
  </header></>;
}
