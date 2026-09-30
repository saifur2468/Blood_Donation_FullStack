"use client";

import React, { useEffect, useState } from "react";
import { 
  Droplet, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  ArrowRight,
  Activity
} from "lucide-react";
import Link from "next/link";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  bloodGroup: string;
  location: string;
  availabilityStatus: string;
  lastDonationDate: string | null;
}

export default function DonorDashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonorProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

        const res = await fetch(`${baseUrl}/api/v1/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        if (result.success) {
          setProfile(result.data);
        } else {
          setError(result.message || "Failed to load profile data");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonorProfile();
  }, []);

  const formatBloodGroup = (bg: string) => {
    return bg?.replace("_POSITIVE", "+").replace("_NEGATIVE", "-");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-xs font-bold text-slate-500 animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-widest text-white border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Donor
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome back, {profile?.fullName || "Donor"}! 👋
          </h1>
          <p className="text-red-100 text-xs md:text-sm font-medium max-w-xl">
            Your readiness to donate saves lives. Check out emergency blood requests or manage your profile status.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 w-full md:w-auto">
          <Link 
            href="/dashboard/donor/requests"
            className="flex-1 md:flex-none px-5 py-3 bg-white text-red-600 rounded-2xl text-xs font-extrabold hover:bg-red-50 transition shadow-sm text-center flex items-center justify-center gap-2"
          >
            View Requests <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Blood Group Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-xl font-extrabold border border-red-100 shrink-0">
            <Droplet className="w-6 h-6 fill-red-600" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Blood Group</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">{formatBloodGroup(profile?.bloodGroup || "N/A")}</h3>
          </div>
        </div>

        {/* Availability Status Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-extrabold border border-emerald-100 shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Status</p>
            <h3 className={`text-sm font-extrabold mt-0.5 uppercase ${profile?.availabilityStatus === "AVAILABLE" ? "text-emerald-600" : "text-amber-600"}`}>
              {profile?.availabilityStatus || "Active"}
            </h3>
          </div>
        </div>

        {/* Total Donations / Impact */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-extrabold border border-blue-100 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Impact</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">Active Donor</h3>
          </div>
        </div>

        {/* Last Donation */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-extrabold border border-amber-100 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Last Donation</p>
            <h3 className="text-xs font-extrabold text-slate-800 mt-0.5">
              {profile?.lastDonationDate ? new Date(profile.lastDonationDate).toLocaleDateString() : "No record yet"}
            </h3>
          </div>
        </div>

      </div>

      {/* Profile Overview Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Donor Profile Information</h3>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Your personal contact and medical details stored securely.</p>
          </div>
          <Link 
            href="/dashboard/donor/profile" 
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-extrabold transition"
          >
            Edit Profile
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <p className="font-extrabold text-slate-400 uppercase tracking-widest text-[10px] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" /> Full Name
            </p>
            <p className="font-extrabold text-slate-800 text-sm">{profile?.fullName || "N/A"}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <p className="font-extrabold text-slate-400 uppercase tracking-widest text-[10px] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number
            </p>
            <p className="font-extrabold text-slate-800 text-sm">{profile?.phone || "N/A"}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <p className="font-extrabold text-slate-400 uppercase tracking-widest text-[10px] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location / City
            </p>
            <p className="font-extrabold text-slate-800 text-sm">{profile?.location || "N/A"}</p>
          </div>

        </div>
      </div>

    </div>
  );
}