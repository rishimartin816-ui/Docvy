begin;
create view public.crm_requestable_slots with (security_invoker=true) as
 select s.id,s.clinic_id,s.provider_id,s.starts_at,s.ends_at,s.fee_paise
 from public.crm_slots s join public.crm_clinics c on c.id=s.clinic_id and c.booking_enabled
 where s.provider_id is not null and not s.blocked and s.starts_at>clock_timestamp()
 and exists(select 1 from public.crm_enquiry_routes r where r.clinic_id=s.clinic_id and r.provider_id=s.provider_id and r.enabled)
 and not exists(select 1 from public.crm_bookings b where b.slot_id=s.id and b.status<>'cancelled');
revoke all on public.crm_requestable_slots from public,anon,authenticated;
grant select on public.crm_requestable_slots to service_role;
commit;
