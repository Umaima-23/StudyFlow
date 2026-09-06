import { Router } from "express"
import Subject from "../models/Subject.js"
import { requireAuth } from "../middleware/auth.js"

const router = Router()
router.use(requireAuth)
router.get("/", async (request, response, next) => { try { response.json({ subjects: await Subject.find({ user: request.user._id }).sort({ createdAt: 1 }) }) } catch (error) { next(error) } })
router.post("/", async (request, response, next) => { try { const subject = await Subject.create({ name: request.body.name, user: request.user._id }); response.status(201).json({ subject }) } catch (error) { next(error) } })
router.delete("/:id", async (request, response, next) => { try { await Subject.findOneAndDelete({ _id: request.params.id, user: request.user._id }); response.status(204).end() } catch (error) { next(error) } })
export default router
