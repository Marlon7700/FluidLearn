import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { AppFrame } from './components/AppFrame'
import { AppShell } from './components/AppShell'
import { useAuth } from './context/AuthContext'
import { loadLocalSkillQuestions } from './lib/localSkillQuestions'
import { AdminPage } from './pages/AdminPage'
import { ChallengePage } from './pages/ChallengePage'
import { CompleteProfilePage } from './pages/CompleteProfilePage'
import { HomePage } from './pages/HomePage'
import { LandingPage } from './pages/LandingPage'
import { LegalPage } from './pages/LegalPage'
import { LoginPage } from './pages/LoginPage'
import { MePage } from './pages/MePage'
import { RegisterAdminPage } from './pages/RegisterAdminPage'
import { RegisterPage } from './pages/RegisterPage'
import { SkillPage } from './pages/SkillPage'

function Gate() {
  const { user, loading, isAdmin, needsProfile } = useAuth()
  if (loading) {
    return <div className="grid min-h-svh place-items-center bg-[#0D1B2E] text-[#98E7FF]">FluidLearn</div>
  }
  if (!user) return <Navigate to="/login" replace />
  if (isAdmin) return <AdminPage />
  if (needsProfile) return <CompleteProfilePage />
  return <AppShell />
}

export default function App() {
  useEffect(() => {
    void loadLocalSkillQuestions()
  }, [])

  return (
    <AppFrame>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/legal/:slug" element={<LegalPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-admin" element={<RegisterAdminPage />} />
        <Route element={<Gate />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/me" element={<MePage />} />
          <Route path="/profile" element={<CompleteProfilePage />} />
          <Route path="/skill/:skillKey" element={<SkillPage />} />
          <Route path="/challenge/:skillKey/:taskId" element={<ChallengePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppFrame>
  )
}
