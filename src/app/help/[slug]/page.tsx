import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { HELP_DOCS, getHelpDoc } from "@/lib/brand";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return HELP_DOCS.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getHelpDoc(slug);
  if (!doc) return buildMetadata({ title: "Client care", description: "", path: "/help/faq" });
  return buildMetadata({
    title: doc.metaTitle,
    description: doc.metaDescription,
    path: `/help/${doc.slug}`,
  });
}

export default async function HelpPage({ params }: { params: Params }) {
  const { slug } = await params;
  const doc = getHelpDoc(slug);
  if (!doc) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Client care", path: "/help/faq" },
          { name: doc.title, path: `/help/${doc.slug}` },
        ])}
      />
      {doc.faqs ? <JsonLd data={faqJsonLd(doc.faqs)} /> : null}

      <header className="border-b border-line bg-cream">
        <div className="shell py-16">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            <Link href="/" className="link-underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{doc.eyebrow}</span>
          </nav>
          <h1 className="display mt-8 text-[clamp(2.4rem,5.5vw,4rem)]">{doc.title}</h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{doc.intro}</p>
        </div>
      </header>

      <div className="shell grid gap-12 py-16 lg:grid-cols-[16rem_1fr] lg:gap-20">
        <nav aria-label="Client care" className="lg:sticky lg:top-28 lg:h-fit">
          <p className="eyebrow">Client care</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {HELP_DOCS.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/help/${item.slug}`}
                  aria-current={item.slug === doc.slug ? "page" : undefined}
                  className={`link-underline ${item.slug === doc.slug ? "text-ink" : "text-ink-soft hover:text-ink"}`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link href="/track" className="link-underline text-ink-soft hover:text-ink">
                Track an order
              </Link>
            </li>
          </ul>
        </nav>

        <div className="max-w-2xl">
          {doc.sections.map((section) => (
            <section key={section.heading} className="mb-12">
              <h2 className="font-serif text-3xl leading-tight">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-[15px] leading-[1.85] text-ink-soft">
                  {paragraph}
                </p>
              ))}
              {section.list ? (
                <ul className="mt-5 space-y-2.5">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-4 text-[15px] leading-relaxed text-ink-soft">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {doc.faqs ? (
            <dl className="space-y-8">
              {doc.faqs.map((faq) => (
                <div key={faq.question} className="border-b border-line pb-7">
                  <dt className="font-serif text-2xl leading-tight">{faq.question}</dt>
                  <dd className="mt-3 text-[15px] leading-relaxed text-ink-soft">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-14 border border-line p-7">
            <p className="eyebrow">Still need us?</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              The Style Concierge answers shipping, sizing, care and product questions instantly, and
              can put the right piece in front of you in a sentence.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/shop" className="btn btn-outline">
                Browse the shop
              </Link>
              <Link href="/track" className="btn btn-quiet">
                Track an order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
