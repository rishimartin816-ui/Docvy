import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass, HeartHandshake, MapPin, ShieldCheck } from "lucide-react";
import DiscoverySearch from "./DiscoverySearch";
import ReferenceArtwork from "./ReferenceArtwork";
import ReferenceCareSection from "./ReferenceCareSection";
import SpecialtyIcon from "./SpecialtyIcon";
import { DoctorCards } from "./DirectoryPage";
import { HealthTopicIcon, healthTopics } from "./HealthTopicIcon";

import { specialties } from "@/lib/care-directory";
import { directoryProcedures, popularProcedures } from "@/lib/directory";
import { facilitiesFrom } from "@/lib/facilities";
import { getDirectoryDoctors } from "@/lib/public-directory";

const categories = [
  { label: "Find doctors", href: "/doctors", scene: "doctor" },
  { label: "Explore clinics", href: "/clinics", scene: "clinic" },
  { label: "Find hospitals", href: "/hospitals", scene: "hospital" },
  { label: "For providers", href: "/for-clinics", scene: "workspace" },
] as const;
const trust = [
  { icon: HeartHandshake, label: "Care around your needs" },
  { icon: Compass, label: "A clearer next step" },
  { icon: ShieldCheck, label: "Sourced doctor profiles" },
  { icon: MapPin, label: "Practice locations" },
];
const steps = [
  { title: "Search for care", text: "Start with a doctor, specialty, symptom or hospital. Add a city if you have a location in mind." },
  { title: "Explore your options", text: "Read the doctor’s specialty, specialty and practice location. Use our guides to prepare your questions." },
  { title: "Request your visit", text: "For doctors who have opted in, send your preferences through DOCVY. This does not reserve a slot. The clinic confirms time and fee." },
];
const questions = [
  ["What can I do on DOCVY?", "Compare sourced doctor profiles and practice locations, read patient guides, and send appointment requests only to doctors who have opted in."],
  ["Is my appointment confirmed when I submit a request?", "Your request is saved with a reference number. It does not reserve a slot. The clinic or hospital must confirm the time, availability and consultation fee before you travel."],
  ["Where does doctor information come from?", "Each real profile links to its official hospital source. Unclaimed profiles show limited sourced details and are not yet partnered with DOCVY. A DOCVY Verified badge requires a separate manual registration check."],
  ["Can I find an independent clinic?", "You can explore the published clinic and hospital practice locations of the doctors listed on DOCVY. More clinic profiles will be added as their details are checked."],
  ["Does DOCVY offer medical advice?", "The guides help you prepare for a conversation with a clinician. They cannot diagnose your symptoms or replace personalised medical advice."],
];

