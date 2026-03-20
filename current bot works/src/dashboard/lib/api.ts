// ============================================================================
// Client-side fetch helpers for all dashboard API routes
// ============================================================================

import type {
  FulfilmentOrder,
  FulfilmentSummary,
  SkuSnapshot,
  CarrierMetrics,
} from "../types";

const BASE = "/api";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`API ${path} returned ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// --- Orders ---
export interface OrdersResponse {
  orders: FulfilmentOrder[];
  summary: FulfilmentSummary;
}

export function fetchOrders(): Promise<OrdersResponse> {
  return fetchJson<OrdersResponse>("/orders");
}

// --- Inventory ---
export interface InventoryResponse {
  snapshots: SkuSnapshot[];
  totalSkus: number;
  totalUnits: number;
}

export function fetchInventory(): Promise<InventoryResponse> {
  return fetchJson<InventoryResponse>("/inventory");
}

// --- Carriers ---
export interface CarriersResponse {
  carriers: CarrierMetrics[];
}

export function fetchCarriers(): Promise<CarriersResponse> {
  return fetchJson<CarriersResponse>("/carriers");
}
