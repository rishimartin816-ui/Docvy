import MockupPages from "@/components/mockups/MockupPages";
import { buildPageSocialMetadata } from "@/lib/metadata";
export const dynamic="force-dynamic";
const title="Doctor Registration | List Your Practice on DOCVY";
const description="Register your doctor or clinic profile with DOCVY. Submit qualifications, practice details and listing consent, or get help from our team on WhatsApp.";
export const metadata={title:{absolute:title},description,alternates:{canonical:"/partner-with-us"},...buildPageSocialMetadata(title,description,"/partner-with-us")};
export default function Page(){ return <MockupPages page="partner"/>; }
