"use client";

import Image from "next/image";
import Link from "next/link";
import { availabilityLabel, productsBySlugs } from "@/lib/catalog";
import { bestSellers } from "@/lib/recommend";
import { ProductCard } from "./product-card";
import { useStore } from "./store-provider";

export function WishlistView() {
  const store = useStore();
  const { format: formatPrice } = store;
  const products = productsBySlugs(store.wishlist);

  if (!store.ready) {
    return (
      <div className="shell py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">Loading your wishlist…</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="shell py-20">
        <div className="border border-line px-8 py-20 text-center">
          <p className="font-serif text-4xl">Your wishlist is waiting for something special.</p>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
            Save a piece from any product card and it will sit here with its price and availability
            until you are ready.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/shop" className="btn btn-ink">
              Browse the shop
            </Link>
            <button type="button" onClick={store.openConcierge} className="btn btn-outline">
              Ask the Style Concierge
            </button>
          </div>
        </div>

        <section className="mt-20" aria-labelledby="wishlist-suggestions">
          <h2 id="wishlist-suggestions" className="eyebrow">
            Most requested from the atelier
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
            {bestSellers(4).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="shell py-14">
      <p className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
        {products.length} saved {products.length === 1 ? "piece" : "pieces"}
      </p>

      <ul className="mt-8 divide-y divide-line">
        {products.map((product) => (
          <li key={product.slug} className="grid gap-6 py-8 sm:grid-cols-[10rem_1fr] sm:gap-8">
            <Link
              href={`/products/${product.slug}`}
              className="relative aspect-[4/5] w-full overflow-hidden bg-cream sm:w-40"
            >
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt}
                fill
                sizes="160px"
                className="object-cover"
              />
            </Link>
            <div className="flex flex-col">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Link href={`/products/${product.slug}`} className="font-serif text-2xl link-underline">
                    {product.name}
                  </Link>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                    {product.subtitle}
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                    {product.shortDescription}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg">{formatPrice(product.priceCents)}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-accent">
                    {availabilityLabel(product)}
                  </p>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
                <button
                  type="button"
                  disabled={product.stock === 0}
                  onClick={() => store.addToCart(product)}
                  className="btn btn-ink"
                >
                  {product.stock === 0 ? "Sold out" : "Move to cart"}
                </button>
                <button
                  type="button"
                  onClick={() => store.setQuickView(product.slug)}
                  className="btn btn-quiet"
                >
                  Quick view
                </button>
                <button
                  type="button"
                  onClick={() => store.toggleWishlist(product.slug)}
                  className="text-[11px] uppercase tracking-[0.16em] text-ink-muted hover:text-accent"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
