/* oxlint-disable react(set-state-in-effect) */
import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContextValue"
import { api } from "../lib/api"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem("study-flow-token")) return finishLoading(setLoading)
    restoreSession(setUser, setLoading)
  }, [])

  const authenticate = async (action, credentials) => {
    try { const result = await action(credentials); localStorage.setItem("study-flow-token", result.token); setUser(result.user); return { success: true } } catch (error) { return { error: error.message } }
  }
  const signUp = (credentials) => authenticate(api.signUp, credentials)
  const signIn = (credentials) => authenticate(api.signIn, credentials)
  const signOut = async () => { try { await api.signOut() } catch { /* The token is still cleared locally. */ } localStorage.removeItem("study-flow-token"); setUser(null) }
  if (loading) return <div className="auth-loading">Loading your workspace...</div>
  return <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>{children}</AuthContext.Provider>
}

function restoreSession(setUser, setLoading) {
  api.me().then(({ user: currentUser }) => setUser(currentUser)).catch(() => localStorage.removeItem("study-flow-token")).finally(() => setLoading(false))
}

function finishLoading(setLoading) {
  setLoading(false)
}
