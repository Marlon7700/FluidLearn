import type { QuizQuestion, SkillQuiz } from '../types'

export const AVATAR_COUNT = 16

export function avatarSrc(index?: number | null) {
  if (index == null || index < 0 || index >= AVATAR_COUNT) return undefined
  return `/avatars/avatar_${index + 1}.png`
}

export function minWordsForTask(taskId: string) {
  if (taskId === 'writing_paragraph') return 40
  if (taskId === 'writing_micro_email') return 35
  if (taskId === 'writing_edit') return 20
  return 12
}

export function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function ensureOpen(quiz: SkillQuiz, taskId: string): SkillQuiz {
  const minWords = minWordsForTask(taskId)
  return {
    ...quiz,
    questions: quiz.questions.map((q) => {
      if ((q.minWords ?? 0) > 0) return q
      return {
        prompt: `Write your answer in English: ${q.prompt}`,
        choices: [],
        correctIndex: 0,
        minWords,
      }
    }),
  }
}

interface JsonQ {
  question?: string
  options?: string[]
  correctAnswer?: number
  text?: string
  level?: string
  topic?: string
}

function buildQuiz(items: JsonQ[]): SkillQuiz {
  const first = items[0]
  const introParts: string[] = []
  if (first?.level) introParts.push(`Level: ${first.level}`)
  if (first?.topic) introParts.push(`Topic: ${first.topic}`)
  if (first?.text?.trim()) introParts.push(`Passage:\n\n${first.text.trim()}`)
  if (items.length > 1) introParts.push(`${items.length} questions in this activity.`)
  const questions: QuizQuestion[] = items.map((q) => {
    const choices = q.options ?? []
    const idx = Math.min(Math.max(q.correctAnswer ?? 0, 0), Math.max(choices.length - 1, 0))
    return { prompt: q.question?.trim() || '', choices, correctIndex: idx }
  })
  return { intro: introParts.length ? introParts.join('\n\n') : undefined, questions }
}

let extra: Record<string, SkillQuiz> = {}
let loaded = false

export async function loadLocalSkillQuestions() {
  if (loaded) return
  const [readingRes, writingRes] = await Promise.all([
    fetch('/data/reading.json'),
    fetch('/data/writing.json'),
  ])
  const reading = (await readingRes.json()) as JsonQ[]
  const writing = (await writingRes.json()) as JsonQ[]
  const quizzes: Record<string, SkillQuiz> = {}
  if (reading[0]) quizzes.reading_skim = buildQuiz([reading[0]])
  if (reading[1]) quizzes.reading_detail = buildQuiz([reading[1]])
  if (reading[2]) quizzes.reading_vocab = buildQuiz([reading[2]])
  if (reading.length > 3) quizzes.reading_hours_table = buildQuiz(reading.slice(3, 5))
  if (writing[0]) quizzes.writing_sentence = ensureOpen(buildQuiz([writing[0]]), 'writing_sentence')
  if (writing[1]) quizzes.writing_paragraph = ensureOpen(buildQuiz([writing[1]]), 'writing_paragraph')
  if (writing[2]) quizzes.writing_edit = ensureOpen(buildQuiz([writing[2]]), 'writing_edit')
  if (writing.length > 3) {
    quizzes.writing_micro_email = ensureOpen(buildQuiz(writing.slice(3, 5)), 'writing_micro_email')
  }
  extra = quizzes
  loaded = true
}

export function mergedQuiz(taskId: string, fallback?: SkillQuiz) {
  return extra[taskId] ?? fallback
}
