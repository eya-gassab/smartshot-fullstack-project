import { Shield, Zap, LayoutDashboard, Brain } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Smart AI Classification",
    desc: "Advanced vision AI reads every screenshot — text, UI, charts — and assigns the right category with surgical precision.",
    accent: "blue",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    desc: "End-to-end encryption and zero-knowledge storage. Your screenshots are yours, always.",
    accent: "slate",
  },
  {
    icon: Zap,
    title: "Instant Processing",
    desc: "Results in under two seconds. Upload in bulk and watch the dashboard populate in real time.",
    accent: "blue",
  },
  {
    icon: LayoutDashboard,
    title: "Precision Dashboard",
    desc: "A clean, structured interface built to surface exactly what you need — search, filter, browse.",
    accent: "slate",
  },
];

const accentMap = {
  blue: {
    icon: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    border: "hover:border-blue-200/80 dark:hover:border-blue-700/50",
  },
  slate: {
    icon: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
    border: "hover:border-slate-300/80 dark:hover:border-slate-600/50",
  },
};

export default function Features() {
  return (
    <section
      id="features"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="relative py-32 px-6 bg-white dark:bg-[#0a0f1e] overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/60 dark:via-slate-800/60 to-transparent" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-4">
              Capabilities
            </p>
            <h2
              style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}
              className="text-5xl font-bold text-slate-900 dark:text-white"
            >
              Built for precision.
            </h2>
          </div>
          <p className="max-w-sm text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Every feature is designed to eliminate friction and give you full control of your visual information.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            const a = accentMap[f.accent];
            return (
              <div
                key={i}
                className={`group bg-[#f8f9fc] dark:bg-[#0d1526] border border-slate-200/70 dark:border-slate-800 rounded-3xl p-8 ${a.border} hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-300`}
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-6 ${a.icon} transition-transform duration-300 group-hover:scale-105`}>
                  <Icon size={20} />
                </div>
                <h3 className="text-[17px] font-semibold text-slate-900 dark:text-white mb-2.5">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}