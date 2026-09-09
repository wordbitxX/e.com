import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { ShopBrowser } from "@/components/shop-browser";
import { InternalLinkRow } from "@/components/storefront-modules";
import { CATEGORIES, PRODUCTS, categoryBySlug } from "@/lib/catalog";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type SearchParams = Promise<{ category?: string; max?: string; sort?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const params = await searchParams;
  const category = params.category ? categoryBySlug(params.category) : undefined;

  if (category) {
    return buildMetadata({
      title: `${category.name} — Shop ${category.plural}`,
      description: `${category.description} Browse the ${category.name.toLowerCase()} made by the Veranne atelier, with filters for price, colour, size and availability.`,
      path: `/shop?category=${category.slug}`,
      keywords: [category.keyword, `${category.name} online`, "premium accessories store"],
    });
  }

  return buildMetadata({
    title: "Shop All — Leather, Cashmere, Ceramics & Fragrance",
    description:
      "The full Veranne catalog: vegetable-tanned leather goods, Italian cashmere, hand-thrown stoneware, fragrance and fine accessories. Filter by category, price, colour, size and availability.",
    path: "/shop",
    keywords: ["premium accessories online store", "buy luxury leather goods", "shop cashmere online"],
  });
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const category = params.category ? categoryBySlug(params.category) : undefined;
  const maxCents = params.max ? Number(params.max) * 100 : undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          ...(category ? [{ name: category.name, path: `/shop?category=${category.slug}` }] : []),
        ])}
      />

      <header className="border-b border-line bg-cream">
        <div className="shell py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            <Link href="/" className="link-underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            {category ? (
              <>
                <Link href="/shop" className="link-underline">
                  Shop
                </Link>
                <span className="mx-2">/</span>
                <span className="text-ink">{category.name}</span>
              </>
            ) : (
              <span className="text-ink">Shop</span>
            )}
          </nav>

          <Reveal>
            <h1 className="display mt-8 text-[clamp(2.6rem,6vw,4.5rem)]">
              {category ? category.name : "The full catalog"}
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              {category
                ? category.description
                : "Everything the house currently makes across nine departments — apparel, leather, cashmere, footwear, timepieces, ceramics and fragrance. Filter by category, price, colour, size or availability."}
            </p>
            {category ? (
              <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                {category.tagline}
              </p>
            ) : null}
          </Reveal>

          <nav aria-label="Categories" className="mt-10 flex flex-wrap gap-2">
            <Link
              href="/shop"
              className={`border px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition ${
                category ? "border-line hover:border-ink" : "border-ink bg-ink text-ivory"
              }`}
            >
              All
            </Link>
            {CATEGORIES.map((item) => (
              <Link
                key={item.slug}
                href={`/shop?category=${item.slug}`}
                className={`border px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition ${
                  category?.slug === item.slug
                    ? "border-ink bg-ink text-ivory"
                    : "border-line hover:border-ink"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <ShopBrowser
        key={`${category?.slug ?? "all"}-${maxCents ?? "all"}`}
        products={PRODUCTS}
        initialCategory={category?.slug}
        initialMaxCents={maxCents && Number.isFinite(maxCents) ? maxCents : undefined}
        heading={category ? category.name : "All products"}
      />

      <InternalLinkRow
        title="Continue browsing"
        links={[
          { label: "New arrivals", href: "/collections/new-arrivals" },
          { label: "Signature collection", href: "/collections/signature-collection" },
          { label: "Best sellers", href: "/collections/best-sellers" },
          { label: "The gift edit", href: "/gifts" },
          { label: "Buying guide: cashmere", href: "/journal/a-buying-guide-to-cashmere" },
          { label: "Size & fit guide", href: "/help/size-guide" },
        ]}
      />
    </>
  );
}
