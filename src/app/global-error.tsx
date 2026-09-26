"use client";

import React from "react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
          <p className="text-xs uppercase tracking-widest font-semibold text-cyan-400">
            Critical System Notice
          </p>

          <h1 className="text-2xl font-bold text-white">
            Application Recovery
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            A critical error prevented the primary layout from loading. Please click below to refresh the application state.
          </p>

          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors cursor-pointer"
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
