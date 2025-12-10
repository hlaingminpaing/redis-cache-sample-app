# Redis Cache Demo App (Node.js)

A simple demo application to test API latency with and without Redis caching.
Includes a clean UI, latency graph, Redis integration, and Docker Compose support.

# 🚀 Features

- Node.js + Express API

- Redis caching (local or AWS ElastiCache)

- Beautiful minimal UI (white background, black text)

- Latency graph (client-side canvas)

- Toggle cache ON/OFF

- Ready for Docker & Docker Compose

- Works locally or deployed to any environment


# 🛠 Requirements

+ Node.js 18+ (only needed for manual run)

+ Docker Desktop (for containerized run)

# ⚡ Local Setup (Manual Run)
1️⃣ Install dependencies
``npm install``

2️⃣ Start Redis (local machine)

If you have Redis installed:

redis-server


Or use AWS ElastiCache by setting:

export REDIS_URL="redis://your-aws-redis-endpoint:6379"

3️⃣ Start the app
``npm start``


App will run at:

👉 http://localhost:3000

🐳 Local Setup With Docker Compose

This method starts:

Node.js app

Redis container

1️⃣ Build & start the stack
``docker compose up -d --build``

2️⃣ Stop containers
``docker compose down``

3️⃣ View container logs
``docker compose logs -f app``


App is available at:

👉 http://localhost:3000

# 🔧 Environment Variables

Create a .env file:
``
REDIS_URL=redis://redis:6379
USE_CACHE=true
PORT=3000
``

⚠ USE_CACHE=true enables caching
⚠ For AWS ElastiCache, update REDIS_URL accordingly

☁️ Use AWS Elasticache Redis Instead of Local Redis

Edit docker-compose.yml:

environment:
  REDIS_URL: "redis://your-aws-redis-url:6379"


Remove the Redis service section:

redis:
  image: redis:7-alpine
  ...

🧪 Testing Cache vs No Cache

Inside the UI:

Click Toggle Cache Mode

Click Load Data

Latency results appear:

In JSON output

On the latency graph

📝 Scripts
``npm install``   # install deps
``npm start``     # run server
``npm run dev``   # nodemon (optional)