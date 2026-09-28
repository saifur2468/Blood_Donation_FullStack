export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-600 font-medium text-sm">Loading, please wait...</p>
    </div>
  );
}