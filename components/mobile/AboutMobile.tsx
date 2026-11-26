import { ArrowRight, UserRound, BookOpen, CalendarDays } from "lucide-react";
import { Page, Photo } from "./Elements";

export default function AboutMobile() {
  return <Page crumb="About DOCVY">
<div className="intro">
      <h1>A clearer next step in healthcare</h1>
      <p>When health feels uncertain, finding the next step should be easier.</p>
    </div>
<Photo/>
<section>
      <h2>What we want for patients</h2>
      <p>Help people understand medical terms, prepare questions and discover published doctor profiles.</p>
    </section>
<section>
      <h2>Start with what is on your mind</h2>
      <div className="card row">
        <span className="tile"><BookOpen aria-hidden="true"/></span>
        <div className="grow">
          <h3>Understand a health concern</h3>
        </div>
        <a className="arrow" aria-label="Understand a health concern" href="/care-guide"><ArrowRight aria-hidden="true"/></a>
      </div>
      <div className="card row">
        <span className="tile"><UserRound aria-hidden="true"/></span>
        <div className="grow">
          <h3>Find the right kind of doctor</h3>
        </div>
        <a className="arrow" aria-label="Find the right kind of doctor" href="/specialties"><ArrowRight aria-hidden="true"/></a>
      </div>
      <div className="card row">
        <span className="tile"><CalendarDays aria-hidden="true"/></span>
        <div className="grow">
          <h3>Prepare for surgery</h3>
        </div>
        <a className="arrow" aria-label="Prepare for surgery" href="/surgery-guide"><ArrowRight aria-hidden="true"/></a>
      </div>
    </section>
<a className="btn " href="/doctors">Find doctors <ArrowRight aria-hidden="true"/></a>
  </Page>;
}
