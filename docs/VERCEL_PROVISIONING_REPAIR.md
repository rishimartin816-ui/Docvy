# DOCVY Vercel provisioning repair

Observed 16 November 2026. New preview deployment `dpl_Eh9idi4KGKz7ALG5ENhvaUWAww5T` failed before build logs with `BUILD_FAILED: Resource provisioning failed`.

The connected Vercel store `supabase-crimson-lens` reports suspended status, external project `dlfcvnkrcwkyjbczpllp`, and a required `branch-project` deployment action for both preview and production on the DOCVY project. This is different from the healthy active `docvy-production` project `cxyscxjauxoizvvllmfu` and existing staging project `pmyzedtpogmhvcrurcau`.

## Repair steps for the owner

1. Open the Vercel DOCVY project, then its Storage / Marketplace integration resource connection for `supabase-crimson-lens`.
2. Securely preserve the required environment settings before disconnecting. Vercel resource disconnection removes the resource-generated environment variables, while retaining the database itself. Keep keys private; do not paste them into chat.
3. Disconnect only the obsolete resource's project connection. Do not select database/resource deletion or delete the Supabase integration account.
4. Connect the existing healthy `docvy-production` project if the integration offers existing-project selection. If it only offers creating a new database, use the existing database's credentials in Vercel Environment Variables instead; another database is not needed for this fix.
5. Confirm the next booking runtime uses the correct project throughout:

| Setting | Correct source |
| --- | --- |
| `SUPABASE_URL` | `https://cxyscxjauxoizvvllmfu.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_URL` | Same production URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only service-role key from that production project |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public/publishable key from that same project |

Set the production values only in the Production target. Keep Preview bound to staging with booking disabled until its schema/runtime are ready; do not use the live database for synthetic preview bookings.

Review other existing Supabase/Postgres key aliases used by current application features as well. Preserve Resend and other unrelated settings. Public/publishable keys and server service-role keys are different; never give a server key a `NEXT_PUBLIC_` name.

6. Retry the failed preview deployment first. Confirm it passes provisioning and starts build logs. This validates the deployment dependency repair; it is not itself evidence that booking is live.
7. Resume the production-shaped staging, Auth/SMTP, scheduler, booking-flow and release checks in `DOCVY_BOOKING_RELEASE.md` before promoting production.

No production database, credential, integration setting or site deployment was changed during diagnosis. A fresh Supabase staging branch request returned declined; it was not retried to bypass that decision. Native Windows computer use was stopped because it could not confidently identify the browser URL for policy enforcement, so dashboard repair could not be performed through that interface.

References: [Vercel integration-resource behavior](https://github.com/vercel/vercel-plugin/blob/main/skills/vercel-cli/references/integrations.md), [Supabase billing/project limits](https://supabase.com/docs/guides/platform/billing-on-supabase). Restoring an extra old project may encounter active-project limits; reconnecting the actual intended database avoids relying on it.
