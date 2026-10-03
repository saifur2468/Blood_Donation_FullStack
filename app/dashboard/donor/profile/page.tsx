"use client";

import React, { useEffect, useState } from "react";
import { User, CheckCircle, AlertCircle } from "lucide-react";

export default function DonorProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bloodGroup: "",
    location: "", 
    phone: "",              
    availabilityStatus: true, 
    lastDonationDate: "",     
  });
  
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      
      const res = await fetch(`${baseUrl}/api/v1/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      
      const userData = result.data || result; 

      if (userData) {
        let formattedDate = "";
        const rawDate = userData.lastDonationDate || userData.lastDonatedAt;
        if (rawDate) {
          formattedDate = rawDate.split("T")[0];
        }

        setFormData({
          fullName: userData.fullName || userData.name || "",
          email: userData.email || "",
          bloodGroup: userData.bloodGroup || "",
          location: userData.location || userData.city || "",
          phone: userData.phone || userData.phoneNumber || "",
          availabilityStatus: userData.availabilityStatus ?? userData.isAvailable ?? true,
          lastDonationDate: formattedDate,
        });

        if (userData.profilePhoto) {
          setPhotoPreview(userData.profilePhoto);
        }
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("accessToken"); // Login page-e token jodi onno name-e thake (jopez "token"), tahobe ekhane seta change kore dite hobe
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

      // Postman-er moto sothik JSON payload
      const payloadData = {
        fullName: formData.fullName,
        phone: formData.phone,                    
        location: formData.location,
        bloodGroup: formData.bloodGroup,
        availabilityStatus: formData.availabilityStatus, 
        lastDonationDate: formData.lastDonationDate || null, 
      };

      console.log("Sending JSON payload from frontend:", payloadData);

      const res = await fetch(`${baseUrl}/api/v1/user/update-profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // JSON data pathanor jonno eta khuboi zruri
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payloadData),
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to update profile");
      }

      setMessage("Profile updated successfully!");

      // Fresh data abar fetch kore UI update kore dewa holo
      await fetchProfile();

    } catch (err: any) {
      console.error("Update error:", err);
      setError(err.message || "Something went wrong!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-12 text-xs font-bold text-slate-500 dark:text-slate-400">Loading profile information...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Donor Profile & Photo Information</h2>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">View and update your registration details, availability status and profile image.</p>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {message}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Profile Picture Upload Section */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center">
            {photoPreview ? (
              <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-xs text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-600 hover:file:bg-red-100 dark:file:bg-red-950/50 dark:file:text-red-400 dark:hover:file:bg-red-950 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">PNG, JPG or JPEG (Cloudinary upload)</p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-semibold focus:outline-none focus:border-red-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email (Read-only)</label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-400 dark:text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:border-red-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Location / City</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Dhaka, Gazipur"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs font-semibold focus:outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="017xxxxxxxx"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs font-semibold focus:outline-none focus:border-red-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Last Donation Date</label>
            <input
              type="date"
              name="lastDonationDate"
              value={formData.lastDonationDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 dark:[color-scheme:dark] text-xs font-semibold focus:outline-none focus:border-red-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            name="availabilityStatus"
            id="availabilityStatus"
            checked={formData.availabilityStatus}
            onChange={handleChange}
            className="w-4 h-4 text-red-600 rounded border-slate-300 dark:border-slate-600 dark:bg-slate-800 focus:ring-red-500"
          />
          <label htmlFor="availabilityStatus" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
            Available for Blood Donation right now
          </label>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={updating}
            className="px-6 py-2.5 bg-red-600 text-white rounded-xl text-xs font-extrabold hover:bg-red-700 dark:hover:bg-red-500 transition"
          >
            {updating ? "Saving Changes..." : "Update Profile & Photo"}
          </button>
        </div>
      </form>
    </div>
  );
}