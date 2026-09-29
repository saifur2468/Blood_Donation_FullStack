'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100 text-center">
        {/* Error Icon / Illustration */}
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-inner">
          ⚠️
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Kichu ekta vul hoyeche!
        </h2>
        
        {/* Description */}
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          Amader system-e ekta unexpected error ghoteche. Doya kore abar chesta korun ba home page-e fire jaan.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-red-200"
          >
            Abar Try Korun
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-5 py-2.5 rounded-xl transition-colors text-center"
          >
            Home-e Jaan
          </Link>
        </div>

        {/* Optional Error Digest for debugging */}
        {error?.digest && (
          <p className="mt-6 text-xs text-slate-400 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}