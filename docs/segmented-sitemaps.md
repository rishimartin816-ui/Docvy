# DOCVY segmented sitemap implementation and release review

Audit: 2026-11-16. Branch: `feat/segmented-xml-sitemaps`. PR: https://github.com/rishimartin816-ui/Docvy/pull/9

## Existing implementation

PR #9 replaced the metadata sitemap with an XML index and four child Route Handlers. It preserved robots discovery and canonical origin, but had no pagination or cross-segment duplicate checks and forced regeneration on every request. All entries were local route/content data, not database-driven.

## Implemented

Preserve existing sitemap URLs; split stable sorted entries at 10,000 URLs (`segment.xml`, `segment-2.xml`, etc.). Omit empty groups. Reject invalid paths and duplicate ownership across segments. Share the city registry with the actual page's static params and metadata; derive legal slugs and article slugs from their source content. Pre-render known sitemap children and revalidate hourly. Keep CDN cache at one hour. No database calls on sitemap requests: there is currently no matching database-backed profile route on this branch. No service-role credential or private data added.

Omit `lastmod` for current entries because the static content has no authoritative material-modification field. Do not use request time, deployment time, verification time, or source-check date as page modification time. When the profile implementation is integrated, use its actual content `updated_at` only if it represents changes to the rendered public page.

## Actual inventory

Root: https://www.docvy.in/sitemap.xml

| Child URL | URLs | Meaning |
| --- | ---: | --- |
| https://www.docvy.in/sitemaps/static.xml | 12 | Home, about, contact, for-doctors, FAQs, grievance, how-it-works, pricing, four legal pages |
| https://www.docvy.in/sitemaps/doctors.xml | 1 | Directory index `/doctors`; **not individual doctors** |
| https://www.docvy.in/sitemaps/cities.xml | 3 | `/doctors/delhi`, `/doctors/gurugram`, `/doctors/noida` |
| https://www.docvy.in/sitemaps/content.xml | 7 | Care guide plus six patient guides |
| Total | 23 | Unique canonical indexable URLs |

## Missing categories and database dependencies

| Requested category | Branch state / dependency |
| --- | --- |
| Verified individual doctors | No `/doctor/[slug]` route here. Existing implementation found on `preview/doctor-glass-claim`, outside PR #9. Needs an agreed integration dependency before emitting any URLs. |
| Hospitals | No public hospital profile route or published hospital catalog here. CRM facilities are not public profiles. |
| Clinics | No public clinic profile route here. Private `crm_clinics` rows do not establish indexable pages. |
| Surgeries/treatments | No canonical treatment route or published catalog. |
| Medical specialities | Directory filters only; no canonical speciality landing pages. |
| Cities | Only the three shared route slugs above. Other database cities do not create routes. |
| Localities | Query filters only; no canonical locality pages. |
| Doctor + speciality + city | Query filters only; no distinct canonical landing pages. |
| Doctor + locality | Query filters only; no distinct canonical landing pages. |
| Surgery + city | No route or published content. |
| Educational articles | Six static patient guides plus the care-guide index. |
| Static | Explicit existing route allowlist and legal content keys. |

Read-only production schema audit found `docvy_directory_providers`, the public `docvy_public_directory()` RPC, private CRM/intake data, and publication/consent/verification fields. Aggregate records: 1,270 disabled unpublished unclaimed providers, six enabled published verified providers, one enabled published claimed provider. These are database publication counts, **not sitemap or Search Console counts**. Public RPC applies `published` and `docvy_private.directory_visible(provider_id)`, which must remain the source of visibility when integrating the real profile pages. Do not read provider base tables with a service key for sitemap generation. The current RPC does not expose `updated_at`; changes would require a reviewed migration, not modifying production during this task.

The published verified providers' primary cities include Delhi, Indore, Jhunjhunu, Keri, Mumbai and Uttarpara. Only Delhi has a matching city route on this branch. Do not manufacture URLs from those database values. Current city page content comes from the checked-in source-linked directory, so its sitemap must continue to reflect that content, not an unrelated database catalog.

