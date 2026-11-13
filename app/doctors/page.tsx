import Link from "next/link";
import DirectoryFiltersForm from "@/components/DirectoryFilters";
import { Breadcrumbs, DoctorCards } from "@/components/DirectoryPage";
import { availableCities, cities, citySlug, directorySpecialties } from "@/lib/directory";
import { getDirectoryDoctors } from "@/lib/public-directory";
import { buildPageSocialMetadata, productionOrigin } from "@/lib/metadata";
import { directoryPageHref, filterDirectory, parseDirectoryFilters, type DirectoryParams } from "@/lib/directory-filters";
import { doctorPath } from "@/lib/directory-normalization";
export const dynamic="force-dynamic";
const title="Find Doctors by Specialty, Hospital & City | DOCVY";
const description="Filter doctors by specialty, hospital, city and neighbourhood across India. Compare practice details and request a visit where the doctor has opted in.";
async function resultsFor(params:DirectoryParams){const listed=await getDirectoryDoctors();const filters=parseDirectoryFilters(params);const results=filterDirectory(listed,filters);const pages=Math.max(1,Math.ceil(results.length/20));const page=Math.min(pages,filters.requestedPage);return {listed,filters,results,pages,page};}
export async function generateMetadata({searchParams}:{searchParams:DirectoryParams}){
 const {page}=await resultsFor(searchParams);const canonical="/doctors"+(page>1?"?page="+page:"");const pageTitle=title+(page>1?" — Page "+page:"");
 return {title:{absolute:pageTitle},description,alternates:{canonical},...(Object.keys(searchParams).length?{robots:{index:false,follow:true}}:{}),...buildPageSocialMetadata(pageTitle,description,canonical)};
}
export default async function DoctorsPage({searchParams}:{searchParams:DirectoryParams}){
 const {listed,filters,results,pages,page}=await resultsFor(searchParams);const shown=results.slice((page-1)*20,page*20);
 const places=Array.from(new Map(listed.flatMap(d=>d.locations.map(l=>({city:l.city,citySlug:citySlug(l.city),facility:l.facility,area:l.locality??""}))).map(p=>[JSON.stringify(p),p])).values());
 return <div className="mx-auto max-w-site px-5 py-12 sm:px-9">
  <Breadcrumbs items={[{name:"Doctors",href:"/doctors"}]}/>
  <h1 className="text-4xl font-medium sm:text-6xl">Find doctors by specialty and city.</h1><p className="mt-5 max-w-3xl leading-8">Narrow the directory by specialty, hospital or clinic, city and neighbourhood. Appointment requests are available where the doctor has opted in.</p>
  <div className="mt-6"><DirectoryFiltersForm key={JSON.stringify([filters.query,filters.city,filters.facility,filters.area,filters.specialty])} {...filters} cities={availableCities(listed)} specialties={directorySpecialties} places={places}/></div>
  <p className="mt-3 text-sm text-danger">In an emergency, call <a href="tel:112" className="inline-flex min-h-11 items-center font-semibold underline">112</a> or go to the nearest hospital.</p>
  {/\bnear\s+me\b/i.test(filters.query)&&!filters.city&&<p className="mt-3 text-sm text-grey">Choose a city or use the location control to narrow your search. Results are not ordered by distance.</p>}
  <section className="mt-8"><h2 className="text-2xl font-medium">Doctor listings</h2><p role="status" className="mt-3 text-sm text-grey">{results.length} {results.length===1?"profile":"profiles"}{filters.query?` matching “${filters.query}”`:""}. Showing {shown.length?((page-1)*20+1)+"–"+((page-1)*20+shown.length):"0"}. A specialty match does not replace a clinical assessment.</p>
  {shown.length?<><DoctorCards doctors={shown} city={filters.city} facility={filters.facility} area={filters.area}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"ItemList",name:"DOCVY doctor directory",url:productionOrigin+directoryPageHref(filters,page),numberOfItems:shown.length,itemListElement:shown.map((d,i)=>({"@type":"ListItem",position:(page-1)*20+i+1,name:d.name,url:productionOrigin+doctorPath(d)}))}).replace(/</g,"\\u003c")}}/></>:<p className="mt-5">No profiles match these filters. <Link href="/doctors" className="underline">Clear the filters</Link> or <Link href="/specialties" className="underline">explore specialty guides</Link>.</p>}
  {pages>1&&<nav aria-label="Doctor directory pages" className="mt-8 flex flex-wrap items-center gap-3">{page>1&&<Link rel="prev" href={directoryPageHref(filters,page-1)} className="docvy-pill">Previous</Link>}<span>Page {page} of {pages}</span>{page<pages&&<Link rel="next" href={directoryPageHref(filters,page+1)} className="docvy-pill">Next</Link>}</nav>}
  </section>
  <section id="browse-cities" className="mt-10"><h2 className="text-2xl font-medium">Browse by city</h2><ul className="mt-4 flex flex-wrap gap-2">{availableCities(listed).map(c=><li key={c.slug}><Link className="docvy-pill" href={cities.some(known=>known.slug===c.slug)?"/doctors/"+c.slug:"/doctors?location="+c.slug}>{c.name}</Link></li>)}</ul></section>
 </div>;
}
