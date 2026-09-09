"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { productBySlug } from "@/lib/catalog";
import { FREE_SHIPPING_THRESHOLD_CENTS } from "@/lib/commerce";
import { completeTheLook } from "@/lib/recommend";
import { useStore, type CartLine } from "./store-provider";

function LineRow({
  line,
  variant,
}: {
  line: CartLine;
  variant: "cart" | "saved";
}) {
  const store = useStore();
  const { format: formatPrice } = store;
  const product = productBySlug(line.slug);
  if (!product) return null;
  const colorName = product.colors.find((color) => color.id === line.colorId)?.name;

  return (
    <li className="flex gap-4 border-b border-line-soft py-5">
      <Link
        href={`/products/${product.slug}`}
        onClick={store.closeCart}
        className="relative h-28 w-22 shrink-0 overflow-hidden bg-cream"
        style={{ width: "5.5rem" }}
      >
        <Image
          src={product.images[0].url}
          alt={product.images[0].alt}
          fill
          sizes="88px"
          className="object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              href={`/products/${product.slug}`}
              onClick={store.closeCart}
              className="font-serif text-lg leading-tight link-underline"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              {[colorName, line.size !== "One size" ? line.size : null].filter(Boolean).join(" · ") ||
                "One size"}
            </p>
          </div>
          <p className="whitespace-nowrap text-sm">
            {formatPrice(product.priceCents * line.quantity)}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          {variant === "cart" ? (
            <div className="flex items-center border border-line">
              <button
                type="button"
                onClick={() => store.setQuantity(line.id, line.quantity - 1)}
                className="grid h-8 w-8 place-items-center text-ink-soft transition hover:text-ink"
                aria-label={`Decrease quantity of ${product.name}`}
              >
                −
              </button>
              <span className="w-8 text-center text-sm" aria-live="polite">
                {line.quantity}
              </span>
              <button
                type="button"
                onClick={() => store.setQuantity(line.id, line.quantity + 1)}
                className="grid h-8 w-8 place-items-center text-ink-soft transition hover:text-ink"
                aria-label={`Increase quantity of ${product.name}`}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => store.moveToCart(line.id)}
              className="text-[10px] uppercase tracking-[0.18em] text-ink transition hover:text-accent"
            >
              Move to cart
            </button>
          )}

          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.16em] text-ink-muted">
            {variant === "cart" ? (
              <button
                type="button"
                onClick={() => store.saveForLater(line.id)}
                className="transition hover:text-ink"
              >
                Save for later
              </button>
            ) : null}
            <button
              type="button"
              onClick={() =>
                variant === "cart" ? store.removeLine(line.id) : store.removeSaved(line.id)
              }
              className="transition hover:text-accent"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export function CartDrawer() {
  const store = useStore();
  const { format: formatPrice } = store;
  const [code, setCode] = useState("");
  const [couponNote, setCouponNote] = useState("");
  const open = store.ui.cartOpen;
  const totals = store.totals;
  const progress = Math.min(
    100,
    Math.round(((FREE_SHIPPING_THRESHOLD_CENTS - totals.freeShippingRemainingCents) /
      FREE_SHIPPING_THRESHOLD_CENTS) *
      100),
  );

  const suggestion = store.cart.length > 0 ? completeTheLook(store.cart[0].slug, 2) : [];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="fade-in absolute inset-0 bg-ink/25" onClick={store.closeCart} />
      <aside className="drawer-in absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-[0_0_60px_-20px_rgba(26,24,21,0.5)]">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <h2 className="font-serif text-2xl">Your cart</h2>
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              {store.cartCount} item{store.cartCount === 1 ? "" : "s"}
            </p>
          </div>
          <button
            type="button"
            onClick={store.closeCart}
            className="grid h-9 w-9 place-items-center text-ink-soft transition hover:text-ink"
            aria-label="Close cart"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.2" fill="none" />
            </svg>
          </button>
        </div>

        {store.cart.length > 0 ? (
          <div className="border-b border-line bg-cream px-6 py-4">
            <p className="text-xs text-ink-soft">
              {totals.freeShippingRemainingCents > 0 ? (
                <>
                  You&rsquo;re{" "}
                  <span className="text-ink">{formatPrice(totals.freeShippingRemainingCents)}</span>{" "}
                  away from complimentary shipping.
                </>
              ) : (
                "Complimentary shipping unlocked."
              )}
            </p>
            <div
              className="mt-3 h-[3px] w-full bg-line"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progress toward complimentary shipping"
            >
              <div
                className="h-full bg-accent transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : null}

        <div className="flex-1 overflow-y-auto px-6">
          {store.cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <p className="font-serif text-2xl">Your cart is empty</p>
              <p className="mt-3 max-w-xs text-sm text-ink-soft">
                Everything in the atelier is made in small runs. Start with the pieces we remake most.
              </p>
              <Link href="/collections/best-sellers" onClick={store.closeCart} className="btn btn-ink mt-8">
                Shop best sellers
              </Link>
              <button
                type="button"
                onClick={() => {
                  store.closeCart();
                  store.openConcierge();
                }}
                className="mt-4 text-[11px] uppercase tracking-[0.2em] text-ink-soft link-underline"
              >
                Ask the Style Concierge
              </button>
            </div>
          ) : (
            <>
              <ul>
                {store.cart.map((line) => (
                  <LineRow key={line.id} line={line} variant="cart" />
                ))}
              </ul>

              {suggestion.length > 0 ? (
                <div className="py-6">
                  <p className="eyebrow">Complete the look</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {suggestion.map((product) => (
                      <div key={product.slug} className="border border-line p-3">
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={store.closeCart}
                          className="relative block aspect-[4/5] overflow-hidden bg-cream"
                        >
                          <Image
                            src={product.images[0].url}
                            alt={product.images[0].alt}
                            fill
                            sizes="160px"
                            className="object-cover"
                          />
                        </Link>
                        <p className="mt-2 font-serif text-sm leading-tight">{product.name}</p>
                        <p className="text-xs text-ink-muted">{formatPrice(product.priceCents)}</p>
                        <button
                          type="button"
                          onClick={() => store.addToCart(product, { silent: true })}
                          className="mt-2 w-full border border-line py-1.5 text-[10px] uppercase tracking-[0.16em] transition hover:border-ink"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}

          {store.saved.length > 0 ? (
            <div className="py-6">
              <p className="eyebrow">Saved for later</p>
              <ul className="mt-2">
                {store.saved.map((line) => (
                  <LineRow key={`saved-${line.id}`} line={line} variant="saved" />
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {store.cart.length > 0 ? (
          <div className="border-t border-line px-6 py-5">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const result = store.applyCoupon(code);
                setCouponNote(result.message);
                if (result.ok) {
                  store.track("coupon_apply", { code: code.toUpperCase() });
                  setCode("");
                }
              }}
              className="flex items-center gap-3 border-b border-line pb-3"
            >
              <label htmlFor="cart-coupon" className="sr-only">
                Discount code
              </label>
              <input
                id="cart-coupon"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Discount code"
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink-muted"
              />
              <button type="submit" className="text-[10px] uppercase tracking-[0.2em] hover:text-accent">
                Apply
              </button>
            </form>
            {couponNote || store.couponCode ? (
              <p className="mt-2 text-xs text-ink-soft">
                {store.couponCode ? (
                  <>
                    <span className="text-ink">{store.couponCode}</span> ·{" "}
                    {totals.couponMessage ?? couponNote}{" "}
                    <button
                      type="button"
                      onClick={() => {
                        store.clearCoupon();
                        setCouponNote("");
                      }}
                      className="ml-1 underline"
                    >
                      remove
                    </button>
                  </>
                ) : (
                  couponNote
                )}
              </p>
            ) : (
              <p className="mt-2 text-xs text-ink-muted">Try ATELIER10 or FIRSTLIGHT.</p>
            )}

            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd>{formatPrice(totals.subtotalCents)}</dd>
              </div>
              {totals.discountCents > 0 ? (
                <div className="flex justify-between text-accent">
                  <dt>Discount</dt>
                  <dd>−{formatPrice(totals.discountCents)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping estimate</dt>
                <dd>{totals.shippingCents === 0 ? "Complimentary" : formatPrice(totals.shippingCents)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 font-serif text-xl">
                <dt>Total</dt>
                <dd>{formatPrice(totals.totalCents)}</dd>
              </div>
            </dl>
            <p className="mt-2 text-[11px] text-ink-muted">
              Duties and local sales tax are calculated at the destination.
            </p>

            <Link
              href="/checkout"
              onClick={() => {
                store.closeCart();
                store.track("checkout_start", { value: totals.totalCents });
              }}
              data-cursor="Continue"
              className="btn btn-ink mt-5 w-full"
            >
              Continue to checkout
            </Link>
            <button
              type="button"
              onClick={store.closeCart}
              className="mt-3 w-full text-center text-[11px] uppercase tracking-[0.18em] text-ink-soft link-underline"
            >
              Continue shopping
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
