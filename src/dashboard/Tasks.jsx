import { ListFilter, Plus, Search, SlidersHorizontal } from "lucide-react"
import { useMemo, useState } from "react"
import ConfirmDialog from "../components/ConfirmDialog"
import TaskCard from "../components/TaskCard"
import TaskModal from "../components/TaskModal"
import { useStudy } from "../context/useStudy"

const filters = ["All", "Pending", "Completed", "High", "Medium", "Low"]
export default function Tasks() {
  const { tasks, addTask, updateTask, toggleTask, deleteTask } = useStudy()
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [modalTask, setModalTask] = useState(undefined)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const query = search.toLowerCase()
    const matchesSearch = [task.title, task.category, task.description].some((value) => value.toLowerCase().includes(query))
    const matchesFilter = filter === "All" || (filter === "Pending" && !task.completed) || (filter === "Completed" && task.completed) || task.priority === filter
    return matchesSearch && matchesFilter
  }).sort((a, b) => Number(a.completed) - Number(b.completed)), [tasks, search, filter])
  const saveTask = (task) => { if (modalTask) updateTask(modalTask.id, task); else addTask(task); setModalTask(undefined) }

  return <div className="space-y-7"><section className="page-heading"><div><p className="eyebrow">Workspace</p><h1 className="page-title">My tasks</h1><p className="page-subtitle">Plan your work, keep your priorities visible, and make steady progress.</p></div><button onClick={() => setModalTask(null)} className="button-primary"><Plus size={18} /> Add task</button></section><section className="panel"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="search-wrap"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, category, or description..." /></div><div className="flex items-center gap-2 text-sm text-slate-500"><SlidersHorizontal size={16} /><span>{visibleTasks.length} of {tasks.length} tasks</span></div></div><div className="mt-5 flex gap-2 overflow-x-auto pb-1">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`filter-chip ${filter === item ? "filter-chip-active" : ""}`}>{item === "All" && <ListFilter size={14} />}{item}</button>)}</div></section><section className="space-y-3">{visibleTasks.length ? visibleTasks.map((task) => <TaskCard key={task.id} task={task} onToggle={toggleTask} onEdit={setModalTask} onDelete={setDeleteTarget} />) : <div className="panel empty-state"><div className="empty-icon"><ListFilter size={22} /></div><p className="font-semibold text-slate-800 dark:text-slate-100">No matching tasks</p><p className="mt-1 text-sm text-slate-500">Try a different filter or add a new task.</p><button onClick={() => setModalTask(null)} className="link-button mt-4"><Plus size={16} /> Add task</button></div>}</section>{modalTask !== undefined && <TaskModal key={modalTask?.id || "new"} task={modalTask} onSave={saveTask} onClose={() => setModalTask(undefined)} />}{deleteTarget && <ConfirmDialog title="Delete this task?" message={`Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`} onCancel={() => setDeleteTarget(null)} onConfirm={() => { deleteTask(deleteTarget.id); setDeleteTarget(null) }} />}</div>
}
