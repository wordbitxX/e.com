import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { wishlistItems } from "@/db/schema";
import { productBySlug } from "@/lib/catalog";

export const dynamic = "force-dynamic";

type Body = { sessionId?: string; productSlug?: string };

function parse(body: Body) {
  const sessionId = (body.sessionId ?? "").toString().slice(0, 64);
  const productSlug = (body.productSlug ?? "").toString().slice(0, 120);
  if (!sessionId || !productSlug || !productBySlug(productSlug)) return null;
  return { sessionId, productSlug };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = (searchParams.get("sessionId") ?? "").slice(0, 64);
  if (!sessionId) return NextResponse.json({ items: [] });
  try {
    const rows = await db
      .select()
      .from(wishlistItems)
      .where(eq(wishlistItems.sessionId, sessionId));
    return NextResponse.json({ items: rows.map((row) => row.productSlug) });
  } catch {
    return NextResponse.json({ items: [] });
  }
}

export async function POST(request: Request) {
  try {
    const parsed = parse((await request.json()) as Body);
    if (!parsed) return NextResponse.json({ ok: false }, { status: 400 });
    await db.insert(wishlistItems).values(parsed).onConflictDoNothing();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 202 });
  }
}

export async function DELETE(request: Request) {
  try {
    const parsed = parse((await request.json()) as Body);
    if (!parsed) return NextResponse.json({ ok: false }, { status: 400 });
    await db
      .delete(wishlistItems)
      .where(
        and(
          eq(wishlistItems.sessionId, parsed.sessionId),
          eq(wishlistItems.productSlug, parsed.productSlug),
        ),
      );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 202 });
  }
}
