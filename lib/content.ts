export const faqs = [
  ["What is DOCVY?", "DOCVY is building a healthcare discovery and operations platform for people and care teams across India. Patients can use the condition-to-specialty guide nationwide. The current doctor directory has 12 source-linked profiles grouped under Delhi, Gurugram and Noida; DOCVY plans to add cities as provider coverage grows. Provider tools are planned for clinics and hospitals. DOCVY credential review and appointment booking are not live."],
  ["Can I request an appointment through DOCVY?", "Check the request page for the current status. When the form is open, you can choose a listed doctor and submit an enquiry to DOCVY. It is saved to DOCVY's private intake and is not automatically sent to the provider. The hospital or clinic must confirm availability and fees. A request is not a confirmed appointment."],
  ["Does DOCVY email the doctor when I send an appointment request?", "No. Provider email notifications are disabled. When the enquiry form is open, your request is saved to DOCVY's private intake; it is not automatically delivered to the hospital or clinic. Contact the provider directly to confirm availability, time and fee."],
  ["How can I find which type of doctor to look for?", "Use the Patient Guide to search common concerns and see the specialties commonly associated with them. It is a general directory guide, not a diagnosis or a recommendation for your specific situation. If you are unsure, speak with a general physician."],
  ["Does the Patient Guide diagnose a disease?", "No. A symptom or condition can have different causes, and the right care depends on a clinician's assessment. The guide only explains common specialty categories to help people understand how a directory may be organized."],
  ["Can I see doctors near me in Delhi NCR?", "You can browse the current source-linked profiles by Delhi, Gurugram (Gurgaon), and Noida, then filter by specialty, hospital or listed locality. Profiles with more than one source-listed NCR facility appear in each relevant city group. The list is not complete, and not every profile has a neighbourhood specified."],
  ["Will DOCVY add doctors in more Indian cities?", "DOCVY is being built for people and care teams across India. Current source-linked doctor listings cover Delhi, Gurugram and Noida. Listings in other cities are planned as useful, source-backed provider coverage grows; no expansion date has been announced."],
  ["Are doctors on DOCVY verified?", "No. The 12 profiles currently shown link to official hospital pages and are marked as pending DOCVY review. DOCVY has not independently verified credentials or current appointment availability. Please confirm details directly with the hospital."],
  ["What happens after I send an appointment enquiry?", "When the form is open, DOCVY records your contact details and selected provider in its private intake. The request is not automatically sent to the provider and does not reserve a slot. Contact the hospital or clinic directly to confirm the doctor, availability, time and fee."],
  ["Does DOCVY charge patients or take a consultation commission?", "The current website has no patient checkout or payment facility. No patient payment or consultation commission is being collected through DOCVY."],
  ["How can a clinic or hospital discuss pricing?", "Use Contact now on the clinic and hospital plans page. Pricing and product availability are discussed directly with DOCVY; no online subscription or checkout is available."],
  ["Can providers manage appointments in a dashboard?", "Provider dashboards and appointment management are planned and are not open for use yet. DOCVY will review provider and organisation access before any operational tools are enabled."],
  ["Does DOCVY provide medical advice or emergency care?", "No. DOCVY does not diagnose or treat through this website and is not an emergency service. In India, call 112 or go to the nearest emergency department for urgent medical help."],
] as const;

export const legal: Record<string, { title: string; intro: string; sections: { heading: string; body: string[] }[] }> = {
  privacy: {
    title: "Privacy Policy",
    intro: "DOCVY provides an informational specialty guide and a limited doctor directory. Check the appointment request page to see whether its enquiry form is currently open.",
    sections: [
      { heading: "Who operates DOCVY", body: ["DOCVY is operated by DSS Global Technologies Private Limited, 2nd Floor, Capital Cityscape, Sector 66, Gurugram, Haryana – 122101, India. For privacy questions, contact DOCVY at contact@docvy.in."] },
      { heading: "Information used", body: ["The current release displays limited professional profile information transcribed from official hospital sources. Website hosting and security infrastructure may process technical details such as IP address, browser/device information, request timestamps and diagnostic logs. The request page shows whether the appointment enquiry form is open. If it is open and you submit it, the form collects only the details described below."] },
      { heading: "Appointment enquiry information", body: ["When open, the enquiry form requests your name and mobile number, optional email, selected doctor and facility, city, optional preferred date and time, and your consent. It does not ask for symptoms, diagnoses, medical records, payment data or identity documents. Submitted details are stored in the private DOCVY APPOINTMENT LEADS Google Sheet for DOCVY staff to review. Provider email notifications and automatic sharing with hospitals or clinics are not enabled; contact the provider directly to confirm an appointment. Any later sharing by DOCVY requires your consent and a provider contact confirmed for that organisation. A request does not confirm or reserve an appointment. Google Apps Script, Google Sheets and Vercel process the submission for DOCVY."] },
      { heading: "Retention and your choices", body: ["Appointment enquiry records are reviewed by DOCVY staff and manually deleted when no longer needed for follow-up. Automatic expiry is not configured. You can ask about access, correction or deletion by emailing contact@docvy.in. Website technical logs may be retained under hosting-provider settings. Do not email health records or identity documents."] },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro: "DOCVY provides an informational guide and a limited doctor directory. The request page shows whether its appointment enquiry form is currently open.",
    sections: [
      { heading: "Provider information", body: ["Profiles are based on public official hospital information and are pending DOCVY review. Their appearance does not mean DOCVY has independently verified credentials or appointment availability. Directory information does not replace independent care decisions or a clinician's advice."] },
      { heading: "Appointment enquiries", body: ["If the request page shows the form as open, you may send an enquiry to DOCVY using your contact details. The details are stored in DOCVY's private intake and are not automatically sent to the selected hospital or clinic. Provider email notifications and booking are not available. Contact the provider directly to confirm the doctor, location, time and any fee. DOCVY does not collect patient payment."] },
      { heading: "No medical or emergency service", body: ["DOCVY does not provide diagnosis, treatment or medical advice through this website. It is not an emergency service. In India, call 112 for emergencies or go to the nearest emergency department."] },
      { heading: "Provider plans and payment", body: ["Provider pricing or any lead/referral arrangement must be agreed separately in writing with DOCVY before it applies. There is no provider checkout on this website. A patient pays any consultation fee directly to the provider after that provider confirms it."] },
      { heading: "Availability and contact", body: ["Check the request page for the current enquiry-form status. Provider dashboards and appointment management are not open. For provider and privacy enquiries, use the Contact page or email contact@docvy.in."] },
    ],
  },
  refund: {
    title: "Cancellation and Refund Policy",
    intro: "The current DOCVY website has no patient fees, subscription checkout or payment facility. No purchase can be made through this site.",
    sections: [
      { heading: "Patient appointments", body: ["DOCVY does not charge patients through this website. Sending an enquiry does not reserve or confirm an appointment; the selected provider confirms any appointment fee and payment method directly."] },
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
      { heading: "No confirmed appointment service", body: ["The enquiry form, when open, records a request with DOCVY only. No slot is reserved or confirmed through DOCVY. Contact the provider directly to confirm an appointment."] },
    ],
  },
};
