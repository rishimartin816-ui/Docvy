-- Requires the CRM clinic and staff tables. Populate routes only for verified clinics.
begin;

create table public.crm_enquiry_routes (
  provider_id text not null,
  city text not null,
  facility text not null,
  clinic_id uuid not null references public.crm_clinics(id),
  enabled boolean not null default false,
  primary key (provider_id, city, facility)
);

create table public.crm_enquiries (
  reference text primary key,
  clinic_id uuid not null references public.crm_clinics(id),
  provider_id text not null,
  city text not null,
  facility text not null,
  patient_name text not null,
  mobile text not null,
  email text,
  preferred_date date,
  preferred_time time,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  consented_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index crm_enquiries_clinic_recent on public.crm_enquiries(clinic_id, consented_at desc);
create index crm_enquiries_mobile_recent on public.crm_enquiries(mobile, consented_at desc);
alter table public.crm_enquiry_routes enable row level security;
alter table public.crm_enquiries enable row level security;
revoke all on public.crm_enquiry_routes, public.crm_enquiries from public, anon, authenticated;
grant select on public.crm_enquiry_routes to service_role;
grant select, insert on public.crm_enquiries to service_role;

create function public.crm_submit_enquiry(
  ref text, provider text, location_city text, location_facility text,
  name text, phone text, contact_email text, requested_date date, requested_time time
) returns void language plpgsql security invoker set search_path = '' as $$
declare
  target_clinic uuid;
begin
  select clinic_id into target_clinic from public.crm_enquiry_routes
    where provider_id = provider and city = location_city and facility = location_facility and enabled;
  if not found then
    raise exception using errcode = 'PT404', message = 'Enquiry intake unavailable for this location';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('crm-enquiry:' || phone, 0));
  if exists (
    select 1 from public.crm_enquiries where mobile = phone and consented_at > clock_timestamp() - interval '2 minutes'
  ) then
    raise exception using errcode = 'PT429', message = 'Please wait before sending another enquiry';
  end if;
  insert into public.crm_enquiries(reference, clinic_id, provider_id, city, facility,
    patient_name, mobile, email, preferred_date, preferred_time)
  values (ref, target_clinic, provider, location_city, location_facility,
    name, phone, contact_email, requested_date, requested_time);
end;
$$;

create function public.crm_list_enquiries(actor uuid, clinic uuid)
returns setof public.crm_enquiries language plpgsql security invoker set search_path = '' as $$
begin
  if not exists (
    select 1 from public.crm_staff where user_id = actor and clinic_id = clinic
      and role in ('owner', 'clinic_admin', 'manager', 'receptionist', 'scheduler')
  ) then
    raise exception using errcode = 'PT403', message = 'Enquiry access required';
  end if;
  return query select * from public.crm_enquiries where clinic_id = clinic
    order by consented_at desc, reference desc limit 100;
end;
$$;

revoke all on function public.crm_submit_enquiry(text, text, text, text, text, text, text, date, time),
  public.crm_list_enquiries(uuid, uuid) from public, anon, authenticated;
grant execute on function public.crm_submit_enquiry(text, text, text, text, text, text, text, date, time),
  public.crm_list_enquiries(uuid, uuid) to service_role;

commit;