`/request` and `/status` are noindex; `/for-students` and `/for-employees` redirect. APIs, query filters, unknown cities/guides and external source pages are excluded. Metadata and working routes are preserved. `app/sitemap.ts` and `public/sitemap.xml` are absent, avoiding metadata/public route collisions.

## Validation

- `pnpm exec tsc --noEmit`: passed.
- `pnpm lint`: passed after correcting test-harness imports.
- `pnpm build`: passed; existing Open Graph edge-runtime static-generation notice only.
- `node scripts/test-sitemaps.mjs`: passed. Exercises 20,001-entry deterministic pagination, empty omission, invalid paths, cross-group duplicates, XML escaping, excluded routes and child 404s.
- `pnpm start --port 3219`, then `./scripts/validate-sitemaps.ps1`: passed for all 23 URLs. Validates official `sitemap.xsd` / `siteindex.xsd`, XML content type, 200 responses without redirects, matching canonical origin/path, noindex headers/meta, robots reference and unknown-child 404s.
- `git diff --check`: passed.
- Production read-only observation: `/sitemap.xml` still serves the old flat urlset; `/robots.txt` already references the correct root. These changes are not live.

Re-run local validation after content, canonical, route or publication policy changes. Validator uses PowerShell 7 and network access to official sitemaps.org XSDs. Static sitemap tests require only installed project dependencies. No Search Console connection was used and no actual metrics are claimed.

## Search Console submission and monitoring checklist

1. After approved integration/release, verify the `https://www.docvy.in/` URL-prefix property or the `docvy.in` domain property with owner access. Run the HTTP validator against the deployed origin. Confirm robots, self-canonicals, redirect behavior and removal of preview protection/noindex.
2. Submit `https://www.docvy.in/sitemap.xml`. Submit the four child URLs separately for per-child reporting. Submit future pages of a segment only when present in the index. Do not submit absent/empty segments.
3. Check processing status, last read, discovered-page count and parsing/fetch errors for each child. Record the current generated inventory separately from Google's discovered/submitted counts; they may lag or differ.
4. Weekly initially, then monthly when stable: use Page indexing's submitted-sitemap filter to capture indexed and not-indexed counts. Record crawled-currently-not-indexed, discovered-currently-not-indexed, duplicate/canonical exclusions and errors where Google exposes them. Example URL lists are limited and are not an exhaustive inventory. Use URL Inspection on representative exceptions.
5. Use `docs/search-console-monitoring.csv`. Leave unknown values blank. Calculate indexation percentage only for compatible, dated snapshots: indexed URLs / submitted URLs * 100; denominator zero or missing means N/A. Record export date, property, source report and report lag. Never label generated URLs as Google's submitted or indexed counts.
6. Track clicks and impressions from Performance exports for exact member URLs of each segment over matching periods. Prefix `/doctors/` alone cannot separate city pages from future speciality/location combinations. Join exported page URLs to the generated segment inventory or use anchored exact-URL filters. Keep country/device/search type consistent. Do not assume the sitemap report supplies performance metrics or every exclusion through an API.
7. Organic patient bookings require a working booking-confirmation event and consent-aware first-party attribution. Count confirmed bookings, not request submissions or outbound clicks. Record the organic landing page and join it to segment membership. Use aggregate counts without patient identifiers or health information. Until this is available, leave bookings blank / unavailable.
8. Investigate new sitemap errors immediately. Review unexpected URL-count drops, canonical exclusions, sustained discovery/crawl gaps and indexation changes against publication changes and release dates. Establish alert thresholds after a measured baseline; do not invent targets or metrics.

References: [Google Sitemaps report](https://support.google.com/webmasters/answer/7451001), [Next.js 14 Route Handlers](https://github.com/vercel/next.js/blob/v14.2.35/docs/02-app/01-building-your-application/01-routing/12-route-handlers.mdx), [Sitemap protocol](https://www.sitemaps.org/protocol.html).

## Release decision

The existing 23-URL sitemap system is reviewable. The requested database-connected doctor sitemap is **not complete or production-ready** until the established public-profile code and its visibility policy are integrated into this branch. Other absent categories remain intentionally omitted. Keep PR #9 draft for that decision. No production database mutations, production deployment, main update or merge occurred. A branch push may trigger an existing Vercel preview integration; it must not be promoted to production.
