import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { directoryRpc, jsonBody, sameOrigin } from "@/lib/directory-rpc";
import { storagePhoto } from "@/lib/profile-photos";
export const dynamic = "force-dynamic";
const reply = (status: number, data: object) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
export async function GET() {
  const token = cookies().get("docvy-directory-session")?.value;
  if (!token) return reply(401, { error: "Sign in to continue." });
  try {
    const result = await directoryRpc("docvy_directory_admin_data", {}, token);
    if (!result.ok) return reply(403, { error: "Owner access required. Sign in again if your session expired." });
    return reply(200, await result.json());
  } catch { return reply(502, { error: "Could not load the review records." }); }
}
export async function POST(request: Request) {
  if (!sameOrigin(request)) return reply(403, { error: "Use the DOCVY admin page." });
  const token = cookies().get("docvy-directory-session")?.value;
  if (!token) return reply(401, { error: "Sign in to continue." });
  const body = await jsonBody(request);
  if (!body || typeof body.providerId !== "string" || typeof body.action !== "string" || !body.data || typeof body.data !== "object" || Array.isArray(body.data)) return reply(400, { error: "Check the review form." });
  try {
    const details = body.data as Record<string, unknown>;
    if (body.action === "claim" && details.approvePhoto === true && typeof details.requestId === "string" && /^[0-9a-f-]{36}$/.test(details.requestId) && /^[a-z0-9-]+$/.test(body.providerId)) {
      const admin = await directoryRpc("docvy_is_directory_admin", {}, token);
      if (!admin.ok || await admin.json() !== true) return reply(403, { error: "Owner access required." });
      const privatePhoto = await storagePhoto("docvy-profile-submissions", details.requestId + ".webp", token);
      if (!privatePhoto.ok) return reply(400, { error: "No uploaded portrait found. Leave photo approval unchecked." });
      const approvedPath = body.providerId + "/" + details.requestId + ".webp";
      const upload = await storagePhoto("docvy-provider-photos", approvedPath, token, Buffer.from(await privatePhoto.arrayBuffer()));
      if (!upload.ok && upload.status !== 409) return reply(502, { error: "Portrait approval could not be saved." });
      details.photoUrl = "https://cxyscxjauxoizvvllmfu.supabase.co/storage/v1/object/public/docvy-provider-photos/" + approvedPath;
    }
    const result = await directoryRpc("docvy_update_directory_profile", { p_id: body.providerId, p_action: body.action, p_data: body.data }, token);
    if (!result.ok) {
      const detail = await result.json() as { message?: string };
      return reply([400,403,404].includes(result.status) ? result.status : 502, { error: [400,403,404].includes(result.status) ? detail.message : "The update could not be confirmed." });
    }
    return reply(200, { ok: true });
  } catch { return reply(502, { error: "The update could not be confirmed. Reload before trying again." }); }
}
