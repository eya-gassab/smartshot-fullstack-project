import { Github, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="relative bg-[#f8f9fc] dark:bg-[#060c1a] border-t border-slate-200/70 dark:border-slate-800/70 py-16 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-600 to-slate-700 flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.9"/>
                  <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.6"/>
                  <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.6"/>
                  <rect x="8" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.3"/>
                </svg>
              </span>
              <span className="text-[15px] font-semibold text-slate-900 dark:text-white">SmartShot</span>
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-500 leading-relaxed">
              AI-powered screenshot organization for focused professionals.
            </p>
          </div>

          {/* Links */}
          {[
            { title: "Product", links: [["Features", "#features"], ["How it Works", "#how"]] },
            { title: "Company", links: [["About", "#"], ["Contact", "#"]] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-slate-400 dark:text-slate-500 mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-150">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-slate-400 dark:text-slate-500 mb-4">
              Connect
            </p>
            <div className="flex gap-3">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-200/70 dark:border-slate-800/70 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">© 2026 SmartShot. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms"].map((l) => (
              <a key={l} href="#" className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-150">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}