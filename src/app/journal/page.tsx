import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { ARTICLES } from "@/lib/journal";
import { formatShortDate } from "@/lib/format";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Journal — Style Guides, Buying Guides & Product Stories",
  description:
    "The Veranne journal: how to wear a silk scarf, a cashmere buying guide, leather care, gift guides and stories from the atelier.",
  path: "/journal",
  keywords: ["style guide", "cashmere buying guide", "leather care guide", "gift guide"],
});

export default function JournalPage() {
  const [lead, ...rest] = ARTICLES;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Veranne Journal",
          url: absoluteUrl("/journal"),
          description:
            "Style guides, buying guides, care guides and product stories from the Veranne atelier.",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: ARTICLES.map((article, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: absoluteUrl(`/journal/${article.slug}`),
              name: article.title,
            })),
          },
        }}
      />

      <header className="border-b border-line bg-cream">
        <div className="shell py-16 md:py-24">
          <p className="eyebrow">Journal</p>
          <h1 className="display mt-6 text-[clamp(2.6rem,6vw,4.5rem)]">
            How things are made,<br />
            and how to keep them
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            Style guides, buying guides, care instructions and stories from inside the ateliers.
            Written by the people who draw and make the pieces.
          </p>
        </div>
      </header>

      <div className="shell py-16">
        <Reveal>
          <article className="grid gap-10 border-b border-line pb-16 lg:grid-cols-2 lg:gap-16">
            <Link
              href={`/journal/${lead.slug}`}
              data-cursor="Read"
              className="group relative block aspect-[4/3] overflow-hidden bg-cream"
            >
              <Image
                src={lead.heroImage}
                alt={lead.heroAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
              />
            </Link>
            <div className="flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent">
                {lead.category} · {lead.readMinutes} min read
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
                <Link href={`/journal/${lead.slug}`} className="link-underline">
                  {lead.title}
                </Link>
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-soft">{lead.deck}</p>
              <p className="mt-6 text-xs text-ink-muted">
                {lead.author} · {formatShortDate(lead.publishedAt)}
              </p>
              <Link href={`/journal/${lead.slug}`} className="btn btn-outline mt-8 self-start">
                Read the article
              </Link>
            </div>
          </article>
        </Reveal>

        <ul className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((article, index) => (
            <Reveal as="li" key={article.slug} delay={((index % 3) + 1) as 1 | 2 | 3}>
              <article>
                <Link
                  href={`/journal/${article.slug}`}
                  data-cursor="Read"
                  className="group relative block aspect-[4/3] overflow-hidden bg-cream"
                >
                  <Image
                    src={article.heroImage}
                    alt={article.heroAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                  />
                </Link>
                <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-accent">
                  {article.category} · {article.readMinutes} min
                </p>
                <h2 className="mt-2 font-serif text-2xl leading-tight">
                  <Link href={`/journal/${article.slug}`} className="link-underline">
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{article.excerpt}</p>
                <p className="mt-3 text-xs text-ink-muted">
                  {article.author} · {formatShortDate(article.publishedAt)}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
