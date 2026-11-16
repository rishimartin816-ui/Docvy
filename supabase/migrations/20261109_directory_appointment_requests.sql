-- DOCVY's coordination queue is separate from provider clinic calendars.
create table public.docvy_directory_providers (
  provider_id text primary key,
  doctor_name text not null,
  city text not null,
  facility text not null,
  source_url text not null,
  source_checked date not null,
  enabled boolean not null default true
);

create table public.docvy_directory_requests (
  request_id uuid primary key,
  reference text not null unique default ('DV-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 16))),
  provider_id text not null references public.docvy_directory_providers(provider_id),
  contact_phone text not null,
  request_data jsonb not null,
  network_hash text not null,
  status text not null default 'requested' check (status in ('requested', 'contacted', 'provider-confirmed', 'declined', 'cancelled')),
  consent_version text not null default 'directory-appointment-2026-11-09',
  consented_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index docvy_directory_requests_phone_recent on public.docvy_directory_requests(contact_phone, created_at desc);
create index docvy_directory_requests_network_recent on public.docvy_directory_requests(network_hash, created_at desc);
create index docvy_directory_requests_recent on public.docvy_directory_requests(created_at desc);
alter table public.docvy_directory_providers enable row level security;
alter table public.docvy_directory_requests enable row level security;
revoke all on public.docvy_directory_providers, public.docvy_directory_requests from public, anon, authenticated;
grant select, insert, update, delete on public.docvy_directory_providers, public.docvy_directory_requests to service_role;

create function public.docvy_submit_directory_request(p_request_id uuid, p_payload jsonb, p_network_hash text)
returns text language plpgsql security definer set search_path = '' as $$
declare
  selected public.docvy_directory_providers%rowtype;
  existing public.docvy_directory_requests%rowtype;
  phone text;
  wanted_date date;
  saved_reference text;
begin
  if p_request_id is null or p_payload is null or jsonb_typeof(p_payload) <> 'object'
    or p_network_hash is null or p_network_hash !~ '^[a-f0-9]{64}$'
    or length(p_payload::text) > 3000
    or p_payload - array['providerId','city','facility','name','mobile','email','requestedDate','requestedTime','consent']::text[] <> '{}'::jsonb
    or (p_payload->>'consent') is distinct from 'true'
    or coalesce(length(btrim(p_payload->>'name')),0) not between 1 and 100
    or coalesce(length(p_payload->>'email'),0) > 254 then
    raise exception using errcode='PT400', message='Check your details and consent';
  end if;
  phone := p_payload->>'mobile';
  if phone is null or phone !~ '^\+91[6-9][0-9]{9}$'
    or (coalesce(p_payload->>'email','') <> '' and p_payload->>'email' !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$') then
    raise exception using errcode='PT400', message='Check your contact details';
  end if;
  select * into selected from public.docvy_directory_providers where provider_id=p_payload->>'providerId' and enabled;
  if not found or selected.city is distinct from p_payload->>'city' or selected.facility is distinct from p_payload->>'facility' then
    raise exception using errcode='PT422', message='This doctor or location is unavailable';
  end if;
  if coalesce(p_payload->>'requestedDate','') <> '' then
    begin
      wanted_date := (p_payload->>'requestedDate')::date;
    exception when others then
      raise exception using errcode='PT400', message='Choose a valid preferred date';
    end;
    if to_char(wanted_date,'YYYY-MM-DD') <> p_payload->>'requestedDate'
      or wanted_date < (now() at time zone 'Asia/Kolkata')::date
      or wanted_date > (now() at time zone 'Asia/Kolkata')::date + 180 then
      raise exception using errcode='PT400', message='Choose a preferred date within the next 180 days';
    end if;
  end if;
  if coalesce(p_payload->>'requestedTime','') <> '' and p_payload->>'requestedTime' !~ '^([01][0-9]|2[0-3]):[0-5][0-9]$' then
    raise exception using errcode='PT400', message='Choose a valid preferred time';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('docvy-request:' || p_request_id::text,0));
  select * into existing from public.docvy_directory_requests where request_id=p_request_id;
  if found then
    if existing.request_data <> p_payload then
      raise exception using errcode='PT409', message='Request reference was used for different details';
    end if;
    return existing.reference;
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('docvy-network:' || p_network_hash,0));
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('docvy-phone:' || phone,0));
  if (select count(*) from public.docvy_directory_requests where contact_phone=phone and created_at>clock_timestamp()-interval '1 hour') >= 3
    or (select count(*) from public.docvy_directory_requests where network_hash=p_network_hash and created_at>clock_timestamp()-interval '10 minutes') >= 20 then
    raise exception using errcode='PT429', message='Please wait before sending another request';
  end if;
  insert into public.docvy_directory_requests(request_id, provider_id, contact_phone, request_data, network_hash)
    values(p_request_id, selected.provider_id, phone, p_payload, p_network_hash)
    returning reference into saved_reference;
  return saved_reference;
end;
$$;
revoke all on function public.docvy_submit_directory_request(uuid,jsonb,text) from public;
grant execute on function public.docvy_submit_directory_request(uuid,jsonb,text) to anon, authenticated, service_role;

insert into public.docvy_directory_providers(provider_id,doctor_name,city,facility,source_url,source_checked) values
('dr-naresh-trehan', 'Dr. Naresh Trehan', 'Gurgaon', 'Medanta – The Medicity', 'https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/cardiac-surgery/doctor/dr-naresh-trehan', '2026-11-09'),
('dr-praveen-chandra', 'Dr. Praveen Chandra', 'Gurgaon', 'Medanta – The Medicity', 'https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/cardiology/doctor/dr-praveen-chandra', '2026-11-09'),
('dr-randeep-guleria', 'Dr. Randeep Guleria', 'Gurgaon', 'Medanta – The Medicity', 'https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/internal-medicine/doctor/dr-randeep-guleria', '2026-11-09'),
('dr-rajesh-puri', 'Dr. Rajesh Puri', 'Gurgaon', 'Medanta – The Medicity', 'https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/digestive-and-hepatobiliary/doctor/dr-rajesh-puri', '2026-11-09'),
('dr-ashok-kumar-vaid', 'Dr. Ashok Kumar Vaid', 'Gurgaon', 'Medanta – The Medicity', 'https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/oncology/doctor/dr-ashok-kumar-vaid', '2026-11-09'),
('dr-aditya-gupta', 'Dr. Aditya Gupta', 'Gurgaon', 'Artemis Hospitals', 'https://www.artemishospitals.com/doctor/profile/aditya-gupta', '2026-11-09'),
('dr-i-p-s-oberoi', 'Dr. I P S Oberoi', 'Gurgaon', 'Artemis Hospitals', 'https://www.artemishospitals.com/doctor/profile/i-p-s-oberoi', '2026-11-09'),
('dr-nidhi-rawal', 'Dr. Nidhi Rawal', 'Gurgaon', 'Artemis Hospitals', 'https://www.artemishospitals.com/doctor/profile/nidhi-rawal', '2026-11-09'),
('dr-giriraj-bora', 'Dr. Giriraj Bora', 'Gurgaon', 'Artemis Hospitals', 'https://www.artemishospitals.com/doctor/profile/giriraj-bora', '2026-11-09'),
('dr-anjali-kumar', 'Dr. Anjali Kumar', 'Gurgaon', 'CK Birla Hospital', 'https://www.ckbhospital.com/dr-anjali-kumar-1', '2026-11-09');
