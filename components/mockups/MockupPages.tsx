import { getDirectoryDoctors } from "@/lib/public-directory";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  CalendarDays,
  Users,
  Building2,
  Laptop,
  TrendingUp,
  Heart,
  Eye,
  Target,
  Headphones,
  Mail,
  Phone,
  MapPin,
  Stethoscope,
  Search,
  ClipboardCheck,
} from "lucide-react";
import { Photo, Steps, Heading, homeSpecialties } from "./MockupHome";
import SpecialtyIcon from "../SpecialtyIcon";
import PartnerApplicationForm from "../PartnerApplicationForm";
import { directorySpecialties, slugify } from "@/lib/directory";
import { surgeryGroups } from "@/lib/care-directory";
import CareGuideSearch from "../CareGuideSearch";
import { patientTopicGuides } from "@/lib/patient-topic-guides";
import MockupFaqs from "./MockupFaqs";
import MockupContactForm from "./MockupContactForm";
import MockupPricing from "./MockupPricing";

export type MockupPageName =
  | "for-doctors"
  | "for-clinics"
  | "provider"
  | "how-it-works"
  | "pricing"
  | "partner"
  | "care-guide"
  | "surgery-guide"
  | "about"
  | "contact"
  | "faqs";
const specs: Record<
  MockupPageName,
  { tag: string; title: string; description: string; photo: string }
