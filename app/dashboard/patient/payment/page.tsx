"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  History,
  CheckCircle,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface DonationHistoryItem {
  id: string;
  paymentStatus: string;
  receiptUrl?: string;
  donatedAt?: string;
  createdAt?: string;
  request?: {
    hospitalName?: string;
    bloodGroup?: string;
  };
}

const PAGE_SIZE_OPTIONS = [5, 10, 20];

const formatBloodGroup = (bg?: string) =>
  bg ? bg.replace("_POSITIVE", "+").replace("_NEGATIVE", "-") : "-";

const formatDate = (item: DonationHistoryItem) => {
  const raw = item.donatedAt || item.createdAt;
  if (!raw) return "-";
  return new Date(raw).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Page number list with ellipsis, e.g. [1, "...", 4, 5, 6, "...", 12]
const getPageNumbers = (current: number, total: number): (number | "...")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");
  pages.push(total);

  return pages;
};

export default function PatientPaymentHistoryPage() {
  const [history, setHistory] = useState<DonationHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const baseUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

        const res = await fetch(`${baseUrl}/api/v1/payment/my-history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();

        if (result.success) {
          setHistory(result.data || []);
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const totalItems = history.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Page size bodlale ba data kome gele page out-of-range hole thik kore dey
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginated = useMemo(() => {
    const startIdx = (page - 1) * pageSize;
    return history.slice(startIdx, startIdx + pageSize);
  }, [history, page, pageSize]);

  const showingFrom = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingTo = Math.min(page * pageSize, totalItems);

  if (loading) {
    return (
      <div className="text-center py-12 text-xs font-bold text-slate-500 dark:text-slate-400">
        Loading payment history...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      <div>
        <h2 className="text-xl font-extrabold text-center text-red-600 dark:text-red-400">
            Payment & Receipt History
          </h2>
          <p className="text-xl text-center mt-2 font-semibold text-slate-500 dark:text-slate-400">
            View your payment statuses and download PDF receipts.
          </p>
      </div>

      {totalItems === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
          No payment history found.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-bold w-14">SL</th>
                  <th className="px-5 py-3 font-bold">Hospital</th>
                  <th className="px-5 py-3 font-bold">Blood group</th>
                  <th className="px-5 py-3 font-bold">Date</th>
                  <th className="px-5 py-3 font-bold">Record ID</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 font-bold text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {paginated.map((item, idx) => {
                  const isPaid = (item.paymentStatus || "PAID") === "PAID";
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-5 py-4 font-semibold text-slate-400 dark:text-slate-500">
                        {(page - 1) * pageSize + idx + 1}
                      </td>

                      <td className="px-5 py-4 font-bold text-slate-900 dark:text-slate-100">
                        {item.request?.hospitalName || "Emergency Support"}
                      </td>

                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-300 font-extrabold border border-red-100 dark:border-red-900">
                          {formatBloodGroup(item.request?.bloodGroup)}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {formatDate(item)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          title={item.id}
                          className="font-mono text-[10px] text-slate-400 dark:text-slate-500"
                        >
                          {item.id.slice(0, 8)}...
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-extrabold border ${
                            isPaid
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900"
                              : "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900"
                          }`}
                        >
                          {isPaid ? (
                            <CheckCircle className="w-3.5 h-3.5" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          {item.paymentStatus || "PAID"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        {item.receiptUrl ? (
                          <a
                            href={item.receiptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-950 dark:text-blue-300 dark:border-blue-900 rounded-lg font-bold transition-colors whitespace-nowrap"
                          >
                            <FileText className="w-3.5 h-3.5" /> View PDF
                          </a>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 text-[10px] italic whitespace-nowrap">
                            Receipt generating...
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs">
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-semibold">
              <span>
                Showing {showingFrom}-{showingTo} of {totalItems}
              </span>
              <label className="flex items-center gap-1.5">
                Rows:
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                  }}
                  className="border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900"
                >
                  {PAGE_SIZE_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {getPageNumbers(page, totalPages).map((p, i) =>
                p === "..." ? (
                  <span key={`dots-${i}`} className="px-2 text-slate-400 dark:text-slate-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    aria-current={p === page ? "page" : undefined}
                    className={`min-w-8 h-8 px-2 rounded-lg border font-bold transition-colors ${
                      p === page
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}