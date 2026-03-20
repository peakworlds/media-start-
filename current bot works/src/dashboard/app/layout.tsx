import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peak Haven Operations Dashboard",
  description: "Real-time fulfilment operations dashboard for Peak Haven",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-brand-base text-brand-text antialiased">
        <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-base/90 backdrop-blur-xl">
          <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-brand-gold to-brand-gold-dim flex items-center justify-center">
                <span className="text-xs font-bold text-brand-base tracking-tight">PH</span>
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-semibold text-white tracking-tight">Peak Haven</h1>
                <span className="text-[10px] font-medium text-brand-muted uppercase tracking-widest">Operations</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-status-green/10 border border-status-green/20">
                <span className="h-1.5 w-1.5 rounded-full bg-status-green status-pulse" />
                <span className="text-[11px] font-medium text-status-green tracking-wide">LIVE</span>
              </div>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1600px] px-6 py-6">{children}</main>
      </body>
    </html>
  );
}
