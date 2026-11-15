-- Entirely synthetic PostgreSQL 17 fixture for isolated CI database.
-- Not for production or shared hosted staging.
do $$
begin
  if not exists(select 1 from pg_roles where rolname='anon') then create role anon nologin; end if;
  if not exists(select 1 from pg_roles where rolname='authenticated') then create role authenticated nologin; end if;
  if not exists(select 1 from pg_roles where rolname='service_role') then create role service_role nologin; end if;
end $$;
create table public.docvy_directory_providers (
  provider_id text primary key,
  doctor_name text not null,
  city text not null,
  facility text not null,
  enabled boolean not null,
  published boolean not null,
  consent_given boolean not null,
  profile_status text not null,
  verified_at timestamptz
);
create table public.crm_clinics (
  id uuid primary key,
  name text not null,
  city text not null,
  booking_enabled boolean not null default false
);
create table public.crm_doctor_roster (
  id uuid primary key,
  clinic_id uuid not null references public.crm_clinics(id),
  provider_id text not null references public.docvy_directory_providers(provider_id),
  present boolean
);
create table public.crm_slots (
  id uuid primary key,
  clinic_id uuid not null references public.crm_clinics(id),
  doctor_id uuid not null references public.crm_doctor_roster(id),
  blocked boolean not null default false,
  starts_at timestamptz not null,
  ends_at timestamptz not null
);
create table public.crm_bookings (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid not null references public.crm_slots(id),
  original_slot_id uuid not null references public.crm_slots(id),
  request_key uuid not null unique,
  status text not null check(status in ('confirmed','completed','cancelled','no_show'))
);
create unique index crm_bookings_occupied_slot
  on public.crm_bookings(slot_id) where status <> 'cancelled';
insert into public.docvy_directory_providers
(provider_id,doctor_name,city,facility,enabled,published,consent_given,profile_status,verified_at)
values ('docvy-qa-doctor','Dr. DOCVY Test','Gurugram','DOCVY QA Clinic',true,true,true,'verified',now()),
('docvy-unverified-doctor','Unverified Test','Gurugram','DOCVY QA Clinic',true,true,true,'claimed',null);
insert into public.crm_clinics values ('00000000-0000-4000-8000-000000000001','DOCVY QA Clinic','Gurugram',true);
insert into public.crm_doctor_roster values ('00000000-0000-4000-8000-000000000002','00000000-0000-4000-8000-000000000001','docvy-qa-doctor',true);
insert into public.crm_slots values
('00000000-0000-4000-8000-000000000003','00000000-0000-4000-8000-000000000001','00000000-0000-4000-8000-000000000002',false,now()+interval '2 days',now()+interval '2 days 30 minutes'),
('00000000-0000-4000-8000-000000000004','00000000-0000-4000-8000-000000000001','00000000-0000-4000-8000-000000000002',false,now()+interval '3 days',now()+interval '3 days 30 minutes');
