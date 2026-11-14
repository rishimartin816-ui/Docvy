import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { directoryIntakeConfig } from "@/lib/directory-intake";
import { signedDirectoryWrite, jsonBody, sameOrigin } from "@/lib/directory-rpc";
import { storagePhoto, webpPhoto } from "@/lib/profile-photos";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const reply = (status: number, data: object) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
const text = (v: unknown, n: number) => typeof v === "string" ? v.trim().replace(/[<>\u0000-\u001f]/g, "").slice(0, n) : "";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return reply(403, { error: "Submit this form from DOCVY." });
  const body = await jsonBody(request, 2900000);
  if (!body) return reply(400, { error: "The form could not be read." });
  if (body.website) return reply(400, { error: "The form could not be submitted." });
  const photo = body.photo ? webpPhoto(body.photo) : null;
  if (body.photo && (!photo || body.kind !== "claim")) return reply(400, { error: "Choose a valid portrait smaller than 2 MB." });
  if (typeof body.requestId !== "string" || !/^[0-9a-f-]{36}$/i.test(body.requestId) || !["claim", "removal"].includes(String(body.kind))) return reply(400, { error: "Reload the form and try again." });
  const config = directoryIntakeConfig();
  if (!config) return reply(503, { error: "Profile requests are unavailable. Email contact@docvy.in." });
  try {
    const result = await signedDirectoryWrite("profile", {
      requestId: body.requestId, kind: body.kind,
      networkHash: createHmac("sha256", process.env.DOCVY_DIRECTORY_WRITE_SECRET || config.key).update(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown").digest("hex"),
      payload: {
        providerId: text(body.providerId, 120), doctorName: text(body.doctorName, 120),
        registrationNumber: text(body.registrationNumber, 100), registrationCouncil: text(body.registrationCouncil, 150),
        email: text(body.email, 254).toLowerCase(), phone: text(body.phone, 24),
        bio: text(body.bio, 2000), details: text(body.details, 1500), consent: body.consent === true,
      },
    });
    if (!result.ok) {
      const data = await result.json() as { message?: string };
      return reply([400, 404, 409, 429].includes(result.status) ? result.status : 502, { error: [400, 404, 409, 429].includes(result.status) ? data.message : "We could not confirm the saved request. Retry with the same details." });
    }
    const reference: unknown = await result.json();
    if (typeof reference !== "string" || !/^DP-[A-F0-9]{16}$/.test(reference)) throw new Error("Invalid reference");
    let photoStatus = "none";
    if (photo) {
      const upload = await storagePhoto("docvy-profile-submissions", body.requestId + ".webp", undefined, photo);
      photoStatus = upload.ok || upload.status === 409 ? "private_review" : "upload_failed";
    }
    return reply(201, { reference, emailStatus: "pending_connection", photoStatus });
  } catch { return reply(502, { error: "We could not confirm the saved request. Retry with the same details." }); }
}
