import {
    LayoutDashboard,
    CheckSquare,
    BookOpen,
    TrendingUp,
    Clock3,
    Settings,
    X,
    LogOut,
} from "lucide-react"

import { useLocation,useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
const Sidebar = ({ mobileOpen = false, onClose = () => {} }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, signOut } = useAuth()

    const links = [
        { label: "Dashboard", path: "/", icon: LayoutDashboard },
        { label: "My Tasks", path: "/tasks", icon: CheckSquare },
        { label: "Progress", path: "/progress", icon: TrendingUp },
        { label: "Study Hours", path: "/study-hours", icon: Clock3 },
        { label: "Subjects", path: "/subjects", icon: BookOpen },
        { label: "Settings", path: "/settings", icon: Settings },
    ]

    return (
        <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>

            {/* Logo */}
            <div className="mb-8 lg:mb-10">

                <div className="flex items-center justify-between">
                    <h1 className="text-xl lg:text-2xl font-bold text-indigo-600 text-center lg:text-left">
                        <span className="lg:hidden">S<span className="text-slate-900 dark:text-white">F</span></span>
                        <span className="hidden lg:inline">Study<span className="text-slate-900 dark:text-white">Flow</span></span>
                    </h1>
                    <button onClick={onClose} className="icon-button lg:hidden" aria-label="Close navigation"><X size={19} /></button>
                </div>

                <p className="hidden lg:block text-xs text-slate-400 mt-1">
                    Student Productivity
                </p>

            </div>


            {/* Navigation */}
            <nav className="space-y-1">
                {links.map(({ label, path, icon: Icon }) => <button key={path} onClick={() => { navigate(path); onClose() }} className={`nav-link ${location.pathname === path ? "nav-link-active" : ""}`}>
                    <Icon size={19} /><span>{label}</span>
                </button>)}
            </nav>

            <div className="sidebar-footer"><div className="flex items-center gap-3"><div className="profile-avatar">{user.name.slice(0, 1).toUpperCase()}</div><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">{user.name}</p><p className="truncate text-xs text-slate-400">{user.email}</p></div><button onClick={signOut} className="icon-button ml-auto" aria-label="Log out"><LogOut size={16} /></button></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full w-3/4 rounded-full bg-indigo-600" /></div></div>

        </aside>
    )
}

export default Sidebar