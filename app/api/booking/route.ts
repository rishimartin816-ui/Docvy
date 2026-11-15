import { NextRequest, NextResponse } from "next/server";
import { clinicCrmConfig, crmUuid } from "@/lib/clinic-crm-config";
import { database, requestToken } from "@/lib/crm-server";
export const dynamic = "force-dynamic";
const reply = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
function enabled() { return process.env.DOCVY_BOOKING_WORKFLOW_ENABLED === "true" && clinicCrmConfig()?.staging === true; }
async function founder(request: NextRequest) {
    const token = requestToken(request);
    if (!token)
        return false;
    const response = await database("/auth/v1/user", undefined, token);
    if (!response.ok)
        return false;
    const user = await response.json();
    if (!crmUuid.test(user.id ?? ""))
        return false;
    const found = await database("/rest/v1/crm_founders?select=user_id&user_id=eq." + user.id);
    return found.ok && (await found.json()).length === 1;
}
export async function GET(request: NextRequest) {
    if (!enabled())
        return reply({ error: "Staging booking workflow disabled" }, 404);
    try {
        if (request.nextUrl.searchParams.has("dashboard")) {
            if (!await founder(request))
                return reply({ error: "Founder access required" }, 403);
            const [enquiries, notifications] = await Promise.all([database("/rest/v1/crm_enquiries?select=clinic_id,status,booking_id&limit=1000"), database("/rest/v1/crm_notification_outbox?select=event,status,attempts&limit=1000")]);
            if (!enquiries.ok || !notifications.ok)
                return reply({ error: "Dashboard unavailable" }, 503);
            return reply({ enquiries: await enquiries.json(), notifications: await notifications.json(), limit: 1000, staging: true });
        }
        const config = clinicCrmConfig()!;
        const slots = await database("/rest/v1/crm_requestable_slots?select=id,provider_id,starts_at,ends_at,fee_paise&clinic_id=eq." + config.clinicId + "&order=starts_at,id&limit=100");
        return slots.ok ? reply(await slots.json()) : reply({ error: "Availability unavailable" }, 503);
    }
    catch {
        return reply({ error: "Booking service unavailable" }, 503);
    }
}
export async function POST(request: NextRequest) {
    if (!enabled())
        return reply({ error: "Staging booking workflow disabled" }, 404);
    if (request.headers.get("origin") !== request.nextUrl.origin)
        return reply({ error: "Submit from DOCVY" }, 403);
    try {
        const raw = await request.text();
        if (raw.length > 2000)
            return reply({ error: "Request too large" }, 413);
        const body = JSON.parse(raw);
        if (body?.action === "mock-notifications") {
            if (!await founder(request))
                return reply({ error: "Founder access required" }, 403);
            const result = await database("/rest/v1/rpc/crm_mock_notifications", {});
            return result.ok ? reply({ processed: await result.json(), mode: "mock", externalMessagesSent: 0 }) : reply({ error: "Outbox unavailable" }, 503);
        }
        if (!body || Object.keys(body).some(k => !["requestId", "slot", "name", "phone", "email", "consent"].includes(k)) || !crmUuid.test(body.requestId ?? "") || !crmUuid.test(body.slot ?? "") || typeof body.name !== "string" || typeof body.phone !== "string" || typeof body.email !== "string" || body.consent !== true)
            return reply({ error: "Check the form and consent" }, 400);
        const result = await database("/rest/v1/rpc/crm_request_slot", { request_id: body.requestId, slot: body.slot, patient: body.name, phone: body.phone, contact_email: body.email, consent: body.consent });
        if (!result.ok)
            return reply({ error: result.status === 409 ? "This slot or request has changed" : result.status === 429 ? "Please wait before requesting again" : "Request could not be saved" }, [400, 409, 429].includes(result.status) ? result.status : 503);
        return reply({ reference: await result.json(), status: "pending_clinic_approval", confirmed: false }, 201);
    }
    catch {
        return reply({ error: "Request could not be processed" }, 503);
    }
}
