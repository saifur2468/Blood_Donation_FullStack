import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl font-extrabold text-red-600 mb-2">404</div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
      <p className="text-slate-600 max-w-md mb-6 text-sm">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-all shadow-sm"
      >
        Go Back Home
      </Link>
    </div>
  );
}