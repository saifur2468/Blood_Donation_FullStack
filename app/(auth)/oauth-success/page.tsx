"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function OAuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // ব্যাকএন্ড থেকে টোকেনটি 'token' বা 'accessToken' যে নামেই আসুক না কেন, তা ধরার ব্যবস্থা:
  const token = searchParams.get("token") || searchParams.get("accessToken");

  useEffect(() => {
    if (token) {
      // ১. টোকেন লোকাল স্টোরেজে সেভ করা
      localStorage.setItem("accessToken", token);
      
      // ২. সফলভাবে ড্যাশবোর্ডে রিডাইরেক্ট করা
      window.location.href = "/dashboard"; 
    } else {
      // টোকেন না থাকলে বা ভুল হলে লগইন পেজে পাঠিয়ে দেওয়া
      router.push("/auth/login");
    }
  }, [token, router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent mb-3"></div>
        <p className="text-lg font-medium text-slate-600 dark:text-slate-300">Google login successful, redirecting...</p>
      </div>
    </div>
  );
}

export default function OAuthSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    }>
      <OAuthSuccessContent />
    </Suspense>
  );
}