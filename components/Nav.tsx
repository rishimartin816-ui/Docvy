"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { specialties } from "@/lib/care-directory";
const links=[["/hospitals","Hospitals"],["/surgery-guide","Surgeries"],["/care-guide","Health guides"],["/for-doctors","For clinics & doctors"]] as const;
export default function Nav(){
 const path=usePathname();const [open,setOpen]=useState(false);const panel=useRef<HTMLDivElement>(null);const menu=useRef<HTMLButtonElement>(null);const dropdown=useRef<HTMLDetailsElement>(null);
 const current=(href:string)=>path===href?"page":undefined;
 useEffect(()=>{if(!open)return;const trigger=menu.current;const before=document.body.style.overflow;document.body.style.overflow="hidden";panel.current?.querySelector<HTMLElement>('button')?.focus();
 const key=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false);if(e.key==="Tab"){const nodes=Array.from(panel.current?.querySelectorAll<HTMLElement>('a,button,summary')??[]).filter(n=>n.getClientRects().length);const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}};
 const resize=()=>{if(innerWidth>=1024)setOpen(false);};document.addEventListener('keydown',key);window.addEventListener('resize',resize);return()=>{document.body.style.overflow=before;document.removeEventListener('keydown',key);window.removeEventListener('resize',resize);trigger?.focus();};},[open]);
 return <header className={"site-header sticky top-0 z-30 border-b border-line "+(path==="/"?"site-header-home":"")}>
 {process.env.NEXT_PUBLIC_DEMO_MODE==="true"&&<p className="bg-primary-tint px-4 py-2 text-center text-[13px] text-ink">Demo mode: doctors shown are fictional.</p>}
 <div className="mx-auto flex h-16 max-w-site items-center justify-between gap-4 px-5 sm:px-8 lg:h-[72px]">
 <Link href="/" aria-label="DOCVY home" className="site-logo inline-flex min-h-12 items-center gap-2 font-head text-xl font-bold text-ink"><Image src="/icon.svg" alt="" width={29} height={29} unoptimized/>DOCVY</Link>
 <div ref={panel} id="docvy-navigation" role={open?"dialog":undefined} aria-modal={open?true:undefined} aria-label={open?"Main menu":undefined} className={open?"fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white p-5 text-ink":"hidden lg:block"}>
 {open&&<div className="flex items-center justify-between border-b border-line pb-3"><span className="text-xl font-semibold">Menu</span><button type="button" onClick={()=>setOpen(false)} aria-label="Close menu" className="grid h-12 w-12 place-items-center"><X strokeWidth={1.5}/></button></div>}
 <nav aria-label="Main" className="flex flex-1 flex-col gap-2 lg:flex-row lg:items-center lg:gap-5">
 <details ref={dropdown} className="relative" onKeyDown={e=>{if(e.key==="Escape"){dropdown.current?.removeAttribute('open');dropdown.current?.querySelector('summary')?.focus();}}}><summary className="site-nav-link flex min-h-12 cursor-pointer list-none items-center gap-1 whitespace-nowrap text-sm font-medium">Find doctors<ChevronDown size={16} strokeWidth={1.5}/></summary>
 <ul className="grid grid-cols-2 gap-2 bg-white p-3 lg:absolute lg:left-0 lg:top-full lg:w-[380px] lg:rounded-card lg:border lg:border-line">{specialties.map(({slug,name})=><li key={slug}><Link href={"/doctors/specialty/"+slug} aria-current={current("/doctors/specialty/"+slug)} onClick={()=>{setOpen(false);dropdown.current?.removeAttribute('open');}} className="flex min-h-11 items-center text-sm hover:underline">{name}</Link></li>)}<li className="col-span-2"><Link href="/specialties" className="flex min-h-11 items-center font-medium underline" onClick={()=>setOpen(false)}>View all specialties</Link></li></ul></details>
 {links.map(([href,label])=><Link href={href} key={href} aria-current={current(href)} onClick={()=>setOpen(false)} className="site-nav-link flex min-h-12 items-center whitespace-nowrap text-sm font-medium hover:underline">{label}</Link>)}
 <Link href="/login" aria-current={current('/login')} onClick={()=>setOpen(false)} className="flex min-h-12 items-center text-sm font-medium hover:underline">Log in</Link><Link href="/doctors" onClick={()=>setOpen(false)} className="site-header-cta docvy-pill docvy-pill-primary mt-4 lg:mt-0">Find a doctor</Link>
 </nav></div>
 <div className="flex items-center gap-1 lg:hidden"><Link href="/doctors" aria-label="Search for a doctor" className="grid h-12 w-12 place-items-center"><Search size={22} strokeWidth={1.5}/></Link><button ref={menu} type="button" aria-label="Open menu" aria-expanded={open} aria-controls="docvy-navigation" onClick={()=>setOpen(true)} className="grid h-12 w-12 place-items-center"><Menu size={24} strokeWidth={1.5}/></button></div>
 </div></header>;
}
