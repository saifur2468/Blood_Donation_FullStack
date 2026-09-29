import React from 'react';
import { FaHeartbeat, FaSearchLocation, FaShieldAlt, FaMobileAlt, FaBell, FaUsers } from "react-icons/fa";

const features = [
  {
    icon: <FaHeartbeat />,
    title: "Instant Emergency Support",
    subtitle: "Rapid Blood Requests",
    description: "Connect with available donors instantly during critical medical emergencies without unnecessary delays."
  },
  {
    icon: <FaSearchLocation />,
    title: "Nearby Donor Finder",
    subtitle: "Location-Based Matching",
    description: "Easily locate verified blood donors right in your local area or specific hospital zone with smart filters."
  },
  {
    icon: <FaShieldAlt />,
    title: "100% Verified Profiles",
    subtitle: "Safe & Trustworthy",
    description: "All registered blood donors and medical requests are thoroughly vetted to ensure complete security and authenticity."
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Friendly UI",
    subtitle: "Accessible Anywhere",
    description: "A clean, modern, and responsive interface designed to work seamlessly on smartphones, tablets, and desktops."
  },
  {
    icon: <FaBell />,
    title: "Real-time Notifications",
    subtitle: "Stay Updated",
    description: "Get instant alerts and updates when a donor accepts your emergency request or when help is on the way."
  },
  {
    icon: <FaUsers />,
    title: "Community Driven",
    subtitle: "Strong Volunteer Network",
    description: "Join a growing community of generous lifesavers, volunteers, and organizations dedicated to helping others."
  }
];

export default function WhyChooseBloodLink() {
  return (
    <section className="py-20 px-4 md:px-8 ">
      <div className="max-w-7xl mx-auto text-center mb-16">
        {/* <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-red-600">
          WHY CHOOSE US
        </span> */}
        <h2 className="text-xl md:text-5xl  text-gray-900 mb-4 tracking-tight">
          Why Choose BloodLink?
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Everything you need to bridge the gap between blood donors and patients in times of urgent need.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
          >
            {/* Icon Circle */}
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
              {item.icon}
            </div>

            {/* Text Content */}
            <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
            <h4 className="text-xs font-bold text-red-600 mb-3 uppercase tracking-wider">{item.subtitle}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}