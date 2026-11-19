"use client";
import { useState } from "react";
import { Search } from "lucide-react";
const questions = [
  [
    "Is it free to list on DOCVY?",
    "Doctors can submit a basic profile for review through Partner with us. Contact the team about any additional services.",
    "For Doctors",
  ],
  [
    "How can I book an appointment with a doctor?",
    "Find a participating doctor, select the correct practice and send your preferred date and time. The clinic confirms the visit.",
    "For Patients",
  ],
  [
    "How do I get my profile verified?",
    "Submit your professional details and listing consent. Profile approval and registration verification are reviewed separately.",
    "Account & Verification",
  ],
  [
    "Do you charge a commission per appointment?",
    "Ask the DOCVY team for the terms applicable to your practice. No payment is collected by this page.",
    "Plans & Pricing",
  ],
  [
    "Can clinics and hospitals list multiple locations?",
    "Include each practice address and its doctor details in your application. Our team reviews the locations before publication.",
    "For Clinics & Hospitals",
  ],
  [
    "What is included in the paid plans?",
    "The pricing cards in this isolated visual implementation reproduce design concepts. Paid checkout is not enabled; contact DOCVY to confirm commercial terms.",
    "Plans & Pricing",
  ],
  [
    "How will I receive appointment enquiries?",
    "Approved staff can review requests in the clinic workspace. Access is limited to the relevant clinic and role.",
    "For Doctors",
  ],
  [
    "Can I edit or update my profile later?",
    "Contact DOCVY or submit a profile correction. Changes are reviewed before they appear publicly.",
    "Account & Verification",
  ],
  [
    "How do I contact the DOCVY support team?",
    "Email contact@docvy.in or use the WhatsApp link on the contact page. For an emergency, call 112 or go to the nearest hospital.",
    "Technical Support",
  ],
];
export default function MockupFaqs({ compact = false }: { compact?: boolean }) {
  const [q, setQ] = useState(""),
    [category, setCategory] = useState("All FAQs");
  const visible = (compact ? questions.slice(0, 5) : questions).filter(
    ([title, answer, c]) =>
      (category === "All FAQs" || category === c) &&
      (title + " " + answer).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className={"mock-faqs" + (compact ? " compact" : "")}>
      {!compact && (
        <>
          <label className="mock-inner-search">
            <Search size={20} />
            <span className="sr-only">Search questions</span>
            <input
              placeholder="Search for questions (e.g. booking, listing, pricing)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
          <div className="mock-faq-categories">
            {[
              "All FAQs",
              "For Patients",
              "For Doctors",
              "For Clinics & Hospitals",
              "Plans & Pricing",
              "Account & Verification",
              "Technical Support",
            ].map((c) => (
              <button
                key={c}
                aria-pressed={category === c}
                className={category === c ? "active" : ""}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <h2>Most Asked Questions</h2>
        </>
      )}
      {visible.length ? (
        visible.map(([title, answer], i) => (
          <details
            key={title}
            className="mock-accordion"
            open={!compact && i === 0 ? true : undefined}
          >
            <summary>{title}</summary>
            <p>{answer}</p>
          </details>
        ))
      ) : (
        <p role="status">
          No questions match. Try another search or contact our team.
        </p>
      )}
    </div>
  );
}
