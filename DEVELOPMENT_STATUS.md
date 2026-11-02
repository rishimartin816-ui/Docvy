# DOCVY website and product status

**Updated:** 3 November 2026 (Asia/Kolkata)  
**Scope:** Public website, discovery directory, patient enquiry intake, SEO/AEO/GEO, and broader product readiness.

## Completion estimates

These are roadmap estimates based on deliverables, not analytics, traffic, patient activity, or search rankings.

- **Public website and search foundation: 90%.** Main pages, clear patient journey, pan-India guide, NCR-only listings, source-linked profiles, metadata, schema, sitemap and internal discovery links are live. The homepage search panel is now a real concern/specialty search. More mobile interaction review, Search Console query review and broader provider coverage remain.
- **Website enquiry path: 55%.** Form, server validation, private Sheets handoff and token-protected Apps Script source exist. The script is not installed or deployed and Vercel production variables are not configured; the live form must remain closed until end-to-end verification.
- **Full DOCVY product: 22%.** This reflects a weighted roadmap across public discovery, provider data, enquiry handling, provider operations, hospital software, identity/access and business intelligence. The provider/hospital application, appointment availability engine and operational dashboards are not complete.

## Implemented in this release

- Rewrote page and form availability copy to distinguish the India-wide guide from the current Delhi, Gurugram and Noida directory.
- Replaced the homepage's decorative search card with a labeled GET search form to the patient guide; it submits a search term only and does not ask for contact details.
- Added a city selector to the patient guide. Choosing Delhi, Gurugram or Noida narrows related profile counts and carries the selected city plus specialty query into the existing doctor-directory filters; a city with no related specialty profiles still links to all of that city's listings.
- Removed a repeated availability strip from the homepage, added a direct FAQ link in the footer, and corrected About copy that suggested the directory was still unopened.
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
- The city-selector change passed `pnpm lint` and `pnpm build`; the build generated all 26 static pages. Live interaction on production passed: “joint pain” + Noida showed Orthopaedics and one source-linked profile; “View matching profiles in Noida” opened `/doctors?q=orthopaedics&city=Noida`, where Dr. Atul Mishra appeared in the Noida results.
- `scripts/apps-script/Code.gs` passed a JavaScript syntax parse. This does not prove the script is installed, authorized or deployed in Google Workspace.
- Mobile first-viewport screenshots at 390px were visually reviewed for the homepage, patient guide, doctor directory and provider plans. No obvious first-viewport clipping appeared; full-page interaction and overflow measurements remain open.
- Figma account inspection found view-only seats and no DOCVY file reference in repository artifacts or matching Google Drive searches. The current repository `DESIGN.md` palette and components were used as the design reference; no Figma file was edited.
- `git diff --check` passed; Git reported line-ending normalization warnings only.
- Before this release, live public-page checks confirmed HTTP 200 and page-specific titles, descriptions, canonical URLs, one H1 and Organization structured data on sampled routes. `/request` is intentionally noindex; `/robots.txt` and `/sitemap.xml` were available.
- Search Console query data was not available in the checked account state. No rankings, search volume, traffic or indexing outcomes are claimed.
- Commit `986c33e` is live in Vercel production as deployment `dpl_G9mavqzeH2DQF8K8CQgGWLuh8Avk` (`READY`), with aliases `www.docvy.in` and `docvy.in`.
- Fresh live checks returned HTTP 200 for `/`, `/doctors`, `/care-guide`, `/request`, `/faqs`, `/pricing` and `/doctors/gurugram`. The checked pages have page-specific titles, one H1 and correct canonical URLs; `/request` intentionally has no canonical and is `noindex, nofollow`.
- After the latest homepage search update, live GET checks returned HTTP 200 for `/` and `/care-guide?q=joint%20pain`; the homepage response contains the shortened mobile search hint. Search results render client-side, so this HTTP check does not independently verify the specialty-card interaction.
- On 3 Nov, a current Firecrawl audit covered all 17 URLs in the sitemap plus `/request` and `/status`. All 19 returned HTTP 200. The 17 sitemap pages have page-specific titles and descriptions, canonical URLs, `index, follow`, and one H1 each. `/request` and `/status` intentionally use `noindex, nofollow` and have no canonical. This confirms page delivery and markup, not search indexing or rankings.
- Live `/robots.txt` and `/sitemap.xml` both returned HTTP 200; robots disallows `/api/` and points crawlers to the sitemap.
- The live sitemap lists 17 indexable URLs. The homepage, patient guide, directory and provider-plan pages explain pan-India purpose versus current NCR listings, distinguish informational specialty guidance from diagnosis, and disclose that appointments are not booked. No unreviewed doctor credentials or availability are marked up as verified.
- Live page content confirms that DOCVY is for India while doctor coverage is currently Delhi NCR, and that enquiries are closed while the private Sheet connection is missing. No provider email is sent.

