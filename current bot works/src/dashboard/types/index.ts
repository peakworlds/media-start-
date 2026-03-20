// Re-export types needed by the dashboard

export type OrderStage = "new" | "processing" | "packed" | "shipped" | "delivered" | "returned";

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: string;
  stock_quantity: number | null;
  manage_stock: boolean;
  variations: number[];
}

export interface WooOrder {
  id: number;
  number: string;
  status: string;
  date_created: string;
  total: string;
  currency: string;
  line_items: WooLineItem[];
  billing: WooAddress;
  shipping: WooAddress;
  customer_id: number;
}

export interface WooLineItem {
  id: number;
  product_id: number;
  variation_id: number;
  sku: string;
  name: string;
  quantity: number;
  price: string;
}

export interface WooAddress {
  city: string;
  state: string;
  country: string;
}

export interface WooCustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface SkuSnapshot {
  sku: string;
  productTitle: string;
  currentStock: number;
  stockChange: number;
  velocity7d: number;
  velocity14d: number;
  velocity30d: number;
  velocityTrend: number;
  daysOfStock: number;
  reorderPoint: number;
  safetyStock: number;
  supplierLeadTimeDays: number;
  stockValue: number;
  status: "healthy" | "warning" | "urgent" | "out_of_stock" | "dead_stock";
}

export interface FulfilmentOrder {
  orderId: number;
  orderNumber: number;
  stage: OrderStage;
  createdAt: Date;
  stageEnteredAt: Date;
  slaDeadline: Date;
  slaPercentUsed: number;
  totalValue: number;
  itemCount: number;
  channel: "woocommerce_dtc" | "amazon" | "wholesale";
  carrier: string | null;
  trackingNumber: string | null;
  customer: string;
}

export interface CarrierMetrics {
  carrier: string;
  onTimePercent: number;
  avgTransitDays: number;
  damageRate: number;
  deliveryAttemptRate: number;
  totalShipments: number;
}

export interface FulfilmentSummary {
  ordersToday: number;
  ordersShipped: number;
  ordersPending: number;
  avgDispatchTimeHours: number;
  slaCompliancePercent: number;
  pipeline: Record<OrderStage, number>;
  carrierMetrics: CarrierMetrics[];
  slaBreaches: FulfilmentOrder[];
  slaAtRisk: FulfilmentOrder[];
  returnRate: number;
}
