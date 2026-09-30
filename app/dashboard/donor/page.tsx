"use client";

import React, { useEffect, useState } from "react";
import { User, HeartPulse, CheckCircle, Clock, ShieldAlert } from "lucide-react";

export default function DonorOverviewPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch("http://localhost:5000/api/v1/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setProfile(data.data);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="text-center py-12 text-xs font-bold text-slate-500">Loading overview...</div>;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 p-6 rounded-2xl text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold">Welcome back, {profile?.fullName || "Donor"}! 👋</h1>
          <p className="text-xs text-red-100 mt-1">Thank you for saving lives. Check your stats and manage patient requests below.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-xs font-bold">
          Role: <span className="uppercase text-yellow-300">{profile?.role}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><HeartPulse className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400">Blood Group</p>
            <h3 className="text-sm font-extrabold text-slate-800">{profile?.bloodGroup?.replace("_", " ") || "Not Set"}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400">Availability</p>
            <h3 className="text-sm font-extrabold text-slate-800">{profile?.isAvailable ? "Available to Donate" : "Not Available"}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Clock className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400">Last Donated</p>
            <h3 className="text-sm font-extrabold text-slate-800">
              {profile?.lastDonatedAt ? new Date(profile.lastDonatedAt).toLocaleDateString() : "Never"}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><ShieldAlert className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400">City / Location</p>
            <h3 className="text-sm font-extrabold text-slate-800">{profile?.city || "Not Set"}</h3>
          </div>
        </div>
      </div>

      {/* Activity Chart Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-extrabold text-slate-900 mb-4">Donation Activity & Summary</h3>
        <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs font-bold text-slate-400">
          Chart: Monthly Requests & Accepted Donations Overview
        </div>
      </div>
    </div>
  );
}