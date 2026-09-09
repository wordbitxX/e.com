"use client";

import Link from "next/link";
import { useState } from "react";
import { productsBySlugs } from "@/lib/catalog";
import { ProductCard } from "./product-card";
import { useStore } from "./store-provider";

const TABS = [
  "Profile",
  "Orders",
  "Wishlist",
  "Addresses",
  "Preferences",
  "Recently viewed",
  "Notifications",
] as const;

type Tab = (typeof TABS)[number];

export function AccountDashboard() {
  const store = useStore();
  const { format: formatPrice } = store;
  const [tab, setTab] = useState<Tab>("Profile");
  const [orderLookup, setOrderLookup] = useState("");
  const wishlist = productsBySlugs(store.wishlist);
  const viewed = productsBySlugs(store.recentlyViewed.slice(0, 4));

  return (
    <div className="shell grid gap-12 py-14 lg:grid-cols-[15rem_1fr] lg:gap-20">
      <nav aria-label="Account sections">
        <ul className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-28 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
          {TABS.map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => setTab(item)}
                aria-current={tab === item ? "page" : undefined}
                className={`whitespace-nowrap border-b px-3 py-2.5 text-left text-[11px] uppercase tracking-[0.16em] transition lg:w-full ${
                  tab === item
                    ? "border-ink text-ink"
                    : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        {tab === "Profile" ? (
          <section aria-label="Profile">
            <h2 className="font-serif text-3xl">Profile</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
              Authentication is architected but intentionally not enabled in this demonstration. The
              account shell reads from an anonymous session identifier held in your browser and
              mirrored in the database — the same identifier an authenticated user record would
              later own.
            </p>
            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="border border-line p-5">
                <dt className="eyebrow">Session</dt>
                <dd className="mt-2 break-all text-sm text-ink-soft">
                  {store.sessionId || "initialising…"}
                </dd>
              </div>
              <div className="border border-line p-5">
                <dt className="eyebrow">Saved pieces</dt>
                <dd className="mt-2 text-sm text-ink-soft">{store.wishlist.length}</dd>
              </div>
              <div className="border border-line p-5">
                <dt className="eyebrow">Cart value</dt>
                <dd className="mt-2 text-sm text-ink-soft">
                  {formatPrice(store.totals.subtotalCents)}
                </dd>
              </div>
              <div className="border border-line p-5">
                <dt className="eyebrow">Pieces viewed</dt>
                <dd className="mt-2 text-sm text-ink-soft">{store.recentlyViewed.length}</dd>
              </div>
            </dl>
          </section>
        ) : null}

        {tab === "Orders" ? (
          <section aria-label="Orders">
            <h2 className="font-serif text-3xl">Orders</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
              Orders placed in this demonstration are written to PostgreSQL and can be retrieved by
              order number. Once authentication is enabled, this panel lists them automatically
              against the customer record.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (orderLookup.trim().length > 3) {
                  window.location.href = `/track?order=${encodeURIComponent(orderLookup.trim())}`;
                }
              }}
              className="mt-8 max-w-md"
            >
              <label htmlFor="account-order" className="eyebrow">
                Find an order
              </label>
              <div className="mt-3 flex items-center gap-4 border-b border-ink/25 pb-2">
                <input
                  id="account-order"
                  value={orderLookup}
                  onChange={(event) => setOrderLookup(event.target.value)}
                  placeholder="VRN-XXXXXXX"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-ink-muted"
                />
                <button type="submit" className="text-[10px] uppercase tracking-[0.2em] hover:text-accent">
                  Track
                </button>
              </div>
            </form>
            <p className="mt-6 text-xs text-ink-muted">
              Demonstration order: <span className="text-ink">VRN-DEMO01</span>
            </p>
          </section>
        ) : null}

        {tab === "Wishlist" ? (
          <section aria-label="Saved pieces">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-serif text-3xl">Wishlist</h2>
              <Link href="/wishlist" className="text-[11px] uppercase tracking-[0.18em] link-underline">
                Open full wishlist
              </Link>
            </div>
            {wishlist.length === 0 ? (
              <p className="mt-6 text-sm text-ink-soft">
                Your wishlist is waiting for something special.
              </p>
            ) : (
              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
                {wishlist.slice(0, 6).map((product) => (
                  <ProductCard key={product.slug} product={product} size="sm" />
                ))}
              </div>
            )}
          </section>
        ) : null}

        {tab === "Addresses" ? (
          <section aria-label="Saved addresses">
            <h2 className="font-serif text-3xl">Saved addresses</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
              Addresses entered at checkout are stored with the order. A saved address book attaches
              to the customer record once accounts are enabled — the schema already separates
              contact, address and order data for exactly that reason.
            </p>
            <div className="mt-8 border border-dashed border-line p-8 text-center">
              <p className="font-serif text-2xl">No saved addresses yet</p>
              <p className="mt-3 text-sm text-ink-soft">
                Complete a demonstration order and the delivery address appears on the confirmation.
              </p>
              <Link href="/shop" className="btn btn-outline mt-6">
                Start an order
              </Link>
            </div>
          </section>
        ) : null}

        {tab === "Preferences" ? (
          <section aria-label="Preferences">
            <h2 className="font-serif text-3xl">Preferences</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
              Preferences shape what the Style Concierge suggests first. In this demonstration they
              are held in the browser session.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Delivery method", value: store.shippingMethodId },
                { label: "Gift wrapping", value: store.giftWrap ? "On by default" : "Off" },
                { label: "Discount code", value: store.couponCode ?? "None applied" },
                { label: "Currency", value: "USD" },
              ].map((row) => (
                <li key={row.label} className="border border-line p-5">
                  <p className="eyebrow">{row.label}</p>
                  <p className="mt-2 text-sm capitalize text-ink-soft">{row.value}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {tab === "Recently viewed" ? (
          <section aria-label="Recently viewed">
            <h2 className="font-serif text-3xl">Recently viewed</h2>
            {viewed.length === 0 ? (
              <p className="mt-6 text-sm text-ink-soft">
                Open a few pieces and they will collect here.
              </p>
            ) : (
              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
                {viewed.map((product) => (
                  <ProductCard key={product.slug} product={product} size="sm" />
                ))}
              </div>
            )}
          </section>
        ) : null}

        {tab === "Notifications" ? (
          <section aria-label="Notifications">
            <h2 className="font-serif text-3xl">Notifications</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
              Order updates are sent to the email supplied at checkout. Restock and drop alerts are
              handled through the atelier letters list.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { title: "Order updates", detail: "Sent for every stage change on an order." },
                { title: "Restock alerts", detail: "Signature and Essentials pieces only — Limited Edition runs are never repeated." },
                { title: "Atelier letters", detail: "New releases and journal notes, roughly monthly." },
              ].map((item) => (
                <li key={item.title} className="flex items-start justify-between gap-6 border border-line p-5">
                  <div>
                    <p className="text-sm">{item.title}</p>
                    <p className="mt-1 text-xs text-ink-soft">{item.detail}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                    Enabled
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
