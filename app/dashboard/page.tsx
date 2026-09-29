"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaUserShield, FaTint } from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

        // Apnar nirdisto reports API call kora hocche
        const res = await axios.get(`${backendUrl}/api/v1/admin/reports`, {
          headers: { Authorization: `Bearer ` },
        });

        setStats(res.data.data);
      } catch (err) {
        console.error("Error fetching dashboard reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-500">
        Loading dashboard overview...
      </div>
    );
  }

  // Chart er jonno real stats data mapping
  const chartData = [
    { name: "Total Users", count: stats?.totalUsers || 0 },
    { name: "Total Donors", count: stats?.totalDonors || 0 },
    { name: "Blood Requests", count: stats?.totalBloodRequests || 0 },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-slate-500">
          Real-time system overview and statistics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Users */}
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-500">
            <FaUsers />
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-slate-400">
              Total Users
            </p>
            <h3 className="text-2xl font-bold text-slate-800">
              {stats?.totalUsers || 0}
            </h3>
          </div>
        </div>

        {/* Total Donors */}
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl font-bold text-emerald-500">
            <FaUserShield />
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-slate-400">
              Total Donors
            </p>
            <h3 className="text-2xl font-bold text-slate-800">
              {stats?.totalDonors || 0}
            </h3>
          </div>
        </div>

        {/* Total Blood Requests */}
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-xl font-bold text-rose-500">
            <FaTint />
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-slate-400">
              Total Blood Requests
            </p>
            <h3 className="text-2xl font-bold text-slate-800">
              {stats?.totalBloodRequests || 0}
            </h3>
          </div>
        </div>
      </div>

      {/* Real Data Chart Section */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-slate-800">
          System Analytics Graph
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}