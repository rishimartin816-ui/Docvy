# Operational booking staging implementation

Date: 2026-11-16. Feature branch: `feat/operational-booking-workflow`, stacked on unmerged positioning PR #11. Production data, schedules, traffic and messaging were not changed.

## Implemented using the existing CRM

- Provider-scoped slots and overlap exclusion; existing unassigned synthetic/demo slots remain supported.
- Patient request form `/appointments`, protected by `DOCVY_BOOKING_WORKFLOW_ENABLED=true` **and** an isolated staging CRM configuration. Both page and API are disabled for a production/live clinic configuration. Noindex retained.
- Patient requests store requested slot, contact consent and idempotency key. They do not hold/reserve a slot and explicitly await clinic approval. Existing enquiry list and clinic approval workflow reuse `/crm/clinic` and `/api/crm`; the requested slot is preselected and other slots are excluded from that request's selector.
- Atomic approval checks staff role, clinic, provider, requested slot, active clinic/route, time and occupancy. It snapshots fees and commits booking, enquiry transition, audit event and notification event together. Unique occupied-slot protection and row locks prevent double booking. Duplicate approval returns the same booking, not a second one.
- Provider slots cannot bypass approval through the legacy demo reservation function; cross-provider/cross-clinic rescheduling is blocked by a database trigger.
- Database-filtered availability omits blocked, disabled-route/clinic, past and occupied slots. Availability is a snapshot; approval rechecks under locks.
- Founder-only dashboard `/founder`: requires existing clinic-owner sign-in plus an explicit `crm_founders` allowlist entry. The allowlist is read server-side, never taken from user-supplied role metadata. Counts are limited to the first 1,000 rows and labeled as bounded; no patient contact details are displayed. Sessions are held in memory, not localStorage.
- Transactional notification outbox for request/confirmation events, unique per enquiry/event. Founder-triggered mock drain uses SKIP LOCKED, records mock delivery and is idempotent. It sends **zero external messages**. Actual email/SMS/WhatsApp delivery, retries against a provider, cancellation/reschedule templates and recipient consent are not claimed complete.

## Applied migrations — staging only

Applied via connected Supabase to `pmyzedtpogmhvcrurcau` (`docvy-crm-staging`):
1. `operational_booking_workflow`
2. `provider_booking_guards`
3. `booking_public_availability`

CLI-generated migration files are under `supabase/migrations/`. These extend the existing crm_* schema rather than introducing another booking store. Production project `cxyscxjauxoizvvllmfu` was used read-only to inspect public professional schedule fields. Unrelated pre-existing QA schemas were left untouched.

## Six verified provider onboarding dependencies

These are published profile facts, **not confirmed operational calendars**. No real provider was assigned invented availability. All concurrency fixtures used synthetic provider IDs, names and contacts.

| Provider ID | Published practice information available | Still needed before real activation |
| --- | --- | --- |
| `dr-ummed-kumar-meena` | Keri 9 AM–2 PM; Sankhalim 2–5 PM; Poriem 5–9 PM; INR 300 | Working days, appointment duration, per-branch staff/account ownership and exceptions |
| `dr-ambika-rao-jhunjhunu-68798490` | Jhunjhunu 9 AM–6 PM; INR 300 | Working days, duration, staff ownership, breaks/leave |
| `dr-anil-kumar-physiotherapist-delhi` | Delhi 9 AM–9 PM; INR 200 | Working days, duration, staff ownership, breaks/leave |
| `dr-hassan-ishtiyaque-ali` | Mumbai 5 PM–10 PM; INR 300 | Working days, duration, staff ownership, breaks/leave |
| `mr-sahil-kochale` | Indore and Online; Monday–Sunday; INR 1,200 | Actual time windows, duration, per-location ownership and exceptions |
| `dr-basab-raj-ghosh` | Uttarpara; Sunday opens at 9 AM | Closing time, fee, duration, other days/availability exceptions and staff ownership |

