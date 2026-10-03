"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaUserShield, FaTint } from "react-icons/fa";

export default function ReportsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL ||
          "http://localhost:5000";

        const res = await axios.get(
          `${backendUrl}/api/v1/admin/reports`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="w-full">
      <h1 className="mb-6 text-2xl font-bold text-slate-800 dark:text-slate-100">
        System Reports
      </h1>

      {loading ? (
        <div className="text-slate-500 dark:text-slate-400">
          Loading reports...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Total Users */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-xl font-bold text-blue-500 dark:text-blue-400">
              <FaUsers />
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-slate-400 dark:text-slate-500">
                Total Users
              </p>

              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {stats?.totalUsers || 0}
              </h3>
            </div>
          </div>

          {/* Total Donors */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-xl font-bold text-emerald-500 dark:text-emerald-400">
              <FaUserShield />
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-slate-400 dark:text-slate-500">
                Total Donors
              </p>

              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {stats?.totalDonors || 0}
              </h3>
            </div>
          </div>

          {/* Total Blood Requests */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/50 text-xl font-bold text-rose-500 dark:text-rose-400">
              <FaTint />
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-slate-400 dark:text-slate-500">
                Total Blood Requests
              </p>

              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {stats?.totalBloodRequests || 0}
              </h3>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}