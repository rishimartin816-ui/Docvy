// Sends administrative events only. Never include names, contact or health details.
export type EventName = "request_created" | "payment_verified" | "request_status_changed" | "reminder_due" | "doctor_review_pending" | "document_approved" | "request_declined" | "refund_required" | "support_case_opened";
export async function emit(name: EventName, ref: string) {
  const url = process.env.AUTOMATION_WEBHOOK_URL;
  if (!url) return;
  try { await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, ref, at: new Date().toISOString() }) }); } catch { /* log without PII */ }
}
