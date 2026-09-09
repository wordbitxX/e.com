import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { reviews } from "@/db/schema";
import { sampleReviewsFor } from "@/lib/sample-reviews";

export const dynamic = "force-dynamic";

/**
 * Returns review rows for a product. Real, DB-backed reviews always win; when
 * none are recorded the clearly-labelled sample set is returned so the
 * storefront stays fully populated without a seeded database. Every row is
 * flagged isDemo so UI and future tooling can distinguish sample content.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = (searchParams.get("slug") ?? "").slice(0, 120);
  if (!slug) return NextResponse.json({ reviews: [] });

  try {
    const rows = await db
      .select()
      .from(reviews)
      .where(eq(reviews.productSlug, slug))
      .orderBy(desc(reviews.createdAt))
      .limit(6);
    if (rows.length > 0) return NextResponse.json({ reviews: rows });
  } catch {
    /* fall through to sample data */
  }

  const sample = sampleReviewsFor(slug).map((review, index) => ({
    id: -(index + 1),
    productSlug: slug,
    authorName: review.authorName,
    location: review.location,
    rating: review.rating,
    title: review.title,
    body: review.body,
    isDemo: true,
    verified: false,
    createdAt: new Date(Date.now() - review.daysAgo * 86400000).toISOString(),
  }));

  return NextResponse.json({ reviews: sample });
}
