-- Seed only the isolated, single-doctor test calendar.
insert into public.crm_slots(clinic_id, starts_at, ends_at)
select '7dfbf055-2737-448c-921e-c074d84393d4', start_time, start_time + interval '30 minutes'
from generate_series(
  date_trunc('day', now()) + interval '2 days 5 hours',
  date_trunc('day', now()) + interval '2 days 7 hours',
  interval '30 minutes'
) as start_time
on conflict do nothing;
