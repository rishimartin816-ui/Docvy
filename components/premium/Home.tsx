import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Building2,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Stethoscope,
  Users,
  UserRound,
} from "lucide-react";
import FooterDisclosure from "./FooterDisclosure";
import BrandLogo from "@/components/BrandLogo";
import DoctorPortrait from "@/components/DoctorPortrait";
import { availableCities } from "@/lib/directory";
import { doctorPath } from "@/lib/directory-normalization";
import { getDirectoryDoctors } from "@/lib/public-directory";
import { isVerified } from "@/lib/profile-policy";
import styles from "./Home.module.css";

const specialties = [
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
const steps = [
  {
    Icon: Search,
    title: "Search",
    text: "Find care by specialty or location.",
  },
  {
    Icon: UserRound,
    title: "Choose a doctor",
    text: "Compare profiles and clinics.",
  },
  {
    Icon: CalendarDays,
    title: "Request a visit",
    text: "Share your preferred time.",
  },
  {
    Icon: Building2,
    title: "Visit the clinic",
    text: "Go once the clinic confirms.",
  },
];
const articles = [
  [
    "cardiology-heart-health",
    "Heart health",
    "High blood pressure",
    "high-blood-pressure",
  ],
  [
    "healthy-indian-thali",
    "Liver health",
    "Fatty liver and your next visit",
    "fatty-liver",
  ],
  [
    "diabetes-glucose-management",
    "Diabetes",
    "Prepare for your diabetes review",
    "diabetes",
  ],
];
const careLinks = [
  ["/doctors", "Find doctors"],
  ["/specialties", "Specialties"],
  ["/clinics", "Clinics & hospitals"],
  ["/care-guide", "Care guide"],
];
const teamLinks = [
  ["/for-doctors", "For doctors"],
  ["/partner-with-us", "Partner with us"],
  ["/about", "About DOCVY"],
  ["/contact", "Contact us"],
];
function Title({
  title,
  sub,
  href,
  label,
}: {
  title: string;
  sub?: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className={styles.title}>
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {href && (
        <Link href={href}>
          {label || "View all"} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
function FooterLinks({ links }: { links: string[][] }) {
  return (
    <ul>
      {links.map(([href, label]) => (
        <li key={href}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>
  );
}
export default async function Home() {
  const directory = await getDirectoryDoctors();
  const cities = availableCities(directory);
  const featured = directory
    .filter((d) => isVerified(d) && d.locations.length)
    .slice(0, 3);
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <Link href="/" aria-label="DOCVY home">
            <BrandLogo priority className={styles.logo} />
          </Link>
          <nav aria-label="Main">
            <a href="#care-city">
              <MapPin size={18} /> All India <ChevronDown size={13} />
            </a>
            <Link href="/status" aria-label="Check appointment updates">
              <Bell size={21} />
            </Link>
            <details className={styles.menu}>
              <summary aria-label="Open navigation">
                <Menu />
              </summary>
              <div>
                <FooterLinks
                  links={[
                    ...careLinks,
                    ["/status", "Track appointment"],
                    ["/for-clinics", "For clinics"],
                    ["/login", "Log in"],
                  ]}
                />
              </div>
            </details>
          </nav>
        </div>
      </header>
      <main id="main">
        <section className={styles.hero}>
          <div className={styles.heroImage}>
            <Image
              priority
              src="/images/homepage/homepage-doctor-consultation.webp"
              alt=""
              fill
              sizes="(max-width: 600px) 50vw, 55vw"
            />
          </div>
          <div className={styles.wrap}>
            <div className={styles.copy}>
              <span className={styles.tag}>
                <span aria-hidden="true">🇮🇳</span> Doctor directory for India
              </span>
              <h1>
                Find trusted
                <br />
                doctors near you
              </h1>
              <p>
                Explore doctors and clinics near you. Compare profiles and
                request an appointment.
              </p>
            </div>
            <form action="/doctors" className={styles.search} role="search">
              <label>
                <Search />
                <input
                  aria-label="Doctor, specialty or condition"
                  name="q"
                  placeholder="Search doctor, specialty or condition"
                  maxLength={120}
                />
              </label>
              <label>
                <MapPin />
                <select id="care-city" name="location" aria-label="City">
                  <option value="">All India</option>
                  {cities.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit">Find Doctors</button>
            </form>
          </div>
        </section>
        <div className={styles.trust}>
          <div className={styles.wrap}>
            {[
              {
                Icon: Users,
                heading: "Doctor profiles",
                text: "Compare specialties",
              },
              {
                Icon: Building2,
                heading: "Clinic locations",
                text: "Plan your visit",
              },
              {
                Icon: CalendarCheck,
                heading: "Appointments",
                text: "Request a time",
              },
              {
                Icon: ShieldCheck,
                heading: "Clinic confirmation",
                text: "Track your request",
              },
            ].map(({ Icon, heading, text }) => (
              <div key={heading}>
                <Icon />
                <span>
                  <strong>{heading}</strong>
                  <small>{text}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.content}>
          <section>
            <Title
              title="Explore Specialties"
              sub="Find the right doctor for your health needs."
              href="/specialties"
            />
            <div className={styles.tiles}>
              {specialties.map(([slug, name]) => (
                <Link href={"/specialties/" + slug} key={slug}>
                  <span
                    aria-hidden="true"
                    style={{
                      maskImage: "url(/icons/specialties/" + slug + ".svg)",
                    }}
                  />
                  {name}
                </Link>
              ))}
            </div>
          </section>
          <section>
            <Title
              title="Featured Doctors"
              sub="Meet participating doctors and explore their practices."
              href="/doctors"
              label="View all doctors"
            />
            {featured.length ? (
              <div className={styles.doctors}>
                {featured.map((d) => (
                  <article key={d.id}>
                    <DoctorPortrait name={d.name} src={d.photoUrl} compact />
                    <div>
                      <Link className={styles.name} href={doctorPath(d)}>
                        {d.name}
                      </Link>
                      <ShieldCheck aria-label="DOCVY verified" size={16} />
                      <p>{d.specialties[0]}</p>
                      {d.profileDetails?.experienceYears != null && (
                        <small>
                          {d.profileDetails.experienceYears} years of experience
                        </small>
                      )}
                      <p>
                        <MapPin size={12} /> {d.locations[0].city}{" "}
                        {d.profileDetails?.consultationFee != null && (
                          <b>₹{d.profileDetails.consultationFee}</b>
                        )}
                      </p>
                      <Link
                        className={styles.button}
                        href={{
                          pathname: "/request",
                          query: {
                            provider: d.id,
                            city: d.locations[0].city,
                            facility: d.locations[0].facility,
                          },
                        }}
                      >
                        Request appointment
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <Stethoscope />
                <div>
                  <strong>Find a doctor by specialty or city</strong>
                  <p>
                    Browse practice locations and check appointment options on
                    each profile.
                  </p>
                </div>
                <Link href="/doctors">
                  Explore doctors <ArrowRight size={15} />
                </Link>
              </div>
            )}
          </section>
          <div className={styles.split}>
            <section>
              <Title
                title="How DOCVY Works"
                sub="Arrange your visit in four simple steps."
              />
              <ol className={styles.steps}>
                {steps.map(({ Icon, title, text }, i) => (
                  <li key={title}>
                    <Icon />
                    <strong>
                      {i + 1}. {title}
                    </strong>
                    <p>{text}</p>
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <Title
                title="Why Choose DOCVY?"
                sub="Practical details to help you choose care."
              />
              <div className={styles.why}>
                <ul>
                  {[
                    "Compare professional profiles",
                    "Find nearby clinics",
                    "Request a visit online",
                    "Track your appointment request",
                  ].map((t) => (
                    <li key={t}>
                      <CheckCircle2 size={14} />
                      {t}
                    </li>
                  ))}
                </ul>
                <Image
                  src="/images/homepage/why-docvy-elderly-patient.webp"
                  width={340}
                  height={215}
                  sizes="(max-width: 600px) 36vw, 20vw"
                  alt="A doctor speaking with an older patient"
                />
              </div>
            </section>
          </div>
          <section>
            <Title
              title="Care Guide & Health Articles"
              sub="Questions and practical information for your next consultation."
              href="/care-guide"
              label="View all articles"
            />
            <div className={styles.articles}>
              {articles.map(([img, category, title, slug]) => (
                <Link key={slug} href={"/patient-guides/" + slug}>
                  <Image
                    alt=""
                    src={"/images/care-guide/" + img + ".webp"}
                    width={150}
                    height={116}
                    sizes="(max-width: 600px) 110px, 10vw"
                  />
                  <div>
                    <small>{category}</small>
                    <h3>{title}</h3>
                    <span>
                      Read guide <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <section className={styles.cta}>
            <div>
              <h2>
                Book and manage
                <br /> appointments anytime, anywhere
              </h2>
              <p>Request a visit and check the clinic’s response on DOCVY.</p>
            </div>
            <div>
              <Link className={styles.button} href="/doctors">
                Find a doctor <ArrowRight size={15} />
              </Link>
              <Link href="/status">
                <ClipboardList size={16} /> Track appointment
              </Link>
            </div>
          </section>
        </div>
      </main>
      <footer className={styles.footer}>
        <FooterDisclosure>
          <summary>
            <Image
              src="/brand/DOCVY_white_vector.svg"
              alt="DOCVY"
              width={105}
              height={35}
            />
            <span>Footer links</span>
            <ChevronDown size={18} />
          </summary>
          <div className={styles.footGrid}>
            <div>
              <Image
                src="/brand/DOCVY_white_vector.svg"
                alt="DOCVY"
                width={105}
                height={35}
              />
              <p>
                Find doctors, compare clinics and prepare for your next visit.
              </p>
            </div>
            <nav aria-label="Find care">
              <strong>Quick links</strong>
              <FooterLinks links={careLinks} />
            </nav>
            <nav aria-label="Popular specialties">
              <strong>Popular specialties</strong>
              <FooterLinks
                links={specialties
                  .slice(0, 4)
                  .map(([slug, name]) => ["/specialties/" + slug, name])}
              />
            </nav>
            <nav aria-label="Company">
              <strong>DOCVY</strong>
              <FooterLinks links={teamLinks} />
            </nav>
            <div>
              <strong>Get in touch</strong>
              <a href="mailto:contact@docvy.in">contact@docvy.in</a>
              <a href="tel:+919311779708">+91 93117 79708</a>
              <p>Sector 48, Gurugram, Haryana 122101, India</p>
            </div>
          </div>
          <div className={styles.legal}>
            <p>© {new Date().getFullYear()} DOCVY. All rights reserved.</p>
            <FooterLinks
              links={[
                ["/legal/privacy", "Privacy"],
                ["/legal/terms", "Terms"],
                ["/legal/refund", "Refunds"],
                ["/legal/disclaimer", "Medical disclaimer"],
                ["/grievance", "Grievance"],
              ]}
            />
          </div>
          <p className={styles.disclaimer}>
            In an emergency, call 112 or go to the nearest hospital. DOCVY helps
            you find care and does not replace medical advice.
          </p>
        </FooterDisclosure>
      </footer>
    </div>
  );
}
