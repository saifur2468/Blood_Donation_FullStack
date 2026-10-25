// "use client";

// import React from "react";
// import {
//   Heart,
//   Activity,
//   Smile,
//   RefreshCw,
//   ShieldCheck,
//   Clock,
//   Check,
//   X,
// } from "lucide-react";

// const benefits = [
//   {
//     id: 1,
//     title: "Free Health Check-Up",
//     description:
//       "Get a free mini health check-up, including blood pressure, hemoglobin and other important tests.",
//     icon: Activity,
//   },
//   {
//     id: 2,
//     title: "Improved Heart Health",
//     description:
//       "Regular donation helps maintain healthy blood circulation and reduces the risk of heart disease.",
//     icon: Heart,
//   },
//   {
//     id: 3,
//     title: "Better Mental Health",
//     description:
//       "Helping others gives a sense of purpose, reduces stress and boosts overall happiness.",
//     icon: Smile,
//   },
//   {
//     id: 4,
//     title: "New Blood Cells",
//     description:
//       "Your body quickly replaces the donated blood, keeping your blood cells fresh and healthy.",
//     icon: RefreshCw,
//   },
//   {
//     id: 5,
//     title: "Lower Cancer Risk",
//     description:
//       "Regular donation may help reduce the risk of certain cancers, like liver and stomach cancer.",
//     icon: ShieldCheck,
//   },
//   {
//     id: 6,
//     title: "Extended Life Span",
//     description:
//       "Studies show that regular blood donors tend to live longer and healthier lives.",
//     icon: Clock,
//   },
// ];

// const stats = [
//   { value: "3 lives", label: "Helped by one donation" },
//   { value: "350–450 ml", label: "Blood taken each time" },
//   { value: "10–15 min", label: "Donation time" },
//   { value: "3–4 months", label: "Gap between donations" },
// ];

// const canDonate = [
//   "Age 18 to 60 years",
//   "Weight 50 kg or more",
//   "Hemoglobin at least 12.5 g/dL",
//   "Feeling healthy today",
// ];

// const cannotDonate = [
//   "Fever, cold or infection",
//   "Pregnant or breastfeeding",
//   "Hepatitis B/C, HIV",
//   "Recent surgery, tattoo or piercing",
// ];

// const steps = [
//   { title: "Register", text: "Fill in a short form with your details." },
//   { title: "Quick screening", text: "Blood pressure, pulse and hemoglobin check." },
//   { title: "Donate", text: "Rest comfortably while one bag is collected." },
//   { title: "Rest and refresh", text: "Relax 10–15 minutes with a drink and snack." },
// ];

// const compatibility = [
//   { type: "O−", to: "Everyone" },
//   { type: "O+", to: "O+, A+, B+, AB+" },
//   { type: "A−", to: "A−, A+, AB−, AB+" },
//   { type: "A+", to: "A+, AB+" },
//   { type: "B−", to: "B−, B+, AB−, AB+" },
//   { type: "B+", to: "B+, AB+" },
//   { type: "AB−", to: "AB−, AB+" },
//   { type: "AB+", to: "AB+ only" },
// ];

// export default function HealthBenefitsSection() {
//   return (
//     <section className="relative bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Header Section */}
//         <div className="text-center space-y-3 max-w-2xl mx-auto mb-14">
//           <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
//             Health Benefits of{" "}
//             <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
//               Donating Blood
//             </span>
//           </h2>
//           <p className="text-sm sm:text-base text-slate-500 font-medium">
//             Blood donation is not just about helping others — it also brings
//             many health benefits to you. Here are some key advantages:
//           </p>
//         </div>

//         {/* Main Content Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
//           {/* Left Side: Benefits List */}
//           <div className="lg:col-span-7 bg-slate-50/70 border border-slate-200/80 rounded-3xl p-5 sm:p-8 shadow-sm space-y-4">
//             {benefits.map((item) => {
//               const IconComponent = item.icon;
//               return (
//                 <div
//                   key={item.id}
//                   className="group relative flex items-start gap-4 sm:gap-5 p-4 rounded-2xl bg-white border border-slate-100 hover:border-red-200 hover:shadow-md transition-all duration-300 overflow-hidden"
//                 >
//                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 transition duration-300" />

