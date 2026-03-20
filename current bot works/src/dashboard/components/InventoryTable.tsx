"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchInventory, type InventoryResponse } from "../lib/api";
import type { SkuSnapshot } from "../types";

type SortKey = keyof Pick<SkuSnapshot, "sku" | "productTitle" | "currentStock" | "velocity7d" | "daysOfStock">;

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  healthy: { label: "Healthy", className: "bg-status-green/10 text-status-green border-status-green/20" },
  warning: { label: "Warning", className: "bg-status-yellow/10 text-status-yellow border-status-yellow/20" },
  urgent: { label: "Urgent", className: "bg-status-red/10 text-status-red border-status-red/20" },
  out_of_stock: { label: "Out of Stock", className: "bg-status-red/15 text-status-red border-status-red/25 font-semibold" },
  dead_stock: { label: "Dead Stock", className: "bg-brand-muted/10 text-brand-muted border-brand-muted/20" },
};

export function InventoryTable() {
  const [data, setData] = useState<InventoryResponse | null>(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("daysOfStock");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetchInventory();
        if (mounted) setData(res);
      } catch {}
    }
    load();
    const interval = setInterval(load, 60_000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    let items = data.snapshots;
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (s) => s.sku.toLowerCase().includes(q) || s.productTitle.toLowerCase().includes(q)
      );
    }
    items = [...items].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string" && typeof bv === "string")
        return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      return sortAsc ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return items;
  }, [data, search, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  }

  const colHeader = (key: SortKey, label: string) => (
    <th
      className="px-3 py-3 text-left text-[10px] font-medium uppercase tracking-[0.12em] text-brand-muted cursor-pointer hover:text-brand-gold select-none transition-colors"
      onClick={() => toggleSort(key)}
    >
      <span className="flex items-center gap-1">
        {label}
        {sortKey === key && (
          <svg className={`h-3 w-3 transition-transform ${sortAsc ? "" : "rotate-180"}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        )}
      </span>
    </th>
  );

  return (
    <div className="card-glass p-6 h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-white tracking-tight">Inventory Levels</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-brand-border to-transparent" />
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-muted" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder="Search SKU or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg bg-brand-surface border border-brand-border pl-9 pr-3 py-2 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-gold/40 focus:ring-1 focus:ring-brand-gold/20 w-56 transition-all"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-border">
              {colHeader("sku", "SKU")}
              {colHeader("productTitle", "Product")}
              {colHeader("currentStock", "Stock")}
              {colHeader("velocity7d", "Velocity (7d)")}
              {colHeader("daysOfStock", "Days of Stock")}
              <th className="px-3 py-3 text-left text-[10px] font-medium uppercase tracking-[0.12em] text-brand-muted">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/50">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-10 text-center text-xs text-brand-muted">
                  {data ? "No items match your search" : "Loading inventory..."}
                </td>
              </tr>
            )}
            {filtered.map((s) => {
              const badge = STATUS_BADGE[s.status] ?? STATUS_BADGE.healthy;
              return (
                <tr key={s.sku} className="hover:bg-brand-card-hover/50 transition-colors">
                  <td className="px-3 py-3 font-data text-[11px] text-brand-gold">{s.sku}</td>
                  <td className="px-3 py-3 text-white text-xs max-w-[180px] truncate">{s.productTitle}</td>
                  <td className="px-3 py-3 font-data text-xs text-white font-medium">{s.currentStock.toLocaleString()}</td>
                  <td className="px-3 py-3 font-data text-xs text-white">{s.velocity7d.toFixed(1)}<span className="text-brand-muted">/d</span></td>
                  <td className="px-3 py-3">
                    <span className={`font-data text-xs font-medium ${
                      s.daysOfStock <= 7 ? "text-status-red" : s.daysOfStock <= 14 ? "text-status-yellow" : "text-white"
                    }`}>
                      {s.daysOfStock}d
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium ${badge.className}`}>
                      {badge.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
