-- Patient receipt tokens are hashed by the server, never exposed to clinic operators.
begin;
alter table public.docvy_booking_cases add column patient_check_in_at timestamptz, add column patient_response_actor uuid;
create function public.docvy_booking_patient_view(p_reference text,p_key_hash text) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare c public.docvy_booking_cases;
begin
 select * into strict c from public.docvy_booking_cases where reference=p_reference and patient_key_hash=p_key_hash
 and created_at>clock_timestamp()-interval '90 days';
 return jsonb_build_object('reference',c.reference,'doctor',c.doctor_name,'city',c.city,'facility',c.facility,'status',c.status,
 'startsAt',c.confirmed_starts_at,'patientAttended',c.patient_attended,'patientResponseAt',c.patient_response_at,'checkInAt',c.patient_check_in_at,
 'events',(select coalesce(jsonb_agg(jsonb_build_object('status',new_status,'actor',actor_type,'at',created_at) order by created_at,id),'[]'::jsonb) from public.docvy_booking_case_events where case_id=c.id));
end;$$;
create function public.docvy_booking_patient_action(p_reference text,p_key_hash text,p_action text,p_patient_actor uuid default null) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare c public.docvy_booking_cases; next_status text;
begin
 select * into strict c from public.docvy_booking_cases where reference=p_reference and patient_key_hash=p_key_hash
 and created_at>clock_timestamp()-interval '90 days' for update;
 next_status:=c.status;
 if p_action<>'cancel' and p_patient_actor is null then raise exception 'verified_patient_identity_required';end if;
 if p_action='cancel' then
  if c.status not in ('requested','confirmed') or (c.confirmed_starts_at is not null and c.confirmed_starts_at<=clock_timestamp()) then raise exception 'cannot_cancel';end if;
  next_status:='cancelled';
  if c.crm_booking_id is not null then update public.crm_bookings set status='cancelled' where id=c.crm_booking_id and status='confirmed';end if;
 elsif p_action='check_in' then
  if c.status<>'confirmed' or c.confirmed_starts_at is null or clock_timestamp() not between c.confirmed_starts_at-interval '1 hour' and c.confirmed_starts_at+interval '1 hour' then raise exception 'outside_check_in_window';end if;
  if c.patient_check_in_at is not null then return public.docvy_booking_patient_view(p_reference,p_key_hash);end if;
  update public.docvy_booking_cases set patient_check_in_at=clock_timestamp() where id=c.id;
 elsif p_action in ('attended','did_not_attend') then
  if c.status not in ('confirmed','completed_reported','no_show_reported','completed_verified','disputed') or c.confirmed_starts_at is null or c.confirmed_starts_at+interval '30 minutes'>clock_timestamp() then raise exception 'visit_not_eligible_for_feedback';end if;
  if c.patient_response_at is not null and c.patient_attended is not distinct from (p_action='attended') then return public.docvy_booking_patient_view(p_reference,p_key_hash);end if;
  if c.patient_response_at is not null then next_status:='disputed';
  elsif c.status='completed_reported' then next_status:=case when p_action='attended' then 'completed_verified' else 'disputed' end;
  elsif c.status='no_show_reported' and p_action='attended' then next_status:='disputed';
  end if;
  update public.docvy_booking_cases set patient_attended=(p_action='attended'),patient_response_at=clock_timestamp(),patient_response_actor=p_patient_actor where id=c.id;
 elsif p_action='dispute' then
  if c.status not in ('confirmed','completed_reported','completed_verified','no_show_reported') then raise exception 'cannot_dispute';end if;
  next_status:='disputed';
 else raise exception 'invalid_patient_action';end if;
 update public.docvy_booking_cases set status=next_status,updated_at=clock_timestamp() where id=c.id;
 insert into public.docvy_booking_case_events(case_id,old_status,new_status,actor_type,actor_id,note) values(c.id,c.status,next_status,'patient',p_patient_actor,'Patient action: '||p_action);
 insert into public.docvy_booking_notification_outbox(case_id,status,recipient_type) values(c.id,'patient_'||p_action,'admin') on conflict do nothing;
 return public.docvy_booking_patient_view(p_reference,p_key_hash);
end;$$;
revoke all on function public.docvy_booking_patient_view(text,text),public.docvy_booking_patient_action(text,text,text,uuid) from public,anon,authenticated;
grant execute on function public.docvy_booking_patient_view(text,text),public.docvy_booking_patient_action(text,text,text,uuid) to service_role;
commit;
-- Founder aggregates: route verifies founder before invoking service-only RPC.
begin;
create function public.docvy_booking_summary() returns jsonb language sql security invoker set search_path='' as $$
 select jsonb_build_object('total',(select count(*) from public.docvy_booking_cases),
 'byDoctorAndCity',(select coalesce(jsonb_agg(row_to_json(t)),'[]'::jsonb) from (
 select provider_id,doctor_name,city,count(*) as total,
 count(*) filter(where status='requested') as pending,
 count(*) filter(where status='confirmed') as confirmed,
 count(*) filter(where status='completed_reported') as doctor_reported,
 count(*) filter(where status='completed_verified') as patient_confirmed,
 count(*) filter(where status='no_show_reported') as no_show_reported,
 count(*) filter(where status='disputed') as disputed,
 count(*) filter(where status='cancelled') as cancelled,
 count(*) filter(where status in ('completed_reported','no_show_reported') and patient_response_at is null) as awaiting_patient_confirmation
 from public.docvy_booking_cases group by provider_id,doctor_name,city order by doctor_name,city) t));
$$;
revoke all on function public.docvy_booking_summary() from public,anon,authenticated;
grant execute on function public.docvy_booking_summary() to service_role;
commit;
-- Active-session check returns only a boolean for the caller's own session.
begin;
create function public.docvy_booking_session_active() returns boolean language sql stable security definer set search_path='' as $$
 select auth.uid() is not null and exists(select 1 from auth.sessions s where s.user_id=auth.uid() and s.id::text=auth.jwt()->>'session_id');
$$;
revoke all on function public.docvy_booking_session_active() from public,anon;
grant execute on function public.docvy_booking_session_active() to authenticated;
commit;

begin;
create function public.docvy_booking_guard_doctor_schedule() returns trigger language plpgsql security invoker set search_path='' as $guard$
declare provider text;
begin
 if new.doctor_id is null then return new;end if;
 select r.provider_id into provider from public.crm_doctor_roster r where r.id=new.doctor_id and r.clinic_id=new.clinic_id;
 if provider is null then raise exception 'doctor_clinic_link_required';end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('doctor-schedule:'||provider,0));
 if exists(select 1 from public.crm_slots s join public.crm_doctor_roster r on r.id=s.doctor_id
 where r.provider_id=provider and s.id<>new.id and tstzrange(s.starts_at,s.ends_at+interval '30 minutes','[)') && tstzrange(new.starts_at,new.ends_at+interval '30 minutes','[)')) then
 raise exception 'doctor_schedule_overlaps_or_gap_too_short';end if;
 return new;
end;$guard$;
revoke all on function public.docvy_booking_guard_doctor_schedule() from public,anon,authenticated;
create trigger docvy_booking_doctor_schedule before insert or update of starts_at,ends_at,doctor_id,clinic_id on public.crm_slots for each row execute function public.docvy_booking_guard_doctor_schedule();
commit;
