"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DollarSign, ShieldCheck, CreditCard, ArrowLeft } from "lucide-react";

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.requestId;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:5000/api/v1/payment/initiate/${requestId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      // Jodi SSLCommerz ba gateway URL thake, redirect kore dibe
      if (data.success && data.data?.paymentUrl) {
        window.location.href = data.data.paymentUrl;
      } else {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mt-10">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-xs font-bold text-slate-500 mb-6 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <CreditCard className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-extrabold text-slate-900">Complete Payment</h2>
        <p className="text-xs font-semibold text-slate-400 mt-1">Since your donor has accepted the blood request, please finalize the payment.</p>
      </div>

      {success ? (
        <div className="p-4 bg-emerald-50 text-emerald-600 text-center rounded-xl text-xs font-bold border border-emerald-100">
          Payment completed successfully! Thank you.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>Request ID:</span>
              <span className="text-slate-900 truncate max-w-[180px]">{requestId}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>Service Charge:</span>
              <span className="text-slate-900">৳ 500 BDT</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl text-xs font-extrabold hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            {loading ? "Processing Payment..." : "Pay Now (৳ 500)"}
          </button>
        </div>
      )}
    </div>
  );
}