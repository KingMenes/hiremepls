import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import questions from "./routes/questionRoutes.js";
import users from "./routes/userRoutes.js";
import comments from "./routes/commentRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import session from "express-session";
import MongoDBStores from "connect-mongodb-session";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const port = process.env.PORT || 8000;
connectDB();
const MongoDBStore = MongoDBStores(session);
const MAX_AGE = 1000 * 60 * 60 * 3; // 3hrs
const env = process.env.NODE_ENV || "development";
const serverURL =
  env === "production"
    ? "https://hiremepls-api.onrender.com/"
    : `http://localhost:${port}/`;

// Connect to DB
const app = express();
const mongoDbstore = new MongoDBStore({
  uri: process.env.HIREMEPLS_DB_URI,
  collection: "mySessions",
});

// Use middleware
app.use(
  session({
    secret: process.env.JWT_SECRET,
    name: "session",
    store: mongoDbstore,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: true,
    },
    resave: true,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors()
  // {
  // origin: `${serverURL}/*`,
  // optionsSuccessStatus: 200
  // }
);
app.use(errorHandler);


// Confirmation on successful connect
app.listen(port, () => console.log(`Server started on port ${port}`));


// api routes
app.use("/api/questions", questions);
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
