"use client";

import React from "react";

interface Column {
  header: string;
  accessor: string;
  render?: (row: any) => React.ReactNode;
}

interface SharedTableProps {
  columns: Column[];
  data: any[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function SharedTable({
  columns,
  data,
  currentPage,
  totalPages,
  onPageChange,
  loading,
}: SharedTableProps) {
  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading data...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="p-8 text-center text-slate-400 text-sm">No records found.</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 text-xs uppercase">
              {columns.map((col, index) => (
                <th key={index} className="p-4 font-semibold">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {data.map((row, rowIndex) => (
              <tr key={row.id || row._id || rowIndex} className="hover:bg-slate-50/50 transition">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-4 text-slate-700">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-white">
        <span className="text-xs text-slate-500 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold disabled:opacity-40 hover:bg-slate-50"
          >
            Previous
          </button>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold disabled:opacity-40 hover:bg-slate-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}