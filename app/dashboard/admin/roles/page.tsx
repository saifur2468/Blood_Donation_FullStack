"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RolesPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "http://localhost:5000";

      const res = await axios.get(
        `${backendUrl}/api/v1/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data.data || []);
    } catch (err) {
      console.error(
        "Error fetching users for role management:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (
    id: string,
    newRole: string
  ) => {
    try {
      const token = localStorage.getItem("accessToken");

      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "http://localhost:5000";

      await axios.patch(
        `${backendUrl}/api/v1/admin/users/${id}/role`,
        {
          role: newRole,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (err) {
      console.error("Failed to update role", err);
    }
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Role Management
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage user roles and permissions.
        </p>
      </div>

      {/* Role Management Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        {loading ? (
          <div className="text-slate-500">
            Loading roles...
          </div>
        ) : users.length === 0 ? (
          <div className="py-8 text-center text-slate-500">
            No users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase text-slate-400">
                  <th className="p-4 font-semibold">
                    User
                  </th>

                  <th className="p-4 font-semibold">
                    Current Role
                  </th>

                  <th className="p-4 font-semibold">
                    Change Role
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                {users.map((user) => {
                  const userId = user.id || user._id;

                  return (
                    <tr
                      key={userId}
                      className="transition hover:bg-slate-50/50"
                    >
                      {/* User */}
                      <td className="p-4">
                        <p className="font-semibold text-slate-700">
                          {user.fullName || user.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {user.email}
                        </p>
                      </td>

                      {/* Current Role */}
                      <td className="p-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {user.role}
                        </span>
                      </td>

                      {/* Change Role */}
                      <td className="p-4">
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(
                              userId,
                              e.target.value
                            )
                          }
                          className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200"
                        >
                          <option value="ADMIN">
                            ADMIN
                          </option>

                          <option value="PATIENT">
                            PATIENT
                          </option>

                          <option value="PROVIDER">
                            PROVIDER
                          </option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}