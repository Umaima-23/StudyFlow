import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import { fileURLToPath } from "node:url"
import authRoutes from "./routes/auth.js"
import taskRoutes from "./routes/tasks.js"
import profileRoutes from "./routes/profile.js"
import subjectRoutes from "./routes/subjects.js"

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) })

if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  console.error("Missing MONGODB_URI or JWT_SECRET in study flow/.env")
  process.exit(1)
}

const app = express()
const port = process.env.PORT || 5000

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }))
app.use(express.json({ limit: "20kb" }))
app.get("/api/health", (_request, response) => response.json({ status: "ok" }))
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/subjects", subjectRoutes)
app.use((error, _request, response, _next) => { console.error(error); response.status(error.name === "ValidationError" ? 400 : 500).json({ message: error.name === "ValidationError" ? "Please check the submitted data." : "Something went wrong on the server." }) })

mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`Study Flow API listening on http://localhost:${port}`)))
  .catch((error) => { console.error("MongoDB connection failed:", error.message); process.exit(1) })
