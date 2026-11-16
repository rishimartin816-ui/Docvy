"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function SiteFrame({children,navigation,footer,breadcrumbs}:{children:ReactNode;navigation:ReactNode;footer:ReactNode;breadcrumbs:ReactNode}){
  const path=usePathname();
  const workspace=path==="/crm"||path.startsWith("/crm/");
  return workspace?<main id="main">{children}</main>:<>{navigation}<main id="main">{breadcrumbs}{children}</main>{footer}</>;
}
