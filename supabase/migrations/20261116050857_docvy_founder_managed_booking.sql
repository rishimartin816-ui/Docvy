-- Founder-led launch: reserve in the existing DOCVY case ledger, without clinic CRM accounts.
begin;
create function public.docvy_booking_guard_case_capacity() returns trigger
language plpgsql security invoker set search_path='' as $$
begin
 if new.confirmed_starts_at is null or new.status in ('requested','cancelled','declined','expired') then return new;end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('doctor-schedule:'||new.provider_id,0));
 if exists(select 1 from public.docvy_booking_cases c where c.provider_id=new.provider_id and c.id<>new.id
   and c.confirmed_starts_at is not null and c.status not in ('requested','cancelled','declined','expired')
   and tstzrange(c.confirmed_starts_at,c.confirmed_starts_at+interval '60 minutes','[)') && tstzrange(new.confirmed_starts_at,new.confirmed_starts_at+interval '60 minutes','[)'))
 or exists(select 1 from public.crm_bookings b join public.crm_slots s on s.id=b.slot_id join public.crm_doctor_roster r on r.id=s.doctor_id
   where r.provider_id=new.provider_id and b.status<>'cancelled' and b.id is distinct from new.crm_booking_id
   and tstzrange(s.starts_at,s.ends_at+interval '30 minutes','[)') && tstzrange(new.confirmed_starts_at,new.confirmed_starts_at+interval '60 minutes','[)')) then
  raise exception 'doctor_already_reserved_or_gap_too_short';
 end if;
 return new;
end;$$;
revoke all on function public.docvy_booking_guard_case_capacity() from public,anon,authenticated;
create trigger docvy_booking_case_capacity before insert or update of confirmed_starts_at,status on public.docvy_booking_cases for each row execute function public.docvy_booking_guard_case_capacity();

-- The same provider lock protects legacy/instant CRM writes against founder-led reservations.
create function public.docvy_booking_guard_crm_capacity() returns trigger
language plpgsql security invoker set search_path='' as $$
declare provider text; starts timestamptz; ends timestamptz;
begin
 if new.status='cancelled' then return new;end if;
 select r.provider_id,s.starts_at,s.ends_at into provider,starts,ends from public.crm_slots s join public.crm_doctor_roster r on r.id=s.doctor_id where s.id=new.slot_id;
 if provider is null then return new;end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('doctor-schedule:'||provider,0));
 if exists(select 1 from public.docvy_booking_cases c where c.provider_id=provider and c.crm_booking_id is distinct from new.id
  and c.confirmed_starts_at is not null and c.status not in ('requested','cancelled','declined','expired')
  and tstzrange(c.confirmed_starts_at,c.confirmed_starts_at+interval '60 minutes','[)') && tstzrange(starts,ends+interval '30 minutes','[)')) then raise exception 'doctor_already_reserved_in_docvy';end if;
 return new;
end;$$;
revoke all on function public.docvy_booking_guard_crm_capacity() from public,anon,authenticated;
create trigger docvy_booking_crm_capacity before insert or update of slot_id,status on public.crm_bookings for each row execute function public.docvy_booking_guard_crm_capacity();

create function public.docvy_booking_founder_confirm(p_case_id uuid,p_actor uuid,p_starts_at timestamptz,p_note text) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare c public.docvy_booking_cases;
begin
 if p_actor is null or length(btrim(coalesce(p_note,'')))<10 or p_starts_at is null or p_starts_at<clock_timestamp()+interval '15 minutes' or p_starts_at>clock_timestamp()+interval '90 days' then raise exception 'doctor_confirmation_and_future_time_required';end if;
 select * into strict c from public.docvy_booking_cases where id=p_case_id for update;
 if c.status='confirmed' and c.confirmed_starts_at=p_starts_at then return jsonb_build_object('reference',c.reference,'status',c.status);end if;
 if c.status<>'requested' or c.mode<>'approval' then raise exception 'pending_docvy_approval_required';end if;
 perform 1 from public.docvy_directory_providers where provider_id=c.provider_id and enabled and published and consent_given and profile_status='verified' and verified_at is not null;
 if not found then raise exception 'provider_no_longer_eligible';end if;
 -- Capacity trigger locks the provider and checks both central and legacy CRM reservations.
 update public.docvy_booking_cases set status='confirmed',confirmed_at=clock_timestamp(),confirmed_starts_at=p_starts_at,updated_at=clock_timestamp() where id=c.id;
 insert into public.docvy_booking_case_events(case_id,old_status,new_status,actor_type,actor_id,note) values(c.id,c.status,'confirmed','docvy',p_actor,'DOCVY checked doctor availability: '||left(p_note,450));
 insert into public.docvy_booking_notification_outbox(case_id,status,recipient_type) values(c.id,'confirmed','patient'),(c.id,'confirmed','admin') on conflict do nothing;
 return jsonb_build_object('reference',c.reference,'status','confirmed');
end;$$;
revoke all on function public.docvy_booking_founder_confirm(uuid,uuid,timestamptz,text) from public,anon,authenticated;
grant execute on function public.docvy_booking_founder_confirm(uuid,uuid,timestamptz,text) to service_role;

