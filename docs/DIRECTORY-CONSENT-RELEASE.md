# DOCVY consent-based directory

Owner and notification recipient: **contact@docvy.in**.

## Publication

The sourced catalogue contains 200 distinct doctors: 40 each in Delhi, Gurgaon, Noida, Ghaziabad and Faridabad. Each entry has an official hospital/clinic profile source. All start unclaimed, without consent, portraits, biographies, experience claims or appointment access. Source-linked presence does not establish a partnership.

`lib/provider-candidates.ts` is a source snapshot, not the publication authority. Runtime pages, search, profile lookups, facilities, footer city links, sitemap and CSV use the database publication registry through `lib/public-directory.ts`. Registry errors fail closed. Do not restore deleted/unpublished profiles from the snapshot during a deployment.

`profileStatus` supports unclaimed, claimed and verified. Claimed requires written consent; verified additionally requires registration number, council and a separate manual check. Backend constraints and appointment triggers enforce the policy even if a client bypasses a button. Withdraw consent to return a profile to unclaimed; unpublish to remove it from public views immediately.

## Routes

- `/claim-profile?provider={id}`: private written-consent submission, professional bio and optional portrait.
- `/remove-profile?provider={id}`: private removal request; 48-hour deadline. Pending removals are excluded by the public registry at the deadline even if the owner has not processed the queue.
- `/admin/directory`: confirmed owner login, private review queue, status filters, consent review, manual verification, unpublish, withdrawal and audit history.
- `/data/docvy-ncr-doctors.csv`: current public records only, no contact details or private evidence.
- `/api/profile-request`: same-origin JSON intake, validation, rate limits, idempotent reference and a server-signed database write.
- `/api/directory-admin/*`: owner-session-only data, review and portrait routes. Cookies are HttpOnly, Secure in production and SameSite=Strict. Authorization checks the confirmed email against the private allowlist and an existing Auth session.

The owner creates their own password at the admin page and confirms ownership of contact@docvy.in. No default password or owner Auth account has been created. Supabase email confirmation is enabled; owner account activation remains an account step requiring mailbox access.

## Photos

No hospital portraits are hotlinked. Optional uploads are resized to WebP in the browser and stored in the private `docvy-profile-submissions` bucket. Anonymous uploads require an opaque pending claim path and cannot replace an existing object. Only the confirmed owner can review a private portrait or copy it into `docvy-provider-photos` after explicit approval. Unclaimed DTOs never expose photo or bio fields.

## Email status — incomplete external connection

Claims and removals save a private record addressed to contact@docvy.in with `email_status=pending_connection`. No notification email is sent. The forms and admin screen disclose this. Vercel CLI account authorization could not be completed by the owner, and no mail-delivery credentials are configured. The address alone does not configure a sending service. Do not mark notification delivery complete until a service is connected and a real delivery is verified.

## Database and environment

Applied through Supabase MCP to production project `cxyscxjauxoizvvllmfu`; SQL is recorded in `docs/sql/directory-*.sql` in consent → photos → signed intake → validation order. Temporary QA policies and fixtures were removed after checks.

`DOCVY_DIRECTORY_WRITE_SECRET` is a generated server-only HMAC key, stored in encrypted Vercel production/preview environments and the private database. Never put it in a public environment variable, repository file or browser bundle. Old anonymous write RPC permissions are revoked. Public read RPC returns a limited directory DTO. Admin RPCs require the confirmed owner and live session. Private tables have RLS, no direct anonymous/authenticated access, and purpose-specific functions only.

## Verification

- TypeScript and optimized Next.js production build passed.
- Twelve routes checked at 390px: HTTP 200, one h1, no horizontal overflow, no third-party doctor portrait, no unclaimed appointment CTA, no page errors.
- Browser claim/removal submissions saved private references and displayed pending-email status; temporary records removed.
- API checks: idempotent reference, missing consent rejected, cross-origin submission rejected, unclaimed appointment rejected, anonymous admin denied, direct unsigned write denied.
- Transactional DB checks: owner/session authorization; claimed/verified transitions; manual-check requirement; unpublish; 48-hour removal deadline; withdrawal; signed appointment reference/idempotency; forged signatures denied. All fixtures rolled back; zero real profiles claimed or verified.
- Private Storage upload passed; anonymous overwrite denied; QA object and temporary cleanup policies removed.
- Standalone local ESLint is blocked by an existing missing module link for eslint-plugin-react-hooks. Next's build validation and TypeScript passed; this does not represent a clean standalone lint run.

Security advisor warnings for intentionally exposed limited public RPCs and explicitly owner-checked admin RPCs were reviewed. RLS-without-policy on private tables is intentional default denial. [Supabase RPC exposure guidance](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable).

## Release checks

- Confirm the deployed commit and the intended docvy.in aliases.
- Confirm 200 public profiles, 40 per city; zero appointment-enabled profiles until written consent is reviewed.
- Check `/doctors?q=piles`, profile source links, `/claim-profile`, `/remove-profile` and anonymous `/api/directory-admin` denial.
- Check sitemap excludes unpublished profiles and demo booking pages; city/specialty URLs need at least three published profiles.
- Production indexing requires `VERCEL_ENV=production` and `DOCVY_INDEXING_ENABLED=true`. Preview remains noindex; preview sitemap is empty.
- Check production HTML/canonicals/JSON-LD and run external Lighthouse and Google Rich Results tests separately. No external score or eligibility result is claimed here.

## Live release — 9 November 2026

Deployed application commit: `0e681715414678410b078a2fab3b2a0c30560f1f`.
Vercel deployment: `dpl_FKNTdvURsWm8PLSSgMhKzXKxSJrL`, READY.
Both docvy.in aliases point to this deployment; the apex redirects to www with HTTP 308.

[Live verification results](verification/directory-consent-live.json) confirm eight public/admin routes, correct canonical and robots metadata, no third-party portraits or unclaimed request links, no browser errors or mobile overflow, a 200-row current export (40 in each city), 200 doctor URLs in the sitemap, no demo booking URLs, blocked unclaimed appointment submissions, rejected missing consent and anonymous admin denial. Live pages and exports return no-store caching rules.

The database has 200 unclaimed profiles, zero enabled appointment providers, no test review records, no temporary photos or policies, and zero owner Auth accounts. Owner account creation and mailbox confirmation remain required. Email notification delivery is still pending a service connection; it has not been tested or represented as sent.

Local preview-mode checks returned noindex,nofollow and an empty sitemap. The older demo.docvy.in hostname did not resolve during the release check, so no remote preview check is claimed. Production docvy.in checks passed. External Lighthouse and Google Rich Results scores were not run.
