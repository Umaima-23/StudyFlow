import {
    LayoutDashboard,
    CheckSquare,
    BookOpen,
    CalendarDays,
    Settings,
} from "lucide-react"

import { useLocation,useNavigate } from "react-router-dom"
const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <aside className="w-16 sm:w-20 lg:w-64 min-h-screen bg-white border-r border-slate-200 p-3 sm:p-4 lg:p-5 shrink-0">

            {/* Logo */}
            <div className="mb-8 lg:mb-10">

                <h1 className="text-xl lg:text-2xl font-bold text-indigo-600 text-center lg:text-left">
                    <span className="lg:hidden">S</span>
                    <span className="hidden lg:inline">StudyFlow</span>
                </h1>

                <p className="hidden lg:block text-xs text-slate-400 mt-1">
                    Student Productivity
                </p>

            </div>


            {/* Navigation */}
            <nav className="space-y-2">

                {/* Dashboard */}
                <button
                onClick={()=>{
                    navigate("/")
                }}
                className={`w-full flex items-center justify-center lg:justify-start gap-3 px-3 lg:px-4 py-3 rounded-xl ${
                location.pathname === "/"
                ? " bg-indigo-50 text-indigo-600 font-medium"
                 : "text-slate-600 hover:bg-slate-50"
                }`}
                
                >
                    <LayoutDashboard size={19} />

                    <span className="hidden lg:inline">
                        Dashboard
                    </span>
                </button>


                {/* Tasks */}
                <button
                onClick={()=>{
                    navigate("/tasks")
                }}
                className={`w-full flex items-center justify-center lg:justify-start gap-3 px-3 lg:px-4 py-3 rounded-xl font-medium ${
                location.pathname === "/tasks"
                    ? "bg-indigo-50 text-indigo-600"
                   :  "text-slate-600 hover:bg-slate-50"
                }`}
              >
                    <CheckSquare size={19} />

                    <span className="hidden lg:inline">
                        Tasks
                    </span>
                </button>


                {/* Subjects */}
                <button 
                onClick={()=>{
                    navigate("/subjects")
                }}
                className={`w-full flex items-center justify-center lg:justify-start gap-3 px-3 lg:px-4 py-3 rounded-xl font-medium ${
                location.pathname === "/subjects"
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-600 hover:bg-slate-50"
                }`}>
                    <BookOpen size={19} />

                    <span className="hidden lg:inline">
                        Subjects
                    </span>
                </button>


                {/* Schedule */}
                <button className="w-full flex items-center justify-center lg:justify-start gap-3 px-3 lg:px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50">
                    <CalendarDays size={19} />

                    <span className="hidden lg:inline">
                        Schedule
                    </span>
                </button>


                {/* Settings */}
                <button className="w-full flex items-center justify-center lg:justify-start gap-3 px-3 lg:px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50">
                    <Settings size={19} />

                    <span className="hidden lg:inline">
                        Settings
                    </span>
                </button>

            </nav>

        </aside>
    )
}

export default Sidebar