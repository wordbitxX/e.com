import type { Metadata } from "next";
import { BRAND, WORDBITX } from "./brand";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://veranne.studio").replace(
  /\/$/,
  "",
);

export const absoluteUrl = (path: string): string =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

const DEFAULT_OG = "https://images.pexels.com/photos/28497023/pexels-photo-28497023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  keywords?: string[];
  publishedTime?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG,
  imageAlt = "Veranne — objects of quiet consequence",
  type = "website",
  keywords,
  publishedTime,
  noIndex,
}: MetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND.name,
      type,
      locale: "en_US",
      publishedTime,
      images: [{ url: absoluteUrl(image), width: 1200, height: 900, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND.legalName,
    alternateName: BRAND.name,
    url: SITE_URL,
    description: BRAND.shortStory,
    slogan: BRAND.tagline,
    foundingDate: BRAND.founded,
    email: BRAND.email,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("https://images.pexels.com/photos/28497023/pexels-photo-28497023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200"),
    },
    sameAs: BRAND.social.map((item) => item.href),
    brand: { "@type": "Brand", name: BRAND.name },
    creator: {
      "@type": "Organization",
      "@id": `${WORDBITX.url}#organization`,
      name: WORDBITX.name,
      url: WORDBITX.url,
      description: WORDBITX.pitch,
      telephone: WORDBITX.primaryPhone.label,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: WORDBITX.primaryPhone.label,
          contactType: "sales and project enquiries",
          areaServed: "PK",
          availableLanguage: ["English", "Urdu"],
        },
        {
          "@type": "ContactPoint",
          telephone: WORDBITX.usaPhone.label,
          contactType: "North America project enquiries",
          areaServed: ["US", "CA"],
          availableLanguage: ["English"],
        },
      ],
    },
  };
}

export function wordbitxJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${WORDBITX.url}#organization`,
    name: WORDBITX.name,
    url: WORDBITX.url,
    description: WORDBITX.pitch,
    telephone: WORDBITX.primaryPhone.label,
    areaServed: [
      "Pakistan",
      "United States",
      "Canada",
      "United Kingdom",
      "United Arab Emirates",
      "Australia",
    ],
    knowsAbout: [
      "Ecommerce website development",
      "Custom ecommerce development",
      "Shopify development",
      "WooCommerce development",
      "Ecommerce app development",
      "AI ecommerce solutions",
      "UI/UX design",
      "Technical SEO",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: WORDBITX.primaryPhone.label,
        contactType: "sales and project enquiries",
        areaServed: "PK",
        availableLanguage: ["English", "Urdu"],
      },
      {
        "@type": "ContactPoint",
        telephone: WORDBITX.usaPhone.label,
        contactType: "North America project enquiries",
        areaServed: ["US", "CA"],
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BRAND.name,
    url: SITE_URL,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
