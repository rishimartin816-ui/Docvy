import { ArrowRight, UserRound, ShieldCheck, Hospital, CalendarDays } from "lucide-react";
import { Page } from "./Elements";

export default function ContactMobile() {
  return <Page crumb="Contact DOCVY">
<div className="intro">
      <h1>How can we help?</h1>
      <p>Choose the right contact route for your question.</p>
    </div>
<section>
      <h2>For patients</h2>
      <div className="card row">
        <span className="tile"><UserRound aria-hidden="true"/></span>
        <div className="grow">
          <h3>Find care</h3>
          <p>Explore the patient guide and directory.</p>
        </div>
        <a className="arrow" aria-label="Find care" href="/doctors"><ArrowRight aria-hidden="true"/></a>
      </div>
      <div className="card row">
        <span className="tile"><CalendarDays aria-hidden="true"/></span>
        <div className="grow">
          <h3>Appointment support</h3>
          <p>Use your private reference when contacting DOCVY.</p>
        </div>
        <a className="arrow" aria-label="Appointment support" href="/patient-access"><ArrowRight aria-hidden="true"/></a>
      </div>
    </section>
<section>
      <h2>For providers</h2>
      <div className="card row">
        <span className="tile"><ShieldCheck aria-hidden="true"/></span>
        <div className="grow">
          <h3>Correct a profile</h3>
        </div>
        <a className="arrow" aria-label="Correct a profile" href="/claim-profile"><ArrowRight aria-hidden="true"/></a>
      </div>
      <div className="card row">
        <span className="tile"><Hospital aria-hidden="true"/></span>
        <div className="grow">
          <h3>Discuss provider plans</h3>
        </div>
        <a className="arrow" aria-label="Discuss provider plans" href="/pricing"><ArrowRight aria-hidden="true"/></a>
      </div>
    </section>
<section>
      <h2>General enquiries</h2>
      <div className="card">
        <h3>contact@docvy.in</h3>
        <p>Privacy and business questions.</p>
        <a className="textlink" href="mailto:contact@docvy.in">Email DOCVY ↗</a>
      </div>
    </section>
<div className="note"><ShieldCheck aria-hidden="true"/>
      <span>Do not email medical records, identity documents or patient details.</span>
    </div>
  </Page>;
}
