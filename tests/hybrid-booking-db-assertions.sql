-- DO block assertions: fake requests; no personal user data.
insert into public.docvy_booking_provider_options(provider_id,mode,enabled_at)
values ('docvy-qa-doctor','approval',now());

do $$
declare
 a jsonb; b jsonb;
begin
 a:=public.docvy_booking_submit(jsonb_build_object(
   'idempotencyKey','00000000-0000-4000-8000-000000000010',
   'providerId','docvy-qa-doctor','city','Gurugram','facility','DOCVY QA Clinic',
   'name','QA Patient','mobile','9876543210','email','qa@example.org',
   'requestedDate',((now() at time zone 'Asia/Kolkata')::date + 2)::text,
   'requestedTime','11:30','consent',true,'networkHash',repeat('a',64)
 ));
 b:=public.docvy_booking_submit(jsonb_build_object(
   'idempotencyKey','00000000-0000-4000-8000-000000000010',
   'providerId','docvy-qa-doctor','city','Gurugram','facility','DOCVY QA Clinic',
   'name','QA Patient','mobile','9876543210','consent',true,'networkHash',repeat('a',64)
 ));
 if a->>'status'<>'requested' or a->>'reference'<>b->>'reference' then raise exception 'Approval or replay failed'; end if;
 if (select count(*) from public.docvy_booking_cases)<>1 then raise exception 'Idempotency duplicated request'; end if;
 if (select count(*) from public.crm_bookings)<>0 then raise exception 'Approval case reserved slot prematurely'; end if;
end $$;

-- Unverified profile must be rejected even if published.
insert into public.docvy_booking_provider_options(provider_id,mode,enabled_at)
values ('docvy-unverified-doctor','approval',now());
do $$
begin
  begin
    perform public.docvy_booking_submit(jsonb_build_object(
      'idempotencyKey','00000000-0000-4000-8000-000000000011',
      'providerId','docvy-unverified-doctor','city','Gurugram','facility','DOCVY QA Clinic',
      'name','QA Patient','mobile','9876543211','consent',true,'networkHash',repeat('b',64)
    ));
    raise exception 'Unverified provider was booked';
  exception when no_data_found then null; end;
end $$;

update public.docvy_booking_provider_options set mode='instant' where provider_id='docvy-qa-doctor';

-- RLS / grants must deny exposed booking table access.
do $$
begin
  if has_table_privilege('anon','public.docvy_booking_cases','SELECT') then raise exception 'Anon can read patient cases'; end if;
  if has_table_privilege('authenticated','public.docvy_booking_cases','SELECT') then raise exception 'Authenticated broad patient access'; end if;
  if has_function_privilege('anon','public.docvy_booking_submit(jsonb)','EXECUTE') then raise exception 'Anon booking RPC exposed'; end if;
end $$;
