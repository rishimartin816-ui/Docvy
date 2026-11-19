import Link from "next/link";
import {
  BadgeCheck,
  MapPin,
  GraduationCap,
  CalendarDays,
  Phone,
  MessageCircle,
  Stethoscope,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import type { ProviderCandidate } from "@/lib/provider-candidates";
import { canRequestAppointment, isVerified } from "@/lib/profile-policy";
import { doctorPath } from "@/lib/directory-normalization";
import { doctorStructuredData } from "@/lib/doctor-profile";
import { practiceLocationLabel } from "@/lib/practice-labels";
import DoctorPortrait from "../DoctorPortrait";
import { Photo } from "./MockupHome";
export default function MockupDoctor({
  doctor,
  related,
}: {
  doctor: ProviderCandidate;
  related: ProviderCandidate[];
}) {
  const partnered = canRequestAppointment(doctor),
    verified = isVerified(doctor),
    d = partnered ? doctor.profileDetails : undefined;
  const request = (i: number) => ({
    pathname: "/request",
    query: {
      provider: doctor.id,
      city: doctor.locations[i].city,
      facility: doctor.locations[i].facility,
    },
  });
  return (
    <div className="mock-page mock-doctor-profile">
      {partnered && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(doctorStructuredData(doctor)).replace(
              /</g,
              "\u003c",
            ),
          }}
        />
      )}
      <div className="mock-profile-top">
        <DoctorPortrait
          name={doctor.name}
          src={partnered ? doctor.photoUrl : null}
          large
        />
        <div>
          {verified && (
            <span className="mock-profile-badge">
              <BadgeCheck size={15} />
              Verified Doctor
            </span>
          )}
          <h1>{doctor.name}</h1>
          <p>{doctor.specialties.join(" · ")}</p>
          {d?.qualifications && (
            <p>
              <GraduationCap size={16} />
              {d.qualifications}
            </p>
          )}
          {d?.experienceYears != null && (
            <p>
              <CalendarDays size={16} />
              {d.experienceYears} years of experience
            </p>
          )}
          {verified && (
            <p className="mock-registration">
              {doctor.registrationCouncil} {doctor.registrationNumber}
            </p>
          )}
          {!partnered && <p>Not yet partnered with DOCVY</p>}
        </div>
      </div>
      <div className="mock-profile-stats">
        {[
          [
            CalendarDays,
            d?.experienceYears != null
              ? d.experienceYears + " Years"
              : "Ask Clinic",
            "Experience",
          ],
          [
            GraduationCap,
            d?.qualifications ?? doctor.specialties[0],
            "Qualifications",
          ],
          [MapPin, practiceLocationLabel(doctor.locations[0]), "Location"],
          [
            Stethoscope,
            d?.consultationFee != null ? "₹" + d.consultationFee : "Ask Clinic",
            "Consultation",
          ],
        ].map(([Icon, v, t]) => {
          const I = Icon as typeof MapPin;
          return (
            <div key={String(t)}>
              <I size={25} strokeWidth={1.5} />
              <strong>{String(v)}</strong>
              <span>{String(t)}</span>
            </div>
          );
        })}
      </div>
      {partnered && (
        <>
          <Link href={request(0)} className="mock-button mock-profile-primary">
            <CalendarDays size={20} />
            Request Appointment
          </Link>
          <div className="mock-two mock-profile-contact">
            {d?.practicePhone && (
              <>
                <a
                  className="mock-button mock-outline"
                  href={"https://wa.me/" + d.practicePhone.replace(/\D/g, "")}
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
                <a
                  className="mock-button mock-outline"
                  href={"tel:" + d.practicePhone}
                >
                  <Phone size={18} />
                  Call Clinic
                </a>
              </>
            )}
          </div>
        </>
      )}
      <nav className="mock-profile-tabs" aria-label="Doctor profile sections">
        {[
          ["overview", "Overview"],
          ["locations", "Locations"],
          ["services", "Services"],
          ["reviews", "Reviews"],
          ["profile-faqs", "FAQs"],
        ].map(([id, t]) => (
          <a href={"#" + id} key={id}>
            {t}
          </a>
        ))}
      </nav>
      <section id="overview">
        <h2>About the Doctor</h2>
        {partnered && doctor.summary ? (
          <p>{doctor.summary}</p>
        ) : (
          <p>
            Review the sourced professional details and practice locations
            below.
          </p>
        )}
        <div className="mock-profile-summary">
          <div>
            <GraduationCap />
            <p>
              Specialty<strong>{doctor.specialties.join(", ")}</strong>
            </p>
          </div>
          <div>
            <Stethoscope />
            <p>
              Consultation Fee
              <strong>
                {d?.consultationFee != null
                  ? "₹" + d.consultationFee
                  : "Confirm with clinic"}
              </strong>
            </p>
          </div>
        </div>
      </section>
      {d?.qualifications && (
        <section className="mock-profile-line">
          <h2>
            <GraduationCap />
            Qualifications
          </h2>
          <p>
            <CheckCircle2 size={15} />
            {d.qualifications}
          </p>
        </section>
      )}
      {d?.experienceYears != null && (
        <section className="mock-profile-line">
          <h2>
            <CalendarDays />
            Experience
          </h2>
          <p>
            <CheckCircle2 size={15} />
            {d.experienceYears} years of professional experience
          </p>
        </section>
      )}
      <section id="services">
        <h2>
          <Stethoscope />
          Specialties & Services
        </h2>
        <div className="mock-profile-tags">
          {[...doctor.specialties, ...(doctor.centres ?? [])].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {d?.languages?.length && <p>Languages: {d.languages.join(", ")}</p>}
      </section>
      <section id="reviews">
        <h2>Patient Reviews</h2>
        <div className="mock-review-empty">
          <ShieldCheck size={35} />
          <p>
            No reviewed patient feedback is available yet. Ratings and
            testimonials are shown only when supported by actual reviews.
          </p>
        </div>
      </section>
      <section id="locations">
        <h2>
          <MapPin />
          Clinic Locations & Availability
        </h2>
        {d?.appointmentNote && <p>{d.appointmentNote}</p>}
        {doctor.locations.map((l, i) => (
          <article className="mock-profile-clinic" key={l.city + l.facility}>
            <div className="mock-clinic-photo">Clinic photograph required</div>
            <div>
              <h3>{l.facility}</h3>
              <p>{practiceLocationLabel(l, true)}</p>
              {l.kind !== "online" && l.address && <p>{l.address}</p>}
              {partnered && l.consultingHours && (
                <p>
                  <CalendarDays size={14} />
                  {l.workingDays ? l.workingDays + ": " : ""}
                  {l.consultingHours} IST
                </p>
              )}
              {partnered && l.practicePhone && (
                <a href={"tel:" + l.practicePhone}>
                  <Phone size={14} />
                  {l.practicePhone}
                </a>
              )}
              {partnered && l.consultationFee != null && (
                <p>Consultation Fee: ₹{l.consultationFee}</p>
              )}
            </div>
            {partnered && (
              <>
                <p className="mock-clinic-availability">
                  Contact the clinic to confirm a visit time.
                </p>
                <Link className="mock-button" href={request(i)}>
                  Request Appointment at This Clinic
                </Link>
              </>
            )}
            {l.mapsUrl && l.kind !== "online" && (
              <a
                href={l.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mock-clinic-directions"
              >
                Google Maps directions →
              </a>
            )}
          </article>
        ))}
      </section>
      <section id="profile-faqs">
        <h2>Frequently Asked Questions</h2>
        {[
          [
            "How can I request an appointment?",
            partnered
              ? "Select your clinic above and submit your preferred visit date and time. The clinic confirms the appointment."
              : "Appointment requests are not enabled for this profile.",
          ],
          [
            "What is the consultation fee?",
            d?.consultationFee != null
              ? "The supplied consultation fee is ₹" +
                d.consultationFee +
                ". Confirm with the selected clinic."
              : "Contact the clinic to confirm the current fee.",
          ],
          [
            "Which languages does the doctor speak?",
            d?.languages?.join(", ") ||
              "Ask the clinic about available languages.",
          ],
        ].map(([q, a]) => (
          <details className="mock-accordion" key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      {related.length > 0 && (
        <section>
          <div className="mock-heading">
            <h2>More Doctors to Explore</h2>
            <Link href="/doctors">
              View All <ArrowRight size={13} />
            </Link>
          </div>
          <div className="mock-doctors">
            {related.map((r) => (
              <article key={r.id}>
                <Link href={doctorPath(r)}>
                  <DoctorPortrait
                    name={r.name}
                    src={canRequestAppointment(r) ? r.photoUrl : null}
                    compact
                  />
                  <h3>{r.name}</h3>
                  <p>{r.specialties[0]}</p>
                  <span className="mock-button">View Profile</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
      <aside className="mock-doctor-end-banner">
        <Photo
          name="doctor-profile--discovery-banner.webp"
          alt="Illustrative reference image"
        />
        <div>
          <h2>Find the right specialist for your health needs.</h2>
          <p>
            Explore doctor profiles, compare practices and request appointments.
          </p>
          <Link className="mock-button mock-outline" href="/doctors">
            Find More Doctors →
          </Link>
        </div>
      </aside>
      {!partnered && (
        <div className="mock-profile-claim">
          <Link
            className="mock-button"
            href={{
              pathname: "/claim-profile",
              query: { provider: doctor.id },
            }}
          >
            Claim Profile
          </Link>
          <Link
            href={{
              pathname: "/remove-profile",
              query: { provider: doctor.id },
            }}
          >
            Request profile removal
          </Link>
        </div>
      )}
    </div>
  );
}
