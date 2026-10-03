"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

type Profile = {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  bloodGroup: string;
  role: string;
  isAvailable: boolean;
  profilePhoto: string;
};

export default function PatientProfilePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [profile, setProfile] = useState<Profile>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    bloodGroup: "",
    role: "",
    isAvailable: false,
    profilePhoto: "",
  });

  // =========================================================
  // GET PROFILE
  // =========================================================
  useEffect(() => {
    setIsMounted(true);

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const res = await fetch(
          `${BASE_URL}/api/v1/user/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await res.json();

        console.log("GET PROFILE RESPONSE:", result);

        if (!res.ok || !result.success || !result.data) {
          throw new Error(
            result.message || "Failed to load profile"
          );
        }

        const d = result.data;

        setProfile({
          fullName: d.fullName || "",
          email: d.email || "",
          phoneNumber: d.phoneNumber || "",
          address: d.city || "",
          bloodGroup: d.bloodGroup || "",
          role: d.role || "",
          isAvailable: Boolean(d.isAvailable),
          profilePhoto: d.profilePhoto || "",
        });
      } catch (err: any) {
        console.error("PROFILE FETCH ERROR:", err);

        toast.error(err.message || "Could not fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =========================================================
  // UPDATE PROFILE
  // JSON REQUEST
  // No FormData
  // No Profile Photo Upload
  // =========================================================
  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const requestBody = {
        fullName: profile.fullName,
        phone: profile.phoneNumber,
        location: profile.address,
        availabilityStatus: profile.isAvailable,
      };

      console.log("UPDATE PROFILE REQUEST:", requestBody);

      const res = await fetch(
        `${BASE_URL}/api/v1/user/update-profile`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await res.json();

      console.log("UPDATE PROFILE RESPONSE:", result);

      if (!res.ok || !result.success) {
        throw new Error(
          result.message || "Failed to update profile"
        );
      }

      const d = result.data;

      if (d) {
        setProfile((prev) => ({
          ...prev,

          fullName:
            d.fullName !== undefined
              ? d.fullName
              : prev.fullName,

          phoneNumber:
            d.phoneNumber !== undefined
              ? d.phoneNumber
              : prev.phoneNumber,

          address:
            d.city !== undefined
              ? d.city
              : prev.address,

          isAvailable:
            d.isAvailable !== undefined
              ? Boolean(d.isAvailable)
              : prev.isAvailable,

          profilePhoto:
            d.profilePhoto !== undefined
              ? d.profilePhoto
              : prev.profilePhoto,
        }));

        // Update localStorage user information
        try {
          const savedUser = JSON.parse(
            localStorage.getItem("user") || "{}"
          );

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...savedUser,
              ...d,
            })
          );
        } catch (storageError) {
          console.warn(
            "Could not update localStorage:",
            storageError
          );
        }
      }

      toast.success("Profile updated successfully!");
    } catch (err: any) {
      console.error("UPDATE PROFILE ERROR:", err);

      toast.error(
        err.message || "Something went wrong while updating profile"
      );
    } finally {
      setUpdating(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (!isMounted || loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-red-600" />

          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================
  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-12">

<h1 className="text-center text-2xl font-semibold text-red-600 dark:text-red-400">Patient Profile Page </h1>
   
      <form
        onSubmit={handleUpdate}
        className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-xs shadow-sm"
      >

        {/* Full Name */}
        <div>
          <label className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
            <User className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />

            Full Name
          </label>

          <input
            type="text"
            required
            value={profile.fullName}
            onChange={(e) =>
              setProfile({
                ...profile,
                fullName: e.target.value,
              })
            }
            className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
            <Mail className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />

            Email
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              (Read-only)
            </span>
          </label>

          <input
            type="email"
            disabled
            value={profile.email}
            className="mt-1 w-full cursor-not-allowed rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-500 dark:text-slate-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
            <Phone className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />

            Phone Number
          </label>

          <input
            type="text"
            required
            value={profile.phoneNumber}
            onChange={(e) =>
              setProfile({
                ...profile,
                phoneNumber: e.target.value,
              })
            }
            className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            placeholder="Enter phone number"
          />
        </div>

        {/* City */}
        <div>
          <label className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />

            Address / City
          </label>

          <input
            type="text"
            value={profile.address}
            onChange={(e) =>
              setProfile({
                ...profile,
                address: e.target.value,
              })
            }
            className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            placeholder="Enter your city"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
            <ShieldCheck className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />

            Blood Group
          </label>

          <input
            type="text"
            disabled
            value={profile.bloodGroup
              .replace("_POSITIVE", "+")
              .replace("_NEGATIVE", "-")}
            className="mt-1 w-full cursor-not-allowed rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 font-bold uppercase text-slate-500 dark:text-slate-500"
          />
        </div>

        {/* Availability */}
        <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-4">

          <label className="flex cursor-pointer items-center gap-3 font-bold text-slate-700 dark:text-slate-300">

            <input
              type="checkbox"
              checked={profile.isAvailable}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  isAvailable: e.target.checked,
                })
              }
              className="h-4 w-4 accent-red-600"
            />

            <span>
              Available to donate
            </span>

          </label>

          <p className="mt-1 pl-7 text-[11px] text-slate-500 dark:text-slate-400">
            Turn this on when you are available to donate blood.
          </p>

        </div>

        {/* Submit */}
        <div className="flex justify-end border-t border-slate-100 dark:border-slate-800 pt-4">

          <button
            type="submit"
            disabled={updating}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-extrabold text-white shadow-md transition hover:bg-red-700 dark:hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {updating ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                Updating...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />

                Save Changes
              </>
            )}

          </button>

        </div>

      </form>
    </div>
  );
}