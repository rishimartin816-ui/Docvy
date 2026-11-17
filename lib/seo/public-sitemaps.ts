import 'server-only';
import {specialties} from '@/lib/care-directory';
import {patientTopicGuides} from '@/lib/patient-topic-guides';
import {availableCities,cities,citySlug,directoryProcedures,directorySpecialties,doctorsIn,slugify} from '@/lib/directory';
import {doctorPath} from '@/lib/directory-normalization';
import {getDirectoryDoctors} from '@/lib/public-directory';
import {isVerified} from '@/lib/profile-policy';
import {paginateGroups} from './segmented-sitemaps';

// Only the existing public directory RPC; no CRM, appointment or private provider reads.
export const staticSitemapGroups = {
  static:['','/about','/contact','/hi','/for-doctors','/partner-with-us','/faqs','/grievance','/how-it-works','/pricing','/hospitals','/legal/privacy','/legal/terms','/legal/refund','/legal/disclaimer'],
  directories:['/doctors'],
  specialties:['/specialties',...specialties.map(s=>'/specialties/'+s.slug)],
  surgeries:['/surgery-guide',...directoryProcedures.map(p=>'/surgeries/'+p.slug)],
  content:['/care-guide',...patientTopicGuides.map(g=>'/patient-guides/'+g.slug)],
};
export const staticSitemapPages=paginateGroups(staticSitemapGroups);
export const indexingEnabled=()=>process.env.VERCEL_ENV==='production'&&process.env.DOCVY_INDEXING_ENABLED==='true';
export async function getPublicSitemapPages(){
  const doctors=await getDirectoryDoctors();
  // Match the existing metadata's three-profile minimum and actual route registry.
  const indexable=availableCities(doctors,3).filter(c=>cities.some(known=>known.slug===c.slug));
  return paginateGroups({...staticSitemapGroups,
    'doctor-profiles':doctors.filter(isVerified).map(doctorPath),
    cities:indexable.map(c=>'/doctors/'+c.slug),
    localities:indexable.flatMap(c=>{
      const local=doctorsIn(c.slug,undefined,doctors);
      return [...new Set(local.flatMap(d=>d.locations.filter(l=>citySlug(l.city)===c.slug&&l.locality).map(l=>l.locality!)))].filter(area=>local.filter(d=>d.locations.some(l=>citySlug(l.city)===c.slug&&l.locality===area)).length>=3).map(area=>'/doctors/'+c.slug+'/areas/'+slugify(area));
    }),
    'doctor-specialty-city':indexable.flatMap(c=>directorySpecialties.filter(s=>doctorsIn(c.slug,s.slug,doctors).length>=3).map(s=>'/doctors/'+c.slug+'/'+s.slug)),
  });
}
