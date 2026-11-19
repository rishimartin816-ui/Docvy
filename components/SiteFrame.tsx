"use client";
import MockupHeader from "./mockups/MockupHeader";
import MockupFooter from "./mockups/MockupFooter";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function SiteFrame({
  children,
  breadcrumbs,
}: {
  children: ReactNode;
  breadcrumbs: ReactNode;
}) {
  const path = usePathname();
  const workspace = path === "/crm" || path.startsWith("/crm/");
  return workspace ? (
    <main id="main">{children}</main>
  ) : (
    <div className="approved-shell">
      <MockupHeader />
      <main id="main">
        {breadcrumbs}
        {children}
      </main>
      {path !== "/design-review/footer" && <MockupFooter />}
    </div>
  );
}
