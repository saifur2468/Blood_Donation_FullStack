"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        const res = await axios.get(`${backendUrl}/api/v1/admin/audit-logs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLogs(res.data.data || []);
      } catch (err) {
        console.error("Error fetching audit logs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(logs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLogs = logs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">System Audit Logs</h1>
        <p className="mt-1 text-sm text-slate-500">Track all administrative and system actions.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-slate-500 text-center">Loading audit logs...</div>
        ) : logs.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">No audit logs found.</div>
        ) : (
          <>
            <div className="p-6 space-y-3">
              {currentLogs.map((log) => (
                <div key={log.id || log._id} className="p-4 bg-slate-50/70 rounded-xl flex justify-between items-center text-sm border border-slate-100">
                  <div>
                    <span className="font-semibold text-rose-600 uppercase text-xs px-2 py-0.5 bg-rose-50 rounded mr-2">
                      {log.action}
                    </span>
                    <span className="text-slate-700">{log.details || log.description}</span>
                    <p className="text-xs text-slate-400 mt-1">
                      By: {log.user?.fullName || log.user?.name || 'Admin'} ({log.user?.email || 'N/A'})
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap ml-4">
                    {new Date(log.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-white p-4">
              <span className="text-xs font-medium text-slate-500">
                Page {currentPage} of {totalPages || 1}
              </span>

              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
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