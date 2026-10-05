"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { showToast } from "@/components/ui/toast";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const role = searchParams.get("role");

    if (token) {
      localStorage.setItem("accessToken", token);
      if (role) localStorage.setItem("userRole", role);
      
      showToast("Google Login Successful!", "success");
      
      if (role === "ADMIN") router.push("/admin/dashboard");
      else if (role === "PROVIDER") router.push("/provider/dashboard");
      else router.push("/");
    } else {

      showToast("Google Login Successful!", "success");
      router.push("/");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h2 className="text-xl font-semibold text-slate-800">Logging you in with Google...</h2>
        <p className="text-sm text-slate-500">Doya kore ektu opekkha korun.</p>
      </div>
    </div>
  );
}