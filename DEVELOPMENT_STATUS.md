# DOCVY website and product status

**Updated:** 3 November 2026 (Asia/Kolkata)  
**Scope:** Public website, discovery directory, patient enquiry intake, SEO/AEO/GEO, and broader product readiness.

## Completion estimates

These are roadmap estimates based on deliverables, not analytics, traffic, patient activity, or search rankings.

- **Public website and search foundation: 95%.** Main pages, clear patient journey, pan-India guide, NCR-only listings, source-linked profiles, page-specific search and sharing metadata, schema, sitemap, internal discovery links and crawlable patient answer pages are implemented. More mobile interaction review, Search Console query review and broader provider coverage remain.
- **Website enquiry path: 55%.** Form, server validation, private Sheets handoff and token-protected Apps Script source exist. The script is not installed or deployed and Vercel production variables are not configured; the live form must remain closed until end-to-end verification.
- **Full DOCVY product: 22%.** This reflects a weighted roadmap across public discovery, provider data, enquiry handling, provider operations, hospital software, identity/access and business intelligence. The provider/hospital application, appointment availability engine and operational dashboards are not complete.

## Implemented in this release

- Rewrote page and form availability copy to distinguish the India-wide guide from the current Delhi, Gurugram and Noida directory.
- Replaced the homepage's decorative search card with a labeled GET search form to the patient guide; it submits a search term only and does not ask for contact details.
- Added a city selector to the patient guide. Choosing Delhi, Gurugram or Noida narrows related profile counts and carries the selected city plus specialty query into the existing doctor-directory filters; a city with no related specialty profiles still links to all of that city's listings.
- Removed a repeated availability strip from the homepage, added a direct FAQ link in the footer, and corrected About copy that suggested the directory was still unopened.
- Kept doctor cards inside DOCVY and made the request state truthful: when intake is disconnected, the page removes all contact fields and links to the selected hospital's official profile; when connected, it saves only to DOCVY's private intake and does not notify a provider.
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
- Figma account inspection found view-only seats and a recent “DOCVY — Future Healthcare Experience” file in the connected Figma app. The app did not expose a file key or node URL for design-context retrieval. The current repository `DESIGN.md` palette and components remain the verified implementation reference; no Figma file was edited or seat changed.
- `git diff --check` passed; Git reported line-ending normalization warnings only.
- Before this release, live public-page checks confirmed HTTP 200 and page-specific titles, descriptions, canonical URLs, one H1 and Organization structured data on sampled routes. `/request` is intentionally noindex; `/robots.txt` and `/sitemap.xml` were available.
- A fresh Firecrawl scrape of `/`, `/care-guide`, `/doctors`, `/pricing` and `/request` found disabled contact fields still visible on the paused request page. After the fix, a local production-server smoke check returned HTTP 200, confirmed the request page contains no name/mobile fields, shows the selected hospital profile and closed-state label, and retains `noindex, nofollow`. A no-data local API probe returned HTTP 503 because intake is unconfigured; no test lead was created.
- `pnpm lint` and `pnpm build` passed after the request-page change; Next.js generated all 32 static pages. The edge-runtime notice for `/opengraph-image` remains an expected framework warning.
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
- The DOCVY Chrome profile opens an Apps Script editor titled `Untitled project`; its visible file list contains `Code.gs` and the function picker shows `myFunction`. This is not evidence of a deployed `doPost` endpoint. Attempts to capture the editor state timed out, so no code was replaced, no endpoint was deployed and no token was created. The available Google Drive connector has no Apps Script project-edit or deployment action.
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

## 3 November patient answer pages and crawlable search content

