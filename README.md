# DOCVY — Next.js 14 + TypeScript + Tailwind

DOCVY currently provides a pan-India patient guide and a limited Delhi NCR doctor directory. Appointment enquiry intake is being connected to the DOCVY APPOINTMENT LEADS Google Sheet. Enquiries are not appointments until the selected provider confirms availability, timing and fees.

## Local setup

1. Install Node.js LTS and pnpm.
2. Run `pnpm install`.
3. Set the server-only variables in `.env.local` using `.env.example` as a name-only template. Do not commit values.
4. Follow [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) to deploy the token-protected Apps Script endpoint and connect the private sheet.
5. Run `pnpm dev` to start the site.

The appointment form stays disabled when either sheet connection variable is missing. Do not collect real visitor details until the live form, policy, provider handling and consent have been reviewed.

## Build and publish

- `pnpm build` validates the production build.
- Production publishes through the existing Vercel project connected to the GitHub `main` branch. Do not change production database, authentication, SSO or security settings without separate approval.
- Submit one synthetic test enquiry after configuration and verify the matching row in the private sheet before enabling real submissions.

## Current operational boundaries

- The guide is available across India; current doctor listings are limited to Delhi, Gurugram and Noida.
- The directory does not claim credential verification or live appointment availability.
- The enquiry form collects no symptoms, diagnoses, medical records or payment data.
- DOCVY does not take patient payment. A provider confirms any consultation fee and receives payment directly from the patient.
- Provider paid plans or lead/referral charges require a separate written agreement; no charge or provider email notification is configured by this workflow.
