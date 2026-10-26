import { NextResponse } from "next/server";
import { sb, audit } from "@/lib/supabase";
import { verifyWebhook } from "@/lib/razorpay";
import { emit } from "@/lib/events";
export async function POST(req: Request) {
  const raw = await req.text();
  if (!process.env.RAZORPAY_WEBHOOK_SECRET || !verifyWebhook(raw, req.headers.get("x-razorpay-signature") ?? "")) return NextResponse.json({ error: "Bad signature" }, { status: 401 });
  const eventId = req.headers.get("x-razorpay-event-id"); if (!eventId) return NextResponse.json({ error: "No event id" }, { status: 400 });
  const ev = JSON.parse(raw);
  const ins = await sb().from("payment_events").insert({ event_id: eventId, type: ev.event });
  if (ins.error) return NextResponse.json({ ok: true, duplicate: true }); // duplicate-event protection (primary key)
  const pay = ev?.payload?.payment?.entity, ordId: string | undefined = pay?.order_id;
  const { data: p } = ordId ? await sb().from("payments").select("id,request_id,amount,requests(ref,status)").eq("order_id", ordId).maybeSingle() : { data: null };
  if (!p) return NextResponse.json({ ok: true });
  const r = (p as any).requests as { ref: string; status: string };
  if (ev.event === "payment.captured") {
    if (pay.amount !== p.amount) { await audit("system", "amount_mismatch", p.request_id); return NextResponse.json({ ok: true }); }
    await sb().from("payments").update({ payment_id: pay.id, status: "captured" }).eq("id", p.id);
    if (["awaiting_payment", "payment_failed"].includes(r.status)) { await sb().from("requests").update({ status: "doctor_review_pending" }).eq("id", p.request_id); await audit("razorpay", "payment_captured", p.request_id); await emit("payment_verified", r.ref); await emit("doctor_review_pending", r.ref); }
  } else if (ev.event === "payment.failed") {
    await sb().from("payments").update({ status: "failed" }).eq("id", p.id);
    if (r.status === "awaiting_payment") await sb().from("requests").update({ status: "payment_failed" }).eq("id", p.request_id);
    await audit("razorpay", "payment_failed", p.request_id); await emit("payment_failed", r.ref);
  } else if (ev.event === "refund.processed") {
    await sb().from("payments").update({ status: "refunded" }).eq("id", p.id); await sb().from("requests").update({ status: "refunded" }).eq("id", p.request_id); await audit("razorpay", "refund_processed", p.request_id);
  }
  return NextResponse.json({ ok: true });
}
