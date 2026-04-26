import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbarr from "../components/Navbarr";
import { api } from "../services/api";
import { ArrowRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.post("/api/auth/login", { email, password });
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#f8f9fc] dark:bg-[#0a0f1e]"
    >
      <Navbarr />

      {/* Subtle grid */}
      <div
        className="fixed inset-0 opacity-[0.025] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-white dark:bg-[#0d1526] border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xl shadow-slate-900/5 p-10">

            <div className="mb-8">
              <h1
                style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}
                className="text-3xl font-bold text-slate-900 dark:text-white mb-1.5"
              >
                Welcome back
              </h1>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Sign in to your SmartShot account
              </p>
            </div>

            {error && (
              <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/15 border border-red-200/70 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: "Email address", type: "email", val: email, set: setEmail, placeholder: "you@example.com" },
                { label: "Password", type: "password", val: password, set: setPassword, placeholder: "••••••••" },
              ].map(({ label, type, val, set, placeholder }) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 tracking-wide">
                    {label}
                  </label>
                  <input
                    type={type}
                    required
                    value={val}
                    onChange={(e) => set(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 dark:focus:border-blue-600 transition-all duration-200"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="group w-full mt-2 flex items-center justify-center gap-2 bg-[#0f1f4b] dark:bg-blue-600 text-white py-3.5 rounded-full font-medium text-sm tracking-wide hover:opacity-90 transition-all duration-200 shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
                {!loading && <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-400 dark:text-slate-500">
              No account yet?{" "}
              <Link to="/register" className="text-blue-600 dark:text-blue-400 font-medium hover:underline underline-offset-2">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}