"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { productsBySlugs, type Product } from "@/lib/catalog";
import { pickedForYou } from "@/lib/recommend";
import { ProductCard } from "./product-card";
import { useStore } from "./store-provider";

export function ProductGrid({
  products,
  columns = 4,
  priorityCount = 0,
}: {
  products: Product[];
  columns?: 2 | 3 | 4;
  priorityCount?: number;
}) {
  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 ${cols}`}>
      {products.map((product, index) => (
        <ProductCard key={product.slug} product={product} priority={index < priorityCount} />
      ))}
    </div>
  );
}

export function ProductRail({
  products,
  reasons,
}: {
  products: Product[];
  reasons?: Record<string, string>;
}) {
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:-mx-10 md:px-10">
      {products.map((product) => (
        <div
          key={product.slug}
          className="w-[68vw] shrink-0 snap-start sm:w-[42vw] lg:w-[24vw] xl:w-[21rem]"
        >
          <ProductCard
            product={product}
            reason={reasons?.[product.slug]}
            sizes="(max-width: 640px) 68vw, (max-width: 1024px) 42vw, 340px"
          />
        </div>
      ))}
    </div>
  );
}

export function PickedForYou({ fallbackSlugs }: { fallbackSlugs: string[] }) {
  const store = useStore();
  const [products, setProducts] = useState<Product[]>(productsBySlugs(fallbackSlugs));
  const [personal, setPersonal] = useState(false);

  useEffect(() => {
    if (!store.ready) return;
    if (store.recentlyViewed.length > 0) {
      setProducts(pickedForYou(store.recentlyViewed, 4));
      setPersonal(true);
    }
  }, [store.ready, store.recentlyViewed]);

  if (products.length === 0) return null;

  return (
    <section className="shell py-20" aria-labelledby="picked-heading">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="eyebrow">Style intelligence</p>
          <h2 id="picked-heading" className="mt-3 font-serif text-4xl md:text-5xl">
            {personal ? "Because you viewed" : "Picked for you"}
          </h2>
        </div>
        <p className="max-w-sm text-sm text-ink-soft">
          {personal
            ? "Matched to the pieces you opened in this session — material, tone and price proximity."
            : "A starting selection. Open a few pieces and this list rearranges itself around them."}
        </p>
      </div>
      <div className="pt-10">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}

export function RecentlyViewed({ excludeSlug }: { excludeSlug?: string }) {
  const store = useStore();
  const slugs = store.recentlyViewed.filter((slug) => slug !== excludeSlug).slice(0, 4);
  const products = productsBySlugs(slugs);
  if (products.length === 0) return null;

  return (
    <section className="shell border-t border-line py-16" aria-labelledby="recently-viewed">
      <h2 id="recently-viewed" className="eyebrow">
        Recently viewed
      </h2>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}

export function ConciergeCta({
  prompts,
  variant = "panel",
}: {
  prompts: string[];
  variant?: "panel" | "inline";
}) {
  const store = useStore();

  if (variant === "inline") {
    return (
      <button type="button" onClick={store.openConcierge} className="btn btn-outline">
        Ask the Style Concierge
      </button>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => {
            store.openConcierge();
            store.track("concierge_message", { prompt, source: "cta" });
          }}
          className="border border-line bg-ivory px-4 py-2.5 text-xs transition hover:border-ink hover:bg-cream"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}

export function WishlistButton({ slug, label }: { slug: string; label?: string }) {
  const store = useStore();
  const saved = store.isWishlisted(slug);
  return (
    <button type="button" onClick={() => store.toggleWishlist(slug)} className="btn btn-quiet w-full">
      {saved ? "Saved to wishlist" : (label ?? "Add to wishlist")}
    </button>
  );
}

export function SearchTrigger({ className }: { className?: string }) {
  const store = useStore();
  return (
    <button type="button" onClick={store.openSearch} className={className}>
      Search the atelier
    </button>
  );
}

export function InternalLinkRow({
  links,
  title,
}: {
  links: { label: string; href: string }[];
  title: string;
}) {
  return (
    <nav aria-label={title} className="shell border-t border-line py-10">
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="link-underline hover:text-ink">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
