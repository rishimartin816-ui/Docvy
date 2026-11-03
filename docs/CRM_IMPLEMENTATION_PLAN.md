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
