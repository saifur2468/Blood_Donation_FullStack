'use client'
import Link from "next/link";
import { MdBloodtype } from "react-icons/md";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-red-500/20">
            <MdBloodtype />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
            BloodLink
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-red-600 transition-colors">About Us</Link>
           <Link href="/donors" className="hover:text-red-600 transition-colors">Find Donors</Link>
          <Link href="/requests" className="hover:text-red-600 transition-colors">Blood Requests</Link>
           <Link href="/donors" className="hover:text-red-600 transition-colors">Contact</Link>
         
          
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link 
            href="/login" 
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-red-600 transition-colors"
          >
            Login
          </Link>
          <Link 
            href="/register" 
            className="px-4 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-sm transition-all"
          >
            Register
          </Link>
        </div>

      </div>
    </header>
  );
}