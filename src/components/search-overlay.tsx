"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { POPULAR_SEARCHES, type SearchResponse } from "@/lib/search";
import { useStore } from "./store-provider";

const RECENT_KEY = "veranne.recent-searches";

export function SearchOverlay() {
  const store = useStore();
  const { format: formatPrice } = store;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [recent, setRecent] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const open = store.ui.searchOpen;

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    try {
      const raw = window.localStorage.getItem(RECENT_KEY);
      setRecent(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      setRecent([]);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults(null);
      return;
    }
    setLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
        const data = (await response.json()) as SearchResponse;
        setResults(data);
        store.track("search", { query: trimmed, results: data.total });
      } catch {
        setResults(null);
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => window.clearTimeout(timer);
  }, [query, open, store]);

  function commit(term: string) {
    const next = [term, ...recent.filter((item) => item !== term)].slice(0, 5);
    setRecent(next);
    try {
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  if (!open) return null;

  const hasResults = results && results.total > 0;

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Search">
      <div className="fade-in absolute inset-0 bg-ink/30" onClick={store.closeSearch} />
      <div className="sheet-in absolute inset-x-0 top-0 max-h-[92vh] overflow-y-auto bg-ivory">
        <div className="shell py-6">
          <div className="flex items-center gap-4 border-b border-ink/20 pb-4">
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <label htmlFor="site-search" className="sr-only">
              Search products, collections and journal
            </label>
            <input
              id="site-search"
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && query.trim().length > 1) commit(query.trim());
              }}
              placeholder="Search cashmere, tote, gifts under 250…"
              className="w-full bg-transparent py-2 font-serif text-2xl outline-none placeholder:text-ink-muted md:text-3xl"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={store.closeSearch}
              className="text-[10px] uppercase tracking-[0.2em] text-ink-soft hover:text-ink"
            >
              Close
            </button>
          </div>

          {!hasResults ? (
            <div className="grid gap-10 py-10 md:grid-cols-3">
              {recent.length > 0 ? (
                <div>
                  <p className="eyebrow">Recent searches</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {recent.map((term) => (
                      <li key={term}>
                        <button
                          type="button"
                          onClick={() => setQuery(term)}
                          className="link-underline text-ink-soft hover:text-ink"
                        >
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div>
                <p className="eyebrow">Popular searches</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <li key={term}>
                      <button
                        type="button"
                        onClick={() => setQuery(term)}
                        className="border border-line px-3 py-1.5 text-xs transition hover:border-ink"
                      >
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow">{results ? "No exact matches — start here" : "Shortcuts"}</p>
                <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                  <li>
                    <Link href="/collections/new-arrivals" onClick={store.closeSearch} className="link-underline">
                      New arrivals
                    </Link>
                  </li>
                  <li>
                    <Link href="/gifts" onClick={store.closeSearch} className="link-underline">
                      The gift experience
                    </Link>
                  </li>
                  <li>
                    <Link href="/journal" onClick={store.closeSearch} className="link-underline">
                      Journal &amp; buying guides
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        store.closeSearch();
                        store.openConcierge();
                      }}
                      className="link-underline"
                    >
                      Ask the Style Concierge
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid gap-10 py-8 lg:grid-cols-[2fr_1fr]">
              <div>
                <p className="eyebrow">Products</p>
                <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                  {results.products.map((hit) => (
                    <li key={hit.href}>
                      <Link
                        href={hit.href}
                        onClick={() => {
                          commit(query.trim());
                          store.closeSearch();
                        }}
                        className="group flex gap-4"
                      >
                        <span className="relative block h-24 w-20 shrink-0 overflow-hidden bg-cream">
                          {hit.image ? (
                            <Image
                              src={hit.image}
                              alt={hit.title}
                              fill
                              sizes="80px"
                              className="object-cover transition duration-700 group-hover:scale-105"
                            />
                          ) : null}
                        </span>
                        <span className="flex flex-col justify-center">
                          <span className="font-serif text-lg leading-tight">{hit.title}</span>
                          <span className="text-xs text-ink-muted">{hit.subtitle}</span>
                          {hit.priceCents ? (
                            <span className="mt-1 text-sm">{formatPrice(hit.priceCents)}</span>
                          ) : null}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {results.products.length > 0 ? (
                  <Link
                    href={`/search?q=${encodeURIComponent(query.trim())}`}
                    onClick={() => {
                      commit(query.trim());
                      store.closeSearch();
                    }}
                    className="mt-6 inline-block text-[11px] uppercase tracking-[0.2em] link-underline"
                  >
                    See all results for “{query.trim()}”
                  </Link>
                ) : null}
              </div>

              <div className="space-y-8">
                {results.collections.length > 0 ? (
                  <div>
                    <p className="eyebrow">Collections</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      {results.collections.map((hit) => (
                        <li key={hit.href}>
                          <Link href={hit.href} onClick={store.closeSearch} className="link-underline">
                            {hit.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {results.categories.length > 0 ? (
                  <div>
                    <p className="eyebrow">Categories</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      {results.categories.map((hit) => (
                        <li key={hit.href}>
                          <Link href={hit.href} onClick={store.closeSearch} className="link-underline">
                            {hit.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {results.articles.length > 0 ? (
                  <div>
                    <p className="eyebrow">Journal</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      {results.articles.map((hit) => (
                        <li key={hit.href}>
                          <Link href={hit.href} onClick={store.closeSearch} className="link-underline">
                            {hit.title}
                          </Link>
                          <span className="ml-2 text-xs text-ink-muted">{hit.subtitle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {loading ? (
            <p className="pb-6 text-xs uppercase tracking-[0.2em] text-ink-muted" aria-live="polite">
              Searching…
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
