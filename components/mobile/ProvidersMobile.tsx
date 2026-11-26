import { ArrowRight, UserRound, ShieldCheck, Hospital, Check } from "lucide-react";
import { Page, Photo } from "./Elements";

export default function ProvidersMobile() {
  return <Page crumb="For doctors & clinics">
<div className="intro">
      <h1>Your practice. Your choice.</h1>
      <p>Help patients discover your professional information on DOCVY.</p>
    </div>
<Photo/>
<a className="btn " href="/partner-with-us">List your practice <ArrowRight aria-hidden="true"/></a>
<a className="btn outline" href="/claim-profile">Claim your profile <ArrowRight aria-hidden="true"/></a>
<section>
      <h2>Understand profile status</h2>
      <div className="card row">
        <span className="tile"><UserRound aria-hidden="true"/></span>
        <div className="grow">
          <h3>Unclaimed</h3>
          <p>Limited sourced details; no appointment request option.</p>
        </div>
      </div>
      <div className="card row">
        <span className="tile"><Check aria-hidden="true"/></span>
        <div className="grow">
          <h3>Claimed</h3>
          <p>Written consent reviewed by DOCVY.</p>
        </div>
      </div>
      <div className="card row">
        <span className="tile"><ShieldCheck aria-hidden="true"/></span>
        <div className="grow">
          <h3>DOCVY Verified</h3>
          <p>Registration checked separately from consent.</p>
        </div>
      </div>
    </section>
<section>
      <h2>Manage your profile</h2>
      <div className="card row">
        <span className="tile"><UserRound aria-hidden="true"/></span>
        <div className="grow">
          <h3>Request removal</h3>
        </div>
        <a className="arrow" aria-label="Request removal" href="/remove-profile"><ArrowRight aria-hidden="true"/></a>
      </div>
      <div className="card row">
        <span className="tile"><Hospital aria-hidden="true"/></span>
        <div className="grow">
          <h3>Provider plans</h3>
          <p>Discuss future workflows.</p>
        </div>
        <a className="arrow" aria-label="Provider plans" href="/pricing"><ArrowRight aria-hidden="true"/></a>
      </div>
    </section>
  </Page>;
}
