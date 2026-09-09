import { NextResponse } from "next/server";
import { db } from "@/db";
import { orderEvents, orderItems, orders } from "@/db/schema";
import {
  calculateTotals,
  deliveryEstimate,
  ORDER_STAGES,
  priceLines,
  SHIPPING_METHODS,
  validateCheckout,
  type CheckoutPayload,
} from "@/lib/commerce";
import { orderNumber as makeOrderNumber } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: Partial<CheckoutPayload>;
  try {
    payload = (await request.json()) as Partial<CheckoutPayload>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const errors = validateCheckout(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // Prices are always recomputed server-side from the catalog — the client
  // total is never trusted.
  const lines = priceLines(payload.lines ?? []);
  if (lines.length === 0) {
    return NextResponse.json({ errors: { lines: "Your cart is empty." } }, { status: 422 });
  }

  const totals = calculateTotals({
    lines,
    shippingMethodId: payload.shippingMethodId,
    couponCode: payload.couponCode ?? null,
    giftWrap: Boolean(payload.giftWrap),
  });

  const method =
    SHIPPING_METHODS.find((item) => item.id === payload.shippingMethodId) ?? SHIPPING_METHODS[0];
  const number = makeOrderNumber();
  const estimate = deliveryEstimate(method.id);

  try {
    const [order] = await db
      .insert(orders)
      .values({
        orderNumber: number,
        email: payload.email!.trim().toLowerCase(),
        firstName: payload.firstName!.trim(),
        lastName: payload.lastName!.trim(),
        phone: payload.phone?.trim() || null,
        addressLine1: payload.addressLine1!.trim(),
        addressLine2: payload.addressLine2?.trim() || null,
        city: payload.city!.trim(),
        region: payload.region?.trim() || null,
        postalCode: payload.postalCode!.trim(),
        country: payload.country!.trim(),
        shippingMethod: method.id,
        shippingLabel: method.label,
        shippingCents: totals.shippingCents,
        paymentMethod: payload.paymentMethodId ?? "card",
        // Mock authorisation reference only — no card data is collected or stored.
        paymentReference: `MOCK-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
        subtotalCents: totals.subtotalCents,
        discountCents: totals.discountCents,
        taxCents: totals.taxCents,
        totalCents: totals.totalCents,
        couponCode: totals.couponCode ?? null,
        giftWrap: Boolean(payload.giftWrap),
        giftMessage: payload.giftMessage?.slice(0, 400) || null,
        status: "confirmed",
        estimatedDelivery: estimate,
        sessionId: payload.sessionId?.slice(0, 64) ?? null,
      })
      .returning();

    await db.insert(orderItems).values(
      lines.map((line) => ({
        orderId: order.id,
        productSlug: line.product.slug,
        productName: line.product.name,
        variantLabel: line.colorName ?? null,
        sizeLabel: line.size ?? null,
        sku: line.product.sku,
        imageUrl: line.product.images[0].url,
        unitPriceCents: line.unitPriceCents,
        quantity: line.quantity,
        lineTotalCents: line.lineTotalCents,
      })),
    );

    const now = new Date();
    await db.insert(orderEvents).values(
      ORDER_STAGES.map((stage, index) => ({
        orderId: order.id,
        stage: stage.stage,
        label: stage.label,
        note: stage.note,
        completed: index <= 1,
        occurredAt: index <= 1 ? now : null,
        position: index,
      })),
    );

    return NextResponse.json({
      orderNumber: order.orderNumber,
      totalCents: order.totalCents,
      estimatedDelivery: estimate,
    });
  } catch {
    return NextResponse.json(
      { error: "We could not place that order. Please try again." },
      { status: 500 },
    );
  }
}
