import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, default: "", maxlength: 1000 },
  category: { type: String, default: "Other" },
  priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
  dueDate: { type: String, default: "" },
  completed: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model("Task", taskSchema)
