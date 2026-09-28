"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Droplets } from "lucide-react";


const bloodGroups = [
  { group: "A+", type: "Positive" },
  { group: "A-", type: "Negative" },
  { group: "B+", type: "Positive" },
  { group: "B-", type: "Negative" },
  { group: "O+", type: "Positive" },
  { group: "O-", type: "Negative" },
  { group: "AB+", type: "Positive" },
  { group: "AB-", type: "Negative" },
];

export default function BloodGroupSection() {
  return (
    <section className="py-16   ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 mb-3 uppercase tracking-wider">
            <Droplets className="w-3.5 h-3.5" />
            Find By Blood Group
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Search Donors by Blood Type
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Select your required blood group below to quickly find available donors or urgent requests in your area.
          </p>
        </div>

        {/* Blood Group Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {bloodGroups.map((item, index) => (
            <motion.div
              key={item.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                href={`/requests?bloodGroup=${encodeURIComponent(item.group)}`}
                className="group relative flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-red-500 hover:bg-red-50/30 transition-all duration-300"
              >
                {/* Blood Drop Icon Background Effect */}
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-lg mb-3 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-inner">
                  {item.group}
                </div>

                <span className="text-xs font-medium text-slate-500 group-hover:text-red-700 transition-colors">
                  {item.type}
                </span>

                {/* Subtle Arrow or Indicator on hover */}
                <span className="absolute bottom-2 opacity-0 group-hover:opacity-100 text-xs font-semibold text-red-600 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  Find &rarr;
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}