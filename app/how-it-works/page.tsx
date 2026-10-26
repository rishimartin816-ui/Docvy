import { Btn, Card, Illustration, PageHero, Section } from "@/components/ui";
export const metadata = { title: "How Docvy works – Docvy" };
export default function Page() {
  return (<><PageHero eyebrow="THE PROCESS" title="How Docvy works" text="From request to outcome, with a registered medical practitioner making every clinical decision."><Btn href="/request">Request a certificate</Btn></PageHero>
  <Section alt><div className="grid gap-5 md:grid-cols-3"><Card><h3 className="text-xl font-bold">Request</h3><p className="mt-2 text-sm text-grey">Choose a purpose and share minimal details.</p></Card><Card><h3 className="text-xl font-bold">Review</h3><p className="mt-2 text-sm text-grey">A practitioner reviews and decides independently.</p></Card><Card><h3 className="text-xl font-bold">Outcome</h3><p className="mt-2 text-sm text-grey">Approved document or a clear explanation.</p></Card></div></Section>
  <Section><div className="grid items-center gap-10 md:grid-cols-2"><div><h2 className="text-[27px] font-bold">Before you start</h2><p className="mt-3">Not every organisation accepts online medical certificates, so check their requirements first. For urgent symptoms, call 112 or go to the nearest emergency department.</p></div><Illustration kind="process" /></div></Section></>);
}
