"use client";

import { useState } from "react";
import { GIFT_BUDGETS, GIFT_OCCASIONS, GIFT_RECIPIENTS, giftMatches } from "@/lib/recommend";
import { ProductCard } from "./product-card";
import { useStore } from "./store-provider";

const MOODS = ["cosy", "minimal", "sculptural", "evening", "home", "heirloom"];

export function GiftFinder() {
  const store = useStore();
  const [occasion, setOccasion] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [budget, setBudget] = useState<number>(25000);
  const [mood, setMood] = useState<string>("");
  const [results, setResults] = useState(() => giftMatches({ budgetCents: 25000, limit: 4 }));
  const [ran, setRan] = useState(false);

  function run() {
    const matches = giftMatches({
      occasion: occasion || undefined,
      recipient: recipient || undefined,
      budgetCents: budget,
      mood: mood || undefined,
      limit: 4,
    });
    setResults(matches);
    setRan(true);
    store.track("gift_finder_run", { occasion, recipient, budget, mood, results: matches.length });
  }

  const Chip = ({
    label,
    active,
    onClick,
  }: {
    label: string;
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3.5 py-2 text-xs capitalize transition ${
        active ? "border-ink bg-ink text-ivory" : "border-line hover:border-ink"
      }`}
    >
      {label}
    </button>
  );

  return (
    <section className="shell py-16" aria-labelledby="gift-finder-heading">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div>
          <p className="eyebrow">Gift finder</p>
          <h2 id="gift-finder-heading" className="mt-4 font-serif text-4xl leading-tight">
            Four questions, one answer
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
            Occasion, recipient, budget and mood. The same scoring the Style Concierge uses — run it
            here, or ask the concierge in your own words.
          </p>

          <div className="mt-9 space-y-8">
            <fieldset>
              <legend className="eyebrow">Occasion</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {GIFT_OCCASIONS.slice(0, 8).map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    active={occasion === item}
                    onClick={() => setOccasion(occasion === item ? "" : item)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="eyebrow">Recipient</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {GIFT_RECIPIENTS.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    active={recipient === item}
                    onClick={() => setRecipient(recipient === item ? "" : item)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="eyebrow">Budget</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {GIFT_BUDGETS.map((item) => (
                  <Chip
                    key={item.label}
                    label={item.label}
                    active={budget === item.cents}
                    onClick={() => setBudget(item.cents)}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="eyebrow">Style</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {MOODS.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    active={mood === item}
                    onClick={() => setMood(mood === item ? "" : item)}
                  />
                ))}
              </div>
            </fieldset>
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <button type="button" onClick={run} className="btn btn-ink">
              Show my matches
            </button>
            <button type="button" onClick={store.openConcierge} className="btn btn-outline">
              Ask the concierge instead
            </button>
          </div>
        </div>

        <div>
          <p className="eyebrow">{ran ? "Matched for you" : "A starting selection"}</p>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6">
            {results.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                reason={ran ? "Matched" : undefined}
                sizes="(max-width: 768px) 45vw, 28vw"
              />
            ))}
          </div>
          {results.length === 0 ? (
            <p className="mt-6 text-sm text-ink-soft">
              Nothing sits inside those constraints. Widen the budget or clear the style filter.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
