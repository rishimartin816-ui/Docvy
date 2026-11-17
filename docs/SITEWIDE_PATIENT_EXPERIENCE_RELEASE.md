# Sitewide patient experience — 17 November 2026

## Production baseline released

The user approved production release of PR #14. Deployment dpl_CaLJo9AwTbP6f6BcHn6R4VxWtprV uses reviewed commit 35e62e61ee8e32f0cb9e1f47f1a8cddc34890358 and was assigned to www.docvy.in. The previous alias target was dpl_7n2AsA8xd78GUKy6MqJf4eqwHgVd. Live home, book, provider API, authenticated booking health and robots returned 200; the provider API exposed 11 practice options and backend health was healthy. Production outbox aggregate showed 4 sent / 2 skipped / no pending or failed jobs; the booking scheduler was active. These are operational job counts, not patient acquisition metrics.

## Sitewide changes

The repository has 45 page entry templates, including public pages, dynamic collections, private tools and intentional redirects. The shared public design system covers directories, facilities, specialties, surgery and health guides, About, Contact, FAQs, How it works, Pricing, provider onboarding, profile forms, Hindi introduction, policies, grievances and patient access. It preserves the separately designed homepage, individual doctor profiles and booking flow.

- Directory cards show approved qualifications, experience, languages, fees and real practice details. Activated verified providers link directly to the new booking route; other profiles keep a view-profile route. A single request-cached eligibility query avoids per-card database calls.
- Hospital and outpatient directories support practice/specialty and city filters, count actual matches and provide an empty state. Identical facility names in different cities no longer mix doctor associations.
- Patient access opens a saved private tracking link after local origin, path, reference and receipt validation. Keys stay in fragments. An arbitrary external URL or reference alone cannot reveal appointment details.
- Patient tracking gets consistent form, card and history styling. Its existing OTP, receipt and attendance authorisation remain intact.
- FAQs use native accessible accordions. Public navigation and footer provide appointment access. Guide and policy contents links point to actual headings.
- Provider pages and login no longer offer clinic CRM accounts for this release. Founder access and scoped doctor outcome workflows remain available through their existing protected routes.
- Privacy and terms product descriptions reflect the current Supabase/Resend booking and contact-verification workflow. No new statutory remedies or liability provisions were added. Existing payment, emergency and unfinished-software disclosures remain truthful.

## Validation

TypeScript, ESLint, production builds, booking API/email/patient-auth/presentation regression scripts and the new sitewide tests are required before release. New tests cover same-name facility isolation by city and private-link origin/path/fragment validation. Browser checks cover directory filtering, clinic filtering, private-link rejection, FAQ interaction, guide anchors, mobile layouts and header navigation. HTTP checks cover all static public page entry points and representative dynamic route families; generated URLs are not all manually reviewed one by one.

## Boundaries

This is a sitewide public experience release, not a rewrite of private founder or admin application workflows. Those workflows and their access controls are preserved and regression-tested. Main is not modified. No production schema migration or patient-data modification is required. No reviews, ratings, outcomes or slot availability are fabricated. The independent segmented sitemap PR #9 is not merged by this release. Production already has a working sitemap route; finishing PR #9 remains a distinct change.
