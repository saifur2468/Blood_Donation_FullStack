'use client';

import React, { useState } from 'react';
import {
  Check,
  AlertCircle,
  Heart,
  ArrowRight,
  Sparkles,
  Calendar,
  ShieldCheck,
  Droplets,
  Activity
} from 'lucide-react';

// Blood Compatibility Data
const bloodGroups = [
  { group: 'O-', canGiveTo: 'Everyone', note: 'Universal Donor', highlight: true },
  { group: 'O+', canGiveTo: 'O+, A+, B+, AB+', note: 'Most Common' },
  { group: 'A-', canGiveTo: 'A-, A+, AB-, AB+', note: 'High Demand' },
  { group: 'A+', canGiveTo: 'A+, AB+', note: 'Widespread' },
  { group: 'B-', canGiveTo: 'B-, B+, AB-, AB+', note: 'Rare Type' },
  { group: 'B+', canGiveTo: 'B+, AB+', note: 'Common' },
  { group: 'AB-', canGiveTo: 'AB-, AB+', note: 'Very Rare' },
  { group: 'AB+', canGiveTo: 'AB+ only', note: 'Universal Recipient' }
];

// Process Steps Data
const processSteps = [
  {
    step: '01',
    title: 'Register',
    description: 'Fill in a short digital form with your basic details and medical history.',
    time: '~5 mins'
  },
  {
    step: '02',
    title: 'Quick Screening',
    description: 'Check blood pressure, pulse, temperature, and hemoglobin level.',
    time: '~10 mins'
  },
  {
    step: '03',
    title: 'Donate Blood',
    description: 'Rest comfortably on a cozy couch while one unit of blood is collected.',
    time: '~8-10 mins'
  },
  {
    step: '04',
    title: 'Rest & Refresh',
    description: 'Relax 10–15 minutes while enjoying complimentary drinks and snacks.',
    time: '~15 mins'
  }
];

// Statistics Data
const statsData = [
  { value: '3 lives', label: 'Saved by one donation', icon: Heart },
  { value: '350–450 ml', label: 'Standard donation volume', icon: Droplets },
  { value: '10–15 min', label: 'Average donation time', icon: Activity },
  { value: '3–4 months', label: 'Gap between donations', icon: Calendar }
];

