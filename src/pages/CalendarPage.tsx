import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackBar } from '../components/BackBar'
import { Page } from '../components/AppFrame'
import { useAuth } from '../context/AuthContext'
import { SKILL_META } from '../data/catalog'
import { useLiveCatalog } from '../lib/courseCatalogStore'
import { allDueItems } from '../lib/taskDueDates'
import type { SkillKey } from '../types'

const WEEK = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

export function CalendarPage() {
  const { profile } = useAuth()
  const catalog = useLiveCatalog()
  const nav = useNavigate()
  const now = new Date()
  const [cursor, setCursor] = useState(new Date(now.getFullYear(), now.getMonth(), 1))
  const [course, setCourse] = useState<'all' | SkillKey>('all')
  const done = new Set(profile?.completedTaskIds ?? [])
  const items = useMemo(() => {
    const all = allDueItems(profile?.createdAt, catalog.activities)
    return course === 'all' ? all : all.filter((x) => x.skill === course)
  }, [catalog.activities, course, profile?.createdAt])

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startWeekday = (new Date(year, month, 1).getDay() + 6) % 7

  const byDay = useMemo(() => {
    const map = new Map<number, typeof items>()
    for (const item of items) {
      if (item.due.getFullYear() !== year || item.due.getMonth() !== month) continue
      const d = item.due.getDate()
      const list = map.get(d) ?? []
      list.push(item)
      map.set(d, list)
    }
    return map
  }, [items, month, year])

  const cells: (number | null)[] = [...Array(startWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  while (cells.length % 7 !== 0) cells.push(null)

  const prevLabel = MONTHS[(month + 11) % 12]
  const nextLabel = MONTHS[(month + 1) % 12]

  return (
    <Page className="max-w-[1180px]">
      <BackBar to="-1" label="Volver" />
      <h1 className="mb-4 text-[28px] font-extrabold text-[#1D2A44] dark:text-[#E8EEF8]">Calendario</h1>

      <div className="rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(22,42,78,0.06)] dark:bg-[#1A2438] sm:p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <select className="rounded-lg border border-[#D7E1EE] bg-white px-3 py-2 text-sm dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]">
            <option>Mes</option>
          </select>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value as 'all' | SkillKey)}
            className="min-w-[180px] rounded-lg border border-[#D7E1EE] bg-white px-3 py-2 text-sm dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
          >
            <option value="all">Todos los cursos</option>
            {(Object.keys(SKILL_META) as SkillKey[]).map((k) => (
              <option key={k} value={k}>
                {SKILL_META[k].title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3 flex items-center justify-between text-sm">
          <button type="button" className="inline-flex items-center gap-1 text-[#1A6FE8]" onClick={() => setCursor(new Date(year, month - 1, 1))}>
            <ChevronLeft size={16} /> {prevLabel}
          </button>
          <h2 className="text-lg font-semibold capitalize text-[#1D2A44] dark:text-[#E8EEF8]">
            {MONTHS[month]} {year}
          </h2>
          <button type="button" className="inline-flex items-center gap-1 text-[#1A6FE8]" onClick={() => setCursor(new Date(year, month + 1, 1))}>
            {nextLabel} <ChevronRight size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-7 border-b border-[#E4EBF5] text-center text-xs font-semibold text-[#7A8699] dark:border-[#2A3650]">
              {WEEK.map((d) => (
                <div key={d} className="py-2">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {cells.map((day, i) => {
                const events = day ? byDay.get(day) ?? [] : []
                const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear()
                return (
                  <div
                    key={i}
                    className="min-h-[110px] border-b border-r border-[#EEF2F7] p-1.5 dark:border-[#2A3650]"
                  >
                    {day ? (
                      <>
                        <div className="mb-1 flex justify-end">
                          <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${isToday ? 'bg-[#1A6FE8] font-bold text-white' : 'text-[#5B6B82]'}`}>
                            {day}
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          {events.slice(0, 3).map((ev) => {
                            const ok = done.has(ev.task.id)
                            return (
                              <button
                                key={ev.task.id}
                                type="button"
                                onClick={() => nav(`/challenge/${ev.skill}/${ev.task.id}`)}
                                className="flex w-full items-start gap-1 text-left text-[10px] leading-tight"
                              >
                                <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${ok ? 'bg-[#2F9E6A]' : 'bg-[#E67E22]'}`} />
                                <span className="line-clamp-2 text-[#1A6FE8]">
                                  Vencimiento de {ev.task.title}
                                </span>
                              </button>
                            )
                          })}
                          {events.length > 3 ? <p className="text-[10px] text-[#8C99AD]">+{events.length - 3} más</p> : null}
                        </div>
                      </>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
