-- Run as the database owner. Every synthetic record is rolled back, including auth users.
begin;
do $$
declare
 v jsonb:=jsonb_build_object('role','doctor','doctorName','Dr DOCVY Rollback QA','specialty','General medicine','city','Gurugram','facility','','locality','Sector QA','address','Professional address QA','email','partner-qa@example.invalid','phone','+919876543210','registrationNumber','QA-ROLLBACK-01','registrationCouncil','QA council','sourceUrl','','bio','Doctor-supplied biography for a rollback test.','details','I am this doctor and consent to a reviewed profile.','consent',true);
 application_id uuid:=gen_random_uuid(); second_id uuid:=gen_random_uuid(); actor_id uuid:=gen_random_uuid(); session_id uuid:=gen_random_uuid();
 network text:=repeat('7',64); ref text; doctor_id text; existing_id text; public_doctor jsonb; original_count integer;
begin
 select count(*) into original_count from public.docvy_directory_providers;
 if has_table_privilege('anon','docvy_private.partner_applications','SELECT') or has_function_privilege('anon','docvy_private.submit_partner_application(uuid,jsonb,text)','EXECUTE') or has_function_privilege('anon','public.docvy_review_partner_application(uuid,text,jsonb)','EXECUTE') then raise exception 'Private application permissions are too broad';end if;
 begin perform public.docvy_directory_intake('partner','{}',extract(epoch from now())::bigint,'invalid');raise exception 'Invalid signature accepted';exception when sqlstate 'PT403' then null;end;
 begin perform docvy_private.submit_partner_application(application_id,v||'{"consent":false}',network);raise exception 'Missing consent accepted';exception when sqlstate 'PT400' then null;end;
 ref:=docvy_private.submit_partner_application(application_id,v,network);
 if ref !~ '^PA-[A-F0-9]{16}$' or ref<>docvy_private.submit_partner_application(application_id,v,network) then raise exception 'Reference / idempotency failed';end if;
 if (select payload->>'city' from docvy_private.partner_applications where id=application_id)<>'Gurgaon' then raise exception 'City alias not canonicalized';end if;
 begin perform docvy_private.submit_partner_application(application_id,v||'{"bio":"Changed biography"}',network);raise exception 'Changed retry accepted';exception when sqlstate 'PT409' then null;end;
 begin perform docvy_private.submit_partner_application(gen_random_uuid(),v,repeat('8',64));raise exception 'Duplicate pending registration accepted';exception when sqlstate 'PT409' then null;end;
 if (select count(*) from public.docvy_directory_providers)<>original_count then raise exception 'Pending application published';end if;
 perform set_config('request.jwt.claims','{}',true);
 begin perform public.docvy_review_partner_application(application_id,'approve','{"confirmedConsent":true,"evidence":"QA authority reviewed"}');raise exception 'Unauthorised approval accepted';exception when sqlstate 'PT403' then null;end;
 insert into auth.users(id,email,email_confirmed_at,aud,role) values(actor_id,'partner-review-qa@example.invalid',now(),'authenticated','authenticated');
 insert into auth.sessions(id,user_id) values(session_id,actor_id);
 insert into docvy_private.directory_admins(email) values('partner-review-qa@example.invalid');
 perform set_config('request.jwt.claims',jsonb_build_object('sub',actor_id,'role','authenticated','session_id',session_id)::text,true);
 if not public.docvy_is_directory_admin() then raise exception 'Synthetic owner session invalid';end if;
 if not exists(select 1 from jsonb_array_elements(public.docvy_directory_admin_data()->'applications') a where a->>'id'=application_id::text and not a ? 'network_hash') then raise exception 'Application missing from private review';end if;
 begin perform public.docvy_review_partner_application(application_id,'approve','{"evidence":"QA authority reviewed"}');raise exception 'Approval without confirmation accepted';exception when sqlstate 'PT400' then null;end;
 doctor_id:=public.docvy_review_partner_application(application_id,'approve','{"confirmedConsent":true,"evidence":"QA authority and written consent checked"}');
 if doctor_id<>public.docvy_review_partner_application(application_id,'approve','{"confirmedConsent":true,"evidence":"QA idempotency check"}') then raise exception 'Repeated approval duplicated';end if;
 if not exists(select 1 from public.docvy_directory_providers where provider_id=doctor_id and published and enabled and profile_status='claimed' and consent_given and verified_at is null and facility='' and photo_url is null and source_url='https://www.docvy.in/doctor/'||doctor_id) then raise exception 'Approved independent profile state incorrect';end if;
 select d into public_doctor from jsonb_array_elements(public.docvy_public_directory()::jsonb) d where d->>'id'=doctor_id;
 if public_doctor is null or public_doctor->>'profileStatus'<>'claimed' or coalesce(public_doctor->>'registrationNumber','')<>'' or public_doctor::text like '%partner-qa@example.invalid%' or public_doctor::text like '%9876543210%' then raise exception 'Public DTO leaks private details or is missing';end if;
 -- Exercise the existing claim and appointment functions with valid Indian contact details.
 select provider_id into existing_id from public.docvy_directory_providers where profile_status='unclaimed' limit 1;
 perform public.docvy_submit_profile_request(gen_random_uuid(),'claim',jsonb_build_object('providerId',existing_id,'doctorName','Existing profile QA','email','claim-qa@example.invalid','phone','+919876543210','registrationNumber','QA01','registrationCouncil','QA council','consent',true,'details','QA rollback claim'),repeat('9',64));
 perform public.docvy_submit_directory_request(gen_random_uuid(),jsonb_build_object('providerId',doctor_id,'city','Gurgaon','facility','','name','Rollback patient','mobile','+919876543210','email','patient-qa@example.invalid','consent',true),repeat('6',64));
 -- A separate application may be rejected without creating a public profile.
 perform docvy_private.submit_partner_application(second_id,v||'{"doctorName":"Dr DOCVY Reject QA","registrationNumber":"QA-REJECT-01"}',network);
 perform public.docvy_review_partner_application(second_id,'reject','{"evidence":"QA rejected incomplete authority proof"}');
 if (select status from docvy_private.partner_applications where id=second_id)<>'rejected' or (select count(*) from public.docvy_directory_providers)<>original_count+1 then raise exception 'Rejection published a profile';end if;
 -- Duplicate profile check recognises Dr prefixes and the Gurugram alias.
 begin perform docvy_private.submit_partner_application(gen_random_uuid(),v||'{"registrationNumber":"QA-DUPLICATE-02"}',network);raise exception 'Existing profile duplicate accepted';exception when sqlstate 'PT409' then null;end;
 -- Shared hourly application rate limit.
 for i in 1..3 loop
  perform docvy_private.submit_partner_application(gen_random_uuid(),v||jsonb_build_object('doctorName','Dr Rate QA '||i,'registrationNumber','QA-RATE-'||i),network);
 end loop;
 begin perform docvy_private.submit_partner_application(gen_random_uuid(),v||'{"doctorName":"Dr Rate QA excess","registrationNumber":"QA-RATE-EXCESS"}',network);raise exception 'Rate limit missing';exception when sqlstate 'PT429' then null;end;
end;
$$;
select 'PASS: private intake, consent, idempotency, duplicate protection, city alias, owner review, public DTO, independent doctor, claim phone, appointment contact, rejection and rate limit' as result;
rollback;
