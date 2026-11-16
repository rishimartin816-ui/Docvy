# DOCVY Vercel provisioning repair

**Latest release check: resolved and live.** The owner corrected the server credential; the private candidate probe returns HTTP 200 with `healthy: true`, `credentialType: service_role` and the correct project `cxyscxjauxoizvvllmfu`. `www.docvy.in` serves `dpl_5WFnxbPAixJudRj4x5DUn1FJnF8Q` at application commit `3937d95`. The provisioning and credential failures below are historical. See [current evidence](BOOKING_HOSTED_VERIFICATION_20261116.md).

## Verified repair and current release target

Rechecked 16 November 2026 after the owner's repair: the obsolete store connection has no deployment actions and `required: false`. Booking preview `dpl_FYy3Tt1YF6TneGFDUZzRmv3448yT` reached READY at commit `4dc299f91783e2fa17e0b93f0e444e39a5d461a8`. The provisioning failure below is historical and is no longer the release blocker.

The live hostname `www.docvy.in` resolves to deployment `dpl_GXz7FbJdb9GFgcoD2zvu2Snu7AAb` in **`docvy-crm-staging`** (`prj_NdSOimyjRS2dOLUTq0Kc7rtGUMxs`), despite that project's name. It is not currently served by the older `docvy` project (`prj_xkWKqXAFft6fasGa8eadLLcpbgsw`). Preserve existing hostname assignments until the release is tested.

Environment metadata on the actual serving project still has no `SUPABASE_SERVICE_ROLE_KEY`. Its directory intake key was checked privately and is publishable, not privileged. The older project's service-role variable does not configure the serving project and must not be assumed to belong to the active database. The owner must securely set the active `docvy-production` project's server credential on `docvy-crm-staging`, Production target. Never paste it into chat or use a `NEXT_PUBLIC_` name.

The actual serving project already has the existing lowercase `resend_api_key` in Production and isolated CRM staging credentials. No new email provider is needed. Hosted booking/Auth/delivery checks, the four release migrations and scheduler remain pending; READY means a successful deployment build, not operational bookings. No production booking migration, provider activation or release promotion has been performed.

## Historical diagnosis

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
