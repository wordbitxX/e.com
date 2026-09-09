import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Deployment-safe fallback for catalog images.
 *
 * Public assets are still the primary path. This route only runs when a static
 * asset is missing (for example, when a deployment was created before the
 * binary public folder was uploaded). It keeps the storefront from rendering
 * a broken image while the catalog image is fetched from its original source.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const cleanId = id.replace(/\.jpe?g$/i, "");
  if (!/^\d+$/.test(cleanId)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const upstream = await fetch(
      `https://images.pexels.com/photos/${cleanId}/pexels-photo-${cleanId}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200`,
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
