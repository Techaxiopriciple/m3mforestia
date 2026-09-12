# M3M Forestia West — Landing Page Design Spec

## Purpose
A single, highly-designed scrolling landing page for M3M Forestia West (3BHK
forest-themed residences, Gurgaon International City). Marketing/lead-gen
page only — no CMS, no backend, no auth.

## Stack
Vite + React 18 + TypeScript + Tailwind CSS + GSAP (ScrollTrigger) + Lucide
icons. Static build, deployable to any static host. No backend: the enquiry
form opens a prefilled WhatsApp chat / `tel:` / `mailto:` link using the real
numbers from the brochure.

## Content source of truth
Extracted from `M3M Forestia West - E Brochure.pdf` and
`M3M_Forestia_Question_Master_Table FINAL.docx` (both in the repo root's
parent folder). Key facts:
- 3 BHK forest-themed residences, 1,905 / 1,910 / 2,440 / 2,455 sq.ft.
- ₹2.5 Cr onwards (ref. ₹13,500/psf), 10:90 & 20:80 payment plans
- Part of Gurgaon International City (GIC), Sector M-9/10/11, Gurugram
- At the junction of 4 expressways (Dwarka, NH8, KMP, Rewari-Gurgaon), 20 min
  IGI airport, 2 min from Global City, adjacent Sultanpur bird sanctuary & Aravallis
- Central Grove (Skywalk, Whispering Falls, Forest Trail), Club Eden amenities,
  200+ tree species, 180+ bird species, landscape by an award-winning
  international architect, 7-tier security + smart home
- RERA: RC/REP/HARERA/GGM/1030/762/2026/02 (02.01.2026) and
  RC/REP/HARERA/GGM/991/723/2025/94 (16.10.2025)
- Contacts: +91 97110 05826, 1800 123 3333, feedback@M3Mindia.com
- **Possession date is explicitly marked "don't write this anywhere" in the
  source doc — must never appear on the site.**

## Images
20 real assets cropped from the brochure's rendered pages (via poppler +
sharp) into `public/images/` — actual project renders/photography, not stock
imagery. No Google Maps embed (no API key provided) — location section uses
a simplified illustrative diagram instead.

## Visual direction
Deep forest + gold: charcoal/deep-green backgrounds, warm gold accents,
cream serif display type for headlines + clean sans body type — matching the
brochure's own brand system (confirmed against the extracted pages).

## Structure (single scroller)
1. Preloader + Hero — crossfade/gsap reveal, sticky nav, floating call/WhatsApp buttons
2. Brand story — pinned parallax section
3. GIC ecosystem — Habitats/Innovation/Workspaces/Experiences 4-card grid
4. Location & connectivity — animated stat counters + simplified location diagram
5. Residences — 3BHK config cards, GSAP-driven slider through real renders
6. Central Grove — pinned storytelling (Skywalk / Whispering Falls / Forest Trail)
7. Club Eden amenities — categorized icon grid (Lucide icons), tabbed filter
8. Biodiversity strip — animated marquee (200+ trees / 180+ birds)
9. Gallery — grid/lightbox of real renders
10. Enquiry — form → prefilled WhatsApp deep link, no backend
11. Footer — RERA numbers, verbatim disclaimer, addresses, CIN

## Out of scope (flagged, not built)
Backend/CRM integration, real Google Maps embed, multi-page routing, CMS,
i18n.

## Process note
Single-session, single-repo build; implementation proceeds directly after
this spec rather than a separate plan-writing/execution handoff.
