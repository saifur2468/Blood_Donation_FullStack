"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaUserShield, FaTint } from "react-icons/fa";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

        const res = await axios.get(`${backendUrl}/api/v1/admin/reports`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(res.data.data || res.data);
      } catch (err) {
        console.error("Error fetching system reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-slate-400 font-medium text-sm">
        Loading system overview...
      </div>
    );
  }

  // Real data mapping for the clean chart
  const chartData = [
    { name: "Total Users", count: stats?.totalUsers || 0 },
    { name: "Total Donors", count: stats?.totalDonors || 0 },
    { name: "Blood Requests", count: stats?.totalBloodRequests || 0 },
  ];

  // Custom clean tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-xl">
          <p className="text-xs font-bold text-slate-400 uppercase">{label}</p>
          <p className="mt-1 text-sm font-black text-slate-900">
            Count: <span className="text-rose-600">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Real-time system metrics, analytics, and reports.
        </p>
      </div>

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Users */}
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-600">
            <FaUsers />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Users
            </p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">
              {stats?.totalUsers || 0}
            </h3>
          </div>
        </div>

        {/* Total Donors */}
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl font-bold text-emerald-600">
            <FaUserShield />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Donors
            </p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">
              {stats?.totalDonors || 0}
            </h3>
          </div>
        </div>

        {/* Total Blood Requests */}
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-xl font-bold text-rose-600">
            <FaTint />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Blood Requests
            </p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">
              {stats?.totalBloodRequests || 0}
            </h3>
          </div>
        </div>
      </div>

      {/* Modern Gradient Area Chart Section */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              System Analytics Trend
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live data visualization from backend reports
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
            Live Feed
          </span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#ef4444"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorCount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}