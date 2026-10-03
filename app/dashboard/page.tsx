// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// const BLUE = "#2f8bff";
// const YELLOW = "#fdd98a";
// const PURPLE = "#c9bdfc";
// const SKY = "#a9dcfb";

// export default function DashboardOverviewPage() {
//   const [stats, setStats] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardStats = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const backendUrl =
//           process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

//         const res = await axios.get(`${backendUrl}/api/v1/admin/reports`, {
//           headers: { Authorization: `Bearer ${token}` }, // token fix kora hoyeche
//         });

//         setStats(res.data.data);
//       } catch (err) {
//         console.error("Error fetching dashboard reports:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardStats();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex h-64 items-center justify-center text-slate-500">
//         Loading dashboard overview...
//       </div>
//     );
//   }

//   const totalUsers = stats?.totalUsers || 0;
//   const totalDonors = stats?.totalDonors || 0;
//   const totalRequests = stats?.totalBloodRequests || 0;
//   const otherUsers = Math.max(totalUsers - totalDonors, 0);
//   const requestsPerDonor = totalDonors
//     ? (totalRequests / totalDonors).toFixed(1)
//     : "0";

//   const chartData = [
//     { name: "Total Users", count: totalUsers },
//     { name: "Total Donors", count: totalDonors },
//     { name: "Blood Requests", count: totalRequests },
//   ];

//   const donutData = [
//     { name: "Donors", value: totalDonors, color: BLUE },
//     { name: "Other users", value: otherUsers, color: YELLOW },
//   ];

//   const stackedData = [
//     { name: "Users", donors: totalDonors, others: otherUsers, requests: 0 },
//     { name: "Requests", donors: 0, others: 0, requests: totalRequests },
//   ];

//   const cards = [
//     { label: "Total Users", value: totalUsers },
//     { label: "Total Donors", value: totalDonors },
//     { label: "Blood Requests", value: totalRequests },
//     { label: "Requests per donor", value: requestsPerDonor },
//   ];

//   return (
//     <div className="w-full space-y-5">
//       <h1 className="text-2xl font-bold text-slate-900">Overview</h1>

//       {/* Top row: chart + 2x2 stat cards */}
//       <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
//         <div className="rounded-2xl bg-white p-5 shadow-sm xl:col-span-3">
//           <h3 className="mb-4 text-xs font-semibold text-slate-700">
//             System analytics
//           </h3>
//           <div className="h-64 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={chartData} barSize={36}>
//                 <CartesianGrid strokeDasharray="0" vertical={false} stroke="#eef2f7" />
//                 <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
//                 <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
//                 <Tooltip cursor={{ fill: "#f8fafc" }} />
//                 <Bar dataKey="count" fill={BLUE} radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:col-span-2">
//           {cards.map((c) => (
//             <div key={c.label} className="flex flex-col justify-between rounded-2xl bg-white p-5 shadow-sm">
//               <p className="text-xs font-medium text-slate-500">{c.label}</p>
//               <h3 className="mt-3 text-3xl font-extrabold text-slate-900">{c.value}</h3>
//               <p className="mt-3 border-t border-slate-100 pt-3 text-[11px] text-slate-400">
//                 Live from system reports
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom row: donut + stacked bar */}
//       <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
//         <div className="rounded-2xl bg-white p-5 shadow-sm xl:col-span-2">
//           <h3 className="mb-2 text-xs font-semibold text-slate-700">Users by role</h3>
//           <div className="h-52 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={donutData}
//                   dataKey="value"
//                   innerRadius={55}
//                   outerRadius={85}
//                   paddingAngle={2}
//                   stroke="none"
//                 >
//                   {donutData.map((d) => (
//                     <Cell key={d.name} fill={d.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//           <table className="mt-3 w-full text-xs">
//             <thead>
//               <tr className="text-left text-slate-400">
//                 <th className="pb-2 font-medium">Source</th>
//                 <th className="pb-2 text-right font-medium">Count</th>
//               </tr>
//             </thead>
//             <tbody>
//               {donutData.map((d) => (
//                 <tr key={d.name} className="text-slate-700">
//                   <td className="py-1.5">
//                     <span
//                       className="mr-2 inline-block h-2 w-2 rounded-full"
//                       style={{ backgroundColor: d.color }}
//                     />
//                     {d.name}
//                   </td>
//                   <td className="py-1.5 text-right font-semibold">{d.value}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="rounded-2xl bg-white p-5 shadow-sm xl:col-span-3">
//           <h3 className="mb-4 text-xs font-semibold text-slate-700">Users vs requests</h3>
//           <div className="h-72 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={stackedData} barSize={56}>
//                 <CartesianGrid strokeDasharray="0" vertical={false} stroke="#eef2f7" />
//                 <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
//                 <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
//                 <Tooltip cursor={{ fill: "#f8fafc" }} />
//                 <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
//                 <Bar dataKey="donors" name="Donors" stackId="a" fill={BLUE} />
//                 <Bar dataKey="others" name="Other users" stackId="a" fill={YELLOW} />
//                 <Bar dataKey="requests" name="Blood requests" stackId="a" fill={PURPLE} radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



















"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const role = (localStorage.getItem("userRole") || "PATIENT").toUpperCase();

    switch (role) {
      case "ADMIN":
        router.replace("/dashboard/admin");
        break;
      case "DONOR":
        router.replace("/dashboard/donor");
        break;
      case "PATIENT":
      default:
        router.replace("/dashboard/patient");
        break;
    }
  }, [router]);

  return (
   <div className="flex h-64 items-center justify-center text-slate-500 dark:text-slate-400">
  Redirecting to your dashboard...
</div>
  );
}