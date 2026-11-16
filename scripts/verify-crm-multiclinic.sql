-- Synthetic fixtures only. Never commit this transaction.
begin;
do $test$
declare
 owner_id uuid:=gen_random_uuid(); staff_id uuid:=gen_random_uuid();
 owner_session uuid:=gen_random_uuid(); staff_session uuid:=gen_random_uuid();
 provider text:='crm-multiclinic-test-'||gen_random_uuid(); result jsonb; state jsonb;
 clinics jsonb; c uuid; doctor uuid; first_doctor uuid; first_clinic uuid; second_clinic uuid;
 request_id uuid; start_at timestamptz:=now()+interval '20 days'; counter integer:=0;
begin
 insert into auth.users(id,email,email_confirmed_at,is_anonymous)
 values(owner_id,'crm-multiclinic-owner@example.invalid',now(),false),(staff_id,'crm-multiclinic-staff@example.invalid',now(),false);
 insert into auth.sessions(id,user_id,created_at,updated_at) values(owner_session,owner_id,now(),now()),(staff_session,staff_id,now(),now());
 insert into docvy_private.directory_admins(email) values('crm-multiclinic-owner@example.invalid');
 insert into public.docvy_directory_providers(provider_id,doctor_name,city,facility,source_url,source_checked,profile_status,consent_given,consent_date,consent_method,published,specialties,practice_locations)
 values(provider,'Synthetic Multi-clinic Doctor','Test One','Rollback practice one','https://example.invalid/rollback',current_date,'claimed',true,now(),'form',true,'["General medicine"]',
 '[{"city":"Test One","facility":"Rollback practice one","address":"Transaction-only practice one"},{"city":"Test Two","facility":"Rollback practice two","address":"Transaction-only practice two"},{"city":"Test Three","facility":"Rollback practice three","address":"Transaction-only practice three"}]');
 perform set_config('request.jwt.claims',jsonb_build_object('sub',owner_id,'role','authenticated','session_id',owner_session)::text,true);
 begin perform public.docvy_crm('activate-provider',null,jsonb_build_object('providerId',provider));raise exception 'Authority was not required';exception when sqlstate 'PT400' then null;end;
 result:=public.docvy_crm('activate-provider',null,jsonb_build_object('providerId',provider,'authority',true));
 clinics:=result->'clinicIds';
 if jsonb_array_length(clinics)<>3 then raise exception 'Three approved practices were not connected';end if;
 if (select count(*) from public.crm_doctor_roster where provider_id=provider)<>3 then raise exception 'Multi-clinic roster missing';end if;
 perform public.docvy_crm('activate-provider',null,jsonb_build_object('providerId',provider,'authority',true));
 if (select count(*) from public.crm_doctor_roster where provider_id=provider)<>3 then raise exception 'Repeated activation duplicated practices';end if;
 state:=public.docvy_crm('state',null,'{}');
 if not exists(select 1 from jsonb_array_elements(state->'onboardingProviders') p where p->>'id'=provider and (p->>'linkedPractices')::integer=3) then raise exception 'Owner setup state incorrect';end if;
 first_clinic:=(clinics->>0)::uuid;second_clinic:=(clinics->>1)::uuid;
 select id into first_doctor from public.crm_doctor_roster where clinic_id=first_clinic and provider_id=provider;
 perform public.docvy_crm('slot',first_clinic,jsonb_build_object('doctorId',first_doctor,'startsAt',start_at,'endsAt',start_at+interval '30 minutes'));
 select id into doctor from public.crm_doctor_roster where clinic_id=second_clinic and provider_id=provider;
 begin perform public.docvy_crm('slot',second_clinic,jsonb_build_object('doctorId',doctor,'startsAt',start_at+interval '15 minutes','endsAt',start_at+interval '45 minutes'));raise exception 'Cross-clinic overlap was accepted';exception when sqlstate 'PT409' then null;end;
 perform public.docvy_crm('slot',second_clinic,jsonb_build_object('doctorId',doctor,'startsAt',start_at+interval '30 minutes','endsAt',start_at+interval '60 minutes'));
 c:=(clinics->>2)::uuid;
 select id into doctor from public.crm_doctor_roster where clinic_id=c and provider_id=provider;
 update public.crm_doctor_roster set provider_id=null where id=doctor;
 perform public.docvy_crm('slot',c,jsonb_build_object('doctorId',doctor,'startsAt',start_at,'endsAt',start_at+interval '30 minutes'));
 begin perform public.docvy_crm('link-provider',c,jsonb_build_object('doctorId',doctor,'providerId',provider));raise exception 'Linking hid existing overlapping slots';exception when sqlstate 'PT409' then null;end;
 delete from public.crm_slots where doctor_id=doctor;
 perform public.docvy_crm('link-provider',c,jsonb_build_object('doctorId',doctor,'providerId',provider));
 for c in select value::uuid from jsonb_array_elements_text(clinics) loop
  request_id:=gen_random_uuid();
  insert into public.docvy_directory_requests(request_id,provider_id,contact_phone,request_data,network_hash)
  select request_id,provider,'+919000000000',jsonb_build_object('name','Synthetic request','city',city,'facility',name,'consent',true),'transaction-only' from public.crm_clinics where id=c;
  state:=public.docvy_crm('state',c,'{}');
  if jsonb_array_length(state->'leads')<>1 or state->'leads'->0->>'id'<>request_id::text then raise exception 'Request routed to wrong clinic';end if;
  if (select count(*) from public.crm_slots where clinic_id=c)>1 then raise exception 'Activation invented slots';end if;
 end loop;
 insert into public.crm_staff(user_id,clinic_id,role) values(staff_id,first_clinic,'viewer');
 perform set_config('request.jwt.claims',jsonb_build_object('sub',staff_id,'role','authenticated','session_id',staff_session)::text,true);
 state:=public.docvy_crm('state',first_clinic,'{}');
 if state ? 'onboardingProviders' or jsonb_array_length(state->'leads')<>0 then raise exception 'Viewer received owner setup or patient leads';end if;
 begin perform public.docvy_crm('activate-provider',null,jsonb_build_object('providerId',provider,'authority',true));raise exception 'Staff activated a doctor';exception when sqlstate 'PT403' then null;end;
 begin perform public.docvy_crm('state',second_clinic,'{}');raise exception 'Cross-clinic staff read accepted';exception when sqlstate 'PT403' then null;end;
 perform set_config('request.jwt.claims',jsonb_build_object('sub',owner_id,'role','authenticated','session_id',owner_session)::text,true);
 update public.docvy_directory_providers set consent_given=false,consent_date=null,consent_method=null,profile_status='unclaimed' where provider_id=provider;
 begin perform public.docvy_crm('activate-provider',null,jsonb_build_object('providerId',provider,'authority',true));raise exception 'Withdrawn consent activated';exception when sqlstate 'PT409' then null;end;
 if has_function_privilege('authenticated','docvy_private.crm_activate_provider(text)','execute') or has_function_privilege('anon','public.docvy_crm(text,uuid,jsonb)','execute') then raise exception 'Direct privileged function exposed';end if;
 raise notice 'PASS: 3 practices, idempotency, scoped requests, owner authority, revoked consent, cross-clinic slot overlap and staff isolation';
end;
$test$;
rollback;