export default async function ReferenceHome() {
  const liveDoctors = await getDirectoryDoctors();
  const facilities = facilitiesFrom(liveDoctors);
  const featuredSpecialties = specialties.filter(({ slug }) => !["dentistry", "mental-health"].includes(slug));
  return <div className="reference-home">
    <section className="reference-hero" aria-labelledby="home-heading">
      <div className="reference-wordmark" aria-hidden="true">DOCVY</div>
      <div className="reference-wrap relative">
        <p className="reference-eyebrow"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#A5D4AE]" aria-hidden="true" />Find care closer to you</p>
        <h1 id="home-heading" className="mt-6">Find the right doctor, close to home.</h1>
        <p className="hero-description mt-6 text-base">Search by specialty, symptom or hospital. Compare sourced profiles and send an appointment request. The doctor’s team confirms your slot.</p>
        <div className="reference-search"><DiscoverySearch /></div>
        <nav aria-label="Explore care" className="reference-hero-categories">
          {categories.map(({ label, href, scene }) => <Link key={href} href={href} className="reference-category">
            <div className="reference-category-image"><ReferenceArtwork scene={scene} /></div>
            <div className="reference-category-label">{label}<ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" /></div>
          </Link>)}
        </nav>
      </div>
    </section>
    <div className="reference-trust">{trust.map(({ icon: Icon, label }) => <span key={label}><Icon size={24} strokeWidth={1.5} aria-hidden="true" />{label}</span>)}</div>

    <ReferenceCareSection id="doctors" scene="doctor" kicker="Doctor discovery" title={<>The right specialty.<br /><em>A doctor near you.</em></>}
      benefits={["Explore medical specialties", "Read sourced doctor profiles", "Check practice locations", "Requests for opted-in doctors"]}
      text="When you’re looking for care, a little clarity helps. Explore the doctor’s specialty and practice location, then send your preferences through DOCVY. The provider confirms the visit."
      href="/doctors" label="Find a doctor">
      <DoctorCards doctors={liveDoctors.slice(0, 2)} />
    </ReferenceCareSection>

    <section className="reference-wrap pb-14 md:pb-20" aria-labelledby="specialties-heading">
      <div className="flex flex-wrap items-center justify-between gap-4"><h2 id="specialties-heading" className="text-2xl font-medium">Start with the specialty you need</h2><Link href="/specialties" className="docvy-pill">View all specialties <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" /></Link></div>
      <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">{featuredSpecialties.map(({ slug, name, plain }) => <li key={slug}><Link href={"/specialties/" + slug} className="reference-link-card block h-full p-5"><SpecialtyIcon slug={slug} /><h3 className="mt-4 text-base font-medium">{name}</h3><p className="mt-2 text-sm leading-6 text-grey">{plain}</p></Link></li>)}</ul>
    </section>

    <ReferenceCareSection id="clinics" tone="rose" scene="calendar" kicker="Clinics & outpatient visits" title={<>Make time<br /><em>for your health.</em></>}
      benefits={["Find outpatient doctors", "Check the hospital branch", "Share your preferences", "Keep your request reference"]}
      text="For a first consultation or a follow-up, start with where the doctor practises. Compare the sourced profiles and check whether the doctor has opted in to appointment requests."
      href="/clinics" label="Explore outpatient care" />

    <ReferenceCareSection id="hospitals" tone="sand" scene="hospital" kicker="Hospital discovery" title={<>Explore hospitals.<br /><em>Plan your next visit.</em></>}
      benefits={["View practice locations", "Explore the specialties", "Find associated doctors", "Check profile status"]}
      text="A familiar hospital name is just the start. Check the department, doctor and branch address so you know where you’re going and what to ask before your visit."
      href="/hospitals" label="Find hospitals">
      <ul className="mt-7 space-y-3">{facilities.filter((facility) => facility.kind === "hospital").slice(0, 3).map((facility) => <li key={facility.name}><Link href={{ pathname: "/doctors", query: { q: facility.name } }} className="reference-link-card flex items-center justify-between gap-4 p-5"><div><h3 className="font-medium">{facility.name}</h3><p className="mt-1 text-sm text-grey">{facility.location.locality}, {facility.location.city}</p></div><ArrowUpRight size={19} strokeWidth={1.5} className="shrink-0 text-primary" aria-hidden="true" /></Link></li>)}</ul>
    </ReferenceCareSection>

    <section className="reference-steps" id="how-it-works" aria-labelledby="steps-heading"><div className="reference-wrap">
      <p className="reference-eyebrow text-center text-grey">From search to appointment request</p><h2 id="steps-heading" className="reference-heading mt-4 text-center">Find. Choose.<br /><em>Take the next step.</em></h2>
      <ol>{steps.map((step, index) => <li key={step.title}><span className="text-sm font-semibold text-primary">0{index + 1}</span><h3 className="mt-4 text-xl font-medium">{step.title}</h3><p className="reference-copy mt-3 text-sm">{step.text}</p></li>)}</ol>
    </div></section>

    <section className="reference-section reference-section-sand" id="procedures" aria-labelledby="procedure-heading"><div className="reference-wrap">
      <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="reference-eyebrow text-grey">Surgery, explained simply</p><h2 id="procedure-heading" className="reference-heading mt-4">More clarity.<br /><em>Before you decide.</em></h2></div><Link href="/surgery-guide" className="docvy-pill">View all procedures <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" /></Link></div>
      <p className="reference-copy mt-5">Understand the questions to ask about treatment choices, hospital stays and recovery. Your surgeon can help you decide what is right for you.</p>
      <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{directoryProcedures.filter(({ slug }) => popularProcedures.includes(slug)).map(({ slug, name }) => <li key={slug}><Link href={"/surgeries/" + slug} className="reference-link-card flex min-h-20 items-center justify-between gap-4 p-5 font-medium">{name}<ArrowUpRight size={18} strokeWidth={1.5} className="shrink-0 text-primary" aria-hidden="true" /></Link></li>)}</ul>
    </div></section>

    <section className="reference-section reference-wrap" id="care-library" aria-labelledby="guides-heading">
      <span id="concerns" aria-hidden="true" />
      <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="reference-eyebrow text-grey">Health guides for everyday questions</p><h2 id="guides-heading" className="reference-heading mt-4">A little understanding.<br /><em>A more confident visit.</em></h2></div><Link href="/care-guide" className="docvy-pill">All health guides <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" /></Link></div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{healthTopics.filter(({ slug }) => ["high-blood-pressure", "diabetes", "joint-pain-arthritis", "kidney-stones"].includes(slug)).map(({ slug, label, description }) => <li key={slug}><Link href={"/patient-guides/" + slug} className="reference-link-card block h-full p-6"><HealthTopicIcon slug={slug} /><h3 className="mt-5 text-lg font-medium">{label}</h3><p className="mt-3 text-sm leading-7 text-grey">{description}</p></Link></li>)}</ul>
    </section>

    <ReferenceCareSection id="providers" scene="workspace" kicker="For doctors, clinics & hospitals" title={<>Your practice.<br /><em>A connected next step.</em></>}
      benefits={["Help patients find your practice", "Discuss your clinic workflow", "Explore appointment tools", "Arrange authorised staff access"]}
      text="Give patients a clearer picture of your practice. Talk to DOCVY about a listing, appointment requests and the clinic workspace. Operational access is reviewed with your organisation before it is enabled."
      href="/for-clinics" label="Explore DOCVY for providers" />

    <section id="faq" className="reference-section reference-wrap" aria-labelledby="faq-heading"><div className="reference-faq"><p className="reference-eyebrow text-center text-grey">Here to help you understand</p><h2 id="faq-heading" className="reference-heading mb-8 mt-4 text-center">Your questions, answered.</h2>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}<div className="mt-8 text-center"><Link href="/faqs" className="docvy-pill">More about DOCVY <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" /></Link></div></div></section>
  </div>;
}
