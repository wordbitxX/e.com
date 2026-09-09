import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/format";
import { getOrderByNumber } from "@/lib/orders";
import { buildMetadata } from "@/lib/seo";

type Params = Promise<{ orderNumber: string }>;

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Order confirmed",
  description: "Your Veranne order confirmation.",
  path: "/order",
  noIndex: true,
});

export default async function OrderPage({ params }: { params: Params }) {
  const { orderNumber } = await params;
  const record = await getOrderByNumber(orderNumber);
  if (!record) notFound();

  const { order, items } = record;

  return (
    <div className="shell py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="eyebrow">Order confirmed</p>
        <h1 className="display mt-6 text-[clamp(2.4rem,5.5vw,4rem)]">
          Thank you, {order.firstName}.
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft">
          Your pieces are being wrapped in the atelier. A confirmation has been recorded against
          order <span className="text-ink">{order.orderNumber}</span> — keep the number to follow
          each stage of the journey.
        </p>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <section aria-labelledby="items-heading">
          <h2 id="items-heading" className="eyebrow">
            Your pieces
          </h2>
          <ul className="mt-6">
            {items.map((item) => (
              <li key={item.id} className="flex gap-5 border-b border-line-soft py-5">
                <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-cream">
                  <Image
                    src={item.imageUrl}
                    alt={item.productName}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 justify-between gap-4">
                  <div>
                    <Link
                      href={`/products/${item.productSlug}`}
                      className="font-serif text-xl link-underline"
                    >
                      {item.productName}
                    </Link>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                      {[item.variantLabel, item.sizeLabel !== "One size" ? item.sizeLabel : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <p className="mt-2 text-xs text-ink-muted">
                      SKU {item.sku} · Quantity {item.quantity}
                    </p>
                  </div>
                  <p className="whitespace-nowrap">{formatPrice(item.lineTotalCents)}</p>
                </div>
              </li>
            ))}
          </ul>

          <dl className="mt-8 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Subtotal</dt>
              <dd>{formatPrice(order.subtotalCents)}</dd>
            </div>
            {order.discountCents > 0 ? (
              <div className="flex justify-between text-accent">
                <dt>Discount {order.couponCode ? `(${order.couponCode})` : ""}</dt>
                <dd>−{formatPrice(order.discountCents)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between">
              <dt className="text-ink-soft">{order.shippingLabel}</dt>
              <dd>
                {order.shippingCents === 0 ? "Complimentary" : formatPrice(order.shippingCents)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 font-serif text-2xl">
              <dt>Total</dt>
              <dd>{formatPrice(order.totalCents)}</dd>
            </div>
          </dl>
        </section>

        <aside className="space-y-8">
          <div className="border border-line p-6">
            <p className="eyebrow">Order number</p>
            <p className="mt-2 font-serif text-3xl">{order.orderNumber}</p>
            <p className="mt-4 text-sm text-ink-soft">
              Estimated delivery{" "}
              <span className="text-ink">{order.estimatedDelivery ?? "4–7 business days"}</span>
            </p>
            <Link href={`/track?order=${order.orderNumber}`} className="btn btn-ink mt-6 w-full">
              Track order
            </Link>
          </div>

          <div className="border border-line p-6">
            <p className="eyebrow">Delivering to</p>
            <address className="mt-3 not-italic text-sm leading-relaxed text-ink-soft">
              {order.firstName} {order.lastName}
              <br />
              {order.addressLine1}
              {order.addressLine2 ? (
                <>
                  <br />
                  {order.addressLine2}
                </>
              ) : null}
              <br />
              {order.city}
              {order.region ? `, ${order.region}` : ""} {order.postalCode}
              <br />
              {order.country}
            </address>
            <p className="mt-4 text-xs text-ink-muted">{order.email}</p>
          </div>

          {order.giftWrap ? (
            <div className="border border-line p-6">
              <p className="eyebrow">Gift wrapping</p>
              <p className="mt-3 text-sm text-ink-soft">
                Wrapped in a rigid ivory box with champagne ribbon. Prices are removed from the
                packing note.
              </p>
              {order.giftMessage ? (
                <p className="mt-3 border-l border-accent pl-4 font-serif text-lg italic">
                  “{order.giftMessage}”
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="border border-line p-6">
            <p className="eyebrow">What happens next</p>
            <ol className="mt-4 space-y-3 text-sm text-ink-soft">
              <li>1 — Your order is reserved from the current atelier run.</li>
              <li>2 — Pieces are wrapped and sealed with the atelier mark.</li>
              <li>3 — A tracking reference is issued when the carrier collects.</li>
              <li>4 — Delivery is signed for at the address above.</li>
            </ol>
            <p className="mt-4 text-xs text-ink-muted">
              Payment method: {order.paymentMethod} · simulated authorisation. No card data was
              collected or stored.
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-16 flex flex-wrap gap-4 border-t border-line pt-10">
        <Link href="/shop" className="btn btn-outline">
          Continue shopping
        </Link>
        <Link href="/account" className="btn btn-quiet">
          View your account
        </Link>
        <Link href="/journal/caring-for-vegetable-tanned-leather" className="btn btn-quiet">
          How to care for your pieces
        </Link>
      </div>
    </div>
  );
}
