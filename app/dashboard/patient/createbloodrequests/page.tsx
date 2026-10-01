"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Droplet, ArrowLeft } from "lucide-react";

import { showToast } from "@/components/ui/toast";

export default function CreateBloodRequestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: "O_POSITIVE",
    bagsNeeded: 1,
    hospitalName: "",
    hospitalAddress: "",
    city: "",
    urgency: "CRITICAL",
    contactNumber: "",
    neededBy: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

      const res = await fetch(`${baseUrl}/api/v1/blood-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          bagsNeeded: Number(formData.bagsNeeded),
          neededBy: new Date(formData.neededBy).toISOString(),
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to create blood request");
      }

      showToast("Blood request created successfully!");
      router.push("/dashboard/patient/myrequest");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-extrabold border border-red-100">
            <Droplet className="w-5 h-5 fill-red-600 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Create Blood Request</h2>
            <p className="text-xs font-semibold text-slate-500">Fill up details to request emergency blood.</p>
          </div>
        </div>
        <button
          onClick={() => router.back()}
          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <div>
          <label className="font-bold text-slate-700">Hospital Name</label>
          <input
            type="text"
            required
            value={formData.hospitalName}
            onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
            className="w-full mt-1 p-3 rounded-xl border border-slate-200 focus:outline-red-500"
            placeholder="e.g. Dhaka Medical College Hospital"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700">Blood Group</label>
            <select
              value={formData.bloodGroup}
              onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              className="w-full mt-1 p-3 rounded-xl border border-slate-200 focus:outline-red-500"
            >
              <option value="O_POSITIVE">O+</option>
              <option value="O_NEGATIVE">O-</option>
              <option value="A_POSITIVE">A+</option>
              <option value="A_NEGATIVE">A-</option>
              <option value="B_POSITIVE">B+</option>
              <option value="B_NEGATIVE">B-</option>
              <option value="AB_POSITIVE">AB+</option>
              <option value="AB_NEGATIVE">AB-</option>
            </select>
          </div>
          <div>
            <label className="font-bold text-slate-700">Bags Needed</label>
            <input
              type="number"
              min={1}
              required
              value={formData.bagsNeeded}
              onChange={(e) => setFormData({ ...formData, bagsNeeded: Number(e.target.value) })}
              className="w-full mt-1 p-3 rounded-xl border border-slate-200 focus:outline-red-500"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700">Hospital Address</label>
          <input
            type="text"
            required
            value={formData.hospitalAddress}
            onChange={(e) => setFormData({ ...formData, hospitalAddress: e.target.value })}
            className="w-full mt-1 p-3 rounded-xl border border-slate-200 focus:outline-red-500"
            placeholder="Street / Area address"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700">City</label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full mt-1 p-3 rounded-xl border border-slate-200 focus:outline-red-500"
              placeholder="e.g. Dhaka"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700">Urgency</label>
            <select
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
              className="w-full mt-1 p-3 rounded-xl border border-slate-200 focus:outline-red-500"
            >
              <option value="CRITICAL">Critical</option>
              <option value="URGENT">Urgent</option>
              <option value="NORMAL">Normal</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700">Contact Number</label>
            <input
              type="text"
              required
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              className="w-full mt-1 p-3 rounded-xl border border-slate-200 focus:outline-red-500"
              placeholder="01700000000"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700">Needed By Date & Time</label>
            <input
              type="datetime-local"
              required
              value={formData.neededBy}
              onChange={(e) => setFormData({ ...formData, neededBy: e.target.value })}
              className="w-full mt-1 p-3 rounded-xl border border-slate-200 focus:outline-red-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-extrabold transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Blood Request"}
          </button>
        </div>
      </form>
    </div>
  );
}