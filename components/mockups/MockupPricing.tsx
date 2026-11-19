"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
export default function MockupPricing() {
  const [clinic, setClinic] = useState(false);
  return (
    <div className="mock-pricing">
      <div
        className="mock-pricing-tabs"
        role="group"
        aria-label="Plan audience"
      >
        <button aria-pressed={!clinic} onClick={() => setClinic(false)}>
          For Doctors
        </button>
        <button aria-pressed={clinic} onClick={() => setClinic(true)}>
          For Clinics & Hospitals
        </button>
      </div>
      <p className="mock-price-note">
        Design-reference pricing only. Paid checkout is not enabled; confirm
        plans with DOCVY.
      </p>
      <div className="mock-three">
        {[
          {
            name: "Free",
            price: "0",
            description: "Get started with a professional profile.",
            features: [
              "Create your doctor profile",
              "Get discovered by patients",
              "Receive appointment enquiries",
              "Basic profile support",
            ],
          },
          {
            name: "Growth",
            price: "1,499",
            description: "Grow your practice and manage patients better.",
            features: [
              "All Free plan features",
              "Appointment management",
              "Patient communication tools",
              "Clinic workspace",
              "Prioritised support",
            ],
          },
          {
            name: "Pro",
            price: "2,499",
            description:
              "A complete growth solution for established practices.",
            features: [
              "All Growth plan features",
              "Multiple clinic locations",
              "Advanced clinic reports",
              "Practice management tools",
              "Dedicated account support",
            ],
          },
        ].map((p, i) => (
          <article
            key={p.name}
            className={"mock-plan " + (i === 1 ? "featured" : "")}
          >
            {i === 1 && <span className="mock-popular">★ Most Popular</span>}
            <h2>{p.name}</h2>
            <p>{clinic ? "For clinic and hospital teams." : p.description}</p>
            <p className="mock-price">
              {clinic ? (
                "Contact us"
              ) : (
                <>
                  ₹{p.price}
                  <span> / month</span>
                </>
              )}
            </p>
            <ul>
              {p.features.map((f) => (
                <li key={f}>
                  <CheckCircle2 size={12} />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={
                "/partner-with-us?plan=" +
                p.name.toLowerCase() +
                "&type=" +
                (clinic ? "clinic" : "doctor")
              }
              className={"mock-button " + (i === 1 ? "" : "mock-outline")}
            >
              {i === 0 ? "List for Free" : "Discuss " + p.name}
              <ArrowRight size={13} />
            </Link>
          </article>
        ))}
      </div>
      <aside className="mock-soft mock-plan-callout">
        <h3>Looking for a Plan for Your Clinic or Hospital?</h3>
        <button
          className="mock-button mock-outline"
          onClick={() => setClinic(!clinic)}
        >
          {clinic ? "View Doctor Plans" : "View Clinic & Hospital Plans"} →
        </button>
      </aside>
      <h2>Feature Comparison</h2>
      <div className="mock-table-scroll">
        <table>
          <thead>
            <tr>
              {["Features", "Free", "Growth", "Pro"].map((t) => (
                <th key={t}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              "Doctor Profile Listing",
              "Appointment Enquiries",
              "Appointment Management",
              "Patient Management (CRM)",
              "Multiple Clinic Locations",
              "Reports & Practice Insights",
              "Priority Support",
            ].map((t, i) => (
              <tr key={t}>
                <th>{t}</th>
                <td>{i < 2 ? "✓" : "—"}</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
