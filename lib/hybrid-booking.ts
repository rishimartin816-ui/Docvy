/** Phase 1 hybrid-booking eligibility rules.
 * Pure guard layer only: database state MUST be rechecked in a single transaction.
 * This module does not create bookings or certify live slot availability.
 */

export type BookingMode = "disabled" | "approval" | "instant";
export type BookingDecision =
  | { allowed: true; mode: "approval"; confirmation: "pending_clinic_approval" }
  | { allowed: true; mode: "instant"; confirmation: "confirmed_only_after_atomic_commit" }
  | { allowed: false; reason: string };

export interface ProviderBookingState {
  published: boolean;
  enabled: boolean;
  consentGiven: boolean;
  profileStatus: string;
  verifiedAt: string | null;
  /** A vetted healthcare provider, not necessarily a medical doctor. */
  practitionerScopeApproved: boolean;
  /** Provider -> roster -> specific clinic linkage has been checked server-side. */
  rosterLinkedToClinic: boolean;
  clinicBookingEnabled: boolean;
  /** Explicitly staffed approval route is operational. */
  clinicApproverAvailable: boolean;
  bookingMode: BookingMode;
  /** Doctor-specific slot whose clinic, time, status and block flag were verified. */
  availableDoctorSpecificSlot: boolean;
}

export function decideHybridBooking(input: ProviderBookingState): BookingDecision {
  if (!input.published || !input.enabled || !input.consentGiven) {
    return { allowed: false, reason: "provider_not_active_or_consented" };
  }
  if (input.profileStatus !== "verified" || !input.verifiedAt) {
    return { allowed: false, reason: "provider_verification_incomplete" };
  }
  if (!input.practitionerScopeApproved) {
    return { allowed: false, reason: "provider_scope_not_approved" };
  }
  if (!input.rosterLinkedToClinic || !input.clinicBookingEnabled) {
    return { allowed: false, reason: "clinic_booking_not_ready" };
  }
  if (input.bookingMode === "disabled") {
    return { allowed: false, reason: "booking_disabled" };
  }
  if (input.bookingMode === "approval") {
    return input.clinicApproverAvailable
      ? { allowed: true, mode: "approval", confirmation: "pending_clinic_approval" }
      : { allowed: false, reason: "clinic_approver_unavailable" };
  }
  if (input.bookingMode === "instant") {
    return input.availableDoctorSpecificSlot
      ? { allowed: true, mode: "instant", confirmation: "confirmed_only_after_atomic_commit" }
      : { allowed: false, reason: "no_confirmable_slot" };
  }
  return { allowed: false, reason: "unsupported_booking_mode" };
}

export function isValidTransition(from: string, to: string): boolean {
  const transitions: Record<string, readonly string[]> = {
    requested: ["confirmed", "declined", "expired", "cancelled"],
    confirmed: ["cancelled", "completed_reported", "disputed"],
    completed_reported: ["disputed"],
    declined: [],
    expired: [],
    cancelled: [],
    disputed: [],
  };
  return transitions[from]?.includes(to) ?? false;
}
