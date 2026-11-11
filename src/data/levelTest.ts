export type LevelTestQuestion = {
  id: number
  prompt: string
  stem?: string
  reading?: string
  options: string[]
  correctIndex: number
}

/** Duración del test: 1 minuto 30 segundos. */
export const LEVEL_TEST_SECONDS = 90

export function scoreLevelTest(
  questions: LevelTestQuestion[],
  answers: Array<number | null>,
  passLabel: string,
  failLabel: string,
) {
  let correct = 0
  questions.forEach((q, i) => {
    if (answers[i] === q.correctIndex) correct += 1
  })
  const total = questions.length
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100)
  const passed = percent >= 60
  return {
    correct,
    total,
    percent,
    passed,
    levelLabel: passed ? passLabel : failLabel,
  }
}

export const FLUIDLEARN_TEST_LINKS: { label: string; to?: string }[][] = [
  [
    { label: 'Test Inglés A1', to: '/test/a1' },
    { label: 'Test Inglés A2', to: '/test/a2' },
    { label: 'Test Inglés B1', to: '/test/b1' },
  ],
  [
    { label: 'Test Inglés B2', to: '/test/b2' },
    { label: 'Test Inglés C1' },
    { label: 'Test Inglés C2' },
  ],
  [
    { label: 'Cambridge Test' },
    { label: 'IELTS Test' },
    { label: 'APTIS Test' },
  ],
  [
    { label: 'PET Test' },
    { label: 'KET Test' },
    { label: 'FCE Test' },
    { label: 'CAE Test' },
  ],
]
