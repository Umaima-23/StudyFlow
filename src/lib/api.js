const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "")
const API_URL = configuredApiUrl ? (configuredApiUrl.endsWith("/api") ? configuredApiUrl : `${configuredApiUrl}/api`) : "/api"
const normalizeTask = (task) => ({ ...task, id: task._id, createdAt: new Date(task.createdAt).getTime() })

async function request(path, options = {}) {
  const token = localStorage.getItem("study-flow-token")
  let response
  try {
    response = await fetch(`${API_URL}${path}`, { ...options, headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } })
  } catch {
    throw new Error("The Study Flow server is unavailable. Start the backend with npm run dev.")
  }

  const responseText = response.status === 204 ? "" : await response.text()
  let data = null
  if (responseText) {
    try { data = JSON.parse(responseText) } catch { throw new Error(`The server returned an invalid response (${response.status}).`) }
  }
  if (!response.ok) throw new Error(data?.message || "Request failed.")
  return data
}

export const api = {
  signUp: (payload) => request("/auth/signup", { method: "POST", body: JSON.stringify(payload) }),
  signIn: (payload) => request("/auth/signin", { method: "POST", body: JSON.stringify(payload) }),
  me: () => request("/auth/me"),
  signOut: () => request("/auth/signout", { method: "POST" }),
  getTasks: async () => { const result = await request("/tasks"); return { tasks: result.tasks.map(normalizeTask) } },
  addTask: async (task) => { const result = await request("/tasks", { method: "POST", body: JSON.stringify(task) }); return { task: normalizeTask(result.task) } },
  updateTask: async (id, changes) => { const result = await request(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(changes) }); return { task: normalizeTask(result.task) } },
  deleteTask: (id) => request(`/tasks/${id}`, { method: "DELETE" }),
  clearTasks: () => request("/tasks", { method: "DELETE" }),
  updateStudyHours: (studyHours) => request("/profile/study-hours", { method: "PATCH", body: JSON.stringify({ studyHours }) }),
  getSubjects: () => request("/subjects"),
  addSubject: (name) => request("/subjects", { method: "POST", body: JSON.stringify({ name }) }),
  deleteSubject: (id) => request(`/subjects/${id}`, { method: "DELETE" }),
}
