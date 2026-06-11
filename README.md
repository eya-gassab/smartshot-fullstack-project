# 🎯 SmartShot - AI-Powered Screenshot Manager

A full-stack web application for intelligent screenshot management with AI-powered classification, OCR text extraction, and analytics.

[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green)]()
[![React](https://img.shields.io/badge/Frontend-React%2019%20%7C%20Vite-blue)]()
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-success)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

**[🚀 Live Demo](https://smartshot-final.onrender.com/)**

## ✨ Features

- **Screenshot Management** – Upload, organize, and browse screenshots with search/filter
- **AI Classification** – Auto-categorize into 8 categories (Programming, Finance, Social Media, Shopping, Education, Work, Personal, Other)
- **OCR Text Extraction** – Extract text from images using Tesseract.js
- **Smart Summaries** – AI-generated summaries via Groq API (llama-3.3-70b)
- **Link & Task Detection** – Automatically extract URLs and action items
- **Dashboard Analytics** – Visual statistics with Recharts
- **User Authentication** – JWT-based auth with bcryptjs password hashing
- **Dark/Light Theme** – Responsive design with Tailwind CSS 4
- **Favorites & Organization** – Mark screenshots as favorites for quick access

## 🛠️ Tech Stack

**Backend:** Node.js • Express.js • MongoDB • Mongoose • JWT • Multer  
**Frontend:** React 19 • Vite • React Router v7 • Tailwind CSS 4 • Axios • Recharts  
**AI/ML:** Groq API (llama-3.3-70b) • Tesseract.js (OCR)

## 📦 Installation

**Prerequisites:** Node.js v14+, npm v6+, MongoDB v4+, Git

1. **Clone repository**

   ```bash
   git clone https://github.com/yourusername/smartshot.git
   cd smartshot
   ```

2. **Backend setup**

   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure environment variables (see below)
   npm run dev
   ```

3. **Frontend setup** (new terminal)
   ```bash
   cd frontend
   npm install
   cp .env.local.example .env.local
   npm run dev
   ```

Visit `http://localhost:5173`

## ⚙️ Configuration

**Backend `.env`:**

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/smartshot
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
GROQ_API_KEY=your_groq_api_key_from_console.groq.com
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MAX_FILE_SIZE=5242880
```

**Frontend `.env.local`:**

```env
VITE_API_URL=http://localhost:5000
```

## 🎯 Usage

### Development

```bash
# Backend (http://localhost:5000)
cd backend && npm run dev

# Frontend (http://localhost:5173) - in another terminal
cd frontend && npm run dev
```

### Production

```bash
# Backend
cd backend && npm start

# Frontend
cd frontend && npm run build && npm run preview
```

## 📡 API Overview

**Base:** `http://localhost:5000/api`  
**Auth:** Include JWT in `Authorization: Bearer <token>` header

| Endpoint                    | Method | Description                          |
| --------------------------- | ------ | ------------------------------------ |
| `/auth/register`            | POST   | Register new user                    |
| `/auth/login`               | POST   | Login user                           |
| `/screenshots/upload`       | POST   | Upload screenshot (with AI analysis) |
| `/screenshots`              | GET    | Fetch user's screenshots             |
| `/screenshots/:id`          | GET    | Get single screenshot                |
| `/screenshots/:id`          | DELETE | Delete screenshot                    |
| `/screenshots/:id/favorite` | PATCH  | Toggle favorite status               |

See `backend/README.md` for detailed API documentation.

## 🔒 Security

- Password hashing with bcryptjs (10 salt rounds)
- JWT token-based authentication
- CORS enabled for frontend origin
- Environment-based sensitive data
- File upload size limits
- Protected API routes with middleware

## 🤝 Contributing

Contributions welcome! Process:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push branch: `git push origin feature/YourFeature`
5. Open Pull Request

Please follow existing code style and test thoroughly.

## 📄 License

MIT License – see [LICENSE](LICENSE) for details.

## 👨‍💻 Author

**Eya Gassab** – [GitHub](https://github.com/eya-) | [Email](mailto:eyagassab@outlook.com)

## 🙏 Built With

- [Groq API](https://groq.com/) – AI classification
- [Tesseract.js](https://tesseract.projectnaptha.com/) – OCR
- [React](https://react.dev/) & [Vite](https://vitejs.dev/)
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)

---

**Star ⭐ this repo if you find it useful!**
