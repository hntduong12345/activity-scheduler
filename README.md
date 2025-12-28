# 🚀 Activity Planner Pro

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge\&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge\&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=for-the-badge\&logo=mongodb)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-8A2BE2?style=for-the-badge\&logo=google)

**Smart scheduling meets AI-powered productivity**

[Live Demo](#) • [Report Bug](https://github.com/hntduong12345/activity-scheduler/issues) • [Request Feature](https://github.com/hntduong12345/activity-scheduler/issues)

![Dashboard Preview](https://via.placeholder.com/800x400/1e293b/ffffff?text=Activity+Planner+Pro+Dashboard)

</div>

---

## ✨ Features

### 🎯 Core Functionality

* **Interactive Weekly Calendar** – Drag & drop scheduling
* **Real-time Analytics Dashboard** – Track productivity metrics
* **AI-Powered Recommendations** – Get smart schedule optimizations
* **Dark/Light Mode** – Eye-friendly themes

### 📊 Dashboard Insights

* Activity completion rates
* Time distribution by category
* Weekly progress visualization
* AI-generated improvement tips

### 🔒 Security & Performance

* JWT authentication with refresh tokens
* Lighthouse score > 90 optimized
* Fully responsive design
* WCAG 2.1 AA accessible

---

## 🛠️ Tech Stack

### Frontend

* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui components
* Recharts for visualizations
* dnd-kit for drag & drop

### Backend

* Node.js + Express.js
* MongoDB + Mongoose
* JWT authentication
* RESTful API design

### AI Integration

* Google Gemini 1.5 Flash
* Real-time schedule analysis
* JSON-structured responses

---

## 🚀 Quick Start

### Prerequisites

* Node.js 18+
* MongoDB running locally
* Google Gemini API key

### Installation

```bash
# Clone the repository
git clone https://github.com/hntduong12345/activity-scheduler.git

# Navigate to project
cd activity-planner-pro

# Install dependencies
npm install
```

---

## ⚙️ Environment Setup

### Backend Configuration

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/activity-planner
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_jwt_secret_here
```

---

## ▶️ Running the Application

```bash
# Development (both frontend & backend)
npm run dev

# Frontend only
cd frontend && npm run dev

# Backend only
cd backend && npm run dev

# Production build
npm run build
npm start
```

---

## 📁 Project Structure

```text
activity-planner-pro/
├── frontend/
│   ├── app/                 # Next.js app router
│   ├── components/          # React components
│   ├── lib/                 # Utilities & hooks
│   └── public/              # Static assets
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   └── middleware/      # Auth & validation
│   └── .env                 # Environment variables
└── package.json             # Workspace configuration
```

---

## 📖 Usage Guide

### 1. First Time Setup

* Register a new account
* Set your preferences in **Settings**
* Start adding activities to your schedule

### 2. Creating Activities

* Click **"+ Add Activity"** in the Schedule page
* Set title, category, duration, and priority
* Drag activities between days to reschedule

### 3. AI Recommendations

* Navigate to **Dashboard**
* Click **"Get AI Recommendations"**
* Review suggestions and apply as needed

AI analyzes your schedule for balance and efficiency.

### 4. Tracking Progress

* View completion rates in Dashboard
* Check category distribution
* Monitor weekly trends
* Export schedule data

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run specific test suites
npm test -- --testPathPattern=backend
npm test -- --testPathPattern=frontend

# Test coverage
npm run test:coverage
```

---

## 🔧 API Documentation

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
```

### Activities

```http
GET    /api/activities         # List all activities
POST   /api/activities         # Create activity
PUT    /api/activities/:id     # Update activity
DELETE /api/activities/:id     # Delete activity
```

### AI Recommendations

```http
POST /api/ai/recommendations   # Get schedule suggestions
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```dockerfile
# Build image
docker build -t activity-planner .

# Run container
docker run -p 3000:3000 -p 5000:5000 activity-planner
```

---

## 🤝 Contributing

We love contributions! 🚀

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

* Follow TypeScript strict mode
* Write unit tests for new features
* Maintain accessibility standards
* Use conventional commits

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👥 Authors

**HntDuong** – [@hntduong2003](https://github.com/hntduong12345)

---

## 🙏 Acknowledgments

* Google Gemini API
* Next.js Documentation
* shadcn/ui Components
* Tailwind CSS

---

<div align="center">

### ⭐️ Support the Project

If you find this useful, please give it a star on GitHub!

[https://api.star-history.com/svg?repos=hntduong12345/activity-scheduler&type=Date](https://api.star-history.com/svg?repos=hntduong12345/activity-scheduler&type=Date)

</div>
