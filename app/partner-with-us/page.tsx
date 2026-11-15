import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/DirectoryPage";
import PartnerApplicationForm from "@/components/PartnerApplicationForm";
import { directorySpecialties } from "@/lib/directory";
import { buildPageSocialMetadata } from "@/lib/metadata";
export const dynamic="force-dynamic";
const title="Doctor Registration | List Your Practice on DOCVY";
const description="Register your doctor or clinic profile with DOCVY. Submit qualifications, practice details and listing consent, or get help from our team on WhatsApp.";
export const metadata={title:{absolute:title},description,alternates:{canonical:"/partner-with-us"},...buildPageSocialMetadata(title,description,"/partner-with-us")};
const whatsappHref="https://wa.me/919311779708?text="+encodeURIComponent("Hi DOCVY, I would like help listing my doctor profile.");
export default function Page(){return <div className="mx-auto max-w-3xl px-5 py-10"><Breadcrumbs items={[{name:"Partner With Us",href:"/partner-with-us"}]}/><h1 className="text-4xl font-medium sm:text-5xl">Partner With Us</h1><p className="mt-4 leading-7">Add your doctor profile with professional qualifications, experience and clinic details.</p><aside className="my-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4"><div><p className="text-sm font-medium">Prefer help with your listing?</p><p className="mt-1 text-sm text-grey">+91 93117 79708</p></div><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="docvy-pill"><MessageCircle size={18} aria-hidden="true"/>WhatsApp Help</a><Link href="/claim-profile" className="text-sm underline">Already listed? Claim your profile</Link></aside><PartnerApplicationForm specialties={directorySpecialties.map(s=>s.name)}/><p className="mt-5 text-sm text-grey">Questions? <a href="mailto:contact@docvy.in" className="underline">contact@docvy.in</a></p></div>;}
