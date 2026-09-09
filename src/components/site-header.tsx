"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND, WORDBITX } from "@/lib/brand";
import { CATEGORIES, COLLECTIONS } from "@/lib/catalog";
import { CURRENCIES } from "@/lib/currency";
import { useStore } from "./store-provider";

function Icon({ name }: { name: "search" | "account" | "heart" | "bag" | "menu" | "close" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.2 } as const;
  switch (name) {
    case "search":
      return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" {...common} />
          <path d="m16 16 4.5 4.5" {...common} strokeLinecap="round" />
        </svg>
      );
    case "account":
      return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
          <circle cx="12" cy="8.5" r="3.6" {...common} />
          <path d="M4.8 20c1.2-3.7 3.8-5.6 7.2-5.6s6 1.9 7.2 5.6" {...common} strokeLinecap="round" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
          <path
            d="M12 20.2s-7-4.3-7-9a3.9 3.9 0 0 1 7-2.4 3.9 3.9 0 0 1 7 2.4c0 4.7-7 9-7 9Z"
            {...common}
          />
        </svg>
      );
    case "bag":
      return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
          <path d="M5.5 7.5h13l1 12.5h-15l1-12.5Z" {...common} />
          <path d="M9 9.5V6.8a3 3 0 0 1 6 0v2.7" {...common} strokeLinecap="round" />
        </svg>
      );
    case "menu":
      return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
          <path d="M4 8h16M4 15h16" {...common} strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" {...common} strokeLinecap="round" />
        </svg>
      );
  }
}

const NAV_CATEGORY_LINKS = [
  { label: "Hot Deals", href: "/collections/best-sellers", hot: true },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  ...CATEGORIES.slice(0, 8).map((category) => ({
    label: category.name,
    href: `/shop?category=${category.slug}`,
  })),
  { label: "Journal", href: "/journal" },
];

