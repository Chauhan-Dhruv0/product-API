
### 📌 API Usage Guide: **items API**
This API is built using **Express.js** and **MongoDB** for handling product and user data.

---

## 🚀 **Getting Started**
### 1️⃣ **Installation**
First, clone the repository and install dependencies:
```bash
git clone https://github.com/Chauhan-Dhruv0/product-API.git
cd product-API
npm install
```

---

### 2️⃣ **Environment Setup**
Create a `.env` file in the root directory and add your MongoDB connection string:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000  # or any other port
```

---

### 3️⃣ **Running the Server**
Start the server with:
```bash
npm start
```
By default, the server runs on `http://localhost:3000`.

---

## 🛠 **API Endpoints**
### ✅ **Base URL**: `http://localhost:3000`

### 📦 **Items API**
- **Get all items**
  ```http
  GET /items
  ```
- **Get a single item**
  ```http
  GET /items/:id
  ```
- **Add a new item**
  ```http
  POST /items
  Content-Type: application/json
  Body: { "name": "Product Name", "price": 100 }
  ```
- **Update an item**
  ```http
  PUT /items/:id
  Content-Type: application/json
  Body: { "name": "Updated Name", "price": 120 }
  ```
- **Delete an item**
  ```http
  DELETE /items/:id
  ```

---

### 👤 **User API**
- **Register a new user**
  ```http
  POST /user/register
  Content-Type: application/json
  Body: { "username": "user1", "password": "pass123" }
  ```
- **Login**
  ```http
  POST /user/login
  Content-Type: application/json
  Body: { "username": "user1", "password": "pass123" }
  ```

---

## 🎯 **Notes**
- Ensure MongoDB is running and connected.
- The API follows RESTful principles.
- `uploads/` directory is used for serving static files.

This guide should help anyone set up and use your **Product API** efficiently! 🚀 Let me know if you need modifications.
