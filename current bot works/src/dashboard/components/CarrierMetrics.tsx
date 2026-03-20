"use client";

import { useEffect, useState } from "react";
import { fetchCarriers, type CarriersResponse } from "../lib/api";

function MetricBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="h-[3px] w-full rounded-full bg-brand-base overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${Math.min((value / max) * 100, 100)}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function CarrierMetrics() {
  const [data, setData] = useState<CarriersResponse | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetchCarriers();
        if (mounted) setData(res);
      } catch {}
    }
    load();
    const interval = setInterval(load, 60_000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const carriers = data?.carriers ?? [];

  return (
    <div className="card-glass p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-sm font-semibold text-white tracking-tight">Carrier Performance</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-brand-border to-transparent" />
      </div>
      {carriers.length === 0 ? (
        <p className="flex-1 flex items-center justify-center text-xs text-brand-muted">
          {data ? "No carrier data" : "Loading..."}
        </p>
      ) : (
        <div className="space-y-3 flex-1 overflow-y-auto">
          {carriers.map((c) => {
            const onTimeColor = c.onTimePercent >= 95 ? "#34d399" : c.onTimePercent >= 85 ? "#fbbf24" : "#f87171";
            const damageColor = c.damageRate <= 1 ? "#34d399" : c.damageRate <= 3 ? "#fbbf24" : "#f87171";

            return (
              <div
                key={c.carrier}
                className="rounded-xl border border-brand-border bg-brand-surface/50 p-4 transition-all duration-200 hover:border-brand-border-glow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-white">{c.carrier}</span>
                  <span className="text-[10px] font-data text-brand-muted">
                    {c.totalShipments.toLocaleString()} shipments
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                  <div>
                    <span className="text-brand-muted text-[10px] uppercase tracking-wider">On-time</span>
                    <p className="font-data font-semibold mt-0.5" style={{ color: onTimeColor }}>
                      {c.onTimePercent}%
                    </p>
                    <MetricBar value={c.onTimePercent} max={100} color={onTimeColor} />
                  </div>
                  <div>
                    <span className="text-brand-muted text-[10px] uppercase tracking-wider">Avg Transit</span>
                    <p className="font-data font-semibold text-white mt-0.5">{c.avgTransitDays}d</p>
                  </div>
                  <div>
                    <span className="text-brand-muted text-[10px] uppercase tracking-wider">Damage</span>
                    <p className="font-data font-semibold mt-0.5" style={{ color: damageColor }}>
                      {c.damageRate}%
                    </p>
                    <MetricBar value={c.damageRate} max={5} color={damageColor} />
                  </div>
                  <div>
                    <span className="text-brand-muted text-[10px] uppercase tracking-wider">Volume</span>
                    <p className="font-data font-semibold text-white mt-0.5">{c.totalShipments.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
