"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { fetchOrders, type OrdersResponse } from "../lib/api";

interface DayPoint {
  date: string;
  orders: number;
  avgDispatchHours: number;
  returnRate: number;
  slaCompliance: number;
}

function buildTrendData(data: OrdersResponse | null): DayPoint[] {
  if (!data || !data.orders.length) return [];

  const now = new Date();
  const points: DayPoint[] = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);

    const dayOrders = data.orders.filter(
      (o) => new Date(o.createdAt).toISOString().slice(0, 10) === dateStr
    );

    const shipped = dayOrders.filter(
      (o) => o.stage === "shipped" || o.stage === "delivered"
    );
    const avgDispatch =
      shipped.length > 0
        ? shipped.reduce((sum, o) => {
            return sum + (new Date(o.stageEnteredAt).getTime() - new Date(o.createdAt).getTime()) / 3_600_000;
          }, 0) / shipped.length
        : 0;

    const fulfilled = dayOrders.filter(
      (o) => o.stage === "delivered" || o.stage === "returned"
    );
    const returned = dayOrders.filter((o) => o.stage === "returned");
    const returnRate = fulfilled.length > 0 ? (returned.length / fulfilled.length) * 100 : 0;

    const slaOk = shipped.filter((o) => o.slaPercentUsed <= 100).length;
    const slaPct = shipped.length > 0 ? (slaOk / shipped.length) * 100 : 100;

    points.push({
      date: dateStr.slice(5),
      orders: dayOrders.length,
      avgDispatchHours: Math.round(avgDispatch * 10) / 10,
      returnRate: Math.round(returnRate * 10) / 10,
      slaCompliance: Math.round(slaPct),
    });
  }

  return points;
}

const tooltipStyle = {
  backgroundColor: "#141720",
  border: "1px solid #1f2233",
  borderRadius: "8px",
  fontSize: "11px",
  fontFamily: '"JetBrains Mono", monospace',
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
};

const gridStroke = "#1f2233";
const axisStyle = { fill: "#4b5263", fontSize: 10, fontFamily: '"JetBrains Mono", monospace' };

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-glass p-5">
      <h3 className="text-[10px] font-medium uppercase tracking-[0.15em] text-brand-muted mb-4">{title}</h3>
      <div className="h-44">{children}</div>
    </div>
  );
}

export function TrendCharts() {
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

  const trend = buildTrendData(data);
  const margin = { top: 5, right: 10, left: -10, bottom: 5 };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChartCard title="Orders / Day (30d)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trend} margin={margin}>
            <defs>
              <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="orders" stroke="#60a5fa" strokeWidth={2} fill="url(#ordersGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Avg Dispatch Time (30d)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trend} margin={margin}>
            <defs>
              <linearGradient id="dispatchGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c9953c" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#c9953c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} unit="h" />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="avgDispatchHours" stroke="#c9953c" strokeWidth={2} fill="url(#dispatchGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Return Rate (30d)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trend} margin={margin}>
            <defs>
              <linearGradient id="returnGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f87171" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="returnRate" stroke="#f87171" strokeWidth={2} fill="url(#returnGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="SLA Compliance (30d)">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trend} margin={margin}>
            <defs>
              <linearGradient id="slaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="slaCompliance" stroke="#34d399" strokeWidth={2} fill="url(#slaGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
