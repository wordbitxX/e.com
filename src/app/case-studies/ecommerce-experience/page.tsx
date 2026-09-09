import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";
import { BRAND, WORDBITX } from "@/lib/brand";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Ecommerce Website Design & Development — Veranne Case Study",
  description:
    "How WordbitX designed and developed a premium e-commerce experience: editorial merchandising, intelligent product discovery, an AI shopping concierge and a conversion-focused checkout.",
  path: "/case-studies/ecommerce-experience",
  image: "https://images.pexels.com/photos/28497023/pexels-photo-28497023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
  imageAlt: "Laptop and phone showing a minimal ivory e-commerce interface",
  keywords: [
    "ecommerce website design and development",
    "custom ecommerce development",
    "ecommerce case study",
  ],
});

const CHAPTERS = [
  {
    number: "01",
    title: "The challenge",
    body: [
      "Premium brands are pushed toward templates that flatten them. The brief was to prove that a small atelier can have an interface as considered as its product — without sacrificing the commercial machinery a real store needs.",
      "Three constraints framed the build: it had to feel editorial rather than transactional, it had to be genuinely fast with real photography, and every flow had to work end to end rather than being a static mock-up.",
    ],
  },
  {
    number: "02",
    title: "Research & positioning",
    body: [
      "We mapped the shopping journeys that matter for a considered-purchase catalog: the browser with no intention, the gift-giver with a deadline, the researcher comparing materials, and the returning client who already knows what they want.",
      "Each journey received its own entry point — an editorial homepage, a four-question gift finder, long-form buying guides, and predictive search with recent history.",
    ],
  },
  {
    number: "03",
    title: "UX strategy",
    body: [
      "Discovery is asymmetric on purpose. A single hero product carries a section while three supporting pieces orbit it, which mirrors how a merchandiser would dress a window and avoids the flat four-column grid.",
      "Every filter, sort and variant control is keyboard operable, announced to assistive technology and mirrored in a mobile drawer rather than being shrunk down.",
    ],
  },
  {
    number: "04",
    title: "Visual design",
    body: [
      "A light-luxury system: warm ivory, cream, sand and champagne with a single restrained bronze accent, a Cormorant Garamond display face against Inter for interface text, hairline rules instead of cards, and shadows used only where elevation is real.",
      "Photography is given room. Product imagery is never cropped into a badge-covered tile.",
    ],
  },
  {
    number: "05",
    title: "Product discovery",
    body: [
      "Faceted filtering across category, price band, colour, size and availability with instant client-side sorting on featured, newest, price and best-selling ordering.",
      "A rating filter was deliberately excluded: no verified review data exists for a demonstration catalog, and inventing one would be dishonest to both shoppers and search engines.",
    ],
  },
  {
    number: "06",
    title: "AI personalisation",
    body: [
      "The Style Concierge resolves intent — discovery, gifting, outfit building, budget, comparison, sizing, care, shipping and cart assistance — then retrieves products from the catalog. The retrieval always happens first, so the assistant cannot invent a product, price or stock level.",
      "Where a model provider key is configured, the same grounded context is handed to a language model to phrase the reply. Recommendations elsewhere on the site are scored on category, collection, mood and price proximity against the visitor's own session history.",
    ],
  },
  {
    number: "07",
    title: "Commerce architecture",
    body: [
      "Next.js App Router with a typed catalog for statically rendered browse pages, and PostgreSQL via Drizzle ORM for the transactional layer: orders, order items, order events, wishlist, reviews, analytics events, concierge transcripts and leads.",
      "Money is stored in integer minor units, and order totals are always recalculated server-side from catalog prices — a client-supplied total is never trusted. The payment step is a mock interface: no card data is requested, transmitted or stored.",
    ],
  },
  {
    number: "08",
    title: "Performance",
    body: [
      "Browse pages are statically rendered, imagery is served through the Next image pipeline in AVIF and WebP with explicit sizes and lazy loading below the fold, and animation is limited to transform and opacity so it stays on the compositor.",
      "The interface honours prefers-reduced-motion throughout, and the custom cursor is disabled entirely for touch input and reduced-motion users.",
    ],
  },
  {
    number: "09",
    title: "Mobile commerce",
    body: [
      "Mobile is designed, not shrunk: a dedicated navigation drawer, swipeable product galleries with position indicators, a filter drawer, a sticky add-to-cart bar that appears after the fold, and a checkout that keeps the summary one tap away.",
    ],
  },
  {
    number: "10",
    title: "SEO architecture",
    body: [
      "Clean URLs, one primary intent per template, canonical tags on every page, Open Graph and Twitter metadata, and JSON-LD for Organization, WebSite, BreadcrumbList, Product, Offer, CollectionPage, Article and FAQPage — emitted only where it mirrors visible content.",
      "Aggregate ratings are deliberately absent. Internal linking runs product → category → collection → journal → buying guide, so topical relationships are explicit for both crawlers and language-model retrieval.",
    ],
  },
];

