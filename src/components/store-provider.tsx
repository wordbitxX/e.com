"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { productBySlug, type Product } from "@/lib/catalog";
import {
  calculateTotals,
  findCoupon,
  priceLines,
  SHIPPING_METHODS,
  type OrderTotals,
} from "@/lib/commerce";
import { CURRENCIES, DEFAULT_CURRENCY, formatFromUsd, type CurrencyCode } from "@/lib/currency";

export type CartLine = {
  id: string;
  slug: string;
  quantity: number;
  colorId?: string;
  size?: string;
};

type Toast = { id: number; message: string; href?: string; linkLabel?: string };

type StoreState = {
  ready: boolean;
  sessionId: string;
  cart: CartLine[];
  saved: CartLine[];
  wishlist: string[];
  recentlyViewed: string[];
  couponCode: string | null;
  giftWrap: boolean;
  giftMessage: string;
  shippingMethodId: string;
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  format: (centsUsd: number) => string;
  totals: OrderTotals;
  cartCount: number;
  toasts: Toast[];
  ui: {
    cartOpen: boolean;
    searchOpen: boolean;
    conciergeOpen: boolean;
    quickViewSlug: string | null;
  };
  addToCart: (
    product: Product,
    options?: { colorId?: string; size?: string; quantity?: number; silent?: boolean },
  ) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeLine: (id: string) => void;
  saveForLater: (id: string) => void;
  moveToCart: (id: string) => void;
  removeSaved: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  markViewed: (slug: string) => void;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  clearCoupon: () => void;
  setGiftWrap: (value: boolean) => void;
  setGiftMessage: (value: string) => void;
  setShippingMethodId: (value: string) => void;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openConcierge: () => void;
  closeConcierge: () => void;
  setQuickView: (slug: string | null) => void;
  track: (name: string, payload?: Record<string, unknown>) => void;
  pushToast: (message: string, options?: { href?: string; linkLabel?: string }) => void;
};

const StoreContext = createContext<StoreState | null>(null);

const KEY = "veranne.store.v1";

type Persisted = {
  sessionId: string;
  cart: CartLine[];
  saved: CartLine[];
  wishlist: string[];
  recentlyViewed: string[];
  couponCode: string | null;
  giftWrap: boolean;
  giftMessage: string;
  shippingMethodId: string;
};

