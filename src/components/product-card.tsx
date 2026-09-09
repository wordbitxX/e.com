"use client";

import Image from "next/image";
import Link from "next/link";
import { availabilityLabel, isLowStock, type Product } from "@/lib/catalog";
import { sampleRating } from "@/lib/sample-reviews";
import { RatingStars } from "./rating-stars";
import { useStore } from "./store-provider";

type Props = {
  product: Product;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
  reason?: string;
  sizes?: string;
};

function discountPercent(product: Product): number | null {
  if (!product.compareAtCents || product.compareAtCents <= product.priceCents) return null;
  return Math.round((1 - product.priceCents / product.compareAtCents) * 100);
}

export function ProductCard({ product, priority, size = "md", reason, sizes }: Props) {
  const store = useStore();
  const { format: formatPrice } = store;
  const primary = product.images[0];
  const secondary = product.images[1] ?? primary;
  const wishlisted = store.isWishlisted(product.slug);
  const soldOut = product.stock === 0;
  const rating = sampleRating(product.slug);
  const discount = discountPercent(product);
  const bestSeller = product.salesRank <= 3;
  const isSm = size === "sm";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-ivory transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-35px_rgba(28,24,20,0.55)]">
      <div className={`relative bg-cream ${isSm ? "aspect-[4/5]" : "aspect-[4/5]"}`}>
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 z-10"
          data-cursor="View"
          aria-label={`View ${product.name}`}
          onClick={() => store.track("product_click", { slug: product.slug })}
        />
        <Image
          src={primary.url}
          alt={primary.alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05] group-hover:opacity-0"
        />
        <Image
          src={secondary.url}
          alt={secondary.alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"}
          loading="lazy"
          className="scale-[1.07] object-cover opacity-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:opacity-100"
        />

        <div className="pointer-events-none absolute left-3 top-3 z-20 flex flex-col items-start gap-1.5">
          {discount ? (
            <span className="px-2 py-1 text-[10px] font-bold tracking-[0.06em] text-ivory shadow-sm">
              <span className="bg-accent px-1.5 py-0.5">−{discount}%</span>
            </span>
          ) : null}
          {bestSeller ? (
            <span className="bg-champagne px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-ink">
              Best Seller
            </span>
          ) : null}
          {product.badge ? (
            <span className="bg-ink px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-ivory">
              {product.badge}
            </span>
          ) : null}
          {soldOut ? (
            <span className="bg-ink/85 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-ivory">
              Sold out
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => store.toggleWishlist(product.slug)}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute right-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-full bg-ivory/95 text-ink shadow-sm transition hover:bg-ink hover:text-ivory"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
            <path
              d="M12 20.5s-7.5-4.6-7.5-9.6a4.2 4.2 0 0 1 7.5-2.6 4.2 4.2 0 0 1 7.5 2.6c0 5-7.5 9.6-7.5 9.6Z"
              fill={wishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.1"
            />
          </svg>
        </button>

        <div className="absolute inset-x-3 bottom-3 z-20 translate-y-3 opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                store.addToCart(product);
              }}
              disabled={soldOut}
              className="flex-1 rounded-lg bg-ink/95 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ivory transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              {soldOut ? "Sold out" : "Add to cart"}
            </button>
            <button
              type="button"
              onClick={() => {
                store.setQuickView(product.slug);
                store.track("quick_view_open", { slug: product.slug });
              }}
              className="rounded-lg bg-ivory/95 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-ink hover:text-ivory"
            >
              View
            </button>
          </div>
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${isSm ? "p-3" : "p-4"}`}>
        {reason ? (
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-accent">
            {reason}
          </p>
        ) : (
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
            Veranne
          </p>
        )}
        <h3
          className={`font-serif leading-snug ${
            isSm ? "text-[15px]" : "text-[17px]"
          } line-clamp-2`}
        >
          <Link href={`/products/${product.slug}`} className="hover:text-accent">
            {product.name}
          </Link>
        </h3>
        <p className="mt-0.5 line-clamp-1 text-[11px] text-ink-muted">{product.subtitle}</p>

        {rating ? (
          <RatingStars average={rating.average} count={rating.count} className="mt-2" />
        ) : (
          <span className="mt-2 block h-4" />
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[15px] font-bold text-ink">
                {formatPrice(product.priceCents)}
              </span>
              {product.compareAtCents ? (
                <span className="text-xs text-ink-muted line-through">
                  {formatPrice(product.compareAtCents)}
                </span>
              ) : null}
            </div>
            <p
              className={`mt-0.5 text-[10px] uppercase tracking-[0.12em] ${
                soldOut ? "text-accent" : isLowStock(product) ? "text-accent" : "text-ink-muted"
              }`}
            >
              {availabilityLabel(product)}
            </p>
          </div>
          <button
            type="button"
            disabled={soldOut}
            onClick={() => store.addToCart(product)}
            className="rounded-lg border border-ink px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-ink hover:text-ivory disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={`Add ${product.name} to cart`}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
