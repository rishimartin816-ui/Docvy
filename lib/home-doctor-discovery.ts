export type HomePractice={city:string;facility:string;locality:string;online:boolean;fee:number|null;primary:boolean};
export type HomeDoctor={id:string;name:string;href:string;photoUrl:string|null;specialties:string[];languages:string[];experienceYears:number|null;bookable:boolean;locations:HomePractice[]};
export type HomeDoctorFilters={query:string;city:string;mode:'all'|'in-person'|'online'};
/** All practice filters must match the same location, including the displayed fee. */
export function matchingHomeDoctors(doctors:HomeDoctor[],filters:HomeDoctorFilters){
 const query=filters.query.trim().toLocaleLowerCase('en-IN');
 return doctors.flatMap(doctor=>{const professionalMatch=[doctor.name,...doctor.specialties,...doctor.languages].join(' ').toLocaleLowerCase('en-IN').includes(query);const practices=doctor.locations.filter(location=>(!filters.city||location.city===filters.city)&&(filters.mode==='all'||location.online===(filters.mode==='online'))&&(!query||professionalMatch||[location.city,location.locality,location.facility].join(' ').toLocaleLowerCase('en-IN').includes(query)));if(!practices.length)return [];return [{doctor,location:practices.find(p=>p.primary)??practices[0]}];});
}
