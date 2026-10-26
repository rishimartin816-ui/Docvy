import "server-only";
import crypto from "crypto";
const auth = () => "Basic " + Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64");
export const AMOUNT_PAISE = 29900; // proposed price; confirm before launch
export async function createOrder(ref: string) {
  const r = await fetch("https://api.razorpay.com/v1/orders", { method: "POST", headers: { Authorization: auth(), "Content-Type": "application/json" },
    body: JSON.stringify({ amount: AMOUNT_PAISE, currency: "INR", receipt: ref, notes: { ref } }) });
  if (!r.ok) throw new Error("order_failed");
  return (await r.json()) as { id: string };
}
export async function refund(paymentId: string) { // not yet wired to an admin screen
  const r = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}/refund`, { method: "POST", headers: { Authorization: auth(), "Content-Type": "application/json" }, body: "{}" });
  if (!r.ok) throw new Error("refund_failed"); return r.json();
}
const safeEq = (a: string, b: string) => { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && crypto.timingSafeEqual(x, y); };
export const verifyCheckout = (orderId: string, paymentId: string, sig: string) =>
  safeEq(crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(`${orderId}|${paymentId}`).digest("hex"), sig);
export const verifyWebhook = (raw: string, sig: string) =>
  safeEq(crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!).update(raw).digest("hex"), sig);
