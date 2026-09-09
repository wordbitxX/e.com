export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] }
  | { type: "image"; url: string; alt: string; caption?: string };

export type Article = {
  slug: string;
  title: string;
  deck: string;
  excerpt: string;
  category: "Style Guide" | "Product Story" | "Behind the Brand" | "Buying Guide" | "Care Guide" | "Gift Guide" | "Trends";
  author: string;
  publishedAt: string;
  readMinutes: number;
  heroImage: string;
  heroAlt: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  relatedProducts: string[];
  relatedArticles: string[];
  body: ArticleBlock[];
};

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2100`;

export const ARTICLES: Article[] = [
  {
    slug: "how-to-wear-a-silk-scarf",
    title: "Three folds for a silk square",
    deck: "A 90 cm scarf can be worn a dozen ways. These three are the ones that hold all day.",
    excerpt:
      "The neck knot, the bag tie and the folded band — with the exact fold sequence for each, and when to use them.",
    category: "Style Guide",
    author: "Ines Carvalho",
    publishedAt: "2026-02-06",
    readMinutes: 5,
    heroImage: px(26617660),
    heroAlt: "Hands folding a silk scarf on a pale surface",
    keyword: "how to wear a silk scarf",
    metaTitle: "How to Wear a Silk Scarf — Three Folds That Hold",
    metaDescription:
      "A practical style guide to wearing a 90 cm silk square: the neck knot, the bag tie and the folded band, with fold-by-fold instruction.",
    relatedProducts: ["lune-silk-scarf", "solene-crescent-bag", "filo-chain-necklace"],
    relatedArticles: ["a-buying-guide-to-cashmere", "quiet-materials"],
    body: [
      {
        type: "p",
        text: "Silk fails when it is asked to do too much. A square that has been twisted twice and knotted three times will loosen within an hour, because twill has no memory. The folds below all rely on the weight of the fabric rather than on tension.",
      },
      { type: "h2", text: "One — the bias band" },
      {
        type: "p",
        text: "Lay the square flat, fold corner to corner into a triangle, then roll the long edge toward the point in four turns until you have a band roughly six centimetres wide. Wrap once at the throat and knot to the side, leaving one tail longer than the other. The asymmetry is what keeps it from reading as a uniform.",
      },
      { type: "h2", text: "Two — the handle tie" },
      {
        type: "p",
        text: "Fold to a band of about three centimetres. Loop it once around the base of a bag handle, then tie a simple square knot and let the ends fall unequal. On a structured tote it softens the line; on a crescent bag it does the opposite.",
      },
      { type: "h2", text: "Three — the flat band" },
      {
        type: "p",
        text: "Fold in half, then in half again, pressing each fold with your palm rather than your fingertips. Worn under a collar with the knot at the back of the neck, this reads as tailoring rather than decoration.",
      },
      {
        type: "quote",
        text: "Press folds with an open palm. Fingertips leave a crease that stays in the twill for weeks.",
      },
      { type: "h2", text: "Keeping it" },
      {
        type: "list",
        items: [
          "Store loosely rolled, never folded in a drawer.",
          "Apply fragrance before dressing — alcohol dulls silk lustre.",
          "Dry clean only; water spots twill permanently.",
        ],
      },
    ],
  },
  {
    slug: "why-we-removed-the-lining",
    title: "Why we removed the lining",
    deck: "The Aveline tote lost its lining in year two. It made the bag heavier, slower and considerably better.",
    excerpt:
      "An unlined bag has nowhere to hide. Here is what changed in the pattern, the leather and the price when we took the lining out.",
    category: "Product Story",
    author: "Tomás Bregha",
    publishedAt: "2026-01-19",
    readMinutes: 6,
    heroImage: "https://images.pexels.com/photos/27227257/pexels-photo-27227257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    heroAlt: "Artisan hand-stitching tan leather at a wooden workbench",
    keyword: "unlined leather bag construction",
    metaTitle: "Why We Removed the Lining — Veranne Product Story",
    metaDescription:
      "How removing the lining from the Aveline tote changed the pattern, the leather weight and the way the bag ages.",
    relatedProducts: ["aveline-structured-tote", "marin-card-holder", "cortile-everyday-satchel"],
    relatedArticles: ["caring-for-vegetable-tanned-leather", "inside-the-kyoto-kiln"],
    body: [
      {
        type: "p",
        text: "A lining is a convenience for the maker. It covers raw edges, hides the reverse of a seam and allows a thinner, cheaper hide to feel substantial. It also means half of the bag you paid for is a fabric you will never look at.",
      },
      { type: "h2", text: "What had to change" },
      {
        type: "p",
        text: "Removing the lining meant the leather itself had to become the structure. We moved from 1.6 mm to 2.2 mm calf, which added 190 grams and forced a wider fold radius at the base. The pattern was redrawn three times before the corners stopped buckling.",
      },
      {
        type: "list",
        items: [
          "Hide weight increased from 1.6 mm to 2.2 mm.",
          "Base corners moved from a stitched gusset to a single fold.",
          "Interior edges are now burnished by hand — six passes with a bone tool.",
          "Assembly time rose from 4 to 6.5 hours per bag.",
        ],
      },
      { type: "h2", text: "What it means for the owner" },
      {
        type: "p",
        text: "An unlined bag records you. The interior darkens where a hand reaches in; the base tans faster than the sides because it meets more light. After eighteen months no two Avelines look alike, and that is the argument for the extra two and a half hours.",
      },
      {
        type: "quote",
        text: "We stopped asking how to hide the inside and started asking whether it deserved hiding.",
        attribution: "Tomás Bregha, leather lead",
      },
    ],
  },
  {
    slug: "a-buying-guide-to-cashmere",
    title: "A buying guide to cashmere",
    deck: "Grade, gauge, ply and micron — the four numbers that tell you whether a sweater will last.",
    excerpt:
      "What to ask before buying cashmere: fibre length, micron count, gauge and ply, and how to test a knit in thirty seconds.",
    category: "Buying Guide",
    author: "Ines Carvalho",
    publishedAt: "2026-01-05",
    readMinutes: 8,
    heroImage: px(30263575),
    heroAlt: "Stacked cashmere sweaters in warm neutral tones",
    keyword: "how to buy cashmere guide",
    metaTitle: "How to Buy Cashmere — Grade, Gauge, Ply and Micron",
    metaDescription:
      "A practical cashmere buying guide covering fibre length, micron count, gauge, ply and a thirty-second in-store quality test.",
    relatedProducts: ["odette-cashmere-sweater", "halden-cashmere-crewneck", "sable-cashmere-wrap"],
    relatedArticles: ["quiet-materials", "how-to-wear-a-silk-scarf"],
    body: [
      {
        type: "p",
        text: "Almost every knit in a shop is labelled 100% cashmere, and almost none of them will behave the same after a winter. The label describes the animal, not the quality of what was taken from it.",
      },
      { type: "h2", text: "Fibre length and micron" },
      {
        type: "p",
        text: "Grade-A cashmere means fibres of 34–36 mm at around 15.5 microns. Long, fine fibres twist into a yarn with fewer loose ends, which is why a good knit pills less. Short-fibre cashmere feels identical in the shop and betrays itself in week three.",
      },
      { type: "h2", text: "Gauge" },
      {
        type: "p",
        text: "Gauge counts needles per inch. A 7-gauge knit is dense and holds structure; a 12-gauge is fine and disappears under tailoring. Neither is better — they are answers to different questions. Our Odette is 7gg, the Halden 12gg.",
      },
      { type: "h2", text: "Ply" },
      {
        type: "p",
        text: "Ply is how many strands are twisted together. Two-ply is the sensible default for a sweater; single-ply saves money and loses shape at the elbow.",
      },
      { type: "h2", text: "The thirty-second test" },
      {
        type: "list",
        items: [
          "Stretch the cuff and release — it should return, not sag.",
          "Rub the surface briskly with a palm. Loose fibre on your hand means short staple.",
          "Hold it to the light. Even stitch density means an even knit tension.",
          "Weigh it in your hands. A 7gg sweater under 400 g in size M has been thinned.",
        ],
      },
      {
        type: "quote",
        text: "Price tells you about a brand's margin. Weight, gauge and ply tell you about the sweater.",
      },
    ],
  },
  {
    slug: "caring-for-vegetable-tanned-leather",
    title: "Caring for vegetable-tanned leather",
    deck: "Four habits that decide whether a bag looks ten years old or ten years loved.",
    excerpt:
      "Vegetable-tanned leather is alive to light, water and oil. A short, honest care routine — and the three things to never do.",
    category: "Care Guide",
    author: "Tomás Bregha",
    publishedAt: "2025-12-14",
    readMinutes: 5,
    heroImage: px(27227257),
    heroAlt: "Tan leather bag resting on a vintage chair in warm light",
    keyword: "vegetable tanned leather care",
    metaTitle: "Vegetable-Tanned Leather Care — A Short Honest Guide",
    metaDescription:
      "How to care for vegetable-tanned leather: patina, balm frequency, water marks, storage and the three mistakes that cause damage.",
    relatedProducts: ["aveline-structured-tote", "cortile-everyday-satchel", "marin-card-holder"],
    relatedArticles: ["why-we-removed-the-lining", "quiet-materials"],
    body: [
      {
        type: "p",
        text: "Chrome-tanned leather is sealed; vegetable-tanned leather is not. It takes on oil from your hands, deepens in sunlight and marks when wet. Every one of those reactions is reversible or desirable, provided you know which is which.",
      },
      { type: "h2", text: "Patina is not damage" },
      {
        type: "p",
        text: "The first four weeks are the fastest change. A bone-coloured hide will move toward honey; a tan will move toward cognac. Expose a new piece evenly — leaving it half in sunlight on a windowsill will tan it unevenly and permanently.",
      },
      { type: "h2", text: "Water" },
      {
        type: "p",
        text: "Blot, never rub, and let the piece dry away from heat. If a spot mark remains, lightly dampen the whole panel with a barely wet cloth so the tone evens as it dries.",
      },
      { type: "h2", text: "Balm" },
      {
        type: "p",
        text: "Twice a year is enough for daily-use pieces. Use a neutral, wax-light balm and a pea-sized amount for an entire tote. Over-conditioning saturates the fibre and dulls the surface permanently.",
      },
      { type: "h2", text: "Three things never to do" },
      {
        type: "list",
        items: [
          "Never use saddle soap on unfinished veg-tan — it strips the tannins.",
          "Never dry near a radiator; the collagen shrinks and the panel cups.",
          "Never store in plastic. Cotton dust bags let the leather breathe.",
        ],
      },
    ],
  },
  {
    slug: "the-considered-gift",
    title: "The considered gift",
    deck: "How to choose for someone who buys everything they want the moment they want it.",
    excerpt:
      "A gift guide organised by relationship rather than price: what to give a parent, a colleague, a new home and a person who has everything.",
    category: "Gift Guide",
    author: "Ines Carvalho",
    publishedAt: "2025-11-28",
    readMinutes: 6,
    heroImage: "https://images.pexels.com/photos/4862911/pexels-photo-4862911.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    heroAlt: "Ivory gift box with champagne ribbon and folded cashmere",
    keyword: "luxury gift guide",
    metaTitle: "The Considered Gift — A Luxury Gift Guide by Relationship",
    metaDescription:
      "A gift guide organised by relationship: what to give a parent, a colleague, a new home, and someone who already owns everything.",
    relatedProducts: ["sable-cashmere-wrap", "vesper-scented-candle", "mirena-bud-vase"],
    relatedArticles: ["a-buying-guide-to-cashmere", "quiet-materials"],
    body: [
      {
        type: "p",
        text: "Difficult recipients are rarely difficult about taste. They are difficult because they have already solved every problem a gift usually solves. What remains is specificity — an object with a story short enough to tell at a table.",
      },
      { type: "h2", text: "For a parent" },
      {
        type: "p",
        text: "Choose something used daily rather than displayed. A brushed cashmere wrap or a carafe set will be handled every evening; a decorative object will be admired and shelved.",
      },
      { type: "h2", text: "For a colleague" },
      {
        type: "p",
        text: "Keep it un-personal in size and personal in quality. A card holder or a bud vase reads as considered without implying intimacy.",
      },
      { type: "h2", text: "For a new home" },
      {
        type: "p",
        text: "Avoid anything that must match. Stoneware in a single glaze and a candle in a keepable vessel will sit in any interior.",
      },
      { type: "h2", text: "For someone who has everything" },
      {
        type: "p",
        text: "Give something made in a countable quantity. A candle from a run of four hundred, or a scarf whose edges took forty minutes to roll, carries information that price alone does not.",
      },
      {
        type: "quote",
        text: "A good gift answers a question the recipient never thought to ask out loud.",
      },
    ],
  },
  {
    slug: "inside-the-kyoto-kiln",
    title: "Inside the Kyoto kiln",
    deck: "Two days with the studio that throws our stoneware, and the ash glaze that no two pieces share.",
    excerpt:
      "A visit to the ceramics studio outside Kyoto: the kick wheel, the wood-ash glaze, and why variation is the specification.",
    category: "Behind the Brand",
    author: "Tomás Bregha",
    publishedAt: "2025-10-30",
    readMinutes: 7,
    heroImage: px(18278210),
    heroAlt: "Ceramic vessels arranged on a wooden bench in a quiet studio",
    keyword: "handmade ceramics studio japan",
    metaTitle: "Inside the Kyoto Kiln — How Our Stoneware Is Made",
    metaDescription:
      "Behind the brand: the kick wheel, wood-ash glaze and 1,260°C firing that produce Veranne stoneware outside Kyoto.",
    relatedProducts: ["terra-hand-thrown-vase", "onda-carafe-set", "mirena-bud-vase"],
    relatedArticles: ["why-we-removed-the-lining", "quiet-materials"],
    body: [
      {
        type: "p",
        text: "The studio is a converted rice barn forty minutes south of Kyoto. There is one kiln, one wheel and a wall of test tiles going back nineteen years — every one of them a record of a glaze that behaved unexpectedly.",
      },
      { type: "h2", text: "The wheel" },
      {
        type: "p",
        text: "A kick wheel turns slower than an electric one and stops when the potter stops. It is the reason our vase walls thicken slightly toward the base — a hand correction, repeated a hundred times a week, that a machine would never make.",
      },
      { type: "h2", text: "The glaze" },
      {
        type: "p",
        text: "Ash from the kiln's own firebox is sieved, mixed with feldspar and water and applied by dipping. Where the glaze pools it goes green; where it thins it goes bone. The pattern depends on where a piece stood in the kiln.",
      },
      {
        type: "quote",
        text: "You cannot order a specific surface. You can only order the process that produces good surfaces.",
      },
      { type: "h2", text: "Why variation is a specification" },
      {
        type: "p",
        text: "We photograph a representative piece, not a hero piece, and we say so on the product page. A client who expects an identical object is a client we have failed to inform.",
      },
    ],
  },
  {
    slug: "quiet-materials",
    title: "Quiet materials",
    deck: "Against trend: why we design for the fifth year of ownership rather than the first week.",
    excerpt:
      "A short argument for materials that improve with use — and a look at what the next five years of quiet design might hold.",
    category: "Trends",
    author: "Ines Carvalho",
    publishedAt: "2025-09-16",
    readMinutes: 6,
    heroImage: "https://images.pexels.com/photos/15122569/pexels-photo-15122569.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    heroAlt: "A calm sunlit interior with a linen chair and folded cashmere throw",
    keyword: "quiet luxury design philosophy",
    metaTitle: "Quiet Materials — Designing for the Fifth Year",
    metaDescription:
      "Why materials that improve with use outlast trend cycles, and how to judge an object by how it will look after five years.",
    relatedProducts: ["odette-cashmere-sweater", "terra-hand-thrown-vase", "aveline-structured-tote"],
    relatedArticles: ["a-buying-guide-to-cashmere", "caring-for-vegetable-tanned-leather"],
    body: [
      {
        type: "p",
        text: "Most product photography shows an object at its least interesting moment: the day it was made. Nothing has happened to it yet. The honest question is what it looks like in year five.",
      },
      { type: "h2", text: "Materials that improve" },
      {
        type: "list",
        items: [
          "Vegetable-tanned leather — darkens and softens, records use.",
          "Long-staple cashmere — blooms after washing, holds shape.",
          "High-fired stoneware — glaze develops fine crazing that reads as depth.",
          "Solid gold — polishes itself against skin and other metals.",
        ],
      },
      { type: "h2", text: "Materials that only decline" },
      {
        type: "p",
        text: "Coated canvas, plated brass, bonded leather and short-fibre knits share one trait: their best day is their first. They are not dishonest materials, but they are honest about a different intention.",
      },
      { type: "h2", text: "How to judge before you buy" },
      {
        type: "p",
        text: "Ask what will change. If the answer is nothing, the object is finished. If the answer is a list — colour, hand, surface, weight — you are buying something that will still be interesting when the trend that produced it is over.",
      },
    ],
  },
  {
    slug: "how-much-does-an-ecommerce-website-cost",
    title: "How much does an ecommerce website cost?",
    deck: "A straight answer about budgets: what a storefront really costs, what changes the number, and where the money should go.",
    excerpt:
      "Templates versus custom builds, the three cost drivers, hidden running costs, and the budget ranges that actually deliver.",
    category: "Buying Guide",
    author: "WordbitX Studio",
    publishedAt: "2026-02-18",
    readMinutes: 7,
    heroImage: "https://images.pexels.com/photos/28497023/pexels-photo-28497023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    heroAlt: "Laptop and phone on an ivory desk showing a minimal e-commerce interface",
    keyword: "how much does an ecommerce website cost",
    metaTitle: "How Much Does an Ecommerce Website Cost? — WordbitX",
    metaDescription:
      "What an ecommerce website really costs in 2026: template versus custom builds, the three main cost drivers, running costs and realistic budget ranges.",
    relatedProducts: ["aveline-structured-tote", "nox-manual-watch-38", "marin-card-holder"],
    relatedArticles: ["shopify-vs-custom-ecommerce-development", "ecommerce-website-features"],
    body: [
      {
        type: "p",
        text: "The honest answer is a range: a storefront can cost anywhere from a few hundred dollars a year on a hosted template to six figures for a custom platform. The useful question is not the number — it is what the number buys.",
      },
      { type: "h2", text: "Three cost drivers" },
      {
        type: "list",
        items: [
          "Catalog size and merchandising depth — twenty products and two thousand behave very differently.",
          "Checkout and operations — payment methods, multi-currency, shipping rules, returns, tax.",
          "Content and SEO — the editorial layer that actually brings organic traffic.",
        ],
      },
      { type: "h2", text: "Realistic ranges" },
      {
        type: "p",
        text: "A hosted theme with light customisation typically lands in the low thousands. A bespoke build with editorial merchandising, a working search experience and a conversion-focused checkout — like the one this storefront demonstrates — generally sits well above that, with the build being the smaller half of a multi-year investment.",
      },
      { type: "h2", text: "The running costs people forget" },
      {
        type: "list",
        items: [
          "Hosting and infrastructure — scale with traffic, not with launch.",
          "Payment processing and payment gateway fees.",
          "Maintenance, security updates and platform fees.",
          "Content production — the single biggest organic growth lever.",
        ],
      },
      {
        type: "p",
        text: "This Veranne storefront was built by WordbitX as a working demonstration of the full stack — search, AI concierge, checkout, order tracking, structured data — so prospective clients can see where the money goes before they spend it.",
      },
    ],
  },
  {
    slug: "ecommerce-website-features",
    title: "Ecommerce website features every business needs",
    deck: "Not a checklist of bells — the features that move conversion, and the ones that exist only to fill a feature list.",
    excerpt:
      "The 12 features that pay for themselves: search, merchandising, variants, checkout integrity, tracking, structured data and more.",
    category: "Buying Guide",
    author: "WordbitX Studio",
    publishedAt: "2026-02-22",
    readMinutes: 8,
    heroImage: "https://images.pexels.com/photos/15122569/pexels-photo-15122569.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    heroAlt: "A calm sunlit interior with a linen chair and folded throw",
    keyword: "ecommerce website features",
    metaTitle: "Ecommerce Website Features Every Business Needs — WordbitX",
    metaDescription:
      "The ecommerce features that actually move sales: predictive search, faceted filters, variant handling, server-side pricing, order tracking and structured data.",
    relatedProducts: ["odette-cashmere-sweater", "oslo-penny-loafer", "ember-no-4-eau-de-parfum"],
    relatedArticles: ["how-much-does-an-ecommerce-website-cost", "shopify-vs-custom-ecommerce-development"],
    body: [
      {
        type: "p",
        text: "Most storefront feature lists are written by people selling the features. After building the store you are looking at, here is the short list that actually earns its place.",
      },
      { type: "h2", text: "The conversion features" },
      {
        type: "list",
        items: [
          "Predictive search across products, categories and content — not a filter box.",
          "Faceted filtering with sensible defaults and honest empty states.",
          "Editorial merchandising — featured placements, rails, and story-led discovery.",
          "Server-side price integrity: totals recomputed on the server, never trusted from the browser.",
          "A checkout that does not ask for anything it does not need.",
        ],
      },
      { type: "h2", text: "The trust features" },
      {
        type: "list",
        items: [
          "Order tracking that shows real stages, not a fake courier logo.",
          "Shipping, returns and care pages written in plain language.",
          "Reviews with verification flags — never invented aggregates.",
        ],
      },
      { type: "h2", text: "The invisible features" },
      {
        type: "p",
        text: "Canonical URLs, Open Graph metadata, JSON-LD structured data, semantic heading structure, image sizing, lazy loading and accessibility basics cost nothing in the build and compound forever. This demonstration implements every one of them — inspect any product page in this store to see them live.",
      },
    ],
  },
  {
    slug: "shopify-vs-custom-ecommerce-development",
    title: "Shopify vs custom ecommerce development",
    deck: "The decision is not about tools — it is about whether your merchandising fits the template.",
    excerpt:
      "When Shopify is the right answer, when a custom build pays for itself, and the honest questions to ask before choosing.",
    category: "Buying Guide",
    author: "WordbitX Studio",
    publishedAt: "2026-02-26",
    readMinutes: 9,
    heroImage: "https://images.pexels.com/photos/28497023/pexels-photo-28497023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    heroAlt: "Sunlit atelier with leather and cashmere on a travertine plinth",
    keyword: "shopify vs custom ecommerce",
    metaTitle: "Shopify vs Custom Ecommerce Development — WordbitX",
    metaDescription:
      "Shopify vs custom ecommerce development: speed to launch versus merchandising freedom, running costs, and the questions that decide it.",
    relatedProducts: ["camille-wool-coat", "rive-field-watch-40", "terr-hand-thrown-vase"],
    relatedArticles: ["how-much-does-an-ecommerce-website-cost", "ecommerce-website-features"],
    body: [
      {
        type: "p",
        text: "Both are legitimate. Shopify is the fastest respectable path to a working store; a custom build is the path when the store itself is the product. The mistake is choosing by headline price rather than by what the merchandising needs.",
      },
      { type: "h2", text: "Choose Shopify when" },
      {
        type: "list",
        items: [
          "Your catalog fits the standard product model — sizes, colours, variants.",
          "You want launch in weeks and you will not outgrow the theme quickly.",
          "Your differentiation is the product, not the shopping experience.",
        ],
      },
      { type: "h2", text: "Choose custom development when" },
      {
        type: "list",
        items: [
          "Editorial merchandising, asymmetric discovery and story-led category pages are core to the brand.",
          "Multi-currency, multi-region pricing or bespoke commerce logic are requirements, not nice-to-haves.",
          "AI-assisted discovery, tailored recommendations or a concierge are on the roadmap.",
          "You want to own the platform economics rather than rent them.",
        ],
      },
      { type: "h2", text: "The honest middle" },
      {
        type: "p",
        text: "Many premium brands run hybrid: a hosted checkout with a custom storefront. This Veranne demonstration is a custom storefront by WordbitX with a mock payment layer architected so a real gateway — hosted or native — can be connected without a rebuild.",
      },
      {
        type: "p",
        text: "If you are weighing the two, start from the catalog: list the ten merchandising moves you would make if nothing were in your way. The framework that survives the list is the right one.",
      },
    ],
  },
];

export const articleBySlug = (slug: string): Article | undefined =>
  ARTICLES.find((a) => a.slug === slug);

export const articlesByCategory = (category: string): Article[] =>
  ARTICLES.filter((a) => a.category === category);

export const ARTICLE_CATEGORIES = [
  "Style Guide",
  "Product Story",
  "Behind the Brand",
  "Buying Guide",
  "Care Guide",
  "Gift Guide",
  "Trends",
] as const;
