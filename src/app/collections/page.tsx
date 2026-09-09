import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { COLLECTIONS, productsInCollection } from "@/lib/catalog";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Collections — Signature, Essentials, Limited Edition",
  description:
    "Browse Veranne collections: new arrivals, the signature collection, everyday essentials, single-run limited editions, best sellers and the gift edit.",
  path: "/collections",
  keywords: ["luxury collections", "signature collection", "limited edition accessories"],
});

export default function CollectionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
        ])}
      />

      <header className="border-b border-line bg-cream">
        <div className="shell py-16 md:py-24">
          <p className="eyebrow">Six edits</p>
          <h1 className="display mt-6 text-[clamp(2.6rem,6vw,4.5rem)]">Collections</h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            The atelier groups its work by intention rather than by season — what is permanent, what
            is finite, what is made to be given, and what has only just come off the bench.
          </p>
        </div>
      </header>

      <div className="shell py-16 md:py-24">
        <ul className="space-y-20">
          {COLLECTIONS.map((collection, index) => {
            const products = productsInCollection(collection.slug);
            const flip = index % 2 === 1;
            return (
              <Reveal as="li" key={collection.slug}>
                <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <Link
                    href={`/collections/${collection.slug}`}
                    data-cursor="Explore"
                    className={`group relative block aspect-[4/3] overflow-hidden bg-cream ${
                      flip ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={collection.image}
                      alt={collection.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                    />
                  </Link>
                  <div className={flip ? "lg:order-1" : ""}>
                    <p className="eyebrow">
                      {String(index + 1).padStart(2, "0")} · {products.length} pieces
                    </p>
                    <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
                      <Link href={`/collections/${collection.slug}`} className="link-underline">
                        {collection.name}
                      </Link>
                    </h2>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                      {collection.tagline}
                    </p>
                    <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-soft">
                      {collection.intro[0]}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-6">
                      <Link href={`/collections/${collection.slug}`} className="btn btn-outline">
                        View collection
                      </Link>
                      <span className="text-xs text-ink-muted">
                        From{" "}
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        }).format(Math.min(...products.map((p) => p.priceCents)) / 100)}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </>
  );
}
