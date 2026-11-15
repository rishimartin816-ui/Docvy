# DOCVY Hybrid Booking — Phase 1 implementation specification

Status: **Design and implementation preparation only**. No production database changes, deployments, or patient notifications.

## Read-only audit (16 November 2026)

GitHub default branch: `main`; stack in `package.json`: Next.js 14.2.35, React 18, TypeScript. `lib/appointment-intake.ts` reports whether a Google Sheets webhook URL and token are configured; it does not verify delivery. Public `app/doctors/page.tsx` currently switches between an appointment request and a paused-request message based on that configuration.

Connected Supabase:
- `docvy-production` (`cxyscxjauxoizvvllmfu`): `crm_clinics` (4 rows), `crm_staff` (4), `crm_slots` (0), `crm_bookings` (0), `crm_enquiries` (0), `crm_doctor_roster` (3), `docvy_directory_providers` (1277), `docvy_directory_requests` (2). Counts are connector estimates, not proof of live patient bookings or verified provider supply.
- `docvy-crm-staging` (`pmyzedtpogmhvcrurcau`): `crm_clinics` (1), `crm_staff` (3), `crm_slots` (5), `crm_bookings` (3), `crm_enquiries` (1). All inspected tables have RLS enabled; **policy correctness has not been verified**.
- Both projects already have CRM booking, slot, history, rescheduling, enquiry and role-related migrations. Reuse and reconcile these; do not create parallel CRM entities without documented reason.

## Product contract

**Hybrid modes, configured per participating doctor/clinic location:**
1. `instant`: only for clinic-managed, synchronized, unblocked, available slots. Booking is committed atomically and returns `confirmed` only after the database transaction succeeds.
2. `approval`: patient chooses a preferred time; DOCVY records `requested`, not `confirmed`. Authorized clinic staff accept or decline, with expiry and follow-up rules.
3. `disabled`: provider listing remains discoverable but cannot be booked; show truthful contact instructions.

Every appointment records an immutable DOCVY booking reference and server-side doctor, clinic, branch, city, time zone, consultation mode, acquisition source, created timestamp and status history. The patient sees the actual treating provider and location, with DOCVY as the booking brand. Do not infer provider approval from source-listed hospital profiles.

**Lifecycle:** `requested -> confirmed -> checked_in -> completed_reported -> completed_verified`; alternative transitions include `declined`, `expired`, `cancelled`, `no_show_reported`, `disputed`. A check-in or provider report alone never creates independently verified completion. Keep audit events append-only with actor, source, timestamp and reason. Status names can be adapted to existing tables after inspecting constraints and migrations; do not break legacy records.

## Phase 1 build order

1. Inspect repository tree, existing CRM code, API handlers, doctor profile publication/approval and all SQL migrations. Inventory exact reusable components and identify any mismatch between GitHub migrations and hosted schemas.
2. Read-only inspect production and staging RLS policies, functions, constraints and booking RPCs. Confirm whether `crm_slots` is clinic-scoped or doctor-scoped and whether booked slots are protected by unique indexes and transactional locking. Do not assume current constraints are sufficient.
3. Document doctor identity mapping: only explicitly approved, published providers with a participating clinic and authorized schedule can receive DOCVY bookings. Source-listed, unverified hospital doctors are **not** automatically bookable.
4. Add an explicit provider-location booking-mode configuration, doctor-to-clinic mapping, slot availability API, request/confirm API and idempotency protection using additive migrations committed to the feature branch. Do not apply migrations to hosted projects without separate approval.
5. Use a single transactional database operation for instant booking; check slot, doctor, clinic, conflicts and authorization server-side. No client-side-only conflict checks. Retry-safe idempotency key.
6. Approval-mode requests must be labelled **Pending clinic confirmation** until accepted. Provide a clinic approval queue and DOCVY founder view with doctor, city, clinic, time, channel, status and audit timeline. Respect clinic-scoped access.
7. Notifications: prepare event-driven DOCVY-branded confirmation and status-change templates; no real sends before provider consent, sender configuration and staging validation. Avoid PHI in notification logs.
8. Prepare patient self-service cancellation and rescheduling with clear rules, clinic notification and event history. Do not invent available times or guarantee unconfirmed slots.
9. Add synthetic staging fixtures and automated tests: concurrent same-slot attempts, replayed idempotency key, blocked slots, unauthorized clinic access, suspended/unverified doctors, request expiry, cancellations, cross-time-zone display and failed notification recovery.
10. Provide deployment gates: passing tests, RLS review, privacy/consent review, production backup/rollback plan, operational staff readiness and explicit founder approval.

## Phase 2 — separate PR

Reception check-in, expiring QR/check-in code, doctor outcome reporting, patient confirmation, independent evidence reconciliation, dispute workflow, anti-abuse controls and audit trails. These are **not** prerequisites for recording a Phase 1 booking but must not be advertised as available before deployment.

## Phase 3 — separate PR

Booking funnel analytics, doctor/city attribution, clinic performance, no-show reconciliation, billing/revenue metrics and suspicious reporting patterns. Never present unverified outcomes as verified consultations.

## Security and privacy

Use server-side authorization and clinic/branch-scoped RLS. No service-role secrets in the browser, no permissive authenticated-all access, no unprotected SECURITY DEFINER RPCs, no clinical notes in analytics events. Minimize sensitive patient data and establish consent, retention and deletion procedures before live launch.

## Definition of done for Phase 1

- Existing infrastructure reused and schema reconciliation documented.
- Both booking modes function in isolated tests with correct patient-facing status.
- No double bookings in concurrent tests; no cross-clinic data access.
- Founder can see appointment attribution and status history.
- No patient can book an unapproved provider.
- Build, lint, test evidence and migration review included in PR.
- No production migration, deployment or real messages until separately approved.
