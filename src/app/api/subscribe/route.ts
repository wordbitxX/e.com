import { NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; source?: string };
    const email = (body.email ?? "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ message: "Enter a valid email address." }, { status: 422 });
    }
    await db
      .insert(subscribers)
      .values({ email: email.slice(0, 160), source: (body.source ?? "footer").slice(0, 60) })
      .onConflictDoNothing();
    return NextResponse.json({ message: "Thank you — the next atelier letter is on its way." });
  } catch {
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
