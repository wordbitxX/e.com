"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { productBySlug } from "@/lib/catalog";
import {
  GIFT_WRAP_CENTS,
  PAYMENT_METHODS,
  SHIPPING_METHODS,
  deliveryEstimate,
} from "@/lib/commerce";
import { useStore } from "./store-provider";

const STEPS = ["Cart", "Information", "Shipping", "Delivery", "Payment", "Review"] as const;
type StepIndex = 0 | 1 | 2 | 3 | 4 | 5;

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Pakistan",
  "Australia",
  "Canada",
  "Germany",
  "France",
  "Portugal",
  "Japan",
];

type Form = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

const EMPTY: Form = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  region: "",
  postalCode: "",
  country: "United States",
};

export function CheckoutFlow() {
  const store = useStore();
  const { format: formatPrice } = store;
  const router = useRouter();
  const [step, setStep] = useState<StepIndex>(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [payment, setPayment] = useState<string>("card");
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [couponNote, setCouponNote] = useState("");

  const totals = store.totals;
  const lines = useMemo(
    () =>
      store.cart
        .map((line) => ({ line, product: productBySlug(line.slug) }))
        .filter((entry): entry is { line: (typeof store.cart)[number]; product: NonNullable<ReturnType<typeof productBySlug>> } =>
          Boolean(entry.product),
        ),
    [store.cart],
  );

  const set = (key: keyof Form) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  function validateInformation(): boolean {
    const next: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) next.email = "Enter a valid email address.";
    if (form.firstName.trim().length < 2) next.firstName = "First name is required.";
    if (form.lastName.trim().length < 2) next.lastName = "Last name is required.";
    if (form.phone && !/^[+()\-\s\d]{6,20}$/.test(form.phone)) next.phone = "Enter a valid phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateShipping(): boolean {
    const next: Record<string, string> = {};
    if (form.addressLine1.trim().length < 3) next.addressLine1 = "Street address is required.";
    if (form.city.trim().length < 2) next.city = "City is required.";
    if (form.postalCode.trim().length < 3) next.postalCode = "Postal code is required.";
    if (form.country.trim().length < 2) next.country = "Country is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function advance(target: StepIndex) {
    if (target > 1 && !validateInformation()) {
      setStep(1);
      return;
    }
    if (target > 2 && !validateShipping()) {
      setStep(2);
      return;
    }
    store.track("checkout_step", { step: STEPS[target] });
    setStep(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function placeOrder() {
    setSubmitting(true);
    setServerError("");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          shippingMethodId: store.shippingMethodId,
          paymentMethodId: payment,
          couponCode: store.couponCode,
          giftWrap: store.giftWrap,
          giftMessage: store.giftMessage,
          sessionId: store.sessionId,
          lines: store.cart.map((line) => ({
            slug: line.slug,
            quantity: line.quantity,
            colorId: line.colorId,
            size: line.size,
          })),
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { errors?: Record<string, string>; error?: string };
        if (data.errors) {
          setErrors(data.errors);
          setServerError("Please correct the highlighted fields.");
          setStep(1);
        } else {
          setServerError(data.error ?? "We could not place that order.");
        }
        return;
      }

      const data = (await response.json()) as { orderNumber: string; totalCents: number };
      store.track("purchase", { orderNumber: data.orderNumber, value: data.totalCents });
      store.clearCart();
      router.push(`/order/${data.orderNumber}`);
    } catch {
      setServerError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (lines.length === 0 && step < 5) {
    return (
      <div className="shell py-24 text-center">
        <p className="eyebrow">Checkout</p>
        <h1 className="mt-5 font-serif text-5xl">Your cart is empty</h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
          Add a piece to begin. The concierge can narrow the catalog in a sentence if you would
          rather not browse.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/shop" className="btn btn-ink">
            Browse the shop
          </Link>
          <button type="button" onClick={store.openConcierge} className="btn btn-outline">
            Ask the Style Concierge
          </button>
        </div>
      </div>
    );
  }

  const field = (
    key: keyof Form,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <div>
      <label htmlFor={`checkout-${key}`} className="eyebrow">
        {label}
      </label>
      <input
        id={`checkout-${key}`}
        value={form[key]}
        onChange={set(key)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `checkout-${key}-error` : undefined}
        className={`field mt-2 ${errors[key] ? "border-accent" : ""}`}
        {...props}
      />
      {errors[key] ? (
        <p id={`checkout-${key}-error`} role="alert" className="mt-1.5 text-xs text-accent">
          {errors[key]}
        </p>
      ) : null}
    </div>
  );

  return (
    <div className="shell grid gap-14 py-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
      <div>
        <ol className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-5 text-[10px] uppercase tracking-[0.18em]">
          {STEPS.map((label, index) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => (index < step ? advance(index as StepIndex) : undefined)}
                disabled={index > step}
                aria-current={index === step ? "step" : undefined}
                className={`transition ${
                  index === step
                    ? "text-ink"
                    : index < step
                      ? "text-ink-muted hover:text-ink"
                      : "text-line"
                } disabled:cursor-default`}
              >
                {String(index + 1).padStart(2, "0")} {label}
              </button>
            </li>
          ))}
        </ol>

        {serverError ? (
          <p role="alert" className="mt-6 border border-accent bg-cream px-4 py-3 text-sm text-accent">
            {serverError}
          </p>
        ) : null}

        {step === 0 ? (
          <section className="pt-10" aria-label="Cart review">
            <h2 className="font-serif text-3xl">Review your cart</h2>
            <ul className="mt-8">
              {lines.map(({ line, product }) => (
                <li key={line.id} className="flex gap-5 border-b border-line-soft py-5">
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-cream">
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="font-serif text-xl">{product.name}</p>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                          {[
                            product.colors.find((color) => color.id === line.colorId)?.name,
                            line.size !== "One size" ? line.size : null,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>
                      <p>{formatPrice(product.priceCents * line.quantity)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          onClick={() => store.setQuantity(line.id, line.quantity - 1)}
                          className="grid h-8 w-8 place-items-center"
                          aria-label={`Decrease ${product.name} quantity`}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => store.setQuantity(line.id, line.quantity + 1)}
                          className="grid h-8 w-8 place-items-center"
                          aria-label={`Increase ${product.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => store.removeLine(line.id)}
                        className="text-[10px] uppercase tracking-[0.16em] text-ink-muted hover:text-accent"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 border border-line p-6">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={store.giftWrap}
                  onChange={(event) => store.setGiftWrap(event.target.checked)}
                  className="mt-1 h-3.5 w-3.5 accent-[#1a1815]"
                />
                <span>
                  <span className="text-sm">
                    Atelier gift wrapping — {formatPrice(GIFT_WRAP_CENTS)}
                  </span>
                  <span className="mt-1 block text-xs text-ink-soft">
                    Rigid ivory box, champagne ribbon, handwritten card. Prices removed from the
                    packing note.
                  </span>
                </span>
              </label>
              {store.giftWrap ? (
                <div className="mt-5">
                  <label htmlFor="gift-message" className="eyebrow">
                    Gift message
                  </label>
                  <textarea
                    id="gift-message"
                    value={store.giftMessage}
                    onChange={(event) => store.setGiftMessage(event.target.value.slice(0, 300))}
                    rows={3}
                    placeholder="Written by hand in the atelier."
                    className="field-boxed mt-2"
                  />
                  <p className="mt-1 text-xs text-ink-muted">
                    {300 - store.giftMessage.length} characters remaining
                  </p>
                </div>
              ) : null}
            </div>

            <button type="button" onClick={() => advance(1)} className="btn btn-ink mt-8 w-full sm:w-auto">
              Continue to information
            </button>
          </section>
        ) : null}

        {step === 1 ? (
          <section className="pt-10" aria-label="Customer information">
            <h2 className="font-serif text-3xl">Customer information</h2>
            <p className="mt-3 text-sm text-ink-soft">
              Already have an account?{" "}
              <Link href="/account" className="link-underline text-ink">
                View the account concept
              </Link>{" "}
              — authentication is architected but not enabled in this demonstration.
            </p>
            <div className="mt-8 grid gap-7 sm:grid-cols-2">
              <div className="sm:col-span-2">
                {field("email", "Email", { type: "email", autoComplete: "email", placeholder: "you@email.com" })}
              </div>
              {field("firstName", "First name", { autoComplete: "given-name" })}
              {field("lastName", "Last name", { autoComplete: "family-name" })}
              <div className="sm:col-span-2">
                {field("phone", "Phone (optional)", { autoComplete: "tel", placeholder: "For delivery updates" })}
              </div>
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <button type="button" onClick={() => setStep(0)} className="btn btn-quiet">
                Back to cart
              </button>
              <button type="button" onClick={() => advance(2)} className="btn btn-ink">
                Continue to shipping
              </button>
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="pt-10" aria-label="Shipping address">
            <h2 className="font-serif text-3xl">Shipping address</h2>
            <div className="mt-8 grid gap-7 sm:grid-cols-2">
              <div className="sm:col-span-2">
                {field("addressLine1", "Street address", { autoComplete: "address-line1" })}
              </div>
              <div className="sm:col-span-2">
                {field("addressLine2", "Apartment, suite (optional)", { autoComplete: "address-line2" })}
              </div>
              {field("city", "City", { autoComplete: "address-level2" })}
              {field("region", "State / region (optional)", { autoComplete: "address-level1" })}
              {field("postalCode", "Postal code", { autoComplete: "postal-code" })}
              <div>
                <label htmlFor="checkout-country" className="eyebrow">
                  Country
                </label>
                <select
                  id="checkout-country"
                  value={form.country}
                  onChange={set("country")}
                  className="field mt-2"
                >
                  {COUNTRIES.map((country) => (
                    <option key={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <button type="button" onClick={() => setStep(1)} className="btn btn-quiet">
                Back
              </button>
              <button type="button" onClick={() => advance(3)} className="btn btn-ink">
                Continue to delivery
              </button>
            </div>
          </section>
        ) : null}

        {step === 3 ? (
          <section className="pt-10" aria-label="Delivery method">
            <h2 className="font-serif text-3xl">Delivery method</h2>
            <ul className="mt-8 space-y-3">
              {SHIPPING_METHODS.map((method) => {
                const free = method.freeOverCents && totals.subtotalCents - totals.discountCents >= method.freeOverCents;
                return (
                  <li key={method.id}>
                    <label
                      className={`flex cursor-pointer items-start justify-between gap-5 border p-5 transition ${
                        store.shippingMethodId === method.id ? "border-ink" : "border-line hover:border-ink/40"
                      }`}
                    >
                      <span className="flex items-start gap-4">
                        <input
                          type="radio"
                          name="delivery"
                          checked={store.shippingMethodId === method.id}
                          onChange={() => store.setShippingMethodId(method.id)}
                          className="mt-1 h-3.5 w-3.5 accent-[#1a1815]"
                        />
                        <span>
                          <span className="block text-sm">{method.label}</span>
                          <span className="mt-1 block text-xs text-ink-soft">{method.detail}</span>
                          <span className="mt-1 block text-xs text-ink-muted">
                            Estimated {deliveryEstimate(method.id)}
                          </span>
                        </span>
                      </span>
                      <span className="whitespace-nowrap text-sm">
                        {free ? "Complimentary" : formatPrice(method.cents)}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <div className="mt-9 flex flex-wrap gap-4">
              <button type="button" onClick={() => setStep(2)} className="btn btn-quiet">
                Back
              </button>
              <button type="button" onClick={() => advance(4)} className="btn btn-ink">
                Continue to payment
              </button>
            </div>
          </section>
        ) : null}

        {step === 4 ? (
          <section className="pt-10" aria-label="Payment">
            <h2 className="font-serif text-3xl">Payment</h2>
            <p className="mt-4 border border-line bg-cream px-5 py-4 text-sm leading-relaxed text-ink-soft">
              This is a demonstration checkout. No card number is requested, transmitted or stored —
              the payment step simulates an authorisation and records a mock reference against the
              order.
            </p>
            <ul className="mt-8 space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <li key={method.id}>
                  <label
                    className={`flex cursor-pointer items-start gap-4 border p-5 transition ${
                      payment === method.id ? "border-ink" : "border-line hover:border-ink/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === method.id}
                      onChange={() => setPayment(method.id)}
                      className="mt-1 h-3.5 w-3.5 accent-[#1a1815]"
                    />
                    <span>
                      <span className="block text-sm">{method.label}</span>
                      <span className="mt-1 block text-xs text-ink-soft">{method.detail}</span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>

            {payment === "card" ? (
              <div className="mt-6 border border-dashed border-line p-6">
                <p className="eyebrow">Mock card interface</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-3">
                    <span className="block text-xs text-ink-muted">Card number</span>
                    <span className="mt-2 block border-b border-line py-2 text-sm text-ink-muted">
                      •••• •••• •••• 4242 (simulated)
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-ink-muted">Expiry</span>
                    <span className="mt-2 block border-b border-line py-2 text-sm text-ink-muted">
                      12 / 30
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-ink-muted">CVC</span>
                    <span className="mt-2 block border-b border-line py-2 text-sm text-ink-muted">
                      •••
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-ink-muted">Gateway</span>
                    <span className="mt-2 block border-b border-line py-2 text-sm text-ink-muted">
                      Ready for integration
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-9 flex flex-wrap gap-4">
              <button type="button" onClick={() => setStep(3)} className="btn btn-quiet">
                Back
              </button>
              <button type="button" onClick={() => advance(5)} className="btn btn-ink">
                Review order
              </button>
            </div>
          </section>
        ) : null}

        {step === 5 ? (
          <section className="pt-10" aria-label="Review and place order">
            <h2 className="font-serif text-3xl">Review</h2>
            <dl className="mt-8 space-y-5 text-sm">
              <div className="flex justify-between gap-6 border-b border-line-soft pb-4">
                <dt className="eyebrow">Contact</dt>
                <dd className="text-right text-ink-soft">
                  {form.email}
                  <br />
                  {form.firstName} {form.lastName}
                  {form.phone ? (
                    <>
                      <br />
                      {form.phone}
                    </>
                  ) : null}
                </dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-line-soft pb-4">
                <dt className="eyebrow">Ship to</dt>
                <dd className="text-right text-ink-soft">
                  {form.addressLine1}
                  {form.addressLine2 ? `, ${form.addressLine2}` : ""}
                  <br />
                  {form.city}
                  {form.region ? `, ${form.region}` : ""} {form.postalCode}
                  <br />
                  {form.country}
                </dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-line-soft pb-4">
                <dt className="eyebrow">Delivery</dt>
                <dd className="text-right text-ink-soft">
                  {SHIPPING_METHODS.find((m) => m.id === store.shippingMethodId)?.label}
                  <br />
                  {deliveryEstimate(store.shippingMethodId)}
                </dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-line-soft pb-4">
                <dt className="eyebrow">Payment</dt>
                <dd className="text-right text-ink-soft">
                  {PAYMENT_METHODS.find((m) => m.id === payment)?.label} · simulated
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={placeOrder}
              disabled={submitting}
              data-cursor="Continue"
              className="btn btn-ink mt-9 w-full"
            >
              {submitting ? "Placing your order…" : `Place order · ${formatPrice(totals.totalCents)}`}
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="mt-4 w-full text-center text-[11px] uppercase tracking-[0.18em] text-ink-soft link-underline"
            >
              Back to payment
            </button>
          </section>
        ) : null}
      </div>

      <aside className="lg:sticky lg:top-28 lg:h-fit">
        <div className="border border-line bg-cream p-6">
          <h2 className="font-serif text-2xl">Order summary</h2>
          <ul className="mt-6 space-y-4">
            {lines.map(({ line, product }) => (
              <li key={`summary-${line.id}`} className="flex gap-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-ivory">
                  <Image
                    src={product.images[0].url}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] text-ivory">
                    {line.quantity}
                  </span>
                </div>
                <div className="flex flex-1 justify-between gap-3">
                  <div>
                    <p className="font-serif text-base leading-tight">{product.name}</p>
                    <p className="text-[11px] text-ink-muted">
                      {product.colors.find((color) => color.id === line.colorId)?.name}
                    </p>
                  </div>
                  <p className="text-sm">{formatPrice(product.priceCents * line.quantity)}</p>
                </div>
              </li>
            ))}
          </ul>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              const result = store.applyCoupon(couponInput);
              setCouponNote(result.message);
              if (result.ok) setCouponInput("");
            }}
            className="mt-6 flex items-center gap-3 border-b border-line pb-2"
          >
            <label htmlFor="checkout-coupon" className="sr-only">
              Discount code
            </label>
            <input
              id="checkout-coupon"
              value={couponInput}
              onChange={(event) => setCouponInput(event.target.value)}
              placeholder="Discount code"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink-muted"
            />
            <button type="submit" className="text-[10px] uppercase tracking-[0.2em] hover:text-accent">
              Apply
            </button>
          </form>
          {couponNote ? <p className="mt-2 text-xs text-ink-soft">{couponNote}</p> : null}

          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Subtotal</dt>
              <dd>{formatPrice(totals.subtotalCents)}</dd>
            </div>
            {totals.discountCents > 0 ? (
              <div className="flex justify-between text-accent">
                <dt>Discount {store.couponCode ? `(${store.couponCode})` : ""}</dt>
                <dd>−{formatPrice(totals.discountCents)}</dd>
              </div>
            ) : null}
            {totals.giftWrapCents > 0 ? (
              <div className="flex justify-between">
                <dt className="text-ink-soft">Gift wrapping</dt>
                <dd>{formatPrice(totals.giftWrapCents)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between">
              <dt className="text-ink-soft">Shipping</dt>
              <dd>
                {totals.shippingCents === 0 ? "Complimentary" : formatPrice(totals.shippingCents)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 font-serif text-2xl">
              <dt>Total</dt>
              <dd>{formatPrice(totals.totalCents)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
            Duties and local sales tax are calculated at the destination and are not added here.
            Totals are recalculated on the server from catalog prices when the order is placed.
          </p>
        </div>
      </aside>
    </div>
  );
}
