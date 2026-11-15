# DOCVY segmented sitemap implementation and release review

Audit and validation: 2026-11-16. Branch: `feat/segmented-xml-sitemaps`. PR: https://github.com/rishimartin816-ui/Docvy/pull/9

## Existing implementation and final changes

PR #9 already replaced the metadata sitemap with an XML index and four children. It lacked pagination, cross-segment duplicate checks and database-backed individual profiles.

The final implementation preserves the existing four child URLs, adds `/sitemaps/doctor-profiles.xml`, sorts deterministically and splits at 10,000 URLs (`doctor-profiles-2.xml`, etc.). Empty segments are omitted; noncanonical paths, protocol loc lengths over 2,048 characters and duplicate ownership fail validation. City routes share a registry with their actual page; legal and article slugs derive from their content sources.

Ported the existing `/doctor/[slug]` URL format, public-directory access and verification policy from `preview/doctor-glass-claim` commit `61d4b7922dc74d0477a74d286fc17ab9c6f00697`. The profile uses the current branch's design and only the public fields it renders. The unrelated redesign, CRM, booking, claim and removal applications were not integrated. There are no links to those absent flows. Existing source-linked directory functionality remains available; published verified profiles are linked separately from `/doctors`. The verification FAQ now distinguishes these two collections.

## Actual generated inventory

Root: https://www.docvy.in/sitemap.xml

| Child URL | URLs at validation | Meaning |
| --- | ---: | --- |
| https://www.docvy.in/sitemaps/static.xml | 12 | Home, about, contact, for-doctors, FAQs, grievance, how-it-works, pricing, four legal pages |
| https://www.docvy.in/sitemaps/doctors.xml | 1 | Existing directory index `/doctors` |
| https://www.docvy.in/sitemaps/doctor-profiles.xml | 6 | Published verified public doctor profiles, connected to Supabase |
| https://www.docvy.in/sitemaps/cities.xml | 3 | `/doctors/delhi`, `/doctors/gurugram`, `/doctors/noida` |
| https://www.docvy.in/sitemaps/content.xml | 7 | Care guide plus six patient guides |
| Total | 29 | Unique canonical indexable URLs |

Counts are an observed generated inventory, not Google submitted/indexed counts. Profile counts can change with publication and consent decisions.

## Data access, visibility and caching

Only the existing `docvy_public_directory()` RPC is called with a publishable or legacy anon key. It already enforces `published` and `docvy_private.directory_visible(provider_id)` (including its existing removal-request rule). No table grants, RLS policies, functions, schema or production records were changed. No service-role keys, CRM rows, patient data or admin endpoints are used. Anonymous provider base-table access was tested and denied.

The loader validates the public response and projects only display fields. A duplicate normalized slug, malformed row, missing connection, timeout or unsuccessful response fails closed. The sitemap index and doctor child return 503 with no-store and Retry-After rather than a false empty success or a cached incomplete inventory. A genuine successful empty result omits the doctor segment; directly requesting that absent segment returns 404. Unknown static or malformed numbered child URLs return 404 without a database read.

Sitemap eligibility and profile metadata share `isVerified`: a public live record, consent, verified status, nonblank registration number/council and a valid verification timestamp are required. The observed public RPC returned seven records: six verified, one claimed. The claimed profile can be viewed but is noindex and excluded from the sitemap. Missing/nonpublic profiles return 404/noindex. Unpublished/removed profiles cannot be reconstructed from the checked-in catalogue. The RPC determines publication; its `live` field is not an assertion about appointment availability.

Profiles use uncached public reads with React request-scoped memoization, preserving fresh publication decisions. XML responses cache the index and doctor child at the CDN for 300 seconds, static children for 3,600 seconds, with must-revalidate and no stale-while-revalidate window. A removed URL can remain in cached XML for up to five minutes; the actual page checks fresh visibility. These explicit cache headers were verified on the production server. Static child requests never query Supabase. Next.js 14 cannot mix pre-rendered children with later no-store child requests in one handler, so this shared child handler is dynamic with explicit CDN caching.

The public RPC aggregates its visible records in one response. At today's seven-profile volume, reuse avoids duplicate infrastructure. When publication volume grows substantially, add a reviewed minimal keyset-paginated public sitemap RPC rather than using a service key or private base-table read. The URL chunker is already tested with 20,001 URLs.

## Configuration

Reuse existing integration variables: `SUPABASE_URL` (or `NEXT_PUBLIC_SUPABASE_URL`) and `SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, or `SUPABASE_ANON_KEY`. The supported project is `https://cxyscxjauxoizvvllmfu.supabase.co`. The existing profile-branch `DOCVY_DIRECTORY_INTAKE_URL/KEY` overrides remain supported. An explicit `DOCVY_DIRECTORY_INTAKE_ENABLED=false` disables public reads. Only anonymous/publishable keys are accepted; privileged key formats/roles are rejected before fetching.

The connected Vercel project's variable-name inspection confirms standard Supabase integration variables exist for preview and production. No values were printed and no Vercel variables were changed. Two isolated nonproduction previews of commit `6593120db8c7c37cc08f0e68733da54312346f6d` were attempted on the existing project (`dpl_zLgfjtyrnNeVYKWQuRbzGcYAC7hr` and `dpl_8Jmt8MHVJR5mrjGnQRxvD7p7pBES`). Both failed before compilation with `BUILD_FAILED: Resource provisioning failed`; the build-events endpoint returned no logs. Hosted preview validation is therefore blocked by provisioning, with the underlying account/platform cause unconfirmed. No production target, alias promotion or protection change was requested. An ignored local environment file with a publishable key was used for real read-only validation. No credentials are committed.

## Missing categories and dependencies

