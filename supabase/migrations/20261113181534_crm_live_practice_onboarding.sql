-- A consented doctor can work at multiple approved practices.
drop index public.crm_roster_provider;
create unique index crm_roster_provider_clinic on public.crm_doctor_roster(clinic_id,provider_id) where provider_id is not null;

create function docvy_private.crm_practice_matches(provider text,clinic uuid) returns boolean
language sql stable security invoker set search_path='' as $$
 select exists(select 1 from public.docvy_directory_providers p join public.crm_clinics c on c.id=clinic
 where p.provider_id=provider and p.enabled and p.published and p.consent_given and p.profile_status in ('claimed','verified')
 and docvy_private.directory_visible(p.provider_id)
 and ((lower(c.name)=lower(p.facility) and lower(c.city)=lower(p.city))
 or exists(select 1 from jsonb_array_elements(p.practice_locations) l
 where lower(l->>'facility')=lower(c.name) and lower(l->>'city')=lower(c.city))));
$$;
revoke all on function docvy_private.crm_practice_matches(text,uuid) from public,anon,authenticated;

-- Called only inside the authenticated, owner-checked workspace RPC.
create function docvy_private.crm_activate_provider(provider text) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare p public.docvy_directory_providers; location jsonb; target uuid; roster uuid; ids jsonb:='[]'; answer jsonb;
begin
 perform pg_advisory_xact_lock(hashtextextended('crm-provider:'||coalesce(provider,''),0));
 select * into p from public.docvy_directory_providers d where d.provider_id=provider and d.enabled and d.published and d.consent_given and d.profile_status in ('claimed','verified') and docvy_private.directory_visible(d.provider_id) for share;
 if not found then raise exception using errcode='PT409',message='Only a live, consented doctor can be connected'; end if;
 if jsonb_array_length(p.practice_locations)=0 then raise exception using errcode='PT409',message='Add approved practice locations before connecting this doctor';end if;
 for location in select distinct value from jsonb_array_elements(p.practice_locations) loop
  if coalesce(length(btrim(location->>'facility')),0) not between 2 and 100 or coalesce(length(btrim(location->>'city')),0) not between 2 and 60 or coalesce(length(btrim(location->>'address')),0) not between 5 and 300 then
   raise exception using errcode='PT409',message='Every approved practice needs a name, city and full address';end if;
  select c.id into target from public.crm_clinics c where lower(c.name)=lower(location->>'facility') and lower(c.city)=lower(location->>'city') order by c.id limit 1;
  if target is null then
   target:=gen_random_uuid();
   perform docvy_private.crm_workspace('create-clinic',null,jsonb_build_object('requestId',target,'name',location->>'facility','city',location->>'city','address',location->>'address','authority',true));
  end if;
  select d.id into roster from public.crm_doctor_roster d where d.clinic_id=target and d.provider_id=p.provider_id;
  if roster is null then
   select d.id into roster from public.crm_doctor_roster d where d.clinic_id=target and lower(d.name)=lower(p.doctor_name) and d.provider_id is null order by d.id limit 1;
   if roster is not null then perform docvy_private.crm_workspace('link-provider',target,jsonb_build_object('doctorId',roster,'providerId',p.provider_id));
   else
    answer:=docvy_private.crm_workspace('add-doctor',target,jsonb_build_object('name',p.doctor_name,'specialty',p.specialties->>0,'providerId',p.provider_id));
   end if;
  end if;
  ids:=ids||jsonb_build_array(target);
 end loop;
 return jsonb_build_object('id',ids->>0,'clinicIds',ids,'ok',true);
end;
$$;
revoke all on function docvy_private.crm_activate_provider(text) from public,anon,authenticated;

