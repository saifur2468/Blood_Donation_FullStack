"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";

export default function BlogsPage() {
  const blogTopics = [
    {
      id: "1",
      title: "Importance of Regular Blood Donation",
      description: "Regular blood donation is one of the simplest and most meaningful ways to help save lives. Every day, hospitals and healthcare centers need blood for patients suffering from accidents, major surgeries, cancer, severe anemia, pregnancy  more than one patient because donated blood can be separated into different components, such as red blood cells, plasma, and platelets. Each component can be used to treat different medical conditions.Regular donation  difference without requiring extraordinary effort. A few minutes of your time can provide hope to someone facing a life-threatening situation. By donating regularly and encouraging others to participate, we can help ensure that blood is available when patients need it most.",
      image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=600&auto=format&fit=crop",
      date: "October 02, 2026",
    },
    {
      id: "2",
      title: "Who Can Become a Safe Donor?",
      description: "Learn about the basic eligibility criteria, weight requirements, and health checks needed before donating blood...",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop",
      date: "September 28, 2026",
    },
    {
      id: "3",
      title: "Myths and Facts About Donating Blood",
      description: "We debunk common misconceptions about weakness, pain, and safety concerns regarding blood donation...",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600&auto=format&fit=crop",
      date: "September 20, 2026",
    },
    {
      id: "4",
      title: "Recovery Tips After Donating Blood",
      description: "Simple diet, hydration, and rest guidelines to follow immediately after your blood donation process...",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=600&auto=format&fit=crop",
      date: "September 15, 2026",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" /> Our Blog & Articles
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          Latest Health Tips & Updates
        </h1>
        <p className="text-sm font-medium text-slate-500 max-w-xl mx-auto">
          Explore informative articles about blood donation, community support, and healthy lifestyle habits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogTopics.map((blog) => (
          <div 
            key={blog.id} 
            className="bg-slate-100 border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-red-600 shadow-inner group">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-600">
                <Calendar className="w-3.5 h-3.5" /> {blog.date}
              </div>
              <h2 className="text-lg font-extrabold text-slate-800 line-clamp-1">
                {blog.title}
              </h2>
              <p className="text-xs font-medium text-slate-600 line-clamp-2">
                {blog.description}
              </p>
            </div>

            <div>
              <Link 
                href={`/Blog/${blog.id}`}
                className="w-full py-3 px-4 bg-white hover:bg-red-600 hover:text-white text-slate-800 border border-slate-200 rounded-xl font-extrabold text-xs transition duration-300 flex items-center justify-center gap-2 shadow-xs group"
              >
                <span>Read More Button</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}