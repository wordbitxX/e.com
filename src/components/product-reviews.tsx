"use client";

import { useEffect, useState } from "react";

type Review = {
  id: number;
  authorName: string;
  location: string | null;
  rating: number;
  title: string | null;
  body: string;
  isDemo: boolean;
  createdAt: string;
};

export function ProductReviews({ slug }: { slug: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [state, setState] = useState<"loading" | "ready">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/reviews?slug=${encodeURIComponent(slug)}`)
      .then((response) => response.json())
      .then((data: { reviews?: Review[] }) => {
        if (!cancelled) {
          setReviews(data.reviews ?? []);
          setState("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setState("ready");
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (state === "loading") {
    return (
      <p className="text-xs uppercase tracking-[0.18em] text-ink-muted" aria-live="polite">
        Loading notes…
      </p>
    );
  }

  if (reviews.length === 0) {
    return (
      <p className="max-w-xl text-sm leading-relaxed text-ink-soft">
        No client notes have been published for this piece yet. The review table, moderation flag
        and API are already in place — when verified purchase reviews arrive they appear here, and
        only then would an aggregate rating be published.
      </p>
    );
  }

  const allDemo = reviews.every((review) => review.isDemo);

  return (
    <div>
      <ul className="grid gap-6 md:grid-cols-2">
        {reviews.map((review) => (
          <li key={review.id} className="border border-line p-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                {review.isDemo ? "Sample note" : "Verified purchase"}
              </p>
              <p aria-label={`${review.rating} out of 5`} className="text-xs tracking-[0.2em] text-accent">
                {"★".repeat(review.rating)}
                <span className="text-line">{"★".repeat(5 - review.rating)}</span>
              </p>
            </div>
            {review.title ? <p className="mt-3 font-serif text-xl">{review.title}</p> : null}
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{review.body}</p>
            <p className="mt-4 text-xs text-ink-muted">
              {review.authorName}
              {review.location ? ` · ${review.location}` : ""}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ink-muted">
        {allDemo
          ? "These notes are sample content, stored with an is_demo flag. No aggregate rating is emitted in structured data and no verified claim is made. Real reviews can replace them without any UI change."
          : "Rated on verified purchase reviews. Aggregate ratings are emitted in structured data only for real, non-sample reviews."}
      </p>
    </div>
  );
}
