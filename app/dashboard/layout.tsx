"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  UserCheck,
  BarChart3,
  HeartHandshake,
  PlusCircle,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldAlert,
  Bell,
  Search,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>("PATIENT");
  const [userName, setUserName] = useState<string>("Saifur Rahman");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") || "PATIENT";
    const storedName = localStorage.getItem("userName") || "Saifur Rahman";
    setUserRole(storedRole.toUpperCase());
    setUserName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    router.push("/login");
  };

  // Role onujayi route gula define kora
  const getSidebarLinks = () => {
    switch (userRole) {
      case "ADMIN":
        return [
          { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
          { name: "Verify Requests", href: "/dashboard/admin/verify-requests", icon: UserCheck },
          { name: "System Report", href: "/dashboard/admin/reports", icon: BarChart3 },
          { name: "User Role Control", href: "/dashboard/admin/role-control", icon: ShieldAlert },
        ];
      case "PATIENT":
        return [
          { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          { name: "My Blood Requests", href: "/dashboard/patient/my-requests", icon: FileText },
          { name: "Create Request", href: "/dashboard/patient/create-request", icon: PlusCircle },
          { name: "Payment History", href: "/dashboard/patient/payments", icon: CreditCard },
          { name: "Payment Confirm", href: "/dashboard/patient/payment-confirm", icon: CreditCard },
          { name: "My Profile", href: "/dashboard/profile", icon: User },
        ];
      case "DONOR":
        return [
          { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
          { name: "Patient Requests", href: "/dashboard/donor/patient-requests", icon: HeartHandshake },
          { name: "Update Profile", href: "/dashboard/profile/update", icon: Settings },
          { name: "My Profile", href: "/dashboard/profile", icon: User },
        ];
      default:
        return [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }];
    }
  };

  const navLinks = getSidebarLinks();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar (Image er moto clean white background) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* User Info Profile Box at Top of Sidebar */}
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-sm shadow-sm">
            {userName.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <h4 className="truncate text-sm font-extrabold text-slate-900">{userName}</h4>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{userRole}</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto rounded-lg p-1 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3">
            Menu
          </p>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Logout Footer */}
        <div className="border-t border-slate-100 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* Top Bar (Image er moto search, notifications & actions) */}
        <header className="flex h-20 items-center justify-between border-b border-slate-100 bg-white px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-black tracking-tight text-slate-900">
              Good morning, <span className="text-slate-700 font-semibold">{userName.split(" ")[0]}</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition">
              <Search className="h-4 w-4" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition">
              <Bell className="h-4 w-4" />
            </button>
            <Link
              href="/dashboard/patient/create-request"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-red-700 transition"
            >
              + Create Request
            </Link>
          </div>
        </header>

        {/* Dynamic Route Output Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}