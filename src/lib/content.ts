// Single source of truth for brochure facts used across sections.
// Do NOT add a possession date/year anywhere — explicitly withheld per source doc.

export const CONTACT = {
  phone: "+919711005826",
  phoneDisplay: "+91 97110 05826",
  tollFree: "1800 123 3333",
  email: "feedback@M3Mindia.com",
  whatsappNumber: "919711005826",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const RERA = [
  "RC/REP/HARERA/GGM/1030/762/2026/02 | Dated: 02.01.2026",
  "RC/REP/HARERA/GGM/991/723/2025/94 | Dated: 16.10.2025",
];

export const DISCLAIMER = `DISCLAIMER: The contents, information, images, visuals or sketches, computer generated images including landscaping on the website are merely representative images or artistic renderings for general informational purposes only, unless specifically claimed to be actual photograph. The maps/floor plans/layouts are not drawn to any particular scale, and are subject to change without notice. The materials, designs, square footages, fixtures and amenities depicted by artist's or computer rendering are only for illustration and not necessarily be part of the offer.

Nothing contained on the website intends to constitute a legal offer and does not form part of any legally binding agreement and/or commitment of any nature, nor does any information provided on the website constitute advertising, marketing, booking, selling or an offer for sale or invitation to purchase, in any manner. This Website is for guidance only. The information provided may be changed without any notice. The Website and all its contents are provided on "as is" and "as available" basis and is intended for informational purposes only.

'M3M Forestia West I' is a distinct component of the Industrial Plotted Colony and not an Affordable Group Housing Project under the Affordable Housing Policy, 2013, is being developed by M/s M3M India Infrastructure Private Limited ("Promoter") as an integral part/constituent/block of the larger project namely Gurgaon International City, and is being developed as Phase 10A & 10 B on land admeasuring 2.92433939 Hectares (7.2262 Acres) as part of the land earmarked as AGH-1 Pocket-A (16.47378 Acres) out of the total licenced area admeasuring 56.57252 Hectares (139.79375 Acres) situated in the revenue estate village of Bas Haria & Jund Sarai Abad,, Sector-M9, M10 & M11, Manesar, Gurugram, Haryana ("Project"). The Project is governed by Enterprises Promotion Policy-2015 (EPP-15), wherein Clause 1.6(iii) entitles the Promoter/Licensee, having paid the applicable licence fee and being liable to pay EDC and IDC, to sell units otherwise than at the pre-determined rates prescribed under EPP-15. Therefore, prices and terms of the sale of the units in the Project shall be governed by the Agreement for Sale and applicable laws. The Project is duly registered with Haryana Real Estate Regulatory Authority vide Regn. No. RC/REP/HARERA/GGM/1030/762/2026/02 dated 02.01.2026. All details of the said registered project are available on www.haryanarera.gov.in and may be verified before by the viewer/recipients at their own independent discretion.

The contents, and any information or opinion on the Project(s), if any, may not be reproduced, transmitted (by any means), modified, sold, circulated, shared or otherwise provided, in whole or in part, to any other person or entity, nor can it be store, archive or in any other way put to use or used for any public or commercial purpose without the Promoter's explicit consent. Promoter reserves its right to revoke any such consent, without prior notice. Any unauthorized review, use, disclosure, dissemination, forwarding, printing or copying of any part, information of the Website or any action taken upon reliance on such information is strictly prohibited and may be unlawful and the Promoter reserves its rights both in law and equity to take appropriate action in this regard.

Your use of the Website is solely at your own risk. By using or accessing this Website and/or the hyperlinks embedded/ mentioned in the Website you agree to abide by the terms and conditions, as set forth herein and as contained in the Website without any qualification or limitation. The Promoter/ Company shall not be responsible for use of any third party website, which is being managed by Third Party. Such links are being provided only for your convenience and Company owes no responsibility for the same.

**Taxes and statutory charges are extra as per applicable norms. 1 Hect. = 2.471Acres, 1 Acre = 4840 sq. yds. or 4046.86 sq. mtrs., 1 sq. mtr. = 10.764 sq.ft.

The use of word 'M3M' shall in no manner be construed or interpreted as M3M India Pvt. Ltd. being the Promoter and / or Developer of the Projects. Dispute with regard to the interpretation of information or arising from use or reliance of this website will be subject to the exclusive jurisdiction of District Courts at Gurugram, Haryana and Hon'ble High Court of Punjab and Haryana High Court, Chandigarh India. All disputes shall be governed by prevailing laws in India.`;

export const RESIDENCE_SIZES = [
  { label: "3 BHK", size: "1,905 sq.ft." },
  { label: "3 BHK", size: "1,910 sq.ft." },
  { label: "3 BHK + Study", size: "2,440 sq.ft." },
  { label: "3 BHK + Study", size: "2,455 sq.ft." },
];

// `image` is left blank until real floor plan diagrams (from the official
// brochure) are available — the section renders a labelled placeholder
// instead of a fabricated or third-party layout.
export const FLOOR_PLANS = [
  { type: "Type A", label: "3 BHK", size: "1,905 sq.ft.", image: "/images/floorplans/type-a-1905sqft.webp" },
  { type: "Type B", label: "3 BHK", size: "1,910 sq.ft.", image: "/images/floorplans/type-b-1910sqft.webp" },
  { type: "Type C", label: "3 BHK + Study", size: "2,440 sq.ft.", image: "/images/floorplans/type-c-2440sqft.webp" },
  { type: "Type D", label: "3 BHK + Study", size: "2,455 sq.ft.", image: "/images/floorplans/type-d-2455sqft.webp" },
];

export const PRICE = {
  starting: "₹2.5 Cr onwards",
  reference: "Ref. unit: 1,905 sq.ft. @ ₹13,500/PSF",
  plans: ["10:90 Payment Plan", "20:80 Payment Plan"],
};

export const STATS = [
  { value: "4", label: "Expressways at the doorstep" },
  { value: "20", suffix: " min", label: "To IGI Airport" },
  { value: "2", suffix: " min", label: "To Global City" },
  { value: "60", suffix: "%", label: "Less travel time to major hubs" },
];

export const ECOSYSTEM = [
  {
    title: "140* Acres\nTownship",
    body: "Gurgaon's Largest Integrated\nTownship Development.",
  },
  {
    title: "Integrated\nLiving",
    body: "Live, work, play, and shop\nAll thoughtfully connected in one vibrant ecosystem.",
  },
  {
    title: "Next to\nGlobal City",
    body: "At the heart of Gurugram’s\nnext global growth destination.",
  },
  {
    title: "City-Scale\nOpportunity",
    body: "A landmark opportunity within\nGurugram's most ambitious growth corridor.",
  },
];

export const CONNECTIVITY = [
  {
    title: "IGI Airport",
    time: "20* min",
  },
  {
    title: "KMP Expressway",
    time: "01* min",
  },
  
  {
    title: "Dwarka Expressway",
    time: "20* min",
  },
  
];

export const CENTRAL_CONNECTIVITY = [
  {
    title: "NH-8",
    time: "24* min",
  },
   {
    title: "Gurugram-Rewari Expressway",
    time: "8* min",
  },
  
];

export const NEAR_BY_CONNECTIVITY = [
  {
    category: "Corporates",
    places: ["Maruti Suzuki", "Honda Motor", "Hero Motorcorp", "Jaguar Experience Centre", "Times of India", "Eros Corporate Park", "IBC Knowledge Park"],
  },
  {
    category: "Hospitals",
    places: ["Fortis", "Apollo Spectra", "Artemis", "Silver Streaks"],  
  },
  {
    category: "Educational Institutes",
    places: ["Bal Bharti", "DPS Manesar", "Amity University"],
  },
];

export const FUTURE_DEVELOPMENT = [
  { title: "Gurugram - Rewari Highway" },
  { title: "Metro Route" },
];

export const ECO_ICON = [
  {
    image: "/images/eco/diverse_housing_icon_blue.png",
  },
  {
    image: "/images/eco/Icons-Immobilie_Haus-Hochhaus.webp",
  },
  {
    image: "/images/eco/locations.png",
  },
  {
    image: "/images/eco/business-growth-management-svgrepo-com.png", 
  },
];

export const CENTRAL_GROVE = [
  {
    title: "Skywalk",
    tag: "A path that leads to peace",
    body: "A thoughtfully designed skywalk spans the landscape, offering uninterrupted connections and panoramic views.",
    image: "/images/skywalk.webp",
  },
  {
    title: "Whispering Falls",
    tag: "Where nature invites you to stay",
    body: "Graceful water cascades flow through lush green settings, complemented by generous sit-out spaces for relaxed gatherings.",
    image: "/images/central-grove-bg.webp",
  },
  {
    title: "Forest Trail",
    tag: "Stroll amidst the greens",
    body: "Shaded, bamboo-lined trails winding through the property — designed to slow you down and let calm take over.",
    image: "/images/forest-trail.webp",
  },
];

export const CLUBHOUSE_IMAGES = [
  { src: "/images/grand-welcome-entrance.webp", caption: "Grand Clubhouse Entrance" },
  { src: "/images/Forestia-Render-3.webp", caption: "The Clubhouse Facade" },
  { src: "/images/wellbeing.webp", caption: "Wellness & Spa Deck" },
  { src: "/images/amphitheatre-card.webp", caption: "Amphitheatre & Events Lawn" },
  { src: "/images/natural-lakes-card.webp", caption: "Waterfront Lounge" },
];

export const AMENITY_CATEGORIES = [
  {
    key: "sports",
    label: "Sports",
    items: [
      "Kids Play Area",
      "Bowling Alley",
      "SMini Golf",
      "Cricket Net",
      "Lawn Tennis",
    ],
  },
  {
    key: "fitness",
    label: "Fitness & Wellness",
    items: [
      "Jogging Track",
      "Pilates Studio",
      "Spa & Sauna",
      "Yoga Decks",
      "Outdoor Gym",
    ],
  },
  {
    key: "entertainment",
    label: "Entertainment",
    items: [
      "Karaoke Lounge",
      "Virtual Gaming Zone",
      "Indoor Golf",
      "Bowling Alley",
      "Art Studio",
      "Music Room",
      "Cigar Lounge",
      "Multi-cuisine Restaurant",
      "Mini Golf",
    ],
  },
  {
    key: "business",
    label: "Business",
    items: ["Conference Rooms", "Business Lounge", "Co-working Spaces", "VC Room"],
  },
  {
    key: "rejuvenate",
    label: "Rejuvenate",
    items: [
      "Forest Trail",
      "Eco Pond",
      "Reflexology Garden",
      "Organic Farm",
      "Lantern Garden",
    ],
  },
];

// Images sourced from the official M3M Gurgaon International City page
// (m3mindia.com/gurgaon-international-city) for the sibling Innovation Park.
export const INNOVATION_PARK = [
  {
    title: "Data Centers",
    tagline: "Powering India's Digital Backbone",
    image: "/images/innovation-park/park-1.webp",
  },
  {
    title: "Data Centers",
    tagline: "Powering India's Digital Backbone",
    image: "/images/innovation-park/park-2.webp",
  },
  {
    title: "EV & Clean Tech",
    tagline: "Driving the Mobility Revolution",
    image: "/images/innovation-park/park-3.webp",
  },
  {
    title: "Biotech & Pharma",
    tagline: "Innovating for a Healthier Tomorrow",
    image: "/images/innovation-park/park-4.webp",
  },
  {
    title: "Logistics Hub",
    tagline: "Connecting Enterprise to Opportunity",
    image: "/images/innovation-park/park-5.webp",
  },
];

export const GALLERY_IMAGES = [
  { src: "/images/sanctuary-pool.webp", caption: "A Sanctuary of Luxury Within the Greens" },
  { src: "/images/central-grove-aerial.webp", caption: "The Central Grove" },
  { src: "/images/jogging-track.webp", caption: "3.5 km Jogging & Cycling Track" },
  { src: "/images/peacock-card.webp", caption: "Bird Sanctuaries, Just Next Door" },
  { src: "/images/lantern-pod.webp", caption: "Curated Corners for Connection" },
  { src: "/images/cafe-terrace.webp", caption: "Café Terrace at Club Eden" },
  { src: "/images/arrival-fountain.webp", caption: "A Grand Arrival Rooted in Nature" },
  { src: "/images/garden-peace.webp", caption: "Here, Peace Finds Its Colors" },
];
