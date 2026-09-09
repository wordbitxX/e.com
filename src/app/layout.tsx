import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { SiteChrome } from "@/components/site-chrome";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoreProvider } from "@/components/store-provider";
import { WordbitXStrip } from "@/components/wordbitx-strip";
import { BRAND } from "@/lib/brand";
import { organizationJsonLd, SITE_URL, websiteJsonLd, wordbitxJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} — Premium Fashion, Accessories & Home Store`,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.shortStory,
  applicationName: BRAND.name,
  authors: [{ name: "WordbitX", url: "https://www.wordbitxtech.com/" }],
  creator: "WordbitX",
  publisher: BRAND.legalName,
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfaf6",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={wordbitxJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <StoreProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <WordbitXStrip />
          <SiteFooter />
          <SiteChrome />
        </StoreProvider>
      </body>
    </html>
  );
}
