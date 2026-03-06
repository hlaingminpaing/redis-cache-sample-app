// // Simple Node.js demo app with Redis cache + latency test
// // Includes dotenv and fixed syntax

// import express from "express";
// import fetch from "node-fetch";
// import { createClient } from "redis";
// import dotenv from "dotenv";
// dotenv.config();

// // -------------------- CONFIG --------------------
// const USE_CACHE = false; // toggle to test with or without cache
// const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// // Create Redis client
// let redisClient;
// if (USE_CACHE) {
//   redisClient = createClient({ url: REDIS_URL });
//   redisClient.connect().catch(console.error);
// }

// const app = express();
// app.use(express.json());

// // -------------------- LATENCY MEASURE FUNCTION --------------------
// function measureTime(fn) {
//   const start = Date.now();
//   return fn().then((result) => ({ result, ms: Date.now() - start }));
// }

// // -------------------- SAMPLE DATA SOURCE --------------------
// async function fetchSampleData() {
//   await new Promise((r) => setTimeout(r, 1500));
//   return {
//     message: "Sample data fetched successfully",
//     timestamp: new Date().toISOString(),
//   };
// }

// // -------------------- API ENDPOINT --------------------
// app.get("/api/data", async (req, res) => {
//   try {
//     const cacheKey = "demo:data";

//     if (USE_CACHE && redisClient) {
//       const cached = await measureTime(() => redisClient.get(cacheKey));
//       if (cached.result) {
//         return res.json({
//           source: "cache",
//           latency_ms: cached.ms,
//           data: JSON.parse(cached.result),
//         });
//       }
//     }

//     const live = await measureTime(fetchSampleData);

//     if (USE_CACHE && redisClient) {
//       await redisClient.setEx(cacheKey, 10, JSON.stringify(live.result));
//     }

//     res.json({ source: "live", latency_ms: live.ms, data: live.result });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // -------------------- UI --------------------
// app.get("/", (req, res) => {
//   res.send(`
//   <!DOCTYPE html>
//   <html>
//   <head>
//     <title>Demo Cache App</title>
//     <style>
//       body { background: #000; color: #fff; font-family: Arial; margin: 0; padding: 0; }
//       .container { max-width: 420px; margin: 80px auto; padding: 20px; border: 1px solid #fff; border-radius: 10px; text-align: center; }
//       button { background: #fff; color: #000; border: 0; padding: 12px 22px; font-size: 16px; cursor: pointer; border-radius: 6px; }
//       button:hover { background: #ccc; }
//       .output { margin-top: 20px; padding: 15px; background: #111; border-radius: 8px; font-family: monospace; white-space: pre-wrap; }
//     </style>
//   </head>

//   <body>
//     <div class="container">
//       <h2>Redis Cache Test App</h2>
//       <button onclick="loadData()">Load Data</button>
//       <div id="out" class="output">Waiting...</div>
//     </div>

//     <script>
//       async function loadData() {
//         document.getElementById('out').innerText = 'Loading...';
//         const res = await fetch('/api/data');
//         const json = await res.json();
//         document.getElementById('out').innerText = JSON.stringify(json, null, 2);
//       }
//     </script>
//   </body>
//   </html>
//   `);
// });

// // -------------------- START SERVER --------------------
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// Simple Node.js demo app with Redis cache + latency test
// Includes dotenv and fixed syntax

import express from "express";
import fetch from "node-fetch";
import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

// -------------------- CONFIG --------------------
const USE_CACHE = false; // toggle to test with or without cache
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Create Redis client
let redisClient;
if (USE_CACHE) {
  redisClient = createClient({ url: REDIS_URL });
  redisClient.connect().catch(console.error);
}

const app = express();
app.use(express.json());

// -------------------- LATENCY MEASURE FUNCTION --------------------
function measureTime(fn) {
  const start = Date.now();
  return fn().then((result) => ({ result, ms: Date.now() - start }));
}

// -------------------- SAMPLE DATA SOURCE --------------------
async function fetchSampleData() {
  await new Promise((r) => setTimeout(r, 1500));
  return {
    message: "Sample data fetched successfully",
    timestamp: new Date().toISOString(),
  };
}

// -------------------- API ENDPOINT --------------------
app.get("/api/data", async (req, res) => {
  try {
    const cacheKey = "demo:data";

    if (USE_CACHE && redisClient) {
      const cached = await measureTime(() => redisClient.get(cacheKey));
      if (cached.result) {
        return res.json({
          source: "cache",
          latency_ms: cached.ms,
          data: JSON.parse(cached.result),
        });
      }
    }

    const live = await measureTime(fetchSampleData);

    if (USE_CACHE && redisClient) {
      await redisClient.setEx(cacheKey, 10, JSON.stringify(live.result));
    }

    res.json({ source: "live", latency_ms: live.ms, data: live.result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -------------------- UI --------------------
app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Demo Cache App</title>
    <style>
      body {
        background: #ffffff;
        color: #000000;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 520px;
        margin: 60px auto;
        padding: 30px;
        border: 1px solid #000;
        border-radius: 12px;
        background: #f5f5f5;
        box-shadow: 0 0 10px rgba(0,0,0,0.08);
        text-align: center;
      }

      h2 {
        margin-top: 0;
        font-size: 26px;
        letter-spacing: 0.5px;
      }

      button {
        background: #000000;
        color: #ffffff;
        border: none;
        padding: 12px 24px;
        font-size: 15px;
        cursor: pointer;
        border-radius: 6px;
        margin: 6px;
        transition: 0.2s ease-in-out;
      }

      button:hover {
        background: #444444;
      }

      #mode {
        font-weight: bold;
      }

      .output {
        margin-top: 20px;
        padding: 18px;
        background: #e6e6e6;
        color: #000;
        border-radius: 10px;
        font-family: monospace;
        white-space: pre-wrap;
        min-height: 140px;
        text-align: left;
      }

      canvas {
        background: #ffffff;
        border: 1px solid #000;
        border-radius: 10px;
        margin-top: 10px;
      }
    </style>
  </head>
  <body>

    <div class="container">
      <h2>Redis Cache Test App</h2>
      <p style="color:#333;">White & Black Minimal Modern UI</p>

      <button onclick="toggleMode()">Toggle Cache Mode</button>
      <button onclick="loadData()">Load Data</button>

      <div style="margin-top:10px;">
        Current Mode: <span id="mode">CACHE</span>
      </div>

      <div id="out" class="output">Waiting...</div>

      <h3>Latency Graph (ms)</h3>
      <canvas id="chart" width="400" height="180"></canvas>
    </div>

    <script>
      let useCache = true;

      function toggleMode() {
        useCache = !useCache;
        document.getElementById("mode").innerText = useCache ? "CACHE" : "NO CACHE";
      }

      async function loadData() {
        document.getElementById("out").innerText = "Loading...";
        const res = await fetch("/api/data", { headers: { "X-Use-Cache": useCache } });
        const json = await res.json();
        document.getElementById("out").innerText = JSON.stringify(json, null, 2);
        addPoint(json.latency_ms);
      }

      // GRAPH
      const canvas = document.getElementById("chart");
      const ctx = canvas.getContext("2d");
      let points = [];

      function addPoint(value) {
        points.push(value);
        if (points.length > 20) points.shift();
        drawChart();
      }

      function drawChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.beginPath();

        points.forEach((p, i) => {
          const x = (i / 20) * canvas.width;
          const y = canvas.height - (p / 2000 * canvas.height);
          ctx.lineTo(x, y);
        });

        ctx.stroke();
      }
    </script>

  </body>
  </html>
  `);
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
