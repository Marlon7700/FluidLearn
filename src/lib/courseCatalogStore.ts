import { FirebaseError } from 'firebase/app'
import { collection, deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { COURSE_INTRO, QUIZZES, SKILL_META, TASKS_BY_SKILL } from '../data/catalog'
import { db } from '../firebase'
import { defaultClassroomUnits, englishQuestActivities, englishQuestUnits } from './englishQuestGuides'
import type {
  ActivityKind,
  CourseActivityDoc,
  CourseSkillDoc,
  CourseUnitDoc,
  FeedItem,
  GameClue,
  QuizQuestion,
  SkillKey,
  SkillQuiz,
  SkillTask,
} from '../types'

export type { CourseActivityDoc, CourseSkillDoc, CourseUnitDoc }

export const SKILL_KEYS: SkillKey[] = ['listening', 'speaking', 'reading', 'writing']

export type ClassroomNotice = FeedItem & { id: string }

export type LiveCatalog = {
  skills: Record<SkillKey, CourseSkillDoc>
  activities: CourseActivityDoc[]
  units: CourseUnitDoc[]
  notices: ClassroomNotice[]
  ready: boolean
}

function defaultSkill(key: SkillKey): CourseSkillDoc {
  const meta = SKILL_META[key]
  const intro = COURSE_INTRO[key]
  return {
    title: meta.title,
    subtitle: meta.subtitle,
    cover: meta.cover,
    lead: intro.lead,
    body: [...intro.body],
    published: true,
  }
}

function defaultActivities(): CourseActivityDoc[] {
  const rows: CourseActivityDoc[] = []
  for (const key of SKILL_KEYS) {
    TASKS_BY_SKILL[key].forEach((task, i) => {
      const quiz = QUIZZES[task.id]
      rows.push({
        id: task.id,
        skillKey: key,
        title: task.title,
        subtitle: task.subtitle,
        intro: quiz?.intro ?? '',
        listenAloudText: quiz?.listenAloudText ?? '',
        speakPhrases: quiz?.speakPhrases ?? [],
        questions: quiz?.questions ?? [],
        sort: i,
        kind: 'quiz',
        published: true,
      })
    })
  }
  return rows
}

function parseActivity(id: string, data: Record<string, unknown>, fallbackSkill: SkillKey): CourseActivityDoc | null {
  const skillKey = (data.skillKey as SkillKey) || fallbackSkill
  if (!SKILL_KEYS.includes(skillKey)) return null
  const kind = (data.kind as ActivityKind) || 'quiz'
  return {
    id,
    skillKey,
    title: String(data.title || ''),
    subtitle: String(data.subtitle || ''),
    intro: String(data.intro || ''),
    listenAloudText: String(data.listenAloudText || ''),
    speakPhrases: Array.isArray(data.speakPhrases) ? data.speakPhrases.map(String) : [],
    questions: Array.isArray(data.questions)
      ? (data.questions as QuizQuestion[]).map((q) => ({
          prompt: String(q.prompt || ''),
          choices: Array.isArray(q.choices) ? q.choices.map(String) : [],
          correctIndex: Number(q.correctIndex ?? 0),
          minWords: q.minWords,
        }))
      : [],
    sort: Number(data.sort ?? 0),
    kind,
    dueAt: data.dueAt ? String(data.dueAt) : undefined,
    materialText: data.materialText ? String(data.materialText) : undefined,
    unitId: data.unitId ? String(data.unitId) : undefined,
    published: data.published !== false,
    gameWords: Array.isArray(data.gameWords) ? data.gameWords.map(String) : [],
    gameClues: Array.isArray(data.gameClues)
      ? (data.gameClues as GameClue[]).map((c) => ({ word: String(c.word || ''), clue: String(c.clue || '') }))
      : [],
    hangmanWord: data.hangmanWord ? String(data.hangmanWord) : undefined,
    hangmanClue: data.hangmanClue ? String(data.hangmanClue) : undefined,
    points: Number(data.points ?? 5),
  }
}

const DEFAULT_SKILLS = Object.fromEntries(SKILL_KEYS.map((k) => [k, defaultSkill(k)])) as Record<SkillKey, CourseSkillDoc>
const DEFAULT_ACTIVITIES = defaultActivities()
const DEFAULT_UNITS = defaultClassroomUnits()

let cache: LiveCatalog = { skills: DEFAULT_SKILLS, activities: DEFAULT_ACTIVITIES, units: DEFAULT_UNITS, notices: [], ready: false }
const listeners = new Set<(c: LiveCatalog) => void>()

function emit() {
  listeners.forEach((fn) => fn(cache))
}

let started = false

function ignoreWatchError(err: Error) {
  console.warn('[Firestore] catálogo (se reintenta con datos locales):', err.message)
}

function isDenied(err: unknown) {
  return err instanceof FirebaseError && err.code === 'permission-denied'
}

function plain(data: object) {
  return JSON.parse(JSON.stringify(data)) as Record<string, unknown>
}

const FALLBACK = 'published_skill_quizzes'

function fallbackId(col: string, id: string) {
  return `${col}__${id}`.slice(0, 700)
}

async function writeClassroom(col: string, id: string, data: object) {
  const payload = plain(data)
  try {
    await setDoc(doc(db, col, id), payload, { merge: true })
  } catch (err) {
    if (!isDenied(err)) throw err
    await setDoc(doc(db, FALLBACK, fallbackId(col, id)), { ...payload, classroomCol: col, classroomId: id }, { merge: true })
  }
}

async function deleteClassroom(col: string, id: string) {
  try {
    await deleteDoc(doc(db, col, id))
  } catch {
    /* colección principal aún no publicada en reglas */
  }
  try {
    await deleteDoc(doc(db, FALLBACK, fallbackId(col, id)))
  } catch {
    /* ignore */
  }
}

async function classroomDocExists(col: string, id: string) {
  try {
    if ((await getDoc(doc(db, col, id))).exists()) return true
  } catch {
    /* ignore */
  }
  try {
    return (await getDoc(doc(db, FALLBACK, fallbackId(col, id)))).exists()
  } catch {
    return false
  }
}

function applyFallbackDoc(data: Record<string, unknown>) {
  const col = String(data.classroomCol || '')
  const id = String(data.classroomId || '')
  if (col === 'course_skills' && SKILL_KEYS.includes(id as SkillKey)) {
    const key = id as SkillKey
    cache = {
      ...cache,
      skills: {
        ...cache.skills,
        [key]: {
          title: String(data.title || cache.skills[key].title),
          subtitle: String(data.subtitle || cache.skills[key].subtitle),
          cover: String(data.cover || cache.skills[key].cover),
          lead: String(data.lead || cache.skills[key].lead),
          body: Array.isArray(data.body) ? data.body.map(String) : cache.skills[key].body,
          published: data.published !== false,
        },
      },
    }
  }
  if (col === 'course_activities' && id) {
    const parsed = parseActivity(id, data, 'reading')
    if (parsed) {
      const rest = cache.activities.filter((a) => a.id !== id)
      rest.push(parsed)
      rest.sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title))
      cache = { ...cache, activities: rest, ready: true }
    }
  }
  if (col === 'course_units' && id) {
    const skillKey = data.skillKey as SkillKey
    if (!SKILL_KEYS.includes(skillKey)) return
    const unit: CourseUnitDoc = {
      id,
      title: String(data.title || ''),
      skillKey,
      description: String(data.description || ''),
      availableAt: String(data.availableAt || ''),
      status: data.status === 'draft' ? 'draft' : 'published',
      sort: Number(data.sort ?? 0),
    }
    const rest = cache.units.filter((u) => u.id !== id)
    rest.push(unit)
    rest.sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title))
    cache = { ...cache, units: rest }
  }
  if (col === 'course_notices' && id) {
    const notice = {
      id,
      title: String(data.title || 'Aula extendida'),
      body: String(data.body || ''),
      type: String(data.type || 'classroom'),
      at: String(data.at || ''),
    }
    const rest = cache.notices.filter((n) => n.id !== id)
    rest.unshift(notice)
    cache = { ...cache, notices: rest.slice(0, 40) }
  }
}

