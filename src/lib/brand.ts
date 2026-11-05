export const BRAND = {
  name: "Veranne",
  wordmark: "VERANNE",
  legalName: "Veranne Atelier",
  tagline: "A curated house of fashion, accessories & home.",
  founded: "2019",
  domain: "https://veranne.studio",
  email: "atelier@veranne.studio",
  phone: "+1 (212) 555-0147",
  studio: "Design studio in Lisbon · Ateliers in Portugal, Italy and Japan",
  shortStory:
    "Veranne is a curated multi-category house — women's and men's apparel, leather goods, cashmere, footwear, timepieces, ceramics and fragrance — made in small runs by makers we know by name.",
  freeShippingThresholdCents: 25000,
  currency: "USD",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
} as const;

export const WORDBITX = {
  name: "WordbitX",
  url: "https://wordbitx.com",
  primaryPhone: {
    label: "+92 325 1888841",
    href: "tel:+923251888841",
    region: "Pakistan · Primary",
    whatsapp: "https://wa.me/923251888841",
  },
  usaPhone: {
    label: "+1 (929) 619-7699",
    href: "tel:+19296197699",
    region: "USA · North America",
  },
  credit: "Premium Digital Commerce Experience by WordbitX",
  longCredit: "Designed & Developed by WordbitX",
  positioning: "Premium E-Commerce Digital Experience",
  pitch:
    "WordbitX designs and develops custom e-commerce websites, mobile apps, software platforms and AI-powered digital products for businesses in Pakistan and worldwide.",
  summary:
    "WordbitX designed and developed a premium e-commerce experience combining editorial commerce, intelligent product discovery, AI-assisted shopping and a conversion-focused checkout journey.",
  services: [
    {
      title: "Ecommerce Website Development",
      description:
        "Custom storefronts engineered around merchandising, speed and checkout completion.",
      href: "https://wordbitx.com",
    },
    {
      title: "Custom Web Development",
      description: "Design systems, headless architecture and content platforms built to scale.",
      href: "https://wordbitx.com",
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform commerce apps that share one product API.",
      href: "https://wordbitx.com",
    },
    {
      title: "AI Ecommerce Solutions",
      description:
        "Shopping concierges, recommendation engines and merchandising intelligence.",
      href: "https://wordbitx.com",
    },
    {
      title: "UI/UX Design",
      description: "Editorial art direction paired with conversion-focused interaction design.",
      href: "https://wordbitx.com",
    },
    {
      title: "SEO & Digital Marketing",
      description:
        "Technical SEO, structured data, topical content architecture and performance work.",
      href: "https://wordbitx.com",
    },
  ],
  regions: [
    "Ecommerce development Pakistan",
    "Ecommerce development company Lahore",
    "Ecommerce development USA",
    "Ecommerce development UK",
    "Ecommerce development UAE",
    "Ecommerce development Australia",
  ],
} as const;

export const PRIMARY_NAV = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Women", href: "/shop?category=womenswear" },
  { label: "Men", href: "/shop?category=menswear" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
] as const;

export const FOOTER_NAV = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      { label: "Women", href: "/shop?category=womenswear" },
      { label: "Men", href: "/shop?category=menswear" },
      { label: "Footwear", href: "/shop?category=footwear" },
      { label: "Timepieces", href: "/shop?category=timepieces" },
      { label: "Leather goods", href: "/shop?category=leather-goods" },
      { label: "Cashmere & knitwear", href: "/shop?category=cashmere-knitwear" },
      { label: "Home & living", href: "/shop?category=ceramics-home" },
      { label: "Fragrance & light", href: "/shop?category=fragrance-light" },
      { label: "Fine accessories", href: "/shop?category=fine-accessories" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Collections", href: "/collections" },
      { label: "The gift edit", href: "/gifts" },
      { label: "Journal", href: "/journal" },
      { label: "Our story", href: "/about" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Account", href: "/account" },
    ],
  },
  {
    title: "Client care",
    links: [
      { label: "Shipping & delivery", href: "/help/shipping" },
      { label: "Returns & exchanges", href: "/help/returns" },
      { label: "Size & fit guide", href: "/help/size-guide" },
      { label: "Care instructions", href: "/help/care" },
      { label: "FAQs", href: "/help/faq" },
      { label: "Track an order", href: "/track" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Case study", href: "/case-studies/ecommerce-experience" },
      { label: "Ecommerce development", href: "/ecommerce-website-development" },
      { label: "Privacy policy", href: "/help/privacy" },
      { label: "Terms of sale", href: "/help/terms" },
      { label: "WordbitX", href: WORDBITX.url },
    ],
  },
] as const;

