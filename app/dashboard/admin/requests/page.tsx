"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTint,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaCheck,
  FaTimes,
  FaClock,
} from "react-icons/fa";

type BloodRequest = {
  id: string;
  patient?: {
    id?: string;
    fullName?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
  patientId?: string;
  bloodGroup: string;
  units?: number;
  quantity?: number;
  location?: string;
  hospitalName?: string;
  urgency?: string;
  status?: string;
  requestDate?: string;
  createdAt?: string;
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "https://l2-a6-blood-donation.vercel.app";

      const res = await axios.get(
        `${backendUrl}/api/v1/blood-request/pending-requests`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      setRequests(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching blood requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    try {
      setUpdatingId(id);

      const token =
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "https://l2-a6-blood-donation.vercel.app";

      await axios.patch(
        `${backendUrl}/api/v1/admin/requests/${id}/status`,
        { status },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      await fetchRequests();
    } catch (error) {
      console.error("Failed to update request status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
      case "ACCEPTED":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "REJECTED":
      case "CANCELLED":
        return "bg-rose-50 text-rose-600 border-rose-100";
      case "PENDING":
      default:
        return "bg-amber-50 text-amber-600 border-amber-100";
    }
  };

  const getUrgencyStyle = (urgency?: string) => {
    switch (urgency?.toUpperCase()) {
      case "URGENT":
      case "EMERGENCY":
        return "bg-rose-50 text-rose-600 border-rose-100";
      case "HIGH":
        return "bg-orange-50 text-orange-600 border-orange-100";
      default:
        return "bg-blue-50 text-blue-600 border-blue-100";
    }
  };

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Blood Requests
          </h1>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Review and manage incoming blood donation requests efficiently.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold border border-rose-100">
            Total Requests: {requests.length}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex h-48 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm text-slate-400 font-semibold text-xs gap-2">
          <FaClock className="animate-spin text-rose-500 text-sm" />
          Loading blood requests securely...
        </div>
      ) : requests.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100 text-rose-500">
            <FaTint className="text-xl" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">
            No Blood Requests Found
          </h3>
          <p className="mt-1 text-xs text-slate-400 font-medium max-w-xs">
            There are currently no active blood donation requests requiring attention.
          </p>
        </div>
      ) : (
        /* Requests Table Card */
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  <th className="p-4 px-6">Patient</th>
                  <th className="p-4 px-6">Blood Group</th>
                  <th className="p-4 px-6">Location</th>
                  <th className="p-4 px-6">Urgency</th>
                  <th className="p-4 px-6">Status</th>
                  <th className="p-4 px-6 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                {requests.map((request) => {
                  const patientName =
                    request.patient?.fullName ||
                    request.patient?.name ||
                    "Unknown Patient";

                  const requestId = request.id;

                  return (
                    <tr
                      key={requestId}
                      className="transition hover:bg-slate-50/60"
                    >
                      {/* Patient */}
                      <td className="p-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 border border-slate-200/60">
                            <FaUser className="text-xs" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">
                              {patientName}
                            </p>
                            {request.patient?.email && (
                              <p className="mt-0.5 text-xs text-slate-400 font-medium">
                                {request.patient.email}
                              </p>
                            )}
                            {request.patient?.phoneNumber && (
                              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                                <FaPhone className="text-[9px]" />
                                {request.patient.phoneNumber}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Blood Group */}
                      <td className="p-4 px-6">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500 border border-rose-100">
                            <FaTint className="text-xs" />
                          </div>
                          <div>
                            <span className="font-extrabold text-slate-800 text-sm">
                              {request.bloodGroup || "N/A"}
                            </span>
                            {(request.units || request.quantity) && (
                              <p className="text-[11px] text-slate-400 font-medium">
                                {request.units || request.quantity} unit(s)
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="p-4 px-6">
                        <div className="flex items-start gap-2 text-xs text-slate-600">
                          <FaMapMarkerAlt className="text-slate-400 mt-0.5 shrink-0" />
                          <div>
                            {request.hospitalName && (
                              <p className="font-bold text-slate-700">
                                {request.hospitalName}
                              </p>
                            )}
                            <p className="text-slate-400 font-medium">
                              {request.location || "Location not provided"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Urgency */}
                      <td className="p-4 px-6">
                        <span
                          className={`inline-block rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border ${getUrgencyStyle(
                            request.urgency
                          )}`}
                        >
                          {request.urgency || "NORMAL"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-4 px-6">
                        <span
                          className={`inline-block rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(
                            request.status
                          )}`}
                        >
                          {request.status || "PENDING"}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="p-4 px-6 text-right">
                        {request.status?.toUpperCase() === "PENDING" ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                handleStatusChange(requestId, "APPROVED")
                              }
                              disabled={updatingId === requestId}
                              className="flex items-center gap-1 rounded-xl bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm"
                            >
                              <FaCheck className="text-[10px]" />
                              {updatingId === requestId
                                ? "Updating..."
                                : "Approve"}
                            </button>

                            <button
                              onClick={() =>
                                handleStatusChange(requestId, "REJECTED")
                              }
                              disabled={updatingId === requestId}
                              className="flex items-center gap-1 rounded-xl bg-rose-500 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm"
                            >
                              <FaTimes className="text-[10px]" />
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 font-semibold">
                            No action required
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}