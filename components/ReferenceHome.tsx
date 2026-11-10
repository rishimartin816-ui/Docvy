import Link from "next/link";
import { getDirectoryDoctors } from "@/lib/public-directory";
import { isVerified } from "@/lib/profile-policy";
import { cities, doctorsIn, citySlug } from "@/lib/directory";
import { ArrowRight, ArrowUpRight, BookOpen, ClipboardList, MapPin, Search, Stethoscope } from "lucide-react";
import DiscoverySearch from "./DiscoverySearch";
import SpecialtyIcon from "./SpecialtyIcon";
import { HealthTopicIcon } from "./HealthTopicIcon";
import { specialties } from "@/lib/care-directory";

const startingPoints = [
  { title: "Find a doctor", text: "Browse by specialty, hospital or city.", href: "/doctors", icon: Stethoscope },
  { title: "Understand a health concern", text: "Read a guide before your next visit.", href: "/care-guide", icon: BookOpen },
  { title: "Prepare for a surgery discussion", text: "Know which questions to take with you.", href: "/surgery-guide", icon: ClipboardList },
];
const commonSearches = [
  { label: "Skin & hair", href: "/specialties/dermatology" },
  { label: "Joint pain", href: "/patient-guides/joint-pain-arthritis" },
  { label: "Diabetes", href: "/patient-guides/diabetes" },
  { label: "Children’s health", href: "/specialties/paediatrics" },
];
const steps = [
  { title: "Start with your concern", text: "Search a specialty, doctor or hospital. Add a city to see the profiles listed there. If you’re unsure where to start, explore the health guides.", icon: Search },
  { title: "Check the practice details", text: "Read the specialty, hospital or clinic, and city on the profile. Confirm the branch with the practice before you travel.", icon: MapPin },
  { title: "Arrange the next step", text: "Where an appointment-request button is available, share your preferences. The clinic confirms the time and fee; sending a request does not reserve a slot.", icon: ClipboardList },
];
const procedures = [
  { slug: "hernia-repair", name: "Hernia repair", text: "Ask about treatment choices and recovery." },
  { slug: "gallbladder-removal", name: "Gallbladder removal", text: "Prepare for the conversation about surgery." },
  { slug: "knee-replacement", name: "Knee replacement", text: "Discuss movement, recovery and follow-up." },
  { slug: "cataract-surgery", name: "Cataract surgery", text: "Write down questions about your vision." },
  { slug: "kidney-stone-removal", name: "Kidney stone removal", text: "Make a list of questions for your urologist." },
  { slug: "tonsil-removal", name: "Tonsil removal", text: "Ask what to plan for before and after the procedure." },
];
const guides = [
 {slug:"kidney-stones",name:"Kidney stones",text:"What to ask about pain, scans and a urology visit."},
 {slug:"diabetes",name:"Diabetes",text:"Plan a first visit or prepare for a follow-up."},
 {slug:"high-blood-pressure",name:"High blood pressure",text:"Know what to bring to your next review."},
 {slug:"piles",name:"Piles",text:"Bleeding, discomfort and questions about treatment."},
 {slug:"thyroid",name:"Thyroid concerns",text:"Understand test names and prepare your questions."},
 {slug:"pcos-pcod",name:"PCOS / PCOD",text:"Periods, hormone concerns and planning your care."},
 {slug:"hernia",name:"Hernia",text:"What a new bulge could mean and when to get help."},
 {slug:"fatty-liver",name:"Fatty liver",text:"Make sense of a scan finding and your next visit."},
];

const questions = [
  ["What can I use DOCVY for?", "Find doctors by specialty, hospital or city, compare practice details, and prepare for your visit with clear health guides."],
  ["Can I request an appointment with every doctor listed?", "Look for Request appointment on opted-in profiles. Choose your preferences and receive a request reference; the clinic confirms your visit."],
  ["Does an appointment request confirm my visit?", "You receive a reference when your request is saved. The clinic confirms the time and fee before your visit; the request itself does not reserve a slot."],
  ["What does DOCVY Verified mean?", "The doctor or clinic has given written consent to their profile, and DOCVY has separately checked the registration number with the relevant medical council or NMC. A listed hospital name or a claimed profile alone does not mean the doctor is verified."],
  ["Where should I start if I’m not sure which specialty to search?", "Read the specialty descriptions and health guides to get familiar with the terms. They provide background for a conversation with a qualified clinician and cannot decide which doctor or treatment is right for your situation."],
];

