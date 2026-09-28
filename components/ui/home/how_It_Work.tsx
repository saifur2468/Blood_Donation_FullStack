import React from 'react';
import { UserPlus, Search, HeartHandshake } from 'lucide-react';

const steps = [
  {
 
    icon: <UserPlus className="w-8 h-8 text-red-600" />,
    title: "Register & Profile Setup",
    description: "Create your free account as a donor, patient, or volunteer. Update your blood group, district, and contact information securely."
  },
  {
    
    icon: <Search className="w-8 h-8 text-red-600" />,
    title: "Search or Post Request",
    description: "Need blood? Post an emergency request with hospital details. Want to donate? Find nearby patients who match your blood group instantly."
  },
  {
   
    icon: <HeartHandshake className="w-8 h-8 text-red-600" />,
    title: "Connect & Save Life",
    description: "Connect directly with verified donors or patients via phone or live chat, coordinate the donation, and help save a precious life."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        {/* <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-red-600">
          SIMPLE PROCESS
        </span> */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-red-600 mb-4 tracking-tight">
          How BloodLink Works
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          We’ve made the process of finding and donating blood as fast, safe, and transparent as possible in just 3 simple steps.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((item, index) => (
          <div 
            key={index} 
            className="bg-slate-50 border border-gray-200/80 rounded-3xl p-8 relative flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all duration-300"
          >
            {/* Step Number Badge */}
            <span className="absolute top-6 right-6 text-2xl font-black text-gray-200 group-hover:text-red-100 transition-colors">
              {item.step}
            </span>

            {/* Icon Box */}
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
              {/* Note: Icon color will invert nicely if styled properly, or use standard wrapper */}
              <div className="text-red-600 group-hover:text-white transition-colors">
                {item.icon}
              </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}