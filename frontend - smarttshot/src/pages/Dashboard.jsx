import { useState, useEffect } from "react";
import Upload from "../components/Upload";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Sidebar from "../components/Sidebar";
import { Search, Camera, TrendingUp, Grid3X3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// 🔧 helper OUTSIDE component (OK)
const buildPreview = (imageUrl) => {
  const relativePath = imageUrl.startsWith("http")
    ? imageUrl.replace(/^https?:\/\/[^/]+\//, "")
    : imageUrl;
  return `${import.meta.env.VITE_API_URL}/${relativePath}`;
};

const CATEGORY_COLORS = {
  programming: {
    bar: "bg-blue-500",
    badge:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/50",
  },
  finance: {
    bar: "bg-emerald-500",
    badge:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/50",
  },
  social_media: {
    bar: "bg-pink-500",
    badge:
      "bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-200/50 dark:border-pink-800/50",
  },
  shopping: {
    bar: "bg-orange-500",
    badge:
      "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200/50 dark:border-orange-800/50",
  },
  education: {
    bar: "bg-violet-500",
    badge:
      "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-200/50 dark:border-violet-800/50",
  },
  work: {
    bar: "bg-cyan-500",
    badge:
      "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-200/50 dark:border-cyan-800/50",
  },
  personal: {
    bar: "bg-rose-500",
    badge:
      "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200/50 dark:border-rose-800/50",
  },
  other: {
    bar: "bg-slate-400",
    badge:
      "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200/50 dark:border-slate-700/50",
  },
};

export default function Dashboard() {
  // =========================
  // ✅ ALL HOOKS INSIDE HERE
  // =========================
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomMode, setZoomMode] = useState(false);

  const navigate = useNavigate();

  // =========================
  // EFFECTS
  // =========================
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const data = await api.get("/api/screenshots");

        if (Array.isArray(data)) {
          setImages(
            data.map((s) => ({
              ...s,
              category: s.aiCategory || "other",
              preview: buildPreview(s.imageUrl),
            })),
          );
        }
      } catch {
        setError("Could not load screenshots.");
      }
    };

    fetchScreenshots();
  }, []);

  // =========================
  // HANDLERS
  // =========================
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
          results.push({
            ...data,
            category: data.aiCategory || "other",
            preview: buildPreview(data.imageUrl),
          });
        } else {
          setError(data.message || "Upload error.");
        }

        URL.revokeObjectURL(img.preview);
      }

      setImages((prev) => [...prev, ...results]);
    } catch {
      setError("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this screenshot?")) return;

    try {
      await api.delete(`/api/screenshots/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch {
      setError("Delete failed.");
    }
  };

  // =========================
  // DATA PROCESSING
  // =========================
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

    const matchSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.toLowerCase().includes(searchTerm.toLowerCase());

    return matchCat && matchSearch;
  });

  const chartData = Object.entries(stats).map(([cat, count]) => ({
    name: cat.replace("_", " "),
    count,
    fill:
      {
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

  // =========================
  // UI
  // =========================
  return (
    <div className="flex min-h-screen bg-[#f8f9fc] dark:bg-[#0a0f1e]">
      <Sidebar
        stats={stats}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="flex-1 overflow-auto">
        {/* HEADER */}
        <header className="sticky top-0 z-10 bg-white/90 dark:bg-[#0d1526]/90 backdrop-blur-xl border-b px-8 py-4 flex justify-between">
          <h1 className="text-sm font-semibold flex items-center gap-2">
            <Grid3X3 size={16} /> My Screenshots
          </h1>

          <input
            className="border px-3 py-1 rounded"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Link to="/">Home</Link>
        </header>

        <div className="px-8 py-6 space-y-8">
          {/* STATS */}
          <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>Total: {totalScreenshots}</div>
              <div>Categories: {Object.keys(stats).length}</div>
              <div>Showing: {filteredImages.length}</div>
              <div>
                Top:{" "}
                {Object.keys(stats).length
                  ? Object.entries(stats).sort((a, b) => b[1] - a[1])[0][0]
                  : "—"}
              </div>
            </div>

            {/* CHART */}
            <div className="mt-6">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* UPLOAD */}
          <Upload onUpload={handleUpload} />

          {/* GALLERY */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredImages.map((img) => (
              <div key={img._id} className="border rounded p-2">
                <img src={img.preview} className="w-full h-32 object-cover" />
                <p className="text-xs">{img.title}</p>
                <button onClick={() => handleDelete(img._id)}>Delete</button>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
