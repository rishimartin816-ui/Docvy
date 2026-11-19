import Link from "next/link";
import SpecialtyIcon from "../SpecialtyIcon";
import { specialties } from "@/lib/care-directory";
export default function MockupSpecialties() {
  return (
    <div className="mock-page mock-specialties-page">
      <h1>Explore Medical Specialties</h1>
      <p>
        Choose a specialty to understand what the doctor does and browse
        profiles.
      </p>
      <div className="mock-reference-specialty-grid">
        {[
          ...specialties.map((s) => ({ ...s, href: "/specialties/" + s.slug })),
          {
            slug: "ophthalmology",
            name: "LASIK & Vision Correction",
            plain: "Laser eye surgery consultation",
            href: "/doctors/specialty/ophthalmology",
          },
        ].map((s) => (
          <Link href={s.href} key={s.name}>
            <SpecialtyIcon slug={s.slug} />
            <h2>{s.name}</h2>
            <p>{s.plain}</p>
          </Link>
        ))}
      </div>
      <Link className="mock-button" href="/doctors">
        Search All Doctors →
      </Link>
    </div>
  );
}