//                   <div className="w-12 h-12 shrink-0 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition duration-300">
//                     <IconComponent className="w-6 h-6" />
//                   </div>

//                   <div className="space-y-1 flex-1 min-w-0">
//                     <div className="flex items-center gap-2.5">
//                       <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-600 text-[11px] font-extrabold shrink-0">
//                         {item.id}
//                       </span>
//                       <h3 className="text-base sm:text-lg font-extrabold text-slate-800 group-hover:text-red-600 transition">
//                         {item.title}
//                       </h3>
//                     </div>
//                     <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed pl-7">
//                       {item.description}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Right Side: Donor Information */}
//           <div className="lg:col-span-5 space-y-5">
//             {/* Quick facts */}
//             <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200">
//               {stats.map((s) => (
//                 <div key={s.label} className="bg-white px-4 py-5 text-center">
//                   <dt className="text-lg sm:text-xl font-extrabold text-red-600">
//                     {s.value}
//                   </dt>
//                   <dd className="mt-1 text-xs text-slate-500 font-medium">
//                     {s.label}
//                   </dd>
//                 </div>
//               ))}
//             </dl>

         

          
           

//             {/* Blood group compatibility */}
//             <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
//               <h3 className="text-lg font-extrabold text-slate-800">
//                 Who can your blood help?
//               </h3>
//               <p className="mt-1 text-sm text-slate-500">
//                 Red blood cells can be given to these groups.
//               </p>
//               <div className="mt-4 grid grid-cols-2 gap-3">
//                 {compatibility.map((c) => (
//                   <div key={c.type} className="rounded-xl bg-slate-50 px-4 py-3">
//                     <p className="text-base font-extrabold text-red-600">{c.type}</p>
//                     <p className="mt-0.5 text-xs text-slate-500">{c.to}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA */}
//         <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl bg-red-600 px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10">
//           <div>
//             <h3 className="text-2xl font-extrabold">Ready to save a life?</h3>
//             <p className="mt-1 max-w-xl text-sm text-red-100">
//               One donation takes less than an hour from start to finish. Sign up
//               and we will connect you with people who need your blood group.
//             </p>
//           </div>
//           <a
//             href="/Register"
//             className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-bold text-red-700 transition-colors hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-600"
//           >
//             Become a donor
//           </a>
//         </div>

//         <p className="mt-6 text-center text-xs text-slate-400">
//           General guidance, not medical advice. Talk to a doctor if you have a
//           health condition or take regular medicine.
//         </p>
//       </div>
//     </section>
//   );
// }




















