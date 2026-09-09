import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout-flow";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Checkout",
  description: "Complete your Veranne order — a six-step checkout with a mock payment interface.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <>
      <header className="border-b border-line bg-cream">
        <div className="shell py-12">
          <p className="eyebrow">Secure checkout</p>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl">Complete your order</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Cart, information, shipping, delivery, payment, review. Every total is recalculated
            server-side from catalog prices, and no card data is ever collected.
          </p>
        </div>
      </header>
      <CheckoutFlow />
    </>
  );
}
