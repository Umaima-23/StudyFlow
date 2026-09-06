import { useEffect, useMemo, useState } from "react"
import { StudyContext } from "./StudyContextValue"
import { useAuth } from "./useAuth"


function loadTasks(storageKey) {
  try {
    const saved = localStorage.getItem(storageKey)
    if (!saved) return []
    return JSON.parse(saved).map((task) => ({
      ...task,
      description: task.description || "",
      category: task.category || "Other",
      priority: task.priority || "Medium",
      dueDate: task.dueDate || "",
      createdAt: task.createdAt || Date.now(),
    }))
  } catch {
    return []
  }
}

export function StudyProvider({ children }) {
  const { user } = useAuth()
  const storageKey = user ? `study-flow-tasks-${user.email}` : "study-flow-tasks-guest"
  const hoursKey = user ? `study-flow-hours-${user.email}` : "study-flow-hours-guest"
  return <UserStudyData key={storageKey} storageKey={storageKey} hoursKey={hoursKey}>{children}</UserStudyData>
}

function UserStudyData({ children, storageKey, hoursKey }) {
  const [tasks, setTasks] = useState(() => loadTasks(storageKey))
  const [theme, setTheme] = useState(() => localStorage.getItem("study-flow-theme") || "light")
  const [studyHours, setStudyHours] = useState(() => Number(localStorage.getItem(hoursKey) || 0))

  useEffect(() => localStorage.setItem(storageKey, JSON.stringify(tasks)), [storageKey, tasks])
  useEffect(() => {
    localStorage.setItem("study-flow-theme", theme)
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])
  useEffect(() => localStorage.setItem(hoursKey, String(studyHours)), [hoursKey, studyHours])

  const addTask = (task) => setTasks((current) => [...current, { ...task, id: Date.now(), createdAt: Date.now(), completed: false }])
  const updateTask = (id, changes) => setTasks((current) => current.map((task) => task.id === id ? { ...task, ...changes } : task))
  const toggleTask = (id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))
  const deleteTask = (id) => setTasks((current) => current.filter((task) => task.id !== id))
  const clearTasks = () => setTasks([])

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length
    const total = tasks.length
    return { total, completed, pending: total - completed, progress: total ? Math.round((completed / total) * 100) : 0 }
  }, [tasks])

  return <StudyContext.Provider value={{ tasks, addTask, updateTask, toggleTask, deleteTask, clearTasks, theme, setTheme, studyHours, setStudyHours, stats }}>
    {children}
  </StudyContext.Provider>
}

