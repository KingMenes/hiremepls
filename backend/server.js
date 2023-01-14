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
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const port = process.env.PORT || 8000;
const MongoDBStore = MongoDBStores(session);
const MAX_AGE = 1000 * 60 * 60 * 3; // 3hrs
const env = process.env.NODE_ENV || 'development'
const serverURL = env === 'production' ? 'https://hiremepls-api.onrender.com/api' : `http://localhost:${port}/api`


// Connect to DB
const app = express();
const mongoDbstore = new MongoDBStore({
  uri: process.env.HIREMEPLS_DB_URI,
  collection: "mySessions",
});
connectDB();

// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(
  // {
  // origin: `${serverURL}/*`,
  // optionsSuccessStatus: 200
  // }
));
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

// // Serve static html
// app.use(['/questions', '/askquestion', 'updatequestions', '/'], express.static(path.join(__dirname, '../client/build'))); 

// api routes

app.use("/api/questions", questions);
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));


export default app;
