import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore'
import {
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Gamepad2,
  GraduationCap,
  Headphones,
  Layers,
  LayoutDashboard,
  LogOut,
  Menu,
  Mic,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  UploadCloud,
  Users,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { FluidLearnLoadingOverlay } from '../components/FluidLearnLoadingOverlay'
import { Logo } from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import {
  createStudentByAdmin,
  deleteStudentByAdmin,
  firebaseErrorMessage,
  updateStudentByAdmin,
} from '../lib/adminStudents'
import { isAllowlistedAdminEmail } from '../lib/adminEmails'
import {
  deleteCourseActivity,
  deleteCourseUnit,
  emptyActivity,
  emptyUnit,
  fileToCoverDataUrl,
  publishClassroomNotice,
  saveCourseActivity,
  saveCourseSkill,
  saveCourseUnit,
  seedDefaultActivities,
  seedEnglishQuestGuides,
  SKILL_KEYS,
  useLiveCatalog,
  type CourseActivityDoc,
  type CourseSkillDoc,
  type CourseUnitDoc,
} from '../lib/courseCatalogStore'
import { generateAbcFromMaterial } from '../lib/generateAbcQuestions'
import { labelForProgress } from '../lib/skillLevel'
import { digitsOnlyMax12 } from '../lib/studentId'
import { APP_LANG_OPTIONS } from '../lib/studentUi'
import type { ActivityKind, AppLanguageCode, SkillKey, StudentRow } from '../types'

type Section = 'dashboard' | 'units' | 'activities' | 'students'

const SKILL_UI: Record<SkillKey, { label: string; color: string; Icon: typeof Headphones }> = {
  listening: { label: 'Listening', color: '#00AEEF', Icon: Headphones },
  speaking: { label: 'Speaking', color: '#FF6B2C', Icon: Mic },
  reading: { label: 'Reading', color: '#1A6FE8', Icon: BookOpen },
  writing: { label: 'Writing', color: '#8B6EF6', Icon: Pencil },
}

function initials(name: string) {
  const parts = name.replace('—', '').trim().split(/\s+/).filter(Boolean)
  return (parts.slice(0, 2).map((p) => p[0]).join('') || '?').toUpperCase()
}

const emptyForm = {
  fullName: '',
  email: '',
  studentId: '',
  password: '',
  bio: '',
  appLanguage: 'es' as AppLanguageCode,
}

const SAVED_MSG = 'Se te hicieron los cambios correctamente'

const KIND_LABEL: Record<ActivityKind, string> = {
  quiz: 'Actividad ABC',
  guide: 'Guía de aprendizaje',
  hangman: 'Juego · Ahorcado',
  wordsearch: 'Juego · Sopa de letras',
  crossword: 'Juego · Crucigrama',
}

export function AdminPage() {
  const { profile, signOut } = useAuth()
  const catalog = useLiveCatalog()
  const [section, setSection] = useState<Section>('dashboard')
  const [sidebar, setSidebar] = useState(false)
  const [rows, setRows] = useState<StudentRow[]>([])
  const [studentModal, setStudentModal] = useState<'create' | 'edit' | null>(null)
  const [editing, setEditing] = useState<StudentRow | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [gradeRow, setGradeRow] = useState<StudentRow | null>(null)
  const [grades, setGrades] = useState({ listening: 0, speaking: 0, reading: 0, writing: 0, feedback: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')
  const [saved, setSaved] = useState(false)
  const [query, setQuery] = useState('')
  const [actQuery, setActQuery] = useState('')
  const [actSkill, setActSkill] = useState<SkillKey | 'all'>('all')
  const [actKind, setActKind] = useState<'all' | 'quiz' | 'game'>('all')
  const [skillEdit, setSkillEdit] = useState<SkillKey | null>(null)
  const [skillForm, setSkillForm] = useState<CourseSkillDoc | null>(null)
  const [unitEdit, setUnitEdit] = useState<CourseUnitDoc | null>(null)
  const [openUnit, setOpenUnit] = useState<string | null>(null)
  const [actEdit, setActEdit] = useState<CourseActivityDoc | null>(null)
  const [notifs, setNotifs] = useState(false)

  useEffect(() => {
    return onSnapshot(collection(db, 'users'), (snap) => {
      const next: StudentRow[] = []
      snap.forEach((d) => {
        const data = d.data()
        if (data.role === 'admin') return
        if (isAllowlistedAdminEmail(String(data.email || ''))) return
        if (String(data.studentId || '').toUpperCase() === 'ADMIN') return
        const sp = data.skillProgress ?? {}
        const sg = data.skillGrades ?? {}
        next.push({
          uid: d.id,
          fullName: data.fullName || '—',
          email: data.email || '',
          studentId: data.studentId || '',
          bio: data.description || data.bio || '',
          appLanguage: data.appLanguage || 'es',
          streakDays: Number(data.streakDays ?? 0),
          practiceMinutes: Number(data.practiceMinutes ?? 0),
          completedTaskIds: Array.isArray(data.completedTaskIds) ? data.completedTaskIds.map(String) : [],
          skillProgress: {
            listening: Number(sp.listening ?? 0),
            speaking: Number(sp.speaking ?? 0),
            reading: Number(sp.reading ?? 0),
            writing: Number(sp.writing ?? 0),
          },
          skillGrades: {
            listening: Number(sg.listening ?? 0),
            speaking: Number(sg.speaking ?? 0),
            reading: Number(sg.reading ?? 0),
            writing: Number(sg.writing ?? 0),
          },
          gradesPublished: Boolean(data.gradesPublished),
          gradeFeedback: String(data.gradeFeedback || ''),
        })
      })
      next.sort((a, b) => a.fullName.localeCompare(b.fullName))
      setRows(next)
    })
  }, [])

  useEffect(() => {
    if (!saved) return
    const t = window.setTimeout(() => setSaved(false), 2800)
    return () => window.clearTimeout(t)
  }, [saved])

  const filteredStudents = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) => `${r.fullName} ${r.email} ${r.studentId}`.toLowerCase().includes(q))
  }, [query, rows])

  const filteredActs = useMemo(() => {
    return catalog.activities.filter((a) => {
      if (actSkill !== 'all' && a.skillKey !== actSkill) return false
      if (actKind === 'quiz' && a.kind && a.kind !== 'quiz' && a.kind !== 'guide') return false
      if (actKind === 'game' && !['hangman', 'wordsearch', 'crossword'].includes(a.kind || '')) return false
      const q = actQuery.trim().toLowerCase()
      if (q && !`${a.title} ${a.subtitle} ${a.intro}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [actKind, actQuery, actSkill, catalog.activities])

  const gamesCount = catalog.activities.filter((a) => ['hangman', 'wordsearch', 'crossword'].includes(a.kind || '')).length
  const pendingGrades = rows.filter((r) => !r.gradesPublished).length
  const titles: Record<Section, { h: string; b: string }> = {
    dashboard: { h: 'Dashboard de Aula Extendida', b: 'Resumen y Escenarios' },
    units: { h: 'Gestión de Unidades y Recursos', b: 'Gestión de Unidades' },
    activities: { h: 'Catálogo de Actividades y Juegos', b: 'Actividades y Juegos' },
    students: { h: 'Estudiantes y Publicación de Notas', b: 'Estudiantes y Notas' },
  }

  function go(next: Section) {
    if (next === section) return
    setSection(next)
    setSidebar(false)
  }

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setError('')
    setStudentModal('create')
  }
  function openEdit(row: StudentRow) {
    setEditing(row)
    setForm({
      fullName: row.fullName === '—' ? '' : row.fullName,
      email: row.email,
      studentId: row.studentId,
      password: '',
      bio: row.bio ?? '',
      appLanguage: row.appLanguage ?? 'es',
    })
    setError('')
    setStudentModal('edit')
  }

  function flashSaved() {
    setOk(SAVED_MSG)
    setSaved(true)
  }

  function holdLoad() {
    return new Promise<void>((resolve) => window.setTimeout(resolve, 700))
  }


  async function onSubmitStudent(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await holdLoad()
      if (studentModal === 'create') {
        if (form.password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.')
        await createStudentByAdmin(form)
        flashSaved()
      } else if (editing) {
        await updateStudentByAdmin(editing.uid, form)
        flashSaved()
      }
      setStudentModal(null)
    } catch (err) {
      setError(firebaseErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  async function saveGrades(e: FormEvent) {
    e.preventDefault()
    if (!gradeRow) return
    setBusy(true)
    try {
      await holdLoad()
      await updateDoc(doc(db, 'users', gradeRow.uid), {
        skillGrades: {
          listening: grades.listening,
          speaking: grades.speaking,
          reading: grades.reading,
          writing: grades.writing,
        },
        gradeFeedback: grades.feedback,
        gradesPublished: true,
      })
      await publishClassroomNotice(`Notas de ${gradeRow.fullName}`, 'Se publicaron calificaciones en el aula.')
      flashSaved()
      setGradeRow(null)
    } catch (err) {
      setError(firebaseErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  async function saveSkill(e: FormEvent) {
    e.preventDefault()
    if (!skillEdit || !skillForm) return
    setBusy(true)
    setError('')
    try {
      await holdLoad()
      await saveCourseSkill(skillEdit, skillForm)
      await publishClassroomNotice(`Escenario ${skillForm.title}`, 'Se actualizó la portada del estudiante.')
      flashSaved()
      setSkillEdit(null)
    } catch (err) {
      setError(firebaseErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  async function saveUnit(e: FormEvent) {
    e.preventDefault()
    if (!unitEdit) return
    setBusy(true)
    try {
      await holdLoad()
      await saveCourseUnit(unitEdit)
      if (unitEdit.status === 'published') {
        await publishClassroomNotice(unitEdit.title, `Unidad disponible: ${unitEdit.description}`)
      }
      flashSaved()
      setUnitEdit(null)
    } catch (err) {
      setError(firebaseErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  async function saveAct(e: FormEvent) {
    e.preventDefault()
    if (!actEdit) return
    setBusy(true)
    try {
      await holdLoad()
      const payload: CourseActivityDoc = {
        ...actEdit,
        published: true,
        gameWords: (actEdit.gameWords || []).map((w) => w.trim()).filter(Boolean),
        gameClues: (actEdit.gameClues || []).filter((c) => c.word.trim()),
      }
      await saveCourseActivity(payload)
      await publishClassroomNotice(payload.title, `Nueva ${KIND_LABEL[payload.kind || 'quiz']} · entrega ${payload.dueAt || 'sin hora límite'}.`)
      flashSaved()
      setActEdit(null)
    } catch (err) {
      setError(firebaseErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  const avgGrade = ((grades.listening + grades.speaking + grades.reading + grades.writing) / 4).toFixed(1)
  const navBtn = (id: Section, Icon: typeof Users, label: string, badge?: number) => (
    <button
      type="button"
      onClick={() => go(id)}
      className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${
        section === id ? 'bg-[#00AEEF]/15 text-white shadow-[inset_0_0_0_1px_rgba(0,174,239,0.35)]' : 'text-slate-300 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon size={20} className="shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {badge != null && <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300">{badge}</span>}
    </button>
  )

  return (
    <div className="min-h-svh bg-[#F8FAFC] text-slate-800">
      <FluidLearnLoadingOverlay show={busy} message="Guardando información…" />
      {saved && (
        <div data-saved-modal className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0D1B2E]/45 p-4 backdrop-blur-sm" role="status">
          <div className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-500">
              <CheckCircle2 size={36} />
            </div>
            <p className="mt-4 text-lg font-extrabold text-[#0D1B2E]">Listo</p>
            <p className="mt-1 text-sm font-semibold text-slate-600">{SAVED_MSG}</p>
            <button type="button" className="mt-5 w-full rounded-xl bg-[#00AEEF] py-2.5 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E]" onClick={() => setSaved(false)}>
              Continuar
            </button>
          </div>
        </div>
      )}
      {sidebar && <button type="button" className="fixed inset-0 z-40 bg-[#0D1B2E]/60 lg:hidden" onClick={() => setSidebar(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex h-svh w-72 flex-col justify-between overflow-y-auto bg-[#0D1B2E] text-slate-300 shadow-xl transition-transform ${sidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div>
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
            <div className="flex items-center gap-3">
              <Logo size={40} />
              <div>
                <span className="block text-base font-bold leading-tight text-white">FluidLearn</span>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#00AEEF]">Aula Extendida</span>
              </div>
            </div>
            <button type="button" className="lg:hidden" onClick={() => setSidebar(false)}><X size={18} /></button>
          </div>
          <div className="px-4 py-6">
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Panel de Control</p>
            <nav className="space-y-1.5">
              {navBtn('dashboard', LayoutDashboard, 'Resumen y Escenarios')}
              {navBtn('units', Layers, 'Gestión de Unidades', catalog.units.length)}
              {navBtn('activities', Gamepad2, 'Actividades y Juegos', catalog.activities.length)}
              {navBtn('students', Users, 'Estudiantes y Notas', rows.length)}
            </nav>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-[#00AEEF]">
                <Sparkles size={16} /> Acción Rápida
              </div>
              <p className="mb-3 text-xs leading-relaxed text-slate-400">Sube talleres, juegos o las guías English Quest. Al guardar, llega a los estudiantes.</p>
              <button type="button" onClick={() => setActEdit(emptyActivity('listening', catalog.activities.length))} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00AEEF] py-2.5 text-xs font-semibold text-[#0D1B2E]">
                <UploadCloud size={16} /> Subir Contenido
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 px-2 py-2">
            <div className="grid h-9 w-9 place-items-center rounded-full border border-[#00AEEF]/30 bg-[#00AEEF]/20 text-sm font-bold text-[#00AEEF]">{initials(profile?.fullName || 'A')}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{profile?.fullName || 'Administrador'}</p>
              <p className="truncate text-xs text-slate-400">Docente titular · Inglés</p>
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>
        </div>
      </aside>

      <div className="flex min-h-svh min-w-0 flex-col lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" className="rounded-xl border border-slate-200 p-2.5 lg:hidden" onClick={() => setSidebar(true)}><Menu size={20} /></button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                FluidLearn <ChevronRight size={14} /> <span className="truncate font-semibold text-[#1A6FE8]">{titles[section].b}</span>
              </div>
              <h1 className="truncate text-lg font-bold text-[#0D1B2E] sm:text-xl">{titles[section].h}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button type="button" onClick={() => setNotifs((v) => !v)} className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600">
                <Bell size={20} />
                {catalog.notices[0] && <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#00AEEF] ring-2 ring-white" />}
              </button>
              {notifs && (
                <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  <p className="border-b bg-slate-50 px-4 py-3 text-sm font-bold">Avisos del aula</p>
                  <div className="max-h-72 overflow-y-auto">
                    {catalog.notices.length === 0 ? <p className="px-4 py-6 text-sm text-slate-500">Sin avisos aún.</p> : catalog.notices.slice(0, 8).map((n) => (
                      <article key={n.id} className="border-b px-4 py-3 text-sm">
                        <p className="font-semibold">{n.title}</p>
                        <p className="text-slate-500">{n.body}</p>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button type="button" onClick={() => void signOut()} className="inline-flex items-center gap-2 rounded-xl bg-[#0D1B2E] px-3.5 py-2.5 text-sm font-semibold text-white">
              <LogOut size={16} /> <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 p-4 sm:p-6 lg:p-8">
          {ok && <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{ok}</p>}
          {error && !studentModal && !actEdit && !unitEdit && <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

          {section === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: 'Estudiantes Activos', value: rows.length, hint: 'Cohorte activa', Icon: Users, bg: 'bg-sky-50 text-sky-600' },
                  { label: 'Unidades Activas', value: catalog.units.length, hint: `${catalog.units.filter((u) => u.status === 'published').length} publicadas`, Icon: Layers, bg: 'bg-emerald-50 text-emerald-600' },
                  { label: 'Actividades y Juegos', value: catalog.activities.length, hint: `${gamesCount} juegos interactivos`, Icon: Gamepad2, bg: 'bg-violet-50 text-violet-600' },
                  { label: 'Notas por Publicar', value: pendingGrades, hint: 'Ir a calificar', Icon: ClipboardCheck, bg: 'bg-amber-50 text-amber-600' },
                ].map((k) => (
                  <div key={k.label} className="flex items-start justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{k.label}</p>
                      <p className="mt-2 text-3xl font-extrabold text-[#0D1B2E]">{k.value}</p>
                      <p className="mt-1 text-xs font-medium text-slate-500">{k.hint}</p>
                    </div>
                    <div className={`grid h-11 w-11 place-items-center rounded-xl ${k.bg}`}><k.Icon size={20} /></div>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#1A6FE8]">Portada del Estudiante</p>
                <h2 className="mt-0.5 text-xl font-bold">Gestión de Escenarios de Aprendizaje</h2>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {SKILL_KEYS.map((key) => {
                    const s = catalog.skills[key]
                    return (
                      <article key={key} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="relative h-36">
                          <img src={s.cover} alt="" className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E] via-[#0D1B2E]/30 to-transparent" />
                          <div className="absolute bottom-3 left-3 text-white">
                            <p className="text-lg font-extrabold">{s.title}</p>
                            <p className="text-xs text-white/80">{s.subtitle}</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="line-clamp-2 text-sm text-slate-500">{s.lead}</p>
                          <button type="button" onClick={() => { setSkillEdit(key); setSkillForm({ ...s, body: [...s.body] }) }} className="mt-3 w-full rounded-xl bg-[#0D1B2E] py-2.5 text-xs font-semibold text-white">Editar escenario</button>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                  <div>
                    <h3 className="font-bold">¿Listo para cargar material?</h3>
                    <p className="mt-1 text-sm text-slate-500">Guías, ABC con IA, ahorcado, sopas y crucigramas.</p>
                  </div>
                  <button type="button" onClick={() => setActEdit(emptyActivity('reading', catalog.activities.length))} className="shrink-0 rounded-xl bg-[#00AEEF] px-4 py-2.5 text-sm font-semibold text-[#0D1B2E]">+ Subir Recurso</button>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
                  <div>
                    <h3 className="font-bold">Cargar English Quest</h3>
                    <p className="mt-1 text-sm text-slate-500">Añade las 11 etapas (A1–B7) sin borrar lo que ya tienes.</p>
                  </div>
                  <button type="button" disabled={busy} onClick={() => void (async () => { setBusy(true); try { await seedEnglishQuestGuides(); flashSaved() } catch (e) { setError(e instanceof Error ? e.message : 'Error') } finally { setBusy(false) } })()} className="shrink-0 rounded-xl bg-[#0D1B2E] px-4 py-2.5 text-sm font-semibold text-white">Cargar guías</button>
                </div>
              </div>
            </>
          )}

          {section === 'units' && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#1A6FE8]">Estructura Académica</p>
                  <h2 className="text-xl font-bold">Gestión de Unidades y Recursos</h2>
                </div>
                <div className="flex gap-2">
                  <button type="button" disabled={busy} onClick={() => void (async () => { setBusy(true); try { await seedDefaultActivities(); flashSaved() } catch (e) { setError(e instanceof Error ? e.message : 'Error') } finally { setBusy(false) } })()} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold">Cargar unidades iniciales</button>
                  <button type="button" onClick={() => setUnitEdit(emptyUnit(catalog.units.length + 1))} className="inline-flex items-center gap-2 rounded-xl bg-[#00AEEF] px-4 py-2.5 text-sm font-semibold text-[#0D1B2E]"><Plus size={16} /> Nueva Unidad</button>
                </div>
              </div>
              <div className="space-y-4">
                {catalog.units.map((unit) => {
                  const res = catalog.activities.filter((a) => a.unitId === unit.id)
                  const open = openUnit === unit.id
                  return (
                    <article key={unit.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <button type="button" onClick={() => setOpenUnit(open ? null : unit.id)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
                        <div>
                          <p className="text-xs font-bold uppercase text-[#00AEEF]">{SKILL_UI[unit.skillKey].label} · {unit.status === 'published' ? 'Publicada' : 'Borrador'}</p>
                          <p className="font-bold">{unit.title}</p>
                          <p className="text-sm text-slate-500">{unit.description}</p>
                        </div>
                        <span className="text-xs font-semibold text-slate-400">{res.length} recursos</span>
                      </button>
                      {open && (
                        <div className="space-y-2 border-t border-slate-100 px-5 py-4">
                          {res.map((a) => (
                            <div key={a.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm">
                              <span><b>{KIND_LABEL[a.kind || 'quiz']}</b> · {a.title}</span>
                              <span className="text-xs text-slate-500">Entrega {a.dueAt || '—'}</span>
                            </div>
                          ))}
                          <div className="flex gap-2 pt-2">
                            <button type="button" onClick={() => setUnitEdit({ ...unit })} className="rounded-xl bg-[#0D1B2E] px-3 py-2 text-xs font-semibold text-white">Editar unidad</button>
                            <button type="button" onClick={() => setActEdit(emptyActivity(unit.skillKey, catalog.activities.length, unit.id))} className="rounded-xl bg-[#00AEEF] px-3 py-2 text-xs font-semibold text-[#0D1B2E]">Añadir actividad / juego</button>
                            <button type="button" onClick={() => void (async () => { setBusy(true); try { await deleteCourseUnit(unit.id); flashSaved() } catch (e) { setError(e instanceof Error ? e.message : 'Error') } finally { setBusy(false) } })()} className="ml-auto text-rose-600"><Trash2 size={16} /></button>
                          </div>
                        </div>
                      )}
                    </article>
                  )
                })}
              </div>
            </>
          )}

          {section === 'activities' && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#1A6FE8]">Banco de Contenidos</p>
                  <h2 className="text-xl font-bold">Actividades y Juegos de Aprendizaje</h2>
                  <p className="text-sm text-slate-500">{filteredActs.length} contenidos asignados a los estudiantes.</p>
                </div>
                <button type="button" onClick={() => setActEdit(emptyActivity('listening', catalog.activities.length))} className="inline-flex items-center gap-2 rounded-xl bg-[#00AEEF] px-4 py-2.5 text-sm font-semibold text-[#0D1B2E]"><Plus size={16} /> Nueva Actividad / Juego</button>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row">
                <div className="relative flex-1">
                  <Search size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400" />
                  <input value={actQuery} onChange={(e) => setActQuery(e.target.value)} placeholder="Buscar por título o tema..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm" />
                </div>
                <select value={actSkill} onChange={(e) => setActSkill(e.target.value as SkillKey | 'all')} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
                  <option value="all">Todas las habilidades</option>
                  {SKILL_KEYS.map((k) => <option key={k} value={k}>{SKILL_UI[k].label}</option>)}
                </select>
                <select value={actKind} onChange={(e) => setActKind(e.target.value as typeof actKind)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
                  <option value="all">Todos los tipos</option>
                  <option value="quiz">Solo actividades / guías</option>
                  <option value="game">Solo juegos</option>
                </select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {filteredActs.map((a) => (
                  <article key={a.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#00AEEF]">{KIND_LABEL[a.kind || 'quiz']} · {SKILL_UI[a.skillKey].label}</p>
                    <p className="mt-1 font-bold">{a.title}</p>
                    <p className="text-sm text-slate-500">{a.subtitle}</p>
                    <p className="mt-2 text-xs text-slate-400">Entrega: {a.dueAt || 'sin hora'} · {a.questions.length} preguntas ABC</p>
                    <div className="mt-4 flex gap-2">
                      <button type="button" onClick={() => setActEdit({ ...a, questions: a.questions.map((q) => ({ ...q, choices: [...q.choices] })) })} className="flex-1 rounded-xl bg-[#0D1B2E] py-2 text-xs font-semibold text-white">Editar</button>
                      <button type="button" onClick={() => void (async () => { setBusy(true); try { await deleteCourseActivity(a.id); flashSaved() } catch (e) { setError(e instanceof Error ? e.message : 'Error') } finally { setBusy(false) } })()} className="rounded-xl border border-rose-200 px-3 text-rose-600"><Trash2 size={16} /></button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {section === 'students' && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#1A6FE8]">Seguimiento Académico</p>
                  <h2 className="text-xl font-bold">Estudiantes y Publicación de Notas</h2>
                </div>
                <button type="button" onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-[#00AEEF] px-4 py-2.5 text-sm font-semibold text-[#0D1B2E]"><Plus size={16} /> Crear Estudiante</button>
              </div>
              <div className="relative">
                <Search size={16} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre, correo o carnet" className="w-full rounded-2xl border border-slate-200 bg-white py-3 pr-4 pl-11 text-sm" />
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredStudents.map((r) => (
                  <article key={r.uid} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0D1B2E] text-sm font-extrabold text-[#00AEEF]">{initials(r.fullName)}</span>
                      <div className="min-w-0">
                        <p className="truncate font-bold">{r.fullName}</p>
                        <p className="truncate text-sm text-slate-500">{r.email}</p>
                        <p className="text-[11px] font-semibold uppercase text-slate-400">Carnet {r.studentId || '—'}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      {SKILL_KEYS.map((s) => {
                        const pct = Math.round((r.skillProgress[s] ?? 0) * 100)
                        const ui = SKILL_UI[s]
                        return (
                          <div key={s}>
                            <div className="mb-1 flex justify-between text-[11px] font-semibold text-slate-500">
                              <span className="inline-flex items-center gap-1"><ui.Icon size={12} style={{ color: ui.color }} /> {ui.label}</span>
                              <span>{labelForProgress(r.skillProgress[s])} · {pct}%</span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${pct}%`, background: ui.color }} /></div>
                          </div>
                        )
                      })}
                    </div>
                    <p className="mt-3 text-xs font-semibold">{r.gradesPublished ? <span className="text-emerald-600">Notas publicadas</span> : <span className="text-amber-600">Pendiente por calificar</span>}</p>
                    <div className="mt-4 flex gap-2">
                      <button type="button" onClick={() => openEdit(r)} className="flex-1 rounded-xl bg-[#0D1B2E] py-2 text-xs font-semibold text-white">Editar</button>
                      <button type="button" onClick={() => { setGradeRow(r); setGrades({ listening: r.skillGrades?.listening ?? 0, speaking: r.skillGrades?.speaking ?? 0, reading: r.skillGrades?.reading ?? 0, writing: r.skillGrades?.writing ?? 0, feedback: r.gradeFeedback ?? '' }) }} className="flex-1 rounded-xl bg-[#00AEEF] py-2 text-xs font-semibold text-[#0D1B2E]">Notas</button>
                      <button type="button" onClick={() => void (async () => { setBusy(true); try { await deleteStudentByAdmin(r.uid); flashSaved() } catch (e) { setError(e instanceof Error ? e.message : 'Error') } finally { setBusy(false) } })()} className="rounded-xl border border-rose-200 px-3 text-rose-600"><Trash2 size={16} /></button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {studentModal && (
        <Modal title={studentModal === 'create' ? 'Registrar Nuevo Estudiante' : 'Editar estudiante'} onClose={() => setStudentModal(null)}>
          <form onSubmit={(e) => void onSubmitStudent(e)} className="space-y-3 p-6">
            <input className="w-full rounded-xl border px-3.5 py-2.5 text-sm" placeholder="Nombre completo" value={form.fullName} onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))} required />
            <input className="w-full rounded-xl border px-3.5 py-2.5 text-sm" placeholder="Correo" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />
            <input className="w-full rounded-xl border px-3.5 py-2.5 text-sm" placeholder="Carnet (máx. 12 dígitos)" value={form.studentId} onChange={(e) => setForm((f) => ({ ...f, studentId: digitsOnlyMax12(e.target.value) }))} required />
            {studentModal === 'create' && <input className="w-full rounded-xl border px-3.5 py-2.5 text-sm" placeholder="Contraseña temporal" type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required minLength={6} />}
            <textarea className="w-full rounded-xl border px-3.5 py-2.5 text-sm" rows={2} placeholder="Descripción" value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
            <select className="w-full rounded-xl border px-3.5 py-2.5 text-sm" value={form.appLanguage} onChange={(e) => setForm((f) => ({ ...f, appLanguage: e.target.value as AppLanguageCode }))}>
              {APP_LANG_OPTIONS.map((opt) => <option key={opt.code} value={opt.code}>Idioma: {opt.label}</option>)}
            </select>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button disabled={busy} className="w-full rounded-xl bg-[#00AEEF] py-2.5 text-sm font-semibold text-[#0D1B2E]">{busy ? 'Guardando…' : 'Guardar'}</button>
          </form>
        </Modal>
      )}

      {gradeRow && (
        <Modal title="Publicar y Editar Notas" onClose={() => setGradeRow(null)}>
          <form onSubmit={(e) => void saveGrades(e)} className="space-y-4 p-6">
            <p className="text-sm font-bold">{gradeRow.fullName} · promedio {avgGrade}</p>
            <div className="grid grid-cols-2 gap-3">
              {SKILL_KEYS.map((k) => (
                <label key={k} className="rounded-xl border p-3 text-xs font-semibold">
                  {SKILL_UI[k].label}
                  <input type="number" min={0} max={5} step={0.1} className="mt-1 w-full rounded-lg border px-2 py-1.5 text-sm" value={grades[k]} onChange={(e) => setGrades((g) => ({ ...g, [k]: Number(e.target.value) }))} />
                </label>
              ))}
            </div>
            <textarea className="w-full rounded-xl border px-3 py-2 text-sm" rows={3} placeholder="Retroalimentación" value={grades.feedback} onChange={(e) => setGrades((g) => ({ ...g, feedback: e.target.value }))} />
            <button disabled={busy} className="w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white">Publicar notas al estudiante</button>
          </form>
        </Modal>
      )}

      {skillEdit && skillForm && (
        <Modal title={`Editar escenario ${SKILL_UI[skillEdit].label}`} onClose={() => setSkillEdit(null)}>
          <form onSubmit={(e) => void saveSkill(e)} className="space-y-3 p-6">
            <img src={skillForm.cover} alt="" className="h-32 w-full rounded-xl object-cover" />
            <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#1A6FE8]">
              Cambiar foto <input type="file" accept="image/*" className="hidden" onChange={(e) => void fileToCoverDataUrl(e.target.files?.[0] as File).then((url) => setSkillForm({ ...skillForm, cover: url })).catch((err) => setError(err.message))} />
            </label>
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={skillForm.title} onChange={(e) => setSkillForm({ ...skillForm, title: e.target.value })} />
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={skillForm.subtitle} onChange={(e) => setSkillForm({ ...skillForm, subtitle: e.target.value })} />
            <textarea className="w-full rounded-xl border px-3 py-2 text-sm" rows={3} value={skillForm.lead} onChange={(e) => setSkillForm({ ...skillForm, lead: e.target.value })} />
            <button disabled={busy} className="w-full rounded-xl bg-[#00AEEF] py-2.5 text-sm font-semibold text-[#0D1B2E]">Guardar para estudiantes</button>
          </form>
        </Modal>
      )}

      {unitEdit && (
        <Modal title="Unidad académica" onClose={() => setUnitEdit(null)}>
          <form onSubmit={(e) => void saveUnit(e)} className="space-y-3 p-6">
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={unitEdit.title} onChange={(e) => setUnitEdit({ ...unitEdit, title: e.target.value })} required />
            <select className="w-full rounded-xl border px-3 py-2 text-sm" value={unitEdit.skillKey} onChange={(e) => setUnitEdit({ ...unitEdit, skillKey: e.target.value as SkillKey })}>
              {SKILL_KEYS.map((k) => <option key={k} value={k}>{SKILL_UI[k].label}</option>)}
            </select>
            <label className="block text-xs font-semibold">Disponible desde (fecha y hora)
              <input type="datetime-local" className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" value={unitEdit.availableAt.slice(0, 16)} onChange={(e) => setUnitEdit({ ...unitEdit, availableAt: e.target.value })} />
            </label>
            <textarea className="w-full rounded-xl border px-3 py-2 text-sm" rows={3} value={unitEdit.description} onChange={(e) => setUnitEdit({ ...unitEdit, description: e.target.value })} />
            <select className="w-full rounded-xl border px-3 py-2 text-sm" value={unitEdit.status} onChange={(e) => setUnitEdit({ ...unitEdit, status: e.target.value as CourseUnitDoc['status'] })}>
              <option value="published">Publicada (visible)</option>
              <option value="draft">Borrador</option>
            </select>
            <button disabled={busy} className="w-full rounded-xl bg-[#00AEEF] py-2.5 text-sm font-semibold text-[#0D1B2E]">Guardar unidad</button>
          </form>
        </Modal>
      )}

      {actEdit && (
        <Modal title="Actividad, guía o juego" onClose={() => setActEdit(null)} wide>
          <form onSubmit={(e) => void saveAct(e)} className="space-y-3 p-6">
            <input className="w-full rounded-xl border px-3 py-2 text-sm" value={actEdit.title} onChange={(e) => setActEdit({ ...actEdit, title: e.target.value })} required />
            <div className="grid gap-3 sm:grid-cols-2">
              <select className="rounded-xl border px-3 py-2 text-sm" value={actEdit.kind || 'quiz'} onChange={(e) => setActEdit({ ...actEdit, kind: e.target.value as ActivityKind })}>
                <option value="quiz">Actividad ABC</option>
                <option value="guide">Guía de aprendizaje</option>
                <option value="hangman">Juego: Ahorcado</option>
                <option value="wordsearch">Juego: Sopa de letras</option>
                <option value="crossword">Juego: Crucigrama</option>
              </select>
              <select className="rounded-xl border px-3 py-2 text-sm" value={actEdit.skillKey} onChange={(e) => setActEdit({ ...actEdit, skillKey: e.target.value as SkillKey })}>
                {SKILL_KEYS.map((k) => <option key={k} value={k}>{SKILL_UI[k].label}</option>)}
              </select>
              <select className="rounded-xl border px-3 py-2 text-sm" value={actEdit.unitId || ''} onChange={(e) => setActEdit({ ...actEdit, unitId: e.target.value })}>
                <option value="">Sin unidad</option>
                {catalog.units.map((u) => <option key={u.id} value={u.id}>{u.title}</option>)}
              </select>
              <label className="text-xs font-semibold">Hora de entrega
                <input type="datetime-local" className="mt-1 w-full rounded-xl border px-3 py-2 text-sm" value={(actEdit.dueAt || '').slice(0, 16)} onChange={(e) => setActEdit({ ...actEdit, dueAt: e.target.value })} />
              </label>
            </div>
            <textarea className="w-full rounded-xl border px-3 py-2 text-sm" rows={2} placeholder="Instrucción para el estudiante" value={actEdit.subtitle} onChange={(e) => setActEdit({ ...actEdit, subtitle: e.target.value })} />
            <textarea className="w-full rounded-xl border px-3 py-2 text-sm" rows={5} placeholder="Material / guía (la IA genera preguntas A B C con este texto)" value={actEdit.materialText || actEdit.intro} onChange={(e) => setActEdit({ ...actEdit, materialText: e.target.value, intro: e.target.value })} />
            <button type="button" onClick={() => {
              const qs = generateAbcFromMaterial(actEdit.materialText || actEdit.intro, 8)
              if (!qs.length) { setError('Pega material primero para que la IA genere preguntas.'); return }
              setActEdit({ ...actEdit, questions: qs, kind: actEdit.kind === 'hangman' || actEdit.kind === 'wordsearch' || actEdit.kind === 'crossword' ? actEdit.kind : 'quiz' })
              flashSaved()
            }} className="inline-flex items-center gap-2 rounded-xl border border-[#00AEEF] px-3 py-2 text-xs font-extrabold uppercase tracking-wide text-[#1A6FE8]">
              <Sparkles size={14} /> IA · generar preguntas ABC
            </button>
            {(actEdit.kind === 'quiz' || actEdit.kind === 'guide' || !actEdit.kind) && actEdit.questions.map((q, qi) => (
              <div key={qi} className="rounded-xl border bg-slate-50 p-3">
                <input className="mb-2 w-full rounded-lg border px-2 py-1.5 text-sm" value={q.prompt} onChange={(e) => {
                  const questions = [...actEdit.questions]; questions[qi] = { ...q, prompt: e.target.value }; setActEdit({ ...actEdit, questions })
                }} />
                {q.choices.map((c, ci) => (
                  <label key={ci} className="mb-1 flex items-center gap-2 text-sm">
                    <input type="radio" checked={q.correctIndex === ci} onChange={() => { const questions = [...actEdit.questions]; questions[qi] = { ...q, correctIndex: ci }; setActEdit({ ...actEdit, questions }) }} />
                    <input className="flex-1 rounded-lg border px-2 py-1" value={c} onChange={(e) => { const choices = [...q.choices]; choices[ci] = e.target.value; const questions = [...actEdit.questions]; questions[qi] = { ...q, choices }; setActEdit({ ...actEdit, questions }) }} />
                  </label>
                ))}
              </div>
            ))}
            {(actEdit.kind === 'hangman' || actEdit.kind === 'wordsearch' || actEdit.kind === 'crossword') && (
              <div className="space-y-2">
                {actEdit.kind === 'hangman' && (
                  <>
                    <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="Palabra del ahorcado (inglés)" value={actEdit.hangmanWord || ''} onChange={(e) => setActEdit({ ...actEdit, hangmanWord: e.target.value })} />
                    <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="Pista en inglés" value={actEdit.hangmanClue || ''} onChange={(e) => setActEdit({ ...actEdit, hangmanClue: e.target.value })} />
                  </>
                )}
                <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="Palabras de la sopa, separadas por coma" value={(actEdit.gameWords || []).join(', ')} onChange={(e) => setActEdit({ ...actEdit, gameWords: e.target.value.split(',').map((w) => w.trim()) })} />
                <textarea className="w-full rounded-xl border px-3 py-2 text-sm" rows={3} placeholder="Crucigrama: PALABRA = pista (una por línea)" value={(actEdit.gameClues || []).map((c) => `${c.word} = ${c.clue}`).join('\n')} onChange={(e) => setActEdit({ ...actEdit, gameClues: e.target.value.split('\n').map((line) => { const [w, ...rest] = line.split('='); return { word: (w || '').trim(), clue: rest.join('=').trim() } }) })} />
              </div>
            )}
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button disabled={busy} className="w-full rounded-xl bg-[#00AEEF] py-3 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E]">{busy ? 'Publicando…' : 'Guardar y enviar a estudiantes'}</button>
          </form>
        </Modal>
      )}
    </div>
  )
}

function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2E]/50 p-4 backdrop-blur-sm">
      <div className={`max-h-[92svh] w-full overflow-y-auto rounded-2xl bg-white shadow-2xl ${wide ? 'max-w-2xl' : 'max-w-lg'}`}>
        <div className="flex items-center justify-between bg-[#0D1B2E] px-6 py-4 text-white">
          <div className="flex items-center gap-2 font-bold"><GraduationCap size={18} className="text-[#00AEEF]" /> {title}</div>
          <button type="button" onClick={onClose}><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}
