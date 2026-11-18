import type {ProviderCandidate} from './provider-candidates';

type Details = ProviderCandidate['profileDetails'];

/** Prefer the approved display line; the fallback only repeats degree abbreviations present in the source. */
export function shortQualificationLabel(details: Details) {
  const approved = typeof details?.shortQualifications === 'string' ? details.shortQualifications.trim() : '';
  const source = typeof details?.qualifications === 'string' ? details.qualifications : '';
  return approved || [...new Set(source.match(/\b(?:MBBS|BAMS|BHMS|BDS|MDS|BPT|MPT|DNB|DM|MCh|MD|MS|BA|MA|DCH|PGPN|NDDY|DNHE)\b/g) ?? [])].join(', ');
}

export function publishedDoctorServices(details: Details) {
  return Array.isArray(details?.services) ? [...new Set(details.services.filter(value => typeof value === 'string').map(value => value.trim()).filter(Boolean))] : [];
}
