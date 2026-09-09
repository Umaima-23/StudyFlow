import mongoose from "mongoose"
import { createApp } from "../server/app.js"
import "../server/config.js"

let connectionPromise
const app = createApp()

export default async function handler(request, response) {
  if (!connectionPromise) connectionPromise = mongoose.connect(process.env.MONGODB_URI)
  try {
    await connectionPromise
    if (!request.url.startsWith("/api")) request.url = `/api${request.url.startsWith("/") ? "" : "/"}${request.url}`
    return app(request, response)
  } catch (error) {
    connectionPromise = null
    console.error("MongoDB connection failed:", error.message)
    return response.status(500).json({ message: "Database connection failed." })
  }
}
