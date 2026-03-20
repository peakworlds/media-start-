import { NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabase";
import {
  mapOrderToFulfilment,
  mapWooStatusToStage,
} from "../sync/woocommerce-mapper";
import type {
  FulfilmentOrder,
  FulfilmentSummary,
  OrderStage,
} from "../../../types";

export const dynamic = "force-dynamic";

const STALE_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildSummary(orders: FulfilmentOrder[]): FulfilmentSummary {
  const stages: OrderStage[] = [
    "new",
    "processing",
    "packed",
    "shipped",
    "delivered",
    "returned",
  ];
  const pipeline = {} as Record<OrderStage, number>;
  for (const s of stages) {
    pipeline[s] = orders.filter((o) => o.stage === s).length;
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const ordersToday = orders.filter(
    (o) => new Date(o.createdAt).getTime() >= todayStart.getTime()
  ).length;

  const ordersShipped = orders.filter(
    (o) => o.stage === "shipped" || o.stage === "delivered"
  ).length;

  const ordersPending = orders.filter(
    (o) => o.stage === "new" || o.stage === "processing" || o.stage === "packed"
  ).length;

  // Average dispatch time
  const shippedOrders = orders.filter(
    (o) => o.stage === "shipped" || o.stage === "delivered"
  );
  const avgDispatchTimeHours =
    shippedOrders.length > 0
      ? shippedOrders.reduce((sum, o) => {
          const created = new Date(o.createdAt).getTime();
          const stageEntered = new Date(o.stageEnteredAt).getTime();
          return sum + (stageEntered - created) / 3_600_000;
        }, 0) / shippedOrders.length
      : 0;

  // SLA compliance
  const completedOrders = shippedOrders;
  const slaCompliant = completedOrders.filter(
    (o) => o.slaPercentUsed <= 100
  ).length;
  const slaCompliancePercent =
    completedOrders.length > 0
      ? Math.round((slaCompliant / completedOrders.length) * 100)
      : 100;

  const slaBreaches = orders.filter((o) => o.slaPercentUsed > 100);
  const slaAtRisk = orders.filter(
    (o) => o.slaPercentUsed > 75 && o.slaPercentUsed <= 100
  );

  // Return rate
  const returnedCount = orders.filter((o) => o.stage === "returned").length;
  const totalFulfilled = orders.filter(
    (o) => o.stage === "delivered" || o.stage === "returned"
  ).length;
  const returnRate = totalFulfilled > 0 ? returnedCount / totalFulfilled : 0;

  return {
    ordersToday,
    ordersShipped,
    ordersPending,
    avgDispatchTimeHours: Math.round(avgDispatchTimeHours * 10) / 10,
    slaCompliancePercent,
    pipeline,
    carrierMetrics: [],
    slaBreaches,
    slaAtRisk,
    returnRate: Math.round(returnRate * 1000) / 10,
  };
}

// ---------------------------------------------------------------------------
// Try Supabase first, fallback to WooCommerce
// ---------------------------------------------------------------------------

async function fetchFromSupabase(): Promise<{
  orders: FulfilmentOrder[];
  stale: boolean;
} | null> {
  try {
    const supabase = getSupabase();

    const { data: rows, error } = await supabase
      .from("fulfilment_orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !rows || rows.length === 0) return null;

    // Check staleness: look at the most recent updated_at
    const latestUpdate = rows.reduce((max: string, r: any) => {
      return r.updated_at && r.updated_at > max ? r.updated_at : max;
    }, "1970-01-01T00:00:00Z");

    const stale =
      Date.now() - new Date(latestUpdate).getTime() > STALE_THRESHOLD_MS;

    const orders: FulfilmentOrder[] = rows.map((row: any) => ({
      orderId: row.order_id,
      orderNumber: row.order_number,
      stage: row.stage as OrderStage,
      createdAt: new Date(row.created_at),
      stageEnteredAt: new Date(row.stage_entered_at),
      slaDeadline: new Date(row.sla_deadline),
      slaPercentUsed: row.sla_percent_used ?? 0,
      totalValue: row.total_value ?? 0,
      itemCount: row.item_count ?? 0,
      channel: row.channel ?? "woocommerce_dtc",
      carrier: row.carrier ?? null,
      trackingNumber: row.tracking_number ?? null,
      customer: row.customer ?? "",
    }));

    return { orders, stale };
  } catch {
    return null;
  }
}

async function fetchFromWooCommerce(): Promise<FulfilmentOrder[]> {
  const { getRecentOrders } = await import(
    "../../../lib/woocommerce"
  );
  const wooOrders = await getRecentOrders(30);
  return wooOrders.map(mapOrderToFulfilment);
}

// ---------------------------------------------------------------------------
// GET /api/orders
// ---------------------------------------------------------------------------

export async function GET() {
  try {
    let orders: FulfilmentOrder[];
    let source: string;

    // Attempt 1: Supabase (fast, has historical data)
    const supabaseResult = await fetchFromSupabase();

    if (supabaseResult && !supabaseResult.stale) {
      orders = supabaseResult.orders;
      source = "supabase";
    } else {
      // Attempt 2: Direct from WooCommerce
      try {
        orders = await fetchFromWooCommerce();
        source = "woocommerce";
      } catch {
        // If WooCommerce also fails but we have stale Supabase data, use it
        if (supabaseResult) {
          orders = supabaseResult.orders;
          source = "supabase_stale";
        } else {
          // Nothing available
          orders = [];
          source = "none";
        }
      }
    }

    const summary = buildSummary(orders);

    return NextResponse.json({ orders, summary, _source: source });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
