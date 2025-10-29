# 🛒 Mock E-Commerce Cart — Full Stack Application

A **full-stack shopping cart application** built for the **Vibe Commerce screening project**.  
This project demonstrates a complete **E-Commerce workflow** — fetching products, adding/removing items from a cart, calculating totals, and performing a **mock checkout**.  

---

## 🧩 Overview

**Tech Stack**
- 🖥️ Frontend — React + Tailwind CSS  
- ⚙️ Backend — Node.js + Express  
- 🗄️ Database — MongoDB  
- 🌐 External API — Fake Store API  
- 🚀 Deployment — Vercel (Frontend) & Render (Backend)

---

## 🚀 Features

### 🧭 Core Functionality
- Fetches product data from the **Fake Store API**
- Add / Remove items from cart
- Update quantity and calculate total
- Mock checkout with receipt (name, email, total, timestamp)
- Data persistence using MongoDB
- Fully responsive UI built with Tailwind CSS

---

## 🧱 Tech Stack Summary

| Layer | Technology | Description |
|--------|-------------|-------------|
| Frontend | React (CRA) | Interactive product UI |
| Styling | Tailwind CSS | Responsive & modern design |
| Backend | Node.js + Express | RESTful API endpoints |
| Database | MongoDB | Stores cart items and mock users |
| External API | Fake Store API | Provides mock product data |

---

## ⚙️ Backend Setup (Node.js + MongoDB)

### 📁 Folder
`/backend`

### 🔧 Installation Steps

1. Navigate to the backend folder:
   ```bash
   cd backend

2. Install Dependencies
   ```bash
   npm install

3. Create a .env file
   ```bash
   MONGO_URI=FAKESTORE_API_URL=https://fakestoreapi.com/products?limit=22
   PORT=5000

4. Start backend:
   ```bash
   cd backend

---

## 🧩 API Endpoints

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| GET    | `/api/products`      | Fetch all products (from Fake Store API) |
| GET    | `/api/cart`          | Get all cart items and total         |
| POST   | `/api/cart`          | Add item to cart                     |
| PATCH  | `/api/cart/:id`      | Update item quantity                 |
| DELETE | `/api/cart/:id`      | Remove item                          |
| POST   | `/api/cart/checkout` | Mock checkout + receipt generation   |


## ⚙️ Frontend Setup (React + Tailwind CSS)

### 📁 Folder
`/frontend`

## ⚙️ Installation steps

1. Navigate to the frontend folder:
    ```bash
    cd frontend

2. Install Dependencies
   ```bash
   npm install

3. start frontend
   ```bash
   npm start

Frontend runs by default on:
👉 http://localhost:3000

## 🧠 Frontend Features

- Displays all products fetched from the backend  
- “Add to Cart” functionality  
- Cart page with total price and quantity control  
- Checkout form with name & email  
- Displays mock receipt with total and timestamp  
- Responsive Tailwind UI
 
----

    ```bash
     ## 📁 Project Structure

    mock-ecom-cart/
    │
    ├── backend/
    │   ├── models/
    │   │   ├── CartItem.js
    │   │   └── Product.js
    │   ├── routes/
    │   │   ├── cart.js
    │   │   └── products.js
    │   ├── server.js
    │   ├── utils
    │   ├── package.json
    │   └── .env
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── api/
    │   │   ├── App.js
    │   │   └── index.js
    │   ├── public/
    │   ├── tailwind.config.js
    │   ├── postcss.config.js
    │   ├── package.json
    │   └── README.md
    │
    ├── .gitignore
    └── README.md


## 📸 Screenshots (Optional)

| Page      | Screenshot |
|------------|-------------|
| **Home**      | <img width="1894" height="860" alt="Image" src="https://github.com/user-attachments/assets/df2d2e6f-b5b3-4fd2-af33-0d18735d1243" /> |
| **Cart**      | <img width="1910" height="795" alt="Image" src="https://github.com/user-attachments/assets/3a0f732a-1fbe-4e80-bd72-511666290d92" /> |
| **Checkout**  | <img width="1906" height="820" alt="Image" src="https://github.com/user-attachments/assets/66414b4d-bb20-41d7-8686-dd20c0e39167" /> |
| **Reciept**   | <img width="1911" height="842" alt="Image" src="https://github.com/user-attachments/assets/53acf6c3-e86e-4eb9-881e-d89d826662d4" /> |


## 🧑‍💻 Developer Notes

- Backend must be running before using frontend features.  
- Ensure MongoDB is active on your system.  
- Use Postman to verify API responses (helpful for debugging).  
- Both frontend and backend are designed to be modular and easily extendable.  
