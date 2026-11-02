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
- Added a homepage city-coverage panel that links directly to Delhi, Gurugram and Noida pages and derives profile and facility counts from the provider data.
- Corrected a directory count label: 12 unique profiles map to 16 profile-city placements and 17 hospital-listed facility locations; multiple facilities in one city are no longer mislabelled as separate city listings.
- Replaced generic inherited social-preview descriptions that implied an enquiry flow with accurate India-wide guide and current NCR-directory wording.
- Added a branded 1200 × 630 Open Graph image and connected it to Open Graph and Twitter large-image metadata using the Next.js 14 metadata image route.
- Made the shared patient-journey step reflect the configured intake state: when closed, it says to contact the provider directly; when open, it explains that enquiries go to DOCVY and are not provider notifications or confirmed bookings.

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
- The current homepage city panel is intended to show 6 profiles for Delhi, 6 for Gurugram and 4 for Noida, with counts derived from the source list. These are directory data counts, not verified coverage completeness.
- Local production-server checks returned HTTP 200 for /, /doctors and /opengraph-image. The generated image returned image/png (115,628 bytes); homepage source contained both og:image and twitter:image, and the city cards linked to the current route set.
- The first local metadata pass found that route-level Open Graph objects override the shared image. Added one shared image definition to every page-level Open Graph override; a second local check of 10 representative pages and templates returned HTTP 200 with both og:image and twitter:image plus canonicals.
- Live verification of deployment `193ef6b` (`dpl_JDXQfyEPi3ofV96hafJhZcJ6yTzf`) returned HTTP 200 and confirmed the homepage city-coverage section, 6/6/4 source-linked profiles, 6/7/4 listed locations, canonical URL, Open Graph image, and Twitter `summary_large_image` metadata. `/robots.txt` and `/sitemap.xml` also returned HTTP 200; the sitemap contains 17 URLs.
- After the journey-step copy update, `pnpm lint` and `pnpm build` passed. The build type-checks the shared component uses on the homepage and `/how-it-works` and generated all 26 static pages. Live checks on deployment `764ba0c` confirmed both pages now clearly say the form is closed and direct visitors to the provider.

## Live intake state and safe test

- The current production project has no `GOOGLE_SHEETS_WEBHOOK_URL` or `GOOGLE_SHEETS_WEBHOOK_TOKEN` configured. The appointment form therefore remains closed and does not collect visitor data.
- The private target spreadsheet is accessible through Drive. Its `Appointments` header row has the 14 current core columns; no lead rows were read. The Apps Script endpoint must be saved, given a server-only token in Script Properties, deployed as a web app, and connected through server-only Production variables before a live lead test.
- The DOCVY Chrome profile has an Apps Script editor project open. Its initial editor view showed `Code.gs` nested under `function myFunction()`, which would not expose the required top-level `doPost` handler. A replacement with the reviewed repository source was attempted, but the UI state timed out during verification; whether that edit was saved is unknown. No endpoint was deployed and no token was created. The current Google Drive connector cannot inspect or deploy Apps Script projects.
- After that connection, submit one clearly labelled synthetic test lead, verify its reference and status in the private `Appointments` tab, and confirm the email status is `NOT_CONFIGURED`. Do not use real patient data or notify a provider for this test.
- A successful direct Google Sheets connector write is not an end-to-end website test.
- Next.js 14 documentation was checked for the opengraph-image.tsx convention and ImageResponse; the image uses the documented next/og import and edge runtime. The runtime is limited to the image route.

## 3 November design, search metadata and GEO pass

