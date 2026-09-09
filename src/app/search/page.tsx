import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductGrid, SearchTrigger } from "@/components/storefront-modules";
import { productBySlug } from "@/lib/catalog";
import { bestSellers } from "@/lib/recommend";
import { POPULAR_SEARCHES, searchCatalog } from "@/lib/search";
import { formatPrice } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

type SearchParams = Promise<{ q?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return buildMetadata({
    title: q ? `Search results for “${q}”` : "Search",
    description:
      "Search the Veranne atelier across products, collections, categories and journal articles.",
    path: q ? `/search?q=${encodeURIComponent(q)}` : "/search",
    noIndex: true,
  });
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query ? searchCatalog(query, 12) : null;
  const products = results
    ? results.products
        .map((hit) => productBySlug(hit.href.replace("/products/", "")))
        .filter((product): product is NonNullable<typeof product> => Boolean(product))
    : [];

  return (
    <>
      <header className="border-b border-line bg-cream">
        <div className="shell py-16">
          <p className="eyebrow">Search</p>
          <h1 className="display mt-6 text-[clamp(2.2rem,5vw,3.6rem)]">
            {query ? (
              <>
                Results for <span className="italic text-accent">“{query}”</span>
              </>
            ) : (
              "Search the atelier"
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            {results
              ? `${results.total} match${results.total === 1 ? "" : "es"} across products, collections, categories and the journal.`
              : "Predictive search runs across products, collections, categories and journal articles."}
          </p>
          <div className="mt-8">
            <SearchTrigger className="btn btn-ink" />
          </div>
        </div>
      </header>

      <div className="shell py-14">
        {results && products.length > 0 ? (
          <section aria-label="Product results">
            <h2 className="eyebrow">Products</h2>
            <div className="mt-8">
              <ProductGrid products={products} />
            </div>
          </section>
        ) : null}

        {results && results.total === 0 ? (
          <section aria-label="No results">
            <div className="border border-line px-8 py-16 text-center">
              <p className="font-serif text-3xl">Nothing matched that search</p>
              <p className="mx-auto mt-4 max-w-md text-sm text-ink-soft">
                Try a material, a colour, an occasion or a budget. These are the searches that lead
                somewhere.
              </p>
              <ul className="mt-8 flex flex-wrap justify-center gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <li key={term}>
                    <Link
                      href={`/search?q=${encodeURIComponent(term)}`}
                      className="border border-line px-3 py-1.5 text-xs transition hover:border-ink"
                    >
                      {term}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-16">
              <h2 className="eyebrow">Most requested from the atelier</h2>
              <div className="mt-8">
                <ProductGrid products={bestSellers(4)} />
              </div>
            </div>
          </section>
        ) : null}

        {results && (results.collections.length > 0 || results.categories.length > 0 || results.articles.length > 0) ? (
          <section className="mt-16 grid gap-12 border-t border-line pt-12 md:grid-cols-3" aria-label="Other results">
            {results.collections.length > 0 ? (
              <div>
                <h2 className="eyebrow">Collections</h2>
                <ul className="mt-5 space-y-3 text-sm">
                  {results.collections.map((hit) => (
                    <li key={hit.href}>
                      <Link href={hit.href} className="link-underline">
                        {hit.title}
                      </Link>
                      <p className="text-xs text-ink-muted">{hit.subtitle}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {results.categories.length > 0 ? (
              <div>
                <h2 className="eyebrow">Categories</h2>
                <ul className="mt-5 space-y-3 text-sm">
                  {results.categories.map((hit) => (
                    <li key={hit.href}>
                      <Link href={hit.href} className="link-underline">
                        {hit.title}
                      </Link>
                      <p className="text-xs text-ink-muted">{hit.subtitle}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {results.articles.length > 0 ? (
              <div>
                <h2 className="eyebrow">Journal</h2>
                <ul className="mt-5 space-y-4">
                  {results.articles.map((hit) => (
                    <li key={hit.href} className="flex gap-4">
                      {hit.image ? (
                        <span className="relative block h-16 w-20 shrink-0 overflow-hidden bg-cream">
                          <Image src={hit.image} alt="" fill sizes="80px" className="object-cover" />
                        </span>
                      ) : null}
                      <span>
                        <Link href={hit.href} className="link-underline text-sm">
                          {hit.title}
                        </Link>
                        <span className="block text-xs text-ink-muted">{hit.subtitle}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}

        {!results ? (
          <section aria-label="Popular searches">
            <h2 className="eyebrow">Popular searches</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((term) => (
                <li key={term}>
                  <Link
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="border border-line px-4 py-2 text-sm transition hover:border-ink"
                  >
                    {term}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-16">
              <h2 className="eyebrow">Start with the best sellers</h2>
              <div className="mt-8">
                <ProductGrid products={bestSellers(4)} />
              </div>
            </div>
          </section>
        ) : null}

        {results && results.products.length > 0 ? (
          <p className="mt-12 text-xs text-ink-muted">
            Showing the closest {results.products.length} product matches, scored on name, material,
            colour, mood and SKU. Prices from {formatPrice(Math.min(...products.map((p) => p.priceCents)))}.
          </p>
        ) : null}
      </div>
    </>
  );
}
