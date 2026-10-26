# Docvy — Next.js 14 + TypeScript + Tailwind

## Run locally
1. Install Node.js LTS.
2. In this folder, run `npm install`.
3. Copy `.env.example` to `.env.local`; fill only credentials for services you have actually configured.
4. Run `npm run dev` and open the local URL shown in the terminal.
5. Run `npm run build` before deployment.

## Recent improvements in this revision
- Expanded draft policy content for privacy, terms, refund/cancellation and medical disclaimer.
- Added a grievance-redressal page and linked it from the footer.
- Added contact/support placeholders instead of inventing business details.
- Added lightweight Lucide illustrations to homepage cards and process steps.
- Improved typography, focus visibility, selection styling and reduced-motion handling.
- Clarified that ₹299 is proposed and payment must remain disabled until the actual service scope and refund terms are finalised.

## Critical production blockers — do not accept real customers yet
- `lib/store.ts` is in-memory and is not persistent or suitable for production. Configure a managed database, access policies and staff authentication.
- The payment webhook is only a partial scaffold. No complete Razorpay order-creation/checkout flow exists in this project. Implement and test order creation, signature verification, webhook idempotency, payment state persistence and refunds before enabling live payments.
- Doctor review, secure document generation/delivery, audit logs, access control and incident response need to be completed and tested.
- Replace every bracketed placeholder in legal/contact pages, approve final pricing and refund terms, and obtain appropriate Indian legal/healthcare compliance review.
- Test the complete request-to-payment-to-doctor-review workflow using dummy data and payment sandbox mode before public launch.

## Deployment
Push reviewed changes to the connected GitHub repository. Vercel should create a deployment automatically. Check the build logs and test the deployed site before promoting changes. Never commit `.env.local` or secrets.
