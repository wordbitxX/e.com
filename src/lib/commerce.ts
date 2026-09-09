import { productBySlug, type Product } from "./catalog";

export const GIFT_WRAP_CENTS = 1200;
export const FREE_SHIPPING_THRESHOLD_CENTS = 25000;

export type ShippingMethod = {
  id: string;
  label: string;
  detail: string;
  cents: number;
  freeOverCents?: number;
  etaDays: [number, number];
};

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "standard",
    label: "Standard delivery",
    detail: "4–7 business days · complimentary above $250",
    cents: 1200,
    freeOverCents: FREE_SHIPPING_THRESHOLD_CENTS,
    etaDays: [4, 7],
  },
  {
    id: "express",
    label: "Express delivery",
    detail: "2–3 business days · tracked and signed",
    cents: 1800,
    etaDays: [2, 3],
  },
  {
    id: "courier",
    label: "Atelier courier",
    detail: "Next business day · selected cities",
    cents: 3200,
    etaDays: [1, 1],
  },
];

export const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Card",
    detail: "Visa, Mastercard, Amex — mock interface, no card data is collected",
  },
  { id: "wallet", label: "Digital wallet", detail: "Apple Pay, Google Pay — simulated approval" },
  { id: "cod", label: "Cash on delivery", detail: "Available in selected regions · pay the courier" },
] as const;

export type Coupon = {
  code: string;
  description: string;
  kind: "percent" | "fixed" | "shipping";
  value: number;
  minSubtotalCents?: number;
};

export const COUPONS: Coupon[] = [
  {
    code: "ATELIER10",
    description: "10% off your order",
    kind: "percent",
    value: 10,
  },
  {
    code: "FIRSTLIGHT",
    description: "$25 off orders above $150",
    kind: "fixed",
    value: 2500,
    minSubtotalCents: 15000,
  },
  {
    code: "WRAPPED",
    description: "Complimentary atelier gift wrapping",
    kind: "shipping",
    value: 0,
  },
];

export function findCoupon(code: string): Coupon | undefined {
  return COUPONS.find((coupon) => coupon.code === code.trim().toUpperCase());
}

export type CartLineInput = {
  slug: string;
  quantity: number;
  colorId?: string;
  size?: string;
};

export type PricedLine = CartLineInput & {
  product: Product;
  unitPriceCents: number;
  lineTotalCents: number;
  colorName?: string;
};

export function priceLines(lines: CartLineInput[]): PricedLine[] {
  const priced: PricedLine[] = [];
  for (const line of lines) {
    const product = productBySlug(line.slug);
    if (!product) continue;
    const quantity = Math.max(1, Math.min(10, Math.floor(line.quantity || 1)));
    const colorName = product.colors.find((color) => color.id === line.colorId)?.name;
    priced.push({
      ...line,
      quantity,
      product,
      colorName,
      unitPriceCents: product.priceCents,
      lineTotalCents: product.priceCents * quantity,
    });
  }
  return priced;
}

export type OrderTotals = {
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  giftWrapCents: number;
  taxCents: number;
  totalCents: number;
  couponCode?: string;
  couponMessage?: string;
  freeShippingRemainingCents: number;
};

