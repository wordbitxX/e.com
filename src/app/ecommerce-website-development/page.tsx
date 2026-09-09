import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";
import { WORDBITX } from "@/lib/brand";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";

const FAQS = [
  {
    question: "What does ecommerce website development include?",
    answer:
      "Discovery and information architecture, UX and visual design, front-end build, catalog and order data modelling, payment and shipping integration, search and merchandising, analytics, technical SEO and post-launch support.",
  },
  {
    question: "Should I choose Shopify or custom ecommerce development?",
    answer:
      "Shopify is the faster route when your catalog and checkout fit its model. Custom development pays for itself when merchandising, pricing rules, marketplaces, subscriptions or AI-driven discovery are core to the business rather than add-ons.",
  },
  {
    question: "How long does an ecommerce build take?",
    answer:
      "A focused storefront typically runs six to ten weeks from kickoff. A custom platform with bespoke merchandising, an admin dashboard and integrations usually runs three to five months.",
  },
  {
    question: "Do you work with businesses outside Pakistan?",
    answer:
      "Yes. WordbitX works with clients in Pakistan and internationally, including the United States, United Kingdom, UAE and Australia, with overlapping working hours agreed per project.",
  },
  {
    question: "Can AI features be added to an existing store?",
    answer:
      "Usually yes. A shopping concierge, recommendation engine or merchandising assistant can be layered onto an existing catalog API, as demonstrated in this build where retrieval always happens before generation.",
  },
];

const PROCESS = [
  { step: "01", title: "Discovery", detail: "Catalog audit, journey mapping, commercial goals and technical constraints." },
  { step: "02", title: "Architecture", detail: "Data model, URL and template structure, integration and analytics plan." },
  { step: "03", title: "Design", detail: "Art direction, design system, key templates and interaction specification." },
  { step: "04", title: "Build", detail: "Storefront, commerce logic, admin and integrations, with staged review." },
  { step: "05", title: "Launch", detail: "Performance passes, structured data, redirects, QA and go-live." },
  { step: "06", title: "Growth", detail: "Content programme, conversion iteration and feature roadmap." },
];

export const metadata: Metadata = buildMetadata({
  title: "Ecommerce Development Company — Custom Online Stores by WordbitX",
  description:
    "WordbitX is an ecommerce development company building custom online stores, Shopify and WooCommerce builds, commerce apps and AI ecommerce solutions for clients in Pakistan and worldwide.",
  path: "/ecommerce-website-development",
  image: "https://images.pexels.com/photos/28497023/pexels-photo-28497023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200",
  imageAlt: "Laptop and phone showing a minimal e-commerce interface",
  keywords: [
    "ecommerce development company",
    "custom ecommerce development",
    "ecommerce website development pakistan",
    "shopify development",
    "ai ecommerce solutions",
  ],
});

