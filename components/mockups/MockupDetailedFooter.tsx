import Link from "next/link";
import {
  Building2,
  MapPin,
  Stethoscope,
  CalendarDays,
  ClipboardCheck,
  LayoutGrid,
  Scissors,
  BookOpen,
  Layers,
  Info,
  Phone,
  CircleHelp,
  Users,
  Handshake,
  UserPlus,
  UserMinus,
  Youtube,
  Instagram,
  Linkedin,
  ShieldCheck,
} from "lucide-react";
const groups = [
  {
    name: "Find Care",
    items: [
      ["/doctors", "Find Doctors", Stethoscope],
      ["/request", "Book an Appointment", CalendarDays],
      ["/status", "Track Your Appointment", ClipboardCheck],
      ["/specialties", "All Specialties", LayoutGrid],
      ["/surgery-guide", "Surgeries", Scissors],
      ["/care-guide", "Health Guides", BookOpen],
      ["/hospitals", "Hospitals", Building2],
      ["/how-it-works", "How It Works", Layers],
    ],
  },
  {
    name: "DOCVY",
    items: [
      ["/pricing", "Pricing", Layers],
      ["/about", "About", Info],
      ["/contact", "Contact", Phone],
      ["/faqs", "FAQs", CircleHelp],
      ["/for-doctors-and-clinics", "For Doctors & Clinics", Users],
      ["/partner-with-us", "Partner With Us", Handshake],
      ["/claim-profile", "Claim a Profile", UserPlus],
      ["/remove-profile", "Request Removal", UserMinus],
    ],
  },
];
export default function MockupDetailedFooter() {
  return (
    <footer className="mock-detailed-footer">
      <div className="mock-footer-identity">
        <p>
          <Building2 size={23} />
          Operated by DSS Global Technologies Private Limited.
        </p>
        <address>
          <MapPin size={23} />
          Sector 48, Gurugram, Haryana 122101, India.
        </address>
      </div>
      <nav aria-label="Detailed footer">
        {groups.map((g) => (
          <details key={g.name} open>
            <summary>{g.name}</summary>
            <div>
              {g.items.map(([href, label, Icon]) => {
                const I = Icon as typeof MapPin;
                return (
                  <Link href={String(href)} key={String(href)}>
                    <I size={25} strokeWidth={1.5} />
                    {String(label)}
                  </Link>
                );
              })}
            </div>
          </details>
        ))}
      </nav>
      <div
        className="mock-detailed-socials"
        aria-label="Social accounts not supplied"
      >
        {[Youtube, Instagram, Linkedin].map((I, i) => (
          <span title="Official account URL required" key={i}>
            <I size={29} />
          </span>
        ))}
        <span title="Official account URL required">𝕏</span>
      </div>
      <p className="mock-detailed-copyright">
        © {new Date().getFullYear()} DOCVY. All rights reserved.
      </p>
      <nav aria-label="Legal" className="mock-detailed-legal">
        {[
          ["/legal/privacy", "Privacy"],
          ["/legal/terms", "Terms"],
          ["/legal/refund", "Refunds"],
          ["/legal/disclaimer", "Medical Disclaimer"],
          ["/grievance", "Grievance"],
        ].map(([href, label]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>
      <p className="mock-detailed-disclaimer">
        <ShieldCheck size={36} />
        DOCVY helps you find doctors and prepare for visits. It does not provide
        emergency care or replace medical advice.
      </p>
      <p className="mock-detailed-emergency">
        In an emergency, call <a href="tel:112">112</a> or go to the nearest
        hospital.
      </p>
    </footer>
  );
}
