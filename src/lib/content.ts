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

export const DISCLAIMER =
  "The contents, information, images, visuals or sketches, computer generated images including landscaping on the advertisement are merely representative images or artistic renderings for general informational purposes only, unless specifically claimed to be actual photograph. The materials, designs, square footages, fixtures and amenities depicted by artist's or computer rendering are only for illustration and not necessarily be part of the offer. 'M3M Forestia West I' is a distinct component of the Industrial Plotted Colony and not an Affordable Group Housing Project under the Affordable Housing Policy, 2013, is being developed by M/s M3M India Infrastructure Private Limited (\"Promoter\") as an integral part/constituent/block of the larger project namely Gurgaon International City. The Project is registered with Haryana Real Estate Regulatory Authority. All details are available on www.haryanarera.gov.in and should be independently verified. Nothing contained herein constitutes a legal offer. *Taxes and statutory charges are extra as per applicable norms.";

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
    title: "140* Acres Township",
    body: "Gurugram’s Largest Integrated Township Development",
  },
  {
    title: "INTEGRATED\nLIVING",
    body: "Live, Work, Play and Shop",
  },
  {
    title: "EXTENSION OF GLOBAL CITY",
    body: "Government ambitious city",
  },
  {
    title: "CITY-SCALE OPPORTUNITY",
    body: "Invest in the New Growth Axis of Gurgaon",
  },
];

export const CONNECTIVITY = [
  {
    title: "Dwarka Expressway",
    time: "10 min",
  },
  {
    title: "Gurugram-Rewari Expressway",
    time: "10 min",
  },
  {
    title: "IGI Airport",
    time: "20 min",
  },
  
];

export const CENTRAL_CONNECTIVITY = [
  {
    title: "KMP Expressway",
    time: "10 min",
  },
  {
    title: "NH-8",
    time: "20 min",
  },
];

export const VICINITY = [
  {
    category: "Corporates",
    places: ["Jaguar Experience Centre", "\n" + "Hero MotoCorp"],
  },
  {
    category: "Residential",
    places: ["Smartworld Gems","\n" +"M3M Golfhills"],
  },
  {
    category: "Hospitals",
    places: ["Fortis", "\n" + "Apollo"],  
  },
  {
    category: "Educational Institutes",
    places: ["DPS Manesar", "\n" + "Amity University"],
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