| Requested category | Final branch state |
| --- | --- |
| Verified individual doctors | Integrated existing profile route; six public records currently eligible. |
| Hospitals | No public hospital profile route or published hospital catalog on this branch. CRM facilities are not public profiles. |
| Clinics | No public clinic profile route on this branch. Private CRM rows do not establish indexable pages. |
| Surgeries/treatments | No canonical route or published catalog integrated here. Additional pages on the separate redesign branch require their own route/content integration. |
| Medical specialities | Existing directory filters only here; no canonical speciality landing pages integrated. |
| Cities | Three shared route slugs above. Other database cities do not automatically create routes. |
| Localities | Query filters only; no canonical locality pages here. |
| Doctor + speciality + city | Query filters only; no distinct canonical landing pages here. |
| Doctor + locality | Query filters only; no distinct canonical landing pages here. |
| Surgery + city | No route or published content here. |
| Educational articles | Six static patient guides plus the care-guide index. |
| Static | Existing route allowlist and legal content keys. |

Do not invent URLs or empty sitemaps for absent categories. `/request` and `/status` are noindex; `/for-students` and `/for-employees` redirect. APIs, query filters, unknown cities/guides and external source pages are excluded. `app/sitemap.ts` and `public/sitemap.xml` are absent, avoiding route collisions. Canonical origin remains `https://www.docvy.in`.

Omit `lastmod`: static content lacks an authoritative modification field and the existing public RPC does not expose material `updated_at`. Verification/source-check dates are not page modification dates. Exposing a suitable public modification field would require a separately reviewed migration; it is not required for a valid sitemap and was not applied to production.

## Validation — all passed

- `pnpm exec tsc --noEmit`.
- `pnpm lint`.
- `pnpm build`: profile route, directory, index and children compile without metadata conflicts. Existing Open Graph edge-runtime static-generation notice only.
- `node scripts/test-sitemaps.mjs`: 20,001-entry deterministic pagination, empty omission, invalid paths, duplicate ownership, XML escaping, excluded routes, child 404s, public-response projection, verification exclusions, duplicate slugs, malformed/outage/disabled-config 503s, rejected privileged keys and standard-environment fallback.
- `pnpm start --port 3222`, then `./scripts/validate-sitemaps.ps1 -BaseUrl http://localhost:3222`: official `sitemap.xsd` and `siteindex.xsd`, XML content types, all 29 page statuses without redirects, canonical consistency, indexability, robots discovery, duplicate prevention and unknown-child 404s.
- `node --env-file=.env.local scripts/validate-public-directory.mjs http://localhost:3222`: real anonymous public RPC, six verified profile sitemap entries and internal links, claimed-profile noindex exclusion, missing-profile 404 and denied anonymous base-table access.
- `git diff --check`.

PowerShell validator requires PowerShell 7 and access to official sitemaps.org XSDs. The read-only integration validator requires configured public environment variables. Synthetic regression records are isolated test inputs; they are never written to Supabase or presented as business metrics.

## Search Console submission and monitoring checklist

1. After the approved release, verify the `https://www.docvy.in/` URL-prefix property or `docvy.in` domain property with owner access. Validate deployed XML/status/canonicals, robots and indexing directives. Preserve preview protection; do not submit protected preview URLs.
2. Submit `https://www.docvy.in/sitemap.xml` and each of the five child URLs above separately. Submit future numbered children only when present in the index. Do not submit absent/empty categories.
3. Record per-child processing status, last read, discovered/submitted counts and parsing/fetch errors. Keep generated inventory separate from Google's counts, which can lag.
4. Weekly initially, then monthly when stable: use Page indexing's submitted-sitemap filter to record indexed and excluded counts, crawled-currently-not-indexed, discovered-currently-not-indexed and duplicate/canonical exclusions where exposed. Example lists are limited, not exhaustive. Inspect representative exceptions.
5. Fill `docs/search-console-monitoring.csv` with actual dated exports. Leave unknown values blank. Calculate indexed/submitted * 100 only for compatible snapshots; missing/zero denominator means N/A. Record property, export date, source report and reporting lag.
6. Record clicks/impressions from Performance exports for exact member URLs over matching periods. Join page URLs to sitemap membership; broad `/doctors/` prefixes cannot distinguish future segments. Keep country/device/search type consistent. Do not assume the sitemap API supplies every exclusion or performance metric.
7. Organic bookings require a working confirmed-booking event and consent-aware first-party attribution. Count confirmed bookings, not enquiry submissions/outbound clicks. Join organic landing pages to segment membership and report aggregates without patient identifiers or health information. Until connected, leave booking metrics unavailable.
8. Investigate fetch/schema errors immediately. Review unexpected count changes and sustained indexation gaps against publication decisions/releases. Establish thresholds from a measured baseline; no targets or metrics are fabricated.

No Search Console connection or actual Search Console metrics are claimed.

References: [Google Sitemaps report](https://support.google.com/webmasters/answer/7451001), [Next.js 14 Route Handlers](https://github.com/vercel/next.js/blob/v14.2.35/docs/02-app/01-building-your-application/01-routing/12-route-handlers.mdx), [Sitemap protocol](https://www.sitemaps.org/protocol.html).

## Release readiness

The available-route implementation is database-connected and validated against real published public records. It is ready for production code review, with missing categories intentionally omitted. No production Supabase mutations, production deployment, main update or merge occurred. Before release, resolve the Vercel resource-provisioning failure and validate a hosted preview of the exact final commit with the intended project/environment, then obtain approval to merge/deploy. Keep PR #9 draft until that hosted check passes; local production validation is complete. Production still serves the old flat sitemap. Search Console submission follows the approved production release.
