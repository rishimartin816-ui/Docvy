import Link from "next/link";
import BrandLogo from "../BrandLogo";
import {
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
export default function MockupFooter() {
  return (
    <footer className="approved-footer">
      <div className="approved-footer-grid">
        <div>
          <BrandLogo darkBackground className="approved-logo" />
          <p>
            A doctor discovery platform connecting patients with participating
            doctors, clinics and hospitals across India.
          </p>
          <div className="approved-socials">
            {[Youtube, Instagram, Linkedin].map((Icon, i) => (
              <span key={i} title="Official account link not supplied">
                <Icon size={16} />
              </span>
            ))}
            <span title="Official account link not supplied">𝕏</span>
          </div>
        </div>
        {[
          {
            title: "Quick Links",
            links: [
              ["/doctors", "Find Doctors"],
              ["/specialties", "Specialties"],
              ["/clinics", "Clinics & Hospitals"],
              ["/care-guide", "Care Guide"],
              ["/for-doctors", "For Doctors"],
              ["/about", "About DOCVY"],
            ],
          },
          {
            title: "Popular Specialties",
            links: [
              ["/doctors/specialty/general-medicine", "General Physician"],
              ["/doctors/specialty/dermatology", "Dermatology"],
              ["/doctors/specialty/gynaecology", "Gynaecology"],
              ["/doctors/specialty/orthopaedics", "Orthopaedics"],
              ["/doctors/specialty/cardiology", "Cardiology"],
              ["/specialties", "View All Specialties →"],
            ],
          },
          {
            title: "Find Care",
            links: [
              ["/doctors", "All Cities"],
              ["/request", "Book an Appointment"],
              ["/status", "Track Your Appointment"],
              ["/surgery-guide", "Surgeries"],
              ["/how-it-works", "How It Works"],
            ],
          },
        ].map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <h2>{g.title}</h2>
            {g.links.map(([href, label]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
        ))}
        <nav aria-label="Support">
          <h2>Support</h2>
          {[
            ["/faqs", "Help & FAQs"],
            ["/contact", "Contact Us"],
            ["/legal/privacy", "Privacy Policy"],
            ["/legal/terms", "Terms of Service"],
          ].map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="approved-contact">
          <h2>Get in Touch</h2>
          <a href="tel:+919311779708">
            <Phone />
            +91 93117 79708
          </a>
          <a href="mailto:contact@docvy.in">
            <Mail />
            contact@docvy.in
          </a>
          <p>
            <MapPin />
            Sector 48, Gurugram, Haryana 122101, India.
          </p>
          <p>Operated by DSS Global Technologies Private Limited.</p>
        </div>
      </div>
      <div className="approved-legal">
        <span>© {new Date().getFullYear()} DOCVY. All rights reserved.</span>
        <nav aria-label="Legal">
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
      </div>
      <p className="approved-emergency">
        <ShieldCheck size={15} />
        DOCVY does not replace medical advice. In an emergency, call{" "}
        <a href="tel:112">112</a> or go to the nearest hospital.
      </p>
    </footer>
  );
}
