import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavBar({ darkMode, setDarkMode }) {
  return (
    <nav
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="sticky top-0 z-50 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-[#0a0f1e]/90 backdrop-blur-2xl transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-4">

        {/* Logo */}
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

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How it works"].map((label, i) => (
            <a
              key={i}
              href={i === 0 ? "#features" : "#how"}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white tracking-wide transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-200"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <Link
            to="/login"
            className="text-sm px-5 py-2 rounded-full bg-[#0f1f4b] dark:bg-blue-600 text-white font-medium tracking-wide hover:opacity-90 transition-opacity duration-200 shadow-sm"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}