## Live intake state and safe test

- The current production project has no `GOOGLE_SHEETS_WEBHOOK_URL` or `GOOGLE_SHEETS_WEBHOOK_TOKEN` configured. The appointment form therefore remains closed and does not collect visitor data.
- The private target spreadsheet is accessible through Drive. Its `Appointments` header row has the 14 current core columns; no lead rows were read. The Apps Script endpoint must be saved, given a server-only token in Script Properties, deployed as a web app, and connected through server-only Production variables before a live lead test.
- The DOCVY Chrome profile has an Apps Script editor project open. Its initial editor view showed `Code.gs` nested under `function myFunction()`, which would not expose the required top-level `doPost` handler. A replacement with the reviewed repository source was attempted, but the UI state timed out during verification; whether that edit was saved is unknown. No endpoint was deployed and no token was created. The current Google Drive connector cannot inspect or deploy Apps Script projects.
- After that connection, submit one clearly labelled synthetic test lead, verify its reference and status in the private `Appointments` tab, and confirm the email status is `NOT_CONFIGURED`. Do not use real patient data or notify a provider for this test.
- A successful direct Google Sheets connector write is not an end-to-end website test.

## Not yet built or verified

- Provider credential review/claiming workflow and wider source-backed provider coverage.
- Appointment availability, slot reservation, provider confirmation and hospital-facing dashboard.
- Staff identity, tenant administration and role-based access rollout.
- Clinic/hospital management software and business intelligence dashboards.
- Provider notification, verified appointment inboxes, fees and billing.
- Full mobile interaction/overflow review and actual Search Console query analysis.

## Change controls

- No production database migration, authentication, SSO or security-setting changes were made.
- No production deployment is considered complete until its Vercel and live-page evidence is recorded below.
- No provider has been emailed and no appointment is represented as booked.

## Release record

| Date | Commit / deployment | Result |
|---|---|---|
| 3 Nov 2026 | `986c33e` · Vercel `dpl_G9mavqzeH2DQF8K8CQgGWLuh8Avk` | READY; fresh live page checks passed. Enquiry intake remains closed pending the private Workspace connection. |
| 3 Nov 2026 | `2fd963a` · Vercel `dpl_BNaQFGFrwhjQafiVGUHzPNisFTfF` | READY; interactive homepage search verified live: “joint pain” opens the guide and returns Orthopaedics. The search submits no contact details. |
| 3 Nov 2026 | `146daf6` · Vercel `dpl_Gr2zc4xe7mMgSiFV2nTN2Fj36Hkx` | READY; moved the search card into the homepage text flow so it appears in the first mobile viewport. |
| 3 Nov 2026 | `784bc0a` · Vercel `dpl_KTY264bS1iyqZtGrBtewUmXxdEh2` | READY on `main`; aliases `www.docvy.in` and `docvy.in`. Shortened the mobile search hint. Fresh GET checks for `/` and `/care-guide?q=joint%20pain` returned HTTP 200. |
| 3 Nov 2026 | `5555e86` · Vercel `dpl_Cs1HEPpkuToojJ2ZtJhYX1qAiRMU` | READY on `main`; added city selection to the patient guide. Live interaction verified joint-pain search → Noida filter → matching Orthopaedics directory result. |
