# DOCVY directory and homepage corrections — 11 November 2026

## Files and behavior

| File | Change |
| --- | --- |
| `lib/specialty-taxonomy.ts` | Canonical clinical specialty registry, source-label aliases and American search variants. Centres and services are not promoted into clinical specialties. |
| `lib/directory-normalization.ts` | Consistent doctor name casing, separate military service titles and rank-free public profile paths. Original database IDs remain unchanged. |
| `lib/provider-candidates.ts` | Optional normalized display fields on the provider type; no source snapshot records changed. |
| `lib/public-directory.ts` | Normalize and sort the current published RPC response; retain request-only memoization, no-store and fail-closed behavior. |
| `lib/directory.ts` | Use the shared taxonomy for specialty matching and include source aliases, services and symptom keywords in search. Remove the runtime snapshot import. |
| `lib/directory-filters.ts` | Parse optional filters, match city/hospital/neighbourhood within the same practice location and preserve filters when paginating. |
| `components/DirectoryFilters.tsx` | Search, specialty, hospital/clinic, city and neighbourhood controls, with Apply/Clear actions. |
| `components/LocationSearch.tsx` | Controlled city selection for dependent filters; clear explanation where sourced neighbourhood details are unavailable. Location permission remains optional and coordinates stay on the device. |
| `app/doctors/page.tsx` | Filtered results, 20-row pagination, page-specific canonical/title, query noindex and ItemList JSON-LD. |
| `components/DoctorCard.tsx` | One profile link per card; canonical specialties and separate centres/services; existing consent-gated appointment/claim actions. |
| `app/doctor/[slug]/page.tsx` | Resolve clean profile paths without changing consent/request IDs. Physician/Dentist JSON-LD only for consented, manually verified profiles. |
| `components/DirectoryPage.tsx` | Readable breadcrumb separators, canonical ItemList URLs and American search wording in relevant headings. |
| `app/doctors/[city]/[specialty]/page.tsx` | American search terms in specialty titles; preserve the three-profile indexing threshold. |
| `app/doctors/[city]/areas/[area]/page.tsx` | Canonical normalized profile URLs in ItemList. |
| `app/doctors/specialty/[specialty]/page.tsx` | American search terms, first 20 cards, full-filter link and ItemList. Existing noindex policy is retained. |
| `app/request/page.tsx` | Review-profile links use the clean public path; request record IDs remain unchanged. |
| `middleware.ts` | 301 American specialty aliases, military-rank profile aliases and canonical legacy city queries; noindex,follow HTTP header on public GET/HEAD requests carrying query parameters. |
| `components/Nav.tsx` | Explicit Search label on the mobile search link; keep the existing accessible modal/menu behavior. |
| `components/RouteBreadcrumbs.tsx` | Decorative chevron instead of a literal slash separator. |
| `components/Footer.tsx` | Pricing link in the single shared compact footer. |
| `components/ReferenceHome.tsx` | Direct concern-to-guide/specialty links, exact verified count in the verification FAQ, expanded guide/specialty navigation and honest coming-soon city links. |
| `lib/care-directory.ts` | Patient-first introductions for Oncology, Neurology and Endocrinology. |
| `components/SpecialtyIcon.tsx` | Icons for the three added curated specialties. |
| `app/specialties/page.tsx` | Link to every canonical directory specialty, separate from the curated introductory guides. |
| `app/specialties/[slug]/page.tsx` | Search synonyms in metadata/H1 and a clean specialty-directory link. |
| `components/CareGuideSearch.tsx` | Canonical specialty matching and stable city-list effect dependency. |
| `lib/metadata.ts` | Absolute en-IN, hi-IN and x-default homepage language alternates. |
| `app/page.tsx`, `app/hi/page.tsx` | Reciprocal language alternates and separate English/Hindi canonicals; Hindi names for added curated specialties. |
| `lib/national-cities.ts` | Distinct Mumbai, Hyderabad and Chennai page introductions, with no invented doctor availability. |
| `lib/additional-patient-guides.ts` | Substantive Piles, Thyroid, Hernia and Fatty liver guides plus a refreshed PCOS/PCOD guide, using NHS, WHO and NIH/NIDDK references. |
| `lib/patient-topic-guides.ts` | Register new content and optional section/source-check fields. |
| `app/patient-guides/[slug]/page.tsx` | Render topic sections, current source-check dates and canonical related-specialty links. Keep clinical review fields blank until reviewed. |
| `app/sitemap.ts` | Clean profile paths, new guide URLs, updated last-modified date and continued city/indexing exclusions. |

