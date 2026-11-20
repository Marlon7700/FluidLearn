import { BookOpen, ChevronDown, Flame, Headphones, LayoutGrid, List, Mic, MoreVertical, Pencil, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { HeaderBar } from '../components/AppShell'
import { Page } from '../components/AppFrame'
import { useAuth } from '../context/AuthContext'
import { skillMetaFromLive, useLiveCatalog } from '../lib/courseCatalogStore'
import { DAILY_TIPS } from '../data/tips'
import { clampUnit, labelForProgress } from '../lib/skillLevel'
import { studentCopy } from '../lib/studentUi'
import type { SkillKey } from '../types'

const icons = {
  listening: Headphones,
  speaking: Mic,
  reading: BookOpen,
  writing: Pencil,
}

type Filter = 'progress' | 'all' | 'done'
type SortMode = 'name' | 'progress'

export function HomePage() {
  const { profile } = useAuth()
  const nav = useNavigate()
  const { openMenu, openNotes } = useOutletContext<{ openMenu: () => void; openNotes: () => void }>()
  const t = studentCopy(profile?.appLanguage)
  const catalog = useLiveCatalog()
  const [tip, setTip] = useState(() => new Date().getDate() % DAILY_TIPS.length)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('progress')
  const [sort, setSort] = useState<SortMode>('name')
  const [view, setView] = useState<'card' | 'list'>('card')
  const fullName = profile?.fullName?.trim() || 'Freddy'

  useEffect(() => {
    const id = window.setInterval(() => setTip((n) => (n + 1) % DAILY_TIPS.length), 10000)
    return () => window.clearInterval(id)
  }, [])

  const weekBar = Math.min(1, (profile?.streakDays ?? 0) / 7)

  const courses = useMemo(() => {
    const keys = Object.keys(catalog.skills) as SkillKey[]
    let rows = keys.map((key) => {
      const p = clampUnit(profile?.skillProgress[key] ?? 0)
      return { key, pct: Math.round(p * 100), level: labelForProgress(p), meta: skillMetaFromLive(key, catalog.skills) }
    })
    if (filter === 'progress') rows = rows.filter((r) => r.pct < 100)
    if (filter === 'done') rows = rows.filter((r) => r.pct >= 100)
    const q = query.trim().toLowerCase()
    if (q) {
      rows = rows.filter((r) => `${r.meta.title} ${r.meta.subtitle}`.toLowerCase().includes(q))
    }
    rows = [...rows].sort((a, b) => (sort === 'progress' ? b.pct - a.pct : a.meta.title.localeCompare(b.meta.title)))
    return rows
  }, [catalog.skills, filter, profile?.skillProgress, query, sort])

  return (
    <Page className="max-w-[1180px]">
      <HeaderBar
        onMenu={openMenu}
        onNotes={openNotes}
        onAvatar={() => nav('/me')}
        profile={profile}
        unread={(profile?.feedItems?.length ?? 0) + catalog.notices.length > 0}
      />

      <div className="mt-5">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-[#1A6FE8]">{t.myCourses}</p>
        <h1 className="mt-1 text-[28px] font-extrabold leading-tight text-[#1D2A44] sm:text-[34px] dark:text-[#E8EEF8]">
          {t.hello} {fullName.toUpperCase()}!{' '}
          <span className="wave-hand inline-block origin-[70%_70%]" aria-hidden>
            👋
          </span>
        </h1>
      </div>

      <div className="mt-5 grid gap-3.5 lg:grid-cols-2">
        <div className="flex items-center gap-2.5 rounded-[18px] bg-white px-3.5 py-3 shadow-[0_8px_24px_rgba(22,42,78,0.06)] dark:bg-[#1A2438]">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#FFE7B8] to-[#FFD27A]">
            <Flame size={20} className="text-[#F5A623]" />
          </span>
          <span className="text-[14px] font-semibold text-[#6B778C] dark:text-[#C5CDDA]">{t.dailyStreak}</span>
          <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-[#E8EDF5] dark:bg-[#2A3650]">
            <div className="h-full rounded-full bg-gradient-to-r from-[#E8A45A] to-[#D98B43]" style={{ width: `${weekBar * 100}%` }} />
          </div>
          <span className="whitespace-nowrap text-[15px] font-bold text-[#D98B43]">
            {profile?.streakDays ?? 0} {t.days}
          </span>
        </div>
        <div className="rounded-[22px] bg-gradient-to-br from-[#A9C4CE] via-[#7EE8D6] to-[#4FDBC8] px-5 py-4 shadow-[0_12px_28px_rgba(79,219,200,0.28)]">
          <p className="text-[13px] font-medium text-white/80">{t.dailyTip}</p>
          <p className="mt-1 text-[17px] font-bold leading-snug text-white lg:text-[19px]">{DAILY_TIPS[tip]}</p>
        </div>
      </div>

      <section id="skills" className="mt-6 rounded-[22px] bg-white p-4 shadow-[0_10px_30px_rgba(22,42,78,0.06)] dark:bg-[#1A2438] sm:p-6">
        <h2 className="mb-4 text-[18px] font-semibold text-[#5B6B82] dark:text-[#C5CDDA]">{t.courseOverview}</h2>
        <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-center">
          <label className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as Filter)}
              className="w-full appearance-none rounded-lg border border-[#D7E1EE] bg-white py-2.5 pl-3 pr-9 text-sm text-[#1D2A44] dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8] lg:w-[160px]"
            >
              <option value="progress">{t.inProgress}</option>
              <option value="all">{t.allCourses}</option>
              <option value="done">{t.completed}</option>
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C99AD]" />
          </label>
          <div className="relative min-w-0 flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8C99AD]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
              className="w-full rounded-lg border border-[#D7E1EE] bg-white py-2.5 pl-9 pr-3 text-sm dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
            />
          </div>
          <label className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="w-full appearance-none rounded-lg border border-[#D7E1EE] bg-white py-2.5 pl-3 pr-9 text-sm text-[#1D2A44] dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8] lg:w-[240px]"
            >
              <option value="name">{t.sortByName}</option>
              <option value="progress">{t.sortByProgress}</option>
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C99AD]" />
          </label>
          <button
            type="button"
            onClick={() => setView((v) => (v === 'card' ? 'list' : 'card'))}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D7E1EE] bg-white px-3 py-2.5 text-sm font-medium text-[#1D2A44] dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
          >
            {view === 'card' ? <LayoutGrid size={16} /> : <List size={16} />}
            {view === 'card' ? t.cardView : t.listView}
          </button>
        </div>

        <div className={view === 'card' ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3' : 'grid gap-3'}>
          {courses.map((course) => {
            const Icon = icons[course.key]
            if (view === 'list') {
              return (
                <button
                  key={course.key}
                  type="button"
                  onClick={() => nav(`/skill/${course.key}`)}
                  className="flex items-center gap-3 rounded-xl border border-[#E8EEF6] bg-[#F7FAFD] p-3 text-left dark:border-[#2A3650] dark:bg-[#162033]"
                >
                  <img src={course.meta.cover} alt="" className="h-14 w-20 rounded-lg object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-[#1A6FE8]">{course.meta.title}</span>
                    <span className="block text-xs text-[#7A8699]">{course.meta.subtitle}</span>
                  </span>
                  <span className="text-sm font-bold text-[#1D2A44] dark:text-[#E8EEF8]">{course.pct}%</span>
                </button>
              )
            }
            return (
              <article
                key={course.key}
                className="fl-rise overflow-hidden rounded-xl border border-[#E8EEF6] bg-white text-left shadow-[0_4px_16px_rgba(22,42,78,0.05)] dark:border-[#2A3650] dark:bg-[#162033]"
              >
                <button type="button" className="block w-full text-left" onClick={() => nav(`/skill/${course.key}`)}>
                  <div className="relative h-[132px] overflow-hidden">
                    <img src={course.meta.cover} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B2A5B]/85 via-[#1A6FE8]/55 to-transparent" />
                    <div className="absolute left-3 top-3">
                      <span className="text-[10px] font-bold uppercase tracking-wide text-white/90">FluidLearn</span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/80">{t.welcomeCourse}</p>
                      <p className="text-[22px] font-extrabold leading-none">{course.meta.title}</p>
                      <p className="mt-1 text-xs text-white/85">{course.meta.subtitle}</p>
                    </div>
                    <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90">
                      <Icon size={16} style={{ color: course.meta.accent }} />
                    </span>
                  </div>
                  <div className="px-4 pb-4 pt-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[15px] font-semibold leading-snug text-[#2A3548] dark:text-[#E8EEF8]">
                        {course.meta.title} · {course.meta.subtitle}
                      </p>
                      <MoreVertical size={16} className="mt-0.5 shrink-0 text-[#9AA6B8]" />
                    </div>
                    <p className="mt-1 text-[12px] text-[#7A8699]">
                      {t.progressLevel} {course.level}
                    </p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E8EDF5] dark:bg-[#2A3650]">
                      <div className="h-full rounded-full" style={{ width: `${course.pct}%`, background: course.meta.progress }} />
                    </div>
                    <p className="mt-1.5 text-[12px] font-medium text-[#5B6B82]">
                      {course.pct}% {t.percentDone}
                    </p>
                  </div>
                </button>
              </article>
            )
          })}
        </div>
      </section>
    </Page>
  )
}
