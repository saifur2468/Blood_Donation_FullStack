import React from "react";
import { Phone, Mail, MapPin, Clock, HeartHandshake } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Contact Form Card */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-stone-100">
          
          <div className="flex items-center gap-2 mb-4">
            <HeartHandshake className="w-5 h-5 text-red-600" />
            <span className="text-sm font-bold text-stone-800 tracking-wide uppercase">
              Get in Touch
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight mb-8">
            Connect With Our <br />
            Blood Donation Support
          </h1>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-5 py-3.5 bg-stone-100/80 border border-transparent rounded-full text-stone-800 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-5 py-3.5 bg-stone-100/80 border border-transparent rounded-full text-stone-800 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-5 py-3.5 bg-stone-100/80 border border-transparent rounded-full text-stone-800 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
              />
              <input
                type="text"
                placeholder="Subject / Inquiry Type"
                className="w-full px-5 py-3.5 bg-stone-100/80 border border-transparent rounded-full text-stone-800 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <textarea
                rows={5}
                placeholder="Write your message or inquiry here..."
                className="w-full p-5 bg-stone-100/80 border border-transparent rounded-3xl text-stone-800 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-base rounded-full shadow-md shadow-rose-600/20 transition-all duration-200 mt-2"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side: Info Cards & Map */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-800">Emergency Helpline</p>
                <p className="text-sm text-stone-600 mt-0.5">+880 1404-260731</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-800">Support Email</p>
                <p className="text-sm text-stone-600 mt-0.5">saifur.devweb@gmail.com</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-800">Head Office</p>
                <p className="text-sm text-stone-600 mt-0.5 leading-snug">
                  Barak Polytechnic, Bangladesh
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-800">Support Hours</p>
                <p className="text-sm text-stone-600 mt-0.5 leading-snug">
                  24/7 Emergency Active
                </p>
              </div>
            </div>

          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 h-[280px] w-full relative">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902354448762!2d90.39130097594966!3d23.75089997867175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd826a7a0f%3A0xb8d451a9bf2cd069!2sDhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-300"
            ></iframe>
          </div>

        </div>

      </div>
    </main>
  );
}