"use client";
import { usePathname } from "next/navigation";
import PublicNextStep from "./patient/PublicNextStep";
import type { ReactNode } from "react";

export default function SiteFrame({children,navigation,footer,breadcrumbs}:{children:ReactNode;navigation:ReactNode;footer:ReactNode;breadcrumbs:ReactNode}){
  const path=usePathname();
  const workspace=path==="/crm"||path.startsWith("/crm/");
  const root=path.split('/')[1];
  const publicRoots=['doctors','specialties','surgeries','patient-guides','care-guide','surgery-guide','hospitals','clinics','about','contact','faqs','how-it-works','pricing','for-doctors','for-clinics','partner-with-us','claim-profile','remove-profile','legal','grievance','patient-access','login','status','hi'];
  const shared=publicRoots.includes(root);
  const provider=['for-doctors','for-clinics','pricing'].includes(root);
  const nextStep=shared&&!['legal','grievance','claim-profile','remove-profile','partner-with-us','patient-access','login','status','hi'].includes(root);
  return workspace?<main id="main">{children}</main>:<>{navigation}<main id="main" className={shared?"docvy-public-page "+(["patient-guides","specialties","surgeries","legal"].includes(root)?"docvy-editorial-page":""):undefined}>{breadcrumbs}{children}{nextStep&&<PublicNextStep provider={provider}/>}</main>{footer}</>;
}
