"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeft,
  Bell,
  Search,
  Settings,
} from "lucide-react";
import {
  FaChartPie,
  FaCogs,
  FaCreditCard,
  FaFileMedical,
  FaListAlt,
  FaPlusCircle,
  FaRegFileAlt,
  FaShieldAlt,
  FaTint,
  FaUser,
} from "react-icons/fa";

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

  // Role onujayi route gula define kora (routes agerই moto ache)
  const getSidebarLinks = () => {
    switch (userRole) {
      case "ADMIN":
        return [
          { name: "Overview", href: "/dashboard/admin", icon: FaChartPie },
          { name: "Users", href: "/dashboard/admin/users", icon: FaUser },
          { name: "Roles", href: "/dashboard/admin/roles", icon: FaShieldAlt },
          { name: "Reports", href: "/dashboard/admin/reports", icon: FaRegFileAlt },
          { name: "Requests", href: "/dashboard/admin/requests", icon: FaListAlt },
          { name: "Audit Logs", href: "/dashboard/admin/audit-logs", icon: FaCogs },
        ];
      case "PATIENT":
        return [
          { name: "Dashboard", href: "/dashboard", icon: FaChartPie },
          { name: "My Requests", href: "/dashboard/patient/myrequest", icon: FaFileMedical },
          { name: "Create Request", href: "/dashboard/patient/createbloodrequests", icon: FaPlusCircle },
          { name: "Payment History", href: "/dashboard/patient/payment", icon: FaCreditCard },
          { name: "My Profile", href: "/dashboard/patient/profile", icon: FaUser },
          { name: "Payment Create", href: "/dashboard/patient/payment/create", icon: FaCreditCard },
        ];
      case "DONOR":
        return [
          { name: "Overview", href: "/dashboard/donor", icon: FaChartPie },
          { name: "Patient Requests", href: "/dashboard/donor/requests", icon: FaListAlt },
          { name: "Update Profile", href: "/dashboard/donor/profile", icon: FaUser },
        ];
      default:
        return [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }];
    }
  };

  const navLinks = getSidebarLinks();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
              <FaTint className="h-4 w-4" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-red-600">
            LifeDrop
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <PanelLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto py-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`relative flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-blue-500" : "text-slate-400"}`} />
                {link.name}
                {isActive && (
                  <span className="absolute inset-y-0 right-0 w-0.5 bg-blue-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Profile + Logout */}
        <div className="border-t border-slate-100 p-4">
          <div className="mb-2 flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
              {userName.charAt(0)}
            </div>
            <div className="min-w-0">
              <h4 className="truncate text-sm font-semibold text-slate-900">{userName}</h4>
              <p className="text-[11px] font-medium text-slate-400">{userRole}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-20 items-center justify-between gap-4 bg-slate-50 px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search or type a command"
                className="w-full rounded-xl bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {userRole === "PATIENT" && (
              <Link
                href="/dashboard/patient/create-request"
                className="hidden items-center rounded-full bg-blue-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-600 sm:inline-flex"
              >
                + Create Request
              </Link>
            )}
            <button className="text-slate-500 transition hover:text-slate-900" aria-label="Settings">
              <Settings className="h-5 w-5" />
            </button>
            <button className="relative text-slate-500 transition hover:text-slate-900" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
                2
              </span>
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
              {userName.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-6 pb-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}