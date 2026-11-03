export function crmIntakeConfig() {
  const { DOCVY_CRM_INTAKE_URL, DOCVY_CRM_INTAKE_KEY, DOCVY_CRM_INTAKE_ENABLED } = process.env;
  if (DOCVY_CRM_INTAKE_ENABLED !== "true" || !DOCVY_CRM_INTAKE_URL || !DOCVY_CRM_INTAKE_KEY) return null;
  try {
    const url = new URL(DOCVY_CRM_INTAKE_URL);
    if (url.protocol !== "https:" || !/^[a-z0-9]+\.supabase\.co$/.test(url.hostname)) return null;
    return { url, key: DOCVY_CRM_INTAKE_KEY };
  } catch {
    return null;
  }
}

/** Configuration presence only; successful delivery is verified separately. */
export function isAppointmentIntakeConfigured() {
  if (process.env.DOCVY_CRM_INTAKE_ENABLED === "true") return Boolean(crmIntakeConfig());
  return Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL && process.env.GOOGLE_SHEETS_WEBHOOK_TOKEN);
}
