import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-white dark:bg-[#0a0f1e]"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Badge */}
      <div className="relative z-10 mb-8 inline-flex items-center gap-2 border border-blue-200/60 dark:border-blue-800/60 bg-blue-50/80 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium px-4 py-1.5 rounded-full tracking-wide">
        <Sparkles size={11} />
        AI-Powered Screenshot Intelligence
      </div>

      {/* Heading */}
      <div className="relative z-10 max-w-4xl mx-auto mb-6">
        <h1
          style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}
          className="text-6xl md:text-7xl font-bold leading-[1.05] text-slate-900 dark:text-white"
        >
          Your screenshots,{" "}
          <span className="italic text-blue-600 dark:text-blue-400">organized</span>
          <br />automatically
        </h1>
      </div>

      {/* Sub */}
      <p className="relative z-10 max-w-lg text-slate-500 dark:text-slate-400 text-[17px] leading-relaxed mb-10">
        SmartShot reads, understands, and categorizes every screenshot — so you can find anything in seconds.
      </p>

      {/* CTA */}
      <div className="relative z-10 flex items-center gap-4">
        <Link
          to="/login"
          className="group inline-flex items-center gap-2 bg-[#0f1f4b] dark:bg-blue-600 text-white px-7 py-3.5 rounded-full font-medium text-sm tracking-wide hover:opacity-90 transition-all duration-200 shadow-lg shadow-blue-900/20"
        >
          Get Started
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
        <a
          href="#how"
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 underline underline-offset-4 decoration-slate-300 dark:decoration-slate-600"
        >
          See how it works
        </a>
      </div>

      {/* Stats row */}
      <div className="relative z-10 mt-20 flex items-center gap-10 text-center">
        {[
          { value: "10x", label: "Faster to find" },
          { value: "8", label: "Smart categories" },
          { value: "100%", label: "Private & secure" },
        ].map((s, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <span
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-2xl font-bold text-slate-900 dark:text-white"
            >
              {s.value}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 tracking-wide uppercase">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}