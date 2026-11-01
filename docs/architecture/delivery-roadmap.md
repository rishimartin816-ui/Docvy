# DOCVY — Product and Engineering Delivery Roadmap

**Status date:** 2026-11-01  
**Source of requirements:** DOCVY Complete Website & Software Development Master Prompt  
**Delivery strategy:** evidence-led milestones; preserve existing functionality; no fake data or untested completion claims.

## Release strategy

### Release 0 — Foundation and decisions
- [x] Discover the connected GitHub repository, Supabase project and Vercel project.
- [x] Inspect repository structure, framework manifest, public pages, request form/API, payment handlers and persistence helpers.
- [x] Inventory Supabase public application tables.
- [x] Inspect Vercel project metadata and recent deployment states.
- [ ] Decide coexistence/retirement path for the existing medical-documentation request service.
- [ ] Confirm database environment and data-residency requirements.
- [ ] Complete competitor and market validation with dated sources.
- [ ] Approve domain model and security architecture.
- [ ] Establish repeatable local build/test workflow and migration workflow.

### Release 1 — Secure platform foundation
- Identity: patient, provider, staff and platform-admin accounts.
- Organisation types: doctor practice, clinic and hospital.
- Organisation memberships, role grants, branches and tenant boundaries.
- Provider public/private profile separation.
- Verification workflow with evidence, reviewer, decision and re-verification history.
- Audit trail for sensitive actions.
- Automated tests for role boundaries and cross-tenant denial.

**Acceptance:** authenticated roles work; a user cannot access another organisation's private data; public listing data contains no private patient/clinical fields.

### Release 2 — Discovery marketplace
- Homepage and global search.
- Provider, clinic and hospital directory.
- Specialty, treatment, city and locality routes.
- Provider profile pages and verification states.
- Filters, pagination, relevance and location search.
- Honest empty states until verified provider data exists.
- Search impressions, result clicks, profile views and contact events.
- SEO metadata, canonical URLs, sitemap and structured data where appropriate.

**Acceptance:** all search results come from persisted, moderated provider data; organic and sponsored placements are visibly distinguished.

### Release 3 — Appointment requests and scheduling
- Provider availability and slot model.
- Transaction-safe slot reservation and double-booking prevention.
- Appointment request, confirmation, rescheduling and cancellation.
- Patient contact/consent records and booking reference.
- Provider schedule and appointment queue.
- Notification adapter and delivery audit.

**Acceptance:** concurrency tests prove one slot cannot be double-booked; state transitions are validated and audited.

### Release 4 — Clinic operations
- Patient CRM and relationship management.
- Calendar, walk-ins, waiting list and follow-ups.
- Tasks, staff and permission management.
- Billing records, invoices and offline payment recording.
- Operational dashboards based on persisted records.

### Release 5 — Clinical records
- Consent and access logging.
- Encounters, notes, vitals, allergies, diagnoses and treatment plans.
- Prescriptions and clinician approval.
- Secure attachments and retention controls.
- Clinical access tests and audit review.

**Gate:** no real patient data until the security, privacy, backup and access-control review passes.

### Release 6 — Analytics and business intelligence
- Acquisition attribution and UTM capture.
- Search-to-profile and search-to-appointment funnels.
- Provider performance and branch-level reporting.
- Revenue and outstanding-balance reports.
- Tenant-scoped analytics and aggregation.
- Explicit reporting period, source, denominator and limitations.

### Release 7 — Hospital operations
- Departments, OPD/IPD, admissions, discharge and beds.
- Nursing, OT, diagnostics, pharmacy, inventory and insurance workflows.
- Multi-branch permissions and enterprise reporting.
- Deliver by tested modules, not superficial placeholder screens.

### Release 8 — AI and automation
- Read-only operational assistant over permission-filtered data.
- Task suggestions, reminders, inventory alerts and operational summaries.
- Human approval for actions with business impact.
- No autonomous diagnosis, prescription or clinical decisions.

### Release 9 — Production readiness
- Security and tenant-isolation assessment.
- Migration, backup and restore verification.
- Load, accessibility and Core Web Vitals checks.
- E2E tests on mobile and desktop.
- Monitoring, incident response, data retention and operational runbooks.
- Verified deployment and access policy.

## Required delivery evidence

Each feature must record:
- Source branch and commit.
- Database migration and rollback strategy, if applicable.
- API and UI routes.
- Role/permission matrix.
- Unit, integration and end-to-end test evidence.
- Security and tenant-isolation test evidence.
- Deployment environment and deployment URL.
- Known limitations and unresolved defects.

## Release status vocabulary

- **Complete:** implemented and verified with evidence.
- **In progress:** implementation underway; acceptance criteria not yet met.
- **Blocked:** requires a decision, credential, external dependency or access.
- **Not started:** no implementation evidence.

Do not mark a feature complete based on a mockup, installed dependency, static route or sample dataset.
