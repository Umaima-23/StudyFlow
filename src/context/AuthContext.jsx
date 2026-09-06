import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContextValue"

function loadUsers() {
  try { return JSON.parse(localStorage.getItem("study-flow-users") || "{}") } catch { return {} }
}

function loadCurrentUser() {
  try { return JSON.parse(localStorage.getItem("study-flow-current-user") || "null") } catch { return null }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers)
  const [user, setUser] = useState(loadCurrentUser)

  useEffect(() => localStorage.setItem("study-flow-users", JSON.stringify(users)), [users])
  useEffect(() => {
    if (user) localStorage.setItem("study-flow-current-user", JSON.stringify(user))
    else localStorage.removeItem("study-flow-current-user")
  }, [user])

  const signUp = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    if (users[normalizedEmail]) return { error: "An account with this email already exists." }
    const nextUser = { name: name.trim(), email: normalizedEmail }
    setUsers((current) => ({ ...current, [normalizedEmail]: { ...nextUser, password } }))
    setUser(nextUser)
    return { success: true }
  }

  const signIn = ({ email, password }) => {
    const account = users[email.trim().toLowerCase()]
    if (!account || account.password !== password) return { error: "That email or password is not correct." }
    setUser({ name: account.name, email: account.email })
    return { success: true }
  }

  const signOut = () => setUser(null)
  return <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>{children}</AuthContext.Provider>
}
