import { clinicCrmConfig } from "./clinic-crm-config";
import { directoryIntakeConfig } from "./directory-intake";
import type { ProviderCandidate } from "./provider-candidates";

export function crmIntakeConfig() {
  const { DOCVY_CRM_INTAKE_URL, DOCVY_CRM_INTAKE_KEY, DOCVY_CRM_INTAKE_ENABLED } = process.env;
  if (DOCVY_CRM_INTAKE_ENABLED !== "true" || !DOCVY_CRM_INTAKE_URL || !DOCVY_CRM_INTAKE_KEY) return null;
  const workspace = clinicCrmConfig();
  if (!workspace) return null;
  try {
    const url = new URL(DOCVY_CRM_INTAKE_URL);
    if (url.origin !== workspace.url || url.username || url.password || url.port ||
        url.pathname !== "/" || url.search || url.hash) return null;
    return { url, key: DOCVY_CRM_INTAKE_KEY };
  } catch {
    return null;
  }
}

/** Configuration presence only; successful delivery is verified separately. */
export function isAppointmentIntakeConfigured() {
  if (directoryIntakeConfig()) return true;
  if (process.env.DOCVY_CRM_INTAKE_ENABLED === "true") return Boolean(crmIntakeConfig());
  return Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL && process.env.GOOGLE_SHEETS_WEBHOOK_TOKEN);
}

export async function providersWithAppointmentIntake(providers: ProviderCandidate[]) {
  if (!providers.length) return [];
  if (directoryIntakeConfig()) return providers.filter((provider) => provider.live === true);
  if (process.env.DOCVY_CRM_INTAKE_ENABLED !== "true") {
    return isAppointmentIntakeConfigured() ? providers : [];
  }
  const crm = crmIntakeConfig();
  if (!crm) return [];
  try {
    const url = new URL("/rest/v1/crm_enquiry_routes", crm.url);
    url.searchParams.set("select", "provider_id,city,facility");
    url.searchParams.set("enabled", "eq.true");
    const response = await fetch(url, {
      headers: { apikey: crm.key, Authorization: "Bearer " + crm.key },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return [];
    const routes: { provider_id: string; city: string; facility: string }[] = await response.json();
    const routeKeys = new Set(routes.map((route) => JSON.stringify([route.provider_id, route.city, route.facility])));
    return providers.flatMap((provider) => {
      const locations = provider.locations.filter((location) =>
        routeKeys.has(JSON.stringify([provider.id, location.city, location.facility])));
      return locations.length ? [{ ...provider, locations }] : [];
    });
  } catch {
    return [];
  }
}
