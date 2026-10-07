"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function RolesPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUsers = async () => {
    try {
      const token =
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "http://localhost:5000";

      const res = await axios.get(`${backendUrl}/api/v1/admin/users`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const userData = res.data?.data || res.data || [];
      setUsers(Array.isArray(userData) ? userData : []);
    } catch (err: any) {
      console.error(
        "Error fetching users for role management:",
        err?.response?.data || err.message
      );
      toast.error("Failed to load users!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      const token =
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "http://localhost:5000";

      await axios.patch(
        `${backendUrl}/api/v1/admin/users/${id}/role`,
        { role: newRole },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      toast.success(`User role successfully updated to ${newRole}!`);
      fetchUsers();
    } catch (err: any) {
      console.error("Failed to update role", err?.response?.data || err.message);
      toast.error(err?.response?.data?.message || "Failed to update user role!");
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(users.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  // Role Badge Styling Helper
  const getRoleBadgeStyle = (role: string) => {
    switch (role?.toUpperCase()) {
      case "ADMIN":
      return "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900";
      case "DONOR":
        return "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900";
      case "PROVIDER":
        return "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-900";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
    }
  };

  return (
    <div className="w-full space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
       <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Role Management
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
            Manage user accounts, system permissions, and roles seamlessly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 rounded-xl text-xs font-bold border border-rose-100 dark:border-rose-900">
            Total Users: {users.length}
          </span>
        </div>
      </div>

      {/* Role Management Card & Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        {loading ? (
          <div className="flex h-48 items-center justify-center text-slate-400 dark:text-slate-500 font-semibold text-xs">
            Loading users securely...
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400 dark:text-slate-500 text-xs font-semibold">
            <p>No users found.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-slate-800/60 text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                    <th className="p-4 px-6 font-extrabold">User Information</th>
                    <th className="p-4 px-6 font-extrabold">Current Role</th>
                    <th className="p-4 px-6 font-extrabold text-right">Change Role</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {currentUsers.map((user, index) => {
                    const userId = user.id || user._id || index;
                    return (
                      <tr
                        key={userId}
                        className="transition hover:bg-slate-50/60 dark:hover:bg-slate-800/50"
                      >
                        {/* User Info */}
                        <td className="p-4 px-6">
                          <p className="font-bold text-slate-800 dark:text-slate-100">
                            {user.fullName || user.name || "Unnamed User"}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500 font-medium">
                            {user.email || "N/A"}
                          </p>
                        </td>

                        {/* Current Role */}
                        <td className="p-4 px-6">
                          <span
                            className={`inline-block rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border ${getRoleBadgeStyle(
                              user.role
                            )}`}
                          >
                            {user.role || "USER"}
                          </span>
                        </td>

                        {/* Change Role Dropdown */}
                        <td className="p-4 px-6 text-right">
                          <select
                            value={user.role || "PATIENT"}
                            onChange={(e) =>
                              handleRoleChange(userId, e.target.value)
                            }
                            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition cursor-pointer"
                          >
                            <option value="ADMIN">ADMIN</option>
                            <option value="DONOR">DONOR</option>
                            <option value="PATIENT">PATIENT</option>
                           
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 px-6 gap-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, users.length)} of{" "}
                {users.length} users
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="px-3 text-xs font-black text-slate-700 dark:text-slate-300">
                  {currentPage} / {totalPages}
                </div>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
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