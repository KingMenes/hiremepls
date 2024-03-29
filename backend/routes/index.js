// backend/routes/index.js
import express from "express";
const router = express.Router();
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === "production") {
  // Serve the frontend's index.html file at the root route
  router.get("/", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../client", "build", "index.html")
    );
  });
  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../client/build")));
  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../client", "build", "index.html")
    );
  });
}
// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== "production") {
  router.get("/api/csrf/restore", (req, res) => {
    res.status(201).json({});
  });
}
export default router;
