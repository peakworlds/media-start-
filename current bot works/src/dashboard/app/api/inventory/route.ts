import { NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabase";
import {
  mapProductToSnapshot,
  calculateVelocity,
} from "../sync/woocommerce-mapper";
import type { SkuSnapshot } from "../../../types";

export const dynamic = "force-dynamic";

const STALE_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

// ---------------------------------------------------------------------------
// Try Supabase first
// ---------------------------------------------------------------------------

async function fetchFromSupabase(): Promise<{
  snapshots: SkuSnapshot[];
  stale: boolean;
} | null> {
  try {
    const supabase = getSupabase();

    const { data: rows, error } = await supabase
      .from("inventory_snapshots")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error || !rows || rows.length === 0) return null;

    const latestUpdate = rows.reduce((max: string, r: any) => {
      return r.updated_at && r.updated_at > max ? r.updated_at : max;
    }, "1970-01-01T00:00:00Z");

    const stale =
      Date.now() - new Date(latestUpdate).getTime() > STALE_THRESHOLD_MS;

    const snapshots: SkuSnapshot[] = rows.map((row: any) => ({
      sku: row.sku,
      productTitle: row.product_title,
      currentStock: row.current_stock ?? 0,
      stockChange: row.stock_change ?? 0,
      velocity7d: row.velocity_7d ?? 0,
      velocity14d: row.velocity_14d ?? 0,
      velocity30d: row.velocity_30d ?? 0,
      velocityTrend: row.velocity_trend ?? 0,
      daysOfStock: row.days_of_stock ?? 0,
      reorderPoint: row.reorder_point ?? 0,
      safetyStock: row.safety_stock ?? 0,
      supplierLeadTimeDays: row.supplier_lead_time_days ?? 0,
      stockValue: row.stock_value ?? 0,
      status: row.status ?? "healthy",
    }));

    return { snapshots, stale };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Fallback: build snapshots directly from WooCommerce
// ---------------------------------------------------------------------------

async function fetchFromWooCommerce(): Promise<SkuSnapshot[]> {
  const { getProducts, getRecentOrders } = await import(
    "../../../lib/woocommerce"
  );

  const [products, recentOrders] = await Promise.all([
    getProducts(100),
    getRecentOrders(30),
  ]);

  return products.map((product) => {
    const sku = product.sku || `WOO-${product.id}`;
    const velocity = {
      velocity7d: calculateVelocity(recentOrders, sku, 7),
      velocity14d: calculateVelocity(recentOrders, sku, 14),
      velocity30d: calculateVelocity(recentOrders, sku, 30),
    };
    return mapProductToSnapshot(product, velocity);
  });
}

// ---------------------------------------------------------------------------
// GET /api/inventory
// ---------------------------------------------------------------------------

export async function GET() {
  try {
    let snapshots: SkuSnapshot[];
    let source: string;

    // Attempt 1: Supabase
    const supabaseResult = await fetchFromSupabase();

    if (supabaseResult && !supabaseResult.stale) {
      snapshots = supabaseResult.snapshots;
      source = "supabase";
    } else {
      // Attempt 2: WooCommerce direct
      try {
        snapshots = await fetchFromWooCommerce();
        source = "woocommerce";
      } catch {
        // Fallback to stale Supabase data if available
        if (supabaseResult) {
          snapshots = supabaseResult.snapshots;
          source = "supabase_stale";
        } else {
          snapshots = [];
          source = "none";
        }
      }
    }

    const totalSkus = snapshots.length;
    const totalUnits = snapshots.reduce((sum, s) => sum + s.currentStock, 0);

    return NextResponse.json({ snapshots, totalSkus, totalUnits, _source: source });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