export function calculateTotals(input: {
  lines: PricedLine[];
  shippingMethodId?: string;
  couponCode?: string | null;
  giftWrap?: boolean;
}): OrderTotals {
  const subtotalCents = input.lines.reduce((sum, line) => sum + line.lineTotalCents, 0);
  const method =
    SHIPPING_METHODS.find((item) => item.id === input.shippingMethodId) ?? SHIPPING_METHODS[0];

  let discountCents = 0;
  let couponMessage: string | undefined;
  let giftWrapCents = input.giftWrap ? GIFT_WRAP_CENTS : 0;
  const coupon = input.couponCode ? findCoupon(input.couponCode) : undefined;

  if (coupon) {
    if (coupon.minSubtotalCents && subtotalCents < coupon.minSubtotalCents) {
      couponMessage = `${coupon.code} applies to orders above $${coupon.minSubtotalCents / 100}.`;
    } else if (coupon.kind === "percent") {
      discountCents = Math.round((subtotalCents * coupon.value) / 100);
      couponMessage = coupon.description;
    } else if (coupon.kind === "fixed") {
      discountCents = Math.min(coupon.value, subtotalCents);
      couponMessage = coupon.description;
    } else if (coupon.kind === "shipping") {
      giftWrapCents = 0;
      couponMessage = coupon.description;
    }
  }

  const netSubtotal = Math.max(0, subtotalCents - discountCents);
  const shippingCents =
    subtotalCents === 0
      ? 0
      : method.freeOverCents && netSubtotal >= method.freeOverCents
        ? 0
        : method.cents;

  // Sales tax is calculated by destination at fulfilment; nothing is invented here.
  const taxCents = 0;
  const totalCents = netSubtotal + shippingCents + giftWrapCents + taxCents;

  return {
    subtotalCents,
    discountCents,
    shippingCents,
    giftWrapCents,
    taxCents,
    totalCents,
    couponCode: coupon?.code,
    couponMessage,
    freeShippingRemainingCents: Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - netSubtotal),
  };
}

export function deliveryEstimate(methodId: string, from = new Date()): string {
  const method = SHIPPING_METHODS.find((item) => item.id === methodId) ?? SHIPPING_METHODS[0];
  const start = new Date(from);
  start.setDate(start.getDate() + method.etaDays[0]);
  const end = new Date(from);
  end.setDate(end.getDate() + method.etaDays[1]);
  const fmt = (date: Date) =>
    new Intl.DateTimeFormat("en-US", { weekday: "short", day: "numeric", month: "short" }).format(
      date,
    );
  return method.etaDays[0] === method.etaDays[1] ? fmt(start) : `${fmt(start)} – ${fmt(end)}`;
}

export const ORDER_STAGES = [
  { stage: "placed", label: "Order placed", note: "We have your order and payment intent." },
  { stage: "confirmed", label: "Confirmed", note: "Reserved from atelier stock." },
  { stage: "packed", label: "Packed", note: "Wrapped in tissue and sealed with the atelier mark." },
  { stage: "shipped", label: "Shipped", note: "Handed to the carrier with tracking." },
  { stage: "out_for_delivery", label: "Out for delivery", note: "With the courier in your city." },
  { stage: "delivered", label: "Delivered", note: "Signed for at the delivery address." },
] as const;

export type CheckoutPayload = {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region?: string;
  postalCode: string;
  country: string;
  shippingMethodId: string;
  paymentMethodId: string;
  couponCode?: string | null;
  giftWrap?: boolean;
  giftMessage?: string;
  lines: CartLineInput[];
  sessionId?: string;
};

export function validateCheckout(payload: Partial<CheckoutPayload>): Record<string, string> {
  const errors: Record<string, string> = {};
  const required: [keyof CheckoutPayload, string][] = [
    ["firstName", "First name is required."],
    ["lastName", "Last name is required."],
    ["addressLine1", "Street address is required."],
    ["city", "City is required."],
    ["postalCode", "Postal code is required."],
    ["country", "Country is required."],
  ];

  for (const [field, message] of required) {
    const value = payload[field];
    if (typeof value !== "string" || value.trim().length < 2) errors[field] = message;
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Enter a valid email address.";

  if (payload.phone && !/^[+()\-\s\d]{6,20}$/.test(payload.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!Array.isArray(payload.lines) || payload.lines.length === 0) {
    errors.lines = "Your cart is empty.";
  }

  if (!SHIPPING_METHODS.some((method) => method.id === payload.shippingMethodId)) {
    errors.shippingMethodId = "Choose a delivery method.";
  }

  if (!PAYMENT_METHODS.some((method) => method.id === payload.paymentMethodId)) {
    errors.paymentMethodId = "Choose a payment method.";
  }

  return errors;
}
