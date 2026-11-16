# DOCVY central booking release evidence

Updated: 16 November 2026. Branch: `feat/operational-booking-workflow`. Review: PR #13, stacked on the public-positioning PR #11. The independent sitemap PR #9 is unchanged.

**Status: production-shaped booking core implemented and locally validated; not activated or ready for an unqualified production release.** No production schema/data write, merge, deployment, real message or patient booking was performed.

## User journey and implementation

Patient selects a participating doctor/location on `/book` or `/appointments` → `/api/booking` validates consent and request → service-only `docvy_booking_submit` reserves the actual `crm_slots.doctor_id` slot and creates the central case/audit/outbox in one transaction → DOCVY returns a reference and private tracking link. Approval requests return `requested`, never a confirmed booking. Clinic confirmation must reserve an actual future managed slot; a free-form confirmation timestamp cannot create availability.

`/founder` and live `/crm/clinic` / `/crm/admin` use the same central ledger. Existing directory-admin permissions grant founder access. Active clinic managers see their clinics; doctors see/update only their linked roster; viewers receive no patient queue. Dashboard aggregates cover the complete ledger by doctor and city; queue pagination uses `(created_at,id)` cursors. These are appointment counts, not revenue or independently established clinical outcomes.

The patient opens `/appointments/track` with a private fragment receipt, then verifies the same appointment email using Supabase Auth before reporting arrival, attendance, absence or dispute. The receipt hash, not the raw token, is stored. Provider queues never expose the receipt. Receipt cancellation is allowed before the visit; patient evidence requires matching verified contact and an active Auth session. Logout revokes that session. Receipt access expires after 90 days; this is not a database retention/deletion policy.

Doctors can report completion/no-show after the appointment ends. They cannot set `completed_verified`. Agreement with the independently authenticated appointment contact produces that status; conflicting reports become `disputed`. Changes are audited and audit events reject updates/deletes. Contact verification establishes control of that contact, not physical presence or clinical quality; arrival is a patient assertion, and collusion or booking with a provider-controlled contact is not proven impossible. Disputes require DOCVY review.

Public forms and tracking stay DOCVY-branded. Doctor and practice identities remain visible for informed appointment selection. Confirmation is displayed in the tracking receipt; real outbound delivery is still blocked below.

## Approved availability

- Six approved providers: Mon–Sat IST, 30-minute appointment plus 30-minute gap. General start times 10:00, 11:00, …, 19:00; last visit ends 19:30.
- Dr Meena: Keri 09:00–14:00 (5 starts), Sankhalim 14:00–17:00 (3), Poriem 17:00–21:00 (4). Existing owner-supplied addresses are preserved.
- Sahil Kochale: generated physical slots only at the published Indore practice. Published Online / Psyheal Online remains **doctor-approval requests only**, even if his physical booking option is instant. No automatic Online slots or other city bookings are accepted. A real, authorized roster and manually confirmed availability are needed before confirming an Online appointment.
- Generated weekly candidates: 372 total (Meena 72; five others 60 each). These are approved recurring candidates, not a claim of 372 live bookable appointments.
- Founder publishes a bounded explicit date range after checking closures, roster presence and practice allocation. Clinic activation is separate. A cross-clinic provider lock rejects overlaps and gaps shorter than 30 minutes. Inputs labelled IST are parsed explicitly as IST.
- No fees were invented or charged. Dr Basab Raj Ghosh's missing fee remains for clinic confirmation; fees do not block generating candidate slots.

## Database migration boundary

Read-only production inspection confirmed `crm_slots.doctor_id`, `crm_doctor_roster.provider_id`, active staff/doctor links and the unique occupied-slot index (`status <> cancelled`). The new production-shaped SQL uses those actual fields.

Apply, in order, **only to a reviewed production-shaped staging baseline first**:

1. `supabase/migrations/20261115214014_docvy_live_booking_control.sql`
2. `supabase/migrations/20261115214015_docvy_patient_visit_evidence.sql`

These add the central ledger, private service RPCs, audit/outbox, patient evidence, session check, summary and schedule guard. All new application tables have RLS and no anon/authenticated access. The sole security-definer helper returns only whether the caller's own Auth session remains active; all booking writes are security-invoker/service-only. The database is a trusted-server boundary; HTTP handlers validate identities and tenancy before invoking service-role RPCs.

**Do not blindly run a database push against production or the old managed staging database.** Existing managed staging `pmyzedtpogmhvcrurcau` still has the older demo schema: slots use `provider_id`, rosters lack `provider_id`, clinics lack `city`, and staff lack active/doctor fields. Its earlier three migrations are archived under `supabase/staging-migrations/`, outside the production migration path. They remain reproducible through `scripts/test-operational-booking.mjs`. No remote migration history was edited. Choose a production-shaped isolated staging baseline and reconcile its migration history before applying the new pair. Existing production foundations and directory tables are required; these two migrations are not an empty-project bootstrap.

