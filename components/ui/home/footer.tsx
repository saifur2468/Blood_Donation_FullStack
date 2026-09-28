'use client'
import Link from "next/link";
import { MdBloodtype } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold">
            <MdBloodtype />
            </div>
            <span className="text-xl font-bold text-white">BloodLink</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Connecting voluntary blood donors with patients in urgent need. Saving lives together, one drop at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-red-500 transition-colors">Home</Link></li>
            <li><Link href="/requests" className="hover:text-red-500 transition-colors">Blood Requests</Link></li>
            <li><Link href="/donors" className="hover:text-red-500 transition-colors">Find Donors</Link></li>
            <li><Link href="/about" className="hover:text-red-500 transition-colors">About Us</Link></li>
          </ul>
        </div>

        {/* Legal / Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-red-500 transition-colors">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-red-500 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-red-500 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Emergency Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Emergency Hotline</h4>
          <p className="text-sm text-slate-400 mb-2">Need blood urgently? Call our 24/7 helpline.</p>
          <span className="text-lg font-bold text-red-500">+880 1404-260731</span>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} BloodLink. All rights reserved. Developed with  for saving lives.
      </div>
    </footer>
  );
}