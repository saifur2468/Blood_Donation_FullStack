"use client";

import React from "react";
import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
      <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto border border-red-100">
        <XCircle className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-extrabold text-slate-900">Payment Cancelled</h2>
      <p className="text-xs font-semibold text-slate-500">
        Your payment process was cancelled or failed. You can try making the payment again from your requests page.
      </p>
      <div className="pt-4">
        <Link
          href="/dashboard/patient/myrequest"
          className="inline-block w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold transition"
        >
          Back to My Requests
        </Link>
      </div>
    </div>
  );
}