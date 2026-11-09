# CRM on docvy.in

Released 9 November 2026. Application commit: `ee1a366336eaf9d5aa5852612f8a54faee62fd82`.
Vercel deployment: `dpl_DiWoVdx8uncvmginUX6P5MtVA2wX`, READY.

## Public routes

- https://www.docvy.in/crm/clinic — clinic staff sign-in.
- https://www.docvy.in/crm/admin — clinic owner sign-in.
- https://www.docvy.in/book — existing fictional booking experience.
- https://www.docvy.in/clinic and /request/test — existing demo routes.
- https://www.docvy.in/admin/directory — separate consent-directory owner review.
- /crm redirects to /crm/clinic and preserves filters.

The apex docvy.in redirects to www.docvy.in. Website navigation and CRM API requests stay on the canonical domain. Official hospital source links remain external references.

## Implementation

- `lib/clinic-crm-config.ts`: explicit `DOCVY_CRM_DEMO_ON_SITE=true` permits the existing synthetic clinic on the production hostname. Demo database and clinic identifiers remain pinned. A configured live clinic takes priority; incomplete live settings fail closed.
- `app/for-clinics/page.tsx`, `app/faqs/page.tsx`: relative CRM and booking links.
- `lib/site-domain.ts`, `middleware.ts`: canonical host handling, path/query preservation, loop prevention and /crm entry route. Private preview builds remain testable.
- `components/StagingCalendar.tsx`: same-origin form actions and sign-in disabled until interactive, preventing pre-hydration submission of credentials in a URL.
- `.env.example`: explicit on-site demo switch and server-only demo configuration names. Existing encrypted demo credentials were extended to the production environment without disclosing their values.
- `scripts/check-site-domain-routing.cjs`: redirect and configuration isolation checks.
- `scripts/verify-crm-staging.mjs`: the synthetic-workspace verifier now targets www.docvy.in.

This is a hosting-domain migration. The clinic CRM still uses the isolated fictional clinic, and it does not authorize appointment requests for real unclaimed directory doctors. Clinic staff accounts are separate from the new consent-directory owner account.

## Legacy entry points

Public aliases `docvy-clinic-demo.vercel.app`, `docvy-crm-staging.vercel.app`, `docvy-crm-staging-rishimartin816-ui.vercel.app` and `docvy.vercel.app` redirect to www.docvy.in, preserving paths and query strings. The team-suffixed legacy alias required an alias-only protection override so visitors reach its redirect rather than a Vercel sign-in page. Project-wide preview protection remains enabled, and private application endpoints still require staff/owner authorization.

Future releases must maintain these alias redirects as well as the www/apex aliases. The canonical custom domains are currently associated with the older Vercel project configuration and are assigned to the current application deployment at release time; do not promote an older project over them accidentally.

Historical immutable preview URLs are infrastructure endpoints, not linked public website pages. They can remain protected by Vercel Authentication.

## Verification

[Live results](verification/crm-domain-live.json): eight pages returned HTTP 200 on www.docvy.in, one h1 each, no Vercel navigation links, no mobile overflow and no browser errors. All four public legacy aliases redirected correctly, retaining filters. The /crm root redirected correctly. CRM availability API returned HTTP 200; staff, owner, enquiries, team and roster reads rejected anonymous access with HTTP 403. Unclaimed real-doctor appointment requests remained blocked, and consent-directory admin data remained HTTP 401 when signed out.

The directory still exports 200 real sourced profiles. Demo booking and CRM URLs remain absent from the sitemap and marked noindex. TypeScript, optimized Next.js build and redirect/isolation checks passed.

There were zero future demo slots before and after the migration. No new demo slots were created. Existing staff credentials were not supplied for this release check, so an authenticated scheduling workflow was not rerun; domain rendering, public API connectivity and anonymous authorization boundaries were tested.
