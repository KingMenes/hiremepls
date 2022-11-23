import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

import questions from "./api/questions_route.js"

app.use("/api/questions", questions)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app
