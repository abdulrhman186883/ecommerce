🛒 MERN E-Commerce Store

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js).
It includes full authentication, product browsing, and a complete shopping cart system with real backend logic.

🚀 Tech Stack
Frontend

React (Vite)

React Router

Context API (Auth + Cart)

Material UI

Fetch API (REST)

Backend

Node.js

Express.js

MongoDB & Mongoose

JWT Authentication

Bcrypt Password Hashing

📦 Features
🔐 User Authentication

Register new users

Login with JWT

Protected routes

Automatic token saving (LocalStorage)

🛍️ Products

Fetch and display all products

Product details (title, price, image)

🛒 Shopping Cart

Add items to cart

Prevent duplicate items

Update quantity

Delete items

Auto-calculate subtotal & total

Cart saved per user (MongoDB)

Product population via populate('items.product')

💳 Checkout

Creates a real order in MongoDB

Clears the cart after checkout

Order contains product details, quantity, and total

📂 Folder Structure
/frontend
  /src
    /components
    /context
    /pages
    app.tsx

/backend
  /src
    /routes
    /controllers
    /services
    /models
    index.ts

📑 API Endpoints
Auth
POST /user/register
POST /user/login

Products
GET /products

Cart
POST   /cart/items
PATCH  /cart/items
DELETE /cart/items
GET    /cart
POST   /cart/checkout

🔧 Installation & Setup
1. Clone the repo
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2. Backend Setup
cd backend
npm install
npm run dev

3. Frontend Setup
cd frontend
npm install
npm run dev

🔑 Environment Variables

Create a .env file inside the backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3001

🧪 Postman Testing
Register
{
  "firstName": "Zak",
  "lastName": "Abdullah",
  "email": "zak@test.com",
  "password": "123456"
}

Login
{
  "email": "zak@test.com",
  "password": "123456"
}


Use the returned token as:

Authorization: Bearer <your_token>

📌 Roadmap (Future Features)

Admin dashboard

Product creation & editing

Order history page

Stripe/PayPal payments

Product categories

Image uploads

Dark mode

👨‍💻 Author

Abdalrhman Abdullah
MERN Stack Developer | HCI Bauhaus 
Germany / Egypt



