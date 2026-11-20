import type { QuizQuestion } from '../types'

const DISTRACTORS = ['always', 'never', 'because', 'however', 'people', 'today', 'school', 'family', 'quickly', 'better']

function sentencesFrom(material: string) {
  return material
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.split(' ').length >= 4)
}

function contentWords(sentence: string) {
  return sentence
    .replace(/[“”"',:;()¿?¡!]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !/^\d+$/.test(w))
}

function uniqueChoices(correct: string, extra: string[]) {
  const pool = [...extra, ...DISTRACTORS].filter((w) => w.toLowerCase() !== correct.toLowerCase())
  const picks: string[] = []
  for (const w of pool) {
    if (!picks.some((p) => p.toLowerCase() === w.toLowerCase())) picks.push(w)
    if (picks.length >= 2) break
  }
  while (picks.length < 2) picks.push(DISTRACTORS[picks.length] || 'often')
  const choices = [correct, picks[0], picks[1]]
  const order = [0, 1, 2].sort(() => Math.random() - 0.5)
  return { choices: order.map((i) => choices[i]), correctIndex: order.indexOf(0) }
}

/** IA local de FluidLearn: genera preguntas A/B/C a partir del material, sin API externa. */
export function generateAbcFromMaterial(material: string, count = 8): QuizQuestion[] {
  const text = material.trim()
  if (!text) return []
  const sentences = sentencesFrom(text)
  const bag = sentences.flatMap(contentWords)
  const out: QuizQuestion[] = []

  for (const sentence of sentences) {
    if (out.length >= count) break
    const words = contentWords(sentence)
    const target = [...words].sort((a, b) => b.length - a.length)[0]
    if (!target) continue
    const blank = sentence.replace(new RegExp(`\\b${target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`), '______')
    const { choices, correctIndex } = uniqueChoices(target, bag)
    out.push({
      prompt: `Según el material, completa: ${blank}`,
      choices: choices.map((c, i) => `${['A', 'B', 'C'][i]}) ${c}`),
      correctIndex,
    })
  }

  const chunks = text.split(/\n+/).map((l) => l.trim()).filter((l) => l.length > 24)
  for (const chunk of chunks) {
    if (out.length >= count) break
    const words = contentWords(chunk)
    const idea = words.slice(0, 6).join(' ')
    if (!idea) continue
    const { choices, correctIndex } = uniqueChoices(words[0] || 'English', bag)
    out.push({
      prompt: `Según la guía, ¿qué idea aparece en este fragmento?: “${chunk.slice(0, 110)}…”`,
      choices: choices.map((c, i) => `${['A', 'B', 'C'][i]}) ${c}`),
      correctIndex,
    })
  }

  return out.slice(0, count)
}
