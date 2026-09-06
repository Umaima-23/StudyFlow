import { Menu, Moon, Sun, X } from "lucide-react"
import { useState } from "react"
import Sidebar from "./Sidebar"
import { useStudy } from "../context/useStudy"
import { useAuth } from "../context/useAuth"

export default function AppShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, setTheme } = useStudy()
  const { user } = useAuth()
  return <div className="app-shell"><Sidebar mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} /><div className="app-main"><header className="mobile-header"><button className="icon-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={21} /></button><span className="font-bold text-slate-900 dark:text-white">Study<span className="text-indigo-600">Flow</span></span><div className="flex items-center gap-1"><span className="mobile-user-name">{user.name}</span><button className="icon-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle dark mode">{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button></div></header><div className="page-content"><div className="desktop-theme-toggle"><span className="desktop-user-name">Hi, {user.name}</span><button className="icon-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle dark mode">{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button></div>{children}</div></div>{menuOpen && <button className="mobile-scrim" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={1} /></button>}</div>
}
