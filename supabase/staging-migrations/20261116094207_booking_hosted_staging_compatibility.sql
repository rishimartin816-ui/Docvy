-- Existing pmyzedtpogmhvcrurcau only. NEVER include in a production db push.
-- Adds prerequisites without rewriting existing demo records or changing their access policies.
begin;
do $$ begin
  if to_regclass('public.docvy_directory_providers') is not null then
    raise exception 'Staging compatibility bootstrap requires the inspected legacy staging baseline';
  end if;
end $$;
create table public.docvy_directory_providers (
  provider_id text primary key, doctor_name text not null, city text not null, facility text not null,
  source_url text not null, source_checked date not null,
  enabled boolean not null default false, published boolean not null default false,
  consent_given boolean not null default false, profile_status text not null default 'unclaimed',
  consent_date timestamptz, consent_method text, registration_number text, registration_council text,
  verified_at timestamptz, specialties jsonb not null default '[]', approved_bio text, photo_url text,
  updated_at timestamptz not null default now(), practice_locations jsonb not null default '[]',
  profile_details jsonb not null default '{}'
);
alter table public.docvy_directory_providers enable row level security;
revoke all on public.docvy_directory_providers from public,anon,authenticated;
grant select,insert,update,delete on public.docvy_directory_providers to service_role;
alter table public.crm_clinics add column city text;
alter table public.crm_doctor_roster add column provider_id text references public.docvy_directory_providers(provider_id);
alter table public.crm_slots add column doctor_id uuid references public.crm_doctor_roster(id);
alter table public.crm_staff add column active boolean not null default true;
alter table public.crm_staff add column doctor_id uuid references public.crm_doctor_roster(id);
-- Match existing founder membership without granting membership or provisioning a new account.
create function public.docvy_is_directory_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select auth.uid() is not null and exists(select 1 from public.crm_founders where user_id=auth.uid())
$$;
revoke all on function public.docvy_is_directory_admin() from public,anon;
grant execute on function public.docvy_is_directory_admin() to authenticated,service_role;
commit;
