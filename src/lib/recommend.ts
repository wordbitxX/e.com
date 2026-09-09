import {
  PRODUCTS,
  productBySlug,
  productsBySlugs,
  type Product,
} from "./catalog";

/* ---------------------------------------------------------------------------
 * Recommendation layer
 *
 * Demo logic only — scored from catalog attributes (category, collection,
 * mood, price proximity) plus the visitor's own session history. No claims are
 * made about other shoppers' behaviour. Swapping in a real recommendation API
 * means replacing `scoreAgainst` and keeping the same call signatures.
 * ------------------------------------------------------------------------- */

function overlap(a: string[], b: string[]): number {
  const set = new Set(b);
  return a.filter((item) => set.has(item)).length;
}

function scoreAgainst(candidate: Product, seed: Product): number {
  let score = 0;
  if (candidate.categorySlug === seed.categorySlug) score += 3;
  score += overlap(candidate.collectionSlugs, seed.collectionSlugs) * 2;
  score += overlap(candidate.moods, seed.moods) * 1.5;
  score += overlap(candidate.occasions, seed.occasions);
  score += overlap(candidate.recipients, seed.recipients) * 0.5;
  const priceDelta = Math.abs(candidate.priceCents - seed.priceCents);
  score += Math.max(0, 2 - priceDelta / 25000);
  if (seed.complements.includes(candidate.slug)) score += 4;
  return score;
}

export function similarProducts(slug: string, limit = 4): Product[] {
  const seed = productBySlug(slug);
  if (!seed) return PRODUCTS.slice(0, limit);
  return PRODUCTS.filter((p) => p.slug !== slug && p.stock > 0)
    .map((p) => ({ product: p, score: scoreAgainst(p, seed) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.product);
}

export function completeTheLook(slug: string, limit = 3): Product[] {
  const seed = productBySlug(slug);
  if (!seed) return [];
  const explicit = productsBySlugs(seed.complements);
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const filler = similarProducts(slug, limit + 3).filter(
    (p) => !explicit.some((e) => e.slug === p.slug),
  );
  return [...explicit, ...filler].slice(0, limit);
}

export function pickedForYou(history: string[], limit = 4): Product[] {
  const seeds = productsBySlugs(history.slice(0, 4));
  if (seeds.length === 0) {
    return [...PRODUCTS].sort((a, b) => a.salesRank - b.salesRank).slice(0, limit);
  }
  const seen = new Set(history);
  return PRODUCTS.filter((p) => !seen.has(p.slug) && p.stock > 0)
    .map((p) => ({
      product: p,
      score: seeds.reduce((total, seed) => total + scoreAgainst(p, seed), 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.product);
}

export function bestSellers(limit = 6): Product[] {
  return [...PRODUCTS].sort((a, b) => a.salesRank - b.salesRank).slice(0, limit);
}

export function newestProducts(limit = 6): Product[] {
  return [...PRODUCTS]
    .sort((a, b) => new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime())
    .slice(0, limit);
}

export function giftMatches(input: {
  occasion?: string;
  recipient?: string;
  budgetCents?: number;
  mood?: string;
  limit?: number;
}): Product[] {
  const { occasion, recipient, budgetCents, mood, limit = 6 } = input;
  return PRODUCTS.filter((p) => p.stock > 0)
    .filter((p) => (budgetCents ? p.priceCents <= budgetCents : true))
    .map((p) => {
      let score = 0;
      if (occasion && p.occasions.includes(occasion)) score += 4;
      if (recipient && p.recipients.includes(recipient)) score += 4;
      if (mood && p.moods.includes(mood)) score += 3;
      if (p.collectionSlugs.includes("the-gift-edit")) score += 2;
      if (budgetCents) score += Math.max(0, 2 - Math.abs(budgetCents - p.priceCents) / budgetCents);
      score += (20 - p.salesRank) / 20;
      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.product);
}

export const GIFT_OCCASIONS = [
  "birthday",
  "anniversary",
  "housewarming",
  "wedding",
  "wedding guest",
  "graduation",
  "new job",
  "thank you",
  "holiday",
  "milestone",
  "just because",
] as const;

export const GIFT_RECIPIENTS = [
  "for her",
  "for him",
  "for a parent",
  "for a friend",
  "for a colleague",
  "for the home",
  "for a couple",
] as const;

export const GIFT_BUDGETS = [
  { label: "Under $150", cents: 15000 },
  { label: "Under $250", cents: 25000 },
  { label: "Under $500", cents: 50000 },
  { label: "No limit", cents: 1000000 },
] as const;
