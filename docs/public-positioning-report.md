# Public positioning and search refresh report

Audit date: 2026-11-16. Feature branch: `fix/public-operational-positioning`.

## Scope and baseline

This scoped PR targets `preview/doctor-glass-claim` (`61d4b7922dc74d0477a74d286fc17ab9c6f00697`), which contains the discovery/enquiry architecture observed on the live site. Main is an older application; merging this copy change directly into main would bring unrelated infrastructure. Integrate with the current application branch through review. PR #9 is independent and was not modified.

Audited repository route files, components, content, metadata and documentation for development/coming-soon/paused/unavailable/demo claims. `public-route-audit.json` records all 106 live sitemap and explicit booking/workspace/status URLs: HTTP 200 for all, with canonical, robots, descriptions and matching copy excerpts. This is a live snapshot, not evidence every possible filter URL or private workspace works. Live code has drifted from the supplied branch: the live homepage mentions Hyderabad/Chennai coming soon, but those strings are absent from this source snapshot. Review that live-only expansion message against the actual deployed commit before release; no expansion dates or coverage were invented here.

## Exact statements and replacements

`public-positioning-copy.diff` contains exact old/new lines and source paths for every copy/metadata change.

| Source | Outdated/incomplete statement | Correction |
| --- | --- | --- |
| `lib/patient-topic-guides.ts` | “Real appointments are currently unavailable through DOCVY. Contact the clinic directly to check availability.” | Topic-specific PCOS, cataract and asthma descriptions; directory/enquiry eligibility and provider confirmation in diabetes/cataract answers. |
| `app/contact/page.tsx` | “Appointment booking is not live.” / appointment status “Not live” / broad “PAUSED” label | Participating-practice appointment enquiries and provider confirmation; connection-specific fallback remains truthful. |
| `app/pricing/page.tsx` | “dashboards, appointment management and online checkout are not live” | Distinguishes available discovery/enquiries from planned commercial packages and practice-specific workspace access. Planned-package labels remain. |
| `app/layout.tsx` | Business description mentions only patient guides | Shared discovery, patient-guide and participating-practice enquiry description in metadata, Open Graph, Twitter and Organization JSON-LD. |
| `app/faqs/page.tsx` | “DOCVY is a patient guide for people in India.” | Shared full business description; request/confirmation distinction retained. |
| `app/how-it-works/page.tsx` | Fixed Delhi NCR coverage and all-profile verification disclaimer; “ENQUIRY FORM PAUSED” | Current published coverage, profile-specific status and conditional request availability. |
| `lib/content.ts` | Fixed NCR city claims; dashboards “not open for use yet” | Publication-based coverage and practice-specific workspace access; demos remain fictional. |
| `README.md` | “Appointment enquiry intake is being connected to the DOCVY APPOINTMENT LEADS Google Sheet.” | Current directory RPC/clinic routing/legacy Sheet architecture, with configuration versus delivery distinction. |
| `app/for-doctors/page.tsx` | Title contains its own brand suffix while inheriting the title template | Removed duplicate brand suffix. |

Shared description: “DOCVY helps people in India discover doctors by specialty, hospital or city, explore patient guides and send appointment enquiries to participating practices. Providers confirm availability, timing and fees.” Used consistently in the homepage, About, main FAQ answer, footer, inherited metadata and Organization/WebSite schema. Individual guide metadata remains topic-specific.

## Verified capabilities and limits

Live discovery and request pages return 200; the directory exposes real public practice locations and eligibility-based request buttons. Source inspection shows consent/profile checks, selected-location validation and signed directory enquiry persistence. A single empty JSON request to the live enquiry endpoint returned 403, “This doctor has not enabled appointment requests.” That rejected input cannot reach the write branch. No valid form, patient details or synthetic lead was submitted; end-to-end successful persistence/provider receipt is **not** claimed tested.

A saved enquiry reference acknowledges a request, not a booked slot or provider acceptance. Retained confirmation, fees, no-payment and health-information limits. CRM access is configuration/practice-specific. `/book`, `/clinic` and test routes retain fictional/demo labels; `/for-clinics` retains conditional demo/live messaging. Unavailable/error/accessibility strings are retained when they accurately describe a local failure or missing portrait. No demo was relabeled as a live service.

Historical development notes were retained with a clear archive banner. They are engineering history, not a current patient-facing service declaration. No public route was added for internal notes. Developer setup instructions are distinguished from current capability statements.

## Technical SEO

Canonical origin remains `https://www.docvy.in`; existing page canonicals and preview protections are preserved. Organization and WebSite now describe the same business, with linked organization IDs and the existing functioning search URL. No unsupported booking Offer/ReserveAction was added. Shared social images and per-page descriptions remain intact. Booking, demo, workspace, request and status noindex boundaries remain intact. Robots still advertises `/sitemap.xml`.

Reviewed the existing flat metadata sitemap without introducing the separate PR #9 implementation. Removed its constant `2026-11-09` lastmod, which was not an authoritative per-page modification date. Existing page eligibility rules and canonical URL generation remain unchanged. Existing sitemap eligibility is not a certification of every possible dynamic page: the live route audit records robots directives for review.

## Validation

- Production build: passed (405 generated pages; existing Open Graph edge-runtime notice).
- TypeScript: passed.
- ESLint: no errors; one pre-existing `CareGuideSearch.tsx` hook-dependency warning. Fixed baseline unused import and CommonJS test-file lint errors so checks can run.
- Existing domain/CRM isolation test: passed.
- `scripts/test-public-positioning.mjs` against the local production server: passed for changed public routes, canonical/Open Graph output, duplicate-title prevention, Organization/WebSite JSON-LD, robots discovery, and request/demo/workspace sitemap/noindex boundaries.
- Diff whitespace checks: passed.
- Live URL audit: 106/106 returned 200. No authenticated/private workspace, booking confirmation, Search Console API or AI answer-refresh verification claimed.

## Reindexing checklist — after approved deployment only

1. Review and merge into the intended current application branch; deploy only after approval. Validate the final production commit, canonical pages, XML, robots, JSON-LD, Open Graph and noindex/demo boundaries again. These changes are not live yet.
2. `reindex-public-positioning.csv` lists dated audit-derived indexable canonical candidates, with high priority for changed pages and normal priority for shared-footer/schema updates. Recheck indexability before submitting; coverage may change. Keep requested date, crawl date and outcome blank until observed.
3. In the verified www URL-prefix or domain Search Console property, inspect homepage, About, FAQs, Contact, How it works, For doctors, Pricing and changed guides. Use Test live URL, verify Google-selected canonical/indexability, then Request indexing.
4. Submit the deployed root sitemap for the wider affected set. Do not request indexing of `/request`, demos, authenticated workspaces, thin noindex city pages or internal engineering documents. Do not remove truthful noindex protections just to get fresh snippets.
5. Record requests and follow actual last-crawl/snippet changes. Repeated submissions do not speed crawling. Recrawling/indexing and snippet selection are not guaranteed or immediate: [Google recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
6. Check branded queries in Google and sampled Gemini/AI answers after fresh crawling; record date, query, cited source and exact outdated claim. A source-code update cannot force an AI answer or guarantee its refresh schedule. Correct cited third-party descriptions only where authorized; no automatic messages or submissions were sent.

No production deployment, merge, valid enquiry submission, database mutation or Search Console action performed.
