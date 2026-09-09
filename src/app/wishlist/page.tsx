import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist-view";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Wishlist",
  description: "Pieces you have saved from the Veranne atelier, with availability and price.",
  path: "/wishlist",
});

export default function WishlistPage() {
  return (
    <>
      <header className="border-b border-line bg-cream">
        <div className="shell py-16">
          <p className="eyebrow">Saved pieces</p>
          <h1 className="display mt-6 text-[clamp(2.4rem,5.5vw,4rem)]">Wishlist</h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            Saved to this browser and mirrored to your session in the database, so a wishlist
            survives a refresh and is ready to attach to an account when authentication is enabled.
          </p>
        </div>
      </header>
      <WishlistView />
    </>
  );
}
