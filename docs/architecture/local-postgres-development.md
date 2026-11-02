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
- The local `docvy_dev` database currently has migration 0001 only. Migrations 0001 and 0002 were applied to the disposable PostgreSQL 17 test database; migrations 0001–0003 were applied to the separate Mumbai Supabase Free pre-production project.
- The Mumbai Supabase project is not connected to Vercel and receives no application traffic. It is pre-production only; its Free plan has no automatic daily backups and may pause for inactivity.

## Security posture

Migration 0001 enables RLS on all 11 foundation tables and deliberately creates no policies. The non-owner application role is therefore denied until trusted identity propagation and reviewed policies exist.

The existing `docvy_app` role is a NOLOGIN group role with NOBYPASSRLS. The container bootstrap user is an administrator and bypasses RLS; it is for schema administration only, never application connections.

## Identity decision

DOCVY has approved custom authentication on standalone PostgreSQL. Supabase Auth, `auth.users` and `auth.uid()` are not part of this architecture.

The approved direction is documented in `custom-authentication.md`. Identity credentials and sessions live in a private `identity` schema; runtime application access will use narrowly scoped functions and transaction-scoped session identity. The app must never trust browser-supplied user, organisation, branch or role identifiers.

## Explicitly not done

- The separate Mumbai Supabase Free project was created and migrations 0001–0003 were applied; this is pre-production only, not a production launch.
- No production deployment, paid service or data migration was performed.
- No migration was applied to local `docvy_dev` after 0001.
- No patient or clinical tables/data have been added.
- The existing documentation-request workflow remains unchanged.
- No production India data-residency or compliance claim is made.

## Acceptance gates

- [x] Local PostgreSQL service reports healthy and is bound to loopback.
- [x] Migration 0001 committed successfully on the local database.
- [x] All 11 foundation tables report RLS enabled.
- [x] `docvy_app` is NOLOGIN and NOBYPASSRLS.
- [x] Review and apply migrations 0001 and 0002 to a disposable PostgreSQL 17 database.
- [x] Apply migrations 0001–0003 to the empty Mumbai pre-production project; verify all tables have RLS enabled.
- [ ] Add and test authentication functions and transaction-scoped identity.
- [ ] Add tenant RLS policies and positive/cross-tenant negative tests.
- [ ] Never use real patient or clinical data in local fixtures.
