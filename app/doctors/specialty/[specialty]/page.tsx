import { notFound } from "next/navigation";
import { getDirectoryDoctors } from "@/lib/public-directory";
import Link from "next/link";
import { Breadcrumbs, DoctorCards } from "@/components/DirectoryPage";
import { directorySpecialties, doctorsIn } from "@/lib/directory";
import { buildPageSocialMetadata } from "@/lib/metadata";

type Props = { params: { specialty: string } };
export function generateStaticParams() { return directorySpecialties.map(({ slug }) => ({ specialty: slug })); }
export function generateMetadata({ params }: Props) {
  const specialty = directorySpecialties.find(({ slug }) => slug === params.specialty);
  if (!specialty) notFound();
  const title = specialty.name + " doctors in India";
  const description = "Browse DOCVY listings for " + specialty.name.toLowerCase() + " doctors across India.";
  const path = "/doctors/specialty/" + specialty.slug;
  return { title, description, alternates: { canonical: path }, robots: { index: false, follow: true }, ...buildPageSocialMetadata(title + " | DOCVY", description, path) };
}
export default async function SpecialtyDoctorsPage({ params }: Props) {
  const specialty = directorySpecialties.find(({ slug }) => slug === params.specialty);
  if (!specialty) notFound();
  const doctors = doctorsIn(undefined, specialty.slug, await getDirectoryDoctors());
  return <div className="mx-auto max-w-site px-5 py-12 sm:px-8">
    <Breadcrumbs items={[{ name: "Doctors", href: "/doctors" }, { name: specialty.name, href: "/doctors/specialty/" + specialty.slug }]} />
    <h1 className="text-4xl font-medium">{specialty.name} doctors in India</h1>
    {doctors.length ? <DoctorCards doctors={doctors} /> : <p className="mt-4">Doctors are joining soon. <Link className="underline" href="/specialties">Explore specialty guides</Link>.</p>}
  </div>;
}
