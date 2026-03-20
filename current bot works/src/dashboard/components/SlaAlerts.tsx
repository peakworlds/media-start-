"use client";

import { useEffect, useState } from "react";
import { fetchOrders, type OrdersResponse } from "../lib/api";
import type { FulfilmentOrder } from "../types";

function formatCountdown(deadlineMs: number): string {
  const diff = deadlineMs - Date.now();
  if (diff <= 0) return "BREACHED";
  const hours = Math.floor(diff / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

function AlertRow({ order, isBreach }: { order: FulfilmentOrder; isBreach: boolean }) {
  const [countdown, setCountdown] = useState(
    formatCountdown(new Date(order.slaDeadline).getTime())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(formatCountdown(new Date(order.slaDeadline).getTime()));
    }, 10_000);
    return () => clearInterval(interval);
  }, [order.slaDeadline]);

  const accent = isBreach ? "status-red" : "status-yellow";

  return (
    <div className={`rounded-lg border p-3 transition-all duration-200 hover:translate-x-1 ${
      isBreach
        ? "border-status-red/20 bg-status-red/[0.04]"
        : "border-status-yellow/20 bg-status-yellow/[0.04]"
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full bg-${accent} status-pulse`} />
          <span className="text-sm font-data font-medium text-white">
            #{order.orderNumber}
          </span>
          <span className="text-[10px] text-brand-muted uppercase tracking-wider">
            {order.stage}
          </span>
        </div>
        <span className={`text-xs font-data font-semibold text-${accent}`}>
          {countdown}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-brand-muted">
        <span>{order.customer}</span>
        <span className="font-data">{Math.round(order.slaPercentUsed)}%</span>
      </div>
      <div className="mt-2 h-[3px] w-full rounded-full bg-brand-base overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 bg-${accent}`}
          style={{ width: `${Math.min(order.slaPercentUsed, 100)}%` }}
        />
      </div>
    </div>
  );
}

export function SlaAlerts() {
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

  const breaches = data?.summary?.slaBreaches ?? [];
  const atRisk = data?.summary?.slaAtRisk ?? [];
  const totalAlerts = breaches.length + atRisk.length;

  return (
    <div className="card-glass p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-white tracking-tight">SLA Alerts</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-brand-border to-transparent" />
        </div>
        {totalAlerts > 0 && (
          <span className="flex items-center justify-center h-5 min-w-[20px] rounded-full bg-status-red/15 px-1.5 text-[10px] font-data font-bold text-status-red">
            {totalAlerts}
          </span>
        )}
      </div>

      {totalAlerts === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-brand-muted">
          <div className="h-10 w-10 rounded-full border border-status-green/20 bg-status-green/[0.06] flex items-center justify-center mb-3">
            <svg className="h-5 w-5 text-status-green" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <p className="text-xs">All orders within SLA</p>
        </div>
      ) : (
        <div className="space-y-2 flex-1 overflow-y-auto pr-1">
          {breaches.map((order) => (
            <AlertRow key={order.orderId} order={order} isBreach={true} />
          ))}
          {atRisk.map((order) => (
            <AlertRow key={order.orderId} order={order} isBreach={false} />
          ))}
        </div>
      )}
    </div>
  );
}
