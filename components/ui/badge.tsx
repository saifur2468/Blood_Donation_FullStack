import React from "react";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getBadgeStyle = (st: string) => {
    const lower = st.toLowerCase();
    if (lower === "active" || lower === "available" || lower === "success" || lower === "true") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (lower === "pending" || lower === "processing") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    return "bg-red-50 text-red-700 border-red-200";
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${getBadgeStyle(status)}`}>
      {String(status)}
    </span>
  );
}