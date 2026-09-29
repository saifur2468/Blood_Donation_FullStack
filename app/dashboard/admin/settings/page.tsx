"use client";

import React from 'react';
import AdminSidebar from '@/components/ui/admin/adminsidebar';

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Admin Settings</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 max-w-xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">System Name</label>
              <input type="text" defaultValue="Blood & Medical Portal" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Support Email</label>
              <input type="email" defaultValue="support@portal.com" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <button className="bg-red-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-md shadow-red-200 hover:bg-red-700 transition">
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}