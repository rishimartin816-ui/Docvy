-- Seed only the isolated, single-doctor test calendar.
insert into public.crm_slots(starts_at, ends_at)
select start_time, start_time + interval '30 minutes'
from generate_series(
  date_trunc('day', now()) + interval '2 days 5 hours',
  date_trunc('day', now()) + interval '2 days 7 hours',
  interval '30 minutes'
) as start_time
on conflict do nothing;
