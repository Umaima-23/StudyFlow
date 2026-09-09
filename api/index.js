import mongoose from "mongoose"
import { createApp } from "../server/app.js"

let connectionPromise
const app = createApp()

export default async function handler(request, response) {
  try {
    if (!request.url.startsWith("/api")) request.url = `/api${request.url.startsWith("/") ? "" : "/"}${request.url}`
    if (request.url === "/api/health") return response.json({ status: "ok" })
    if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) return response.status(500).json({ message: "Server environment is not configured." })
    if (!connectionPromise) connectionPromise = mongoose.connect(process.env.MONGODB_URI)
    await connectionPromise
    return app(request, response)
  } catch (error) {
    connectionPromise = null
    console.error("MongoDB connection failed:", error.message)
    return response.status(500).json({ message: "Database connection failed." })
  }
}
