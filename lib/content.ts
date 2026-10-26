export const purposes = [
  { key: "work", title: "Work leave", text: "Request medical documentation related to a health concern affecting your ability to work." },
  { key: "college", title: "College or university", text: "Find out how to request medical documentation for an absence or academic requirement." },
  { key: "other", title: "Other medical documentation", text: "Describe your legitimate documentation need so the appropriate next steps can be explained." },
];
export const steps = [
  { t: "Tell us what you need", d: "Select the purpose and share the minimum necessary information." },
  { t: "Complete the required process", d: "Where a clinical assessment is required, complete it with a registered medical practitioner." },
  { t: "Professional review", d: "The practitioner independently decides whether a certificate is clinically appropriate and what it can accurately state." },
  { t: "Receive the outcome", d: "If approved, receive the document through secure delivery. If not, we explain next steps and the applicable refund policy." },
];
export const faqs = [
  ["How does Docvy work?", "You choose a purpose, share the minimum information needed, complete any required assessment with a registered medical practitioner, and receive an outcome."],
  ["Can I request a medical certificate for sick leave?", "You can request documentation for a health concern affecting your work. Whether a certificate is issued depends on the practitioner's clinical judgement."],
  ["Can students request documentation for college absence?", "Yes, you can start a request for an absence or academic requirement. The same clinical review applies."],
  ["Will my employer or college accept the certificate?", "We cannot guarantee that. Each organisation sets its own acceptance requirements, so check with them first."],
  ["Is a certificate guaranteed after payment?", "No. A certificate is issued only if a registered medical practitioner finds it clinically justified."],
  ["Will a doctor review my case?", "Where a medical assessment is required, a registered medical practitioner reviews your case and decides independently. [Confirm exact workflow before launch.]"],
  ["What happens if my request is not approved?", "We explain the outcome and next steps, and how the refund policy applies."],
  ["How is my medical information protected?", "We collect only what is needed. [List implemented protections here once built and reviewed.]"],
  ["What is included in the ₹299 price?", "[Confirm inclusions before launch. State plainly whether a medical assessment is covered.]"],
  ["Can I cancel my request or request a refund?", "[Publish final cancellation and refund terms and show them before checkout.]"],
] as const;
export const legal: Record<string, { title: string; body: string[] }> = {
  privacy: { title: "Privacy policy", body: [
    "DRAFT for legal review. This is not final legal text.",
    "What we collect: your name, email and mobile number, the purpose of your request, and payment status. Payment card or UPI details are handled by Razorpay and are not stored by Docvy.",
    "Why: to process your request, take payment, route it to a registered medical practitioner and contact you about its status.",
    "Who can see it: authorised Docvy staff and the practitioner reviewing your request. We do not send names, contact details or medical details to automation tools.",
    "Retention, deletion, your rights and how to complain: [to be completed with counsel]." ] },
  terms: { title: "Terms of service", body: [
    "DRAFT for legal review.",
    "Docvy helps you request medical documentation. It is not an emergency service and not a general consultation marketplace.",
    "A certificate is never guaranteed. A registered medical practitioner decides independently whether one is clinically appropriate.",
    "Employers, colleges and authorities set their own acceptance rules. Docvy cannot promise that any organisation will accept a certificate.",
    "The price of \u20b9299 is proposed and the inclusions are to be confirmed: [to be completed]." ] },
  refund: { title: "Cancellation and refund policy", body: [
    "DRAFT. Final terms have not been decided.",
    "When a refund applies, including if no certificate is issued, how long it takes and how to ask: [to be completed]." ] },
  disclaimer: { title: "Medical disclaimer", body: [
    "Docvy is not an emergency service. For urgent symptoms, call 112 or go to the nearest emergency department.",
    "Clinical decisions rest with registered medical practitioners. Docvy does not guarantee any certificate or its acceptance." ] },
  grievance: { title: "Grievance redressal", body: [
    "DRAFT. Name and contact of the grievance officer, response timelines and escalation path: [to be added. Do not invent details].",
    "Legal entity name and registered address: [to be added]." ] },
};
