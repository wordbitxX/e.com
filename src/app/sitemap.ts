import type { MetadataRoute } from "next";
import { CATEGORIES, COLLECTIONS, PRODUCTS } from "@/lib/catalog";
import { ARTICLES } from "@/lib/journal";
import { HELP_DOCS } from "@/lib/brand";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
      { url: `${SITE_URL}/shop`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${SITE_URL}/collections`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${SITE_URL}/journal`, changeFrequency: "weekly", priority: 0.7 },
      { url: `${SITE_URL}/gifts`, changeFrequency: "monthly", priority: 0.8 },
      { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
      { url: `${SITE_URL}/wishlist`, changeFrequency: "monthly", priority: 0.3 },
      { url: `${SITE_URL}/track`, changeFrequency: "monthly", priority: 0.4 },
      {
        url: `${SITE_URL}/case-studies/ecommerce-experience`,
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/ecommerce-website-development`,
        changeFrequency: "monthly",
        priority: 0.9,
      },
    ] as const
  ).map((entry) => ({ ...entry, lastModified: now }));

  return [
    ...staticRoutes,
    ...CATEGORIES.map((category) => ({
      url: `${SITE_URL}/shop?category=${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...COLLECTIONS.map((collection) => ({
      url: `${SITE_URL}/collections/${collection.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...PRODUCTS.map((product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified: new Date(product.releasedAt),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...ARTICLES.map((article) => ({
      url: `${SITE_URL}/journal/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...HELP_DOCS.map((doc) => ({
      url: `${SITE_URL}/help/${doc.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