const makeSessionId = () =>
  `vs_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;

const lineId = (slug: string, colorId?: string, size?: string) =>
  [slug, colorId ?? "-", size ?? "-"].join("|");

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [saved, setSaved] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [shippingMethodId, setShippingMethodId] = useState(SHIPPING_METHODS[0].id);
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [quickViewSlug, setQuickViewSlug] = useState<string | null>(null);
  const toastSeq = useRef(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Persisted>;
        setSessionId(parsed.sessionId || makeSessionId());
        setCart(parsed.cart ?? []);
        setSaved(parsed.saved ?? []);
        setWishlist(parsed.wishlist ?? []);
        setRecentlyViewed(parsed.recentlyViewed ?? []);
        setCouponCode(parsed.couponCode ?? null);
        setGiftWrap(Boolean(parsed.giftWrap));
        setGiftMessage(parsed.giftMessage ?? "");
        setShippingMethodId(parsed.shippingMethodId ?? SHIPPING_METHODS[0].id);
      } else {
        setSessionId(makeSessionId());
      }
      const savedCurrency = window.localStorage.getItem("veranne.currency");
      if (savedCurrency && CURRENCIES.some((item) => item.code === savedCurrency)) {
        setCurrencyState(savedCurrency as CurrencyCode);
      }
    } catch {
      setSessionId(makeSessionId());
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !sessionId) return;
    const payload: Persisted = {
      sessionId,
      cart,
      saved,
      wishlist,
      recentlyViewed,
      couponCode,
      giftWrap,
      giftMessage,
      shippingMethodId,
    };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(payload));
    } catch {
      /* storage unavailable — session continues in memory */
    }
  }, [
    ready,
    sessionId,
    cart,
    saved,
    wishlist,
    recentlyViewed,
    couponCode,
    giftWrap,
    giftMessage,
    shippingMethodId,
  ]);

  const track = useCallback(
    (name: string, payload: Record<string, unknown> = {}) => {
      if (typeof window === "undefined") return;
      const body = JSON.stringify({
        name,
        payload,
        sessionId,
        path: window.location.pathname,
      });
      try {
        if (navigator.sendBeacon) {
          navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
        } else {
          void fetch("/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
            keepalive: true,
          });
        }
      } catch {
        /* analytics must never break the storefront */
      }
    },
    [sessionId],
  );

  const pushToast = useCallback(
    (message: string, options?: { href?: string; linkLabel?: string }) => {
      toastSeq.current += 1;
      const id = toastSeq.current;
      setToasts((current) => [...current, { id, message, ...options }]);
      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 4200);
    },
    [],
  );

  const addToCart: StoreState["addToCart"] = useCallback(
    (product, options = {}) => {
      const colorId = options.colorId ?? product.colors[0]?.id;
      const size = options.size ?? product.sizes[0]?.label;
      const quantity = Math.max(1, options.quantity ?? 1);
      const id = lineId(product.slug, colorId, size);
      setCart((current) => {
        const existing = current.find((line) => line.id === id);
        if (existing) {
          return current.map((line) =>
            line.id === id ? { ...line, quantity: Math.min(10, line.quantity + quantity) } : line,
          );
        }
        return [...current, { id, slug: product.slug, quantity, colorId, size }];
      });
      track("add_to_cart", { slug: product.slug, quantity, priceCents: product.priceCents });
      if (!options.silent) {
        setCartOpen(true);
        pushToast(`${product.name} added to your cart.`);
      }
    },
    [pushToast, track],
  );

  const setQuantity = useCallback((id: string, quantity: number) => {
    setCart((current) =>
      quantity <= 0
        ? current.filter((line) => line.id !== id)
        : current.map((line) =>
            line.id === id ? { ...line, quantity: Math.min(10, quantity) } : line,
          ),
    );
  }, []);

  const removeLine = useCallback(
    (id: string) => {
      setCart((current) => {
        const line = current.find((item) => item.id === id);
        if (line) track("remove_from_cart", { slug: line.slug });
        return current.filter((item) => item.id !== id);
      });
    },
    [track],
  );

  const saveForLater = useCallback((id: string) => {
    setCart((current) => {
      const line = current.find((item) => item.id === id);
      if (line) setSaved((savedLines) => [...savedLines.filter((s) => s.id !== id), line]);
      return current.filter((item) => item.id !== id);
    });
  }, []);

  const moveToCart = useCallback((id: string) => {
    setSaved((current) => {
      const line = current.find((item) => item.id === id);
      if (line) {
        setCart((cartLines) => {
          const existing = cartLines.find((item) => item.id === id);
          return existing
            ? cartLines.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + line.quantity } : item,
              )
            : [...cartLines, line];
        });
      }
      return current.filter((item) => item.id !== id);
    });
    setCartOpen(true);
  }, []);

  const removeSaved = useCallback((id: string) => {
    setSaved((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setCouponCode(null);
    setGiftWrap(false);
    setGiftMessage("");
  }, []);

  const toggleWishlist = useCallback(
    (slug: string) => {
      setWishlist((current) => {
        const exists = current.includes(slug);
        const next = exists ? current.filter((item) => item !== slug) : [slug, ...current];
        track(exists ? "wishlist_remove" : "wishlist_add", { slug });
        const product = productBySlug(slug);
        pushToast(
          exists
            ? `${product?.name ?? "Piece"} removed from your wishlist.`
            : `${product?.name ?? "Piece"} saved to your wishlist.`,
          exists ? undefined : { href: "/wishlist", linkLabel: "View wishlist" },
        );
        void fetch("/api/wishlist", {
          method: exists ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, productSlug: slug }),
        }).catch(() => undefined);
        return next;
      });
    },
    [pushToast, sessionId, track],
  );

  const isWishlisted = useCallback((slug: string) => wishlist.includes(slug), [wishlist]);

  const markViewed = useCallback(
    (slug: string) => {
      setRecentlyViewed((current) => [slug, ...current.filter((item) => item !== slug)].slice(0, 12));
      track("product_view", { slug });
    },
    [track],
  );

  const applyCoupon = useCallback((code: string) => {
    const coupon = findCoupon(code);
    if (!coupon) {
      return { ok: false, message: "That code is not recognised." };
    }
    setCouponCode(coupon.code);
    return { ok: true, message: coupon.description };
  }, []);

  const clearCoupon = useCallback(() => setCouponCode(null), []);

  const totals = useMemo(
    () =>
      calculateTotals({
        lines: priceLines(cart),
        shippingMethodId,
        couponCode,
        giftWrap,
      }),
    [cart, shippingMethodId, couponCode, giftWrap],
  );

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      window.localStorage.setItem("veranne.currency", code);
    } catch {
      /* ignore */
    }
  }, []);

  const format = useCallback((centsUsd: number) => formatFromUsd(centsUsd, currency), [currency]);

  const cartCount = useMemo(() => cart.reduce((sum, line) => sum + line.quantity, 0), [cart]);

  useEffect(() => {
    const bodyOpen = cartOpen || searchOpen || Boolean(quickViewSlug);
    document.body.style.overflow = bodyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, searchOpen, quickViewSlug]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCartOpen(false);
        setSearchOpen(false);
        setQuickViewSlug(null);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value: StoreState = {
    ready,
    sessionId,
    cart,
    saved,
    wishlist,
    recentlyViewed,
    couponCode,
    giftWrap,
    giftMessage,
    shippingMethodId,
    currency,
    setCurrency,
    format,
    totals,
    cartCount,
    toasts,
    ui: { cartOpen, searchOpen, conciergeOpen, quickViewSlug },
    addToCart,
    setQuantity,
    removeLine,
    saveForLater,
    moveToCart,
    removeSaved,
    clearCart,
    toggleWishlist,
    isWishlisted,
    markViewed,
    applyCoupon,
    clearCoupon,
    setGiftWrap,
    setGiftMessage,
    setShippingMethodId,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    openSearch: () => setSearchOpen(true),
    closeSearch: () => setSearchOpen(false),
    openConcierge: () => setConciergeOpen(true),
    closeConcierge: () => setConciergeOpen(false),
    setQuickView: setQuickViewSlug,
    track,
    pushToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreState {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
