-- Uses the existing Resend account/key aliases. No messages are sent by this migration.
begin;
alter table public.docvy_booking_notification_outbox
 add column delivery_payload jsonb,
 add column email_envelope jsonb,
 add column claim_token uuid,
 add column first_attempt_at timestamptz,
 add column provider_message_id text,
 add column accepted_at timestamptz;
alter table public.docvy_booking_notification_outbox drop constraint docvy_booking_notification_outbox_delivery_state_check;
alter table public.docvy_booking_notification_outbox add constraint docvy_booking_notification_outbox_delivery_state_check check(delivery_state in ('queued','sent','skipped','failed'));
-- Do not automatically email historical events whose original state was not captured.
update public.docvy_booking_notification_outbox set delivery_state='failed',last_error='event_snapshot_unavailable' where delivery_state='queued';
create function public.docvy_booking_notification_snapshot() returns trigger language plpgsql security invoker set search_path='' as $$
declare c public.docvy_booking_cases;
begin
 if tg_op='UPDATE' then
  if old.delivery_payload is distinct from new.delivery_payload or (old.email_envelope is not null and old.email_envelope is distinct from new.email_envelope) then raise exception 'notification_payload_immutable';end if;
  return new;
 end if;
 select * into strict c from public.docvy_booking_cases where id=new.case_id;
 new.delivery_payload:=jsonb_build_object('reference',c.reference,'doctor',c.doctor_name,'city',c.city,'facility',c.facility,'patientEmail',c.patient_email,'startsAt',c.confirmed_starts_at,'preferredDate',c.preferred_date,'preferredTime',c.preferred_time,'idempotencyKey',c.idempotency_key,'patientHash',c.patient_key_hash,'event',new.status);
 return new;
end;$$;
revoke all on function public.docvy_booking_notification_snapshot() from public,anon,authenticated;
create trigger docvy_booking_notification_snapshot before insert or update on public.docvy_booking_notification_outbox for each row execute function public.docvy_booking_notification_snapshot();

create or replace function public.docvy_booking_claim_notifications(p_limit integer default 2)
returns setof public.docvy_booking_notification_outbox language plpgsql security invoker set search_path='' as $$
begin
 update public.docvy_booking_notification_outbox set delivery_state='failed',last_error=coalesce(last_error,'retry_window_exhausted')
 where delivery_state='queued' and next_attempt_at<=clock_timestamp() and (attempts>=6 or first_attempt_at<clock_timestamp()-interval '20 hours');
 return query update public.docvy_booking_notification_outbox o set attempts=o.attempts+1,claim_token=gen_random_uuid(),
  first_attempt_at=coalesce(o.first_attempt_at,clock_timestamp()),next_attempt_at=clock_timestamp()+interval '2 minutes'
 from (select id from public.docvy_booking_notification_outbox where delivery_state='queued' and attempts<6 and next_attempt_at<=clock_timestamp()
  order by created_at,id limit least(greatest(p_limit,1),10) for update skip locked) jobs where o.id=jobs.id returning o.*;
end;$$;

create function public.docvy_booking_prepare_email(p_id bigint,p_claim uuid,p_envelope jsonb) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare o public.docvy_booking_notification_outbox;
begin
 select * into strict o from public.docvy_booking_notification_outbox where id=p_id and claim_token=p_claim and delivery_state='queued' for update;
 if o.email_envelope is null then
  if jsonb_typeof(p_envelope)<>'object' or coalesce(p_envelope->>'from','')<>'DOCVY <contact@docvy.in>' or coalesce(p_envelope->>'to','')='' or coalesce(p_envelope->>'text','')='' then raise exception 'invalid_email_envelope';end if;
  update public.docvy_booking_notification_outbox set email_envelope=p_envelope where id=o.id;
  return p_envelope;
 end if;
 return o.email_envelope;
end;$$;

