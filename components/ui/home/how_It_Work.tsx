
"use client";

import React from "react";
import {
  Heart,
  UserRound,
  Scale,
  Activity,
  CheckCircle2,
  XCircle,
  Utensils,
  Droplets,
  Moon,
  ShieldCheck,
  Info,
  ArrowRight,
} from "lucide-react";

const requirements = [
  {
    icon: UserRound,
    title: "Age Requirement",
    value: "Usually 18+",
    description:
      "The minimum and maximum eligible age depend on local blood donation guidelines.",
  },
  {
    icon: Scale,
    title: "Weight Requirement",
    value: "Often 50 kg+",
    description:
      "Many donation centers require at least 50 kg for a standard whole blood donation.",
  },
  {
    icon: Activity,
    title: "Good Health",
    value: "Fit & Healthy",
    description:
      "You should feel well and pass the required health and hemoglobin screening.",
  },
];

const preparationTips = [
  "Eat a healthy meal before donating.",
  "Drink enough water before your appointment.",
  "Get a good night's sleep.",
  "Avoid alcohol before donation and follow the center's advice.",
];

const deferralTips = [
  "People who are currently unwell or have a fever.",
  "People with certain medical conditions or medications.",
  "Pregnant people and those temporarily ineligible after childbirth.",
  "People who need to wait after certain tattoos, piercings or procedures.",
];

export default function BloodDonationGuide() {
  return (
    <section className="relative overflow-hidden  py-16 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-red-100/60 blur-3xl dark:bg-red-950/20" />
      <div className="pointer-events-none absolute -left-32 bottom-20 h-72 w-72 rounded-full bg-rose-100/60 blur-3xl dark:bg-rose-950/20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Who Can{" "}
            <span className="text-red-600 dark:text-red-500">
              Donate Blood?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            A single donation can make a meaningful difference. Learn about
            the basic requirements and how to prepare for a safe donation.
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left content */}
          <div className="space-y-6 lg:col-span-8">
            {/* Requirement cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {requirements.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg hover:shadow-red-100/40 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-red-900 dark:hover:shadow-none"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white dark:bg-red-950/50 dark:text-red-400 dark:group-hover:bg-red-600 dark:group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-xl font-extrabold tracking-tight text-red-600 dark:text-red-400">
                      {item.value}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>

            {/* Preparation and deferral */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Preparation */}
              <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                    <Utensils className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      Before You Donate
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Prepare for your donation
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {preparationTips.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {/* Temporary deferral */}
              <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      When to Wait
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      You may need medical clearance
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {deferralTips.map((tip) => (
                    <li
                      key={tip}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
                    >
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          {/* Right illustration */}
          <aside className="flex flex-col lg:col-span-4">
            <div  >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red-100/70 blur-2xl dark:bg-red-900/20" />

              <div className="relative mb-4 flex items-center gap-2">
                {/* <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
                  <Heart className="h-5 w-5 fill-current" />
                </span>
                <span className="text-sm font-bold text-red-700 dark:text-red-400">
                  Every Drop Matters
                </span> */}
              </div>

              <div className="relative flex flex-1 items-center justify-center py-4">
                <img
                  src="/img/docx-img-1771835316878-arduxu.png"
                  alt="Illustration representing the importance of blood donation"
                  className="h-auto max-h-[360px] w-full rounded-2xl  object-contain"
                  loading="lazy"
                />
              </div>

              {/* <div className="relative mt-4 rounded-2xl border border-red-100 bg-white/90 p-5 dark:border-red-950/70 dark:bg-slate-950/60">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Be someone's hero.
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Your willingness to donate could help someone when they need
                  it most.
                </p>

                <a
                  href="/register"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-red-600/20 transition-all hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  Become a Donor
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div> */}
            </div>
          </aside>
        </div>

        {/* Important note */}
        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50/80 p-5 dark:border-blue-900/50 dark:bg-blue-950/20 sm:p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
            <Info className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              Important to Know
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              These are general guidelines, not a medical eligibility
              decision. Age and weight limits, health conditions, medications
              and waiting periods vary. A qualified blood donation professional
              will determine whether you can donate safely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
