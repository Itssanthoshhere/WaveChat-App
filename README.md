<div align="center">

<h1>WaveChat 🌊</h1>
<p><strong>A cross-platform real-time messaging platform built with modern tech</strong></p>

<div>
  <img src="https://img.shields.io/badge/-React%2019-61DBFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/-React%20Native-61DBFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/-Expo-000020?style=for-the-badge&logo=expo&logoColor=white"/>
  <img src="https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/-Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white"/>
  <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/-Tailwind-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
</div>

<br/>

<p>📱 Mobile &nbsp;|&nbsp; 💻 Web &nbsp;|&nbsp; ⚙️ REST API + Sockets</p>

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Socket Events](#-socket-events)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)

---

## 🎯 Overview

**WaveChat** is a full-stack, production-grade messaging application that works seamlessly across iOS, Android, and web browsers — all powered by a single backend.

Unlike most tutorials that use Firebase, WaveChat is built with a **custom Socket.io server**, giving you full control over real-time infrastructure, no vendor lock-in, and complete transparency into how live messaging actually works.

**Real-world use case:**
```
User A (iOS) sends a message
  → Socket.io server receives it
  → Saves to MongoDB
  → Broadcasts to User B's browser AND Android device simultaneously
All devices stay in sync with typing indicators & online presence
```

---

## ✨ Features

| Feature | Status |
|---------|--------|
| Real-time messaging (Socket.io) | ✅ |
| Typing indicators | ✅ |
| Online / offline presence | ✅ |
| Message history & persistence | ✅ |
| Optimistic UI updates | ✅ |
| One-on-one conversations | ✅ |
| User search & discovery | ✅ |
| OAuth authentication (Google, Apple) | ✅ |
| Cross-platform (iOS, Android, Web) | ✅ |
| Error tracking (Sentry) | ✅ |
| Fully typed (TypeScript) | ✅ |

---

## ⚙️ Tech Stack

### Frontend

| Layer | Web | Mobile |
|-------|-----|--------|
| Framework | React 19 + Vite | React Native 0.81 + Expo |
| Routing | React Router 7 | Expo Router 6 |
| State | Zustand 5 + TanStack Query 5 | Zustand 5 + TanStack Query 5 |
| Styling | Tailwind CSS 4 + DaisyUI 5 | NativeWind 4 |
| Auth | Clerk 5.60 | Clerk Expo 2.19 |
| HTTP | Axios 1.15 | Axios 1.13 |
| Sockets | socket.io-client | socket.io-client |

### Backend

| Layer | Choice |
|-------|--------|
| Runtime | Node.js + Bun |
| Framework | Express.js 5.2 |
| Language | TypeScript 5.9 |
| Database | MongoDB 7.0 + Mongoose 9.0 |
| Real-time | Socket.io 4.8 |
| Auth | Clerk Express SDK |
| Monitoring | Sentry |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│              PRESENTATION LAYER                  │
├──────────────────┬──────────────────────────────┤
│  React Web App   │   React Native (Expo)         │
│  (Vite)          │   iOS + Android               │
└────────┬─────────┴──────────┬────────────────────┘
         │   HTTP / REST      │   Socket.io
         └──────────┬─────────┘
                    ▼
        ┌───────────────────────────┐
        │   APPLICATION LAYER       │
        │   Express.js + Socket.io  │
        │                           │
        │  Auth · Chats · Messages  │
        │  Users · Error Handling   │
        └──────────┬────────────────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
  ┌──────────────┐    ┌──────────────────┐
  │   MongoDB    │    │   Socket.io      │
  │  (Mongoose)  │    │   Event Engine   │
  └──────────────┘    └──────────────────┘
```

### Message Flow

```
User sends message
    ↓
Optimistic UI update (feels instant)
    ↓
socket.emit("send-message", { chatId, text })
    ↓
Backend validates + saves to MongoDB
    ↓
io.to("chat:roomId").emit("new-message", message)
    ↓
All connected clients receive update
    ↓
Optimistic message replaced with real one
```

---

## 📂 Project Structure

```
wavechat/
├── backend/
│   └── src/
│       ├── app.ts              # Express setup + middleware
│       ├── index.ts            # Server entry point
│       ├── config/
│       │   └── database.ts     # MongoDB connection
│       ├── controllers/
│       │   ├── authController.ts
│       │   ├── chatController.ts
│       │   ├── messageController.ts
│       │   └── userController.ts
│       ├── models/
│       │   ├── User.ts
│       │   ├── Chat.ts
│       │   └── Message.ts
│       ├── routes/
│       │   ├── authRoutes.ts
│       │   ├── chatRoutes.ts
│       │   ├── messageRoutes.ts
│       │   └── userRoutes.ts
│       ├── middleware/
│       │   ├── auth.ts         # Clerk token verification
│       │   └── errorHandler.ts
│       └── utils/
│           └── socket.ts       # Socket.io setup ⭐
│
├── web/
│   └── src/
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   └── ChatPage.jsx
│       ├── components/
│       │   ├── ChatHeader.jsx
│       │   ├── ChatInput.jsx
│       │   ├── MessageBubble.jsx
│       │   └── NewChatModal.jsx
│       ├── hooks/
│       │   ├── useChats.js
│       │   ├── useMessages.js
│       │   └── useSocketConnection.js
│       └── lib/
│           ├── axios.js
│           └── socket.js       # Zustand socket store ⭐
│
└── mobile/
    └── app/
        ├── (auth)/index.tsx    # Auth screen
        ├── (tabs)/index.tsx    # Chat list
        ├── chat/[id].tsx       # Chat detail
        └── new-chat/index.tsx  # User search
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ or Bun
- MongoDB (local or [Atlas](https://cloud.mongodb.com))
- [Clerk](https://clerk.dev) account (free tier works)

### 1. Clone & Install

```bash
git clone hhttps://github.com/Itssanthoshhere/WaveChat-App.git
cd WaveChat-App
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Fill in your environment variables (see below)

npm install    # or: bun install
npm run dev    # Server starts at http://localhost:3000
```

### 3. Web App

```bash
cd web
cp .env.example .env
# Fill in VITE_CLERK_PUBLISHABLE_KEY and VITE_API_URL

npm install
npm run dev    # App starts at http://localhost:5173
```

### 4. Mobile App

```bash
cd mobile
cp .env.example .env
# Fill in EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

npm install
npx expo start
# Scan the QR code with the Expo Go app
```

### Docker (All Services)

```bash
docker-compose up -d
# MongoDB:  localhost:27017
# Backend:  localhost:3000
# Web:      localhost:5173
```

---

## 🔑 Environment Variables

### Backend — `backend/.env`

```env
# Database
MONGODB_URI=mongodb://localhost:27017/wavechat

# Server
PORT=3000
NODE_ENV=development

# Auth (Clerk)
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# CORS
FRONTEND_URL=http://localhost:5173

# Optional: Redis (for horizontal scaling)
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Web — `web/.env`

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:3000/api
```

### Mobile — `mobile/.env`

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 📡 API Reference

All endpoints require `Authorization: Bearer <token>` header.

### Auth

```
POST   /api/auth/callback       Sync Clerk user to MongoDB
GET    /api/auth/me             Get current authenticated user
```

### Chats

```
GET    /api/chats               List all chats for current user
POST   /api/chats/with/:id      Create or retrieve chat with a user
```

### Messages

```
GET    /api/messages/chat/:id   Fetch all messages in a chat
```

### Users

```
GET    /api/users               List all users (for search)
```

---

## 🔌 Socket Events

### Client → Server

```javascript
socket.emit("send-message", { chatId: string, text: string })
socket.emit("typing",       { chatId: string, isTyping: boolean })
socket.emit("join-chat",    chatId)
socket.emit("leave-chat",   chatId)
```

### Server → Client

```javascript
socket.on("new-message",   (message) => { /* update chat */ })
socket.on("typing",        ({ userId, chatId, isTyping }) => { /* show indicator */ })
socket.on("user-online",   ({ userId }) => { /* mark green */ })
socket.on("user-offline",  ({ userId }) => { /* mark grey */ })
socket.on("online-users",  ({ userIds }) => { /* initial online list */ })
socket.on("socket-error",  ({ message }) => { /* handle error */ })
```

---

## 📦 Deployment

### Backend (Docker)

```bash
cd backend
docker build -t wavechat-backend .
docker run -p 3000:3000 \
  -e MONGODB_URI=your_uri \
  -e CLERK_SECRET_KEY=your_key \
  wavechat-backend
```

### Web Frontend

```bash
cd web
npm run build
# Deploy the dist/ folder to Vercel, Netlify, or S3+CloudFront
```

### Mobile

```bash
cd mobile
# iOS
eas build --platform ios --auto-submit

# Android
eas build --platform android --auto-submit
```

### Recommended Platforms

| Service | Platform |
|---------|----------|
| Backend | Render, Railway, Heroku, AWS ECS, Google Cloud Run |
| Web | Vercel, Netlify, Cloudflare Pages |
| Mobile | Expo EAS |
| Database | MongoDB Atlas |

---

## 🗺️ Roadmap

- [ ] Redis adapter for Socket.io (horizontal scaling)
- [ ] Message pagination (load more)
- [ ] Input validation with Zod
- [ ] Rate limiting (express-rate-limit)
- [ ] End-to-end encryption
- [ ] Unit & integration tests (Vitest)
- [ ] Group chats
- [ ] Media / file sharing
- [ ] Push notifications
- [ ] Read receipts

---

## 🔐 Security

| Measure | Status |
|---------|--------|
| Clerk JWT validation | ✅ |
| Chat access control | ✅ |
| CORS whitelist | ✅ |
| MongoDB injection prevention (Mongoose) | ✅ |
| XSS prevention (React auto-escape) | ✅ |
| HTTPS in production | ⚠️ Configure on your host |
| Rate limiting | 🔜 Planned |
| Input validation | 🔜 Planned |

---

## 🤝 Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👤 Author

**Santhosh VS**

[![GitHub](https://img.shields.io/badge/GitHub-@Itssanthoshhere-181717?style=flat&logo=github)](https://github.com/Itssanthoshhere)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Santhosh%20VS-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/thesanthoshvs/)
[![Portfolio](https://img.shields.io/badge/Portfolio-santhosh--vs-FF5722?style=flat&logo=google-chrome&logoColor=white)](https://santhosh-vs-portfolio.vercel.app)

---

<div align="center">

**Built with ❤️ using React, React Native, Node.js, and Socket.io**

⭐ Star this repo if you found it useful!

</div>