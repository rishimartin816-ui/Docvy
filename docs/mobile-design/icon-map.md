# Approved mobile design — icon and type inventory

Inventory baseline is the public-site deployment commit `57357137ca04466dd03b609bd42368a31c3ffcd2`. The supplied prototype README identifies its hand-drawn line icons, cropped logo and doctor initials as design placeholders. The mappings below identify reusable repository assets by purpose. A matching purpose alone does not establish identical vector geometry.

## Brand and profile assets

| Placement | Existing implementation |
| --- | --- |
| Header wordmark | `components/BrandLogo.tsx` uses `public/brand/01_DOCVY_Primary_Transparent.png`. The repository also contains `public/brand/01_primary_wordmark_dark.svg`. |
| Footer wordmark | `BrandLogo darkBackground` uses `public/brand/03_DOCVY_White_TealAccent_Transparent.png`. The existing dark-background vector is `public/brand/02_white_wordmark_dark_background.svg`. |
| Doctor profile portrait | `components/DoctorPortrait.tsx`, `lib/profile-photos.ts` and `public/uploads/` contain the approved portrait handling. Initials in the supplied prototype represent portrait positions. |
| Onboarded doctor badge | `components/DoctorVerifiedBadge.tsx` uses `public/brand/docvy-network-verified.jpg`. The artwork reads “DOCVY Network — Officially Onboarded Doctor”. The reference's small “✓ DOCVY Verified” text pill is a different visual and claim. Its display must follow the site's actual profile status. |

## Homepage icons

Named UI glyphs below are exports of the site's installed `lucide-react` package. `SpecialtyIcon` refers to the unmodified SVG drawings in `components/SpecialtyIcon.tsx`.

| Reference placement | Existing glyph or gap |
| --- | --- |
| Search, area picker, menu, dropdown | `Search`, `MapPin`, `Menu`, `ChevronDown`. Mobile menu also uses `X` when opened. |
| In-clinic, Video Consultation | `Hospital`, `Video` |
| Live activity time | `Clock3` |
| Discovery cards, View all, Explore, and CTA arrows | `ArrowRight` |
| General Physician, Dermatology, Gynaecology, Paediatrics | `SpecialtyIcon` slugs `general-medicine`, `dermatology`, `gynaecology`, `paediatrics` |
| Knee and heart tiles, top row positions 5 and 6 | Existing visual roles are `orthopaedics` and `cardiology`. The bitmap labels differ from the repository's specialty names. Approved labels and link targets require confirmation. |
| ENT, Urology, Gastroenterology, Neurology, Pulmonology | `SpecialtyIcon` slugs `ent`, `urology`, `gastroenterology`, `neurology`, `pulmonology` |
| More | Three horizontal dots. The installed Lucide library includes `Ellipsis`; the baseline UI has no existing application-specific three-dot asset. |
| Fever & Cold | The installed Lucide library includes `Thermometer`; no matching standalone reference-specific thermometer-with-small-mark drawing was found. |
| Skin & Hair, Women's Health, Child Health | `SpecialtyIcon` slugs `dermatology`, `gynaecology`, `paediatrics` |
| Back Pain | No dedicated matching spine drawing in `SpecialtyIcon` or the application's imported Lucide glyphs. The existing `Bone` glyph represents joint pain and has different geometry. |
| Kidney Stones, Heart Health, Eye Care | Kidney outline in `SpecialtyIcon` via `urology`, heartbeat via `cardiology` or existing `HeartPulse`, eye via `ophthalmology`. `HealthTopicIcon("kidney-stones")` uses `CircleDot` and is visually different from the homepage kidney pair. |
| Search for care, Compare doctors, Request an appointment, Track your visit | `Search`, `Users`, `CalendarDays`, `ClipboardCheck` |
| Why Choose DOCVY? checklist | Existing `Check` in circular background, or `CheckCircle2` |
| Made in India badge | No dedicated approved Indian-flag-with-heart artwork found in baseline brand assets. |
| OS status bar | Time, network, Wi-Fi and battery are device chrome in the master image. |

## Related screens

The prototype page bodies use eleven distinct inline drawing geometries. Header controls and native disclosures also appear throughout. The following are the corresponding baseline application glyphs. Native date, time, checkbox and select indicators belong to the input controls.

| Reference drawing or role | Existing component or glyph | Pages using this role |
| --- | --- | --- |
| Magnifier | `Search` | Discovery, directory, care guides, FAQs, profile forms, header |
| Action arrow | `ArrowRight` | Linked cards, continue and submit actions |
| Calendar | `CalendarDays` | Doctor card experience, appointment assistance, contact, planning |
| Pin | `MapPin` | Location selector, practices and doctor profiles |
| Person | `UserRound` | Profile, related specialty, booking practitioner and provider links |
| Shield with check | `ShieldCheck` | Registration, notices, provider workflow and grievance |
| Clinic/hospital | `Hospital` | Hospital list, institution links and contact |
| Heart | `Heart` | Specialty and article links |
| Open book | `BookOpen` | Guides, procedure links and policy layouts |
| Check mark | `Check` | Plan items, status rows and successful request receipt |
| Envelope | `Mail` | Booking assistance |
| Header/menu/disclosure | `Menu`, `ChevronDown`, `X` or existing native disclosure indicator | Shared header, footer and accordion groups |
| Directory specialty art | Existing `SpecialtyIcon` drawings; `mental-health` is the available brain drawing for psychiatry. `SpecialtyIcon` falls back to a stethoscope for unknown slugs. | Directory, specialty detail and related links |

## Typography and unresolved source details

The prototype declares Inter, Arial, sans-serif. Its root text is 16px with 1.5 line height and −0.015em tracking. H1 is 30px, weight 550, line height 1.13 and −0.045em tracking. H2 is 23px, weight 550, line height 1.25 and −0.035em tracking. H3 is 17px, weight 600, line height 1.35 and −0.025em tracking. The prototype also defines local overrides for profile titles, cards, forms and buttons.

The existing app loads variable Inter through `next/font/google` as `--font-body`. The checked-in Google Sans Flex file is the existing heading font. The prototype identifies Inter as its approved OpenAI Sans substitute. The separate homepage PNG has no embedded font specification in the supplied HTML.

The homepage's top-row knee and heart tiles have ambiguous specialty labels. The activity strip names a person and reports a recent booking. The India badge and specialty grid have baked-in decorative artwork without separate masters. These inventory entries do not verify the copy, patient activity, or exact vector originals.