function MegaMenu() {
  return (
    <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover/mega:visible group-hover/mega:translate-y-0 group-hover/mega:opacity-100 group-focus-within/mega:visible group-focus-within/mega:translate-y-0 group-focus-within/mega:opacity-100">
      <div className="grid w-[54rem] max-w-[92vw] grid-cols-[1fr_15rem] rounded-2xl border border-line bg-ivory shadow-[0_40px_80px_-40px_rgba(28,24,20,0.45)]">
        <div className="grid grid-cols-3 gap-x-8 gap-y-6 p-8">
          {CATEGORIES.map((category) => (
            <Link key={category.slug} href={`/shop?category=${category.slug}`} className="group/item block">
              <span className="block font-serif text-lg leading-tight group-hover/item:text-accent">
                {category.name}
              </span>
              <span className="mt-1 block text-[11px] leading-snug text-ink-muted">
                {category.tagline}
              </span>
            </Link>
          ))}
        </div>
        <div className="rounded-r-2xl border-l border-line bg-cream p-7">
          <p className="eyebrow">Curated edits</p>
          <ul className="mt-4 space-y-2.5 text-[12px] uppercase tracking-[0.14em]">
            {COLLECTIONS.map((collection) => (
              <li key={collection.slug}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="link-underline text-ink-soft hover:text-ink"
                >
                  {collection.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/gifts" className="link-underline text-ink-soft hover:text-ink">
                The gift experience
              </Link>
            </li>
          </ul>
          <div className="relative mt-6 aspect-[4/5] w-full overflow-hidden rounded-xl">
            <Image
              src="https://images.pexels.com/photos/28497023/pexels-photo-28497023.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1800&w=1200"
              alt="Woman in a bone wool coat at dusk"
              fill
              sizes="220px"
              className="object-cover"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-ivory/95 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-ink">
              The Wardrobe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const store = useStore();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Utility bar */}
      <div className="border-b border-line bg-cream">
        <div className="shell flex h-9 items-center justify-between text-[10px] tracking-[0.08em] text-ink-soft">
          <div className="flex items-center gap-5">
            <Link href="/help/faq" className="link-underline hover:text-ink">
              Help Center
            </Link>
            <Link href="/track" className="link-underline hover:text-ink">
              Track Order
            </Link>
            <Link href="/gifts" className="hidden link-underline hover:text-ink sm:inline-block">
              Gift Experience
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden md:inline">EN</span>
            <label htmlFor="currency-select" className="sr-only">
              Choose currency
            </label>
            <select
              id="currency-select"
              value={store.currency}
              onChange={(event) => store.setCurrency(event.target.value as (typeof CURRENCIES)[number]["code"])}
              className="cursor-pointer bg-transparent text-[10px] font-semibold tracking-[0.08em] outline-none transition hover:text-accent"
              aria-label="Currency"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code}
                </option>
              ))}
            </select>
            <Link href="/account" className="link-underline hover:text-ink">
              Account
            </Link>
            <a
              href={WORDBITX.primaryPhone.href}
              className="hidden font-semibold text-accent hover:text-ink lg:inline"
              aria-label={`Call WordbitX at ${WORDBITX.primaryPhone.label}`}
            >
              WordbitX: {WORDBITX.primaryPhone.label}
            </a>
            <Link href="/case-studies/ecommerce-experience" className="link-underline hover:text-ink">
              Portfolio Demo ↗
            </Link>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-50">
        <header
          className={`border-b transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
            scrolled
              ? "border-line bg-ivory/95 shadow-[0_10px_30px_-24px_rgba(28,24,20,0.6)] backdrop-blur-md"
              : "border-line bg-ivory"
          }`}
        >
          <div className="shell flex h-[4.5rem] items-center gap-4 md:gap-8">
            <button
              type="button"
              className="-ml-1 grid h-10 w-10 place-items-center lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Icon name="menu" />
            </button>

            <Link href="/" className="shrink-0" aria-label={`${BRAND.name} home — by WordbitX`}>
              <span className="flex items-baseline gap-2">
                <span className="font-serif text-[26px] tracking-[0.24em] md:text-3xl">
                  {BRAND.wordmark}
                </span>
                <span className="hidden rounded-full border border-accent/40 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-accent sm:inline-block">
                  by WordbitX
                </span>
              </span>
            </Link>

            <form
              action="/search"
              role="search"
              className="hidden flex-1 items-center md:flex"
              onSubmit={(event) => {
                const input = event.currentTarget.elements.namedItem("q") as HTMLInputElement;
                if (input && input.value.trim().length < 2) {
                  event.preventDefault();
                  store.openSearch();
                }
              }}
            >
              <label htmlFor="header-search" className="sr-only">
                Search products, categories and journal
              </label>
              <div className="flex w-full max-w-2xl items-center gap-3 rounded-full border border-line bg-cream px-5 py-3 transition focus-within:border-ink">
                <Icon name="search" />
                <input
                  id="header-search"
                  name="q"
                  type="search"
                  placeholder="Search for products, categories, journal…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-ink-muted"
                  autoComplete="off"
                />
                <kbd className="hidden rounded border border-line bg-ivory px-1.5 py-0.5 text-[9px] uppercase text-ink-muted lg:inline">
                  ⌘K
                </kbd>
              </div>
            </form>

            <div className="ml-auto flex items-center gap-1 md:ml-0 sm:gap-2">
              <button
                type="button"
                onClick={store.openSearch}
                className="grid h-10 w-10 place-items-center text-ink transition hover:text-accent md:hidden"
                aria-label="Search"
              >
                <Icon name="search" />
              </button>
              <Link
                href="/account"
                className="hidden h-10 w-10 place-items-center text-ink transition hover:text-accent sm:grid"
                aria-label="Your account"
              >
                <Icon name="account" />
              </Link>
              <Link
                href="/wishlist"
                className="relative grid h-10 w-10 place-items-center text-ink transition hover:text-accent"
                aria-label={`Wishlist, ${store.wishlist.length} saved`}
              >
                <Icon name="heart" />
                {store.wishlist.length > 0 ? (
                  <span className="absolute right-0.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] text-ivory">
                    {store.wishlist.length}
                  </span>
                ) : null}
              </Link>
              <button
                type="button"
                onClick={store.openCart}
                data-cursor="Open"
                className="relative grid h-10 w-10 place-items-center text-ink transition hover:text-accent"
                aria-label={`Cart, ${store.cartCount} item${store.cartCount === 1 ? "" : "s"}`}
              >
                <Icon name="bag" />
                {store.cartCount > 0 ? (
                  <span className="absolute right-0.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[9px] text-ivory">
                    {store.cartCount}
                  </span>
                ) : null}
              </button>
            </div>
          </div>

          {/* Category nav row */}
          <nav aria-label="Categories" className="hidden border-t border-line-soft lg:block">
            <div className="shell no-scrollbar flex items-center gap-7 overflow-x-auto py-2.5 text-[11px] font-medium uppercase tracking-[0.16em]">
              {NAV_CATEGORY_LINKS.map((item) =>
                item.label === "Shop All" ? null : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`link-underline whitespace-nowrap transition-colors ${
                      item.hot ? "font-bold !text-accent" : "text-ink hover:text-accent"
                    }`}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <div className="group/mega relative">
                <Link
                  href="/shop"
                  aria-haspopup="true"
                  className="link-underline flex items-center gap-1 whitespace-nowrap text-ink transition-colors hover:text-accent"
                >
                  Shop All
                  <svg viewBox="0 0 10 6" className="h-1.5 w-2.5" aria-hidden="true">
                    <path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  </svg>
                </Link>
                <MegaMenu />
              </div>
            </div>
          </nav>
        </header>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-ink/25" onClick={() => setMenuOpen(false)} />
          <div className="drawer-in absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-ivory">
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <span className="font-serif text-lg tracking-[0.3em]">{BRAND.wordmark}</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid h-9 w-9 place-items-center"
                aria-label="Close menu"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="border-b border-line p-5">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  store.openSearch();
                }}
                className="flex w-full items-center gap-3 rounded-full border border-line bg-cream px-4 py-3 text-left text-sm text-ink-muted"
              >
                <Icon name="search" />
                Search the store
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/collections/best-sellers"
                    className="block border-b border-line-soft py-3.5 font-serif text-2xl !text-accent"
                  >
                    Hot Deals
                  </Link>
                </li>
                <li>
                  <Link href="/collections/new-arrivals" className="block border-b border-line-soft py-3.5 font-serif text-2xl">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="block border-b border-line-soft py-3.5 font-serif text-2xl">
                    Shop All
                  </Link>
                </li>
                <li>
                  <Link href="/gifts" className="block border-b border-line-soft py-3.5 font-serif text-2xl">
                    Gifting
                  </Link>
                </li>
              </ul>

              <p className="eyebrow mt-8">Shop by category</p>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-ink-soft">
                {CATEGORIES.map((category) => (
                  <li key={category.slug}>
                    <Link href={`/shop?category=${category.slug}`} className="link-underline">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="mt-8 space-y-3 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                <li>
                  <Link href="/collections/best-sellers">Best sellers</Link>
                </li>
                <li>
                  <Link href="/journal">Journal</Link>
                </li>
                <li>
                  <Link href="/account">Account</Link>
                </li>
                <li>
                  <Link href="/wishlist">Wishlist ({store.wishlist.length})</Link>
                </li>
                <li>
                  <Link href="/track">Track an order</Link>
                </li>
                <li>
                  <Link href="/case-studies/ecommerce-experience">WordbitX case study</Link>
                </li>
              </ul>
            </nav>

            <div className="border-t border-line p-5">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  store.openCart();
                }}
                className="btn btn-ink w-full"
              >
                View cart ({store.cartCount})
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