export default function EcommerceDevelopmentPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Ecommerce website development", path: "/ecommerce-website-development" },
        ])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Ecommerce website development",
          provider: {
            "@type": "Organization",
            "@id": `${WORDBITX.url}#organization`,
            name: WORDBITX.name,
            url: WORDBITX.url,
            telephone: WORDBITX.primaryPhone.label,
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: WORDBITX.primaryPhone.label,
                contactType: "sales and project enquiries",
                areaServed: "PK",
              },
              {
                "@type": "ContactPoint",
                telephone: WORDBITX.usaPhone.label,
                contactType: "North America project enquiries",
                areaServed: ["US", "CA"],
              },
            ],
          },
          description: WORDBITX.pitch,
          areaServed: ["Pakistan", "United States", "United Kingdom", "United Arab Emirates", "Australia"],
          url: absoluteUrl("/ecommerce-website-development"),
        }}
      />

      <header className="border-b border-line bg-cream">
        <div className="shell grid gap-12 py-16 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
              <Link href="/" className="link-underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink">Ecommerce website development</span>
            </nav>
            <p className="eyebrow mt-8">Ecommerce development company</p>
            <h1 className="display mt-6 text-[clamp(2.5rem,5.5vw,4.4rem)]">
              Create a better commerce experience
            </h1>
            <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-ink-soft">
              This storefront is a working demonstration. {WORDBITX.pitch}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="#start" className="btn btn-ink">
                Start a project
              </Link>
              <Link href="/case-studies/ecommerce-experience" className="btn btn-outline">
                Read the case study
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="https://images.pexels.com/photos/28497023/pexels-photo-28497023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200"
              alt="Laptop and phone on an ivory desk showing a minimal commerce interface"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </header>

      <section className="shell py-20" aria-labelledby="services-heading">
        <h2 id="services-heading" className="font-serif text-4xl md:text-5xl">
          What we build
        </h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {WORDBITX.services.map((service, index) => (
            <Reveal as="li" key={service.title} delay={((index % 3) + 1) as 1 | 2 | 3}>
              <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-serif text-2xl leading-tight">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{service.description}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-12 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
          Every engagement also covers what most stores skip: a data model that an admin dashboard
          can grow into, server-side price integrity, structured data that matches visible content,
          and an analytics event map that makes merchandising decisions measurable. Read how it was
          applied in the{" "}
          <Link href="/case-studies/ecommerce-experience" className="link-underline text-ink">
            Veranne case study
          </Link>
          .
        </p>
      </section>

      <section className="border-y border-line bg-cream py-20" aria-labelledby="process-heading">
        <div className="shell">
          <h2 id="process-heading" className="font-serif text-4xl md:text-5xl">
            How a build runs
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((item) => (
              <li key={item.step} className="border-t border-line pt-6">
                <p className="font-serif text-4xl text-line">{item.step}</p>
                <h3 className="mt-3 font-serif text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell py-20" aria-labelledby="regions-heading">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 id="regions-heading" className="font-serif text-4xl leading-tight">
              Where we work
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              {WORDBITX.name} is based in Pakistan and delivers for clients internationally. Project
              communication runs in overlapping hours agreed at kickoff.
            </p>
            <div className="mt-8 grid gap-3">
              <a
                href={WORDBITX.primaryPhone.href}
                className="group rounded-2xl border border-line p-5 transition hover:border-accent hover:bg-cream"
              >
                <span className="eyebrow">{WORDBITX.primaryPhone.region}</span>
                <span className="mt-2 block font-serif text-2xl group-hover:text-accent">
                  {WORDBITX.primaryPhone.label}
                </span>
                <span className="mt-1 block text-xs text-ink-muted">Primary project and sales line</span>
              </a>
              <a
                href={WORDBITX.usaPhone.href}
                className="group rounded-2xl border border-line p-5 transition hover:border-accent hover:bg-cream"
              >
                <span className="eyebrow">{WORDBITX.usaPhone.region}</span>
                <span className="mt-2 block font-serif text-2xl group-hover:text-accent">
                  {WORDBITX.usaPhone.label}
                </span>
                <span className="mt-1 block text-xs text-ink-muted">For USA and Canada enquiries</span>
              </a>
              <a
                href={WORDBITX.primaryPhone.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ink mt-1 w-full sm:w-fit"
              >
                Start on WhatsApp
              </a>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {WORDBITX.regions.map((region) => (
              <li key={region} className="border border-line p-4 text-sm capitalize text-ink-soft">
                {region}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-ivory py-16" aria-labelledby="faq-heading">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <h2 id="faq-heading" className="font-serif text-4xl md:text-5xl">
            Common questions
          </h2>
          <dl className="space-y-7">
            {FAQS.map((faq) => (
              <div key={faq.question} className="border-b border-line pb-6">
                <dt className="font-serif text-xl leading-tight">{faq.question}</dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-ink-soft">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-line bg-ivory py-16" aria-labelledby="hub-heading">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            <div>
              <p className="eyebrow">Knowledge hub</p>
              <h2 id="hub-heading" className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
                Ecommerce intelligence
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                Published guides written to be shared and cited — each one answers a different
                search intent, from cost to platform choice to conversion.
              </p>
              <Link href="/journal" className="btn btn-outline mt-8">
                Browse all guides
              </Link>
            </div>
            <ul className="space-y-3">
              {[
                {
                  href: "/journal/how-much-does-an-ecommerce-website-cost",
                  title: "How much does an ecommerce website cost?",
                  detail:
                    "Budgets in plain numbers: the three cost drivers, realistic ranges and the running costs people forget.",
                  keyword: "ecommerce cost",
                },
                {
                  href: "/journal/shopify-vs-custom-ecommerce-development",
                  title: "Shopify vs custom ecommerce development",
                  detail:
                    "When a hosted platform is right, when a custom build pays for itself, and the questions that decide it.",
                  keyword: "platform choice",
                },
                {
                  href: "/journal/ecommerce-website-features",
                  title: "Ecommerce website features every business needs",
                  detail:
                    "The features that move conversion versus the ones that exist only to fill a feature list.",
                  keyword: "features",
                },
              ].map((guide) => (
                <li key={guide.href}>
                  <Link
                    href={guide.href}
                    className="group flex items-start justify-between gap-6 rounded-2xl border border-line p-5 transition hover:border-accent hover:bg-cream"
                  >
                    <span>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                        {guide.keyword}
                      </span>
                      <span className="mt-1.5 block font-serif text-xl leading-snug group-hover:text-accent">
                        {guide.title}
                      </span>
                      <span className="mt-1.5 block text-sm text-ink-soft">{guide.detail}</span>
                    </span>
                    <span className="mt-1 shrink-0 text-ink-soft transition group-hover:translate-x-1 group-hover:text-accent">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="start" className="border-t border-line bg-ink py-20 text-ivory">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
              Launch your ecommerce platform
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
              Need an e-commerce experience like this?
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/75">
              Tell us the catalog size, the platform you are on today and what is not working. You
              will hear back from {WORDBITX.name} with a considered response, not a template.
            </p>
            <a
              href={WORDBITX.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border-ivory/40 mt-9 text-ivory hover:bg-ivory hover:text-ink"
            >
              Explore {WORDBITX.name}
            </a>
          </div>
          <div className="bg-ivory p-8 text-ink md:p-10">
            <LeadForm source="ecommerce-development-page" />
          </div>
        </div>
      </section>
    </>
  );
}
