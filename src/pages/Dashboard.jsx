import { ArrowRight, CheckCircle2, Clock3, ListTodo, Plus, Target, TrendingUp } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ConfirmDialog from "../components/ConfirmDialog"
import TaskCard from "../components/TaskCard"
import TaskModal from "../components/TaskModal"
import { useStudy } from "../context/useStudy"
import { useAuth } from "../context/useAuth"

const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })

export default function Dashboard() {
  const navigate = useNavigate()
  const { tasks, addTask, updateTask, toggleTask, deleteTask, stats, studyHours } = useStudy()
  const { user } = useAuth()
  const [modalTask, setModalTask] = useState(undefined)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const recentTasks = [...tasks].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4)
  const saveTask = (task) => { if (modalTask) updateTask(modalTask.id, task); else addTask(task); setModalTask(undefined) }

  return <div className="space-y-8">
    <section className="page-heading"><div><p className="eyebrow">{today}</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Welcome back, {user.name} <span className="text-3xl">👋</span></h1><p className="mt-3 text-slate-500 dark:text-slate-400">Stay focused, stay productive, and keep making progress.</p></div><button onClick={() => setModalTask(null)} className="button-primary"><Plus size={18} /> Add task</button></section>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"><StatCard icon={ListTodo} label="Total tasks" value={stats.total} tone="indigo" /><StatCard icon={CheckCircle2} label="Completed" value={stats.completed} tone="emerald" /><StatCard icon={Target} label="Pending" value={stats.pending} tone="amber" /><StatCard icon={Clock3} label="Study hours" value={`${studyHours}h`} tone="sky" /><StatCard icon={TrendingUp} label="Productivity" value={`${stats.progress}%`} tone="violet" /></section>
    <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
      <section className="panel"><div className="section-header"><div><p className="eyebrow">Keep moving</p><h2 className="section-title">Recent tasks</h2></div><button onClick={() => navigate("/tasks")} className="link-button">View all <ArrowRight size={16} /></button></div><div className="mt-5 space-y-3">{recentTasks.length ? recentTasks.map((task) => <TaskCard key={task.id} task={task} onToggle={toggleTask} onEdit={setModalTask} onDelete={setDeleteTarget} />) : <EmptyTasks onAdd={() => setModalTask(null)} />}</div></section>
      <section className="panel flex flex-col"><div className="section-header"><div><p className="eyebrow">Your momentum</p><h2 className="section-title">Productivity overview</h2></div><div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-500/10"><TrendingUp size={20} /></div></div><div className="mt-7 flex items-center gap-6"><div className="progress-ring" style={{ "--progress": `${stats.progress * 3.6}deg` }}><div><strong>{stats.progress}%</strong><span>complete</span></div></div><div className="space-y-4 text-sm"><Metric label="Tasks completed" value={stats.completed} /><Metric label="Tasks remaining" value={stats.pending} /><Metric label="Study hours" value={`${studyHours}h`} /></div></div><div className="mt-auto pt-8"><div className="flex justify-between text-sm"><span className="font-medium text-slate-700 dark:text-slate-200">Weekly focus</span><span className="text-slate-500">{studyHours} / 8 hours</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${Math.min(studyHours / 8 * 100, 100)}%` }} /></div><p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{stats.progress >= 75 ? "You're doing great. Keep the rhythm going!" : "You're making progress. One focused session at a time."}</p></div></section>
    </div>
    {modalTask !== undefined && <TaskModal key={modalTask?.id || "new"} task={modalTask} onSave={saveTask} onClose={() => setModalTask(undefined)} />}
    {deleteTarget && <ConfirmDialog title="Delete this task?" message={`Are you sure you want to delete “${deleteTarget.title}”? This action cannot be undone.`} onCancel={() => setDeleteTarget(null)} onConfirm={() => { deleteTask(deleteTarget.id); setDeleteTarget(null) }} />}
  </div>
}

function StatCard({ icon: Icon, label, value, tone }) { return <div className="stat-card"><div className={`stat-icon stat-${tone}`}><Icon size={19} /></div><div><p className="text-sm text-slate-500 dark:text-slate-400">{label}</p><p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p></div></div> }
function Metric({ label, value }) { return <div><p className="text-slate-500 dark:text-slate-400">{label}</p><p className="mt-0.5 text-lg font-bold text-slate-900 dark:text-white">{value}</p></div> }
function EmptyTasks({ onAdd }) { return <div className="empty-state"><div className="empty-icon"><ListTodo size={22} /></div><p className="font-semibold text-slate-800 dark:text-slate-100">No tasks yet</p><p className="mt-1 text-sm text-slate-500">Start by adding your first study task.</p><button onClick={onAdd} className="link-button mt-4"><Plus size={16} /> Add task</button></div> }