## Routes and indexing

- `/doctors`: all published profiles; specialty, hospital/clinic, city and neighbourhood filters are optional.
- `/doctors?page=2`: canonical includes `?page=2`; title identifies page 2. Query URLs, including empty query fields and pagination, are `noindex,follow` as requested.
- Filtered listing canonicals omit filter parameters and retain the effective page number where greater than one. Pagination links retain selected filters.
- `/doctors/[city]`, `/doctors/[city]/[specialty]`: indexable only with at least three current published profiles, subject to the production indexing environment gate.
- `/doctors/mumbai`, `/doctors/hyderabad`, `/doctors/chennai`: coming-soon empty states and noindex while each city has zero published profiles. They are not active city-selector options or sitemap entries.
- `/specialties/orthopedics`, `/doctors/specialty/pediatrician`, `/doctors/gurgaon/gynecologist` and corresponding registered aliases redirect 301 to the existing canonical specialty spelling.
- Old military-rank profile URLs redirect 301 to rank-free paths. Claims, removals, consent and appointments continue to reference original stable IDs.
- New guides: `/patient-guides/piles`, `/patient-guides/thyroid`, `/patient-guides/hernia`, `/patient-guides/fatty-liver`. The existing `/patient-guides/pcos-pcod` URL is retained and expanded.
- Production sitemap contains only canonical indexable routes. Preview/local sitemap is empty. Coming-soon cities, query URLs and fictional booking routes remain excluded.

## Verification performed before release

- TypeScript no-emit check and ESLint on all changed TypeScript/TSX files.
- Actual public directory audit: 1,270 records and 1,270 unique normalized profile paths. Twenty military-title variants normalized without changing record IDs.
- Browser tests for filter submission/reset, page 2 canonical/title/ItemList positions, query noindex headers, American aliases, rank redirects, normalized names, consent gating and absent unclaimed Physician schema.
- Homepage concern destinations, verification FAQ, guide links, coming-soon links and reciprocal language alternates checked in rendered output.
- All five requested guide topics return 200, have one H1, multiple substantive sections, primary source links, MedicalWebPage and FAQPage JSON-LD, and no invented reviewer.
- Coming-soon city pages return 200/noindex; unknown city returns 404. Sitemap rules checked separately for local and production.
- Responsive directory screenshots at 320, 390, 768 and 1440px: no horizontal overflow or client exceptions.
- Sidebar/footer regression: native modal, focus cycling, Escape, expanded submenu selection, route dismissal, resize cleanup, readable menu contrast and mobile footer accordions. Footer height: 661px at 320px, 597px at 390px, 574px at 768px and 1440px.

## Practical limits and follow-up

- Neighbourhood filtering uses sourced locality data only. It is available for practices with those details; hospital filtering remains available where locality is missing. No neighbourhoods were guessed from an address.
- Counts describe sourced published profiles and practices, not verified doctors or confirmed appointment slots. No new doctor partnership was inferred.
- The new patient content has source references; it is not presented as doctor-reviewed. A named qualified clinician should review it before review fields are filled.
- Lighthouse and Google's hosted Rich Results Test were not run in this change. JSON-LD was parsed and its page-specific content checked in browser tests; rich-result eligibility or search ranking is not promised.
- The existing apex-domain redirect was rechecked through Vercel configuration and a live request: `docvy.in/doctors?specialty=cardiology` returns 301 to the matching `www.docvy.in` URL, preserving path and query. American specialty/profile redirects also return 301.

## Release checklist

- [x] Local type, lint, directory browser checks and sidebar/footer regression.
- [x] Vercel production build ready for commit `67965f4140f2d14c0baf264c96c00af53ce938d1` (deployment `dpl_8csSmyZ7KbQVuVt16QVe44CCF72T`).
- [x] Live alias assigned to `www.docvy.in`; existing alternative hosts point to the production domain.
- [x] Repeated directory/SEO and sidebar/footer checks against `https://www.docvy.in`: all passed, with no client exceptions. Server-rendered HTML also contains canonical specialty content and ItemList, with no bare `/doctors` anchor label.
- [ ] Optional: run mobile Lighthouse and Google Rich Results Test on the live directory and guides.
