"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { availabilityLabel, type Product, type SizeType } from "@/lib/catalog";
import { deliveryEstimate } from "@/lib/commerce";
import { useStore } from "./store-provider";

type SizeGuide = {
  headers: [string, string, string, string];
  rows: { size: string; a: string; b: string; c: string }[];
  guidance: string;
};

const SIZE_GUIDES: Record<Exclude<SizeType, "one-size">, SizeGuide> = {
  knitwear: {
    headers: ["Size", "Chest", "Body length", "Sleeve"],
    rows: [
      { size: "XS", a: "96 cm", b: "58 cm", c: "60 cm" },
      { size: "S", a: "101 cm", b: "60 cm", c: "61 cm" },
      { size: "M", a: "106 cm", b: "62 cm", c: "62 cm" },
      { size: "L", a: "112 cm", b: "64 cm", c: "63 cm" },
      { size: "XL", a: "118 cm", b: "66 cm", c: "64 cm" },
    ],
    guidance:
      "Lay a sweater you already wear flat, smooth the fabric and measure straight across from underarm to underarm, then double it. Compare against the chest column rather than a label size.",
  },
  apparel: {
    headers: ["Size", "Chest", "Body length", "Sleeve"],
    rows: [
      { size: "XS", a: "96 cm", b: "58 cm", c: "60 cm" },
      { size: "S", a: "101 cm", b: "60 cm", c: "61 cm" },
      { size: "M", a: "106 cm", b: "62 cm", c: "62 cm" },
      { size: "L", a: "112 cm", b: "64 cm", c: "63 cm" },
      { size: "XL", a: "118 cm", b: "66 cm", c: "64 cm" },
    ],
    guidance:
      "Measure a tailored piece you already wear well: lay it flat, measure underarm to underarm and double it. Garments are drafted true to size — take your usual letter size.",
  },
  shoe: {
    headers: ["EU size", "US size", "Foot length", "Last"],
    rows: [
      { size: "36", a: "US 6", b: "23.2 cm", c: "True to size" },
      { size: "37", a: "US 6.5", b: "23.8 cm", c: "True to size" },
      { size: "38", a: "US 7", b: "24.5 cm", c: "True to size" },
      { size: "39", a: "US 8", b: "25.1 cm", c: "True to size" },
      { size: "40", a: "US 8.5", b: "25.8 cm", c: "True to size" },
      { size: "41", a: "US 9", b: "26.4 cm", c: "True to size" },
      { size: "42", a: "US 10", b: "27.1 cm", c: "True to size" },
      { size: "43", a: "US 10.5", b: "27.7 cm", c: "True to size" },
      { size: "44", a: "US 11", b: "28.4 cm", c: "True to size" },
    ],
    guidance:
      "Stand on a sheet of paper, trace the outline of each foot, and measure from the heel to the longest toe. If you sit between sizes, take the next EU size up.",
  },
  ring: {
    headers: ["Size", "Circumference", "Diameter", "Conversion"],
    rows: [
      { size: "5", a: "49.3 mm", b: "15.7 mm", c: "US 5 / EU 49" },
      { size: "6", a: "51.9 mm", b: "16.5 mm", c: "US 6 / EU 52" },
      { size: "7", a: "54.4 mm", b: "17.3 mm", c: "US 7 / EU 54" },
      { size: "8", a: "57.0 mm", b: "18.1 mm", c: "US 8 / EU 57" },
      { size: "9", a: "59.5 mm", b: "18.9 mm", c: "US 9 / EU 59" },
    ],
    guidance:
      "Wrap a strip of paper around the base of your finger, mark where it meets and measure the length in millimetres against the circumference column. Measure at the end of the day, when fingers are largest.",
  },
};

const SIZE_HINTS: Record<Exclude<SizeType, "one-size">, string> = {
  knitwear: "Relaxed shoulder — size down for a close fit.",
  apparel: "Drafted true to size — take your usual letter size.",
  shoe: "Fits true to size. Between sizes? Take the next EU size up.",
  ring: "Measure at the end of the day, when fingers are largest.",
};

