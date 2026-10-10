import type { SkillKey } from '../types'

export const SKILLS: SkillKey[] = ['listening', 'speaking', 'reading', 'writing']

export function clampUnit(v: number) {
  return Math.min(1, Math.max(0, v))
}

export function labelForProgress(progress: number) {
  const x = clampUnit(progress)
  if (x <= 0) return 'Unrated'
  if (x < 0.17) return 'A1'
  if (x < 0.34) return 'A2'
  if (x < 0.51) return 'B1'
  if (x < 0.68) return 'B2'
  if (x < 0.85) return 'C1'
  return 'C2'
}

export function emptyProgress(): Record<SkillKey, number> {
  return { listening: 0, speaking: 0, reading: 0, writing: 0 }
}

export function dateKey(d = new Date()) {
  return d.toISOString().slice(0, 10)
}