New SQL has not been applied to production or the old managed staging database. The preexisting `docvy_booking_qa` schema is untouched. Existing managed-staging results in `OPERATIONAL_BOOKING_STAGING.md` describe the previous implementation and do not validate this release's hosted Auth/UI.

## Verification actually performed

| Check | Result and evidence boundary |
| --- | --- |
| `pnpm exec tsc --noEmit` | Passed |
| `pnpm lint` | 0 errors; existing `CareGuideSearch.tsx` hook dependency warning only |
| `pnpm build` | Passed Next.js 14.2.35 optimized production build; existing edge-runtime notice |
| `node scripts/test-booking-api.mjs` | Actual route handlers with mocked Auth/database transport: correct `p_data` RPC body, consent/CSRF, configuration gate, receipt protection, matching patient contact, viewer denial, doctor scoping, server-derived actor, invalid Sahil scheduled locations |
| `node scripts/test-booking-schedule.mjs` | Six providers, IST windows, gaps, Meena locations, Sahil Indore-only candidates, 372/week, no Sundays/duplicates, date validation |
| `node scripts/test-live-booking.mjs` | Temporary Docker PostgreSQL 17, actual release migrations and synthetic production-shaped fixture: concurrent instant requests one winner; payload-bound idempotency; repeat approval after confirmation; actual-slot approval; premature and doctor-only verification denied; patient conflict → dispute; immutable audit; public access denied; session revocation; overlap rejected; founder summary; Online forced to pending approval; concurrent outbox leases distinct |
| Archived staging DB regression | `node scripts/test-operational-booking.mjs` passed after migration archive; synthetic approvals/tenant/fee/outbox checks preserved |
| Local built-server HTTP | `/book`, `/appointments`, `/appointments/track`, `/founder`: 200 and noindex/nofollow; `/book` canonical `https://www.docvy.in/book`. API responses no-store; disabled provider list empty, submission 503, founder/Auth config 503 with no service configuration; readiness does not claim bookable |
| Authenticated hosted browser journey | **Not passed / blocked**: no configured production-shaped staging runtime + approved synthetic staff credentials |
| Real email/SMS/WhatsApp and OTP delivery | **Not passed / blocked**: no connected messaging service or approved delivery configuration |

No real patient information or production appointment rows were used. Local synthetic containers remove themselves. The database fixture is not a full clone of all existing production triggers/policies, which is why hosted parity tests remain mandatory.

## Remaining launch work

1. Connect an outbound messaging account and a verified DOCVY sender. Founder alert recipient supplied by owner: **rishimartin@docvy.in**. No alert has been sent. No other recipient, clinic staff identity or messaging credentials were supplied. Only Supabase integration was visible; Vercel CLI integration provisioning required account authentication. The existing source-branch Resend worker was reviewed, not copied or represented as working delivery.
2. After connection, implement the worker against the installed service: DOCVY confirmations/reminders/outcome prompts, private patient-link delivery, clinic alerts, retries, deduplication, exhausted-job visibility and verified delivery handling. The SQL outbox and atomic lease are implemented; **a working outbound worker/scheduler is not**. Configure real DOCVY-branded Supabase OTP templates/sender and test patient verification. No mock transport is presented as actual delivery.
3. Assign real clinic tenants and authorized staff accounts. Production inspection found Meena's three clinics roster-linked and disabled; other four providers' operational clinic bindings remain incomplete. Existing placeholder Gurugram clinic must not be reused as an invented tenant. Preserve tenant branch requirements and review each clinic/city/practice mapping. Clarify who approves Online requests and how their roster is staffed.
4. Provision isolated production-shaped staging, set server-only variables from secure storage, apply the reviewed pair and configure synthetic owner/clinic manager/doctor/viewer/patient logins. Run the complete browser → API → database → receipt → approval → visit report → patient verification journey, wrong-tenant/role attempts, expired/revoked sessions, cancellation, repeated submissions, simultaneous booking and real staging delivery. Test mobile/accessibility and notification failures. Existing local code has no live service-role value.
5. Confirm operational booking horizon, closures/leave, dispute handling and approved retention policy. Preserve the patient receipt secret across releases or explicitly plan a rotation/recovery process; rotating it invalidates recomputed receipts for idempotent retries. Missing fees must remain clearly subject to clinic confirmation.
6. Keep `DOCVY_HYBRID_BOOKING_ENABLED` and `DOCVY_PATIENT_AUTH_ENABLED` off until the above passes. Then review the PR, approve production migration/deployment, enable only correctly mapped/covered practices, and run a synthetic post-release booking/cancellation with delivery verification. A sitemap/copy PR merge is not booking activation.

The notification account dependency follows the [Vercel Marketplace skill](C:/Users/Dell/.codex/plugins/cache/openai-curated-remote/vercel/0.54.1/skills/marketplace/SKILL.md), which says: “If it needs the user's account or a dashboard/browser step → **STOP and ask them to complete it, then continue**.” Account connection is required before that delivery integration can be finished. Independent booking implementation and tests continued.
