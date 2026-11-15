import { createHmac } from "node:crypto";

type Json = Record<string, unknown>;

function config() {
  const base = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) throw new Error("Booking database is not configured");
  const url = new URL(base);
  if (url.protocol !== "https:" || !url.hostname.endsWith(".supabase.co")) {
    throw new Error("Invalid booking database URL");
  }
  return { url, key };
}

export function bookingConfigured() {
  return Boolean((process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL) && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function bookingDb(path: string, options: { method?: "GET" | "POST" | "PATCH"; query?: URLSearchParams; body?: unknown; bearer?: string } = {}) {
  const { url, key } = config();
  const endpoint = new URL(`/rest/v1/${path}`, url);
  if (options.query) endpoint.search = options.query.toString();
  const response = await fetch(endpoint, {
    method: options.method ?? "GET",
    headers: {
      apikey: key,
      Authorization: `Bearer ${options.bearer ?? key}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      Prefer: "return=representation",
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  const result: unknown = await response.json().catch(() => null);
  if (!response.ok) throw new Error(`booking_database_error_${response.status}`);
  return result;
}

export async function verifiedBookingUser(accessToken: string) {
  if (!accessToken || accessToken.length > 4096) return null;
  const { url, key } = config();
  const response = await fetch(new URL("/auth/v1/user", url), {
    headers: { apikey: key, Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
    signal: AbortSignal.timeout(7000),
  });
  if (!response.ok) return null;
  const user = await response.json().catch(() => null) as { id?: string; email_confirmed_at?: string } | null;
  return user?.id && user.email_confirmed_at ? { id: user.id, accessToken } : null;
}

export async function bookingPermissions(token: string) {
  const user = await verifiedBookingUser(token);
  if (!user) return null;
  const admin = await bookingDb("rpc/docvy_is_directory_admin", {
    method: "POST", bearer: token, body: {},
  });
  const isAdmin = admin === true;
  const rows = await bookingDb("crm_staff", {
    query: new URLSearchParams({
      select: "clinic_id,role,doctor_id",
      user_id: `eq.${user.id}`,
      active: "eq.true",
      limit: "100",
    }),
  }) as Array<{ clinic_id: string; role: string; doctor_id?: string | null }>;
  return { id: user.id, isAdmin, clinicIds: rows.map(row => row.clinic_id), roles: rows };
}

export function clientFingerprint(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const secret = process.env.DOCVY_BOOKING_RATE_SECRET;
  if (!secret || secret.length < 32) throw new Error("Rate-limit secret is not configured");
  return createHmac("sha256", secret).update(forwarded).digest("hex");
}

export function jsonNoStore(body: Json, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}
