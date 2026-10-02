"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";

const blogTopicsData: Record<string, any> = {
  "1": {
    title: "Importance of Regular Blood Donation",
    fullContent: "Regular blood donation not only saves lives of patients undergoing surgeries, trauma care, and chronic illnesses, but it also benefits the donor. It helps reduce iron overload, improves heart health, and stimulates the production of new blood cells. Every healthy adult should donate blood safely every 3 to 4 months.",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1000&auto=format&fit=crop",
    date: "October 02, 2026",
  },
  "2": {
    title: "Who Can Become a Safe Donor?",
    fullContent: "To become a safe donor, you must be between 18 and 60 years old, weigh at least 50 kg, and be in good general health. Before donation, medical staff will check your hemoglobin levels, blood pressure, and pulse to ensure you are fit to donate without any risk to your own health.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
    date: "September 28, 2026",
  },
  "3": {
    title: "Myths and Facts About Donating Blood",
    fullContent: "Many people think donating blood causes permanent weakness or that you can contract infections. This is completely false. All needles and equipment are sterile, single-use, and disposed of immediately. Your body replenishes the lost fluid within 24 hours and red blood cells within a few weeks.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop",
    date: "September 20, 2026",
  },
  "4": {
    title: "Recovery Tips After Donating Blood",
    fullContent: "After donating blood, it is essential to rest for 10-15 minutes and enjoy the refreshments provided. Drink plenty of water and fluids over the next 24-48 hours. Avoid heavy lifting, intense workouts, or standing in direct sunlight for long periods on the day of your donation.",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1000&auto=format&fit=crop",
    date: "September 15, 2026",
  },
};

export default function BlogDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const blog = blogTopicsData[id];

  if (!blog) {
    return (
      <div className="text-center py-24 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Blog not found!</h2>
        <button 
          onClick={() => router.back()}
          className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <button 
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-extrabold text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blogs
      </button>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Calendar className="w-4 h-4 text-red-600" /> {blog.date}
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          {blog.title}
        </h1>
      </div>

      <div className="w-full h-80 rounded-3xl overflow-hidden shadow-md">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-sm font-medium text-slate-700 leading-relaxed">
        <p>{blog.fullContent}</p>
        <p>
          Blood donation is a noble act that connects humanity. By sharing awareness and educating people through these articles, we can build a stronger and healthier community together.
        </p>
      </div>
    </div>
  );
}