import { Check } from 'lucide-react'
import { BackBar } from '../components/BackBar'
import { Page } from '../components/AppFrame'
import { useAuth } from '../context/AuthContext'
import { APP_LANG_OPTIONS, studentCopy } from '../lib/studentUi'

export function AppLanguagePage() {
  const { profile, updateStudentSettings } = useAuth()
  const t = studentCopy(profile?.appLanguage)

  return (
    <Page className="max-w-[560px]">
      <BackBar to="/me" label="Volver" />
      <h1 className="text-[28px] font-extrabold text-[#1A6FE8]">{t.appLanguage}</h1>
      <div className="mt-5 space-y-2.5">
        {APP_LANG_OPTIONS.map((opt) => {
          const selected = (profile?.appLanguage ?? 'es') === opt.code
          return (
            <button
              key={opt.code}
              type="button"
              onClick={() => void updateStudentSettings({ appLanguage: opt.code })}
              className="flex w-full items-center justify-between rounded-[18px] bg-white px-4 py-4 shadow-[0_6px_16px_rgba(22,42,78,0.04)] dark:bg-[#1A2438]"
            >
              <span className="font-semibold text-[#1A6FE8]">{opt.label}</span>
              {selected && <Check size={18} className="text-[#1A6FE8]" />}
            </button>
          )
        })}
      </div>
    </Page>
  )
}
