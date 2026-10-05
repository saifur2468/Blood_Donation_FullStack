"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { showToast } from "@/components/ui/toast";

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

  // Role onujayi redirect path set kora
  const redirectByRole = (role: string) => {
    const normalizedRole = role.toUpperCase();
    if (normalizedRole === "ADMIN") router.push("/dashboard/admin");
    else if (normalizedRole === "DONOR") router.push("/dashboard/donor");
    else router.push("/dashboard");
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const token = result.data?.accessToken || result.data?.token;
        const userObj = result.data?.user || result.data;
        const rawRole = userObj?.role || result.data?.role;
        const role = String(rawRole || "").trim().toUpperCase();

        if (!token || !role) {
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


  const handleGoogleLogin = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    window.location.href = `${backendUrl}/api/v1/auth/google`;
  };


  const handleDemoLogin = (role: 'ADMIN' | 'PATIENT' | 'DONOR') => {
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
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-black/40 p-8 border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Welcome Back </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Login to your account</p>
        </div>

      
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

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              {...register("password")}
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
            {errors.password && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 dark:hover:bg-red-500 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-red-200 dark:shadow-none disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

     
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-700"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-slate-900 px-2 text-slate-500 dark:text-slate-400">─── OR ───</span></div>
        </div>

     
        <div className="mb-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 transition-colors shadow-sm text-sm cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.19v3.15C3.17 21.31 7.27 24 12 24z" />
              <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.19C.43 8.13 0 9.87 0 12s.43 3.87 1.19 5.4l4.08-3.16z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.27 0 3.17 2.69 1.19 6.6l4.08 3.15c.95-2.85 3.6-4.96 6.73-4.96z" />
            </svg>
            Continue with Google
          </button>
        </div>

      
        <div>
          <p className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Quick Demo Login</p>
          <div className="flex flex-col gap-2.5">
        
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin("ADMIN")}
                className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-center transition-colors cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Admin</div>
                <span className="text-[10px] text-red-600 dark:text-red-400 font-medium">Demo</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin("PATIENT")}
                className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-center transition-colors cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Patient</div>
                <span className="text-[10px] text-red-600 dark:text-red-400 font-medium">Demo</span>
              </button>
            </div>

    
            <button
              type="button"
              onClick={() => handleDemoLogin("DONOR")}
              className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl text-center transition-colors cursor-pointer"
            >
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Donor</div>
              <span className="text-[10px] text-red-600 dark:text-red-400 font-medium">Demo</span>
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link href="/Register" className="text-red-600 dark:text-red-400 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}