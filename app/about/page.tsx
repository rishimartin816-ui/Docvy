import { Btn, Card, Illustration, PageHero, Section } from "@/components/ui";
export const metadata = { title: "Medical documentation, made simpler – Docvy" };
export default function Page() {
  return (<><PageHero eyebrow="ABOUT DOCVY" title="Medical documentation, made simpler" text="Docvy is a documentation service, not a hospital, pharmacy or doctor-discovery marketplace."><Btn href="/request">Request a certificate</Btn></PageHero>
  <Section alt><div className="grid gap-5 md:grid-cols-3"><Card><h3 className="text-xl font-bold">What we do</h3><p className="mt-2 text-sm text-grey">Help people request legitimate medical documentation.</p></Card><Card><h3 className="text-xl font-bold">What we do not do</h3><p className="mt-2 text-sm text-grey">We never issue certificates automatically.</p></Card><Card><h3 className="text-xl font-bold">Who decides</h3><p className="mt-2 text-sm text-grey">Registered medical practitioners.</p></Card></div></Section>
  <Section><div className="grid items-center gap-10 md:grid-cols-2"><div><h2 className="text-[27px] font-bold">Before you start</h2><p className="mt-3">Not every organisation accepts online medical certificates, so check their requirements first. For urgent symptoms, call 112 or go to the nearest emergency department.</p></div><Illustration kind="process" /></div></Section></>);
}
