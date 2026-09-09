"use client";

import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, type Product } from "@/lib/catalog";
import { ProductCard } from "./product-card";
import { useStore } from "./store-provider";

type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "best-selling";

const SORTS: { id: SortKey; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "best-selling", label: "Best selling" },
];

const PRICE_BANDS = [
  { id: "under-150", label: "Under $150", min: 0, max: 15000 },
  { id: "150-300", label: "$150 – $300", min: 15000, max: 30000 },
  { id: "300-500", label: "$300 – $500", min: 30000, max: 50000 },
  { id: "over-500", label: "$500 and above", min: 50000, max: Number.MAX_SAFE_INTEGER },
];

type Props = {
  products: Product[];
  initialCategory?: string;
  initialSort?: SortKey;
  initialMaxCents?: number;
  lockCategory?: boolean;
  heading?: string;
};

export function ShopBrowser({
  products,
  initialCategory,
  initialSort = "featured",
  initialMaxCents,
  lockCategory = false,
  heading = "Products",
}: Props) {
  const store = useStore();
  const { format: formatPrice } = store;
  const [categories, setCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [bands, setBands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>(initialSort);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Keep the interactive filter state in sync when App Router navigates between
  // /shop?category=... URLs. Without this, React can preserve the old client
  // state while the server has already rendered a new category heading.
  useEffect(() => {
    setCategories(initialCategory ? [initialCategory] : []);
    setBands([]);
    setColors([]);
    setSizes([]);
    setInStockOnly(false);
    setDrawerOpen(false);
  }, [initialCategory, initialMaxCents]);

  const availableCategories = useMemo(
    () => CATEGORIES.filter((category) => products.some((p) => p.categorySlug === category.slug)),
    [products],
  );

  const availableColors = useMemo(() => {
    const map = new Map<string, { id: string; name: string; hex: string }>();
    for (const product of products) {
      for (const color of product.colors) if (!map.has(color.id)) map.set(color.id, color);
    }
    return [...map.values()];
  }, [products]);

  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    for (const product of products) {
      for (const size of product.sizes) if (size.label !== "One size") set.add(size.label);
    }
    return [...set];
  }, [products]);

  const toggle = (value: string, list: string[], setList: (next: string[]) => void) => {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  const filtered = useMemo(() => {
    let result = products.filter((product) => {
      if (categories.length > 0 && !categories.includes(product.categorySlug)) return false;
      if (initialMaxCents && product.priceCents > initialMaxCents) return false;
      if (bands.length > 0) {
        const inBand = bands.some((id) => {
          const band = PRICE_BANDS.find((item) => item.id === id);
          return band ? product.priceCents >= band.min && product.priceCents < band.max : false;
        });
        if (!inBand) return false;
      }
      if (colors.length > 0 && !product.colors.some((color) => colors.includes(color.id))) {
        return false;
      }
      if (
        sizes.length > 0 &&
        !product.sizes.some((size) => sizes.includes(size.label) && size.inStock)
      ) {
        return false;
      }
      if (inStockOnly && product.stock === 0) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "newest":
          return new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime();
        case "price-asc":
          return a.priceCents - b.priceCents;
        case "price-desc":
          return b.priceCents - a.priceCents;
        case "best-selling":
          return a.salesRank - b.salesRank;
        default:
          return 0;
      }
    });

    return result;
  }, [products, categories, bands, colors, sizes, inStockOnly, sort, initialMaxCents]);

  const activeCount =
    categories.length + bands.length + colors.length + sizes.length + (inStockOnly ? 1 : 0);

  useEffect(() => {
    if (activeCount > 0) {
      store.track("filter_apply", { categories, bands, colors, sizes, inStockOnly, sort });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, bands, colors, sizes, inStockOnly, sort]);

  const clearAll = () => {
    setCategories(lockCategory && initialCategory ? [initialCategory] : []);
    setBands([]);
    setColors([]);
    setSizes([]);
    setInStockOnly(false);
  };

  const filterPanel = (
    <div className="space-y-9">
      {!lockCategory && availableCategories.length > 1 ? (
        <fieldset>
          <legend className="eyebrow">Category</legend>
          <ul className="mt-4 space-y-2.5">
            {availableCategories.map((category) => (
              <li key={category.slug}>
                <label className="flex cursor-pointer items-center gap-3 text-sm text-ink-soft transition hover:text-ink">
                  <input
                    type="checkbox"
                    checked={categories.includes(category.slug)}
                    onChange={() => toggle(category.slug, categories, setCategories)}
                    className="h-3.5 w-3.5 accent-[#1a1815]"
                  />
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      ) : null}

      <fieldset>
        <legend className="eyebrow">Price</legend>
        <ul className="mt-4 space-y-2.5">
          {PRICE_BANDS.map((band) => (
            <li key={band.id}>
              <label className="flex cursor-pointer items-center gap-3 text-sm text-ink-soft transition hover:text-ink">
                <input
                  type="checkbox"
                  checked={bands.includes(band.id)}
                  onChange={() => toggle(band.id, bands, setBands)}
                  className="h-3.5 w-3.5 accent-[#1a1815]"
                />
                {band.label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="eyebrow">Colour</legend>
        <ul className="mt-4 flex flex-wrap gap-2">
          {availableColors.map((color) => {
            const active = colors.includes(color.id);
            return (
              <li key={color.id}>
                <button
                  type="button"
                  onClick={() => toggle(color.id, colors, setColors)}
                  aria-pressed={active}
                  className={`flex items-center gap-2 border px-2.5 py-1.5 text-xs transition ${
                    active ? "border-ink" : "border-line hover:border-ink/50"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full border border-line"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      {availableSizes.length > 0 ? (
        <fieldset>
          <legend className="eyebrow">Size</legend>
          <ul className="mt-4 flex flex-wrap gap-2">
            {availableSizes.map((size) => {
              const active = sizes.includes(size);
              return (
                <li key={size}>
                  <button
                    type="button"
                    onClick={() => toggle(size, sizes, setSizes)}
                    aria-pressed={active}
                    className={`min-w-11 border px-3 py-1.5 text-xs transition ${
                      active ? "border-ink bg-ink text-ivory" : "border-line hover:border-ink/50"
                    }`}
                  >
                    {size}
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ) : null}

      <fieldset>
        <legend className="eyebrow">Availability</legend>
        <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-ink-soft transition hover:text-ink">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => setInStockOnly(event.target.checked)}
            className="h-3.5 w-3.5 accent-[#1a1815]"
          />
          In stock only
        </label>
      </fieldset>

      <p className="border-t border-line pt-6 text-xs leading-relaxed text-ink-muted">
        A rating filter is intentionally absent: no verified review data exists for this
        demonstration catalog, and we do not publish invented ratings.
      </p>
    </div>
  );

  return (
    <section className="shell py-12" aria-label={heading}>
      <div className="flex flex-col gap-4 border-b border-line pb-5 md:flex-row md:items-center md:justify-between">
        <p className="text-[11px] uppercase tracking-[0.18em] text-ink-muted" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          {activeCount > 0 ? ` · ${activeCount} filter${activeCount === 1 ? "" : "s"} applied` : ""}
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="border border-line px-4 py-2 text-[11px] uppercase tracking-[0.16em] lg:hidden"
          >
            Filters {activeCount > 0 ? `(${activeCount})` : ""}
          </button>
          <label className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink-muted">
            Sort
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="border border-line bg-ivory px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-ink outline-none"
            >
              {SORTS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-12 pt-10 lg:grid-cols-[15rem_1fr] lg:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h2 className="font-serif text-xl">Refine</h2>
              {activeCount > 0 ? (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-[10px] uppercase tracking-[0.16em] text-ink-muted hover:text-accent"
                >
                  Clear
                </button>
              ) : null}
            </div>
            <div className="mt-7">{filterPanel}</div>
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="border border-line px-8 py-20 text-center">
              <p className="font-serif text-3xl">Nothing matches those filters</p>
              <p className="mx-auto mt-4 max-w-md text-sm text-ink-soft">
                Loosen a filter, or let the Style Concierge narrow the catalog for you in a sentence.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button type="button" onClick={clearAll} className="btn btn-outline">
                  Clear filters
                </button>
                <button type="button" onClick={store.openConcierge} className="btn btn-ink">
                  Ask the concierge
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-3">
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  priority={index < 3}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 26vw"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="fade-in absolute inset-0 bg-ink/30" onClick={() => setDrawerOpen(false)} />
          <div className="drawer-in absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-ivory">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-serif text-2xl">Refine</h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="text-[10px] uppercase tracking-[0.18em]"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-7">{filterPanel}</div>
            <div className="flex gap-3 border-t border-line px-5 py-4">
              <button type="button" onClick={clearAll} className="btn btn-quiet flex-1">
                Clear
              </button>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="btn btn-ink flex-1"
              >
                Show {filtered.length}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {initialMaxCents ? (
        <p className="mt-8 text-xs text-ink-muted">
          Filtered to pieces at or below {formatPrice(initialMaxCents)}.
        </p>
      ) : null}
    </section>
  );
}
