const path = require("path");
const Screenshot = require("../models/Screenshot");
const { extractText } = require("../services/ocr");


// POST /api/screenshots/upload 
exports.uploadScreenshot = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const imageUrl = `uploads/${req.file.filename}`;
    const title = req.body.title || req.file.originalname;
    const imagePath = path.join(__dirname, "..", "uploads", req.file.filename);

    // ── Étape 1 : OCR ────────────────────────────────────────
    let extractedText = "";
    try {
      extractedText = await extractText(imagePath);
    } catch (ocrErr) {
      console.warn("OCR failed:", ocrErr.message);
    }


let aiCategory = "other";
let aiTitle = title; 
let aiSummary = "";

try {
  if (extractedText && extractedText.trim().length > 10) {
    const { classifyText, generateTitle, summarizeText } = await import("../services/aiClassification.js");
    
    // Lance les 3 en parallèle pour < sc
    const [category, generatedTitle, summary] = await Promise.all([
      classifyText(extractedText.trim()),
      generateTitle(extractedText.trim()),
      summarizeText(extractedText.trim()),
    ]);

    aiCategory = category;
    aiTitle = generatedTitle || title;
    aiSummary = summary;
  }
  } catch (aiErr) {
    onsole.warn("AI processing failed:", aiErr.message);
  }

  //  Sauvegarde 
  const screenshot = new Screenshot({
    title: aiTitle,          
    imageUrl,
    extractedText,
    aiCategory,
    aiSummary,               
    isProcessed: true,
    user: req.user.id,
  });
    await screenshot.save();

    res.status(201).json(screenshot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/screenshots 
exports.getScreenshots = async (req, res) => {
  try {
    const screenshots = await Screenshot.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(screenshots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/screenshots/:id 
exports.getScreenshotById = async (req, res) => {
  try {
    const screenshot = await Screenshot.findOne({ _id: req.params.id, user: req.user.id });
    if (!screenshot) {
      return res.status(404).json({ message: "Screenshot not found" });
    }
    res.status(200).json(screenshot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/screenshots/:id 
exports.deleteScreenshot = async (req, res) => {
  try {
    const screenshot = await Screenshot.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!screenshot) {
      return res.status(404).json({ message: "Screenshot not found" });
    }
    res.status(200).json({ message: "Screenshot deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/screenshots/:id/favorite 
exports.toggleFavorite = async (req, res) => {
  try {
    const screenshot = await Screenshot.findOne({ _id: req.params.id, user: req.user.id });
    if (!screenshot) {
      return res.status(404).json({ message: "Screenshot not found" });
    }
    screenshot.isFavorite = !screenshot.isFavorite;
    await screenshot.save();
    res.status(200).json(screenshot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};