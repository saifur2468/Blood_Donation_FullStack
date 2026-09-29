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

      const token = localStorage.getItem("accessToken");

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "http://localhost:5000";

      const res = await axios.get(
        `${backendUrl}/api/v1/admin/requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

      const token = localStorage.getItem("accessToken");

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "http://localhost:5000";

      await axios.patch(
        `${backendUrl}/api/v1/admin/requests/${id}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        return "bg-emerald-50 text-emerald-600";

      case "REJECTED":
      case "CANCELLED":
        return "bg-red-50 text-red-600";

      case "PENDING":
      default:
        return "bg-amber-50 text-amber-600";
    }
  };

  const getUrgencyStyle = (urgency?: string) => {
    switch (urgency?.toUpperCase()) {
      case "URGENT":
      case "EMERGENCY":
        return "bg-red-50 text-red-600";

      case "HIGH":
        return "bg-orange-50 text-orange-600";

      default:
        return "bg-blue-50 text-blue-600";
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Blood Requests
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage and review blood donation requests.
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
          <div className="flex flex-col items-center justify-center">
            <FaClock className="mb-3 animate-pulse text-2xl text-slate-400" />

            <p className="text-sm text-slate-500">
              Loading blood requests...
            </p>
          </div>
        </div>
      ) : requests.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50">
            <FaTint className="text-xl text-rose-500" />
          </div>

          <h3 className="text-lg font-semibold text-slate-700">
            No Blood Requests Found
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            There are currently no blood donation requests.
          </p>
        </div>
      ) : (
        /* Requests Table */
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="p-4 text-xs font-semibold uppercase text-slate-400">
                    Patient
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase text-slate-400">
                    Blood Group
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase text-slate-400">
                    Location
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase text-slate-400">
                    Urgency
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase text-slate-400">
                    Status
                  </th>

                  <th className="p-4 text-xs font-semibold uppercase text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {requests.map((request) => {
                  const patientName =
                    request.patient?.fullName ||
                    request.patient?.name ||
                    "Unknown Patient";

                  const requestId = request.id;

                  return (
                    <tr
                      key={requestId}
                      className="transition hover:bg-slate-50/50"
                    >
                      {/* Patient */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                            <FaUser />
                          </div>

                          <div>
                            <p className="font-semibold text-slate-700">
                              {patientName}
                            </p>

                            {request.patient?.email && (
                              <p className="mt-1 text-xs text-slate-400">
                                {request.patient.email}
                              </p>
                            )}

                            {request.patient?.phoneNumber && (
                              <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                                <FaPhone className="text-[10px]" />
                                {request.patient.phoneNumber}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Blood Group */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
                            <FaTint />
                          </div>

                          <div>
                            <span className="font-bold text-slate-700">
                              {request.bloodGroup || "N/A"}
                            </span>

                            {(request.units || request.quantity) && (
                              <p className="text-xs text-slate-400">
                                {request.units ||
                                  request.quantity}{" "}
                                unit(s)
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <FaMapMarkerAlt className="text-slate-400" />

                          <div>
                            {request.hospitalName && (
                              <p className="font-medium">
                                {request.hospitalName}
                              </p>
                            )}

                            <p className="text-xs text-slate-400">
                              {request.location || "Location not provided"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Urgency */}
                      <td className="p-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getUrgencyStyle(
                            request.urgency
                          )}`}
                        >
                          {request.urgency || "NORMAL"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            request.status
                          )}`}
                        >
                          {request.status || "PENDING"}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="p-4">
                        {request.status?.toUpperCase() ===
                        "PENDING" ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleStatusChange(
                                  requestId,
                                  "APPROVED"
                                )
                              }
                              disabled={updatingId === requestId}
                              className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <FaCheck />

                              {updatingId === requestId
                                ? "Updating..."
                                : "Approve"}
                            </button>

                            <button
                              onClick={() =>
                                handleStatusChange(
                                  requestId,
                                  "REJECTED"
                                )
                              }
                              disabled={updatingId === requestId}
                              className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <FaTimes />
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">
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