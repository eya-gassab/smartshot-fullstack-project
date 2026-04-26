import { useState, useEffect } from "react";
import Upload from "../components/Upload";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Sidebar from "../components/Sidebar";
import {
  Search,
  Camera,
  TrendingUp,
  Grid3X3,
  ZoomIn,
  ScanSearch,
  X
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const [selectedImage, setSelectedImage] = useState(null);
const [zoomMode, setZoomMode] = useState(false);
const CATEGORY_COLORS = {
  programming:  { bar: "bg-blue-500",    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/50" },
  finance:      { bar: "bg-emerald-500", badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/50" },
  social_media: { bar: "bg-pink-500",    badge: "bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-200/50 dark:border-pink-800/50" },
  shopping:     { bar: "bg-orange-500",  badge: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200/50 dark:border-orange-800/50" },
  education:    { bar: "bg-violet-500",  badge: "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-200/50 dark:border-violet-800/50" },
  work:         { bar: "bg-cyan-500",    badge: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-200/50 dark:border-cyan-800/50" },
  personal:     { bar: "bg-rose-500",    badge: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200/50 dark:border-rose-800/50" },
  other:        { bar: "bg-slate-400",   badge: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200/50 dark:border-slate-700/50" },
};

const buildPreview = (imageUrl) => {
  const relativePath = imageUrl.startsWith("http")
    ? imageUrl.replace(/^https?:\/\/[^/]+\//, "")
    : imageUrl;
  return `${import.meta.env.VITE_API_URL}/${relativePath}`;
};

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const data = await api.get("/api/screenshots");
        if (Array.isArray(data)) {
          setImages(data.map((s) => ({
            ...s,
            category: s.aiCategory || "other",
            preview: buildPreview(s.imageUrl),
          })));
        }
      } catch { setError("Could not load screenshots."); }
    };
    fetchScreenshots();
  }, []);

  const handleUpload = async (newImages) => {
    setLoading(true);
    setError("");
    try {
      const results = [];
      for (const img of newImages) {
        const formData = new FormData();
        formData.append("image", img.file);
        formData.append("title", img.file.name);
        const data = await api.post("/api/screenshots/upload", formData, true);
        if (data._id) {
          results.push({ ...data, category: data.aiCategory || "other", preview: buildPreview(data.imageUrl) });
        } else {
          setError(data.message || "Upload error.");
        }
        URL.revokeObjectURL(img.preview);
      }
      setImages((prev) => [...prev, ...results]);
    } catch { setError("Upload failed."); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this screenshot?")) return;
    try {
      await api.delete(`/api/screenshots/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch { setError("Delete failed."); }
  };

  const stats = images.reduce((acc, img) => {
    const cat = img.category || "other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const totalScreenshots = images.length;

  const filteredImages = images.filter((img) => {
    const cat = img.category || "other";
    const name = img.title || "";
    const matchCat = selectedCategory === "all" || cat === selectedCategory;
    const matchSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || cat.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });
  const chartData = Object.entries(stats)
  .sort((a, b) => b[1] - a[1])
  .map(([cat, count]) => ({
    name: cat.replace("_", " "),
    count,
    fill: {
      programming: "#3b82f6",
      finance: "#10b981",
      social_media: "#ec4899",
      shopping: "#f97316",
      education: "#8b5cf6",
      work: "#06b6d4",
      personal: "#f43f5e",
      other: "#94a3b8",
    }[cat] || "#94a3b8",
  }));

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="flex min-h-screen bg-[#f8f9fc] dark:bg-[#0a0f1e]"
    >
      <Sidebar stats={stats} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      <main className="flex-1 overflow-auto">

        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white/90 dark:bg-[#0d1526]/90 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800 px-8 py-4 flex items-center justify-between gap-4">
          <h1 className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <Grid3X3 size={16} className="text-blue-500" />
            My Screenshots
          </h1>

          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search screenshots..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 dark:focus:border-blue-600 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs">✕</button>
            )}
          </div>

          <Link to="/" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Home</Link>
        </header>

        <div className="px-8 py-7 space-y-8">

          {/*  SECTION STATS + CHARTS  */}

<section>
  <div className="flex items-center gap-2 mb-4">
    <TrendingUp size={13} className="text-slate-400" />
    <span className="text-xs font-semibold tracking-[0.15em] uppercase text-slate-400 dark:text-slate-500">
      Statistics
    </span>
  </div>

  {/* Cards stats restent en haut */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
    {[
      { value: totalScreenshots, label: "Total screenshots" },
      { value: Object.keys(stats).length, label: "Categories used" },
      {
        value:
          Object.keys(stats).length > 0
            ? Object.entries(stats)
                .sort((a, b) => b[1] - a[1])[0][0]
                .replace("_", " ")
            : "—",
        label: "Top category",
        highlight: true,
      },
      { value: filteredImages.length, label: "Showing now" },
    ].map((s, i) => (
      <div
        key={i}
        className="bg-white dark:bg-[#0d1526] border border-slate-200/70 dark:border-slate-800 rounded-2xl px-5 py-4"
      >
        <p
          className={`text-2xl font-bold mb-0.5 ${
            s.highlight
              ? "text-blue-600 dark:text-blue-400"
              : "text-slate-900 dark:text-white"
          }`}
          style={
            s.highlight ? {} : { fontFamily: "'Playfair Display', serif" }
          }
        >
          {s.value}
        </p>

        <p className="text-xs text-slate-400 dark:text-slate-500">
          {s.label}
        </p>
      </div>
    ))}
  </div>

  {/* Ancienne distribution reste */}
  {Object.keys(stats).length > 0 && (
    <div className="bg-white dark:bg-[#0d1526] border border-slate-200/70 dark:border-slate-800 rounded-2xl px-6 py-5 mb-5">
      <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400 dark:text-slate-500 mb-4">
        Distribution
      </p>

      <div className="space-y-3">
        {Object.entries(stats)
          .sort((a, b) => b[1] - a[1])
          .map(([cat, count]) => {
            const colors =
              CATEGORY_COLORS[cat] || CATEGORY_COLORS.other;

            const pct =
              totalScreenshots > 0
                ? Math.round((count / totalScreenshots) * 100)
                : 0;

            return (
              <div key={cat} className="flex items-center gap-3">
                <span className="w-24 text-xs capitalize text-slate-500 dark:text-slate-400 shrink-0">
                  {cat.replace("_", " ")}
                </span>

                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${colors.bar}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 w-5 text-right">
                  {count}
                </span>

                <span className="text-xs text-slate-300 dark:text-slate-600 w-9 text-right">
                  {pct}%
                </span>
              </div>
            );
          })}
      </div>
    </div>
  )}

  {/* Charts AU BAS */}
  {chartData.length > 0 && (
    <div className="grid md:grid-cols-2 gap-4">

      {/* Bar Chart */}
      <div className="bg-white dark:bg-[#0d1526] border border-slate-200/70 dark:border-slate-800 rounded-2xl px-6 py-5">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400 dark:text-slate-500 mb-4">
          Bar Chart
        </p>

        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count">
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-[#0d1526] border border-slate-200/70 dark:border-slate-800 rounded-2xl px-6 py-5">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-slate-400 dark:text-slate-500 mb-4">
          Pie Chart
        </p>

        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  )}
</section>

          {/* Upload */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Camera size={13} className="text-slate-400" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-slate-400 dark:text-slate-500">Upload</span>
            </div>
            {loading && <div className="text-center py-2 text-blue-600 dark:text-blue-400 text-sm animate-pulse mb-3">Analyzing with AI...</div>}
            {error && <p className="text-red-500 text-sm text-center mb-3 bg-red-50 dark:bg-red-900/10 p-3 rounded-xl border border-red-100 dark:border-red-900/20">{error}</p>}
            <Upload onUpload={handleUpload} />
          </section>

          {/* Gallery */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-slate-400 dark:text-slate-500">
                {selectedCategory === "all" ? "All Screenshots" : selectedCategory.replace("_", " ")}
              </span>
              <span className="text-xs text-slate-300 dark:text-slate-600">({filteredImages.length})</span>
            </div>

            {filteredImages.length === 0 && !loading ? (
              <div className="text-center py-20 text-slate-300 dark:text-slate-700">
                <Camera size={36} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm text-slate-400 dark:text-slate-500">No screenshots found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((img) => {
                  const colors = CATEGORY_COLORS[img.category] || CATEGORY_COLORS.other;
                  return (
                    <div
                      key={img._id || img.preview}
                      className="group relative bg-white dark:bg-[#0d1526] border border-slate-200/70 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-slate-900/8 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={img.preview}
                          alt={img.title || "screenshot"}
                          className="w-full h-40 object-cover group-hover:scale-103 transition-transform duration-500"
                          onError={(e) => { e.target.src = "https://placehold.co/300x200?text=Image"; }}
                        />
                        <span className={`absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full border capitalize backdrop-blur-sm ${colors.badge}`}>
                          {img.category.replace("_", " ")}
                        </span>
                        {img._id && (
                          <button
                            onClick={() => handleDelete(img._id)}
                            className="absolute top-2 right-2 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 text-xs hover:bg-red-500 hover:text-white hover:border-red-500"
                          >✕</button>
                        )}
                      </div>
                      {img.title && (
                        <div className="px-3 py-2.5">
    
                          {/* Title */}
                          <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                            {img.title}
                          </p>

                          {/* AI Summary */}
                          {img.aiSummary && (
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                              {img.aiSummary}
                            </p>
                          )}

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}