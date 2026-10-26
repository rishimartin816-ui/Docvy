import { db } from "@/lib/store";
import { PageHero, Section } from "@/components/ui";
export const metadata = { title: "Status – Docvy" };
const labels = { awaiting_payment: "Awaiting payment", payment_verified: "Payment verified", doctor_review_pending: "Doctor review pending", outcome_shared: "Outcome shared" } as const;
export default function Status({ searchParams }: { searchParams: { ref?: string } }) {
  const ref = (searchParams.ref ?? "").toUpperCase(); const r = ref ? db.get(ref) : undefined;
  return (<><PageHero eyebrow="STATUS" title="Check your request status" text="Enter your reference ID. No health details are shown here." />
    <Section alt><form className="mb-6 flex max-w-md gap-3"><label htmlFor="ref" className="sr-only">Reference ID</label><input id="ref" name="ref" defaultValue={ref} placeholder="DVY-XXXXXX" className="min-h-12 flex-1 rounded-btn border-[1.5px] border-line bg-porc px-3.5" /><button className="min-h-12 rounded-btn bg-plum px-6 font-semibold text-porc">Check</button></form>
      {ref && (r ? <div className="max-w-md rounded-card border border-line bg-porc p-6"><p className="font-head text-2xl font-extrabold text-plum">{r.ref}</p><p className="mt-2 font-semibold">{labels[r.status]}</p><p className="mt-2 text-sm text-grey">A registered practitioner makes any clinical decision independently.</p></div> : <p role="alert" className="text-[#B42318]">No request found for that reference.</p>)}</Section></>);
}
