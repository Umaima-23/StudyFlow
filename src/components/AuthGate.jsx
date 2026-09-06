import AuthPage from "../pages/AuthPage"
import { useAuth } from "../context/useAuth"

export default function AuthGate({ children }) {
  const { user } = useAuth()
  return user ? children : <AuthPage />
}
