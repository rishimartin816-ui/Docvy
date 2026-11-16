import { cookies } from "next/headers";
import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { directoryRpc, jsonBody, sameOrigin } from "@/lib/directory-rpc";
import { crmUuid } from "@/lib/clinic-crm-config";
import { storagePhoto, webpPhoto } from "@/lib/profile-photos";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const reply = (status: number, data: object) => NextResponse.json(data, { status, headers: { "Cache-Control": "private, no-store" } });
export async function POST(request: Request) {
  if (!sameOrigin(request)) return reply(403, { error: "Use the DOCVY admin page." });
  const token = cookies().get("docvy-directory-session")?.value;
  if (!token) return reply(401, { error: "Sign in to continue." });
  const body = await jsonBody(request);
  if (!body || typeof body.applicationId !== "string" || !crmUuid.test(body.applicationId) || !["approve", "reject"].includes(String(body.action)) || !body.data || typeof body.data !== "object" || Array.isArray(body.data)) return reply(400, { error: "Check the review form." });
  try {
    let photo: Buffer | null = null;
    if (body.action === "approve") {
      const review = await directoryRpc("docvy_directory_admin_data", {}, token);
      if (!review.ok) return reply(review.status === 403 ? 403 : 502, { error: "Owner access is required to review this application." });
      const data = await review.json() as { applications: { id: string; payload: Record<string, unknown> }[] };
      const application = data.applications.find(item => item.id === String(body.applicationId).toLowerCase());
      if (!application) return reply(404, { error: "Application not found." });
      if (application.payload.hasPhoto === true) {
        const image = await storagePhoto("docvy-profile-submissions", "partner/" + application.id + ".webp", token);
        if (!image.ok) return reply(400, { error: "The required portrait has not finished uploading. Ask the applicant to retry with the same details and photo." });
        const bytes = Buffer.from(await image.arrayBuffer());
        photo = webpPhoto("data:image/webp;base64," + bytes.toString("base64"));
        if (!photo || createHash("sha256").update(photo).digest("hex") !== application.payload.photoSha256) return reply(400, { error: "The uploaded portrait does not match this application." });
      }
    }
    const result = await directoryRpc("docvy_review_partner_application", { p_id: body.applicationId, p_action: body.action, p_data: body.data }, token);
    if (!result.ok) {
      const details = await result.json() as { message?: string };
      const status = [400,403,404,409].includes(result.status) ? result.status : 502;
      return reply(status, { error: status === 502 ? "The decision could not be confirmed. Reload before trying again." : details.message });
    }
    const providerId = await result.json();
    if (photo && providerId) {
      const upload = await storagePhoto("docvy-provider-photos", "partner/" + String(body.applicationId).toLowerCase() + ".webp", token, photo);
      if (!upload.ok && upload.status !== 409) return reply(502, { error: "The profile was approved, but its photo could not be published. Retry this approval or use Finish Photo Publication in previous decisions." });
      const attached = await directoryRpc("docvy_review_partner_application", { p_id: body.applicationId, p_action: "approve", p_data: { ...body.data, publishPhoto: true } }, token);
      if (!attached.ok) return reply(502, { error: "The profile was approved. Retry Finish Photo Publication to attach its portrait." });
    }
    return reply(200, { providerId });
  } catch { return reply(502, { error: "The decision could not be confirmed. Reload before trying again." }); }
}
