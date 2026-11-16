
begin;
insert into public.docvy_directory_providers(provider_id,doctor_name,city,facility,source_url,source_checked,specialties,practice_locations,registration_number,registration_council)
values('approved-fixture','Local fixture','Keri','Keri clinic','https://www.docvy.in','2026-11-13','["General medicine"]','[{"city":"Keri","facility":"Keri clinic"},{"city":"Sankhalim","facility":"Sankhalim practice"},{"city":"Poriem","facility":"Poriem clinic"}]','5175','GMC');
do $$ begin
 begin perform public.docvy_update_directory_profile('approved-fixture','owner_approve','{"ownerApproved":true,"evidence":"Owner approved local fixture"}'); raise exception 'unauthorized approval succeeded';
 exception when sqlstate 'PT403' then null; end;
end $$;
insert into auth.users values('00000000-0000-0000-0000-000000000001','contact@docvy.in',now());
insert into auth.sessions values('00000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000001');
create or replace function auth.jwt() returns jsonb language sql stable as $$ select '{"session_id":"00000000-0000-0000-0000-000000000002"}'::jsonb $$;
select set_config('test.actor','00000000-0000-0000-0000-000000000001',true);
select public.docvy_update_directory_profile('approved-fixture','owner_approve','{"ownerApproved":true,"evidence":"Owner approved local fixture and registration, no re-verification"}');
do $$ declare chosen jsonb; ref text; payload jsonb; i int:=0;
begin
 for chosen in select * from jsonb_array_elements('[{"city":"Keri","facility":"Keri clinic"},{"city":"Sankhalim","facility":"Sankhalim practice"},{"city":"Poriem","facility":"Poriem clinic"}]'::jsonb) loop
 i:=i+1;
 payload:=jsonb_build_object('providerId','approved-fixture','city',chosen->>'city','facility',chosen->>'facility','name','Local validation','mobile','+91900000000'||i,'email','validation@example.invalid','requestedDate','','requestedTime','','consent',true);
 ref:=public.docvy_submit_directory_request(gen_random_uuid(),payload,repeat('a',64));
 if ref !~ '^DV-[A-F0-9]{16}$' then raise exception 'Invalid request reference';end if;
 end loop;
 begin
 perform public.docvy_submit_directory_request(gen_random_uuid(),payload||'{"facility":"Wrong clinic"}',repeat('b',64));
 raise exception 'wrong clinic was accepted';
 exception when sqlstate 'PT422' then null;end;
 begin
 perform public.docvy_submit_directory_request(gen_random_uuid(),payload||'{"mobile":"invalid"}',repeat('b',64));
 raise exception 'invalid phone was accepted';
 exception when sqlstate 'PT400' then null;end;
 if not exists(select 1 from public.docvy_directory_providers where provider_id='approved-fixture' and profile_status='verified' and consent_method='owner_approval' and enabled) then raise exception 'Approval failed';end if;
 if (select count(*) from public.docvy_directory_requests where provider_id='approved-fixture')<>3 then raise exception 'Location requests not preserved';end if;
end $$;
select 'PASS: owner guard, approved verification, three distinct clinics, invalid clinic and phone rejection' as result;
rollback;
