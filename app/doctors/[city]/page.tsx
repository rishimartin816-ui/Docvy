import { notFound } from "next/navigation";
import DirectoryPage from "@/components/DirectoryPage";
import { cities, doctorsIn } from "@/lib/directory";
import { buildPageSocialMetadata } from "@/lib/metadata";

export function generateStaticParams() { return cities.map(({ slug }) => ({ city: slug })); }

export function generateMetadata({ params }: { params: { city: string } }) {
  const city = cities.find(({ slug }) => slug === params.city);
  if (!city) notFound();
  const title = "Doctors in " + city.name;
  const description = city.intro.split(". ")[0] + ". Explore specialties and prepare for an appointment with DOCVY.";
  const path = "/doctors/" + city.slug;
  return { title, description, alternates: { canonical: path }, ...(doctorsIn(city.slug).length < 3 ? { robots: { index: false, follow: true } } : {}), ...buildPageSocialMetadata(title + " | DOCVY", description, path) };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = cities.find(({ slug }) => slug === params.city);
  if (!city) notFound();
  return <DirectoryPage city={city} />;
}
