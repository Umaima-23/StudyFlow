import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./dashboard/Tasks"
import Subjects from "./dashboard/Subjects";
import Progress from "./pages/Progress";
import StudyHours from "./pages/StudyHours";
import Settings from "./pages/Settings";
import AppShell from "./components/AppShell";
import AuthGate from "./components/AuthGate";

function App() {
    return (
        <BrowserRouter>
            <AuthGate>
                <AppShell>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/subjects" element={<Subjects />} />
                        <Route path="/progress" element={<Progress />} />
                        <Route path="/study-hours" element={<StudyHours />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </AppShell>
            </AuthGate>
        </BrowserRouter>
    );
}

export default App;