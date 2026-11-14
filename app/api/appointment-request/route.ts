import { signedDirectoryWrite } from "@/lib/directory-rpc";
import { createHmac, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { crmIntakeConfig } from "@/lib/appointment-intake";
import { getDirectoryDoctors } from "@/lib/public-directory";
import { canRequestAppointment } from "@/lib/profile-policy";
import { directoryIntakeConfig } from "@/lib/directory-intake";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxBodyBytes = 8_000;
const maxText = (value: unknown, limit: number) => typeof value === "string" ? value.trim().replace(/[<>\u0000-\u001f]/g, "").slice(0, limit) : "";

function response(status: number, body: { ok: false; error: string } | { ok: true; referenceId: string }) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return response(403, { ok: false, error: "Please submit this form from DOCVY." });

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxBodyBytes) return response(413, { ok: false, error: "The form is too large." });
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) return response(415, { ok: false, error: "Unsupported form format." });

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const webhookToken = process.env.GOOGLE_SHEETS_WEBHOOK_TOKEN;
  const crm = crmIntakeConfig();
  const directory = directoryIntakeConfig();
  if (!directory && !crm && (process.env.DOCVY_CRM_INTAKE_ENABLED === "true" || !webhookUrl || !webhookToken)) {
    return response(503, { ok: false, error: "Appointment enquiries are not connected yet. Please try again later." });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > maxBodyBytes) return response(413, { ok: false, error: "The form is too large." });
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return response(400, { ok: false, error: "The form could not be read." });
    body = parsed as Record<string, unknown>;
  } catch {
    return response(400, { ok: false, error: "The form could not be read." });
  }

  if (maxText(body.website, 200)) return response(200, { ok: true, referenceId: `DV-${randomUUID().slice(0, 8).toUpperCase()}` });
  const name = maxText(body.name, 100);
  const mobile = maxText(body.mobile, 24).replace(/[\s()-]/g, "");
  const email = maxText(body.email, 254).toLowerCase();
  const requestedDate = maxText(body.requestedDate, 10);
  const requestedTime = maxText(body.requestedTime, 5);
  const providerId = maxText(body.providerId, 80);
  const city = maxText(body.city, 40);
  const facility = maxText(body.facility, 120);
  const provider = (await getDirectoryDoctors()).find((candidate) => candidate.id === providerId);
  if (!provider || !canRequestAppointment(provider)) return response(403, { ok: false, error: "This doctor has not enabled appointment requests." });
  const location = provider?.locations.find((item) => item.city === city && item.facility === facility);

  if (!name || !/^[6-9]\d{9}$/.test(mobile.replace(/^\+?91(?=\d{10}$)/, "")) || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || !location || body.consent !== true) {
    return response(400, { ok: false, error: "Check your name, mobile number, provider selection and consent, then try again." });
  }
  if ((requestedDate && !/^\d{4}-\d{2}-\d{2}$/.test(requestedDate)) || (requestedTime && !/^\d{2}:\d{2}$/.test(requestedTime))) {
    return response(400, { ok: false, error: "Check the preferred date and time, then try again." });
  }

  const referenceId = `DV-${randomUUID().slice(0, 8).toUpperCase()}`;
  if (directory) {
    if (provider?.live !== true || typeof body.requestId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(body.requestId)) {
      return response(400, { ok: false, error: "Choose a listed doctor and try again." });
    }
    const network = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    try {
      const saved = await signedDirectoryWrite("appointment", {
        requestId: body.requestId,
        networkHash: createHmac("sha256", process.env.DOCVY_DIRECTORY_WRITE_SECRET || directory.key).update(network).digest("hex"),
        payload: { providerId, city, facility, name, mobile: "+91" + mobile.replace(/^\+?91(?=\d{10}$)/, ""), email, requestedDate, requestedTime, consent: true },
      });
      if ([400, 409, 422, 429].includes(saved.status)) {
        const detail = await saved.json() as { message?: string };
        return response(saved.status, { ok: false, error: detail.message || "Check your details and try again." });
      }
      if (!saved.ok) return response(502, { ok: false, error: "DOCVY could not save your request. Please retry with the same details." });
      const storedReference: unknown = await saved.json();
      if (typeof storedReference !== "string" || !/^DV-[A-F0-9]{16}$/.test(storedReference)) {
        return response(502, { ok: false, error: "We could not verify the saved request. Please retry with the same details." });
      }
      return response(201, { ok: true, referenceId: storedReference });
    } catch {
      return response(502, { ok: false, error: "Your request could not be confirmed as saved. Please retry with the same details." });
    }
  }
  if (crm) {
    try {
      const result = await fetch(new URL("/rest/v1/rpc/crm_submit_enquiry", crm.url), {
        method: "POST",
        headers: { apikey: crm.key, Authorization: "Bearer " + crm.key, "Content-Type": "application/json" },
        body: JSON.stringify({
          ref: referenceId, provider: providerId, location_city: city, location_facility: facility,
          name, phone: "+91" + mobile.replace(/^\+?91(?=\d{10}$)/, ""), contact_email: email || null,
          requested_date: requestedDate || null, requested_time: requestedTime || null,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (result.status === 404) return response(422, { ok: false, error: "Online enquiries are unavailable for this location." });
      if (result.status === 429) return response(429, { ok: false, error: "Please wait a few minutes before sending another enquiry." });
      if (result.status === 400) return response(400, { ok: false, error: "Check the preferred date and time, then try again." });
      if (result.ok) return response(201, { ok: true, referenceId });
    } catch {
      return response(502, { ok: false, error: "DOCVY could not save your enquiry. Please try again later." });
    }
    return response(502, { ok: false, error: "DOCVY could not save your enquiry. Please try again later." });
  }

  if (!webhookUrl || !webhookToken) return response(503, { ok: false, error: "Appointment enquiries are not connected yet. Please try again later." });
  let endpoint: URL;
  try {
    endpoint = new URL(webhookUrl);
    if (endpoint.protocol !== "https:" || endpoint.hostname !== "script.google.com" || !/^\/macros\/s\/.+\/exec$/.test(endpoint.pathname)) throw new Error("Unsupported webhook URL");
  } catch {
    return response(503, { ok: false, error: "Appointment enquiries are not connected yet. Please try again later." });
  }

  const forwardedFor = request.headers.get("x-forwarded-for") ?? "unknown";
  const forwardedParts = forwardedFor.split(",");
  const networkHint = forwardedParts[0]?.trim() || "unknown";
  const ipFingerprint = createHmac("sha256", webhookToken).update(networkHint).digest("hex");
  const payload = {
    token: webhookToken,
    ref: referenceId,
    purpose: "appointment_enquiry",
    submittedAt: new Date().toISOString(),
    providerId: provider!.id,
    name,
    mobile,
    email,
    provider: provider!.name,
    organisation: provider!.hospital,
    city: location!.city,
    facility: location!.facility,
    requestedDate,
    requestedTime,
    privacyConsent: true,
    providerSharingConsent: true,
    ipFingerprint,
    status: "NEW — PROVIDER CONFIRMATION REQUIRED",
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);
    let upstream: Response;
    try {
      upstream = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        redirect: "follow",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }
    const result = await upstream.json().catch(() => null) as { ok?: boolean; throttled?: boolean } | null;
    if (result?.throttled) return response(429, { ok: false, error: "Please wait a few minutes before sending another enquiry." });
    if (!upstream.ok || result?.ok !== true) return response(502, { ok: false, error: "DOCVY could not save your enquiry. Please try again later." });
    return response(201, { ok: true, referenceId });
  } catch {
    return response(502, { ok: false, error: "DOCVY could not save your enquiry. Please try again later." });
  }
}
