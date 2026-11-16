# Hosted booking verification — 16 November 2026

This report supersedes the historical missing-credential/provisioning/staging blockers in earlier release notes. Release branch: `feat/operational-booking-workflow`, PR #13. Tested booking/scheduler commit: `e9d8907`; private production health probe added in `ec05250`.

## Current public release state: live, production smoke checks passed

The owner corrected the sensitive credential. The private candidate probe returned HTTP 200, `healthy: true`, `credentialType: service_role` and the expected production project `cxyscxjauxoizvvllmfu` before live hostname assignment.

`www.docvy.in` now serves production deployment **`dpl_5WFnxbPAixJudRj4x5DUn1FJnF8Q`**, application commit **`3937d95`**. Six doctors across nine published locations accept **approval requests**, not automatically confirmed appointments. `/book` and `/founder` return HTTP 200 and are noindex. The existing `contact@docvy.in` owner account remains the dashboard login; alerts go to `rishimartin@docvy.in` from `DOCVY <contact@docvy.in>`. Clinic CRM access remains disabled.

Production smoke checks passed: request HTTP 201 with status `requested`, private tracking HTTP 200, cancellation HTTP 200 and final status `cancelled`. Both request emails reached the connected founder inbox with recorded Resend message IDs. The cancellation notification was also accepted. The production scheduler runs every minute; final outbox checks show zero pending and zero failed jobs.

The first production email test revealed a shared-account idempotency collision: staging and production had independent job sequences but reused `docvy-booking/<id>`. The live hostname was restored while this was fixed. Commit `3937d95` separates keys into `docvy-booking/production/<id>` and `docvy-booking/staging/<id>` and adds a regression test for identical job IDs across environments. The corrected production test passed. The obsolete, unsent request notification for the already-cancelled first synthetic test was explicitly skipped with an explanatory error note, not reported as delivered.

Two clearly labelled synthetic release cases remain **cancelled**, marked `source=docvy_release_smoke`: `DV-D1BE991D5D3A478F` and `DV-51650848AC1A4D39`. They are operational test evidence, not real patient bookings. They remain visible as cancelled test records in the founder queue; exclude them when assessing business conversion metrics. No doctor appointment was confirmed or reserved for these tests, and no doctor was contacted.

Homepage, doctor directory and partner page return HTTP 200 with the canonical www domain preserved. Partner invalid-body/wrong-origin guards return HTTP 400/403. Anonymous admin/health requests return HTTP 401. Apex `/book` redirects HTTP 301 to `https://www.docvy.in/book`. The current XML sitemap parses successfully: 103 unique URLs, no alternate host and no private booking URLs; robots.txt references the root sitemap. This preserves the existing sitemap; segmented sitemap PR #9 remains independent. No merge or main edit was performed.

Rollback target remains `dpl_GXz7FbJdb9GFgcoD2zvu2Snu7AAb`. Documentation commits after `3937d95` do not change the deployed application. Actual owner desktop/mobile browser testing, doctor response coverage and ongoing backlog/bounce monitoring remain operational follow-up.

## Historical credential failure and rollback

The production build succeeded (`dpl_7hkjWTonm249AJBitcPv34qekZU7`). An immediate `www.docvy.in` booking-provider smoke check returned HTTP 503; the hostname was immediately restored to the prior deployment `dpl_GXz7FbJdb9GFgcoD2zvu2Snu7AAb`. Homepage restoration was checked (HTTP 200); the old deployment has no new booking API (HTTP 404). **Bookings are not live.**

A subsequent production candidate `dpl_4KcShY8dWJ5pE833PkFE2hDz84aJ` at `ec05250` has a secret-authenticated, read-only `/api/booking/health` probe that works before hostname assignment. Its actual result: correct production database hostname, `credentialType: unknown`, `credentialProject: null`, `booking_database_error_401`. The saved sensitive value is rejected by Supabase and is not recognised as a server secret/service-role JWT. No key value was disclosed or logged. The owner must replace the sensitive variable with the active project's actual server key value; the agent cannot retrieve that sensitive value through the connected APIs.

At the blocked checkpoint, six migrations, six approval-mode provider options and the idle Vault/Cron scheduler were installed in production, with zero production booking cases and zero pending notification jobs. Public client roles had no SELECT privilege on private cases. The corrected release and subsequent synthetic test records are described above. No production Auth user/password/privilege changes were made.

## Actual environment and migration evidence

- `www.docvy.in` was served by Vercel project `docvy-crm-staging` (`prj_NdSOimyjRS2dOLUTq0Kc7rtGUMxs`), not the older project named `docvy`. The owner supplied the active production server credential securely in the correct Vercel project.
- Production: Supabase `cxyscxjauxoizvvllmfu`. Isolated staging: `pmyzedtpogmhvcrurcau`. Public keys and private server keys remain separate. Production cannot use the opt-in preview CRM credential fallback.
- The existing legacy staging database received an additive compatibility bootstrap, tested first in temporary PostgreSQL 17. Existing demo clinic records/access policies were retained. No production directory or patient records were copied to staging. This is a production-shaped subset, not a complete production policy/trigger clone.
- Six release migrations were applied successfully to both hosted databases: live booking control, patient visit evidence, founder-managed booking, Resend delivery, patient Auth throttling and notification scheduler. The staging compatibility bootstrap is excluded from production migrations and rejects a directory-bearing baseline.
- Only the six owner-approved, published, consented and verified providers were enabled in production, all in `approval` mode. Nine published doctor/location choices include Meena's three practices and Sahil's Indore/Online options. No other providers were enabled. No instant availability is promised.

