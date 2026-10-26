import { NextResponse } from "next/server";
import { sb, audit } from "@/lib/supabase";
import { verifyCheckout } from "@/lib/razorpay";
import { limited, ip } from "@/lib/rate";
// Browser callback: checks the signature and records the payment id. It does NOT mark the request paid.
// The signed webhook is the source of truth for status changes.
export async function POST(req: Request) {
  if (limited("ver:" + ip(req), 20)) return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
  const b = await req.json().catch(() => null);
  if (!b || ![b.orderId, b.paymentId, b.signature].every(s => typeof s === "string")) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  if (!verifyCheckout(b.orderId, b.paymentId, b.signature)) return NextResponse.json({ error: "Verification failed" }, { status: 400 });
  const { data } = await sb().from("payments").update({ payment_id: b.paymentId, status: "authorised_pending_webhook" }).eq("order_id", b.orderId).is("payment_id", null).select("request_id").maybeSingle();
  if (data) await audit("system", "checkout_signature_verified", data.request_id);
  return NextResponse.json({ ok: true });
}