- Added six statically rendered patient guides for high blood pressure, diabetes, PCOS/PCOD, joint pain/arthritis, cataract and asthma. Each starts with a direct answer, names broad related specialties, shows current NCR directory matches by city, explains that the content is not a diagnosis, and links to primary or reputable source material.
- Added an internally linked set of common patient questions to `/care-guide`, included all six canonical URLs in the sitemap, and added visible `BreadcrumbList` structured data to each guide. No `FAQPage` schema or search ranking claim was added.
- Added AIIMS Delhi and Healthdirect references to the eye-specialty result for cataract searches.
- Corrected `/request` social metadata so its title and Open Graph URL describe that noindex route; when intake is disconnected, metadata now says enquiries are paused instead of implying that the form is available.
- `pnpm lint` and `pnpm build` passed; Next.js prerendered 32 static pages, including all six patient-guide routes. The existing `/opengraph-image` edge-runtime warning remains limited to that image route. `git diff --check` passed.
- Verified query behavior on production before this change: high blood pressure surfaced General Physician and Cardiology with source links; PCOS surfaced Endocrinology and Gynaecology; arthritis surfaced Orthopaedics and Rheumatology; cataract surfaced Ophthalmology. Those query results were live on release `94c512a`.
- Search/source review used official AIIMS Delhi and VMMC & Safdarjung Hospital pages plus Healthdirect clinical-information pages. The source notes disclose that Australian information explains general specialty roles and does not define Indian referral rules.
- Live verification after publish: all six patient-guide URLs returned HTTP 200 with page-specific titles/descriptions, canonicals, `index, follow`, exactly one H1, visible source links and `BreadcrumbList` data. `/sitemap.xml` returned HTTP 200 with 23 URLs and included all six guides.
- Live `/request` returned HTTP 200 with `noindex, nofollow`; its Open Graph URL now points to `/request` and the page metadata correctly says enquiries are paused. A no-person/no-health-data POST safety probe of `/api/appointment-request` returned HTTP 503, confirming the intake is still disconnected and no lead was accepted.
- The private Sheets connection and synthetic end-to-end lead check remain pending. Do not open intake until a complete synthetic submission is confirmed in the private Sheet.
- Production commit `9d5731a` is live in Vercel deployment `dpl_9b2G7YCM4dS2wNHWx4HhLhso7Z9N` (`READY`) with aliases `www.docvy.in` and `docvy.in`.

## 3 November hyperlocal directory refinement

- Added a visible area/locality filter beside doctor and specialty search. Options come only from locality labels already present in the hospital-source-linked provider records; no new doctor, facility or geographic claim was added.
- Changed city-page area links to preselect that city and exact locality in the directory. Selecting a different city clears the old locality to avoid empty or misleading results.
- Clarified that current listings are Delhi NCR only and area labels may be incomplete. Pan-India product scope remains distinct from current provider coverage.
- `pnpm lint`, `pnpm build` (32 static pages), and `git diff --check` passed. Local GET checks for `/doctors` and `/doctors/delhi` returned HTTP 200. Production deployment `dpl_FJwJ85KVvgxFhNf1apFQAmfQpVn8` is `READY` for `2fced91`; live `/doctors`, `/doctors/delhi` and `docvy.in/doctors` checks returned HTTP 200 with the filter. Both pages retain canonical URLs, one H1 and `index, follow`; the sitemap remains 23 URLs. Interactive visual review remains pending.

## 3 November homepage clarity and search update

- Replaced a repeated homepage availability summary with a patient-facing three-step checklist for checking the hospital source, exact facility, and appointment availability/fees. It states clearly that source-linked does not mean DOCVY-verified.
- Updated the homepage title and social descriptions for patient-guide and doctor-directory intent, retaining pan-India purpose and the explicitly limited Delhi NCR listings.
- Added homepage `WebSite` structured data linked to DOCVY's existing `Organization` entity, following Google's site-name guidance. No special GEO markup or ranking claim was added.
- `pnpm lint`, `pnpm build` (32 generated routes) and `git diff --check` passed. Production deployment `dpl_A4jQaqkBMcLPgY9NGFnsDcNUGF2H` for `bce4e7b` is `READY` on `www.docvy.in` and `docvy.in`.
- Live `/` verification confirmed the updated title and description, canonical URL, one H1, the new source-check section, and valid `Organization` + `WebSite` JSON-LD linked by entity ID. The new responsive section was visually reviewed at desktop and 390px; a 390px layout-width check found no horizontal overflow.
- A read-only Workspace check confirmed the `DOCVY APPOINTMENT LEADS` spreadsheet and its `Appointments` tab. Its existing header row has 14 expected columns; the Apps Script source adds the separately named provider-notification-status header. No lead rows or patient data were read.
- The user approved the private webhook-token setup and a synthetic end-to-end lead check. The Apps Script endpoint and Vercel webhook settings are not installed/configured, so the live enquiry form remains closed. No synthetic lead has been created.

## 3 November social metadata consistency

