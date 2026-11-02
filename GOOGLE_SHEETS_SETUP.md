# DOCVY appointment enquiry intake

## Connection status

- The Next.js form and server route are published, but the production form is closed until the private webhook is deployed and both Vercel production secrets are set.
- `scripts/apps-script/Code.gs` is the corrected endpoint source. The Apps Script project still needs this file installed, saved and deployed.
- The Google Sheet exists and has the `Appointments` tab. The endpoint should add the notification-status column without changing existing rows.
- The production Vercel project currently has no `GOOGLE_SHEETS_WEBHOOK_URL` or `GOOGLE_SHEETS_WEBHOOK_TOKEN` variables.
- A prior synthetic row verified direct Sheets connector access only; it did not verify the website-to-sheet path.

## Current behavior

- The patient form collects contact details and a preferred appointment time only. It does not collect symptoms, diagnoses, medical records or payment details.
- A request is an enquiry, not a confirmed or reserved appointment. The selected hospital or clinic must confirm the doctor, slot and fee.
- The Apps Script web app accepts only token-authenticated POST requests from DOCVY's server route and writes to the private `DOCVY APPOINTMENT LEADS` spreadsheet.
- Provider email notifications are disabled. The script requests no MailApp permission and never emails a provider. Add that workflow only after a hospital or clinic confirms its appointment inbox and the notification flow is separately approved.
- If the form is opened, new rows will wait in the private Sheet for manual DOCVY review. No email or hospital dashboard currently alerts staff or providers.

## Private spreadsheet

Spreadsheet: [DOCVY APPOINTMENT LEADS](https://docs.google.com/spreadsheets/d/14iVy9HoeFnUpJbN8wga6MHHNcrChF27RNHDd6F-1yIo/edit)<br>
Target tab: `Appointments`

The script checks the existing 14 headers and adds only the fifteenth status column if needed:

```text
Booking ID | Created at (UTC) | Patient name | Mobile | Email | Provider | Organisation | City | Facility | Requested date | Requested time | Status | Privacy consent | Provider sharing consent | Provider email notification status
```

The final column is always `NOT_CONFIGURED` until a separately reviewed provider-email feature is implemented. Keep the spreadsheet private and restrict access to staff who need it.

## Apps Script setup

The source code is [scripts/apps-script/Code.gs](scripts/apps-script/Code.gs).

1. In the bound Apps Script project, replace `Code.gs` with that source and save the project as `DOCVY appointment intake`.
2. Run `initializeDocvySheets` once. Approve spreadsheet access for the DOCVY account. It verifies the existing header, adds the status header, and does not clear or overwrite existing lead rows.
3. Open **Project Settings → Script Properties**. Add `DOCVY_WEBHOOK_TOKEN` with a randomly generated 64-character hexadecimal value. Keep it out of source code, chat, logs and Git.
4. Choose **Deploy → New deployment → Web app**. Set **Execute as** to the DOCVY account and access to **Anyone** so Vercel can call it without a Google login. The URL is publicly reachable; the token is required for every accepted POST.
5. Save the deployment and copy the `/exec` URL.

No email-sending permission is needed or requested.

## Vercel connection

Add these as **Secret** environment variables scoped to **Production**:

- `GOOGLE_SHEETS_WEBHOOK_URL` — the deployed Apps Script `/exec` URL.
- `GOOGLE_SHEETS_WEBHOOK_TOKEN` — the exact same 64-character token saved in Script Properties.

Do not prefix either name with `NEXT_PUBLIC_`. Redeploy Production after saving them. The appointment form becomes enabled when both values are present.

## Safe verification

1. Confirm the Apps Script deployment is active and the two production variables exist without reading or printing their values.
2. Submit one clearly marked synthetic request using DOCVY-controlled test contact details. Do not use a real patient's information.
3. Verify the website returns a reference, and the matching row appears in `Appointments` with status `NEW — PROVIDER CONFIRMATION REQUIRED` and email status `NOT_CONFIGURED`.
4. Confirm no provider email was sent. Keep the synthetic row clearly identifiable; remove it only through the spreadsheet's normal recoverable delete flow after verification.
5. Verify that submissions without a valid token do not create rows.

The public form remains a request channel, not a booking system. No patient payment is collected by DOCVY.
