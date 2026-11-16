begin;

create view public.crm_calendar_with_fees with (security_invoker = true) as
select s.id, s.starts_at, s.ends_at, s.blocked, b.id as booking_id, s.clinic_id,
       b.status as booking_status, b.fee_paise
from public.crm_slots s
left join public.crm_bookings b on b.slot_id = s.id and b.status <> 'cancelled';

revoke all on public.crm_calendar_with_fees from public, anon, authenticated;
grant select on public.crm_calendar_with_fees to service_role;

commit;