All six additionally need notification channel, approved recipients/templates, delivery credentials and clinic approval of their operational schedules. The current application configuration selects one clinic; multi-practice production rollout needs a reviewed clinic-context/session selector, rather than treating six providers as one synthetic clinic. The staging workflow is intentionally not a switch to activate production.

## Test evidence

### Real PostgreSQL isolation tests

`node scripts/test-operational-booking.mjs` builds a temporary PostgreSQL 17 container from the checked-in CRM foundations, applies the new migrations, creates six fictional provider schedules, tests, then stops/removes the container.

Passed: same-time slots for six different providers; idempotent request and conflicting-key rejection; simultaneous approvals produce exactly one booking; one fee snapshot and confirmed event; repeat approval does not duplicate; wrong provider/clinic, viewer, outsider, anon and authenticated table/RPC access denial; blocked-slot rejection; legacy-reservation bypass denial; cross-provider move rejection; booked slot removed from availability; mock outbox drain and repeated drain safety.

### Connected managed staging

Applied migrations to the isolated project. Created a temporary synthetic clinic, role fixtures, slot and two requests. Issued approval calls concurrently through independent connected SQL calls: one success, one PT409. Verified one booking, fee 50,000 paise (synthetic INR 500), one confirmed outbox event, viewer denial, public privilege denial and no booked slot in availability. Removed this task's synthetic bookings, contacts, events, schedules, clinic and exact three Auth placeholder IDs afterward; verified no task clinic remained. Existing staging data was not deleted.

These are database transaction/authorization checks. The Auth placeholders were not login accounts and no email was sent. This does **not** establish successful authenticated browser sign-in, patient browser submission, clinic acceptance, founder login or external delivery in a hosted environment.

### Application and build

- `scripts/test-booking-api.mjs`: passed with mocked database/Auth transport, testing founder allowlist plus user validation, invalid/nonfounder denial, same-origin checks, body allowlist and consent, pending-only response, zero-external-message mock processor and production configuration guard.
- TypeScript passed.
- ESLint: zero errors after fixing the new test harness; one existing CareGuideSearch hook-dependency warning.
- Production build passed (407 generated pages; existing Open Graph edge-runtime notice).
- No new dependencies. Existing CRM/domain-isolation test remains applicable.

## Security review and remaining checks

New tables have RLS, no anon/authenticated grants or permissive policies, and are accessed by restricted server handlers using the existing server-only key. New SQL functions are security invoker; execute is revoked from public/anon/authenticated. Staff actor IDs come from verified Auth users, not client request bodies. Requests contain contact details/preferences only, no health records or diagnosis fields.

The staging security advisor reports INFO for RLS enabled without policies on these intentionally server-only tables; do not add public policies to silence it. An existing Auth warning says leaked-password protection is disabled: [Supabase password protection](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection). No Auth/security setting was changed.

Before production: add network-level abuse limits/bot controls and retention policy; test expiry/revocation and UI sign-out/session behavior; validate six separate clinic contexts and staff boundaries; test cancellation/reschedule notification semantics; configure an approved delivery transport with retry/lease/dead-letter handling; run authenticated browser E2E and accessibility verification. Keep the staging gate off until credentials and synthetic roles are configured. Do not use a service key in client code.

## Concrete blockers awaiting input

1. Approved working calendars, appointment duration, clinic/staff ownership and the missing fees/time windows listed above. Published opening hours alone cannot define bookable slots.
2. Synthetic staging sign-in credentials for owner/scheduler/viewer/founder to run the full browser workflow. Existing server-key values are not returned by the connected Vercel tool, so the managed staging SQL tests cannot be represented as hosted API/browser E2E.
3. Notification channel/account, approved recipients/templates and consent. Mock delivery is not a real notification.

Release status: **staging core implemented; full operational launch not ready**. No production activation, merge, deployment or external notification is authorized by this report.
