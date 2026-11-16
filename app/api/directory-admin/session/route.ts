import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { directoryIntakeConfig } from "@/lib/directory-intake";
import { directoryRpc, jsonBody, sameOrigin } from "@/lib/directory-rpc";
export const dynamic = "force-dynamic";
const reply = (status: number, data: object) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: Request) {
  if (!sameOrigin(request)) return reply(403, { error: "Use the DOCVY admin page." });
  const body = await jsonBody(request, 3000);
  const config = directoryIntakeConfig();
  if (!body || !config) return reply(400, { error: "Check the sign-in form." });
  if (body.action === "logout") {
    const token = cookies().get("docvy-directory-session")?.value;
    cookies().delete("docvy-directory-session");
    if (token) await fetch(new URL("/auth/v1/logout?scope=local", config.url), { method: "POST", headers: { apikey: config.key, Authorization: "Bearer " + token }, cache: "no-store" }).catch(() => null);
    return reply(200, { ok: true });
  }
  if (typeof body.email !== "string" || body.email.trim().toLowerCase() !== "contact@docvy.in" || typeof body.password !== "string" || body.password.length < 12 || body.password.length > 128 || !["login", "signup"].includes(String(body.action))) return reply(400, { error: "Use contact@docvy.in and a password of 12–128 characters." });
  try {
    const signup = body.action === "signup";
    const url = new URL(signup ? "/auth/v1/signup" : "/auth/v1/token?grant_type=password", config.url);
    if (signup) url.searchParams.set("redirect_to", "https://www.docvy.in/admin/directory");
    const response = await fetch(url, { method: "POST", headers: { apikey: config.key, "Content-Type": "application/json" }, body: JSON.stringify({ email: "contact@docvy.in", password: body.password }), cache: "no-store", signal: AbortSignal.timeout(10000) });
    const data = await response.json() as { access_token?: string; expires_in?: number; user?: { email_confirmed_at?: string } };
    if (!response.ok) return reply(response.status === 429 ? 429 : 401, { error: response.status === 429 ? "Too many sign-in attempts. Please wait before trying again." : signup ? "Account setup could not be confirmed. Try signing in if you already registered." : "Sign-in failed. Check your password and confirm your email first." });
    if (signup && !data.access_token) return reply(200, { confirmationRequired: true });
    if (!data.access_token) return reply(401, { error: "Please confirm your owner email before signing in." });
    const admin = await directoryRpc("docvy_is_directory_admin", {}, data.access_token);
    if (!admin.ok || await admin.json() !== true) return reply(403, { error: "Only the confirmed DOCVY owner can access this page." });
    cookies().set("docvy-directory-session", data.access_token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: Math.min(data.expires_in || 3600, 3600) });
    return reply(200, { ok: true });
  } catch { return reply(502, { error: "The account service could not be reached. Please retry." }); }
}
