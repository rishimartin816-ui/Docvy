import { ArrowRight, ShieldCheck, Check } from "lucide-react";
import { Page } from "./Elements";

export default function PricingMobile() {
  return <Page crumb="Clinic & hospital plans">
<div className="intro">
      <h1>Plans for care teams</h1>
      <p>Discuss future provider workflows with DOCVY. No active subscriptions or published rate card.</p>
    </div>
<article className="card plan">
      <span className="verified">Planned</span>
      <h2>Single practice</h2>
      <p>For independent clinics.</p>
      <div className="checks">
        <p><Check aria-hidden="true"/>Practice information</p>
        <p><Check aria-hidden="true"/>Doctor listings</p>
        <p><Check aria-hidden="true"/>Patient enquiry workflows</p>
      </div>
      <a className="btn outline" href="/contact">Contact DOCVY <ArrowRight aria-hidden="true"/></a>
    </article>
<article className="card plan">
      <span className="verified">Planned</span>
      <h2>Multiple locations</h2>
      <p>For clinic groups.</p>
      <div className="checks">
        <p><Check aria-hidden="true"/>Shared profiles</p>
        <p><Check aria-hidden="true"/>Location-based enquiries</p>
        <p><Check aria-hidden="true"/>Team coordination</p>
      </div>
      <a className="btn outline" href="/contact">Contact DOCVY <ArrowRight aria-hidden="true"/></a>
    </article>
<article className="card plan">
      <span className="verified">Planned</span>
      <h2>Hospital</h2>
      <p>For departments and branches.</p>
      <div className="checks">
        <p><Check aria-hidden="true"/>Hospital information</p>
        <p><Check aria-hidden="true"/>Provider coordination</p>
        <p><Check aria-hidden="true"/>Enquiry review</p>
      </div>
      <a className="btn outline" href="/contact">Contact DOCVY <ArrowRight aria-hidden="true"/></a>
    </article>
<div className="note"><ShieldCheck aria-hidden="true"/>
      <span>These are proposed workflows, not purchasable services.</span>
    </div>
  </Page>;
}
