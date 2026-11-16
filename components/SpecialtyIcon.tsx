import type { ReactNode } from "react";

// Original, scalable drawings with a consistent stroke and restrained teal accents.
const drawings: Record<string, ReactNode> = {
  "general-medicine": <><path d="M14 9v10a12 12 0 0 0 24 0V9M14 9h5m14 0h5M26 31v8a10 10 0 0 0 20 0v-7"/><circle cx="46" cy="27" r="5" className="specialty-icon-fill"/></>,
  urology: <><path d="M23 10C9 7 7 22 11 32c4 10 16 9 16 0 0-5-8-5-6-10 2-4 8-7 2-12Zm18 0c14-3 16 12 12 22-4 10-16 9-16 0 0-5 8-5 6-10-2-4-8-7-2-12Z"/><path className="specialty-icon-accent" d="M25 29c5 1 4 13 4 24m10-24c-5 1-4 13-4 24"/></>,
  gastroenterology: <><path d="M29 7v11c0 7 6 6 10 3 10-7 17 4 13 15-4 13-19 20-32 15-10-4-8-14 0-17 6-2 15 4 18-4M21 51v6"/><path className="specialty-icon-fill" stroke="none" d="M20 42c9 0 14 7 24-2-6 11-23 13-26 6Z"/></>,
  cardiology: <><path d="M32 53S7 38 7 22c0-15 19-19 25-5 6-14 25-10 25 5 0 16-25 31-25 31Z"/><path className="specialty-icon-accent" d="M15 31h10l4-11 7 23 5-12h9"/></>,
  dermatology: <><path d="M38 7c-14 13-15 28-15 34a8 8 0 0 0 16 0c0-8-9-16-1-34Z" className="specialty-icon-tint"/><path d="M9 34h11m23 0h12"/><path className="specialty-icon-accent" d="M12 45h1m5 9h1m27-9h1m4 9h1m-18 1h1" strokeWidth="4"/></>,
  dentistry: <><path d="M13 12c8-4 12 2 19 2s11-6 19-2c12 7-1 42-8 42-6 0-3-18-11-18s-5 18-11 18c-7 0-20-35-8-42Z"/><path className="specialty-icon-accent" d="M20 19c9 5 15 5 24 0M51 5v10m-5-5h10"/></>,
  orthopaedics: <><path d="m23 6-2 13c-1 7 4 10 10 10 5 0 8-4 11-4 5 1 8-5 5-10l-3-9M23 58l1-13c0-5 4-8 8-8 6 0 8 4 11 3 5-2 8 5 5 9l-3 9"/><path className="specialty-icon-accent" d="M23 32c7 3 13 3 20 0" strokeWidth="4"/></>,
  paediatrics: <><path d="M17 26c-12-1-13 15-1 16 3 12 29 16 33 0 12-1 11-17-1-16-1-10-8-15-16-15-1-7 8-9 6-3-1 3-7 4-10 7"/><path d="M23 31h.1m18 0h.1" strokeWidth="4"/><path className="specialty-icon-accent" d="M25 42q7 7 14 0"/></>,
  gynaecology: <><circle cx="29" cy="24" r="17"/><path d="M29 41v16m-9-6h18"/><path className="specialty-icon-fill" stroke="none" d="M42 47c0-13 11-15 17-15-1 13-7 19-17 15Z"/></>,
  ophthalmology: <><path d="M5 32S16 15 32 15s27 17 27 17-11 17-27 17S5 32 5 32Z"/><circle cx="32" cy="32" r="11" className="specialty-icon-fill" stroke="none"/><circle cx="35" cy="28" r="5" className="specialty-icon-tint" stroke="none"/></>,
  ent: <><path d="M13 24C10 4 41 4 43 23c2 15-13 15-15 24-3 14-19 7-16-3m8-19c0-14 17-12 17-1 0 9-12 6-12 16"/><path className="specialty-icon-accent" d="M48 26q6 6 0 12m6-18q12 12 0 24"/></>,
  "mental-health": <><path d="M32 13c-7-9-18-5-18 4-9 0-12 12-5 17-7 8 0 19 9 17 2 9 11 9 14 2 3 7 12 7 14-2 9 2 16-9 9-17 7-5 4-17-5-17 0-9-11-13-18-4Zm0 0v40"/><path className="specialty-icon-accent" d="M20 27q12 0 12 11m0-9q10 2 13-6m-26 19q6-4 13 1"/></>,
  oncology: <><path className="specialty-icon-tint" d="M24 29c-10-13-3-22 8-22s18 9 8 22L19 57l-8-7 27-33c2-4-14-4-12 0l27 33-8 7-12-16"/><path className="specialty-icon-accent" d="m24 29 9 12" strokeWidth="5"/></>,
  neurology: <><path d="M31 11c-8-6-17-1-17 7-10 0-12 13-5 18-5 9 1 17 10 16 2 7 9 8 13 2 4 6 11 5 13-2 9 1 15-7 10-16 7-5 5-18-5-18 0-8-10-13-18-7Z"/><path className="specialty-icon-accent" d="M32 54V22m0 12-12-6m12 13 12-12m-12 18-11-7"/><path className="specialty-icon-accent" d="M32 21h.1M20 28h.1M44 29h.1M21 40h.1" strokeWidth="6"/></>,
  endocrinology: <><path d="M23 18c-9-16-16 3-14 18 2 17 10 20 16 10 4-6 10-6 14 0 6 10 14 7 16-10 2-15-5-34-14-18-5 8-13 8-18 0Z"/><path className="specialty-icon-accent" d="M18 29h.1m1 11h.1m26-11h.1m-2 12h.1" strokeWidth="5"/></>,
  pulmonology: <><path d="M29 8v43c-7 4-16 7-22 5C4 40 13 18 23 14c5-2 6 4 6 10m6-16v43c7 4 16 7 22 5 3-16-6-38-16-42-5-2-6 4-6 10M32 4v26m0 0L20 42m12-12 12 12"/><path className="specialty-icon-accent" d="m10 48 15-6v7l-15 4m29-11 15 6v5l-15-4" strokeWidth="5"/></>,
  hepatology: <><path d="M10 46c-3-19 4-33 23-32l23 1c-2 12-11 20-22 20-8 0-9 14-17 18-5 3-8-1-7-7ZM34 15v20"/><path className="specialty-icon-fill" stroke="none" d="M14 43c2-12 5-17 15-19v9c-8 2-8 12-15 16Z"/></>,
  "critical-care-medicine": <><rect x="6" y="12" width="52" height="35" rx="4"/><path d="M23 55h18m-9-8v8"/><path className="specialty-icon-accent" d="M12 30h10l5-10 7 19 6-12 4 3h8"/></>,
  nephrology: <><path d="M23 10C9 7 7 22 11 32c4 10 16 9 16 0 0-5-8-5-6-10 2-4 8-7 2-12Zm18 0c14-3 16 12 12 22-4 10-16 9-16 0 0-5 8-5 6-10-2-4-8-7-2-12ZM25 30l4 24m10-24-4 24"/><path className="specialty-icon-accent" d="M45 24v10m-5-5h10"/></>,
  "vascular-surgery": <><path className="specialty-icon-accent" d="M31 58V34L20 22l-3-15m14 27 13-15 3-12M31 43l-15-6L7 24m24 24 15-9 10-4M20 22l-12-7m36 4 12-2M31 34V7"/><path d="M23 58V43l-9-2m25 17V46l14-1"/></>,
  "bariatric-surgery": <><path d="M21 6c1 14-8 20-8 33l4 19M43 6c-1 14 8 20 8 33l-4 19M23 27q9 5 18 0"/><path className="specialty-icon-tint" d="M10 35q22 12 44 0v11q-22 12-44 0Z"/><path className="specialty-icon-accent" d="M18 41v5m9-2v5m10-5v5m9-8v5"/></>,
  "plastic-surgery": <><path d="M38 8c-13 0-18 12-17 23l-6 10h7v8c0 6 8 6 13 3v7m9-44c12 14 5 26 0 32"/><path className="specialty-icon-accent" d="m36 19-3 7m7 9-3 7m-8 5 6-2"/></>,
  "minimal-access-surgery": <><circle cx="21" cy="13" r="6"/><circle cx="45" cy="13" r="6"/><path d="m24 19 22 35-12-8-19 11 20-30m6-8L15 57m10-19L8 49"/><path className="specialty-icon-accent" d="m26 30 9 8" strokeWidth="4"/></>,
  proctology: <><path d="M18 12c-9-4-14 4-10 12-6 6-1 14 3 14-6 8 0 15 8 12l4 6 6-6h15c11 1 14-7 10-14 7-7 4-15-1-16 4-10-4-15-12-10-6-5-13-4-16 1-3-5-6-4-7 1Z"/><path className="specialty-icon-accent" d="M18 22h27v17H30v17m-12-34v17h9"/></>,
};

export default function SpecialtyIcon({ slug }: { slug: string }) {
  return <span className="specialty-icon"><svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{drawings[slug] ?? drawings["general-medicine"]}</svg></span>;
}
