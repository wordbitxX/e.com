import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { ShopBrowser } from "@/components/shop-browser";
import { InternalLinkRow } from "@/components/storefront-modules";
import { COLLECTIONS, collectionBySlug, productsInCollection } from "@/lib/catalog";
import { ARTICLES } from "@/lib/journal";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return COLLECTIONS.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  if (!collection) return buildMetadata({ title: "Collection", description: "", path: "/collections" });
  return buildMetadata({
    title: collection.metaTitle,
    description: collection.metaDescription,
    path: `/collections/${collection.slug}`,
    image: collection.image,
    imageAlt: collection.imageAlt,
    keywords: [collection.keyword, `${collection.name} Veranne`],
  });
}

export default async function CollectionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  if (!collection) notFound();

  const products = productsInCollection(collection.slug);
  const related = COLLECTIONS.filter((item) => item.slug !== collection.slug).slice(0, 3);
  const article = ARTICLES.find((item) =>
    item.relatedProducts.some((productSlug) => collection.productSlugs.includes(productSlug)),
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
          { name: collection.name, path: `/collections/${collection.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: collection.name,
          description: collection.metaDescription,
          url: absoluteUrl(`/collections/${collection.slug}`),
          isPartOf: { "@id": `${absoluteUrl("/")}#website` },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: products.length,
            itemListElement: products.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: absoluteUrl(`/products/${product.slug}`),
              name: product.name,
            })),
          },
        }}
      />

      <header className="relative overflow-hidden border-b border-line">
        <div className="relative h-[46vh] min-h-[340px]">
          <Image
            src={collection.image}
            alt={collection.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/60 to-ivory/10" />
        </div>
        <div className="shell relative -mt-28 pb-14">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            <Link href="/" className="link-underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/collections" className="link-underline">
              Collections
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{collection.name}</span>
          </nav>
          <h1 className="display mt-6 text-[clamp(2.6rem,6.5vw,5rem)]">{collection.name}</h1>
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-accent">
            {collection.tagline}
          </p>
        </div>
      </header>

      <section className="shell grid gap-10 border-b border-line py-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <Reveal>
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">{collection.storyTitle}</h2>
        </Reveal>
        <Reveal delay={1}>
          <div className="space-y-5 text-[15px] leading-relaxed text-ink-soft">
            {collection.intro.map((paragraph) => (
              <p key={paragraph} className="text-ink">
                {paragraph}
              </p>
            ))}
            {collection.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </section>

      <ShopBrowser products={products} heading={`${collection.name} products`} />

      {article ? (
        <section className="border-t border-line bg-cream">
          <div className="shell grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={article.heroImage}
                alt={article.heroAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow">From the journal</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
                <Link href={`/journal/${article.slug}`} className="link-underline">
                  {article.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
                {article.excerpt}
              </p>
              <Link href={`/journal/${article.slug}`} className="btn btn-outline mt-7">
                Read the guide
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <InternalLinkRow
        title="Other collections"
        links={[
          ...related.map((item) => ({
            label: item.name,
            href: `/collections/${item.slug}`,
          })),
          { label: "Shop all", href: "/shop" },
          { label: "Gift experience", href: "/gifts" },
        ]}
      />
    </>
  );
}
