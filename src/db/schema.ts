import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * VERANNE commerce schema.
 *
 * Money is always stored in minor units (cents) as integers so that no
 * floating point rounding can ever affect an order total.
 *
 * The catalog itself (products / collections / journal) is authored in
 * `src/lib/catalog.ts` so the storefront can be statically rendered. These
 * tables cover the transactional + behavioural layer, and are shaped so a
 * future admin dashboard (orders, customers, discounts, reviews, analytics)
 * can be added without a migration rewrite.
 */

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    orderNumber: text("order_number").notNull(),
    email: text("email").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    phone: text("phone"),
    addressLine1: text("address_line1").notNull(),
    addressLine2: text("address_line2"),
    city: text("city").notNull(),
    region: text("region"),
    postalCode: text("postal_code").notNull(),
    country: text("country").notNull(),
    shippingMethod: text("shipping_method").notNull(),
    shippingLabel: text("shipping_label").notNull(),
    shippingCents: integer("shipping_cents").notNull().default(0),
    paymentMethod: text("payment_method").notNull(),
    paymentReference: text("payment_reference"),
    subtotalCents: integer("subtotal_cents").notNull(),
    discountCents: integer("discount_cents").notNull().default(0),
    taxCents: integer("tax_cents").notNull().default(0),
    totalCents: integer("total_cents").notNull(),
    currency: text("currency").notNull().default("USD"),
    couponCode: text("coupon_code"),
    giftWrap: boolean("gift_wrap").notNull().default(false),
    giftMessage: text("gift_message"),
    status: text("status").notNull().default("confirmed"),
    estimatedDelivery: text("estimated_delivery"),
    sessionId: text("session_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("orders_order_number_idx").on(table.orderNumber)],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").notNull(),
    productSlug: text("product_slug").notNull(),
    productName: text("product_name").notNull(),
    variantLabel: text("variant_label"),
    sizeLabel: text("size_label"),
    sku: text("sku").notNull(),
    imageUrl: text("image_url").notNull(),
    unitPriceCents: integer("unit_price_cents").notNull(),
    quantity: integer("quantity").notNull().default(1),
    lineTotalCents: integer("line_total_cents").notNull(),
  },
  (table) => [index("order_items_order_id_idx").on(table.orderId)],
);

export const orderEvents = pgTable(
  "order_events",
  {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").notNull(),
    stage: text("stage").notNull(),
    label: text("label").notNull(),
    note: text("note"),
    completed: boolean("completed").notNull().default(false),
    occurredAt: timestamp("occurred_at", { withTimezone: true }),
    position: integer("position").notNull().default(0),
  },
  (table) => [index("order_events_order_id_idx").on(table.orderId)],
);

export const wishlistItems = pgTable(
  "wishlist_items",
  {
    id: serial("id").primaryKey(),
    sessionId: text("session_id").notNull(),
    productSlug: text("product_slug").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("wishlist_session_product_idx").on(table.sessionId, table.productSlug)],
);

export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    productSlug: text("product_slug").notNull(),
    authorName: text("author_name").notNull(),
    location: text("location"),
    rating: integer("rating").notNull(),
    title: text("title"),
    body: text("body").notNull(),
    isDemo: boolean("is_demo").notNull().default(true),
    verified: boolean("verified").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("reviews_product_slug_idx").on(table.productSlug)],
);

export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: serial("id").primaryKey(),
    sessionId: text("session_id"),
    name: text("name").notNull(),
    path: text("path"),
    payload: jsonb("payload"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("analytics_events_name_idx").on(table.name)],
);

export const conciergeMessages = pgTable(
  "concierge_messages",
  {
    id: serial("id").primaryKey(),
    sessionId: text("session_id").notNull(),
    role: text("role").notNull(),
    content: text("content").notNull(),
    intent: text("intent"),
    productSlugs: jsonb("product_slugs"),
    engine: text("engine").notNull().default("rules"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("concierge_messages_session_idx").on(table.sessionId)],
);

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  projectType: text("project_type"),
  budget: text("budget"),
  message: text("message"),
  source: text("source").notNull().default("veranne-demo"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const subscribers = pgTable(
  "subscribers",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    source: text("source").notNull().default("footer"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("subscribers_email_idx").on(table.email)],
);

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type OrderEvent = typeof orderEvents.$inferSelect;
export type Review = typeof reviews.$inferSelect;
