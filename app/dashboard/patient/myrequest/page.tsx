"use client";

import React, { useEffect, useState } from "react";
import { Clock, MapPin, Phone, User, Droplet, Trash2, CreditCard, X, ShieldCheck } from "lucide-react";
import Swal from "sweetalert2";

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this blood request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
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

        Swal.fire("Deleted!", "Your blood request has been deleted.", "success");
        fetchMyRequests();
      } catch (err: any) {
        Swal.fire("Error!", err.message || "Failed to delete", "error");
      }
    }
  };

  // Open Payment Modal
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
            amount: 100, // Dynamic amount if needed
          }),
        });

        const result = await res.json();

        if (result.success && result.data?.paymentUrl) {
          window.location.href = result.data.paymentUrl;
        } else {
          throw new Error(result.message || "Failed to create payment session");
        }
      } else {
        alert("Selected payment method is coming soon!");
      }
    } catch (err: any) {
      alert(err.message || "Could not process payment");
    } finally {
      setActionLoadingId(null);
      setIsModalOpen(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-xs font-bold text-slate-500">Loading your requests...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {requests.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs font-semibold text-slate-500 shadow-sm">
          You haven't created any blood requests yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-extrabold text-sm border border-red-100 shadow-inner">
                    <Droplet className="w-5 h-5 fill-red-600 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">{req.hospitalName}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {req.hospitalAddress}, {req.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase ${
                    req.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                    req.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {req.status}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-extrabold border border-red-100">
                    {req.bloodGroup?.replace("_POSITIVE", "+").replace("_NEGATIVE", "-")} ({req.bagsNeeded} Bags)
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                  <p className="font-bold text-slate-700 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> Contact: {req.contactNumber}
                  </p>
                </div>
                <div className="space-y-1 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                  <p className="font-bold text-slate-700 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Needed By: {new Date(req.neededBy).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Donors Accepted Section with Safe Fallbacks */}
              {req.donations && req.donations.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
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
                        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60"
                      >
                        <div className="space-y-1 text-xs">
                          <p className="font-extrabold text-slate-900 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            {donorName}
                          </p>
                          <p className="text-slate-500 flex items-center gap-2 font-medium">
                            <Phone className="w-3 h-3 text-slate-400" /> {donorPhone} 
                            <span className="text-slate-300">|</span> 
                            <span>{donorEmail}</span>
                          </p>
                        </div>

                        <div>
                          {item.paymentStatus === "PAID" ? (
                            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg font-extrabold text-xs flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" /> Paid
                            </span>
                          ) : (
                            <button
                              onClick={() => openPaymentModal(item.id)}
                              disabled={actionLoadingId === item.id}
                              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white px-4 py-2 rounded-xl font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
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
                  className="px-3.5 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
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
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">Select Payment Method</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50/30 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="STRIPE" 
                    checked={paymentMethod === "STRIPE"} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <p className="font-extrabold text-slate-900">Stripe Checkout</p>
                    <p className="text-slate-500 text-[11px]">Pay securely with Credit / Debit Card via Stripe</p>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-extrabold">Recommended</span>
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer opacity-60">
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="BKASH" 
                    disabled
                    className="text-slate-400"
                  />
                  <div>
                    <p className="font-extrabold text-slate-800">bKash (Coming Soon)</p>
                    <p className="text-slate-400 text-[11px]">Direct mobile banking payment</p>
                  </div>
                </div>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleProceedPayment}
                disabled={actionLoadingId !== null}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold transition shadow-sm cursor-pointer disabled:opacity-50"
              >
                {actionLoadingId ? "Redirecting..." : "Proceed to Pay"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}