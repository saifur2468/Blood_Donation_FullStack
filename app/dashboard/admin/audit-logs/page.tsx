"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token =
          localStorage.getItem("accessToken") ||
          localStorage.getItem("token");
        
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "https://l2-a6-blood-donation.vercel.app";

        const res = await axios.get(`${backendUrl}/api/v1/admin/audit-logs`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        // Postman response structure: res.data.data
        const logData = res.data?.data || res.data || [];
        setLogs(Array.isArray(logData) ? logData : []);
      } catch (err: any) {
        console.error("Error fetching audit logs:", err?.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(logs.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLogs = logs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">System Audit Logs</h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
            Monitor and track all administrative actions and system modifications in real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-300 rounded-xl text-xs font-bold border border-blue-100 dark:border-blue-900">
            Total Logs: {logs.length}
          </span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        {loading ? (
          <div className="flex h-48 items-center justify-center text-slate-400 dark:text-slate-500 font-semibold text-xs">
            Loading audit logs securely...
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400 dark:text-slate-500 text-xs font-semibold">
            <p>No audit logs available.</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {currentLogs.map((log, index) => (
                <div
                  key={log.id || log._id || index}
                  className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-rose-600 dark:text-rose-300 uppercase text-[10px] px-2.5 py-1 bg-rose-50 dark:bg-rose-950/50 rounded-lg border border-rose-100 dark:border-rose-900 tracking-wider">
                        {log.action || "SYSTEM_ACTION"}
                      </span>
                      {log.entity && (
                        <span className="font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                          {log.entity}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 pt-0.5">
                      {log.details || log.description || "Performed administrative action"}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 font-medium pt-0.5">
                      <span>
                        By: <strong className="text-slate-700 dark:text-slate-300">{log.user?.fullName || log.user?.name || "System Admin"}</strong>
                      </span>
                      <span>•</span>
                      <span>{log.user?.email || "admin@bloodlink.com"}</span>
                    </div>
                  </div>

                  <div className="flex items-center md:justify-end shrink-0">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700">
                      {log.createdAt ? new Date(log.createdAt).toLocaleString() : "Just now"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Professional Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 px-6 gap-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, logs.length)} of {logs.length} entries
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="px-3 text-xs font-black text-slate-700 dark:text-slate-300">
                  {currentPage} / {totalPages}
                </div>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}