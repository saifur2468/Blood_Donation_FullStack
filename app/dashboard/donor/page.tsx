"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const BLUE = "#2f8bff";
const YELLOW = "#fdd98a";
const PURPLE = "#c9bdfc";
const RED = "#f87171";

const BLOOD_LABEL: Record<string, string> = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
};
const label = (bg?: string | null) => (bg ? BLOOD_LABEL[bg] || bg : "N/A");

const urgencyStyle = (u: string) =>
  u === "CRITICAL"
    ? "bg-red-50 text-red-600 border-red-200"
    : u === "URGENT"
    ? "bg-amber-50 text-amber-600 border-amber-200"
    : "bg-slate-50 text-slate-500 border-slate-200";

export default function DonorOverviewPage() {
  const [profile, setProfile] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const [meRes, reqRes] = await Promise.allSettled([
          axios.get(`${backendUrl}/api/v1/user/me`, { headers }),
          axios.get(`${backendUrl}/api/v1/blood-request/pending-requests`, { headers }),
        ]);

        if (meRes.status === "fulfilled") setProfile(meRes.value.data.data);
        if (reqRes.status === "fulfilled") setRequests(reqRes.value.data.data || []);

        const failed = [meRes, reqRes].find((r) => r.status === "rejected") as
          | PromiseRejectedResult
          | undefined;
        if (failed) {
          setError(failed.reason?.response?.data?.message || failed.reason?.message || "Failed to load data");
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-xs font-semibold text-slate-500">
        Loading your donor overview...
      </div>
    );
  }

  const myGroup = profile?.bloodGroup;
  const myCity = profile?.city;

  const totalPending = requests.length;
  const matchingGroup = requests.filter((r) => r.bloodGroup === myGroup).length;
  const criticalCount = requests.filter((r) => r.urgency === "CRITICAL").length;
  const urgentCount = requests.filter((r) => r.urgency === "URGENT").length;
  const otherCount = Math.max(totalPending - criticalCount - urgentCount, 0);

  const daysSince = profile?.lastDonatedAt
    ? Math.floor((Date.now() - new Date(profile.lastDonatedAt).getTime()) / 86400000)
    : null;

  // Chart: pending requests per blood group
  const groupCounts: Record<string, number> = {};
  requests.forEach((r) => {
    const k = label(r.bloodGroup);
    groupCounts[k] = (groupCounts[k] || 0) + 1;
  });
  const chartData = Object.entries(groupCounts).map(([name, count]) => ({ name, count }));

  const donutData = [
    { name: "Critical", value: criticalCount, color: RED },
    { name: "Urgent", value: urgentCount, color: YELLOW },
    { name: "Normal", value: otherCount, color: BLUE },
  ];

  const cards = [
    { label: "PENDING REQUESTS", value: totalPending },
    { label: `MATCHING ${label(myGroup)}`, value: matchingGroup },
    { label: "CRITICAL REQUESTS", value: criticalCount },
    {
      label: "LAST DONATION",
      value: daysSince === null ? "Never" : `${daysSince}d ago`,
    },
  ];

  const latest = [...requests]
    .sort((a, b) => (a.bloodGroup === myGroup ? -1 : 0) - (b.bloodGroup === myGroup ? -1 : 0))
    .slice(0, 5);

  return (
    <div className="w-full space-y-5 font-sans">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Overview</h1>
        {error ? (
          <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
            {error}
          </span>
        ) : (
          <span
            className={`rounded-full border px-3 py-1 text-xs font-bold ${
              profile?.isAvailable
                ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                : "border-slate-200 bg-slate-50 text-slate-500"
            }`}
          >
            {profile?.isAvailable ? "Available to donate" : "Currently unavailable"}
          </span>
        )}
      </div>

      {/* Top row */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm xl:col-span-3">
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Pending requests by blood group
          </h3>
          <div className="h-64 w-full">
            {chartData.length === 0 ? (
              <div className="flex h-full items-center justify-center text-xs text-slate-400">
                No pending requests right now.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barSize={32}>
                  <CartesianGrid strokeDasharray="0" vertical={false} stroke="#eef2f7" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip cursor={{ fill: "#f8fafc" }} />
                  <Bar dataKey="count" name="Requests" radius={[6, 6, 0, 0]}>
                    {chartData.map((d) => (
                      <Cell key={d.name} fill={d.name === label(myGroup) ? RED : BLUE} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          {myGroup && (
            <p className="mt-2 text-[11px] font-medium text-slate-400">
              Your blood group ({label(myGroup)}) is highlighted in red.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:col-span-2">
          {cards.map((c) => (
            <div
              key={c.label}
              className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{c.label}</p>
              <h3 className="mt-3 text-3xl font-black text-slate-900">{c.value}</h3>
              <p className="mt-3 border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-400">
                {myCity ? `Based in ${myCity}` : "Live from your account"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm xl:col-span-2">
          <h3 className="mb-2 text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Requests by urgency
          </h3>
          <div className="h-52 w-full">
            {totalPending === 0 ? (
              <div className="flex h-full items-center justify-center text-xs text-slate-400">
                Nothing to show yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={donutData} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={2} stroke="none">
                    {donutData.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <table className="mt-3 w-full text-xs">
            <thead>
              <tr className="text-left text-slate-400">
                <th className="pb-2 text-[10px] font-bold uppercase tracking-wider">Urgency</th>
                <th className="pb-2 text-right text-[10px] font-bold uppercase tracking-wider">Requests</th>
              </tr>
            </thead>
            <tbody>
              {donutData.map((d) => (
                <tr key={d.name} className="text-slate-700">
                  <td className="py-1.5 font-medium">
                    <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name}
                  </td>
                  <td className="py-1.5 text-right font-bold">{d.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
      </div>
    </div>
  );
}