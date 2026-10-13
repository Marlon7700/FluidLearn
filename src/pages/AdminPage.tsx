import { collection, onSnapshot } from 'firebase/firestore'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { FluidLearnLoadingOverlay } from '../components/FluidLearnLoadingOverlay'
import { Logo } from '../components/Logo'
import { useTabLoading } from '../components/RouteLoadingOverlay'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import {
  createStudentByAdmin,
  deleteStudentByAdmin,
  firebaseErrorMessage,
  updateStudentByAdmin,
} from '../lib/adminStudents'
import { labelForProgress } from '../lib/skillLevel'
import { digitsOnlyMax12 } from '../lib/studentId'
import type { SkillKey, StudentRow } from '../types'

type ModalMode = 'create' | 'edit' | null

const emptyForm = {
  fullName: '',
  email: '',
  studentId: '',
  password: '',
  bio: '',
}

export function AdminPage() {
  const { profile, signOut } = useAuth()
  const [tab, setTab] = useState<'students' | 'content'>('students')
  const { loading: tabLoading, startLoading: startTabLoading } = useTabLoading()
  const [rows, setRows] = useState<StudentRow[]>([])
  const [modal, setModal] = useState<ModalMode>(null)
  const [editing, setEditing] = useState<StudentRow | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  useEffect(() => {
    return onSnapshot(collection(db, 'users'), (snap) => {
      const next: StudentRow[] = []
      snap.forEach((d) => {
        const data = d.data()
        if (data.role === 'admin') return
        const sp = data.skillProgress ?? {}
        next.push({
          uid: d.id,
          fullName: data.fullName || '—',
          email: data.email || '',
          studentId: data.studentId || '',
          bio: data.bio || '',
          skillProgress: {
            listening: Number(sp.listening ?? 0),
            speaking: Number(sp.speaking ?? 0),
            reading: Number(sp.reading ?? 0),
            writing: Number(sp.writing ?? 0),
          },
        })
      })
      next.sort((a, b) => a.fullName.localeCompare(b.fullName))
      setRows(next)
    })
  }, [])

  const skills: SkillKey[] = ['listening', 'speaking', 'reading', 'writing']

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setError('')
    setOk('')
    setModal('create')
  }

  function openEdit(row: StudentRow) {
    setEditing(row)
    setForm({
      fullName: row.fullName === '—' ? '' : row.fullName,
      email: row.email,
      studentId: row.studentId,
      password: '',
      bio: row.bio ?? '',
    })
    setError('')
    setOk('')
    setModal('edit')
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    setOk('')
    try {
      if (modal === 'create') {
        if (form.password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.')
        await createStudentByAdmin({
          email: form.email,
          password: form.password,
          fullName: form.fullName,
          studentId: form.studentId,
        })
        setOk('Estudiante creado correctamente.')
      } else if (modal === 'edit' && editing) {
        await updateStudentByAdmin(editing.uid, {
          fullName: form.fullName,
          studentId: form.studentId,
          email: form.email,
          bio: form.bio,
        })
        setOk('Estudiante actualizado.')
      }
      setModal(null)
    } catch (err) {
      setError(firebaseErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  async function onDelete(row: StudentRow) {
    const yes = window.confirm(
      `¿Eliminar a ${row.fullName} (${row.email})?\n\nSe borrará su perfil en Firestore. Si también usaba login, borra la cuenta en Authentication desde la consola de Firebase.`,
    )
    if (!yes) return
    setBusy(true)
    setError('')
    setOk('')
    try {
      await deleteStudentByAdmin(row.uid)
      setOk(`Estudiante ${row.fullName} eliminado.`)
    } catch (err) {
      setError(firebaseErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  function selectTab(next: 'students' | 'content') {
    if (next === tab || tabLoading) return
    startTabLoading()
    setTab(next)
  }

  return (
    <div className="min-h-svh bg-scaffold dark:bg-[#0F1728]">
      <FluidLearnLoadingOverlay show={tabLoading} />
      <header className="border-b border-[#E4EBF5] bg-white px-4 py-3 dark:border-[#2A3650] dark:bg-[#1A2438] lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={40} />
            <div>
              <p className="font-extrabold text-brand">Administración — FluidLearn</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{profile?.fullName || 'Administrador'}</p>
            </div>
          </div>
          <button type="button" className="text-sm font-semibold text-rose-600" onClick={() => void signOut()}>
            Cerrar sesión
          </button>
        </div>
        <div className="mx-auto mt-4 flex max-w-7xl gap-2">
          <button
            type="button"
            className={`rounded-xl px-4 py-2 font-semibold ${tab === 'students' ? 'bg-brand text-white' : 'bg-slate-100 dark:bg-[#243044] dark:text-[#E8EEF8]'}`}
            onClick={() => selectTab('students')}
          >
            Estudiantes
          </button>
          <button
            type="button"
            className={`rounded-xl px-4 py-2 font-semibold ${tab === 'content' ? 'bg-brand text-white' : 'bg-slate-100 dark:bg-[#243044] dark:text-[#E8EEF8]'}`}
            onClick={() => selectTab('content')}
          >
            Contenido
          </button>
        </div>
      </header>

      <main
        className={`mx-auto max-w-7xl px-4 py-6 lg:px-10 ${tabLoading ? 'pointer-events-none select-none opacity-60' : ''}`}
      >
        {ok && (
          <p className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            {ok}
          </p>
        )}
        {error && !modal && (
          <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
            {error}
          </p>
        )}

        {tab === 'content' ? (
          <div className="rounded-2xl bg-white p-6 text-slate-600 dark:bg-[#1A2438] dark:text-slate-300">
            El panel de generación IA del Flutter original sigue en Firebase (`published_skill_quizzes`).
            Los estudiantes ya pueden practicar las 16 actividades locales desde Inicio.
          </div>
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-extrabold text-[#1967D2]">Estudiantes</h1>
                <p className="text-sm text-slate-500">{rows.length} registrado{rows.length === 1 ? '' : 's'}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://console.firebase.google.com/project/pu-fluidlearn/firestore/rules"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-xl border border-[#1967D2] px-4 py-2.5 text-sm font-semibold text-[#1967D2]"
                >
                  Publicar reglas Firebase
                </a>
                <button
                  type="button"
                  onClick={openCreate}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1967D2] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <Plus size={18} /> Crear estudiante
                </button>
              </div>
            </div>
            <p className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
              Si creas un estudiante y no aparece aquí ni en Firestore, publica las reglas del archivo{' '}
              <code className="font-mono">firestore.rules</code> en Firebase (botón de arriba) y vuelve a intentar.
            </p>

            {rows.length === 0 ? (
              <p className="rounded-2xl bg-white px-4 py-10 text-center text-slate-500 dark:bg-[#1A2438]">
                No hay estudiantes. Crea uno con el botón de arriba o pide que se registren.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {rows.map((r) => (
                  <article key={r.uid} className="rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1A2438]">
                    <p className="font-extrabold text-navy dark:text-[#E8EEF8]">{r.fullName}</p>
                    <p className="text-sm text-slate-500">{r.email}</p>
                    <p className="text-xs text-slate-400">Carnet {r.studentId || '—'}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      {skills.map((s) => (
                        <div key={s} className="rounded-lg bg-slate-50 p-2 dark:bg-[#243044]">
                          <p className="capitalize text-slate-500">{s}</p>
                          <p className="font-bold dark:text-[#E8EEF8]">
                            {labelForProgress(r.skillProgress[s])} · {Math.round(r.skillProgress[s] * 100)}%
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => openEdit(r)}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#EEF4FF] py-2 text-sm font-semibold text-[#1967D2] dark:bg-[#243044] dark:text-[#8BB4FF]"
                      >
                        <Pencil size={15} /> Editar
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void onDelete(r)}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-rose-50 py-2 text-sm font-semibold text-rose-600 dark:bg-rose-950/40"
                      >
                        <Trash2 size={15} /> Eliminar
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl dark:bg-[#1A2438]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-[#1967D2]">
                {modal === 'create' ? 'Crear estudiante' : 'Editar estudiante'}
              </h2>
              <button type="button" className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-[#243044]" onClick={() => setModal(null)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => void onSubmit(e)} className="space-y-3">
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
                placeholder="Nombre completo"
                value={form.fullName}
                onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                required
              />
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
                placeholder="Correo"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
              />
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
                placeholder="Código estudiantil (máx. 12 dígitos)"
                value={form.studentId}
                onChange={(e) => setForm((f) => ({ ...f, studentId: digitsOnlyMax12(e.target.value) }))}
                inputMode="numeric"
                pattern="\d{1,12}"
                maxLength={12}
                required
              />
              {modal === 'create' && (
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
                  placeholder="Contraseña temporal (mín. 6)"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  required
                  minLength={6}
                />
              )}
              {modal === 'edit' && (
                <textarea
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
                  placeholder="Bio (opcional)"
                  rows={2}
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                />
              )}
              {error && <p className="text-sm text-rose-600">{error}</p>}
              <button
                disabled={busy}
                className="w-full rounded-xl bg-[#1967D2] py-3 font-semibold text-white disabled:opacity-60"
              >
                {busy ? 'Guardando…' : modal === 'create' ? 'Crear' : 'Guardar cambios'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
