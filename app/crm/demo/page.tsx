import { notFound, redirect } from "next/navigation";
import StagingCalendar from "@/components/StagingCalendar";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";
export const dynamic="force-dynamic";
export const metadata={title:"DOCVY appointments",alternates:{canonical:"/crm/demo"},robots:{index:false,follow:false}};
export default function Page(){if(process.env.VERCEL_ENV==='production')redirect('/founder');const config=clinicCrmConfig();if(!config?.staging)notFound();return <StagingCalendar clinic clinicName={config.clinicName} staging/>;}
