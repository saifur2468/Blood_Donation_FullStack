"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Droplet } from "lucide-react";
import SharedTable from "@/components/ui/tabel"; 
import StatusBadge from "@/components/ui/badge"; 
import { usePagination } from "@/hooks/usePagination"; 

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

  const limit = 5; 
  const [totalItemsCount, setTotalItemsCount] = useState(0);

 
  const { currentPage, nextpage, prevPage, jumpToPage, totalPages } = usePagination(totalItemsCount, limit);

  const fetchPendingRequests = async (page: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

      const res = await fetch(`${baseUrl}/api/v1/blood-request/pending-requests?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (result.success) {
        setRequests(result.data?.result || result.data || []);
        
        // Backend theke jodi total item ba total page ashe seta set korbe
        const totalCount = result.data?.meta?.total || (result.data?.result?.length || 0);
        setTotalItemsCount(totalCount);
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
    fetchPendingRequests(currentPage);
  }, [currentPage]);

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
      
      await fetchPendingRequests(currentPage);
    } catch (err: any) {
      setError(err.message || "Something went wrong while accepting request");
    } finally {
      setActionLoadingId(null);
    }
  };

  const columns = [
    {
      header: "Hospital & Location",
      accessor: "hospitalName",
      render: (row: BloodRequest) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center font-extrabold border border-red-100 dark:border-red-900 shrink-0">
            <Droplet className="w-4 h-4 fill-red-600 text-red-600 dark:fill-red-400 dark:text-red-400" />
          </div>
          <div>
            <p className="font-extrabold text-slate-900 dark:text-slate-100">{row.hospitalName}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{row.hospitalAddress}, {row.city}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Blood Info",
      accessor: "bloodGroup",
      render: (row: BloodRequest) => (
        <div>
          <span className="font-extrabold text-red-600 dark:text-red-400 uppercase">
            {row.bloodGroup?.replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
          </span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">{row.bagsNeeded} Bags Required</p>
        </div>
      ),
    },
    {
      header: "Patient Details",
      accessor: "patient",
      render: (row: BloodRequest) => (
        <div className="space-y-0.5">
          <p className="font-bold text-slate-800 dark:text-slate-200">{row.patient?.fullName || "N/A"}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">📞 {row.contactNumber || row.patient?.phoneNumber || "N/A"}</p>
        </div>
      ),
    },
    {
      header: "Urgency",
      accessor: "urgency",
      render: (row: BloodRequest) => (
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase ${
          row.urgency === "CRITICAL" ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" :
          row.urgency === "URGENT" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
        }`}>
          {row.urgency}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: "id",
      render: (row: BloodRequest) => (
        <button
          onClick={() => handleAcceptRequest(row.id)}
          disabled={actionLoadingId === row.id}
          className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-extrabold hover:bg-red-700 dark:hover:bg-red-500 transition disabled:opacity-50 cursor-pointer shadow-sm"
        >
          {actionLoadingId === row.id ? "Accepting..." : "Accept Request"}
        </button>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Pending Blood Requests</h2>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
          Browse emergency blood requirements from patients and accept requests to help save lives.
        </p>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {message}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

   
      <SharedTable
        columns={columns}
        data={requests}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => jumpToPage(page)}
        loading={loading}
      />
    </div>
  );
}