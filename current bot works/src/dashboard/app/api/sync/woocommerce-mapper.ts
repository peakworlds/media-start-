import type {
  WooOrder,
  WooProduct,
  WooLineItem,
  FulfilmentOrder,
  SkuSnapshot,
  OrderStage,
} from "../../../types";

// ---------------------------------------------------------------------------
// Status mapping: WooCommerce order status → pipeline stage
// ---------------------------------------------------------------------------

const STATUS_MAP: Record<string, OrderStage> = {
  pending: "new",
  processing: "processing",
  "on-hold": "processing",
  completed: "shipped",
  cancelled: "returned",
  refunded: "returned",
  failed: "returned",
};

export function mapWooStatusToStage(wooStatus: string): OrderStage {
  return STATUS_MAP[wooStatus] ?? "new";
}

// ---------------------------------------------------------------------------
// Order → FulfilmentOrder row
// ---------------------------------------------------------------------------

const SLA_HOURS = 24;

export function mapOrderToFulfilment(order: WooOrder): FulfilmentOrder {
  const createdAt = new Date(order.date_created);
  const slaDeadline = new Date(createdAt.getTime() + SLA_HOURS * 3_600_000);
  const now = new Date();
  const elapsedMs = now.getTime() - createdAt.getTime();
  const slaMs = SLA_HOURS * 3_600_000;
  const slaPercentUsed = Math.round((elapsedMs / slaMs) * 100);

  const stage = mapWooStatusToStage(order.status);
  const itemCount = order.line_items.reduce(
    (sum: number, li: WooLineItem) => sum + li.quantity,
    0
  );

  const customerName =
    order.billing
      ? `${order.billing.city ?? ""}, ${order.billing.country ?? ""}`.trim().replace(/^,\s*/, "")
      : "";

  return {
    orderId: order.id,
    orderNumber: parseInt(order.number, 10) || order.id,
    stage,
    createdAt,
    stageEnteredAt: createdAt, // best approximation without stage-change history
    slaDeadline,
    slaPercentUsed: Math.max(0, slaPercentUsed),
    totalValue: parseFloat(order.total) || 0,
    itemCount,
    channel: "woocommerce_dtc",
    carrier: null,
    trackingNumber: null,
    customer: customerName,
  };
}

// ---------------------------------------------------------------------------
// Velocity helpers
// ---------------------------------------------------------------------------

/**
 * Calculate average daily units sold for a given SKU over a rolling window.
 */
export function calculateVelocity(
  orders: WooOrder[],
  sku: string,
  days: number
): number {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  let unitsSold = 0;
  for (const order of orders) {
    if (new Date(order.date_created) < cutoff) continue;
    // Only count orders that represent real sales
    if (
      order.status === "cancelled" ||
      order.status === "refunded" ||
      order.status === "failed"
    )
      continue;

    for (const li of order.line_items) {
      if (li.sku === sku) {
        unitsSold += li.quantity;
      }
    }
  }

  return days > 0 ? Math.round((unitsSold / days) * 100) / 100 : 0;
}

// ---------------------------------------------------------------------------
// Stock status classification
// ---------------------------------------------------------------------------

export function classifyStockStatus(
  stock: number,
  velocity7d: number,
  reorderPoint: number
): SkuSnapshot["status"] {
  if (stock <= 0) return "out_of_stock";
  if (velocity7d === 0 && stock > 0) return "dead_stock";
  if (stock <= reorderPoint * 0.5) return "urgent";
  if (stock <= reorderPoint) return "warning";
  return "healthy";
}

// ---------------------------------------------------------------------------
// Product → SkuSnapshot
// ---------------------------------------------------------------------------

export interface VelocityData {
  velocity7d: number;
  velocity14d: number;
  velocity30d: number;
}

export function mapProductToSnapshot(
  product: WooProduct,
  velocity: VelocityData
): SkuSnapshot {
  const currentStock = product.stock_quantity ?? 0;
  const price = parseFloat(product.price) || 0;

  // Supplier lead time defaults (could be overridden per-SKU later)
  const supplierLeadTimeDays = 14;

  // Safety stock = lead-time demand * 1.5
  const safetyStock = Math.ceil(velocity.velocity7d * supplierLeadTimeDays * 1.5);

  // Reorder point = (daily velocity * lead time) + safety stock
  const reorderPoint = Math.ceil(velocity.velocity7d * supplierLeadTimeDays) + safetyStock;

  // Days of stock
  const daysOfStock =
    velocity.velocity7d > 0
      ? Math.round(currentStock / velocity.velocity7d)
      : currentStock > 0
        ? 999
        : 0;

  // Velocity trend: % change between 7d and 14d velocity
  const velocityTrend =
    velocity.velocity14d > 0
      ? Math.round(((velocity.velocity7d - velocity.velocity14d) / velocity.velocity14d) * 100)
      : 0;

  const status = classifyStockStatus(currentStock, velocity.velocity7d, reorderPoint);

  return {
    sku: product.sku || `WOO-${product.id}`,
    productTitle: product.name,
    currentStock,
    stockChange: 0, // calculated by comparing to previous snapshot during sync
    velocity7d: velocity.velocity7d,
    velocity14d: velocity.velocity14d,
    velocity30d: velocity.velocity30d,
    velocityTrend,
    daysOfStock,
    reorderPoint,
    safetyStock,
    supplierLeadTimeDays,
    stockValue: Math.round(currentStock * price * 100) / 100,
    status,
  };
}
