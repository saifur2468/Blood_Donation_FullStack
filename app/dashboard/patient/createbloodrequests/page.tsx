"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Droplet, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { showToast } from "@/components/ui/toast";

export default function CreateBloodRequestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

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

  // Next step e jawar age validation check kora
  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.bloodGroup || !formData.bagsNeeded) {
        toast.error("Please fill up all required fields for Step 1");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.hospitalName.trim() || !formData.city.trim() || !formData.hospitalAddress.trim()) {
        toast.error("Please fill up all hospital location details");
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

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
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center font-extrabold border border-red-100 dark:border-red-900">
            <Droplet className="w-5 h-5 fill-red-600 text-red-600 dark:fill-red-400 dark:text-red-400" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">Create Blood Request (Wizard)</h2>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Step {currentStep} of 3 - Request emergency blood.</p>
          </div>
        </div>
        <button
          onClick={() => router.back()}
          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* Step Indicator Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div className={`flex items-center gap-2 ${currentStep >= 1 ? "text-red-600 dark:text-red-400 font-bold" : "text-slate-400"}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${currentStep >= 1 ? "bg-red-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"}`}>1</span>
          <span className="text-xs hidden sm:inline">Blood Info</span>
        </div>
        <div className="h-0.5 flex-1 mx-2 bg-slate-200 dark:bg-slate-800"></div>
        <div className={`flex items-center gap-2 ${currentStep >= 2 ? "text-red-600 dark:text-red-400 font-bold" : "text-slate-400"}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${currentStep >= 2 ? "bg-red-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"}`}>2</span>
          <span className="text-xs hidden sm:inline">Hospital Location</span>
        </div>
        <div className="h-0.5 flex-1 mx-2 bg-slate-200 dark:bg-slate-800"></div>
        <div className={`flex items-center gap-2 ${currentStep >= 3 ? "text-red-600 dark:text-red-400 font-bold" : "text-slate-400"}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${currentStep >= 3 ? "bg-red-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"}`}>3</span>
          <span className="text-xs hidden sm:inline">Urgency & Contact</span>
        </div>
      </div>

      {/* Multi-step Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
        
        {/* STEP 1: Blood Group & Bags Needed */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2">Step 1: Select Blood Group & Quantity</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-red-500"
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
                <label className="font-bold text-slate-700 dark:text-slate-300">Bags Needed</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={formData.bagsNeeded}
                  onChange={(e) => setFormData({ ...formData, bagsNeeded: Number(e.target.value) })}
                  className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-red-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 dark:hover:bg-red-500 text-white rounded-xl font-extrabold transition flex items-center gap-2 cursor-pointer"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Hospital Name, Address & City */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2">Step 2: Hospital Information</h3>
            
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300">Hospital Name</label>
              <input
                type="text"
                required
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-red-500"
                placeholder="e.g. Dhaka Medical College Hospital"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-red-500"
                  placeholder="e.g. Dhaka"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Hospital Address</label>
                <input
                  type="text"
                  required
                  value={formData.hospitalAddress}
                  onChange={(e) => setFormData({ ...formData, hospitalAddress: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-red-500"
                  placeholder="Street / Area address"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-extrabold transition flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 dark:hover:bg-red-500 text-white rounded-xl font-extrabold transition flex items-center gap-2 cursor-pointer"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Urgency, Contact & Needed By */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2">Step 3: Urgency & Contact Details</h3>
            
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300">Urgency</label>
              <select
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-red-500"
              >
                <option value="CRITICAL">Critical</option>
                <option value="URGENT">Urgent</option>
                <option value="NORMAL">Normal</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Contact Number</label>
                <input
                  type="text"
                  required
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-red-500"
                  placeholder="01700000000"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Needed By Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={formData.neededBy}
                  onChange={(e) => setFormData({ ...formData, neededBy: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 dark:[color-scheme:dark] focus:outline-red-500"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-extrabold transition flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 dark:hover:bg-red-500 text-white rounded-xl font-extrabold transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Blood Request"} <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}