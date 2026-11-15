"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, User, MessageSquare } from "lucide-react";

export default function BlogsPage() {
  const blogTopics = [
    {
      id: "1",
      title: "Importance of Regular Blood Donation",
      description:
        "Regular blood donation is one of the simplest and most meaningful ways to help save lives. Every day, hospitals and healthcare centers need blood for patients suffering from accidents, major surgeries, cancer, severe anemia, and pregnancy complications.",
      image:
        "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1000&auto=format&fit=crop",
      date: "October 02, 2026",
      author: "Dr. Saifur Rahman",
      category: "HEALTH & TIPS",
      comments: 0,
    },
    {
      id: "2",
      title: "Who Can Become a Safe Blood Donor?",
      description:
        "Learn about the basic eligibility criteria, weight requirements, and health checks needed before donating blood...",
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop",
      date: "September 28, 2026",
      author: "Red Cross Team",
      category: "DONOR GUIDE",
      comments: 0,
    },
    {
      id: "3",
      title: "Myths and Facts About Donating Blood",
      description:
        "We debunk common misconceptions about weakness, pain, and safety concerns regarding blood donation...",
      image:
        "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600&auto=format&fit=crop",
      date: "September 20, 2026",
      author: "Health Awareness",
      category: "MYTH BUSTING",
      comments: 0,
    },
    {
      id: "4",
      title: "Recovery Tips After Donating Blood",
      description:
        "Simple diet, hydration, and rest guidelines to follow immediately after your blood donation process...",
      image:
        "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=600&auto=format&fit=crop",
      date: "September 15, 2026",
      author: "Nutrition Care",
      category: "RECOVERY",
      comments: 0,
    },
  ];

  const featuredPost = blogTopics[0];
  const sidePosts = blogTopics.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-end border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            News & Articles
          </h1>
          <p className="text-xs md:text-sm font-medium text-slate-500 mt-1">
            Stay updated with life-saving blood donation insights, tips & health guides.
          </p>
        </div>
      </div>

      {/* Grid Layout: Left Big Card (7 cols), Right List Cards (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Featured Post Card */}
        <div className="lg:col-span-7">
          <Link href={`/Blog/${featuredPost.id}`} className="group block relative">
            <div className="relative w-full h-[430px] rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-75"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              {/* Top Category & Date */}
              <div className="absolute top-5 left-5 flex items-center gap-3">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {featuredPost.category}
                </span>
                <span className="text-slate-200 text-xs font-semibold flex items-center gap-1.5 drop-shadow-sm">
                  <Calendar className="w-3.5 h-3.5" /> {featuredPost.date}
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                <h2 className="text-xl md:text-2xl font-extrabold text-white group-hover:text-red-400 transition leading-snug">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed max-w-xl">
                  {featuredPost.description}
                </p>

                {/* Footer Meta: Author & Read Article Button */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-700/60 text-slate-300 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white font-bold group-hover:text-red-400 transition">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Right Side: Side List Posts */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {sidePosts.map((post) => (
            <Link
              key={post.id}
              href={`/Blog/${post.id}`}
              className="group bg-white border border-slate-100 p-3.5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center gap-4"
            >
              {/* Thumbnail Image */}
              <div className="relative w-28 h-24 sm:w-32 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Post Info */}
              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 text-[11px] font-bold text-red-600">
                  <span>{post.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400 font-medium">{post.date}</span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-800 group-hover:text-red-600 transition line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-1">
                  {post.description}
                </p>

                {/* Meta details */}
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> {post.comments}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}