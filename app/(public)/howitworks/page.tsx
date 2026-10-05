"use client";

import { useState } from "react";
import { ArrowRight, Droplets, Heart, UserPlus, Search, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create a Blood Request",
    description:
      "Tell us your blood group, hospital location, and urgency so we can broadcast it to donors instantly.",
  },
  {
    number: "02",
    title: "Find a Matching Donor",
    description:
      "Our system automatically connects your request with available, verified blood donors nearby.",
  },
  {
    number: "03",
    title: "Donate & Save a Life",
    description:
      "Connect with the donor securely, complete the donation process, and help save a precious life.",
  },
];

export default function HowItWorks() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <section className="relative overflow-hidden bg-white text-slate-900 transition-colors duration-500 dark:bg-[#080808] dark:text-white">
      
      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-red-500/5 blur-[120px] dark:bg-red-500/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
        
        {/* Top Control if needed */}
        <div className="flex justify-between items-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-500">
            <ShieldCheck className="h-4 w-4" />
            Simple & Fast Process
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
          
          {/* ================= LEFT SIDE: Heading & Illustration ================= */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] leading-[1.1]">
                Get Started In <br />
                <span className="text-red-500">Minutes.</span>
              </h2>
              
              <p className="mt-6 text-base text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
                Whether you need urgent blood or want to register as a donor, our platform makes the connection seamless and transparent.
              </p>
            </div>

            {/* Custom SVG Illustration for Blood Donation Theme */}
            <div className="mt-12 relative w-full max-w-[380px] hidden sm:block">
              <div className="relative rounded-3xl border border-red-500/10 bg-gradient-to-b from-red-500/5 to-transparent p-6 dark:border-red-500/20">
                <div className="flex items-center gap-4">
                  <div >
                    <Heart className="h-7 w-7 fill-current text-red-600 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      24/7 Emergency Support
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Real-time donor tracking & emergency broadcast system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE: Curved Flow & Steps ================= */}
          <div className="lg:col-span-7 relative">
            
            {/* Curved Connecting Line (Like reference image) */}
            <div className="pointer-events-none absolute -left-6 lg:left-[22px] top-[40px] hidden sm:block h-[calc(100%-80px)] w-[100px]">
              <svg viewBox="0 0 100 450" fill="none" className="h-full w-full">
                <path
                  d="M10 0 C90 100, 90 225, 10 350 C-30 400, 20 440, 50 450"
                  className="stroke-red-500/30 dark:stroke-red-500/40"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>

            {/* Steps Stack */}
            <div className="space-y-10 relative">
              {steps.map((step) => (
                <div 
                  key={step.number}
                  className="group relative flex items-start gap-6 sm:gap-8 rounded-2xl p-4 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                >
                  {/* Number Badge */}
                  <div className="relative z-10 flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-base sm:text-lg font-bold text-slate-700 shadow-md transition-all duration-300 group-hover:border-red-500 group-hover:bg-red-500 group-hover:text-white group-hover:scale-105 dark:border-white/10 dark:bg-[#121212] dark:text-slate-300 dark:group-hover:bg-red-500 dark:group-hover:border-red-500 dark:group-hover:text-white">
                    {step.number}
                  </div>

                  {/* Step Content */}
                  <div className="pt-2">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-red-500 transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}