# DOCVY live-doctor booking launch roster (read-only snapshot)

Source: `docvy-production` / `public.docvy_directory_providers`, queried 2026-11-16. This is a **snapshot**, not a hardcoded booking allowlist. Re-query and validate live DB at booking time.

## Published and independently verified candidates

| Provider ID | Doctor | City | Clinic | Status |
|---|---|---|---|---|
| `dr-basab-raj-ghosh` | Dr. Basab Raj Ghosh | Uttarpara | Dr. Basab Raj Ghosh's Clinic | verified, consented, published, enabled |
| `mr-sahil-kochale` | Mr. Sahil Kochale | Indore | Shuddhi De-addiction and Rehabilitation Centre | verified, consented, published, enabled |
| `dr-ambika-rao-jhunjhunu-68798490` | Dr. Ambika Rao | Jhunjhunu | Dr. Neelam Homoeopathic Clinic | verified, consented, published, enabled |
| `dr-hassan-ishtiyaque-ali` | Dr. Hassan Ishtiyaque Ali | Mumbai | Dr. Hassan Ali Pulmo Clinic | verified, consented, published, enabled |
| `dr-anil-kumar-physiotherapist-delhi` | Dr. Anil Kumar | Delhi | Medi-Max Health Care Physiotherapy Centre | verified, consented, published, enabled |
| `dr-ummed-kumar-meena` | Dr. Ummed Kumar Meena | Keri | Shree Bhumika Clinic, Keri | verified, consented, published, enabled |

**Excluded from verified booking cohort:** `bheemreddy-vivek-reddy-karimnagar-24773aea` (Dr. Bheemreddy Vivek Reddy), published and consented but `profile_status = claimed`, `verified_at = null`. Do not enable booking until verification is complete.

## Critical distinction

These six are **candidate profiles**, not confirmed bookable doctors. Before activating each, confirm: correct healthcare professional designation/scope, current location, actual clinic consent, contact channel, consultation mode and fee, schedule, cancellation policy, time zone, and clinic operator responsible for approval. The `profile_status` database field alone is not evidence that a live slot exists.

## Database integration gate

Production `crm_slots` and `crm_bookings` have **zero rows** in the current snapshot. `crm_doctor_roster` has three rows but no demonstrated mapping to these six directory provider IDs. Never synthesize bookable slots from practice hours alone.

1. Create/reuse a validated mapping `directory_provider_id -> clinic_id -> location_id -> CRM doctor identity`.
2. Default every mapped provider to **approval mode** until clinic schedule and confirmation operations are verified.
3. Instant mode requires a clinic-managed, doctor-specific slot, atomic reservation and collision tests.
4. If no staffed clinic approver is assigned, show `request appointment` only when a DOCVY operations team can handle and confirm requests; otherwise disable booking.
5. Do not advertise confirmed booking until clinic confirmation or an atomic instant-booking transaction succeeds.
6. Keep the actual provider name, qualifications and physical consultation location visible to patients, while DOCVY owns booking references, messages and reporting.
7. The dashboard must reconcile directory requests and CRM bookings without double counting.

## Release blockers

- Verified live-provider-to-CRM-doctor and clinic mapping
- Explicit approval/instant mode for each location
- Authenticated clinic or DOCVY approver and reliable notification delivery
- Idempotent booking transaction, no double booking, time-zone correctness
- Patient consent and secure access to PII
- Founder booking ledger, event history, cancellation/reschedule support
- Staging end-to-end tests and manual sign-off

Do not apply migrations, publish slots, or contact patients or providers from this document.
