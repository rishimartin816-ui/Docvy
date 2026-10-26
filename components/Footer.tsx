import Link from "next/link";
export default function Footer() {
  const col = (t: string, items: [string, string][]) => <div><h4 className="mb-3 text-sm font-semibold text-plum">{t}</h4>{items.map(([h, l]) => <Link key={l} href={h} className="block py-1 hover:underline">{l}</Link>)}</div>;
  return (<footer className="border-t border-line py-12 text-sm"><div className="mx-auto grid max-w-site gap-8 px-6 md:grid-cols-[1.4fr_1fr_1fr]">
    <div><p className="font-head text-[22px] font-extrabold tracking-[.06em] text-plum">DOCVY</p><p className="mt-2 text-grey">Medical documentation, made simpler.</p><p className="mt-2 text-grey">Legal entity, registered address and grievance contact: to be added before launch.</p></div>
    {col("Docvy", [["/about", "About Docvy"], ["/how-it-works", "How it works"], ["/faqs", "FAQs"], ["/contact", "Contact"], ["/contact", "Grievance and contact"]])}
    {col("Policies", [["/legal/privacy", "Privacy policy"], ["/legal/terms", "Terms of service"], ["/legal/refund", "Cancellation and refund policy"], ["/legal/disclaimer", "Medical disclaimer"], ["/legal/grievance", "Grievance redressal"]])}
  </div></footer>);
}
