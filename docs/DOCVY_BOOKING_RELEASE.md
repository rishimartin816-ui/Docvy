# DOCVY founder-managed booking release

Updated: 16 November 2026. Branch: `feat/operational-booking-workflow`; draft PR #13; the current clinic CRM application baseline (1a57029) is merged into the booking release to preserve live partner, branding, canonical profile and directory features. Sitemap PR #9 is independent and unchanged.

**Latest owner-approved launch model: DOCVY manages all appointment approval and tracking. No clinic CRM accounts or doctor login accounts are required.** Implemented and locally validated; not deployed to production or activated. No production schema/data writes, merge or real messages were performed.

## Current patient → founder → provider → patient journey

1. `/book` or `/appointments`: patient selects a verified participating doctor, published location and preferred future time, consents and submits. Every submission is pending DOCVY approval. A preferred time is not reserved. Existing provider options labelled instant are also treated as approval in this launch model.
2. `/founder`: verified DOCVY directory-admin account sees all appointments, patient coordination contacts, doctor/city aggregates and paginated queue. Founder checks directly with the doctor, enters the agreed IST time, records a confirmation note and explicitly ticks that availability was checked.
3. Founder confirmation validates approved physical schedule windows, then atomically reserves the doctor/time in the **existing DOCVY case ledger**, with audit and notification outbox. It does not require a CRM clinic tenant, roster or staff account. Overlapping confirmations and gaps shorter than 30 minutes are rejected under a provider lock. Existing CRM reservations are also checked, and CRM writes have the reciprocal guard. There is no second calendar or fabricated clinic tenant.
4. Patient's saved private tracking link shows the confirmed appointment and subsequent updates. Founder can create a private doctor outcome link for one confirmed appointment and share it directly with the treating doctor. Creating the link does not send a message.
5. `/appointments/doctor`: doctor can submit one attendance/no-show report after the 30-minute appointment ends, or cancel before it starts. No CRM login or directory/queue access is provided. Patient name, reference, doctor, place/time and status are the only appointment details exposed; phone/email, internal notes and patient verification links are omitted.
6. Patient independently verifies control of the appointment contact through Supabase Auth and reports arrival, attendance, absence or dispute. Provider-only completion cannot set `completed_verified`. Contradictions enter `disputed`; DOCVY reviews them.

DOCVY branding stays throughout booking and tracking. Doctor and practice identities remain visible for informed selection. Human availability coordination is required: the application cannot know an unintegrated doctor's external diary. Do not promise immediate automatic bookings from opening hours alone.

## Access and privacy

`DOCVY_BOOKING_CLINIC_ACCESS_ENABLED=false` is the default. Only existing verified directory admins may access the appointment dashboard/APIs. Clinic staff memberships are not even queried in founder mode. Live legacy `/api/crm` access is blocked while the hybrid service is enabled in founder mode, and clinic scheduling controls are disabled. Staging/demo isolation is retained. No clinic accounts are created or granted access.

Doctor capabilities use 256-bit random secrets in URL fragments; only SHA-256 hashes are stored. Link creation/replacement/revocation requires founder authentication and is audited. Replacement revokes previous links. Expiry is the earlier of appointment + 3 days or issue + 30 days; reissue near the visit if booked further ahead. GET never changes outcome. The single outcome is consumed transactionally; an identical retry is safe, but a different second report is denied. Expired/revoked links fail. Audit records identify the capability, not a fictitious authenticated doctor identity.

A person holding a provider link can act within its limited scope. Share privately after checking the recipient; a forwarded/stolen link is not independently authenticated doctor identity. Patient contact verification establishes control of that contact, not physical presence or clinical quality. Attendance agreement is not proof against collusion, and arrival remains patient-reported.

Patient receipt hashes stay private from provider queues; matching verified contact and an active Auth session are required for visit evidence. Pre-visit cancellation can use the private receipt. Receipt access lasts 90 days; this is not a database retention policy. Logout revokes the Auth session and clears loaded dashboard/link state. API responses are private/no-store, noindex and no-referrer. Private pages are noindex; no analytics script is installed in the layout. Secrets must never be logged or sent to analytics.

