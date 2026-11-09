export function directoryIntakeConfig() {
  const { DOCVY_DIRECTORY_INTAKE_ENABLED, DOCVY_DIRECTORY_INTAKE_URL, DOCVY_DIRECTORY_INTAKE_KEY } = process.env;
  if (DOCVY_DIRECTORY_INTAKE_ENABLED !== "true" || !DOCVY_DIRECTORY_INTAKE_KEY ||
      DOCVY_DIRECTORY_INTAKE_URL !== "https://cxyscxjauxoizvvllmfu.supabase.co") return null;
  return { url: DOCVY_DIRECTORY_INTAKE_URL, key: DOCVY_DIRECTORY_INTAKE_KEY };
}