export function ProductPurchase({ product }: { product: Product }) {
  const store = useStore();
  const { format: formatPrice } = store;
  const router = useRouter();
  const [colorId, setColorId] = useState(product.colors[0]?.id);
  const [size, setSize] = useState(
    product.sizes.find((option) => option.inStock)?.label ?? product.sizes[0]?.label,
  );
  const [quantity, setQuantity] = useState(1);
  const [guideOpen, setGuideOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  // Resolved after mount so a statically rendered page can never ship a stale date.
  const [estimate, setEstimate] = useState<string | null>(null);

  useEffect(() => {
    setEstimate(deliveryEstimate(store.shippingMethodId));
  }, [store.shippingMethodId]);

  useEffect(() => {
    store.markViewed(product.slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 620);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const soldOut = product.stock === 0;
  const colorName = product.colors.find((color) => color.id === colorId)?.name;
  const guide = product.sizeType === "one-size" ? null : SIZE_GUIDES[product.sizeType];

  function add(silent = false) {
    store.addToCart(product, { colorId, size, quantity, silent });
  }

  return (
    <>
      <div className="space-y-8">
        <div>
          <div className="flex flex-wrap items-baseline gap-4">
            <p className="font-serif text-2xl">
              {product.compareAtCents ? (
                <span className="mr-3 text-lg text-ink-muted line-through">
                  {formatPrice(product.compareAtCents)}
                </span>
              ) : null}
              {formatPrice(product.priceCents)}
            </p>
            <span className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
              {availabilityLabel(product)}
            </span>
          </div>
          <p className="mt-2 text-xs text-ink-muted">
            {estimate ? `Estimated delivery ${estimate} · ` : null}
            {product.shippingNote}
          </p>
        </div>

        {product.colors.length > 1 ? (
          <fieldset>
            <div className="flex items-center justify-between">
              <legend className="eyebrow">Colour</legend>
              <span className="text-xs text-ink-soft">{colorName}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setColorId(color.id)}
                  aria-pressed={colorId === color.id}
                  aria-label={color.name}
                  title={color.name}
                  className={`h-9 w-9 rounded-full border transition ${
                    colorId === color.id
                      ? "border-ink ring-1 ring-ink ring-offset-2 ring-offset-ivory"
                      : "border-line hover:border-ink/50"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </fieldset>
        ) : (
          <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">
            {product.colors[0]?.name}
          </p>
        )}

        {product.sizes.length > 1 ? (
          <fieldset>
            <div className="flex items-center justify-between">
              <legend className="eyebrow">
                {product.sizeType === "shoe" ? "Shoe size (EU)" : "Size"}
              </legend>
              <button
                type="button"
                onClick={() => setGuideOpen(true)}
                className="text-[10px] uppercase tracking-[0.16em] link-underline"
              >
                Size guide
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.sizes.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  disabled={!option.inStock}
                  onClick={() => setSize(option.label)}
                  aria-pressed={size === option.label}
                  title={option.note}
                  className={`min-w-16 border px-4 py-2.5 text-xs transition ${
                    size === option.label
                      ? "border-ink bg-ink text-ivory"
                      : "border-line hover:border-ink"
                  } disabled:cursor-not-allowed disabled:border-line-soft disabled:text-ink-muted disabled:line-through`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {product.sizeType !== "one-size" ? (
              <p className="mt-3 text-xs text-ink-muted">{SIZE_HINTS[product.sizeType]}</p>
            ) : null}
          </fieldset>
        ) : null}

        <div className="flex items-center gap-5">
          <div className="flex items-center border border-line">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="grid h-11 w-11 place-items-center text-ink-soft transition hover:text-ink"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-10 text-center text-sm" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.min(10, value + 1))}
              className="grid h-11 w-11 place-items-center text-ink-soft transition hover:text-ink"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <span className="text-xs text-ink-muted">
            {product.stock > 0 ? `${product.stock} in the current run` : "Sold out"}
          </span>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            disabled={soldOut}
            onClick={() => add(false)}
            data-cursor="Add"
            className="btn btn-ink w-full"
          >
            {soldOut ? "Sold out" : "Add to cart"}
          </button>
          <button
            type="button"
            disabled={soldOut}
            onClick={() => {
              add(true);
              store.track("checkout_start", { slug: product.slug, source: "buy_now" });
              router.push("/checkout");
            }}
            className="btn btn-outline w-full"
          >
            Buy now
          </button>
          <button
            type="button"
            onClick={() => store.toggleWishlist(product.slug)}
            className="w-full py-2 text-center text-[11px] uppercase tracking-[0.18em] text-ink-soft link-underline"
          >
            {store.isWishlisted(product.slug) ? "Saved to wishlist" : "Add to wishlist"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 border-y border-line py-5 text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          <span>Complimentary above $250</span>
          <span>30-day returns</span>
          <span>Repairs for life</span>
        </div>
      </div>

      {/* Mobile sticky add to cart */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-ivory/97 px-4 py-3 backdrop-blur transition-transform duration-500 lg:hidden ${
          stickyVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-base">{product.name}</p>
            <p className="text-xs text-ink-muted">
              {formatPrice(product.priceCents)} · {colorName}
              {size && size !== "One size" ? ` · ${size}` : ""}
            </p>
          </div>
          <button
            type="button"
            disabled={soldOut}
            onClick={() => add(false)}
            className="btn btn-ink !px-6 !py-3"
          >
            {soldOut ? "Sold out" : "Add"}
          </button>
        </div>
      </div>

      {guideOpen && guide ? (
        <div
          className="fixed inset-0 z-[95] flex items-end justify-center md:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Size guide"
        >
          <div className="fade-in absolute inset-0 bg-ink/35" onClick={() => setGuideOpen(false)} />
          <div className="sheet-in relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto bg-ivory p-7 md:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow">Size &amp; fit</p>
                <h2 className="mt-3 font-serif text-3xl">
                  {product.sizeType === "shoe"
                    ? "Footwear sizing"
                    : product.sizeType === "ring"
                      ? "Ring sizing"
                      : "Garment measurements"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setGuideOpen(false)}
                className="text-[10px] uppercase tracking-[0.18em]"
              >
                Close
              </button>
            </div>

            <table className="mt-8 w-full border-collapse text-sm">
              <caption className="sr-only">Size guide for {product.name}</caption>
              <thead>
                <tr className="border-b border-ink text-left text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  {guide.headers.map((header) => (
                    <th scope="col" key={header} className="py-3">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {guide.rows.map((row) => (
                  <tr key={row.size} className="border-b border-line-soft">
                    <th scope="row" className="py-3 text-left font-normal">
                      {row.size}
                    </th>
                    <td className="py-3 text-ink-soft">{row.a}</td>
                    <td className="py-3 text-ink-soft">{row.b}</td>
                    <td className="py-3 text-ink-soft">{row.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink-soft">
              <p>
                <span className="text-ink">How to measure.</span> {guide.guidance}
              </p>
              <p>
                One size exchange per order is complimentary. Full guidance lives in the{" "}
                <Link href="/help/size-guide" className="link-underline text-ink">
                  size &amp; fit guide
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
