export const faqs = [
  ["What is DOCVY?", "DOCVY helps you explore specialties, prepare for visits and find real doctor profiles sourced from hospital websites. Send appointment requests through DOCVY. The provider confirms availability."],
  ["Can I request an appointment through DOCVY?", "Check the request page for the current status. When the form is open, you can choose a listed doctor and submit an enquiry to DOCVY. DOCVY records it privately and may share it with authorized staff at the selected clinic or hospital for follow-up. The hospital or clinic must confirm availability and fees. A request is not a confirmed appointment."],
  ["Does DOCVY email the doctor when I send an appointment request?", "Provider email notifications are currently disabled. Requests enter DOCVY’s private coordination queue. The selected provider must accept a request before an appointment is confirmed."],
  ["How can I find which type of doctor to look for?", "Use the Patient Guide to search common concerns and see the specialties commonly associated with them. It is a general directory guide, not a diagnosis or a recommendation for your specific situation. If you are unsure, speak with a general physician."],
  ["Does the Patient Guide diagnose a disease?", "No. A symptom or condition can have different causes, and the right care depends on a clinician's assessment. The guide only explains common specialty categories to help people understand how a directory may be organized."],
  ["Can I see doctors near me in Delhi NCR?", "Explore real doctor profiles and practice locations across Delhi, Noida, Gurgaon, Ghaziabad and Faridabad. Search by doctor, specialty or hospital, then send your request through DOCVY."],
  ["Will DOCVY add doctors in more Indian cities?", "Doctor profiles are currently available in Delhi, Noida, Gurgaon, Ghaziabad and Faridabad. Other city pages will show doctors as reliable profile information is added."],
  ["Are doctors on DOCVY verified?", "Hospital sources are linked on each real profile. A DOCVY Verified badge appears only after manual registration checks. A public profile does not establish a hospital partnership."],
  ["What happens after I send an appointment enquiry?", "DOCVY saves your contact details, selected doctor and preferences privately and returns a reference number. Your request waits for coordination. The provider must confirm the date, time and fee before you travel."],
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
      { heading: "Appointment enquiry information", body: ["When open, the enquiry form requests your name and mobile number, optional email, selected doctor and facility, city, optional preferred date and time, and your consent. We also store your consent time, a request identifier to prevent duplicate submissions, and a network-derived fingerprint to limit abuse. It does not ask for symptoms, diagnoses, medical records, payment data or identity documents. DOCVY stores submitted details in its private intake system. With your consent, authorized staff at the selected clinic or hospital may access the enquiry for appointment follow-up. The provider confirms the appointment. Vercel hosts the form, and Supabase or Google Apps Script and Google Sheets process and store enquiries for DOCVY, depending on which intake system is enabled."] },
      { heading: "Directory notifications", body: ["When the notification form is enabled, DOCVY collects the email address or mobile number you submit, the city and specialty you select, and the time you agreed to receive updates. We use this information to provide those updates. To stop notifications or request deletion, email contact@docvy.in."] },
      { heading: "Retention and your choices", body: ["Appointment enquiry records are reviewed by DOCVY staff and manually deleted when no longer needed for follow-up. Automatic expiry is not configured. To ask for access, correction, or deletion, or to withdraw consent, email contact@docvy.in with your reference if you have one. We may verify your identity before acting and may retain records where the law requires it. Website technical logs may be retained under hosting-provider settings. Do not email health records or identity documents."] },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro: "DOCVY provides an informational guide and a limited doctor directory. The request page shows whether its appointment enquiry form is currently open.",
    sections: [
      { heading: "Provider information", body: ["Profiles are based on public official hospital information and are pending DOCVY review. Their appearance does not mean DOCVY has independently verified credentials or appointment availability. Directory information does not replace independent care decisions or a clinician's advice."] },
      { heading: "Appointment enquiries", body: ["If the request page shows the form as open, you may send an enquiry to DOCVY using your contact details. DOCVY records your details privately and may make them available to authorized staff at the selected clinic or hospital for follow-up. An enquiry does not reserve a slot. Provider email notifications are disabled. Contact the provider directly to confirm the doctor, location, time and any fee. DOCVY does not collect patient payment."] },
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
