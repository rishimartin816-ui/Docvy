import type { ProviderCandidate } from "./provider-candidates";
export function canRequestAppointment(doctor: ProviderCandidate) {
  return doctor.live === true && doctor.consentGiven === true &&
    (doctor.profileStatus === "claimed" || doctor.profileStatus === "verified");
}
export function isVerified(doctor: ProviderCandidate) {
  return canRequestAppointment(doctor) && doctor.profileStatus === "verified" &&
    Boolean(doctor.registrationNumber && doctor.registrationCouncil && doctor.verifiedAt);
}
export function ownedPortrait(url?: string | null) {
  return Boolean(url && (/^\/uploads\/[a-zA-Z0-9/_.-]+$/.test(url) || /^https:\/\/cxyscxjauxoizvvllmfu\.supabase\.co\/storage\/v1\/object\/public\/docvy-provider-photos\/[a-z0-9/-]+\.(jpg|png|webp)$/.test(url)));
}
