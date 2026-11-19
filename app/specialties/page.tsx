import MockupSpecialties from "@/components/mockups/MockupSpecialties";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Medical specialties explained", description: "Learn what common medical specialties do, from skin and hair to bones and joints, and what to bring to a first appointment.", alternates: { canonical: "/specialties" } };

export default function SpecialtiesPage(){return <MockupSpecialties/>;}