create function public.docvy_booking_finish_email(p_id bigint,p_claim uuid,p_result text,p_provider_id text default null,p_error text default null) returns boolean
language plpgsql security invoker set search_path='' as $$
declare o public.docvy_booking_notification_outbox;
begin
 select * into o from public.docvy_booking_notification_outbox where id=p_id and claim_token=p_claim and delivery_state='queued' for update;
 if not found then return false;end if;
 if p_result not in ('accepted','retry','failed','skipped') or p_result is null then raise exception 'invalid_delivery_result';end if;
 if p_result='accepted' and coalesce(p_provider_id,'') !~ '^[0-9a-f-]{36}$' then raise exception 'provider_id_required';end if;
 update public.docvy_booking_notification_outbox set
  delivery_state=case when p_result='accepted' then 'sent' when p_result='retry' and attempts<6 then 'queued' when p_result='skipped' then 'skipped' else 'failed' end,
  provider_message_id=case when p_result='accepted' then p_provider_id else provider_message_id end,
  accepted_at=case when p_result='accepted' then clock_timestamp() else accepted_at end,
  sent_at=case when p_result='accepted' then clock_timestamp() else sent_at end,
  next_attempt_at=clock_timestamp()+make_interval(mins=>least(60,power(2,least(5,o.attempts))::integer)),
  claim_token=null,last_error=case when p_result='accepted' then null else left(p_error,100) end
 where id=o.id;
 return true;
end;$$;

-- These are transport counts: sent means Resend API acceptance, not delivery to an inbox.
create function public.docvy_booking_notification_health() returns jsonb language sql security invoker set search_path='' as $$
 select jsonb_build_object('queued',count(*) filter(where delivery_state='queued'),'accepted',count(*) filter(where delivery_state='sent'),'failed',count(*) filter(where delivery_state='failed'),'skipped',count(*) filter(where delivery_state='skipped')) from public.docvy_booking_notification_outbox;
$$;
create index docvy_booking_cases_followup on public.docvy_booking_cases(confirmed_starts_at) where status in ('confirmed','completed_reported','no_show_reported');
create function public.docvy_booking_queue_followups() returns void language plpgsql security invoker set search_path='' as $$
begin
 insert into public.docvy_booking_notification_outbox(case_id,status,recipient_type)
 select c.id,n.event,n.recipient from public.docvy_booking_cases c
 cross join (values('appointment_reminder','patient'),('visit_feedback','patient'),('provider_outcome_due','admin')) n(event,recipient)
 where c.confirmed_starts_at between clock_timestamp()-interval '3 days' and clock_timestamp()+interval '24 hours'
 and ((n.event='appointment_reminder' and c.status='confirmed' and c.confirmed_at<clock_timestamp()-interval '10 minutes' and c.confirmed_starts_at>=clock_timestamp()+interval '1 hour')
 or (n.event='visit_feedback' and c.status in ('confirmed','completed_reported','no_show_reported') and c.patient_response_at is null and c.confirmed_starts_at<=clock_timestamp()-interval '30 minutes')
 or (n.event='provider_outcome_due' and c.status='confirmed' and c.confirmed_starts_at<=clock_timestamp()-interval '30 minutes'))
 and not exists(select 1 from public.docvy_booking_notification_outbox o where o.case_id=c.id and o.status=n.event and o.recipient_type=n.recipient)
 order by c.confirmed_starts_at,c.id,n.event limit 100 on conflict do nothing;
end;$$;
revoke all on function public.docvy_booking_prepare_email(bigint,uuid,jsonb),public.docvy_booking_finish_email(bigint,uuid,text,text,text),public.docvy_booking_notification_health(),public.docvy_booking_queue_followups() from public,anon,authenticated;
grant execute on function public.docvy_booking_prepare_email(bigint,uuid,jsonb),public.docvy_booking_finish_email(bigint,uuid,text,text,text),public.docvy_booking_notification_health(),public.docvy_booking_queue_followups() to service_role;
commit;
