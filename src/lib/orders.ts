import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { orderEvents, orderItems, orders } from "@/db/schema";

export type OrderRecord = {
  order: typeof orders.$inferSelect;
  items: (typeof orderItems.$inferSelect)[];
  events: (typeof orderEvents.$inferSelect)[];
};

export async function getOrderByNumber(orderNumber: string): Promise<OrderRecord | null> {
  const clean = orderNumber.trim().toUpperCase();
  if (!/^[A-Z0-9-]{4,32}$/.test(clean)) return null;

  try {
    const [order] = await db.select().from(orders).where(eq(orders.orderNumber, clean)).limit(1);
    if (!order) return null;

    const [items, events] = await Promise.all([
      db.select().from(orderItems).where(eq(orderItems.orderId, order.id)),
      db
        .select()
        .from(orderEvents)
        .where(eq(orderEvents.orderId, order.id))
        .orderBy(asc(orderEvents.position)),
    ]);

    return { order, items, events };
  } catch {
    return null;
  }
}
