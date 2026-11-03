const stagingClinic = "7dfbf055-2737-448c-921e-c074d84393d4";
const stagingHost = "pmyzedtpogmhvcrurcau.supabase.co";
export const crmUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function clinicCrmConfig() {
  const env = process.env;
  if (env.VERCEL_ENV !== "production") {
    if (env.DOCVY_CRM_STAGING !== "true" || !env.DOCVY_CRM_STAGING_URL || !env.DOCVY_CRM_STAGING_KEY) return null;
    return {
      staging: true,
      clinicId: stagingClinic,
      clinicName: "DOCVY Test Hospital",
      url: env.DOCVY_CRM_STAGING_URL,
      key: env.DOCVY_CRM_STAGING_KEY,
    };
  }

  const { DOCVY_CRM_LIVE_URL: url, DOCVY_CRM_LIVE_KEY: key,
    DOCVY_CRM_LIVE_CLINIC_ID: clinicId, DOCVY_CRM_LIVE_CLINIC_NAME: clinicName } = env;
  if (env.DOCVY_CRM_LIVE !== "true" || !url || !key || !clinicId || !crmUuid.test(clinicId) ||
      clinicId.toLowerCase() === stagingClinic || !clinicName?.trim()) return null;
  try {
    const target = new URL(url);
    if (target.protocol !== "https:" || target.hostname === stagingHost ||
        !/^[a-z0-9]+\.supabase\.co$/.test(target.hostname) || target.username || target.password || target.port) return null;
    return { staging: false, clinicId, clinicName: clinicName.trim(), url: target.origin, key };
  } catch {
    return null;
  }
}
