# 📦 Student Crud API

A RESTful API for managing student records. This project is built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**. It supports full CRUD operations — Create, Read, Update, and Delete students.

---

## 🚀 Features

- 🧑‍🎓 Create new students
- 📖 Get a list of all students
- 🔍 View details of a specific student
- ✏️ Update student information
- 🗑️ Delete student records
- 📦 MongoDB with Mongoose for database interaction
- ⚙️ TypeScript for type safety

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose)
- **Tools:** dotenv, nodemon, ts-node, etc.

---

## 📁 Project Structure

src/ ├── controllers/ # Handles the request logic
├── models/ # Mongoose schemas
├── routes/ # API routes
├── config/ # DB config and environment setup
├── middlewares/ # Error handling, validation, etc.
├── utils/ # Helper functions
└── index.ts # Entry point

## Create a .env file in the root folder and add the following:

PORT=3001
MONGODB_URL=your_mongodb_connection_string

## 🚀 Run the Server

```bash
npm run dev
```

## 🧪 Example API Endpoints

Method Endpoint Description

- GET /api/students Get all students
- GET /api/students/:id Get a student by ID
- POST /api/students Add a new student
- PUT /api/students/:id Update a student by ID
- DELETE /api/students/:id Delete a student by ID
