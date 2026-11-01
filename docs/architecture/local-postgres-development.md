# DOCVY local PostgreSQL development boundary

**Status:** Prepared for review  
**Date:** 2026-11-01  
**Related design:** `tenant-identity-and-authorization.md`

## Decision

Use an isolated PostgreSQL 17 container as the zero-infrastructure-cost developer database. Keep it separate from the connected Supabase project and from the legacy documentation-request workflow.

This is a development convenience, not the production hosting decision. It does not satisfy India data residency, backups, disaster recovery, production monitoring, or healthcare privacy/security requirements.

## Components

- Docker Compose runs one official PostgreSQL 17 service.
- The database port is bound to loopback only (`127.0.0.1:54329`).
- A named Docker volume preserves local data across container recreation.
- Local credentials are supplied through an ignored `.env.postgres` file.
- SQL changes are stored as reviewed, ordered files under `database/migrations/` and applied manually after review.
- The first migration creates only the identity/organisation/branch/membership/role/provider-publication/audit foundation.

## Security posture

The schema enables RLS on every foundation table and deliberately creates no policies in the first migration. This is fail-closed for a non-owner role. The migration also creates a non-login `docvy_app` role with `NOBYPASSRLS`; runtime credentials and policy design are a separate implementation gate.

The local container's bootstrap user is an administrator and bypasses RLS. It is for local schema administration only, never an application connection. No patient or clinical domain tables are created.

## Identity integration is intentionally unresolved

The current product direction proposes Supabase Auth, but a standalone PostgreSQL container does not include Supabase's `auth` schema or `auth.uid()` helper. This migration therefore stores a stable external identity UUID in `profiles.id` without inventing an Auth schema or weakening tenant policies. A later reviewed migration must connect the selected identity provider to database authorization and prove that browser-supplied tenant/user identifiers cannot be trusted.

## Explicitly not done

- No Docker container was started in the hosted preparation environment; Docker and `psql` were unavailable.
- No SQL migration was executed.
- No Supabase project was read or modified in this work.
- No cloud infrastructure, paid service, production deployment, or data migration was created.
- No real patient/provider data was loaded.

## Acceptance checklist

- [ ] Developer workstation has Docker Engine and Compose plugin.
- [ ] Local service reports healthy and is reachable only on loopback.
- [ ] Migration applies successfully to an empty disposable PostgreSQL 17 database.
- [ ] All foundation tables have RLS enabled.
- [ ] A non-owner role cannot read or write without an explicit policy.
- [ ] Composite foreign keys reject a membership/branch relationship crossing organisations.
- [ ] Audit events cannot be updated or deleted by the application role.
- [ ] No real or sensitive data is used in local fixtures.
