"use client";
import { useState, type FormEvent } from "react";
export default function MockupContactForm() {
  const [message, setMessage] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = [
      "Name: " + d.get("name"),
      "Mobile: " + d.get("phone"),
      "Email: " + d.get("email"),
      "",
      "" + d.get("message"),
    ].join("\n");
    window.location.href =
      "mailto:contact@docvy.in?subject=" +
      encodeURIComponent("DOCVY enquiry — " + d.get("type")) +
      "&body=" +
      encodeURIComponent(body);
    setMessage(
      "Your email app should open. Send the message there to contact DOCVY. This form has not sent or saved your message.",
    );
  }
  return (
    <form className="mock-contact-form" onSubmit={submit}>
      <div className="mock-two">
        <label>
          <span className="sr-only">Your name</span>
          <input
            name="name"
            placeholder="Your Name"
            required
            maxLength={100}
            autoComplete="name"
          />
        </label>
        <label>
          <span className="sr-only">Mobile number</span>
          <input
            name="phone"
            type="tel"
            placeholder="Mobile Number"
            maxLength={20}
            autoComplete="tel"
          />
        </label>
      </div>
      <label>
        <span className="sr-only">Email address</span>
        <input
          name="email"
          type="email"
          required
          placeholder="Email Address"
          autoComplete="email"
        />
      </label>
      <label>
        <span className="sr-only">Query type</span>
        <select name="type" required>
          <option value="">Select Query Type</option>
          {[
            "Appointments",
            "Doctor profile",
            "Clinic listing",
            "Account support",
            "Other",
          ].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only">Your message</span>
        <textarea
          name="message"
          placeholder="Your Message — do not include medical records or sensitive patient details."
          required
          rows={4}
          maxLength={2000}
        />
      </label>
      <button className="mock-button">Open Email to Send Message →</button>
      <p>
        Messages are sent using your email app. For listing help, you can also
        contact us on WhatsApp.
      </p>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
