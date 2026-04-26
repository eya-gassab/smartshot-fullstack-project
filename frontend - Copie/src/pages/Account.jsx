import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { api } from "../services/api";
import { Mail, Lock, CheckCircle, AlertCircle, User } from "lucide-react";

export default function Account() {
  const navigate = useNavigate();

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")) || {}; } catch { return {}; }
  })();

  const [newEmail, setNewEmail]         = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailStatus, setEmailStatus]   = useState(null);
  const [emailLoading, setEmailLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword]           = useState("");
  const [confirmPassword, setConfirmPassword]   = useState("");
  const [pwStatus, setPwStatus]                 = useState(null);
  const [pwLoading, setPwLoading]               = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault(); setEmailStatus(null); setEmailLoading(true);
    try {
      const data = await api.post("/api/auth/update-email", { newEmail, password: emailPassword });
      if (data.email) {
        localStorage.setItem("user", JSON.stringify({ ...user, email: data.email }));
        setEmailStatus({ type: "success", msg: "Email updated successfully." });
        setNewEmail(""); setEmailPassword("");
      } else setEmailStatus({ type: "error", msg: data.message || "Failed to update email." });
    } catch { setEmailStatus({ type: "error", msg: "Server error." }); }
    finally { setEmailLoading(false); }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault(); setPwStatus(null);
    if (newPassword !== confirmPassword) { setPwStatus({ type: "error", msg: "Passwords do not match." }); return; }
    if (newPassword.length < 6)          { setPwStatus({ type: "error", msg: "Minimum 6 characters." }); return; }
    setPwLoading(true);
    try {
      const data = await api.post("/api/auth/update-password", { currentPassword, newPassword });
      if (data.message === "Password updated") {
        setPwStatus({ type: "success", msg: "Password updated successfully." });
        setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      } else setPwStatus({ type: "error", msg: data.message || "Failed to update password." });
    } catch { setPwStatus({ type: "error", msg: "Server error." }); }
    finally { setPwLoading(false); }
  };

  const StatusMsg = ({ status }) => status ? (
    <div className={`flex items-center gap-2 text-xs px-4 py-3 rounded-xl border ${
      status.type === "success"
        ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200/50 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-400"
        : "bg-red-50 dark:bg-red-900/10 border-red-200/50 dark:border-red-800/30 text-red-600 dark:text-red-400"
    }`}>
      {status.type === "success" ? <CheckCircle size={13} /> : <AlertCircle size={13} />}
      {status.msg}
    </div>
  ) : null;

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/60 text-slate-900 dark:text-white text-sm placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 dark:focus:border-blue-600 transition-all duration-200";
  const labelClass = "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 tracking-wide";

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="flex min-h-screen bg-[#f8f9fc] dark:bg-[#0a0f1e]"
    >
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-white/90 dark:bg-[#0d1526]/90 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800 px-8 py-4">
          <h1 className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <User size={16} className="text-blue-500" />
            Account Settings
          </h1>
        </header>

        <div className="px-8 py-8 max-w-xl space-y-6">

          {/* Profile */}
          <div className="bg-white dark:bg-[#0d1526] border border-slate-200/70 dark:border-slate-800 rounded-2xl px-6 py-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-slate-600 flex items-center justify-center shrink-0">
              <User size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.username || "User"}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{user.email || "—"}</p>
            </div>
          </div>

          {/* Change Email */}
          <div className="bg-white dark:bg-[#0d1526] border border-slate-200/70 dark:border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                <Mail size={14} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Change Email</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Update your login address</p>
              </div>
            </div>
            <form onSubmit={handleEmailSubmit} className="px-6 py-5 space-y-4">
              <div><label className={labelClass}>New email address</label>
                <input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="new@example.com" className={inputClass} />
              </div>
              <div><label className={labelClass}>Confirm with your password</label>
                <input type="password" required value={emailPassword} onChange={(e) => setEmailPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
              </div>
              <StatusMsg status={emailStatus} />
              <button type="submit" disabled={emailLoading}
                className="w-full bg-[#0f1f4b] dark:bg-blue-600 text-white py-2.5 rounded-full font-medium text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                {emailLoading ? "Updating..." : "Update Email"}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white dark:bg-[#0d1526] border border-slate-200/70 dark:border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center">
                <Lock size={14} className="text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Change Password</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Choose a strong password (min. 6 characters)</p>
              </div>
            </div>
            <form onSubmit={handlePasswordSubmit} className="px-6 py-5 space-y-4">
              <div><label className={labelClass}>Current password</label>
                <input type="password" required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
              </div>
              <div><label className={labelClass}>New password</label>
                <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Confirm new password</label>
                <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••"
                  className={`${inputClass} ${confirmPassword && newPassword !== confirmPassword ? "!border-red-400 dark:!border-red-600" : ""}`} />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>
              <StatusMsg status={pwStatus} />
              <button type="submit" disabled={pwLoading}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-2.5 rounded-full font-medium text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                {pwLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>

          {/* Danger zone */}
          <div className="border border-red-200/60 dark:border-red-900/30 rounded-2xl px-6 py-5 bg-red-50/50 dark:bg-red-900/5">
            <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">Danger zone</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">These actions are permanent and cannot be undone.</p>
            <button onClick={() => { localStorage.clear(); navigate("/login"); }}
              className="text-xs px-4 py-2 rounded-xl border border-red-200 dark:border-red-800/50 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors duration-200">
              Sign out of all sessions
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}