'use client'
import React, { useState, } from 'react';
import { 
  Heart, 
  Activity, 
  Smile, 
  RefreshCw, 
  ShieldAlert, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';

const benefitsData = [
  {
    id: "01",
    title: "Free Health Check-Up",
    description: "Get a free mini health check-up, including blood pressure, hemoglobin and other important tests.",
    icon: Activity,
    highlightColor: "from-rose-500/10 to-red-500/5",
    accentColor: "#E11D48"
  },
  {
    id: "02",
    title: "Improved Heart Health",
    description: "Regular donation helps maintain healthy blood circulation and reduces the risk of heart disease.",
    icon: Heart,
    highlightColor: "from-rose-500/10 to-red-500/5",
    accentColor: "#E11D48"
  },
  {
    id: "03",
    title: "Better Mental Health",
    description: "Helping others gives a sense of purpose, reduces stress and boosts overall happiness.",
    icon: Smile,
    highlightColor: "from-rose-500/10 to-red-500/5",
    accentColor: "#E11D48"
  },
  {
    id: "04",
    title: "New Blood Cells",
    description: "Your body quickly replaces the donated blood, keeping your blood cells fresh and healthy.",
    icon: RefreshCw,
    highlightColor: "from-rose-500/10 to-red-500/5",
    accentColor: "#E11D48"
  },
  {
    id: "05",
    title: "Lower Cancer Risk",
    description: "Regular donation may help reduce the risk of certain cancers, like liver and stomach cancer.",
    icon: ShieldAlert,
    highlightColor: "from-rose-500/10 to-red-500/5",
    accentColor: "#E11D48"
  },
  {
    id: "06",
    title: "Extended Life Span",
    description: "Studies show that regular blood donors tend to live longer and healthier lives.",
    icon: Clock,
    highlightColor: "from-rose-500/10 to-red-500/5",
    accentColor: "#E11D48"
  }
];

export default function App() {
  const [activeCard, setActiveCard] = useState(0); // Card '01' active by default like in image
  const [eligibilityModalOpen, setEligibilityModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  return (
    <div className="min-h-screen  text-slate-900 flex flex-col justify-center items-center p-4 sm:p-8 font-sans selection:bg-red-500 selection:text-white">
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
      {/* Container */}
      <div className="max-w-6xl w-full mx-auto space-y-8">
 
        {/* Header section (Subtle context intro) */}
        <div className="text-center md:text-right max-w-xl ml-auto pr-2 pb-2">
          {/* <p className="text-sm font-medium text-slate-500 tracking-wide">
            Good things for your own body and mind too.
          </p> */}
        </div>

        {/* Grid Container */}
        <div className="bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-slate-100">
            {benefitsData.map((benefit, index) => {
              const IconComponent = benefit.icon;
              const isActive = activeCard === index;

              return (
                <div
                  key={benefit.id}
                  onMouseEnter={() => setActiveCard(index)}
                  className={`
                    relative p-8 sm:p-10 transition-all duration-300 cursor-pointer group flex flex-col justify-between
                    ${index >= 3 ? 'border-t border-slate-200' : ''}
                    ${index % 3 !== 0 ? 'md:border-l border-slate-200' : ''}
                    ${isActive ? 'bg-red-50/70 shadow-inner' : 'bg-white hover:bg-slate-50/80'}
                  `}
                >
                  {/* Top Red Accent Line */}
                  <div
                    className={`
                      absolute top-0 left-0 right-0 h-1 bg-red-600 transition-all duration-300 ease-out
                      ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'}
                    `}
                  />

                  <div>
                    {/* Big Bold Number */}
                    <div className="flex items-center justify-between mb-6">
                      <span className={`
                        text-5xl font-black tracking-tight transition-transform duration-300 ease-out group-hover:scale-105 inline-block
                        ${isActive ? 'text-red-600' : 'text-red-600'}
                      `}>
                        {benefit.id}
                      </span>
                      <div className={`
                        p-2.5 rounded-full transition-all duration-300
                        ${isActive ? 'bg-red-100 text-red-600 rotate-12' : 'bg-slate-100 text-slate-400 group-hover:bg-red-50 group-hover:text-red-500'}
                      `}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-3 group-hover:text-red-600 transition-colors">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Subtle Learn More indicator on hover */}
                  <div className={`
                    mt-6 flex items-center text-xs font-semibold text-red-600 transition-all duration-300
                    ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}
                  `}>
                    <span>Learn how it works</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-[#11161B] text-white rounded-2xl p-6 sm:p-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-slate-900/20 border border-slate-800">
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to give the <span className="text-red-500 underline decoration-red-500/30 decoration-wavy underline-offset-4">gift of life?</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Your single donation can save up to three lives.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Check Eligibility Button */}
            <button
              onClick={() => setEligibilityModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-600 hover:border-slate-400 text-white font-medium text-sm transition-all duration-200 hover:bg-slate-800/80 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400/50 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-400" />
              Check Eligibility
            </button>

            {/* Book an Appointment Button */}
            <button
              onClick={() => setAppointmentModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/50 flex items-center justify-center gap-2 group"
            >
              <Calendar className="w-4 h-4" />
              <span>Find Donor</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>


    </div>
  );
}