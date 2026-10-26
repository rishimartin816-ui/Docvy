# Docvy: setup, test and deploy

STATUS: NOT production-ready. Nothing here has been installed, built or run. Do the checks below first.

## 1. Local check
npm install && npm run build   # fix any errors before continuing
cp .env.example .env.local     # fill with your own values, never commit .env.local

## 2. Database (Supabase)
1. Create a project, region India (Mumbai) if offered.
2. SQL editor: paste and run supabase/schema.sql. Row-level security denies all public access.
3. Settings > API: copy the project URL to SUPABASE_URL and the service_role key to SUPABASE_SERVICE_ROLE_KEY. The service key is server-only: never use NEXT_PUBLIC_ for it.

## 3. Razorpay (test mode first)
1. Complete Razorpay onboarding. Describe the service honestly; they may review it.
2. Test mode > API keys: set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.
3. Webhooks: add https://YOUR-DOMAIN/api/payments/webhook, choose a secret (RAZORPAY_WEBHOOK_SECRET), enable payment.captured, payment.failed, refund.processed.
4. Locally, expose port 3000 with a tunnel to receive webhooks.

## 4. Sandbox tests (all must pass)
- Successful payment: status moves to "Payment confirmed" only after the webhook.
- Failed payment (use a Razorpay failure test card/UPI): status shows "Payment not completed"; no charge.
- Closing checkout: friendly message, no charge.
- Replay the same webhook twice: second is ignored (duplicate protection).
- Wrong webhook signature: returns 401.
- Tampered amount: audit_log shows amount_mismatch, status does not change.
- Status link: wrong token shows "could not find"; no personal data shown.

## 5. Vercel
1. Push to GitHub; import the repo in Vercel.
2. Settings > Environment Variables: add every name in .env.example (Production and Preview; use TEST keys until launch).
3. Deploy, set your domain, then update the Razorpay webhook URL.
4. Before going live: use live keys only after legal review and gateway approval.

## 6. Remaining work (not built)
- Doctor/staff login (Supabase Auth), restricted review screens, doctor registration verification by an admin, decision recording, and certificate authentication. Tables exist (staff, reviews, audit_log); no UI or API yet.
- Secure document storage and delivery (private bucket, signed short-lived links).
- Refund trigger screen (lib/razorpay.ts has refund(); not wired up) and a refund policy.
- Distributed rate limiting (lib/rate.ts is per-instance only; use Upstash or Vercel WAF).
- Encryption of personal fields at application level, retention/deletion jobs, backups and access reviews.
- Make scenarios and email/SMS notifications.
- End-to-end automated tests. Accessibility and contrast audit. Cookie/analytics decisions (none added; keep health data out of analytics).
- Final copy: price inclusions, FAQs 6-10, all legal pages, contact, grievance officer, legal entity.

## 7. Needs an Indian healthcare/privacy lawyer
- Whether this model complies with the Telemedicine Practice Guidelines and rules on issuing medical certificates after remote assessment.
- Practitioner registration checks and who may sign.
- DPDP Act 2023 compliance: notice, consent, children's data, breach process, retention, processors (Supabase, Razorpay, Make, Vercel) and cross-border transfer.
- Consumer protection and e-commerce rules, refund terms, grievance officer requirements.
- Risks of misuse (certificates for improper leave) and wording of claims.
