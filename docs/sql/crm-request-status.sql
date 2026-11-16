-- Status-only coordination and cancellation must remain possible after provider opt-out.
-- New requests and any changes to contact/request data still require current consent.
create or replace function docvy_private.guard_directory_request() returns trigger
language plpgsql security definer set search_path='' as $$
begin
 if tg_op='UPDATE' and new.provider_id=old.provider_id and new.request_id=old.request_id
  and new.contact_phone=old.contact_phone and new.request_data=old.request_data
  and new.network_hash=old.network_hash and new.consent_version=old.consent_version
  and new.consented_at=old.consented_at and new.created_at=old.created_at and new.reference=old.reference then return new;end if;
 if not exists(select 1 from public.docvy_directory_providers p where p.provider_id=new.provider_id
  and p.enabled and p.published and p.consent_given and p.profile_status in ('claimed','verified') and docvy_private.directory_visible(p.provider_id)) then
  raise exception using errcode='PT403',message='This doctor has not enabled appointment requests';end if;
 return new;
end;$$;
