'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCcw, Home, ShieldAlert } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Application Error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 font-sans selection:bg-rose-500 selection:text-white">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-200/80 p-8 sm:p-10 text-center relative overflow-hidden">
        
        {/* Top Decorative Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-red-500 to-amber-500"></div>

        {/* Error Icon */}
        <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-rose-100 group transform hover:scale-105 transition-transform duration-300">
          <ShieldAlert className="w-10 h-10 animate-pulse" />
        </div>

        {/* Heading */}
        <div className="space-y-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-extrabold uppercase tracking-widest border border-rose-200">
            System Error
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Kichu ekta vul hoyeche!
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-medium">
            Amader system-e ekta unexpected error ghoteche. Doya kore abar chesta korun ba home page-e fire jaan.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl transition-all shadow-md shadow-rose-600/20 active:scale-95"
          >
            <RefreshCcw className="w-4 h-4" />
            Abar Try Korun
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            Home-e Jaan
          </Link>
        </div>

        {/* Optional Error Digest for debugging */}
        {error?.digest && (
          <div className="mt-8 pt-6 border-t border-stone-100">
            <p className="text-[11px] text-stone-400 font-mono bg-stone-50 py-1.5 px-3 rounded-xl border border-stone-200/60 inline-block">
              Error ID: <span className="text-stone-600 font-bold">{error.digest}</span>
            </p>
          </div>
        )}

      </div>
    </main>
  );
}