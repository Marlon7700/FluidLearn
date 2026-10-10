import { BookOpen, Flame, Headphones, Mic, Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { HeaderBar } from '../components/AppShell'
import { Page } from '../components/AppFrame'
import { useAuth } from '../context/AuthContext'
import { SKILL_META, TASKS_BY_SKILL } from '../data/catalog'
import { DAILY_TIPS } from '../data/tips'
import { clampUnit, labelForProgress } from '../lib/skillLevel'
import type { SkillKey } from '../types'

const icons = {
  listening: Headphones,
  speaking: Mic,
  reading: BookOpen,
  writing: Pencil,
}

const pendingMeta: Record<string, { points: string; iconColor: string; iconBg: string; skill: SkillKey }> = {
  listening_short_audio: { points: '+15', iconColor: '#20CE9F', iconBg: '#EFFBF7', skill: 'listening' },
  listening_dialogue: { points: '+15', iconColor: '#20CE9F', iconBg: '#EFFBF7', skill: 'listening' },
  listening_gap: { points: '+15', iconColor: '#20CE9F', iconBg: '#EFFBF7', skill: 'listening' },
  listening_news_blurb: { points: '+15', iconColor: '#20CE9F', iconBg: '#EFFBF7', skill: 'listening' },
  speaking_pronunciation: { points: '+20', iconColor: '#FFC229', iconBg: '#FFFAEC', skill: 'speaking' },
  speaking_roleplay: { points: '+20', iconColor: '#FFC229', iconBg: '#FFFAEC', skill: 'speaking' },
  speaking_picture: { points: '+20', iconColor: '#FFC229', iconBg: '#FFFAEC', skill: 'speaking' },
  speaking_small_talk: { points: '+20', iconColor: '#FFC229', iconBg: '#FFFAEC', skill: 'speaking' },
  reading_skim: { points: '+15', iconColor: '#F36D86', iconBg: '#FFF3F6', skill: 'reading' },
  reading_detail: { points: '+15', iconColor: '#F36D86', iconBg: '#FFF3F6', skill: 'reading' },
  reading_vocab: { points: '+15', iconColor: '#F36D86', iconBg: '#FFF3F6', skill: 'reading' },
  reading_hours_table: { points: '+15', iconColor: '#F36D86', iconBg: '#FFF3F6', skill: 'reading' },
  writing_sentence: { points: '+15', iconColor: '#9A78FF', iconBg: '#F7F3FF', skill: 'writing' },
  writing_paragraph: { points: '+15', iconColor: '#9A78FF', iconBg: '#F7F3FF', skill: 'writing' },
  writing_edit: { points: '+15', iconColor: '#9A78FF', iconBg: '#F7F3FF', skill: 'writing' },
  writing_micro_email: { points: '+15', iconColor: '#9A78FF', iconBg: '#F7F3FF', skill: 'writing' },
}

export function HomePage() {
  const { profile } = useAuth()
  const nav = useNavigate()
  const { openMenu, openNotes } = useOutletContext<{ openMenu: () => void; openNotes: () => void }>()
  const [tip, setTip] = useState(() => new Date().getDate() % DAILY_TIPS.length)
  const first = profile?.fullName?.trim().split(/\s+/)[0] || 'Freddy'

  useEffect(() => {
    const id = window.setInterval(() => setTip((t) => (t + 1) % DAILY_TIPS.length), 10000)
    return () => window.clearInterval(id)
  }, [])

  const pending = Object.values(TASKS_BY_SKILL)
    .flat()
    .filter((t) => !profile?.completedTaskIds.includes(t.id))

  const weekBar = Math.min(1, (profile?.streakDays ?? 0) / 7)

  return (
    <Page>
      <HeaderBar
        onMenu={openMenu}
        onNotes={openNotes}
        onAvatar={() => nav('/me')}
        profile={profile}
        unread={(profile?.feedItems?.length ?? 0) > 0}
      />

      <p className="mt-7 text-base text-[#9AA4B2]">Welcome</p>
      <h1 className="text-[40px] font-extrabold leading-[1.05] text-[#1967D2] sm:text-[46px]">
        {first}{' '}
        <span className="wave-hand inline-block origin-[70%_70%]" aria-hidden>
          👋
        </span>
      </h1>
      <p className="mt-2 text-lg text-[#9AA4B2]">Elige una habilidad para practicar hoy</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3.5 shadow-[0_8px_24px_rgba(22,42,78,0.05)] dark:bg-[#1A2438]">
          <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-[#FFEECF]">
            <Flame size={20} className="text-[#FFAF26]" />
          </span>
          <span className="text-base font-semibold text-[#7A869A]">Racha diaria</span>
          <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded bg-[#E5EAF2]">
            <div className="h-full rounded bg-[#D98B43]" style={{ width: `${weekBar * 100}%` }} />
          </div>
          <span className="text-lg font-bold text-[#D98B43]">{profile?.streakDays ?? 0} días</span>
        </div>

        <div className="rounded-[22px] bg-gradient-to-br from-[#8DA0AB] via-[#91E7DA] to-[#79E4D4] px-5 py-4">
          <p className="text-sm font-medium text-white/75">Consejo del día</p>
          <p className="mt-1.5 text-[20px] font-bold leading-snug text-white lg:text-[22px]">{DAILY_TIPS[tip]}</p>
          <button
            type="button"
            onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-3.5 rounded-full bg-white/30 px-4 py-2 text-sm font-semibold text-white"
          >
            Empezar ahora
          </button>
        </div>
      </div>

      <div id="skills" className="mb-3.5 mt-8 flex items-end justify-between">
        <h2 className="text-[30px] font-extrabold leading-tight text-[#1967D2] lg:text-[34px]">Habilidades</h2>
        <span className="text-sm font-semibold text-[#1967D2]/70">Ver todas ›</span>
      </div>
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        {(Object.keys(SKILL_META) as SkillKey[]).map((key) => {
          const meta = SKILL_META[key]
          const Icon = icons[key]
          const p = clampUnit(profile?.skillProgress[key] ?? 0)
          return (
            <button
              key={key}
              type="button"
              onClick={() => nav(`/skill/${key}`)}
              className="flex min-h-[200px] flex-col rounded-[20px] p-4 text-left shadow-[0_8px_24px_rgba(22,42,78,0.04)] transition hover:-translate-y-0.5"
              style={{ background: meta.bg }}
            >
              <div className="flex items-start">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white/85">
                  <Icon size={20} style={{ color: meta.accent }} />
                </span>
                <span className="ml-auto rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-bold text-[#28344A]/80">
                  {labelForProgress(p)}
                </span>
              </div>
              <h3 className="mt-4 text-[26px] font-bold leading-none text-[#1967D2]">{meta.title}</h3>
              <p className="mt-1 text-[13px] text-[#A0AABC]">{meta.subtitle}</p>
              <p className="mt-auto pt-4 text-[13px] text-[#A0AABC]">Progreso</p>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded bg-white">
                <div className="h-full" style={{ width: `${p * 100}%`, background: meta.progress }} />
              </div>
              <p className="mt-2 text-right text-lg font-bold text-[#27334A]">{Math.round(p * 100)}%</p>
            </button>
          )
        })}
      </div>

      <h2 className="mb-3.5 mt-8 text-[30px] font-extrabold leading-tight text-[#1967D2] lg:text-[34px]">
        Actividad reciente
      </h2>
      {pending.length === 0 ? (
        <div className="rounded-2xl bg-white px-[18px] py-[22px] text-center text-[15px] font-medium text-[#7A879A] shadow-sm dark:bg-[#1A2438]">
          No tienes actividades pendientes
        </div>
      ) : (
        <div className="grid gap-2.5 md:grid-cols-2">
          {pending.map((t) => {
            const m = pendingMeta[t.id]
            const Icon = icons[m?.skill ?? 'listening']
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => nav(`/challenge/${m?.skill ?? t.id.split('_')[0]}/${t.id}`)}
                className="flex w-full items-center gap-3 rounded-2xl bg-white px-3.5 py-3 text-left shadow-[0_6px_18px_rgba(22,42,78,0.04)] dark:bg-[#1A2438]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full" style={{ background: m?.iconBg }}>
                  <Icon size={18} style={{ color: m?.iconColor }} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-semibold text-[#2B374E]">{t.title}</span>
                  <span className="block text-sm text-[#9DA8BA]">{t.subtitle}</span>
                </span>
                <span className="text-lg font-bold text-[#39CC9F]">{m?.points ?? '+15'}</span>
              </button>
            )
          })}
        </div>
      )}
    </Page>
  )
}
