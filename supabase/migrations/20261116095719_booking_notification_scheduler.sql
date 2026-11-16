-- Supabase Cron avoids a daily-only Hobby schedule and keeps credentials in Vault.
-- Does not create a job or enable email. Provision Vault + cron only after validation.
begin;
create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron;
create extension if not exists supabase_vault;
create schema if not exists docvy_booking_ops;
revoke all on schema docvy_booking_ops from public,anon,authenticated,service_role;
create function docvy_booking_ops.dispatch_notifications() returns bigint
language plpgsql security invoker set search_path='' as $$
declare cfg jsonb; headers jsonb; request_id bigint;
begin
 select decrypted_secret::jsonb into cfg from vault.decrypted_secrets where name='docvy_booking_scheduler_config';
 if cfg is null then return null;end if;
 if coalesce(length(cfg->>'token'),0)<32 or not (
   cfg->>'url'='https://www.docvy.in/api/booking/notifications' or
   cfg->>'url' ~ '^https://docvy-crm-staging-[a-z0-9-]+-rishimartin816-ui\.vercel\.app/api/booking/notifications$'
 ) then raise exception 'Invalid notification scheduler configuration';end if;
 perform public.docvy_booking_queue_followups();
 delete from public.docvy_booking_auth_attempts where created_at<clock_timestamp()-interval '1 day';
 if not exists(select 1 from public.docvy_booking_notification_outbox where delivery_state='queued' and next_attempt_at<=clock_timestamp()) then return null;end if;
 headers=jsonb_build_object('Authorization','Bearer '||(cfg->>'token'));
 if cfg ? 'previewCookie' then
   if cfg->>'url'='https://www.docvy.in/api/booking/notifications' then raise exception 'Preview cookie forbidden for production';end if;
   headers=headers||jsonb_build_object('Cookie',cfg->>'previewCookie');
 end if;
 select net.http_get(url:=cfg->>'url',headers:=headers,timeout_milliseconds:=60000) into request_id;
 return request_id;
end $$;
revoke all on function docvy_booking_ops.dispatch_notifications() from public,anon,authenticated,service_role;
commit;