export function startCourseCatalogWatch() {
  if (started) return
  started = true
  onSnapshot(collection(db, 'course_skills'), (snap) => {
    const skills = { ...DEFAULT_SKILLS }
    snap.forEach((d) => {
      const key = d.id as SkillKey
      if (!SKILL_KEYS.includes(key)) return
      const data = d.data()
      skills[key] = {
        title: String(data.title || skills[key].title),
        subtitle: String(data.subtitle || skills[key].subtitle),
        cover: String(data.cover || skills[key].cover),
        lead: String(data.lead || skills[key].lead),
        body: Array.isArray(data.body) ? data.body.map(String) : skills[key].body,
        published: data.published !== false,
      }
    })
    cache = { ...cache, skills }
    emit()
  }, ignoreWatchError)
  onSnapshot(collection(db, 'course_activities'), (snap) => {
    if (snap.empty) {
      cache = { ...cache, activities: DEFAULT_ACTIVITIES, ready: true }
      emit()
      return
    }
    const activities: CourseActivityDoc[] = []
    snap.forEach((d) => {
      const parsed = parseActivity(d.id, d.data() as Record<string, unknown>, 'reading')
      if (parsed) activities.push(parsed)
    })
    activities.sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title))
    cache = { ...cache, activities, ready: true }
    emit()
  }, ignoreWatchError)
  onSnapshot(collection(db, 'course_units'), (snap) => {
    if (snap.empty) {
      cache = { ...cache, units: DEFAULT_UNITS }
      emit()
      return
    }
    const units: CourseUnitDoc[] = []
    snap.forEach((d) => {
      const data = d.data()
      const skillKey = data.skillKey as SkillKey
      if (!SKILL_KEYS.includes(skillKey)) return
      units.push({
        id: d.id,
        title: String(data.title || ''),
        skillKey,
        description: String(data.description || ''),
        availableAt: String(data.availableAt || ''),
        status: data.status === 'draft' ? 'draft' : 'published',
        sort: Number(data.sort ?? 0),
      })
    })
    units.sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title))
    cache = { ...cache, units }
    emit()
  }, ignoreWatchError)
  onSnapshot(collection(db, 'course_notices'), (snap) => {
    const notices: ClassroomNotice[] = []
    snap.forEach((d) => {
      const data = d.data()
      notices.push({
        id: d.id,
        title: String(data.title || 'Aula extendida'),
        body: String(data.body || ''),
        type: String(data.type || 'classroom'),
        at: String(data.at || ''),
      })
    })
    notices.sort((a, b) => String(b.at).localeCompare(String(a.at)))
    cache = { ...cache, notices }
    emit()
  }, ignoreWatchError)
  onSnapshot(
    collection(db, FALLBACK),
    (snap) => {
      snap.forEach((d) => {
        const data = d.data() as Record<string, unknown>
        if (data.classroomCol) applyFallbackDoc(data)
      })
      emit()
    },
    ignoreWatchError,
  )
}

