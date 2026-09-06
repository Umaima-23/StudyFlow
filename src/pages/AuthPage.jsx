import { ArrowRight, CheckCircle2, LockKeyhole, Mail, Sparkles, UserRound } from "lucide-react"
import { useState } from "react"
import { useAuth } from "../context/useAuth"

export default function AuthPage() {
  const [mode, setMode] = useState("signin")
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")
  const { signIn, signUp } = useAuth()
  const isSignUp = mode === "signup"

  const submit = async (event) => {
    event.preventDefault()
    setError("")
    if (isSignUp && !form.name.trim()) return setError("Please enter your name.")
    if (!form.email.trim() || !form.password) return setError("Please complete all required fields.")
    if (form.password.length < 6) return setError("Your password must be at least 6 characters.")
    const result = isSignUp ? await signUp(form) : await signIn(form)
    if (result.error) setError(result.error)
  }

  const update = (field, value) => { setForm((current) => ({ ...current, [field]: value })); setError("") }
  return <main className="auth-page"><div className="auth-visual"><div className="auth-brand">Study<span>Flow</span></div><div className="auth-visual-content"><div className="auth-spark"><Sparkles size={18} /></div><p className="eyebrow">Your focused workspace</p><h1>Make progress feel <em>visible.</em></h1><p>Organize your study plan, protect your focus, and build momentum one task at a time.</p><div className="auth-benefits"><span><CheckCircle2 size={16} /> Live progress tracking</span><span><CheckCircle2 size={16} /> Simple, calm planning</span></div></div><div className="auth-visual-orbit orbit-one" /><div className="auth-visual-orbit orbit-two" /></div><div className="auth-panel"><div className="auth-mobile-brand">Study<span>Flow</span></div><div className="auth-form-wrap"><p className="eyebrow">Welcome to your workspace</p><h2>{isSignUp ? "Create your account" : "Welcome back"}</h2><p className="auth-subtitle">{isSignUp ? "Start organizing your best study days." : "Sign in to pick up where you left off."}</p><div className="auth-tabs"><button onClick={() => { setMode("signin"); setError("") }} className={mode === "signin" ? "auth-tab-active" : ""}>Sign in</button><button onClick={() => { setMode("signup"); setError("") }} className={mode === "signup" ? "auth-tab-active" : ""}>Create account</button></div><form onSubmit={submit} className="auth-form">{isSignUp && <label className="field-label"><span>Your name</span><div className="auth-input"><UserRound size={17} /><input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Umaima Khan" autoComplete="name" /></div></label>}<label className="field-label"><span>Email address</span><div className="auth-input"><Mail size={17} /><input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" autoComplete="email" /></div></label><label className="field-label"><span>Password</span><div className="auth-input"><LockKeyhole size={17} /><input type="password" value={form.password} onChange={(event) => update("password", event.target.value)} placeholder="At least 6 characters" autoComplete={isSignUp ? "new-password" : "current-password"} /></div></label>{error && <p className="auth-error" role="alert">{error}</p>}<button type="submit" className="button-primary auth-submit">{isSignUp ? "Create my workspace" : "Sign in to Study Flow"}<ArrowRight size={17} /></button></form><p className="auth-footnote">Your account stays on this device for this demo.</p></div></div></main>
}
