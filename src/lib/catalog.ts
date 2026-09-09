/**
 * VERANNE catalog — the merchandising source of truth for the storefront.
 *
 * Authored as typed data so the store can be statically rendered (fast LCP,
 * no database round-trip on browse pages) while remaining shaped exactly like
 * the tables a future admin dashboard would write to.
 */

export type ProductImage = {
  url: string;
  alt: string;
  kind: "primary" | "alternate" | "detail" | "lifestyle";
};

export type ColorVariant = {
  id: string;
  name: string;
  hex: string;
};

export type SizeOption = {
  label: string;
  note?: string;
  inStock: boolean;
};

export type SizeType = "knitwear" | "apparel" | "shoe" | "ring" | "one-size";

export type Product = {
  slug: string;
  sku: string;
  name: string;
  subtitle: string;
  shortDescription: string;
  categorySlug: string;
  collectionSlugs: string[];
  priceCents: number;
  compareAtCents?: number;
  badge?: string;
  releasedAt: string;
  salesRank: number;
  stock: number;
  madeToOrder?: boolean;
  finalSale?: boolean;
  colors: ColorVariant[];
  sizes: SizeOption[];
  sizeType: SizeType;
  images: ProductImage[];
  story: string[];
  materials: string[];
  specifications: { label: string; value: string }[];
  care: string[];
  shippingNote: string;
  faqs: { question: string; answer: string }[];
  complements: string[];
  moods: string[];
  occasions: string[];
  recipients: string[];
  keyword: string;
  metaDescription: string;
};

