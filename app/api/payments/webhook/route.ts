import { NextResponse } from "next/server";
import crypto from "crypto";
import { db, seenEvents } from "@/lib/store";
import { emit } from "@/lib/events";
// Razorpay-style signature check. UNTESTED: verify against your gateway's docs and test with real test-mode credentials.
export async function POST(req: Request) {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Not configured" }, { status: 503 });
  const raw = await req.text();
  const sig = req.headers.get("x-razorpay-signature") ?? "";
  const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return NextResponse.json({ error: "Bad signature" }, { status: 401 });
  const id = req.headers.get("x-razorpay-event-id") ?? "";
  if (id && seenEvents.has(id)) return NextResponse.json({ ok: true, duplicate: true }); // duplicate notifications
  if (id) seenEvents.add(id);
  const ev = JSON.parse(raw); const ref: string | undefined = ev?.payload?.payment?.entity?.notes?.ref;
  const r = ref ? db.get(ref) : undefined;
  if (ev?.event === "payment.captured" && r && r.status === "awaiting_payment") {
    r.status = "payment_verified"; await emit("payment_verified", r.ref);
    r.status = "doctor_review_pending"; await emit("doctor_review_pending", r.ref);
  }
  return NextResponse.json({ ok: true });
}
