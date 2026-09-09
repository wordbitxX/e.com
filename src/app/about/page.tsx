import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { ProductGrid } from "@/components/storefront-modules";
import { BRAND, WORDBITX } from "@/lib/brand";
import { productsInCollection } from "@/lib/catalog";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Story — Inside the Veranne Atelier",
  description:
    "Why Veranne exists: a design philosophy built on materials that improve with use, makers we know by name and runs small enough to correct.",
  path: "/about",
  image: "https://images.pexels.com/photos/27227257/pexels-photo-27227257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
  imageAlt: "Artisan hand-stitching tan leather at a workbench",
  keywords: ["about veranne", "craftsmanship", "design philosophy", "slow made accessories"],
});

const VALUES = [
  {
    title: "Materials that improve",
    body: "We only work with materials that are more interesting in year five than in week one — vegetable-tanned leather, long-staple cashmere, high-fired stoneware, solid gold.",
  },
  {
    title: "Runs small enough to correct",
    body: "Between forty and four hundred pieces. Small enough that a maker notices a problem, and that we can redraw the pattern before the next run.",
  },
  {
    title: "Makers we can name",
    body: "Four workshops across Portugal, Italy and Japan. We visit each of them twice a year and pay for samples that fail.",
  },
  {
    title: "Repairs before replacements",
    body: "Restitching, re-edging, re-blocking and re-brushing are offered for the life of the piece. A repaired object is the point of the exercise.",
  },
];

export default function AboutPage() {
  const signature = productsInCollection("signature-collection").slice(0, 4);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <header className="relative overflow-hidden border-b border-line">
        <div className="relative h-[58vh] min-h-[400px]">
          <Image
            src="https://images.pexels.com/photos/27227257/pexels-photo-27227257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200"
            alt="Artisan hands stitching vegetable-tanned leather at a wooden bench"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/50 to-transparent" />
        </div>
        <div className="shell relative -mt-32 pb-16">
          <p className="eyebrow">Since {BRAND.founded}</p>
          <h1 className="display mt-6 max-w-3xl text-[clamp(2.6rem,6.5vw,5rem)]">
            We make a small number of things, slowly, and then we look after them.
          </h1>
        </div>
      </header>

      <section className="shell grid gap-12 py-20 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
        <Reveal>
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">Why the atelier exists</h2>
        </Reveal>
        <Reveal delay={1}>
          <div className="space-y-6 text-[16px] leading-[1.85] text-ink-soft">
            <p className="text-ink">
              Veranne began with a returned bag. A friend sent back a tote she had carried for two
              years because a strap had torn, and the brand that made it offered a discount code
              instead of a repair.
            </p>
            <p>
              That exchange described an entire industry: objects made to be replaced, priced as if
              they were made to be kept. We started with a single question — what would a bag look
              like if it were designed for its fifth year rather than its first photograph?
            </p>
            <p>
              The answer turned out to be thicker leather, no lining, one maker per piece and a
              lifetime of repairs. It turned out to be more expensive to make and less expensive to
              own. Everything the atelier has drawn since has followed the same logic, whether it is
              a cashmere rib, a stoneware carafe or a signet cast in solid gold.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-line bg-cream py-20" aria-labelledby="values-heading">
        <div className="shell">
          <h2 id="values-heading" className="font-serif text-4xl md:text-5xl">
            Four commitments
          </h2>
          <ul className="mt-12 grid gap-10 md:grid-cols-2">
            {VALUES.map((value, index) => (
              <Reveal as="li" key={value.title} delay={((index % 3) + 1) as 1 | 2 | 3}>
                <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-serif text-2xl">{value.title}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">{value.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell py-20" aria-labelledby="places-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="places-heading" className="font-serif text-4xl leading-tight md:text-5xl">
              Four workshops,<br />
              three countries
            </h2>
            <dl className="mt-10 space-y-8">
              {[
                {
                  place: "Alentejo, Portugal",
                  detail:
                    "Leather. Six benches, one maker per bag, hides from a Tuscan tannery that still uses pit tanning.",
                },
                {
                  place: "Biella, Italy",
                  detail:
                    "Knitwear. A family mill with soft Alpine water, which is why our cashmere blooms after washing.",
                },
                {
                  place: "Uji, Japan",
                  detail:
                    "Stoneware. A converted rice barn, one kick wheel and a kiln whose own ash becomes our glaze.",
                },
                {
                  place: "Grasse, France",
                  detail: "Fragrance. Fourteen months of iterations to get iris to sit under smoke.",
                },
              ].map((item) => (
                <div key={item.place} className="border-b border-line pb-6">
                  <dt className="font-serif text-2xl">{item.place}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-ink-soft">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-[400px]">
            <Image
              src="https://images.pexels.com/photos/27227257/pexels-photo-27227257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200"
              alt="Veranne pieces arranged on plaster and travertine blocks in raking light"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-cream py-16">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
            <h2 className="font-serif text-4xl">The signature pieces</h2>
            <Link
              href="/collections/signature-collection"
              className="text-[11px] uppercase tracking-[0.2em] link-underline"
            >
              View the collection
            </Link>
          </div>
          <div className="pt-10">
            <ProductGrid products={signature} />
          </div>
        </div>
      </section>

      <section className="shell py-16">
        <div className="border border-line p-8 md:p-12">
          <p className="eyebrow">A note on this website</p>
          <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight">
            Veranne is a fictional brand, built by {WORDBITX.name} to demonstrate what a premium
            commerce experience can be.
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            The storytelling is invented; the engineering is not. Search, filtering, the AI
            concierge, the cart, the six-step checkout, order persistence and tracking all run
            against a live PostgreSQL database.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/case-studies/ecommerce-experience" className="btn btn-ink">
              Read the case study
            </Link>
            <a
              href={WORDBITX.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Explore {WORDBITX.name}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
