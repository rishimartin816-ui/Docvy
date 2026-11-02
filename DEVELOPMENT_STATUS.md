# DOCVY website design and discovery status

**Updated:** 3 November 2026 (Asia/Kolkata)  
**Scope:** Public website design, patient-facing explanations, and on-page SEO/AEO/GEO. This is not a completion score for the full DOCVY product.

## Estimated completion

**88% estimated completion.** The estimate is based on the weighted website deliverables below, not traffic, patient activity, or search rankings.

| Deliverable | Weight | Status | Evidence / remaining work |
|---|---:|---|---|
| Accurate product and availability messaging | 20% | Complete | Pan-India patient guide; directory accurately limited to Delhi NCR; booking and review status stated. |
| Patient discovery journey and working guide search | 20% | Complete | Patient journey, concern-to-specialty examples, guide search, directory links, and empty-match explanations are implemented. This pass makes homepage examples open a prefilled guide search. |
| Visual system, icons, and illustrations | 20% | In progress (65%) | Mint/teal/pine system and patient illustration are in production; this pass adds a provider workflow illustration. A DOCVY Figma source file was not located, and mobile visual review is still needed. |
| SEO/AEO/GEO page clarity | 20% | In progress (75%) | Route titles, descriptions, internal links, sitemap, direct answers, natural-language concern searches, and city names are maintained. Search Console query validation remains open. |
| Build, production publication, and live verification | 20% | Complete for this pass | Production build passed; commits `8077445` and `6463ddd` are live in Vercel READY production deployment. Homepage, guide query, pricing, and Gurugram pages returned 200; the `joint pain` browser result showed one relevant specialty. |

## Changes in this pass

- Corrected homepage title and description so the homepage describes healthcare discovery across India rather than only a patient guide.
- Added real guide-search links for the homepage’s common concern examples. Browser review caught an overly broad “joint pain” match; search now requires all meaningful terms, ignores common question words and generic “doctor/specialist” words, and tolerates punctuation.
- Added a direct explanation of what is available today: nationwide guide, limited Delhi NCR listings, and no DOCVY booking.
- Added a custom provider-workflow SVG to the clinic and hospital plans page; it is visibly labeled “planned · not live.”
- Added “Gurgaon” as a search-oriented alias in Gurugram page metadata.
- Updated care-guide titles to use plain-language search intent without implying diagnosis.
- Audited supporting-page title tags against Next.js 14 title-template behavior and removed repeated brand suffixes; shortened city title tags without dropping city names.
- Reviewed current Google Search Central guidance. No special AI-search markup or ranking outcome is claimed.
- Production builds passed with Next.js 14.2.35, linting, type validation, and all 26 static pages generated.
- Latest live deployment for commit `1579c5f` is READY. Browser review confirmed `/care-guide?q=joint%20pain` shows one specialty match (Orthopaedics) and the question “what doctor should I see for diabetes?” returns one related specialty and explains that no matching DOCVY profile is listed.
- Live metadata checks after commit `80e4b5d` returned HTTP 200 and one DOCVY brand suffix for About, How it works, For doctors, FAQs, Contact, and Gurugram pages.
- Firecrawl live page checks returned HTTP 200 for `/`, `/care-guide?q=joint%20pain`, `/pricing`, and `/doctors/gurugram`; rendered titles and visible page updates were present.

## Outstanding work

1. Review mobile layout and keyboard interaction for homepage quick starts, care-guide search, and provider plans.
2. Locate the intended DOCVY Figma design file. The connected Figma account is available, but the repository and current project artifacts did not contain a DOCVY file/node URL; no Figma file was changed.
3. Use actual Search Console queries when access is available to prioritize future content. Do not infer keyword volume or rankings.
4. Add condition-specific guidance only after source review and qualified clinical review; avoid thin SEO pages or one-symptom/one-specialty claims.

## Guardrails

- No production database, authentication, SSO, or security-setting changes.
- No claims that listings are verified, complete, bookable, or available unless current evidence supports them.
- No fabricated rankings, traffic, search volume, analytics, or doctor credential checks.
