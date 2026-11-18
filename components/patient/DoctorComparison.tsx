'use client';
import Link from 'next/link';
import {practiceLocationLabel} from '@/lib/practice-labels';
import {X} from 'lucide-react';
import type {matchingHomeDoctors} from '@/lib/home-doctor-discovery';
import s from './DoctorComparison.module.css';
export default function DoctorComparison({selected,onRemove}:{selected:ReturnType<typeof matchingHomeDoctors>;onRemove:(id:string)=>void}){
 if(!selected.length)return null;
 return <section className={s.panel} aria-labelledby="shortlist-title"><div className={s.heading}><div><span>YOUR SHORTLIST · {selected.length}/3</span><h3 id="shortlist-title">Compare before you choose.</h3></div><p role="status">{selected.length===1?'Add another doctor to compare.':'Published information, side by side.'}</p></div><div className={s.scroll} tabIndex={0} role="region" aria-label="Doctor comparison table"><table><caption className="sr-only">Selected doctors and their matching practice details</caption><thead><tr><th scope="col">Published details</th>{selected.map(({doctor})=><th scope="col" key={doctor.id}><span>{doctor.name}</span><button type="button" onClick={()=>onRemove(doctor.id)} aria-label={'Remove '+doctor.name+' from shortlist'}><X size={16}/></button></th>)}</tr></thead><tbody>
 {[['Specialty',({doctor}:typeof selected[number])=>doctor.specialties.join(', ')],['Practice',({location}:typeof selected[number])=>location.facility+', '+practiceLocationLabel(location)],['Consultation fee',({location}:typeof selected[number])=>location.fee===null?'Fee confirmed on request':'₹'+location.fee.toLocaleString('en-IN')],['Experience',({doctor}:typeof selected[number])=>doctor.experienceYears===null?'Not published':doctor.experienceYears+' years'],['Languages',({doctor}:typeof selected[number])=>doctor.languages.join(', ')||'Not published']] .map(([label,value])=><tr key={label as string}><th scope="row">{label as string}</th>{selected.map(item=><td key={item.doctor.id}>{(value as (item:typeof selected[number])=>string)(item)}</td>)}</tr>)}
 <tr><th scope="row">Next step</th>{selected.map(({doctor,location})=><td key={doctor.id}><Link href={doctor.bookable?{pathname:'/book',query:{provider:doctor.id,city:location.city,facility:location.facility}}:doctor.href}>{doctor.bookable?'Book an Appointment':'View profile'}</Link></td>)}</tr>
 </tbody></table></div><p className={s.note}>Fees apply to the displayed practice. Preferred times require confirmation. This comparison does not rank clinical quality.</p></section>;
}
