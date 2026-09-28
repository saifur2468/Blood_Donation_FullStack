"use client"; // এটি ফাইলের একদম উপরে থাকতে হবে

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // চাইলে কনসোলে এরর লগ করে দেখতে পারেন
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mb-4 font-bold shadow-sm">
        ⚠️
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Something went wrong!</h2>
      <p className="text-slate-600 max-w-md mb-6 text-sm">
        An unexpected error has occurred. We apologize for the inconvenience. Please try again.
      </p>
      <div className="flex gap-4">
        <button
          onClick={
            // পেজটি আবার রেন্ডার করার চেষ্টা করবে
            () => reset()
          }
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-all shadow-sm"
        >
          Try again
        </button>
        <a
          href="/"
          className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl text-sm transition-all"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}