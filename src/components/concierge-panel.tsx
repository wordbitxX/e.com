"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { productBySlug } from "@/lib/catalog";
import { CONCIERGE_OPENERS, type ConciergeReply } from "@/lib/concierge";
import { useStore } from "./store-provider";

type Turn = {
  id: number;
  role: "you" | "concierge";
  text: string;
  note?: string;
  productSlugs?: string[];
  chips?: string[];
  links?: { label: string; href: string }[];
};

const INTRO: Turn = {
  id: 0,
  role: "concierge",
  text: "Tell me what you're looking for.",
  note: "I know every piece in the atelier — the occasion, the person, the budget, or simply a colour.",
  chips: CONCIERGE_OPENERS,
};

export function ConciergePanel() {
  const store = useStore();
  const { format: formatPrice } = store;
  const [turns, setTurns] = useState<Turn[]>([INTRO]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [engine, setEngine] = useState<"rules" | "llm">("rules");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const seq = useRef(1);
  const open = store.ui.conciergeOpen;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [turns, open]);

  async function send(message: string) {
    const trimmed = message.trim();
    if (!trimmed || thinking) return;
    seq.current += 1;
    setTurns((current) => [...current, { id: seq.current, role: "you", text: trimmed }]);
    setInput("");
    setThinking(true);
    store.track("concierge_message", { message: trimmed });

    try {
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          sessionId: store.sessionId,
          viewed: store.recentlyViewed,
          cart: store.cart.map((line) => line.slug),
        }),
      });
      const data = (await response.json()) as ConciergeReply;
      seq.current += 1;
      setEngine(data.engine ?? "rules");
      setTurns((current) => [
        ...current,
        {
          id: seq.current,
          role: "concierge",
          text: data.message,
          note: data.note,
          productSlugs: data.productSlugs,
          chips: data.chips,
          links: data.links,
        },
      ]);
    } catch {
      seq.current += 1;
      setTurns((current) => [
        ...current,
        {
          id: seq.current,
          role: "concierge",
          text: "I lost that connection. Ask me again and I'll pick up where we were.",
          chips: CONCIERGE_OPENERS.slice(0, 3),
        },
      ]);
    } finally {
      setThinking(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => (open ? store.closeConcierge() : store.openConcierge())}
        aria-expanded={open}
        aria-controls="style-concierge"
        className="fixed bottom-5 right-5 z-[75] flex items-center gap-3 border border-ink bg-ivory px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-ink shadow-[0_18px_40px_-28px_rgba(26,24,21,0.9)] transition hover:bg-ink hover:text-ivory"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-accent" />
        </span>
        {open ? "Close concierge" : "Style Concierge"}
      </button>

      {open ? (
        <section
          id="style-concierge"
          aria-label="Style Concierge"
          className="sheet-in fixed bottom-20 right-4 z-[76] flex max-h-[76vh] w-[min(26rem,calc(100vw-2rem))] flex-col border border-line bg-ivory shadow-[0_30px_80px_-40px_rgba(26,24,21,0.7)]"
        >
          <header className="border-b border-line px-5 py-4">
            <p className="eyebrow">Style Concierge</p>
            <h2 className="mt-1 font-serif text-xl">Personal shopping, on call</h2>
            <p className="mt-1 text-[11px] text-ink-muted">
              {engine === "llm"
                ? "Connected to a language model · answers grounded in the live catalog"
                : "Demo reasoning engine · answers grounded in the live catalog"}
            </p>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
            {turns.map((turn) => (
              <div key={turn.id}>
                {turn.role === "you" ? (
                  <p className="ml-auto max-w-[85%] bg-ink px-4 py-2.5 text-sm text-ivory">{turn.text}</p>
                ) : (
                  <div className="max-w-[92%]">
                    <p className="text-sm leading-relaxed text-ink">{turn.text}</p>
                    {turn.note ? <p className="mt-2 text-xs text-ink-muted">{turn.note}</p> : null}

                    {turn.productSlugs && turn.productSlugs.length > 0 ? (
                      <ul className="mt-4 space-y-3">
                        {turn.productSlugs.slice(0, 4).map((slug) => {
                          const product = productBySlug(slug);
                          if (!product) return null;
                          return (
                            <li key={slug} className="flex gap-3 border border-line p-2">
                              <Link
                                href={`/products/${product.slug}`}
                                onClick={store.closeConcierge}
                                className="relative h-20 w-16 shrink-0 overflow-hidden bg-cream"
                              >
                                <Image
                                  src={product.images[0].url}
                                  alt={product.images[0].alt}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                />
                              </Link>
                              <div className="flex flex-1 flex-col">
                                <Link
                                  href={`/products/${product.slug}`}
                                  onClick={() => {
                                    store.track("ai_recommendation_click", { slug: product.slug });
                                    store.closeConcierge();
                                  }}
                                  className="font-serif text-base leading-tight link-underline"
                                >
                                  {product.name}
                                </Link>
                                <p className="text-[11px] text-ink-muted">{product.subtitle}</p>
                                <div className="mt-auto flex items-center justify-between pt-2">
                                  <span className="text-sm">{formatPrice(product.priceCents)}</span>
                                  <button
                                    type="button"
                                    onClick={() => store.addToCart(product, { silent: true })}
                                    className="border border-line px-3 py-1 text-[9px] uppercase tracking-[0.18em] transition hover:border-ink"
                                  >
                                    Add
                                  </button>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}

                    {turn.links && turn.links.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-4">
                        {turn.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={store.closeConcierge}
                            className="text-[10px] uppercase tracking-[0.18em] link-underline"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}

                    {turn.chips && turn.chips.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {turn.chips.map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => send(chip)}
                            className="border border-line px-3 py-1.5 text-[11px] transition hover:border-ink hover:bg-cream"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            ))}
            {thinking ? (
              <p className="text-xs uppercase tracking-[0.2em] text-ink-muted" aria-live="polite">
                Considering the atelier…
              </p>
            ) : null}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-3 border-t border-line px-5 py-4"
          >
            <label htmlFor="concierge-input" className="sr-only">
              Message the Style Concierge
            </label>
            <input
              id="concierge-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="A gift for my mother, under $250…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink-muted"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={thinking || input.trim().length === 0}
              className="text-[10px] uppercase tracking-[0.2em] transition hover:text-accent disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </section>
      ) : null}
    </>
  );
}
