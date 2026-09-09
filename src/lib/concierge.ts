import { PRODUCTS, productBySlug, type Product } from "./catalog";
import { bestSellers, giftMatches, similarProducts } from "./recommend";
import { formatPrice } from "./format";

/* ---------------------------------------------------------------------------
 * STYLE CONCIERGE — reasoning layer
 *
 * The concierge is intentionally split into (1) intent resolution and
 * (2) catalog retrieval. The API route calls `resolveConcierge()` and, when a
 * model provider key is configured, may hand the same structured context to a
 * real LLM instead. Either way the product results always come from the
 * catalog, so the assistant can never invent a product, price or stock level.
 * ------------------------------------------------------------------------- */

export type ConciergeIntent =
  | "discover"
  | "outfit"
  | "gift"
  | "bestsellers"
  | "compare"
  | "budget"
  | "size"
  | "care"
  | "shipping"
  | "cart"
  | "greeting"
  | "fallback";

export type ConciergeReply = {
  intent: ConciergeIntent;
  message: string;
  note?: string;
  productSlugs: string[];
  chips: string[];
  links: { label: string; href: string }[];
  engine: "rules" | "llm";
};

export const CONCIERGE_OPENERS = [
  "Find something for me",
  "Build an outfit",
  "Find a gift",
  "Show best sellers",
  "Help me choose",
  "Find something within my budget",
];

const PRICE_PATTERN = /(?:under|below|less than|max|budget of|around|about)?\s*\$?\s*(\d{2,5})/i;

function extractBudget(text: string): number | undefined {
  const match = text.match(PRICE_PATTERN);
  if (!match) return undefined;
  const value = Number(match[1]);
  if (!Number.isFinite(value) || value < 20) return undefined;
  return value * 100;
}

function has(text: string, words: string[]): boolean {
  return words.some((word) => text.includes(word));
}

function nameList(products: Product[]): string {
  const names = products.map((p) => p.name);
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function matchByKeywords(text: string, limit = 3): Product[] {
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);

  if (tokens.length === 0) return [];

  return PRODUCTS.map((product) => {
    const haystack = [
      product.name,
      product.subtitle,
      product.shortDescription,
      product.categorySlug.replace(/-/g, " "),
      product.moods.join(" "),
      product.occasions.join(" "),
      product.recipients.join(" "),
      product.materials.join(" "),
      product.colors.map((c) => c.name).join(" "),
    ]
      .join(" ")
      .toLowerCase();
    const score = tokens.reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0);
    return { product, score };
  })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.product.salesRank - b.product.salesRank)
    .slice(0, limit)
    .map((entry) => entry.product);
}

