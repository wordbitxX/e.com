import { serializeJsonLd } from "@/lib/seo";

/**
 * Renders JSON-LD structured data. Only ever pass data that mirrors
 * content visible on the same page.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
