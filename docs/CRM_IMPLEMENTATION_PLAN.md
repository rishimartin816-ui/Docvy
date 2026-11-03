# DOCVY Clinic CRM and Appointment Booking — feature-branch design

Status: **foundation draft only**. This branch does not modify the main branch or the Supabase production database. The SQL under `docs/sql/` is intentionally not an applied migration.

## Current baseline
- Patient website: Next.js, Tailwind; limited source-linked doctor directory.
- Existing production DB: organisations, branches, memberships, role grants, provider profiles and audit events.
- Booking intake: Google Sheets enquiry concept; no reliable confirmed booking CRM.
- Provider dashboards and notification delivery are not yet functional.

## Mandatory CRM feature set
1. Calendar: day/week/month views, time zones, multi-doctor and multi-branch filters.
2. Availability: regular hours, break hours, holidays, doctor leave, clinic closures, recurring blocks, single-slot blocks, emergency unavailability, slot capacity, booking cutoff and buffer times.
3. Booking: request/confirm, instant reservation for verified schedules, cancellation/reschedule, waitlist later, no-show, attendance, duplicate prevention and idempotency.
4. Access: patient, doctor, receptionist, clinic owner, hospital admin, DOCVY admin; authorized branch/organization scope only.
5. Provider console: manage doctor profiles, specialties, consultation fees, verification, branches, staff, alerts and schedules.
6. Notifications: email first, later consented WhatsApp/SMS; retryable outbox, delivery status and template approval.
7. Audit and reporting: immutable appointment events, source attribution, provider profile views, visits, confirmed and attended bookings.
8. Patient website: fetch only available verified slots; once staff block a slot it is immediately unbookable; recheck atomically during booking.

## Slot availability acceptance criteria
- If a receptionist blocks 11:00–11:30, the website must not offer it.
- Concurrent patients cannot exceed capacity.
- Existing bookings require an explicit cancellation or reschedule workflow before the slot can be blocked.
- Closed-day/leave changes invalidate future slot offers, subject to booked-appointment handling.
- No-show, cancellation, notification and reschedule statuses stay consistent across website and CRM.

## Safe test fixture
`docs/sql/docvy_synthetic_fixture.sql` creates a clearly fictitious DOCVY Test Hospital / DOCVY Test Doctor, unpublished to search, with one test slot. It **does not** provision a user account, grant impersonation rights or make a false credential claim. Only use staging data and dummy contact details.

## Integration steps
1. Resolve identity design: prefer Supabase Auth rather than extending custom password tables without demonstrated need.
2. Review DB schema draft, expand FK integrity and availability exceptions; generate CLI migration into `supabase/migrations`.
3. Apply to isolated staging, never production first.
4. Build secure server API with session verification, org+branch permission checks, rate limits and service-role-only calls to atomic DB operations.
5. Build patient booking component, provider calendar and block/unblock controls connected to the same DB.
6. Add outbox worker and mock notification sender before any real messages.
7. Add authenticated test-user provisioning and run synthetic end-to-end tests.
8. Complete privacy, domain verification, rate-limit, staff-access and concurrency checks before rollout.

## Pending input for manual doctor onboarding
For each REAL doctor: name, registration number + council, qualifications, specialty, clinic/hospital, branches, address, consultation fee, hours, photo and permission to display it. Verify before publication. Never label the DOCVY synthetic test profile as licensed.

## Important limitations of draft SQL
The SQL is a **review artifact**, not production-approved code. In particular, add organization-affiliation FK consistency, overlapping-slot exclusion where required, an authorization policy for each staff operation, transition rules, data retention, PII encryption strategy and robust cancellation/event audit handlers before deploying.

## Isolated CRM preview

The preview implements a single fictional clinic and doctor. It accepts slot IDs and
random booking keys only. It collects no patient contact or health information.

1. Use a fresh local or isolated Supabase environment with PostgreSQL 15 or later.
2. Apply `docs/sql/crm_staging.sql` then `docs/sql/crm_clinic_scope.sql`, then `docs/sql/crm_staging_fixture.sql`.
   These scripts are separate from the draft SQL and the production migration path.
3. Create synthetic Supabase Auth users. Insert their user IDs into
   `public.crm_staff` with role `scheduler` or `viewer` and the test clinic ID `7dfbf055-2737-448c-921e-c074d84393d4`. Obtain each access token
   through the isolated Supabase Auth sign-in flow.
4. Set `DOCVY_CRM_STAGING=true`, `DOCVY_CRM_STAGING_URL` to the isolated API URL,
   and `DOCVY_CRM_STAGING_KEY` to its server-only legacy service-role JWT.
   Use access protection if hosting the preview so only testers can reserve slots.
5. Open `/request/test` to reserve synthetic appointments and `/clinic` to
   enter a staff access token and see the day or week calendar.

Acceptance checks: block a slot, refresh the booking page, and confirm it disappears.
Unblock and reserve it. Verify the staff calendar shows the booking. Repeat the same
API request with the same key and check that the reference matches. Submit two requests
with different keys concurrently against a fresh slot and expect one success and one
409. Race a block against a booking and expect one success and one 409. Verify a viewer
can read but receives 403 for changes, and an unrelated Auth user receives 403 for
staff reads and changes. Verify public availability responses omit booking IDs.

The preview does not implement multi-clinic membership, patient identity, cancellation,
rescheduling, or notifications. Those require a separate rollout and verification.
