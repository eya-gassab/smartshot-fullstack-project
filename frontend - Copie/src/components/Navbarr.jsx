import { Link } from "react-router-dom";

export default function Navbarr() {
  return (
    <nav
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="flex justify-between items-center max-w-7xl mx-auto px-10 py-5"
    >
      <Link to="/" className="flex items-center gap-2.5 group">
        <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center shadow-md">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.9"/>
            <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.6"/>
            <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.6"/>
            <rect x="8" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.3"/>
          </svg>
        </span>
        <span className="text-[17px] font-semibold tracking-tight text-slate-900 dark:text-white">
          SmartShot
        </span>
      </Link>

      <Link
        to="/"
        className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
      >
        ← Back to home
      </Link>
    </nav>
  );
}