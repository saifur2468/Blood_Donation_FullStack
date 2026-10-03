"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { showToast } from '@/components/ui/toast';

const bloodRequestSchema = z.object({
  bloodGroup: z.string().min(1, "Blood group select korun"),
  bagsNeeded: z.coerce.number().min(1, "Kompokhe 1 bag blood dorkar"),
  hospitalName: z.string().min(2, "Hospital name dite hobe"),
  hospitalAddress: z.string().min(5, "Hospital address dite hobe"),
  city: z.string().min(2, "City nam dite hobe"),
  urgency: z.string().min(1, "Urgency select korun"),
  contactNumber: z.string().min(11, "Valid contact number dite hobe"),
  neededBy: z.string().min(1, "Tarikh ebong shomoy select korun"),
});

type BloodRequestFormValues = z.infer<typeof bloodRequestSchema>;

// localStorage theke role ber korar helper (userRole na thakle user object theke)
const getStoredRole = (): string => {
  let role = localStorage.getItem("userRole");

  if (!role || role === "undefined" || role === "null") {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        role = JSON.parse(userStr)?.role;
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
  }

  return String(role || "").trim().toUpperCase();
};

export default function BloodRequestPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BloodRequestFormValues>({
    resolver: zodResolver(bloodRequestSchema),
  });

  const onSubmit = async (data: BloodRequestFormValues) => {
    const token = localStorage.getItem("accessToken");
    const userRole = getStoredRole();

    // Debug: kaj korle muche felte paren
    console.log("Blood request check -> token:", !!token, "role:", userRole);

    if (!token) {
      showToast("Please login first!", "error");
      return;
    }

    if (userRole !== "PATIENT") {
      showToast(
        `Only patients can create requests. Your role: ${userRole || "unknown"}`,
        "error"
      );
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

      const payload = {
        ...data,
        bagsNeeded: Number(data.bagsNeeded),
        neededBy: new Date(data.neededBy).toISOString(),
      };

      const response = await fetch(`${backendUrl}/api/v1/blood-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Blood request response:", result);

      if (result.success) {
        showToast("Blood donation request created successfully!", "success");
        reset();
      } else {
        showToast(result.message || "Failed to create request", "error");
      }
    } catch (error) {
      console.error("Error creating blood request:", error);
      showToast("Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-black/40 p-8 border border-slate-100 dark:border-slate-800">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 text-center">Create Blood Request</h2>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-8 text-sm">
          Emergency blood darkar hole nicher form-ti fill up korun.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blood Group */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Blood Group</label>
              <select
                {...register("bloodGroup")}
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Blood Group</option>
                <option value="O_POSITIVE">O+</option>
                <option value="O_NEGATIVE">O-</option>
                <option value="A_POSITIVE">A+</option>
                <option value="A_NEGATIVE">A-</option>
                <option value="B_POSITIVE">B+</option>
                <option value="B_NEGATIVE">B-</option>
                <option value="AB_POSITIVE">AB+</option>
                <option value="AB_NEGATIVE">AB-</option>
              </select>
              {errors.bloodGroup && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.bloodGroup.message}</p>}
            </div>

            {/* Bags Needed */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bags Needed (Quantity)</label>
              <input
                type="number"
                placeholder="e.g. 2"
                {...register("bagsNeeded")}
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.bagsNeeded && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.bagsNeeded.message}</p>}
            </div>

            {/* Hospital Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hospital Name</label>
              <input
                type="text"
                placeholder="e.g. Dhaka Medical College Hospital"
                {...register("hospitalName")}
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.hospitalName && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.hospitalName.message}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">City</label>
              <input
                type="text"
                placeholder="e.g. Dhaka"
                {...register("city")}
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.city && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.city.message}</p>}
            </div>
          </div>

          {/* Hospital Address */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hospital Address</label>
            <input
              type="text"
              placeholder="e.g. Secretariat Road, Dhaka"
              {...register("hospitalAddress")}
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.hospitalAddress && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.hospitalAddress.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Urgency Level</label>
              <select
                {...register("urgency")}
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Urgency</option>
                <option value="NORMAL">Normal</option>
                <option value="URGENT">Urgent</option>
                <option value="CRITICAL">Critical</option>
              </select>
              {errors.urgency && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.urgency.message}</p>}
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contact Number</label>
              <input
                type="text"
                placeholder="01700000000"
                {...register("contactNumber")}
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.contactNumber && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.contactNumber.message}</p>}
            </div>

            {/* Needed By */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Needed By Date/Time</label>
              <input
                type="datetime-local"
                {...register("neededBy")}
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 dark:[color-scheme:dark] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.neededBy && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.neededBy.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 dark:hover:bg-red-500 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-red-200 dark:shadow-none disabled:opacity-50"
            >
              {isSubmitting ? "Creating Request..." : "Submit Blood Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}