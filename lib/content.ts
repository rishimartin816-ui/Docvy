export const faqs = [
  ["What is DOCVY?", "DOCVY is building a healthcare discovery and operations platform for people and care teams across India. Patients can use the condition-to-specialty guide nationwide. The current doctor directory has 12 source-linked profiles grouped under Delhi, Gurugram and Noida; DOCVY plans to add cities as provider coverage grows. Provider tools are planned for clinics and hospitals. DOCVY credential review and appointment booking are not live."],
  ["Can I request an appointment through DOCVY?", "When appointment enquiries are enabled, choose a listed doctor and send DOCVY your contact details and preferred time. DOCVY can coordinate with the selected provider, but the provider must confirm availability and fees. A request is not a confirmed appointment. The form is disabled until the private Google Sheets connection is verified."],
  ["Does DOCVY email the doctor when I send an appointment request?", "Appointment requests are currently disabled, so DOCVY does not send a provider email or booking confirmation. If the form is enabled, DOCVY will share your request with an organisation contact verified for that provider only after you consent. The provider must confirm the appointment time and fee."],
  ["How can I find which type of doctor to look for?", "Use the Patient Guide to search common concerns and see the specialties commonly associated with them. It is a general directory guide, not a diagnosis or a recommendation for your specific situation. If you are unsure, speak with a general physician."],
  ["Does the Patient Guide diagnose a disease?", "No. A symptom or condition can have different causes, and the right care depends on a clinician's assessment. The guide only explains common specialty categories to help people understand how a directory may be organized."],
  ["Can I see doctors near me in Delhi NCR?", "You can browse the current source-linked profiles by Delhi, Gurugram (Gurgaon), and Noida, then filter by specialty, hospital or listed locality. Profiles with more than one source-listed NCR facility appear in each relevant city group. The list is not complete, and not every profile has a neighbourhood specified."],
  ["Will DOCVY add doctors in more Indian cities?", "Yes. DOCVY is intended to serve people across India, and doctor listings will expand city by city as source-linked provider coverage grows. The current directory covers Delhi, Gurugram and Noida; other cities will be shown when there is useful, source-backed coverage."],
  ["Are doctors on DOCVY verified?", "No. The 12 profiles currently shown link to official hospital pages and are marked as pending DOCVY review. DOCVY has not independently verified credentials or current appointment availability. Please confirm details directly with the hospital."],
  ["What happens after I send an appointment enquiry?", "When the form is enabled, DOCVY records the enquiry and can share it with the selected clinic or hospital after you consent. The provider must confirm the doctor, availability, time and fee. Until then, there is no appointment. The form is currently disabled."],
  ["Does DOCVY charge patients or take a consultation commission?", "The current website has no patient checkout or payment facility. No patient payment or consultation commission is being collected through DOCVY."],
  ["How can a clinic or hospital discuss pricing?", "Use Contact now on the clinic and hospital plans page. Pricing and product availability are discussed directly with DOCVY; no online subscription or checkout is available."],
  ["Can providers manage appointments in a dashboard?", "Provider dashboards and appointment management are planned and are not open for use yet. DOCVY will review provider and organisation access before any operational tools are enabled."],
  ["Does DOCVY provide medical advice or emergency care?", "No. DOCVY does not diagnose or treat through this website and is not an emergency service. In India, call 112 or go to the nearest emergency department for urgent medical help."],
] as const;

export const legal: Record<string, { title: string; intro: string; sections: { heading: string; body: string[] }[] }> = {
  privacy: {
    title: "Privacy Policy",
    intro: "DOCVY provides an informational specialty guide and a limited doctor directory. Appointment enquiries are disabled until the private Google Sheets connection is verified.",
    sections: [
      { heading: "Who operates DOCVY", body: ["DOCVY is operated by DSS Global Technologies Private Limited, 2nd Floor, Capital Cityscape, Sector 66, Gurugram, Haryana – 122101, India. For privacy questions, contact DOCVY at contact@docvy.in."] },
      { heading: "Information used", body: ["The current release displays limited professional profile information transcribed from official hospital sources. Website hosting and security infrastructure may process technical details such as IP address, browser/device information, request timestamps and diagnostic logs. The appointment enquiry form is currently disabled."] },
      { heading: "Appointment enquiry information", body: ["When the enquiry form is enabled, it will request your name and mobile number, optional email, selected doctor and facility, city, optional preferred date and time, and your consent. It does not ask for symptoms, diagnoses, medical records, payment data or identity documents. DOCVY uses the details to record the enquiry and coordinate with the clinic or hospital you select. The information is stored in the DOCVY APPOINTMENT LEADS Google Sheet, accessible only to DOCVY staff who need it, and may be shared with the selected provider for the stated appointment-coordination purpose after your consent. Google Apps Script and Google Sheets process the submission for DOCVY. Sending a request does not confirm an appointment."] },
      { heading: "Retention and your choices", body: ["Appointment enquiry records are reviewed by DOCVY staff and manually deleted when no longer needed for follow-up. Automatic expiry is not configured. You can ask about access, correction or deletion by emailing contact@docvy.in. Website technical logs may be retained under hosting-provider settings. Do not email health records or identity documents."] },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro: "DOCVY provides an informational guide and a limited doctor directory. The appointment enquiry form is disabled until its private data connection is verified.",
    sections: [
      { heading: "Provider information", body: ["Profiles are based on public official hospital information and are pending DOCVY review. Their appearance does not mean DOCVY has independently verified credentials or appointment availability. Directory information does not replace independent care decisions or a clinician's advice."] },
      { heading: "Appointment enquiries", body: ["If the form is enabled, you may ask DOCVY to coordinate with the selected provider using the contact details you provide. This is an enquiry only. A clinic or hospital must confirm the provider, location, time and any fee before an appointment exists. DOCVY does not collect patient payment."] },
      { heading: "No medical or emergency service", body: ["DOCVY does not provide diagnosis, treatment or medical advice through this website. It is not an emergency service. In India, call 112 for emergencies or go to the nearest emergency department."] },
      { heading: "Provider plans and payment", body: ["Provider pricing or any lead/referral arrangement must be agreed separately in writing with DOCVY before it applies. There is no provider checkout on this website. A patient pays any consultation fee directly to the provider after that provider confirms it."] },
      { heading: "Availability and contact", body: ["The patient enquiry form remains disabled until its private connection is verified; dashboards are not open. For provider and privacy enquiries, use the Contact page or email contact@docvy.in."] },
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
