import bcrypt from "bcryptjs"
import { Router } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { requireAuth } from "../middleware/auth.js"

const router = Router()
const createToken = (user) => jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "7d" })
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, studyHours: user.studyHours })

router.post("/signup", async (request, response, next) => {
  try {
    const { name, email, password } = request.body
    if (!name?.trim() || !email?.trim() || !password) return response.status(400).json({ message: "Name, email, and password are required." })
    if (password.length < 6) return response.status(400).json({ message: "Password must be at least 6 characters." })
    const normalizedEmail = email.trim().toLowerCase()
    if (await User.exists({ email: normalizedEmail })) return response.status(409).json({ message: "An account with this email already exists." })
    const user = await User.create({ name: name.trim(), email: normalizedEmail, passwordHash: await bcrypt.hash(password, 12) })
    response.status(201).json({ token: createToken(user), user: publicUser(user) })
  } catch (error) { next(error) }
})

router.post("/signin", async (request, response, next) => {
  try {
    const { email, password } = request.body
    const user = await User.findOne({ email: email?.trim().toLowerCase() })
    if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) return response.status(401).json({ message: "That email or password is not correct." })
    response.json({ token: createToken(user), user: publicUser(user) })
  } catch (error) { next(error) }
})

router.get("/me", requireAuth, (request, response) => response.json({ user: publicUser(request.user) }))
router.post("/signout", requireAuth, (_request, response) => response.status(204).end())

export default router
