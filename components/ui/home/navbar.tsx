'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdBloodtype } from "react-icons/md";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { showToast } from "@/components/ui/toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // User login status check kora (localStorage theke)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole"); // Jodi login-er somoy role store koren
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, [pathname]); // Pathname change holeo abar check korbe

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
    showToast("Logged out successfully!", "success");
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Find Donors", href: "/FindDonor" },
    { name: "Blood Requests", href: "/bloodrequest" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-red-500/20">
            <MdBloodtype />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
          LifeDrop
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors relative py-1 ${
                  isActive ? "text-red-600 font-semibold" : "hover:text-red-600"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Buttons / User Profile */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-red-600 border border-slate-200 rounded-xl transition-all"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold bg-slate-900 hover:bg-red-600 text-white rounded-xl shadow-sm transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link 
                href="/login" 
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-red-600 transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/Register" 
                className="px-4 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-sm transition-all"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <HiX className="w-6 h-6 text-red-600" /> : <HiMenuAlt3 className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-lg px-6 py-6 space-y-4 transition-all">
          <nav className="flex flex-col space-y-3 font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-xl transition-all ${
                    isActive 
                      ? "bg-red-50 text-red-600 font-semibold" 
                      : "hover:bg-slate-50 hover:text-red-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            {isLoggedIn ? (
              <>
                <Link 
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-all border border-slate-200"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-sm transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-all border border-slate-200"
                >
                  Login
                </Link>
                <Link 
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-sm transition-all"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}