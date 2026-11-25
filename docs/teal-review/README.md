# DOCVY homepage review

Preview code revision `df91e21`. Only the homepage has been implemented and reviewed for this phase. Inner pages remain on the existing implementation pending design approval.

| Viewport | Browser capture | Reference left, implementation right | 45% reference overlay |
| --- | --- | --- | --- |
| 390 × 844 | [Viewport](390x844.png) · [Full page](390x844-full.jpg) | [Compare](390x844-side.jpg) | [Overlay](390x844-overlay.jpg) |
| 430 × 932 | [Viewport](430x932.png) · [Full page](430x932-full.jpg) | [Compare](430x932-side.jpg) | [Overlay](430x932-overlay.jpg) |
| 768 × 1024 | [Viewport](768x1024.png) · [Full page](768x1024-full.jpg) | [Compare](768x1024-side.jpg) | [Overlay](768x1024-overlay.jpg) |
| 1440 × 900 | [Viewport](1440x900.png) · [Full page](1440x900-full.jpg) | [Compare](1440x900-side.jpg) | [Overlay](1440x900-overlay.jpg) |
| 1920 × 1080 | [Viewport](1920x1080.png) · [Full page](1920x1080-full.jpg) | [Compare](1920x1080-side.jpg) | [Overlay](1920x1080-overlay.jpg) |

The [supplied reference](reference.png) is a presentation board. The comparisons isolate its phone or desktop screen, scale the screen to the browser capture width and align their top edges. For tablet the desktop panel is used because the handoff has no separate tablet target. Relative section heights, visual density and subject placement are meaningful comparison points. The overlays are illustrative rather than a pixel-fidelity score.

## Corrections after the first browser pass

- Constrained grid tracks after a 390px capture exposed page overflow and clipped the specialty section's right edge.
- Adjusted the mobile headline width and size to keep “doctors near you” together at the tested phone sizes.
- Increased desktop portrait height and specialty icon size. The mobile footer starts collapsed and expands on tap.
- The revised staging build passed the viewport overflow and loaded-image checks at all five dimensions.

## Differences from the board

- The header uses the supplied official DOCVY wordmark. The board depicts a different lockup.
- The hero uses the supplied consultation scene. The exact solo-doctor photograph is missing. The chosen image includes a patient and has a different focal point.
- Portraits, names, city, fees and experience follow the directory records. The available overview has three featured profiles. No rating stars or fabricated totals are displayed.
- Guide cards link to available published guides. Actual guide subjects and photos differ from the board. The appointment CTA links to the working directory and tracker. Store badges and a source phone montage were unavailable.
- At wider desktop sizes the content is capped for readability. On mobile the card rows scroll horizontally. The exact source fonts and separate tablet artwork are unavailable.

## Verification

- Optimized Next.js build completed, including TypeScript checking and generation of 2,453 static entries. Standalone TypeScript and changed-file ESLint passed.
- Repository-wide ESLint reported 89 errors in eight unchanged CommonJS scripts.
- [Hosted browser tests](results.json) recorded HTTP 200, one homepage headline, the production canonical, zero horizontal page overflow and zero broken displayed images at all five sizes. Axe reported zero WCAG A/AA violations in its automated scans at 390px and 1440px. These scans do not represent a complete accessibility audit.
- [Fresh mobile browser check](hosted.json) verified the shared URL, navigation, footer, a verified doctor profile and its preselected appointment request page. Directory search for cardiology, specialty details, a care guide, appointment request entry and appointment tracking loaded. No appointment or clinic confirmation was submitted. The branch reuses the existing design-preview middleware to block mutations on the preview deployment.

