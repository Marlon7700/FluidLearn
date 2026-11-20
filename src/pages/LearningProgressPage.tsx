import { useNavigate } from 'react-router-dom'
import { BackBar } from '../components/BackBar'
import { Page } from '../components/AppFrame'
import { useAuth } from '../context/AuthContext'
import { SKILL_META } from '../data/catalog'
import { clampUnit } from '../lib/skillLevel'
import type { SkillKey } from '../types'

export function LearningProgressPage() {
  const { profile } = useAuth()
  const nav = useNavigate()
  const keys = Object.keys(SKILL_META) as SkillKey[]

  return (
    <Page className="max-w-[920px]">
      <BackBar to="-1" label="Volver" />
      <div className="rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(22,42,78,0.06)] dark:bg-[#1A2438] sm:p-7">
        <h1 className="mb-5 text-[26px] font-extrabold text-[#1D2A44] dark:text-[#E8EEF8]">Cursos que estoy tomando</h1>
        <div className="overflow-hidden rounded-lg border border-[#E8EEF6] dark:border-[#2A3650]">
          <div className="grid grid-cols-[1fr_110px] bg-[#EEF3FA] px-4 py-2.5 text-sm font-semibold text-[#1D2A44] dark:bg-[#243044] dark:text-[#E8EEF8]">
            <span>Nombre del curso</span>
            <span className="text-right">Calificación</span>
          </div>
          {keys.map((key, i) => {
            const meta = SKILL_META[key]
            const p = clampUnit(profile?.skillProgress[key] ?? 0)
            const done = (profile?.completedTaskIds ?? []).filter((id) => id.startsWith(`${key}_`)).length
            const grade = done === 0 && p <= 0 ? '—' : (p * 5).toFixed(2)
            return (
              <button
                key={key}
                type="button"
                onClick={() => nav(`/skill/${key}`)}
                className={`grid w-full grid-cols-[1fr_110px] items-center px-4 py-3 text-left text-sm ${
                  i % 2 === 1 ? 'bg-[#F7FAFD] dark:bg-[#162033]' : 'bg-white dark:bg-[#1A2438]'
                }`}
              >
                <span className="font-medium text-[#1A6FE8]">
                  FluidLearn · {meta.title} · {meta.subtitle}
                </span>
                <span className="text-right text-[#5B6B82]">{grade}</span>
              </button>
            )
          })}
        </div>
      </div>
    </Page>
  )
}
