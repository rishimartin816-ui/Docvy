# Production clinic workspace — 10 November 2026

## Scope and routes

- `/crm/clinic` and `/crm/admin`: production multi-clinic workspace when `DOCVY_CRM_WORKSPACE_ENABLED=true`.
- `/crm/demo`: the existing fictional clinic using the isolated demo project; `/book` remains fictional. No test clinic or doctor is copied into production.
- `/api/workspace`: authenticated state, patient search and mutations. No service-role key in Next.js or the browser.
- `/api/workspace/session`: sign-in, account registration, refresh, recovery, sign-out and private initial-owner setup.
- `docvy-owner-setup` Supabase Edge Function: initial owner creation for `contact@docvy.in` only, using the function's own server-side Admin API credential. It authenticates a 256-bit, expiring, one-use capability whose SHA-256 hash is stored privately. It cannot reset or replace an existing owner. Raw capabilities are never stored in Git, query strings, logs or database records.

## Implemented

Clinic creation with explicit management authority; clinic switching; scoped staff roles and seven-day access invitations; patient contact creation, update, server-side search and privacy redaction; internal doctor roster and presence; doctor-specific availability; slot blocking; idempotent staff-confirmed bookings; cancellation, completion and no-show; same-doctor rescheduling; agreed fees and manual payment/refund records; actual aggregate dashboard counts and daily chart; and reference-only audit events.

Payment records track funds already handled by a clinic. DOCVY does not charge or transfer money. Refund entries cannot exceed the recorded net payment; payment entries cannot exceed the agreed fee. Cancelled appointments remain in the register for reconciliation.

Directory routing requires an explicitly linked, currently published and opted-in provider. Only the DOCVY owner can approve that link, and doctor name, primary practice name and city must match. One approved primary-clinic route per directory provider is supported in this release. A public request remains an enquiry until staff confirm the visit and fee; confirmation and cancellation update the original request status. Unclaimed directory profiles remain unable to accept requests. Public instant slot booking is not activated.

## Security

- Supabase Auth validates sessions on the server. HttpOnly, Secure-in-production, SameSite=Strict cookies carry access and refresh tokens; tokens are not returned to browser JavaScript or stored in localStorage.
- Every database operation derives its actor from `auth.uid()`, checks a live Auth session, confirmed/admin-provisioned account and current database membership. Workspace sessions have an eight-hour absolute limit. Disabling staff access affects the next operation.
- Viewer results omit patient contacts and financial values. Doctor members receive only their assigned schedules and related patient contacts.
- Private tables have RLS and no direct client grants. The public workspace RPC is invoker-only and callable only by authenticated users; the private implementation checks all authority explicitly. The owner-setup claim RPC is executable only by service_role.
- Mutation routes require a matching Origin and JSON bodies with limits. Responses are private/no-store and noindex. No patient searches are placed in URLs. Public signup grants no clinic or administrator role.
- Existing directory consent, manual verification and photo approval rules remain unchanged.

## Data and migrations

Production database: `cxyscxjauxoizvvllmfu`. The isolated fictional CRM project is unchanged.

`docs/sql/crm-production-workspace.sql` is the consolidated schema/function snapshot. Applied migrations include the initial workspace, patient conflict-target correction, search/metrics/session limit, owner setup and request coordination. `crm-owner-setup.sql` and `crm-request-status.sql` document the separate owner capability and request-status guard changes. No owner setup capability is included in these files.

The verification script uses synthetic records inside a transaction ending in ROLLBACK. After the tests, production still had zero Auth users, clinics and patients, and 1,270 published directory records. No real profile was claimed or verified during testing.

## Verification

- TypeScript passed; targeted ESLint passed after restoring the existing pnpm installation with its frozen lockfile.
- Transactional database checks passed: anonymous denial; no direct patient-table access; clinic authority; patient consent; contact update/search; per-doctor overlap; cross-clinic denial; blocked-slot rejection; booking replay and double-book rejection; future-completion rejection; same-doctor rescheduling; payment replay, overpayment and excess-refund rejection; summary readback; viewer redaction; doctor scope; invitation acceptance; immediate staff disabling; contact redaction; expired/revoked-session denial; owner-capability replay denial.
- A transaction-only, opted-in synthetic provider request was routed to its matching clinic, marked contacted, converted to an appointment, and cancelled after provider opt-out. All fixture records were rolled back.
- Browser checks at 390px and 1440px covered all six sections and appointment details, with no horizontal overflow or JavaScript errors. Authenticated visual tests used a local browser route fixture, not production patient data. The signed-out API, CSRF response and invalid owner capability were tested against actual services.

## Activation and remaining operations

The project owner must use the privately issued setup link to choose their own password. The first real clinic's name, address and management authority must then be entered in the workspace. No owner password was invented or shared by the agent.

Email delivery remains unconnected/unverified. Access invitations are recorded, not emailed. Staff account confirmations and password recovery depend on a properly configured Supabase mail service. Appointment notification delivery is not claimed. Provider consent review is still required before real website requests can reach a clinic.

Current list limits: 200 initial patient contacts with server search returning up to 100 matches, 500 appointment-register entries per selected period, 150 rendered availability rows before narrowing filters, 200 recent payment entries and 50 audit rows. Dashboard aggregates query the full selected period. Medical records, recurring schedule templates, public instant booking, automated payments, WhatsApp/SMS, automated retention and backup/restore certification are not part of this release.
