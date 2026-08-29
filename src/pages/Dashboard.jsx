import SideBar from "../components/Sidebar.jsx"
import { useState, useEffect } from "react";
import { Trash2, Pencil } from "lucide-react";
import Swal from 'sweetalert2'

const Dashboard = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks")
        if (savedTasks) {
            return JSON.parse(savedTasks)
        }
        return [{
            id: 1,
            title: "Complete React Practice",
            completed: false
        },
        {
            id: 2,
            title: "JavaScript Revision",
            completed: false,


        },

        {
            id: 3,
            title: "Read 10 Pages",
            completed: false
        },
        {
            id: 4,
            title: "Practice Coding ",
            completed: false,
        }]
    })

    const [subjects, setSubjects] = useState(() => {
    const savedSubjects = localStorage.getItem("subjects")

    if (savedSubjects) {
        return JSON.parse(savedSubjects)
    }

    return []
})

const totalSubjects = subjects.length
    // const [isLoad, setIsLoad] = useState(false)
    //======================
    // local storage -load
    // ======================

    // useEffect(()=>{
    //     const savedTasks = localStorage.getItem("tasks")
    //     if(savedTasks){
    //         setTasks(JSON.parse(savedTasks))
    //     }
    //     setIsLoad(true)
    // },[])
    //=====================
    // local Storage - save
    //=================
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    // console.log(localStorage.getItem(tasks));

    //=========================
    // Completed TAsk
    //===================
    const completedTasks = tasks.filter((task) => {
        return task.completed
    })
    // console.log(completedTasks);
    const completedCount = completedTasks.length
    // console.log(completedCount);

    const totalTasks = tasks.length
    // console.log(totalTasks);
    // =============================
    //          progress
    //==============================

    const progress = totalTasks === 0
        ? 0
        : completedCount / totalTasks * 100
    // console.log(progress);


    // ========================
    // study hours
    // ============================
    const studyHours = completedCount * 2
    // console.log(studyHours);

    //============================
    //weekly goal
    //=========================
    const weeklyGoal = 8

    //=========================
    // weekly progress
    //=======================

    const weeklyProgress = Math.min(
        (studyHours / weeklyGoal) * 100,
        100
    )
    // console.log(weeklyProgress);



    // ===================== 
    // new task
    //======================

    const [newTask, setNewTask] = useState("")

    //========================
    //add task 
    //====================

    const addTask = () => {
        if (newTask.trim() === "") {
            return
        }
        setTasks([

            ...tasks,
            {
                id: Date.now(),
                title: newTask,
                completed: false
            }
        ])

        setNewTask("")


    }

    //===============================
    //clear all tasks 
    //===================
    const clearAllTasks = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover your tasks!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, clear all!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                setTasks([]);

                Swal.fire({
                    title: "Cleared!",
                    text: "All tasks have been deleted.",
                    icon: "success"
                });
            }
        });
    };
    // ======================
    //edit task
    //=======================
    const [editTask, setEditTask] = useState(null)
    const [editText, setEditText] = useState("")




    //======================
    //  Update task
    // ====================== 

    const updateTask = () => {
        if (editText.trim() === "") {
            return
        }
        setTasks(

            tasks.map((item) => {
                return item.id === editTask.id
                    ? { ...item, title: editText }
                    : item
            })
        )
        setEditTask(null),
            setEditText("")


    }

    // date
    const today = new Date()

