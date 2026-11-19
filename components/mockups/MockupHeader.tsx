"use client";
import Link from "next/link";
import BrandLogo from "../BrandLogo";
import { Bell, MapPin, Menu } from "lucide-react";
import { useRef } from "react";
export default function MockupHeader() {
  const menu = useRef<HTMLDetailsElement>(null);
  return (
    <header className="approved-header">
      <Link href="/" aria-label="DOCVY home">
        <BrandLogo priority className="approved-logo" />
      </Link>
      <div className="approved-header-actions">
        <Link href="/doctors" className="approved-location">
          <MapPin size={15} /> <span>India</span>
          <span aria-hidden="true">⌄</span>
        </Link>
        <details className="approved-notifications">
          <summary aria-label="Notifications">
            <Bell size={19} />
          </summary>
          <p>
            Notifications appear in your clinic workspace after sign-in.{" "}
            <Link href="/crm/clinic">Sign in</Link>
          </p>
        </details>
        <details
          ref={menu}
          onKeyDown={(e) => {
            if (e.key === "Escape") menu.current?.removeAttribute("open");
          }}
        >
          <summary aria-label="Open navigation">
            <Menu size={23} />
          </summary>
          <nav aria-label="Main">
            {[
              ["/doctors", "Find doctors"],
              ["/specialties", "All specialties"],
              ["/surgery-guide", "Surgeries"],
              ["/care-guide", "Health guides"],
              ["/for-doctors", "For doctors"],
              ["/for-clinics", "For clinics"],
              ["/pricing", "Pricing"],
              ["/partner-with-us", "Partner with us"],
              ["/crm/clinic", "Clinic login"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => menu.current?.removeAttribute("open")}
              >
                {label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