export function getLiveCatalog() {
  return cache
}

export function useLiveCatalog(): LiveCatalog {
  const [state, setState] = useState(cache)
  useEffect(() => {
    startCourseCatalogWatch()
    listeners.add(setState)
    setState(cache)
    return () => {
      listeners.delete(setState)
    }
  }, [])
  return state
}

export function skillMetaFromLive(key: SkillKey, skills: Record<SkillKey, CourseSkillDoc>) {
  const base = SKILL_META[key]
  const live = skills[key]
  return { ...base, title: live.title, subtitle: live.subtitle, cover: live.cover }
}

export function introFromLive(key: SkillKey, skills: Record<SkillKey, CourseSkillDoc>) {
  const live = skills[key]
  return { lead: live.lead, body: live.body }
}

export function tasksForSkill(key: SkillKey, activities: CourseActivityDoc[]): SkillTask[] {
  return activities
    .filter((a) => a.skillKey === key && a.published !== false)
    .map((a) => ({ id: a.id, title: a.title, subtitle: a.subtitle, dueAt: a.dueAt, kind: a.kind }))
}

export function quizFromActivity(activity?: CourseActivityDoc, fallback?: SkillQuiz): SkillQuiz | undefined {
  if (!activity) return fallback
  return {
    intro: activity.intro || fallback?.intro,
    listenAloudText: activity.listenAloudText || fallback?.listenAloudText,
    speakPhrases: activity.speakPhrases.length ? activity.speakPhrases : fallback?.speakPhrases,
    questions: activity.questions.length ? activity.questions : fallback?.questions ?? [],
  }
}

