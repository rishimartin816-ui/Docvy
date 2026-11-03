"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";

type Entry = { title: string; category: string; href: string; terms: string };

export default function CareLibrarySearch({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState("");
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const matches = words.length ? entries.filter(({ title, category, terms }) => {
    const text = [title, category, terms].join(" ").toLowerCase();
    return words.every((word) => text.includes(word));
  }) : [];

  return <div className="docvy-glass p-5 sm:p-7">
    <label htmlFor="care-library-search" className="block text-lg font-bold">Search conditions, specialties and procedures</label>
    <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#a6c7b5] bg-white px-4 focus-within:ring-2 focus-within:ring-[#245a46]">
      <Search size={20} className="shrink-0 text-[#245a46]" aria-hidden="true" />
      <input id="care-library-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try kidney stones or cataract" className="min-h-12 w-full bg-transparent text-[#1e3028] outline-none" aria-controls="care-library-results" />
    </div>
    <div id="care-library-results" className="mt-3">
      <p role="status" className="text-sm text-[#41584d]">{words.length ? matches.length ? `${matches.length} results${matches.length > 8 ? ", showing the first 8" : ""}` : "No results. Try a shorter search, or browse the sections below." : "Search the library to jump straight to a guide or a doctor search."}</p>
      <ul className="divide-y divide-[#d5e5da]">
        {matches.slice(0, 8).map(({ title, category, href }) => <li key={href}>
          <Link href={href} className="flex min-h-12 items-center gap-3 py-2 text-[#245a46] hover:underline">
            <span className="flex-1"><strong className="block">{title}</strong><span className="text-xs text-[#41584d]">{category}</span></span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </li>)}
      </ul>
    </div>
  </div>;
}
