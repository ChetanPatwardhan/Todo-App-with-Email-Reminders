# Todo App with Email Reminders

A full-stack MERN based Todo App where users can create tasks with due date & time, and the system will send (simulated) email reminders before the task is due.

> Author: **Chetan Patwardhan**

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios (API calls)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cron Job for sending reminders

### Email Reminders
- Email sending is simulated (logged in console)
- Can later be replaced with Gmail / SendGrid / SES

---

## 🔐 Features

| Feature | Status |
|--------|--------|
| User Signup / Login (JWT) | ✅ |
| Add / Edit / Delete Tasks | ✅ |
| Due Date + Time for tasks | ✅ |
| Simulated Email Reminder before due time | ✅ |
| Task list filtering by status | ✅ |

---

## 📁 Project Structure

todo-app-with-email-reminders  
│  
├─ todo-frontend → React app (UI)  
│  
└─ todo-backend → Express API + MongoDB + Cron  


## 🛠 How to Run Locally

### 1) Backend


     ```bash
    cd todo-backend
    npm install
    npm run dev
     
Backend will run at:

 http://localhost:4000

### 2) Frontend
     ```bash
    cd todo-backend
    npm install
    npm run dev

Frontend will run at: 

    http://localhost:5173

🔧 Environment Variables 

    VITE_API_URL=http://localhost:4000/api


Backend .env

    PORT=4000
    MONGO_URI=YOUR_MONGODB_CONNECTION
    JWT_SECRET=YOUR_SECRET_VALUE
    REMINDER_MINUTES=1


📬 Reminder Behavior

A cron job runs every minute.

If a task is within REMINDER_MINUTES before due time, backend prints an email log in console.

Example of simulated email:  
---[SIMULATED EMAIL]---  
To: user@example.com  
Subject: Reminder: Meeting with Client  
Your task is due soon.  
-----------------------  
## 🖼 Screenshots