export async function saveCourseSkill(key: SkillKey, data: CourseSkillDoc) {
  await writeClassroom('course_skills', key, data)
}

export async function saveCourseActivity(activity: CourseActivityDoc) {
  const { id, ...rest } = activity
  await writeClassroom('course_activities', id, { ...rest, published: rest.published !== false })
}

export async function deleteCourseActivity(id: string) {
  await deleteClassroom('course_activities', id)
}

export async function saveCourseUnit(unit: CourseUnitDoc) {
  const { id, ...rest } = unit
  await writeClassroom('course_units', id, rest)
}

export async function deleteCourseUnit(id: string) {
  await deleteClassroom('course_units', id)
}

export async function publishClassroomNotice(title: string, body: string) {
  const id = `n_${Date.now().toString(36)}`
  try {
    await writeClassroom('course_notices', id, {
      title,
      body,
      type: 'classroom',
      at: new Date().toISOString(),
    })
  } catch (err) {
    console.warn('[Firestore] aviso no publicado (el contenido sí se guarda):', err)
  }
}

export async function seedDefaultActivities() {
  for (const row of DEFAULT_ACTIVITIES) {
    await saveCourseActivity(row)
  }
  for (const unit of DEFAULT_UNITS) {
    if (!(await classroomDocExists('course_units', unit.id))) await saveCourseUnit(unit)
  }
}

export async function seedEnglishQuestGuides() {
  for (const unit of englishQuestUnits()) {
    if (!(await classroomDocExists('course_units', unit.id))) await saveCourseUnit(unit)
  }
  for (const row of englishQuestActivities()) {
    if (!(await classroomDocExists('course_activities', row.id))) await saveCourseActivity(row)
  }
  await publishClassroomNotice(
    'Nuevas guías English Quest',
    'Tu profesor cargó las 11 etapas de English Quest (guías, tests ABC, ahorcado, sopa de letras y crucigramas) sin quitar el material anterior.',
  )
}

export function newActivityId(skillKey: SkillKey) {
  return `${skillKey}_${Date.now().toString(36)}`
}

export function newUnitId() {
  return `u_${Date.now().toString(36)}`
}

export function emptyActivity(skillKey: SkillKey, sort: number, unitId?: string): CourseActivityDoc {
  return {
    id: newActivityId(skillKey),
    skillKey,
    title: 'Nueva actividad',
    subtitle: 'Actividad asignada por administración',
    intro: 'Lee el material y responde A, B o C.',
    listenAloudText: '',
    speakPhrases: [],
    questions: [{ prompt: 'Pregunta 1', choices: ['A) Opción A', 'B) Opción B', 'C) Opción C'], correctIndex: 0 }],
    sort,
    kind: 'quiz',
    dueAt: '',
    materialText: '',
    unitId,
    published: true,
    gameWords: [],
    gameClues: [],
    hangmanWord: '',
    hangmanClue: '',
    points: 5,
  }
}

export function emptyUnit(sort: number): CourseUnitDoc {
  return {
    id: newUnitId(),
    title: 'Nueva unidad',
    skillKey: 'listening',
    description: 'Objetivos de aprendizaje de la unidad.',
    availableAt: new Date().toISOString().slice(0, 16),
    status: 'published',
    sort,
  }
}

export function fileToCoverDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Elige una imagen.'))
      return
    }
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('No se pudo leer la imagen.'))
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const max = 900
        const scale = Math.min(1, max / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('No se pudo procesar la imagen.'))
          return
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.78))
      }
      img.onerror = () => reject(new Error('Imagen no válida.'))
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}
