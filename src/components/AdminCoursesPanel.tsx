import { Pencil, Plus, Trash2, Upload, X } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import type { SkillKey } from '../types'
import {
  SKILL_KEYS,
  deleteCourseActivity,
  emptyActivity,
  fileToCoverDataUrl,
  saveCourseActivity,
  saveCourseSkill,
  seedDefaultActivities,
  type CourseActivityDoc,
  type CourseSkillDoc,
  useLiveCatalog,
} from '../lib/courseCatalogStore'

const LABELS: Record<SkillKey, string> = {
  listening: 'Listening',
  speaking: 'Speaking',
  reading: 'Reading',
  writing: 'Writing',
}

export function AdminCoursesPanel() {
  const catalog = useLiveCatalog()
  const [skillEdit, setSkillEdit] = useState<SkillKey | null>(null)
  const [skillForm, setSkillForm] = useState<CourseSkillDoc | null>(null)
  const [actEdit, setActEdit] = useState<CourseActivityDoc | null>(null)
  const [filter, setFilter] = useState<SkillKey | 'all'>('all')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  const activities = useMemo(() => {
    if (filter === 'all') return catalog.activities
    return catalog.activities.filter((a) => a.skillKey === filter)
  }, [catalog.activities, filter])

  function openSkill(key: SkillKey) {
    setSkillEdit(key)
    setSkillForm({ ...catalog.skills[key], body: [...catalog.skills[key].body] })
    setErr('')
  }

  async function saveSkill(e: FormEvent) {
    e.preventDefault()
    if (!skillEdit || !skillForm) return
    setBusy(true)
    setErr('')
    try {
      await saveCourseSkill(skillEdit, {
        ...skillForm,
        body: skillForm.body.map((p) => p.trim()).filter(Boolean),
      })
      setMsg('Curso actualizado. Los estudiantes verán el cambio en Inicio.')
      setSkillEdit(null)
    } catch (error) {
      setErr(error instanceof Error ? error.message : 'No se pudo guardar el curso.')
    } finally {
      setBusy(false)
    }
  }

  async function onCoverFile(file?: File) {
    if (!file || !skillForm) return
    try {
      const url = await fileToCoverDataUrl(file)
      setSkillForm({ ...skillForm, cover: url })
    } catch (error) {
      setErr(error instanceof Error ? error.message : 'No se pudo cargar la foto.')
    }
  }

  async function saveActivity(e: FormEvent) {
    e.preventDefault()
    if (!actEdit) return
    setBusy(true)
    setErr('')
    try {
      await saveCourseActivity({
        ...actEdit,
        title: actEdit.title.trim(),
        subtitle: actEdit.subtitle.trim(),
        questions: actEdit.questions.filter((q) => q.prompt.trim()),
      })
      setMsg('Actividad guardada para los estudiantes.')
      setActEdit(null)
    } catch (error) {
      setErr(error instanceof Error ? error.message : 'No se pudo guardar la actividad.')
    } finally {
      setBusy(false)
    }
  }

  async function onDeleteActivity(id: string) {
    if (!window.confirm('¿Eliminar esta actividad para todos los estudiantes?')) return
    setBusy(true)
    try {
      await deleteCourseActivity(id)
      setMsg('Actividad eliminada.')
    } catch (error) {
      setErr(error instanceof Error ? error.message : 'No se pudo eliminar.')
    } finally {
      setBusy(false)
    }
  }

  async function seed() {
    setBusy(true)
    try {
      await seedDefaultActivities()
      setMsg('Se cargaron las actividades iniciales. Ya puedes editarlas.')
    } catch (error) {
      setErr(error instanceof Error ? error.message : 'No se pudieron cargar las actividades.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">Cursos del estudiante</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight">Dashboard de contenido</h1>
          <p className="mt-1 max-w-xl text-sm text-[#64748B]">Edita la foto y los textos de cada tarjeta del inicio, y las actividades que el estudiante recibe en Listening, Speaking, Reading y Writing.</p>
        </div>
        <button type="button" disabled={busy} onClick={() => void seed()} className="rounded-full border border-[#D7E3F0] bg-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-[#0D1B2E] disabled:opacity-50">
          Cargar actividades iniciales
        </button>
      </div>
      {msg && <p className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{msg}</p>}
      {err && !skillEdit && !actEdit && <p className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{err}</p>}

      <h2 className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#64748B]">Tarjetas del inicio</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SKILL_KEYS.map((key) => {
          const s = catalog.skills[key]
          return (
            <article key={key} className="overflow-hidden rounded-3xl border border-[#E6EEF7] bg-white shadow-[0_12px_32px_rgba(13,27,46,0.06)] dark:border-[#2A3650] dark:bg-[#1A2438]">
              <div className="relative h-36">
                <img src={s.cover} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E] via-[#0D1B2E]/35 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-lg font-extrabold leading-none">{s.title}</p>
                  <p className="mt-1 text-xs text-white/80">{s.subtitle}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="line-clamp-2 min-h-[40px] text-sm leading-relaxed text-[#64748B]">{s.lead}</p>
                <button type="button" onClick={() => openSkill(key)} className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#0D1B2E] py-2.5 text-xs font-extrabold uppercase tracking-wide text-white">
                  <Pencil size={14} /> Editar contenedor
                </button>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-10 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#64748B]">Actividades</h2>
          <p className="text-sm text-[#94A3B8]">{activities.length} asignadas a los estudiantes</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as SkillKey | 'all')}
            className="rounded-full border border-[#E6EEF7] bg-white px-4 py-2 text-sm dark:border-[#2A3650] dark:bg-[#243044]"
          >
            <option value="all">Todas las habilidades</option>
            {SKILL_KEYS.map((k) => (
              <option key={k} value={k}>
                {LABELS[k]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setActEdit(emptyActivity(filter === 'all' ? 'listening' : filter, catalog.activities.length))}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#00AEEF] px-5 py-2 text-xs font-extrabold uppercase tracking-wide text-[#0D1B2E]"
          >
            <Plus size={16} /> Nueva actividad
          </button>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#D7E3F0] bg-white px-6 py-14 text-center dark:border-[#2A3650] dark:bg-[#1A2438]">
          <p className="font-extrabold">Aún no hay actividades</p>
          <p className="mt-1 text-sm text-[#64748B]">Carga las iniciales o crea una nueva para asignarla a los estudiantes.</p>
        </div>
      ) : (
      <div className="grid gap-3 md:grid-cols-2">
        {activities.map((a) => (
          <article key={a.id} className="rounded-3xl border border-[#E6EEF7] bg-white p-5 shadow-[0_8px_24px_rgba(13,27,46,0.04)] dark:border-[#2A3650] dark:bg-[#1A2438]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#00AEEF]">{LABELS[a.skillKey]}</p>
                <p className="mt-1 font-extrabold">{a.title}</p>
                <p className="text-sm text-[#64748B]">{a.subtitle}</p>
              </div>
              <span className="rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[11px] font-semibold text-[#64748B]">{a.questions.length} preg.</span>
            </div>
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => setActEdit({ ...a, questions: a.questions.map((q) => ({ ...q, choices: [...q.choices] })) })} className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-[#0D1B2E] py-2 text-xs font-extrabold uppercase tracking-wide text-white">
                <Pencil size={14} /> Editar
              </button>
              <button type="button" disabled={busy} onClick={() => void onDeleteActivity(a.id)} className="inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-2 text-rose-600">
                <Trash2 size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>
      )}

      {skillEdit && skillForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2E]/50 p-4 backdrop-blur-sm">
          <form onSubmit={(e) => void saveSkill(e)} className="max-h-[90svh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 dark:bg-[#1A2438]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">Contenedor</p>
                <h3 className="text-xl font-extrabold">Editar {LABELS[skillEdit]}</h3>
              </div>
              <button type="button" onClick={() => setSkillEdit(null)} className="rounded-full p-2 text-slate-500">
                <X size={20} />
              </button>
            </div>
            <img src={skillForm.cover} alt="" className="mb-3 h-36 w-full rounded-2xl object-cover" />
            <label className="mb-3 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#E6EEF7] px-4 py-2 text-xs font-extrabold uppercase tracking-wide">
              <Upload size={16} /> Cambiar foto
              <input type="file" accept="image/*" className="hidden" onChange={(e) => void onCoverFile(e.target.files?.[0])} />
            </label>
            <input className="mb-2 w-full rounded-2xl border border-[#E6EEF7] px-4 py-3 text-sm" placeholder="URL de la foto" value={skillForm.cover.startsWith('data:') ? '' : skillForm.cover} onChange={(e) => setSkillForm({ ...skillForm, cover: e.target.value })} />
            <input className="mb-2 w-full rounded-2xl border border-[#E6EEF7] px-4 py-3" placeholder="Título" value={skillForm.title} onChange={(e) => setSkillForm({ ...skillForm, title: e.target.value })} required />
            <input className="mb-2 w-full rounded-2xl border border-[#E6EEF7] px-4 py-3" placeholder="Subtítulo" value={skillForm.subtitle} onChange={(e) => setSkillForm({ ...skillForm, subtitle: e.target.value })} required />
            <textarea className="mb-2 w-full rounded-2xl border border-[#E6EEF7] px-4 py-3" rows={3} placeholder="Texto principal" value={skillForm.lead} onChange={(e) => setSkillForm({ ...skillForm, lead: e.target.value })} />
            <textarea className="mb-3 w-full rounded-2xl border border-[#E6EEF7] px-4 py-3" rows={4} placeholder="Párrafos (uno por línea)" value={skillForm.body.join('\n')} onChange={(e) => setSkillForm({ ...skillForm, body: e.target.value.split('\n') })} />
            {err && <p className="mb-2 text-sm text-rose-600">{err}</p>}
            <button disabled={busy} className="w-full rounded-full bg-[#00AEEF] py-3 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E] disabled:opacity-60">
              {busy ? 'Guardando…' : 'Guardar contenedor'}
            </button>
          </form>
        </div>
      )}

      {actEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2E]/50 p-4 backdrop-blur-sm">
          <form onSubmit={(e) => void saveActivity(e)} className="max-h-[90svh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 dark:bg-[#1A2438]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">Actividad</p>
                <h3 className="text-xl font-extrabold">Asignar al estudiante</h3>
              </div>
              <button type="button" onClick={() => setActEdit(null)} className="rounded-full p-2 text-slate-500">
                <X size={20} />
              </button>
            </div>
            <select className="mb-2 w-full rounded-2xl border border-[#E6EEF7] px-4 py-3" value={actEdit.skillKey} onChange={(e) => setActEdit({ ...actEdit, skillKey: e.target.value as SkillKey })}>
              {SKILL_KEYS.map((k) => (
                <option key={k} value={k}>
                  {LABELS[k]}
                </option>
              ))}
            </select>
            <input className="mb-2 w-full rounded-2xl border border-[#E6EEF7] px-4 py-3" placeholder="Título" value={actEdit.title} onChange={(e) => setActEdit({ ...actEdit, title: e.target.value })} required />
            <input className="mb-2 w-full rounded-2xl border border-[#E6EEF7] px-4 py-3" placeholder="Descripción corta" value={actEdit.subtitle} onChange={(e) => setActEdit({ ...actEdit, subtitle: e.target.value })} />
            <textarea className="mb-2 w-full rounded-2xl border border-[#E6EEF7] px-4 py-3" rows={2} placeholder="Instrucción" value={actEdit.intro} onChange={(e) => setActEdit({ ...actEdit, intro: e.target.value })} />
            <input className="mb-2 w-full rounded-2xl border border-[#E6EEF7] px-4 py-3" placeholder="Texto para escuchar (opcional)" value={actEdit.listenAloudText} onChange={(e) => setActEdit({ ...actEdit, listenAloudText: e.target.value })} />
            <input className="mb-3 w-full rounded-2xl border border-[#E6EEF7] px-4 py-3" placeholder="Frases para speaking, separadas por |" value={actEdit.speakPhrases.join(' | ')} onChange={(e) => setActEdit({ ...actEdit, speakPhrases: e.target.value.split('|').map((s) => s.trim()).filter(Boolean) })} />
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#64748B]">Preguntas A / B / C</p>
            {actEdit.questions.map((q, qi) => (
              <div key={qi} className="mb-3 rounded-2xl border border-[#E6EEF7] bg-[#F8FBFE] p-3">
                <input className="mb-2 w-full rounded-xl border border-[#E6EEF7] bg-white px-3 py-2 text-sm" placeholder={`Pregunta ${qi + 1}`} value={q.prompt} onChange={(e) => {
                  const questions = [...actEdit.questions]
                  questions[qi] = { ...q, prompt: e.target.value }
                  setActEdit({ ...actEdit, questions })
                }} />
                {(q.choices.length ? q.choices : ['', '', '']).slice(0, 4).map((choice, ci) => (
                  <label key={ci} className="mb-1 flex items-center gap-2 text-sm">
                    <input type="radio" checked={q.correctIndex === ci} onChange={() => {
                      const questions = [...actEdit.questions]
                      questions[qi] = { ...q, correctIndex: ci }
                      setActEdit({ ...actEdit, questions })
                    }} />
                    <input className="flex-1 rounded-xl border border-[#E6EEF7] bg-white px-3 py-1.5" placeholder={`Opción ${['A', 'B', 'C', 'D'][ci]}`} value={choice} onChange={(e) => {
                      const choices = [...(q.choices.length ? q.choices : ['', '', ''])]
                      choices[ci] = e.target.value
                      const questions = [...actEdit.questions]
                      questions[qi] = { ...q, choices }
                      setActEdit({ ...actEdit, questions })
                    }} />
                  </label>
                ))}
                <button type="button" className="mt-1 text-xs font-semibold text-rose-600" onClick={() => setActEdit({ ...actEdit, questions: actEdit.questions.filter((_, i) => i !== qi) })}>
                  Quitar pregunta
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mb-4 text-sm font-extrabold text-[#00AEEF]"
              onClick={() => setActEdit({ ...actEdit, questions: [...actEdit.questions, { prompt: '', choices: ['', '', ''], correctIndex: 0 }] })}
            >
              + Añadir pregunta
            </button>
            {err && <p className="mb-2 text-sm text-rose-600">{err}</p>}
            <button disabled={busy} className="w-full rounded-full bg-[#00AEEF] py-3 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E] disabled:opacity-60">
              {busy ? 'Guardando…' : 'Guardar actividad'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
