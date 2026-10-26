import "server-only";
// Administrative events only: event name + opaque ref. Never send names, contact or health details.
export type EventName = "request_created" | "payment_verified" | "payment_failed" | "request_status_changed" | "doctor_review_pending" | "document_approved" | "request_declined" | "refund_required" | "support_case_opened";
export async function emit(name: EventName, ref: string) {
  const url = process.env.MAKE_WEBHOOK_URL; if (!url) return;
  try { await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", "x-docvy-secret": process.env.MAKE_WEBHOOK_SECRET ?? "" }, body: JSON.stringify({ name, ref, at: new Date().toISOString() }) }); } catch { /* ignore */ }
}
