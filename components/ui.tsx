import Link from "next/link";
export const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={`mx-auto max-w-site px-6 ${className}`}>{children}</div>;
export const Section = ({ children, alt, id }: { children: React.ReactNode; alt?: boolean; id?: string }) => <section id={id} className={`py-16 md:py-20 ${alt ? "bg-porc border-y border-line" : ""}`}><Wrap>{children}</Wrap></section>;
export const Btn = ({ href, children, kind = "p" }: { href: string; children: React.ReactNode; kind?: "p" | "s" }) => <Link href={href} className={`inline-flex min-h-12 items-center justify-center rounded-btn border-[1.5px] border-plum px-6 text-[15px] font-semibold transition-colors ${kind === "p" ? "bg-plum text-porc hover:bg-mulb hover:border-mulb" : "text-plum hover:bg-lav"}`}>{children}</Link>;
export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <div className={`rounded-card border border-line bg-porc p-6 ${className}`}>{children}</div>;
export const PageHero = ({ eyebrow, title, text, children }: { eyebrow: string; title: string; text: string; children?: React.ReactNode }) => (
  <Section><p className="mb-4 text-[13px] font-semibold tracking-widest text-mulb">{eyebrow}</p><h1 className="max-w-3xl text-4xl font-bold md:text-[54px] md:leading-[1.1]">{title}</h1><p className="mt-6 max-w-2xl text-lg">{text}</p><div className="mt-8 flex flex-wrap gap-3">{children}</div></Section>);
export const Illustration = ({ kind }: { kind: "process" | "review" }) => (
  <svg viewBox="0 0 520 170" role="img" aria-label={kind === "process" ? "Illustration of the request process" : "Illustration of practitioner review"} className="w-full max-w-lg rounded-card">
    <rect width="520" height="170" rx="16" fill="#E8DDF0" />
    <g stroke="#653B60" strokeWidth="2.5" fill="#FFFCF8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="40" y="30" width="120" height="110" rx="10" /><path d="M60 60h80M60 80h80M60 100h50" fill="none" stroke="#D7B9C8" />
      <circle cx="260" cy="72" r="26" /><path d="M214 140c0-30 20-44 46-44s46 14 46 44z" /><path d="M248 74l8 8 16-18" fill="none" />
      <path d="M400 36l50 18v34c0 30-22 46-50 56-28-10-50-26-50-56V54z" /><path d="M382 90l14 14 28-30" fill="none" />
    </g></svg>);
