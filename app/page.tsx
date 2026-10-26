import Link from "next/link";
import { Btn, Card, Illustration, Section } from "@/components/ui";
import Faq from "@/components/Faq";
import { BriefcaseMedical, GraduationCap, FileCheck2, ArrowRight, ShieldCheck, ClipboardCheck, Stethoscope, CheckCircle2, LockKeyhole, Clock3, Sparkles } from "lucide-react";
import { purposes, steps } from "@/lib/content";

export default function Home() {
  return <>
    <section className="hero-shell overflow-hidden">
      <div className="mx-auto grid max-w-site items-center gap-12 px-6 py-16 md:grid-cols-[1.05fr_.95fr] md:py-24 lg:gap-16 lg:py-28">
        <div className="relative z-10">
          <div className="eyebrow-pill"><span className="eyebrow-dot" /> MEDICAL DOCUMENTATION, MADE SIMPLER</div>
          <h1 className="mt-6 max-w-2xl text-[42px] font-extrabold leading-[1.08] tracking-[-.045em] md:text-[58px] lg:text-[64px]">The paperwork is hard enough. <span className="hero-highlight">Let’s make it simpler.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-grey md:text-lg">A clear, guided way to request medical documentation for work, college and other legitimate needs—with professional medical review where required.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Btn href="/request">Start a request <ArrowRight className="ml-2" size={17}/></Btn><Btn href="/how-it-works" kind="s">See how it works</Btn></div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-grey"><span className="inline-flex items-center gap-2"><ShieldCheck size={17} className="text-mulb"/> Professional review</span><span className="inline-flex items-center gap-2"><LockKeyhole size={16} className="text-mulb"/> Privacy-conscious process</span></div>
        </div>
        <div className="hero-art relative mx-auto w-full max-w-[520px]">
          <div className="hero-orb hero-orb-one"/><div className="hero-orb hero-orb-two"/>
          <div className="document-card relative z-10">
            <div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="brand-mark"><FileCheck2 size={23}/></span><div><p className="text-sm font-extrabold tracking-tight text-plum">DOCVY</p><p className="text-[11px] text-grey">DOCUMENT REQUEST</p></div></div><span className="status-chip"><span/> Guided process</span></div>
            <div className="mt-8 border-t border-line pt-7"><p className="text-xs font-bold uppercase tracking-[.16em] text-mulb">Your next step</p><h2 className="mt-2 text-2xl font-bold leading-tight">Start with the details.</h2><p className="mt-2 text-sm leading-6 text-grey">Tell us what you need and follow the steps to submit your request.</p>
              <div className="mt-6 space-y-3"><div className="mock-row"><span className="mock-icon"><ClipboardCheck size={18}/></span><span><b>Submit your request</b><small>Share relevant information</small></span><CheckCircle2 className="ml-auto text-mulb" size={19}/></div><div className="mock-row"><span className="mock-icon"><Stethoscope size={18}/></span><span><b>Professional review</b><small>Assessment where required</small></span><span className="mock-step">02</span></div><div className="mock-row"><span className="mock-icon"><FileCheck2 size={18}/></span><span><b>Receive an outcome</b><small>Based on review and eligibility</small></span><span className="mock-step">03</span></div></div>
            </div>
            <div className="mt-6 flex items-start gap-2 rounded-xl bg-sand p-3 text-xs leading-5 text-grey"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-mulb"/> Certificates are not guaranteed. Any issuance depends on appropriate medical assessment and professional judgment.</div>
          </div>
          <div className="floating-note"><span className="floating-note-icon"><Sparkles size={17}/></span><span><b>Clear steps, less guesswork</b><small>Know what happens next</small></span></div>
        </div>
      </div>
      <div className="hero-bottom-line" />
    </section>

    <div className="trust-strip"><div className="mx-auto grid max-w-site gap-4 px-6 py-5 sm:grid-cols-3"><div><span className="trust-label">01 / CLEAR PROCESS</span><p>Know what to expect at each step</p></div><div><span className="trust-label">02 / PROFESSIONAL REVIEW</span><p>Clinical decisions stay with practitioners</p></div><div><span className="trust-label">03 / TRANSPARENT OUTCOME</span><p>No promises of automatic approval</p></div></div></div>

    <Section><div className="section-intro"><p className="section-kicker">A STARTING POINT FOR YOUR NEED</p><h2>What do you need documentation for?</h2><p>Choose the option that best describes your situation. We’ll guide you to the relevant request.</p></div>
      <div className="grid gap-5 md:grid-cols-3">{purposes.map((p, i) => { const Icon = [BriefcaseMedical, GraduationCap, FileCheck2][i]; return <Card key={p.key} className="purpose-card group flex flex-col gap-4"><span className="purpose-icon"><Icon size={25} strokeWidth={1.8}/></span><div><h3 className="text-xl font-bold">{p.title}</h3><p className="mt-2 text-sm leading-7 text-grey">{p.text}</p></div><Link className="mt-auto inline-flex items-center gap-2 pt-2 font-bold text-plum" href={`/request?purpose=${p.key}`}>Explore this option <ArrowRight size={16} className="transition-transform group-hover:translate-x-1"/></Link></Card>})}</div>
      <p className="mt-5 text-xs leading-6 text-grey">Choosing an option starts a request; it does not issue a certificate. Employers and institutions may have their own acceptance requirements.</p></Section>

    <Section alt><div className="section-intro"><p className="section-kicker">SIMPLE BY DESIGN</p><h2>A clearer path from request to outcome.</h2><p>No confusing maze of steps. Just a guided process with the right expectations from the start.</p></div>
      <ol className="grid gap-4 md:grid-cols-4">{steps.map((s, i) => { const Icon = [ClipboardCheck, Stethoscope, ShieldCheck, FileCheck2][i]; return <li key={s.t} className="process-card"><div className="flex items-center justify-between"><span className="process-icon"><Icon size={23}/></span><span className="process-number">0{i + 1}</span></div><h3 className="mt-6 text-lg font-bold">{s.t}</h3><p className="mt-2 text-sm leading-7 text-grey">{s.d}</p></li>})}</ol>
    </Section>

    <Section><div className="grid items-center gap-10 md:grid-cols-[1fr_.9fr] md:gap-16"><div><p className="section-kicker">TRUST STARTS WITH TRANSPARENCY</p><h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight md:text-[42px]">Medical decisions deserve care, not shortcuts.</h2><p className="mt-5 leading-8 text-grey">Docvy helps organise the request process. Where medical assessment is needed, decisions are made by appropriately registered medical practitioners. Documentation is issued only when justified, and the receiving organisation may apply its own requirements.</p><div className="mt-6 space-y-3"><p className="flex items-start gap-3 text-sm font-medium"><CheckCircle2 className="mt-0.5 shrink-0 text-mulb" size={18}/> Clear information before you submit</p><p className="flex items-start gap-3 text-sm font-medium"><CheckCircle2 className="mt-0.5 shrink-0 text-mulb" size={18}/> Medical judgment is respected</p><p className="flex items-start gap-3 text-sm font-medium"><CheckCircle2 className="mt-0.5 shrink-0 text-mulb" size={18}/> No guarantee of certificate issuance</p></div><div className="mt-8"><Btn href="/how-it-works" kind="s">Understand the process <ArrowRight size={16} className="ml-2"/></Btn></div></div><div className="review-panel"><div className="review-panel-top"><span className="review-seal"><ShieldCheck size={27}/></span><span className="review-label">THE DOCVY APPROACH</span></div><div className="review-quote">“Clear steps. Honest expectations. Professional judgment.”</div><div className="review-divider"/><div className="flex items-center gap-3"><span className="review-mini-icon"><Clock3 size={18}/></span><div><b className="block text-sm">A guided request experience</b><span className="text-xs text-grey">Designed to help you understand what comes next</span></div></div></div></div></Section>

    <Section alt><div className="section-intro"><p className="section-kicker">GOOD TO KNOW</p><h2>Questions, answered.</h2><p>Get familiar with the process before you begin.</p></div><Faq limit={5}/><div className="mt-6"><Btn href="/faqs" kind="s">Browse all FAQs <ArrowRight size={16} className="ml-2"/></Btn></div></Section>

    <Section><div className="cta-panel"><div className="cta-decoration"/><div className="relative z-10 max-w-2xl"><p className="section-kicker !text-rose">YOUR NEXT STEP STARTS HERE</p><h2 className="!text-porc text-3xl font-extrabold leading-tight tracking-tight md:text-[42px]">Ready to start your request?</h2><p className="mt-4 max-w-xl leading-7 text-white/75">Begin with a few details. We’ll guide you through the process and explain what happens next.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/request" className="inline-flex min-h-12 items-center rounded-btn bg-porc px-6 font-bold text-plum transition-transform hover:-translate-y-0.5">Start a request <ArrowRight className="ml-2" size={17}/></Link><Link href="/pricing" className="inline-flex min-h-12 items-center rounded-btn border border-white/30 px-6 font-semibold text-white hover:bg-white/10">View pricing</Link></div><p className="mt-5 text-xs leading-5 text-white/60">A request does not guarantee a medical certificate. Decisions depend on appropriate assessment.</p></div></div></Section>
  </>;
}
