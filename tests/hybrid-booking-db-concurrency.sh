#!/usr/bin/env bash
set -euo pipefail
submit() {
  local key="$1" hash="$2"
  psql -X -v ON_ERROR_STOP=1 -Atc "select public.docvy_booking_submit(jsonb_build_object(
    'idempotencyKey','${key}',
    'providerId','docvy-qa-doctor',
    'city','Gurugram','facility','DOCVY QA Clinic',
    'name','QA Concurrent','mobile','9876543212',
    'email','test@example.org','consent',true,
    'slotId','00000000-0000-4000-8000-000000000003',
    'networkHash',repeat('${hash}',64)
  ));"
}
set +e
submit '00000000-0000-4000-8000-000000000012' c > /tmp/docvy-booking-a.log 2>&1 &
pid_a=$!
submit '00000000-0000-4000-8000-000000000013' d > /tmp/docvy-booking-b.log 2>&1 &
pid_b=$!
wait "$pid_a"
result_a=$?
wait "$pid_b"
result_b=$?
set -e
if [ "$result_a" -eq "$result_b" ]; then
  echo "Expected exactly one success and one conflict; statuses: $result_a, $result_b"
  exit 1
fi
count="$(psql -X -v ON_ERROR_STOP=1 -Atc "select count(*) from public.crm_bookings where slot_id='00000000-0000-4000-8000-000000000003'")"
if [ "$count" != "1" ]; then
  echo "Expected one booked slot, got $count"
  exit 1
fi
status="$(psql -X -v ON_ERROR_STOP=1 -Atc "select status from public.docvy_booking_cases where slot_id='00000000-0000-4000-8000-000000000003'")"
if [ "$status" != "confirmed" ]; then
  echo "Expected a confirmed booking, got $status"
  exit 1
fi
echo "PASS: concurrent attempts produced exactly one confirmed booking; no double booking."
