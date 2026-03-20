export default function DashboardLoading() {
  return (
    <div className="space-y-5 pb-10">
      <div className="flex items-center justify-end">
        <div className="h-3 w-44 rounded bg-brand-border animate-pulse" />
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="card-glass h-[100px] animate-pulse">
            <div className="p-5 space-y-3">
              <div className="h-2.5 w-16 rounded bg-brand-border" />
              <div className="h-6 w-12 rounded bg-brand-border" />
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 card-glass h-64 animate-pulse" />
        <div className="card-glass h-64 animate-pulse" />
      </div>

      <section className="card-glass h-56 animate-pulse" />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 card-glass h-64 animate-pulse" />
        <div className="card-glass h-64 animate-pulse" />
      </div>
    </div>
  );
}
