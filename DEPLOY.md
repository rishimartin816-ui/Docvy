# Deploy Docvy

## Google Sheets form submissions
1. Follow `GOOGLE_SHEETS_SETUP.md` to create the `Requests` tab and deploy the Apps Script as a web app.
2. Copy the deployed web app URL ending in `/exec`.
3. In Vercel, open the project → Settings → Environment Variables.
4. Add `GOOGLE_SHEETS_WEBHOOK_URL` with the Apps Script URL for Production (and Preview if needed).
5. Redeploy after saving the variable.
6. Submit a test request using dummy contact details and verify that the row appears in the sheet.

## No payment gateway
This version intentionally has no payment checkout, payment API routes, or payment credentials. Form submission only sends the limited contact/request information to the configured Google Sheets intake log.

## Before going live
- Verify that the Google Sheet is private and access is restricted to authorised staff.
- Update the Privacy Policy to explain the use of Google Sheets and the retention/deletion policy.
- Replace support and grievance placeholders with real contact details.
- Do not collect medical reports or detailed health information through this intake form.
- Run `npm install` and `npm run build`, then test the deployed site end to end.
