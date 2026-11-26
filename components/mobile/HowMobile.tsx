import { ArrowRight } from "lucide-react";
import { Page, Photo } from "./Elements";

export default function HowMobile() {
  return <Page crumb="How it works">
<div className="intro">
      <h1>A clearer path to your next visit</h1>
      <p>Understand your options, find a doctor and follow your appointment.</p>
    </div>
<Photo/>
<section>
      <h2>How DOCVY works</h2>
      <div className="steps">
        <div className="step">
          <span>1</span>
          <div>
            <h3>Search for care</h3>
            <p>Start with a doctor, condition or specialty.</p>
          </div>
        </div>
        <div className="step">
          <span>2</span>
          <div>
            <h3>Compare doctors</h3>
            <p>Review qualifications, fees and locations.</p>
          </div>
        </div>
        <div className="step">
          <span>3</span>
          <div>
            <h3>Request an appointment</h3>
            <p>Choose a participating doctor and preferred visit time.</p>
          </div>
        </div>
        <div className="step">
          <span>4</span>
          <div>
            <h3>Track your visit</h3>
            <p>Use your private tracking link.</p>
          </div>
        </div>
      </div>
    </section>
<a className="btn " href="/doctors">Find doctors <ArrowRight aria-hidden="true"/></a>
<a className="btn outline" href="/care-guide">Explore Care Guide <ArrowRight aria-hidden="true"/></a>
  </Page>;
}
