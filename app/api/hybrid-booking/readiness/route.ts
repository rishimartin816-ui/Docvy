import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Row = Record<string, unknown>;
const json = (body: object, status = 200) => NextResponse.json(body, {
  status,
  headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
});

async function supabaseRows(path: string, query: URLSearchParams): Promise<Row[]> {
  const rawUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!rawUrl || !key) throw new Error("booking_backend_unconfigured");
  const url = new URL(rawUrl);
  if (url.protocol !== "https:" || !url.hostname.endsWith(".supabase.co")) {
    throw new Error("invalid_booking_backend");
  }
  const response = await fetch(new URL(`/rest/v1/${path}?${query.toString()}`, url), {
    headers: { apikey: key, Authorization: `Bearer ${key}`, Accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) throw new Error("booking_backend_unavailable");
  const value: unknown = await response.json();
  if (!Array.isArray(value)) throw new Error("unexpected_booking_response");
  return value as Row[];
}

/**
 * Read-only readiness endpoint. This never reserves or confirms appointments.
 * No patient information or internal staff details are returned.
 * Source-listed third-party profiles are never automatically bookable.
 */
export async function GET(request: Request) {
  const providerId = new URL(request.url).searchParams.get("provider")?.trim() ?? "";
  if (!/^[a-z0-9][a-z0-9-]{1,100}$/.test(providerId)) {
    return json({ bookable: false, reason: "invalid_provider" }, 400);
  }

  try {
    const providers = await supabaseRows("docvy_directory_providers", new URLSearchParams({
      select: "provider_id,profile_status,consent_given,published,enabled,verified_at",
      provider_id: `eq.${providerId}`,
      limit: "1",
    }));
    const provider = providers[0];
    if (!provider || provider.profile_status !== "verified" ||
        provider.consent_given !== true || provider.published !== true ||
        provider.enabled !== true || !provider.verified_at) {
      return json({ bookable: false, reason: "provider_not_eligible" });
    }

    // The CRM roster has no provider_id column. Resolve an explicitly approved
    // mapping instead of guessing from doctor names or specialties.
    const mappings = await supabaseRows("hybrid_provider_roster_links", new URLSearchParams({
      select: "doctor_roster_id,clinic_id,scope_approved,operator_ready",
      directory_provider_id: `eq.${providerId}`,
      scope_approved: "eq.true",
      operator_ready: "eq.true",
      limit: "25",
    }));
    if (!mappings.length) return json({ bookable: false, reason: "clinic_mapping_missing" });

    const ids = [...new Set(mappings.map(r => r.clinic_id)
      .filter((v): v is string => typeof v === "string" && /^[0-9a-f-]{36}$/i.test(v)))];
    if (!ids.length) return json({ bookable: false, reason: "clinic_mapping_missing" });

    const clinics = await supabaseRows("crm_clinics", new URLSearchParams({
      select: "id,booking_enabled,name",
      id: `in.(${ids.join(",")})`,
      booking_enabled: "eq.true",
      limit: "25",
    }));
    if (!clinics.length) return json({ bookable: false, reason: "clinic_booking_disabled" });

    // Even when a clinic is enabled, actual booking requires a staffed approver
    // or a verified atomic slot reservation. Never promise confirmation here.
    return json({
      bookable: false,
      reason: "booking_workflow_not_activated",
      participatingClinicCount: clinics.length,
    });
  } catch {
    return json({ bookable: false, reason: "booking_service_unavailable" }, 503);
  }
}
