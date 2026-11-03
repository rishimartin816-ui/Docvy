import { NextRequest, NextResponse } from "next/server";

import { clinicCrmConfig, crmUuid as uuid } from "@/lib/clinic-crm-config";

export const dynamic = "force-dynamic";

const reply = (data: unknown, status = 200) =>
  NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });

async function database(path: string, body?: object, token?: string) {
  const target = clinicCrmConfig()!;
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

async function staff(clinicId: string, token?: string) {
  if (!token) return null;
  const user = await database("/auth/v1/user", undefined, token);
  if (!user.ok) return null;
  const { id } = await user.json();
  if (typeof id !== "string" || !uuid.test(id)) return null;
  const membership = await database("/rest/v1/crm_staff?select=role&clinic_id=eq." + clinicId + "&user_id=eq." + id);
  if (!membership.ok) return null;
  const [access] = await membership.json();
  return access ? { id, role: access.role } : null;
}

export async function GET(request: NextRequest) {
  const target = clinicCrmConfig();
  if (!target) return reply({ error: "CRM unavailable" }, 404);
  const { clinicId } = target;
  try {
    const admin = request.nextUrl.searchParams.has("admin");
    const enquiries = request.nextUrl.searchParams.has("enquiries");
    const history = request.nextUrl.searchParams.get("history");
    const clinic = admin || enquiries || history !== null || request.nextUrl.searchParams.has("clinic");
    if (!clinic && !target.staging) return reply({ error: "Online booking unavailable" }, 404);
    if (clinic) {
      const access = await staff(clinicId, requestToken(request));
      if (!access || (admin && access.role !== "owner")) return reply({ error: "Staff access required" }, 403);
      if (history !== null) {
        if (!uuid.test(history)) return reply({ error: "Enter a valid appointment reference" }, 400);
        const result = await database("/rest/v1/rpc/crm_booking_history", { actor: access.id, clinic: clinicId, booking: history });
        if (result.status === 403) return reply({ error: "Appointment history access required" }, 403);
        if (result.status === 404) return reply({ error: "Appointment not found" }, 404);
        return result.ok ? reply(await result.json()) : reply({ error: "Appointment history unavailable" }, 503);
      }
      if (enquiries) {
        const result = await database("/rest/v1/rpc/crm_list_enquiries", { actor: access.id, clinic: clinicId });
        if (result.status === 403) return reply({ error: "Enquiry access required" }, 403);
        return result.ok ? reply(await result.json()) : reply({ error: "Enquiries unavailable" }, 503);
      }
    }
    const query = "/rest/v1/crm_calendar?clinic_id=eq." + clinicId;
    const available = "&select=id,starts_at,ends_at&blocked=eq.false&booking_id=is.null&order=starts_at&limit=100&starts_at=gt." + new Date().toISOString();
    let path = query + available;
    if (clinic && !request.nextUrl.searchParams.has("upcoming")) {
      const day = request.nextUrl.searchParams.get("day");
      const days = request.nextUrl.searchParams.get("days") ?? "7";
      if (!day || !/^\d{4}-\d{2}-\d{2}$/.test(day) || !["1", "7"].includes(days)) {
        return reply({ error: "Choose a valid calendar day and view" }, 400);
      }
      const start = Date.parse(day + "T00:00:00+05:30");
      const utcDay = Date.parse(day + "T00:00:00Z");
      if (!Number.isFinite(start) || new Date(utcDay).toISOString().slice(0, 10) !== day) {
        return reply({ error: "Choose a valid calendar day" }, 400);
      }
      const end = new Date(start + Number(days) * 86400000).toISOString();
      path = query + "&order=starts_at&starts_at=gte." + new Date(start).toISOString() + "&starts_at=lt." + end;
    }
    const response = await database(path);
    return response.ok ? reply(await response.json()) : reply({ error: "Calendar unavailable" }, 503);
  } catch {
    return reply({ error: "Calendar unavailable" }, 503);
  }
}

export async function POST(request: NextRequest) {
  const target = clinicCrmConfig();
  if (!target) return reply({ error: "CRM unavailable" }, 404);
  const { clinicId } = target;
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
      const access = await staff(clinicId, token);
      if (!access || (input.admin === true && access.role !== "owner")) {
        return reply({ error: "Staff sign-in failed" }, 403);
      }
      const canSchedule = ["owner", "clinic_admin", "manager", "receptionist", "scheduler"].includes(access.role);
      return reply({ token, canSchedule });
    } catch {
      return reply({ error: "Sign-in unavailable" }, 503);
    }
  }
  if (input?.action === "create-slot") {
    const localTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    if (typeof input.starts !== "string" || typeof input.ends !== "string" ||
        !localTime.test(input.starts) || !localTime.test(input.ends)) {
      return reply({ error: "Choose valid start and end times" }, 400);
    }
    try {
      const actor = await staff(clinicId, requestToken(request));
      if (!actor || (input.admin === true && actor.role !== "owner")) return reply({ error: "Staff access required" }, 403);
      const result = await database("/rest/v1/rpc/crm_create_slot", {
        actor: actor.id, clinic: clinicId, starts: input.starts + "+05:30", ends: input.ends + "+05:30",
      });
      if (result.status === 400) return reply({ error: "Choose a future slot lasting 5 minutes to 4 hours within the next year" }, 400);
      if (result.status === 403) return reply({ error: "Scheduling access required" }, 403);
      if (result.status === 409) return reply({ error: "This time overlaps an existing slot" }, 409);
      return result.ok ? reply({}) : reply({ error: "Slot could not be saved" }, 503);
    } catch {
      return reply({ error: "Slot could not be saved" }, 503);
    }
  }
  if (input?.action === "book-enquiry") {
    if (typeof input.reference !== "string" || !/^DV-[0-9A-F]{8}$/.test(input.reference) ||
        typeof input.slot !== "string" || !uuid.test(input.slot)) {
      return reply({ error: "Invalid enquiry booking" }, 400);
    }
    try {
      const actor = await staff(clinicId, requestToken(request));
      if (!actor || (input.admin === true && actor.role !== "owner")) return reply({ error: "Staff access required" }, 403);
      const result = await database("/rest/v1/rpc/crm_book_enquiry", {
        actor: actor.id, clinic: clinicId, ref: input.reference, slot: input.slot,
      });
      if (result.status === 403) return reply({ error: "Scheduling access required" }, 403);
      if (result.status === 404) return reply({ error: "Enquiry not found" }, 404);
      if (result.status === 409) return reply({ error: "Slot unavailable or enquiry already closed. Refresh and try again." }, 409);
      return result.ok ? reply({ bookingId: await result.json() }) : reply({ error: "Enquiry booking unavailable" }, 503);
    } catch {
      return reply({ error: "Enquiry booking unavailable" }, 503);
    }
  }
  if (input?.action === "enquiry-status") {
    if (typeof input.reference !== "string" || !/^DV-[0-9A-F]{8}$/.test(input.reference) ||
        !["new", "contacted"].includes(input.expected) || !["contacted", "closed"].includes(input.status)) {
      return reply({ error: "Invalid enquiry update" }, 400);
    }
    try {
      const actor = await staff(clinicId, requestToken(request));
      if (!actor || (input.admin === true && actor.role !== "owner")) return reply({ error: "Staff access required" }, 403);
      const result = await database("/rest/v1/rpc/crm_update_enquiry", {
        actor: actor.id, clinic: clinicId, ref: input.reference, expected: input.expected, desired: input.status,
      });
      if (result.status === 400) return reply({ error: "Invalid enquiry update" }, 400);
      if (result.status === 403) return reply({ error: "Enquiry access required" }, 403);
      if (result.status === 404) return reply({ error: "Enquiry not found" }, 404);
      if (result.status === 409) return reply({ error: "Enquiry changed. Reload and try again." }, 409);
      return result.ok ? reply({}) : reply({ error: "Enquiry update unavailable" }, 503);
    } catch {
      return reply({ error: "Enquiry update unavailable" }, 503);
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
      const actor = await staff(clinicId, requestToken(request));
      if (!actor) return reply({ error: "Staff access required" }, 403);
      const booking = { actor: actor.id, clinic: clinicId, booking: input.booking };
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
      const actor = await staff(clinicId, requestToken(request));
      if (!actor) return reply({ error: "Staff access required" }, 403);
      response = await database("/rest/v1/rpc/crm_set_block", { actor: actor.id, clinic: clinicId, slot: input.slot, desired: input.blocked });
    } else {
      if (!target.staging) return reply({ error: "Online booking unavailable" }, 404);
      if (typeof input.key !== "string" || !uuid.test(input.key)) return reply({ error: "Invalid booking key" }, 400);
      response = await database("/rest/v1/rpc/crm_reserve", { clinic: clinicId, slot: input.slot, request_id: input.key });
    }
    if (response.status === 403) return reply({ error: "Scheduler access required" }, 403);
    if (response.status === 409) return reply({ error: "Slot unavailable or booking key already used" }, 409);
    if (!response.ok) return reply({ error: "Booking service unavailable" }, 503);
    return reply(response.status === 204 ? {} : { result: await response.json() });
  } catch {
    return reply({ error: "Booking service unavailable" }, 503);
  }
}
