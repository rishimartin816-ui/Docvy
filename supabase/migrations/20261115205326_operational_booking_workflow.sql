begin;
alter table public.crm_slots add column provider_id text, add column fee_paise integer check (fee_paise >= 0);
-- Retain existing unassigned demo slots, but scope real schedules per provider.
alter table public.crm_slots drop constraint crm_slots_clinic_time_excl;
alter table public.crm_slots add constraint crm_slots_provider_time_excl exclude using gist
 (clinic_id with =, (coalesce(provider_id,'')) with =, tstzrange(starts_at,ends_at) with &&);
alter table public.crm_enquiries add column requested_slot_id uuid references public.crm_slots(id), add column request_key uuid unique;
create table public.crm_founders(user_id uuid primary key references auth.users(id));
create table public.crm_notification_outbox(
 id uuid primary key default gen_random_uuid(), reference text not null references public.crm_enquiries(reference),
 event text not null check(event in ('requested','confirmed')), status text not null default 'pending' check(status in ('pending','mock_delivered','delivered','failed')),
 attempts integer not null default 0, created_at timestamptz not null default now(), unique(reference,event)
);
alter table public.crm_founders enable row level security;
alter table public.crm_notification_outbox enable row level security;
revoke all on public.crm_founders,public.crm_notification_outbox from public,anon,authenticated;
grant select on public.crm_founders to service_role;
grant select,insert,update on public.crm_notification_outbox to service_role;
grant update on public.crm_enquiries to service_role;
-- Row-share lock protects route activation throughout request acceptance.
grant update (enabled) on public.crm_enquiry_routes to service_role;
grant update (booking_enabled) on public.crm_clinics to service_role;

create function public.crm_request_slot(request_id uuid, slot uuid, patient text, phone text, contact_email text, consent boolean)
returns text language plpgsql security invoker set search_path='' as $$
declare s public.crm_slots; r public.crm_enquiry_routes; e public.crm_enquiries; ref text;
begin
 if request_id is null or slot is null or consent is distinct from true or patient is null or length(btrim(patient)) not between 1 and 100
 or phone is null or phone !~ '^\+91[6-9][0-9]{9}$' or length(coalesce(contact_email,''))>254
 or (coalesce(contact_email,'')<>'' and contact_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$') then
 raise exception using errcode='PT400',message='Check contact details and consent'; end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('booking-request:'||request_id,0));
 select * into e from public.crm_enquiries where request_key=request_id;
 if found then
 if e.requested_slot_id<>slot or e.patient_name<>btrim(patient) or e.mobile<>phone or coalesce(e.email,'')<>coalesce(contact_email,'') then
 raise exception using errcode='PT409',message='Request key already used'; end if; return e.reference; end if;
 perform 1 from public.crm_clinics c join public.crm_slots sl on sl.clinic_id=c.id where sl.id=slot and c.booking_enabled for share of c;
 if not found then raise exception using errcode='PT409',message='Clinic unavailable';end if;
 select * into s from public.crm_slots where id=slot for update;
 if not found or s.provider_id is null or s.blocked or s.starts_at<=clock_timestamp()
 or not exists(select 1 from public.crm_clinics where id=s.clinic_id and booking_enabled)
 or exists(select 1 from public.crm_bookings where slot_id=slot and status<>'cancelled') then
 raise exception using errcode='PT409',message='Slot unavailable'; end if;
 select * into r from public.crm_enquiry_routes where clinic_id=s.clinic_id and provider_id=s.provider_id and enabled order by city,facility limit 1 for share;
 if not found then raise exception using errcode='PT409',message='Practice has not enabled requests';end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('booking-phone:'||phone,0));
 if (select count(*) from public.crm_enquiries where mobile=phone and consented_at>clock_timestamp()-interval '1 hour')>=3 then
 raise exception using errcode='PT429',message='Please wait before requesting again';end if;
 ref:='DV-'||upper(replace(request_id::text,'-',''));
 insert into public.crm_enquiries(reference,clinic_id,provider_id,city,facility,patient_name,mobile,email,requested_slot_id,request_key)
 values(ref,s.clinic_id,s.provider_id,r.city,r.facility,btrim(patient),phone,nullif(contact_email,''),slot,request_id);
 insert into public.crm_notification_outbox(reference,event) values(ref,'requested');
 return ref;
end;$$;

create or replace function public.crm_book_enquiry(actor uuid, clinic uuid, ref text, slot uuid)
returns uuid language plpgsql security invoker set search_path='' as $$
declare e public.crm_enquiries; s public.crm_slots; booked uuid;
begin
 perform 1 from public.crm_staff where user_id=actor and clinic_id=clinic and role in ('owner','clinic_admin','manager','receptionist','scheduler') for share;
 if not found then raise exception using errcode='PT403',message='Scheduling access required';end if;
 select * into e from public.crm_enquiries where reference=ref and clinic_id=clinic for update;
 if not found then raise exception using errcode='PT404',message='Enquiry not found';end if;
 if e.booking_id is not null then
 if exists(select 1 from public.crm_bookings where id=e.booking_id and original_slot_id=slot and status='confirmed') then return e.booking_id;end if;
 raise exception using errcode='PT409',message='Enquiry already booked';end if;
 if e.status='closed' then raise exception using errcode='PT409',message='Enquiry closed';end if;
 perform 1 from public.crm_clinics where id=clinic and booking_enabled for share;
 if not found then raise exception using errcode='PT409',message='Clinic unavailable';end if;
 select * into s from public.crm_slots where id=slot and clinic_id=clinic for update;
 if not found or s.blocked or s.starts_at<=clock_timestamp() or (s.provider_id is not null and s.provider_id<>e.provider_id)
 or (e.requested_slot_id is not null and e.requested_slot_id<>slot)
 or not exists(select 1 from public.crm_clinics where id=clinic and booking_enabled)
 or exists(select 1 from public.crm_bookings where slot_id=slot and status<>'cancelled') then
 raise exception using errcode='PT409',message='Slot unavailable or provider mismatch';end if;
 if s.provider_id is not null then
 perform 1 from public.crm_enquiry_routes where provider_id=e.provider_id and clinic_id=clinic and city=e.city and facility=e.facility and enabled for share;
 if not found then raise exception using errcode='PT409',message='Practice requests disabled';end if;
 end if;
 insert into public.crm_bookings(slot_id,original_slot_id,request_key,fee_paise) values(slot,slot,gen_random_uuid(),s.fee_paise) returning id into booked;
 update public.crm_enquiries set booking_id=booked,status='closed',updated_at=clock_timestamp() where reference=ref;
 insert into public.crm_enquiry_events(reference,actor_id,status) values(ref,actor,'closed');
 insert into public.crm_notification_outbox(reference,event) values(ref,'confirmed');
 return booked;
end;$$;
revoke all on function public.crm_request_slot(uuid,uuid,text,text,text,boolean) from public,anon,authenticated;
grant execute on function public.crm_request_slot(uuid,uuid,text,text,text,boolean) to service_role;
create function public.crm_mock_notifications() returns integer language plpgsql security invoker set search_path='' as $$
declare processed integer;
begin
 with pending as (select id from public.crm_notification_outbox where status='pending' order by created_at,id limit 100 for update skip locked)
 update public.crm_notification_outbox n set status='mock_delivered',attempts=attempts+1 from pending where n.id=pending.id;
 get diagnostics processed=row_count; return processed;
end;$$;
revoke all on function public.crm_mock_notifications() from public,anon,authenticated;
grant execute on function public.crm_mock_notifications() to service_role;
commit;
