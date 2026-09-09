"use client";

import Link from "next/link";
import { useState } from "react";
import { BRAND, FOOTER_NAV, WORDBITX } from "@/lib/brand";
import { CURRENCIES } from "@/lib/currency";
import { useStore } from "./store-provider";

export function SiteFooter() {
  const store = useStore();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function subscribe(event: React.FormEvent) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setState("error");
      setMessage("Enter a valid email address.");
      return;
    }
    setState("sending");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const data = (await response.json()) as { message?: string };
      setState(response.ok ? "done" : "error");
      setMessage(data.message ?? "Something went wrong.");
      if (response.ok) {
        store.track("newsletter_subscribe", {});
        setEmail("");
      }
    } catch {
      setState("error");
      setMessage("Network error — please try again.");
    }
  }

  return (
    <footer className="mt-24 border-t border-line bg-cream">
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.1fr_2fr]">
        <div>
          <p className="font-serif text-3xl tracking-[0.28em]">{BRAND.wordmark}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">{BRAND.shortStory}</p>
          <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-ink-muted">{BRAND.studio}</p>

          <div className="mt-6 border-l-2 border-accent pl-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              WordbitX project enquiries
            </p>
            <div className="mt-2 flex flex-col gap-1.5 text-sm">
              <a href={WORDBITX.primaryPhone.href} className="link-underline w-fit font-semibold text-ink">
                Pakistan (primary): {WORDBITX.primaryPhone.label}
              </a>
              <a href={WORDBITX.usaPhone.href} className="link-underline w-fit text-ink-soft">
                USA: {WORDBITX.usaPhone.label}
              </a>
            </div>
          </div>

          <form onSubmit={subscribe} className="mt-8 max-w-sm">
            <label htmlFor="footer-email" className="eyebrow">
              Atelier letters
            </label>
            <div className="mt-3 flex items-center gap-3 border-b border-ink/25 pb-2">
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="your@email.com"
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink-muted"
                aria-describedby="footer-email-note"
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="text-[10px] uppercase tracking-[0.22em] text-ink transition hover:text-accent disabled:opacity-50"
              >
                {state === "sending" ? "Sending" : "Join"}
              </button>
            </div>
            <p
              id="footer-email-note"
              className={`mt-2 text-xs ${state === "error" ? "text-accent" : "text-ink-muted"}`}
              role={state === "error" ? "alert" : undefined}
            >
              {message || "New releases and journal notes. Roughly once a month."}
            </p>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {FOOTER_NAV.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="eyebrow">{column.title}</h2>
              <ul className="mt-5 space-y-2.5 text-sm text-ink-soft">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="link-underline hover:text-ink">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-4 py-6 text-[11px] text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 {BRAND.name} ·{" "}
            <a
              href={WORDBITX.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-ink"
            >
              {WORDBITX.credit}
            </a>
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {BRAND.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                {item.label}
              </a>
            ))}
            <label htmlFor="footer-currency" className="sr-only">
              Choose currency
            </label>
            <select
              id="footer-currency"
              value={store.currency}
              onChange={(event) => store.setCurrency(event.target.value as (typeof CURRENCIES)[number]["code"])}
              className="cursor-pointer bg-transparent text-[11px] outline-none transition hover:text-accent"
              aria-label="Currency"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
            <span className="hidden sm:inline">Card · Wallet · Cash on delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
