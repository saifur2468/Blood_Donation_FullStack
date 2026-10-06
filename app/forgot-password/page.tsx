"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { showToast } from "@/components/ui/toast";

const schema = z.object({
  email: z.string().email("Valid email dite hobe"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setSent(true);
      } else {
        showToast(result.message || "Request failed!", "error");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      showToast("Something went wrong!", "error");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-black/40 p-8 border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Forgot Password</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Enter your email and well send you a reset link.
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm rounded-xl p-4 border border-green-200 dark:border-green-800">
              If an account exists with this email, a reset link has been sent. The link expires in 10 minutes.
            </div>
            <Link href="/login" className="text-red-600 dark:text-red-400 text-sm font-semibold hover:underline">
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input
                type="email"
                placeholder="user@example.com"
                {...register("email")}
                className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              {errors.email && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 dark:hover:bg-red-500 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-red-200 dark:shadow-none disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              <Link href="/login" className="text-red-600 dark:text-red-400 font-semibold hover:underline">
                Back to login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}