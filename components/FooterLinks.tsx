"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type Section = { heading: string; links: readonly (readonly [string, string])[] };

export default function FooterLinks({ sections }: { sections: Section[] }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const update = () => root.current?.querySelectorAll("details").forEach(details => { details.open = wide.matches; });
    update();
    wide.addEventListener("change", update);
    return () => wide.removeEventListener("change", update);
  }, []);

  return <div ref={root} className="min-w-0 md:col-span-2 md:grid md:grid-cols-3 md:gap-x-6 lg:col-span-3 lg:grid-cols-3">
    {sections.map(({ heading, links }) => <details key={heading} className="group border-t border-line md:border-0">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 font-semibold [&::-webkit-details-marker]:hidden"><span>{heading}</span><ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" className="shrink-0 group-open:rotate-180 md:hidden" /></summary>
      <ul className="grid grid-cols-2 gap-x-3 pb-4 md:block md:pb-0">{links.map(([href, label]) => <li key={href}><Link href={href} className="inline-flex min-h-11 items-center hover:underline">{label}</Link></li>)}</ul>
    </details>)}
  </div>;
}
