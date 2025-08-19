# 📝 Todo App with Authentication (Node.js + MongoDB)

A simple **Todo Management API** built with **Node.js, Express, MongoDB, JWT, and Bcrypt**.  
Users can sign up, log in, manage their todos (CRUD), and reset/change passwords securely.

---

## 🚀 Features

- 👤 **User Authentication**
  - Signup with hashed password (bcrypt)
  - Login with JWT token
  - Change password
  - Forgot password with OTP
  - Reset password with OTP

- ✅ **Todo Management**
  - Create new todos
  - Update existing todos
  - Delete todos
  - Fetch all todos by user
  - Aggregation pipeline: fetch user with todos

- 🔒 **JWT Middleware**
  - Protects private routes
  - Injects logged-in user into `req.user`

---

## 📂 Project Structure

 * [models](./models)  
   * [users.js](./models/users.js)  
   * [Todo.js](./models/Todo.js)  
 * [controllers](./controllers)  
   * [authController.js](./controllers/authController.js)  
   * [todoController.js](./controllers/todoController.js)  
 * [middleware](./middleware)  
   * [auth.js](./middleware/auth.js)  
 * [routes](./routes)  
   * [authRoutes.js](./routes/authRoutes.js)  
   * [todoRoutes.js](./routes/todoRoutes.js)  
 * [config](./config)  
   * [db.js](./config/db.js)  
 * [server.js](./server.js)  
 * [package.json](./package.json)  
 * [README.md](./README.md)  



---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Nodemon** (for development)

---

## ⚡ Getting Started

1. Clone Repo
git clone https://github.com/your-username/todo-auth-app.git
cd todo-auth-app

2. Install Dependencies
npm install

3. Create .env File
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/todoapp
JWT_SECRET=yourSecretKey

4. Start Server
npm run dev

---
## 🔑 API Overview

- **Auth**
  - `POST /api/auth/signup` → Signup
  - `POST /api/auth/login` → Login
  - `POST /api/auth/change-password`
  - `POST /api/auth/forgot-password`
  - `POST /api/auth/reset-password`

- **Todos** (Protected with JWT)
  - `POST /api/todo/create`
  - `PUT /api/todo/update`
  - `GET /api/todo/list`
  - `DELETE /api/todo/delete`
  - `GET /api/todo/aggregate`

