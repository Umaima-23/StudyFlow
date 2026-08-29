import SideBar from "../components/Sidebar.jsx"
import { useState, useEffect } from "react"
import { Trash2 } from "lucide-react"

const Subjects = () => {

 const [subjects, setSubjects] = useState(() => {
    const savedSubjects = localStorage.getItem("subjects")

    if (savedSubjects) {
        return JSON.parse(savedSubjects)
    }

    return [
        {
            id: 1,
            name: "Web Development"
        },
        {
            id: 2,
            name: "JavaScript"
        },
        {
            id: 3,
            name: "React"
        }
    ]
})

  
    const [newSubject, setNewSubject] = useState("")
      useEffect(()=>{
        localStorage.setItem("subjects",JSON.stringify(subjects))
    },[subjects])

    const addSubject = () => {

        if (newSubject.trim() === "") {
            return
        }

        setSubjects([
            ...subjects,
            {
                id: Date.now(),
                name: newSubject
            }
        ])

        setNewSubject("")
    }

    const deleteSubject = (id) => {
        setSubjects(
            subjects.filter((subject) => {
                return subject.id !== id
            })
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">

            <SideBar />

            <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">

                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Subjects
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage your subjects
                    </p>
                </div>

                {/* Add Subject */}

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mt-8">

                    <h2 className="text-xl font-semibold text-slate-900">
                        Add Subject
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-3 mt-5">

                        <input
                            type="text"
                            value={newSubject}
                            onChange={(e) => {
                                setNewSubject(e.target.value)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    addSubject()
                                }
                            }}
                            placeholder="Enter subject name"
                            className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-200"
                        />

                        <button
                            onClick={addSubject}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium transition"
                        >
                            + Add Subject
                        </button>

                    </div>

                </div>

                {/* Subjects List */}

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mt-6">

                    <div className="flex items-center justify-between mb-5">

                        <div>
                            <h2 className="text-xl font-semibold text-slate-900">
                                My Subjects
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                {subjects.length} subjects
                            </p>
                        </div>

                    </div>

                    <div className="space-y-3">

                        {subjects.length === 0 ? (

                            <p className="text-center text-slate-400 py-8">
                                No subjects yet. Add your first subject!
                            </p>

                        ) : (

                            subjects.map((subject) => (

                                <div
                                    key={subject.id}
                                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition"
                                >

                                    <span className="text-slate-700 font-medium">
                                        {subject.name}
                                    </span>

                                    <button
                                        onClick={() => {
                                            deleteSubject(subject.id)
                                        }}
                                        className="text-red-500 hover:text-red-700 p-1"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </main>

        </div>
    )
}

export default Subjects