-- Match source-listed clinical departments; do not infer unrelated specialties from oncology focus areas.
-- Keep the hospital brand when a branch is not confirmed by the profile.
update public.docvy_directory_providers set specialties='["Paediatric surgery"]'::jsonb where provider_id='dr-anurag-krishna-delhi';
update public.docvy_directory_providers set specialties='["Radiation oncology"]'::jsonb where provider_id='dr-charu-garg-delhi';
update public.docvy_directory_providers set specialties='["Medical oncology"]'::jsonb where provider_id='dr-pramod-kumar-julka-delhi';
update public.docvy_directory_providers set specialties='["Radiology"]'::jsonb where provider_id='dr-k-naveen-kumar-ghaziabad';
update public.docvy_directory_providers set facility='Yashoda Hospitals' where provider_id in ('dr-shailendra-kumar-ghaziabad','dr-siddharth-badola-ghaziabad','dr-surg-lt-cdr-anushree-vartak-ghaziabad','dr-manish-kumar-sharma-ghaziabad');
