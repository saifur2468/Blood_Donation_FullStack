"use client";

import React, { useEffect, useState } from "react";
import { Users, Droplet, CheckCircle2, Clock, TrendingUp, RefreshCw } from "lucide-react";

export default function DashboardOverview() {
  const [userRole, setUserRole] = useState<string>("PATIENT");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "PATIENT";
    setUserRole(role.toUpperCase());

    // Ekhane apnar backend theke dynamic data fetch korben
    // const fetchStats = async () => { ... }
    // For now simulating live data fetch state:
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Top Filter / Tab bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white border border-slate-200/80 p-1.5 rounded-2xl shadow-sm">
          <button className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm">
            Overview
          </button>
          <button className="rounded-xl px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 transition">
            Analytics
          </button>
          <button className="rounded-xl px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 transition">
            Reports
          </button>
        </div>

        <div className="text-xs font-bold text-slate-500 bg-white border border-slate-200/80 px-4 py-2.5 rounded-2xl shadow-sm">
          Role: <span className="text-red-600">{userRole}</span>
        </div>
      </div>

      {/* Top 4 Metric Cards (Image Layout Style) */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1 */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Requests</p>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-3xl font-black text-slate-900">142</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-600">
              <TrendingUp className="h-3 w-3" /> +4.2%
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Approved Donations</p>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-3xl font-black text-slate-900">98</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-600">
              <TrendingUp className="h-3 w-3" /> +2.1%
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Verify</p>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-3xl font-black text-slate-900">12</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-black text-orange-600">
              Action Req
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Donors</p>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="text-3xl font-black text-slate-900">540</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-600">
              Active
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Charts Grid (Image Style Layout) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Left Chart Box */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Donation Performance</h3>
            <span className="text-xs font-bold text-slate-400">Monthly</span>
          </div>
          <div className="h-56 flex items-end justify-between gap-2 px-2 border-b border-slate-100 pb-2">
            {[30, 65, 40, 85, 50, 95, 70, 45, 90, 60, 75, 80].map((val, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                <div 
                  className="w-full bg-red-600 rounded-t-lg transition-all hover:bg-red-700"
                  style={{ height: `${val}%` }}
                />
                <span className="text-[9px] font-bold text-slate-400">{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Traffic / Activity Box */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">System Live Feed</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Secure</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-700">New blood request created (O+ve)</span>
              <span className="text-[10px] font-bold text-slate-400">2m ago</span>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-700">Payment confirmed for request #102</span>
              <span className="text-[10px] font-bold text-slate-400">15m ago</span>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-700">Donor accepted patient request</span>
              <span className="text-[10px] font-bold text-slate-400">1h ago</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}