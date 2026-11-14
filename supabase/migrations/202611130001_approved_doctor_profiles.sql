-- Extend the existing registry; preserve publication, removal and owner authorization checks.
alter table public.docvy_directory_providers
 add column profile_details jsonb not null default '{}'::jsonb check(jsonb_typeof(profile_details)='object');
alter table public.docvy_directory_providers drop constraint docvy_directory_providers_consent_method_check;
alter table public.docvy_directory_providers add constraint docvy_directory_providers_consent_method_check
 check(consent_method in ('email','form','owner_approval'));
alter table public.docvy_directory_providers drop constraint docvy_owned_photo;
alter table public.docvy_directory_providers add constraint docvy_owned_photo
 check(photo_url is null or photo_url ~ '^https://cxyscxjauxoizvvllmfu[.]supabase[.]co/storage/v1/object/public/docvy-provider-photos/[a-z0-9/-]+[.](jpg|png|webp)$'
 or photo_url ~ '^/uploads/[a-z0-9/-]+[.](jpg|png|webp)$');

-- Keep the same owner-only RPC and audit table; record business approval truthfully.
do $migration$
declare definition text;
begin
 definition:=pg_get_functiondef('public.docvy_update_directory_profile(text,text,jsonb)'::regprocedure);
 if position('if p_action=''claim'' then' in definition)=0 then raise exception 'Unexpected review function; inspect before migrating'; end if;
 definition:=replace(definition,'''claim'',''verify'',''unpublish'',''publish'',''revoke'',''reject''','''claim'',''verify'',''unpublish'',''publish'',''revoke'',''reject'',''owner_approve''');
 definition:=replace(definition,'if p_action=''claim'' then',$branch$if p_action='owner_approve' then
 if p_data->>'ownerApproved' is distinct from 'true'
 or coalesce(length(btrim(p.registration_number)),0)<2
 or coalesce(length(btrim(p.registration_council)),0)<2 then
 raise exception using errcode='PT400',message='Record owner approval and supplied registration details'; end if;
 update public.docvy_directory_providers set profile_status='verified',consent_given=true,
 consent_date=now(),consent_method='owner_approval',verified_at=now() where provider_id=p_id;
 elsif p_action='claim' then$branch$);
 execute definition;
end $migration$;

-- Export approved public fields only; approval evidence stays private.
create or replace function public.docvy_public_directory() returns jsonb
language sql stable security definer set search_path='' as $function$
 select coalesce(jsonb_agg(jsonb_build_object(
 'id',p.provider_id,'live',true,'name',p.doctor_name,'specialties',p.specialties,
 'hospital',p.facility,'locations',case when jsonb_array_length(p.practice_locations)>0 then p.practice_locations else jsonb_build_array(jsonb_build_object('city',p.city,'facility',p.facility,'primary',true)) end,
 'otherNcrLocations','[]'::jsonb,'sourceUrl',p.source_url,'sourceChecked',p.source_checked,
 'profileStatus',p.profile_status,'consentGiven',p.consent_given,
 'consentDate',case when p.profile_status<>'unclaimed' then p.consent_date end,
 'consentMethod',case when p.profile_status<>'unclaimed' then p.consent_method end,
 'registrationNumber',case when p.profile_status='verified' then p.registration_number end,
 'registrationCouncil',case when p.profile_status='verified' then p.registration_council end,
 'verifiedAt',case when p.profile_status='verified' then p.verified_at end,
 'photoUrl',case when p.profile_status<>'unclaimed' then p.photo_url end,
 'summary',case when p.profile_status<>'unclaimed' then p.approved_bio end,
 'profileDetails',case when p.profile_status<>'unclaimed' then jsonb_build_object(
 'qualifications',p.profile_details->'qualifications','experienceYears',p.profile_details->'experienceYears',
 'experienceAsOf',p.profile_details->'experienceAsOf','languages',p.profile_details->'languages',
 'consultationFee',p.profile_details->'consultationFee','currency',p.profile_details->'currency',
 'practicePhone',p.profile_details->'practicePhone','appointmentNote',p.profile_details->'appointmentNote',
 'additionalMapsUrl',p.profile_details->'additionalMapsUrl','additionalMapsLabel',p.profile_details->'additionalMapsLabel') end
 ) order by p.city,p.doctor_name),'[]'::jsonb)
 from public.docvy_directory_providers p where p.published and docvy_private.directory_visible(p.provider_id);
$function$;
revoke all on function public.docvy_public_directory() from public;
grant execute on function public.docvy_public_directory() to anon,authenticated;

-- Requests must match one actual practice; no fabricated slots or availability.
do $migration$
declare definition text; old_check text;
begin
 definition:=pg_get_functiondef('public.docvy_submit_directory_request(uuid,jsonb,text)'::regprocedure);
 old_check:='if not found or selected.city is distinct from p_payload->>''city'' or selected.facility is distinct from p_payload->>''facility'' then';
 if position(old_check in definition)=0 then raise exception 'Unexpected booking function; inspect before migrating'; end if;
 definition:=replace(definition,old_check,$check$if not found or not (
 (jsonb_array_length(selected.practice_locations)=0 and selected.city=p_payload->>'city' and selected.facility=p_payload->>'facility')
 or exists(select 1 from jsonb_array_elements(selected.practice_locations) l where l->>'city'=p_payload->>'city' and l->>'facility'=p_payload->>'facility')
 ) then$check$);
 -- Repair the existing double-escaped contact expressions without weakening validation.
 definition:=replace(definition,chr(92)||chr(92),chr(92));
 execute definition;
end $migration$;
