import { BookOpen, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "../context/useAuth"

function loadSubjects(storageKey) {
  try { return JSON.parse(localStorage.getItem(storageKey) || "[]") } catch { return [] }
}

export default function Subjects() {
  const { user } = useAuth()
  const storageKey = `study-flow-subjects-${user.email}`
  const [subjects, setSubjects] = useState(() => loadSubjects(storageKey))
  const [newSubject, setNewSubject] = useState("")
  useEffect(() => localStorage.setItem(storageKey, JSON.stringify(subjects)), [storageKey, subjects])
  const addSubject = () => { if (!newSubject.trim()) return; setSubjects((current) => [...current, newSubject.trim()]); setNewSubject("") }
  return <div className="max-w-3xl space-y-7"><section><p className="eyebrow">Your curriculum</p><h1 className="page-title">Subjects</h1><p className="page-subtitle">Keep the topics you are actively learning in one place.</p></section><section className="panel"><h2 className="section-title">Add subject</h2><div className="mt-5 flex flex-col gap-3 sm:flex-row"><input value={newSubject} onChange={(event) => setNewSubject(event.target.value)} onKeyDown={(event) => event.key === "Enter" && addSubject()} placeholder="e.g. Data structures" className="field-input mt-0 flex-1" /><button onClick={addSubject} className="button-primary"><Plus size={18} /> Add subject</button></div></section><section className="panel"><div className="section-header"><div><p className="eyebrow">Learning areas</p><h2 className="section-title">My subjects</h2></div><div className="rounded-xl bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-500/10"><BookOpen size={18} /></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{subjects.length ? subjects.map((subject, index) => <div key={`${subject}-${index}`} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60"><span className="font-medium text-slate-700 dark:text-slate-200">{subject}</span><button onClick={() => setSubjects((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="icon-button text-rose-500 hover:bg-rose-50 hover:text-rose-600" aria-label={`Delete ${subject}`}><Trash2 size={17} /></button></div>) : <div className="empty-state sm:col-span-2"><div className="empty-icon"><BookOpen size={22} /></div><p className="mt-3 font-semibold text-slate-800 dark:text-slate-100">No subjects yet</p><p className="mt-1 text-sm text-slate-500">Add your first learning area above.</p></div>}</div></section></div>
}