## Hosted tests actually performed

Real HTTPS requests against protected Vercel previews used the existing staging runtime and real Supabase Auth. Temporary synthetic founder/patient accounts were created through the Auth Admin API, with only the synthetic founder added to staging's founder membership.

| Check | Observed result |
| --- | --- |
| Participating providers and founder queue | HTTP 200, staging database connected |
| Patient request | HTTP 201, `requested`, no reservation |
| Identical request retry | Same reference, no duplicate |
| Wrong-origin submission | HTTP 403 |
| Non-founder queue access | HTTP 401 |
| Private patient tracking | HTTP 200 |
| Forged patient receipt | HTTP 404 |
| Two simultaneous founder confirmations | One HTTP 200, one HTTP 422; exactly one reservation |
| Scoped provider view | HTTP 200; patient phone/email omitted |
| Premature provider completion | HTTP 409 |
| Unverified patient evidence | HTTP 401 |
| Wrong verified contact | HTTP 403 |
| Provider attendance + matching patient attendance | `completed_verified` |
| Contradictory patient response | `disputed` |
| Founder logout and reuse of old session | HTTP 200 logout, HTTP 401 queue |
| Anonymous scheduler invocation | HTTP 401 |
| Authenticated scheduler invocation | HTTP 200 |
| Actual Supabase Cron → pg_net → protected Vercel worker | HTTP 200; queue processed |

Past-visit behavior was tested by moving **only the synthetic staging appointment** into the past. Real patient or doctor appointment records were not used.

## Real delivery and patient verification

The existing lowercase `resend_api_key` was reused. Staging rewrites every recipient to the owner-approved `rishimartin@docvy.in`, prefixes subjects `[STAGING]`, and uses preview private links. Real messages from `DOCVY <contact@docvy.in>` reached the connected founder Gmail inbox, including appointment updates and a verification-code email. Six staging appointment jobs were accepted by Resend with recorded message IDs; four obsolete events were skipped; no staging jobs remained queued after the test.

Patient OTP delivery now uses Supabase Admin `generate_link` with the existing Resend adapter; separate Supabase SMTP configuration is not required for this route. Sending/verifying requires the private appointment receipt and matching appointment email. A private, transactionally locked database throttle prevents concurrent sends and excessive code attempts. Codes are not returned to the browser or stored in the notification outbox. Supabase remains responsible for code verification and session issuance.

The inbox connector intentionally withholds one-time codes, so the received inbox code was not extracted or submitted automatically. A separate synthetic staging Auth contract test generated and verified a code internally using the same documented Supabase API flow; reuse was rejected. This does not constitute a manual patient-browser test.

## Cleanup and limitations

Temporary synthetic Auth accounts/founder membership were removed through the Auth Admin API. The temporary staging initializer was replaced with a JWT-protected HTTP 410 tombstone containing no credentials/admin logic. Staging's scheduler was unscheduled, its Vault configuration removed and synthetic provider disabled. Synthetic booking audit records remain isolated for evidence. Preview share links were created with a one-hour TTL; the latest private production-probe share link was revoked after use. Attempts to revoke earlier preview links returned not-found; they were not extended or made permanent.

Local TypeScript, ESLint, optimized production build (2,454 generated pages), schedule, actual-handler mocked-transport, email, patient-Auth, bootstrap and PostgreSQL concurrency/access-control suites passed. Provider receipt secrecy, session revocation, immutable audit/outbox snapshots, lease/retry bounds and OTP send/verify limits were tested. These are not browser/device accessibility certification or load testing.

The production scheduler uses private `docvy_booking_ops.dispatch_notifications()`, Supabase Cron every minute, pg_net and a Vault-held bearer token. It remains idle when no notifications are due; one worker handles two messages. Monitor backlog and increase bounded throughput if measured volume warrants it. Delivery acceptance is distinct from inbox delivery; no automated Resend bounce/delivery webhook is implemented.

Existing production security advisories include three anonymously executable legacy definer functions, seven signed-in-user definer functions and disabled leaked-password protection. The booking release adds only the intentionally caller/session-scoped authenticated session helper to that warning count; booking tables/RPCs remain inaccessible to public client roles. RLS-without-policy notices are expected for server-only deny-by-default tables. Review preexisting warnings separately; do not open patient tables to silence them.

Human doctor coordination, closure/leave handling, fee confirmation and dispute review remain operational responsibilities. Contact verification proves contact control; agreement of visit reports does not prove physical attendance or clinical quality. No clinic CRM accounts were granted access.
