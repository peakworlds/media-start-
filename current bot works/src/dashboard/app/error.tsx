"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Peak Haven Dashboard]", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="h-16 w-16 rounded-2xl bg-status-red/10 border border-status-red/20 flex items-center justify-center">
        <svg className="h-7 w-7 text-status-red" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-white">Something went wrong</h2>
        <p className="mt-2 max-w-md text-sm text-brand-slate">
          The dashboard encountered an unexpected error.
          {error.digest && (
            <span className="block mt-1 font-data text-[10px] text-brand-muted">
              {error.digest}
            </span>
          )}
        </p>
      </div>
      <button
        onClick={reset}
        className="rounded-lg bg-gradient-to-r from-brand-gold to-brand-gold-dim px-6 py-2.5 text-sm font-semibold text-brand-base transition-all hover:shadow-lg hover:shadow-brand-gold/20 active:scale-[0.98]"
      >
        Try again
      </button>
    </div>
  );
}
