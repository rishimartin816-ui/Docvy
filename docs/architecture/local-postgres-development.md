# DOCVY local PostgreSQL development boundary

**Status:** Local development setup; custom-auth foundation approved  
**Date:** 2026-11-01  
**Related design:** `custom-authentication.md`

## Decision

Use the existing isolated PostgreSQL 17 Docker container as the zero-infrastructure-cost development database. Keep it separate from the connected Supabase project and from the legacy documentation-request workflow.

This is a development environment, not a production hosting decision. It does not satisfy India data residency, production backups, disaster recovery, production monitoring or healthcare privacy/security requirements.

## Components

- Docker Compose runs the official PostgreSQL 17 image.
- The database port is bound to loopback only (`127.0.0.1:54329`).
- A named Docker volume preserves local data across container recreation.
- Local credentials are supplied through the ignored `.env.postgres` file.
- SQL changes are stored as reviewed, ordered files under `database/migrations/` and applied manually after explicit review.
- Migration `0001_platform_foundation.sql` creates the organisation, branch, membership, role, provider-publication and audit foundation.
- Migration `0002_custom_identity_schema.sql` is prepared for review and has **not** been applied.

## Security posture

Migration 0001 enables RLS on all 11 foundation tables and deliberately creates no policies. The non-owner application role is therefore denied until trusted identity propagation and reviewed policies exist.

The existing `docvy_app` role is a NOLOGIN group role with NOBYPASSRLS. The container bootstrap user is an administrator and bypasses RLS; it is for schema administration only, never application connections.

## Identity decision

DOCVY has approved custom authentication on standalone PostgreSQL. Supabase Auth, `auth.users` and `auth.uid()` are not part of this architecture.

The approved direction is documented in `custom-authentication.md`. Identity credentials and sessions live in a private `identity` schema; runtime application access will use narrowly scoped functions and transaction-scoped session identity. The app must never trust browser-supplied user, organisation, branch or role identifiers.

## Explicitly not done

- No cloud database or Supabase project was changed.
- No production deployment, paid service or data migration was performed.
- Migration 0002 has not been executed.
- No patient or clinical tables/data have been added.
- The existing documentation-request workflow remains unchanged.
- No production India data-residency or compliance claim is made.

## Acceptance gates

- [x] Local PostgreSQL service reports healthy and is bound to loopback.
- [x] Migration 0001 committed successfully on the local database.
- [x] All 11 foundation tables report RLS enabled.
- [x] `docvy_app` is NOLOGIN and NOBYPASSRLS.
- [ ] Review migration 0002 before execution.
- [ ] Apply migration 0002 to a disposable PostgreSQL 17 database.
- [ ] Add and test authentication functions and transaction-scoped identity.
- [ ] Add tenant RLS policies and positive/cross-tenant negative tests.
- [ ] Never use real patient or clinical data in local fixtures.
