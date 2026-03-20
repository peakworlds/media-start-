"use client";

import { useEffect, useState, useRef } from "react";
import { fetchOrders, type OrdersResponse } from "../lib/api";

interface KpiItem {
  label: string;
  value: string | number;
  numericValue?: number;
  suffix?: string;
  color: string;
  glowColor: string;
}

function AnimatedValue({ value, suffix = "" }: { value: string | number; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    if (typeof value !== "number" || typeof prevRef.current !== "number") {
      setDisplay(value);
      prevRef.current = value;
      return;
    }

    const start = prevRef.current as number;
    const end = value;
    const duration = 600;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    prevRef.current = value;
  }, [value]);

  return <>{typeof display === "number" ? display.toLocaleString() : display}{suffix}</>;
}

export function KpiCards() {
  const [data, setData] = useState<OrdersResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetchOrders();
        if (mounted) setData(res);
      } catch (err: any) {
        if (mounted) setError(err.message);
      }
    }
    load();
    const interval = setInterval(load, 60_000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  if (error) {
    return (
      <div className="card-glass p-4 border-status-red/30">
        <span className="text-sm text-status-red">Failed to load KPIs: {error}</span>
      </div>
    );
  }

  const summary = data?.summary;

  const kpis: KpiItem[] = [
    {
      label: "Orders Today",
      value: summary?.ordersToday ?? "--",
      color: "text-status-blue",
      glowColor: "shadow-status-blue/10",
    },
    {
      label: "Shipped",
      value: summary?.ordersShipped ?? "--",
      color: "text-status-green",
      glowColor: "shadow-status-green/10",
    },
    {
      label: "Pending",
      value: summary?.ordersPending ?? "--",
      color: "text-status-yellow",
      glowColor: "shadow-status-yellow/10",
    },
    {
      label: "Avg Dispatch",
      value: summary ? summary.avgDispatchTimeHours : "--",
      suffix: summary ? "h" : "",
      color: "text-brand-gold",
      glowColor: "shadow-brand-gold/10",
    },
    {
      label: "SLA Compliance",
      value: summary ? summary.slaCompliancePercent : "--",
      suffix: summary ? "%" : "",
      color: summary && summary.slaCompliancePercent < 90 ? "text-status-red" : "text-status-green",
      glowColor: summary && summary.slaCompliancePercent < 90 ? "shadow-status-red/10" : "shadow-status-green/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {kpis.map((kpi, i) => (
        <div
          key={kpi.label}
          className={`card-glass p-5 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg ${kpi.glowColor} group`}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-muted mb-3">
            {kpi.label}
          </p>
          <p className={`text-2xl font-bold font-data tracking-tight ${kpi.color} transition-colors`}>
            <AnimatedValue value={kpi.value} suffix={kpi.suffix} />
          </p>
        </div>
      ))}
    </div>
  );
}
