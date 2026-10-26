import Link from "next/link";
import { Btn, Card, Illustration, PageHero, Section } from "@/components/ui";
import Faq from "@/components/Faq";
import { BriefcaseMedical, GraduationCap, FileCheck2, ArrowRight, ShieldCheck, ClipboardCheck, Stethoscope } from "lucide-react";
import { purposes, steps } from "@/lib/content";
export default function Home() {
  return (<>
    <PageHero eyebrow="MEDICAL DOCUMENTATION, SIMPLIFIED" title="Need medical documentation for leave? Start with Docvy." text="Request medical documentation online for work, college or other legitimate needs. If a medical assessment is required, a registered medical practitioner will review your case and determine whether a certificate can be issued.">
      <Btn href="/request">Request a certificate</Btn><Btn href="/how-it-works" kind="s">How it works</Btn>
      <p className="w-full text-sm text-grey">Transparent process. Professional medical review when required. No guaranteed certificate issuance.</p>
    </PageHero>
    <Section alt><h2 className="mb-10 text-[27px] font-bold md:text-[32px]">What do you need documentation for?</h2>
      <div className="grid gap-5 md:grid-cols-3">{purposes.map((p, i) => { const Icon = [BriefcaseMedical, GraduationCap, FileCheck2][i]; return <Card key={p.key} className="group flex flex-col gap-4 transition-shadow hover:shadow-md"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-lav text-plum"><Icon size={25} strokeWidth={1.8}/></span><h3 className="text-xl font-bold">{p.title}</h3><p className="text-grey">{p.text}</p><Link className="mt-auto inline-flex items-center gap-2 font-semibold text-plum" href={`/request?purpose=${p.key}`}>Continue <ArrowRight size={16} className="transition-transform group-hover:translate-x-1"/></Link></Card>})}</div>
      <p className="mt-5 text-sm text-grey">Choosing a purpose starts a request. It never issues a certificate. Not every employer or institution accepts online medical certificates.</p></Section>
    <Section><h2 className="mb-8 text-[27px] font-bold md:text-[32px]">How Docvy works</h2>
      <ol className="grid gap-6 md:grid-cols-4">{steps.map((s, i) => { const Icon = [ClipboardCheck, Stethoscope, ShieldCheck, FileCheck2][i]; return <li key={s.t} className="rounded-card border border-line bg-porc p-5"><span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-lav text-plum"><Icon size={24}/></span><span className="text-xs font-bold tracking-widest text-mulb">STEP 0{i + 1}</span><h3 className="mt-2 text-xl font-bold">{s.t}</h3><p className="mt-2 text-sm text-grey">{s.d}</p></li>})}</ol></Section>
    <Section alt><div className="grid items-center gap-10 md:grid-cols-2"><div><h2 className="text-[27px] font-bold md:text-[32px]">Authentic documentation starts with an honest process.</h2><p className="mt-4">Clinical decisions are made by appropriately registered medical practitioners, and certificates are issued only when justified. The receiving organisation may apply its own acceptance requirements.</p></div><Illustration kind="review" /></div></Section>
    <Section><h2 className="mb-6 text-[27px] font-bold md:text-[32px]">Common questions</h2><Faq limit={5} /><div className="mt-6"><Btn href="/faqs" kind="s">All FAQs</Btn></div></Section>
    <Section><div className="rounded-card bg-plum px-8 py-14 text-center"><h2 className="!text-porc text-[27px] font-bold md:text-[32px]">Start your medical documentation request.</h2><p className="my-3 text-porc">A clear process, with professional medical review where required.</p><Link href="/request" className="inline-flex min-h-12 items-center rounded-btn bg-porc px-6 font-semibold text-ink">Request a certificate</Link></div></Section>
  </>);
}