- A fresh production-source audit covered `/`, `/care-guide`, `/doctors` and `/pricing`. Each returned HTTP 200 and had a distinct title/description, canonical URL, `index, follow`, one H1 and the current Organization JSON-LD. `/pricing` also had its illustration's SVG title element; this is not an additional page H1.
- The audit found inherited Twitter text was overly generic and described enquiry behavior on pages where the request form is paused. The shared description was corrected to describe the nationwide guide, the current NCR-only directory and direct provider confirmation; the homepage now has a dedicated social description.
- Added direct homepage links to each currently listed city, with per-city profile and facility counts computed from the same provider data used by the directory. This makes geographic coverage discoverable while stating that the listings are limited and not a complete city directory.
- Reconciled listing metrics: 12 unique profiles; 16 profile-city placements; 17 hospital-listed facility locations. A profile at two facilities in the same city counts once toward profile-city coverage and twice toward facility locations.
- Reviewed current official Google Search guidance: Google states its AI Search features use the same foundational SEO practices and do not require special AI markup. Content clarity, original value and trustworthy sourcing remain the focus; no search ranking or traffic outcome is claimed. See [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) and [people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
- `pnpm lint` and `pnpm build` passed for the 3 November design and search update, including TypeScript validation and generation of all 26 static pages. The production verification for the subsequent city-directory update is recorded below.
- A synthetic appointment-lead test is still pending: the Apps Script is not yet confirmed saved/deployed, and production Vercel secrets are not present. Keep intake closed until a complete live submission has been verified in the private Sheet.

## 3 November city directory, answer support and source transparency

- Fixed specialty links on each city page so choosing a specialty keeps the current city filter instead of unexpectedly expanding to all Delhi NCR listings.
- Added a visible, keyboard-friendly breadcrumb on each city page and matching `BreadcrumbList` JSON-LD that follows the site's user path: Home → Doctor directory → City. This is structured context, not a promise of a rich search result.
- Added a direct link from every profile card to its cited public hospital profile. Links open the hospital's own source in a new tab and include accessible names; DOCVY still does not claim independent credential review or current appointment availability.
- Added concise, city-specific answers on directory completeness, appointment booking, credential review and pan-India guide coverage. The answers are visible on the page; no `FAQPage` rich-result markup was added.
- Updated city-page descriptions and Twitter cards with the correct profile count, city name and the limited-listing caveat.
- Changed the disabled-state doctor-card CTA to “Check enquiry form status”; the previous wording could imply that patients can track a submitted request.
- `pnpm lint`, `pnpm build` and `git diff --check` passed for the latest code. The production build generated all 26 static pages; the existing Open Graph edge-runtime warning remains limited to that image route.
- Live verification on `www.docvy.in`: Delhi, Gurugram and Noida city pages returned HTTP 200; canonical URLs and page-specific titles were present; breadcrumb JSON-LD and city-preserving specialty links were present; official hospital-source link counts were 6, 6 and 4, matching the page's unique source-linked profiles.
- A production API safety probe containing no person or health details returned HTTP 503 while Sheets intake is disconnected. This confirms fail-closed behavior only; no lead was accepted or written. The actual synthetic lead-to-Sheet test remains pending until the approved private endpoint is configured and connected.
- The Noida + Orthopaedics directory path was checked in a live browser after page hydration; it showed one matching profile (Dr. Atul Mishra), the correct Noida location, hospital source link, paused intake label and updated CTA.
- Current Google Search guidance recommends breadcrumbs that reflect the user path and does not guarantee rich results; FAQ rich results are limited to a subset of authoritative sites. DOCVY uses visible answer copy without promising FAQ enhancements. See [Google breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) and [Google's FAQ rich-result change](https://developers.google.com/search/blog/2023/08/howto-faq-changes).

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
| 3 Nov 2026 | `a3fbe4f` · Vercel `dpl_C3jSLwNaAQsZXHBavMYEpBdcDE89` | READY on `main`; tracker update deployed to `www.docvy.in` and `docvy.in`. |
| 3 Nov 2026 | `d6c8b27` · Vercel `dpl_6ykccyGv5BpzCekr7PX8S6hY4n7f` | READY on `main`; aliases `www.docvy.in` and `docvy.in`. Live Noida + Orthopaedics interaction showed one matching profile and the corrected “Check enquiry form status” CTA. |
| 3 Nov 2026 | `ac08c8f` · Vercel `dpl_29dHUAnUi3TsEndqJGghuwak3qgS` | READY on `main`; aliases `www.docvy.in` and `docvy.in`. Live city-page checks confirmed 200 responses, page-specific canonicals/titles, breadcrumb markup, city-retaining specialty links and 6/6/4 external source links. The production enquiry API correctly returned 503 while the private intake connection is absent; no lead was saved. |
| 3 Nov 2026 | `764ba0c` · Vercel `dpl_6Wp1uwrCwa6kXkgMUFEXacy49o6V` | READY on `main`; aliases `www.docvy.in` and `docvy.in`. Live homepage and `/how-it-works` reflect the closed intake and provider confirmation; `robots.txt`, sitemap, share image, city pages and canonical/social metadata checks passed. |
| 3 Nov 2026 | `193ef6b` · Vercel `dpl_JDXQfyEPi3ofV96hafJhZcJ6yTzf` | READY on `main`; aliases `www.docvy.in` and `docvy.in`; build completed successfully. Homepage city coverage and branded social metadata verified live. The appointment enquiry form remains closed until the private Sheets endpoint is configured and tested. |
| 3 Nov 2026 | fdb54f9 · Vercel dpl_54bZpuJTD5w6XThhrAsKN6b9rguq | ERROR before build: resource provisioning timed out. No aliases were assigned; the previous READY release remained live. |
| 3 Nov 2026 | `4c8d365` · Vercel `dpl_HwXkRo4psYPa9CMPC61HBgJfAS9Z`, `dpl_5A5pDqwYrwJFxCzgMLwtyyjqKqwk`, `dpl_xNWyPu9cSnuufhSKeV84mjQu56Kq` | All three production-target attempts failed before build with `Resource provisioning timed out`; the API retry using the Turbo build machine also timed out. None received the custom-domain aliases. The currently public site remains on READY commit `4498bad` (`dpl_8fHyCFx4nG5GboMzUJJQbXJenXtV`). |
| 3 Nov 2026 | `7bffe2b` · Vercel `dpl_2LKse2bg4MQiRtctcXvzmfhnxyKF` | Git-triggered retry with Vercel's one-deployment Turbo marker also failed before build with `Resource provisioning timed out`; no build events were available and no custom-domain aliases were assigned. Vercel's public status page showed no reported incident at the time checked. The prior READY release remains live. |
| 3 Nov 2026 | `986c33e` · Vercel `dpl_G9mavqzeH2DQF8K8CQgGWLuh8Avk` | READY; fresh live page checks passed. Enquiry intake remains closed pending the private Workspace connection. |
| 3 Nov 2026 | `2fd963a` · Vercel `dpl_BNaQFGFrwhjQafiVGUHzPNisFTfF` | READY; interactive homepage search verified live: “joint pain” opens the guide and returns Orthopaedics. The search submits no contact details. |
| 3 Nov 2026 | `146daf6` · Vercel `dpl_Gr2zc4xe7mMgSiFV2nTN2Fj36Hkx` | READY; moved the search card into the homepage text flow so it appears in the first mobile viewport. |
| 3 Nov 2026 | `784bc0a` · Vercel `dpl_KTY264bS1iyqZtGrBtewUmXxdEh2` | READY on `main`; aliases `www.docvy.in` and `docvy.in`. Shortened the mobile search hint. Fresh GET checks for `/` and `/care-guide?q=joint%20pain` returned HTTP 200. |
| 3 Nov 2026 | `5555e86` · Vercel `dpl_Cs1HEPpkuToojJ2ZtJhYX1qAiRMU` | READY on `main`; added city selection to the patient guide. Live interaction verified joint-pain search → Noida filter → matching Orthopaedics directory result. |
