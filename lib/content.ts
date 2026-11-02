export const faqs = [
  ["What is DOCVY?", "DOCVY is building a healthcare discovery and operations platform for people and care teams across India. Patients can use the condition-to-specialty guide nationwide. The current doctor directory has 12 source-linked profiles grouped under Delhi, Gurugram and Noida; DOCVY plans to add cities as provider coverage grows. Provider tools are planned for clinics and hospitals. DOCVY credential review and appointment booking are not live."],
  ["Can I book a doctor through DOCVY today?", "No. You can open a linked hospital profile to check details with that hospital, but DOCVY has not checked appointment slots and does not accept or confirm appointment requests yet."],
  ["How can I find which type of doctor to look for?", "Use the Patient Guide to search common concerns and see the specialties commonly associated with them. It is a general directory guide, not a diagnosis or a recommendation for your specific situation. If you are unsure, speak with a general physician."],
  ["Does the Patient Guide diagnose a disease?", "No. A symptom or condition can have different causes, and the right care depends on a clinician's assessment. The guide only explains common specialty categories to help people understand how a directory may be organized."],
  ["Can I see doctors near me in Delhi NCR?", "You can browse the current source-linked profiles by Delhi, Gurugram (Gurgaon), and Noida, then filter by specialty, hospital or listed locality. Profiles with more than one source-listed NCR facility appear in each relevant city group. The list is not complete, and not every profile has a neighbourhood specified."],
  ["Will DOCVY add doctors in more Indian cities?", "Yes. DOCVY is intended to serve people across India, and doctor listings will expand city by city as source-linked provider coverage grows. The current directory covers Delhi, Gurugram and Noida; other cities will be shown when there is useful, source-backed coverage."],
  ["Are doctors on DOCVY verified?", "No. The 12 profiles currently shown link to official hospital pages and are marked as pending DOCVY review. DOCVY has not independently verified credentials or current appointment availability. Please confirm details directly with the hospital."],
  ["What happens after a future appointment request?", "The planned journey is: select a provider and facility, choose or request a time, then wait for that clinic or hospital to review and confirm directly. A request would not itself mean an appointment is confirmed."],
  ["Does DOCVY charge patients or take a consultation commission?", "The current website has no patient checkout or payment facility. No patient payment or consultation commission is being collected through DOCVY."],
  ["How can a clinic or hospital discuss pricing?", "Use Contact now on the clinic and hospital plans page. Pricing and product availability are discussed directly with DOCVY; no online subscription or checkout is available."],
  ["Can providers manage appointments in a dashboard?", "Provider dashboards and appointment management are planned and are not open for use yet. DOCVY will review provider and organisation access before any operational tools are enabled."],
  ["Does DOCVY provide medical advice or emergency care?", "No. DOCVY does not diagnose or treat through this website and is not an emergency service. In India, call 112 or go to the nearest emergency department for urgent medical help."],
] as const;

export const legal: Record<string, { title: string; intro: string; sections: { heading: string; body: string[] }[] }> = {
  privacy: {
    title: "Privacy Policy",
    intro: "The public site provides an informational specialty guide and source-linked doctor profiles. Appointment requests are not accepted through DOCVY at this time.",
    sections: [
      { heading: "Who operates DOCVY", body: ["DOCVY is operated by DSS Global Technologies Private Limited, 2nd Floor, Capital Cityscape, Sector 66, Gurugram, Haryana – 122101, India. For privacy questions, contact DOCVY at contact@docvy.in."] },
      { heading: "Information used", body: ["The current release does not accept appointment requests. It displays limited professional profile information sourced from linked hospital pages, including provider name, specialty and listed care locations. Links identify the source; DOCVY review status is shown on the directory. Website hosting and security infrastructure may process limited technical information such as IP address, browser/device information, request timestamps and diagnostic logs."] },
      { heading: "Future appointment requests", body: ["Before appointment intake is enabled, DOCVY will update this policy with the exact data collected, purposes and recipients, retention periods, rights and contact route. The planned form may ask for a patient's name and mobile number, with optional email and a brief visit reason. Do not submit those details while requests are paused."] },
      { heading: "Retention and your choices", body: ["Technical logs may be retained under hosting-provider settings and policies. For privacy enquiries, email contact@docvy.in. Do not send health records or identity documents by email."] },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro: "DOCVY provides an informational guide and a limited source-linked doctor directory. Appointment requests and provider dashboards are not currently open.",
    sections: [
      { heading: "Provider information", body: ["Some profiles link to official hospital pages and are marked as pending DOCVY review. Their appearance does not mean DOCVY has independently verified credentials or appointment availability. Confirm current details directly with the hospital. Directory information does not replace independent care decisions or a clinician's advice."] },
      { heading: "No medical or emergency service", body: ["DOCVY does not provide diagnosis, treatment or medical advice through this website. It is not an emergency service. In India, call 112 for emergencies or go to the nearest emergency department."] },
      { heading: "Provider plans and payment", body: ["The provider plans page describes planned product areas. Pricing is discussed directly with DOCVY; no fixed subscription price is published. There is no checkout or payment facility on this website."] },
      { heading: "Availability and contact", body: ["Patient appointments and provider dashboards are not currently open. For provider and privacy enquiries, use the Contact page or email contact@docvy.in."] },
    ],
  },
  refund: {
    title: "Cancellation and Refund Policy",
    intro: "The current DOCVY website has no patient fees, subscription checkout or payment facility. No purchase can be made through this site.",
    sections: [
      { heading: "Patient appointments", body: ["Appointment requests are paused. DOCVY does not charge patients through this website."] },
      { heading: "Provider plans", body: ["Provider plan prices are for discussion only. Contact DOCVY to confirm commercial terms before any subscription is offered. No online payment is accepted here."] },
      { heading: "Questions", body: ["For questions about a future provider agreement, contact contact@docvy.in. Do not send payment credentials, identity documents or health records through informal channels."] },
    ],
  },
  disclaimer: {
    title: "Healthcare Disclaimer",
    intro: "DOCVY is not a healthcare provider and does not diagnose or treat through this website.",
    sections: [
      { heading: "Provider information", body: ["The directory contains a limited set of profiles linked to hospital sources. DOCVY review is pending for these profiles, and current appointment availability has not been checked. Verify a provider's details and appointment directly with the hospital. Directory information is not medical advice."] },
      { heading: "No medical advice or emergency service", body: ["DOCVY does not diagnose or treat through this site. For urgent medical help in India, call 112 or go to the nearest emergency department."] },
      { heading: "No appointment service currently", body: ["Appointment requests are paused. No appointment is reserved or confirmed through DOCVY at this time."] },
    ],
  },
};
