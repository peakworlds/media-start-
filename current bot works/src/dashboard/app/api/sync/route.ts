import { NextRequest, NextResponse } from "next/server";
import { getProducts, getRecentOrders } from "../../../lib/woocommerce";
import { getSupabase } from "../../../lib/supabase";
import {
  mapOrderToFulfilment,
  mapProductToSnapshot,
  calculateVelocity,
} from "./woocommerce-mapper";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // allow up to 60 s on Vercel

// ---------------------------------------------------------------------------
// GET /api/sync — Vercel Cron-compatible sync endpoint
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    // ---- Security: check CRON_SECRET when set ----
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
      const authHeader = request.headers.get("authorization");
      if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const supabase = getSupabase();
    const syncStart = Date.now();

    // ---- 1. Fetch WooCommerce data ----
    const [products, recentOrders] = await Promise.all([
      getProducts(100),
      getRecentOrders(30), // last 30 days of orders
    ]);

    // ---- 2. Map orders → fulfilment_orders rows ----
    const fulfilmentRows = recentOrders.map((order) => {
      const fo = mapOrderToFulfilment(order);
      return {
        order_id: fo.orderId,
        order_number: fo.orderNumber,
        stage: fo.stage,
        created_at: fo.createdAt.toISOString(),
        stage_entered_at: fo.stageEnteredAt.toISOString(),
        sla_deadline: fo.slaDeadline.toISOString(),
        sla_percent_used: fo.slaPercentUsed,
        total_value: fo.totalValue,
        item_count: fo.itemCount,
        channel: fo.channel,
        carrier: fo.carrier,
        tracking_number: fo.trackingNumber,
        customer: fo.customer,
        updated_at: new Date().toISOString(),
      };
    });

    // ---- 3. Map products → inventory_snapshots rows ----
    const inventoryRows = products.map((product) => {
      const sku = product.sku || `WOO-${product.id}`;
      const velocity = {
        velocity7d: calculateVelocity(recentOrders, sku, 7),
        velocity14d: calculateVelocity(recentOrders, sku, 14),
        velocity30d: calculateVelocity(recentOrders, sku, 30),
      };
      const snapshot = mapProductToSnapshot(product, velocity);
      return {
        sku: snapshot.sku,
        product_title: snapshot.productTitle,
        current_stock: snapshot.currentStock,
        stock_change: snapshot.stockChange,
        velocity_7d: snapshot.velocity7d,
        velocity_14d: snapshot.velocity14d,
        velocity_30d: snapshot.velocity30d,
        velocity_trend: snapshot.velocityTrend,
        days_of_stock: snapshot.daysOfStock,
        reorder_point: snapshot.reorderPoint,
        safety_stock: snapshot.safetyStock,
        supplier_lead_time_days: snapshot.supplierLeadTimeDays,
        stock_value: snapshot.stockValue,
        status: snapshot.status,
        updated_at: new Date().toISOString(),
      };
    });

    // ---- 4. Upsert into Supabase ----
    let ordersUpserted = 0;
    let inventoryUpserted = 0;
    const errors: string[] = [];

    if (fulfilmentRows.length > 0) {
      const { error: ordersErr } = await supabase
        .from("fulfilment_orders")
        .upsert(fulfilmentRows, { onConflict: "order_id" });

      if (ordersErr) {
        errors.push(`fulfilment_orders: ${ordersErr.message}`);
      } else {
        ordersUpserted = fulfilmentRows.length;
      }
    }

    if (inventoryRows.length > 0) {
      const { error: invErr } = await supabase
        .from("inventory_snapshots")
        .upsert(inventoryRows, { onConflict: "sku" });

      if (invErr) {
        errors.push(`inventory_snapshots: ${invErr.message}`);
      } else {
        inventoryUpserted = inventoryRows.length;
      }
    }

    // ---- 5. Record sync timestamp ----
    await supabase.from("sync_log").insert({
      synced_at: new Date().toISOString(),
      duration_ms: Date.now() - syncStart,
      orders_synced: ordersUpserted,
      products_synced: inventoryUpserted,
      errors: errors.length > 0 ? errors.join("; ") : null,
    });

    return NextResponse.json({
      ok: true,
      durationMs: Date.now() - syncStart,
      products: { fetched: products.length, upserted: inventoryUpserted },
      orders: { fetched: recentOrders.length, upserted: ordersUpserted },
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message ?? "Sync failed" },
      { status: 500 }
    );
  }
}
