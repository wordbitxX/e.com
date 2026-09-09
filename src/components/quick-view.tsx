"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { availabilityLabel, productBySlug } from "@/lib/catalog";
import { useStore } from "./store-provider";

export function QuickView() {
  const store = useStore();
  const { format: formatPrice } = store;
  const slug = store.ui.quickViewSlug;
  const product = slug ? productBySlug(slug) : undefined;
  const [colorId, setColorId] = useState<string | undefined>(undefined);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (product) {
      setColorId(product.colors[0]?.id);
      setSize(product.sizes.find((option) => option.inStock)?.label ?? product.sizes[0]?.label);
      setImageIndex(0);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[85] flex items-end justify-center md:items-center" role="dialog" aria-modal="true" aria-label={`${product.name} quick view`}>
      <div className="fade-in absolute inset-0 bg-ink/35" onClick={() => store.setQuickView(null)} />
      <div className="sheet-in relative z-10 grid max-h-[92vh] w-full max-w-4xl grid-cols-1 overflow-y-auto bg-ivory md:grid-cols-2">
        <button
          type="button"
          onClick={() => store.setQuickView(null)}
          className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center bg-ivory/90 text-ink"
          aria-label="Close quick view"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
        </button>

        <div className="relative aspect-[4/5] bg-cream">
          <Image
            src={product.images[imageIndex].url}
            alt={product.images[imageIndex].alt}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover"
          />
          <div className="absolute bottom-3 left-3 flex gap-2">
            {product.images.slice(0, 4).map((image, index) => (
              <button
                key={image.url}
                type="button"
                onClick={() => setImageIndex(index)}
                aria-label={`View image ${index + 1}`}
                aria-current={index === imageIndex}
                className={`h-12 w-10 overflow-hidden border ${
                  index === imageIndex ? "border-ink" : "border-transparent"
                }`}
              >
                <span className="relative block h-full w-full">
                  <Image src={image.url} alt="" fill sizes="40px" className="object-cover" />
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col p-6 md:p-8">
          <p className="eyebrow">{product.subtitle}</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight">{product.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{product.shortDescription}</p>

          <p className="mt-5 text-lg">
            {product.compareAtCents ? (
              <span className="mr-3 text-ink-muted line-through">
                {formatPrice(product.compareAtCents)}
              </span>
            ) : null}
            {formatPrice(product.priceCents)}
          </p>

          {product.colors.length > 1 ? (
            <fieldset className="mt-6">
              <legend className="eyebrow">Colour</legend>
              <div className="mt-3 flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setColorId(color.id)}
                    aria-pressed={colorId === color.id}
                    aria-label={color.name}
                    title={color.name}
                    className={`h-8 w-8 rounded-full border transition ${
                      colorId === color.id ? "border-ink ring-1 ring-ink ring-offset-2 ring-offset-ivory" : "border-line"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </fieldset>
          ) : null}

          {product.sizes.length > 1 ? (
            <fieldset className="mt-6">
              <legend className="eyebrow">Size</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    disabled={!option.inStock}
                    onClick={() => setSize(option.label)}
                    aria-pressed={size === option.label}
                    className={`min-w-14 border px-3 py-2 text-xs transition ${
                      size === option.label ? "border-ink bg-ink text-ivory" : "border-line hover:border-ink"
                    } disabled:cursor-not-allowed disabled:opacity-35`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            {availabilityLabel(product)} · {product.shippingNote}
          </p>

          <div className="mt-auto space-y-3 pt-8">
            <button
              type="button"
              disabled={product.stock === 0}
              onClick={() => {
                store.addToCart(product, { colorId, size });
                store.setQuickView(null);
              }}
              className="btn btn-ink w-full"
            >
              {product.stock === 0 ? "Sold out" : "Add to cart"}
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => store.toggleWishlist(product.slug)}
                className="btn btn-quiet flex-1"
              >
                {store.isWishlisted(product.slug) ? "Saved" : "Add to wishlist"}
              </button>
              <Link
                href={`/products/${product.slug}`}
                onClick={() => store.setQuickView(null)}
                className="btn btn-outline flex-1"
              >
                Full details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