- Fixed a production-audit finding: several internal pages had correct search titles but inherited generic homepage copy for social previews. Added one shared metadata helper and applied page-specific Open Graph and X card titles/descriptions to the patient guide, directory, provider plans, FAQs, contact, about, onboarding, how-it-works, grievance, legal and patient-answer pages. Request and status routes remain noindex; city pages and homepage retain their existing specific metadata.
- This changes link-sharing previews and metadata, not page layout. It preserves the documented DOCVY color/illustration system and makes no search ranking or conversion claim.
- `pnpm lint` passed. `pnpm build` passed and generated 32 routes; Next.js emitted the existing non-blocking Edge runtime notice for `/opengraph-image`.
- Local production-server checks returned HTTP 200 for nine representative routes and confirmed that page titles, Open Graph titles and X card titles agree; patient guide and legal pages carry their own descriptions, and `/request` remains `noindex, nofollow`.
- Production commit `e7d59d8` is live in Vercel deployment `dpl_7qwNRSboP9q4yDwqrFM8MhyY6eWB` (`READY`) on `www.docvy.in` and `docvy.in`.
- Live checks returned HTTP 200 for 16 representative routes. On the 12 indexable sample routes, the HTML title, Open Graph title and X card title match; canonicals, one H1 and `index, follow` are present. `/request` and `/status` return 200 with `noindex, nofollow`; `/request` has no canonical. No ranking or analytics claim is made.
- Intake setup has explicit user approval, but is still not deployed. The Chrome window capture failed twice with `window capture timed out: timed out waiting on channel`, and a Google Drive search did not surface the Apps Script project. No webhook secret or Vercel webhook variables were created; the form remains closed and no synthetic lead was submitted.

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
| 3 Nov 2026 | `632f62d` · Vercel `dpl_CLq9SWAYzxYF44wqyQZo6peGkUGp` | READY on `main`; aliases `www.docvy.in` and `docvy.in`. Aligned city-growth wording across homepage, guide, directory, city, doctor/provider, About and how-it-works pages: product purpose is pan-India, current source-linked listings are Delhi NCR, and future coverage has no announced date. Lint/build passed (32 routes). Seven live affected routes returned 200 with one H1, correct canonical and `index, follow`; no old guaranteed-launch copy remains. |
| 3 Nov 2026 | `fff9352` · Vercel `dpl_21Mx6EtqwPU2fmNRJhhpHMczeRfF` | READY on `main`; aliases `www.docvy.in` and `docvy.in`. Reorganized FAQs by patient discovery, appointment safety and provider operations; clarified that the form is closed and added a government 112 source link. `pnpm lint` and `pnpm build` passed (32 routes). All 23 sitemap pages passed live status/title/H1/canonical/robots checks; `/faqs` contains all 13 answers, and `/request` plus `/status` remain noindex. Intake remains closed. |
| 3 Nov 2026 | `60b2c17` · Vercel `dpl_3S4UHQXm4cuu7ca9VfbcwBdX43KQ` | READY on `main`; aliases `www.docvy.in` and `docvy.in`. Clarified planned clinic/hospital plans, unpublished rates and unavailable dashboards/booking; added four visible provider questions and consistent Contact now links. `pnpm lint` and `pnpm build` passed (32 routes). Live `/pricing` returned 200 with one H1, canonical, `index, follow`, all four answers and contact links; no FAQPage schema or active rate/checkout claim. Intake remains closed. |
| 3 Nov 2026 | `e7d59d8` · Vercel `dpl_7qwNRSboP9q4yDwqrFM8MhyY6eWB` | READY on `main`; aliases `www.docvy.in` and `docvy.in`. Added page-specific Open Graph and X card metadata across indexable patient, doctor, provider, support, legal and answer pages. Lint/build passed (32 routes). Live checks returned HTTP 200 for 16 representative routes; the 12 indexable sample routes had matching title/social-card titles, canonicals, one H1 and `index, follow`. `/request` and `/status` remain noindex. Intake remains closed. |
| 3 Nov 2026 | `bce4e7b` · Vercel `dpl_A4jQaqkBMcLPgY9NGFnsDcNUGF2H` | READY on `main`; aliases `www.docvy.in` and `docvy.in`. Replaced repeated homepage status cards with an illustrated three-step source/facility/availability checklist; improved homepage search title and description; added linked `WebSite` schema. Lint/build and live metadata/schema checks passed; desktop and 390px visual review showed no horizontal overflow. Intake remains closed. |
| 3 Nov 2026 | `890febc` · Vercel `dpl_8EetN7FZQTD9KKn7JGiFDoB5wCjJ` | READY on `main`; aliases `www.docvy.in` and `docvy.in`. Updated the paused `/request` state to remove contact fields and show the selected doctor's official hospital profile. Live route returned 200 with no name/mobile fields and `noindex, nofollow`; a no-data API probe returned 503 and created no lead. |
| 3 Nov 2026 | `2fced91` · Vercel `dpl_FJwJ85KVvgxFhNf1apFQAmfQpVn8` | READY on `main`; live on `www.docvy.in` and `docvy.in`. Added the source-backed area/locality filter and exact city-page links; live HTML, canonical, robots and heading checks passed for `/doctors` and `/doctors/delhi`. |
| 3 Nov 2026 | `9d5731a` · Vercel `dpl_9b2G7YCM4dS2wNHWx4HhLhso7Z9N` | READY on `main`; aliases `www.docvy.in` and `docvy.in`. Published six crawlable, source-linked patient answer pages and the sitemap entries. All six live pages returned HTTP 200 with page-specific metadata, canonicals, one H1, `index, follow` and breadcrumb data. `/request` remains noindex and intake stays closed; the no-data production API probe returned 503. |
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

