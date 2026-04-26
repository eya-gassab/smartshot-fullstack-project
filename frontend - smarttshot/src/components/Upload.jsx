import { useRef, useState } from "react";
import { Upload as UploadIcon } from "lucide-react";

export default function Upload({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef();

  const handleFiles = (files) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const imageUrls = imageFiles.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    onUpload(imageUrls);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className={`relative border-2 border-dashed rounded-2xl px-8 py-10 text-center cursor-pointer transition-all duration-300 ${
        isDragging
          ? "border-blue-400 bg-blue-50/80 dark:bg-blue-900/10 dark:border-blue-600"
          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0d1526] hover:border-blue-300 dark:hover:border-blue-700 hover:bg-slate-50 dark:hover:bg-slate-800/40"
      }`}
    >
      <input type="file" multiple hidden ref={inputRef} onChange={(e) => handleFiles(e.target.files)} />

      <div className={`w-10 h-10 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-colors duration-200 ${
        isDragging ? "bg-blue-500/20 text-blue-600" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
      }`}>
        <UploadIcon size={18} />
      </div>

      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Drop screenshots here
      </p>
    </div>
  );
}