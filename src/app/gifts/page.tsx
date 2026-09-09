import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { GiftFinder } from "@/components/gift-finder";
import { ProductGrid } from "@/components/storefront-modules";
import { Reveal } from "@/components/reveal";
import { productsInCollection } from "@/lib/catalog";
import { GIFT_WRAP_CENTS } from "@/lib/commerce";
import { formatPrice } from "@/lib/format";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

const GIFT_FAQS = [
  {
    question: "Can prices be hidden from the packing note?",
    answer:
      "Yes. Any order marked as a gift is packed with a note that lists the pieces but no prices.",
  },
  {
    question: "How is a gift wrapped?",
    answer:
      "In a rigid ivory box with unbleached tissue and a champagne grosgrain ribbon, sealed with the atelier mark. Your message is written by hand on a folded card.",
  },
  {
    question: "What is the safest gift if I do not know a size?",
    answer:
      "Anything from the gift edit — every piece in it is one-size: wraps, scarves, candles, ceramics, card holders and fragrance.",
  },
  {
    question: "Can I send directly to the recipient?",
    answer:
      "Yes. Enter their address as the delivery address at checkout; order updates still go to your own email.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Gifts — The Veranne Gift Experience",
  description:
    "Find a gift by occasion, recipient, budget and style. Hand-wrapped in an ivory box with a written card, with prices removed from the packing note.",
  path: "/gifts",
  image: "https://images.pexels.com/photos/4862911/pexels-photo-4862911.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
  imageAlt: "Ivory gift box with champagne ribbon and folded cashmere",
  keywords: ["luxury gift guide", "gifts for her", "gifts for the home", "hand wrapped gifts"],
});

export default function GiftsPage() {
  const edit = productsInCollection("the-gift-edit");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gifts", path: "/gifts" },
        ])}
      />
      <JsonLd data={faqJsonLd(GIFT_FAQS)} />

      <header className="grid border-b border-line lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[520px]">
          <Image
            src="https://images.pexels.com/photos/4862911/pexels-photo-4862911.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200"
            alt="Ivory gift box with champagne ribbon, tissue and a folded cashmere wrap"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center bg-cream px-5 py-16 md:px-14">
          <div>
            <p className="eyebrow">Gifting</p>
            <h1 className="display mt-6 text-[clamp(2.4rem,5vw,4rem)]">
              A good gift is<br />
              <span className="italic text-accent">specific</span>
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
              Tell us the occasion and the person; we will narrow eighteen pieces down to four.
              Everything is wrapped by hand, and prices never appear on the packing note.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="#gift-edit" className="btn btn-ink">
                Shop the gift edit
              </Link>
              <Link href="/collections/the-gift-edit" className="btn btn-outline">
                View the full collection
              </Link>
            </div>
          </div>
        </div>
      </header>

      <GiftFinder />

      <section id="gift-edit" className="border-y border-line bg-cream py-16">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
            <div>
              <p className="eyebrow">Curated</p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">The gift edit</h2>
            </div>
            <p className="max-w-sm text-sm text-ink-soft">
              Every piece here is one-size and travels well — no measurements required.
            </p>
          </div>
          <div className="pt-10">
            <ProductGrid products={edit} />
          </div>
        </div>
      </section>

      <section className="shell py-16" aria-labelledby="wrapping-heading">
        <div className="grid gap-12 lg:grid-cols-3">
          <Reveal>
            <h2 id="wrapping-heading" className="font-serif text-3xl">
              Atelier wrapping
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Add wrapping at checkout for {formatPrice(GIFT_WRAP_CENTS)}. A rigid ivory box,
              unbleached tissue, champagne grosgrain ribbon and the atelier seal.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="font-serif text-3xl">A written card</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Up to three hundred characters, written by hand in the atelier and tucked under the
              ribbon. Add it in the cart step of checkout.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <h2 className="font-serif text-3xl">Discreet pricing</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Gift orders ship with a packing note that lists the pieces and omits every price. The
              invoice goes to you by email.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-ivory py-16" aria-labelledby="gift-faq-heading">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <h2 id="gift-faq-heading" className="font-serif text-4xl">
            Gifting questions
          </h2>
          <dl className="space-y-7">
            {GIFT_FAQS.map((faq) => (
              <div key={faq.question} className="border-b border-line pb-6">
                <dt className="font-serif text-xl">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
