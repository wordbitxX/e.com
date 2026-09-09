"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { formatShortDate } from "@/lib/format";
import { useStore } from "./store-provider";

type OrderRecord = {
  order: {
    orderNumber: string;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    addressLine1: string;
    postalCode: string;
    status: string;
    estimatedDelivery: string | null;
    totalCents: number;
    shippingLabel: string;
    createdAt: string;
  };
  items: {
    id: number;
    productName: string;
    productSlug: string;
    imageUrl: string;
    quantity: number;
    lineTotalCents: number;
  }[];
  events: {
    id: number;
    stage: string;
    label: string;
    note: string | null;
    completed: boolean;
    occurredAt: string | null;
  }[];
};

export function OrderTracker({ initialOrder }: { initialOrder?: string }) {
  const store = useStore();
  const { format: formatPrice } = store;
  const [value, setValue] = useState(initialOrder ?? "");
  const [record, setRecord] = useState<OrderRecord | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const lookup = useCallback(async (orderNumber: string) => {
    const clean = orderNumber.trim().toUpperCase();
    if (clean.length < 4) {
      setError("Enter the order number from your confirmation.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/orders/${encodeURIComponent(clean)}`);
      if (!response.ok) {
        setRecord(null);
        setError("We could not find that order number. Check the confirmation email.");
        return;
      }
      setRecord((await response.json()) as OrderRecord);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialOrder) void lookup(initialOrder);
  }, [initialOrder, lookup]);

  return (
    <div className="shell py-14">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void lookup(value);
        }}
        className="max-w-xl"
      >
        <label htmlFor="track-order" className="eyebrow">
          Order number
        </label>
        <div className="mt-3 flex items-center gap-4 border-b border-ink/25 pb-3">
          <input
            id="track-order"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="VRN-XXXXXXX"
            className="w-full bg-transparent font-serif text-2xl outline-none placeholder:text-ink-muted"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn btn-ink !px-6 !py-3 disabled:opacity-50"
          >
            {loading ? "Looking" : "Track"}
          </button>
        </div>
        {error ? (
          <p role="alert" className="mt-3 text-sm text-accent">
            {error}
          </p>
        ) : (
          <p className="mt-3 text-xs text-ink-muted">
            Your order number appears on the confirmation screen — it begins with VRN.
          </p>
        )}
      </form>

      {record ? (
        <div className="mt-16 grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <section aria-labelledby="timeline-heading">
            <p className="eyebrow">Order {record.order.orderNumber}</p>
            <h2 id="timeline-heading" className="mt-4 font-serif text-4xl">
              {record.order.status === "delivered" ? "Delivered" : "On its way"}
            </h2>
            <p className="mt-3 text-sm text-ink-soft">
              {record.order.shippingLabel} · estimated{" "}
              {record.order.estimatedDelivery ?? "4–7 business days"}
            </p>

            <ol className="mt-10 border-l border-line pl-8">
              {record.events.map((event) => (
                <li key={event.id} className="relative pb-9 last:pb-0">
                  <span
                    className={`absolute -left-[2.15rem] top-1 grid h-4 w-4 place-items-center rounded-full border ${
                      event.completed ? "border-accent bg-accent" : "border-line bg-ivory"
                    }`}
                  >
                    {event.completed ? (
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-ivory" aria-hidden="true">
                        <path
                          d="m2.5 6.3 2.2 2.2 4.8-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : null}
                  </span>
                  <p className={`text-sm ${event.completed ? "text-ink" : "text-ink-muted"}`}>
                    {event.label}
                  </p>
                  {event.note ? (
                    <p className="mt-1 text-xs text-ink-muted">{event.note}</p>
                  ) : null}
                  {event.occurredAt ? (
                    <p className="mt-1 text-xs text-accent">{formatShortDate(event.occurredAt)}</p>
                  ) : (
                    <p className="mt-1 text-xs text-ink-muted">Pending</p>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <aside className="space-y-8">
            <div className="border border-line p-6">
              <p className="eyebrow">Items</p>
              <ul className="mt-5 space-y-4">
                {record.items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-cream">
                      <Image src={item.imageUrl} alt="" fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex flex-1 justify-between gap-3">
                      <div>
                        <Link
                          href={`/products/${item.productSlug}`}
                          className="font-serif text-base leading-tight link-underline"
                        >
                          {item.productName}
                        </Link>
                        <p className="text-xs text-ink-muted">Quantity {item.quantity}</p>
                      </div>
                      <p className="text-sm">{formatPrice(item.lineTotalCents)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex justify-between border-t border-line pt-4 font-serif text-xl">
                <span>Total</span>
                <span>{formatPrice(record.order.totalCents)}</span>
              </p>
            </div>

            <div className="border border-line p-6">
              <p className="eyebrow">Delivering to</p>
              <address className="mt-3 not-italic text-sm leading-relaxed text-ink-soft">
                {record.order.firstName} {record.order.lastName}
                <br />
                {record.order.addressLine1}
                <br />
                {record.order.city} {record.order.postalCode}
                <br />
                {record.order.country}
              </address>
              <p className="mt-4 text-xs text-ink-muted">
                Placed {formatShortDate(record.order.createdAt)}
              </p>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
