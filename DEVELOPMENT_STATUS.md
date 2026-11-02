# DOCVY website and product status

**Updated:** 3 November 2026 (Asia/Kolkata)  
**Scope:** Public website, discovery directory, patient enquiry intake, SEO/AEO/GEO, and broader product readiness.

## Completion estimates

These are roadmap estimates based on deliverables, not analytics, traffic, patient activity, or search rankings.

- **Public website and search foundation: 82%.** Main pages, clear patient journey, pan-India guide, NCR-only listings, source-linked profiles, metadata, schema, sitemap and internal discovery links exist. Visual review across mobile devices, Search Console query review and broader provider coverage remain.
- **Website enquiry path: 55%.** Form, server validation, private Sheets handoff and token-protected Apps Script source exist. The script is not installed or deployed and Vercel production variables are not configured; the live form must remain closed until end-to-end verification.
- **Full DOCVY product: 22%.** This reflects a weighted roadmap across public discovery, provider data, enquiry handling, provider operations, hospital software, identity/access and business intelligence. The provider/hospital application, appointment availability engine and operational dashboards are not complete.

## Implemented in this release

- Rewrote page and form availability copy to distinguish the India-wide guide from the current Delhi, Gurugram and Noida directory.
- Kept doctor cards inside DOCVY and made the request state truthful: when intake is disconnected, the form does not collect details; when connected, it saves only to DOCVY's private intake and does not notify a provider.
- Added source-backed hyperlocal entry points that filter the existing directory instead of creating unsupported locality pages.
- Added server checks for same-origin requests, request size and content type, provider/location membership, required consent, basic field validation, a honeypot, a timeout and token-authenticated forwarding.
- Added a private Apps Script endpoint source that validates the shared token, checks headers, blocks duplicate references, throttles repeated submissions, escapes spreadsheet formula input and records provider notification as `NOT_CONFIGURED`.
- Kept provider emails disabled. No `MailApp` code or provider contact registry is included in the current endpoint.
- Repaired the repository's ESLint configuration for its installed ESLint 8 setup.
- Updated the private intake setup guide to mark the endpoint and Vercel variables as pending and describe a synthetic-only end-to-end check.

## Verification evidence

- `pnpm lint` passed after the ESLint configuration fix.
- `pnpm build` passed with Next.js 14.2.35, TypeScript validation and all 26 static pages generated.
- `scripts/apps-script/Code.gs` passed a JavaScript syntax parse. This does not prove the script is installed, authorized or deployed in Google Workspace.
- `git diff --check` passed; Git reported line-ending normalization warnings only.
- Before this release, live public-page checks confirmed HTTP 200 and page-specific titles, descriptions, canonical URLs, one H1 and Organization structured data on sampled routes. `/request` is intentionally noindex; `/robots.txt` and `/sitemap.xml` were available.
- Search Console query data was not available in the checked account state. No rankings, search volume, traffic or indexing outcomes are claimed.
- Production publication for this release is pending. Do not describe these local changes as live until Vercel reports the deployment READY and fresh public-page checks confirm them.

## Live intake state and safe test

- The current production project has no `GOOGLE_SHEETS_WEBHOOK_URL` or `GOOGLE_SHEETS_WEBHOOK_TOKEN` configured. The appointment form therefore remains closed and does not collect visitor data.
- The target spreadsheet is private. The Apps Script endpoint must be installed, given a server-only token in Script Properties, deployed as a web app, and connected through server-only Production variables before a live lead test.
- After that connection, submit one clearly labelled synthetic test lead, verify its reference and status in the private `Appointments` tab, and confirm the email status is `NOT_CONFIGURED`. Do not use real patient data or notify a provider for this test.
- A successful direct Google Sheets connector write is not an end-to-end website test.

## Not yet built or verified

- Provider credential review/claiming workflow and wider source-backed provider coverage.
- Appointment availability, slot reservation, provider confirmation and hospital-facing dashboard.
- Staff identity, tenant administration and role-based access rollout.
- Clinic/hospital management software and business intelligence dashboards.
- Provider notification, verified appointment inboxes, fees and billing.
- Mobile visual review and actual Search Console query analysis.

## Change controls

- No production database migration, authentication, SSO or security-setting changes were made.
- No production deployment is considered complete until its Vercel and live-page evidence is recorded below.
- No provider has been emailed and no appointment is represented as booked.

## Release record

| Date | Commit / deployment | Result |
|---|---|---|
| 3 Nov 2026 | Pending | Site and intake changes are being prepared for production; update this record after deployment verification. |
