# DOCVY website design and discovery status

**Updated:** 3 November 2026 (Asia/Kolkata)  
**Scope:** Public website design, patient-facing explanations, and on-page SEO/AEO/GEO. This is not a completion score for the full DOCVY product.

## Estimated completion

**88% estimated completion.** The estimate is based on the weighted website deliverables below, not traffic, patient activity, or search rankings.

| Deliverable | Weight | Status | Evidence / remaining work |
|---|---:|---|---|
| Accurate product and availability messaging | 20% | Complete | Pan-India patient guide; directory accurately limited to Delhi NCR; booking and review status stated. |
| Patient discovery journey and working guide search | 20% | Complete | Patient journey, concern-to-specialty examples, guide search, directory links, and empty-match explanations are implemented. This pass makes homepage examples open a prefilled guide search. |
| Visual system, icons, and illustrations | 20% | In progress (65%) | Mint/teal/pine system and patient illustration are in production; this pass adds a provider workflow illustration. A DOCVY Figma source file was not located, and mobile visual review is still needed. |
| SEO/AEO/GEO page clarity | 20% | In progress (75%) | Route titles, descriptions, internal links, sitemap, direct answers, natural-language concern searches, and city names are maintained. Search Console query validation remains open. |
| Build, production publication, and live verification | 20% | In progress | Existing production commit `a5901cb` is READY. The new internal enquiry flow builds locally, but is not published and cannot accept submissions until the private sheet endpoint is configured. |

## Changes in this pass

- Corrected homepage title and description so the homepage describes healthcare discovery across India rather than only a patient guide.
- Added real guide-search links for the homepage’s common concern examples. Browser review caught an overly broad “joint pain” match; search now requires all meaningful terms, ignores common question words and generic “doctor/specialist” words, and tolerates punctuation.
- Added a direct explanation of what is available today: nationwide guide, limited Delhi NCR listings, and no DOCVY booking.
- Added a custom provider-workflow SVG to the clinic and hospital plans page; it is visibly labeled “planned · not live.”
- Added “Gurgaon” as a search-oriented alias in Gurugram page metadata.
- Updated care-guide titles to use plain-language search intent without implying diagnosis.
- Audited supporting-page title tags against Next.js 14 title-template behavior and removed repeated brand suffixes; shortened city title tags without dropping city names.
- Rewrote the paused request and appointment-status pages with direct patient instructions and links to source-listed doctor profiles; removed internal staff-access wording.
- Reviewed current Google Search Central guidance. No special AI-search markup or ranking outcome is claimed.
- Production builds passed with Next.js 14.2.35, linting, type validation, and all 26 static pages generated.
- Latest live deployment before the current pass is commit `a5901cb` (Vercel READY). Browser review confirmed `/care-guide?q=joint%20pain` shows one specialty match (Orthopaedics) and the question “what doctor should I see for diabetes?” returns one related specialty and explains that no matching DOCVY profile is listed.
- Current live deployment: commit `77a9d66` is Vercel READY. Live checks confirmed doctor cards route to `/request` inside DOCVY, and the selected doctor pre-fills correctly. The form stays disabled because the sheet endpoint is not configured.
- Live metadata checks after commit `80e4b5d` returned HTTP 200 and one DOCVY brand suffix for About, How it works, For doctors, FAQs, Contact, and Gurugram pages.
- Firecrawl live page checks returned HTTP 200 for `/`, `/care-guide?q=joint%20pain`, `/pricing`, and `/doctors/gurugram`; rendered titles and visible page updates were present.

## Outstanding work

1. Review mobile layout and keyboard interaction for homepage quick starts, care-guide search, and provider plans.
2. Locate the intended DOCVY Figma design file. The connected Figma account is available, but the repository and current project artifacts did not contain a DOCVY file/node URL; no Figma file was changed.
3. Use actual Search Console queries when access is available to prioritize future content. Do not infer keyword volume or rankings.
4. Add condition-specific guidance only after source review and qualified clinical review; avoid thin SEO pages or one-symptom/one-specialty claims.

## Guardrails

- No production database, authentication, SSO, or security-setting changes.
- No claims that listings are verified, complete, bookable, or available unless current evidence supports them.
- No fabricated rankings, traffic, search volume, analytics, or doctor credential checks.

## 3 November 2026 — appointment enquiry implementation

**Appointment workflow estimate: 60% complete.** This is a roadmap estimate, not analytics. The form, server validation, sheet handoff and provider-email code are prepared; verified provider contacts, Workspace authorization, Vercel connection and live end-to-end verification remain outstanding.

