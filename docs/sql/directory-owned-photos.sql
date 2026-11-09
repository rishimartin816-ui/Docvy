alter table docvy_private.profile_requests add column photo_path text;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('docvy-profile-submissions','docvy-profile-submissions',false,2097152,array['image/jpeg','image/png','image/webp']),
 ('docvy-provider-photos','docvy-provider-photos',true,2097152,array['image/jpeg','image/png','image/webp']);

create function public.docvy_can_submit_profile_photo(p_path text) returns boolean
language sql stable security definer set search_path='' as $$
 select exists(select 1 from docvy_private.profile_requests r where r.photo_path=p_path and r.kind='claim' and r.status='pending' and r.created_at>now()-interval '24 hours');
$$;
revoke all on function public.docvy_can_submit_profile_photo(text) from public;
grant execute on function public.docvy_can_submit_profile_photo(text) to anon,authenticated;
create policy "claim photo create only" on storage.objects for insert to anon,authenticated
 with check(bucket_id='docvy-profile-submissions' and public.docvy_can_submit_profile_photo(name));
create policy "owner private photo review" on storage.objects for select to authenticated
 using(bucket_id='docvy-profile-submissions' and public.docvy_is_directory_admin());
create policy "owner approved photo create" on storage.objects for insert to authenticated
 with check(bucket_id='docvy-provider-photos' and public.docvy_is_directory_admin());
create policy "owner approved photo read" on storage.objects for select to authenticated
 using(bucket_id='docvy-provider-photos' and public.docvy_is_directory_admin());
-- The private upload path is an unguessable capability, derived from the idempotency UUID.
-- Only a pending claim can receive a single immutable upload; it is never public before approval.
create function docvy_private.assign_claim_photo() returns trigger
language plpgsql set search_path='' as $$
begin
 if new.kind='claim' then new.photo_path:=new.id::text||'.webp'; end if;
 return new;
end; $$;
revoke all on function docvy_private.assign_claim_photo() from public,anon,authenticated;
create trigger claim_photo_path before insert on docvy_private.profile_requests for each row execute function docvy_private.assign_claim_photo();
create or replace function public.docvy_update_directory_profile(p_id text,p_action text,p_data jsonb) returns boolean
language plpgsql security definer set search_path='' as $$
declare p public.docvy_directory_providers%rowtype; evidence text; request_row docvy_private.profile_requests%rowtype;
begin
 if not public.docvy_is_directory_admin() then raise exception using errcode='PT403',message='Owner access required'; end if;
 evidence:=btrim(p_data->>'evidence');
 if coalesce(length(evidence),0) not between 10 and 2000 or p_action not in ('claim','verify','unpublish','publish','revoke','reject') then
 raise exception using errcode='PT400',message='Record the action and review evidence'; end if;
 select * into p from public.docvy_directory_providers where provider_id=p_id for update;
 if not found then raise exception using errcode='PT404',message='Profile not found'; end if;
 if p_action='claim' then
 if p_data->>'confirmedConsent' is distinct from 'true' or p_data->>'consentMethod' not in ('form','email')
 or coalesce(length(p_data->>'registrationNumber'),0)<2 or coalesce(length(p_data->>'registrationCouncil'),0)<2 then
 raise exception using errcode='PT400',message='Written consent and registration details are required'; end if;
 if p_data->>'consentMethod'='form' then
 select * into request_row from docvy_private.profile_requests where id::text=p_data->>'requestId' and kind='claim' and provider_id=p_id and consent and status='pending';
 if not found then raise exception using errcode='PT400',message='Choose a pending claim'; end if;
 end if;
 update public.docvy_directory_providers set profile_status='claimed',consent_given=true,
 consent_date=now(),consent_method=p_data->>'consentMethod',registration_number=p_data->>'registrationNumber',registration_council=p_data->>'registrationCouncil',
 verified_at=null,approved_bio=left(p_data->>'bio',2000),photo_url=case when p_data->>'photoUrl' is not null and exists(select 1 from storage.objects o where o.bucket_id='docvy-provider-photos' and o.name=p_id||'/'||(p_data->>'requestId')||'.webp') then 'https://cxyscxjauxoizvvllmfu.supabase.co/storage/v1/object/public/docvy-provider-photos/'||p_id||'/'||(p_data->>'requestId')||'.webp' end where provider_id=p_id;
 if request_row.id is not null then update docvy_private.profile_requests set status='approved' where id=request_row.id; end if;
 elsif p_action='verify' then
 if p.profile_status='unclaimed' or not p.consent_given or p_data->>'manuallyChecked' is distinct from 'true'
 or coalesce(length(p.registration_number),0)<2 or coalesce(length(p.registration_council),0)<2 then
 raise exception using errcode='PT400',message='Approve consent and manually check registration first'; end if;
 update public.docvy_directory_providers set profile_status='verified',verified_at=now() where provider_id=p_id;
 elsif p_action='revoke' then
 update public.docvy_directory_providers set profile_status='unclaimed',consent_given=false,consent_date=null,consent_method=null,verified_at=null,photo_url=null,approved_bio=null where provider_id=p_id;
 elsif p_action='unpublish' then
 update public.docvy_directory_providers set published=false where provider_id=p_id;
 update docvy_private.profile_requests set status='completed' where provider_id=p_id and kind='removal' and status='pending';
 elsif p_action='publish' then
 if exists(select 1 from docvy_private.profile_requests where provider_id=p_id and kind='removal' and status='pending') then
 raise exception using errcode='PT400',message='Resolve removal requests before publishing'; end if;
 update public.docvy_directory_providers set published=true where provider_id=p_id;
 elsif p_action='reject' then
 update docvy_private.profile_requests set status='rejected' where provider_id=p_id and id::text=p_data->>'requestId' and status='pending';
 end if;
 insert into docvy_private.consent_audit(provider_id,actor,action,evidence) values(p_id,auth.uid(),p_action,evidence);
 return true;
end; $$;
