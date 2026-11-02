/** Configuration presence only; successful delivery is verified separately. */
export function isAppointmentIntakeConfigured() {
  return Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL && process.env.GOOGLE_SHEETS_WEBHOOK_TOKEN);
}
