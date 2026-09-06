import { useEffect, useMemo, useState } from "react"
import { StudyContext } from "./StudyContextValue"
import { useAuth } from "./useAuth"
import { api } from "../lib/api"

export function StudyProvider({ children }) {
  const { user } = useAuth()
  return <UserStudyData key={user?.id || "guest"} user={user}>{children}</UserStudyData>
}

function UserStudyData({ children, user }) {
  const [tasks, setTasks] = useState([])
  const [theme, setTheme] = useState(() => localStorage.getItem("study-flow-theme") || "light")
  const [studyHours, setStudyHours] = useState(user?.studyHours || 0)

  useEffect(() => { if (user) api.getTasks().then(({ tasks: savedTasks }) => setTasks(savedTasks)).catch(() => setTasks([])) }, [user])
  useEffect(() => {
    localStorage.setItem("study-flow-theme", theme)
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])
  const updateStudyHours = (value) => { const nextValue = typeof value === "function" ? value(studyHours) : value; setStudyHours(nextValue); api.updateStudyHours(nextValue).catch(() => {}) }

  const addTask = async (task) => { const { task: savedTask } = await api.addTask(task); setTasks((current) => [savedTask, ...current]) }
  const updateTask = async (id, changes) => { const { task: savedTask } = await api.updateTask(id, changes); setTasks((current) => current.map((task) => task.id === id ? savedTask : task)) }
  const toggleTask = async (id) => { const task = tasks.find((item) => item.id === id); if (task) updateTask(id, { completed: !task.completed }) }
  const deleteTask = async (id) => { await api.deleteTask(id); setTasks((current) => current.filter((task) => task.id !== id)) }
  const clearTasks = async () => { await api.clearTasks(); setTasks([]) }

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length
    const total = tasks.length
    return { total, completed, pending: total - completed, progress: total ? Math.round((completed / total) * 100) : 0 }
  }, [tasks])

  return <StudyContext.Provider value={{ tasks, addTask, updateTask, toggleTask, deleteTask, clearTasks, theme, setTheme, studyHours, setStudyHours: updateStudyHours, stats }}>
    {children}
  </StudyContext.Provider>
}

