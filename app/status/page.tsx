import { sb } from "@/lib/supabase";
import { PageHero, Section } from "@/components/ui";
export const metadata = { title: "Status – Docvy", robots: { index: false } };
export const dynamic = "force-dynamic";
const labels: Record<string, string> = { awaiting_payment: "Awaiting payment confirmation", payment_failed: "Payment not completed", doctor_review_pending: "Payment confirmed. Awaiting practitioner review", outcome_shared: "Outcome shared", refund_pending: "Refund in progress", refunded: "Refunded" };
export default async function Status({ searchParams }: { searchParams: { t?: string } }) {
  const t = searchParams.t ?? "";
  const { data } = t.length >= 20 ? await sb().from("requests").select("ref,status").eq("status_token", t).maybeSingle() : { data: null };
  return (<><PageHero eyebrow="STATUS" title="Your request status" text="Use the private link from your confirmation. No personal or medical details are shown here." />
    <Section alt>{data ? <div className="max-w-md rounded-card border border-line bg-porc p-6"><p className="font-head text-2xl font-extrabold text-plum">{data.ref}</p><p className="mt-2 font-semibold">{labels[data.status]}</p><p className="mt-2 text-sm text-grey">A registered practitioner makes any clinical decision independently. A certificate is not guaranteed.</p></div> : <p role="alert">We could not find a request for this link.</p>}</Section></>);
}
