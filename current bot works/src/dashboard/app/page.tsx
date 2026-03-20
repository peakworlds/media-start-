import { KpiCards } from "../components/KpiCards";
import { OrderPipeline } from "../components/OrderPipeline";
import { InventoryTable } from "../components/InventoryTable";
import { SlaAlerts } from "../components/SlaAlerts";
import { CarrierMetrics } from "../components/CarrierMetrics";
import { TrendCharts } from "../components/TrendCharts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
  const syncTime = new Date().toLocaleString("en-AU", {
    timeZone: "Australia/Sydney",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="space-y-5 pb-10">
      <div className="flex items-center justify-end">
        <span className="text-[11px] font-data text-brand-muted tracking-wide">
          SYNCED {syncTime} AEST
        </span>
      </div>

      <section className="animate-fade-in" style={{ animationDelay: "0ms" }}>
        <KpiCards />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="xl:col-span-2">
          <OrderPipeline />
        </div>
        <div>
          <SlaAlerts />
        </div>
      </div>

      <section className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        <TrendCharts />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="xl:col-span-2">
          <InventoryTable />
        </div>
        <div>
          <CarrierMetrics />
        </div>
      </div>
    </div>
  );
}
