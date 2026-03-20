"use client";

import { useEffect, useState } from "react";
import { fetchOrders, type OrdersResponse } from "../lib/api";
import type { OrderStage } from "../types";

const STAGES: { key: OrderStage; label: string; accentColor: string; bgColor: string }[] = [
  { key: "new", label: "New", accentColor: "#60a5fa", bgColor: "rgba(96, 165, 250, 0.08)" },
  { key: "processing", label: "Processing", accentColor: "#c9953c", bgColor: "rgba(201, 149, 60, 0.08)" },
  { key: "packed", label: "Packed", accentColor: "#a78bfa", bgColor: "rgba(167, 139, 250, 0.08)" },
  { key: "shipped", label: "Shipped", accentColor: "#34d399", bgColor: "rgba(52, 211, 153, 0.08)" },
  { key: "delivered", label: "Delivered", accentColor: "#10b981", bgColor: "rgba(16, 185, 129, 0.08)" },
  { key: "returned", label: "Returned", accentColor: "#f87171", bgColor: "rgba(248, 113, 113, 0.08)" },
];

export function OrderPipeline() {
  const [data, setData] = useState<OrdersResponse | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetchOrders();
        if (mounted) setData(res);
      } catch {}
    }
    load();
    const interval = setInterval(load, 60_000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const pipeline = data?.summary?.pipeline;
  const orders = data?.orders ?? [];
  const maxCount = pipeline ? Math.max(...Object.values(pipeline), 1) : 1;

  return (
    <div className="card-glass p-6 h-full">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-sm font-semibold text-white tracking-tight">Order Pipeline</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-brand-border to-transparent" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {STAGES.map((stage) => {
          const count = pipeline?.[stage.key] ?? 0;
          const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;
          const stageOrders = orders.filter((o) => o.stage === stage.key);
          const breached = stageOrders.some((o) => o.slaPercentUsed > 100);
          const atRisk = stageOrders.some((o) => o.slaPercentUsed > 75 && o.slaPercentUsed <= 100);

          return (
            <div
              key={stage.key}
              className="rounded-xl border border-brand-border p-4 flex flex-col items-center transition-all duration-200 hover:border-brand-border-glow group"
              style={{ background: stage.bgColor }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                {(breached || atRisk) && (
                  <span
                    className="h-1.5 w-1.5 rounded-full status-pulse"
                    style={{ backgroundColor: breached ? "#f87171" : "#fbbf24" }}
                  />
                )}
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-brand-muted">
                  {stage.label}
                </span>
              </div>
              <span className="text-2xl font-bold font-data text-white mb-3">{count}</span>
              <div className="w-full h-1 rounded-full bg-brand-base overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${barWidth}%`, backgroundColor: stage.accentColor }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
