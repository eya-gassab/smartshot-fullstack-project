import uploadImg from "../assets/upload.png";
import analyseImg from "../assets/analyse.png";
import categorizeImg from "../assets/categorize.png";

const steps = [
  {
    number: "01",
    title: "Upload",
    desc: "Drop any screenshot — PNG, JPG, or WebP. Batch uploads supported.",
    image: uploadImg,
  },
  {
    number: "02",
    title: "Analyze",
    desc: "Our AI extracts text, detects visuals, and understands context instantly.",
    image: analyseImg,
  },
  {
    number: "03",
    title: "Categorize",
    desc: "Every screenshot lands in the right folder, automatically and accurately.",
    image: categorizeImg,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="relative py-32 px-6 bg-[#f8f9fc] dark:bg-[#060c1a] overflow-hidden"
    >
      {/* Faint horizontal rule accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/50 dark:via-slate-700/50 to-transparent" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-20 max-w-xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 dark:text-blue-400 mb-4">
            Process
          </p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}
            className="text-5xl font-bold text-slate-900 dark:text-white leading-tight"
          >
            Three steps.<br />Zero effort.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative bg-white dark:bg-[#0d1526] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-7 hover:border-blue-300/60 dark:hover:border-blue-700/50 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-400"
            >
              {/* Step number */}
              <div className="flex items-center justify-between mb-6">
                <span
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-5xl font-bold text-slate-100 dark:text-slate-800 select-none"
                >
                  {step.number}
                </span>
                <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-7">
                {step.desc}
              </p>

              {/* Image */}
              <div className="overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800/60">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}