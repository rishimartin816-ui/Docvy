import test from "node:test";
import assert from "node:assert/strict";
import { decideHybridBooking, isValidTransition } from "../lib/hybrid-booking.ts";

const valid = {
  published: true,
  enabled: true,
  consentGiven: true,
  profileStatus: "verified",
  verifiedAt: "2026-11-16T00:00:00Z",
  practitionerScopeApproved: true,
  rosterLinkedToClinic: true,
  clinicBookingEnabled: true,
  clinicApproverAvailable: true,
  bookingMode: "approval",
  availableDoctorSpecificSlot: false,
};

test("approval mode returns pending rather than confirmed", () => {
  assert.deepEqual(decideHybridBooking(valid), {
    allowed: true, mode: "approval", confirmation: "pending_clinic_approval"
  });
});

test("unverified published provider cannot receive bookings", () => {
  assert.equal(decideHybridBooking({...valid, profileStatus: "claimed", verifiedAt: null}).allowed, false);
});

test("unapproved practitioner scope is blocked", () => {
  assert.equal(decideHybridBooking({...valid, practitionerScopeApproved: false}).allowed, false);
});

test("unlinked clinic and unstaffed approval are blocked", () => {
  assert.equal(decideHybridBooking({...valid, rosterLinkedToClinic: false}).allowed, false);
  assert.equal(decideHybridBooking({...valid, clinicApproverAvailable: false}).allowed, false);
});

test("instant confirmation is conditional on doctor-specific slot", () => {
  assert.equal(decideHybridBooking({...valid, bookingMode: "instant"}).allowed, false);
  assert.deepEqual(decideHybridBooking({
    ...valid, bookingMode: "instant", availableDoctorSpecificSlot: true
  }), {allowed:true,mode:"instant",confirmation:"confirmed_only_after_atomic_commit"});
});

test("final booking lifecycle cannot be forged by jumping states", () => {
  assert.equal(isValidTransition("requested", "completed_reported"), false);
  assert.equal(isValidTransition("requested", "confirmed"), true);
  assert.equal(isValidTransition("confirmed", "completed_reported"), true);
  assert.equal(isValidTransition("cancelled", "confirmed"), false);
  assert.equal(isValidTransition("unknown", "confirmed"), false);
});
