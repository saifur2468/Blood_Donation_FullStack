"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="bg-stone-50 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">
        
        {/* Left Side: Text & Go Back Button */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          {/* <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5" />
            Error 404
          </div> */}

          <h1 className="text-4xl sm:text-6xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Ooops... <br />
            <span className="text-rose-600">Page not found</span>
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
            A massa, interdum pretium, ut sit est nec. Convallis fames proin lacus cras. Jekono karone page-ti khawa jacche na ba soriye fela hoyeche.
          </p>

          <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
            <Link
              href="/"
              className="px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm rounded-full shadow-md shadow-rose-600/20 transition-all duration-200 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back Home
            </Link>
          </div>
        </div>

        {/* Right Side: Illustration & 404 Badge */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
          <div className="absolute -top-8 text-center">
            {/* <span className="text-4xl sm:text-5xl font-black text-stone-300 tracking-wider">404</span> */}
            {/* <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-0.5">Page not found</p> */}
          </div>

          <div className="relative rounded-3xl overflow-hidden p-6 w-full max-w-md flex items-center justify-center mt-8">
            <img
              src="/img/Screenshot 2026-09-30 154919.png"
              alt="404 Illustration"
              className="w-full h-auto object-cover rounded-2xl shadow-lg border border-stone-100 opacity-90"
            />
          </div>
        </div>

      </div>
    </main>
  );
}