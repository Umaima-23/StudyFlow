import { Router } from "express"
import Task from "../models/Task.js"
import { requireAuth } from "../middleware/auth.js"

const router = Router()
router.use(requireAuth)

router.get("/", async (request, response, next) => { try { response.json({ tasks: await Task.find({ user: request.user._id }).sort({ createdAt: -1 }) }) } catch (error) { next(error) } })
router.post("/", async (request, response, next) => { try { const task = await Task.create({ ...request.body, user: request.user._id }); response.status(201).json({ task }) } catch (error) { next(error) } })
router.patch("/:id", async (request, response, next) => { try { const task = await Task.findOneAndUpdate({ _id: request.params.id, user: request.user._id }, request.body, { new: true, runValidators: true }); if (!task) return response.status(404).json({ message: "Task not found." }); response.json({ task }) } catch (error) { next(error) } })
router.delete("/:id", async (request, response, next) => { try { const task = await Task.findOneAndDelete({ _id: request.params.id, user: request.user._id }); if (!task) return response.status(404).json({ message: "Task not found." }); response.status(204).end() } catch (error) { next(error) } })
router.delete("/", async (request, response, next) => { try { await Task.deleteMany({ user: request.user._id }); response.status(204).end() } catch (error) { next(error) } })

export default router
