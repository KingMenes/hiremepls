import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// const connectDB = require('./config/db')
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
import cookieParser from "cookie-parser";

const MongoDBStore = MongoDBStores(session);
const MAX_AGE = 1000 * 60 * 60 * 3; // 3hrs

// Connect to DB
const port = process.env.PORT || 8000;
const app = express();
const mongoDbstore = new MongoDBStore({
  uri: process.env.HIREMEPLS_DB_URI,
  collection: "mySessions",
});
connectDB();

// Use middleware
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use(cookieParser());

// app.use(
//   session({
//     secret: process.env.JWT_SECRET,
//     name: "session-id",
//     store: mongoDbstore,
//     cookie: {
//       maxAge: MAX_AGE,
//       sameSite: false,
//       secure: false,
//     },
//     resave: true,
//     saveUninitialized: false,
//   })
// );

// Confirmation on successful connect
app.listen(port, () => console.log(`Server started on port ${port}`));

// api routes
app.use("/api/questions", questions);
app.use("/api/users", users);
app.use("/api/comments", comments);
// app.use("*", (req, res) => res.status(404).json({ error: "not found" }));
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});
export default app;
