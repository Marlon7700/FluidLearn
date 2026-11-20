import { useState } from 'react'
import { BackBar } from '../components/BackBar'
import { Page } from '../components/AppFrame'
import { useAuth } from '../context/AuthContext'
import { studentCopy } from '../lib/studentUi'
import type { NotificationPrefs } from '../types'

export function NotificationsSettingsPage() {
  const { profile, updateStudentSettings } = useAuth()
  const t = studentCopy(profile?.appLanguage)
  const [prefs, setPrefs] = useState<NotificationPrefs>(
    profile?.notifications ?? { dailyReminders: true, pendingActivities: true, levelUpdates: true },
  )

  async function toggle(key: keyof NotificationPrefs) {
    const next = { ...prefs, [key]: !prefs[key] }
    setPrefs(next)
    await updateStudentSettings({ notifications: next })
  }

  const rows: { key: keyof NotificationPrefs; label: string }[] = [
    { key: 'dailyReminders', label: t.dailyReminders },
    { key: 'pendingActivities', label: t.pendingActivities },
    { key: 'levelUpdates', label: t.levelUpdates },
  ]

  return (
    <Page className="max-w-[560px]">
      <BackBar to="/me" label="Volver" />
      <h1 className="text-[28px] font-extrabold text-[#1A6FE8]">{t.notifications}</h1>
      <div className="mt-5 space-y-2.5">
        {rows.map((row) => (
          <button
            key={row.key}
            type="button"
            onClick={() => void toggle(row.key)}
            className="flex w-full items-center justify-between rounded-[18px] bg-white px-4 py-4 shadow-[0_6px_16px_rgba(22,42,78,0.04)] dark:bg-[#1A2438]"
          >
            <span className="font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">{row.label}</span>
            <span className={`h-7 w-12 rounded-full p-1 transition ${prefs[row.key] ? 'bg-[#1A6FE8]' : 'bg-slate-300'}`}>
              <span className={`block h-5 w-5 rounded-full bg-white transition ${prefs[row.key] ? 'translate-x-5' : ''}`} />
            </span>
          </button>
        ))}
      </div>
    </Page>
  )
}
