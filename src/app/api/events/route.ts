import { NextResponse } from "next/server";
import { db } from "@/db";
import { analyticsEvents } from "@/db/schema";

export const dynamic = "force-dynamic";

const ALLOWED = new Set([
  "product_view",
  "product_click",
  "search",
  "add_to_cart",
  "remove_from_cart",
  "wishlist_add",
  "wishlist_remove",
  "quick_view_open",
  "checkout_start",
  "checkout_step",
  "purchase",
  "coupon_apply",
  "ai_recommendation_click",
  "concierge_message",
  "gift_finder_run",
  "newsletter_subscribe",
  "lead_submit",
  "filter_apply",
]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      sessionId?: string;
      path?: string;
      payload?: Record<string, unknown>;
    };
    const name = (body.name ?? "").toString();
    if (!ALLOWED.has(name)) {
      return NextResponse.json({ ok: false, reason: "unknown_event" }, { status: 202 });
    }
    await db.insert(analyticsEvents).values({
      name,
      sessionId: (body.sessionId ?? null)?.toString().slice(0, 64) ?? null,
      path: (body.path ?? null)?.toString().slice(0, 200) ?? null,
      payload: body.payload ?? {},
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 202 });
  }
}
