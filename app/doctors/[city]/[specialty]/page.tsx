import { notFound } from "next/navigation";
import DirectoryPage from "@/components/DirectoryPage";
import { cities, directorySpecialties, doctorsIn } from "@/lib/directory";
import { buildPageSocialMetadata } from "@/lib/metadata";

type Props = { params: { city: string; specialty: string } };
export function generateStaticParams() {
  return cities.flatMap(({ slug: city }) => directorySpecialties.map(({ slug: specialty }) => ({ city, specialty })));
}

export function generateMetadata({ params }: Props) {
  const city = cities.find(({ slug }) => slug === params.city);
  const specialty = directorySpecialties.find(({ slug }) => slug === params.specialty);
  if (!city || !specialty) notFound();
  const title = specialty.name + " doctors in " + city.name;
  const description = "Explore " + specialty.name.toLowerCase() + " care in " + city.name + ", see available DOCVY listings, and find questions to take to your appointment.";
  const path = "/doctors/" + city.slug + "/" + specialty.slug;
  return { title, description, alternates: { canonical: path }, ...(doctorsIn(city.slug, specialty.slug).length < 3 ? { robots: { index: false, follow: true } } : {}), ...buildPageSocialMetadata(title + " | DOCVY", description, path) };
}

export default function CitySpecialtyPage({ params }: Props) {
  const city = cities.find(({ slug }) => slug === params.city);
  const specialty = directorySpecialties.find(({ slug }) => slug === params.specialty);
  if (!city || !specialty) notFound();
  return <DirectoryPage city={city} specialty={specialty} />;
}
