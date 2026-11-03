import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

async function staff(request: NextRequest) {
  const token = request.headers.get("authorization")?.match(/^Bearer (\S+)$/i)?.[1];
  if (!token) return null;
  const user = await database("/auth/v1/user", undefined, token);
  if (!user.ok) return null;
  const { id } = await user.json();
  if (typeof id !== "string" || !uuid.test(id)) return null;
  const membership = await database("/rest/v1/crm_staff?select=role&user_id=eq." + id);
  if (!membership.ok || !(await membership.json()).length) return null;
  return id;
}

export async function GET(request: NextRequest) {
  if (!config()) return reply({ error: "Staging CRM unavailable" }, 404);
  try {
    const clinic = request.nextUrl.searchParams.has("clinic");
    if (clinic && !(await staff(request))) return reply({ error: "Staff access required" }, 403);
    const path = clinic
      ? "/rest/v1/crm_calendar?order=starts_at&limit=500"
      : "/rest/v1/crm_calendar?select=id,starts_at,ends_at&blocked=eq.false&booking_id=is.null&order=starts_at&limit=100&starts_at=gt." + new Date().toISOString();
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
  if (typeof input?.slot !== "string" || !uuid.test(input.slot)) return reply({ error: "Invalid slot" }, 400);
  try {
    let response;
    if (typeof input.blocked === "boolean") {
      const actor = await staff(request);
      if (!actor) return reply({ error: "Staff access required" }, 403);
      response = await database("/rest/v1/rpc/crm_set_block", { actor, slot: input.slot, desired: input.blocked });
    } else {
      if (typeof input.key !== "string" || !uuid.test(input.key)) return reply({ error: "Invalid booking key" }, 400);
      response = await database("/rest/v1/rpc/crm_reserve", { slot: input.slot, request_id: input.key });
    }
    if (response.status === 403) return reply({ error: "Scheduler access required" }, 403);
    if (response.status === 409) return reply({ error: "Slot unavailable or booking key already used" }, 409);
    if (!response.ok) return reply({ error: "Booking service unavailable" }, 503);
    return reply(response.status === 204 ? {} : { result: await response.json() });
  } catch {
    return reply({ error: "Booking service unavailable" }, 503);
  }
}
