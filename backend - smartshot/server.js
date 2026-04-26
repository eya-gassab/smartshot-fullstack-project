require("dotenv").config(); 

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const screenshotRoutes = require("./routes/screenshotRoutes");
const authRoutes = require("./routes/AuthRoutes");

const app = express();

// Middleware 
app.use(cors({
  origin: 'https://smartshot-final.onrender.com',
  credentials: true,
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//  Database 
connectDB();

//  Routes 
app.use("/api/screenshots", screenshotRoutes);
app.use("/api/auth", authRoutes);

//  Health check 
app.get("/", (req, res) => res.json({ status: "API is running 🚀" }));

// 404 handler 
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

//  Global error handler 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GROQ_API_KEY loaded: ${process.env.GROQ_API_KEY ? "YES" : "NO — vérifiez votre .env !"}`);
});