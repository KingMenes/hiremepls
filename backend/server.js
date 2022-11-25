import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// const connectDB = require('./config/db')
import connectDB from "./config/db.js";
const port = process.env.PORT || 8000;
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import questions from "./routes/questionRoutes.js";
import users from "./routes/userRoutes.js";

app.listen(port, () => console.log(`Server started on port ${port}`));
app.use(cors());
app.use(express.json());

app.use("/api/questions", questions);
app.use("/api/users", users);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
