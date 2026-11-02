export const faqs = [
  ["Can I make an appointment through DOCVY today?", "No. Patient search and appointment requests are currently paused while provider verification and secure provider access are prepared."],
  ["Are providers already listed?", "No fictional providers are shown. The directory will publish providers only after verification and review."],
  ["Does DOCVY charge patients or take a consultation commission?", "No patient payment or consultation commission is part of the current product plan. The website has no patient checkout."],
  ["How can a clinic or hospital discuss pricing?", "Use the Contact now link on the provider plans page. Prices are for discussion; confirm the current features, taxes and terms with DOCVY."],
  ["Can providers manage appointments in the dashboard?", "Provider access requires a verified organisation account. Staff provisioning and the tenant-protected appointment queue are still being prepared."],
  ["Does DOCVY provide medical advice or emergency care?", "No. DOCVY does not diagnose or treat through this website and is not an emergency service. In India, call 112 or go to the nearest emergency department for urgent medical help."],
] as const;

export const legal: Record<string, { title: string; intro: string; sections: { heading: string; body: string[] }[] }> = {
  privacy: {
    title: "Privacy Policy",
    intro: "Patient search and appointment requests are currently paused. DOCVY will not accept appointment details until the verified directory, provider handling workflow and privacy review are ready.",
    sections: [
      { heading: "Who operates DOCVY", body: ["DOCVY is operated by DSS Global Technologies Private Limited, 2nd Floor, Capital Cityscape, Sector 66, Gurugram, Haryana – 122101, India. For privacy questions, contact DOCVY at contact@docvy.in."] },
      { heading: "Information used", body: ["The current release does not accept appointment requests or display real provider listings. Website hosting and security infrastructure may process limited technical information such as IP address, browser/device information, request timestamps and diagnostic logs."] },
      { heading: "Future appointment requests", body: ["Before appointment intake is enabled, DOCVY will update this policy with the exact data collected, purposes and recipients, retention periods, rights and contact route. The planned form may ask for a patient's name and mobile number, with optional email and a brief visit reason. Do not submit those details while requests are paused."] },
      { heading: "Retention and your choices", body: ["Technical logs may be retained under hosting-provider settings and policies. For privacy enquiries, email contact@docvy.in. Do not send health records or identity documents by email."] },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro: "DOCVY's patient search and appointment requests are currently paused while provider verification and secure provider access are prepared.",
    sections: [
      { heading: "Provider information", body: ["DOCVY intends to publish provider profiles only after verification and publication review. Directory information does not replace independent care decisions or direct confirmation with a provider."] },
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
      { heading: "Provider information", body: ["The patient directory is currently paused. When listings become available, verify a provider's suitability and appointment directly with that provider. Directory information is not medical advice."] },
      { heading: "No medical advice or emergency service", body: ["DOCVY does not diagnose or treat through this site. For urgent medical help in India, call 112 or go to the nearest emergency department."] },
      { heading: "No appointment service currently", body: ["Appointment requests are paused. No appointment is reserved or confirmed through DOCVY at this time."] },
    ],
  },
};
