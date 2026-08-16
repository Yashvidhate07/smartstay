# VacationHub

VacationHub is a modern full-stack vacation rental and booking platform inspired by Airbnb, designed to help users discover, explore, and book unique stays seamlessly. The platform provides an intuitive user experience with smart property recommendations, secure authentication, and responsive UI for smooth browsing across devices.

Built using the MERN stack, VacationHub integrates advanced features like AI-based recommendations, user authentication, booking management, property listings, and image uploads. The platform allows hosts to manage listings while travelers can search destinations, view property details, and make bookings effortlessly.

## Features

* User Authentication & Authorization (JWT)
* AI-based Stay Recommendations
* Property Listings & Detailed Pages
* Booking Management System
* Responsive Modern UI
* MongoDB Database Integration
* REST API Architecture
* Secure Backend with Express & Node.js
* React Frontend with Vite
* Cloud Deployment using Render & Vercel

VacationHub focuses on delivering a fast, scalable, and user-friendly travel accommodation experience with modern web technologies.

# VacationHub Automation & Deployment Commands

## 📦 Project Setup

```bash
git clone https://github.com/Yashvidhate07/smartstay.git
cd smartstay
npm install
```

---

# 🚀 Run Backend Server

```bash
npm start
```

OR

```bash
node server/server.js
```

---

# 💻 Run Frontend

```bash
cd client
npm install
npm run dev
```

---

# 🗄️ MongoDB Commands

## Local MongoDB URL

```env
MONGO_URL=mongodb://127.0.0.1:27017/automation_airbnb
```

## MongoDB Atlas URL

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/automation_airbnb
```

---

# 🌱 Seed Database

```bash
node server/seed.js
```

OR

```bash
node server/seed/index.js
```

---

# 🔄 GitHub Commands

## Initialize Git

```bash
git init
```

## Add Files

```bash
git add .
```

## Commit Changes

```bash
git commit -m "Initial commit"
```

## Connect GitHub Repo

```bash
git remote add origin https://github.com/Yashvidhate07/smartstay.git
```

## Push to GitHub

```bash
git branch -M main
git push -u origin main
```

---

# ☁️ Render Deployment Commands

## Build Command

```bash
npm install
```

## Start Command

```bash
node server/server.js
```

---

# 🌐 Vercel Frontend Deployment

## Install Vercel

```bash
npm install -g vercel
```

## Deploy Frontend

```bash
vercel
```

---

# ⚙️ Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret_key
```

## Frontend `.env`

```env
VITE_API_URL=https://your-render-backend.onrender.com
```

---

# 📦 Production Build

```bash
npm run build
```

---

# 🔧 Useful Commands

## Check Git Remote

```bash
git remote -v
```

## Pull Latest Changes

```bash
git pull origin main
```

## Push Updates

```bash
git add .
git commit -m "updated project"
git push
```

---

# 🧪 API Testing

## Test Backend

```bash
http://localhost:5000
```

## Listings API

```bash
http://localhost:5000/api/listings
```