export default async function ReferenceHome() {
  const doctors = await getDirectoryDoctors();
  const verified = doctors.filter(isVerified).length;
  const facilities = new Set(doctors.flatMap(d=>d.locations.map(l=>l.facility).filter(Boolean))).size;
  const coveredCities = new Set(doctors.flatMap(d=>d.locations.map(l=>citySlug(l.city)))).size;
  const featuredSpecialties = specialties;
  const comingCities = cities.filter(c=>["mumbai","hyderabad","chennai"].includes(c.slug) && doctorsIn(c.slug,undefined,doctors).length===0);
  return <div className="reference-home care-home">
    <section className="reference-hero care-hero" aria-labelledby="home-heading">
      <div className="reference-wrap">
        <p className="reference-eyebrow">DOCTORS, SPECIALTIES &amp; HEALTH GUIDES</p><Link href="/hi" lang="hi" className="inline-flex min-h-11 items-center text-sm underline">हिन्दी</Link>
        <h1 id="home-heading">Find a doctor for<br className="hidden sm:block" /> the care you need.</h1>
        <p className="hero-description">Search doctors by specialty, hospital or city. Check practice details and read health guides before your next visit.</p>
        <div className="reference-search"><DiscoverySearch homepage /></div><p className="mt-4 text-sm text-[#DDECE1]">{doctors.length.toLocaleString("en-IN")} sourced doctor profiles · {facilities} listed practices · {coveredCities} cities</p>
        <nav className="care-common-searches" aria-label="Health topics to explore"><span>Explore a concern</span>{commonSearches.map(({ label, href }) => <Link key={href} href={href}>{label}<ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" /></Link>)}</nav>
        <p className="mt-4 text-sm text-[#DDECE1]">{comingCities.length ? <>Coverage expanding: {comingCities.map((c,i)=><span key={c.slug}>{i ? " · " : ""}<Link href={"/doctors/"+c.slug} className="underline">{c.name} — coming soon</Link></span>)}</> : <Link href="/doctors" className="underline">Explore current city coverage</Link>}</p>
        <nav className="care-starting-points" aria-label="Choose where to start">{startingPoints.map(({ title, text, href, icon: Icon }) => <Link key={href} href={href} className="care-starting-point"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /><div><h2>{title}</h2><p>{text}</p></div><ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" /></Link>)}</nav>
      </div>
    </section>

    <section className="reference-wrap care-section" aria-labelledby="specialties-heading">
      <div className="care-section-heading"><div><p className="care-kicker">Medical specialties</p><h2 id="specialties-heading">Know which specialist to look for.</h2><p>Explore what different specialists do, then browse the doctors listed in that specialty.</p></div><Link className="care-text-link" href="/specialties">All specialties <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" /></Link></div>
      <ul className="care-specialty-grid">{featuredSpecialties.map(({ slug, name, plain }) => <li key={slug}><Link href={"/specialties/" + slug} className="care-specialty-tile"><SpecialtyIcon slug={slug} /><h3>{name}</h3><p>{plain}</p><span>Explore specialty <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" /></span></Link></li>)}</ul>
    </section>

    <section className="care-alternate" aria-labelledby="steps-heading"><div className="reference-wrap care-section">
      <div className="care-section-heading"><div><p className="care-kicker">Using DOCVY</p><h2 id="steps-heading">Know what to check before your visit.</h2><p>A doctor’s name is only the beginning. Look at the specialty, practice location and appointment status.</p></div></div>
      <ol className="care-steps">{steps.map(({ title, text, icon: Icon }, index) => <li key={title}><div className="care-step-top"><span>0{index + 1}</span><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></div><h3>{title}</h3><p>{text}</p>{index === 1 && <div className="care-inline-links"><Link href="/hospitals">Browse hospitals <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" /></Link><Link href="/clinics">Outpatient locations <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" /></Link></div>}</li>)}</ol>
    </div></section>

    <section className="reference-wrap care-section" aria-labelledby="procedure-heading">
      <div className="care-section-heading"><div><p className="care-kicker">Surgery preparation</p><h2 id="procedure-heading">Questions to ask before surgery.</h2><p>If a procedure has been suggested, take time to ask about alternatives, recovery and follow-up. These guides help you prepare for that conversation.</p></div><Link className="care-text-link" href="/surgery-guide">All surgery guides <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" /></Link></div>
      <ul className="care-procedure-grid">{procedures.map(({ slug, name, text }) => <li key={slug}><Link href={"/surgeries/" + slug} className="care-procedure-card"><div><h3>{name}</h3><p>{text}</p></div><ArrowUpRight size={19} strokeWidth={1.5} aria-hidden="true" /></Link></li>)}</ul>
    </section>

    <section className="care-alternate" aria-labelledby="guides-heading"><div className="reference-wrap care-section">
      <div className="care-section-heading"><div><p className="care-kicker">Health guides</p><h2 id="guides-heading">Understand your health concern.</h2><p>Plain-language introductions to common conditions, with questions to take to your appointment. Each guide links to its references.</p></div><Link className="care-text-link" href="/care-guide">All health guides <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" /></Link></div>
      <ul className="care-guide-grid">{guides.map(({ slug, name, text }) => <li key={slug}><Link href={"/patient-guides/" + slug} className="care-guide-card"><HealthTopicIcon slug={slug} /><h3>{name}</h3><p>{text}</p><span>Read guide <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" /></span></Link></li>)}</ul>
    </div></section>

    <section className="reference-wrap care-section care-faq-section" aria-labelledby="faq-heading">
      <div><p className="care-kicker">Appointments &amp; profiles</p><h2 id="faq-heading">Before you request an appointment.</h2><p className="care-section-intro">How to find care and arrange your next visit.</p><p className="mt-4 text-sm"><span className="inline-flex rounded-full border border-line px-3 py-2 font-medium">DOCVY Verified — badge example</span><br />Awarded only after consent and manual registration checks.</p><Link className="care-text-link" href="/faqs">More about using DOCVY <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" /></Link></div>
      <div className="care-faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}{question === "What does DOCVY Verified mean?" && <> Currently, {verified} published {verified===1?"profile has":"profiles have"} completed DOCVY verification. This count changes only after manual checks are recorded.</>}</p></details>)}</div>
    </section>

    <aside className="care-provider-band" aria-labelledby="provider-heading"><div className="reference-wrap"><div><p className="care-kicker">For doctors &amp; clinic teams</p><h2 id="provider-heading">Help patients get to know your practice.</h2><p>Claim your profile and add your own practice details. We review your submitted changes and written consent before enabling appointment requests.</p></div><div className="care-provider-actions"><Link className="docvy-pill docvy-pill-primary" href="/claim-profile">Claim your profile <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" /></Link><Link className="care-text-link" href="/for-doctors">For doctors and clinic teams <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" /></Link></div></div></aside>
  </div>;
}
