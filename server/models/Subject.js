import mongoose from "mongoose"

const subjectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
}, { timestamps: true })

export default mongoose.model("Subject", subjectSchema)
