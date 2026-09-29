"use client";
import React, { useState, useEffect } from 'react';

// Global function to trigger toast from anywhere
let showToastGlobal: (message: string, type?: 'success' | 'error' | 'info') => void = () => {};

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
  showToastGlobal(message, type);
};

export const ToastContainer = () => {
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => {
    showToastGlobal = (message, type) => {
      setToast({ message, type });
      setTimeout(() => {
        setToast(null);
      }, 3000);
    };
  }, []);

  if (!toast) return null;

  const bgColors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce">
      <div className={`${bgColors[toast.type as keyof typeof bgColors] || 'bg-gray-800'} text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 text-sm font-medium`}>
        <span>{toast.message}</span>
      </div>
    </div>
  );
};