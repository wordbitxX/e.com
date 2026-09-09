import { CATEGORIES, COLLECTIONS, PRODUCTS } from "./catalog";
import { ARTICLES } from "./journal";

export type SearchHit = {
  kind: "product" | "collection" | "category" | "article";
  title: string;
  subtitle: string;
  href: string;
  image?: string;
  priceCents?: number;
  compareAtCents?: number;
  score: number;
};

export type SearchResponse = {
  query: string;
  total: number;
  products: SearchHit[];
  collections: SearchHit[];
  categories: SearchHit[];
  articles: SearchHit[];
  suggestions: string[];
};

export const POPULAR_SEARCHES = [
  "cashmere",
  "tote bag",
  "gifts under 250",
  "gold",
  "candle",
  "ceramics",
  "black",
];

const normalise = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function matchScore(tokens: string[], haystacks: { text: string; weight: number }[]): number {
  let score = 0;
  for (const token of tokens) {
    for (const hay of haystacks) {
      const text = normalise(hay.text);
      if (text === token) score += hay.weight * 3;
      else if (text.startsWith(token)) score += hay.weight * 2;
      else if (text.includes(token)) score += hay.weight;
    }
  }
  return score;
}

export function searchCatalog(rawQuery: string, limitPerGroup = 5): SearchResponse {
  const query = rawQuery.trim();
  const tokens = normalise(query).split(/\s+/).filter((token) => token.length > 1);

  if (tokens.length === 0) {
    return {
      query,
      total: 0,
      products: [],
      collections: [],
      categories: [],
      articles: [],
      suggestions: POPULAR_SEARCHES,
    };
  }

  const products: SearchHit[] = PRODUCTS.map((product) => {
    const score = matchScore(tokens, [
      { text: product.name, weight: 6 },
      { text: product.subtitle, weight: 2 },
      { text: product.shortDescription, weight: 1.5 },
      { text: product.keyword, weight: 3 },
      { text: product.categorySlug.replace(/-/g, " "), weight: 2 },
      { text: product.colors.map((c) => c.name).join(" "), weight: 2.5 },
      { text: product.moods.join(" "), weight: 1.5 },
      { text: product.occasions.join(" "), weight: 1.2 },
      { text: product.recipients.join(" "), weight: 1.2 },
      { text: product.materials.join(" "), weight: 1 },
      { text: product.sku, weight: 4 },
    ]);
    return {
      kind: "product" as const,
      title: product.name,
      subtitle: product.subtitle,
      href: `/products/${product.slug}`,
      image: product.images[0]?.url,
      priceCents: product.priceCents,
      compareAtCents: product.compareAtCents,
      score,
    };
  })
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limitPerGroup);

  const collections: SearchHit[] = COLLECTIONS.map((collection) => ({
    kind: "collection" as const,
    title: collection.name,
    subtitle: collection.tagline,
    href: `/collections/${collection.slug}`,
    image: collection.image,
    score: matchScore(tokens, [
      { text: collection.name, weight: 6 },
      { text: collection.tagline, weight: 2 },
      { text: collection.keyword, weight: 3 },
    ]),
  }))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const categories: SearchHit[] = CATEGORIES.map((category) => ({
    kind: "category" as const,
    title: category.name,
    subtitle: category.tagline,
    href: `/shop?category=${category.slug}`,
    score: matchScore(tokens, [
      { text: category.name, weight: 6 },
      { text: category.tagline, weight: 2 },
      { text: category.keyword, weight: 3 },
      { text: category.description, weight: 1 },
    ]),
  }))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const articles: SearchHit[] = ARTICLES.map((article) => ({
    kind: "article" as const,
    title: article.title,
    subtitle: article.category,
    href: `/journal/${article.slug}`,
    image: article.heroImage,
    score: matchScore(tokens, [
      { text: article.title, weight: 5 },
      { text: article.deck, weight: 1.5 },
      { text: article.keyword, weight: 3 },
      { text: article.category, weight: 2 },
    ]),
  }))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const total = products.length + collections.length + categories.length + articles.length;

  return {
    query,
    total,
    products,
    collections,
    categories,
    articles,
    suggestions: total === 0 ? POPULAR_SEARCHES : [],
  };
}
