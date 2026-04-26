import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, User, LogOut, ChevronDown, ChevronUp, Tag
} from "lucide-react";

const CATEGORIES = [
  "programming", "finance", "social_media", "shopping",
  "education", "work", "personal", "other"
];

const DOT_COLORS = {
  programming: "bg-blue-500",
  finance:     "bg-emerald-500",
  social_media:"bg-pink-500",
  shopping:    "bg-orange-500",
  education:   "bg-violet-500",
  work:        "bg-cyan-500",
  personal:    "bg-rose-500",
  other:       "bg-slate-400",
};

export default function Sidebar({ stats = {}, selectedCategory, onSelectCategory }) {
  const [openCategories, setOpenCategories] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; }
  })();

  const handleLogout = () => { localStorage.clear(); navigate("/login"); };
  const totalScreenshots = Object.values(stats).reduce((a, b) => a + b, 0);

  const navItem = (to, Icon, label, badge) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          active
            ? "bg-blue-600 text-white shadow-sm"
            : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        <Icon size={16} />
        {label}
        {badge != null && badge > 0 && (
          <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>
            {badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="w-60 min-h-screen bg-white dark:bg-[#0d1526] border-r border-slate-200/70 dark:border-slate-800 flex flex-col shrink-0"
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100 dark:border-slate-800">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.9"/>
              <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.6"/>
              <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.6"/>
              <rect x="8" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.3"/>
            </svg>
          </span>
          <span className="text-[15px] font-semibold text-slate-900 dark:text-white">SmartShot</span>
        </Link>
      </div>

      {/* User */}
      <div className="px-4 py-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-slate-600 flex items-center justify-center shrink-0">
            <User size={14} className="text-white" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{user.username || "User"}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{user.email || ""}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5">
        {navItem("/dashboard", LayoutDashboard, "Dashboard", totalScreenshots)}
        {navItem("/account", User, "Account")}

        {/* Categories */}
        <div className="pt-1">
          <button
            onClick={() => setOpenCategories(!openCategories)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
          >
            <Tag size={16} />
            Categories
            <span className="ml-auto">{openCategories ? <ChevronUp size={13} /> : <ChevronDown size={13} />}</span>
          </button>

          {openCategories && (
            <div className="mt-1 ml-2 space-y-0.5">
              <button
                onClick={() => onSelectCategory?.("all")}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  selectedCategory === "all"
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
                All
                <span className="ml-auto text-xs opacity-50">{totalScreenshots}</span>
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory?.(cat)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${DOT_COLORS[cat]}`} />
                  <span className="capitalize">{cat.replace("_", " ")}</span>
                  {stats[cat] ? <span className="ml-auto text-xs opacity-40">{stats[cat]}</span> : null}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5 border-t border-slate-100 dark:border-slate-800 pt-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 dark:text-slate-500 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}