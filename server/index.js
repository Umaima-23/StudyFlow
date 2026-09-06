import mongoose from "mongoose"
import { createApp } from "./app.js"
import "./config.js"

const port = process.env.PORT || 5000
const app = createApp()

mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`Study Flow API listening on http://localhost:${port}`)))
  .catch((error) => { console.error("MongoDB connection failed:", error.message); process.exit(1) })