-- Preserve the existing session, membership, audit and patient-access checks.
do $migration$
declare definition text; old_check text;
begin
 definition:=pg_get_functiondef('docvy_private.crm_workspace(text,uuid,jsonb)'::regprocedure);
 if position('if operation=''create-clinic'' then' in definition)=0 or position('if clinic is null then return result; end if;' in definition)=0 then raise exception 'Unexpected workspace definition'; end if;
 definition:=replace(definition,'if operation=''create-clinic'' then',$branch$if operation='activate-provider' then
  if not platform then raise exception using errcode='PT403',message='DOCVY owner access required'; end if;
  if data->>'authority' is distinct from 'true' then raise exception using errcode='PT400',message='Confirm authority to connect these approved practices';end if;
  return docvy_private.crm_activate_provider(data->>'providerId');
 end if;
 if operation='create-clinic' then$branch$);
 old_check:='exists(select 1 from public.crm_clinics c where c.id=clinic and lower(c.name)=lower(profile.facility) and lower(c.city)=lower(profile.city))';
 if position(old_check in definition)=0 then raise exception 'Practice validation not found';end if;
 definition:=replace(definition,old_check,'docvy_private.crm_practice_matches(profile.provider_id,clinic)');
 definition:=replace(definition,'if clinic is null then return result; end if;',$state$if platform then
   result:=result || jsonb_build_object('onboardingProviders',coalesce((select jsonb_agg(jsonb_build_object(
    'id',p.provider_id,'name',p.doctor_name,'practices',jsonb_array_length(p.practice_locations),
    'linkedPractices',(select count(*) from public.crm_doctor_roster d where d.provider_id=p.provider_id and docvy_private.crm_practice_matches(p.provider_id,d.clinic_id))
   ) order by p.doctor_name) from public.docvy_directory_providers p where p.enabled and p.published and p.consent_given and p.profile_status in ('claimed','verified') and docvy_private.directory_visible(p.provider_id)),'[]'::jsonb));
  end if;
  if clinic is null then return result; end if;$state$);
 execute definition;
end;
$migration$;

-- One real doctor must not have overlapping availability at different clinics.
create function docvy_private.crm_provider_slot_guard() returns trigger
language plpgsql security definer set search_path='' as $$
declare provider text;
begin
 if tg_table_name='crm_doctor_roster' then
  provider:=new.provider_id;
  if provider is null then return new;end if;
  perform pg_advisory_xact_lock(hashtextextended('crm-provider:'||provider,0));
  if exists(select 1 from public.crm_slots own_slot join public.crm_slots other_slot on other_slot.clinic_id<>new.clinic_id
   join public.crm_doctor_roster other_doctor on other_doctor.id=other_slot.doctor_id
   where own_slot.doctor_id=new.id and other_doctor.provider_id=provider
   and tstzrange(own_slot.starts_at,own_slot.ends_at) && tstzrange(other_slot.starts_at,other_slot.ends_at)) then
   raise exception using errcode='PT409',message='Resolve overlapping clinic availability before linking this doctor';
  end if;
  return new;
 end if;
 select d.provider_id into provider from public.crm_doctor_roster d where d.id=new.doctor_id;
 if provider is null then return new;end if;
 perform pg_advisory_xact_lock(hashtextextended('crm-provider:'||provider,0));
 if exists(select 1 from public.crm_slots s join public.crm_doctor_roster d on d.id=s.doctor_id
 where d.provider_id=provider and s.id<>new.id and s.clinic_id<>new.clinic_id
 and tstzrange(s.starts_at,s.ends_at) && tstzrange(new.starts_at,new.ends_at)) then
  raise exception using errcode='PT409',message='This doctor already has availability at another clinic during that time';
 end if;
 return new;
end;
$$;
revoke all on function docvy_private.crm_provider_slot_guard() from public,anon,authenticated;
create trigger crm_provider_slot_guard before insert or update of doctor_id,starts_at,ends_at,clinic_id on public.crm_slots
for each row execute function docvy_private.crm_provider_slot_guard();
create trigger crm_provider_roster_guard before insert or update of provider_id on public.crm_doctor_roster
for each row execute function docvy_private.crm_provider_slot_guard();
