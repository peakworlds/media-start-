import { NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
    woocommerce: { status: "unknown" },
    supabase: { status: "unknown" },
    lastSync: null,
  };

  // ---- Test WooCommerce connectivity ----
  try {
    // Dynamic import to avoid breaking if woocommerce client has env issues
    const { getProducts } = await import(
      "../../../lib/woocommerce"
    );
    const products = await getProducts(1);
    results.woocommerce = {
      status: "connected",
      productCount: products.length,
    };
  } catch (err: any) {
    results.woocommerce = {
      status: "error",
      message: err.message,
    };
  }

  // ---- Test Supabase connectivity ----
  try {
    const supabase = getSupabase();
    const { count, error } = await supabase
      .from("fulfilment_orders")
      .select("*", { count: "exact", head: true });

    if (error) {
      results.supabase = { status: "error", message: error.message };
    } else {
      results.supabase = {
        status: "connected",
        fulfilmentOrderCount: count ?? 0,
      };
    }
  } catch (err: any) {
    results.supabase = {
      status: "error",
      message: err.message,
    };
  }

  // ---- Last sync time ----
  try {
    const supabase = getSupabase();
    const { data } = await supabase
      .from("sync_log")
      .select("synced_at, duration_ms, orders_synced, products_synced, errors")
      .order("synced_at", { ascending: false })
      .limit(1)
      .single();

    if (data) {
      results.lastSync = data;
    }
  } catch {
    // sync_log table may not exist yet — that's fine
  }

  const allHealthy =
    results.woocommerce.status === "connected" &&
    results.supabase.status === "connected";

  return NextResponse.json(results, { status: allHealthy ? 200 : 503 });
}
