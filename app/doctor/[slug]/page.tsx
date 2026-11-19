import { Breadcrumbs } from "@/components/DirectoryPage";
import MockupDoctor from "@/components/mockups/MockupDoctor";
import { doctorPath } from "@/lib/directory-normalization";
import { doctorDescription } from "@/lib/doctor-profile";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { practiceLocationLabel } from "@/lib/practice-labels";
import { getDirectoryDoctors } from "@/lib/public-directory";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
type Props = { params: { slug: string } };
async function lookup(slug: string) {
  const doctor = (await getDirectoryDoctors()).find(item => item.id === slug || item.profileSlug === slug);
  if (!doctor) notFound();
  return doctor;
}
export async function generateMetadata({ params }: Props) {
  const doctor = await lookup(params.slug);
  const description = doctorDescription(doctor);
  const path = doctorPath(doctor);
  return { title: doctor.name + " | " + doctor.specialties[0] + " in " + practiceLocationLabel(doctor.locations[0]), description, alternates: { canonical: path }, ...buildPageSocialMetadata(doctor.name + " | DOCVY", description, path) };
}
export default async function DoctorPage({ params }: Props){const doctor=await lookup(params.slug); const related=(await getDirectoryDoctors()).filter(d=>d.id!==doctor.id&&d.specialties.some(s=>doctor.specialties.includes(s))).slice(0,3);return <><Breadcrumbs items={[{name:"Doctors",href:"/doctors"},{name:doctor.name,href:doctorPath(doctor)}]}/><MockupDoctor doctor={doctor} related={related}/></>; }
