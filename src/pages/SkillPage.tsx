import { ArrowLeft, BookA, CalendarDays, ChevronDown, FileText, ListTodo, MessageSquare } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { Page } from '../components/AppFrame'
import { DoneChecks } from '../components/DoneChecks'
import { NotificationsPanel } from '../components/NotificationsPanel'
import { UserAvatar } from '../components/CharacterAvatar'
import { useAuth } from '../context/AuthContext'
import { COURSE_INTRO, SKILL_META, TASKS_BY_SKILL } from '../data/catalog'
import { introFromLive, skillMetaFromLive, tasksForSkill, useLiveCatalog } from '../lib/courseCatalogStore'
import { lastAccessLabel, touchCourseAccess, watchCourseParticipants, type CourseParticipant } from '../lib/courseAccess'
import { dueDateForTask, formatDue } from '../lib/taskDueDates'
import { labelForProgress } from '../lib/skillLevel'
import type { SkillKey, SkillTask, UserProfile } from '../types'

type Tab = 'welcome' | 'u1' | 'u2' | 'u3' | 'biblio' | 'grades' | 'people' | 'activities'

export function SkillPage() {
  const { skillKey = 'listening' } = useParams()
  const key = skillKey as SkillKey
  const { profile } = useAuth()
  const catalog = useLiveCatalog()
  const nav = useNavigate()
  const [tab, setTab] = useState<Tab>('welcome')
  const ctx = useOutletContext<{ openNotes?: () => void } | null>()
  const [showNotes, setShowNotes] = useState(true)
  const [people, setPeople] = useState<CourseParticipant[]>([])
  const meta = catalog.skills[key] ? skillMetaFromLive(key, catalog.skills) : SKILL_META[key]
  const tasks = catalog.activities.length ? tasksForSkill(key, catalog.activities) : TASKS_BY_SKILL[key] ?? []
  const intro = catalog.skills[key] ? introFromLive(key, catalog.skills) : COURSE_INTRO[key]
  const p = profile?.skillProgress[key] ?? 0
  const units = useMemo(() => splitUnits(tasks), [tasks])
  const notes = profile?.feedItems ?? []
  const joinedAt = people.find((x) => x.uid === profile?.uid)?.joinedAt

  useEffect(() => {
    if (!profile || !meta) return
    void touchCourseAccess(key, profile).catch(() => undefined)
  }, [key, profile, meta])

  useEffect(() => {
    if (!meta) return
    return watchCourseParticipants(key, setPeople)
  }, [key, meta])

  if (!meta) return <p>Curso no encontrado</p>

  const tabs: { id: Tab; label: string }[] = [
    { id: 'welcome', label: 'Curso' },
    { id: 'people', label: 'Participantes' },
    { id: 'grades', label: 'Calificaciones' },
    { id: 'activities', label: 'Actividades' },
    { id: 'u1', label: 'Unidad 1' },
    { id: 'u2', label: 'Unidad 2' },
    { id: 'u3', label: 'Unidad 3' },
    { id: 'biblio', label: 'Competencias' },
  ]

  return (
    <Page className="max-w-[1180px]">
      <div className="mb-4 flex items-center gap-3">
        <button type="button" className="p-2 text-[#1D2A44] dark:text-[#E8EEF8]" onClick={() => nav('/home')}>
          <ArrowLeft size={22} />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-extrabold uppercase tracking-wide text-[#1D2A44] sm:text-xl dark:text-[#E8EEF8]">
            FluidLearn · {meta.title}
          </h1>
          <p className="text-xs font-medium text-slate-500">
            Nivel {labelForProgress(p)} · {meta.subtitle}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto border-b border-[#E4EBF5] dark:border-[#2A3650]">
        <div className="flex min-w-max gap-1">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-t-lg px-3 py-2 text-sm font-semibold ${
                tab === item.id
                  ? 'bg-white text-[#1A6FE8] shadow-sm dark:bg-[#1A2438]'
                  : 'text-[#7A8699] hover:text-[#1A6FE8]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`mt-4 grid items-start gap-4 ${tab === 'grades' ? 'lg:grid-cols-1' : 'lg:grid-cols-[minmax(0,1fr)_320px]'}`}>
        <div className="min-w-0 overflow-hidden rounded-xl bg-white p-4 shadow-[0_8px_24px_rgba(22,42,78,0.05)] dark:bg-[#1A2438] sm:p-6">
          {tab === 'welcome' && (
            <WelcomeBlock
              meta={meta}
              intro={intro}
              tasks={tasks}
              skillKey={key}
              joinedAt={joinedAt}
              doneIds={profile?.completedTaskIds ?? []}
              onOpen={(id) => nav(`/challenge/${key}/${id}`)}
            />
          )}
          {tab === 'people' && <ParticipantsBlock people={people} />}
          {tab === 'activities' && (
            <ActivitiesHub
              skillKey={key}
              tasks={tasks}
              doneIds={profile?.completedTaskIds ?? []}
              joinedAt={joinedAt}
              onOpen={(id) => nav(`/challenge/${key}/${id}`)}
            />
          )}
          {tab === 'u1' && (
            <UnitBlock
              title="Unidad 1"
              tasks={units[0]}
              skillKey={key}
              joinedAt={joinedAt}
              doneIds={profile?.completedTaskIds ?? []}
              onOpen={(id) => nav(`/challenge/${key}/${id}`)}
            />
          )}
          {tab === 'u2' && (
            <UnitBlock
              title="Unidad 2"
              tasks={units[1]}
              skillKey={key}
              joinedAt={joinedAt}
              doneIds={profile?.completedTaskIds ?? []}
              onOpen={(id) => nav(`/challenge/${key}/${id}`)}
            />
          )}
          {tab === 'u3' && (
            <UnitBlock
              title="Unidad 3"
              tasks={units[2]}
              skillKey={key}
              joinedAt={joinedAt}
              doneIds={profile?.completedTaskIds ?? []}
              onOpen={(id) => nav(`/challenge/${key}/${id}`)}
            />
          )}
          {tab === 'biblio' && (
            <div>
              <h2 className="text-lg font-extrabold text-[#1D2A44] dark:text-[#E8EEF8]">Competencias</h2>
              <p className="mt-2 text-sm text-[#5B6B82]">Al completar {meta.title} podrás:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#5B6B82]">
                <li>Demostrar {meta.subtitle.toLowerCase()} en contextos académicos.</li>
                <li>Completar las {tasks.length} actividades del curso con retroalimentación.</li>
                <li>Mantener racha de estudio y registrar tu avance en Firebase.</li>
              </ul>
            </div>
          )}
          {tab === 'grades' && (
            <GradesBlock
              skillKey={key}
              tasks={tasks}
              name={profile?.fullName || 'Estudiante'}
              profile={profile}
            />
          )}
        </div>

        <aside className={`lg:sticky lg:top-4 ${tab === 'grades' ? 'lg:max-w-md' : ''}`}>
          {showNotes ? (
            <NotificationsPanel
              items={notes}
              onClose={() => setShowNotes(false)}
              onSeeAll={() => nav('/notifications')}
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                setShowNotes(true)
                ctx?.openNotes?.()
              }}
              className="w-full rounded-xl bg-white px-4 py-3 text-left text-sm font-semibold text-[#1A6FE8] shadow-sm dark:bg-[#1A2438]"
            >
              Notificaciones
            </button>
          )}
        </aside>
      </div>
    </Page>
  )
}

function splitUnits(tasks: SkillTask[]): [SkillTask[], SkillTask[], SkillTask[]] {
  return [tasks.slice(0, 1), tasks.slice(1, 2), tasks.slice(2)]
}

function WelcomeBlock({
  meta,
  intro,
  tasks,
  skillKey,
  joinedAt,
  doneIds,
  onOpen,
}: {
  meta: (typeof SKILL_META)[SkillKey]
  intro: { lead: string; body: string[] }
  tasks: SkillTask[]
  skillKey: SkillKey
  joinedAt?: string
  doneIds: string[]
  onOpen: (id: string) => void
}) {
  return (
    <div>
      <div className="relative overflow-hidden rounded-lg">
        <img src={meta.cover} alt="" className="h-[160px] w-full object-cover sm:h-[200px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2A5B]/90 via-[#1A6FE8]/70 to-transparent" />
        <div className="absolute inset-0 flex items-end p-5">
          <div className="text-white">
            <div className="mb-2">
              <span className="text-xs font-bold uppercase tracking-wide">FluidLearn</span>
            </div>
            <p className="text-[22px] font-extrabold leading-tight sm:text-[26px]">{meta.title}</p>
            <p className="text-sm text-white/85">{meta.subtitle}</p>
          </div>
        </div>
      </div>

      <p className="mt-5 text-[15px] text-[#1D2A44] dark:text-[#E8EEF8]">
        {intro.lead.split(' ').map((word, i) => {
          const hit = ['comunicar', 'crear', 'innovar', 'oír', 'hablar', 'leer', 'escribir'].some((k) =>
            word.toLowerCase().includes(k),
          )
          return (
            <span key={`${word}-${i}`}>
              {hit ? <strong>{word}</strong> : word}
              {i < intro.lead.split(' ').length - 1 ? ' ' : ''}
            </span>
          )
        })}
      </p>
      {intro.body.map((p) => (
        <p key={p} className="mt-3 text-[14px] leading-relaxed text-[#5B6B82]">
          {p}
        </p>
      ))}

      <h2 className="mt-8 text-[15px] font-extrabold uppercase tracking-wide text-[#1D2A44] dark:text-[#E8EEF8]">
        Documentos generales
        <span className="ml-2 inline-block h-[3px] w-24 rounded-full bg-gradient-to-r from-[#1DBF9A] via-[#1A6FE8] to-[#8B6EF6] align-middle" />
      </h2>
      <p className="mt-1 text-sm text-[#7A8699]">En esta sesión encontrarás las actividades de {meta.title}.</p>

      <div className="mt-3 divide-y divide-[#EEF2F7] dark:divide-[#2A3650]">
        {tasks.slice(0, 3).map((task, i) => (
          <ActivityRow
            key={task.id}
            task={task}
            done={doneIds.includes(task.id)}
            due={dueDateForTask(skillKey, i, joinedAt, task.dueAt)}
            onOpen={() => onOpen(task.id)}
          />
        ))}
      </div>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1A6FE8] px-4 py-2 text-sm font-bold text-white">
        <CalendarDays size={16} /> Cronograma de actividades
      </div>
      <p className="mt-2 text-sm text-[#5B6B82]">
        Usa esta tabla para conocer la programación del curso {meta.title} y facilitar el manejo de las fechas de las
        actividades.
      </p>
      <div className="mt-3 overflow-hidden rounded-lg border border-[#E4EBF5] dark:border-[#2A3650]">
        <div className="grid grid-cols-2 bg-[#D7F0EA] px-3 py-2 text-sm font-semibold text-[#1D2A44]">
          <span>Nombre actividad</span>
          <span className="text-right">Estado</span>
        </div>
        {tasks.map((task, i) => (
          <div key={task.id} className="grid grid-cols-2 border-t border-[#E4EBF5] px-3 py-2 text-sm dark:border-[#2A3650]">
            <button type="button" className="text-left font-medium text-[#1A6FE8]" onClick={() => onOpen(task.id)}>
              {task.title}
            </button>
            <span className="text-right text-[#7A8699]">
              {doneIds.includes(task.id) ? 'Hecho' : 'Pendiente'} · {formatDue(dueDateForTask(skillKey, i, joinedAt, task.dueAt))}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function UnitBlock({
  title,
  tasks,
  skillKey,
  joinedAt,
  doneIds,
  onOpen,
}: {
  title: string
  tasks: SkillTask[]
  skillKey: SkillKey
  joinedAt?: string
  doneIds: string[]
  onOpen: (id: string) => void
}) {
  return (
    <div>
      <h2 className="text-lg font-extrabold text-[#1D2A44] dark:text-[#E8EEF8]">{title}</h2>
      <p className="mt-1 text-sm text-[#7A8699]">Actividades de esta unidad</p>
      <div className="mt-4 divide-y divide-[#EEF2F7] rounded-xl border border-[#EEF2F7] dark:divide-[#2A3650] dark:border-[#2A3650]">
        {tasks.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-[#7A8699]">No hay actividades en esta unidad.</p>
        ) : (
          tasks.map((task, i) => (
            <ActivityRow
              key={task.id}
              task={task}
              done={doneIds.includes(task.id)}
              due={dueDateForTask(skillKey, i, joinedAt, task.dueAt)}
              onOpen={() => onOpen(task.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

function ActivityRow({
  task,
  done,
  onOpen,
  due,
}: {
  task: SkillTask
  done: boolean
  onOpen: () => void
  due?: Date
}) {
  return (
    <div className="flex flex-col gap-2 px-3 py-3 sm:flex-row sm:items-center">
      <button type="button" onClick={onOpen} className="flex min-w-0 flex-1 items-start gap-3 text-left">
        <MessageSquare size={18} className="mt-0.5 shrink-0 text-[#1A6FE8]" />
        <span>
          <span className="block font-medium text-[#1A6FE8]">{task.title}</span>
          <span className="block text-sm text-[#7A8699]">{task.subtitle}</span>
          {due ? <span className="mt-0.5 block text-[11px] text-[#8C99AD]">Entrega: {formatDue(due)}</span> : null}
        </span>
      </button>
      <span className="inline-flex items-center gap-2 self-end sm:self-auto">
        <DoneChecks show={done} />
        <span
          className={`inline-flex items-center justify-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
            done ? 'bg-[#E8F8F0] text-[#2F9E6A]' : 'bg-[#EEF3FA] text-[#5B6B82]'
          }`}
        >
          {done ? 'Hecho' : 'Pendiente de hacer'}
        </span>
      </span>
    </div>
  )
}

function ParticipantsBlock({ people }: { people: CourseParticipant[] }) {
  const [letter, setLetter] = useState('Todos')
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const filtered = people.filter((p) => {
    if (letter === 'Todos') return true
    return (p.fullName || '?')[0]?.toUpperCase() === letter
  })

  return (
    <div>
      <h2 className="text-lg font-extrabold text-[#1D2A44] dark:text-[#E8EEF8]">Participantes</h2>
      <p className="mt-1 text-sm text-[#7A8699]">{people.length} estudiantes en este curso (se guardan en Firebase al entrar).</p>
      <div className="mt-3 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => setLetter('Todos')}
          className={`rounded px-2 py-0.5 text-xs font-bold ${letter === 'Todos' ? 'bg-[#1A6FE8] text-white' : 'text-[#1A6FE8]'}`}
        >
          Todos
        </button>
        {letters.map((l) => (
          <button key={l} type="button" onClick={() => setLetter(l)} className={`rounded px-1.5 py-0.5 text-xs ${letter === l ? 'bg-[#1A6FE8] text-white' : 'text-[#7A8699]'}`}>
            {l}
          </button>
        ))}
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#E4EBF5] text-[#7A8699] dark:border-[#2A3650]">
              <th className="py-2 font-medium">Nombre</th>
              <th className="py-2 font-medium">Roles</th>
              <th className="py-2 font-medium">Último acceso</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-[#7A8699]">
                  Aún no hay participantes en este filtro.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.uid} className="border-b border-[#EEF2F7] dark:border-[#2A3650]">
                  <td className="py-2.5">
                    <span className="flex items-center gap-2">
                      <UserAvatar
                        profile={{ fullName: p.fullName, avatarIndex: p.avatarIndex, profilePhotoUrl: p.profilePhotoUrl }}
                        size={32}
                      />
                      <span className="font-semibold uppercase text-[#1A6FE8]">{p.fullName}</span>
                    </span>
                  </td>
                  <td className="py-2.5 text-[#5B6B82]">{p.role}</td>
                  <td className="py-2.5 text-[#5B6B82]">{lastAccessLabel(p.lastAccess)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ActivitiesHub({
  skillKey,
  tasks,
  doneIds,
  joinedAt,
  onOpen,
}: {
  skillKey: SkillKey
  tasks: SkillTask[]
  doneIds: string[]
  joinedAt?: string
  onOpen: (id: string) => void
}) {
  const [open, setOpen] = useState<string>('tareas')
  const foros = tasks.slice(0, 1)
  const glosas = tasks.slice(1, 2)
  const tareas = tasks.slice(2)
  const groups = [
    { id: 'foros', title: 'Foros', icon: MessageSquare, items: foros },
    { id: 'glosarios', title: 'Glosarios', icon: BookA, items: glosas },
    { id: 'tareas', title: 'Tareas', icon: ListTodo, items: tareas.length ? tareas : tasks.slice(-1) },
  ]
  const pending = tasks.filter((t) => !doneIds.includes(t.id)).length

  return (
    <div>
      <h2 className="text-lg font-extrabold text-[#1D2A44] dark:text-[#E8EEF8]">Actividades</h2>
      <p className="mt-1 text-sm text-[#7A8699]">
        Resumen de este curso. Tienes <strong>{pending}</strong> pendiente{pending === 1 ? '' : 's'}.
      </p>
      <div className="mt-4 space-y-2">
        {groups.map((g) => {
          const Icon = g.icon
          const expanded = open === g.id
          return (
            <div key={g.id} className="overflow-hidden rounded-xl border border-[#E4EBF5] dark:border-[#2A3650]">
              <button
                type="button"
                onClick={() => setOpen(expanded ? '' : g.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
              >
                <ChevronDown size={16} className={`text-[#1A6FE8] transition ${expanded ? 'rotate-90' : ''}`} />
                <Icon size={16} className="text-[#1A6FE8]" />
                <span className="font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">{g.title}</span>
              </button>
              {expanded && (
                <div className="divide-y divide-[#EEF2F7] border-t border-[#EEF2F7] dark:divide-[#2A3650] dark:border-[#2A3650]">
                  {g.items.map((task) => {
                    const index = tasks.findIndex((x) => x.id === task.id)
                    return (
                      <ActivityRow
                        key={task.id}
                        task={task}
                        done={doneIds.includes(task.id)}
                        due={dueDateForTask(skillKey, Math.max(index, 0), joinedAt, task.dueAt)}
                        onOpen={() => onOpen(task.id)}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function GradesBlock({
  skillKey,
  tasks,
  name,
  profile,
}: {
  skillKey: SkillKey
  tasks: SkillTask[]
  name: string
  profile: UserProfile | null
}) {
  const weight = 100 / Math.max(tasks.length, 1)
  const rows = tasks.map((task) => {
    const a = profile?.recentAssessments?.find((x) => x.taskId === task.id)
    const done = profile?.completedTaskIds.includes(task.id)
    const pct = a?.overallPercent ?? (done ? 100 : 0)
    const contrib = (pct / 100) * weight
    const feedback = a
      ? `${a.quizCorrect}/${a.quizTotal} correctas. ${pct >= 70 ? 'Excelente trabajo, cumpliste los requisitos de la guía.' : 'Sigue practicando esta unidad.'}`
      : done
        ? 'Actividad completada.'
        : 'Sin entrega.'
    return { task, done, pct, contrib, feedback }
  })
  const total = rows.reduce((s, r) => s + r.contrib, 0)

  return (
    <div className="min-w-0">
      <div className="mb-5 flex flex-wrap items-center gap-4">
        <UserAvatar profile={profile} size={56} />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8C99AD]">Usuario</p>
          <p className="truncate text-lg font-extrabold uppercase tracking-wide text-[#1D2A44] dark:text-[#E8EEF8]">{name}</p>
          <p className="text-sm capitalize text-[#7A8699]">Curso {skillKey}</p>
        </div>
        <div className="ml-auto rounded-2xl bg-[#EEF4FF] px-4 py-3 text-right dark:bg-[#243044]">
          <p className="text-[11px] font-semibold uppercase text-[#8C99AD]">Total del curso</p>
          <p className="text-2xl font-extrabold text-[#1A6FE8]">{total.toFixed(1)}%</p>
        </div>
      </div>

      <div className="space-y-3">
        {rows.map((row) => (
          <article
            key={row.task.id}
            className="rounded-2xl border border-[#E8EEF6] bg-[#F8FBFF] p-4 dark:border-[#2A3650] dark:bg-[#162033]"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#1A6FE8] shadow-sm dark:bg-[#1A2438]">
                <FileText size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[#1A6FE8]">{row.task.title}</p>
                <p className="text-sm text-[#7A8699]">{row.task.subtitle}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  row.done ? 'bg-[#E8F8F0] text-[#2F9E6A]' : 'bg-white text-[#8C99AD] dark:bg-[#1A2438]'
                }`}
              >
                {row.done ? 'Entregado' : 'Sin entrega'}
              </span>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <GradeStat label="Ponderación" value={`${weight.toFixed(0)}%`} />
              <GradeStat label="Calificación" value={row.done ? row.pct.toFixed(0) : '—'} />
              <GradeStat label="Rango" value="0–100" />
              <GradeStat label="Aporta al total" value={`${row.contrib.toFixed(1)}%`} />
            </dl>

            <div className="mt-3 rounded-xl bg-white px-3 py-2.5 dark:bg-[#1A2438]">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8C99AD]">Retroalimentación</p>
              <p className="mt-1 text-sm leading-relaxed text-[#5B6B82] dark:text-[#C5CDDA]">{row.feedback}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function GradeStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white px-3 py-2 dark:bg-[#1A2438]">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-[#8C99AD]">{label}</dt>
      <dd className="mt-0.5 text-base font-extrabold text-[#1D2A44] dark:text-[#E8EEF8]">{value}</dd>
    </div>
  )
}