export default function BloodDonationSection() {
  const [selectedBlood, setSelectedBlood] = useState('O-');
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const currentBloodInfo = bloodGroups.find(bg => bg.group === selectedBlood) || bloodGroups[0];

  return (
    <div className="min-h-screen text-slate-900 font-sans antialiased py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-28">

        {/* ================= SECTION 1: WHO CAN DONATE BLOOD? ================= */}
        <section className="space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
              Who can <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">donate blood?</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-3">
              Most healthy adults can give blood. Here are the main general guidelines you need to know.
            </p>
          </div>

          {/* Top Requirements Grid (3 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Age Requirement */}
            <div className="relative overflow-hidden bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-600 transition-colors">
                Age Requirement
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-red-600 mt-3 mb-2 tracking-tight group-hover:translate-x-1 transition-transform">
                Usually 18+
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                The minimum and maximum eligible age depend on local blood donation guidelines and center policies.
              </p>
            </div>

            {/* Weight Requirement */}
            <div className="relative overflow-hidden bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-600 transition-colors">
                Weight Requirement
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-red-600 mt-3 mb-2 tracking-tight group-hover:translate-x-1 transition-transform">
                Often 50 kg+
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Many donation centers require at least 50 kg (110 lbs) for a standard whole blood donation safety.
              </p>
            </div>

            {/* Good Health */}
            <div className="relative overflow-hidden bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-600 transition-colors">
                Good Health
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-red-600 mt-3 mb-2 tracking-tight group-hover:translate-x-1 transition-transform">
                Fit & Healthy
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                You should feel well on the day and pass the required health screen and hemoglobin testing.
              </p>
            </div>
          </div>

          {/* Bottom Info Grid (3 Cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1: Before You Donate */}
            <div className="bg-gradient-to-br from-red-50/90 via-red-50/40 to-white rounded-3xl p-8 border border-red-100/80 shadow-sm hover:shadow-lg transition-all duration-300">
              <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-6 shadow-sm shadow-red-600/30">
                Before You Donate
              </span>
              <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
                Prepare for your donation
              </h3>
              <ul className="space-y-4">
                {[
                  "Eat a healthy, iron-rich meal before donating.",
                  "Drink plenty of fluids (water or juice) before your visit.",
                  "Get a good night's sleep of 7-8 hours prior to donation.",
                  "Avoid alcohol and heavy exercises right before donation."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="bg-red-600 text-white rounded-full p-1 flex-shrink-0 mt-0.5 shadow-sm shadow-red-600/20">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: When To Wait */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300">
              <span className="inline-block bg-slate-900 text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-6">
                When To Wait
              </span>
              <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
                You may need medical clearance
              </h3>
              <ul className="space-y-4">
                {[
                  "People who are currently unwell, cold, or have a fever.",
                  "People taking certain prescription medications or antibiotics.",
                  "Pregnant individuals or those temporarily post-childbirth.",
                  "Recent body art, tattoos, or surgical procedures."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="border border-slate-300 text-slate-400 rounded-full p-1 flex-shrink-0 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-600 leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3: Graphic Illustration Card */}
            <div className="relative overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-b from-red-50 to-white p-6 flex flex-col justify-between min-h-[340px] shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="inline-block bg-rose-100 text-rose-700 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                  Why It Matters
                </span>
                <h3 className="text-xl font-bold text-slate-900">Be A Hero Today</h3>
              </div>

              <div className="my-auto flex justify-center items-center py-4">
                <img
                  src="/img/Screenshot 2026-10-24 203537.png"
                  alt="Blood Donation Illustration"
                  className="w-48 h-auto object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-red-100 shadow-sm">
                <p className="font-mono text-xs text-red-600 font-bold uppercase tracking-wider"> LIFE SAVER</p>
                <p className="text-xs text-slate-600 font-medium">1 single donation can save up to 3 human lives.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: WHAT HAPPENS ON THE DAY ================= */}
        <section className="space-y-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-0.5 w-6 bg-red-600 inline-block rounded-full"></span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-red-600">
                THE PROCESS
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
              What happens <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">on the day</span>
            </h2>
          </div>

          {/* Process Stepper */}
          <div className="relative pt-4">
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-red-200 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {processSteps.map((step, index) => {
                const isHovered = hoveredStep === index;
                return (
                  <div
                    key={step.step}
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className="flex flex-col items-start group cursor-pointer transition-all duration-300"
                  >
                    <div className={`
                      w-12 h-12 rounded-2xl border-2 flex items-center justify-center font-black text-base mb-5 transition-all duration-300 shadow-sm
                      ${isHovered
                        ? 'border-red-600 bg-red-600 text-white scale-110 shadow-lg shadow-red-600/30 -translate-y-1'
                        : 'border-red-300 bg-white text-red-600 group-hover:border-red-600'}
                    `}>
                      {step.step}
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                        {step.title}
                      </h3>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-semibold">
                        {step.time}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full-width Red Impact Banner */}
          <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-3xl text-white shadow-2xl shadow-red-600/25 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/20 p-8 sm:p-10">
              {statsData.map((stat, i) => {
                const IconComponent = stat.icon;
                return (
                  <div key={i} className="py-5 sm:py-2 px-4 first:pl-0 last:pr-0 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-red-200 mb-2">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-1 text-white">
                      {stat.value}
                    </span>
                    <span className="text-xs sm:text-sm text-red-100/90 font-medium">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: WHO CAN YOUR BLOOD HELP? ================= */}
        <section className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-0.5 w-6 bg-red-600 inline-block rounded-full"></span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-red-600">
                COMPATIBILITY MATRIX
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-2">
              Who can <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">your blood</span> help?
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Select your blood group below to view match details and recipients.
            </p>
          </div>

          {/* Interactive Blood Group Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bloodGroups.map((item) => {
              const isSelected = selectedBlood === item.group;

              return (
                <div
                  key={item.group}
                  onClick={() => setSelectedBlood(item.group)}
                  className={`
                    relative p-6 sm:p-7 rounded-3xl cursor-pointer transition-all duration-300 border flex flex-col justify-between min-h-[150px]
                    ${isSelected
                      ? 'bg-slate-900 text-white border-slate-800 shadow-2xl scale-[1.02] ring-2 ring-red-500/60'
                      : 'bg-white text-slate-900 border-slate-200/80 hover:border-red-300 hover:shadow-xl hover:-translate-y-1'}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <span className={`text-4xl sm:text-5xl font-black tracking-tight ${isSelected ? 'text-red-500' : 'text-red-600'}`}>
                      {item.group}
                    </span>

                    {isSelected ? (
                      <span className="bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full">
                        Selected
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 bg-slate-100 font-semibold px-2 py-0.5 rounded-full">
                        {item.note}
                      </span>
                    )}
                  </div>

                  <div className="mt-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest block mb-1 text-slate-400">
                      CAN GIVE TO
                    </span>
                    <p className={`text-sm sm:text-base font-bold ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                      {item.canGiveTo}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}