begin;
create extension if not exists btree_gist with schema extensions;

alter table public.crm_slots
  drop constraint crm_slots_tstzrange_excl,
  add constraint crm_slots_clinic_time_excl exclude using gist (
    clinic_id extensions.gist_uuid_ops with =,
    tstzrange(starts_at, ends_at) with &&
  );
commit;
