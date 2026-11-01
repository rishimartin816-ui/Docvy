# DOCVY local PostgreSQL development

This is a local-only PostgreSQL development environment. It does not connect to the existing Supabase project, create cloud infrastructure, deploy the application, or migrate existing data.

## Requirements

- Docker Engine with the Compose plugin.
- A local machine with port `54329` available.

The DOCVY hosted coding environment used to prepare this scaffold did not have Docker or `psql`; run the commands below on the developer workstation.

## Start PostgreSQL

From the repository root:

1. Copy `.env.postgres.example` to `.env.postgres`.
2. Replace the sample password with a long, unique local password.
3. Start the database:

```bash
docker compose --env-file .env.postgres up -d
docker compose --env-file .env.postgres ps
```

The service listens only on `127.0.0.1:54329`. Data is stored in the named Docker volume `docvy_postgres_dev_data`.

## Apply the initial schema manually

The migration is deliberately not mounted into the container's automatic initialization directory. Review it first, then apply it explicitly:

```bash
docker compose --env-file .env.postgres exec -T postgres sh -c \
  'psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB"' \
  < database/migrations/0001_platform_foundation.sql
```

Verify the tables and RLS flags:

```bash
docker compose --env-file .env.postgres exec postgres sh -c \
  'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "\dt"'
```

Reapplying this migration is not a supported reset strategy. Use a disposable database for schema iteration and create a new numbered migration for each reviewed change.

## Stop and data retention

```bash
docker compose --env-file .env.postgres down
```

This stops and removes the container but preserves the named volume. **Do not run `docker compose down -v` unless you intentionally want to destroy the local database volume.**

## Security and scope gates

- Never use this local database for real patient, clinical, identity-document, or other sensitive production data. Use synthetic fixtures only.
- Keep `.env.postgres` out of Git. Do not reuse production passwords or credentials.
- The migration creates a non-login `docvy_app` group role with `NOBYPASSRLS`. The database owner used by the local container is an administrator and bypasses RLS; it must never be used as an application connection.
- RLS is enabled on every foundation table, but this first migration intentionally creates **no policies**. The non-owner application role therefore has no row access yet. Do not connect the application until a trusted authentication adapter, transaction-scoped identity propagation, explicit policies, and positive plus cross-tenant negative tests have been implemented.
- The profile UUID is reserved for the trusted identity provider's stable subject. This standalone PostgreSQL scaffold does not create or emulate Supabase Auth.
- The role/permission catalogue is intentionally unseeded pending the DOC-7 role matrix decision.
- Patient, appointment, billing, clinical-record, prescription, consent, and attachment tables are intentionally out of scope for this first migration.
- The existing documentation-request workflow and its persistence path are unchanged.
- This development database is not an India-hosted production environment and makes no data-residency or regulatory-compliance claim.

## Next implementation gates

1. Review and approve the tenant ERD and role matrix in the linked identity-design PR.
2. Choose and implement the trusted authentication provider / database identity contract.
3. Add tenant-aware RLS policies and automated cross-tenant tests.
4. Add domain migrations incrementally: discovery, scheduling, patient administration, billing, and only then the separately reviewed clinical domain.
5. Add application database access through a least-privilege runtime role; never expose migration credentials to the browser.
