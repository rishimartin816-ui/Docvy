"use client";
import { useState } from "react";
import { faqs } from "@/lib/content";
export default function Faq({ limit }: { limit?: number }) {
  const [o, setO] = useState<number | null>(null);
  return (<div className="max-w-3xl">{faqs.slice(0, limit).map(([q, a], i) => (
    <div key={q} className="border-b border-line">
      <h3><button className="flex w-full justify-between gap-4 py-5 text-left font-body text-[17px] font-semibold text-ink" aria-expanded={o === i} aria-controls={`f${i}`} id={`fb${i}`} onClick={() => setO(o === i ? null : i)}><span>{q}</span><span aria-hidden>{o === i ? "−" : "+"}</span></button></h3>
      <div id={`f${i}`} role="region" aria-labelledby={`fb${i}`} hidden={o !== i} className="pb-5">{a}</div>
    </div>))}</div>);
}
