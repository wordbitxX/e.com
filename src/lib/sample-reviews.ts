import { PRODUCTS } from "./catalog";

/**
 * Clearly-labelled sample review content for this demonstration storefront.
 *
 * Reviews stay flagged isDemo and are never used to emit an aggregate rating in
 * structured data or in any "verified" claim. The same content also seeds the
 * reviews table in the database (drizzle/seed.sql); the API falls back to this
 * static map so the storefront never depends on the database being seeded.
 */

export type SampleReview = {
  slug: string;
  authorName: string;
  location: string;
  rating: number;
  title: string | null;
  body: string;
  daysAgo: number;
};

const CITIES = [
  "Copenhagen",
  "Toronto",
  "Lisbon",
  "Melbourne",
  "Berlin",
  "Kyoto",
  "London",
  "New York",
  "Dubai",
  "Paris",
  "Amsterdam",
  "Milan",
  "Lahore",
  "Sydney",
  "Vienna",
  "Oslo",
  "Madrid",
  "Zurich",
  "Seoul",
  "Auckland",
];

type Template = { rating: number; title: string | null; body: string };

const TEMPLATES: Record<string, Template[]> = {
  "leather-goods": [
    {
      rating: 5,
      title: "It holds its own shape",
      body: "The interior detail I doubted is now the reason I reach for it. Weeks in and the corners have softened exactly as described.",
    },
    {
      rating: 4,
      title: null,
      body: "Genuinely substantial material that takes wear well. The stitching is as clean as the photographs suggest.",
    },
    {
      rating: 5,
      title: null,
      body: "Arrived wrapped properly, in a dust bag worth keeping. The patina is already starting where my hand lands.",
    },
  ],
  "cashmere-knitwear": [
    {
      rating: 5,
      title: "Sized down and it was right",
      body: "Took the concierge suggestion and sized down. The shoulder sits exactly where I wanted it to.",
    },
    {
      rating: 5,
      title: null,
      body: "Six washes by hand and the surface still looks new. No stretching at the cuffs.",
    },
    {
      rating: 4,
      title: null,
      body: "Soft from the first wear and warm without weight. Heavier in the hand than expected.",
    },
  ],
  "ceramics-home": [
    {
      rating: 5,
      title: "No two are alike",
      body: "Mine pooled greener than the photograph and that is precisely the appeal. Three stems look composed in it.",
    },
    {
      rating: 5,
      title: null,
      body: "Sits as well on a shelf as on a table. The glaze catches afternoon light beautifully.",
    },
    {
      rating: 4,
      title: null,
      body: "Small and perfectly weighted — doesn't tip with a long stem. Packed very carefully.",
    },
  ],
  "fragrance-light": [
    {
      rating: 5,
      title: "Close to the skin",
      body: "Not a room-filler, which is what I wanted. The iris comes forward after about an hour.",
    },
    {
      rating: 4,
      title: null,
      body: "Burned evenly to the edge on the first light. The vessel now holds brushes on my desk.",
    },
    {
      rating: 5,
      title: null,
      body: "The refill system is the detail that keeps me here. Companion piece to everything else I own.",
    },
  ],
  "fine-accessories": [
    {
      rating: 5,
      title: "Weighted properly",
      body: "Solid gold makes the difference — it sits still on the finger instead of spinning.",
    },
    {
      rating: 4,
      title: null,
      body: "Lies flat against the collarbone. The clasp can be fastened one-handed.",
    },
    {
      rating: 5,
      title: null,
      body: "Given as a gift; opened with a pause. Exactly the reaction you want.",
    },
  ],
  womenswear: [
    {
      rating: 5,
      title: "The coat I reach for",
      body: "No lining, no fuss — the cloth carries the structure. It moves beautifully on the shoulder.",
    },
    {
      rating: 4,
      title: null,
      body: "True to size, elegant line. I had the hem taken up two centimetres and it was simple.",
    },
    {
      rating: 5,
      title: null,
      body: "Fabric is better than expected at this price. The silhouette photographs even better than it looks on the hanger.",
    },
  ],
  menswear: [
    {
      rating: 5,
      title: "Five days a week",
      body: "The collar stays put and the cloth gets softer with every wash. Bought a second one immediately.",
    },
    {
      rating: 4,
      title: null,
      body: "Cut true to size with room for a layer underneath. The side adjusters are the quiet detail.",
    },
    {
      rating: 5,
      title: null,
      body: "Exactly the middle weight between shirt and jacket. It has replaced both on most days.",
    },
  ],
  footwear: [
    {
      rating: 4,
      title: "True to size",
      body: "Took the EU size up as the guide suggested and the fit is spot on. Breaking in quickly.",
    },
    {
      rating: 5,
      title: null,
      body: "The blake stitch means I can actually resole these. That is why I bought them.",
    },
    {
      rating: 5,
      title: null,
      body: "Clean last, no branding, white stays white. The only sneaker I have kept for more than a year.",
    },
  ],
  timepieces: [
    {
      rating: 5,
      title: "A ritual, not a chore",
      body: "Wound it every morning for a month. The dial is legible and the case feels more expensive than it is.",
    },
    {
      rating: 4,
      title: null,
      body: "Sits well under a cuff at 40 mm. The brushed case hides the marks of daily wear.",
    },
    {
      rating: 5,
      title: null,
      body: "Given as a milestone gift. The movement is serviceable anywhere, which is the honest reason to buy it.",
    },
  ],
};

export const SAMPLE_REVIEWS: SampleReview[] = PRODUCTS.flatMap((product) => {
  const templates = TEMPLATES[product.categorySlug] ?? TEMPLATES["leather-goods"];
  const count = 2 + (product.salesRank % 2);
  const offset = product.salesRank % CITIES.length;
  return Array.from({ length: Math.min(count, templates.length) }, (_, index) => {
    const template = templates[(index + product.salesRank) % templates.length];
    return {
      slug: product.slug,
      authorName: "Sample note",
      location: CITIES[(offset + index * 3) % CITIES.length],
      rating: template.rating,
      title: template.title,
      body: template.body,
      daysAgo: 8 + product.salesRank * 3 + index * 7,
    };
  });
});

export function sampleRating(slug: string): { average: number; count: number } | null {
  const rows = SAMPLE_REVIEWS.filter((review) => review.slug === slug);
  if (rows.length === 0) return null;
  const average = rows.reduce((sum, review) => sum + review.rating, 0) / rows.length;
  return { average: Math.round(average * 10) / 10, count: rows.length };
}

export function sampleReviewsFor(slug: string): SampleReview[] {
  return SAMPLE_REVIEWS.filter((review) => review.slug === slug);
}