## 3 November navigation clarity release

- Grouped the shared navigation into clearly labeled patient and provider sections. Desktop uses a visual divider; mobile shows “For patients” and “For providers” headings.
- Added current-section styling and `aria-current="page"` to patient guides, doctor directory routes, provider pages and contact. The mobile menu remains connected to its toggle, exposes the expanded state and closes after navigation.
- Renamed the generic “Contact now” header action to “Contact DOCVY.”
- This is based on the repository's documented mint, teal and deep-green design system. The connected Figma file still has no available direct design URL/node for a design-context comparison; no Figma-origin claim is made.
- Local `pnpm lint` and `pnpm build` passed; the production build generated 32 routes. The existing Open Graph edge-runtime notice remains non-blocking. Local route checks returned HTTP 200 for `/doctors`, `/for-doctors`, `/pricing`, `/contact` and `/patient-guides/diabetes`; the active navigation link appeared on the expected routes. A mobile browser interaction opened the menu, navigated to clinic plans and closed the menu.
- Production commit `93ad606` is live as Vercel deployment `dpl_51puTUqN4DsEs2o3hQvDnBLygrHL` (`READY`) with `www.docvy.in` and `docvy.in` aliases.
- Fresh live checks on `/doctors`, `/for-doctors`, `/pricing`, `/contact`, `/patient-guides/diabetes` and `/request` returned HTTP 200. Indexable pages had one H1, page-specific canonical URLs, `index, follow` and the expected active-link markup. `/request` remains `noindex, nofollow` and has no patient contact fields.
- Live `/robots.txt` and `/sitemap.xml` returned HTTP 200; the sitemap contains 23 URLs and robots.txt references it and disallows `/api/`. No Search Console query or ranking outcome is claimed. This nav release adds no special AEO/GEO schema; the existing answer pages, source links, city caveats and structured data remain in place.
- The live appointment enquiry form remains closed. The Apps Script project is not open in the available Chrome window, which is the personal GoDaddy setup profile; the Workspace sign-in tabs visible in the in-app browser are signed out. No token was created, no form lead was submitted and no Sheet row was written. Keep the form closed until the Workspace Apps Script endpoint and Vercel variables are connected and a synthetic end-to-end lead is verified.
- Roadmap estimates remain unchanged: public website/search foundation 95%, website enquiry path 55%, full DOCVY product 22%. These are deliverable estimates, not traffic or analytics.

## 3 November clinic and hospital plan clarity