> = {
  "for-doctors": {
    tag: "For Doctors",
    title: "Grow Your Practice with DOCVY",
    description:
      "Get discovered by more patients, receive appointment enquiries, and manage your practice easily.",
    photo: "doctors-clinics--doctor-onboarding-hero.webp",
  },
  "for-clinics": {
    tag: "Clinics & Hospitals",
    title: "List Your Clinic or Hospital on DOCVY",
    description:
      "Increase your visibility, receive patient appointment requests, and manage your practice efficiently.",
    photo: "clinic_building_hero.png",
  },
  provider: {
    tag: "For Doctors & Clinics",
    title: "Grow Your Practice with DOCVY",
    description:
      "Get more patient visibility, appointment enquiries and an easy clinic management experience — all in one place.",
    photo: "pricing_hero_doctors.png",
  },
  "how-it-works": {
    tag: "How It Works",
    title: "A Simple Way to Find Care, Book Visits and Manage Appointments",
    description:
      "For patients, doctors and clinics — all in one trusted platform.",
    photo: "how_it_works_hero.png",
  },
  pricing: {
    tag: "Plans & Pricing",
    title: "Simple, Transparent Plans for Doctors & Clinics",
    description:
      "Grow your practice, get more patients and manage appointments easily with DOCVY.",
    photo: "pricing_hero_doctors.png",
  },
  partner: {
    tag: "Partner with DOCVY",
    title: "Let’s Build Better Healthcare Together",
    description:
      "Hospitals, clinics, labs and healthcare organizations — join DOCVY to reach more patients and grow with technology.",
    photo: "partner-hero-exact.jpg",
  },
  "care-guide": {
    tag: "DOCVY Care Guide",
    title: "Health guides for you and your family",
    description:
      "Clear information and practical questions to help you prepare for your next visit.",
    photo: "care_guide_hero_doctor.png",
  },
  "surgery-guide": {
    tag: "Surgeries & Procedures",
    title: "Find the Right Surgery & Specialist",
    description:
      "Explore common surgeries, compare treatment questions and request a consultation with participating specialists on DOCVY.",
    photo: "surgery_hero_surgeons.png",
  },
  about: {
    tag: "About DOCVY",
    title:
      "Building a more open, trusted and patient-friendly healthcare experience.",
    description:
      "DOCVY connects patients with doctor profiles, clinics and hospitals — with transparency, convenience and care.",
    photo: "about_doctor_patient.png",
  },
  contact: {
    tag: "Contact DOCVY",
    title: "We’re here to help",
    description:
      "Have a question, need support or want to list your practice? Get in touch with us.",
    photo: "contact-hero-clean.jpg",
  },
  faqs: {
    tag: "Frequently Asked Questions",
    title: "Have a Question? We’ve Got You Covered",
    description:
      "Find quick answers about bookings, listings, plans, and using DOCVY.",
    photo: "faq-hero-clean.jpg",
  },
};
export function MockupHero({ page }: { page: MockupPageName }) {
  const s = specs[page];
  return (
    <section className={"mock-page-hero mock-page-hero-" + page}>
      <Photo
        name={s.photo}
        alt="Illustrative image extracted from the approved mockup"
        priority
      />
      <div>
        <span className="mock-tag">{s.tag}</span>
        <h1>{s.title}</h1>
        <p>{s.description}</p>
      </div>
    </section>
  );
}
function Benefits({
  labels = [
    "More Visibility",
    "Appointment Enquiries",
    "Basic Clinic CRM",
    "Zero Listing Cost",
  ],
}: {
  labels?: string[];
}) {
  return (
    <div className="mock-benefits">
      {labels.map((t, i) => {
        const I = [TrendingUp, CalendarDays, Laptop, ShieldCheck][i % 4];
        return (
          <div key={t}>
            <I size={30} strokeWidth={1.5} />
            <h3>{t}</h3>
          </div>
        );
      })}
    </div>
  );
}
export function Callout({
  title,
  text,
  href = "/partner-with-us",
  label = "List Your Practice — Free",
  photo,
}: {
  title: string;
  text: string;
  href?: string;
  label?: string;
  photo?: string;
}) {
  return (
    <aside className={"mock-callout " + (photo ? "has-photo" : "")}>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
        <Link className="mock-button" href={href}>
          {label}
          <ArrowRight size={16} />
        </Link>
      </div>
      {photo && (
        <Photo name={photo} alt="Supplied illustrative reference crop" />
      )}
    </aside>
  );
}
function Help() {
  return (
    <aside className="mock-help">
      <Headphones size={40} />
      <div>
        <h2>Need Help Getting Started?</h2>
        <p>Our onboarding team will assist you with your profile.</p>
      </div>
      <a href="https://wa.me/919311779708" className="mock-button mock-outline">
        Chat on WhatsApp
      </a>
      <a href="tel:+919311779708" className="mock-button mock-outline">
        Call Now
      </a>
    </aside>
  );
}
const checks = [
  "Get discovered by patients in your city",
  "Receive genuine patient appointment enquiries",
  "Showcase your expertise and services",
  "Manage schedules with a simple clinic workspace",
  "Build a professional online presence",
];
function CheckList({ items = checks }: { items?: string[] }) {
  return (
    <ul className="mock-checklist">
      {items.map((t) => (
        <li key={t}>
          <CheckCircle2 size={16} />
          {t}
        </li>
      ))}
    </ul>
  );
}
function ProviderPage({
  clinic = false,
  combined = false,
}: {
  clinic?: boolean;
  combined?: boolean;
}) {
  return (
    <>
      <MockupHero
        page={combined ? "provider" : clinic ? "for-clinics" : "for-doctors"}
      />
      <div className="mock-page-content">
        {!combined && (
          <div className="mock-provider-actions">
            <Link href="/partner-with-us" className="mock-button">
              {clinic ? "List Your Clinic" : "List Your Practice"} — Free{" "}
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/919311779708"
              className="mock-button mock-outline"
            >
              Talk to Our Team on WhatsApp
            </a>
          </div>
        )}
        <Benefits />
        {combined && (
          <Callout
            title="List Your Practice on DOCVY"
            text="Get discovered by patients searching for doctors, clinics and hospitals in your area."
          />
        )}
        <section>
          <h2>
            {combined
              ? "Why Choose DOCVY?"
              : clinic
                ? "Benefits for Clinics & Hospitals"
                : "Why Join DOCVY?"}
          </h2>
          {combined ? (
            <Benefits
              labels={[
                "Reach More Patients",
                "Online Appointments",
                "Basic Clinic CRM",
                "Profile Review",
              ]}
            />
          ) : (
            <CheckList />
          )}
        </section>
        <section className="mock-soft">
          <h2>How It Works?</h2>
          <Steps provider />
        </section>
        {combined ? (
          <Callout
            title="Built for Doctors, Clinics & Hospitals"
            text="A simple and professional platform to organise your practice."
            photo="docvy_reception_banner.png"
            label="Explore the Workspace"
            href="/crm/clinic"
          />
        ) : clinic ? (
          <section>
            <Heading title="Clinics & Hospitals" href="/clinics" />
            <div className="mock-three">
              <Link className="mock-photo-card" href="/clinics">
                <Photo
                  name="clinic_building_hero.png"
                  alt="Illustrative clinic; not a listed partner facility"
                />
                <h3>Explore practice locations</h3>
                <p>See clinics linked to participating doctor profiles.</p>
              </Link>
              <Link className="mock-photo-card" href="/hospitals">
                <Photo
                  name="clinic_partnership_building.png"
                  alt="Illustrative hospital; not a listed partner facility"
                />
                <h3>Explore hospitals</h3>
                <p>Find the right specialty and practice.</p>
              </Link>
            </div>
          </section>
        ) : (
          <section>
            <h2>Doctor Experiences</h2>
            <div className="mock-testimonial-placeholder">
              <ShieldCheck size={42} />
              <p>
                Doctor stories will appear here after review and permission. No
                testimonials have been invented for this design.
              </p>
            </div>
          </section>
        )}
        {!combined && (
          <>
            <section>
              <h2>Frequently Asked Questions</h2>
              <MockupFaqs compact />
            </section>
            <Callout
              title={
                clinic
                  ? "List Your Clinic or Hospital Today"
                  : "Ready to join DOCVY?"
              }
              text="List your practice today and connect with more patients."
              photo={
                clinic
                  ? "doctors-clinics--hospital-cta.webp"
                  : "doctors-clinics--doctors-cta.webp"
              }
            />
          </>
        )}
        <Help />
      </div>
    </>
  );
}
function HowPage() {
  return (
    <>
      <MockupHero page="how-it-works" />
      <div className="mock-page-content">
        <section>
          <h2>For Patients — Get Care in 4 Simple Steps</h2>
          <Steps />
        </section>
        <section className="mock-soft">
          <h2>For Doctors & Clinics — Grow Your Practice</h2>
          <Steps provider />
        </section>
        <section>
          <h2>Why Choose DOCVY?</h2>
          <Benefits
            labels={[
              "Professional Profiles",
              "Clear Next Steps",
              "Appointment Tracking",
              "Patient-Friendly",
            ]}
          />
        </section>
        <Callout
          title="Get Started Today"
          text="Find care, request an appointment or list your practice on DOCVY."
          href="/doctors"
          label="Find a Doctor"
        />
      </div>
    </>
  );
}
function Partner() {
  return (
    <>
      <MockupHero page="partner" />
      <div className="mock-page-content">
        <Benefits
          labels={[
            "More Patients",
            "Higher Visibility",
            "Appointment Enquiries",
            "Practice Management",
          ]}
        />
        <section>
          <h2>Who Can Partner with DOCVY?</h2>
          <div className="mock-three">
            {[
              [
                Building2,
                "Hospitals",
                "Showcase your departments and practice locations.",
              ],
              [
                Stethoscope,
                "Clinics",
                "Help patients find your practice and request a visit.",
              ],
              [
                ClipboardCheck,
                "Diagnostic & Labs",
                "Contact our team to discuss your organisation.",
              ],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof Users;
              return (
                <article className="mock-soft" key={String(title)}>
                  <I size={40} />
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </article>
              );
            })}
          </div>
        </section>
        <section className="mock-split">
          <div>
            <h2>Partner Benefits</h2>
            <CheckList
              items={[
                "Your professional profile on DOCVY",
                "Appointment requests and patient enquiries",
                "Multi-location practice details",
                "Clinic workspace tools",
                "Onboarding support",
              ]}
            />
          </div>
          <Photo
            name="partner-handshake-exact.jpg"
            alt="Doctor and partner handshake, cropped from the approved reference"
          />
        </section>
        <Callout
          title="Become a DOCVY Partner"
          text="Get listed and grow your healthcare practice."
          href="#partner-application"
          label="Get in Touch"
        />
        <details id="partner-application" className="mock-form-disclosure">
          <summary>Submit Your Professional Details</summary>
          <PartnerApplicationForm
            specialties={directorySpecialties.map((s) => s.name)}
          />
        </details>
        <Help />
      </div>
    </>
  );
}
async function Care() {
  const doctors = await getDirectoryDoctors();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "DOCVY Care Guide",
            url: "https://www.docvy.in/care-guide",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: patientTopicGuides.map((g, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: g.topic,
                url: "https://www.docvy.in/patient-guides/" + g.slug,
              })),
            },
          }).replace(/</g, "\u003c"),
        }}
      />
      <MockupHero page="care-guide" />
      <div className="mock-page-content">
        <CareGuideSearch doctors={doctors} compact />
        <Benefits
          labels={[
            "Patient Resources",
            "Clear Information",
            "Patient Friendly",
            "Visit Preparation",
          ]}
        />
        <section>
          <Heading
            title="Explore by Topic"
            sub="Browse health articles by specialty and condition."
            href="/specialties"
            label="View All Topics"
          />
          <div className="mock-specialties">
            {homeSpecialties.map(([slug, name]) => (
              <Link href={"/specialties/" + slug} key={slug}>
                <SpecialtyIcon slug={slug} />
                <h3>{name}</h3>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <Heading
            title="Featured Articles"
            sub="Prepare questions for your next appointment."
            href="/patient-guides/diabetes"
            label="Read Guide"
          />
          <Link
            className="mock-feature-article"
            href="/patient-guides/diabetes"
          >
            <Photo
              name="balanced_diet_article.png"
              alt="Approved food photograph extract"
            />
            <div>
              <span className="mock-tag">Diabetes</span>
              <h3>Diabetes: prepare for your next visit</h3>
              <p>Understand the terms and plan questions about your care.</p>
            </div>
          </Link>
        </section>
        <section>
          <h2>Trending Health Guides</h2>
          <div className="mock-guide-list">
            {[
              [
                "wellness_article.png",
                "high-blood-pressure",
                "High blood pressure: questions for your next review",
              ],
              [
                "back_pain_article.png",
                "joint-pain-arthritis",
                "Joint pain: prepare for an orthopaedic visit",
              ],
              [
                "child_health_article.png",
                "diabetes",
                "Diabetes: tests, follow-up and your care team",
              ],
            ].map(([img, slug, t]) => (
              <Link href={"/patient-guides/" + slug} key={t}>
                <Photo name={img} alt="Approved article illustration" />
                <h3>{t}</h3>
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </section>
        <section>
          <h2>Helpful Health Resources</h2>
          <div className="mock-benefits">
            {[
              ["/care-guide", "Find a Guide"],
              ["/specialties", "Explore Specialties"],
              ["/surgery-guide", "Prepare for Surgery"],
              ["/contact", "Ask DOCVY"],
            ].map(([href, label]) => (
              <Link key={href} href={href}>
                <ClipboardCheck size={29} />
                <h3>{label}</h3>
              </Link>
            ))}
          </div>
        </section>
        <Callout
          title="Questions About Your Next Visit?"
          text="Explore health guides or contact our team for help using DOCVY."
          href="/contact"
          label="Contact Us"
        />
      </div>
    </>
  );
}
function Surgery() {
  return (
    <>
      <MockupHero page="surgery-guide" />
      <div className="mock-page-content">
        <form action="/doctors" className="mock-inner-search">
          <Search size={19} />
          <label className="sr-only" htmlFor="surgery-q">
            Search surgery or condition
          </label>
          <input
            id="surgery-q"
            name="q"
            placeholder="Search surgery or condition (e.g. Kidney Stone, Hernia)"
          />
          <button className="mock-button">Find Specialists</button>
        </form>
        <Benefits
          labels={[
            "Doctor Profiles",
            "Practice Locations",
            "Request Consultation",
            "Patient Resources",
          ]}
        />
        <section>
          <Heading
            title="Explore Surgeries by Category"
            href="#all-procedures"
            label="View All Surgeries"
          />
          <div className="mock-specialties">
            {[
              ["urology", "Urology Surgeries"],
              ["gastroenterology", "GI & Laparoscopic"],
              ["ent", "ENT Surgeries"],
              ["ophthalmology", "Eye Surgeries"],
              ["gynaecology", "Women’s Surgeries"],
              ["vascular-surgery", "Vascular Surgeries"],
              ["bariatric-surgery", "Weight Loss"],
              ["plastic-surgery", "Aesthetic & Cosmetic"],
              ["orthopaedics", "Orthopaedic Surgeries"],
              ["general-medicine", "More Surgeries"],
            ].map(([slug, name]) => (
              <Link href={"/doctors/specialty/" + slug} key={slug}>
                <SpecialtyIcon slug={slug} />
                <h3>{name}</h3>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <h2>Popular Surgeries</h2>
          <div className="mock-four">
            {[
              [
                "surgery_kidney_stone.png",
                "kidney-stone-removal",
                "Kidney Stone Surgery",
              ],
              ["surgery_hernia.png", "hernia-repair", "Hernia Surgery"],
              ["surgery_lasik.png", "lasik", "LASIK Eye Surgery"],
              ["surgery_bariatric.png", "bariatric", "Bariatric (Weight Loss)"],
            ].map(([img, slug, t]) => (
              <Link
                className="mock-photo-card"
                href={
                  slug === "lasik"
                    ? "/doctors/specialty/ophthalmology"
                    : slug === "bariatric"
                      ? "/doctors/specialty/bariatric-surgery"
                      : "/surgeries/" + slug
                }
                key={slug}
              >
                <Photo
                  name={img}
                  alt={
                    slug === "knee-replacement"
                      ? "Supplied surgical reference illustration"
                      : "Approved procedure illustration"
                  }
                />
                <h3>{t}</h3>
              </Link>
            ))}
          </div>
        </section>
        <Callout
          title="Not Sure Which Specialist You Need?"
          text="Discuss your concerns with a qualified clinician and explore your treatment options."
          href="/doctors"
          label="Find a Specialist"
        />
        <section>
          <h2>How It Works</h2>
          <Steps />
        </section>
        <section id="all-procedures">
          <details className="mock-accordion">
            <summary>View All Surgery Guides</summary>
            {surgeryGroups.map((g) => (
              <details className="mock-accordion" key={g.name}>
                <summary>{g.name}</summary>
                <ul>
                  {g.procedures.map((p) => (
                    <li key={p}>
                      <Link href={"/surgeries/" + slugify(p)}>{p} →</Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </details>
        </section>
        <section>
          <Heading
            title="Helpful Resources"
            href="/care-guide"
            label="View All Guides"
          />
          <div className="mock-three">
            {[
              [
                "surgery_kidney_stone.png",
                "/patient-guides/kidney-stones",
                "Kidney stones: prepare your questions",
              ],
              [
                "wellness_article.png",
                "/patient-guides/joint-pain-arthritis",
                "Joint pain and your next visit",
              ],
              [
                "surgery_hernia.png",
                "/surgeries/hernia-repair",
                "Hernia repair: questions for your surgeon",
              ],
            ].map(([img, href, t]) => (
              <Link className="mock-photo-card" key={href} href={href}>
                <Photo name={img} alt="Approved illustrative reference crop" />
                <h3>{t}</h3>
              </Link>
            ))}
          </div>
        </section>
        <Callout
          title="Plan Your Surgery Consultation"
          text="Explore the procedure and take your questions to a specialist."
          href="/doctors"
          label="Request Consultation"
        />
      </div>
    </>
  );
}
function About() {
  return (
    <>
      <MockupHero page="about" />
      <div className="mock-page-content">
        <div className="mock-two">
          {[
            [
              Target,
              "Our Mission",
              "To make healthcare discovery more accessible, transparent and convenient.",
            ],
            [
              Eye,
              "Our Vision",
              "To help patients and healthcare providers connect through clear information and technology.",
            ],
          ].map(([Icon, t, p]) => {
            const I = Icon as typeof Users;
            return (
              <section className="mock-soft mock-icon-copy" key={String(t)}>
                <I size={35} />
                <div>
                  <h2>{String(t)}</h2>
                  <p>{String(p)}</p>
                </div>
              </section>
            );
          })}
        </div>
        <section>
          <h2>DOCVY at a Glance</h2>
          <Benefits
            labels={[
              "Doctor Profiles",
              "Clinic Locations",
              "Appointment Requests",
              "Health Guides",
            ]}
          />
        </section>
        <section className="mock-story mock-soft">
          <div>
            <h2>Our Story</h2>
            <p>
              DOCVY was founded with a simple belief — finding the right doctor
              and getting care should be easier, clearer and patient-first.
            </p>
            <p>
              We’re building a platform that brings patients, doctors, clinics
              and hospitals together in one place.
            </p>
          </div>
          <Photo
            name="about_building.png"
            alt="Illustrative building from the approved mockup, not a DOCVY office photograph"
          />
        </section>
        <section className="mock-split mock-founder">
          <div className="mock-missing-photo">Founder photograph required</div>
          <div>
            <h2>A Message from the Founder</h2>
            <p>
              “I started DOCVY with a vision to build a globally trusted
              healthcare platform from India — where patients can easily find,
              connect and book verified doctors, and where healthcare providers
              can grow their practice with the right technology and reach.”
            </p>
            <strong>Rishi Raj Martin</strong>
            <p>Founder, DOCVY</p>
            <small>
              Founder portrait and final quotation need approved originals.
            </small>
          </div>
        </section>
        <section>
          <h2>Our Values</h2>
          <div className="mock-specialties">
            {[
              ["Trust & Transparency", ShieldCheck],
              ["Patient First", Users],
              ["Quality Care", Heart],
              ["Technology Driven", Laptop],
              ["Inclusive Healthcare", Users],
            ].map(([t, Icon]) => {
              const I = Icon as typeof Users;
              return (
                <div className="mock-soft" key={String(t)}>
                  <I size={30} />
                  <h3>{String(t)}</h3>
                </div>
              );
            })}
          </div>
        </section>
        <section>
          <h2>The Impact We’re Working Towards</h2>
          <CheckList
            items={[
              "Helping patients find a suitable starting point",
              "Enabling doctors and clinics to be discovered",
              "Making practice information easier to understand",
              "Connecting the steps from search to a visit",
            ]}
          />
        </section>
        <Callout
          title="Be a Part of the DOCVY Journey"
          text="Join us in building a simpler, clearer and patient-friendly healthcare platform."
        />
      </div>
    </>
  );
}
function Contact() {
  return (
    <>
      <MockupHero page="contact" />
      <div className="mock-page-content">
        <div className="mock-benefits">
          {[
            ["/doctors", "Find a Doctor", CalendarDays],
            ["/partner-with-us", "List as a Doctor", Users],
            ["/for-clinics", "List Your Clinic", Building2],
            ["/faqs", "Support & FAQs", Headphones],
          ].map(([href, t, Icon]) => {
            const I = Icon as typeof Users;
            return (
              <Link key={String(href)} href={String(href)}>
                <I size={30} />
                <h3>{String(t)}</h3>
              </Link>
            );
          })}
        </div>
        <section>
          <Heading
            title="Get in Touch"
            sub="Fill in your message to open an email to our team."
          />
          <MockupContactForm />
        </section>
        <section>
          <h2>Other Ways to Reach Us</h2>
          <div className="mock-three mock-contact-methods">
            {[
              [
                "https://wa.me/919311779708",
                "WhatsApp",
                "+91 93117 79708",
                Headphones,
              ],
              ["tel:+919311779708", "Call Us", "+91 93117 79708", Phone],
              ["mailto:contact@docvy.in", "Email Us", "contact@docvy.in", Mail],
            ].map(([href, t, sub, Icon]) => {
              const I = Icon as typeof Users;
              return (
                <a
                  href={String(href)}
                  className="mock-photo-card"
                  key={String(t)}
                >
                  <I size={30} />
                  <h3>{String(t)}</h3>
                  <p>{String(sub)}</p>
                  <span className="mock-button mock-outline">
                    {t === "Call Us"
                      ? "Call Now"
                      : t === "Email Us"
                        ? "Send Email"
                        : "Chat on WhatsApp"}
                  </span>
                </a>
              );
            })}
          </div>
        </section>
        <section className="mock-office mock-soft">
          <MapPin size={38} />
          <div>
            <h2>Our Office</h2>
            <p>Sector 48, Gurugram, Haryana 122101, India.</p>
            <p>DSS Global Technologies Private Limited.</p>
          </div>
        </section>
        <section>
          <h2>Quick Help</h2>
          <MockupFaqs compact />
        </section>
      </div>
    </>
  );
}
export default function MockupPages({ page }: { page: MockupPageName }) {
  return (
    <div className={"mock-page mock-page-" + page}>
      {page === "for-doctors" ? (
        <ProviderPage />
      ) : page === "for-clinics" ? (
        <ProviderPage clinic />
      ) : page === "provider" ? (
        <ProviderPage combined />
      ) : page === "how-it-works" ? (
        <HowPage />
      ) : page === "partner" ? (
        <Partner />
      ) : page === "care-guide" ? (
        <Care />
      ) : page === "surgery-guide" ? (
        <Surgery />
      ) : page === "about" ? (
        <About />
      ) : page === "contact" ? (
        <Contact />
      ) : page === "pricing" ? (
        <>
          <MockupHero page="pricing" />
          <div className="mock-page-content">
            <Benefits />
            <MockupPricing />
            <section>
              <h2>Frequently Asked Questions</h2>
              <MockupFaqs compact />
            </section>
            <Callout
              title="Start Growing Your Practice Today"
              text="List your practice, manage appointments and reach more patients on DOCVY."
            />
          </div>
        </>
      ) : (
        <>
          <MockupHero page="faqs" />
          <div className="mock-page-content">
            <MockupFaqs />
            <Help />
          </div>
        </>
      )}
    </div>
  );
}