export type Category = {
  slug: string;
  name: string;
  plural: string;
  tagline: string;
  description: string;
  keyword: string;
};

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  intro: string[];
  storyTitle: string;
  story: string[];
  image: string;
  imageAlt: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  productSlugs: string[];
};

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200`;

export const CATEGORIES: Category[] = [
  {
    slug: "leather-goods",
    name: "Leather Goods",
    plural: "Leather goods",
    tagline: "Cut, skived and saddle-stitched in Portugal",
    description:
      "Vegetable-tanned bags, holders and carry pieces built on an unlined architecture so the leather can soften into the shape of your week.",
    keyword: "premium leather goods online",
  },
  {
    slug: "cashmere-knitwear",
    name: "Cashmere & Knitwear",
    plural: "Cashmere & knitwear",
    tagline: "Spun in a family mill in Biella",
    description:
      "Grade-A Inner Mongolian cashmere knitted in northern Italy — weights chosen for how a piece behaves after fifty wears, not on the hanger.",
    keyword: "buy cashmere knitwear",
  },
  {
    slug: "ceramics-home",
    name: "Home & Living",
    plural: "Home & living",
    tagline: "Stoneware, throws and objects for the home",
    description:
      "Hand-thrown vessels, washed linen and the small objects that set the tone of a room. Small variations are the signature of the hands that made them.",
    keyword: "premium home and living store",
  },
  {
    slug: "fragrance-light",
    name: "Fragrance & Light",
    plural: "Fragrance & light",
    tagline: "Composed in Grasse, poured in small batches",
    description:
      "Compositions built around a single memory — warm stone, cold smoke, dried grass — in refillable vessels made to stay on the shelf.",
    keyword: "luxury fragrance and candles",
  },
  {
    slug: "fine-accessories",
    name: "Fine Accessories",
    plural: "Fine accessories",
    tagline: "Silk twill and solid 14k gold",
    description:
      "The finishing gestures: a hand-rolled scarf, a signet worn smooth, a chain with enough weight to be felt.",
    keyword: "fine accessories and jewellery",
  },
  {
    slug: "womenswear",
    name: "Women",
    plural: "Women's apparel",
    tagline: "Tailoring, silk and wool in quiet shapes",
    description:
      "Coats, blazers, blouses and skirts drafted to be worn for years — classic lines, honest fabrics, nothing that needs explaining.",
    keyword: "women's clothing online",
  },
  {
    slug: "menswear",
    name: "Men",
    plural: "Men's apparel",
    tagline: "Shirting and tailoring cut for every day",
    description:
      "Oxford shirting, wool overshirts and tailored trousers cut in Portugal from cloth woven in Italy.",
    keyword: "men's clothing online",
  },
  {
    slug: "footwear",
    name: "Footwear",
    plural: "Footwear",
    tagline: "Benchmade in Alentejo, Portugal",
    description:
      "Penny loafers, ankle boots and court sneakers built on lasts refined over years — resoled rather than replaced.",
    keyword: "premium leather footwear",
  },
  {
    slug: "timepieces",
    name: "Timepieces",
    plural: "Timepieces",
    tagline: "Swiss movements · Italian calf straps",
    description:
      "Small-batch watches with Swiss movements and Italian calf straps — designed to be worn daily and serviced for decades.",
    keyword: "premium watches online",
  },
];

const knitSizes: SizeOption[] = [
  { label: "XS", note: "Chest 96 cm", inStock: true },
  { label: "S", note: "Chest 101 cm", inStock: true },
  { label: "M", note: "Chest 106 cm", inStock: true },
  { label: "L", note: "Chest 112 cm", inStock: true },
  { label: "XL", note: "Chest 118 cm", inStock: false },
];

const ringSizes: SizeOption[] = [
  { label: "5", note: "49.3 mm", inStock: true },
  { label: "6", note: "51.9 mm", inStock: true },
  { label: "7", note: "54.4 mm", inStock: true },
  { label: "8", note: "57.0 mm", inStock: true },
  { label: "9", note: "59.5 mm", inStock: false },
];

const oneSize: SizeOption[] = [{ label: "One size", inStock: true }];

const apparelSizes: SizeOption[] = [
  { label: "XS", note: "Chest 96 cm", inStock: true },
  { label: "S", note: "Chest 101 cm", inStock: true },
  { label: "M", note: "Chest 106 cm", inStock: true },
  { label: "L", note: "Chest 112 cm", inStock: true },
  { label: "XL", note: "Chest 118 cm", inStock: false },
];

const shoeSizes: SizeOption[] = [
  { label: "36", note: "US 6", inStock: true },
  { label: "37", note: "US 6.5", inStock: true },
  { label: "38", note: "US 7", inStock: true },
  { label: "39", note: "US 8", inStock: true },
  { label: "40", note: "US 8.5", inStock: true },
  { label: "41", note: "US 9", inStock: true },
  { label: "42", note: "US 10", inStock: true },
  { label: "43", note: "US 10.5", inStock: true },
  { label: "44", note: "US 11", inStock: false },
];

const leatherCare = [
  "Keep in the cotton dust bag, away from direct heat.",
  "Blot spills, never rub. Treat with a neutral balm twice a year.",
  "Expect the tan to deepen — the patina is the point.",
];

const knitCare = [
  "Hand wash cool with pH-neutral wool soap, press — do not wring.",
  "Dry flat on a towel, reshaping while damp.",
  "Rest a day between wears and comb, never shave, any pilling.",
];

const ceramicCare = [
  "Dishwasher safe; hand washing preserves the unglazed foot.",
  "Let the piece reach room temperature before adding hot water.",
  "Small tonal shifts are inherent to a wood-ash glaze.",
];

const scentCare = [
  "Store away from sunlight and radiators.",
  "Burn to a full melt pool on first light — around two hours.",
  "Trim the wick to 5 mm before every use.",
];

export const PRODUCTS: Product[] = [
  {
    slug: "aveline-structured-tote",
    sku: "VRN-LG-101",
    name: "Aveline Structured Tote",
    subtitle: "Vegetable-tanned calf · unlined",
    shortDescription:
      "A day bag with an architect's posture — one panel of tanned calf, folded rather than seamed.",
    categorySlug: "leather-goods",
    collectionSlugs: ["signature-collection", "best-sellers", "the-gift-edit"],
    priceCents: 68000,
    releasedAt: "2025-09-12",
    salesRank: 1,
    stock: 14,
    badge: "Signature",
    colors: [
      { id: "tan", name: "Warm Tan", hex: "#c69a6d" },
      { id: "ivory", name: "Bone", hex: "#e8e0d2" },
      { id: "charcoal", name: "Charcoal", hex: "#332f2b" },
    ],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(27227257),
        alt: "Aveline structured tote in warm tan leather resting on a vintage chair",
        kind: "primary",
      },
      {
        url: px(8396731),
        alt: "Aveline tote held by hand beside pale sculptural forms",
        kind: "alternate",
      },
      {
        url: px(5706272),
        alt: "Aveline tote styled with dried leaves on stone pedestals",
        kind: "lifestyle",
      },
      {
        url: px(9595073),
        alt: "Close view of the saddle-stitched edge of the Aveline tote",
        kind: "detail",
      },
    ],
    story: [
      "The Aveline began as an argument about linings. We wanted a bag that would record its owner — the soft collapse at the corners, the darkening where a hand always lands — and a lining hides all of that. So we removed it, and thickened the leather instead.",
      "One hide, folded twice, saddle-stitched by a single maker from start to finish. It stands unaided when empty and slouches honestly when full.",
    ],
    materials: [
      "Vegetable-tanned Tuscan calf, 2.2 mm",
      "Solid brass hardware with a brushed finish",
      "Waxed linen thread, hand saddle-stitched",
    ],
    specifications: [
      { label: "Dimensions", value: "34 cm W × 29 cm H × 13 cm D" },
      { label: "Handle drop", value: "22 cm — shoulder carry" },
      { label: "Weight", value: "870 g" },
      { label: "Capacity", value: "Fits a 14\" laptop and A4 folio" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: leatherCare,
    shippingNote: "Dispatched within 24 hours · complimentary standard delivery",
    faqs: [
      {
        question: "Will the unlined interior mark?",
        answer:
          "The interior is finished with the same tanned surface as the exterior, so it develops the same patina. A pen sleeve is stitched into the side wall to keep ink away from the panel.",
      },
      {
        question: "Can it be monogrammed?",
        answer:
          "Blind embossing in up to three characters is offered on the base of the front panel. Personalised pieces are final sale.",
      },
    ],
    complements: ["marin-card-holder", "sable-cashmere-wrap", "ember-no-4-eau-de-parfum"],
    moods: ["structured", "everyday", "workwear", "minimal"],
    occasions: ["new job", "milestone", "anniversary"],
    recipients: ["for her", "for him", "for a colleague"],
    keyword: "structured leather tote bag",
    metaDescription:
      "The Aveline structured tote in vegetable-tanned Tuscan calf — unlined, saddle-stitched in Portugal, sized for a 14-inch laptop.",
  },
  {
    slug: "solene-crescent-bag",
    sku: "VRN-LG-104",
    name: "Solène Crescent Bag",
    subtitle: "Softened calf · chain and leather strap",
    shortDescription:
      "A crescent that sits close to the body, with a chain that can be shortened into a top handle.",
    categorySlug: "leather-goods",
    collectionSlugs: ["new-arrivals", "signature-collection"],
    priceCents: 52000,
    releasedAt: "2026-01-08",
    salesRank: 4,
    stock: 6,
    badge: "New",
    colors: [
      { id: "espresso", name: "Espresso", hex: "#4a352a" },
      { id: "tan", name: "Warm Tan", hex: "#c69a6d" },
    ],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(18819275),
        alt: "Solène crescent bag in espresso leather with a slim gold chain",
        kind: "primary",
      },
      {
        url: px(9595073),
        alt: "Solène crescent bag stacked with other atelier leather pieces",
        kind: "alternate",
      },
      {
        url: px(9595079),
        alt: "Solène crescent bag photographed from above on a metal surface",
        kind: "detail",
      },
    ],
    story: [
      "Drawn from the curve of a cupped hand. The Solène has no base seam — the panel is moulded over a wooden last so the shape holds without stiffening.",
      "The chain detaches at both ends; shortened, it becomes a top handle for evening.",
    ],
    materials: [
      "Milled calf with a soft hand",
      "Gold-tone brass chain, 58 cm",
      "Suede-lined interior with card slot",
    ],
    specifications: [
      { label: "Dimensions", value: "26 cm W × 15 cm H × 7 cm D" },
      { label: "Strap", value: "Detachable chain, 58 cm / 28 cm doubled" },
      { label: "Closure", value: "Concealed magnetic clasp" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: leatherCare,
    shippingNote: "Low stock · dispatched within 24 hours",
    faqs: [
      {
        question: "What fits inside?",
        answer: "A large phone, a card holder, a compact and a set of keys.",
      },
    ],
    complements: ["filo-chain-necklace", "lune-silk-scarf", "vesper-scented-candle"],
    moods: ["evening", "romantic", "compact"],
    occasions: ["birthday", "wedding guest", "anniversary"],
    recipients: ["for her"],
    keyword: "crescent shoulder bag leather",
    metaDescription:
      "Solène crescent bag in milled calf with a detachable gold-tone chain — a moulded evening shape made in Portugal.",
  },
  {
    slug: "lisette-micro-bag",
    sku: "VRN-LG-108",
    name: "Lisette Micro Bag",
    subtitle: "Grained calf · cross-body cord",
    shortDescription: "The smallest useful bag we could draw — phone, cards, keys, nothing else.",
    categorySlug: "leather-goods",
    collectionSlugs: ["essentials", "the-gift-edit", "new-arrivals"],
    priceCents: 24000,
    releasedAt: "2026-01-22",
    salesRank: 7,
    stock: 22,
    colors: [
      { id: "bone", name: "Bone", hex: "#e8e0d2" },
      { id: "sky", name: "Faded Sky", hex: "#a9b7c4" },
      { id: "charcoal", name: "Charcoal", hex: "#332f2b" },
    ],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(9595067),
        alt: "Lisette micro bag in bone leather on a pale shelf",
        kind: "primary",
      },
      {
        url: px(9595071),
        alt: "Lisette micro bag displayed on a plain carton in studio light",
        kind: "alternate",
      },
    ],
    story: [
      "Made from the offcuts of the Aveline panels — the parts of the hide too small for a tote but too good to lose.",
      "A round cord strap, knotted rather than riveted, so the length can be adjusted by hand.",
    ],
    materials: ["Grained calf offcuts", "Braided leather cord strap", "Brass slider"],
    specifications: [
      { label: "Dimensions", value: "17 cm W × 12 cm H × 5 cm D" },
      { label: "Strap", value: "Adjustable 96–124 cm" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: leatherCare,
    shippingNote: "In stock · dispatched within 24 hours",
    faqs: [
      {
        question: "Does it fit a large phone?",
        answer: "Yes — up to 165 mm in length, with room for three cards behind it.",
      },
    ],
    complements: ["marin-card-holder", "solene-signet-ring", "odette-cashmere-sweater"],
    moods: ["compact", "everyday", "playful"],
    occasions: ["birthday", "thank you", "just because"],
    recipients: ["for her", "for a friend", "under 250"],
    keyword: "small cross body bag",
    metaDescription:
      "Lisette micro bag in grained calf with an adjustable braided cord — a considered small cross-body made from atelier offcuts.",
  },
  {
    slug: "marin-card-holder",
    sku: "VRN-LG-112",
    name: "Marin Card Holder",
    subtitle: "Four pockets · one fold",
    shortDescription: "Two panels, six stitches per centimetre, no hardware at all.",
    categorySlug: "leather-goods",
    collectionSlugs: ["essentials", "best-sellers", "the-gift-edit"],
    priceCents: 14000,
    releasedAt: "2025-06-04",
    salesRank: 3,
    stock: 40,
    colors: [
      { id: "tan", name: "Warm Tan", hex: "#c69a6d" },
      { id: "charcoal", name: "Charcoal", hex: "#332f2b" },
      { id: "olive", name: "Dried Olive", hex: "#6f6a4e" },
    ],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(9595071),
        alt: "Marin card holder in tan leather on a neutral studio surface",
        kind: "primary",
      },
      {
        url: px(7005940),
        alt: "Marin card holder photographed on warm brown paper",
        kind: "alternate",
      },
    ],
    story: [
      "The piece we make most, and the one we have redrawn most often. The current version lost its central seam so cards slide in without catching.",
      "It arrives stiff. Within a fortnight it takes the curve of your pocket and stays there.",
    ],
    materials: ["Vegetable-tanned calf, 1.4 mm", "Waxed linen thread", "Burnished raw edges"],
    specifications: [
      { label: "Dimensions", value: "10.5 cm W × 7.5 cm H" },
      { label: "Capacity", value: "6–8 cards plus folded notes" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: leatherCare,
    shippingNote: "In stock · gift wrapping available",
    faqs: [
      {
        question: "Is embossing available?",
        answer: "Yes — three blind-embossed characters, added in the atelier before dispatch.",
      },
    ],
    complements: ["aveline-structured-tote", "ember-no-4-eau-de-parfum", "filo-chain-necklace"],
    moods: ["minimal", "everyday", "gift"],
    occasions: ["thank you", "graduation", "new job"],
    recipients: ["for him", "for her", "under 250"],
    keyword: "leather card holder",
    metaDescription:
      "Marin card holder in vegetable-tanned calf — four pockets, burnished edges, hand-stitched in Portugal.",
  },
  {
    slug: "cortile-everyday-satchel",
    sku: "VRN-LG-116",
    name: "Cortile Everyday Satchel",
    subtitle: "Structured flap · adjustable shoulder strap",
    shortDescription:
      "A working satchel with a flap that closes in one motion and a strap that survives daily use.",
    categorySlug: "leather-goods",
    collectionSlugs: ["signature-collection", "best-sellers"],
    priceCents: 59000,
    compareAtCents: 69000,
    releasedAt: "2025-04-18",
    salesRank: 6,
    stock: 9,
    colors: [
      { id: "cognac", name: "Cognac", hex: "#8f5c33" },
      { id: "charcoal", name: "Charcoal", hex: "#332f2b" },
    ],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(9595079),
        alt: "Cortile satchel in cognac leather resting beside a laptop",
        kind: "primary",
      },
      {
        url: px(9218538),
        alt: "Cortile satchel hanging beside a beige blazer",
        kind: "alternate",
      },
      {
        url: px(8400594),
        alt: "Cortile satchel in a minimal interior beside a branch-filled vase",
        kind: "lifestyle",
      },
    ],
    story: [
      "Built for the commute rather than the campaign image: a flap weighted to fall closed, a strap anchored through the side wall rather than to a ring, and a base that will not sag under a laptop.",
      "Previously part of the Archive run and returned to the line at a corrected price.",
    ],
    materials: ["Milled calf, 1.8 mm", "Cotton canvas interior", "Antique brass buckles"],
    specifications: [
      { label: "Dimensions", value: "36 cm W × 27 cm H × 11 cm D" },
      { label: "Strap", value: "Adjustable 84–126 cm, removable" },
      { label: "Compartments", value: "Two main, one zip, one sleeve" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: leatherCare,
    shippingNote: "Archive pricing · limited quantities",
    faqs: [
      {
        question: "Why is there a compare-at price?",
        answer:
          "This shape returned from the archive with a simplified interior, which lowered the cost to make. The previous retail price is shown for transparency.",
      },
    ],
    complements: ["marin-card-holder", "halden-cashmere-crewneck", "terra-hand-thrown-vase"],
    moods: ["workwear", "structured", "everyday"],
    occasions: ["new job", "graduation", "milestone"],
    recipients: ["for him", "for a colleague"],
    keyword: "leather satchel bag for work",
    metaDescription:
      "Cortile everyday satchel in milled calf with an adjustable removable strap and laptop sleeve — made in Portugal.",
  },
  {
    slug: "odette-cashmere-sweater",
    sku: "VRN-CK-201",
    name: "Odette Ribbed Cashmere Sweater",
    subtitle: "7-gauge · Grade-A Inner Mongolian cashmere",
    shortDescription:
      "A dense rib with a relaxed shoulder, knitted to hold its line after a hundred wears.",
    categorySlug: "cashmere-knitwear",
    collectionSlugs: ["signature-collection", "best-sellers", "new-arrivals"],
    priceCents: 42000,
    releasedAt: "2025-11-02",
    salesRank: 2,
    stock: 18,
    badge: "Bestseller",
    colors: [
      { id: "oat", name: "Oat", hex: "#d9c9b0" },
      { id: "camel", name: "Camel", hex: "#b58e63" },
      { id: "charcoal", name: "Charcoal", hex: "#3a372f" },
    ],
    sizes: knitSizes,
    sizeType: "knitwear",
    images: [
      {
        url: px(30263569),
        alt: "Odette ribbed cashmere sweaters folded in oat and camel tones",
        kind: "primary",
      },
      {
        url: px(30263575),
        alt: "Stack of Odette cashmere sweaters showing the rib texture",
        kind: "alternate",
      },
      {
        url: px(30263571),
        alt: "Close detail of the Odette cashmere rib knit",
        kind: "detail",
      },
      {
        url: px(16564570),
        alt: "Odette cashmere sweater worn with tailored trousers in warm light",
        kind: "lifestyle",
      },
    ],
    story: [
      "Knitted on a 7-gauge machine in a family mill in Biella, then washed in soft Alpine water — the step that gives cashmere its bloom.",
      "We drafted the shoulder 3 cm wider than standard so the sleeve falls rather than pulls. It is the difference between a sweater you wear and one you reach for.",
    ],
    materials: ["100% Grade-A Inner Mongolian cashmere, 2/26 yarn", "Fully fashioned seams"],
    specifications: [
      { label: "Gauge", value: "7gg rib" },
      { label: "Weight", value: "480 g in size M" },
      { label: "Fit", value: "Relaxed — size down for a close line" },
      { label: "Origin", value: "Knitted in Italy" },
    ],
    care: knitCare,
    shippingNote: "In stock · complimentary size exchange",
    faqs: [
      {
        question: "How does it fit?",
        answer:
          "Relaxed through the body with a dropped shoulder. Take your usual size for the intended line, or one down if you prefer it close. Full measurements are in the size guide.",
      },
      {
        question: "Will it pill?",
        answer:
          "Long-staple cashmere pills far less, but some surface movement in the first weeks is normal. Comb it out — do not shave it.",
      },
    ],
    complements: ["sable-cashmere-wrap", "aveline-structured-tote", "vesper-scented-candle"],
    moods: ["cosy", "minimal", "everyday"],
    occasions: ["birthday", "anniversary", "holiday"],
    recipients: ["for her", "for him"],
    keyword: "ribbed cashmere sweater",
    metaDescription:
      "Odette ribbed cashmere sweater in Grade-A Inner Mongolian cashmere, knitted 7-gauge in Italy with a relaxed shoulder.",
  },
  {
    slug: "halden-cashmere-crewneck",
    sku: "VRN-CK-205",
    name: "Halden Cashmere Crewneck",
    subtitle: "12-gauge · featherweight",
    shortDescription: "The light layer — thin enough for a jacket, warm enough without one.",
    categorySlug: "cashmere-knitwear",
    collectionSlugs: ["essentials", "best-sellers"],
    priceCents: 34000,
    releasedAt: "2025-08-20",
    salesRank: 5,
    stock: 25,
    colors: [
      { id: "ivory", name: "Ivory", hex: "#efe7d9" },
      { id: "clay", name: "Clay", hex: "#a9765d" },
      { id: "slate", name: "Slate", hex: "#5c6068" },
    ],
    sizes: knitSizes,
    sizeType: "knitwear",
    images: [
      {
        url: px(14641430),
        alt: "Halden cashmere crewnecks folded on pale bedlinen",
        kind: "primary",
      },
      {
        url: px(14641424),
        alt: "Folded Halden crewnecks in warm neutral shades",
        kind: "alternate",
      },
      {
        url: px(14641440),
        alt: "Detail of the fine 12-gauge Halden cashmere knit",
        kind: "detail",
      },
    ],
    story: [
      "Two threads instead of four. The Halden weighs 210 grams and disappears under tailoring, which is the entire brief.",
      "The neckband is knitted in one piece and linked by hand so it never ripples.",
    ],
    materials: ["100% Grade-A cashmere, 2/48 yarn", "Hand-linked neckband"],
    specifications: [
      { label: "Gauge", value: "12gg jersey" },
      { label: "Weight", value: "210 g in size M" },
      { label: "Fit", value: "Regular — true to size" },
      { label: "Origin", value: "Knitted in Italy" },
    ],
    care: knitCare,
    shippingNote: "In stock · complimentary size exchange",
    faqs: [
      {
        question: "Can it be worn alone?",
        answer:
          "Yes — it is opaque in every colourway, though ivory benefits from a fine base layer in bright light.",
      },
    ],
    complements: ["lune-silk-scarf", "cortile-everyday-satchel", "ember-no-4-eau-de-parfum"],
    moods: ["minimal", "layering", "workwear"],
    occasions: ["new job", "holiday", "just because"],
    recipients: ["for him", "for her"],
    keyword: "lightweight cashmere crewneck",
    metaDescription:
      "Halden featherweight cashmere crewneck — 12-gauge, 210 grams, hand-linked neckband, knitted in Italy.",
  },
  {
    slug: "sable-cashmere-wrap",
    sku: "VRN-CK-210",
    name: "Sable Cashmere Wrap",
    subtitle: "Brushed · 200 × 70 cm",
    shortDescription: "Wide enough to be a shawl on a plane, fine enough to knot at the throat.",
    categorySlug: "cashmere-knitwear",
    collectionSlugs: ["the-gift-edit", "best-sellers", "essentials"],
    priceCents: 28000,
    releasedAt: "2025-10-09",
    salesRank: 8,
    stock: 16,
    colors: [
      { id: "oat", name: "Oat", hex: "#d9c9b0" },
      { id: "fog", name: "Fog", hex: "#c3bfb6" },
      { id: "espresso", name: "Espresso", hex: "#4a352a" },
    ],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(4862911),
        alt: "Sable cashmere wrap in oat, folded to show its brushed surface",
        kind: "primary",
      },
      {
        url: px(4938328),
        alt: "Pleated detail of the Sable cashmere wrap in warm light",
        kind: "alternate",
      },
      {
        url: px(15419258),
        alt: "Soft folds of the Sable cashmere wrap",
        kind: "detail",
      },
    ],
    story: [
      "Woven, washed, then brushed with teasels rather than wire — a slower finish that lifts the surface without tearing the fibre.",
      "It is the piece our clients most often buy twice: one to keep, one to give.",
    ],
    materials: ["100% cashmere", "Hand-knotted fringe"],
    specifications: [
      { label: "Dimensions", value: "200 cm × 70 cm" },
      { label: "Weight", value: "320 g" },
      { label: "Finish", value: "Teasel-brushed, hand-knotted fringe" },
      { label: "Origin", value: "Woven in Italy" },
    ],
    care: knitCare,
    shippingNote: "Gift wrapping available at checkout",
    faqs: [
      {
        question: "Is it warm enough for winter?",
        answer:
          "It is a mid-weight wrap — warm over a coat collar or as a travel layer, rather than a substitute for outerwear.",
      },
    ],
    complements: ["odette-cashmere-sweater", "vesper-scented-candle", "aveline-structured-tote"],
    moods: ["cosy", "gift", "travel"],
    occasions: ["holiday", "thank you", "birthday"],
    recipients: ["for her", "for him", "for a parent", "under 250"],
    keyword: "cashmere wrap scarf",
    metaDescription:
      "Sable brushed cashmere wrap, 200 × 70 cm with hand-knotted fringe — woven in Italy, a considered gift.",
  },
  {
    slug: "lune-silk-scarf",
    sku: "VRN-FA-301",
    name: "Lune Silk Scarf",
    subtitle: "Hand-rolled twill · 90 cm square",
    shortDescription: "Silk twill printed in a single tone, with edges rolled and stitched by hand.",
    categorySlug: "fine-accessories",
    collectionSlugs: ["new-arrivals", "the-gift-edit"],
    priceCents: 19000,
    releasedAt: "2026-02-02",
    salesRank: 11,
    stock: 20,
    badge: "New",
    colors: [
      { id: "ivory", name: "Ivory", hex: "#efe7d9" },
      { id: "cocoa", name: "Cocoa", hex: "#6d4b38" },
    ],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(36726412),
        alt: "Lune silk scarf in ivory, showing the fluid twill drape",
        kind: "primary",
      },
      {
        url: px(35980977),
        alt: "Lune silk scarf in cocoa with soft folds",
        kind: "alternate",
      },
      {
        url: px(26617660),
        alt: "Hands folding the Lune silk scarf",
        kind: "lifestyle",
      },
    ],
    story: [
      "A square with nothing printed on it but light. The tonal weave shifts from matte to lustre depending on how it is folded.",
      "Edges are rolled toward the face and stitched by hand — roughly forty minutes per scarf.",
    ],
    materials: ["100% silk twill, 14 momme", "Hand-rolled and hand-stitched edges"],
    specifications: [
      { label: "Dimensions", value: "90 cm × 90 cm" },
      { label: "Weight", value: "14 momme" },
      { label: "Origin", value: "Woven and finished in Italy" },
    ],
    care: [
      "Dry clean only.",
      "Store loosely rolled rather than folded to avoid creasing.",
      "Keep away from perfume applied directly to skin.",
    ],
    shippingNote: "New arrival · dispatched within 24 hours",
    faqs: [
      {
        question: "How can it be worn?",
        answer:
          "Knotted at the throat, tied to a bag handle, or folded as a headscarf. The Journal has a short guide to three folds.",
      },
    ],
    complements: ["solene-crescent-bag", "filo-chain-necklace", "halden-cashmere-crewneck"],
    moods: ["romantic", "evening", "gift"],
    occasions: ["wedding guest", "birthday", "thank you"],
    recipients: ["for her", "under 250"],
    keyword: "hand rolled silk scarf",
    metaDescription:
      "Lune silk scarf in 14-momme twill, 90 cm square with hand-rolled edges — woven and finished in Italy.",
  },
  {
    slug: "solene-signet-ring",
    sku: "VRN-FA-306",
    name: "Solène Signet Ring",
    subtitle: "Solid 14k gold · brushed face",
    shortDescription: "A small signet with a soft oval face, weighted to sit still on the finger.",
    categorySlug: "fine-accessories",
    collectionSlugs: ["signature-collection", "the-gift-edit"],
    priceCents: 78000,
    releasedAt: "2025-12-01",
    salesRank: 9,
    stock: 5,
    colors: [{ id: "gold", name: "14k Yellow Gold", hex: "#c9a227" }],
    sizes: ringSizes,
    sizeType: "ring",
    images: [
      {
        url: px(34372573),
        alt: "Solène signet rings in 14k gold arranged on pale pebbles",
        kind: "primary",
      },
      {
        url: px(13895021),
        alt: "Solène gold rings displayed beside white blooms",
        kind: "alternate",
      },
      {
        url: px(16035785),
        alt: "Solène signet ring worn on a hand holding a ceramic cup",
        kind: "lifestyle",
      },
    ],
    story: [
      "Cast in solid gold rather than plated, because a signet is a piece you will wear every day for decades and plating does not survive that.",
      "The face is brushed by hand and will polish itself against your other fingers over the first year.",
    ],
    materials: ["Solid 14k yellow gold", "Brushed oval face, 11 × 9 mm"],
    specifications: [
      { label: "Face", value: "11 mm × 9 mm oval" },
      { label: "Band", value: "2.4 mm tapering to 1.8 mm" },
      { label: "Weight", value: "4.1 g in size 7" },
      { label: "Origin", value: "Cast and finished in Italy" },
    ],
    care: [
      "Remove before swimming or using household chemicals.",
      "Polish with a soft cloth; a jeweller can re-brush the face.",
    ],
    shippingNote: "Low stock · made in small runs",
    faqs: [
      {
        question: "Can it be engraved?",
        answer:
          "Yes — hand engraving of up to two initials is available and adds five working days. Engraved rings are final sale.",
      },
      {
        question: "How do I find my size?",
        answer:
          "Measure the circumference of your finger at the end of the day with a paper strip and compare against the millimetre values in the size guide.",
      },
    ],
    complements: ["filo-chain-necklace", "lisette-micro-bag", "ember-no-4-eau-de-parfum"],
    moods: ["heirloom", "minimal", "everyday"],
    occasions: ["anniversary", "milestone", "graduation"],
    recipients: ["for her", "for him"],
    keyword: "solid gold signet ring",
    metaDescription:
      "Solène signet ring in solid 14k yellow gold with a hand-brushed oval face — cast in Italy in small runs.",
  },
  {
    slug: "filo-chain-necklace",
    sku: "VRN-FA-311",
    name: "Filo Chain Necklace",
    subtitle: "14k gold · 45 cm",
    shortDescription: "A flat curb chain with enough weight to be felt and none to be noticed.",
    categorySlug: "fine-accessories",
    collectionSlugs: ["essentials", "new-arrivals", "the-gift-edit"],
    priceCents: 46000,
    compareAtCents: 52000,
    releasedAt: "2026-01-15",
    salesRank: 12,
    stock: 11,
    colors: [{ id: "gold", name: "14k Yellow Gold", hex: "#c9a227" }],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(27357177),
        alt: "Filo chain necklace in 14k gold laid on a soft surface",
        kind: "primary",
      },
      {
        url: px(4155246),
        alt: "Filo chain necklace with other fine accessories on a wooden tray",
        kind: "alternate",
      },
      {
        url: px(9430990),
        alt: "Hand lifting the Filo chain necklace",
        kind: "detail",
      },
    ],
    story: [
      "Each link is soldered and then filed flat so the chain lies against the collarbone rather than rolling.",
      "The clasp is oversized on purpose — it can be fastened one-handed.",
    ],
    materials: ["Solid 14k yellow gold", "Lobster clasp with 3 cm extender"],
    specifications: [
      { label: "Length", value: "45 cm with 3 cm extender" },
      { label: "Width", value: "2.6 mm" },
      { label: "Weight", value: "6.8 g" },
      { label: "Origin", value: "Made in Italy" },
    ],
    care: ["Remove before swimming.", "Store flat to prevent kinking.", "Polish with a soft cloth."],
    shippingNote: "In stock · gift wrapping available",
    faqs: [
      {
        question: "Can it be layered?",
        answer:
          "It is drafted to sit at the collarbone, which leaves room for a longer pendant beneath it.",
      },
    ],
    complements: ["solene-signet-ring", "lune-silk-scarf", "solene-crescent-bag"],
    moods: ["everyday", "layering", "gift"],
    occasions: ["birthday", "anniversary", "holiday"],
    recipients: ["for her", "under 250"],
    keyword: "gold curb chain necklace",
    metaDescription:
      "Filo flat curb chain necklace in solid 14k gold, 45 cm with extender — filed flat to sit against the collarbone.",
  },
  {
    slug: "terra-hand-thrown-vase",
    sku: "VRN-CH-401",
    name: "Terra Hand-Thrown Vase",
    subtitle: "Stoneware · wood-ash glaze",
    shortDescription: "A tall vessel with a narrow neck, thrown for branches rather than bouquets.",
    categorySlug: "ceramics-home",
    collectionSlugs: ["signature-collection", "best-sellers"],
    priceCents: 22000,
    releasedAt: "2025-07-14",
    salesRank: 10,
    stock: 12,
    colors: [
      { id: "ash", name: "Ash", hex: "#b8ada0" },
      { id: "clay", name: "Raw Clay", hex: "#b98d6f" },
    ],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(6944537),
        alt: "Terra hand-thrown stoneware vase showing its ash-glazed surface",
        kind: "primary",
      },
      {
        url: px(27584189),
        alt: "Two Terra vases in a sunlit alcove",
        kind: "alternate",
      },
      {
        url: px(18006804),
        alt: "Terra vase styled with dried flowers on a warm surface",
        kind: "lifestyle",
      },
    ],
    story: [
      "Thrown on a kick wheel in a studio outside Kyoto, then glazed with ash from the same kiln that fires it. No two surfaces repeat.",
      "The neck is deliberately narrow: three stems will look composed where thirty would not.",
    ],
    materials: ["High-fired stoneware, 1,260°C", "Wood-ash glaze, unglazed foot"],
    specifications: [
      { label: "Dimensions", value: "H 28 cm × Ø 12 cm" },
      { label: "Opening", value: "4.5 cm" },
      { label: "Watertight", value: "Yes — fully vitrified" },
      { label: "Origin", value: "Made in Japan" },
    ],
    care: ceramicCare,
    shippingNote: "Packed in moulded pulp · fragile handling",
    faqs: [
      {
        question: "Will my vase look exactly like the photograph?",
        answer:
          "No — and that is the intention. Ash glaze pools differently on every piece; tone and mottling vary within the same colourway.",
      },
    ],
    complements: ["onda-carafe-set", "vesper-scented-candle", "mirena-bud-vase"],
    moods: ["sculptural", "home", "calm"],
    occasions: ["housewarming", "wedding", "thank you"],
    recipients: ["for the home", "for a couple", "under 250"],
    keyword: "hand thrown stoneware vase",
    metaDescription:
      "Terra hand-thrown stoneware vase with a wood-ash glaze, 28 cm tall — made on a kick wheel in Japan.",
  },
  {
    slug: "onda-carafe-set",
    sku: "VRN-CH-404",
    name: "Onda Carafe & Cups",
    subtitle: "Carafe with two cups · stoneware",
    shortDescription: "A bedside set: one carafe, two cups, one of which becomes the lid.",
    categorySlug: "ceramics-home",
    collectionSlugs: ["essentials", "the-gift-edit"],
    priceCents: 17500,
    releasedAt: "2025-09-28",
    salesRank: 13,
    stock: 15,
    colors: [
      { id: "ash", name: "Ash", hex: "#b8ada0" },
      { id: "ink", name: "Ink", hex: "#4b4a48" },
    ],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(18536199),
        alt: "Onda carafe and cup set on a pale clay shelf",
        kind: "primary",
      },
      {
        url: px(18278210),
        alt: "Onda ceramics arranged with pears on a wooden bench",
        kind: "alternate",
      },
    ],
    story: [
      "Drawn from the Japanese bedside carafe, where the cup inverts over the neck and keeps the water clean overnight.",
      "We added a second cup, because most bedsides have two sides.",
    ],
    materials: ["High-fired stoneware", "Matte satin glaze"],
    specifications: [
      { label: "Carafe", value: "H 19 cm · 750 ml" },
      { label: "Cups", value: "Ø 7.5 cm · 180 ml each" },
      { label: "Dishwasher", value: "Safe" },
      { label: "Origin", value: "Made in Japan" },
    ],
    care: ceramicCare,
    shippingNote: "Packed in moulded pulp · fragile handling",
    faqs: [
      {
        question: "Is it suitable for hot drinks?",
        answer: "Yes, though let the piece warm gradually rather than pouring boiling water into a cold cup.",
      },
    ],
    complements: ["terra-hand-thrown-vase", "vesper-scented-candle", "mirena-bud-vase"],
    moods: ["home", "calm", "gift"],
    occasions: ["housewarming", "wedding", "holiday"],
    recipients: ["for the home", "for a couple", "under 250"],
    keyword: "stoneware carafe and cup set",
    metaDescription:
      "Onda stoneware carafe with two cups — a 750 ml bedside set with a satin glaze, made in Japan.",
  },
  {
    slug: "mirena-bud-vase",
    sku: "VRN-CH-408",
    name: "Mirena Bud Vase",
    subtitle: "Porcelain · single stem",
    shortDescription: "Small enough for a windowsill, heavy enough not to tip.",
    categorySlug: "ceramics-home",
    collectionSlugs: ["essentials", "the-gift-edit", "new-arrivals"],
    priceCents: 8500,
    compareAtCents: 9800,
    releasedAt: "2026-01-30",
    salesRank: 15,
    stock: 30,
    colors: [
      { id: "bone", name: "Bone", hex: "#e8e0d2" },
      { id: "ash", name: "Ash", hex: "#b8ada0" },
    ],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(11410238),
        alt: "Mirena bud vase in bone porcelain holding small flowers",
        kind: "primary",
      },
      {
        url: px(9858439),
        alt: "Mirena bud vase with dried poppies in studio light",
        kind: "alternate",
      },
      {
        url: px(13370451),
        alt: "Close detail of the Mirena porcelain surface",
        kind: "detail",
      },
    ],
    story: [
      "Slip-cast in porcelain with a thick, weighted base — the trick that lets a 12 cm vase hold a long stem without falling over.",
      "The most given piece in the atelier, and the one most often bought in threes.",
    ],
    materials: ["Fine porcelain", "Satin exterior, glazed interior"],
    specifications: [
      { label: "Dimensions", value: "H 12 cm × Ø 6 cm" },
      { label: "Opening", value: "2 cm" },
      { label: "Origin", value: "Made in Japan" },
    ],
    care: ceramicCare,
    shippingNote: "In stock · gift wrapping available",
    faqs: [
      {
        question: "Does it work in a set?",
        answer: "Yes — the profile is drawn so two or three can be grouped at different heights.",
      },
    ],
    complements: ["terra-hand-thrown-vase", "onda-carafe-set", "sable-cashmere-wrap"],
    moods: ["home", "small gift", "calm"],
    occasions: ["thank you", "housewarming", "just because"],
    recipients: ["for the home", "under 250", "for a friend"],
    keyword: "porcelain bud vase",
    metaDescription:
      "Mirena porcelain bud vase, 12 cm with a weighted base for single stems — slip-cast in Japan.",
  },
  {
    slug: "ember-no-4-eau-de-parfum",
    sku: "VRN-FL-501",
    name: "Ember No. 4 Eau de Parfum",
    subtitle: "Cade · iris · warm stone · 50 ml",
    shortDescription: "The smell of a stone wall an hour after the sun has left it.",
    categorySlug: "fragrance-light",
    collectionSlugs: ["signature-collection", "best-sellers", "the-gift-edit"],
    priceCents: 21000,
    releasedAt: "2025-10-22",
    salesRank: 14,
    stock: 26,
    colors: [{ id: "amber", name: "Amber Glass", hex: "#b98d5f" }],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(33711974),
        alt: "Ember No. 4 eau de parfum bottle casting a soft shadow on warm stone",
        kind: "primary",
      },
      {
        url: px(27357173),
        alt: "Ember No. 4 bottle photographed in bright directional light",
        kind: "alternate",
      },
      {
        url: px(10266704),
        alt: "Ember No. 4 styled on a table with roses and a magazine",
        kind: "lifestyle",
      },
    ],
    story: [
      "Composed in Grasse over fourteen months against a single reference: warm limestone in late afternoon.",
      "Cade smoke opens it, iris holds the middle, and a mineral ambergris accord keeps it close to the skin rather than filling a room.",
    ],
    materials: ["Eau de parfum, 18% concentration", "Refillable glass flacon"],
    specifications: [
      { label: "Volume", value: "50 ml" },
      { label: "Family", value: "Woody mineral" },
      { label: "Notes", value: "Cade, pink pepper · iris, immortelle · ambergris, cedar" },
      { label: "Longevity", value: "6–8 hours, close wear" },
      { label: "Origin", value: "Composed and bottled in France" },
    ],
    care: scentCare,
    shippingNote: "Ships by ground transport · not sent by air",
    faqs: [
      {
        question: "Is a refill available?",
        answer:
          "Yes — a 50 ml refill decants into the original flacon and is priced below the first purchase.",
      },
      {
        question: "Is it unisex?",
        answer: "It is composed without a gender brief; the mineral base reads the same on most skin.",
      },
    ],
    complements: ["vesper-scented-candle", "marin-card-holder", "atelier-hand-ritual"],
    moods: ["evening", "warm", "signature"],
    occasions: ["anniversary", "birthday", "holiday"],
    recipients: ["for her", "for him", "under 250"],
    keyword: "woody mineral eau de parfum",
    metaDescription:
      "Ember No. 4 eau de parfum — cade, iris and warm stone in an 18% concentration, composed in Grasse. 50 ml refillable.",
  },
  {
    slug: "vesper-scented-candle",
    sku: "VRN-FL-505",
    name: "Vesper Scented Candle",
    subtitle: "Fig leaf · dry cedar · 220 g",
    shortDescription: "Fig leaf and dry cedar in a vessel worth keeping when the wax is gone.",
    categorySlug: "fragrance-light",
    collectionSlugs: ["the-gift-edit", "essentials", "limited-edition"],
    priceCents: 9500,
    compareAtCents: 11000,
    releasedAt: "2025-11-18",
    salesRank: 16,
    stock: 4,
    finalSale: true,
    badge: "Limited",
    colors: [{ id: "ash", name: "Ash Ceramic", hex: "#b8ada0" }],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(34997528),
        alt: "Vesper candle in an ash ceramic vessel beside a minimal arrangement",
        kind: "primary",
      },
      {
        url: px(31935726),
        alt: "Vesper candle lit beside a ceramic vase with olive branches",
        kind: "alternate",
      },
    ],
    story: [
      "Poured into the same stoneware our vases are thrown from, in a run of four hundred. When the wax is finished the vessel becomes a brush pot.",
      "A coconut and rapeseed wax blend — no paraffin, no dye.",
    ],
    materials: ["Coconut and rapeseed wax", "Braided cotton wick", "Stoneware vessel"],
    specifications: [
      { label: "Weight", value: "220 g" },
      { label: "Burn time", value: "Approximately 48 hours" },
      { label: "Notes", value: "Fig leaf, green mandarin · cedar, vetiver" },
      { label: "Edition", value: "Limited run of 400" },
      { label: "Origin", value: "Poured in Portugal" },
    ],
    care: scentCare,
    shippingNote: "Limited edition · final sale",
    faqs: [
      {
        question: "Will it be restocked?",
        answer:
          "No. Limited Edition pieces are produced once. The fig leaf accord may return in a different format.",
      },
    ],
    complements: ["ember-no-4-eau-de-parfum", "terra-hand-thrown-vase", "sable-cashmere-wrap"],
    moods: ["home", "calm", "gift"],
    occasions: ["housewarming", "thank you", "holiday"],
    recipients: ["for the home", "under 250", "for a friend"],
    keyword: "fig leaf scented candle",
    metaDescription:
      "Vesper scented candle — fig leaf and dry cedar in a stoneware vessel, 220 g, limited run of 400.",
  },
  {
    slug: "atelier-hand-ritual",
    sku: "VRN-FL-509",
    name: "Atelier Hand & Body Ritual",
    subtitle: "Wash and balm duo",
    shortDescription: "A wash and a balm scented with the atelier itself — cotton, cedar, clean soap.",
    categorySlug: "fragrance-light",
    collectionSlugs: ["essentials", "the-gift-edit"],
    priceCents: 11000,
    releasedAt: "2025-12-12",
    salesRank: 17,
    stock: 28,
    colors: [{ id: "bone", name: "Bone Glass", hex: "#e8e0d2" }],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(7005940),
        alt: "Atelier hand wash bottle photographed on warm brown paper",
        kind: "primary",
      },
      {
        url: px(4202328),
        alt: "Atelier hand and body ritual bottles on a pale marble shelf",
        kind: "alternate",
      },
    ],
    story: [
      "Made for the basin at the back of the workshop, where hands are washed twenty times a day and dry out by three o'clock.",
      "The balm is heavy on shea and light on scent so it can be worn under fragrance.",
    ],
    materials: ["Sulphate-free wash, 300 ml", "Shea and squalane balm, 200 ml", "Refill pouches available"],
    specifications: [
      { label: "Set", value: "Wash 300 ml + balm 200 ml" },
      { label: "Notes", value: "Cotton, cedar, clean soap" },
      { label: "Formulation", value: "Sulphate-free, vegan" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: ["Store away from direct sunlight.", "Refill pouches reduce packaging by 78%."],
    shippingNote: "In stock · refills available",
    faqs: [
      {
        question: "Is it suitable for sensitive skin?",
        answer:
          "It is formulated without sulphates or synthetic dye. As with any product, patch test if your skin is reactive.",
      },
    ],
    complements: ["ember-no-4-eau-de-parfum", "vesper-scented-candle", "onda-carafe-set"],
    moods: ["home", "everyday", "small gift"],
    occasions: ["housewarming", "thank you", "just because"],
    recipients: ["for the home", "under 250", "for a parent"],
    keyword: "hand wash and balm set",
    metaDescription:
      "Atelier hand and body ritual — a sulphate-free wash and shea balm scented with cotton, cedar and clean soap.",
  },
  {
    slug: "camille-wool-coat",
    sku: "VRN-WW-601",
    name: "Camille Double-Face Wool Coat",
    subtitle: "Unlined double-face · dropped shoulder",
    shortDescription:
      "A long coat cut from one layer of double-face wool — no lining, no padding, just cloth and a good shoulder.",
    categorySlug: "womenswear",
    collectionSlugs: ["the-wardrobe", "new-arrivals", "best-sellers"],
    priceCents: 39000,
    compareAtCents: 45000,
    releasedAt: "2026-02-10",
    salesRank: 18,
    stock: 12,
    badge: "New",
    colors: [
      { id: "camel", name: "Camel", hex: "#b58e63" },
      { id: "charcoal", name: "Charcoal", hex: "#33302c" },
    ],
    sizes: apparelSizes,
    sizeType: "apparel",
    images: [
      {
        url: px(11718661),
        alt: "Camille double-face wool coat in warm camel worn over tailoring",
        kind: "primary",
      },
      {
        url: px(28497012),
        alt: "Camille coat in bone against pale architecture",
        kind: "alternate",
      },
      {
        url: px(28497023),
        alt: "Camille coat worn on a city street at dusk",
        kind: "lifestyle",
      },
    ],
    story: [
      "Double-face means two layers of wool are woven together and the seams are opened by hand — there is no lining to wrinkle and nothing to add weight.",
      "The shoulder is dropped three centimetres so the coat sits over tailoring without pulling. It is the piece that convinced us to open the wardrobe half of the house.",
    ],
    materials: ["100% Italian double-face wool", "Hand-finished interior seams", "Horn buttons"],
    specifications: [
      { label: "Length", value: "104 cm in size M" },
      { label: "Fit", value: "Relaxed — take your usual size" },
      { label: "Closure", value: "Three-button single breast" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: [
      "Brush after wear; air rather than wash.",
      "Dry clean sparingly — once a season is enough.",
      "Store on a wide hanger in the cotton cover provided.",
    ],
    shippingNote: "New arrival · dispatched within 24 hours",
    faqs: [
      {
        question: "Is it warm enough for winter?",
        answer:
          "Double-face wool is a mid-season weight — ideal over knitwear down to around freezing, rather than a substitute for a parka.",
      },
    ],
    complements: ["sable-cashmere-wrap", "oslo-penny-loafer", "aveline-structured-tote"],
    moods: ["tailored", "structured", "everyday"],
    occasions: ["new job", "holiday", "milestone"],
    recipients: ["for her"],
    keyword: "double face wool coat women",
    metaDescription:
      "Camille double-face wool coat — unlined, hand-finished, dropped shoulder, 104 cm length. Made in Portugal from Italian double-face wool.",
  },
  {
    slug: "margaux-tailored-blazer",
    sku: "VRN-WW-604",
    name: "Margaux Tailored Blazer",
    subtitle: "Half-canvas · single button",
    shortDescription:
      "A single-button blazer with a half-canvas chest — sharp at a desk, easy over a dress.",
    categorySlug: "womenswear",
    collectionSlugs: ["the-wardrobe", "essentials"],
    priceCents: 32000,
    releasedAt: "2025-12-18",
    salesRank: 20,
    stock: 15,
    colors: [
      { id: "ivory", name: "Ivory", hex: "#efe7d9" },
      { id: "charcoal", name: "Charcoal", hex: "#33302c" },
    ],
    sizes: apparelSizes,
    sizeType: "apparel",
    images: [
      {
        url: px(8484013),
        alt: "Margaux tailored blazer in ivory worn as a two-piece suit",
        kind: "primary",
      },
      {
        url: px(16564570),
        alt: "Margaux blazer in warm beige under candlelight",
        kind: "alternate",
      },
    ],
    story: [
      "A blazer should look composed, not perform. We built the Margaux on a half-canvas chest so it keeps its line without armour — one button, one vent, no shoulder pad.",
    ],
    materials: ["Italian wool twill, 320 g", "Half-canvas chest", "Cupro lining"],
    specifications: [
      { label: "Length", value: "70 cm in size M" },
      { label: "Buttons", value: "Single button, horn" },
      { label: "Vents", value: "Single back vent" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: ["Dry clean only.", "Rest on a shaped hanger between wears."],
    shippingNote: "In stock · dispatched within 24 hours",
    faqs: [
      {
        question: "How should it fit?",
        answer:
          "True to size through the shoulder. The waist is softly shaped rather than nipped — size up only if you plan heavy layering.",
      },
    ],
    complements: ["iris-silk-blouse", "elliot-tailored-trousers", "solene-crescent-bag"],
    moods: ["tailored", "workwear", "structured"],
    occasions: ["new job", "milestone", "wedding guest"],
    recipients: ["for her", "for a colleague"],
    keyword: "tailored blazer women",
    metaDescription:
      "Margaux tailored blazer — half-canvas, single button, Italian wool twill. A sharp everyday blazer made in Portugal.",
  },
  {
    slug: "iris-silk-blouse",
    sku: "VRN-WW-607",
    name: "Iris Silk Blouse",
    subtitle: "Crepe de chine · concealed placket",
    shortDescription:
      "A blouse with nothing on it but drape — hidden buttons, a soft collar, silk against the skin.",
    categorySlug: "womenswear",
    collectionSlugs: ["the-wardrobe", "new-arrivals"],
    priceCents: 16500,
    releasedAt: "2026-01-28",
    salesRank: 22,
    stock: 18,
    colors: [
      { id: "bone", name: "Bone", hex: "#e8e0d2" },
      { id: "sand", name: "Sand", hex: "#d9c9b0" },
    ],
    sizes: apparelSizes,
    sizeType: "apparel",
    images: [
      {
        url: px(11044912),
        alt: "Iris silk blouse in bone with sleeves rolled once",
        kind: "primary",
      },
      {
        url: px(19222080),
        alt: "Iris blouse styled for a studio shoot",
        kind: "alternate",
      },
    ],
    story: [
      "Cut on the bias so it follows the body without clinging, and finished with a concealed placket — the only visible detail is a mother-of-pearl button at the cuff.",
    ],
    materials: ["100% silk crepe de chine, 16 momme", "Mother-of-pearl buttons"],
    specifications: [
      { label: "Length", value: "62 cm in size M" },
      { label: "Collar", value: "Soft stand collar" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: ["Hand wash cool with a silk detergent.", "Dry flat; iron on the reverse while damp."],
    shippingNote: "In stock · dispatched within 24 hours",
    faqs: [
      {
        question: "Is it sheer?",
        answer: "Bone is opaque in normal light but benefits from a skin-tone base layer in bright sun.",
      },
    ],
    complements: ["margaux-tailored-blazer", "elodie-pleated-skirt", "filo-chain-necklace"],
    moods: ["romantic", "minimal", "everyday"],
    occasions: ["wedding guest", "birthday", "new job"],
    recipients: ["for her"],
    keyword: "silk blouse women",
    metaDescription:
      "Iris silk blouse in 16-momme crepe de chine with a concealed placket and mother-of-pearl buttons — cut on the bias.",
  },
  {
    slug: "elodie-pleated-skirt",
    sku: "VRN-WW-610",
    name: "Élodie Pleated Skirt",
    subtitle: "Knife pleats · side zip",
    shortDescription:
      "A long pleated skirt that moves well and wears like a neutral — from the studio to dinner.",
    categorySlug: "womenswear",
    collectionSlugs: ["the-wardrobe"],
    priceCents: 17500,
    releasedAt: "2026-02-04",
    salesRank: 24,
    stock: 14,
    colors: [
      { id: "ivory", name: "Ivory", hex: "#efe7d9" },
      { id: "cocoa", name: "Cocoa", hex: "#6d4b38" },
    ],
    sizes: apparelSizes,
    sizeType: "apparel",
    images: [
      {
        url: px(5393765),
        alt: "Élodie pleated skirt in ivory worn with a beige top",
        kind: "primary",
      },
      {
        url: px(28497021),
        alt: "Élodie skirt styled with a winter coat outdoors",
        kind: "alternate",
      },
    ],
    story: [
      "Pleats stitched from the waist to the hip so they hold their knife edge through the season, then left open below — structured where it matters, fluid where it should be.",
    ],
    materials: ["Italian viscose-poly blend with weight", "Set-in waistband, side zip"],
    specifications: [
      { label: "Length", value: "86 cm in size M" },
      { label: "Waistband", value: "3 cm set-in" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: ["Machine wash cold inside out.", "Hang to dry; steam the pleats back in."],
    shippingNote: "In stock · dispatched within 24 hours",
    faqs: [
      {
        question: "Will the pleats hold after washing?",
        answer:
          "Yes — steam the skirt while hanging and the set-in stitching pulls each pleat back into line.",
      },
    ],
    complements: ["iris-silk-blouse", "lyon-ankle-boot", "solene-crescent-bag"],
    moods: ["romantic", "evening", "everyday"],
    occasions: ["wedding guest", "birthday", "holiday"],
    recipients: ["for her"],
    keyword: "pleated midi skirt women",
    metaDescription:
      "Élodie pleated skirt — knife pleats set from waist to hip, 86 cm length, Italian cloth. Made in Portugal.",
  },
  {
    slug: "arden-oxford-shirt",
    sku: "VRN-MW-701",
    name: "Arden Oxford Shirt",
    subtitle: "Brushed cotton · one-piece collar",
    shortDescription:
      "The shirt that works five days in a row — brushed oxford, a collar that stays put, buttons that outlast the fabric.",
    categorySlug: "menswear",
    collectionSlugs: ["the-wardrobe", "essentials", "new-arrivals"],
    priceCents: 14500,
    releasedAt: "2026-02-14",
    salesRank: 19,
    stock: 26,
    badge: "New",
    colors: [
      { id: "white", name: "White", hex: "#f2efe9" },
      { id: "sky", name: "Faded Sky", hex: "#a9b7c4" },
    ],
    sizes: apparelSizes,
    sizeType: "apparel",
    images: [
      {
        url: px(36700243),
        alt: "Arden oxford shirt in white worn open-necked in a modern interior",
        kind: "primary",
      },
      {
        url: px(15299312),
        alt: "Arden oxford shirt styled in a studio",
        kind: "alternate",
      },
    ],
    story: [
      "Oxford cloth brushed once, not twice — soft enough for a bare neck, sturdy enough for a jacket. The collar is cut in one piece so it never rolls over and dies.",
    ],
    materials: ["100% brushed oxford cotton", "Reinforced mother-of-pearl buttons"],
    specifications: [
      { label: "Fit", value: "Regular — true to size" },
      { label: "Collar", value: "One-piece button-down" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: ["Machine wash warm, hang to dry.", "Iron while slightly damp."],
    shippingNote: "In stock · dispatched within 24 hours",
    faqs: [
      {
        question: "Does it shrink?",
        answer: "The cloth is pre-washed; expect no more than one per cent movement, already allowed for in the pattern.",
      },
    ],
    complements: ["lowell-wool-overshirt", "elliot-tailored-trousers", "rive-field-watch-40"],
    moods: ["everyday", "workwear", "minimal"],
    occasions: ["new job", "graduation", "just because"],
    recipients: ["for him"],
    keyword: "oxford shirt men",
    metaDescription:
      "Arden oxford shirt in brushed cotton with a one-piece button-down collar — the everyday shirt, made in Portugal.",
  },
  {
    slug: "lowell-wool-overshirt",
    sku: "VRN-MW-704",
    name: "Lowell Wool Overshirt",
    subtitle: "Brushed wool · shirt-jacket",
    shortDescription:
      "Halfway between a shirt and a jacket — brushed wool, patch pockets, sleeves that roll properly.",
    categorySlug: "menswear",
    collectionSlugs: ["the-wardrobe"],
    priceCents: 26000,
    compareAtCents: 30000,
    releasedAt: "2025-11-20",
    salesRank: 21,
    stock: 11,
    colors: [
      { id: "camel", name: "Camel", hex: "#b58e63" },
      { id: "charcoal", name: "Charcoal", hex: "#33302c" },
    ],
    sizes: apparelSizes,
    sizeType: "apparel",
    images: [
      {
        url: px(38697606),
        alt: "Lowell wool overshirt in warm grey with patch pockets",
        kind: "primary",
      },
      {
        url: px(8605789),
        alt: "Lowell overshirt layered over a shirt in studio light",
        kind: "alternate",
      },
    ],
    story: [
      "The garment that replaced the light jacket in our own wardrobes. Woven from brushed wool flannel with enough weight to hold a collar up and enough give to roll the sleeves twice.",
    ],
    materials: ["Italian brushed wool flannel", "Corozo nut buttons"],
    specifications: [
      { label: "Fit", value: "Regular — room for one layer" },
      { label: "Pockets", value: "Two patch, one internal" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: ["Brush between wears.", "Dry clean once a season."],
    shippingNote: "In stock · dispatched within 24 hours",
    faqs: [
      {
        question: "How warm is it?",
        answer: "A true mid-layer — over an oxford shirt it covers everything from late autumn to early spring.",
      },
    ],
    complements: ["arden-oxford-shirt", "elliot-tailored-trousers", "nox-manual-watch-38"],
    moods: ["layering", "everyday", "cosy"],
    occasions: ["holiday", "just because", "milestone"],
    recipients: ["for him", "for a parent"],
    keyword: "wool overshirt men",
    metaDescription:
      "Lowell wool overshirt in Italian brushed flannel with corozo buttons — a shirt-jacket for every cool day, made in Portugal.",
  },
  {
    slug: "elliot-tailored-trousers",
    sku: "VRN-MW-707",
    name: "Elliot Tailored Trousers",
    subtitle: "Pleated · tapered leg",
    shortDescription:
      "A single forward pleat and a leg that tapers without narrowing — the trouser every blazer deserves.",
    categorySlug: "menswear",
    collectionSlugs: ["the-wardrobe", "essentials"],
    priceCents: 19000,
    compareAtCents: 22000,
    releasedAt: "2025-12-02",
    salesRank: 23,
    stock: 17,
    colors: [
      { id: "charcoal", name: "Charcoal", hex: "#33302c" },
      { id: "sand", name: "Sand", hex: "#d9c9b0" },
    ],
    sizes: apparelSizes,
    sizeType: "apparel",
    images: [
      {
        url: px(7764008),
        alt: "Elliot tailored trousers in charcoal worn on a stool",
        kind: "primary",
      },
      {
        url: px(36700226),
        alt: "Elliot trousers styled with a dark blazer",
        kind: "alternate",
      },
    ],
    story: [
      "Cut with a single forward pleat and a high rise, then tapered to a clean 18 cm opening. Belt loops removed in favour of side adjusters — one less thing to fidget with.",
    ],
    materials: ["Italian wool-blend twill", "Side adjusters", "Extended waistband tab"],
    specifications: [
      { label: "Rise", value: "High — sits at the natural waist" },
      { label: "Hem", value: "18 cm · 5 cm inlay for alteration" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: ["Dry clean only.", "Hang from the hem clips provided."],
    shippingNote: "In stock · dispatched within 24 hours",
    faqs: [
      {
        question: "Can the length be altered?",
        answer: "Yes — there is a 5 cm inlay. Your local tailor can adjust the hem in twenty minutes.",
      },
    ],
    complements: ["margaux-tailored-blazer", "arden-oxford-shirt", "oslo-penny-loafer"],
    moods: ["workwear", "tailored", "everyday"],
    occasions: ["new job", "wedding guest", "graduation"],
    recipients: ["for him"],
    keyword: "tailored trousers men",
    metaDescription:
      "Elliot tailored trousers — single forward pleat, tapered 18 cm hem, side adjusters. Italian cloth, made in Portugal.",
  },
  {
    slug: "oslo-penny-loafer",
    sku: "VRN-FW-801",
    name: "Oslo Penny Loafer",
    subtitle: "Blake-stitched · calf upper",
    shortDescription:
      "A loafer that goes from tailoring to denim without a costume change — blake-stitched so it can be resoled.",
    categorySlug: "footwear",
    collectionSlugs: ["the-wardrobe", "new-arrivals", "best-sellers"],
    priceCents: 33000,
    compareAtCents: 38000,
    releasedAt: "2026-02-06",
    salesRank: 25,
    stock: 9,
    badge: "New",
    colors: [
      { id: "cognac", name: "Cognac", hex: "#8f5c33" },
      { id: "black", name: "Black", hex: "#26241f" },
    ],
    sizes: shoeSizes,
    sizeType: "shoe",
    images: [
      {
        url: px(25381178),
        alt: "Oslo penny loafer in cognac leather on a dark ground",
        kind: "primary",
      },
      {
        url: px(34871894),
        alt: "Oslo penny loafer in black photographed in low light",
        kind: "alternate",
      },
      {
        url: px(32776950),
        alt: "Detail of the Oslo suede tassel finish",
        kind: "detail",
      },
    ],
    story: [
      "Built on a last we have used for four years — a rounded toe with just enough of a point to read formal. The blake stitch runs through the sole so any cobbler can resole it forever.",
    ],
    materials: ["Full-grain calf upper", "Blake-stitched construction", "Vegetable-tanned leather sole"],
    specifications: [
      { label: "Last", value: "Oslo 04 — true to size" },
      { label: "Heel", value: "2.5 cm stacked leather" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: [
      "Rest 24 hours between wears with shoe trees.",
      "Resole at any cobbler — the blake stitch is designed for it.",
    ],
    shippingNote: "New arrival · low stock",
    faqs: [
      {
        question: "Do they fit true to size?",
        answer:
          "Yes — the Oslo 04 last runs true. If you are between sizes, take the next EU size up.",
      },
    ],
    complements: ["arden-oxford-shirt", "elliot-tailored-trousers", "nox-manual-watch-38"],
    moods: ["tailored", "everyday", "workwear"],
    occasions: ["new job", "graduation", "milestone"],
    recipients: ["for him", "for a colleague"],
    keyword: "leather penny loafer",
    metaDescription:
      "Oslo penny loafer — full-grain calf on a blake-stitched leather sole, made to be resoled. Made in Portugal.",
  },
  {
    slug: "lyon-ankle-boot",
    sku: "VRN-FW-804",
    name: "Lyon Leather Ankle Boot",
    subtitle: "Storm-welted · single run",
    shortDescription:
      "A plain-toe ankle boot from a single hide order — storm-welted against weather, endlessly resolable.",
    categorySlug: "footwear",
    collectionSlugs: ["the-wardrobe", "limited-edition"],
    priceCents: 42000,
    releasedAt: "2025-12-22",
    salesRank: 26,
    stock: 4,
    finalSale: true,
    badge: "Limited",
    colors: [
      { id: "black", name: "Black", hex: "#26241f" },
      { id: "tan", name: "Tan", hex: "#c69a6d" },
    ],
    sizes: shoeSizes,
    sizeType: "shoe",
    images: [
      {
        url: px(35654956),
        alt: "Lyon ankle boot in black on a minimalist display",
        kind: "primary",
      },
      {
        url: px(30229961),
        alt: "Lyon ankle boot in brown on a wooden crate",
        kind: "alternate",
      },
      {
        url: px(35654976),
        alt: "Close view of the Lyon boot's storm welt",
        kind: "detail",
      },
    ],
    story: [
      "Made from a single hide order we could not repeat — forty pairs, no more. The storm welt is stitched through the upper and the midsole, which is why it survives weather the way it does.",
    ],
    materials: ["Full-grain steer upper", "Storm-welted construction", "Commando sole, resoleable"],
    specifications: [
      { label: "Shaft", value: "14 cm" },
      { label: "Sole", value: "Commando lug, 3 cm" },
      { label: "Edition", value: "Single run of 40 pairs" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: ["Brush after wear.", "Condition twice a season with a neutral balm."],
    shippingNote: "Limited edition · final sale",
    faqs: [
      {
        question: "Will this boot be restocked?",
        answer:
          "No. Limited Edition pieces are produced once — the hide for this run cannot be ordered again.",
      },
    ],
    complements: ["elliot-tailored-trousers", "lowell-wool-overshirt", "sable-cashmere-wrap"],
    moods: ["structured", "everyday", "workwear"],
    occasions: ["holiday", "milestone", "just because"],
    recipients: ["for him"],
    keyword: "leather ankle boot men",
    metaDescription:
      "Lyon leather ankle boot — storm-welted on a commando sole, a single run of forty pairs. Limited edition, final sale.",
  },
  {
    slug: "calvi-court-sneaker",
    sku: "VRN-FW-807",
    name: "Calvi Court Sneaker",
    subtitle: "Calf upper · cup sole",
    shortDescription:
      "The white sneaker, done properly — Italian calf, a cup sole that stays white, nothing stitched on the side.",
    categorySlug: "footwear",
    collectionSlugs: ["the-wardrobe", "essentials"],
    priceCents: 24000,
    compareAtCents: 28000,
    releasedAt: "2025-10-16",
    salesRank: 27,
    stock: 21,
    colors: [{ id: "white", name: "White", hex: "#f2efe9" }],
    sizes: shoeSizes,
    sizeType: "shoe",
    images: [
      {
        url: px(7193629),
        alt: "Calvi court sneaker in white calf on a wooden chair",
        kind: "primary",
      },
      {
        url: px(7193625),
        alt: "Calvi court sneakers from above on a pale floor",
        kind: "alternate",
      },
    ],
    story: [
      "No logos, no contrast stitching, no tricks — just a clean last and a sole that is pressed, not glued, so the cup stays white after a season of pavements.",
    ],
    materials: ["Italian calf upper", "Pressed cup sole", "Removable leather insole"],
    specifications: [
      { label: "Last", value: "Calvi 02 — true to size" },
      { label: "Sole", value: "3 cm pressed cup" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    care: ["Wipe with a damp cloth.", "Avoid machine washing — the calf will thank you."],
    shippingNote: "In stock · dispatched within 24 hours",
    faqs: [
      {
        question: "Will the sole yellow over time?",
        answer: "The pressed cup sole is formulated against UV yellowing; keep them out of direct sun in storage.",
      },
    ],
    complements: ["arden-oxford-shirt", "elliot-tailored-trousers", "marin-card-holder"],
    moods: ["everyday", "minimal", "playful"],
    occasions: ["just because", "holiday", "graduation"],
    recipients: ["for him", "for her"],
    keyword: "white leather sneakers",
    metaDescription:
      "Calvi court sneaker — Italian calf on a pressed cup sole, free of logos and built to stay white. Made in Portugal.",
  },
  {
    slug: "nox-manual-watch-38",
    sku: "VRN-TP-901",
    name: "Nox Manual Watch · 38 mm",
    subtitle: "Hand-wound · sapphire crystal",
    shortDescription:
      "A dress watch you wind each morning — Swiss manual movement, sapphire glass, a dial with nothing unnecessary on it.",
    categorySlug: "timepieces",
    collectionSlugs: ["new-arrivals", "the-gift-edit", "best-sellers"],
    priceCents: 62000,
    compareAtCents: 69000,
    releasedAt: "2026-02-12",
    salesRank: 28,
    stock: 7,
    badge: "New",
    colors: [
      { id: "gold", name: "Gold / Black", hex: "#c9a227" },
      { id: "silver", name: "Silver / Ivory", hex: "#cfc9bd" },
    ],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(8364554),
        alt: "Nox manual watch with gold case and black strap on a wooden tray",
        kind: "primary",
      },
      {
        url: px(5659200),
        alt: "Nox watch photographed from above with a signet ring",
        kind: "alternate",
      },
      {
        url: px(31050002),
        alt: "Nox watch beside a vintage book in soft light",
        kind: "lifestyle",
      },
    ],
    story: [
      "Thirty-eight millimetres, hand-wound, forty-two hours of reserve. Winding it each morning is the point — a small ritual in a world that sets itself.",
      "The movement is a Swiss manual calibre; the strap is Italian calf that will darken like any good leather.",
    ],
    materials: ["Swiss manual-wind movement, 42 h reserve", "Sapphire crystal", "Italian calf strap, quick-release"],
    specifications: [
      { label: "Case", value: "38 mm · brushed steel or PVD gold" },
      { label: "Glass", value: "Domed sapphire" },
      { label: "Water resistance", value: "5 ATM" },
      { label: "Strap", value: "18 mm Italian calf, quick-release" },
      { label: "Origin", value: "Assembled in Portugal" },
    ],
    care: [
      "Service every five years — any qualified watchmaker can work on the calibre.",
      "Wipe the strap with a dry cloth; avoid prolonged soaking.",
    ],
    shippingNote: "New arrival · low stock",
    faqs: [
      {
        question: "How often should it be wound?",
        answer:
          "The 42-hour reserve means every other morning is enough, though most owners wind it daily out of habit.",
      },
      {
        question: "Is the movement repairable?",
        answer:
          "Yes — it is a standard manual calibre, chosen precisely because any watchmaker can service it.",
      },
    ],
    complements: ["marin-card-holder", "solene-signet-ring", "lune-silk-scarf"],
    moods: ["minimal", "heirloom", "evening"],
    occasions: ["milestone", "anniversary", "graduation"],
    recipients: ["for him", "for her", "for a parent"],
    keyword: "hand wound dress watch",
    metaDescription:
      "Nox manual watch, 38 mm — Swiss hand-wound movement, sapphire crystal, Italian calf strap. Assembled in Portugal.",
  },
  {
    slug: "rive-field-watch-40",
    sku: "VRN-TP-904",
    name: "Rive Field Watch · 40 mm",
    subtitle: "Automatic · every day",
    shortDescription:
      "A forty-millimetre automatic built to be worn, knocked and forgotten about — brushed steel, legible dial, fifty metres.",
    categorySlug: "timepieces",
    collectionSlugs: ["the-gift-edit"],
    priceCents: 48000,
    releasedAt: "2025-11-06",
    salesRank: 29,
    stock: 10,
    colors: [
      { id: "brown", name: "Brown Strap", hex: "#6d4b38" },
      { id: "black", name: "Black Strap", hex: "#26241f" },
    ],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(31050001),
        alt: "Rive field watch with brown strap beside a hardcover book",
        kind: "primary",
      },
      {
        url: px(31050003),
        alt: "Rive field watch with black strap in monochrome light",
        kind: "alternate",
      },
    ],
    story: [
      "The Rive is the watch we designed first and released last — everything else taught us what to leave off it. No date window, no bezel text, nothing to break.",
    ],
    materials: ["Swiss automatic movement, 38 h reserve", "Brushed 316L steel case", "Sapphire crystal"],
    specifications: [
      { label: "Case", value: "40 mm brushed 316L steel" },
      { label: "Water resistance", value: "5 ATM" },
      { label: "Strap", value: "20 mm Italian calf, quick-release" },
      { label: "Origin", value: "Assembled in Portugal" },
    ],
    care: ["Service every five years.", "Rinse with fresh water after salt exposure."],
    shippingNote: "In stock · gift wrapping available",
    faqs: [
      {
        question: "Is it suitable as an everyday watch?",
        answer:
          "That is exactly what it is for — brushed steel hides marks, sapphire hides scratches, and the calibre is serviceable anywhere.",
      },
    ],
    complements: ["marin-card-holder", "arden-oxford-shirt", "atelier-hand-ritual"],
    moods: ["everyday", "minimal", "heirloom"],
    occasions: ["milestone", "graduation", "birthday"],
    recipients: ["for him", "under 250", "for a parent"],
    keyword: "automatic field watch",
    metaDescription:
      "Rive field watch, 40 mm — Swiss automatic movement in brushed steel, legible dial, fifty metres. Assembled in Portugal.",
  },
  {
    slug: "lin-linen-throw",
    sku: "VRN-HL-610",
    name: "Lin Washed Linen Throw",
    subtitle: "Stonewashed · 140 × 180 cm",
    shortDescription:
      "Linen washed until it feels ten years old — the throw a sofa gathers around.",
    categorySlug: "ceramics-home",
    collectionSlugs: ["the-gift-edit", "essentials"],
    priceCents: 18000,
    compareAtCents: 21000,
    releasedAt: "2025-10-28",
    salesRank: 30,
    stock: 16,
    colors: [
      { id: "oat", name: "Oat", hex: "#d9c9b0" },
      { id: "fog", name: "Fog", hex: "#c3bfb6" },
    ],
    sizes: oneSize,
    sizeType: "one-size",
    images: [
      {
        url: px(27515146),
        alt: "Lin washed linen throw draped over a neutral sofa",
        kind: "primary",
      },
      {
        url: px(27515153),
        alt: "Lin throw folded at the foot of a bed",
        kind: "alternate",
      },
      {
        url: px(30380632),
        alt: "Lin throw in a bright, calm living room",
        kind: "lifestyle",
      },
    ],
    story: [
      "Woven in Portugal from European flax and stonewashed four times — the finish that usually takes years of use arrives on day one.",
      "It works on a sofa, at the foot of a bed, or across your knees on a late flight.",
    ],
    materials: ["100% European flax linen", "Stonewashed finish", "Hand-twisted fringe"],
    specifications: [
      { label: "Dimensions", value: "140 × 180 cm" },
      { label: "Weight", value: "720 g" },
      { label: "Origin", value: "Woven in Portugal" },
    ],
    care: ["Machine wash cool, line dry.", "Steam to restore the drape."],
    shippingNote: "In stock · gift wrapping available",
    faqs: [
      {
        question: "Does linen shed?",
        answer:
          "Minimal after the first wash — the stonewashing removes loose fibre before it reaches you.",
      },
    ],
    complements: ["vesper-scented-candle", "terra-hand-thrown-vase", "onda-carafe-set"],
    moods: ["home", "calm", "cosy"],
    occasions: ["housewarming", "wedding", "thank you"],
    recipients: ["for the home", "for a couple", "under 250"],
    keyword: "washed linen throw blanket",
    metaDescription:
      "Lin washed linen throw, 140 × 180 cm — stonewashed European flax with hand-twisted fringe. Woven in Portugal.",
  },
];

export const COLLECTIONS: Collection[] = [
  {
    slug: "new-arrivals",
    name: "New Arrivals",
    tagline: "The pieces that just left the atelier",
    intro: [
      "Small runs, released as they are finished rather than by season. What is here now is what came off the bench this month.",
    ],
    storyTitle: "Made in the order they were finished",
    story: [
      "We do not hold stock back for a launch date. A run of forty scarves is listed the week the last edge is rolled; a chain appears when the final links are filed. It makes for an uneven calendar and a far better object.",
      "If a piece you want has sold through, the atelier note on each product page tells you whether it will be made again.",
    ],
    image: "https://images.pexels.com/photos/27227257/pexels-photo-27227257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    imageAlt: "New Veranne pieces arranged on stacked plaster and travertine blocks",
    keyword: "new arrivals premium accessories",
    metaTitle: "New Arrivals — Latest Veranne Pieces",
    metaDescription:
      "The most recent releases from the Veranne atelier: leather, cashmere, silk, gold and stoneware, listed as each run is finished.",
    productSlugs: [
      "camille-wool-coat",
      "nox-manual-watch-38",
      "oslo-penny-loafer",
      "arden-oxford-shirt",
      "iris-silk-blouse",
      "lune-silk-scarf",
      "mirena-bud-vase",
      "lisette-micro-bag",
      "filo-chain-necklace",
      "solene-crescent-bag",
      "odette-cashmere-sweater",
    ],
  },
  {
    slug: "the-wardrobe",
    name: "The Wardrobe",
    tagline: "The dressed half of the house",
    intro: [
      "Women's and men's apparel, and the shoes that carry it — tailoring, silk, wool and leather cut in Portugal from cloth woven in Italy.",
    ],
    storyTitle: "Clothes first, fashion second",
    story: [
      "The wardrobe opened in the brand's fourth year, when our clients kept asking what went with the bag. The answer was the same discipline applied to cloth: classic lines, honest fabrics, one maker per garment.",
      "Everything here is drafted to be worn for years and altered by any decent tailor — hems carry extra inlay, waists carry side adjusters, soles can be replaced.",
    ],
    image: px(28497023),
    imageAlt: "A woman in a bone wool coat on a city street at dusk",
    keyword: "premium wardrobe essentials",
    metaTitle: "The Wardrobe — Women's & Men's Apparel by Veranne",
    metaDescription:
      "Veranne wardrobe: wool coats, tailored blazers, silk blouses, oxford shirts, overshirts, trousers and benchmade footwear.",
    productSlugs: [
      "camille-wool-coat",
      "margaux-tailored-blazer",
      "iris-silk-blouse",
      "elodie-pleated-skirt",
      "arden-oxford-shirt",
      "lowell-wool-overshirt",
      "elliot-tailored-trousers",
      "oslo-penny-loafer",
      "lyon-ankle-boot",
      "calvi-court-sneaker",
    ],
  },
  {
    slug: "signature-collection",
    name: "Signature Collection",
    tagline: "The pieces that define the house",
    intro: [
      "Six objects we would rebuild from memory. Each one has been redrawn at least twice and will be made for as long as the atelier exists.",
    ],
    storyTitle: "Drawn once, corrected often",
    story: [
      "A signature piece earns its place by surviving revision. The Aveline lost its lining in the second year. The Odette gained three centimetres across the shoulder. Ember No. 4 was reformulated four times before the iris sat correctly beneath the smoke.",
      "Nothing enters this collection in its first season. Everything in it is restocked.",
    ],
    image: "https://images.pexels.com/photos/28497023/pexels-photo-28497023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    imageAlt: "Veranne signature leather and cashmere pieces in a sunlit atelier",
    keyword: "signature luxury collection",
    metaTitle: "Signature Collection — Veranne Atelier",
    metaDescription:
      "The Veranne signature collection: the leather, cashmere, gold and fragrance pieces the atelier makes permanently.",
    productSlugs: [
      "aveline-structured-tote",
      "odette-cashmere-sweater",
      "solene-signet-ring",
      "cortile-everyday-satchel",
      "terra-hand-thrown-vase",
      "ember-no-4-eau-de-parfum",
      "solene-crescent-bag",
    ],
  },
  {
    slug: "essentials",
    name: "Essentials",
    tagline: "Quiet pieces that carry the rest",
    intro: [
      "The unglamorous half of a wardrobe — the card holder, the light crewneck, the small vase — made to the same standard as everything else.",
    ],
    storyTitle: "The pieces nobody photographs",
    story: [
      "Essentials are the objects you touch most and notice least. They take the most engineering: a card holder has nowhere to hide a poor seam, and a featherweight knit shows every dropped stitch.",
      "Priced to be bought without ceremony, made to be kept for a decade.",
    ],
    image: "https://images.pexels.com/photos/15122569/pexels-photo-15122569.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    imageAlt: "Veranne essentials arranged in a calm sunlit interior",
    keyword: "everyday luxury essentials",
    metaTitle: "Essentials — Everyday Veranne Pieces",
    metaDescription:
      "Veranne essentials: card holders, featherweight cashmere, porcelain bud vases and the hand ritual set.",
    productSlugs: [
      "marin-card-holder",
      "halden-cashmere-crewneck",
      "mirena-bud-vase",
      "lisette-micro-bag",
      "onda-carafe-set",
      "atelier-hand-ritual",
      "filo-chain-necklace",
      "sable-cashmere-wrap",
      "arden-oxford-shirt",
      "lin-linen-throw",
      "calvi-court-sneaker",
    ],
  },
  {
    slug: "limited-edition",
    name: "Limited Edition",
    tagline: "Made once, never repeated",
    intro: [
      "Short runs from a single batch of material — a kiln load, a bolt of silk, four hundred pours. When they are gone the drawing is retired.",
    ],
    storyTitle: "One batch, one run",
    story: [
      "Limited pieces exist because materials arrive in finite quantities. A kiln fires what it fires; a mill weaves the yarn it has. Rather than compromise the next run to match the last, we close the edition.",
      "Limited Edition pieces are final sale and are marked clearly on the product page.",
    ],
    image: "https://images.pexels.com/photos/4862911/pexels-photo-4862911.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    imageAlt: "A limited edition Veranne candle and wrapped gift box in warm light",
    keyword: "limited edition designer pieces",
    metaTitle: "Limited Edition — Single-Run Veranne Pieces",
    metaDescription:
      "Single-run Veranne pieces made from one batch of material and never repeated. Final sale, marked on each product page.",
    productSlugs: ["vesper-scented-candle", "solene-signet-ring", "lune-silk-scarf", "lyon-ankle-boot"],
  },
  {
    slug: "best-sellers",
    name: "Best Sellers",
    tagline: "What the atelier remakes most often",
    intro: [
      "Ranked by how frequently each piece returns to the bench for another run. Sample ordering data for this demonstration store.",
    ],
    storyTitle: "Ranked by the production schedule",
    story: [
      "Rather than a popularity badge, this ordering reflects which drawings the atelier repeats most often — the honest measure of what people actually buy twice.",
      "In a live store this list would be generated from real order volume; here it is curated sample data.",
    ],
    image: "https://images.pexels.com/photos/27227257/pexels-photo-27227257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    imageAlt: "Artisan hands stitching tan leather at a workbench",
    keyword: "best selling premium accessories",
    metaTitle: "Best Sellers — Most Requested Veranne Pieces",
    metaDescription:
      "The Veranne pieces returned to the bench most often: the Aveline tote, Odette cashmere, Marin card holder and Ember No. 4.",
    productSlugs: [
      "aveline-structured-tote",
      "odette-cashmere-sweater",
      "marin-card-holder",
      "halden-cashmere-crewneck",
      "cortile-everyday-satchel",
      "sable-cashmere-wrap",
      "terra-hand-thrown-vase",
      "ember-no-4-eau-de-parfum",
      "camille-wool-coat",
      "nox-manual-watch-38",
      "oslo-penny-loafer",
    ],
  },
  {
    slug: "the-gift-edit",
    name: "The Gift Edit",
    tagline: "Chosen for giving, wrapped by hand",
    intro: [
      "Pieces that travel well, need no size, and read as considered rather than expensive. Atelier wrapping and a handwritten card are added at checkout.",
    ],
    storyTitle: "A good gift is specific",
    story: [
      "The hardest part of giving is not the budget, it is the specificity. A candle poured in a run of four hundred says something a generic box cannot.",
      "Every piece here is one-size or engraved to order, and all of them are packed with prices removed from the note.",
    ],
    image: "https://images.pexels.com/photos/4862911/pexels-photo-4862911.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    imageAlt: "Ivory gift box with champagne ribbon and a folded cashmere wrap",
    keyword: "luxury gift edit",
    metaTitle: "The Gift Edit — Luxury Gifts by Veranne",
    metaDescription:
      "A curated gift edit of Veranne pieces with atelier wrapping and a handwritten card — candles, cashmere, silk, gold and ceramics.",
    productSlugs: [
      "sable-cashmere-wrap",
      "vesper-scented-candle",
      "marin-card-holder",
      "mirena-bud-vase",
      "lune-silk-scarf",
      "ember-no-4-eau-de-parfum",
      "onda-carafe-set",
      "filo-chain-necklace",
      "lin-linen-throw",
      "nox-manual-watch-38",
      "rive-field-watch-40",
    ],
  },
];

/* ----------------------------- lookups ----------------------------- */

export const productBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

export const productsBySlugs = (slugs: string[]): Product[] =>
  slugs.map(productBySlug).filter((p): p is Product => Boolean(p));

export const categoryBySlug = (slug: string): Category | undefined =>
  CATEGORIES.find((c) => c.slug === slug);

export const collectionBySlug = (slug: string): Collection | undefined =>
  COLLECTIONS.find((c) => c.slug === slug);

export const productsInCollection = (slug: string): Product[] => {
  const collection = collectionBySlug(slug);
  if (!collection) return [];
  return productsBySlugs(collection.productSlugs);
};

export const productsInCategory = (slug: string): Product[] =>
  PRODUCTS.filter((p) => p.categorySlug === slug);

export const allColors = (): ColorVariant[] => {
  const seen = new Map<string, ColorVariant>();
  for (const product of PRODUCTS) {
    for (const color of product.colors) {
      if (!seen.has(color.id)) seen.set(color.id, color);
    }
  }
  return [...seen.values()];
};

export const allSizes = (): string[] => {
  const seen = new Set<string>();
  for (const product of PRODUCTS) {
    for (const size of product.sizes) seen.add(size.label);
  }
  return [...seen];
};

export const priceBounds = (): { min: number; max: number } => {
  const prices = PRODUCTS.map((p) => p.priceCents);
  return { min: Math.min(...prices), max: Math.max(...prices) };
};

export const isLowStock = (product: Product): boolean => product.stock > 0 && product.stock <= 6;

export const availabilityLabel = (product: Product): string => {
  if (product.stock === 0) return "Sold out";
  if (isLowStock(product)) return `Only ${product.stock} left`;
  if (product.madeToOrder) return "Made to order";
  return "In stock";
};

export const schemaAvailability = (product: Product): string =>
  product.stock === 0
    ? "https://schema.org/OutOfStock"
    : product.madeToOrder
      ? "https://schema.org/PreOrder"
      : "https://schema.org/InStock";
