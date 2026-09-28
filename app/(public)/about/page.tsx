import React from "react";
import { Heart, ShieldCheck, Users, Clock, ArrowRight } from "lucide-react";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Saifur Rahman",
    role: "Lead Volunteer Coordinator",
    image: "/img/saif.JPG",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: 2,
    name: "Dr. Farhana Ahmed",
    role: "Medical Volunteer & Advisor",
    image: "/img/saif.JPG",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: 3,
    name: "Imran Hossain",
    role: "Emergency Blood Volunteer",
    image: "/img/saif.JPG",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
];

const HOSPITALS = [
  "Dhaka Medical College Hospital",
  "Square Hospital",
  "Apollo Hospitals Dhaka",
  "United Hospital",
  "Evercare Hospital",
  "Ibn Sina Hospital",
  "Chittagong Medical College",
];

export default function AboutPage() {
  return (
    <main className="bg-stone-50 min-h-screen py-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. TOP ABOUT SECTION (Left Image, Right Text) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-100 bg-white aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1000&auto=format&fit=crop"
                alt="Blood Donation Camp"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-1">Humanitarian Mission</p>
                  <p className="text-lg font-extrabold">Every drop counts, every donor is a hero.</p>
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 sm:right-6 bg-white border border-stone-100 rounded-2xl p-4 shadow-lg hidden sm:flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 font-bold">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xl font-black text-stone-900">10,000+</p>
                <p className="text-xs text-stone-500 font-medium">Active Donors Nationwide</p>
              </div>
            </div>
          </div>

          {/* Right Side: Text & Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-rose-600" />
              About BloodLink
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Bridging the Gap Between Donors and Patients
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              BloodLink is a trusted community-driven platform dedicated to connecting voluntary blood donors with individuals in urgent medical need. We make finding and donating blood fast, secure, and transparent.
            </p>

            {/* Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">Verified Donors</h3>
                  <p className="text-xs text-stone-500 mt-0.5">100% genuine and verified donor profiles.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">24/7 Support</h3>
                  <p className="text-xs text-stone-500 mt-0.5">Instant emergency broadcast system.</p>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="/donors"
                className="px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm rounded-full shadow-md shadow-rose-600/20 transition-all duration-200 flex items-center gap-2"
              >
                Find Donors
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                className="px-6 py-3.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-semibold text-sm rounded-full transition-all duration-200 shadow-sm"
              >
                Contact Us
              </a>
            </div>

          </div>

        </div>

        {/* 2. HOSPITAL PARTNERS / MARQUEE SECTION */}
        <div className="">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">
            Trusted & Associated Partner Hospitals
          </p>
          <div className="flex relative w-full overflow-hidden">
            <div className="animate-marquee flex gap-8 items-center">
              {HOSPITALS.concat(HOSPITALS).map((hospital, index) => (
                <div key={index} className="flex items-center gap-2 text-stone-700 font-bold text-base sm:text-lg bg-stone-50 px-5 py-3 rounded-2xl border border-stone-100 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  {hospital}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. OUR TEAM / VOLUNTEER SECTION */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold uppercase tracking-wider">
              Our Volunteers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-red-600 tracking-tight mt-3">
              Meet the Heroes Behind BloodLink
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base">
              Passionate individuals working around the clock to ensure safe and instant blood donation support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mb-5 border-4 border-rose-50 shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-lg font-bold text-stone-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-rose-600 mb-4">
                  {member.role}
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-stone-100 w-full justify-center">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-600 flex items-center justify-center transition-all"
                  >
                    <FaGithub className="text-sm" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-600 flex items-center justify-center transition-all"
                  >
                    <FaLinkedin className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-600 flex items-center justify-center transition-all"
                  >
                    <FaGlobe className="text-sm" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}