## Approved time rules

Six approved providers: Mon–Sat IST; 30-minute appointment plus 30-minute gap. General starts 10:00, 11:00, …, 19:00; last visit ends 19:30.

Dr Meena: Keri 09:00–14:00 (5 starts), Sankhalim 14:00–17:00 (3), Poriem 17:00–21:00 (4), with the owner-supplied addresses. Sahil Kochale: physical schedule only at his published Indore practice; published Online/Psyheal Online remains doctor-coordinated approval and has no generated timetable. Online confirmation accepts a manually agreed future time; it still checks global doctor capacity.

372 weekly candidates (Meena 72, five others 60 each) are recurring time rules, **not live appointments or guaranteed available capacity**. Founder confirms each appointment against actual doctor agreement, leave/closures and approved location. No fee or tenant was invented; missing fees remain subject to doctor confirmation. Preferred/confirmed times must be future and within 90 days. Founder time inputs are parsed explicitly as IST.

## Database migration order

Use a reviewed isolated production-shaped staging baseline, then apply in this order:

1. `supabase/migrations/20261115214014_docvy_live_booking_control.sql`
2. `supabase/migrations/20261115214015_docvy_patient_visit_evidence.sql`
3. `supabase/migrations/20261116050857_docvy_founder_managed_booking.sql`
4. `supabase/migrations/20261116053917_docvy_resend_booking_delivery.sql`

The first two have not been applied remotely and were extended in this PR to support forced approval requests. The third adds capacity guards, founder confirmation and private doctor capabilities. The fourth adds immutable event/email snapshots, lease ownership, bounded retries, Resend acceptance IDs and deduplicated reminder/follow-up production. Historical jobs without an event snapshot are failed for manual review, not automatically emailed. Tables have RLS and no anon/authenticated access. Write RPCs are security-invoker/service-only; the trusted HTTP backend verifies founder permissions and allowed schedule windows. A service key is a privileged trust boundary, not a patient credential. The existing minimal session helper checks only the caller's own Auth session.

Production schema was inspected read-only: CRM slots use `doctor_id`, roster links use `provider_id`, and occupied slots have a unique index. The old managed staging database `pmyzedtpogmhvcrurcau` has an earlier demo schema and cannot safely receive a blind database push. Its three earlier migrations are archived in `supabase/staging-migrations/`; remote history is untouched. Existing baseline CRM/directory/Auth tables are prerequisites. No production mapping needs to be invented to launch founder-managed approval; optional future clinic integration is separate. The preexisting `docvy_booking_qa` schema is untouched.

## Actual verification

- TypeScript: passed.
- ESLint after baseline integration: zero errors and zero warnings. Existing intentional CommonJS verification scripts use a scoped `.cjs` lint override.
- Optimized Next.js 14.2.35 production build after baseline integration: passed (2,454 generated pages); existing edge-runtime notice. Booking/API/email/schedule and local Postgres suites passed again. Public/partner/booking HTTP checks and partner invalid-body/origin guards also passed.
- `node scripts/test-booking-schedule.mjs`: six recurring windows, Meena transitions, Indore-only generated candidates, 372/week, gaps, Sunday/duplicate/date/range checks; founder physical-window rejection and doctor-controlled Online time validation.
- `node scripts/test-booking-api.mjs`: real handlers/helper with mocked transport: correct RPC contract, consent/CSRF, pending-only founder mode, rejection of direct slot submissions, explicit doctor confirmation evidence, founder-only real permission helper with zero staff-table reads, clinic/doctor queue denial, scoped link creation/report allowlist, private receipt and patient identity checks.
- `node scripts/test-live-booking.mjs`: temporary Docker PostgreSQL 17, actual four release migrations and synthetic fixture. Instant reservation race retained for future opt-in integration; founder approval race produces one winner with **no clinic/roster mapping or CRM booking required**; idempotency; cross-inventory capacity guards in both directions; premature/forged verification blocked; patient conflicts disputed; immutable audit; public-access denial; session revocation; summary; distinct outbox leases. Provider link replacement, expiry, revocation, minimal disclosure, one-report-only and repeat-report safety passed. Email snapshots/envelopes resist mutation, stale leases cannot finish a new lease, retry windows are bounded, follow-ups are deduplicated and delivery tables/RPCs deny public access.
- `node scripts/test-booking-email.mjs`: actual Resend adapter/worker with fake transport only; existing lowercase credential alias, contact@ sender, pending wording, frozen retry body/idempotency key, acceptance IDs, temporary/permanent failures, superseded-event skipping, receipt-secret protection and preview isolation passed. No real messages were sent.
- Earlier archived staging regression suite passed before this change; its DB behavior remains archived separately. Earlier managed-staging evidence in `OPERATIONAL_BOOKING_STAGING.md` is historical and is not hosted verification of this release.
- Built-server HTTP checks are reported with the PR: private pages noindex, private endpoint headers, founder-only gates and disabled-service errors.

