import { collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import type { SkillKey, UserProfile } from '../types'

export interface CourseParticipant {
  uid: string
  fullName: string
  email: string
  avatarIndex?: number
  profilePhotoUrl?: string
  role: string
  joinedAt: string
  lastAccess: string
}

export async function touchCourseAccess(skillKey: SkillKey, profile: UserProfile) {
  const ref = doc(db, 'courses', skillKey, 'participants', profile.uid)
  const snap = await getDoc(ref)
  const now = new Date().toISOString()
  const prev = snap.exists() ? (snap.data() as CourseParticipant) : undefined
  await setDoc(
    ref,
    {
      uid: profile.uid,
      fullName: profile.fullName || 'Estudiante',
      email: profile.email,
      avatarIndex: profile.avatarIndex ?? null,
      profilePhotoUrl: profile.profilePhotoUrl ?? null,
      role: 'Estudiante',
      joinedAt: prev?.joinedAt || now,
      lastAccess: now,
    },
    { merge: true },
  )
}

export function watchCourseParticipants(skillKey: SkillKey, cb: (rows: CourseParticipant[]) => void) {
  return onSnapshot(collection(db, 'courses', skillKey, 'participants'), (snap) => {
    const rows: CourseParticipant[] = []
    snap.forEach((d) => rows.push(d.data() as CourseParticipant))
    rows.sort((a, b) => a.fullName.localeCompare(b.fullName, 'es'))
    cb(rows)
  })
}

export function lastAccessLabel(iso?: string) {
  if (!iso) return 'Sin acceso'
  const ms = Date.now() - new Date(iso).getTime()
  if (Number.isNaN(ms) || ms < 0) return 'Ahora'
  const min = Math.floor(ms / 60000)
  if (min < 2) return 'Ahora'
  if (min < 60) return `${min} minutos`
  const h = Math.floor(min / 60)
  if (h < 24) return `${h} hora${h === 1 ? '' : 's'}`
  const d = Math.floor(h / 24)
  return `${d} día${d === 1 ? '' : 's'} ${h % 24} horas`
}
