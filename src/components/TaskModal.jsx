import { X } from "lucide-react"
import { useState } from "react"

const blankTask = { title: "", description: "", category: "React", priority: "Medium", dueDate: "" }
const categories = ["React", "JavaScript", "HTML/CSS", "Assignment", "Revision", "Personal", "Other"]
const priorities = ["High", "Medium", "Low"]

export default function TaskModal({ task, onSave, onClose }) {
  const [form, setForm] = useState(task ? { ...blankTask, ...task } : blankTask)
  const [error, setError] = useState("")
  const isEditing = Boolean(task)

  const submit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) {
      setError("Please enter a task title.")
      return
    }
    onSave({ title: form.title.trim(), description: form.description.trim(), category: form.category, priority: form.priority, dueDate: form.dueDate })
  }

  const update = (field, value) => { setForm((current) => ({ ...current, [field]: value })); setError("") }

  return <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-sm"><div className="flex min-h-full items-center justify-center"><form onSubmit={submit} className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-8" aria-label={isEditing ? "Edit task" : "Add task"}>
    <div className="flex items-center justify-between"><div><p className="eyebrow">Task details</p><h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">{isEditing ? "Edit task" : "Add a new task"}</h2></div><button type="button" onClick={onClose} className="icon-button" aria-label="Close"><X size={20} /></button></div>
    <div className="mt-7 space-y-5"><label className="field-label">Task title<input autoFocus value={form.title} onChange={(event) => update("title", event.target.value)} placeholder="e.g. Finish React dashboard" className="field-input" />{error && <span className="mt-1 block text-xs font-medium text-rose-600">{error}</span>}</label><label className="field-label">Description<span className="field-hint">Optional</span><textarea value={form.description} onChange={(event) => update("description", event.target.value)} placeholder="Add a little context for your future self" className="field-input min-h-24 resize-y" /></label><div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Category<select value={form.category} onChange={(event) => update("category", event.target.value)} className="field-input">{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label className="field-label">Priority<select value={form.priority} onChange={(event) => update("priority", event.target.value)} className="field-input">{priorities.map((priority) => <option key={priority}>{priority}</option>)}</select></label></div><label className="field-label">Due date<input type="date" value={form.dueDate} onChange={(event) => update("dueDate", event.target.value)} className="field-input" /></label></div>
    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={onClose} className="button-secondary">Cancel</button><button type="submit" className="button-primary">{isEditing ? "Save changes" : "Add task"}</button></div>
  </form></div></div>
}
