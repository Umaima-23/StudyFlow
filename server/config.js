import dotenv from "dotenv"
import { fileURLToPath } from "node:url"

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) })

if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  throw new Error("Missing MONGODB_URI or JWT_SECRET in study flow/.env or Vercel environment variables.")
}
