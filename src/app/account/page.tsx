import type { Metadata } from "next";
import Link from "next/link";
import { AccountDashboard } from "@/components/account-dashboard";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Your account",
  description:
    "Profile, orders, wishlist, saved addresses, preferences, recently viewed and notifications — an authentication-ready account shell.",
  path: "/account",
  noIndex: true,
});

export default function AccountPage() {
  return (
    <>
      <header className="border-b border-line bg-cream">
        <div className="shell py-14">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            <Link href="/" className="link-underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">Account</span>
          </nav>
          <h1 className="display mt-8 text-[clamp(2.4rem,5vw,3.6rem)]">Your account</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            An authentication-ready dashboard: profile, orders, wishlist, addresses, preferences,
            recently viewed and notifications. Sign-in is deliberately not enabled in this
            demonstration — the data model is.
          </p>
        </div>
      </header>
      <AccountDashboard />
    </>
  );
}
