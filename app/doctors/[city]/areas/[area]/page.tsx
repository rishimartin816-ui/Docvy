import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, DoctorCards } from "@/components/DirectoryPage";
import CityWaitlist from "@/components/CityWaitlist";
import { availableCities, cities, citySlug, doctorsIn, slugify } from "@/lib/directory";
import { getDirectoryDoctors } from "@/lib/public-directory";
import { buildPageSocialMetadata, productionOrigin } from "@/lib/metadata";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";

type Props = { params: { city: string; area: string } };
async function areaData(params: Props["params"]) {
  const city = cities.find(c=>c.slug===params.city); if (!city) notFound();
  const doctors = doctorsIn(city.slug,undefined,await getDirectoryDoctors());
  const area = doctors.flatMap(d=>d.locations).find(l=>citySlug(l.city)===city.slug && l.locality && slugify(l.locality)===params.area)?.locality;
  if (!area) notFound();
  return {city,area,doctors:doctors.filter(d=>d.locations.some(l=>citySlug(l.city)===city.slug && l.locality===area))};
}
export async function generateStaticParams() {
  const doctors = await getDirectoryDoctors();
  return availableCities(doctors).filter(c=>cities.some(known=>known.slug===c.slug)).flatMap(c=>Array.from(new Set(doctorsIn(c.slug,undefined,doctors).flatMap(d=>d.locations.filter(l=>citySlug(l.city)===c.slug && l.locality).map(l=>slugify(l.locality!))))).map(area=>({city:c.slug,area})));
}
export async function generateMetadata({params}:Props) {
  const d=await areaData(params); const title=`Doctors in ${d.area}, ${d.city.name}`;
  const description=`Compare sourced doctor profiles at practices in ${d.area}, ${d.city.name}. Explore specialties and request a visit where the provider has opted in.`;
  const path=`/doctors/${d.city.slug}/areas/${params.area}`;
  return {title,description,alternates:{canonical:path},...(d.doctors.length<3?{robots:{index:false,follow:true}}:{}),...buildPageSocialMetadata(title+" | DOCVY",description,path)};
}
export default async function AreaPage({params}:Props) {
  const d=await areaData(params); const ready=d.doctors.length>=3;const path=`/doctors/${d.city.slug}/areas/${params.area}`;
  return <div className="mx-auto max-w-site px-5 py-12 sm:px-9">
    <Breadcrumbs items={[{name:"Doctors",href:"/doctors"},{name:d.city.name,href:"/doctors/"+d.city.slug},{name:d.area,href:path}]} />
    <h1 className="text-4xl font-medium sm:text-6xl">Doctors in {d.area}, {d.city.name}</h1>
    <p className="mt-6 max-w-3xl leading-8">Find the specialty you need at a practice listed in {d.area}. Check the facility on the profile and confirm the full branch address before travelling. A neighbourhood match is based on the published practice label; it does not show distance from you or guarantee a current consultation slot.</p>
    <section className="mt-8"><h2 className="text-2xl font-medium">{ready?"Doctor profiles in this area":"Doctors are joining soon"}</h2>
      {ready?<><p className="mt-3 text-sm text-grey">{d.doctors.length} published profiles. Appointment requests require approved provider consent.</p><DoctorCards doctors={d.doctors.slice(0,20)} /><Link className="docvy-pill mt-6" href={{pathname:"/doctors",query:{location:d.city.slug,area:d.area}}}>View all profiles and search specialties</Link><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"ItemList",itemListElement:d.doctors.slice(0,20).map((doctor,i)=>({"@type":"ListItem",position:i+1,name:doctor.name,url:productionOrigin+"/doctor/"+doctor.id}))}).replace(/</g,"\\u003c")}} /></>:<CityWaitlist city={d.city.slug} enabled={process.env.DOCVY_WAITLIST_ENABLED==="true" && Boolean(clinicCrmConfig())} />}
    </section>
  </div>;
}
