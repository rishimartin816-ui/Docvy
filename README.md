# Docvy — Next.js 14 + TypeScript + Tailwind

## Current request flow
- No payment gateway, checkout, or payment API routes are included.
- Visitors choose a request purpose, enter their name/email/mobile, accept the notices, and submit.
- The server forwards the request to a Google Apps Script web app, which appends it to Google Sheets.
- Form submissions will fail safely until `GOOGLE_SHEETS_WEBHOOK_URL` is configured in Vercel.

## Setup
1. Install Node.js LTS.
2. In this folder, run `npm install`.
3. Follow `GOOGLE_SHEETS_SETUP.md` to create and deploy the Google Apps Script endpoint.
4. In Vercel → Project Settings → Environment Variables, set `GOOGLE_SHEETS_WEBHOOK_URL` to the deployed `/exec` URL. Add it for Production and Preview as needed.
5. Redeploy the project.
6. Run `npm run build` locally before publishing and submit a dummy test request to verify that a row appears in the sheet.

## Important production notes
- Keep the Google Sheet private and restrict access to staff who need it. The Apps Script web app accepts public POST requests, so use it only for this limited intake form and monitor for spam.
- Do not ask users to send medical reports or detailed health information through this form.
- Update the Privacy Policy to clearly explain Google Sheets processing, the information collected, purpose, retention period and contact for privacy requests before accepting real user data.
- Replace contact/legal placeholders and have the policies reviewed before launch.
- The success screen means the configured Google Apps Script confirmed the submission; it does not indicate a medical assessment or certificate approval.
