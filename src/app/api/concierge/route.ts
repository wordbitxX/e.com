import { NextResponse } from "next/server";
import { db } from "@/db";
import { conciergeMessages } from "@/db/schema";
import { resolveConcierge, type ConciergeReply } from "@/lib/concierge";
import { PRODUCTS } from "@/lib/catalog";

export const dynamic = "force-dynamic";

type Body = {
  message?: string;
  sessionId?: string;
  viewed?: string[];
  cart?: string[];
};

/**
 * The concierge always resolves products from the catalog first. When a model
 * provider key is present the same grounded context is handed to the model so
 * it can phrase the reply — it can never introduce a product that does not
 * exist, because the product list is appended after the model responds.
 */
async function phraseWithModel(
  message: string,
  grounded: ConciergeReply,
): Promise<ConciergeReply> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return grounded;

  const catalogContext = grounded.productSlugs
    .map((slug) => PRODUCTS.find((product) => product.slug === slug))
    .filter(Boolean)
    .map((product) =>
      product
        ? `${product.name} — ${product.subtitle} — $${(product.priceCents / 100).toFixed(0)} — ${product.shortDescription}`
        : "",
    )
    .join("\n");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        temperature: 0.4,
        max_tokens: 180,
        messages: [
          {
            role: "system",
            content:
              "You are the Style Concierge for Veranne, a fictional premium atelier. Reply in at most three sentences, calm and precise, never salesy. Only ever mention products from the supplied list. Never invent prices, stock or reviews.",
          },
          {
            role: "user",
            content: `Shopper said: "${message}"\n\nAvailable pieces:\n${catalogContext || "none"}\n\nSuggested phrasing: ${grounded.message}`,
          },
        ],
      }),
    });

    if (!response.ok) return grounded;
    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) return grounded;
    return { ...grounded, message: content, engine: "llm" };
  } catch {
    return grounded;
  }
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const message = (body.message ?? "").toString().slice(0, 400);
  const sessionId = (body.sessionId ?? "anonymous").toString().slice(0, 64);

  const grounded = resolveConcierge({
    message,
    viewed: Array.isArray(body.viewed) ? body.viewed.slice(0, 8) : [],
    cart: Array.isArray(body.cart) ? body.cart.slice(0, 12) : [],
  });

  const reply = await phraseWithModel(message, grounded);

  try {
    await db.insert(conciergeMessages).values([
      { sessionId, role: "user", content: message, intent: reply.intent, engine: reply.engine },
      {
        sessionId,
        role: "assistant",
        content: reply.message,
        intent: reply.intent,
        productSlugs: reply.productSlugs,
        engine: reply.engine,
      },
    ]);
  } catch {
    /* conversation logging must never block a reply */
  }

  return NextResponse.json(reply);
}
