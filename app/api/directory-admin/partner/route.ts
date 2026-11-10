import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { directoryRpc, jsonBody, sameOrigin } from "@/lib/directory-rpc";
import { crmUuid } from "@/lib/clinic-crm-config";

export const dynamic = "force-dynamic";
const reply = (status: number, data: object) => NextResponse.json(data, { status, headers: { "Cache-Control": "private, no-store" } });
export async function POST(request: Request) {
  if (!sameOrigin(request)) return reply(403, { error: "Use the DOCVY admin page." });
  const token = cookies().get("docvy-directory-session")?.value;
  if (!token) return reply(401, { error: "Sign in to continue." });
  const body = await jsonBody(request);
  if (!body || typeof body.applicationId !== "string" || !crmUuid.test(body.applicationId) || !["approve", "reject"].includes(String(body.action)) || !body.data || typeof body.data !== "object" || Array.isArray(body.data)) return reply(400, { error: "Check the review form." });
  try {
    const result = await directoryRpc("docvy_review_partner_application", { p_id: body.applicationId, p_action: body.action, p_data: body.data }, token);
    if (!result.ok) {
      const details = await result.json() as { message?: string };
      const status = [400,403,404,409].includes(result.status) ? result.status : 502;
      return reply(status, { error: status === 502 ? "The decision could not be confirmed. Reload before trying again." : details.message });
    }
    return reply(200, { providerId: await result.json() });
  } catch { return reply(502, { error: "The decision could not be confirmed. Reload before trying again." }); }
}
