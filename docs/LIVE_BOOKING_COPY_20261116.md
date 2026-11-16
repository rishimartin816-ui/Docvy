# Live booking copy correction

The live booking backend had been released while older public labels remained. This follow-up corrects the public positioning without changing appointment confirmation requirements.

| Outdated statement/source | Correction |
| --- | --- |
| `components/RouteBreadcrumbs.tsx`: `/book` labelled “Demo booking” | “Book an appointment”; added the same label for `/appointments` |
| `app/contact/page.tsx`: metadata “Appointment booking is not live”, status “Not live”, body “provider dashboards and appointment booking are not live” | Live appointment booking/support metadata and copy; “Live” status; `/book` calls to action |
| `app/grievance/page.tsx`: “currently an informational website”, “appointment enquiries are paused” | Doctor discovery, appointment booking, visit follow-up and booking-reference support |
| `components/ReferenceHome.tsx`: homepage “coming soon” city strip | “Bookings are live · Book appointment now”; city pages still disclose missing local profiles truthfully |
| `app/book/page.tsx`, `components/BookingForm.tsx`, doctor profile buttons | “Bookings are live”, “Book an appointment now”, “Book appointment now”, “Book online consultation” |
| Shared business description, FAQ and how-it-works content | DOCVY-managed booking and tracking; DOCVY checks doctor availability before confirmation |
| Production `/clinic`, `/request/test`, `/crm/demo` | Redirect to `/book`, `/book`, `/founder`; fictional workspaces are never relabelled as real appointments |
| Production CRM demo fallback | Removed in code, even if the old flag is set; production `DOCVY_CRM_DEMO_ON_SITE=false` |

`/request` routes to the live booking form while the live booking backend is enabled, preserving provider/city/facility selection. `/appointments` uses the same live booking page. Clinic software/commercial-plan limitations remain truthful; this copy change does not enable clinic CRM accounts, instantaneous reservations or paid subscriptions.

Validation: TypeScript, ESLint, production build and existing booking API/schedule checks. A regression assertion verifies that the production CRM configuration cannot select the synthetic database even with the old demo flag enabled, while preview remains isolated. No schema changes, patient-data writes or notification sends are required for this copy release.

Deployed application commit `38ee585` to `dpl_AnPZ3R1VQp4xNyZD8qU7vWXvBLRL` and assigned `www.docvy.in` after the private health probe passed. Live checks passed for homepage, `/book`, `/appointments`, Contact, FAQs, how-it-works and grievance: HTTP 200, no obsolete demo-booking/not-live/paused claims. The regular `/book` URL was checked again after hostname propagation and shows live wording without the old breadcrumb. `/clinic`, `/request/test` and `/request` redirect HTTP 307 to `/book`; `/crm/demo` redirects HTTP 307 to `/founder`. Booking API returns HTTP 200/enabled; its current published selection contains seven providers/ten locations. Provider options were not changed by this copy release. Booking/tracking/founder pages remain noindex.

Google Search Console follow-up: inspect and request reindexing for `/`, `/contact`, `/faqs`, `/how-it-works`, `/grievance`, `/pricing` and updated public doctor/guide pages as needed. Verify live canonical metadata with URL Inspection first. Do not submit private/noindex booking, founder, tracking or redirected demo pages. No Search Console API access or reindexing submission is claimed.
