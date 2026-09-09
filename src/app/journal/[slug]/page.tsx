import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { BRAND } from "@/lib/brand";
import { productsBySlugs } from "@/lib/catalog";
import { formatDate } from "@/lib/format";
import { ARTICLES, articleBySlug } from "@/lib/journal";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) {
    return buildMetadata({ title: "Journal", description: "", path: "/journal", noIndex: true });
  }
  return buildMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/journal/${article.slug}`,
    image: article.heroImage,
    imageAlt: article.heroAlt,
    type: "article",
    publishedTime: article.publishedAt,
    keywords: [article.keyword, article.category.toLowerCase()],
  });
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const products = productsBySlugs(article.relatedProducts);
  const related = article.relatedArticles
    .map((relatedSlug) => articleBySlug(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
          { name: article.title, path: `/journal/${article.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.metaDescription,
          image: [article.heroImage.startsWith("http") ? article.heroImage : absoluteUrl(article.heroImage)],
          datePublished: article.publishedAt,
          dateModified: article.publishedAt,
          author: { "@type": "Person", name: article.author },
          publisher: { "@id": `${absoluteUrl("/")}#organization` },
          mainEntityOfPage: absoluteUrl(`/journal/${article.slug}`),
          articleSection: article.category,
          inLanguage: "en-US",
          isPartOf: { "@type": "Blog", name: `${BRAND.name} Journal` },
        }}
      />

      <article>
        <header className="shell pt-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            <Link href="/" className="link-underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/journal" className="link-underline">
              Journal
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{article.category}</span>
          </nav>

          <div className="mx-auto mt-12 max-w-3xl text-center">
            <p className="text-[10px] uppercase tracking-[0.24em] text-accent">
              {article.category} · {article.readMinutes} min read
            </p>
            <h1 className="display mt-6 text-[clamp(2.4rem,5.5vw,4rem)]">{article.title}</h1>
            <p className="mt-6 text-[16px] leading-relaxed text-ink-soft">{article.deck}</p>
            <p className="mt-6 text-xs uppercase tracking-[0.16em] text-ink-muted">
              {article.author} · {formatDate(article.publishedAt)}
            </p>
          </div>
        </header>

        <div className="relative mt-14 aspect-[16/9] w-full bg-cream">
          <Image
            src={article.heroImage}
            alt={article.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="shell">
          <div className="mx-auto max-w-2xl py-16">
            {article.body.map((block, index) => {
              if (block.type === "h2") {
                return (
                  <h2 key={index} className="mt-12 font-serif text-3xl leading-tight">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "quote") {
                return (
                  <figure key={index} className="my-12 border-l-2 border-accent pl-6">
                    <blockquote className="font-serif text-2xl italic leading-relaxed">
                      {block.text}
                    </blockquote>
                    {block.attribution ? (
                      <figcaption className="mt-3 text-xs uppercase tracking-[0.16em] text-ink-muted">
                        {block.attribution}
                      </figcaption>
                    ) : null}
                  </figure>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={index} className="mt-6 space-y-3">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-4 text-[16px] leading-relaxed text-ink-soft">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "image") {
                return (
                  <figure key={index} className="my-12">
                    <div className="relative aspect-[4/3] w-full bg-cream">
                      <Image src={block.url} alt={block.alt} fill sizes="(max-width: 768px) 100vw, 42rem" className="object-cover" />
                    </div>
                    {block.caption ? (
                      <figcaption className="mt-3 text-xs text-ink-muted">{block.caption}</figcaption>
                    ) : null}
                  </figure>
                );
              }
              return (
                <p key={index} className="mt-6 text-[16px] leading-[1.85] text-ink-soft">
                  {block.text}
                </p>
              );
            })}
          </div>
        </div>
      </article>

      {products.length > 0 ? (
        <section className="border-y border-line bg-cream py-16" aria-labelledby="article-products">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
              <h2 id="article-products" className="font-serif text-3xl md:text-4xl">
                Pieces in this article
              </h2>
              <Link href="/shop" className="text-[11px] uppercase tracking-[0.2em] link-underline">
                Shop all
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} sizes="(max-width: 768px) 45vw, 30vw" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="shell py-16" aria-labelledby="related-articles">
          <h2 id="related-articles" className="eyebrow">
            Continue reading
          </h2>
          <ul className="mt-8 grid gap-10 md:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/journal/${item.slug}`} className="group flex gap-6">
                  <span className="relative block h-28 w-36 shrink-0 overflow-hidden bg-cream">
                    <Image
                      src={item.heroImage}
                      alt={item.heroAlt}
                      fill
                      sizes="144px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-accent">
                      {item.category}
                    </span>
                    <span className="mt-2 block font-serif text-xl leading-tight">{item.title}</span>
                    <span className="mt-1 block text-sm text-ink-soft">{item.excerpt}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
