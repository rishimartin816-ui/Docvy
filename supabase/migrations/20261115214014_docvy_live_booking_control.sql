-- DOCVY Hybrid Booking Phase 1 - additive, opt-in migration
-- Apply to staging first; production only after end-to-end validation.
-- RLS: application tables exposed in public are DENIED to anon/authenticated.
-- Only trusted server-side service role uses these tables / RPCs.

begin;

create table if not exists public.docvy_booking_provider_options (
  provider_id text primary key references public.docvy_directory_providers(provider_id) on delete restrict,
  mode text not null default 'disabled' check (mode in ('disabled','approval','instant')),
  enabled_by uuid,
  enabled_at timestamptz,
  updated_at timestamptz not null default now(),
  check (mode = 'disabled' or enabled_at is not null)
);

create table if not exists public.docvy_booking_cases (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default ('DV-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,16))),
  idempotency_key uuid not null unique,
  network_hash text not null,
  provider_id text not null references public.docvy_directory_providers(provider_id) on delete restrict,
  doctor_name text not null,
  city text not null,
  facility text not null,
  clinic_id uuid references public.crm_clinics(id) on delete restrict,
  doctor_roster_id uuid references public.crm_doctor_roster(id) on delete restrict,
  crm_booking_id uuid unique references public.crm_bookings(id) on delete restrict,
  slot_id uuid references public.crm_slots(id) on delete restrict,
  requested_slot_id uuid references public.crm_slots(id) on delete restrict,
  mode text not null check (mode in ('approval','instant')),
  status text not null default 'requested'
    check (status in ('requested','confirmed','declined','expired','cancelled','completed_reported','completed_verified','no_show_reported','disputed')),
  patient_name text not null,
  patient_mobile text not null,
  patient_email text,
  preferred_date date,
  preferred_time time,
  confirmed_at timestamptz,
  confirmed_starts_at timestamptz,
  consent_version text not null,
  consented_at timestamptz not null,
  source text not null default 'docvy_web',
  patient_key_hash text not null check(patient_key_hash ~ '^[a-f0-9]{64}$'),
  patient_attended boolean,
  patient_response_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint docvy_booking_cases_instant_slot check (mode <> 'instant' or (slot_id is not null and crm_booking_id is not null)),
  constraint docvy_booking_cases_confirmed_evidence check (status <> 'confirmed' or confirmed_at is not null)
);
create index if not exists docvy_booking_cases_queue on public.docvy_booking_cases(created_at desc,id desc);
create index if not exists docvy_booking_cases_clinic_queue on public.docvy_booking_cases(clinic_id,created_at desc,id desc);
create index if not exists docvy_booking_cases_doctor_queue on public.docvy_booking_cases(doctor_roster_id,created_at desc,id desc);
create index if not exists docvy_booking_cases_network_recent on public.docvy_booking_cases(network_hash,created_at desc);
create index if not exists docvy_booking_cases_phone_recent on public.docvy_booking_cases(patient_mobile,created_at desc);
create unique index if not exists docvy_booking_cases_one_confirmed_start
  on public.docvy_booking_cases(provider_id,confirmed_starts_at)
  where status='confirmed' and confirmed_starts_at is not null;
create index if not exists docvy_booking_cases_provider_date on public.docvy_booking_cases(provider_id,created_at desc);
create index if not exists docvy_booking_cases_status_date on public.docvy_booking_cases(status,created_at desc);

create table if not exists public.docvy_booking_case_events (
  id bigint generated always as identity primary key,
  case_id uuid not null references public.docvy_booking_cases(id) on delete restrict,
  old_status text,
  new_status text not null,
  actor_type text not null check (actor_type in ('patient','docvy','clinic','system')),
  actor_id uuid,
  note text,
  created_at timestamptz not null default clock_timestamp()
);
create index if not exists docvy_booking_case_events_case on public.docvy_booking_case_events(case_id,created_at);
create or replace function public.docvy_booking_case_events_immutable()
returns trigger language plpgsql set search_path = '' as $$
begin
  raise exception 'Booking audit events are immutable';
end $$;
drop trigger if exists docvy_booking_case_events_immutable on public.docvy_booking_case_events;
create trigger docvy_booking_case_events_immutable before update or delete
on public.docvy_booking_case_events for each row execute function public.docvy_booking_case_events_immutable();

alter table public.docvy_booking_provider_options enable row level security;
alter table public.docvy_booking_cases enable row level security;
alter table public.docvy_booking_case_events enable row level security;
revoke all on public.docvy_booking_provider_options from anon,authenticated;
revoke all on public.docvy_booking_cases from anon,authenticated;
revoke all on public.docvy_booking_case_events from anon,authenticated;
revoke all on public.docvy_booking_case_events_id_seq from anon,authenticated;
grant select,insert,update,delete on public.docvy_booking_provider_options to service_role;
grant select,insert,update on public.docvy_booking_cases to service_role;
grant select,insert on public.docvy_booking_case_events to service_role;
grant usage,select on sequence public.docvy_booking_case_events_id_seq to service_role;

create table if not exists public.docvy_booking_notification_outbox (
  id bigint generated always as identity primary key,
  case_id uuid not null references public.docvy_booking_cases(id) on delete restrict,
  status text not null,
  recipient_type text not null check (recipient_type in ('patient','admin')),
  delivery_state text not null default 'queued' check (delivery_state in ('queued','sent','skipped')),
  attempts integer not null default 0,
  next_attempt_at timestamptz not null default now(),
  last_error text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  unique (case_id,status,recipient_type)
);
create index if not exists docvy_booking_notification_due on public.docvy_booking_notification_outbox(delivery_state,next_attempt_at);
alter table public.docvy_booking_notification_outbox enable row level security;
revoke all on public.docvy_booking_notification_outbox from anon,authenticated;
revoke all on public.docvy_booking_notification_outbox_id_seq from anon,authenticated;
grant select,insert,update on public.docvy_booking_notification_outbox to service_role;
grant usage,select on sequence public.docvy_booking_notification_outbox_id_seq to service_role;

-- Private-by-default RPC. Service role must be held only on the trusted backend.
create or replace function public.docvy_booking_submit(p_data jsonb)
returns jsonb language plpgsql security invoker set search_path = ''
as $$
declare
  v_provider public.docvy_directory_providers%rowtype;
  v_option public.docvy_booking_provider_options%rowtype;
  v_roster public.crm_doctor_roster%rowtype;
  v_slot public.crm_slots%rowtype;
  v_clinic public.crm_clinics%rowtype;
  v_case public.docvy_booking_cases%rowtype;
  v_booking uuid;
  v_key uuid;
  v_mode text;
  v_mobile text;
  v_date date;
  v_time time;
  v_slot_id uuid;
  v_requested_city text;
  v_requested_facility text;
  v_patient_hash text;
begin
  v_key := (p_data->>'idempotencyKey')::uuid;
  perform pg_advisory_xact_lock(hashtextextended(v_key::text, 0));
  select * into v_case from public.docvy_booking_cases where idempotency_key=v_key;
  if found then
    if v_case.provider_id is distinct from p_data->>'providerId' or v_case.patient_mobile is distinct from p_data->>'mobile'
      or v_case.patient_name is distinct from btrim(p_data->>'name') or coalesce(v_case.patient_email,'') is distinct from coalesce(p_data->>'email','')
      or v_case.city is distinct from p_data->>'city' or v_case.facility is distinct from p_data->>'facility'
      or coalesce(v_case.requested_slot_id::text,'') is distinct from coalesce(p_data->>'slotId','')
      or v_case.preferred_date is distinct from nullif(p_data->>'requestedDate','')::date
      or v_case.preferred_time is distinct from nullif(p_data->>'requestedTime','')::time
      or v_case.patient_key_hash is distinct from p_data->>'patientKeyHash' then raise exception 'idempotency_payload_changed';end if;
    return jsonb_build_object('reference',v_case.reference,'status',v_case.status,'mode',v_case.mode);
  end if;

  v_patient_hash:=p_data->>'patientKeyHash';
  if v_patient_hash is null or v_patient_hash !~ '^[a-f0-9]{64}$' then raise exception 'patient_receipt_key_required';end if;
  if coalesce(p_data->>'networkHash','') !~ '^[a-f0-9]{64}$' then raise exception 'invalid_rate_token';end if;
  perform pg_advisory_xact_lock(hashtextextended('network:'||(p_data->>'networkHash'),0));
  perform pg_advisory_xact_lock(hashtextextended('phone:'||(p_data->>'mobile'),0));
  if (select count(*) from public.docvy_booking_cases where network_hash=p_data->>'networkHash' and created_at>now()-interval '1 hour') >= 5 then raise exception 'too_many_requests'; end if;
  if (p_data->>'consent') is distinct from 'true' then raise exception 'consent_required'; end if;
  v_mobile := regexp_replace(coalesce(p_data->>'mobile',''),'[[:space:]()+-]','','g');
  if v_mobile !~ '^[6-9][0-9]{9}$' then raise exception 'invalid_mobile'; end if;
  if length(btrim(coalesce(p_data->>'name',''))) not between 2 and 100 then raise exception 'invalid_name'; end if;
  if length(coalesce(p_data->>'email','')) > 254 then raise exception 'invalid_email'; end if;
  if (select count(*) from public.docvy_booking_cases where patient_mobile=v_mobile and created_at>now()-interval '1 hour') >= 3 then raise exception 'too_many_requests'; end if;
  if nullif(p_data->>'requestedDate','') is not null then
    v_date := (p_data->>'requestedDate')::date;
    if v_date < (now() at time zone 'Asia/Kolkata')::date or v_date > (now() at time zone 'Asia/Kolkata')::date + 90 then
      raise exception 'invalid_requested_date';
    end if;
  end if;
  if nullif(p_data->>'requestedTime','') is not null then v_time := (p_data->>'requestedTime')::time; end if;
  v_requested_city := btrim(coalesce(p_data->>'city',''));
  v_requested_facility := btrim(coalesce(p_data->>'facility',''));
  if p_data->>'providerId'='mr-sahil-kochale' and v_requested_city not in ('Indore','Online') then raise exception 'scheduled_booking_indore_only';end if;

  select * into strict v_provider from public.docvy_directory_providers
    where provider_id=p_data->>'providerId' and enabled and published
      and consent_given and profile_status='verified' and verified_at is not null;
  select * into strict v_option from public.docvy_booking_provider_options
    where provider_id=v_provider.provider_id and mode <> 'disabled';
  if not (v_requested_city=v_provider.city and v_requested_facility=v_provider.facility)
  and not exists(select 1 from jsonb_array_elements(coalesce(v_provider.practice_locations,'[]'::jsonb)) l where l->>'city'=v_requested_city and l->>'facility'=v_requested_facility) then
    raise exception 'invalid_provider_location';
  end if;

  v_mode := v_option.mode;
  if p_data->>'approvalOnly'='true' then
    if nullif(p_data->>'slotId','') is not null then raise exception 'docvy_confirmation_required';end if;
    v_mode:='approval';
  end if;
  if v_provider.provider_id='mr-sahil-kochale' and v_requested_city='Online' then
    if nullif(p_data->>'slotId','') is not null then raise exception 'online_requires_doctor_confirmation';end if;
    v_mode:='approval';
  end if;
  if v_mode = 'approval' then
    if v_date is null or v_time is null then raise exception 'preferred_date_and_time_required';end if;
    if ((v_date+v_time) at time zone 'Asia/Kolkata')<clock_timestamp()+interval '15 minutes' then raise exception 'preferred_time_must_be_future';end if;
    -- Link to a real clinic only when an existing verified roster/location matches.
    -- Otherwise the request stays in the DOCVY founder queue, not an unrelated clinic.
    select r.* into v_roster
      from public.crm_doctor_roster r join public.crm_clinics c on c.id=r.clinic_id
      where r.provider_id=v_provider.provider_id
        and c.city=v_requested_city and c.name=v_requested_facility
      order by r.id limit 1;
  end if;
  if v_mode = 'instant' then
    if nullif(p_data->>'slotId','') is null then raise exception 'slot_required'; end if;
    v_slot_id := (p_data->>'slotId')::uuid;
    select * into strict v_roster from public.crm_doctor_roster
      where provider_id=v_provider.provider_id and present=true and
      clinic_id in (select id from public.crm_clinics where booking_enabled=true
        and city=v_requested_city and name=v_requested_facility)
      limit 1;
    select * into strict v_slot from public.crm_slots
      where id=v_slot_id and doctor_id=v_roster.id and clinic_id=v_roster.clinic_id
        and blocked=false and starts_at>now() for update;
    select * into strict v_clinic from public.crm_clinics where id=v_slot.clinic_id and booking_enabled=true;
    insert into public.crm_bookings(slot_id,original_slot_id,request_key,status)
      values (v_slot.id,v_slot.id,v_key,'confirmed') returning id into v_booking;
  end if;

  insert into public.docvy_booking_cases(
    idempotency_key,network_hash,provider_id,doctor_name,city,facility,
    clinic_id,doctor_roster_id,crm_booking_id,slot_id,mode,status,
    patient_name,patient_mobile,patient_email,preferred_date,preferred_time,
    confirmed_at,confirmed_starts_at,consent_version,consented_at,patient_key_hash,requested_slot_id
  ) values (
    v_key,p_data->>'networkHash',v_provider.provider_id,v_provider.doctor_name,v_requested_city,v_requested_facility,
    v_roster.clinic_id,v_roster.id,
    v_booking,v_slot_id,v_mode,case when v_mode='instant' then 'confirmed' else 'requested' end,
    btrim(p_data->>'name'),v_mobile,nullif(btrim(p_data->>'email'),''),
    v_date,v_time,case when v_mode='instant' then clock_timestamp() else null end,
    case when v_mode='instant' then v_slot.starts_at else null end,
    'docvy-hybrid-2026-11',now(),v_patient_hash,v_slot_id
  ) returning * into v_case;

  insert into public.docvy_booking_case_events(case_id,new_status,actor_type,note)
    values (v_case.id,v_case.status,'patient','Booking submitted via DOCVY');
  insert into public.docvy_booking_notification_outbox(case_id,status,recipient_type)
    values (v_case.id,v_case.status,'patient'),(v_case.id,v_case.status,'admin')
    on conflict do nothing;
  return jsonb_build_object('reference',v_case.reference,'status',v_case.status,'mode',v_case.mode);
end $$;

revoke all on function public.docvy_booking_submit(jsonb) from public,anon,authenticated;
grant execute on function public.docvy_booking_submit(jsonb) to service_role;

create or replace function public.docvy_booking_transition(
  p_case_id uuid, p_actor uuid, p_role text, p_status text, p_note text,
  p_confirmed_start timestamptz default null)
returns jsonb language plpgsql security invoker set search_path = ''
as $$
declare
  v_case public.docvy_booking_cases%rowtype;
  v_old text;
  v_selected public.crm_slots%rowtype;
  v_booking uuid;
begin
  if p_role not in ('docvy','clinic') then raise exception 'unauthorized_actor_role'; end if;
  if p_actor is null then raise exception 'actor_required'; end if;
  select * into strict v_case from public.docvy_booking_cases where id=p_case_id for update;
  v_old := v_case.status;
  if not (
       (v_old='requested' and p_status in ('confirmed','declined','cancelled','expired'))
    or (v_old='confirmed' and p_status in ('cancelled','completed_reported','no_show_reported','disputed'))
    or (v_old='completed_reported' and p_status in ('completed_verified','disputed'))
    or (v_old='no_show_reported' and p_status='disputed')
    or (v_old='completed_verified' and p_status='disputed')
  ) then raise exception 'invalid_status_transition'; end if;
  if p_status='confirmed' and (p_confirmed_start is null or p_confirmed_start<=now() or btrim(coalesce(p_note,''))='') then
    raise exception 'confirmation_requires_time_and_evidence';
  end if;
  if p_status='completed_verified' then raise exception 'independent_patient_confirmation_required';end if;
  if p_status in ('completed_reported','no_show_reported') and (v_case.confirmed_starts_at is null or v_case.confirmed_starts_at+interval '30 minutes'>clock_timestamp()) then raise exception 'visit_has_not_ended';end if;
  if p_status='completed_reported' and v_case.patient_response_at is not null then
    p_status:=case when v_case.patient_attended then 'completed_verified' else 'disputed' end;
  elsif p_status='no_show_reported' and v_case.patient_attended is true then p_status:='disputed';end if;
  if p_status='confirmed' then
    select s.* into strict v_selected from public.crm_slots s join public.crm_clinics c on c.id=s.clinic_id and c.booking_enabled
    where s.doctor_id=v_case.doctor_roster_id and s.clinic_id=v_case.clinic_id and s.starts_at=p_confirmed_start and not s.blocked and s.starts_at>clock_timestamp() for update of s;
    insert into public.crm_bookings(slot_id,original_slot_id,request_key,status) values(v_selected.id,v_selected.id,v_case.idempotency_key,'confirmed') returning id into v_booking;
    update public.docvy_booking_cases set crm_booking_id=v_booking,slot_id=v_selected.id where id=p_case_id;
  end if;
  if p_status='cancelled' and v_case.crm_booking_id is not null then
    update public.crm_bookings set status='cancelled'
      where id=v_case.crm_booking_id and status='confirmed';
  end if;
  update public.docvy_booking_cases
    set status=p_status,
        confirmed_at=case when p_status='confirmed' then clock_timestamp() else confirmed_at end,
        confirmed_starts_at=case when p_status='confirmed' then p_confirmed_start else confirmed_starts_at end,
        updated_at=clock_timestamp()
    where id=p_case_id;
  insert into public.docvy_booking_case_events(case_id,old_status,new_status,actor_type,actor_id,note)
    values (p_case_id,v_old,p_status,p_role,p_actor,left(p_note,500));
  insert into public.docvy_booking_notification_outbox(case_id,status,recipient_type)
    values (p_case_id,p_status,'patient'),(p_case_id,p_status,'admin')
    on conflict do nothing;
  return jsonb_build_object('reference',v_case.reference,'status',p_status);
end $$;

revoke all on function public.docvy_booking_transition(uuid,uuid,text,text,text,timestamptz) from public,anon,authenticated;
grant execute on function public.docvy_booking_transition(uuid,uuid,text,text,text,timestamptz) to service_role;

-- Atomically lease pending notification jobs. Multiple workers cannot lease same row.
create or replace function public.docvy_booking_claim_notifications(p_limit integer default 15)
returns setof public.docvy_booking_notification_outbox
language sql security invoker set search_path = ''
as $$
  update public.docvy_booking_notification_outbox o
  set attempts=o.attempts+1,
      next_attempt_at=clock_timestamp() + make_interval(mins => least(60, power(2,least(5,o.attempts))::integer)),
      last_error=null
  from (
    select id from public.docvy_booking_notification_outbox
    where delivery_state='queued' and attempts<6 and next_attempt_at<=clock_timestamp()
    order by created_at
    limit least(greatest(p_limit,1),50)
    for update skip locked
  ) jobs
  where o.id=jobs.id
  returning o.*;
$$;
revoke all on function public.docvy_booking_claim_notifications(integer) from public,anon,authenticated;
grant execute on function public.docvy_booking_claim_notifications(integer) to service_role;

commit;
