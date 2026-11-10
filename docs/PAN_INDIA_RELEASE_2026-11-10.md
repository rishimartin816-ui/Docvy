# National directory release — 10 November 2026

The publication registry contains 1,270 published profiles across 18 cities: 200 existing NCR records and 1,070 newly accepted records from the official Manipal Hospitals public doctor roster. All are unclaimed, with consent false, no provider portraits, no verification badge and appointment requests disabled.

## Collection and publication

- Source: https://www.manipalhospitals.com/doctors-list/ and its public paginated roster responses, inspected on 10 November 2026. Source URLs are retained per record; where a specific profile URL was not present, the official roster page is retained.
- 1,529 roster entries were inspected across alternate public roster pages. This is not a census of the hospital group or all Indian doctors.
- Records missing a sourced specialty, ambiguous city labels, duplicate existing names and exclusively non-medical professional categories were held back. Normalised name + city prevents duplicate records in the new batch. Same-name entries are not automatically merged across branches; the first sourced entry is retained and repeat entries require identity review.
- Only professional names, original specialty labels, city and branch affiliation were transcribed. No hospital photographs, biographies, patient reviews, fees, schedules or contact details were copied.
- The branch/location label supplied by the official roster identifies the facility. A full street address or map coordinate is not invented where absent. The current source batch has no doctor-only records without a facility.
- This is source validation, not manual medical-council verification or a claim of provider consent. Corrections and removal remain available through the existing private review flow.
- Registry inserts use conflict-do-nothing and do not change existing consent, verification, publication decisions or private records. No fictitious consent or registration information is seeded.

## Routes and search

- `/doctors`: all-India directory with specialty/symptom/hospital query, optional city and sourced-area filters, 20 results per page.
- `/doctors/[city]`: curated city content with source-backed profiles and neighbourhood links.
- `/doctors/[city]/[specialty]`: specialty in a known city; unknown slugs return 404.
- `/doctors/[city]/areas/[area]`: sourced neighbourhood profiles; unknown areas return 404. Fewer than three profiles means noindex/follow and a joining-soon state. The sitemap includes only city/area combinations with at least three published profiles.
- `/doctor/[slug]`: publication-registry profile. Existing consent gates apply in both UI and API.
- `/data/docvy-doctors.csv`: national publication export. The legacy NCR URL remains compatible.
- `/legal/terms`: expanded original Terms and Conditions. `/terms-and-conditions` permanently redirects here. Related policy links are available at the bottom.

Search accepts Gurugram, Bangalore, Mangalore and Mysore aliases while using Gurgaon, Bengaluru, Mangaluru and Mysuru in city paths. Original professional specialty labels are preserved; common specialty search aliases are normalised without merging adult and paediatric disciplines.

## Location privacy

The optional browser location control selects an approximately nearby **covered city**, using city centres locally on the device. It requests permission only on click. Coordinates are neither sent to DOCVY nor stored in URLs. It does not rank doctors by distance, show travel times or identify emergency facilities. Refusal and unavailable-location states retain manual selection. A 150 km coverage limit avoids suggesting a faraway city as nearby.

## Validation and operational limits

TypeScript validation and local mobile browser checks passed before release. Search must be checked against the live registry after deployment. The database retains RLS and limited purpose-specific RPCs; advisor notices for intentionally public directory RPCs and private tables without client policies were reviewed, not resolved by opening table access.

Terms cover directory scope, profile states, appointment requests, payments, consent, location, privacy, misuse, responsibility, consumer rights and grievances. They require Indian counsel review and cannot guarantee immunity from disputes. Existing operator and grievance-officer details were preserved. Provider email delivery remains pending service connection; no delivery claim was introduced.

## Post-release checks

- Homepage, national directory, city, area, specialty, real profile and legal routes respond successfully.
- Search city + area reduces results; all-results pagination preserves filters.
- Optional location succeeds with permission; denial has a usable manual fallback.
- Unknown area gives 404. Sub-threshold pages are noindex and absent from the sitemap.
- Public data exposes no third-party photos, private consent documents or sensitive review details.
- Direct appointment submission for an unclaimed profile is rejected.
- Production sitemap and canonical domain use `https://www.docvy.in`; preview remains noindex.