const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
})

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <SideBar />
            <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Study Flow
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Student Productivity Dashboard
                        </p>
                    </div>

                    <div className="text-sm text-slate-500">
                       {formattedDate}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                        <p className="text-slate-500 text-sm">Total Subjects</p>
                        <h2 className="text-3xl font-bold text-slate-900 mt-2">{totalSubjects}</h2>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                        <p className="text-slate-500 text-sm">Tasks Completed</p>
                        <h2 className="text-3xl font-bold text-slate-900 mt-2">{completedCount}</h2>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                        <p className="text-slate-500 text-sm">Study Time</p>
                        <h2 className="text-3xl font-bold text-slate-900 mt-2">{studyHours}</h2>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                        <p className="text-slate-500 text-sm">Overall Progress</p>
                        <h2 className="text-3xl font-bold text-slate-900 mt-2">{Math.round(progress)}%</h2>
                    </div>

                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                    {/* Today's Tasks */}
                    {/* Today's Tasks */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">
                                    Today's Tasks
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Keep up with your daily goals
                                </p>
                            </div>

                            <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full w-fit">
                                {completedCount} / {totalTasks}
                            </span>

                            <button
                                onClick={clearAllTasks}
                                disabled={tasks.length === 0}
                                className="text-sm text-red-500 hover:text-red-700 disabled:text-slate-300 disabled:cursor-not-allowed font-medium"
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Add Task */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-5 mb-5">
                            <input
                                type="text"
                                value={editTask ? editText : newTask}
                                onChange={(e) => {
                                    if (editTask) {
                                        setEditText(e.target.value)
                                    } else {
                                        setNewTask(e.target.value)
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        if (editTask) {
                                            updateTask()
                                        } else {
                                            addTask()
                                        }
                                    }
                                }}
                                placeholder="Enter a new task"
                                className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-slate-200"
                            />


                            <button
                                className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-2.5 rounded-xl font-medium transition"
                                onClick={editTask ? updateTask : addTask}
                            >
                                {editTask ? "Update Task" : "+ Add Task"}
                            </button>

                            {editTask && (
                                <button
                                    onClick={() => {
                                        setEditTask(null),
                                            setEditText("")
                                    }}
                                    className="border border-slate-200 text-slate-600 hover:bg-slate-100 px-1 py-1 rounded-xl font-medium transition "
                                >
                                    Cancel

                                </button>
                            )}


                        </div>

                        {/* Tasks */}
                        <div className="space-y-3">

                            {
                                tasks.length === 0 ? (
                                    <p className="text-center text-blue-700 py-8">
                                        No tasks yet. Add your first task!
                                    </p>
                                ):(

                                
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className={`flex items-center gap-3 p-3 rounded-xl transition
                                    ${task.completed
                                        ? "bg-slate-100"
                                        : "bg-slate-50 hover:bg-slate-100"
                                    }`}
                            >

                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => {
                                        setTasks(
                                            tasks.map((item) => {
                                                return item.id === task.id

                                                    ? {
                                                        ...item,
                                                        completed: !item.completed
                                                    }
                                                    : item
                                            })
                                        )
                                    }}
                                    className="w-4 h-4 accent-slate-900"
                                />

                                <span
                                    className={`text-sm sm:text-base
                    ${task.completed
                                            ? "line-through text-slate-400"
                                            : "text-slate-700"
                                        }`}
                                >
                                    {task.title}
                                </span>

                                {/* Edit task */}

                                <button
                                    className="text-blue-500 hover:text-blue-700 p-1"
                                    onClick={() => {
                                        setEditTask(task)
                                        setEditText(task.title)

                                    }}
                                >
                                    < Pencil size={16} />
                                </button>

                                {/* Delete task */}

                                <button onClick={() => {
                                    setTasks(
                                        tasks.filter((item) => {
                                            return item.id !== task.id
                                        })
                                    )
                                }}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <Trash2 size={18} />
                                </button>




                            </div>
                        )))}
                        </div>

                    </div>

                    {/* Study Progress */}
                    {/* Study Progress */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">
                                    Study Progress
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Your progress this week
                                </p>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                                <span className="text-lg font-bold text-slate-900">
                                    {Math.round(weeklyProgress)}%
                                </span>
                            </div>
                        </div>

                        <div className="mt-8">

                            <div className="flex justify-between mb-3">
                                <span className="text-sm font-medium text-slate-600">
                                    Weekly Goal
                                </span>

                                <span className="text-sm font-semibold text-slate-900">
                                    {Math.round(weeklyProgress)}%
                                </span>
                            </div>

                            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-slate-900 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${weeklyProgress}%` }}
                                ></div>
                            </div>

                            <div className="flex justify-between mt-4 text-sm">
                                <span className="text-slate-500">
                                    {studyHours} hours studied
                                </span>

                                <span className="text-slate-400">
                                    Goal: {weeklyGoal}hours
                                </span>
                            </div>

                        </div>

                    </div>
                </div>
            </main>

        </div>
    )


}
export default Dashboard