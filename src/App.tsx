import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { AppFrame } from './components/AppFrame'
import { FluidLearnLoadingOverlay } from './components/FluidLearnLoadingOverlay'
import { RouteLoadingOverlay } from './components/RouteLoadingOverlay'
import { AppShell } from './components/AppShell'
import { useAuth } from './context/AuthContext'
import { loadLocalSkillQuestions } from './lib/localSkillQuestions'
import { AdminPage } from './pages/AdminPage'
import { ChallengePage } from './pages/ChallengePage'
import { CompleteProfilePage } from './pages/CompleteProfilePage'
import { HomePage } from './pages/HomePage'
import { LandingPage } from './pages/LandingPage'
import { LevelTestA1Page } from './pages/LevelTestA1Page'
import { EnglishLevelsPage } from './pages/EnglishLevelsPage'
import { ContactPage } from './pages/ContactPage'
import { GrammarPage } from './pages/GrammarPage'
import { IntensiveCoursePage } from './pages/IntensiveCoursePage'
import { AdultsEnglishPage } from './pages/AdultsEnglishPage'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { NaturalMethodPage } from './pages/NaturalMethodPage'
import { LearningTipsPage } from './pages/LearningTipsPage'
import { ModalVerbsPage } from './pages/ModalVerbsPage'
import { AdjectivesPage } from './pages/AdjectivesPage'
import { AdverbsPage } from './pages/AdverbsPage'
import { GrammarTopicQuizPage } from './pages/GrammarTopicQuizPage'
import { PronounsPage } from './pages/PronounsPage'
import { LevelTestHubPage } from './pages/LevelTestHubPage'
import { LevelTestA2Page } from './pages/LevelTestA2Page'
import { LevelTestB1Page } from './pages/LevelTestB1Page'
import { LevelTestB2Page } from './pages/LevelTestB2Page'
import { LegalPage } from './pages/LegalPage'
import { LoginPage } from './pages/LoginPage'
import { MePage } from './pages/MePage'
import { AppLanguagePage } from './pages/AppLanguagePage'
import { HelpCenterPage } from './pages/HelpCenterPage'
import { LearningProgressPage } from './pages/LearningProgressPage'
import { NotificationsSettingsPage } from './pages/NotificationsSettingsPage'
import { ProfilePhotoPage } from './pages/ProfilePhotoPage'
import { RegisterAdminPage } from './pages/RegisterAdminPage'
import { RegisterPage } from './pages/RegisterPage'
import { CalendarPage } from './pages/CalendarPage'
import { SkillPage } from './pages/SkillPage'

function Gate() {
  const { user, loading, isAdmin, adminOtpPending, needsProfile } = useAuth()
  if (loading) {
    return <FluidLearnLoadingOverlay show message="FluidLearn" />
  }
  if (!user) return <Navigate to="/login" replace />
  if (isAdmin && adminOtpPending) return <Navigate to="/login" replace />
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
      <RouteLoadingOverlay />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/niveles" element={<EnglishLevelsPage />} />
        <Route path="/como-funciona" element={<HowItWorksPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/gramatica" element={<GrammarPage />} />
        <Route path="/curso-intensivo" element={<IntensiveCoursePage />} />
        <Route path="/ingles-adultos" element={<AdultsEnglishPage />} />
        <Route path="/metodo-natural" element={<NaturalMethodPage />} />
        <Route path="/consejos" element={<LearningTipsPage />} />
        <Route path="/verbos-modales" element={<ModalVerbsPage />} />
        <Route path="/adjetivos" element={<AdjectivesPage />} />
        <Route path="/adjetivos/test" element={<GrammarTopicQuizPage topic="adjetivos" />} />
        <Route path="/adverbios" element={<AdverbsPage />} />
        <Route path="/adverbios/test" element={<GrammarTopicQuizPage topic="adverbios" />} />
        <Route path="/pronombres" element={<PronounsPage />} />
        <Route path="/pronombres/test" element={<GrammarTopicQuizPage topic="pronombres" />} />
        <Route path="/test" element={<LevelTestHubPage />} />
        <Route path="/test/a1" element={<LevelTestA1Page />} />
        <Route path="/test/a2" element={<LevelTestA2Page />} />
        <Route path="/test/b1" element={<LevelTestB1Page />} />
        <Route path="/test/b2" element={<LevelTestB2Page />} />
        <Route path="/legal/:slug" element={<LegalPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-admin" element={<RegisterAdminPage />} />
        <Route element={<Gate />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/me" element={<MePage />} />
          <Route path="/profile" element={<CompleteProfilePage />} />
          <Route path="/profile/photo" element={<ProfilePhotoPage />} />
          <Route path="/progress" element={<LearningProgressPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/notifications" element={<NotificationsSettingsPage />} />
          <Route path="/language" element={<AppLanguagePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/skill/:skillKey" element={<SkillPage />} />
          <Route path="/challenge/:skillKey/:taskId" element={<ChallengePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppFrame>
  )
}