const KEYWORD_MAP = [
  { page: "Homepage", intent: "Brand + commercial", keyword: "Ecommerce website development" },
  { page: "Category pages", intent: "Commercial", keyword: "Category-specific commercial term" },
  { page: "Product pages", intent: "Transactional", keyword: "Product-specific term" },
  { page: "Collection pages", intent: "Commercial browse", keyword: "Collection term" },
  { page: "Journal articles", intent: "Informational", keyword: "Guide and how-to terms" },
  { page: "This case study", intent: "Commercial research", keyword: "Ecommerce website design & development" },
  { page: "AI section", intent: "Solution research", keyword: "AI ecommerce solutions" },
  { page: "WordbitX CTA page", intent: "Commercial", keyword: "Ecommerce development company" },
];

const CONTENT_ROADMAP = [
  "How much does an ecommerce website cost?",
  "Ecommerce website features every business needs",
  "Shopify vs custom ecommerce development",
  "WooCommerce vs Shopify",
  "How AI is changing ecommerce",
  "How to improve ecommerce conversion rate",
  "Ecommerce website design best practices",
  "How to build an online store",
  "Ecommerce app development guide",
  "Custom ecommerce software vs SaaS",
  "How to build a multi-vendor marketplace",
];

export default function CaseStudyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case studies", path: "/case-studies/ecommerce-experience" },
          { name: "Premium e-commerce experience", path: "/case-studies/ecommerce-experience" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Premium E-Commerce Digital Experience — Veranne",
          description:
            "WordbitX designed and developed a premium e-commerce experience combining editorial commerce, intelligent product discovery, AI-assisted shopping and a conversion-focused checkout journey.",
          image: [absoluteUrl("https://images.pexels.com/photos/28497023/pexels-photo-28497023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200")],
          author: {
            "@type": "Organization",
            "@id": `${WORDBITX.url}#organization`,
            name: WORDBITX.name,
            url: WORDBITX.url,
            telephone: WORDBITX.primaryPhone.label,
          },
          publisher: { "@id": `${absoluteUrl("/")}#organization` },
          mainEntityOfPage: absoluteUrl("/case-studies/ecommerce-experience"),
          about: ["Ecommerce website design", "Ecommerce development", "AI ecommerce solutions"],
          inLanguage: "en-US",
        }}
      />

      <header className="border-b border-line bg-cream">
        <div className="shell py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            <Link href="/" className="link-underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">Case study</span>
          </nav>
          <p className="eyebrow mt-8">{WORDBITX.positioning}</p>
          <h1 className="display mt-6 max-w-4xl text-[clamp(2.6rem,6vw,5rem)]">
            Ecommerce website design &amp; development, end to end
          </h1>
          <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
            {WORDBITX.summary}
          </p>
          <dl className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { term: "Client", detail: `${BRAND.legalName} (fictional demonstration brand)` },
              { term: "Scope", detail: "Strategy · UX · Visual design · Build · SEO" },
              { term: "Stack", detail: "Next.js App Router · PostgreSQL · Drizzle ORM" },
              { term: "Studio", detail: WORDBITX.name },
            ].map((item) => (
              <div key={item.term}>
                <dt className="eyebrow">{item.term}</dt>
                <dd className="mt-2 text-sm text-ink-soft">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="relative aspect-[16/9] w-full bg-cream">
        <Image
          src="https://images.pexels.com/photos/28497023/pexels-photo-28497023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200"
          alt="Laptop and phone on a warm ivory desk showing a minimal e-commerce interface"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="shell py-20">
        <ol className="space-y-16">
          {CHAPTERS.map((chapter) => (
            <Reveal as="li" key={chapter.number}>
              <article className="grid gap-8 border-b border-line pb-14 lg:grid-cols-[10rem_1fr] lg:gap-16">
                <div>
                  <p className="font-serif text-5xl text-line">{chapter.number}</p>
                  <h2 className="mt-3 font-serif text-2xl leading-tight">{chapter.title}</h2>
                </div>
                <div className="space-y-5 text-[16px] leading-[1.85] text-ink-soft">
                  {chapter.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>

      <section className="border-y border-line bg-cream py-16" aria-labelledby="keyword-heading">
        <div className="shell">
          <h2 id="keyword-heading" className="font-serif text-4xl md:text-5xl">
            Keyword mapping by intent
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            One primary intent per template. No keyword appears on every page, and no page tries to
            rank for everything.
          </p>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-sm">
              <caption className="sr-only">Keyword mapping by page and search intent</caption>
              <thead>
                <tr className="border-b border-ink text-left text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  <th scope="col" className="py-3">
                    Page
                  </th>
                  <th scope="col" className="py-3">
                    Intent
                  </th>
                  <th scope="col" className="py-3">
                    Primary keyword
                  </th>
                </tr>
              </thead>
              <tbody>
                {KEYWORD_MAP.map((row) => (
                  <tr key={row.page} className="border-b border-line-soft">
                    <th scope="row" className="py-3 text-left font-normal">
                      {row.page}
                    </th>
                    <td className="py-3 text-ink-soft">{row.intent}</td>
                    <td className="py-3 text-ink-soft">{row.keyword}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="shell py-16" aria-labelledby="roadmap-heading">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <h2 id="roadmap-heading" className="font-serif text-4xl leading-tight">
              The content roadmap
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              Eleven planned articles, each answering a different search intent rather than
              rewording the same one. This is the editorial programme that would follow launch.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {CONTENT_ROADMAP.map((topic, index) => (
              <li key={topic} className="flex gap-4 border border-line p-4 text-sm text-ink-soft">
                <span className="text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-ivory py-16" aria-labelledby="services-heading">
        <div className="shell">
          <h2 id="services-heading" className="font-serif text-4xl md:text-5xl">
            What {WORDBITX.name} builds
          </h2>
          <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {WORDBITX.services.map((service) => (
              <li key={service.title} className="border-t border-line pt-6">
                <h3 className="font-serif text-2xl leading-tight">
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {service.title}
                  </a>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{service.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-ink py-20 text-ivory" aria-labelledby="cta-heading">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">Start a project</p>
            <h2 id="cta-heading" className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
              Build your online store
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/75">{WORDBITX.pitch}</p>
            <ul className="mt-8 space-y-2 text-sm text-ivory/70">
              {WORDBITX.regions.map((region) => (
                <li key={region} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-champagne" />
                  {region}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={WORDBITX.primaryPhone.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-ivory !text-ink hover:bg-champagne"
              >
                WhatsApp {WORDBITX.primaryPhone.label}
              </a>
              <a
                href={WORDBITX.usaPhone.href}
                className="btn border-ivory/40 text-ivory hover:bg-ivory hover:text-ink"
              >
                USA {WORDBITX.usaPhone.label}
              </a>
            </div>
            <a
              href={WORDBITX.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-[11px] uppercase tracking-[0.2em] text-champagne link-underline"
            >
              Explore {WORDBITX.name} ↗
            </a>
          </div>
          <div className="bg-ivory p-8 text-ink md:p-10">
            <LeadForm source="veranne-case-study" />
          </div>
        </div>
      </section>
    </>
  );
}
