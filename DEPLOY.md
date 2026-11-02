# Deploy Docvy

## Paused request intake
Request intake is disabled by default. Keep `DOCVY_REQUESTS_ENABLED=false` in every deployed environment. Do not configure a production Google Sheets endpoint or turn on intake until privacy, retention, spam protection and operating controls are approved.

## Paused payment routes
Payment code exists but the API routes are disabled by default. Keep `DOCVY_PAYMENTS_ENABLED=false`. The webhook path uses in-memory state and is not production-ready.

## Before enabling any service workflow
- Verify that the Google Sheet is private and access is restricted to authorised staff.
- Update the Privacy Policy to explain the use of Google Sheets and the retention/deletion policy.
- Replace support and grievance placeholders with real contact details.
- Do not collect medical reports or detailed health information through this intake form.
- Run `npm install` and `npm run build`, then test the deployed site end to end.
