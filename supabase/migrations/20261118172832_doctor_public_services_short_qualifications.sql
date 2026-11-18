-- Extend the existing approved public JSON fields; preserve publication/removal policy and all grants.
do $migration$
declare definition text;
begin
  definition := pg_get_functiondef('public.docvy_public_directory()'::regprocedure);
  if position('''qualifications'',p.profile_details->''qualifications'',''experienceYears''' in definition) = 0 then
    raise exception 'Unexpected directory function; inspect before changing its approved field allowlist';
  end if;
  execute replace(definition, '''qualifications'',p.profile_details->''qualifications'',''experienceYears''', '''qualifications'',p.profile_details->''qualifications'',''shortQualifications'',p.profile_details->''shortQualifications'',''services'',case when jsonb_typeof(p.profile_details->''services'')=''array'' then p.profile_details->''services'' else ''[]''::jsonb end,''experienceYears''');
end $migration$;

-- Only presentation facts supplied by the owner or already present in approved biographies.
-- Consultation-only records do not gain inferred operations or condition-specific treatments.
with updates as (select key as provider_id, value as details from jsonb_each('{"dr-murari-kaimal":{"shortQualifications":"MBBS, MS - ENT","services":["Endoscopic Otorhinology","Advanced Sinus & Nasal Surgery","Functional Endoscopic Sinus Surgery (FESS)","Balloon Sinuplasty","Minimally Invasive Airway Surgery","Voice & Airway Procedures","Advanced Ear Surgery","Cochlear & Hearing Implant Surgery","Middle Ear Surgery","Bone-Anchored Hearing Implants","Head & Neck Endoscopic Procedures","Robotic & Technology-Assisted Surgery"]},"dr-ummed-kumar-meena":{"shortQualifications":"MBBS","services":["General Physician Consultation"]},"dr-hassan-ishtiyaque-ali":{"shortQualifications":"MBBS, MD - Respiratory Medicine","services":["OPD Consultations","Teleconsultations"]},"dr-basab-raj-ghosh":{"shortQualifications":"MBBS, MD, DNB - Radiotherapy","services":["Radiation Oncology Consultation"]},"dr-anil-kumar-physiotherapist-delhi":{"shortQualifications":"BPT","services":["Physiotherapy at the Clinic","Physiotherapy at Home"]},"dr-ambika-rao-jhunjhunu-68798490":{"shortQualifications":"BHMS, NDDY, DNHE","services":["Homoeopathy Consultation"]},"mr-sahil-kochale":{"shortQualifications":"MA - Clinical Psychology, PG Dip. - Rehabilitation Psychology","services":["Counselling","Psychotherapy","CBT","REBT","SST","Psychoeducation","Psychological Assessments","IQ Testing","Personality Testing","Personality Development","Career Counselling","Relationship Counselling","Support for Anxiety, Depression and Phobias"]},"dr-sagar-reddy":{"shortQualifications":"MBBS, DCH, PGPN","services":["Newborn Care","Infant Care","Child Health","Child Nutrition","Child Growth","Vaccination"]},"dr-vivek-prakash-rajput":{"shortQualifications":"BAMS, MD","services":["Ayurveda Consultation"]},"dr-channamsetty-sashidhar":{"shortQualifications":"MD, DNB - Nephrology","services":["Nephrology Consultation"]},"bheemreddy-vivek-reddy-karimnagar-24773aea":{"services":["Dental Consultation"]}}'::jsonb))
update public.docvy_directory_providers p
set profile_details = p.profile_details || updates.details, updated_at = now()
from updates where p.provider_id = updates.provider_id;
