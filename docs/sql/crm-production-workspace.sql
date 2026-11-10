-- Production workspace. No clinic, user, patient, consent or doctor data is seeded.
alter table public.crm_clinics add column city text not null default '', add column address text not null default '';
alter table public.crm_staff add column active boolean not null default true,
 add column doctor_id uuid references public.crm_doctor_roster(id);
alter table public.crm_doctor_roster add column provider_id text references public.docvy_directory_providers(provider_id);
create unique index crm_roster_provider on public.crm_doctor_roster(provider_id) where provider_id is not null;
alter table public.crm_slots add column doctor_id uuid references public.crm_doctor_roster(id);
alter table public.crm_slots drop constraint crm_slots_clinic_time_excl;
alter table public.crm_slots add constraint crm_slots_doctor_time_excl exclude using gist
 (clinic_id with =, (coalesce(doctor_id,clinic_id)) with =, tstzrange(starts_at,ends_at) with &&);

create table docvy_private.crm_patients (
 id uuid primary key default gen_random_uuid(), clinic_id uuid not null references public.crm_clinics(id),
 name text not null check(length(btrim(name)) between 2 and 100),
 phone text check(phone ~ '^\+91[6-9][0-9]{9}$'), deleted_at timestamptz,
 email text check(email is null or (length(email)<=254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$')),
 consented_at timestamptz not null, created_by uuid not null references auth.users(id),
 created_at timestamptz not null default now(), unique(clinic_id,phone,name)
);
alter table docvy_private.crm_patients enable row level security;
alter table public.crm_bookings add column patient_id uuid references docvy_private.crm_patients(id),
 add column directory_request_id uuid unique references public.docvy_directory_requests(request_id);
create table docvy_private.crm_payments (
 id uuid primary key, clinic_id uuid not null references public.crm_clinics(id),
 booking_id uuid not null references public.crm_bookings(id), amount_paise integer not null check(amount_paise between 1 and 10000000),
 kind text not null check(kind in ('payment','refund')), method text not null check(method in ('cash','upi','card','bank')),
 created_by uuid not null references auth.users(id), created_at timestamptz not null default now()
);
alter table docvy_private.crm_payments enable row level security;
create index crm_payments_booking on docvy_private.crm_payments(booking_id,created_at);
create table docvy_private.crm_invites (
 clinic_id uuid not null references public.crm_clinics(id), email text not null check(email=lower(btrim(email))),
 role text not null check(role in ('owner','clinic_admin','manager','receptionist','doctor','viewer')),
 doctor_id uuid references public.crm_doctor_roster(id), created_by uuid not null references auth.users(id),
 created_at timestamptz not null default now(), expires_at timestamptz not null default now()+interval '7 days',
 accepted_at timestamptz, primary key(clinic_id,email)
);
alter table docvy_private.crm_invites enable row level security;
create table docvy_private.crm_audit (
 id bigint generated always as identity primary key, clinic_id uuid references public.crm_clinics(id),
 actor_id uuid not null references auth.users(id), action text not null, entity_id text,
 created_at timestamptz not null default now()
);
alter table docvy_private.crm_audit enable row level security;
create index crm_audit_clinic on docvy_private.crm_audit(clinic_id,created_at desc);
revoke all on docvy_private.crm_patients,docvy_private.crm_payments,docvy_private.crm_invites,docvy_private.crm_audit from public,anon,authenticated;

create function docvy_private.crm_workspace(operation text,clinic uuid,data jsonb) returns jsonb
language plpgsql security definer set search_path='' as $$
declare
 actor uuid := auth.uid(); actor_email text; platform boolean; membership public.crm_staff; result jsonb;
 entity uuid; other uuid; patient uuid; selected public.crm_slots; booked public.crm_bookings;
 role_name text; label text; contact_phone text; target_email text; starts timestamptz; ends timestamptz;
 amount integer; paid bigint; new_clinic uuid; new_org uuid; new_branch uuid; begin_at timestamptz; end_at timestamptz;
 can_schedule boolean; can_manage boolean; request_row public.docvy_directory_requests; profile public.docvy_directory_providers;
begin
 if actor is null or not exists(select 1 from auth.sessions s where s.id::text=auth.jwt()->>'session_id' and s.user_id=actor and s.created_at>now()-interval '8 hours' and (s.not_after is null or s.not_after>now())) then
  raise exception using errcode='PT401',message='Sign in again to continue';
 end if;
 select lower(u.email) into actor_email from auth.users u where u.id=actor and u.email_confirmed_at is not null and coalesce(u.is_anonymous,false)=false;
 if actor_email is null then raise exception using errcode='PT403',message='Confirm your work email first'; end if;
 platform := exists(select 1 from docvy_private.directory_admins a where a.email=actor_email);

 if operation='accept-invites' then
  insert into public.crm_staff(user_id,clinic_id,role,doctor_id)
   select actor,i.clinic_id,i.role,i.doctor_id from docvy_private.crm_invites i
    where i.email=actor_email and i.accepted_at is null and i.expires_at>now()
   on conflict(user_id,clinic_id) do nothing;
  update docvy_private.crm_invites set accepted_at=now() where email=actor_email and accepted_at is null and expires_at>now();
  return jsonb_build_object('ok',true);
 end if;

 if operation='create-clinic' then
  if not platform then raise exception using errcode='PT403',message='DOCVY owner access required'; end if;
  if data->>'authority' is distinct from 'true' or coalesce(length(btrim(data->>'name')),0) not between 2 and 100 or coalesce(length(btrim(data->>'city')),0) not between 2 and 60 or coalesce(length(btrim(data->>'address')),0) not between 5 and 300 then
   raise exception using errcode='PT400',message='Enter clinic name, city, full address and your authority';
  end if;
  new_clinic:=(data->>'requestId')::uuid;
  if exists(select 1 from public.crm_clinics c join public.crm_staff s on s.clinic_id=c.id where c.id=new_clinic and s.user_id=actor) then return jsonb_build_object('id',new_clinic); end if;
  new_org:=gen_random_uuid(); new_branch:=gen_random_uuid();
  insert into public.organisations(id,name,slug,organisation_type) values(new_org,btrim(data->>'name'),'clinic-'||new_clinic::text,'clinic');
  insert into public.branches(id,organisation_id,name,slug) values(new_branch,new_org,btrim(data->>'name'),'branch-'||new_clinic::text);
  insert into public.crm_clinics(id,branch_id,slug,name,city,address,booking_enabled) values(new_clinic,new_branch,'clinic-'||new_clinic::text,btrim(data->>'name'),btrim(data->>'city'),btrim(data->>'address'),false);
  insert into public.crm_staff(user_id,clinic_id,role) values(actor,new_clinic,'owner');
  insert into docvy_private.crm_audit(clinic_id,actor_id,action,entity_id) values(new_clinic,actor,'clinic-created',new_clinic::text);
  return jsonb_build_object('id',new_clinic);
 end if;

 if clinic is not null then
  select * into membership from public.crm_staff s where s.user_id=actor and s.clinic_id=clinic and s.active for share;
  if not found and not platform then raise exception using errcode='PT403',message='No access to this clinic'; end if;
  if not exists(select 1 from public.crm_clinics c where c.id=clinic) then raise exception using errcode='PT404',message='Clinic not found'; end if;
 end if;
 can_schedule:=platform or coalesce(membership.role in ('owner','clinic_admin','manager','receptionist','scheduler'),false);
 can_manage:=platform or coalesce(membership.role in ('owner','clinic_admin'),false);

 if operation='state' then
  result:=jsonb_build_object('email',actor_email,'platformAdmin',platform,'clinics',coalesce((select jsonb_agg(jsonb_build_object('id',c.id,'name',c.name,'city',c.city,'address',c.address,'role',coalesce(s.role,'platform_admin')) order by c.name) from public.crm_clinics c left join public.crm_staff s on s.clinic_id=c.id and s.user_id=actor and s.active where platform or s.user_id is not null),'[]'::jsonb));
  if clinic is null then return result; end if;
  begin_at:=coalesce((data->>'day')::date,(now() at time zone 'Asia/Kolkata')::date)::timestamp at time zone 'Asia/Kolkata';
  if coalesce((data->>'days')::integer,7) not in (1,7,30) then raise exception using errcode='PT400',message='Choose day, week or month'; end if;
  end_at:=begin_at+make_interval(days=>coalesce((data->>'days')::integer,7));
  return result || jsonb_build_object('role',coalesce(membership.role,'platform_admin'),'canSchedule',can_schedule,'canManage',can_manage,
   'summary',jsonb_build_object(
    'appointmentCount',(select count(*) from public.crm_bookings b join public.crm_slots s on s.id=b.slot_id where s.clinic_id=clinic and s.starts_at>=begin_at and s.starts_at<end_at and b.status<>'cancelled' and (membership.role is distinct from 'doctor' or s.doctor_id=membership.doctor_id)),
    'cancelledCount',(select count(*) from public.crm_bookings b join public.crm_slots s on s.id=b.slot_id where s.clinic_id=clinic and s.starts_at>=begin_at and s.starts_at<end_at and b.status='cancelled' and (membership.role is distinct from 'doctor' or s.doctor_id=membership.doctor_id)),
    'feePaise',case when can_schedule then (select coalesce(sum(b.fee_paise),0) from public.crm_bookings b join public.crm_slots s on s.id=b.slot_id where s.clinic_id=clinic and s.starts_at>=begin_at and s.starts_at<end_at and b.status<>'cancelled') end,
    'netReceiptsPaise',case when can_schedule then (select coalesce(sum(case when m.kind='payment' then m.amount_paise else -m.amount_paise end),0) from docvy_private.crm_payments m where m.clinic_id=clinic and m.created_at>=begin_at and m.created_at<end_at) end,
    'daily',coalesce((select jsonb_agg(to_jsonb(v)) from (select (s.starts_at at time zone 'Asia/Kolkata')::date as day,count(*) as count from public.crm_bookings b join public.crm_slots s on s.id=b.slot_id where s.clinic_id=clinic and s.starts_at>=begin_at and s.starts_at<end_at and b.status<>'cancelled' and (membership.role is distinct from 'doctor' or s.doctor_id=membership.doctor_id) group by 1 order by 1) v),'[]'::jsonb)),
   'doctors',coalesce((select jsonb_agg(jsonb_build_object('id',d.id,'name',d.name,'specialty',d.specialty,'present',d.present,'providerId',d.provider_id) order by d.name) from public.crm_doctor_roster d where d.clinic_id=clinic),'[]'::jsonb),
   'slots',coalesce((select jsonb_agg(jsonb_build_object('id',s.id,'startsAt',s.starts_at,'endsAt',s.ends_at,'blocked',s.blocked,'doctorId',s.doctor_id,'bookingId',b.id,'status',b.status,'patientId',case when can_schedule or membership.role='doctor' then b.patient_id end,'patientName',case when can_schedule or membership.role='doctor' then p.name end,'feePaise',case when can_schedule then b.fee_paise end,'paidPaise',case when can_schedule then coalesce((select sum(case when m.kind='payment' then m.amount_paise else -m.amount_paise end) from docvy_private.crm_payments m where m.booking_id=b.id),0) end) order by s.starts_at,s.id)
    from public.crm_slots s left join public.crm_bookings b on b.slot_id=s.id and b.status<>'cancelled' left join docvy_private.crm_patients p on p.id=b.patient_id
    where s.clinic_id=clinic and s.starts_at>=begin_at and s.starts_at<end_at and (membership.role is distinct from 'doctor' or s.doctor_id=membership.doctor_id)),'[]'::jsonb),
   'appointments',coalesce((select jsonb_agg(to_jsonb(a)) from (select b.id,b.slot_id,b.status,b.created_at,s.starts_at,s.ends_at,s.doctor_id,case when can_schedule or membership.role='doctor' then p.name end as patient_name,case when can_schedule then b.fee_paise end as fee_paise,case when can_schedule then coalesce((select sum(case when m.kind='payment' then m.amount_paise else -m.amount_paise end) from docvy_private.crm_payments m where m.booking_id=b.id),0) end as paid_paise from public.crm_bookings b join public.crm_slots s on s.id=b.slot_id left join docvy_private.crm_patients p on p.id=b.patient_id where s.clinic_id=clinic and s.starts_at>=begin_at and s.starts_at<end_at and (membership.role is distinct from 'doctor' or s.doctor_id=membership.doctor_id) order by s.starts_at desc limit 500) a),'[]'::jsonb),
   'patients',case when can_schedule or membership.role='doctor' then coalesce((select jsonb_agg(to_jsonb(p) - 'created_by' - 'consented_at') from (select p.id,p.name,p.phone,p.email,p.created_at from docvy_private.crm_patients p where p.clinic_id=clinic and p.deleted_at is null and (membership.role is distinct from 'doctor' or exists(select 1 from public.crm_bookings b join public.crm_slots s on s.id=b.slot_id where b.patient_id=p.id and s.doctor_id=membership.doctor_id and s.clinic_id=clinic)) order by p.name limit 200) p),'[]'::jsonb) else '[]'::jsonb end,
   'leads',case when can_schedule then coalesce((select jsonb_agg(to_jsonb(e)) from (select r.request_id as id,r.reference,r.request_data->>'name' as name,r.contact_phone as phone,r.request_data->>'email' as email,r.request_data->>'requestedDate' as date,r.request_data->>'requestedTime' as time,r.status,r.provider_id,r.created_at from public.docvy_directory_requests r join public.crm_doctor_roster d on d.provider_id=r.provider_id join public.docvy_directory_providers dp on dp.provider_id=d.provider_id join public.crm_clinics c on c.id=d.clinic_id where d.clinic_id=clinic and lower(r.request_data->>'city')=lower(c.city) and lower(r.request_data->>'facility')=lower(c.name) and dp.published and dp.consent_given and dp.profile_status in ('claimed','verified') and not exists(select 1 from public.crm_bookings b where b.directory_request_id=r.request_id) order by r.created_at desc limit 100) e),'[]'::jsonb) else '[]'::jsonb end,
   'team',case when can_manage then coalesce((select jsonb_agg(to_jsonb(t)) from (select s.user_id as id,u.email,s.role,s.active,s.doctor_id from public.crm_staff s join auth.users u on u.id=s.user_id where s.clinic_id=clinic order by u.email) t),'[]'::jsonb) else '[]'::jsonb end,
   'invites',case when can_manage then coalesce((select jsonb_agg(jsonb_build_object('email',i.email,'role',i.role,'expiresAt',i.expires_at,'acceptedAt',i.accepted_at)) from docvy_private.crm_invites i where i.clinic_id=clinic),'[]'::jsonb) else '[]'::jsonb end,
   'audit',case when can_manage then coalesce((select jsonb_agg(to_jsonb(a)) from (select a.action,a.entity_id,a.created_at from docvy_private.crm_audit a where a.clinic_id=clinic order by a.id desc limit 50) a),'[]'::jsonb) else '[]'::jsonb end,
   'payments',case when can_schedule then coalesce((select jsonb_agg(to_jsonb(m)) from (select m.id,m.booking_id,m.amount_paise,m.kind,m.method,m.created_at from docvy_private.crm_payments m where m.clinic_id=clinic and m.created_at>=begin_at and m.created_at<end_at order by m.created_at desc limit 200) m),'[]'::jsonb) else '[]'::jsonb end);
 end if;

 if clinic is null then raise exception using errcode='PT400',message='Choose a clinic'; end if;
 if operation='patient-search' then
  if not can_schedule and membership.role is distinct from 'doctor' then raise exception using errcode='PT403',message='Patient contact access required';end if;
  if coalesce(length(btrim(data->>'query')),0) not between 2 and 100 then raise exception using errcode='PT400',message='Enter 2–100 characters to search';end if;
  return coalesce((select jsonb_agg(to_jsonb(p)) from (select p.id,p.name,p.phone,p.email,p.created_at from docvy_private.crm_patients p where p.clinic_id=clinic and p.deleted_at is null and position(lower(btrim(data->>'query')) in lower(p.name||' '||p.phone||' '||coalesce(p.email,'')))>0 and (membership.role is distinct from 'doctor' or exists(select 1 from public.crm_bookings b join public.crm_slots s on s.id=b.slot_id where b.patient_id=p.id and s.clinic_id=clinic and s.doctor_id=membership.doctor_id)) order by p.name limit 100) p),'[]'::jsonb);
 end if;
 if operation in ('add-doctor','link-provider','invite','staff-access','patient-delete') then
  if not can_manage then raise exception using errcode='PT403',message='Clinic administrator access required'; end if;
 elsif not can_schedule then raise exception using errcode='PT403',message='Scheduling access required'; end if;

 if operation='link-provider' then
  if not platform then raise exception using errcode='PT403',message='DOCVY owner approval is required to link website requests';end if;
  entity:=(data->>'doctorId')::uuid;
  select d.name into label from public.crm_doctor_roster d where d.id=entity and d.clinic_id=clinic for update;
  if not found then raise exception using errcode='PT404',message='Clinic doctor not found';end if;
  if nullif(data->>'providerId','') is not null then
   select * into profile from public.docvy_directory_providers p where p.provider_id=data->>'providerId' and p.published and p.consent_given and p.profile_status in ('claimed','verified');
   if not found then raise exception using errcode='PT409',message='Approve provider consent first';end if;
   if lower(profile.doctor_name)<>lower(label) or not exists(select 1 from public.crm_clinics c where c.id=clinic and lower(c.name)=lower(profile.facility) and lower(c.city)=lower(profile.city)) then raise exception using errcode='PT409',message='Doctor name, clinic and city must match the approved practice';end if;
  end if;
  update public.crm_doctor_roster set provider_id=nullif(data->>'providerId','') where id=entity and clinic_id=clinic;
 elsif operation='add-doctor' then
  label:=btrim(data->>'name');
  if coalesce(length(label),0) not between 2 and 100 or coalesce(length(btrim(data->>'specialty')),0) not between 2 and 80 then raise exception using errcode='PT400',message='Enter doctor name and specialty'; end if;
  if nullif(data->>'providerId','') is not null then
   if not platform then raise exception using errcode='PT403',message='DOCVY must approve directory routing'; end if;
   select * into profile from public.docvy_directory_providers p where p.provider_id=data->>'providerId' and p.published and p.consent_given and p.profile_status in ('claimed','verified');
   if not found then raise exception using errcode='PT409',message='Approve the provider consent before linking website requests'; end if;
   if lower(label)<>lower(profile.doctor_name) then raise exception using errcode='PT400',message='Use the approved directory name'; end if;
   if not exists(select 1 from public.crm_clinics c where c.id=clinic and lower(c.name)=lower(profile.facility) and lower(c.city)=lower(profile.city)) then raise exception using errcode='PT409',message='The clinic name and city must match the approved directory practice'; end if;
  end if;
  insert into public.crm_doctor_roster(clinic_id,name,specialty,provider_id) values(clinic,label,btrim(data->>'specialty'),nullif(data->>'providerId','')) returning id into entity;
 elsif operation='presence' then
  perform public.crm_change_doctor_presence(actor,clinic,(data->>'doctorId')::uuid,(data->>'present')::boolean); entity:=(data->>'doctorId')::uuid;
 elsif operation in ('patient','patient-update') then
  if data->>'consent' is distinct from 'true' then raise exception using errcode='PT400',message='Record patient permission before saving contact details'; end if;
  label:=btrim(data->>'name'); contact_phone:=btrim(data->>'phone');
  if contact_phone ~ '^[6-9][0-9]{9}$' then contact_phone:='+91'||contact_phone; end if;
  if contact_phone is null then raise exception using errcode='PT400',message='Enter the patient phone number'; end if;
  if operation='patient-update' then
   entity:=(data->>'patientId')::uuid;
   update docvy_private.crm_patients set name=label,phone=contact_phone,email=nullif(lower(btrim(data->>'email')),''),consented_at=now() where id=entity and clinic_id=clinic and deleted_at is null;
   if not found then raise exception using errcode='PT404',message='Patient not found';end if;
  else
   insert into docvy_private.crm_patients(clinic_id,name,phone,email,consented_at,created_by) values(clinic,label,contact_phone,nullif(lower(btrim(data->>'email')),''),now(),actor)
    on conflict on constraint crm_patients_clinic_id_phone_name_key do update set email=coalesce(excluded.email,crm_patients.email) returning id into entity;
  end if;
 elsif operation='patient-delete' then
  if data->>'confirmed' is distinct from 'true' then raise exception using errcode='PT400',message='Verify the deletion request before removing contact details'; end if;
  entity:=(data->>'patientId')::uuid;
  update docvy_private.crm_patients set name='Removed patient',phone=null,email=null,deleted_at=now() where id=entity and clinic_id=clinic;
  if not found then raise exception using errcode='PT404',message='Patient not found'; end if;
 elsif operation='slot' then
  entity:=(data->>'doctorId')::uuid; starts:=(data->>'startsAt')::timestamptz; ends:=(data->>'endsAt')::timestamptz;
  if not exists(select 1 from public.crm_doctor_roster d where d.id=entity and d.clinic_id=clinic) then raise exception using errcode='PT404',message='Choose a clinic doctor'; end if;
  if starts is null or ends is null or starts<=now() or starts>now()+interval '365 days' or ends-starts not between interval '5 minutes' and interval '4 hours' then raise exception using errcode='PT400',message='Choose a future slot lasting 5 minutes to 4 hours'; end if;
  insert into public.crm_slots(clinic_id,doctor_id,starts_at,ends_at) values(clinic,entity,starts,ends) returning id into entity;
 elsif operation='block' then
  perform public.crm_set_block(actor,clinic,(data->>'slotId')::uuid,(data->>'blocked')::boolean); entity:=(data->>'slotId')::uuid;
 elsif operation='book' then
  entity:=(data->>'requestId')::uuid; patient:=(data->>'patientId')::uuid;
  if data->>'confirmed' is distinct from 'true' then raise exception using errcode='PT400',message='Confirm the appointment with the patient before booking'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(entity::text,0));
  select * into booked from public.crm_bookings b where b.request_key=entity;
  if found then
   if booked.original_slot_id<>(data->>'slotId')::uuid or booked.patient_id is distinct from patient or booked.directory_request_id is distinct from nullif(data->>'leadId','')::uuid or booked.fee_paise is distinct from (data->>'feePaise')::integer or not exists(select 1 from public.crm_slots s where s.id=booked.slot_id and s.clinic_id=clinic) then raise exception using errcode='PT409',message='Request reference already used'; end if;
   return jsonb_build_object('id',booked.id);
  end if;
  if not exists(select 1 from docvy_private.crm_patients p where p.id=patient and p.clinic_id=clinic and p.deleted_at is null) then raise exception using errcode='PT404',message='Patient not found in this clinic'; end if;
  select * into selected from public.crm_slots s where s.id=(data->>'slotId')::uuid and s.clinic_id=clinic for update;
  if not found or selected.blocked or selected.starts_at<=now() or exists(select 1 from public.crm_bookings b where b.slot_id=selected.id and b.status<>'cancelled') then raise exception using errcode='PT409',message='Slot is no longer available'; end if;
  amount:=(data->>'feePaise')::integer;
  if amount is null or amount not between 0 and 10000000 then raise exception using errcode='PT400',message='Enter an agreed fee'; end if;
  other:=nullif(data->>'leadId','')::uuid;
  if other is not null then
   select r.* into request_row from public.docvy_directory_requests r join public.crm_doctor_roster d on d.provider_id=r.provider_id join public.docvy_directory_providers dp on dp.provider_id=d.provider_id
    where r.request_id=other and r.status in ('requested','contacted') and d.id=selected.doctor_id and d.clinic_id=clinic and dp.published and dp.consent_given and dp.profile_status in ('claimed','verified') and exists(select 1 from public.crm_clinics c where c.id=clinic and lower(c.city)=lower(r.request_data->>'city') and lower(c.name)=lower(r.request_data->>'facility')) for update of r;
   if not found or request_row.contact_phone<>(select p.phone from docvy_private.crm_patients p where p.id=patient) then raise exception using errcode='PT409',message='Request does not match this doctor and patient'; end if;
  end if;
  insert into public.crm_bookings(slot_id,original_slot_id,request_key,patient_id,fee_paise,directory_request_id) values(selected.id,selected.id,entity,patient,amount,other) returning id into entity;
  if other is not null then update public.docvy_directory_requests set status='provider-confirmed' where request_id=other;end if;
 elsif operation='lead-status' then
  if data->>'status' is null or data->>'status' not in ('contacted','declined') then raise exception using errcode='PT400',message='Choose contacted or declined';end if;
  entity:=(data->>'leadId')::uuid;
  update public.docvy_directory_requests r set status=data->>'status'
   where r.request_id=entity and r.status in ('requested','contacted') and exists(select 1 from public.crm_doctor_roster d join public.crm_clinics c on c.id=d.clinic_id join public.docvy_directory_providers p on p.provider_id=d.provider_id where d.clinic_id=clinic and d.provider_id=r.provider_id and lower(c.city)=lower(r.request_data->>'city') and lower(c.name)=lower(r.request_data->>'facility') and p.consent_given and p.profile_status in ('claimed','verified'));
  if not found then raise exception using errcode='PT409',message='Request changed or is not routed to this clinic';end if;
 elsif operation='booking-status' then
  entity:=(data->>'bookingId')::uuid; perform public.crm_transition_booking(actor,clinic,entity,data->>'status');
  if data->>'status'='cancelled' then update public.docvy_directory_requests r set status='cancelled' from public.crm_bookings b where b.id=entity and r.request_id=b.directory_request_id;end if;
 elsif operation='reschedule' then
  entity:=(data->>'bookingId')::uuid;
  if not exists(select 1 from public.crm_slots a join public.crm_slots b on b.id=(data->>'destinationId')::uuid where a.id=(data->>'sourceId')::uuid and a.clinic_id=clinic and b.clinic_id=clinic and a.doctor_id=b.doctor_id) then raise exception using errcode='PT409',message='Choose an available slot for the same doctor'; end if;
  perform public.crm_reschedule_booking(actor,clinic,entity,(data->>'sourceId')::uuid,(data->>'destinationId')::uuid);
 elsif operation='payment' then
  entity:=(data->>'requestId')::uuid; other:=(data->>'bookingId')::uuid; amount:=(data->>'amountPaise')::integer;
  select b.* into booked from public.crm_bookings b join public.crm_slots s on s.id=b.slot_id where b.id=other and s.clinic_id=clinic for update of b;
  if not found then raise exception using errcode='PT404',message='Appointment not found'; end if;
  if exists(select 1 from docvy_private.crm_payments m where m.id=entity and m.clinic_id=clinic and m.booking_id=other and m.amount_paise=amount and m.kind=data->>'kind' and m.method=data->>'method') then return jsonb_build_object('id',entity); end if;
  select coalesce(sum(case when m.kind='payment' then m.amount_paise else -m.amount_paise end),0) into paid from docvy_private.crm_payments m where m.booking_id=other;
  if amount is null or amount<=0 or (data->>'kind'='refund' and amount>paid) or (data->>'kind'='payment' and (booked.status='cancelled' or paid+amount>coalesce(booked.fee_paise,0))) then raise exception using errcode='PT409',message='Amount exceeds the recorded balance or refundable payment'; end if;
  insert into docvy_private.crm_payments(id,clinic_id,booking_id,amount_paise,kind,method,created_by) values(entity,clinic,other,amount,data->>'kind',data->>'method',actor);
 elsif operation='invite' then
  target_email:=lower(btrim(data->>'email')); role_name:=data->>'role'; entity:=nullif(data->>'doctorId','')::uuid;
  if target_email is null or length(target_email)>254 or target_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' or role_name is null or role_name not in ('owner','clinic_admin','manager','receptionist','doctor','viewer') then raise exception using errcode='PT400',message='Enter work email and a valid role'; end if;
  if role_name in ('owner','clinic_admin') and not platform and membership.role<>'owner' then raise exception using errcode='PT403',message='Only an owner can grant administrator access'; end if;
  if role_name='doctor' and not exists(select 1 from public.crm_doctor_roster d where d.id=entity and d.clinic_id=clinic) then raise exception using errcode='PT400',message='Link the doctor role to a clinic doctor'; end if;
  if exists(select 1 from public.crm_staff s join auth.users u on u.id=s.user_id where s.clinic_id=clinic and lower(u.email)=target_email) then raise exception using errcode='PT409',message='This person is already on the team'; end if;
  insert into docvy_private.crm_invites(clinic_id,email,role,doctor_id,created_by) values(clinic,target_email,role_name,case when role_name='doctor' then entity end,actor)
   on conflict(clinic_id,email) do update set role=excluded.role,doctor_id=excluded.doctor_id,created_by=actor,created_at=now(),expires_at=now()+interval '7 days',accepted_at=null;
  entity:=null;
 elsif operation='staff-access' then
  entity:=(data->>'userId')::uuid;
  if not platform and membership.role<>'owner' then raise exception using errcode='PT403',message='Owner access required'; end if;
  if entity=actor or exists(select 1 from public.crm_staff s where s.clinic_id=clinic and s.user_id=entity and s.role='owner') then raise exception using errcode='PT409',message='Owner access cannot be removed here'; end if;
  update public.crm_staff set active=(data->>'active')::boolean where clinic_id=clinic and user_id=entity;
  if not found then raise exception using errcode='PT404',message='Team member not found'; end if;
 else raise exception using errcode='PT400',message='Unknown workspace operation';
 end if;
 insert into docvy_private.crm_audit(clinic_id,actor_id,action,entity_id) values(clinic,actor,operation,entity::text);
 return jsonb_build_object('id',entity,'ok',true);
exception
 when invalid_text_representation or datetime_field_overflow or invalid_datetime_format or not_null_violation or check_violation then raise exception using errcode='PT400',message='Check the form fields and try again';
 when unique_violation or exclusion_violation then raise exception using errcode='PT409',message='This record or time is already in use; refresh before retrying';
end;
$$;
revoke all on function docvy_private.crm_workspace(text,uuid,jsonb) from public,anon,authenticated;
grant usage on schema docvy_private to authenticated;
grant execute on function docvy_private.crm_workspace(text,uuid,jsonb) to authenticated;
create function public.docvy_crm(p_operation text,p_clinic uuid default null,p_data jsonb default '{}') returns jsonb
language sql security invoker set search_path='' as $$ select docvy_private.crm_workspace(p_operation,p_clinic,p_data); $$;
revoke all on function public.docvy_crm(text,uuid,jsonb) from public,anon;
grant execute on function public.docvy_crm(text,uuid,jsonb) to authenticated;
