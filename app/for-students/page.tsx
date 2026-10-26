import { Btn, Card, Illustration, PageHero, Section } from "@/components/ui";
export const metadata = { title: "Documentation for college absence – Docvy" };
export default function Page() {
  return (<><PageHero eyebrow="FOR STUDENTS" title="Documentation for college absence" text="Find out how to request documentation for an absence, missed examination or academic requirement."><Btn href="/request">Request a certificate</Btn></PageHero>
  <Section alt><div className="grid gap-5 md:grid-cols-3"><Card><h3 className="text-xl font-bold">Check with your college</h3><p className="mt-2 text-sm text-grey">Institutions apply their own rules.</p></Card><Card><h3 className="text-xl font-bold">Start early</h3><p className="mt-2 text-sm text-grey">Review takes time and is not guaranteed.</p></Card><Card><h3 className="text-xl font-bold">Honest records</h3><p className="mt-2 text-sm text-grey">Documents reflect what the practitioner assessed.</p></Card></div></Section>
  <Section><div className="grid items-center gap-10 md:grid-cols-2"><div><h2 className="text-[27px] font-bold">Before you start</h2><p className="mt-3">Not every organisation accepts online medical certificates, so check their requirements first. For urgent symptoms, call 112 or go to the nearest emergency department.</p></div><Illustration kind="process" /></div></Section></>);
}
