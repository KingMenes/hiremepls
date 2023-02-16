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
import cookieParser from 'cookie-parser'
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

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
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use(
  session({
    secret: process.env.JWT_SECRET,
    name: "session-id",
    store: mongoDbstore,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: false,
    },
    resave: true,
    saveUninitialized: false,
  })
);

// Confirmation on successful connect
app.listen(port, () => console.log(`Server started on port ${port}`));

// api routes
app.use("/api/questions", questions);
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
export default app;