- Reframed `/pricing` around the questions a clinic or hospital needs answered: whether plans are available, what they cost, whether appointment management is live, and what to include in a business enquiry.
- The page now labels plans as planned, states that rates are unpublished and that dashboards, appointment management and checkout are not live, and uses a consistent “Contact now” action. The three cards describe future organisation types and workflows, not purchasable packages.
- Added visible, keyboard-operable answer disclosures and kept the page on the existing mint/teal/deep-green design system with the provider workflow illustration. No FAQPage markup was added: visible answers serve readers without suggesting an enhanced result.
- Updated the page and social descriptions to match current provider readiness. This is foundational SEO and direct-answer content; it does not promise indexing, rankings or AI citations.
- Followed Google Search guidance: [generative AI Search and your website](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), and [FAQ/How-to result changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes).
- The change is grounded in the repository's design system, not a Figma inspection. The connected Figma account still lacks a usable file/node URL in this session; no Figma file was edited.
- `pnpm lint`, `pnpm build` (32 routes) and `git diff --check` passed. Production commit `60b2c17` is READY as Vercel deployment `dpl_3S4UHQXm4cuu7ca9VfbcwBdX43KQ`, with aliases `www.docvy.in` and `docvy.in`. Live `/pricing` returned HTTP 200 with the expected title, single H1, canonical, `index, follow`, all four answers, no FAQ schema and eight contact links.
- A fresh production smoke check of all 23 sitemap URLs returned HTTP 200; all 23 had a title, exactly one H1, matching canonical URL and `index, follow`. `/request` and `/status` returned HTTP 200 with `noindex, nofollow` and no canonical.
- The patient enquiry form remains closed pending the private Google Sheet endpoint and a verified synthetic lead. No test lead was created by this release.

## 3 November patient and provider FAQ clarity

- Rebuilt `/faqs` around three visitor needs: finding care, appointment/payment/safety questions, and provider profiles/plans/tools. Added route cards for the patient guide, current directory and provider plans.
- The page now says at the top whether appointment intake is open. While closed, its appointment answers start with the current state and tell patients to use current source-linked listings to contact the provider directly; no patient contact fields are collected.
- Reduced future-city wording to a plan without a promised expansion date. The emergency answer links to India's official [Emergency Response Support System](https://112.gov.in/).
- Page metadata now describes the current pan-India guide and Delhi NCR doctor coverage. The 13 answers are visible in native disclosures; no FAQPage markup or rich-result claim was added.
- Context7's official Next.js 14.2.35 metadata documentation was checked. The page remains a server-rendered App Router page using the existing static metadata pattern. Google guidance and official 112 source notes are maintained in the design record.
- `pnpm lint`, `pnpm build` (32 routes) and `git diff --check` passed. Production commit `fff9352` is READY as Vercel deployment `dpl_21Mx6EtqwPU2fmNRJhhpHMczeRfF` on both custom domains. The live sitemap smoke check passed 23/23 pages; `/faqs` returned 200, one H1, a canonical and `index, follow`, with all 13 answers, the closed-form answer and official 112 link. `/request` and `/status` remain `noindex, nofollow`.
- The intake connection is not configured and no synthetic lead was submitted.

## 3 November pan-India scope and city coverage wording

- Replaced copy that said DOCVY “will add” or “will grow” into other cities with consistent wording: DOCVY is intended for discovery across India, current source-linked profiles are in Delhi, Gurugram and Noida, and additional city listings are planned when useful source-backed coverage is ready. No rollout date is announced.
- Applied the same distinction to the homepage, patient guide, directory, city page, doctor onboarding, About page, FAQ content and patient journey component. This supports accurate geographic discovery without suggesting current nationwide provider coverage.
- Local production-server checks passed on seven changed routes for HTTP 200, one H1, page-specific canonical, `index, follow` and absence of the old city-launch promises. The Next.js 14.2.35 build generated 32 routes; lint and type checks passed.
- Production commit `632f62d` is READY as Vercel deployment `dpl_CLq9SWAYzxYF44wqyQZo6peGkUGp` on `www.docvy.in` and `docvy.in`. The seven changed routes passed the same live checks after publication.
- After the tracker-only production deployment `aa24412`, a fresh full sitemap crawl passed 23/23 indexable URLs for HTTP 200, title, one H1, canonical and `index, follow`; `/request` and `/status` remain `noindex, nofollow` without canonicals.
- Wording changes are based on the source-linked provider dataset and current product status. They do not claim that more-city listings, appointment booking, or provider verification are live.

## 3 November doctor profile correction path

