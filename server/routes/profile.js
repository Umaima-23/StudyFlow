import { Router } from "express"
import User from "../models/User.js"
import { requireAuth } from "../middleware/auth.js"

const router = Router()
router.use(requireAuth)
router.patch("/study-hours", async (request, response, next) => { try { const studyHours = Math.max(0, Number(request.body.studyHours) || 0); const user = await User.findByIdAndUpdate(request.user._id, { studyHours }, { new: true }).select("name email studyHours"); response.json({ user }) } catch (error) { next(error) } })
export default router
