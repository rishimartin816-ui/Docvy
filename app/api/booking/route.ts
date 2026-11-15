import { randomUUID } from "node:crypto";
import { bookingConfigured, bookingDb, clientFingerprint, jsonNoStore } from "@/lib/docvy-booking-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const validUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const text = (v: unknown, size: number) => typeof v === "string" ? v.trim().slice(0,size) : "";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return jsonNoStore({ error: "Submit on DOCVY's website." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return jsonNoStore({ error: "Invalid format." }, 415);
  if (!bookingConfigured() || process.env.DOCVY_HYBRID_BOOKING_ENABLED !== "true") {
    return jsonNoStore({ error: "Appointment booking is not available yet." }, 503);
  }
  let raw: string;
  try {
    raw = await request.text();
    if (Buffer.byteLength(raw,"utf8") > 6000) return jsonNoStore({ error: "Request is too large." }, 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("invalid_json");
    const body = parsed as Record<string,unknown>;
    if (text(body.website,200)) return jsonNoStore({ ok: true, reference: `DV-${randomUUID().replace(/-/g,"").slice(0,16).toUpperCase()}`, status:"requested" }, 201);
    const idempotencyKey = text(body.idempotencyKey,40);
    const providerId = text(body.providerId,100);
    const name = text(body.name,100);
    const mobile = text(body.mobile,22).replace(/[\s()+-]/g,"");
    const email = text(body.email,254);
    const city = text(body.city,70);
    const facility = text(body.facility,200);
    const requestedDate = text(body.requestedDate,10);
    const requestedTime = text(body.requestedTime,5);
    const slotId = text(body.slotId,40);
    if (!validUuid.test(idempotencyKey) || (slotId && !validUuid.test(slotId)) ||
        !/^[a-z0-9][a-z0-9-]{1,99}$/.test(providerId) || name.length < 2 ||
        !/^[6-9][0-9]{9}$/.test(mobile) || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
        !city || !facility || body.consent !== true ||
        (requestedDate && !/^\d{4}-\d{2}-\d{2}$/.test(requestedDate)) ||
        (requestedTime && !/^([01]\d|2[0-3]):[0-5]\d$/.test(requestedTime))) {
      return jsonNoStore({ error: "Check the provider, date, contact details and consent." },400);
    }
    const result = await bookingDb("rpc/docvy_booking_submit", {
      method:"POST",
      body:{
        idempotencyKey, providerId, name, mobile, email, city, facility,
        requestedDate, requestedTime, slotId, consent:true, networkHash:clientFingerprint(request),
      },
    }) as {reference:string;status:string;mode:string};
    return jsonNoStore({ok:true,reference:result.reference,status:result.status,mode:result.mode},201);
  } catch {
    return jsonNoStore({ error: "DOCVY could not accept the request. Please check availability and retry." }, 422);
  }
}
