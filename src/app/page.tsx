import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ConciergeBanner } from "@/components/concierge-banner";
import { HeroCarousel } from "@/components/hero-carousel";
import { ProductCard } from "@/components/product-card";
import { RatingStars } from "@/components/rating-stars";
import { BRAND, WORDBITX } from "@/lib/brand";
import { CATEGORIES, productsBySlugs } from "@/lib/catalog";
import { ARTICLES } from "@/lib/journal";
import { formatShortDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${BRAND.name} — Premium Fashion, Accessories & Home Store`,
  description:
    "Shop Veranne: women's and men's apparel, leather goods, cashmere, footwear, timepieces, ceramics and fragrance — a curated marketplace with daily deals, an AI shopping concierge and fast delivery.",
  path: "/",
  keywords: [
    "premium online shopping",
    "multi category fashion store",
    "best deals online",
    "ecommerce website development",
  ],
});

const CIRCLE_CATEGORIES = [
  {
    slug: "womenswear",
    label: "Women",
    image:
      "https://images.pexels.com/photos/19222080/pexels-photo-19222080.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
  },
  {
    slug: "menswear",
    label: "Men",
    image:
      "https://images.pexels.com/photos/36700226/pexels-photo-36700226.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
  },
  {
    slug: "footwear",
    label: "Footwear",
    image:
      "https://images.pexels.com/photos/39202965/pexels-photo-39202965.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
  },
  {
    slug: "timepieces",
    label: "Timepieces",
    image:
      "https://images.pexels.com/photos/31050003/pexels-photo-31050003.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
  },
  {
    slug: "leather-goods",
    label: "Leather Goods",
    image:
      "https://images.pexels.com/photos/27227257/pexels-photo-27227257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
  },
  {
    slug: "cashmere-knitwear",
    label: "Cashmere",
    image:
      "https://images.pexels.com/photos/30263569/pexels-photo-30263569.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
  },
  {
    slug: "ceramics-home",
    label: "Home & Living",
    image:
      "https://images.pexels.com/photos/15122569/pexels-photo-15122569.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
  },
  {
    slug: "fragrance-light",
    label: "Fragrance",
    image:
      "https://images.pexels.com/photos/33711974/pexels-photo-33711974.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
  },
];

const ATELIER_CIRCLES = [
  { label: "Alentejo", detail: "Leather", image: "https://images.pexels.com/photos/27227257/pexels-photo-27227257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200" },
  { label: "Biella", detail: "Knitwear", image: "https://images.pexels.com/photos/30263569/pexels-photo-30263569.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200" },
  { label: "Uji", detail: "Ceramics", image: "https://images.pexels.com/photos/6944537/pexels-photo-6944537.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200" },
  { label: "Grasse", detail: "Fragrance", image: "https://images.pexels.com/photos/33711974/pexels-photo-33711974.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200" },
  { label: "Milan", detail: "Gold & silk", image: "https://images.pexels.com/photos/34372573/pexels-photo-34372573.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200" },
  { label: "Wardrobe", detail: "Apparel", image: "https://images.pexels.com/photos/28497023/pexels-photo-28497023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200" },
];

const PROMO_BANNERS = [
  {
    href: "/collections/the-gift-edit",
    image: "https://images.pexels.com/photos/4862911/pexels-photo-4862911.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    overlay: "bg-[linear-gradient(180deg,rgba(74,29,36,0.25)_0%,rgba(74,29,36,0.88)_100%)]",
    eyebrow: "The gift edit",
    title: "Wrapped by hand",
    cta: "Shop gifts",
  },
  {
    href: "/collections/signature-collection",
    image: "https://images.pexels.com/photos/27227257/pexels-photo-27227257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    overlay: "bg-[linear-gradient(180deg,rgba(74,52,25,0.25)_0%,rgba(74,52,25,0.88)_100%)]",
    eyebrow: "The signature edit",
    title: "Made to be kept",
    cta: "Explore",
  },
  {
    href: "/collections/new-arrivals",
    image: "https://images.pexels.com/photos/15122569/pexels-photo-15122569.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
    overlay: "bg-[linear-gradient(180deg,rgba(35,44,77,0.25)_0%,rgba(35,44,77,0.88)_100%)]",
    eyebrow: "Just finished",
    title: "New arrivals",
    cta: "View the drop",
  },
];

function SectionHead({
  eyebrow,
  title,
  href,
  label = "View All",
}: {
  eyebrow?: string;
  title: string;
  href: string;
  label?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 pb-5">
      <div>
        {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
        <h2 className="font-serif text-2xl md:text-3xl">{title}</h2>
      </div>
      <Link
        href={href}
        className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft transition hover:text-accent"
      >
        {label} →
      </Link>
    </div>
  );
}

function CardGrid({
  products,
  sizes,
}: {
  products: ReturnType<typeof productsBySlugs>;
  sizes: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} sizes={sizes} />
      ))}
    </div>
  );
}

const TRUST_ITEMS = [
  {
    title: "Complimentary delivery",
    detail: "On orders above $250 · express available",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" strokeLinejoin="round" />
        <circle cx="7" cy="18" r="1.6" />
        <circle cx="17.5" cy="18" r="1.6" />
      </svg>
    ),
  },
  {
    title: "30-day returns",
    detail: "One free size exchange per order",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M4 9V5m0 0h4M4 5l3.5 3.5A8 8 0 1 1 5 13" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Secure checkout",
    detail: "Mock payment · no card data stored",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Repairs for life",
    detail: "Restitching, re-edging, re-brushing",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M14.5 4.5c2 1 3 3 3 5l4 2-2 3-3-1c-2 3-5 4-8.5 3.5L4 20l2-3C4.8 13.7 6 9.8 9.5 8l1-3 4-.5Z" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const deals = productsBySlugs([
    "oslo-penny-loafer",
    "camille-wool-coat",
    "nox-manual-watch-38",
    "lin-linen-throw",
    "calvi-court-sneaker",
  ]);
  const wardrobe = productsBySlugs([
    "margaux-tailored-blazer",
    "arden-oxford-shirt",
    "lowell-wool-overshirt",
    "elliot-tailored-trousers",
    "iris-silk-blouse",
  ]);
  const accessories = productsBySlugs([
    "rive-field-watch-40",
    "filo-chain-necklace",
    "solene-signet-ring",
    "lune-silk-scarf",
    "marin-card-holder",
  ]);
  const home = productsBySlugs([
    "terra-hand-thrown-vase",
    "vesper-scented-candle",
    "mirena-bud-vase",
    "onda-carafe-set",
    "ember-no-4-eau-de-parfum",
  ]);
  const journal = ARTICLES.slice(0, 3);

  return (
    <>
      <HeroCarousel />

      {/* Popular categories — circles */}
      <section className="shell py-12" aria-labelledby="popular-categories">
        <SectionHead eyebrow="Browse by department" title="Explore popular categories" href="/shop" />
        <ul className="mt-6 grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-8">
          {CIRCLE_CATEGORIES.map((item) => (
            <li key={item.slug}>
              <Link href={`/shop?category=${item.slug}`} className="group block text-center">
                <span className="mx-auto block h-20 w-20 overflow-hidden rounded-full border-2 border-line transition-all duration-500 group-hover:border-accent md:h-28 md:w-28">
                  <Image
                    src={item.image}
                    alt={`${item.label} category`}
                    width={224}
                    height={224}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </span>
                <span className="mt-3 block text-xs font-medium text-ink-soft transition group-hover:text-accent md:text-[13px]">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Today's best deals */}
      <section className="shell" aria-labelledby="deals-heading">
        <SectionHead title="Today's best deals for you" href="/collections/best-sellers" />
        <CardGrid
          products={deals}
          sizes="(max-width: 768px) 46vw, (max-width: 1280px) 30vw, 19vw"
        />
      </section>

      {/* Promo banners */}
      <section className="shell py-14" aria-label="Featured campaigns">
        <div className="grid gap-4 md:grid-cols-3">
          {PROMO_BANNERS.map((banner) => (
            <Link
              key={banner.href}
              href={banner.href}
              data-cursor="Explore"
              className="group relative block h-[26rem] overflow-hidden rounded-2xl md:h-[24rem]"
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
              />
              <div className={`absolute inset-0 ${banner.overlay}`} />
              <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-champagne">
                  {banner.eyebrow}
                </p>
                <h3 className="mt-2 font-serif text-3xl leading-tight">{banner.title}</h3>
                <span className="mt-5 inline-flex items-center gap-2 border-b border-ivory/60 pb-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition group-hover:border-champagne group-hover:text-champagne">
                  {banner.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Autumn / wardrobe section */}
      <section className="shell" aria-labelledby="wardrobe-heading">
        <SectionHead
          eyebrow="The dressed house"
          title="The wardrobe collection"
          href="/collections/the-wardrobe"
        />
        <CardGrid
          products={wardrobe}
          sizes="(max-width: 768px) 46vw, (max-width: 1280px) 30vw, 19vw"
        />
      </section>

      {/* AI concierge banner */}
      <div className="mt-16">
        <ConciergeBanner />
      </div>

      {/* Ateliers strip */}
      <section className="shell py-14" aria-labelledby="ateliers-heading">
        <SectionHead eyebrow="Who makes it" title="Explore the ateliers" href="/about" />
        <ul className="mt-6 grid grid-cols-3 gap-x-4 gap-y-8 md:grid-cols-6">
          {ATELIER_CIRCLES.map((item) => (
            <li key={item.label}>
              <Link href="/about" className="group block text-center">
                <span className="mx-auto block h-16 w-16 overflow-hidden rounded-full border-2 border-line transition-all duration-500 group-hover:border-accent md:h-20 md:w-20">
                  <Image
                    src={item.image}
                    alt={`${item.label} atelier`}
                    width={176}
                    height={176}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </span>
                <span className="mt-2.5 block text-xs font-semibold text-ink">{item.label}</span>
                <span className="block text-[10px] text-ink-muted">{item.detail}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Timepieces & accessories */}
      <section className="shell" aria-labelledby="accessories-heading">
        <SectionHead
          eyebrow="Timepieces & fine accessories"
          title="Top deals in timepieces & accessories"
          href="/shop?category=timepieces"
        />
        <CardGrid
          products={accessories}
          sizes="(max-width: 768px) 46vw, (max-width: 1280px) 30vw, 19vw"
        />
      </section>

      {/* Home & living */}
      <section className="shell pt-12" aria-labelledby="home-heading">
        <SectionHead
          eyebrow="Home & living"
          title="Best sellers in home & living"
          href="/shop?category=ceramics-home"
        />
        <CardGrid
          products={home}
          sizes="(max-width: 768px) 46vw, (max-width: 1280px) 30vw, 19vw"
        />
      </section>

      {/* Client notes */}
      <section className="shell py-16" aria-labelledby="notes-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow="Sample content · demonstration store" title="What clients say" href="/about" label="About the house" />
        </div>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              rating: 5,
              quote:
                "The unlined interior was the detail I doubted and now it is the reason I reach for it.",
              name: "Sample note",
              detail: "Aveline Structured Tote",
            },
            {
              rating: 5,
              quote:
                "Sized down as the concierge suggested and the shoulder sits exactly where I wanted.",
              name: "Sample note",
              detail: "Odette Ribbed Cashmere Sweater",
            },
            {
              rating: 4,
              quote: "Wound it every morning for a month. It is a ritual now, not a chore.",
              name: "Sample note",
              detail: "Nox Manual Watch",
            },
          ].map((note) => (
            <li key={note.detail} className="rounded-2xl border border-line bg-cream p-6">
              <RatingStars average={note.rating} count={2} />
              <p className="mt-4 font-serif text-lg leading-relaxed">“{note.quote}”</p>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                {note.name} · {note.detail}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ink-muted">
          These are clearly-labelled sample notes for this demonstration. No aggregate rating is
          published in structured data, and the review system is built to be replaced by real
          verified reviews.
        </p>
      </section>

      {/* Journal strip */}
      <section className="border-y border-line bg-cream py-14" aria-labelledby="journal-heading">
        <div className="shell">
          <SectionHead eyebrow="Journal" title="Guides, stories and care" href="/journal" />
          <ul className="mt-2 grid gap-4 md:grid-cols-3">
            {journal.map((article) => (
              <li key={article.slug}>
                <Link href={`/journal/${article.slug}`} className="group flex gap-5">
                  <span className="relative block h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-ivory">
                    <Image
                      src={article.heroImage}
                      alt={article.heroAlt}
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </span>
                  <span>
                    <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-accent">
                      {article.category}
                    </span>
                    <span className="mt-1.5 block font-serif text-lg leading-snug group-hover:text-accent">
                      {article.title}
                    </span>
                    <span className="mt-1 block text-xs text-ink-muted">
                      {formatShortDate(article.publishedAt)} · {article.readMinutes} min
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Trust strip */}
      <section className="shell py-12" aria-label="Why shop with Veranne">
        <div className="grid gap-6 rounded-2xl border border-line bg-ivory p-8 md:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="text-accent">{item.icon}</span>
              <span>
                <span className="block text-sm font-semibold">{item.title}</span>
                <span className="mt-1 block text-xs text-ink-muted">{item.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* WordbitX band */}
      <section className="border-t border-line bg-ink py-16 text-ivory" aria-labelledby="wordbitx-heading">
        <div className="shell grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-champagne">
              {WORDBITX.positioning}
            </p>
            <h2 id="wordbitx-heading" className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
              Need an e-commerce experience like this?
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/75">{WORDBITX.pitch}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/ecommerce-website-development" className="btn bg-ivory !text-ink hover:bg-accent hover:!text-ivory">
                Start a project
              </Link>
              <a
                href={WORDBITX.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border-ivory/40 text-ivory hover:bg-ivory hover:text-ink"
              >
                Explore WordbitX
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-ivory/15 p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne">
              Inside the build
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-ivory/75">
              <li>Nine departments with faceted discovery and predictive search</li>
              <li>Daily deals, circular category browsing and editorial banners</li>
              <li>AI Style Concierge grounded in the live catalog</li>
              <li>Six-step checkout with server-side pricing and order tracking</li>
              <li>Structured data, canonicals and a topical content architecture</li>
            </ul>
            <Link
              href="/case-studies/ecommerce-experience"
              className="mt-6 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-champagne link-underline"
            >
              Read the full case study
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
