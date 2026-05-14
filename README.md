# Inventory & Sales Management System

A full-stack Inventory and Sales Management System built with **React + Vite** (frontend) and **Node.js + Express** (backend), connected to a **Supabase PostgreSQL** database.

---

## 📁 Project Structure

```
inventory-sales-system/
├── frontend/        # React + Vite + Tailwind CSS UI
├── backend/         # Node.js + Express REST API
├── database/        # SQL Schema & Migrations
└── README.md
```

---

## 🚀 Features

- **Dashboard** - Real-time KPIs, sales charts, low-stock alerts
- **Products** - Full product catalog with CRUD operations
- **Sales** - Invoice management with VAT and discount calculations
- **Stock Transactions** - Track stock_in, stock_out and adjustments
- **Approvals** - Manager approval workflow for large transactions (>50,000 Birr)
- **Reports** - Daily, monthly, and stock-level analytics
- **User Management** - Role-based access (Admin, Manager, Sales Officer)
- **Settings** - VAT rate, approval threshold, currency configuration

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS v4     |
| Backend    | Node.js, Express.js, ES Modules     |
| Database   | Supabase (PostgreSQL)               |
| Charts     | Recharts                            |
| Auth       | Supabase Auth (JWT)                 |
| HTTP       | Axios                               |
| Icons      | Lucide React                        |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/bitamez/smart-inventory.git
cd smart-inventory
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Fill in your Supabase credentials in .env
npm install
node server.js
```

### 3. Frontend Setup
```bash
cd frontend
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres
SUPABASE_URL=https://[ref].supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Endpoints

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| POST   | `/api/auth/login`           | Login user               |
| POST   | `/api/auth/register`        | Register new user        |
| GET    | `/api/products`             | Get all products         |
| POST   | `/api/products`             | Create product           |
| PUT    | `/api/products/:id`         | Update product           |
| DELETE | `/api/products/:id`         | Delete product           |
| GET    | `/api/sales`                | Get all sales            |
| POST   | `/api/sales`                | Create new sale          |
| GET    | `/api/stock`                | Get stock transactions   |
| POST   | `/api/stock`                | Add stock                |
| GET    | `/api/approvals`            | Get pending approvals    |
| PUT    | `/api/approvals/:id/process`| Approve or reject sale   |
| GET    | `/api/reports/daily`        | Daily sales report       |
| GET    | `/api/reports/monthly`      | Monthly sales report     |
| GET    | `/api/reports/stock`        | Stock level report       |
| GET    | `/api/users`                | Get all users            |
| GET    | `/api/health`               | Health check             |

---

## 📄 License
MIT License © 2025 Inventory & Sales Management System