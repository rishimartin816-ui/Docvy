import { Btn, Card, PageHero, Section } from "@/components/ui";
export const metadata = { title: "Pricing – Docvy" };
export default function Pricing() {
  return (<><PageHero eyebrow="PRICING" title="One clear price, shown before you pay." text="Your request starts the Docvy process. A certificate is not guaranteed." />
    <Section alt><Card className="max-w-lg"><h2 className="text-2xl font-bold">Medical documentation request</h2><p className="mt-3 font-head text-6xl font-extrabold text-plum">₹299</p>
      <ul className="mt-4 list-disc pl-5 text-sm text-grey"><li>[Confirm before launch: exactly what ₹299 covers]</li><li>[Confirm: refund terms in the final policy]</li></ul>
      <p className="my-5 rounded-xl bg-lav p-4 text-sm">Additional assessment, in-person care or a different service may be required. For urgent symptoms, seek medical care now.</p><Btn href="/request">Start my request</Btn></Card></Section></>);
}
