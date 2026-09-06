import jwt from "jsonwebtoken"
import User from "../models/User.js"

export async function requireAuth(request, response, next) {
  try {
    const token = request.headers.authorization?.startsWith("Bearer ") ? request.headers.authorization.slice(7) : null
    if (!token) return response.status(401).json({ message: "Authentication required." })
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.userId).select("name email studyHours")
    if (!user) return response.status(401).json({ message: "User account not found." })
    request.user = user
    next()
  } catch {
    response.status(401).json({ message: "Your session has expired. Please sign in again." })
  }
}