- `/for-doctors` now answers how a doctor can request a profile correction: send the official public hospital/clinic profile URL, doctor name and city, and the specific public detail. It states that no self-service claim portal is live, does not ask for patient details or identity/registration documents, and makes the DOCVY owner's approval explicit before publication.
- Added a responsive example status card showing that a public hospital profile may be linked while DOCVY credential review is pending and self-service claims are not open. The card is labeled as illustrative, not a live dashboard.
- Added internal links from the provider page to the current Delhi, Gurugram and Noida listings; updated its page title and description for accurate provider-search intent.
- Local checks passed: `pnpm lint`, `pnpm build` (32 routes), and `git diff --check`. The Next.js page remains a server-rendered route with the existing static metadata pattern; official Next.js 14.2.35 Metadata guidance was checked.
- This codebase-grounded design pass follows the existing DOCVY palette, typography and icon system. A direct Figma file/node URL remains unavailable; no Figma changes are claimed.
- Commit `f653214` is READY in Vercel production as deployment `dpl_8qh2SdCysbDxY7LnHkRvNa7FMhvW`, with aliases `www.docvy.in` and `docvy.in`. Live `/for-doctors` and all three linked city pages returned HTTP 200 with one H1, matching canonical URLs and `index, follow`; the provider correction answer and owner-approval text are present. These checks do not establish rankings or traffic.
- The private enquiry connection is still unconfigured, and no synthetic lead has been submitted.
- Progress estimates remain 95% public website/search foundation, 55% enquiry path and 22% full product; these are roadmap estimates, not analytics.

## 3 November profile correction email template — published

- Updated `/for-doctors` so its main action opens a prefilled email for a profile correction request. Fields: official public profile URL, doctor name, city and public detail to correct.
- Local generated HTML contains the correct current profile count, email destination/action and all four fields. This is a manual email path; it does not submit a lead to the Google Sheet or book an appointment.
- The latest provider-page lint/build passed locally before this copy-only follow-up; a compact generated-output check passed after it. `git diff --check` passed before documentation updates.
- Commit `5797d54` is READY in Vercel production as deployment `dpl_ENZwxwghcpLqhroV2DtXThFy5LHj`. Live `/for-doctors` returned HTTP 200 with the expected page title and one H1. After URL decoding, the live email link contains the official profile URL, doctor name, city and correction-detail fields; the page retains its no-patient-information notice.
- Enquiry intake remains closed; no test lead has been submitted. Do not describe this mailto link as a working Sheet connection.

## 3 November live SEO/AEO/GEO and patient-path verification

- The live sitemap-only map returned 23 URLs. Fresh Firecrawl raw-HTML checks sampled `/`, `/care-guide`, `/doctors`, `/doctors/gurugram`, `/for-doctors`, `/pricing`, `/faqs` and `/patient-guides/diabetes`. All eight returned HTTP 200, page-specific titles and descriptions, matching canonicals, `index, follow` and one H1. This sample does not claim a new full 23-page crawl.
- Sampled markup includes Organization JSON-LD; the homepage also includes WebSite, and the Gurugram and diabetes pages include BreadcrumbList. Visible content accurately distinguishes the India-wide patient guide from current NCR listings, and does not claim that DOCVY diagnoses or books appointments.
- A live browser journey check on `/care-guide?q=joint%20pain&city=Noida` selected Noida, returned Orthopaedics, and linked to a matching source-linked profile. The page showed current coverage and the closed-intake notice; no patient data was submitted.
- Official guidance checked: Google says standard SEO fundamentals and helpful, reliable, people-first content also apply to AI Search, with no extra AI-specific markup requirement: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features). Google may use a meta description when it better describes the page, but generates snippets primarily from page content: [Control your snippets in search results](https://developers.google.com/search/docs/appearance/snippet). No rankings, traffic, indexing, or AI citation outcomes are claimed.
- The Figma app shows the recent `DOCVY — Future Healthcare Experience` file. Opening the file prompted for a Dev Mode seat change; the seat was left unchanged. No file was edited and no Figma design context was retrieved. A direct share URL is still needed for a read-only implementation comparison.
- Latest production code commit `5797d54` is live as READY Vercel deployment `dpl_ENZwxwghcpLqhroV2DtXThFy5LHj`; the tracker commit `a500abb` is also READY as `dpl_B6KY3V7F9BrReJDihpXCNdf58ZBu`. The live provider page and decoded email template were verified. Enquiry intake is still closed and no synthetic end-to-end Sheet lead has been submitted.
