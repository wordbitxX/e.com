import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads, subscribers } from "@/db/schema";

export const dynamic = "force-dynamic";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string | undefined>;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim().toLowerCase();
    const errors: Record<string, string> = {};

    if (name.length < 2) errors.name = "Please tell us your name.";
    if (!emailPattern.test(email)) errors.email = "Enter a valid email address.";
    if ((body.message ?? "").trim().length < 10) {
      errors.message = "A sentence or two about the project helps us reply properly.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 422 });
    }

    await db.insert(leads).values({
      name: name.slice(0, 120),
      email: email.slice(0, 160),
      company: body.company?.slice(0, 160) || null,
      projectType: body.projectType?.slice(0, 80) || null,
      budget: body.budget?.slice(0, 80) || null,
      message: (body.message ?? "").slice(0, 2000),
      source: body.source?.slice(0, 80) || "veranne-case-study",
    });

    return NextResponse.json({
      ok: true,
      message: "Thank you — WordbitX will reply within one business day.",
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  // Reserved for a future admin update endpoint; keeps the lead surface explicit.
  const body = (await request.json().catch(() => ({}))) as { email?: string };
  if (!body.email || !emailPattern.test(body.email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  await db
    .insert(subscribers)
    .values({ email: body.email.toLowerCase(), source: "lead-form" })
    .onConflictDoNothing();
  return NextResponse.json({ ok: true });
}
