import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Users,
  Building2,
  CalendarDays,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Laptop,
  Stethoscope,
  Heart,
  Clock3,
} from "lucide-react";
import SpecialtyIcon from "../SpecialtyIcon";
import DoctorPortrait from "../DoctorPortrait";
import { getDirectoryDoctors } from "@/lib/public-directory";
import { availableCities } from "@/lib/directory";
import { doctorPath } from "@/lib/directory-normalization";
import { isVerified, canRequestAppointment } from "@/lib/profile-policy";
export const asset = (name: string) => "/approved-mockups/" + name;
export function Photo({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={asset(name)}
      alt={alt}
      width={520}
      height={300}
      className={className}
      priority={priority}
    />
  );
}
export function Heading({
  title,
  sub,
  href,
  label = "View All",
}: {
  title: string;
  sub?: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="mock-heading">
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {href && (
        <Link href={href}>
          {label} <ArrowRight size={12} />
        </Link>
      )}
    </div>
  );
}
export const homeSpecialties = [
  ["general-medicine", "General Physician"],
  ["dermatology", "Dermatology"],
  ["gynaecology", "Gynaecology"],
  ["paediatrics", "Paediatrics"],
  ["orthopaedics", "Orthopaedics"],
  ["cardiology", "Cardiology"],
  ["neurology", "Neurology"],
  ["dentistry", "Dentistry"],
  ["ent", "ENT"],
  ["gastroenterology", "Gastroenterology"],
];
export function Steps({ provider = false }: { provider?: boolean }) {
  return (
    <div className="mock-steps">
      {(provider
        ? [
            [
              Users,
              "1. Share Details",
              "List your practice and showcase your expertise.",
            ],
            [
              ShieldCheck,
              "2. Review",
              "Our team reviews your professional details.",
            ],
            [Laptop, "3. Go Live", "Your approved profile appears on DOCVY."],
            [
              CalendarDays,
              "4. Receive Enquiries",
              "Manage your patient appointment requests.",
            ],
          ]
        : [
            [
              Laptop,
              "1. Search",
              "Find doctors by specialty, condition or location.",
            ],
            [
              Stethoscope,
              "2. Choose Doctor",
              "Compare profiles, experience, fees and practices.",
            ],
            [
              CalendarDays,
              "3. Request Appointment",
              "Share your preferred date and time.",
            ],
            [
              Building2,
              "4. Visit & Get Care",
              "The clinic confirms your appointment.",
            ],
          ]
      ).map(([Icon, title, text], i) => {
        const I = Icon as typeof Users;
        return (
          <div key={String(title)}>
            <I size={29} strokeWidth={1.5} />
            <h3>{String(title)}</h3>
            <p>{String(text)}</p>
            {i < 3 && <ArrowRight className="step-arrow" size={17} />}
          </div>
        );
      })}
    </div>
  );
}
export default async function MockupHome() {
  const doctors = await getDirectoryDoctors();
  const cities = availableCities(doctors);
  const featured = doctors
    .filter((d) => canRequestAppointment(d) && d.photoUrl)
    .slice(0, 3);
  return (
    <div className="mock-home">
      <section className="mock-home-hero">
        <Photo
          name="homepage--hero-doctor.webp"
          alt="Illustrative doctor from the supplied mockup"
          className="mock-hero-photo"
          priority
        />
        <div className="mock-hero-copy">
          <span className="mock-tag">🇮🇳 Find care across India</span>
          <h1>
            Find trusted
            <br />
            doctors near you
          </h1>
          <p>
            Discover doctor profiles, compare
            <br />
            clinics and request appointments —<br />
            all in one place with DOCVY.
          </p>
        </div>
        <form action="/doctors" className="mock-search">
          <label>
            <Search size={16} />
            <span className="sr-only">
              Search doctor, specialty or condition
            </span>
            <input
              name="q"
              placeholder="Search doctor, specialty or condition"
              maxLength={120}
            />
          </label>
          <div>
            <label>
              <MapPin size={16} />
              <span className="sr-only">City</span>
              <select name="location">
                <option value="">All India</option>
                {cities.map((c) => (
                  <option value={c.slug} key={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <button className="mock-button">
              <Search size={14} />
              Find Doctors
            </button>
          </div>
        </form>
      </section>
      <div className="mock-statistics">
        {[
          [
            Users,
            String(doctors.filter(isVerified).length),
            "Verified Profiles",
          ],
          [
            Building2,
            String(
              new Set(
                doctors.flatMap((d) => d.locations.map((l) => l.facility)),
              ).size,
            ),
            "Practice Locations",
          ],
          [CalendarDays, "Request", "Appointments"],
          [ShieldCheck, "Consent", "Based Listings"],
        ].map(([Icon, value, text]) => {
          const I = Icon as typeof Users;
          return (
            <div key={String(text)}>
              <I size={25} strokeWidth={1.5} />
              <p>
                <strong>{String(value)}</strong>
                <span>{String(text)}</span>
              </p>
            </div>
          );
        })}
      </div>
      <section className="mock-section">
        <Heading
          title="Explore Specialties"
          sub="Find the right doctor for your health needs."
          href="/specialties"
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
      <section className="mock-section">
        <Heading
          title="Featured Doctors"
          sub="Explore participating doctors and their practices."
          href="/doctors"
          label="View All Doctors"
        />
        <div className="mock-doctors">
          {featured.map((d) => (
            <article key={d.id}>
              <Link href={doctorPath(d)} className="mock-doctor-portrait">
                <DoctorPortrait name={d.name} src={d.photoUrl} compact />
                {isVerified(d) && (
                  <ShieldCheck size={14} className="mock-verified" />
                )}
              </Link>
              <h3>
                <Link href={doctorPath(d)}>{d.name}</Link>
              </h3>
              <p>{d.specialties[0]}</p>
              <p className="mock-degree">
                {d.profileDetails?.qualifications}
                {d.profileDetails?.experienceYears != null
                  ? " · " + d.profileDetails.experienceYears + " years"
                  : ""}
              </p>
              <div className="mock-doctor-location">
                <span>
                  <MapPin size={10} />
                  {d.locations[0].city}
                </span>
                <strong>
                  {d.profileDetails?.consultationFee != null
                    ? "₹" + d.profileDetails.consultationFee
                    : "Ask clinic"}
                </strong>
              </div>
              <Link
                href={{
                  pathname: "/request",
                  query: {
                    provider: d.id,
                    city: d.locations[0].city,
                    facility: d.locations[0].facility,
                  },
                }}
                className="mock-button"
              >
                Request Appointment
              </Link>
            </article>
          ))}
        </div>
        <div className="mock-dots" aria-hidden="true">
          ● ○ ○ ○
        </div>
      </section>
      <section className="mock-section">
        <Heading
          title="How DOCVY Works"
          sub="Find care and arrange a visit in 4 simple steps."
        />
        <Steps />
      </section>
      <section className="mock-section mock-why">
        <Heading
          title="Why Choose DOCVY?"
          sub="A patient-first, clear and convenient healthcare experience."
        />
        <Photo
          name="homepage--why-docvy-photo.webp"
          alt="Illustrative consultation scene from the supplied mockup"
        />
        <ul>
          {[
            "Check professional and practice details",
            "Request a visit with participating doctors",
            "Compare clinic locations near you",
            "Clear consultation information",
            "Prepare for your visit with health guides",
          ].map((t) => (
            <li key={t}>
              <CheckCircle2 size={14} />
              {t}
            </li>
          ))}
        </ul>
      </section>
      <section className="mock-partner">
        <div>
          <h2>Are You a DOCVY Partner?</h2>
          <p>
            List your practice, reach more patients
            <br />
            and manage appointments easily.
          </p>
          <Link href="/partner-with-us" className="mock-button">
            List Your Practice — Free <ArrowRight size={12} />
          </Link>
        </div>
        <Photo
          name="doctors-clinics--doctor-onboarding-hero.webp"
          alt="Illustrative doctor from the approved mockup"
        />
        <ul>
          {[
            "Get More Patient Visibility",
            "Receive Appointment Enquiries",
            "Access Clinic Workspace",
            "Profile Review Support",
          ].map((t) => (
            <li key={t}>
              <CheckCircle2 size={13} />
              {t}
            </li>
          ))}
        </ul>
      </section>
      <section className="mock-section">
        <Heading
          title="Care Guide & Health Articles"
          sub="Health information to help you prepare for your next visit."
          href="/care-guide"
          label="View All Articles"
        />
        <div className="mock-articles">
          {[
            [
              "wellness_article.png",
              "high-blood-pressure",
              "High blood pressure: prepare for your visit",
              "Wellness",
            ],
            [
              "balanced_diet_article.png",
              "diabetes",
              "Diabetes: questions for your next review",
              "Health",
            ],
            [
              "back_pain_article.png",
              "joint-pain-arthritis",
              "Joint pain: what to discuss with your doctor",
              "Orthopaedics",
            ],
          ].map(([img, slug, title, category]) => (
            <Link key={slug} href={"/patient-guides/" + slug}>
              <Photo name={img} alt="Approved reference thumbnail" />
              <span>{category}</span>
              <h3>{title}</h3>
              <p>
                <Clock3 size={10} />
                Read guide
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section className="mock-section">
        <Heading
          title="Your Experience Matters"
          sub="Patient feedback will appear here after consent and review."
          href="/contact"
          label="Share Feedback"
        />
        <div className="mock-review-grid">
          {[
            "Tell us what helped you find care.",
            "Help us make your next visit easier.",
          ].map((t) => (
            <Link key={t} href="/contact">
              <Heart size={24} />
              <div>
                <p>{t}</p>
                <strong>Share your experience</strong>
              </div>
            </Link>
          ))}
        </div>
        <div className="mock-dots" aria-hidden="true">
          ● ○ ○
        </div>
      </section>
      <section className="mock-app-banner">
        <div>
          <h2>
            Find and manage
            <br />
            appointments
            <br />
            on DOCVY
          </h2>
          <p>
            Use the website on your phone.
            <br />
            An app download is not required.
          </p>
        </div>
        <div className="mock-phone">
          <strong>DOCVY</strong>
          <p>
            Find Doctors
            <br />
            Near You
          </p>
          <Link href="/doctors">Find care →</Link>
        </div>
        <div className="mock-app-links">
          <Link href="/doctors" className="mock-button">
            Find Doctors
          </Link>
          <Link href="/status" className="mock-button">
            Track Request
          </Link>
        </div>
      </section>
    </div>
  );
}
