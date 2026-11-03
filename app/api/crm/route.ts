import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const stagingClinic = "7dfbf055-2737-448c-921e-c074d84393d4";
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const reply = (data: unknown, status = 200) =>
  NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });

function config() {
  const { DOCVY_CRM_STAGING_URL: url, DOCVY_CRM_STAGING_KEY: key, DOCVY_CRM_STAGING: enabled } = process.env;
  if (enabled !== "true" || process.env.VERCEL_ENV === "production" || !url || !key) return null;
  return { url, key };
}

async function database(path: string, body?: object, token?: string) {
  const target = config()!;
  return fetch(new URL(path, target.url), {
    method: body ? "POST" : "GET",
    headers: { apikey: target.key, Authorization: "Bearer " + (token ?? target.key), "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
}

function requestToken(request: NextRequest) {
  return request.headers.get("authorization")?.match(/^Bearer (\S+)$/i)?.[1];
}

async function staff(token?: string) {
  if (!token) return null;
  const user = await database("/auth/v1/user", undefined, token);
  if (!user.ok) return null;
  const { id } = await user.json();
  if (typeof id !== "string" || !uuid.test(id)) return null;
  const membership = await database("/rest/v1/crm_staff?select=role&clinic_id=eq." + stagingClinic + "&user_id=eq." + id);
  if (!membership.ok) return null;
  const [access] = await membership.json();
  return access ? { id, role: access.role } : null;
}

export async function GET(request: NextRequest) {
  if (!config()) return reply({ error: "Staging CRM unavailable" }, 404);
  try {
    const admin = request.nextUrl.searchParams.has("admin");
    const clinic = admin || request.nextUrl.searchParams.has("clinic");
    if (clinic) {
      const access = await staff(requestToken(request));
      if (!access || (admin && access.role !== "owner")) return reply({ error: "Staff access required" }, 403);
    }
    const query = "/rest/v1/crm_calendar?clinic_id=eq." + stagingClinic;
    const path = clinic
      ? query + "&order=starts_at&limit=500"
      : query + "&select=id,starts_at,ends_at&blocked=eq.false&booking_id=is.null&order=starts_at&limit=100&starts_at=gt." + new Date().toISOString();
    const response = await database(path);
    return response.ok ? reply(await response.json()) : reply({ error: "Calendar unavailable" }, 503);
  } catch {
    return reply({ error: "Calendar unavailable" }, 503);
  }
}

export async function POST(request: NextRequest) {
  if (!config()) return reply({ error: "Staging CRM unavailable" }, 404);
  let input;
  try {
    const raw = await request.text();
    if (raw.length > 1024) return reply({ error: "Request too large" }, 413);
    input = JSON.parse(raw);
  } catch {
    return reply({ error: "Invalid request" }, 400);
  }
  if (input?.action === "sign-in") {
    if (typeof input.email !== "string" || !input.email.trim() ||
        typeof input.password !== "string" || !input.password) {
      return reply({ error: "Email and password required" }, 400);
    }
    try {
      const auth = await database("/auth/v1/token?grant_type=password", {
        email: input.email.trim(),
        password: input.password,
      });
      if (auth.status === 429) return reply({ error: "Too many attempts. Try again later." }, 429);
      if (auth.status >= 500) return reply({ error: "Sign-in unavailable" }, 503);
      if (!auth.ok) return reply({ error: "Staff sign-in failed" }, 403);
      const { access_token: token } = await auth.json();
      if (typeof token !== "string") return reply({ error: "Sign-in unavailable" }, 503);
      const access = await staff(token);
      if (!access || (input.admin === true && access.role !== "owner")) {
        return reply({ error: "Staff sign-in failed" }, 403);
      }
      return reply({ token });
    } catch {
      return reply({ error: "Sign-in unavailable" }, 503);
    }
  }
  if (input?.action === "booking-status" || input?.action === "reschedule") {
    const reschedule = input.action === "reschedule";
    if (typeof input.booking !== "string" || !uuid.test(input.booking) ||
        (reschedule ? typeof input.source !== "string" || !uuid.test(input.source) ||
          typeof input.destination !== "string" || !uuid.test(input.destination)
          : !["cancelled", "completed", "no_show"].includes(input.status))) {
      return reply({ error: "Invalid booking status request" }, 400);
    }
    try {
      const actor = await staff(requestToken(request));
      if (!actor) return reply({ error: "Staff access required" }, 403);
      const booking = { actor: actor.id, clinic: stagingClinic, booking: input.booking };
      const result = reschedule
        ? await database("/rest/v1/rpc/crm_reschedule_booking", { ...booking, source: input.source, destination: input.destination })
        : await database("/rest/v1/rpc/crm_transition_booking", { ...booking, desired: input.status });
      if (result.status === 403) return reply({ error: "Scheduling access required" }, 403);
      if (result.status === 409) return reply({ error: "Booking cannot be changed at this time" }, 409);
      return result.ok ? reply({}) : reply({ error: "Booking update unavailable" }, 503);
    } catch {
      return reply({ error: "Booking update unavailable" }, 503);
    }
  }
  if (typeof input?.slot !== "string" || !uuid.test(input.slot)) return reply({ error: "Invalid slot" }, 400);
  try {
    let response;
    if (typeof input.blocked === "boolean") {
      const actor = await staff(requestToken(request));
      if (!actor) return reply({ error: "Staff access required" }, 403);
      response = await database("/rest/v1/rpc/crm_set_block", { actor: actor.id, clinic: stagingClinic, slot: input.slot, desired: input.blocked });
    } else {
      if (typeof input.key !== "string" || !uuid.test(input.key)) return reply({ error: "Invalid booking key" }, 400);
      response = await database("/rest/v1/rpc/crm_reserve", { clinic: stagingClinic, slot: input.slot, request_id: input.key });
    }
    if (response.status === 403) return reply({ error: "Scheduler access required" }, 403);
    if (response.status === 409) return reply({ error: "Slot unavailable or booking key already used" }, 409);
    if (!response.ok) return reply({ error: "Booking service unavailable" }, 503);
    return reply(response.status === 204 ? {} : { result: await response.json() });
  } catch {
    return reply({ error: "Booking service unavailable" }, 503);
  }
}