- Added a DOCVY-hosted appointment enquiry form with selected doctor, facility, city, contact details, and optional requested date/time. It collects no symptoms, diagnosis, records, or payment data.
- Doctor cards now stay inside DOCVY and open the internal enquiry route. A request is described as an enquiry; provider confirmation is required before an appointment exists.
- Added a server-only Next.js route with same-origin checking, request-size limits, field validation against the local provider directory, honeypot handling, a 12-second upstream timeout, and a token-protected Apps Script handoff. Network fingerprints are HMAC-hashed and used only for short-lived throttling; raw IP addresses are not written to the sheet.
- Updated the privacy and terms copy to describe the planned sheet handling, user consent, provider sharing, and direct provider payment. DOCVY does not collect patient payment.
- Updated the private `Appointments` tab to 14 columns, including facility and consent records. Wrote and verified one clearly marked synthetic test row using the connected Google Sheets tool. This verifies direct sheet write/read access only; it does **not** verify the website-to-sheet path.
- `pnpm build` passed with Next.js 14.2.35 and 26 static pages. `pnpm lint` could not run because the repository's ESLint 8.57.1 install does not export `eslint/config`, which its flat-config file imports. No lint code output was produced.
- Commit `77a9d66` is published and Vercel READY. The live doctor page no longer sends visitors to hospital websites from its doctor cards. The live enquiry page clearly states that intake is disabled until the private sheet connection is finished.

### Required before enabling real enquiries

1. The production Vercel project has no `GOOGLE_SHEETS_WEBHOOK_URL` or `GOOGLE_SHEETS_WEBHOOK_TOKEN`; the form therefore remains disabled.
2. A Google Apps Script endpoint must be deployed with a private 32-character token in Script Properties, then the matching URL and token must be added as server-only Vercel variables. The authenticated DOCVY Chrome profile (`contact@docvy.in`) is available, but no deployed endpoint is confirmed and both production variables remain unset.
3. Provider email logic is now prepared in `GOOGLE_SHEETS_SETUP.md`. It sends only to a single provider contact that DOCVY has verified and enabled in a private `Provider Contacts` tab, after patient sharing consent. It logs `SENT`, `FAILED` or `NOT_CONFIGURED` and never calls an enquiry a confirmed booking.
4. The provider email includes a link to discuss a DOCVY provider plan, but no provider fee is charged or demanded without a separate plan accepted by that organisation. Provider plan pricing and billing are not configured.
5. To activate notifications, install the updated Apps Script, authorize its mail scope, register only organisation-confirmed appointment contacts, deploy the web app, and add its URL/token as Sensitive production Vercel variables. The Vercel production project currently has neither webhook variable.
6. After connection, submit a synthetic request to a DOCVY-controlled test mailbox and verify the email, sheet status and reference ID. No real patient lead has been sent to a provider.

## 3 November 2026 — provider email notification preparation

- Added `providerId` to the server-to-server lead payload and return of a provider notification status to the form.
- Updated the patient success message: it distinguishes a verified provider email being sent from a saved request where no verified recipient exists.
- Reworked the Workspace setup guide with an opt-in provider contact registry, provider-specific email content, send authorization, duplicate reference protection, daily quota check, notification status tracking and a synthetic delivery procedure.
- Provider email states that the request is not confirmed, asks the provider to confirm availability and fee, and directs provider plan enquiries to DOCVY. It does not send an invoice or claim the provider owes a fee.
- This implementation is local only. The Workspace Apps Script has not been updated/deployed, no provider email contacts are verified, no provider has been emailed, and the production form remains disabled until the two Vercel variables are added.
- `pnpm build` passed with the notification-status response changes; all 26 pages generated. The embedded Apps Script code passed a JavaScript syntax parse. No live script execution or email delivery was claimed.

## 3 November 2026 — live page metadata and FAQ clarity review

- A fresh HTML fetch (`maxAge: 0`) returned HTTP 200 for `/`, `/care-guide`, `/doctors`, `/pricing`, and `/for-doctors`. Each inspected page has a page-specific title and description, a canonical URL, `index, follow`, one H1, and the site-wide Organization JSON-LD block.
- `/robots.txt` and `/sitemap.xml` both returned HTTP 200. Robots allows public pages, disallows `/api/`, and references the sitemap. The sitemap lists the current public routes, including the Delhi, Gurugram and Noida directories.
- This checks delivered HTML only. It does not prove Google indexed the pages, chose the declared canonical, or ranks them. Search Console previously showed data processing; no query or ranking numbers are available.
- Added direct FAQ answers about whether DOCVY emails a provider after an appointment request. They state that the form is currently disabled and describe the future verified-contact and consent requirements without implying a live booking.
