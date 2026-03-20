import { NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabase";
import type { CarrierMetrics } from "../../../types";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// GET /api/carriers
// Carrier tracking data comes from external carrier integrations, not from
// WooCommerce. We read from Supabase if populated; otherwise return an empty
// array with a descriptive note so the dashboard still renders.
// ---------------------------------------------------------------------------

export async function GET() {
  try {
    const supabase = getSupabase();

    const { data: rows, error } = await supabase
      .from("carrier_tracking")
      .select("*")
      .order("total_shipments", { ascending: false });

    if (error) {
      // Table may not exist yet or Supabase may be unreachable — return empty
      return NextResponse.json({
        carriers: [] as CarrierMetrics[],
        _source: "none",
        _note:
          "Carrier tracking data is populated by external carrier integrations. " +
          "No data available yet.",
      });
    }

    const carriers: CarrierMetrics[] = (rows ?? []).map((row: any) => ({
      carrier: row.carrier,
      onTimePercent: row.on_time_percent ?? 0,
      avgTransitDays: row.avg_transit_days ?? 0,
      damageRate: row.damage_rate ?? 0,
      deliveryAttemptRate: row.delivery_attempt_rate ?? 0,
      totalShipments: row.total_shipments ?? 0,
    }));

    return NextResponse.json({
      carriers,
      _source: carriers.length > 0 ? "supabase" : "none",
      _note:
        carriers.length === 0
          ? "Carrier tracking data is populated by external carrier integrations. No data available yet."
          : undefined,
    });
  } catch (err: any) {
    // Graceful degradation — return empty rather than 500
    return NextResponse.json({
      carriers: [] as CarrierMetrics[],
      _source: "none",
      _note: `Carrier data unavailable: ${err.message}`,
    });
  }
}
