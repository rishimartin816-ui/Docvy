import { NextResponse } from "next/server";
import crypto from "crypto";
import { sb, audit } from "@/lib/supabase";
import { createOrder, AMOUNT_PAISE } from "@/lib/razorpay";
import { emit } from "@/lib/events";
import { limited, ip } from "@/lib/rate";
export async function POST(req: Request) {
  if (limited("req:" + ip(req))) return NextResponse.json({ error: "Too many attempts. Try again shortly." }, { status: 429 });
  const b = await req.json().catch(() => null);
  const ok = b && ["work", "college", "other"].includes(b.purpose) && typeof b.name === "string" && b.name.trim().length >= 2 && b.name.length <= 100
    && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email ?? "") && String(b.email).length <= 200 && /^[6-9]\d{9}$/.test(b.mobile ?? "") && b.c1 === true && b.c2 === true && b.c3 === true && !b.urgent;
  if (!ok) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const ref = "DVY-" + crypto.randomBytes(4).toString("hex").toUpperCase(), token = crypto.randomBytes(24).toString("base64url");
  try {
    const { data, error } = await sb().from("requests").insert({ ref, status_token: token, purpose: b.purpose, full_name: b.name.trim(), email: b.email.trim().toLowerCase(), mobile: b.mobile }).select("id").single();
    if (error || !data) throw new Error("db");
    const order = await createOrder(ref);
    await sb().from("payments").insert({ request_id: data.id, order_id: order.id, amount: AMOUNT_PAISE });
    await audit("system", "request_created", data.id); await emit("request_created", ref);
    return NextResponse.json({ token, orderId: order.id, keyId: process.env.RAZORPAY_KEY_ID, amount: AMOUNT_PAISE });
  } catch { return NextResponse.json({ error: "Could not create request" }, { status: 500 }); }
}
