import { BackBar } from '../components/BackBar'
import { Page } from '../components/AppFrame'
import { useAuth } from '../context/AuthContext'
import { studentCopy } from '../lib/studentUi'

export function HelpCenterPage() {
  const { profile } = useAuth()
  const t = studentCopy(profile?.appLanguage)

  return (
    <Page className="max-w-[560px]">
      <BackBar to="/me" label="Volver" />
      <h1 className="text-[28px] font-extrabold text-[#1A6FE8]">{t.helpCenter}</h1>
      <p className="mt-2 text-[#7A8699]">{t.helpIntro}</p>
      <div className="mt-5 space-y-3">
        {t.helpFaq.map(([q, a]) => (
          <article key={q} className="rounded-[18px] bg-white p-4 shadow-[0_6px_16px_rgba(22,42,78,0.05)] dark:bg-[#1A2438]">
            <h2 className="font-bold text-[#1D2A44] dark:text-[#E8EEF8]">{q}</h2>
            <p className="mt-1 text-sm text-[#7A8699]">{a}</p>
          </article>
        ))}
      </div>
    </Page>
  )
}
