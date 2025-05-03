
---

### ✅ `backend/README.md`

```md
# 🧩 Task Tracker - Backend (ExpressJS + MongoDB/PostgreSQL)

This is the **backend server** for the Task Tracker app built using **Node.js**, **Express**, and **MongoDB** (or PostgreSQL optionally).

## 📦 Features

- 🔐 JWT Authentication (Access + Refresh tokens)
- 👥 User Management
  - Register, Login
  - Enforces max 4 projects per user
- 📁 Project Management
  - Create and list projects
- ✅ Task Management (CRUD)
  - Create task under a project
  - View, Update, Delete tasks
- 📅 Tracks created and completed timestamps

## 📊 Tech Stack

- Node.js
- ExpressJS
- MongoDB with Mongoose *(or PostgreSQL with Sequelize)*
- JWT for authentication
- bcrypt for password hashing

## 📁 Folder Structure

backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
└── server.js



## ⚙️ Setup Instructions

1. Navigate to backend directory:
   ```bash
   cd backend
2. install dependencies
  npm install
3. add .env file
  PORT="4020"
  DB_URL="mongodb+srv://khanafroz1516:nELeBS096ckeap8X@cluster0.aw8ibru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  JWT_SECRET= "secret"

4.start the server
  npm run dev
