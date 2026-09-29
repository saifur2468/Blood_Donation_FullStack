// "use client";

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AdminSidebar from '@/components/ui/admin/adminsidebar';
// import { FaUsers, FaUserShield, FaTint } from 'react-icons/fa';

// export default function ReportsPage() {
//   const [stats, setStats] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const token = localStorage.getItem('accessToken');
//         const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
//         const res = await axios.get(`${backendUrl}/api/v1/admin/reports`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setStats(res.data.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching reports:", err);
//         setLoading(false);
//       }
//     };
//     fetchReports();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-slate-50/50">
//       <AdminSidebar />
//       <main className="flex-1 p-8">
//         <h1 className="text-2xl font-bold text-slate-800 mb-6">System Reports</h1>
//         {loading ? (
//           <div className="text-slate-500">Loading reports...</div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-xl font-bold">
//                 <FaUsers />
//               </div>
//               <div>
//                 <p className="text-xs text-slate-400 font-medium uppercase">Total Users</p>
//                 <h3 className="text-2xl font-bold text-slate-800">{stats?.totalUsers || 0}</h3>
//               </div>
//             </div>

//             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl font-bold">
//                 <FaUserShield />
//               </div>
//               <div>
//                 <p className="text-xs text-slate-400 font-medium uppercase">Total Donors</p>
//                 <h3 className="text-2xl font-bold text-slate-800">{stats?.totalDonors || 0}</h3>
//               </div>
//             </div>

//             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
//               <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl font-bold">
//                 <FaTint />
//               </div>
//               <div>
//                 <p className="text-xs text-slate-400 font-medium uppercase">Total Blood Requests</p>
//                 <h3 className="text-2xl font-bold text-slate-800">{stats?.totalBloodRequests || 0}</h3>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

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
      <h1 className="mb-6 text-2xl font-bold text-slate-800">
        System Reports
      </h1>

      {loading ? (
        <div className="text-slate-500">
          Loading reports...
        </div>
      ) : (
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
      )}
    </div>
  );
}