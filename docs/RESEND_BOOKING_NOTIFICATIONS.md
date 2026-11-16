# Resend booking notifications

**Latest evidence:** [hosted verification](BOOKING_HOSTED_VERIFICATION_20261116.md) supersedes the earlier unverified-runtime notes below. Real staging appointment and OTP emails reached the approved founder inbox. Receipt-bound Supabase codes now use the existing Resend API directly; this patient route does not require separate Auth SMTP configuration. Six migrations and a Vault-backed scheduler are installed in production, but the candidate is blocked by its rejected Supabase server credential. The previous public deployment is restored.

The existing contact@docvy.in owner login is verified and allowlisted in Supabase (read-only check); no new account is needed.

The owner confirms Resend is already activated for Partner with us. Repository evidence: `origin/feat/clinic-crm-slot-blocking:lib/partner-notification.ts` accepts `RESEND_API_KEY` and legacy `resend_api_key`; it sends from `notifications@docvy.in` to `contact@docvy.in`. That partner code/branch is unchanged. The booking implementation reuses those credential names and the existing Resend API, with the owner-requested **DOCVY <contact@docvy.in>** sender/reply-to. Founder alerts remain addressed to the previously approved `rishimartin@docvy.in` (or the server-only approved override).

Activation was reported by the owner; source/configuration compatibility was inspected. The connected Vercel project's environment metadata did not expose either Resend key name. No actual key, sender verification result, sent message or inbox delivery was observed in this task. This does not establish that the account is inactive: verify the credential is available in the intended booking runtime. Do not paste API keys into chat or commit them.

## Implementation

- Request/confirmation/outcome transactions write an immutable event snapshot to the private outbox. Existing unsnapshotted historical jobs are failed for review, not mass-mailed.
- After a successful business commit, Next.js 14 uses the official `@vercel/functions` `waitUntil` helper to wake a bounded dispatcher. Email failure does not reverse or reject a committed appointment. The durable outbox remains if the background task is interrupted.
- A worker invocation queues due reminders/follow-ups, then leases up to two emails. Both recipient and base message are frozen before transmission. Identical Resend idempotency keys and bodies survive retries; raw private patient receipt tokens are derived/checked in memory and never stored in email snapshots/envelopes.
- Obsolete request/confirmation/reminder jobs are skipped after appointment changes. Missing recipient emails are recorded as skipped, not accepted.
- Temporary HTTP 429/5xx/network failures retry with backoff. Permanent errors fail visibly. At most six attempts, and a 20-hour retry window keeps ambiguous retries inside Resend's documented 24-hour idempotency retention. Lease tokens prevent stale workers finishing a newer claim. Crash recovery waits for the two-minute lease. After a secret rotation, receipt-hash mismatch fails closed; preserve secrets or plan recovery explicitly.
- Reminder: once per confirmed appointment in the 1–24 hour window, after at least ten minutes since confirmation. Patient feedback: once after the 30-minute visit ends and within three days, if no patient response exists. Founder provider-outcome prompt: once in that post-visit window while status remains confirmed. Recurring scheduler execution is required for timely reminders, even with no site traffic.
- Founder dashboard shows queued, accepted, failed and skipped counts and has a bounded manual drain button. `sent` in the existing database column means **Resend API acceptance**, tracked by provider message ID/accepted_at; it does not mean delivered, read or booked. No delivery webhook is installed by this change; real delivery/bounces must be verified in the provider/inbox during staging and release.
- Doctor update links are still issued/revoked by the founder and shared manually with the treating doctor. No clinic CRM account or guessed doctor email is added.

## Reviewable runtime setup

1. Apply the four migrations in `DOCVY_BOOKING_RELEASE.md` to an isolated production-shaped staging baseline first. They have not been applied remotely.
2. Reuse the existing server-only Resend key (`RESEND_API_KEY` preferred, legacy alias supported). Confirm Resend accepts `contact@docvy.in` under the existing verified domain/key permissions. Keep partner notification behavior intact.
3. Configure the booking DB, receipt secret, founder alert recipient and `DOCVY_BOOKING_EMAIL_ENABLED=true` only in the intended test environment after review. Public service activation (`DOCVY_HYBRID_BOOKING_ENABLED`) is a separate release gate. No environment variables were changed remotely by this task.
4. Preview email execution requires the known staging DB hostname, an approved `DOCVY_BOOKING_STAGING_EMAIL_TO`, and an HTTPS Vercel preview URL (explicit `DOCVY_BOOKING_STAGING_SITE_URL`, otherwise `VERCEL_URL`). All recipients are rewritten to the approved test address, subjects carry `[STAGING]`, and private links target that preview. Preview may not send production appointment data.
5. Configure a recurring authenticated HTTP scheduler calling **GET `/api/booking/notifications`** with `Authorization: Bearer <CRON_SECRET>` (independent random secret of at least 32 characters). The route also permits same-origin founder-authenticated POST to process two pending emails. Anonymous callers are denied. A scheduler has **not** been installed or activated; do not mistake the endpoint for a running schedule. Choose frequency/throughput for the platform plan and measured backlog; one invocation handles two emails. Do not put secrets into public URLs, source files, shell output or logs.
6. Reuse Resend for **Supabase Auth SMTP separately**, with DOCVY-branded OTP templates. A working Partner with us email does not prove patient OTP/login delivery is configured.
7. Test real synthetic patient request, founder alert, confirmation, cancellation, patient verification, reminder and post-visit feedback through the hosted app, then check Resend acceptance ID and actual received message. Include retry/rate-limit failure, revoked session and private-link tests. Obtain approval for actual test sends before sending emails. No real emails were sent by this task.
8. After staging success, reuse the verified existing contact@docvy.in admin login and review production migrations/deployment/activation. Keep clinic CRM access disabled for this launch.

## Evidence and limits

TypeScript, ESLint, optimized build, actual route/helper tests, actual Resend adapter with fake transport, and real local Postgres migration/lease/snapshot/retry/follow-up tests are reported in PR #13. Mocks prove code behavior; they are not evidence of Resend account activation or actual delivery. Local HTTP checks validate endpoint gates/headers. A protected/disabled service must not claim that mail was sent.

Primary references consulted: [Resend send API](https://resend.com/docs/api-reference/emails/send-email), [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys), [Vercel waitUntil](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package). The 24-hour idempotency retention is a provider limit, not a guarantee of exactly-once inbox delivery.

The booking branch is stacked on PR #11, while the partner implementation is on the clinic CRM branch. Integrate with the current production application baseline and rerun partner-application regressions before promotion; do not deploy the older branch baseline as a replacement for live partner features.
