#  Product API - Week 2 Assignment

This is a simple RESTful API built using **Node.js** and **Express.js** to manage products using an **in-memory database** . It supports basic CRUD operations and includes request logging, custom error handling, and basic token-based authentication.

---

##  Features

- Create, Read, Update, and Delete (CRUD) products
- In-memory data storage (array)
- Request logging middleware
- Custom error-handling middleware
- Token-based authentication using the `Authorization` header

---

##  Tech Stack

- Node.js
- Express.js
- uuid (for generating unique IDs)
- Postman (for testing)

---

##  Project Structure
 -- server.js
 -- package.json
 -- package-lock.json
 -- README.md

## Setup instructions

### 1. Clone the Repository

   https://github.com/PLP-MERN-Stack-Development/week-2-express-js-assignment-KelvinMbugii.git

### 2. install dependencies
   -- npm install
   -- npm install uuid
   -- npm install nodemon
### 3. Run the server
   -- npm run dev
   -- server runs on http://localhost:3000

### 4. Test the API in postman Through:
  -- 1. Get request -> /api/products
  -- 2. Get a single product -> /api/products/:id
  -- 3. POST -> /api/products => this is protected. Required to include ==> -- Authorization: mysecrettoken in the header

  -- 4. PUT -> /api/products/:id
  -- 5. DELETE -> /api/products/:id
