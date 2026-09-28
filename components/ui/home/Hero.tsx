"use client";

import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Droplets, MoveRight, Search } from "lucide-react"; 

// Features updated for Blood Donation
const features = [
  "Save a Life Today",
  "Find Nearby Donors",
  "Urgent Blood Requests",
  "Easy Registration",
];

export default function Hero() {
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFeatures((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">
      {/* Background Image - আগের মতোই আছে */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/img/bloodbank1.jpg')",
        }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 -z-10 backdrop-blur-[1px]" />

      {/* Red/Rose Gradient (Changed from Violet/Purple) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/70 to-rose-100/50" />

      {/* Hero Content */}
      <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-10">
        <div className="max-w-2xl">

          {/* Tagline updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50/80 px-4 py-2 text-sm font-medium text-red-700 backdrop-blur-sm"
          >
            <Droplets className="w-4 h-4 text-red-500" />
            Become a Hero in Someone's Life
          </motion.div>

          {/* Main Heading updated */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-gray-950 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span>The Gift of Blood is</span>
            <br />
            {/* Gradient updated to Red */}
            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-500 bg-clip-text text-transparent">
              <Typewriter
                words={["The Gift of Life."]} // Typewriter text updated
                loop={true}
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2500}
              />
            </span>
          </motion.h1>

          {/* Description updated */}
          <div className="mt-7 min-h-[110px] max-w-xl">
            <AnimatePresence mode="wait">
              {!showFeatures ? (
                <motion.p
                  key="description"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.45 }}
                  className="text-base leading-8 text-gray-600 sm:text-lg"
                >
                  Join{" "}
                  <span className="font-semibold text-red-600">
                    BloodLink
                  </span>{" "}
                  today. We connect generous blood donors with patients facing medical emergencies. Every drop counts.
                </motion.p>
              ) : (
                // Features list updated
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.45 }}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.08,
                      }}
                      className="flex items-center gap-3"
                    >
                      {/* Checkmark background color updated to Red */}
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                        <Check />
                      </span>

                      <span className="text-sm font-medium text-gray-700 sm:text-base">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            {/* Primary Button color updated to Red */}
            <a
              href="/register" // Changed to registration
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:bg-red-700"
            >
              Register Now
              <span>
                <MoveRight />
              </span>
            </a>

            {/* Secondary Button color updated */}
            <a
              href="/requests" // Changed to view requests
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-7 py-3.5 text-sm font-semibold text-gray-700 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <span>
                <Search className="w-4 h-4" /> {/* Search icon for finding requests */}
              </span>
              Find Blood Requests
            </a>
          </motion.div>

          {/* Trust Text updated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500"
          >
            <span>✓ Safe & Confidential</span>
            <span>✓ Verified Requests</span>
            <span>✓ 100% Volunteer-based</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}