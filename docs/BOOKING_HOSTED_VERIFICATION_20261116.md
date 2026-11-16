# Hosted booking verification — 16 November 2026

This report supersedes the historical missing-credential/provisioning/staging blockers in earlier release notes. Release branch: `feat/operational-booking-workflow`, PR #13. Tested booking/scheduler commit: `e9d8907`; private production health probe added in `ec05250`.

## Current public release state: blocked credential, previous site restored

The production build succeeded (`dpl_7hkjWTonm249AJBitcPv34qekZU7`). An immediate `www.docvy.in` booking-provider smoke check returned HTTP 503; the hostname was immediately restored to the prior deployment `dpl_GXz7FbJdb9GFgcoD2zvu2Snu7AAb`. Homepage restoration was checked (HTTP 200); the old deployment has no new booking API (HTTP 404). **Bookings are not live.**

A subsequent production candidate `dpl_4KcShY8dWJ5pE833PkFE2hDz84aJ` at `ec05250` has a secret-authenticated, read-only `/api/booking/health` probe that works before hostname assignment. Its actual result: correct production database hostname, `credentialType: unknown`, `credentialProject: null`, `booking_database_error_401`. The saved sensitive value is rejected by Supabase and is not recognised as a server secret/service-role JWT. No key value was disclosed or logged. The owner must replace the sensitive variable with the active project's actual server key value; the agent cannot retrieve that sensitive value through the connected APIs.

Six migrations, six approval-mode provider options and the idle Vault/Cron scheduler are installed in production. Final checks show **zero production booking cases and zero pending notification jobs**, with no anon/authenticated SELECT privilege on private booking cases. No production Auth user/password/privilege changes were made. No PR was merged and main was not modified. Once the credential is corrected, deploy a candidate, require the private health probe to pass, switch the hostname, then perform an authorised synthetic production request/tracking/cancellation/delivery check. Keep the prior deployment as the rollback target.

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
