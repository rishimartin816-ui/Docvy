alter table public.docvy_directory_providers add column if not exists practice_locations jsonb not null default '[]'::jsonb check(jsonb_typeof(practice_locations)='array');
create or replace function public.docvy_public_directory() returns jsonb language sql stable security definer set search_path='' as $function$
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
 'summary',case when p.profile_status<>'unclaimed' then p.approved_bio end
 ) order by p.city,p.doctor_name),'[]'::jsonb)
 from public.docvy_directory_providers p where p.published and docvy_private.directory_visible(p.provider_id);
$function$;
