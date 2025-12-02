🚀 TinyLink – URL Shortener Backend

A fast, lightweight, and scalable URL Shortener backend API built using Node.js, Express.js, and PostgreSQL (NeonDB).
This service powers the TinyLink frontend by generating short URLs, redirecting users, and tracking click statistics.

⭐ Features

🔗 Shorten URLs into 6–8 character alphanumeric codes

🧾 Custom code support (user can provide their own short code)

📈 Click tracking (increments on each redirect)

🕒 Last clicked timestamp

📁 CRUD operations for links

🩺 Health check endpoint

🛡 Input validation (URL + short code)

🌐 Fully PostgreSQL compatible (Neon serverless)

🛠 Tech Stack

Node.js

Express.js

PostgreSQL (Neon)

pg PostgreSQL client

dotenv (environment config)

cors (API access)

📦 Installation
1️⃣ Clone the repository
git clone https://github.com/your-username/tinylink-backend.git
cd tinylink-backend

2️⃣ Install dependencies
npm install

🔐 Environment Variables

Create a .env file in the root folder and add:

PORT=5000
BASE_URL=http://localhost:5000
DATABASE_URL=postgresql://<user>:<password>@<neon-host>/<db>?sslmode=require


⚠ DATABASE_URL must be a Neon PostgreSQL connection string.
⚠ Ensure .env is added to .gitignore.

🗄 Database Setup

Run this SQL in your NeonDB SQL Editor:

CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(8) UNIQUE NOT NULL,
  url TEXT NOT NULL,
  clicks INT DEFAULT 0,
  last_clicked TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

▶ Running the server
Development mode
npm run dev

Production mode
npm start


Server will run on:

http://localhost:5000

📡 API Endpoints
1. Health Check
GET /healthz

Response:

{ "status": "ok" }

2. Create Short URL
POST /api/links
Request Body:
{
  "url": "https://google.com",
  "code": "custom12"     // optional
}

Success Response:
{
  "code": "abc123",
  "url": "https://google.com",
  "shortUrl": "http://localhost:5000/abc123",
  "clicks": 0,
  "lastClicked": null
}

3. Get All Links
GET /api/links

Returns all short URLs.

4. Get Single Link Details
GET /api/links/:code
5. Delete a Short URL
DELETE /api/links/:code
6. Redirect Short URL
GET /:code

Redirects the user to the original URL and updates click count.

✨ Folder Structure
Backend/
│── Controllers/
│     └── linksController.js
│── DBCON/
│     └── db.js
│── Routes/
│     └── linksRoutes.js
│── server.js
│── package.json
│── .env
│── .gitignore

🧪 Testing Using Postman
POST /api/links
{
  "url": "https://example.com"
}

GET /api/links
GET /api/links/abc123
DELETE /api/links/abc123
🛠 Deployment
Backend can be deployed on:

Render

Railway

Cyclic

AWS

Vercel Serverless (optional)

Just set the environment variable:

DATABASE_URL=<your neon db url>

🎯 Final Notes

Fully compatible with Neon Serverless PostgreSQL

Secure .env handling

Clean routing and controller separation

Supports both local + production deployments
