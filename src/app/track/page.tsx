import type { Metadata } from "next";
import Link from "next/link";
import { OrderTracker } from "@/components/order-tracker";
import { buildMetadata } from "@/lib/seo";

type SearchParams = Promise<{ order?: string }>;

export const metadata: Metadata = buildMetadata({
  title: "Track your order",
  description:
    "Follow a Veranne order from the atelier to your door: placed, confirmed, packed, shipped, out for delivery, delivered.",
  path: "/track",
});

export default async function TrackPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  return (
    <>
      <header className="border-b border-line bg-cream">
        <div className="shell py-16">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            <Link href="/" className="link-underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">Track an order</span>
          </nav>
          <h1 className="display mt-8 text-[clamp(2.4rem,5.5vw,4rem)]">Where is my order?</h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            Enter the order number from your confirmation. Every stage is recorded against the order
            in the database — placed, confirmed, packed, shipped, out for delivery, delivered. Try
            the demonstration order <span className="text-ink">VRN-DEMO01</span>.
          </p>
        </div>
      </header>

      <OrderTracker initialOrder={params.order} />
    </>
  );
}