export function resolveConcierge(input: {
  message: string;
  history?: string[];
  viewed?: string[];
  cart?: string[];
}): ConciergeReply {
  const raw = input.message.trim();
  const text = raw.toLowerCase();
  const budget = extractBudget(text);
  const viewed = (input.viewed ?? []).map(productBySlug).filter((p): p is Product => Boolean(p));

  const base = { engine: "rules" as const, links: [] as { label: string; href: string }[] };

  if (!raw) {
    return {
      ...base,
      intent: "greeting",
      message: "Tell me what you're looking for.",
      productSlugs: [],
      chips: CONCIERGE_OPENERS,
    };
  }

  if (has(text, ["hello", "hi ", "hey", "good morning", "good evening"]) && text.length < 24) {
    return {
      ...base,
      intent: "greeting",
      message:
        "Good to see you. I know every piece in the atelier — tell me the occasion, the person or the budget and I'll narrow it down.",
      productSlugs: bestSellers(3).map((p) => p.slug),
      chips: CONCIERGE_OPENERS,
    };
  }

  if (has(text, ["best seller", "bestseller", "popular", "most requested", "what sells"])) {
    const picks = bestSellers(4);
    return {
      ...base,
      intent: "bestsellers",
      message: `The pieces the atelier remakes most often are ${nameList(picks.slice(0, 3))}. Sample ordering data for this demonstration store.`,
      productSlugs: picks.map((p) => p.slug),
      chips: ["Show gifts under $250", "Build an outfit", "Compare the two totes"],
      links: [{ label: "See all best sellers", href: "/collections/best-sellers" }],
    };
  }

  if (has(text, ["gift", "present", "for my", "birthday", "anniversary", "housewarming", "wedding"])) {
    const recipient = has(text, ["her", "wife", "girlfriend", "mother", "sister", "mum", "mom"])
      ? "for her"
      : has(text, ["him", "husband", "boyfriend", "father", "brother", "dad"])
        ? "for him"
        : has(text, ["home", "housewarming", "apartment", "house"])
          ? "for the home"
          : undefined;
    const occasion = has(text, ["birthday"])
      ? "birthday"
      : has(text, ["anniversary"])
        ? "anniversary"
        : has(text, ["housewarming"])
          ? "housewarming"
          : has(text, ["wedding"])
            ? "wedding"
            : has(text, ["thank"])
              ? "thank you"
              : undefined;
    const picks = giftMatches({ recipient, occasion, budgetCents: budget, limit: 4 });
    const budgetLine = budget ? ` within ${formatPrice(budget)}` : "";
    return {
      ...base,
      intent: "gift",
      message: `For a gift${budgetLine}${recipient ? ` ${recipient}` : ""}, I'd start with ${nameList(picks.slice(0, 3))}. Every one is one-size and arrives with atelier wrapping and a handwritten card.`,
      note: "Gift wrapping and a message can be added at checkout.",
      productSlugs: picks.map((p) => p.slug),
      chips: ["Under $150", "Something for the home", "Add a gift message"],
      links: [{ label: "Open the gift experience", href: "/gifts" }],
    };
  }

  if (budget && has(text, ["under", "below", "budget", "less than", "max", "spend"])) {
    const picks = PRODUCTS.filter((p) => p.priceCents <= budget && p.stock > 0)
      .sort((a, b) => a.salesRank - b.salesRank)
      .slice(0, 4);
    if (picks.length === 0) {
      const cheapest = [...PRODUCTS].sort((a, b) => a.priceCents - b.priceCents).slice(0, 3);
      return {
        ...base,
        intent: "budget",
        message: `Nothing sits under ${formatPrice(budget)} at the moment. The closest pieces are ${nameList(cheapest)}, starting at ${formatPrice(cheapest[0].priceCents)}.`,
        productSlugs: cheapest.map((p) => p.slug),
        chips: ["Show best sellers", "Find a gift", "Show ceramics"],
      };
    }
    return {
      ...base,
      intent: "budget",
      message: `Within ${formatPrice(budget)} I'd look at ${nameList(picks.slice(0, 3))}. All are in stock and dispatch within 24 hours.`,
      productSlugs: picks.map((p) => p.slug),
      chips: ["Something for the home", "Add a gift message", "Show best sellers"],
      links: [{ label: "Browse everything in range", href: `/shop?max=${Math.round(budget / 100)}` }],
    };
  }

  if (has(text, ["outfit", "style", "wear with", "goes with", "complete the look", "pair"])) {
    const anchor = viewed[0] ?? matchByKeywords(text, 1)[0] ?? bestSellers(1)[0];
    const rest = similarProducts(anchor.slug, 3);
    return {
      ...base,
      intent: "outfit",
      message: `Built around the ${anchor.name}: add ${nameList(rest)}. The tones stay inside the same oat-to-espresso range, so nothing competes.`,
      productSlugs: [anchor.slug, ...rest.map((p) => p.slug)],
      chips: ["Something more evening", "Keep it under $500", "Show me the scarf folds"],
      links: [{ label: "Read the styling journal", href: "/journal/how-to-wear-a-silk-scarf" }],
    };
  }

  if (has(text, ["compare", "difference between", "versus", " vs ", "which of"])) {
    const picks = matchByKeywords(text, 2);
    const pair = picks.length >= 2 ? picks : bestSellers(2);
    const [a, b] = pair;
    return {
      ...base,
      intent: "compare",
      message: `${a.name} — ${formatPrice(a.priceCents)}, ${a.subtitle.toLowerCase()}. ${b.name} — ${formatPrice(b.priceCents)}, ${b.subtitle.toLowerCase()}. If you want the everyday piece, take the ${a.priceCents <= b.priceCents ? a.name : b.name}; the other is the more considered object.`,
      productSlugs: [a.slug, b.slug],
      chips: ["Which lasts longer?", "Show sizing help", "Add the first to cart"],
    };
  }

  if (has(text, ["size", "fit", "measurement", "too big", "too small", "ring size"])) {
    return {
      ...base,
      intent: "size",
      message:
        "Knitwear is drafted with a relaxed shoulder — take your usual size for the intended line, or one down for a close fit. For rings, measure the base of your finger at the end of the day: 54.4 mm is a US 7.",
      note: "Full flat measurements and a how-to-measure guide are in the size guide.",
      productSlugs: ["odette-cashmere-sweater", "halden-cashmere-crewneck", "solene-signet-ring"],
      chips: ["Open the size guide", "Is exchange free?", "Show cashmere"],
      links: [{ label: "Size & fit guide", href: "/help/size-guide" }],
    };
  }

  if (has(text, ["care", "wash", "clean", "patina", "pill", "stain"])) {
    return {
      ...base,
      intent: "care",
      message:
        "Cashmere: hand wash cool, press — never wring — and dry flat. Vegetable-tanned leather: blot spills, keep out of direct heat, and balm twice a year. Stoneware is dishwasher safe.",
      productSlugs: ["odette-cashmere-sweater", "aveline-structured-tote", "terra-hand-thrown-vase"],
      chips: ["Open the care guide", "Show cashmere", "Show leather"],
      links: [{ label: "Care instructions", href: "/help/care" }],
    };
  }

  if (has(text, ["ship", "delivery", "deliver", "arrive", "track", "return", "refund", "exchange"])) {
    return {
      ...base,
      intent: "shipping",
      message:
        "Standard delivery is 4–7 business days and complimentary above $250; express is 2–3 days. Returns are open for 30 days, and one size exchange per order is free.",
      productSlugs: [],
      chips: ["Track my order", "Show best sellers", "Find a gift"],
      links: [
        { label: "Shipping & delivery", href: "/help/shipping" },
        { label: "Track an order", href: "/track" },
      ],
    };
  }

  if (has(text, ["cart", "checkout", "basket", "my bag", "coupon", "discount code"])) {
    const cartItems = (input.cart ?? []).map(productBySlug).filter((p): p is Product => Boolean(p));
    if (cartItems.length === 0) {
      return {
        ...base,
        intent: "cart",
        message:
          "Your cart is empty at the moment. Tell me what you're looking for and I'll put something in front of you.",
        productSlugs: bestSellers(3).map((p) => p.slug),
        chips: CONCIERGE_OPENERS.slice(0, 4),
      };
    }
    const suggestion = similarProducts(cartItems[0].slug, 2);
    const subtotal = cartItems.reduce((total, item) => total + item.priceCents, 0);
    return {
      ...base,
      intent: "cart",
      message: `You have ${cartItems.length} piece${cartItems.length > 1 ? "s" : ""} in the cart, around ${formatPrice(subtotal)}. ${subtotal >= 25000 ? "Standard delivery is already complimentary." : `Add ${formatPrice(25000 - subtotal)} for complimentary delivery.`} ${nameList(suggestion)} would sit well alongside.`,
      productSlugs: suggestion.map((p) => p.slug),
      chips: ["Go to checkout", "Add gift wrapping", "Show best sellers"],
      links: [{ label: "Review the cart", href: "/checkout" }],
    };
  }

  const keywordPicks = matchByKeywords(text, 4);
  if (keywordPicks.length > 0) {
    return {
      ...base,
      intent: "discover",
      message: `Here's what matches. ${nameList(keywordPicks.slice(0, 3))} — ${keywordPicks[0].shortDescription}`,
      productSlugs: keywordPicks.map((p) => p.slug),
      chips: ["Show me something warmer", "Under $250", "Build an outfit around this"],
      links: [{ label: "Refine in the shop", href: "/shop" }],
    };
  }

  const fallback = viewed.length > 0 ? similarProducts(viewed[0].slug, 3) : bestSellers(3);
  return {
    ...base,
    intent: "fallback",
    message:
      "I haven't found an exact match for that. Try a material, a colour, an occasion or a budget — or start from these.",
    productSlugs: fallback.map((p) => p.slug),
    chips: CONCIERGE_OPENERS.slice(0, 4),
    links: [{ label: "Browse the full shop", href: "/shop" }],
  };
}
