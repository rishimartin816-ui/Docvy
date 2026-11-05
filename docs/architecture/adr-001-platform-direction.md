# Architecture Decision Record — DOCVY platform direction

**Date:** 2026-11-01  
**Status:** Product boundary confirmed; technical architecture proposed

## Context

DOCVY is expanding from its existing medical-documentation request service into a healthcare discovery, appointment, clinic/hospital operations and analytics ecosystem. The existing medical-documentation workflow is to remain a separate DOCVY product module. It is not part of the new healthcare platform homepage or its navigation for now, and its existing routes and implementation must be preserved.

The connected Supabase project has no application tables in the public schema.

## Proposed technical decisions

1. **Architecture style:** modular monolith using the existing Next.js App Router and PostgreSQL/Supabase foundation, subject to dependency and deployment validation.
2. **Tenancy:** explicit organisations, memberships, roles and branches. Tenant ownership is enforced in database policies and server-side authorization.
3. **Domain separation:** public marketplace/provider data is separated from private organisation operations and protected clinical data.
4. **Search:** PostgreSQL full-text and PostGIS capabilities initially; introduce dedicated search only when measured needs justify it.
5. **Booking:** database-backed availability with transaction-safe reservation and uniqueness/locking strategy.
6. **Analytics:** collect minimised first-party events and build tenant-scoped aggregates. Do not send patient identifiers or clinical data to analytics.
7. **Clinical safety:** clinical records and prescriptions are distinct from administrative notes and require appropriate professional authorization.
8. **Integrations:** adapters are explicit and inactive until configured and tested.
9. **Existing service boundary:** preserve the medical-documentation request workflow as a separate product module. Do not remove its routes, APIs or supporting implementation when building the healthcare platform. Keep it out of the new homepage/navigation until explicitly reconsidered.

## Non-decisions

- No database region migration has been approved.
- No production schema has been created.
- No provider dataset has been imported.
- No ABDM integration or compliance certification is claimed.
- No payment gateway has been approved for the new platform.
- No public launch readiness is claimed.

## Consequences

This direction minimises premature infrastructure complexity while establishing the security boundaries required for multi-tenant healthcare software. The product boundary is decided; the database environment and India data-residency posture remain blocking decisions before patient or clinical data is introduced.
