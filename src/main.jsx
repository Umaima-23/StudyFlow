import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StudyProvider } from './context/StudyContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <StudyProvider>
        <App />
      </StudyProvider>
    </AuthProvider>
  </StrictMode>,
)
