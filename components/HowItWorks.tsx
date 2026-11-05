import Link from "next/link";
import { CalendarCheck, ClipboardList, Search } from "lucide-react";

const steps = [
  { title: "Find the right specialty", text: "Search a concern or doctor to find where to start.", icon: Search },
  { title: "Request a visit", text: "Send a request where clinic intake is available.", icon: ClipboardList },
  { title: "Confirm with the clinic", text: "Check the time, location and fee before you travel.", icon: CalendarCheck },
];
const stepTones = ["bg-icon-blue text-icon-cobalt", "bg-icon-peach text-icon-coral", "bg-icon-mint text-icon-teal"];

export default function HowItWorks() {
  return <section className="calm-section bg-porc" aria-labelledby="booking-title">
    <div className="calm-wrap">
      <h2 id="booking-title">How booking works</h2>
      <ol className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
        {steps.map(({ title, text, icon: Icon }, index) => <li key={title}>
          <div className="flex items-center gap-3"><span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stepTones[index]}`}><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></span><span className="text-sm font-medium text-grey">0{index + 1}</span></div>
          <h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 max-w-[38ch] text-base leading-relaxed text-grey">{text}</p>
        </li>)}
      </ol>
      <p className="mt-10 max-w-[70ch] rounded-2xl border border-line px-5 py-4 text-sm leading-7 text-grey">Live appointments are currently unavailable. <Link href="https://docvy-clinic-demo.vercel.app/book" className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4 hover:text-primary-hover">Try the fictional booking demo.</Link></p>
    </div>
  </section>;
}
