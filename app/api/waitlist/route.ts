import { NextResponse } from "next/server";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";
import { cities, directorySpecialties } from "@/lib/directory";

function reply(status: number, error?: string) {
  return NextResponse.json(error ? { error } : { ok: true }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return reply(403, "Please submit from DOCVY.");
  const config = clinicCrmConfig();
  if (!config || process.env.DOCVY_WAITLIST_ENABLED !== "true") return reply(503, "Notifications are currently unavailable. Your contact details were not saved.");
  try {
    const raw = await request.text();
    if (raw.length > 1024) return reply(400, "Invalid request.");
    const data = JSON.parse(raw);
    const { city, specialty = "", consent } = data;
    const contact = typeof data.contact === "string" ? data.contact.trim().toLowerCase() : "";
    const phone = contact.replace(/[\s()-]/g, "").replace(/^\+91(?=\d{10}$)/, "");
    const normalized = /^[6-9]\d{9}$/.test(phone) ? "+91" + phone : contact;
    if (consent !== true || !cities.some((item) => item.slug === city) ||
        (specialty && !directorySpecialties.some((item) => item.slug === specialty)) ||
        normalized.length > 254 || !/^(?:\+91[6-9]\d{9}|[^\s@]+@[^\s@]+\.[^\s@]+)$/.test(normalized)) {
      return reply(400, "Enter a valid email or mobile number and agree to receive updates.");
    }
    const response = await fetch(new URL("/rest/v1/directory_waitlist", config.url), {
      method: "POST",
      headers: { apikey: config.key, Authorization: "Bearer " + config.key, "Content-Type": "application/json", Prefer: "resolution=ignore-duplicates" },
      body: JSON.stringify({ city, specialty, contact: normalized }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    return response.ok ? reply(200) : reply(503, "Notifications are temporarily unavailable.");
  } catch {
    return reply(400, "Could not submit your request. Please try again later.");
  }
}
