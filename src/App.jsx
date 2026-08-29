import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "../src/dashboard/Tasks"
import Subjects from "./dashboard/Subjects";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/subjects" element={<Subjects />} />

           
            </Routes>
        </BrowserRouter>
    );
}

export default App;