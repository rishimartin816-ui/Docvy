import {ChevronDown, Stethoscope} from 'lucide-react';
import {publishedDoctorServices} from '@/lib/doctor-presentation';
import {canRequestAppointment} from '@/lib/profile-policy';
import type {ProviderCandidate} from '@/lib/provider-candidates';
import s from './patient/experience.module.css';

export default function DoctorTreatments({doctor}: {doctor: ProviderCandidate}) {
  const services = canRequestAppointment(doctor) ? publishedDoctorServices(doctor.profileDetails) : [];
  if (!services.length) return null;
  const list = (items: string[]) => <ul className={s.servicesList}>{items.map(service => <li key={service}><span className={s.serviceIcon}><Stethoscope size={18} aria-hidden="true"/></span><span>{service}</span></li>)}</ul>;
  return <section id="doctor-services" className={s.profileSection} aria-labelledby="doctor-services-heading">
    <span className={s.eyebrow}>Care offered</span>
    <h2 id="doctor-services-heading" className="mt-3">Surgeries &amp; Treatments Offered by {doctor.name}</h2>
    {list(services.slice(0, 4))}
    {services.length > 4 && <details className={s.servicesMore}><summary>View all {services.length} services<ChevronDown size={17} aria-hidden="true"/></summary>{list(services.slice(4))}</details>}
  </section>;
}