These are local database tests and mocked-transport API tests, not authenticated hosted browser E2E. The fixture is not a full production trigger/policy clone. No real patient data or messages were used. Temporary test containers remove themselves.

## Genuine remaining live-release requirements

1. Reuse the existing **contact@docvy.in** directory-admin login: read-only production checks on 16 November 2026 confirmed a verified Auth account and private admin allowlist entry. No new founder account or clinic login is required. The owner-provided **rishimartin@docvy.in** remains the alert recipient; its absence from Auth is not a launch blocker. Verify the existing owner login against the new hosted staging workflow without sharing passwords in chat. See `FOUNDER_ONBOARDING.md`. No Auth account or privilege was changed.
2. **Reuse the existing activated Resend account**, rather than install a new provider. The owner reports it is active for Partner with us; repository code confirms `RESEND_API_KEY` / `resend_api_key` support. Booking transport and durable worker are now implemented, with `DOCVY <contact@docvy.in>` as sender and the approved founder alert recipient. The partner flow is unchanged. The actual serving Vercel project `docvy-crm-staging` has the existing lowercase `resend_api_key` in Production; the earlier credential search inspected the older `docvy` project. Booking sender acceptance and actual inbox delivery remain unverified. Configure an authenticated recurring scheduler for `/api/booking/notifications`, then test real staging delivery, temporary failures and retries. Resend API integration does not automatically configure Supabase Auth SMTP/OTP templates; configure/test those separately using the existing provider. Doctor links remain manually shared by the founder; no unapproved provider email recipient was invented. See `RESEND_BOOKING_NOTIFICATIONS.md`.
3. Configure isolated production-shaped staging, apply the reviewed migrations and test the actual founder login → patient request → human doctor coordination → founder confirmation → provider link → independent patient verification journey. Include simultaneous approvals, wrong-role attempts, expiry/revocation, cancellation, mobile/accessibility, real delivery failures/retries and audit verification. Hosted checks remain blocked by missing staging runtime/credentials and messaging configuration.
4. Confirm doctor response coverage, closure/leave handling, fee confirmation, dispute handling, consent and retention. Preserve receipt secrets across releases or plan rotation/recovery. Keep the public service disabled until tests pass.
5. Review/approve production migrations and deployment, enable only participating verified providers in approval mode, then run an authorized synthetic post-release booking/cancellation and delivery check. Do not present a build or PR merge as proof of operational live booking.

The previous assumption that a new messaging provider must be connected is superseded by the owner’s Resend clarification and the existing partner implementation. No new account or service was provisioned.

## Deployment dependency diagnosis

The owner repaired the old suspended `supabase-crimson-lens` resource's deployment requirement. Preview `dpl_FYy3Tt1YF6TneGFDUZzRmv3448yT` at commit `4dc299f` reached READY. The actual live hostname is served by the different project `docvy-crm-staging`; its Production environment still lacks `SUPABASE_SERVICE_ROLE_KEY` on the latest metadata check. Its directory key is publishable and cannot substitute for this server credential. The healthy production DB is `cxyscxjauxoizvvllmfu`. A requested fresh staging branch returned declined; no production booking migration, activation or promotion was performed. Hosted checks remain pending. See `VERCEL_PROVISIONING_REPAIR.md` for verified project identifiers and the historical diagnosis.
