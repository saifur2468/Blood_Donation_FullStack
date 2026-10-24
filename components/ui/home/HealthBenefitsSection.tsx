"use client";

import React from "react";
import {
  Heart,
  Activity,
  Smile,
  RefreshCw,
  ShieldCheck,
  Clock,
  Check,
  X,
} from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "Free Health Check-Up",
    description:
      "Get a free mini health check-up, including blood pressure, hemoglobin and other important tests.",
    icon: Activity,
  },
  {
    id: 2,
    title: "Improved Heart Health",
    description:
      "Regular donation helps maintain healthy blood circulation and reduces the risk of heart disease.",
    icon: Heart,
  },
  {
    id: 3,
    title: "Better Mental Health",
    description:
      "Helping others gives a sense of purpose, reduces stress and boosts overall happiness.",
    icon: Smile,
  },
  {
    id: 4,
    title: "New Blood Cells",
    description:
      "Your body quickly replaces the donated blood, keeping your blood cells fresh and healthy.",
    icon: RefreshCw,
  },
  {
    id: 5,
    title: "Lower Cancer Risk",
    description:
      "Regular donation may help reduce the risk of certain cancers, like liver and stomach cancer.",
    icon: ShieldCheck,
  },
  {
    id: 6,
    title: "Extended Life Span",
    description:
      "Studies show that regular blood donors tend to live longer and healthier lives.",
    icon: Clock,
  },
];

const stats = [
  { value: "3 lives", label: "Helped by one donation" },
  { value: "350–450 ml", label: "Blood taken each time" },
  { value: "10–15 min", label: "Donation time" },
  { value: "3–4 months", label: "Gap between donations" },
];

const canDonate = [
  "Age 18 to 60 years",
  "Weight 50 kg or more",
  "Hemoglobin at least 12.5 g/dL",
  "Feeling healthy today",
];

const cannotDonate = [
  "Fever, cold or infection",
  "Pregnant or breastfeeding",
  "Hepatitis B/C, HIV",
  "Recent surgery, tattoo or piercing",
];

const steps = [
  { title: "Register", text: "Fill in a short form with your details." },
  { title: "Quick screening", text: "Blood pressure, pulse and hemoglobin check." },
  { title: "Donate", text: "Rest comfortably while one bag is collected." },
  { title: "Rest and refresh", text: "Relax 10–15 minutes with a drink and snack." },
];

const compatibility = [
  { type: "O−", to: "Everyone" },
  { type: "O+", to: "O+, A+, B+, AB+" },
  { type: "A−", to: "A−, A+, AB−, AB+" },
  { type: "A+", to: "A+, AB+" },
  { type: "B−", to: "B−, B+, AB−, AB+" },
  { type: "B+", to: "B+, AB+" },
  { type: "AB−", to: "AB−, AB+" },
  { type: "AB+", to: "AB+ only" },
];

export default function HealthBenefitsSection() {
  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Health Benefits of{" "}
            <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              Donating Blood
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            Blood donation is not just about helping others — it also brings
            many health benefits to you. Here are some key advantages:
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Side: Benefits List */}
          <div className="lg:col-span-7 bg-slate-50/70 border border-slate-200/80 rounded-3xl p-5 sm:p-8 shadow-sm space-y-4">
            {benefits.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="group relative flex items-start gap-4 sm:gap-5 p-4 rounded-2xl bg-white border border-slate-100 hover:border-red-200 hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 transition duration-300" />

                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-600 text-[11px] font-extrabold shrink-0">
                        {item.id}
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-800 group-hover:text-red-600 transition">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed pl-7">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Donor Information */}
          <div className="lg:col-span-5 space-y-5">
            {/* Quick facts */}
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200">
              {stats.map((s) => (
                <div key={s.label} className="bg-white px-4 py-5 text-center">
                  <dt className="text-lg sm:text-xl font-extrabold text-red-600">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs text-slate-500 font-medium">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>

         

          
           

            {/* Blood group compatibility */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
              <h3 className="text-lg font-extrabold text-slate-800">
                Who can your blood help?
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Red blood cells can be given to these groups.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {compatibility.map((c) => (
                  <div key={c.type} className="rounded-xl bg-slate-50 px-4 py-3">
                    <p className="text-base font-extrabold text-red-600">{c.type}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{c.to}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl bg-red-600 px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10">
          <div>
            <h3 className="text-2xl font-extrabold">Ready to save a life?</h3>
            <p className="mt-1 max-w-xl text-sm text-red-100">
              One donation takes less than an hour from start to finish. Sign up
              and we will connect you with people who need your blood group.
            </p>
          </div>
          <a
            href="/Register"
            className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-bold text-red-700 transition-colors hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-600"
          >
            Become a donor
          </a>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          General guidance, not medical advice. Talk to a doctor if you have a
          health condition or take regular medicine.
        </p>
      </div>
    </section>
  );
}