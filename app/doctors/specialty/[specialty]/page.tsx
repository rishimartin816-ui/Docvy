import { specialtyDoctorTitle } from "@/lib/specialty-taxonomy";
import { notFound } from "next/navigation";
import { getDirectoryDoctors } from "@/lib/public-directory";
import Link from "next/link";
import { Breadcrumbs, DoctorCards } from "@/components/DirectoryPage";
import { directorySpecialties, doctorsIn } from "@/lib/directory";
import { buildPageSocialMetadata, productionOrigin } from "@/lib/metadata";
import { doctorPath } from "@/lib/directory-normalization";

type Props = { params: { specialty: string } };
export function generateStaticParams() { return directorySpecialties.map(({ slug }) => ({ specialty: slug })); }
export function generateMetadata({ params }: Props) {
  const specialty = directorySpecialties.find(({ slug }) => slug === params.specialty);
  if (!specialty) notFound();
  const title = specialtyDoctorTitle(specialty.slug,specialty.name) + " in India";
  const description = "Browse DOCVY listings for " + specialty.name.toLowerCase() + " doctors across India.";
  const path = "/doctors/specialty/" + specialty.slug;
  return { title, description, alternates: { canonical: path }, robots: { index: false, follow: true }, ...buildPageSocialMetadata(title + " | DOCVY", description, path) };
}
export default async function SpecialtyDoctorsPage({ params }: Props) {
  const specialty = directorySpecialties.find(({ slug }) => slug === params.specialty);
  if (!specialty) notFound();
  const doctors = doctorsIn(undefined, specialty.slug, await getDirectoryDoctors());
  const shown = doctors.slice(0,20);
  return <div className="mx-auto max-w-site px-5 py-12 sm:px-8">
    <Breadcrumbs items={[{ name: "Doctors", href: "/doctors" }, { name: specialty.name, href: "/doctors/specialty/" + specialty.slug }]} />
    <h1 className="text-4xl font-medium">{specialtyDoctorTitle(specialty.slug,specialty.name)} in India</h1>
    <h2 className="mt-8 text-2xl font-medium">Doctor listings</h2>
    {doctors.length ? <><p className="mt-4">{doctors.length} published profiles. Showing up to 20 here.</p><DoctorCards doctors={shown} /><Link className="docvy-pill mt-5" href={{pathname:"/doctors",query:{specialty:specialty.slug}}}>View all results and filter by hospital or area</Link><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"ItemList",itemListElement:shown.map((doctor,i)=>({"@type":"ListItem",position:i+1,name:doctor.name,url:productionOrigin+doctorPath(doctor)}))}).replace(/</g,"\\u003c")}}/></> : <p className="mt-4">Doctors are joining soon. <Link className="underline" href="/specialties">Explore specialty guides</Link>.</p>}
  </div>;
}
