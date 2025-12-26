# Smart ToDo API

A RESTful backend API for task management with JWT authentication.

---

## Tech Stack
- Node.js (ES Modules)
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Postman (for API testing)

## Features
- User registration & login
- JWT-protected routes
- Create, Read, Update, Delete tasks
- User-specific task access

---

## 📁 Project Structure

```
src/
├── app.js
├── server.js
│
├── config/
│   └── db.js
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── controllers/
│   ├── auth.controller.js
│   └── task.controller.js
│
├── routes/
│   ├── auth.routes.js
│   └── task.routes.js
│
├── middleware/
│   └── auth.middleware.js


```
---

### Installation & Execution

1.  Clone the Repository
git clone https://github.com/Dhirajsah18/Smart-TODO-API.git
cd smart-todo-api

2. Install Dependencies
npm install

3. Environment Variables Setup
Create a .env file in the root directory and add the following:

PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/smarttodo
JWT_SECRET=your_secret_key

4. Run the Server
npm run dev

If everything is configured correctly, you should see:

MongoDB connected
Server running on port 5000

---

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Tasks (Protected)
- POST /api/tasks
- GET /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

---
### Author

Dhiraj Kumar Sah

---
