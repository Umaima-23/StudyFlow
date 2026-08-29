import SideBar from "../components/Sidebar.jsx"

const Tasks=()=>{
    return(
        <div className="min-h-screen bg-slate-50 flex">
            <SideBar/>

              <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <h1 className="text-3xl font-bold text-slate-900">
                    Tasks
                </h1>

                <p className="text-slate-500 mt-2">
                    Manage all your tasks
                </p>
            </main>
        </div>
    )
}

export default Tasks