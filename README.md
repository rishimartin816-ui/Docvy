# Docvy — Next.js 14 + TypeScript + Tailwind

## Current product boundary
- Request submissions are paused. The request page does not collect details, and the API returns `503` unless `DOCVY_REQUESTS_ENABLED=true`.
- Payment code is present but disabled. Payment endpoints return `503` unless `DOCVY_PAYMENTS_ENABLED=true`; do not enable them until the payment flow is reviewed and verified.
- The published website is informational. Do not represent requests, payments, authentication, bookings, or clinical workflows as live.
- The legacy `supabase/schema.sql` is historical and must not be applied; current custom-auth database work is in `database/migrations/`.

When request intake is separately approved for a controlled environment, the server forwards requests to the configured Google Apps Script endpoint, which appends them to Google Sheets. Set `GOOGLE_SHEETS_WEBHOOK_URL` only in that environment and keep production intake disabled until privacy, rate-limit and operating controls are approved.

## Setup
1. Install Node.js LTS.
2. In this folder, run `npm install`.
3. Keep `DOCVY_REQUESTS_ENABLED=false` and `DOCVY_PAYMENTS_ENABLED=false` in deployed environments.
4. Do not set either flag to `true` without separate product and security approval.

## Important production notes
- If intake is later enabled, keep the Google Sheet private and restrict access to staff who need it. The Apps Script web app accepts public POST requests, so it requires abuse controls and monitoring.
- Do not ask users to send medical reports or detailed health information through intake.
- Update the Privacy Policy to clearly explain Google Sheets processing, the information collected, purpose, retention period and contact for privacy requests before accepting real user data.
- Replace contact/legal placeholders and have the policies reviewed before launch.
- The current request form is not accepting submissions. The feature flag is an additional server-side control; hiding a form alone does not protect the API.
