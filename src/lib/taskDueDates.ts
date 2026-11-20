import { SKILL_META, TASKS_BY_SKILL } from '../data/catalog'
import type { CourseActivityDoc, SkillKey, SkillTask } from '../types'

export function dueDateForTask(_skillKey: SkillKey, index: number, joinedAt?: string, dueAt?: string) {
  if (dueAt) {
    const parsed = new Date(dueAt)
    if (!Number.isNaN(parsed.getTime())) return parsed
  }
  const base = joinedAt ? new Date(joinedAt) : startOfWeek(new Date())
  const d = new Date(base)
  d.setHours(8, 0, 0, 0)
  d.setDate(d.getDate() + (index + 1) * 7)
  return d
}

export function formatDue(d: Date) {
  const hasTime = d.getHours() !== 8 || d.getMinutes() !== 0
  return d.toLocaleString('es-CO', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...(hasTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  })
}

export function formatDueShort(d: Date) {
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })
}

export function allDueItems(joinedAt?: string, activities?: CourseActivityDoc[]) {
  if (activities?.length) {
    return activities
      .filter((a) => a.published !== false)
      .map((a, index) => ({
        skill: a.skillKey,
        skillTitle: SKILL_META[a.skillKey].title,
        task: { id: a.id, title: a.title, subtitle: a.subtitle, dueAt: a.dueAt, kind: a.kind } satisfies SkillTask,
        index,
        due: dueDateForTask(a.skillKey, index, joinedAt, a.dueAt),
      }))
      .sort((a, b) => a.due.getTime() - b.due.getTime())
  }
  const keys = Object.keys(SKILL_META) as SkillKey[]
  return keys.flatMap((skill) =>
    TASKS_BY_SKILL[skill].map((task, index) => ({
      skill,
      skillTitle: SKILL_META[skill].title,
      task,
      index,
      due: dueDateForTask(skill, index, joinedAt),
    })),
  ).sort((a, b) => a.due.getTime() - b.due.getTime())
}

function startOfWeek(d: Date) {
  const x = new Date(d)
  const day = x.getDay()
  const diff = day === 0 ? -6 : 1 - day
  x.setDate(x.getDate() + diff)
  x.setHours(0, 0, 0, 0)
  return x
}