export type HelpDoc = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  sections: { heading: string; body: string[]; list?: string[] }[];
  faqs?: { question: string; answer: string }[];
};

export const HELP_DOCS: HelpDoc[] = [
  {
    slug: "shipping",
    title: "Shipping & delivery",
    eyebrow: "Client care",
    intro:
      "Every Veranne order leaves the atelier wrapped in unbleached tissue, sealed with a wax mark and dispatched with tracking.",
    metaTitle: "Shipping & Delivery — Veranne",
    metaDescription:
      "Delivery timeframes, carriers, duties and packaging details for Veranne orders shipped worldwide.",
    sections: [
      {
        heading: "Timeframes",
        body: [
          "Orders placed before 14:00 CET on a business day are prepared the same day. Made-to-order pieces are noted on the product page and dispatch within five working days.",
        ],
        list: [
          "Standard — 4 to 7 business days · complimentary above $250",
          "Express — 2 to 3 business days · $18",
          "Atelier courier (select cities) — next business day · $32",
        ],
      },
      {
        heading: "Duties and taxes",
        body: [
          "Prices are shown excluding local sales tax. Any duties collected at the border are calculated by the destination country; your carrier will contact you if a payment is required.",
        ],
      },
      {
        heading: "Packaging",
        body: [
          "Leather and knitwear travel in a cotton dust bag inside a rigid ivory box. Ceramics are packed in moulded pulp with a fragile handling mark. All materials are recyclable.",
        ],
      },
    ],
  },
  {
    slug: "returns",
    title: "Returns & exchanges",
    eyebrow: "Client care",
    intro:
      "Take thirty days with your piece. If it does not settle into your life, we will collect it.",
    metaTitle: "Returns & Exchanges — Veranne",
    metaDescription:
      "Thirty day returns, exchange process, refund timing and made-to-order exceptions at Veranne.",
    sections: [
      {
        heading: "The window",
        body: [
          "Unworn pieces in original packaging can be returned within 30 days of delivery. Start the process from your account or by writing to the atelier — a prepaid label is issued within one business day.",
        ],
      },
      {
        heading: "Exchanges",
        body: [
          "Size exchanges on knitwear and rings are complimentary once per order. We hold the replacement size for you while the original travels back.",
        ],
      },
      {
        heading: "Exceptions",
        body: [
          "Personalised embossing, engraved pieces and opened fragrance cannot be returned unless faulty. Sale pieces from Limited Edition drops are final sale and marked as such on the product page.",
        ],
      },
    ],
  },
  {
    slug: "size-guide",
    title: "Size & fit guide",
    eyebrow: "Client care",
    intro:
      "Measurements are taken flat, in centimetres, on the sample size. Where a piece sits between sizes we say so on the product page.",
    metaTitle: "Size & Fit Guide — Veranne",
    metaDescription:
      "How to measure for Veranne knitwear and rings, with flat measurements, fit notes and exchange guidance.",
    sections: [
      {
        heading: "How to measure knitwear",
        body: [
          "Lay a sweater you already wear flat, smooth the fabric and measure straight across from underarm to underarm — then double it for the full chest measurement. Compare with the table below rather than with a standard label size.",
        ],
        list: [
          "XS — chest 96 cm · body length 58 cm · sleeve 60 cm",
          "S — chest 101 cm · body length 60 cm · sleeve 61 cm",
          "M — chest 106 cm · body length 62 cm · sleeve 62 cm",
          "L — chest 112 cm · body length 64 cm · sleeve 63 cm",
          "XL — chest 118 cm · body length 66 cm · sleeve 64 cm",
        ],
      },
      {
        heading: "Fit notes",
        body: [
          "Our knitwear is drafted with a relaxed shoulder and a straight body. If you prefer a close fit, take your usual size; for a softer, layered line, take one size up. Cashmere relaxes roughly half a centimetre through the body with wear and returns to shape after blocking.",
        ],
      },
      {
        heading: "Ring sizing",
        body: [
          "Wrap a strip of paper around the base of your finger, mark where it meets and measure the length in millimetres. 49.3 mm is a US 5, 51.9 mm a US 6, 54.4 mm a US 7, 57.0 mm a US 8 and 59.5 mm a US 9. Measure at the end of the day, when fingers are at their largest.",
        ],
      },
    ],
  },
  {
    slug: "care",
    title: "Care instructions",
    eyebrow: "Client care",
    intro: "Objects made slowly deserve to be kept slowly. A few honest habits are enough.",
    metaTitle: "Product Care Guide — Veranne",
    metaDescription:
      "How to care for vegetable-tanned leather, cashmere, hand-thrown ceramics and fragrance from Veranne.",
    sections: [
      {
        heading: "Leather",
        body: [
          "Vegetable-tanned leather darkens with light and touch — this is the intended life of the material. Keep pieces in their dust bag, away from direct heat. Treat with a neutral balm twice a year and blot spills immediately rather than rubbing.",
        ],
      },
      {
        heading: "Cashmere",
        body: [
          "Wash by hand in cool water with a pH-neutral wool soap, press the water out without wringing and dry flat on a towel. Rest a piece for a day between wears. De-pill with a cashmere comb rather than a razor.",
        ],
      },
      {
        heading: "Ceramics",
        body: [
          "Our stoneware is fired to 1,260°C and is dishwasher safe, though hand washing preserves the surface of unglazed feet. Avoid thermal shock — let a piece come to room temperature before filling it with boiling water.",
        ],
      },
      {
        heading: "Fragrance & candles",
        body: [
          "Store fragrance away from sunlight. On first lighting, allow a candle to form a full melt pool — roughly two hours — and trim the wick to 5 mm before each use.",
        ],
      },
    ],
  },
  {
    slug: "faq",
    title: "Frequently asked questions",
    eyebrow: "Client care",
    intro: "The questions our clients ask most often, answered plainly.",
    metaTitle: "FAQs — Veranne",
    metaDescription:
      "Answers on ordering, materials, made-to-order timing, gifting, payment methods and after-care at Veranne.",
    sections: [],
    faqs: [
      {
        question: "Where are Veranne pieces made?",
        answer:
          "Design happens in our Lisbon studio. Leather is cut and stitched in Portugal, knitwear is made in a family mill in northern Italy, and our stoneware is thrown in a small studio outside Kyoto.",
      },
      {
        question: "Do you restock sold-out pieces?",
        answer:
          "Signature and Essentials pieces are restocked in small runs every six to eight weeks. Limited Edition drops are made once and are never repeated.",
      },
      {
        question: "Can I order a gift with a message?",
        answer:
          "Yes. At checkout you can add atelier gift wrapping and a handwritten card. Prices are removed from the packing note on gift orders.",
      },
      {
        question: "Which payment methods do you accept?",
        answer:
          "Card, digital wallet and cash on delivery in supported regions. This showcase build uses a mock payment interface — no card data is requested, transmitted or stored.",
      },
      {
        question: "How do I track my order?",
        answer:
          "Every confirmation includes an order number. Enter it on the tracking page to follow each stage from atelier to doorstep.",
      },
      {
        question: "Is this a real store?",
        answer:
          "Veranne is a fictional brand created by WordbitX to demonstrate a premium e-commerce experience. Products, prices and reviews are sample content; the commerce flows, database and search are fully functional.",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy policy",
    eyebrow: "Legal",
    intro:
      "A short, readable summary of what this demonstration store records and why.",
    metaTitle: "Privacy Policy — Veranne",
    metaDescription:
      "What data the Veranne demonstration store collects, how it is used and how to request removal.",
    sections: [
      {
        heading: "What we store",
        body: [
          "Orders placed in this demonstration are written to a PostgreSQL database so that confirmation and tracking work end to end: name, delivery address, email, the items ordered and the order total. An anonymous session identifier is stored in your browser to keep your cart, wishlist and recently viewed pieces together.",
        ],
      },
      {
        heading: "What we never store",
        body: [
          "No payment card data is requested, transmitted or stored. The payment step is a mock interface built for demonstration purposes only.",
        ],
      },
      {
        heading: "Analytics",
        body: [
          "Product views, searches, cart events and concierge interactions are recorded as anonymous counters so the experience can be measured. No third-party advertising trackers are used.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of sale",
    eyebrow: "Legal",
    intro: "The terms that would govern a purchase from the Veranne atelier.",
    metaTitle: "Terms of Sale — Veranne",
    metaDescription:
      "Order acceptance, pricing, delivery, returns and demonstration disclosures for the Veranne storefront.",
    sections: [
      {
        heading: "Demonstration notice",
        body: [
          "Veranne is a fictional brand built by WordbitX as a portfolio case study. No goods are dispatched and no payment is taken. Product descriptions, imagery and sample reviews exist to demonstrate a production-grade commerce experience.",
        ],
      },
      {
        heading: "Orders and pricing",
        body: [
          "An order is accepted when the confirmation screen is issued. Prices are displayed in US dollars and exclude local sales tax, which is calculated at checkout where applicable.",
        ],
      },
      {
        heading: "Delivery and risk",
        body: [
          "Risk passes on delivery to the address supplied. Delivery estimates are working-day estimates and exclude customs delays.",
        ],
      },
    ],
  },
];

export function getHelpDoc(slug: string): HelpDoc | undefined {
  return HELP_DOCS.find((doc) => doc.slug === slug);
}
