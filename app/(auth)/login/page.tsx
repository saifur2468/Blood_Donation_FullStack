"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { showToast } from '@/components/ui/toast';

const loginSchema = z.object({
  email: z.string().email("Valid email dite hobe"),
  password: z.string().min(6, "Password kamti 6 character hote hobe"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // Role onujayi redirect
  // const redirectByRole = (role: string) => {
  //   if (role === "ADMIN") router.push("/admin");
  //   else if (role === "PROVIDER") router.push("/provider/dashboard");
  //   else router.push("/");
  // };


  // Role onujayi correct redirect path set kore din
  const redirectByRole = (role: string) => {
    if (role === "ADMIN") router.push("/dashboard/admin"); // Jodi admin dashboard /dashboard/admin hoy
    else if (role === "donor") router.push("/dashboard/donor"); // Jodi provider dashboard /dashboard/provider hoy
    else router.push("/dashboard"); // Patient ba default dashboard
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Debug: backend theke ki ashche dekhar jonno (kaj korle muche felte paren)
        console.log("Login result:", result);

        const token = result.data?.accessToken || result.data?.token;
        const userObj = result.data?.user || result.data;

        // Role ke uppercase e normalize kora hocche (patient -> PATIENT)
        const rawRole = userObj?.role || result.data?.role;
        const role = String(rawRole || "").trim().toUpperCase();

        if (!token || !role) {
          console.error("Token ba role paoa jayni. Response:", result);
          showToast("Login response invalid (token/role missing)", "error");
          return;
        }

        localStorage.setItem("accessToken", token);
        localStorage.setItem("userRole", role);
        localStorage.setItem("user", JSON.stringify({ ...userObj, role }));

        showToast("Login successful!", "success");
        redirectByRole(role);
      } else {
        showToast(result.message || "Login failed!", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("Something went wrong during login!", "error");
    }
  };

  // Quick Demo Login Handler
  // Note: eta fake token, tai real backend API (jemon blood request submit) 401 dite pare
  const handleDemoLogin = (role: 'ADMIN' | 'PATIENT' | 'PROVIDER') => {
    const demoUser = {
      id: "demo-id",
      name: "Demo User",
      email: `demo-${role.toLowerCase()}@gmail.com`,
      role: role,
    };

    localStorage.setItem("accessToken", "demo-token-" + role.toLowerCase());
    localStorage.setItem("userRole", role);
    localStorage.setItem("user", JSON.stringify(demoUser));

    showToast(`Logged in as Demo ${role}`, "success");
    redirectByRole(role);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back 👋</h2>
          <p className="text-slate-600 text-sm">Login to your account</p>
        </div>

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="user@example.com"
              {...register("email")}
              className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-red-200 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "🔐 Login"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500">─── OR ───</span></div>
        </div>

        {/* One-Click Demo Login Section */}
        <div>
          <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">🚀 Quick Demo Login</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <button
              type="button"
              onClick={() => handleDemoLogin("ADMIN")}
              className="bg-slate-100 hover:bg-slate-200 border border-slate-200 p-3 rounded-xl text-center transition-colors"
            >
              <div className="text-sm font-bold text-slate-800">👨‍💼 Admin</div>
              <span className="text-xs text-red-600 font-medium">Demo Login</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("PATIENT")}
              className="bg-slate-100 hover:bg-slate-200 border border-slate-200 p-3 rounded-xl text-center transition-colors"
            >
              <div className="text-sm font-bold text-slate-800">👤 Patient</div>
              <span className="text-xs text-red-600 font-medium">Demo Login</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleDemoLogin("donor")}
            className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-200 p-3 rounded-xl text-center transition-colors"
          >
            <div className="text-sm font-bold text-slate-800">🛠️ donor</div>
            <span className="text-xs text-red-600 font-medium">Demo Login</span>
          </button>
        </div>

        <p className="text-center text-sm text-slate-600 mt-6">
          Don't have an account?{" "}
          <Link href="/Register" className="text-red-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}