import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Page } from '../components/AppFrame'
import { useAuth } from '../context/AuthContext'
import { SKILL_META, TASKS_BY_SKILL } from '../data/catalog'
import { labelForProgress } from '../lib/skillLevel'
import type { SkillKey } from '../types'

export function SkillPage() {
  const { skillKey = 'listening' } = useParams()
  const key = skillKey as SkillKey
  const { profile } = useAuth()
  const nav = useNavigate()
  const meta = SKILL_META[key]
  const tasks = TASKS_BY_SKILL[key] ?? []
  const p = profile?.skillProgress[key] ?? 0

  if (!meta) return <p>Skill no encontrada</p>

  return (
    <Page>
      <div className="flex items-start gap-3">
        <button type="button" className="mt-1 p-2 text-[#1D2A44]" onClick={() => nav('/')}>
          <ArrowLeft size={22} />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-[#1D2A44] lg:text-2xl">{meta.title}</h1>
          <p className="text-xs font-medium text-slate-500">Nivel {labelForProgress(p)} · IA adaptativa</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {tasks.map((t) => {
          const done = profile?.completedTaskIds.includes(t.id)
          return (
            <div key={t.id} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm dark:bg-[#1A2438]">
              <span className="grid h-10 w-10 place-items-center rounded-full" style={{ background: `${meta.accent}28` }}>
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.accent }} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[#1D2A44]">{t.title}</p>
                <p className="text-sm text-slate-500">{t.subtitle}</p>
              </div>
              {done ? (
                <CheckCircle2 className="text-[#39CC9F]" />
              ) : (
                <button
                  type="button"
                  className="rounded-lg bg-[#1967D2] px-3 py-1.5 text-sm font-semibold text-white"
                  onClick={() => nav(`/challenge/${key}/${t.id}`)}
                >
                  Start
                </button>
              )}
            </div>
          )
        })}
      </div>
    </Page>
  )
}
