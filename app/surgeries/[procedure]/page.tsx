import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, DoctorCards } from "@/components/DirectoryPage";
import { directoryProcedures, doctorsIn, slugify } from "@/lib/directory";
import { specialties } from "@/lib/care-directory";
import { buildPageSocialMetadata } from "@/lib/metadata";

type Props = { params: { procedure: string } };
function lookup(slug: string) {
  const procedure = directoryProcedures.find((item) => item.slug === slug);
  if (!procedure) notFound();
  return procedure;
}
export function generateStaticParams() { return directoryProcedures.map(({ slug }) => ({ procedure: slug })); }
export function generateMetadata({ params }: Props) {
  const procedure = lookup(params.procedure);
  const description = "Prepare for a conversation about " + procedure.name.toLowerCase() + ", explore the relevant specialty, and see any doctors listed for this procedure.";
  const path = "/surgeries/" + procedure.slug;
  return { title: procedure.name, description, alternates: { canonical: path }, ...buildPageSocialMetadata(procedure.name + " | DOCVY", description, path) };
}
export default function SurgeryPage({ params }: Props) {
  const procedure = lookup(params.procedure);
  const specialty = slugify(procedure.specialty);
  const doctors = doctorsIn(undefined, specialty).filter((doctor) => doctor.procedures?.some((name) => slugify(name) === procedure.slug));
  return <div className="docvy-garden"><div className="mx-auto max-w-5xl px-5 py-12 sm:px-9">
    <Breadcrumbs items={[{ name: "Surgery guide", href: "/surgery-guide" }, { name: procedure.name, href: "/surgeries/" + procedure.slug }]} />
    <h1 className="text-4xl font-bold sm:text-6xl">{procedure.name}</h1>
    <p className="mt-4">Listed specialty {specialties.some(({ slug }) => slug === specialty) ? <Link href={"/specialties/" + specialty} className="underline">{procedure.specialty}</Link> : procedure.specialty}.</p>
    {procedure.slug === "pacemaker-implantation" && <p className="mt-2 text-sm">Specialty classification is pending medical review.</p>}
    <section className="docvy-glass mt-6 p-6"><h2 className="text-2xl font-bold">Questions for your consultation</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5"><li>Why is this procedure being considered for me, and what are my alternatives?</li><li>What should I bring and what should I plan for after the visit?</li><li>Who can explain the likely costs and follow-up arrangements?</li></ul>
      <Link className="docvy-pill mt-5" href="/surgery-guide">Open the surgery preparation guide</Link>
    </section>
    <section className="mt-7"><h2 className="text-2xl font-bold">Doctors listed for this procedure</h2>{doctors.length ? <DoctorCards doctors={doctors} /> : <p className="mt-3">There are no live listings for this procedure yet.</p>}</section>
  </div></div>;
}
