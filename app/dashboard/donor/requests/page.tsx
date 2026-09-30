"use client";

import React, { useEffect, useState } from "react";
import { HeartPulse, MapPin, Phone, Calendar, CheckCircle2 } from "lucide-react";

export default function DonorRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const fetchBloodRequests = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:5000/api/v1/blood-request", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setRequests(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBloodRequests();
  }, []);

  const handleAcceptRequest = async (requestId: string) => {
    setActionLoading(requestId);
    setMessage("");
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`http://localhost:5000/api/v1/blood-request/accept/${requestId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to accept request");

      setMessage("Request accepted successfully! Patient can now proceed with payment.");
      fetchBloodRequests();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <div className="text-center py-12 text-xs font-bold text-slate-500">Loading patient requests...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Patient Blood Requests</h2>
          <p className="text-xs font-semibold text-slate-500">Accept emergency requests to help patients and unlock payments.</p>
        </div>
        {message && <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold">{message}</div>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs font-bold text-slate-500 col-span-2">
            No patient blood requests found.
          </div>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-extrabold flex items-center gap-1">
                    <HeartPulse className="w-3.5 h-3.5" /> {req.bloodGroup?.replace("_", " ")}
                  </span>
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-extrabold uppercase">
                    {req.urgency || "URGENT"}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900">{req.hospitalName}</h4>
                
                <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {req.hospitalAddress}, {req.city}
                </p>
                
                <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {req.contactNumber}
                </p>

                <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Needed By: {new Date(req.neededBy).toLocaleString()}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Bags: {req.bagsNeeded}</span>
                <button
                  onClick={() => handleAcceptRequest(req.id)}
                  disabled={actionLoading === req.id}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-extrabold hover:bg-red-700 transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {actionLoading === req.id ? "Accepting..." : "Accept Request"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}