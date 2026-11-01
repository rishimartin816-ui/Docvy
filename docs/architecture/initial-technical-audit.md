# DOCVY Platform Foundation — Initial Technical Audit

**Audit date:** 2026-11-01  
**Repository:** `rishimartin816-ui/Docvy`  
**Branch:** `feat/docvy-platform-foundation`  
**Baseline commit:** `faaa6c240907765e71c684b89f1af4c063225b83`

## Executive assessment

The current repository is a Next.js 14 medical-documentation request website. It is not yet the healthcare discovery and provider-operations ecosystem described in the DOCVY product master specification. Preserve the existing request experience until the product owner explicitly decides whether it remains a standalone module, is moved under a new route, or is retired.

No production database schema changes or deployments were made during this audit.

## Verified environment

| Area | Observed state |
|---|---|
| GitHub | Public repository; default branch `main`; repository size 78 KB |
| Framework | Next.js 14.2.15, React 18.3.1, TypeScript 5.6, Tailwind 3.4 |
| Supabase | Project `dlfcvnkrcwkyjbczpllp`; PostgreSQL 17.11; region `us-east-1`; status ACTIVE_HEALTHY |
| Supabase public schema | No application tables returned by the table inventory |
| Supabase other schemas | Standard platform schemas (`auth`, `realtime`, `storage`, `vault`) present |
| Vercel | Project `docvy`; framework Next.js; Node 24.x |
| Latest Vercel deployment | Production target reports READY |
| Vercel access | SSO protection enabled for all deployments except custom domains; project metadata reports `live: false` |
| Environment template | Only `GOOGLE_SHEETS_WEBHOOK_URL` is documented in `.env.example` |

A READY deployment does not prove that a domain is publicly accessible or that application workflows are operational.

## Existing product and code

### Existing public experience
- Homepage positions Docvy as a medical-documentation / certificate-request service.
- Existing informational routes include About, Contact, FAQs, How it works, employee/student landing pages, pricing, legal policies, grievance, request and request status.
- Existing reusable UI components include navigation, footer, FAQ, request form and UI primitives.
- The request form has three steps: purpose, contact details, and consent.

### Existing request persistence
- `POST /api/requests` validates the request and forwards it to a Google Apps Script URL.
- The README and deployment guide state that Google Sheets is the request intake destination.
- The request-status route reads from `lib/store.ts`, an explicitly labelled in-memory placeholder.
- In-memory state is not durable or shared across serverless instances.

### Existing payment code discrepancy
- Payment verification code references Supabase `payments` and `audit_log` tables, which are absent from the public schema inventory.
- The webhook uses an in-memory event set and in-memory request map.
- The webhook source itself labels its signature integration as untested.
- README and deployment documentation describe the deployed workflow as having no payment gateway.
- Treat payment functionality as unverified legacy/experimental code; do not enable it without a full reconciliation and gateway test plan.

### Existing Supabase artifacts
- `lib/supabase.ts` creates a server-only service-role client.
- `supabase/schema.sql` describes the former documentation-request flow, not the required multi-tenant healthcare platform.
- That schema has not been applied to the connected project.
- No application authentication flow or organisation/branch membership model was found in the inspected source.
- No application tables were returned from the connected database's public schema.

## Security and operational findings

1. The request endpoint does not call the existing rate-limiting helper.
2. The existing rate limiter is process-local and explicitly not suitable as a distributed production control.
3. The service-role Supabase client must remain server-only; it bypasses normal RLS enforcement and must never reach browser bundles.
4. The in-memory status and webhook stores are not durable.
5. The proposed schema is not tenant-aware and is not a safe starting point for clinic/hospital isolation.
6. No application-level role, organisation membership, branch boundary, or audited clinical-record permission model was identified in the inspected files.
7. Vercel SSO protection and the `live: false` project flag require deployment/access verification before calling the site publicly live.
8. The database region is US East, while the repository's old schema comment recommends Mumbai. Data residency, contractual requirements, latency and migration/backup implications must be assessed before patient or clinical data is stored.

## Product architecture direction

Use a modular monolith first; do not introduce microservices at this stage.

- **Public discovery:** server-rendered directory, provider profiles, specialties, localities and SEO.
- **Identity and tenancy:** Supabase Auth, profiles, organisations, memberships, roles and branches.
- **Provider operations:** appointments, staff, tasks, patient CRM and billing records.
- **Clinical domain:** consent, encounters, clinical notes and prescriptions behind stricter professional permissions.
- **Platform administration:** provider verification, moderation, subscriptions and audit events.
- **Analytics:** first-party, minimised events and tenant-scoped aggregates; never expose patient-identifiable data in marketplace or public analytics.
- **Integrations:** explicit adapters for notifications, payments, maps, ABDM and external acquisition platforms. An adapter is not a claim that an integration is active.

## Architecture guardrails

- Public provider listing data must be separated from private patient and clinical data.
- Every tenant-owned operational row must have an organisation boundary; branch-scoped records must also have branch scope where applicable.
- RLS must be enabled on every exposed application table and tested with cross-tenant negative cases.
- Authorization must use trusted server-validated identity and protected role/membership data, not user-editable metadata.
- Clinical actions require explicit actor identity, permission checks and audit trails.
- Booking must use database constraints/transactions to prevent double booking.
- Analytics must distinguish search impressions, profile views, contact clicks, appointment requests, confirmations and completed visits.
- No provider verification badge, review, rating, or clinical credential may be fabricated.
- No PHI or patient-identifiable data may be sent to analytics or public research systems.
- No production schema mutation or deployment without migration review, backups, security review and workflow tests.

## Audit evidence

Inspected repository root/tree, README, package manifest, homepage, layout, navigation, footer, request form, request API, payment verify/webhook handlers, status page, Supabase client, in-memory store, event helper, rate helper, Razorpay helper, proposed SQL schema, environment template, deployment guide, Supabase project metadata/table inventory, Vercel project metadata and recent deployment list.

## Open decisions

1. Decide how the existing medical-documentation request product should coexist with the new healthcare discovery and SaaS platform.
2. Confirm whether the connected US East Supabase project is the intended production project or a development/test project.
3. Confirm the desired data-residency posture before patient or clinical data is introduced.
4. Confirm the public domain and Vercel SSO/access policy for launch.

## Audit conclusion

**Status: P0 discovery partially complete; implementation not yet production-ready.** The repository can be extended, but the existing database and persistence model must not be treated as the foundation for patient, provider, appointment or clinical workflows.
