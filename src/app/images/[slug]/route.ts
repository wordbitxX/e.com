import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const FALLBACK_IDS: Record<string, string> = {
  "veranne-campaign-hero.jpg": "28497023",
  "veranne-collection-signature.jpg": "27227257",
  "veranne-gifting-suite.jpg": "4862911",
  "veranne-atelier-craft.jpg": "27227257",
  "veranne-case-study.jpg": "28497023",
  "veranne-journal-feature.jpg": "15122569",
};

/** Fallback for a missing generated campaign image in an incomplete deploy. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const id = FALLBACK_IDS[slug];
  if (!id) return new NextResponse("Not found", { status: 404 });

  try {
    const upstream = await fetch(
      `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200`,
      { next: { revalidate: 86400 } },
    );
    if (!upstream.ok) return new NextResponse("Not found", { status: 404 });

    return new NextResponse(await upstream.arrayBuffer(), {
      status: 200,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "image/jpeg",
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
      },
    });
  } catch {
    return new NextResponse("Image unavailable", { status: 502 });
  }
}