create table public.docvy_booking_doctor_links(
 id uuid primary key default gen_random_uuid(),
 case_id uuid not null references public.docvy_booking_cases(id) on delete restrict,
 token_hash text not null unique check(token_hash ~ '^[a-f0-9]{64}$'),
 created_by uuid not null,
 created_at timestamptz not null default clock_timestamp(),
 expires_at timestamptz not null,
 revoked_at timestamptz,
 consumed_at timestamptz,
 report_status text check(report_status in ('completed_reported','no_show_reported','cancelled'))
);
create index docvy_booking_doctor_links_case on public.docvy_booking_doctor_links(case_id);
alter table public.docvy_booking_doctor_links enable row level security;
revoke all on public.docvy_booking_doctor_links from public,anon,authenticated;
grant select,insert,update on public.docvy_booking_doctor_links to service_role;

create function public.docvy_booking_issue_doctor_link(p_case_id uuid,p_actor uuid,p_hash text) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare c public.docvy_booking_cases; expiry timestamptz;
begin
 if p_actor is null or p_hash is null or p_hash !~ '^[a-f0-9]{64}$' then raise exception 'invalid_link';end if;
 select * into strict c from public.docvy_booking_cases where id=p_case_id for update;
 if c.status<>'confirmed' then raise exception 'confirmed_appointment_required';end if;
 expiry:=least(c.confirmed_starts_at+interval '3 days',clock_timestamp()+interval '30 days');
 if expiry<=clock_timestamp() then raise exception 'appointment_too_old';end if;
 update public.docvy_booking_doctor_links set revoked_at=clock_timestamp() where case_id=c.id and revoked_at is null;
 insert into public.docvy_booking_doctor_links(case_id,token_hash,created_by,expires_at) values(c.id,p_hash,p_actor,expiry);
 insert into public.docvy_booking_case_events(case_id,old_status,new_status,actor_type,actor_id,note) values(c.id,c.status,c.status,'docvy',p_actor,'Issued appointment-scoped provider link; previous links revoked');
 return jsonb_build_object('expiresAt',expiry);
end;$$;

create function public.docvy_booking_revoke_doctor_links(p_case_id uuid,p_actor uuid) returns void
language plpgsql security invoker set search_path='' as $$
declare c public.docvy_booking_cases;
begin
 if p_actor is null then raise exception 'actor_required';end if;
 select * into strict c from public.docvy_booking_cases where id=p_case_id for update;
 update public.docvy_booking_doctor_links set revoked_at=clock_timestamp() where case_id=c.id and revoked_at is null;
 insert into public.docvy_booking_case_events(case_id,old_status,new_status,actor_type,actor_id,note) values(c.id,c.status,c.status,'docvy',p_actor,'Revoked appointment-scoped provider links');
end;$$;
revoke all on function public.docvy_booking_revoke_doctor_links(uuid,uuid) from public,anon,authenticated;
grant execute on function public.docvy_booking_revoke_doctor_links(uuid,uuid) to service_role;

create function public.docvy_booking_doctor_view(p_hash text) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare l public.docvy_booking_doctor_links; c public.docvy_booking_cases;
begin
 select * into strict l from public.docvy_booking_doctor_links where token_hash=p_hash and revoked_at is null and expires_at>clock_timestamp();
 select * into strict c from public.docvy_booking_cases where id=l.case_id;
 return jsonb_build_object('reference',c.reference,'patientName',c.patient_name,'doctor',c.doctor_name,'city',c.city,'facility',c.facility,'startsAt',c.confirmed_starts_at,'status',c.status,'reportedStatus',l.report_status,'expiresAt',l.expires_at);
end;$$;

create function public.docvy_booking_doctor_report(p_hash text,p_status text) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare l public.docvy_booking_doctor_links; c public.docvy_booking_cases;
begin
 if p_status is null or p_status not in ('completed_reported','no_show_reported','cancelled') then raise exception 'unsupported_provider_report';end if;
 -- Case first, then link: same locking order as issuance/revocation, avoiding deadlocks.
 select c0.* into strict c from public.docvy_booking_cases c0 join public.docvy_booking_doctor_links l0 on l0.case_id=c0.id where l0.token_hash=p_hash for update of c0;
 select * into strict l from public.docvy_booking_doctor_links where token_hash=p_hash and revoked_at is null and expires_at>clock_timestamp() for update;
 if l.consumed_at is not null then
  if l.report_status=p_status then return public.docvy_booking_doctor_view(p_hash);end if;
  raise exception 'provider_link_already_used';
 end if;
 if p_status='cancelled' and c.confirmed_starts_at<=clock_timestamp() then raise exception 'visit_already_started';end if;
 -- actor_id is the capability record, not a claimed authenticated doctor identity.
 perform public.docvy_booking_transition(c.id,l.id,'clinic',p_status,'Provider report via appointment-scoped link; contact identity not independently authenticated',null);
 update public.docvy_booking_doctor_links set consumed_at=clock_timestamp(),report_status=p_status where id=l.id;
 return public.docvy_booking_doctor_view(p_hash);
end;$$;
revoke all on function public.docvy_booking_issue_doctor_link(uuid,uuid,text),public.docvy_booking_doctor_view(text),public.docvy_booking_doctor_report(text,text) from public,anon,authenticated;
grant execute on function public.docvy_booking_issue_doctor_link(uuid,uuid,text),public.docvy_booking_doctor_view(text),public.docvy_booking_doctor_report(text,text) to service_role;
commit;
