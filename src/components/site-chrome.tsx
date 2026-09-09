"use client";

import Link from "next/link";
import { AtelierCursor } from "./atelier-cursor";
import { CartDrawer } from "./cart-drawer";
import { ConciergePanel } from "./concierge-panel";
import { QuickView } from "./quick-view";
import { SearchOverlay } from "./search-overlay";
import { useStore } from "./store-provider";

function Toasts() {
  const store = useStore();
  if (store.toasts.length === 0) return null;
  return (
    <div
      className="pointer-events-none fixed bottom-20 left-1/2 z-[95] flex w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 flex-col gap-2 md:bottom-6 md:left-6 md:translate-x-0"
      aria-live="polite"
    >
      {store.toasts.map((toast) => (
        <div
          key={toast.id}
          className="sheet-in pointer-events-auto flex items-center justify-between gap-4 border border-line bg-ivory px-4 py-3 text-sm shadow-[0_20px_50px_-35px_rgba(26,24,21,0.9)]"
        >
          <span>{toast.message}</span>
          {toast.href ? (
            <Link href={toast.href} className="shrink-0 text-[10px] uppercase tracking-[0.18em] link-underline">
              {toast.linkLabel ?? "View"}
            </Link>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function SiteChrome() {
  return (
    <>
      <SearchOverlay />
      <CartDrawer />
      <QuickView />
      <ConciergePanel />
      <Toasts />
      <AtelierCursor />
    </>
  );
}
