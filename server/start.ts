import http from "node:http";
import compat from "core-js-compat";

const PORT = process.env.PORT || 3000;

// Create HTTPS server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle GET request for polyfills
  if (req.method === "GET" && req.url?.startsWith("/polyfill")) {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const features = url.searchParams.get("features")?.split(",") || [];
    const targets = url.searchParams.get("targets") || "defaults";

    try {
      // Get compatible polyfills using core-js-compat
      const { list } = compat({
        targets,
        filter: features.length > 0 ? features : undefined,
      });

      const response = {
        targets: targets,
        polyfills: list,
        count: list.length,
      };

      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end(JSON.stringify(response));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Failed to generate polyfills" }));
    }
    return;
  }

  // Handle health check
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  // Default 404 response
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

// Start server
server.listen(PORT, () => {
  console.log(`HTTPS server running on https://localhost:${PORT}`);
  console.log(`Health check: https://localhost:${PORT}/health`);
  console.log(
    `Polyfills endpoint: https://localhost:${PORT}/polyfill?targets=ie11&features=es.promise`,
  );
});

// Handle server errors
server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error("Server error:", error);
  }
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});
