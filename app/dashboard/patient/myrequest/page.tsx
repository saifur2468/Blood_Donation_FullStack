"use client";

import React, { useEffect, useState } from "react";
import { Clock, MapPin, Phone, User, Droplet, Trash2, CreditCard, X, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner"; 

interface DonorInfo {
  id: string;
  paymentStatus?: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  donor?: {
    fullName: string;
    phoneNumber: string;
    email: string;
  };
  user?: {
    fullName: string;
    phoneNumber: string;
    email: string;
  };
}

interface BloodRequest {
  id: string;
  bloodGroup: string;
  bagsNeeded: number;
  hospitalName: string;
  hospitalAddress: string;
  city: string;
  urgency: string;
  status: string;
  contactNumber: string;
  neededBy: string;
  donations?: DonorInfo[];
}

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Payment Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("STRIPE");

  const fetchMyRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

      const res = await fetch(`${baseUrl}/api/v1/blood-request/my-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (result.success) {
        setRequests(result.data || []);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);


  const handleDelete = async (id: string) => {
    toast("Are you sure you want to delete this request?", {
      action: {
        label: "Yes, Delete",
        onClick: async () => {
          try {
            const token = localStorage.getItem("accessToken");
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

            const res = await fetch(`${baseUrl}/api/v1/blood-request/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
              throw new Error(data.message || "Failed to delete request");
            }

            toast.success("Blood request deleted successfully!");
            fetchMyRequests();
          } catch (err: any) {
            toast.error(err.message || "Failed to delete");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };


  const openPaymentModal = (donationId: string) => {
    setSelectedDonationId(donationId);
    setIsModalOpen(true);
  };

  // Handle Payment Submission based on selected gateway
  const handleProceedPayment = async () => {
    if (!selectedDonationId) return;

    try {
      setActionLoadingId(selectedDonationId);
      const token = localStorage.getItem("accessToken");
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

      if (paymentMethod === "STRIPE") {
        const res = await fetch(`${baseUrl}/api/v1/payment/create-checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            donationId: selectedDonationId,
            amount: 100,
          }),
        });

        const result = await res.json();

        if (result.success && result.data?.paymentUrl) {
          toast.success("Redirecting to Stripe checkout...");
          window.location.href = result.data.paymentUrl;
        } else {
          throw new Error(result.message || "Failed to create payment session");
        }
      } else {
        toast.info("Selected payment method is coming soon!");
      }
    } catch (err: any) {
      toast.error(err.message || "Could not process payment");
    } finally {
      setActionLoadingId(null);
      setIsModalOpen(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-xs font-bold text-slate-500 dark:text-slate-400">Loading your requests...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {requests.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 shadow-sm">
          You haven't created any blood requests yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center font-extrabold text-sm border border-red-100 dark:border-red-900 shadow-inner">
                    <Droplet className="w-5 h-5 fill-red-600 text-red-600 dark:fill-red-400 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">{req.hospitalName}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> {req.hospitalAddress}, {req.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase ${
                    req.status === "PENDING" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" :
                    req.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                  }`}>
                    {req.status}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-300 text-xs font-extrabold border border-red-100 dark:border-red-900">
                    {req.bloodGroup?.replace("_POSITIVE", "+").replace("_NEGATIVE", "-")} ({req.bagsNeeded} Bags)
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1 bg-slate-50/70 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> Contact: {req.contactNumber}
                  </p>
                </div>
                <div className="space-y-1 bg-slate-50/70 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> Needed By: {new Date(req.neededBy).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Donors Accepted Section with Safe Fallbacks */}
              {req.donations && req.donations.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-red-500" /> Accepted Donors
                  </h4>
                  {req.donations.map((item, idx) => {
                    const donorObj = item.donor || item.user || item;
                    const donorName = donorObj.fullName || item.fullName || "Anonymous Donor";
                    const donorPhone = donorObj.phoneNumber || item.phoneNumber || "N/A";
                    const donorEmail = donorObj.email || item.email || "N/A";

                    return (
                      <div
                        key={item.id || idx}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700"
                      >
                        <div className="space-y-1 text-xs">
                          <p className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                            {donorName}
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
                            <Phone className="w-3 h-3 text-slate-400 dark:text-slate-500" /> {donorPhone} 
                            <span className="text-slate-300 dark:text-slate-600">|</span> 
                            <span>{donorEmail}</span>
                          </p>
                        </div>

                        <div>
                          {item.paymentStatus === "PAID" ? (
                            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-lg font-extrabold text-xs flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" /> Paid
                            </span>
                          ) : (
                            <button
                              onClick={() => openPaymentModal(item.id)}
                              disabled={actionLoadingId === item.id}
                              className="bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500 disabled:bg-slate-400 dark:disabled:bg-slate-700 text-white px-4 py-2 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                            >
                              <CreditCard className="w-3.5 h-3.5" /> Pay Now
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => handleDelete(req.id)}
                  className="px-3.5 py-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/70 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Request
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Method Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 animate-in fade-in zoom-in-95 duration-200">

            {/* Header */}
            <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-600 px-6 py-6 text-white">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
                  <CreditCard className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-xl font-bold tracking-tight">
                    Complete Your Payment
                  </h3>
                  <p className="mt-1 text-sm text-emerald-50">
                    Choose your preferred payment method
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-6 p-6">

              {/* Secure Payment Info */}
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2zm10-11V7a4 4 0 00-8 0v2h8z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Secure Payment
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Your payment information is encrypted and secure.
                  </p>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <p className="mb-3 text-sm font-bold text-slate-800 dark:text-slate-100">
                  Payment Method
                </p>

                <div className="space-y-3">

                  {/* Stripe */}
                  <label
                    className={`relative flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all ${
                      paymentMethod === "STRIPE"
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-sm"
                        : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-700 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-4">

                      {/* Radio */}
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="STRIPE"
                        checked={paymentMethod === "STRIPE"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-5 w-5 border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-emerald-600 focus:ring-emerald-500"
                      />

                      {/* Icon */}
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-700 text-white shadow-sm">
                        <CreditCard className="h-5 w-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            Stripe Checkout
                          </p>

                          <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                            Recommended
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Credit / Debit Card
                        </p>
                      </div>
                    </div>

                    {paymentMethod === "STRIPE" && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12l4 4L19 6"
                          />
                        </svg>
                      </div>
                    )}
                  </label>

                  {/* bKash */}
                  <label className="flex cursor-not-allowed items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-4 opacity-60">
                    <div className="flex items-center gap-4">

                      <input
                        type="radio"
                        name="paymentMethod"
                        value="BKASH"
                        disabled
                        className="h-5 w-5 border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                      />

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-950/50 text-pink-500">
                        {/* <span className="text-sm font-black">bK</span> */}
                        <img src="/img/bkash-logo-png_seeklogo-273684.png" alt="" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            bKash
                          </p>

                          <span className="rounded-full bg-slate-200 dark:bg-slate-700 px-2 py-0.5 text-[9px] font-bold text-slate-500 dark:text-slate-300">
                            SOON
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                          Mobile banking payment
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Notice */}
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 text-emerald-600 dark:text-emerald-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path
                        strokeLinecap="round"
                        d="M12 11v5m0-8h.01"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      You will be redirected to Stripe
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                      Complete your payment securely on Stripe. After successful
                      payment, you will be redirected back to the application.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 px-6 py-5">

              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleProceedPayment}
                disabled={actionLoadingId !== null}
                className="flex items-center gap-2 rounded-xl bg-red-600 dark:hover:bg-red-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition 0hover:shadow-emerald-600/30 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {actionLoadingId !== null ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Redirecting...
                  </>
                ) : (
                  <>
                    Proceed to Pay
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




























