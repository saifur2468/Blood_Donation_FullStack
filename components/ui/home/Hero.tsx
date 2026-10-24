"use client";

import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Droplets, MoveRight, Search, Users, HeartHandshake, FileText } from "lucide-react";
import axios from "axios";

// Features updated for Blood Donation
const features = [
  "Save a Life Today",
  "Find Nearby Donors",
  "Urgent Blood Requests",
  "Easy Registration",
];

export default function Hero() {
  const [showFeatures, setShowFeatures] = useState(false);
  const [stats, setStats] = useState({
    totalDonors: 23,
    totalBloodRequests: 18,
    totalUsers: 35,
  });
  const [loading, setLoading] = useState(true);

  // Toggle features text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowFeatures((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Fetch Live Stats from Admin Reports API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("accessToken")
            : null;
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL ||
          "https://l2-a6-blood-donation.vercel.app";

        const res = await axios.get(`${backendUrl}/api/v1/admin/reports`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const reportData = res.data?.data || res.data;
        if (reportData && typeof reportData === "object") {
          setStats({
            totalDonors: reportData.totalDonors ?? 23,
            totalBloodRequests: reportData.totalBloodRequests ?? 18,
            totalUsers: reportData.totalUsers ?? 35,
          });
        }
      } catch (err) {
        console.error("Error fetching live stats for Hero section:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  
return (
  <section className="relative isolate overflow-hidden bg-white">
    {/* Background */}
    <div
      className="absolute inset-0 -z-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/img/bloodbank1.jpg')" }}
    />

    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/90 to-rose-50/70" />

    <div className="mx-auto flex min-h-[480px] max-w-7xl flex-col justify-center px-5 py-9 sm:px-8 sm:py-10 lg:min-h-[510px] lg:px-10">
      <div className="max-w-3xl">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-white/90 px-3 py-1.5 text-xs font-semibold text-red-700 shadow-sm sm:text-sm"
        >
          <Droplets className="h-4 w-4 text-red-500" />
          Become a Hero in Someone's Life
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          The Gift of Blood is
          <br />
          <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-500 bg-clip-text text-transparent">
            <Typewriter
              words={["The Gift of Life.", "Hope for Someone."]}
              loop
              typeSpeed={65}
              deleteSpeed={35}
              delaySpeed={1800}
            />
          </span>
        </motion.h1>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 max-w-xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7"
        >
          Join{" "}
          <span className="font-bold text-red-600">LifeDrop</span>{" "}
          to connect blood donors with people in need. Your one
          donation can help save a life.
        </motion.p>

        {/* Compact Features */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {features.map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 sm:text-sm"
            >
              <Check className="h-4 w-4 shrink-0 text-red-600" />
              {feature}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="/Register"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-red-200 transition hover:-translate-y-0.5 hover:bg-red-700"
          >
            Register Now
            <MoveRight className="h-4 w-4" />
          </a>

          <a
            href="/bloodrequest"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/90 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            <Search className="h-4 w-4" />
            Create Blood Request
          </a>
        </motion.div>

        {/* Stats - Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-7 grid max-w-2xl grid-cols-3 gap-3 border-t border-red-100 pt-5 sm:gap-5"
        >
          {/* Total Donors */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 sm:h-11 sm:w-11">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:text-xs">
                Total Donors
              </p>
              <h4 className="text-lg font-extrabold text-gray-900 sm:text-2xl">
                {loading ? "..." : `${stats.totalDonors}+`}
              </h4>
            </div>
          </div>

          {/* Blood Requests */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 sm:h-11 sm:w-11">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:text-xs">
                Blood Requests
              </p>
              <h4 className="text-lg font-extrabold text-gray-900 sm:text-2xl">
                {loading ? "..." : stats.totalBloodRequests}
              </h4>
            </div>
          </div>

          {/* Active Users */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 sm:h-11 sm:w-11">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:text-xs">
                Active Users
              </p>
              <h4 className="text-lg font-extrabold text-gray-900 sm:text-2xl">
                {loading ? "..." : stats.totalUsers}
              </h4>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
}


