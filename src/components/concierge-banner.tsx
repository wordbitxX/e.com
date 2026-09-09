"use client";

import { useStore } from "./store-provider";

const PROMPTS = [
  "A gift under $250",
  "Find a coat for winter",
  "Build an outfit",
  "Compare the two watches",
  "Best sellers",
];

export function ConciergeBanner() {
  const store = useStore();

  return (
    <section
      className="bg-[linear-gradient(120deg,#1c1814_0%,#3a2f1d_55%,#8d6a2e_130%)] py-16 text-ivory"
      aria-labelledby="concierge-banner-heading"
    >
      <div className="shell text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-champagne">
          AI smart shopping experience
        </p>
        <h2 id="concierge-banner-heading" className="mx-auto mt-4 max-w-2xl font-serif text-4xl md:text-5xl">
          Style Concierge
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ivory/75">
          A personal shopper that knows all nine departments — occasion, budget, size, colour.
          Every answer is grounded in the live catalog, so it can never invent a product or price.
        </p>

        <button
          type="button"
          onClick={() => {
            store.openConcierge();
            store.track("concierge_message", { prompt: "banner", source: "hero-banner" });
          }}
          className="mx-auto mt-8 flex w-full max-w-xl items-center gap-4 rounded-2xl border border-ivory/25 bg-ivory px-5 py-4 text-left text-ink shadow-[0_30px_60px_-40px_rgba(0,0,0,0.9)] transition hover:border-ivory/60"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4.5 4.5" strokeLinecap="round" />
          </svg>
          <span className="text-sm text-ink-muted">Ask for a gift under $250, a coat for winter…</span>
          <span className="ml-auto shrink-0 rounded-full bg-ink px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ivory">
            Ask
          </span>
        </button>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => {
                store.openConcierge();
                store.track("concierge_message", { prompt, source: "banner-chips" });
              }}
              className="rounded-full border border-ivory/25 px-4 py-2 text-xs text-ivory/85 transition hover:border-champagne hover:text-champagne"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
