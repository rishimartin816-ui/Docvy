# DOCVY mobile design review

This branch uses commit `5735713`, the Vercel deployment serving www.docvy.in at the start of the implementation. The approved layouts activate below 768 CSS pixels. The reference width is 390 CSS pixels. The desktop JSX and data sources are retained. The routes in routes.json are existing URLs and booking steps remain states of /book.

## Missing artwork and remaining differences

| Area | Missing input or difference |
| --- | --- |
| Homepage hero | The clean full background is required at a minimum of 694 × 188 source pixels. The supplied artwork exposes a 393 × 185 foreground crop. |
| Specialist help banner | The clean full background is required at a minimum of 662 × 130 source pixels. The supplied artwork exposes a 279 × 121 foreground crop. |
| Final patient CTA | The clean full background is required at a minimum of 662 × 147 source pixels. The supplied artwork exposes a 382 × 143 foreground crop. |
| Icon and logo fidelity | The original DOCVY wordmarks and existing SVG components supply the supported visuals. The exact back-pain spine glyph and India badge artwork were missing. The rendered flag and heart use text emoji. Existing glyphs can differ in outline from the raster mockups. See the icon map. |
| Typography | The supplied related-page prototype declares Inter. The separate homepage image contains no font metadata. Its weights and spacing were measured from the image and mapped to Inter. The phone status bar belongs to the device frame. |
| Knee and heart specialty tiles | The supplied text appears to read “Orthoatrics” and “Orthoplagy.” The design retains those visible strings and leaves these tiles without a destination pending approved copy and routes. |
| Homepage Care Guide | The supplied category chips and three feature cards need confirmed destinations or filtering behavior. The section links to the existing Care Guide. |
| Appointment activity | The person, timestamp and event in the approved artwork appear only as a visibly labeled staging example. Production mobile rendering excludes that example. |
| Public listings | Verified approval, doctor details, portraits, practice locations and fees come from published data. Dynamic results can differ from the example in the prototype. |
| Booking | Real selectable providers, managed slots, consent wording, successful receipts and the private tracking path take precedence over prototype values and preview-only text. |
| Policies and forms | Existing legal clauses, consent, validation requirements and input names are retained. The supplied policies contain placeholder text and some form labels differ from the live forms. |

Image sources, dimensions, crops, and available portraits are indexed in `public/images/approved-mobile/manifest.json`. The two explicitly removed homepage sections are absent from the mobile render. Review note for the later content phase: approved homepage references to video consultations, verified information and appointment activity need operational review. Pricing and FAQ template copy need the separate content review requested by the project owner.
