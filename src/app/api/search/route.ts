import { NextResponse } from "next/server";
import { searchCatalog } from "@/lib/search";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").slice(0, 80);
  const results = searchCatalog(query);
  return NextResponse.json(results, {
    headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
  });
}
