"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const role = (localStorage.getItem("userRole") || "PATIENT").toUpperCase();

    switch (role) {
      case "ADMIN":
        router.replace("/dashboard/admin");
        break;
      case "DONOR":
        router.replace("/dashboard/donor");
        break;
      case "PATIENT":
      default:
        router.replace("/dashboard/patient");
        break;
    }
  }, [router]);

  return (
   <div className="flex h-64 items-center justify-center text-slate-500 dark:text-slate-400">
  Redirecting to your dashboard...
</div>
  );
}