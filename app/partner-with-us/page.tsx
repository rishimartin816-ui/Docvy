import Link from "next/link";
import { Breadcrumbs } from "@/components/DirectoryPage";
import PartnerApplicationForm from "@/components/PartnerApplicationForm";
import { directorySpecialties } from "@/lib/directory";
import { buildPageSocialMetadata } from "@/lib/metadata";
export const dynamic="force-dynamic";
const title="Partner with DOCVY | Add your doctor profile";
const description="Not listed on DOCVY? Doctors and authorised clinic representatives can submit professional details and written consent for a reviewed directory profile.";
export const metadata={title:{absolute:title},description,alternates:{canonical:"/partner-with-us"},...buildPageSocialMetadata(title,description,"/partner-with-us")};
export default function Page(){return <div className="mx-auto max-w-3xl px-5 py-12"><Breadcrumbs items={[{name:"Partner with us",href:"/partner-with-us"}]}/><h1 className="text-4xl font-medium sm:text-5xl">Partner with us.</h1><p className="mt-5 text-lg leading-8">Not listed on DOCVY yet? Tell us about your professional work and where you practise. Doctors and authorised clinic or hospital representatives can submit a profile for review.</p><aside className="my-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-5"><p className="text-sm">Already listed? Search your name and claim the existing profile.</p><Link href="/claim-profile" className="docvy-pill">Search your name</Link></aside><PartnerApplicationForm specialties={directorySpecialties.map(s=>s.name)}/><p className="mt-6 text-sm leading-7 text-grey">Each application is reviewed before publication. Written consent and registration verification are separate checks. Questions? <a href="mailto:contact@docvy.in" className="underline">contact@docvy.in</a>.</p></div>;}
