# 🚀 User Management Backend API

A simple REST API built using **Node.js, Express, TypeScript, and SQLite** with full CRUD, search, and sorting support.

Live Url: https://user-management-backend-qp7m.onrender.com

---

## 📦 Tech Stack
- Node.js  
- Express.js  
- TypeScript  
- SQLite  

---

## 📂 Project Structure
```
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── types/
 │    └── user.ts
 ├── utils/
 │    └── asyncHandler.ts
 ├── database/
 └── index.ts
dist/ (generated)
users.db
package.json
tsconfig.json
```

---

## ⚙️ Setup

```bash
git clone https://github.com/Krishkumar2005/user-management-backend.git
cd user-management-backend
npm install
```

---

## ▶️ Run

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

---

## 🌐 API Endpoints

### Get all users
```
GET /users
```

Query:
```
/users?search=abc&sort=name&order=asc
```

### Get user by ID
```
GET /users/:id
```

### Create user
```
POST /users
```

Body:
```json
{
  "name": "John",
  "email": "john@example.com",
  "age": 25
}
```

### Update user
```
PUT /users/:id
```

### Delete user
```
DELETE /users/:id
```

---

## ☁️ Deployment (Render)

Build Command:
```bash
npm install && npx tsc
```

Start Command:
```bash
node dist/index.js
```

---

## ⚠️ Notes
- SQLite is used → data may reset on redeploy (Render)  
- Ensure `dist/` is generated before running  

---

## 👨‍💻 Author
Krish
