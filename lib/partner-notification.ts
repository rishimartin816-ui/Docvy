import "server-only";

type ApplicationNotice = { reference: string; doctorName: string; specialty: string; city: string };
export type PartnerEmailStatus = "accepted" | "failed" | "not_configured";

/** Save the application first; notification failures must never reject the submission. */
export async function notifyPartnerApplication(application: ApplicationNotice): Promise<PartnerEmailStatus> {
  const key = process.env.RESEND_API_KEY || process.env.resend_api_key;
  if (!key || process.env.VERCEL_ENV !== "production") return "not_configured";
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `partner-application/${application.reference}` },
      body: JSON.stringify({
        from: "DOCVY <notifications@docvy.in>",
        to: ["contact@docvy.in"],
        subject: `DOCVY | New partner application | ${application.reference}`,
        text: ["A new partner application is saved in your private DOCVY review queue.", "", `Doctor: ${application.doctorName}`, `Specialty: ${application.specialty}`, `City: ${application.city}`, `Reference: ${application.reference}`, "", "Review the professional details and consent:", "https://www.docvy.in/admin/directory", "", "An application is not an approved partnership or verification."].join("\n"),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) { console.error("Partner notification rejected", { reference: application.reference, status: response.status }); return "failed"; }
    const result: unknown = await response.json();
    return result && typeof result === "object" && "id" in result && typeof result.id === "string" ? "accepted" : "failed";
  } catch { console.error("Partner notification unavailable", { reference: application.reference }); return "failed"; }
}
