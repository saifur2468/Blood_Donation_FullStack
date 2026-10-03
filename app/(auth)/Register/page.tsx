"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { showToast } from '@/components/ui/toast';

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name dite hobe"),
  email: z.string().email("Valid email dite hobe"),
  phoneNumber: z.string().min(11, "Valid phone number dite hobe"),
  password: z.string().min(6, "Password kamti 6 character hote hobe"),
  role: z.enum(["PATIENT", "DONOR", "PROVIDER"], { required_error: "Role select korun" }),
  bloodGroup: z.string().min(1, "Blood group select korun"),
  city: z.string().min(1, "Cityer nam dite hobe"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "PATIENT",
      bloodGroup: "A_POSITIVE",
      city: "Dhaka",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showToast("Registration successful! Please login.", "success");
        router.push("/login");
      } else {
        console.error("Backend Error Details:", result);
        showToast(result.message || "Registration failed!", "error");
      }
    } catch (error) {
      console.error("Register error:", error);
      showToast("Something went wrong during registration!", "error");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-black/40 p-8 border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Create Account </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Join our blood donation platform</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("fullName")}
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
            {errors.fullName && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="user@example.com"
              {...register("email")}
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
            {errors.email && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
            <input
              type="text"
              placeholder="01700000000"
              {...register("phoneNumber")}
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
            {errors.phoneNumber && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.phoneNumber.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Blood Group</label>
              <select
                {...register("bloodGroup")}
                className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              >
                <option value="A_POSITIVE">A+</option>
                <option value="A_NEGATIVE">A-</option>
                <option value="B_POSITIVE">B+</option>
                <option value="B_NEGATIVE">B-</option>
                <option value="AB_POSITIVE">AB+</option>
                <option value="AB_NEGATIVE">AB-</option>
                <option value="O_POSITIVE">O+</option>
                <option value="O_NEGATIVE">O-</option>
              </select>
              {errors.bloodGroup && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.bloodGroup.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">City</label>
              <input
                type="text"
                placeholder="Dhaka"
                {...register("city")}
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              {errors.city && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.city.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Role</label>
            <select
              {...register("role")}
              className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="PATIENT">Patient (Recipient)</option>
              <option value="DONOR">Donor</option>
              <option value="PROVIDER">Provider</option>
            </select>
            {errors.role && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.role.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter New Password"
              {...register("password")}
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
            {errors.password && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 dark:hover:bg-red-500 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-red-200 dark:shadow-none disabled:opacity-50"
            >
              {isSubmitting ? "Creating Account..." : " Register"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-red-600 dark:text-red-400 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}