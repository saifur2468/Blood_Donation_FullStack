"use client";

import React, { Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { showToast } from "@/components/ui/toast";

const schema = z
  .object({
    newPassword: z.string().min(6, "Password kamti 6 character hote hobe"),
    confirmPassword: z.string(),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    message: "Password duita match korche na",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: data.newPassword }),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        showToast("Password reset successful! Please login.", "success");
        router.push("/login");
      } else {
        showToast(result.message || "Reset failed!", "error");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      showToast("Something went wrong!", "error");
    }
  };

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <p className="text-red-500 dark:text-red-400 text-sm">
          Reset link invalid. Please request a new one.
        </p>
        <Link
          href="/forgot-password"
          className="text-red-600 dark:text-red-400 text-sm font-semibold hover:underline"
        >
          Request new link
        </Link>
      </div>
    );
  }

  const inputClass =
    "w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          New Password
        </label>
        <input
          type="password"
          placeholder="Enter new password"
          {...register("newPassword")}
          className={inputClass}
        />
        {errors.newPassword && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm new password"
          {...register("confirmPassword")}
          className={inputClass}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 hover:bg-red-700 dark:hover:bg-red-500 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-red-200 dark:shadow-none disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-black/40 p-8 border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Reset Password
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Choose a new password for your account.
          </p>
        </div>
        <Suspense fallback={<p className="text-center text-sm text-slate-500">Loading...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}