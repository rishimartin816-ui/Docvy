-- Review-only: explicit directory-to-CRM identity linkage.
-- No mapping rows are inserted by this migration. Approve each provider and
-- clinic relationship with a real operator before enabling booking.
begin;
create table if not exists public.hybrid_provider_roster_links (
  directory_provider_id text not null references public.docvy_directory_providers(provider_id) on delete restrict,
  doctor_roster_id uuid not null references public.crm_doctor_roster(id) on delete restrict,
  clinic_id uuid not null references public.crm_clinics(id) on delete restrict,
  scope_approved boolean not null default false,
  operator_ready boolean not null default false,
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  primary key (directory_provider_id,doctor_roster_id),
  constraint hybrid_link_requires_approver check (
    (scope_approved = false and operator_ready = false)
    or (approved_by is not null and approved_at is not null)
  )
);
create index if not exists hybrid_provider_links_clinic_idx
  on public.hybrid_provider_roster_links(clinic_id);
alter table public.hybrid_provider_roster_links enable row level security;
revoke all on public.hybrid_provider_roster_links from public,anon,authenticated;
grant select,insert,update on public.hybrid_provider_roster_links to service_role;
-- No direct authenticated or anonymous policies. Server must validate operator.
commit;
-- WARNING: SQL alone does not guarantee roster.clinic_id matches this clinic_id.
-- Enforce that with a composite FK after checking existing roster uniqueness,
-- or a trusted DB trigger. Do not activate any mappings until enforced.
