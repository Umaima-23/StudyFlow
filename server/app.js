import cors from "cors"
import express from "express"
import authRoutes from "./routes/auth.js"
import taskRoutes from "./routes/tasks.js"
import profileRoutes from "./routes/profile.js"
import subjectRoutes from "./routes/subjects.js"

export function createApp() {
  const app = express()
  app.use(cors({ origin: process.env.CLIENT_URL || true }))
  app.use(express.json({ limit: "20kb" }))
  app.get("/api/health", (_request, response) => response.json({ status: "ok" }))
  app.use("/api/auth", authRoutes)
  app.use("/api/tasks", taskRoutes)
  app.use("/api/profile", profileRoutes)
  app.use("/api/subjects", subjectRoutes)
  app.use((error, _request, response, _next) => {
    console.error(error)
    response.status(error.name === "ValidationError" ? 400 : 500).json({ message: error.name === "ValidationError" ? "Please check the submitted data." : "Something went wrong on the server." })
  })
  return app
}
