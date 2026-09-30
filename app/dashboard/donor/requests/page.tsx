"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Clock, MapPin, Phone, User, Droplet } from "lucide-react";

interface Patient {
  fullName: string;
  phoneNumber: string;
  email: string;
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
  patient: Patient;
}

export default function DonorRequestsPage() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

      const res = await fetch(`${baseUrl}/api/v1/blood-request/pending-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (result.success) {
        setRequests(result.data || []);
      } else {
        setError(result.message || "Failed to fetch blood requests");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong while fetching requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleAcceptRequest = async (requestId: string) => {
    setActionLoadingId(requestId);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("accessToken");
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

      const res = await fetch(`${baseUrl}/api/v1/blood-request/${requestId}/accept`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (!res.ok || result.success === false) {
        throw new Error(result.message || "Failed to accept blood request");
      }

      setMessage("Blood request accepted successfully!");
      // List ta fresh vabe abar fetch kore update kore dewa holo
      await fetchPendingRequests();
    } catch (err: any) {
      setError(err.message || "Something went wrong while accepting request");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-xs font-bold text-slate-500">Loading pending blood requests...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900">Pending Blood Requests</h2>
        <p className="text-xs font-semibold text-slate-500">Browse emergency blood requirements from patients and accept requests to help save lives.</p>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {message}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {requests.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs font-semibold text-slate-500">
          No pending blood requests available right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-red-200 transition">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-extrabold text-sm border border-red-100">
                    <Droplet className="w-5 h-5 fill-red-600 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">{req.hospitalName}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {req.hospitalAddress}, {req.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase ${
                    req.urgency === "CRITICAL" ? "bg-red-100 text-red-700" :
                    req.urgency === "URGENT" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {req.urgency}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-extrabold border border-red-100">
                    {req.bloodGroup?.replace("_POSITIVE", "+").replace("_NEGATIVE", "-")} ({req.bagsNeeded} Bags)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" /> Patient: {req.patient?.fullName || "N/A"}
                  </p>
                  <p className="text-slate-500 font-medium">Email: {req.patient?.email || "N/A"}</p>
                  <p className="text-slate-500 font-medium flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" /> Contact: {req.contactNumber || req.patient?.phoneNumber}
                  </p>
                </div>

                <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Needed By: {new Date(req.neededBy).toLocaleString()}
                  </p>
                  <p className="text-slate-500 font-medium">Status: <span className="text-amber-600 font-bold">{req.status}</span></p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handleAcceptRequest(req.id)}
                  disabled={actionLoadingId === req.id}
                  className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-xs font-extrabold hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
                >
                  {actionLoadingId === req.id ? "Accepting..." : "Accept Request"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}