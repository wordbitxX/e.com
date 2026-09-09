import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductReviews } from "@/components/product-reviews";
import { RecentlyViewed } from "@/components/storefront-modules";
import { BRAND } from "@/lib/brand";
import {
  PRODUCTS,
  categoryBySlug,
  collectionBySlug,
  productBySlug,
  schemaAvailability,
} from "@/lib/catalog";
import { ARTICLES } from "@/lib/journal";
import { completeTheLook, similarProducts } from "@/lib/recommend";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) {
    return buildMetadata({ title: "Product", description: "", path: "/shop", noIndex: true });
  }
  return buildMetadata({
    title: `${product.name} — ${product.subtitle}`,
    description: product.metaDescription,
    path: `/products/${product.slug}`,
    image: product.images[0].url,
    imageAlt: product.images[0].alt,
    keywords: [product.keyword, `buy ${product.name}`, categoryBySlug(product.categorySlug)?.keyword ?? ""],
  });
}

const Accordion = ({
  title,
  children,
  open,
}: {
  title: string;
  children: React.ReactNode;
  open?: boolean;
}) => (
  <details open={open} className="group border-b border-line py-5">
    <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] uppercase tracking-[0.18em]">
      {title}
      <span className="text-lg leading-none text-ink-muted transition group-open:rotate-45">+</span>
    </summary>
    <div className="pt-5 text-sm leading-relaxed text-ink-soft">{children}</div>
  </details>
);

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const category = categoryBySlug(product.categorySlug)!;
  const look = completeTheLook(product.slug, 3);
  const similar = similarProducts(product.slug, 4);
  const article = ARTICLES.find((item) => item.relatedProducts.includes(product.slug));
  const primaryCollection = collectionBySlug(product.collectionSlugs[0]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: category.name, path: `/shop?category=${category.slug}` },
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.metaDescription,
          sku: product.sku,
          category: category.name,
          material: product.materials[0],
          image: product.images.map((image) => image.url),
          url: absoluteUrl(`/products/${product.slug}`),
          brand: { "@type": "Brand", name: BRAND.name },
          color: product.colors.map((color) => color.name).join(", "),
          offers: {
            "@type": "Offer",
            url: absoluteUrl(`/products/${product.slug}`),
            priceCurrency: "USD",
            price: (product.priceCents / 100).toFixed(2),
            availability: schemaAvailability(product),
            itemCondition: "https://schema.org/NewCondition",
            seller: { "@type": "Organization", name: BRAND.legalName },
          },
        }}
      />
      {product.faqs.length > 0 ? <JsonLd data={faqJsonLd(product.faqs)} /> : null}

      <div className="shell pt-8">
        <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          <Link href="/" className="link-underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="link-underline">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/shop?category=${category.slug}`} className="link-underline">
            {category.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <article className="shell grid gap-12 pb-20 pt-8 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div className="lg:py-4">
          <p className="eyebrow">{product.subtitle}</p>
          <h1 className="mt-4 font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.05]">
            {product.name}
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
            {product.shortDescription}
          </p>

          <div className="mt-9">
            <ProductPurchase product={product} />
          </div>

          <div className="mt-10">
            <Accordion title="The story" open>
              <div className="space-y-4">
                {product.story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Accordion>

            <Accordion title="Materials">
              <ul className="space-y-2">
                {product.materials.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Accordion>

            <Accordion title="Specifications">
              <dl className="grid gap-3">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-6 border-b border-line-soft pb-2">
                    <dt className="text-ink">{spec.label}</dt>
                    <dd className="text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Accordion>

            <Accordion title="Shipping & returns">
              <p>
                {product.shippingNote}. Standard delivery is 4–7 business days and complimentary
                above $250; express is 2–3 business days.
              </p>
              <p className="mt-3">
                {product.finalSale
                  ? "This is a Limited Edition piece and is final sale."
                  : "Returns are open for 30 days from delivery, and one size exchange per order is complimentary."}{" "}
                <Link href="/help/returns" className="link-underline text-ink">
                  Read the returns policy
                </Link>
                .
              </p>
            </Accordion>

            <Accordion title="Care">
              <ul className="space-y-2">
                {product.care.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/help/care" className="mt-4 inline-block link-underline text-ink">
                Full care guide
              </Link>
            </Accordion>

            {product.faqs.length > 0 ? (
              <Accordion title="Questions">
                <dl className="space-y-5">
                  {product.faqs.map((faq) => (
                    <div key={faq.question}>
                      <dt className="text-ink">{faq.question}</dt>
                      <dd className="mt-1.5">{faq.answer}</dd>
                    </div>
                  ))}
                </dl>
              </Accordion>
            ) : null}
          </div>

          <p className="mt-8 text-xs text-ink-muted">
            SKU {product.sku} ·{" "}
            {primaryCollection ? (
              <>
                Part of the{" "}
                <Link href={`/collections/${primaryCollection.slug}`} className="link-underline">
                  {primaryCollection.name}
                </Link>
              </>
            ) : null}
          </p>
        </div>
      </article>

      {look.length > 0 ? (
        <section className="border-t border-line bg-cream py-16" aria-labelledby="look-heading">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
              <h2 id="look-heading" className="font-serif text-3xl md:text-4xl">
                Complete the look
              </h2>
              <p className="max-w-sm text-sm text-ink-soft">
                Chosen by material and tone rather than by margin.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-3">
              {look.map((item) => (
                <ProductCard key={item.slug} product={item} sizes="(max-width: 768px) 45vw, 30vw" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="shell py-16" aria-labelledby="similar-heading">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="eyebrow">Style intelligence</p>
            <h2 id="similar-heading" className="mt-3 font-serif text-3xl md:text-4xl">
              Similar to this
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-soft">
            Scored on category, collection, mood and price proximity — demonstration logic, ready to
            be replaced by a live recommendation service.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {similar.map((item) => (
            <ProductCard
              key={item.slug}
              product={item}
              reason="You may also like"
              sizes="(max-width: 768px) 45vw, 24vw"
            />
          ))}
        </div>
      </section>

      <section className="shell border-t border-line py-16" aria-labelledby="notes-heading">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <h2 id="notes-heading" className="font-serif text-3xl md:text-4xl">
            Client notes
          </h2>
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            Sample content · demonstration store
          </p>
        </div>
        <div className="pt-8">
          <ProductReviews slug={product.slug} />
        </div>
      </section>

      {article ? (
        <section className="shell border-t border-line py-14">
          <p className="eyebrow">Read next</p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight">
            <Link href={`/journal/${article.slug}`} className="link-underline">
              {article.title}
            </Link>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">{article.excerpt}</p>
        </section>
      ) : null}

      <RecentlyViewed excludeSlug={product.slug} />
    </>
  );
}
