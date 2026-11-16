# Reuse existing DOCVY owner access

See [current hosted verification](BOOKING_HOSTED_VERIFICATION_20261116.md): synthetic staging founder/patient Auth tests and actual Resend inbox delivery now pass. Temporary test accounts were removed; the existing production owner account/password/allowlist was not changed. Patient verification codes use Supabase-generated codes delivered through Resend directly, so separate SMTP setup is not needed for this route. The production release is awaiting correction of its rejected server database credential.

On 16 November 2026, read-only production checks confirmed **contact@docvy.in has a verified Supabase Auth account and a private directory-admin allowlist entry**. The booking dashboard already uses that existing authorization function and can reuse this owner login. No new founder account, clinic login or doctor login is required for founder-managed booking.

`rishimartin@docvy.in` was supplied as the founder alert recipient. It has no Auth user/allowlist entry, but that is **not a release blocker**: notification recipients and administrator identities are separate. No account, password or privilege was created or changed by this task.

1. Use the existing owner-created contact@docvy.in credentials for `/founder` after the new application/migrations are available in the intended environment. Do not share passwords or API keys in chat. A copied email string in a request never grants access.
2. Keep `DOCVY_BOOKING_CLINIC_ACCESS_ENABLED=false`. Clinic staff accounts/mappings are not needed for this launch model. Doctor outcome links grant one-appointment reporting, not CRM access.
3. Provision/reconcile the isolated production-shaped staging baseline and server-only runtime, apply all reviewed migrations in `DOCVY_BOOKING_RELEASE.md`, then test a synthetic founder identity and the actual hosted journey. Production owner verification alone does not establish successful login to a different staging Auth project.
4. Reuse the already activated Resend service. Confirm booking runtime credentials and sender acceptance, then verify Supabase Auth SMTP/OTP delivery/templates separately. A working partner email is not proof that patient verification emails work.
5. Finish full hosted request → founder confirmation → private provider report → independent patient verification testing, scheduled retries/reminders and actual inbox delivery before production migration/deployment approval.

The existing `docvy_is_directory_admin()` requires a verified Auth user, matching private allowlist email and an active session. The booking dashboard also checks session revocation. An alert-recipient environment variable is never an authorization rule. If a separate rishimartin@docvy.in login is later requested, handle that as an explicit, verified administrative grant; do not create it merely to send alerts.
