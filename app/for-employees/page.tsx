import { Btn, Card, Illustration, PageHero, Section } from "@/components/ui";
export const metadata = { title: "Documentation for work leave – Docvy" };
export default function Page() {
  return (<><PageHero eyebrow="FOR EMPLOYEES" title="Documentation for work leave" text="Request documentation related to a health concern affecting your ability to work."><Btn href="/request">Request a certificate</Btn></PageHero>
  <Section alt><div className="grid gap-5 md:grid-cols-3"><Card><h3 className="text-xl font-bold">Check your policy</h3><p className="mt-2 text-sm text-grey">Your employer may set its own requirements.</p></Card><Card><h3 className="text-xl font-bold">Be accurate</h3><p className="mt-2 text-sm text-grey">Information must match your assessment.</p></Card><Card><h3 className="text-xl font-bold">No guarantee</h3><p className="mt-2 text-sm text-grey">Issuance depends on clinical judgement.</p></Card></div></Section>
  <Section><div className="grid items-center gap-10 md:grid-cols-2"><div><h2 className="text-[27px] font-bold">Before you start</h2><p className="mt-3">Not every organisation accepts online medical certificates, so check their requirements first. For urgent symptoms, call 112 or go to the nearest emergency department.</p></div><Illustration kind="process" /></div></Section></>);
}
