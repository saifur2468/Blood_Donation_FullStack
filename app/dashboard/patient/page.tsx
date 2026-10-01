"use client";

import React, { useState, useEffect } from "react";
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
  Legend,
} from "recharts";

const BLUE = "#2f8bff";
const YELLOW = "#fdd98a";
const PURPLE = "#c9bdfc";
const SKY = "#a9dcfb";

// Backend status onujayi eigula adjust korte paris
const ACCEPTED_STATUSES = ["IN_PROGRESS", "COMPLETED"];
const REJECTED_STATUSES = ["REJECTED", "CANCELLED"];

export default function PatientOverviewPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const headers = { Authorization: `Bearer ${token}` };

      try {
        const [reqRes, payRes] = await Promise.allSettled([
          axios.get(`${backendUrl}/api/v1/blood-request/my-requests`, { headers }),
          axios.get(`${backendUrl}/api/v1/payment/my-history`, { headers }),
        ]);

        if (reqRes.status === "fulfilled") setRequests(reqRes.value.data.data || []);
        if (payRes.status === "fulfilled") setPayments(payRes.value.data.data || []);
      } catch (err) {
        console.error("Error fetching patient overview:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-500">
        Loading dashboard overview...
      </div>
    );
  }

  const totalRequests = requests.length;

  const accepted = requests.filter(
    (r) => ACCEPTED_STATUSES.includes(r.status) || (r.donations?.length ?? 0) > 0
  ).length;

  const rejected = requests.filter((r) =>
    REJECTED_STATUSES.includes(r.status)
  ).length;

  const pending = Math.max(totalRequests - accepted - rejected, 0);

  const paidPayments = payments.filter((p) => p.paymentStatus === "PAID");
  const paidCount = paidPayments.length;
  const unpaid = Math.max(accepted - paidCount, 0);

  // Payment history te amount field nai, tai backend e `amount` add korle auto sum hobe
  const paidAmount = paidPayments.reduce(
    (sum, p) => sum + (Number(p.amount) || 0),
    0
  );

  const chartData = [
    { name: "Total Requests", count: totalRequests },
    { name: "Accepted", count: accepted },
    { name: "Rejected", count: rejected },
    { name: "Payments", count: paidCount },
  ];

  const donutData = [
    { name: "Accepted", value: accepted, color: BLUE },
    { name: "Pending", value: pending, color: YELLOW },
    { name: "Rejected", value: rejected, color: PURPLE },
  ];

  const stackedData = [
    { name: "Requests", accepted, pending, rejected, paid: 0, unpaid: 0 },
    { name: "Payments", accepted: 0, pending: 0, rejected: 0, paid: paidCount, unpaid },
  ];

  const cards = [
    {
      label: "Total Requests",
      value: totalRequests,
      note: "Requests you created",
    },
    {
      label: "Accepted Requests",
      value: accepted,
      note: "Accepted by donors",
    },
    {
      label: "Rejected Requests",
      value: rejected,
      note: "Rejected or cancelled",
    },
    {
      label: "Payments",
      value: paidCount,
      note: paidAmount > 0 ? `Total paid: ৳${paidAmount}` : "Completed payments",
    },
  ];

  const hasRequests = totalRequests > 0;

  return (
    <div className="w-full space-y-5">
      <h1 className="text-2xl font-bold text-slate-900">Overview</h1>

      {/* Top row: chart + 2x2 stat cards */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <div className="rounded-2xl bg-white p-5 shadow-sm xl:col-span-3">
          <h3 className="mb-4 text-xs font-semibold text-slate-700">
            Request analytics
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={36}>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#eef2f7" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip cursor={{ fill: "#f8fafc" }} />
                <Bar dataKey="count" fill={BLUE} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:col-span-2">
          {cards.map((c) => (
            <div
              key={c.label}
              className="flex flex-col justify-between rounded-2xl bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-medium text-slate-500">{c.label}</p>
              <h3 className="mt-3 text-3xl font-extrabold text-slate-900">{c.value}</h3>
              <p className="mt-3 border-t border-slate-100 pt-3 text-[11px] text-slate-400">
                {c.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row: donut + stacked bar */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <div className="rounded-2xl bg-white p-5 shadow-sm xl:col-span-2">
          <h3 className="mb-2 text-xs font-semibold text-slate-700">Requests by status</h3>
          <div className="h-52 w-full">
            {hasRequests ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {donutData.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-slate-400">
                No requests yet. Create your first blood request.
              </div>
            )}
          </div>
          <table className="mt-3 w-full text-xs">
            <thead>
              <tr className="text-left text-slate-400">
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Count</th>
              </tr>
            </thead>
            <tbody>
              {donutData.map((d) => (
                <tr key={d.name} className="text-slate-700">
                  <td className="py-1.5">
                    <span
                      className="mr-2 inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    {d.name}
                  </td>
                  <td className="py-1.5 text-right font-semibold">{d.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm xl:col-span-3">
          <h3 className="mb-4 text-xs font-semibold text-slate-700">Requests vs payments</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stackedData} barSize={56}>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#eef2f7" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip cursor={{ fill: "#f8fafc" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="accepted" name="Accepted" stackId="a" fill={BLUE} />
                <Bar dataKey="pending" name="Pending" stackId="a" fill={YELLOW} />
                <Bar dataKey="rejected" name="Rejected" stackId="a" fill={PURPLE} />
                <Bar dataKey="paid" name="Paid" stackId="a" fill={SKY} />
                <Bar dataKey="unpaid" name="Unpaid" stackId="a" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}